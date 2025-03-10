/**
 * Select Component Constants
 * 
 * This file contains constants used by the Select component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Export Select CSS class for external use
export const SELECT_CLASS = 'ds-select';

// Export Select variants for external use
export const SELECT_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Export Select sizes for external use
export const SELECT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Export Select states for external use
export const SELECT_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

// Export Select modifiers for external use
export const SELECT_MODIFIERS = {
  OPEN: 'open',
  DISABLED: 'disabled',
  REQUIRED: 'required',
  FULL_WIDTH: 'full-width',
  FOCUSED: 'focused',
};

// Export Select breakpoints for external use
export const SELECT_BREAKPOINTS = {
  BASE: 'base',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Export breakpoints from responsive-props utility
export const SELECT_RESPONSIVE_BREAKPOINTS = breakpoints;
