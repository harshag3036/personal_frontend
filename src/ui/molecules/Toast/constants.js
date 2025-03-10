/**
 * Toast Component Constants
 * 
 * This file contains constants used by the Toast component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Toast CSS class for external use
export const TOAST_CLASS = 'ds-toast';

// Toast variants for external use
export const TOAST_VARIANTS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Toast positions for external use
export const TOAST_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

// Toast modifiers for external use
export const TOAST_MODIFIERS = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  WITH_ICON: 'with-icon',
  WITH_CLOSE: 'with-close',
};

// Toast breakpoints for external use
export const TOAST_BREAKPOINTS = {
  BASE: 'base',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// ToastContainer classes for external use
export const TOAST_CONTAINER_CLASS = 'ds-toast-container';
export const TOAST_GROUP_CLASS = 'ds-toast-group';

// Export breakpoints from responsive-props utility
export const TOAST_RESPONSIVE_BREAKPOINTS = breakpoints;
