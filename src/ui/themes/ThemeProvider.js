/**
 * Theme Provider
 * 
 * This component provides theme context to the application.
 * It allows for theme switching and theme customization.
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { cssVariables } from '../utilities';
import lightTheme from './light';
import darkTheme from './dark';

// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  themes: {},
  registerTheme: () => {},
});

/**
 * Custom hook to use the theme context
 * 
 * @returns {Object} The theme context
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Theme Provider Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} [props.initialTheme='light'] - Initial theme
 * @returns {JSX.Element} Theme provider component
 */
export const ThemeProvider = ({ children, initialTheme = 'light' }) => {
  // State for current theme
  const [theme, setTheme] = useState(initialTheme);
  
  // State for registered themes
  const [themes, setThemes] = useState({
    light: lightTheme,
    dark: darkTheme,
  });
  
  /**
   * Register a new theme
   * 
   * @param {string} name - Theme name
   * @param {Object} themeTokens - Theme tokens
   */
  const registerTheme = (name, themeTokens) => {
    setThemes((prevThemes) => ({
      ...prevThemes,
      [name]: themeTokens,
    }));
  };
  
  // Apply theme to document
  useEffect(() => {
    // Get current theme tokens
    const currentTheme = themes[theme] || themes.light;
    
    // Create style element for theme variables
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'design-system-theme');
    
    // Generate CSS variables for theme
    const themeVariables = generateThemeVariables(currentTheme);
    styleElement.textContent = themeVariables;
    
    // Add theme class to body
    document.body.classList.remove(...Object.keys(themes).map(t => `theme-${t}`));
    document.body.classList.add(`theme-${theme}`);
    
    // Add style element to head
    const head = document.head || document.getElementsByTagName('head')[0];
    const existingStyle = document.getElementById('design-system-theme');
    
    if (existingStyle) {
      head.removeChild(existingStyle);
    }
    
    head.appendChild(styleElement);
    
    // Cleanup on unmount
    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [theme, themes]);
  
  // Memoize context value
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    themes,
    registerTheme,
  }), [theme, themes]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Generate CSS variables for a theme
 * 
 * @param {Object} theme - Theme tokens
 * @returns {string} CSS variables
 */
function generateThemeVariables(theme) {
  // Start with root selector
  let css = ':root {\n';
  
  // Process each token category
  Object.entries(theme).forEach(([category, tokens]) => {
    // Flatten nested tokens
    const flatTokens = cssVariables.flattenObject(tokens, category);
    
    // Add each token as a CSS variable
    Object.entries(flatTokens).forEach(([key, value]) => {
      css += `  --${cssVariables.toKebabCase(key)}: ${value};\n`;
    });
  });
  
  // Close root selector
  css += '}\n';
  
  return css;
}

export default ThemeProvider;
