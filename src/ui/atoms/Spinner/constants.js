/**
 * Spinner Component Constants
 * 
 * This file contains constants used by the Spinner component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Spinner CSS class for external use
export const SPINNER_CLASS = 'ui-spinner';

// Spinner sizes for external use
export const SPINNER_SIZES = {
  XS: 'xs',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XL: 'xl',
};

// Spinner variants for external use
export const SPINNER_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral',
};

// Spinner speeds for external use
export const SPINNER_SPEEDS = {
  SLOW: 'slow',
  MEDIUM: 'medium',
  FAST: 'fast',
};

// Spinner label positions for external use
export const SPINNER_LABEL_POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

// Spinner modifiers for external use
export const SPINNER_MODIFIERS = {
  // Size modifiers
  XS: 'xs',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XL: 'xl',
  
  // Variant modifiers
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral',
  
  // Speed modifiers
  SLOW: 'slow',
  MEDIUM: 'medium',
  FAST: 'fast',
  
  // Layout modifiers
  INLINE: 'inline',
  FULLSCREEN: 'fullscreen',
  WITH_LABEL: 'with-label',
  LABEL_TOP: 'label-top',
  LABEL_RIGHT: 'label-right',
  LABEL_BOTTOM: 'label-bottom',
  LABEL_LEFT: 'label-left',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Export breakpoints from responsive-props utility
export const SPINNER_BREAKPOINTS = breakpoints;
