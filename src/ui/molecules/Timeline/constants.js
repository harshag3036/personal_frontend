/**
 * Timeline Component Constants
 * 
 * This file contains all the constants used by the Timeline component.
 */

/**
 * Timeline variants
 * @type {Object}
 */
export const TIMELINE_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Timeline sizes
 * @type {Object}
 */
export const TIMELINE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Timeline orientations
 * @type {Object}
 */
export const TIMELINE_ORIENTATIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

/**
 * Timeline item alignments (for vertical orientation)
 * @type {Object}
 */
export const TIMELINE_ALIGNMENTS = {
  LEFT: 'left',
  RIGHT: 'right',
  ALTERNATE: 'alternate',
};

/**
 * Timeline connector types
 * @type {Object}
 */
export const TIMELINE_CONNECTOR_TYPES = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
};

/**
 * Default props for the Timeline component
 * @type {Object}
 */
export const TIMELINE_DEFAULT_PROPS = {
  variant: TIMELINE_VARIANTS.PRIMARY,
  size: TIMELINE_SIZES.MEDIUM,
  orientation: TIMELINE_ORIENTATIONS.VERTICAL,
  alignment: TIMELINE_ALIGNMENTS.LEFT,
  connectorType: TIMELINE_CONNECTOR_TYPES.SOLID,
  showConnectors: true,
};
