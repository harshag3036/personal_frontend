/**
 * Alert Component Constants
 * 
 * This file contains constants used by the Alert component.
 */

/**
 * Alert component class name
 */
export const ALERT_CLASS = 'ui-alert';

/**
 * Alert variants
 */
export const ALERT_VARIANTS = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

/**
 * Alert sizes
 */
export const ALERT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Alert icon positions
 */
export const ALERT_ICON_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};

/**
 * Alert default props
 */
export const ALERT_DEFAULT_PROPS = {
  variant: ALERT_VARIANTS.INFO,
  size: ALERT_SIZES.MEDIUM,
  iconPosition: ALERT_ICON_POSITIONS.LEFT,
  closable: false,
  hasIcon: true,
};

/**
 * Alert breakpoints for responsive design
 */
export const ALERT_BREAKPOINTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};
