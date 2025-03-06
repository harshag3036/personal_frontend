/**
 * Divider Component
 * 
 * A component for visually separating content.
 */

export { default } from './Divider';

// Export Divider CSS class for external use
export const DIVIDER_CLASS = 'ui-divider';

// Export Divider orientations for external use
export const DIVIDER_ORIENTATIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

// Export Divider modifiers for external use
export const DIVIDER_MODIFIERS = {
  // Orientation modifiers
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  
  // Feature modifiers
  WITH_TEXT: 'with-text',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Import breakpoints from responsive-props utility
export { breakpoints as DIVIDER_BREAKPOINTS } from '../../utilities/responsive-props';
