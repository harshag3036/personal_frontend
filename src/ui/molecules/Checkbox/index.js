/**
 * Checkbox Component Exports
 * 
 * This file exports the Checkbox component and its related constants.
 */

import Checkbox from './Checkbox';

/**
 * Checkbox CSS class name
 */
export const CHECKBOX_CLASS = 'ui-checkbox';

/**
 * Checkbox size variants
 */
export const CHECKBOX_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

/**
 * Checkbox state modifiers
 */
export const CHECKBOX_MODIFIERS = {
  CHECKED: 'checked',
  UNCHECKED: 'unchecked',
  INDETERMINATE: 'indeterminate',
  DISABLED: 'disabled',
  FOCUSED: 'focused',
  INVALID: 'invalid',
};

/**
 * Checkbox breakpoints for responsive props
 */
export const CHECKBOX_BREAKPOINTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

export default Checkbox;
