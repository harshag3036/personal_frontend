/**
 * Spacing Tokens
 * 
 * This file defines the spacing tokens for the design system.
 * Spacing tokens are used for margins, paddings, gaps, and other spatial measurements.
 * 
 * The spacing scale follows a consistent pattern with each step being approximately
 * 1.5 times larger than the previous step, providing a harmonious visual rhythm.
 */

/**
 * Spacing Scale
 * 
 * The spacing scale is based on a base unit of 4px (0.25rem).
 */
export const spacingScale = {
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

/**
 * Semantic Spacing
 * 
 * Semantic spacing tokens provide meaningful names for common spacing values.
 */
export const spacing = {
  // Component spacing
  none: spacingScale['0'],
  xs: spacingScale['1'],
  sm: spacingScale['2'],
  md: spacingScale['4'],
  lg: spacingScale['6'],
  xl: spacingScale['8'],
  '2xl': spacingScale['12'],
  '3xl': spacingScale['16'],
  '4xl': spacingScale['20'],
  '5xl': spacingScale['24'],
  
  // Layout spacing
  pageMargin: spacingScale['6'],
  sectionMargin: spacingScale['12'],
  containerPadding: spacingScale['6'],
  
  // Component-specific spacing
  buttonPadding: `${spacingScale['3']} ${spacingScale['6']}`,
  cardPadding: spacingScale['6'],
  inputPadding: `${spacingScale['3']} ${spacingScale['5']}`,
  badgePadding: `${spacingScale['1']} ${spacingScale['2']}`,
  
  // Grid spacing
  gridGap: spacingScale['4'],
  gridGapSm: spacingScale['2'],
  gridGapLg: spacingScale['6'],
};

export default spacing;
