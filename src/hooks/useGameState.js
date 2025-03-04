import { useState, useCallback, useEffect } from 'react';

const useGameState = (gameId) => {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'paused', 'gameOver'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(`highScore_${gameId}`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem(`achievements_${gameId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (gameId) {
      const savedHighScore = localStorage.getItem(`highScore_${gameId}`);
      const savedAchievements = localStorage.getItem(`achievements_${gameId}`);
      
      if (savedHighScore) {
        setHighScore(parseInt(savedHighScore, 10));
      }
      
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
    }
  }, [gameId]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState('paused');
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const endGame = useCallback((result = {}) => {
    const finalScore = result.score || score;
    setScore(finalScore);
    setGameState('gameOver');

    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem(`highScore_${gameId}`, finalScore.toString());
    }

    // Check for achievements
    if (result.achievements) {
      const newAchievements = result.achievements.filter(
        achievement => !achievements.some(a => a.id === achievement.id)
      );

      if (newAchievements.length > 0) {
        const updatedAchievements = [...achievements, ...newAchievements];
        setAchievements(updatedAchievements);
        localStorage.setItem(`achievements_${gameId}`, JSON.stringify(updatedAchievements));
      }
    }
  }, [gameId, score, highScore, achievements]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setScore(0);
  }, []);

  const updateScore = useCallback((points) => {
    setScore(current => {
      const newScore = current + points;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem(`highScore_${gameId}`, newScore.toString());
      }
      return newScore;
    });
  }, [gameId, highScore]);

  const checkAchievements = useCallback((conditions) => {
    const newAchievements = [];

    // Example achievement checks
    if (conditions.score >= 100 && !achievements.some(a => a.id === 'score_100')) {
      newAchievements.push({
        id: 'score_100',
        name: 'Century',
        description: 'Score 100 points in a single game'
      });
    }

    if (conditions.perfectGame && !achievements.some(a => a.id === 'perfect_game')) {
      newAchievements.push({
        id: 'perfect_game',
        name: 'Perfect Game',
        description: 'Complete a game without any mistakes'
      });
    }

    if (newAchievements.length > 0) {
      const updatedAchievements = [...achievements, ...newAchievements];
      setAchievements(updatedAchievements);
      localStorage.setItem(`achievements_${gameId}`, JSON.stringify(updatedAchievements));
    }

    return newAchievements;
  }, [gameId, achievements]);

  return {
    gameState,
    score,
    highScore,
    achievements,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    updateScore,
    checkAchievements
  };
};

export default useGameState;
