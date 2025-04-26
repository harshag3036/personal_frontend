import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create a context for the theme
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * 
 * Provides theme context to the application and handles theme switching.
 * Persists theme selection to localStorage.
 * 
 * @example
 * ```jsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
const ThemeProvider = ({ initialTheme = 'light', children }) => {
  // Initialize theme from localStorage or use the provided initialTheme
  const [theme, setTheme] = useState(() => {
    const savedTheme = typeof localStorage !== 'undefined' 
      ? localStorage.getItem('ui-theme') 
      : null;
    
    return savedTheme || initialTheme;
  });
  
  // Effect to update document attributes and localStorage when theme changes
  useEffect(() => {
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ui-theme', theme);
    }
    
    // Update document attributes
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add/remove dark class on body
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);
  
  // Value to be provided by the context
  const contextValue = {
    theme,
    setTheme,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  /** Initial theme to use if none is stored in localStorage */
  initialTheme: PropTypes.oneOf(['light', 'dark']),
  /** Child components that will have access to the theme context */
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
