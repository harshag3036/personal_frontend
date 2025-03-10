/**
 * Image Component Constants
 * 
 * This file contains constants used by the Image component.
 */

/**
 * Image component fit options
 */
export const IMAGE_FIT = {
  FILL: 'fill',
  CONTAIN: 'contain',
  COVER: 'cover',
  NONE: 'none',
  SCALE_DOWN: 'scale-down',
};

/**
 * Image component position options
 */
export const IMAGE_POSITION = {
  CENTER: 'center',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
};

/**
 * Image component loading strategies
 */
export const IMAGE_LOADING = {
  EAGER: 'eager',
  LAZY: 'lazy',
};

/**
 * Image component shapes
 */
export const IMAGE_SHAPE = {
  SQUARE: 'square',
  ROUNDED: 'rounded',
  CIRCLE: 'circle',
};

/**
 * Image component sizes
 */
export const IMAGE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  FULL: 'full',
};

/**
 * Default props for the Image component
 */
export const IMAGE_DEFAULT_PROPS = {
  fit: IMAGE_FIT.COVER,
  position: IMAGE_POSITION.CENTER,
  loading: IMAGE_LOADING.LAZY,
  shape: IMAGE_SHAPE.ROUNDED,
  size: IMAGE_SIZES.MEDIUM,
  fallbackSrc: null,
  alt: '',
  width: null,
  height: null,
};
