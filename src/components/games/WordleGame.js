import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const KEYBOARD_KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const WordleGame = ({ difficulty, onGameEnd }) => {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const maxGuesses = 6;

  useEffect(() => {
    // Set up time limit for Time Attack mode
    if (difficulty === 2) { // Time Attack mode
      setTimeLeft(120); // 2 minutes
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (gameStatus === 'playing') {
              setGameStatus('lost');
              onGameEnd({ score: 0 });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [difficulty, gameStatus, onGameEnd]);

  const handleGuess = useCallback(async () => {
    if (currentGuess.length !== 5) {
      setMessage('Word must be 5 letters long');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const guess = currentGuess.toUpperCase();
    
    if (!await validateWord(guess)) {
      setMessage('Not a valid word');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Update used letters
    const newUsedLetters = { ...usedLetters };
    guess.split('').forEach((letter, index) => {
      if (word[index] === letter) {
        newUsedLetters[letter] = 'correct';
      } else if (word.includes(letter)) {
        newUsedLetters[letter] = newUsedLetters[letter] !== 'correct' ? 'present' : newUsedLetters[letter];
      } else {
        newUsedLetters[letter] = newUsedLetters[letter] || 'absent';
      }
    });
    setUsedLetters(newUsedLetters);

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (guess === word) {
      const baseScore = (maxGuesses - guesses.length) * 10;
      let finalScore;
      
      switch (difficulty) {
        case 0: // Daily Challenge
          finalScore = baseScore * 2; // Double points for daily challenge
          break;
        case 1: // Practice Mode
          finalScore = baseScore;
          break;
        case 2: // Time Attack
          finalScore = baseScore + Math.floor(timeLeft / 2); // Bonus points for remaining time
          break;
        default:
          finalScore = baseScore;
      }
      
      setGameStatus('won');
      onGameEnd({ score: finalScore });
    } else if (newGuesses.length >= maxGuesses) {
      setGameStatus('lost');
      onGameEnd({ score: 0 });
    }
  }, [currentGuess, word, guesses, usedLetters, maxGuesses, onGameEnd]);

  const handleKeyPress = useCallback((event) => {
    if (gameStatus !== 'playing') return;

    if (event.key === 'Enter') {
      handleGuess();
    } else if (event.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(event.key) && currentGuess.length < 5) {
      setCurrentGuess(prev => (prev + event.key).toUpperCase());
    }
  }, [currentGuess, gameStatus, handleGuess]);

  useEffect(() => {
    const fetchAndSetWord = async () => {
      try {
        const response = await axios.get('https://api.datamuse.com/words?sp=?????&max=1000');
        const validWords = response.data
          .map(item => item.word.toUpperCase())
          .filter(word => /^[A-Z]{5}$/.test(word));
        const randomWord = validWords[Math.floor(Math.random() * validWords.length)];
        setWord(randomWord || 'REACT');
      } catch (error) {
        console.error('Error fetching word:', error);
        const fallbackWords = ['REACT', 'WORLD', 'GAMES', 'HAPPY', 'SMILE', 'LEARN', 'BRAIN', 'THINK'];
        setWord(fallbackWords[Math.floor(Math.random() * fallbackWords.length)]);
      }
    };

    fetchAndSetWord();
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const validateWord = async (guess) => {
    try {
      setIsValidating(true);
      const response = await axios.get(`https://api.datamuse.com/words?sp=${guess.toLowerCase()}&max=1`);
      return response.data.some(item => item.word.toUpperCase() === guess);
    } catch (error) {
      console.error('Error validating word:', error);
      return true; // Allow the word if validation fails
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyboardClick = (key) => {
    if (gameStatus !== 'playing' || isValidating) return;

    if (key === 'ENTER') {
      handleGuess();
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const getLetterColor = (letter, index, guess) => {
    if (guess[index] === word[index]) {
      return '#4caf50';
    }
    if (word.includes(guess[index])) {
      return '#ffc107';
    }
    return '#9e9e9e';
  };

  const getKeyboardKeyColor = (key) => {
    if (!usedLetters[key]) return '#e0e0e0';
    switch (usedLetters[key]) {
      case 'correct': return '#4caf50';
      case 'present': return '#ffc107';
      case 'absent': return '#9e9e9e';
      default: return '#e0e0e0';
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Wordle Challenge
      </Typography>

      <Snackbar
        open={!!message}
        autoHideDuration={2000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>

      <Grid container spacing={1} direction="column" alignItems="center">
        {/* Guesses Grid */}
        {Array(6).fill(null).map((_, i) => (
          <Grid item key={i} container spacing={1} justifyContent="center">
            {Array(5).fill(null).map((_, j) => {
              const letter = guesses[i]?.charAt(j) || (i === guesses.length ? currentGuess.charAt(j) : '');
              return (
                <Grid item key={j}>
                  <motion.div
                    animate={isShaking && i === guesses.length ? {
                      x: [0, -10, 10, -10, 10, 0],
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: letter && guesses[i] ? getLetterColor(letter, j, guesses[i]) : 'background.paper',
                        color: letter ? 'white' : 'text.primary',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        border: '2px solid',
                        borderColor: letter ? 'transparent' : 'divider',
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {letter}
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        ))}

        {/* Virtual Keyboard */}
        {gameStatus === 'playing' && (
          <Box sx={{ mt: 4, width: '100%' }}>
            {KEYBOARD_KEYS.map((row, i) => (
              <Grid container spacing={0.5} justifyContent="center" key={i} sx={{ mb: 0.5 }}>
                {row.map((key) => (
                  <Grid item key={key}>
                    <Button
                      variant="contained"
                      onClick={() => handleKeyboardClick(key)}
                      disabled={isValidating}
                      sx={{
                        minWidth: key === 'ENTER' ? 65 : 40,
                        height: 50,
                        m: 0.2,
                        bgcolor: getKeyboardKeyColor(key),
                        '&:hover': {
                          bgcolor: getKeyboardKeyColor(key),
                          filter: 'brightness(0.9)',
                        },
                      }}
                    >
                      {key}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Box>
        )}

        {/* Timer for Time Attack mode */}
        {difficulty === 2 && gameStatus === 'playing' && (
          <Typography variant="h6" align="center" color={timeLeft <= 30 ? 'error' : 'primary'} sx={{ mt: 2 }}>
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
        )}

        {gameStatus !== 'playing' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" color={gameStatus === 'won' ? 'success.main' : 'error.main'} gutterBottom>
              {gameStatus === 'won' 
                ? `Congratulations! You won! Score: ${
                    difficulty === 0 ? '(Daily Challenge) ' :
                    difficulty === 2 ? `(Time Attack - ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')} remaining) ` :
                    ''
                  }${(maxGuesses - guesses.length) * 10} points`
                : `Game Over! The word was ${word}`}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setGameStatus('playing');
                setGuesses([]);
                setCurrentGuess('');
                setUsedLetters({});
                const fetchAndSetWord = async () => {
                  try {
                    const response = await axios.get('https://api.datamuse.com/words?sp=?????&max=1000');
                    const validWords = response.data
                      .map(item => item.word.toUpperCase())
                      .filter(word => /^[A-Z]{5}$/.test(word));
                    const randomWord = validWords[Math.floor(Math.random() * validWords.length)];
                    setWord(randomWord || 'REACT');
                  } catch (error) {
                    console.error('Error fetching word:', error);
                    const fallbackWords = ['REACT', 'WORLD', 'GAMES', 'HAPPY', 'SMILE', 'LEARN', 'BRAIN', 'THINK'];
                    setWord(fallbackWords[Math.floor(Math.random() * fallbackWords.length)]);
                  }
                };
                fetchAndSetWord();
              }}
              sx={{ mt: 2 }}
            >
              Play Again
            </Button>
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Guesses remaining: {maxGuesses - guesses.length}
        </Typography>
      </Grid>
    </Box>
  );
};

export default WordleGame;
