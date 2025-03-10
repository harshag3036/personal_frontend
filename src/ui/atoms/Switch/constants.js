/**
 * Switch Component Constants
 * 
 * This file contains constants used by the Switch component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Switch CSS class for external use
export const SWITCH_CLASS = 'ui-switch';

// Switch sizes for external use
export const SWITCH_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Switch variants for external use
export const SWITCH_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral',
};

// Switch states for external use
export const SWITCH_STATES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  ACTIVE: 'active',
  FOCUS: 'focus',
  DISABLED: 'disabled',
};

// Switch modifiers for external use
export const SWITCH_MODIFIERS = {
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Variant modifiers
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral',
  
  // State modifiers
  CHECKED: 'checked',
  DISABLED: 'disabled',
  FOCUSED: 'focused',
  
  // Layout modifiers
  WITH_LABEL: 'with-label',
  LABEL_LEFT: 'label-left',
  LABEL_RIGHT: 'label-right',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
};

// Export breakpoints from responsive-props utility
export const SWITCH_BREAKPOINTS = breakpoints;
