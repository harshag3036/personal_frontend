/**
 * Flex Component
 * 
 * A flexbox container with alignment props.
 * This component extends the Box component with flexbox-specific properties.
 */

export { default } from './Flex';

// Export Flex modifiers for external use
export const FLEX_MODIFIERS = {
  // Direction modifiers
  ROW: 'row',
  COLUMN: 'column',
  ROW_REVERSE: 'row-reverse',
  COLUMN_REVERSE: 'column-reverse',
  
  // Wrap modifiers
  WRAP: 'wrap',
  NOWRAP: 'nowrap',
  WRAP_REVERSE: 'wrap-reverse',
  
  // Alignment modifiers
  ALIGN_START: 'align-start',
  ALIGN_CENTER: 'align-center',
  ALIGN_END: 'align-end',
  ALIGN_STRETCH: 'align-stretch',
  ALIGN_BASELINE: 'align-baseline',
  
  // Justification modifiers
  JUSTIFY_START: 'justify-start',
  JUSTIFY_CENTER: 'justify-center',
  JUSTIFY_END: 'justify-end',
  JUSTIFY_BETWEEN: 'justify-between',
  JUSTIFY_AROUND: 'justify-around',
  JUSTIFY_EVENLY: 'justify-evenly',
  
  // Layout pattern modifiers
  CENTER_ALL: 'center-all',
  SPACE_BETWEEN: 'space-between',
  EQUAL_COLUMNS: 'equal-columns',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_WRAP: 'responsive-wrap',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
  
  // Flex item modifiers
  GROW: 'grow',
  NO_GROW: 'no-grow',
  SHRINK: 'shrink',
  NO_SHRINK: 'no-shrink',
  BASIS_AUTO: 'basis-auto',
  BASIS_0: 'basis-0',
  BASIS_100: 'basis-100',
  
  // Flex shorthand modifiers
  FLEX_1: '1',
  FLEX_AUTO: 'auto',
  FLEX_NONE: 'none',
  
  // Gap modifiers
  GAP_XS: 'gap-xs',
  GAP_SM: 'gap-sm',
  GAP_MD: 'gap-md',
  GAP_LG: 'gap-lg',
  GAP_XL: 'gap-xl',
  
  // Layout pattern modifiers
  STACK: 'stack',
  INLINE: 'inline',
};

// Export Flex CSS class for external use
export const FLEX_CLASS = 'ui-flex';

// Export common flex directions
export const FLEX_DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'];

// Export common flex alignments
export const FLEX_ALIGNMENTS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

// Export common flex justifications
export const FLEX_JUSTIFICATIONS = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];

// Export common flex wraps
export const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'];

// Export common gap sizes
export const FLEX_GAP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

// Import breakpoints from Box component
export { BOX_BREAKPOINTS as FLEX_BREAKPOINTS } from '../Box';
