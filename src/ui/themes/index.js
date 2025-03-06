/**
 * Theme System
 * 
 * This file exports all theme-related components and functions.
 */

export { default as ThemeProvider, useTheme } from './ThemeProvider';
export { default as lightTheme } from './light';
export { default as darkTheme } from './dark';

/**
 * Register a new theme
 * 
 * This is a convenience function to register a new theme.
 * It's a wrapper around the registerTheme function from the ThemeProvider.
 * 
 * @param {string} name - Theme name
 * @param {Object} themeTokens - Theme tokens
 */
export const registerTheme = (name, themeTokens) => {
  // This is just a placeholder. The actual registration happens in the ThemeProvider.
  // We export this function to provide a consistent API for theme registration.
  console.warn('Theme registration outside of ThemeProvider has no effect.');
  console.warn('Use the registerTheme function from the ThemeProvider context instead.');
  console.warn('Example: const { registerTheme } = useTheme();');
};
