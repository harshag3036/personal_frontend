import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  Button,
} from '@mui/material';
import {
  VolumeUp,
  VolumeOff,
  ArrowBack,
} from '@mui/icons-material';
import './Activities.css';
import MathChallenge from './games/MathChallenge';
import MemoryGame from './games/MemoryGame';
import KnowledgeQuiz from './games/KnowledgeQuiz';
import WordleGame from './games/WordleGame';
import SudokuGame from './games/SudokuGame';
import { GAME_STATES, GAME_CATEGORIES } from './gameConstants';
import useGameSound from '../hooks/useGameSound';
import useGameState from '../hooks/useGameState';
import GameStats from './GameStats';
import DifficultySelector from './DifficultySelector';
import GameInstructions from './GameInstructions';

const Activities = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const theme = useTheme();

  const { isSoundEnabled, toggleSound, playSoundEffect } = useGameSound();
  const { 
    gameState, 
    score, 
    highScore, 
    achievements,
    startGame,
    endGame,
    resetGame
  } = useGameState(selectedGame?.id);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setShowInstructions(true);
    playSoundEffect('click');
  };

  const handleDifficultySelect = (index) => {
    setDifficulty(index);
    playSoundEffect('click');
  };

  const handleBackToCategories = () => {
    setSelectedGame(null);
    resetGame();
    playSoundEffect('click');
  };

  const getGameComponent = (gameId) => {
    switch (gameId) {
      case 'math_challenge':
        return MathChallenge;
      case 'memory_match':
        return MemoryGame;
      case 'general_quiz':
        return KnowledgeQuiz;
      case 'wordle':
        return WordleGame;
      case 'sudoku':
        return SudokuGame;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" className="activities-container">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" className="category-title">
          Fun Activities
        </Typography>
        <IconButton 
          onClick={toggleSound} 
          className="sound-toggle"
          sx={{ 
            bgcolor: theme.palette.background.paper,
            boxShadow: 1,
            '&:hover': { bgcolor: theme.palette.action.hover }
          }}
        >
          {isSoundEnabled ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
      </Box>

      {!selectedGame ? (
        // Categories and Games List
        <Grid container spacing={6}>
          {GAME_CATEGORIES.map((category, categoryIndex) => (
            <Grid item xs={12} key={category.id}>
              <Box
                className="game-category-section"
                sx={{ 
                  animation: `fadeInUp ${0.3 + categoryIndex * 0.1}s ease forwards`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <Box className="category-header">
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      width: '100%'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '-10px',
                          left: '-10px',
                          right: '-10px',
                          bottom: '-10px',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                          borderRadius: '50%',
                          animation: 'pulse 2s infinite'
                        }
                      }}
                    >
                      <category.icon className="category-icon" sx={{ fontSize: 40 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body1" className="category-description">
                        {category.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Grid container spacing={3} className="game-grid">
                  {category.games.map((game, gameIndex) => (
                    <Grid 
                      item 
                      xs={12} 
                      sm={6} 
                      md={4} 
                      key={game.id}
                      sx={{
                        animation: `fadeInUp ${0.5 + gameIndex * 0.1}s ease forwards`,
                        opacity: 0,
                        transform: 'translateY(20px)'
                      }}
                    >
                      <Card 
                        className="game-card"
                        onClick={() => handleGameSelect({ ...game, component: getGameComponent(game.id) })}
                        sx={{ 
                          bgcolor: theme.palette.background.paper,
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            '& .game-card-content': {
                              transform: 'translateY(0)',
                            },
                            '& .game-card-overlay': {
                              opacity: 1
                            }
                          }
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {game.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {game.description}
                          </Typography>
                          <Box
                            className="game-card-overlay"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                              p: 2,
                              opacity: 0,
                              transition: 'opacity 0.3s ease'
                            }}
                          >
                            <Typography variant="caption" sx={{ color: 'white' }}>
                              {game.difficulties?.length} Difficulty Levels
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Game View
        <Box>
          <Button 
            variant="outlined" 
            onClick={handleBackToCategories}
            startIcon={<ArrowBack />}
            sx={{ mb: 3 }}
          >
            Back to Categories
          </Button>
          
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Box mb={3}>
                <GameStats
                  gameType={selectedGame.id}
                  score={score}
                  highScore={highScore}
                  achievements={achievements}
                  isSoundEnabled={isSoundEnabled}
                  onToggleSound={toggleSound}
                />
              </Box>

              {gameState === GAME_STATES.IDLE ? (
                <DifficultySelector
                  difficulties={selectedGame.difficulties}
                  selectedDifficulty={difficulty}
                  onSelectDifficulty={handleDifficultySelect}
                  onStart={() => {
                    startGame();
                    playSoundEffect('click');
                  }}
                />
              ) : (
                React.createElement(selectedGame.component, {
                  difficulty: difficulty,
                  onGameEnd: (result) => {
                    endGame(result);
                    playSoundEffect('gameover');
                  }
                })
              )}
            </CardContent>
          </Card>
        </Box>
      )}

      {selectedGame && (
        <GameInstructions
          open={showInstructions}
          onClose={() => setShowInstructions(false)}
          title={selectedGame.name}
          description={selectedGame.description}
          instructions={selectedGame.instructions}
          scoring={selectedGame.scoring}
          controls={selectedGame.controls}
          tips={selectedGame.tips}
        />
      )}
    </Container>
  );
};

export default Activities;
