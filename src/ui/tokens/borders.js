/**
 * Border Tokens
 * 
 * This file defines the border tokens for the design system.
 * Border tokens include widths, styles, radii, and colors.
 */

/**
 * Border Widths
 */
export const borderWidths = {
  none: '0',
  xs: '1px',
  sm: '2px',
  md: '3px',
  lg: '4px',
  xl: '6px',
};

/**
 * Border Styles
 */
export const borderStyles = {
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
};

/**
 * Border Radii
 */
export const borderRadii = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

/**
 * Semantic Borders
 * 
 * Semantic borders provide meaningful names for common border use cases.
 */
export const borders = {
  // Border widths
  width: {
    none: borderWidths.none,
    xs: borderWidths.xs,
    sm: borderWidths.sm,
    md: borderWidths.md,
    lg: borderWidths.lg,
    xl: borderWidths.xl,
  },
  
  // Border styles
  style: {
    none: borderStyles.none,
    solid: borderStyles.solid,
    dashed: borderStyles.dashed,
    dotted: borderStyles.dotted,
    double: borderStyles.double,
  },
  
  // Border radii
  radius: {
    none: borderRadii.none,
    xs: borderRadii.xs,
    sm: borderRadii.sm,
    md: borderRadii.md,
    lg: borderRadii.lg,
    xl: borderRadii.xl,
    '2xl': borderRadii['2xl'],
    '3xl': borderRadii['3xl'],
    full: borderRadii.full,
  },
  
  // Component-specific borders
  card: {
    width: borderWidths.xs,
    style: borderStyles.solid,
    radius: borderRadii.lg,
  },
  
  button: {
    width: borderWidths.xs,
    style: borderStyles.solid,
    radius: borderRadii.full,
  },
  
  input: {
    width: borderWidths.xs,
    style: borderStyles.solid,
    radius: borderRadii.md,
  },
  
  badge: {
    width: borderWidths.none,
    style: borderStyles.none,
    radius: borderRadii.full,
  },
  
  modal: {
    width: borderWidths.none,
    style: borderStyles.none,
    radius: borderRadii.lg,
  },
  
  tooltip: {
    width: borderWidths.none,
    style: borderStyles.none,
    radius: borderRadii.sm,
  },
};

export default borders;
