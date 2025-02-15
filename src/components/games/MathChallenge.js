import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import { CATEGORIES, GAME_STATES } from '../gameConstants';
import useGameSound from '../../hooks/useGameSound';
import useGameState from '../../hooks/useGameState';
import GameStats from '../GameStats';

const MathChallenge = ({ difficulty, onGameEnd }) => {
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

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
  } = useGameState('math_challenge');

  const difficultySettings = CATEGORIES.MATH.DIFFICULTY_LEVELS[difficulty];

  // Safe calculation function instead of using eval
  const calculateResult = (num1, num2, operation) => {
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return 0;
    }
  };

  const generateProblem = useCallback(() => {
    const operations = CATEGORIES.MATH.OPERATIONS;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const range = difficultySettings.range;
    
    let num1 = Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    let num2 = Math.floor(Math.random() * (range[1] - range[0])) + range[0];

    // Ensure division problems result in whole numbers
    if (operation.symbol === '/') {
      num2 = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * (Math.floor(Math.random() * 10) + 1);
    }
    // Ensure subtraction results in positive numbers
    else if (operation.symbol === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    return {
      num1,
      num2,
      operation: operation.symbol,
      correctAnswer: calculateResult(num1, num2, operation.symbol)
    };
  }, [difficultySettings.range]);

  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      setProblem(generateProblem());
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            stopCurrentSound();
            onGameEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        stopCurrentSound();
      };
    }
  }, [gameState, generateProblem, endGame, onGameEnd, stopCurrentSound]);

  const handleStartGame = () => {
    startGame();
    setTimeLeft(30);
    setStreak(0);
    setAnswer('');
    setFeedback('');
    playSoundEffect('click');
  };

  const handleAnswerSubmit = () => {
    if (!problem || !answer) return;

    const userAnswer = parseInt(answer);
    const isCorrect = userAnswer === problem.correctAnswer;

    if (isCorrect) {
      const newStreak = streak + 1;
      const streakBonus = Math.floor(newStreak / 5) * 5;
      const speedBonus = Math.max(0, Math.floor((timeLeft / 30) * 5));
      const points = difficultySettings.points + streakBonus + speedBonus;

      setStreak(newStreak);
      updateScore(points);
      setFeedback('Correct! 🎉');
      playSoundEffect('correct');

      // Check for achievements
      const newAchievements = checkAchievements();
      if (newAchievements.length > 0) {
        playSoundEffect('win');
      }
    } else {
      setStreak(0);
      setFeedback('Try again!');
      playSoundEffect('incorrect');
    }

    setAnswer('');
    setProblem(generateProblem());
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAnswerSubmit();
    }
  };

  return (
    <Box>
      <GameStats
        gameType="math_challenge"
        score={score}
        highScore={highScore}
        timeLeft={timeLeft}
        achievements={achievements}
      />

      <Card className="game-card">
        <CardContent>
          {gameState === GAME_STATES.PLAYING ? (
            <>
              <Box mb={2}>
                <LinearProgress
                  variant="determinate"
                  value={(timeLeft / 30) * 100}
                  className="timer-progress"
                />
              </Box>

              <Fade in={true}>
                <Box textAlign="center">
                  <Typography variant="h4" gutterBottom>
                    {problem?.num1} {problem?.operation} {problem?.num2} = ?
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={2} mt={3}>
                    <TextField
                      type="number"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      variant="outlined"
                      size="large"
                      className="math-input"
                      autoFocus
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAnswerSubmit}
                      disabled={!answer}
                    >
                      Check
                    </Button>
                  </Box>
                  <Typography
                    variant="h6"
                    color={feedback.includes('Correct') ? 'success.main' : 'error.main'}
                    className="feedback-text"
                    mt={2}
                  >
                    {feedback}
                  </Typography>
                  {streak >= 5 && (
                    <Typography variant="subtitle1" color="primary" mt={1}>
                      🔥 {streak} Streak! (+{Math.floor(streak / 5) * 5} bonus)
                    </Typography>
                  )}
                </Box>
              </Fade>
            </>
          ) : (
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom>
                {timeLeft === 0 ? 'Game Over!' : 'Ready to test your math skills?'}
              </Typography>
              {timeLeft === 0 && (
                <Typography variant="h6" color="primary" gutterBottom>
                  Final Score: {score}
                </Typography>
              )}
              <Typography variant="body1" color="text.secondary" paragraph>
                Difficulty: {difficultySettings.name}
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

export default MathChallenge;
