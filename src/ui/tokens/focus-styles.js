/**
 * Focus style tokens for the UI library
 * 
 * This file defines all focus-related design tokens to ensure consistent
 * and accessible focus indicators across the application. Proper focus styles
 * are essential for keyboard navigation and accessibility.
 */

// Import other tokens to maintain consistency
import { borderRadii } from './borders';
import { spacing } from './spacing';

// Focus colors
// These can be overridden by theme-specific values
export const focusColors = {
  primary: 'var(--color-blue-500)',
  secondary: 'var(--color-purple-500)',
  danger: 'var(--color-red-500)',
  warning: 'var(--color-yellow-500)',
  success: 'var(--color-green-500)',
  neutral: 'var(--color-gray-500)',
  
  // High contrast focus colors for accessibility
  highContrast: 'var(--color-blue-600)',
  highContrastLight: 'var(--color-blue-400)',
  highContrastDark: 'var(--color-blue-800)',
};

// Focus ring styles
export const focusRings = {
  // Default focus ring
  default: `0 0 0 ${spacing['1']} ${focusColors.primary}`,
  
  // Offset focus ring (appears outside the element)
  offset: `0 0 0 ${spacing['1']} white, 0 0 0 ${spacing['2']} ${focusColors.primary}`,
  
  // Inset focus ring (appears inside the element)
  inset: `inset 0 0 0 ${spacing['1']} ${focusColors.primary}`,
  
  // Colored variants
  secondary: `0 0 0 ${spacing['1']} ${focusColors.secondary}`,
  danger: `0 0 0 ${spacing['1']} ${focusColors.danger}`,
  warning: `0 0 0 ${spacing['1']} ${focusColors.warning}`,
  success: `0 0 0 ${spacing['1']} ${focusColors.success}`,
  neutral: `0 0 0 ${spacing['1']} ${focusColors.neutral}`,
  
  // High contrast focus rings for accessibility
  highContrast: `0 0 0 ${spacing['1']} ${focusColors.highContrast}`,
  highContrastOffset: `0 0 0 ${spacing['1']} white, 0 0 0 ${spacing['2']} ${focusColors.highContrast}`,
  
  // Thicker focus rings for larger elements
  thick: `0 0 0 ${spacing['2']} ${focusColors.primary}`,
  thickOffset: `0 0 0 ${spacing['2']} white, 0 0 0 ${spacing['3']} ${focusColors.primary}`,
};

// Focus transitions
export const focusTransitions = {
  default: 'box-shadow 0.2s ease-in-out',
  fast: 'box-shadow 0.1s ease-in-out',
  slow: 'box-shadow 0.3s ease-in-out',
};

// Focus outlines (alternative to box-shadow for some browsers/elements)
export const focusOutlines = {
  default: `${spacing['1']} solid ${focusColors.primary}`,
  thick: `${spacing['2']} solid ${focusColors.primary}`,
  dashed: `${spacing['1']} dashed ${focusColors.primary}`,
  dotted: `${spacing['1']} dotted ${focusColors.primary}`,
  
  // Colored variants
  secondary: `${spacing['1']} solid ${focusColors.secondary}`,
  danger: `${spacing['1']} solid ${focusColors.danger}`,
  warning: `${spacing['1']} solid ${focusColors.warning}`,
  success: `${spacing['1']} solid ${focusColors.success}`,
  neutral: `${spacing['1']} solid ${focusColors.neutral}`,
  
  // High contrast outlines
  highContrast: `${spacing['1']} solid ${focusColors.highContrast}`,
};

// Component-specific focus styles
export const componentFocusStyles = {
  // Button focus styles
  button: {
    boxShadow: focusRings.default,
    transition: focusTransitions.default,
    outlineStyle: 'none',
  },
  
  // Input focus styles
  input: {
    boxShadow: focusRings.default,
    borderColor: focusColors.primary,
    transition: focusTransitions.default,
    outlineStyle: 'none',
  },
  
  // Checkbox and radio focus styles
  checkbox: {
    boxShadow: focusRings.offset,
    transition: focusTransitions.default,
    outlineStyle: 'none',
  },
  
  // Link focus styles
  link: {
    outlineStyle: 'none',
    textDecoration: 'underline',
    textDecorationThickness: '2px',
    textUnderlineOffset: '2px',
    boxShadow: 'none',
    transition: 'text-decoration-color 0.2s ease-in-out',
  },
  
  // Card focus styles
  card: {
    boxShadow: focusRings.default,
    transition: focusTransitions.default,
    outlineStyle: 'none',
  },
  
  // Tab focus styles
  tab: {
    boxShadow: 'none',
    outlineStyle: 'none',
    borderBottom: `${spacing['2']} solid ${focusColors.primary}`,
    transition: 'border-color 0.2s ease-in-out',
  },
  
  // Menu item focus styles
  menuItem: {
    backgroundColor: 'var(--color-blue-100)',
    color: 'var(--color-blue-800)',
    outlineStyle: 'none',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  },
};

// Focus style mixins (can be used in styled-components or other CSS-in-JS libraries)
export const focusMixins = {
  // Default focus style
  focusVisible: `
    &:focus-visible {
      box-shadow: ${focusRings.default};
      outline: none;
      transition: ${focusTransitions.default};
    }
  `,
  
  // High contrast focus style
  focusVisibleHighContrast: `
    &:focus-visible {
      box-shadow: ${focusRings.highContrast};
      outline: none;
      transition: ${focusTransitions.default};
    }
  `,
  
  // Offset focus style
  focusVisibleOffset: `
    &:focus-visible {
      box-shadow: ${focusRings.offset};
      outline: none;
      transition: ${focusTransitions.default};
    }
  `,
  
  // Inset focus style
  focusVisibleInset: `
    &:focus-visible {
      box-shadow: ${focusRings.inset};
      outline: none;
      transition: ${focusTransitions.default};
    }
  `,
  
  // Link focus style
  focusVisibleLink: `
    &:focus-visible {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 2px;
      text-decoration-color: ${focusColors.primary};
      outline: none;
    }
  `,
};

// Utility function to get focus styles for a component
export const getFocusStyles = (component) => {
  if (componentFocusStyles[component]) {
    return componentFocusStyles[component];
  }
  
  console.warn(`Focus styles for component "${component}" not found. Using default focus styles.`);
  return componentFocusStyles.button;
};

export default {
  focusColors,
  focusRings,
  focusTransitions,
  focusOutlines,
  componentFocusStyles,
  focusMixins,
  getFocusStyles,
};
