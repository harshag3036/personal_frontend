/**
 * Textarea Component
 * 
 * A customizable textarea component with support for variants, sizes, states, and responsive props.
 */

export { default } from './Textarea';

// Export Textarea CSS class for external use
export const TEXTAREA_CLASS = 'ds-textarea';

// Export Textarea variants for external use
export const TEXTAREA_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Export Textarea sizes for external use
export const TEXTAREA_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Export Textarea states for external use
export const TEXTAREA_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

// Export Textarea modifiers for external use
export const TEXTAREA_MODIFIERS = {
  DISABLED: 'disabled',
  READONLY: 'readonly',
  REQUIRED: 'required',
  FULL_WIDTH: 'full-width',
  AUTO_RESIZE: 'auto-resize',
  FOCUSED: 'focused',
};

// Export Textarea breakpoints for external use
export const TEXTAREA_BREAKPOINTS = {
  BASE: 'base',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Import breakpoints from responsive-props utility
export { breakpoints as TEXTAREA_RESPONSIVE_BREAKPOINTS } from '../../utilities/responsive-props';
