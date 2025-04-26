/**
 * Light Theme
 * 
 * This file defines the light theme for the design system.
 * It overrides the default tokens with light theme-specific values.
 */

import { colorPalette } from '../tokens/colors';

/**
 * Light Theme Tokens
 * 
 * These tokens override the default tokens for the light theme.
 */
const lightTheme = {
  colors: {
    background: {
      primary: colorPalette.neutral[50], // #FAFBFF
      secondary: '#FFFFFF',
      tertiary: colorPalette.neutral[100], // #F8FAFC
    },
    text: {
      primary: colorPalette.neutral[800], // #1E293B
      secondary: colorPalette.neutral[600], // #475569
      tertiary: colorPalette.neutral[500], // #64748B
    },
    border: {
      light: 'rgba(0, 0, 0, 0.05)',
      medium: colorPalette.neutral[200], // #E2E8F0
      focus: colorPalette.wisdom[500], // #144272
    },
  },
  shadows: {
    sm: '0 4px 15px rgba(0, 0, 0, 0.08)',
    md: '0 4px 20px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
};

export default lightTheme;
