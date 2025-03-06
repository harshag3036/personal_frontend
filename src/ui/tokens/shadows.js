/**
 * Shadow Tokens
 * 
 * This file defines the shadow tokens for the design system.
 * Shadow tokens are used to create depth and elevation in the UI.
 */

/**
 * Shadow Values
 * 
 * Shadow values are defined as CSS box-shadow values.
 * They follow a consistent pattern with increasing elevation.
 */
export const shadowValues = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 4px 15px rgba(0, 0, 0, 0.08)',
  md: '0 4px 20px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 30px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 40px rgba(0, 0, 0, 0.18)',
  '2xl': '0 16px 50px rgba(0, 0, 0, 0.20)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  outline: '0 0 0 3px rgba(20, 66, 114, 0.2)',
  'outline-error': '0 0 0 3px rgba(220, 38, 38, 0.2)',
  'outline-success': '0 0 0 3px rgba(46, 204, 113, 0.2)',
};

/**
 * Semantic Shadows
 * 
 * Semantic shadows provide meaningful names for common shadow use cases.
 */
export const shadows = {
  // Elevation shadows
  none: shadowValues.none,
  xs: shadowValues.xs,
  sm: shadowValues.sm,
  md: shadowValues.md,
  lg: shadowValues.lg,
  xl: shadowValues.xl,
  '2xl': shadowValues['2xl'],
  
  // Component-specific shadows
  card: shadowValues.sm,
  'card-hover': shadowValues.md,
  button: shadowValues.sm,
  'button-hover': shadowValues.md,
  dropdown: shadowValues.lg,
  modal: shadowValues.xl,
  tooltip: shadowValues.md,
  
  // Focus shadows
  focus: shadowValues.outline,
  'focus-error': shadowValues['outline-error'],
  'focus-success': shadowValues['outline-success'],
  
  // Inner shadows
  inner: shadowValues.inner,
};

export default shadows;
