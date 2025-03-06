/**
 * Box Component
 * 
 * A basic layout container with spacing and styling props.
 * This is a fundamental building block for layouts.
 */

export { default } from './Box';

// Export Box modifiers for external use
export const BOX_MODIFIERS = {
  // Layout modifiers
  FULL_WIDTH: 'full-width',
  FULL_HEIGHT: 'full-height',
  FLEX: 'flex',
  INLINE: 'inline',
  CENTER: 'center',
  BLOCK: 'block',
  HIDDEN: 'hidden',
  
  // Position modifiers
  RELATIVE: 'relative',
  ABSOLUTE: 'absolute',
  FIXED: 'fixed',
  STICKY: 'sticky',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  STACK_ON_MOBILE: 'stack-on-mobile',
  HIDE_ON_MOBILE: 'hide-on-mobile',
  
  // Spacing modifiers
  GUTTER: 'gutter',
  GUTTER_SM: 'gutter-sm',
  GUTTER_LG: 'gutter-lg',
  MARGIN: 'margin',
  MARGIN_SM: 'margin-sm',
  MARGIN_LG: 'margin-lg',
};

// Export Box CSS class for external use
export const BOX_CLASS = 'ui-box';

// Export common breakpoints
export const BOX_BREAKPOINTS = {
  XS: '0px',     // Extra small devices (portrait phones)
  SM: '576px',   // Small devices (landscape phones)
  MD: '768px',   // Medium devices (tablets)
  LG: '992px',   // Large devices (desktops)
  XL: '1200px',  // Extra large devices (large desktops)
  XXL: '1400px', // Extra extra large devices
};
