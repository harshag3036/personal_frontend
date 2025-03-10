/**
 * Input Component Constants
 * 
 * This file contains constants used by the Input component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Export Input CSS class for external use
export const INPUT_CLASS = 'ui-input';

// Export Input variants for external use
export const INPUT_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Export Input sizes for external use
export const INPUT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Export Input states for external use
export const INPUT_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

// Export Input modifiers for external use
export const INPUT_MODIFIERS = {
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Variant modifiers
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
  
  // State modifiers
  DEFAULT_STATE: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  
  // Layout modifiers
  FULL_WIDTH: 'full-width',
  DISABLED: 'disabled',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Export breakpoints from responsive-props utility
export const INPUT_BREAKPOINTS = breakpoints;
