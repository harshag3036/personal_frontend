/**
 * Button Component Constants
 * 
 * This file contains constants used by the Button component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Button CSS class for external use
export const BUTTON_CLASS = 'ui-button';

// Button variants for external use
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  OUTLINE: 'outline',
  TEXT: 'text',
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
};

// Button sizes for external use
export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Button states for external use
export const BUTTON_STATES = {
  LOADING: 'loading',
  DISABLED: 'disabled',
};

// Button modifiers for external use
export const BUTTON_MODIFIERS = {
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Variant modifiers
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  OUTLINE: 'outline',
  TEXT: 'text',
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  
  // State modifiers
  LOADING: 'loading',
  DISABLED: 'disabled',
  
  // Layout modifiers
  FULL_WIDTH: 'full-width',
  WITH_LEFT_ICON: 'with-left-icon',
  WITH_RIGHT_ICON: 'with-right-icon',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Export breakpoints from responsive-props utility
export const BUTTON_BREAKPOINTS = breakpoints;
