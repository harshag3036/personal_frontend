/**
 * Stack Component Constants
 * 
 * This file contains constants used by the Stack component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

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

// Export breakpoints from responsive-props utility
export const STACK_BREAKPOINTS = breakpoints;
