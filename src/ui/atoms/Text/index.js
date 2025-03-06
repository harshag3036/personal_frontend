/**
 * Text Component
 * 
 * A component for displaying text with consistent styling.
 * This component extends the Box component with typography-specific properties.
 */

export { default } from './Text';

// Export Text CSS class for external use
export const TEXT_CLASS = 'ui-text';

// Export Text variants for external use
export const TEXT_VARIANTS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  SUBTITLE1: 'subtitle1',
  SUBTITLE2: 'subtitle2',
  BODY1: 'body1',
  BODY2: 'body2',
  CAPTION: 'caption',
  OVERLINE: 'overline',
};

// Export Text weights for external use
export const TEXT_WEIGHTS = {
  NORMAL: 'normal',
  MEDIUM: 'medium',
  BOLD: 'bold',
};

// Export Text transforms for external use
export const TEXT_TRANSFORMS = {
  NONE: 'none',
  CAPITALIZE: 'capitalize',
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
};

// Export Text alignments for external use
export const TEXT_ALIGNS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
  JUSTIFY: 'justify',
};

// Export Text modifiers for external use
export const TEXT_MODIFIERS = {
  // Style modifiers
  ITALIC: 'italic',
  TRUNCATE: 'truncate',
  NOWRAP: 'nowrap',
  WRAP: 'wrap',
  
  // Alignment modifiers
  CENTER: 'center',
  RIGHT: 'right',
  LEFT: 'left',
  JUSTIFY: 'justify',
  
  // Weight modifiers
  NORMAL: 'normal',
  MEDIUM: 'medium',
  BOLD: 'bold',
  
  // Transform modifiers
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
  CAPITALIZE: 'capitalize',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
  
  // Color modifiers
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  
  // Decoration modifiers
  UNDERLINE: 'underline',
  LINE_THROUGH: 'line-through',
  NO_DECORATION: 'no-decoration',
};

// Import breakpoints from Box component
export { BOX_BREAKPOINTS as TEXT_BREAKPOINTS } from '../Box';
