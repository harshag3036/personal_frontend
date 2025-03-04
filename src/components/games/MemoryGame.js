import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Refresh, Palette } from '@mui/icons-material';
import { CATEGORIES, GAME_STATES } from '../gameConstants';
import useGameSound from '../../hooks/useGameSound';
import useGameState from '../../hooks/useGameState';
import GameStats from '../GameStats';

const MemoryCard = ({ symbol, isFlipped, isMatched, onClick }) => (
  <Card
    onClick={onClick}
    className={`memory-card ${isFlipped || isMatched ? 'flipped' : ''}`}
    sx={{
      height: 100,
      cursor: isFlipped || isMatched ? 'default' : 'pointer',
      userSelect: 'none'
    }}
  >
    <div className="memory-card-inner">
      <div className="memory-card-front">
        <Typography variant="h4" align="center">
          ?
        </Typography>
      </div>
      <div className="memory-card-back">
        <Typography variant="h4" align="center">
          {symbol}
        </Typography>
      </div>
    </div>
  </Card>
);

const MemoryGame = ({ difficulty, onGameEnd }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [theme, setTheme] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const { playSoundEffect } = useGameSound();
  const {
    gameState,
    score,
    highScore,
    achievements,
    startGame,
    endGame,
    updateScore,
    checkAchievements
  } = useGameState('memory_match');

  const difficultySettings = CATEGORIES.MEMORY.GRID_SIZES[difficulty];
  const currentTheme = CATEGORIES.MEMORY.THEMES[theme];

  const generateCards = useCallback(() => {
    const symbols = [...currentTheme.symbols];
    const pairs = (difficultySettings.rows * difficultySettings.cols) / 2;
    const selectedSymbols = symbols.slice(0, pairs);
    const allCards = [...selectedSymbols, ...selectedSymbols];
    
    return allCards
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
  }, [currentTheme.symbols, difficultySettings.rows, difficultySettings.cols]);

  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      setCards(generateCards());
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setStartTime(Date.now());
    }
  }, [gameState, generateCards]);

  const handleCardClick = (id) => {
    if (
      gameState !== GAME_STATES.PLAYING ||
      flipped.length === 2 ||
      flipped.includes(id) ||
      matched.includes(id)
    ) {
      return;
    }

    playSoundEffect('flip');
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
        playSoundEffect('match');
        setFlipped([]);

        // Check if game is complete
        if (matched.length === cards.length - 2) {
          const timeTaken = (Date.now() - startTime) / 1000;
          const timeBonus = Math.max(0, Math.floor((300 - timeTaken) / 10));
          const movesPenalty = Math.max(0, moves - (cards.length / 2));
          const points = difficultySettings.points + timeBonus - movesPenalty;

          updateScore(points);
          const newAchievements = checkAchievements();
          if (newAchievements.length > 0) {
            playSoundEffect('win');
          }
          endGame();
          onGameEnd?.();
        }
      } else {
        playSoundEffect('incorrect');
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    if (gameState === GAME_STATES.PLAYING) {
      setCards(generateCards());
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setStartTime(Date.now());
    }
    playSoundEffect('click');
  };

  const handleStartGame = () => {
    startGame();
    playSoundEffect('click');
  };

  const handleResetGame = () => {
    setCards(generateCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStartTime(Date.now());
    playSoundEffect('click');
  };

  return (
    <Box>
      <GameStats
        gameType="memory_match"
        score={score}
        highScore={highScore}
        achievements={achievements}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small">
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              onChange={handleThemeChange}
              label="Theme"
              sx={{ minWidth: 120 }}
            >
              {CATEGORIES.MEMORY.THEMES.map((theme, index) => (
                <MenuItem key={theme.name} value={index}>
                  {theme.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {gameState === GAME_STATES.PLAYING && (
            <Typography variant="body2">
              Moves: {moves}
            </Typography>
          )}
        </Box>
        {gameState === GAME_STATES.PLAYING && (
          <Tooltip title="Reset Game">
            <IconButton onClick={handleResetGame}>
              <Refresh />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Card className="game-card">
        <CardContent>
          {gameState === GAME_STATES.PLAYING ? (
            <Grid container spacing={1}>
              {cards.map((card) => (
                <Grid
                  item
                  xs={12 / difficultySettings.cols}
                  key={card.id}
                >
                  <MemoryCard
                    symbol={card.symbol}
                    isFlipped={flipped.includes(card.id)}
                    isMatched={matched.includes(card.id)}
                    onClick={() => handleCardClick(card.id)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom>
                Memory Match Challenge
              </Typography>
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
                Start Game
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MemoryGame;
