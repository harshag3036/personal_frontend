import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
  Alert,
} from '@mui/material';
import { GAME_STATES } from '../gameConstants';
import useGameSound from '../../hooks/useGameSound';
import useGameState from '../../hooks/useGameState';
import GameStats from '../GameStats';

const questions = {
  easy: [
    {
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"]
    },
    {
      question: "Which planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"]
    },
    {
      question: "What is the largest mammal in the world?",
      correct_answer: "Blue Whale",
      incorrect_answers: ["African Elephant", "Giraffe", "Hippopotamus"]
    }
  ],
  medium: [
    {
      question: "Who painted the Mona Lisa?",
      correct_answer: "Leonardo da Vinci",
      incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"]
    },
    {
      question: "What is the chemical formula for water?",
      correct_answer: "H2O",
      incorrect_answers: ["CO2", "NaCl", "O2"]
    },
    {
      question: "What is the chemical symbol for gold?",
      correct_answer: "Au",
      incorrect_answers: ["Ag", "Fe", "Cu"]
    }
  ],
  hard: [
    {
      question: "What is the speed of light in meters per second?",
      correct_answer: "299,792,458",
      incorrect_answers: ["300,000,000", "299,999,999", "299,792,000"]
    },
    {
      question: "Who wrote 'War and Peace'?",
      correct_answer: "Leo Tolstoy",
      incorrect_answers: ["Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"]
    },
    {
      question: "What is the smallest prime number greater than 100?",
      correct_answer: "101",
      incorrect_answers: ["102", "103", "107"]
    }
  ]
};

const KnowledgeQuiz = ({ difficulty, onGameEnd }) => {
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const { playSoundEffect, stopCurrentSound } = useGameSound();
  const {
    gameState,
    score,
    highScore,
    achievements,
    startGame,
    endGame,
    updateScore,
    checkAchievements
  } = useGameState('knowledge_quiz');

  useEffect(() => {
    let timer;
    if (gameState === GAME_STATES.PLAYING) {
      try {
        // Get questions based on difficulty
        const difficultyLevel = difficulty === 0 ? 'easy' : difficulty === 1 ? 'medium' : 'hard';
        const availableQuestions = questions[difficultyLevel];
        
        if (!availableQuestions || availableQuestions.length === 0) {
          throw new Error('No questions available for selected difficulty');
        }

        // Randomly select and shuffle questions
        const selectedQuestions = [...availableQuestions]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map(q => ({
            ...q,
            all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
          }));

        setCurrentQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);
        setError('');
        
        // Start timer
        timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              const finalScore = score;
              endGame();
              onGameEnd?.({ score: finalScore });
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (err) {
        console.error('Error setting up quiz:', err);
        setError('Failed to start quiz. Please try again.');
        endGame();
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      stopCurrentSound();
    };
  }, [gameState, difficulty, endGame, onGameEnd, stopCurrentSound, score]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      const points = (difficulty + 1) * 10;
      const timeBonus = Math.floor((timeLeft / 30) * 5);
      updateScore(points + timeBonus);
      setFeedback('Correct! 🎉');
      playSoundEffect('correct');

      const newAchievements = checkAchievements();
      if (newAchievements.length > 0) {
        playSoundEffect('win');
      }
    } else {
      setFeedback('Wrong answer! The correct answer was: ' + currentQuestion.correct_answer);
      playSoundEffect('wrong');
    }

    setSelectedAnswer('');

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setFeedback('');
      }, 2000);
    } else {
      setTimeout(() => {
        const finalScore = score;
        endGame();
        onGameEnd?.({ score: finalScore });
      }, 2000);
    }
  };

  const handleStartGame = () => {
    startGame();
    setTimeLeft(30);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setFeedback('');
    setError('');
    playSoundEffect('click');
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="contained" onClick={handleStartGame}>Try Again</Button>
      </Box>
    );
  }

  return (
    <Box>
      <GameStats
        gameType="knowledge_quiz"
        score={score}
        highScore={highScore}
        timeLeft={timeLeft}
        achievements={achievements}
      />

      <Card>
        <CardContent>
          {gameState === GAME_STATES.PLAYING ? (
            currentQuestions.length > 0 ? (
              <>
                <Box mb={2}>
                  <LinearProgress
                    variant="determinate"
                    value={(timeLeft / 30) * 100}
                    className="timer-progress"
                  />
                </Box>

                <Fade in={true}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Question {currentQuestionIndex + 1} of {currentQuestions.length}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {currentQuestion.question}
                    </Typography>

                    <FormControl component="fieldset">
                      <FormLabel component="legend">Choose your answer:</FormLabel>
                      <RadioGroup
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                      >
                        <Grid container spacing={2}>
                          {currentQuestion.all_answers.map((answer, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Box mt={3} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAnswerSubmit}
                        disabled={!selectedAnswer}
                      >
                        Submit Answer
                      </Button>
                    </Box>

                    {feedback && (
                      <Typography
                        variant="h6"
                        color={feedback.includes('Correct') ? 'success.main' : 'error.main'}
                        className="feedback-text"
                        align="center"
                        mt={2}
                      >
                        {feedback}
                      </Typography>
                    )}
                  </Box>
                </Fade>
              </>
            ) : null
          ) : (
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom>
                {timeLeft === 0 ? 'Game Over!' : 'Ready to test your knowledge?'}
              </Typography>
              {timeLeft === 0 && (
                <Typography variant="h6" color="primary" gutterBottom>
                  Final Score: {score}
                </Typography>
              )}
              <Typography variant="body1" color="text.secondary" paragraph>
                Difficulty: {['Easy', 'Medium', 'Hard'][difficulty]}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleStartGame}
                startIcon={<span>🎮</span>}
              >
                {timeLeft === 0 ? 'Play Again' : 'Start Game'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default KnowledgeQuiz;
