import { useState, useCallback, useEffect } from 'react';

const SOUND_EFFECTS = {
  click: '/sounds/click.mp3',
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  match: '/sounds/match.mp3',
  win: '/sounds/win.mp3',
  gameover: '/sounds/wrong.mp3',
  flip: '/sounds/flip.mp3',
  tick: '/sounds/tick.mp3'
};

const useGameSound = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('gameSound');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [audioElements, setAudioElements] = useState({});

  useEffect(() => {
    // Preload audio files
    const elements = {};
    Object.entries(SOUND_EFFECTS).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      elements[key] = audio;
    });
    setAudioElements(elements);

    return () => {
      // Cleanup audio elements
      Object.values(elements).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('gameSound', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  const playSoundEffect = useCallback((effectName) => {
    if (!isSoundEnabled || !audioElements[effectName]) return;

    const audio = audioElements[effectName];
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  }, [isSoundEnabled, audioElements]);

  return {
    isSoundEnabled,
    toggleSound,
    playSoundEffect
  };
};

export default useGameSound;
