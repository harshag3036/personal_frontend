import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

/**
 * Custom hook for accessing and modifying the current theme.
 * 
 * @returns {Object} An object containing the current theme and a function to update it.
 *   - theme: The current theme ('light' or 'dark')
 *   - setTheme: Function to change the theme
 *   - toggleTheme: Function to toggle between light and dark themes
 */
const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  const { theme, setTheme } = context;
  
  // Provide a utility function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return { theme, setTheme, toggleTheme };
};

export default useTheme;
