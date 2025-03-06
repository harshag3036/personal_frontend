/**
 * Dark Theme
 * 
 * This file defines the dark theme for the design system.
 * It overrides the default tokens with dark theme-specific values.
 */

import { colorPalette } from '../tokens/colors';

/**
 * Dark Theme Tokens
 * 
 * These tokens override the default tokens for the dark theme.
 */
const darkTheme = {
  colors: {
    background: {
      primary: '#0F172A', // Dark background
      secondary: '#1E293B', // Slightly lighter background
      tertiary: '#334155', // Even lighter background for cards, etc.
    },
    text: {
      primary: '#F8FAFC', // Light text for dark background
      secondary: '#CBD5E1', // Slightly dimmed text
      tertiary: '#94A3B8', // More dimmed text for less important content
    },
    border: {
      light: 'rgba(255, 255, 255, 0.05)',
      medium: '#334155',
      focus: colorPalette.brand[300], // Lighter brand color for better visibility
    },
  },
  shadows: {
    sm: '0 4px 15px rgba(0, 0, 0, 0.3)',
    md: '0 4px 20px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.5)',
  },
};

export default darkTheme;
