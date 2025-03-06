/**
 * Badge Component
 * 
 * A customizable badge component with support for variants, sizes, and responsive props.
 * This component can be rendered as different HTML elements using the `as` prop.
 */

export { default } from './Badge';

// Export Badge CSS class for external use
export const BADGE_CLASS = 'ui-badge';

// Export Badge variants for external use
export const BADGE_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  OUTLINE: 'outline',
};

// Export Badge sizes for external use
export const BADGE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Export Badge modifiers for external use
export const BADGE_MODIFIERS = {
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Variant modifiers
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  OUTLINE: 'outline',
  
  // Shape modifiers
  PILL: 'pill',
  DOT: 'dot',
  
  // Interaction modifiers
  CLICKABLE: 'clickable',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
  
  // Position modifiers
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
};

// Import breakpoints from responsive-props utility
export { breakpoints as BADGE_BREAKPOINTS } from '../../utilities/responsive-props';
