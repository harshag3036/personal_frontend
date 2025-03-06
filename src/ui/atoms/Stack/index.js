/**
 * Stack Component
 * 
 * A component for stacking elements vertically or horizontally with consistent spacing.
 * This component is a specialized version of Flex with a simpler API.
 */

export { default } from './Stack';

// Export Stack CSS class for external use
export const STACK_CLASS = 'ui-stack';

// Export Stack directions for external use
export const STACK_DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

// Export Stack modifiers for external use
export const STACK_MODIFIERS = {
  // Direction modifiers
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  
  // Feature modifiers
  DIVIDERS: 'dividers',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Import breakpoints from responsive-props utility
export { breakpoints as STACK_BREAKPOINTS } from '../../utilities/responsive-props';
