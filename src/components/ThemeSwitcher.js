/**
 * Theme Switcher Component
 * 
 * This component allows users to switch between light and dark themes.
 */

import React from 'react';
import { useTheme, Button } from '../ui';

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
      variant="outline"
      size="small"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      style={{ marginRight: '16px' }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};

export default ThemeSwitcher;
