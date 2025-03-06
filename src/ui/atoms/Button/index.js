/**
 * Button Component
 * 
 * A customizable button component with support for variants, sizes, and responsive props.
 * This component can be rendered as different HTML elements using the `as` prop.
 */

export { default } from './Button';

// Export Button CSS class for external use
export const BUTTON_CLASS = 'ui-button';

// Export Button variants for external use
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  OUTLINE: 'outline',
  TEXT: 'text',
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
};

// Export Button sizes for external use
export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Export Button states for external use
export const BUTTON_STATES = {
  LOADING: 'loading',
  DISABLED: 'disabled',
};

// Export Button modifiers for external use
export const BUTTON_MODIFIERS = {
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Variant modifiers
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  OUTLINE: 'outline',
  TEXT: 'text',
  DANGER: 'danger',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  
  // State modifiers
  LOADING: 'loading',
  DISABLED: 'disabled',
  
  // Layout modifiers
  FULL_WIDTH: 'full-width',
  WITH_LEFT_ICON: 'with-left-icon',
  WITH_RIGHT_ICON: 'with-right-icon',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Import breakpoints from responsive-props utility
export { breakpoints as BUTTON_BREAKPOINTS } from '../../utilities/responsive-props';
