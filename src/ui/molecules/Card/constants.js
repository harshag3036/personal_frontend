/**
 * Card Component Constants
 * 
 * This file contains constants used by the Card component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

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

// Export breakpoints from responsive-props utility
export const CARD_BREAKPOINTS = breakpoints;
