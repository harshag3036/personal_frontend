/**
 * Spacing tokens for the UI library
 * 
 * This file defines all spacing-related design tokens including:
 * - Base spacing unit
 * - Spacing scale
 * - Insets (padding)
 * - Gaps (margins)
 */

// Base spacing unit in pixels
export const baseSpacingUnit = 4;

// Spacing scale (in rem for accessibility)
export const spacing = {
  '0': '0',
  '0.5': '0.125rem', // 2px
  '1': '0.25rem',    // 4px
  '1.5': '0.375rem', // 6px
  '2': '0.5rem',     // 8px
  '2.5': '0.625rem', // 10px
  '3': '0.75rem',    // 12px
  '3.5': '0.875rem', // 14px
  '4': '1rem',       // 16px
  '5': '1.25rem',    // 20px
  '6': '1.5rem',     // 24px
  '7': '1.75rem',    // 28px
  '8': '2rem',       // 32px
  '9': '2.25rem',    // 36px
  '10': '2.5rem',    // 40px
  '11': '2.75rem',   // 44px
  '12': '3rem',      // 48px
  '14': '3.5rem',    // 56px
  '16': '4rem',      // 64px
  '20': '5rem',      // 80px
  '24': '6rem',      // 96px
  '28': '7rem',      // 112px
  '32': '8rem',      // 128px
  '36': '9rem',      // 144px
  '40': '10rem',     // 160px
  '44': '11rem',     // 176px
  '48': '12rem',     // 192px
  '52': '13rem',     // 208px
  '56': '14rem',     // 224px
  '60': '15rem',     // 240px
  '64': '16rem',     // 256px
  '72': '18rem',     // 288px
  '80': '20rem',     // 320px
  '96': '24rem',     // 384px
};

// Semantic spacing aliases
export const spacingAliases = {
  // Component spacing
  componentXS: spacing['1'],
  componentSM: spacing['2'],
  componentMD: spacing['3'],
  componentLG: spacing['4'],
  componentXL: spacing['6'],
  
  // Layout spacing
  layoutXS: spacing['4'],
  layoutSM: spacing['6'],
  layoutMD: spacing['8'],
  layoutLG: spacing['12'],
  layoutXL: spacing['16'],
  
  // Content spacing
  contentXS: spacing['2'],
  contentSM: spacing['4'],
  contentMD: spacing['6'],
  contentLG: spacing['8'],
  contentXL: spacing['12'],
};

// Insets (padding presets)
export const insets = {
  // Square insets (equal padding on all sides)
  squareNone: { padding: spacing['0'] },
  squareXS: { padding: spacing['1'] },
  squareSM: { padding: spacing['2'] },
  squareMD: { padding: spacing['3'] },
  squareLG: { padding: spacing['4'] },
  squareXL: { padding: spacing['6'] },
  
  // Symmetric insets (equal padding on top/bottom and left/right)
  squishXS: { paddingTop: spacing['1'], paddingBottom: spacing['1'], paddingLeft: spacing['2'], paddingRight: spacing['2'] },
  squishSM: { paddingTop: spacing['2'], paddingBottom: spacing['2'], paddingLeft: spacing['3'], paddingRight: spacing['3'] },
  squishMD: { paddingTop: spacing['3'], paddingBottom: spacing['3'], paddingLeft: spacing['4'], paddingRight: spacing['4'] },
  squishLG: { paddingTop: spacing['4'], paddingBottom: spacing['4'], paddingLeft: spacing['6'], paddingRight: spacing['6'] },
  squishXL: { paddingTop: spacing['6'], paddingBottom: spacing['6'], paddingLeft: spacing['8'], paddingRight: spacing['8'] },
  
  // Asymmetric insets (different padding on top/bottom)
  stretchXS: { paddingTop: spacing['2'], paddingBottom: spacing['1'], paddingLeft: spacing['2'], paddingRight: spacing['2'] },
  stretchSM: { paddingTop: spacing['3'], paddingBottom: spacing['2'], paddingLeft: spacing['3'], paddingRight: spacing['3'] },
  stretchMD: { paddingTop: spacing['4'], paddingBottom: spacing['3'], paddingLeft: spacing['4'], paddingRight: spacing['4'] },
  stretchLG: { paddingTop: spacing['6'], paddingBottom: spacing['4'], paddingLeft: spacing['6'], paddingRight: spacing['6'] },
  stretchXL: { paddingTop: spacing['8'], paddingBottom: spacing['6'], paddingLeft: spacing['8'], paddingRight: spacing['8'] },
};

// Gaps (margin presets for layouts)
export const gaps = {
  none: spacing['0'],
  xs: spacing['1'],
  sm: spacing['2'],
  md: spacing['4'],
  lg: spacing['6'],
  xl: spacing['8'],
  '2xl': spacing['12'],
  '3xl': spacing['16'],
  '4xl': spacing['24'],
};

export default {
  baseSpacingUnit,
  spacing,
  spacingAliases,
  insets,
  gaps,
};
