/**
 * Toast Component
 * 
 * A notification component for displaying temporary messages with support for variants, positions, and responsive props.
 */

export { default } from './Toast';
export { default as ToastContainer } from './ToastContainer';
export { default as ToastProvider } from './ToastProvider';

// Export Toast CSS class for external use
export const TOAST_CLASS = 'ds-toast';

// Export Toast variants for external use
export const TOAST_VARIANTS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Export Toast positions for external use
export const TOAST_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

// Export Toast modifiers for external use
export const TOAST_MODIFIERS = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  WITH_ICON: 'with-icon',
  WITH_CLOSE: 'with-close',
};

// Export Toast breakpoints for external use
export const TOAST_BREAKPOINTS = {
  BASE: 'base',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Export ToastContainer classes for external use
export const TOAST_CONTAINER_CLASS = 'ds-toast-container';
export const TOAST_GROUP_CLASS = 'ds-toast-group';

// Import breakpoints from responsive-props utility
export { breakpoints as TOAST_RESPONSIVE_BREAKPOINTS } from '../../utilities/responsive-props';
