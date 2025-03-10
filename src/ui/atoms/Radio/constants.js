/**
 * Radio Component Constants
 * 
 * This file contains constants used by the Radio component.
 */

/**
 * Radio component variants
 */
export const RADIO_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral',
};

/**
 * Radio component sizes
 */
export const RADIO_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Radio label positions
 */
export const RADIO_LABEL_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};

/**
 * Default props for the Radio component
 */
export const RADIO_DEFAULT_PROPS = {
  variant: RADIO_VARIANTS.PRIMARY,
  size: RADIO_SIZES.MEDIUM,
  labelPosition: RADIO_LABEL_POSITIONS.RIGHT,
  disabled: false,
};
