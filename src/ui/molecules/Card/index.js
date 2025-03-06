/**
 * Card Component
 * 
 * A customizable card component with support for variants, responsive props, and polymorphic rendering.
 */

export { default } from './Card';

// Export Card CSS class for external use
export const CARD_CLASS = 'ui-card';

// Export Card variants for external use
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  OUTLINED: 'outlined',
  INTERACTIVE: 'interactive',
};

// Export Card modifiers for external use
export const CARD_MODIFIERS = {
  // Variant modifiers
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  OUTLINED: 'outlined',
  INTERACTIVE: 'interactive',
  
  // Feature modifiers
  FULL_WIDTH: 'full-width',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Import breakpoints from responsive-props utility
export { breakpoints as CARD_BREAKPOINTS } from '../../utilities/responsive-props';
