/**
 * Divider Component Constants
 * 
 * This file contains constants used by the Divider component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Divider CSS class for external use
export const DIVIDER_CLASS = 'ui-divider';

// Divider orientations for external use
export const DIVIDER_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

// Divider modifiers for external use
export const DIVIDER_MODIFIERS = {
  // Orientation modifiers
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  
  // Feature modifiers
  WITH_TEXT: 'with-text',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Export breakpoints from responsive-props utility
export const DIVIDER_BREAKPOINTS = breakpoints;
