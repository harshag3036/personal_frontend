/**
 * Stepper Component Constants
 * 
 * This file contains constants used by the Stepper component.
 */

// Stepper variants
export const STEPPER_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  VERTICAL: 'vertical',
  NUMBERED: 'numbered',
};

// Stepper sizes
export const STEPPER_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Step states
export const STEP_STATES = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ERROR: 'error',
  DISABLED: 'disabled',
};

// Connector types
export const CONNECTOR_TYPES = {
  LINE: 'line',
  DASHED: 'dashed',
  DOTTED: 'dotted',
  NONE: 'none',
};

// Default props
export const DEFAULT_PROPS = {
  variant: STEPPER_VARIANTS.DEFAULT,
  size: STEPPER_SIZES.MEDIUM,
  connectorType: CONNECTOR_TYPES.LINE,
  alternativeLabels: false,
  nonLinear: false,
};
