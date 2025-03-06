/**
 * Theme Switcher Component
 * 
 * This component allows users to switch between light and dark themes.
 */

import React from 'react';
import { useTheme } from '../ui';
import { Button } from '../ui';

/**
 * Theme Switcher Component
 * 
 * @returns {JSX.Element} Theme switcher component
 */
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Button
      variant="outlined"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Button>
  );
};

export default ThemeSwitcher;
