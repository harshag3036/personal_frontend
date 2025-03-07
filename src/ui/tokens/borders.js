/**
 * Border tokens for the UI library
 * 
 * This file defines all border-related design tokens including:
 * - Border widths
 * - Border styles
 * - Border radii
 * - Border colors
 * - Border presets
 */

// Border widths
export const borderWidths = {
  none: '0',
  hairline: '0.5px',
  thin: '1px',
  thick: '2px',
  heavy: '4px',
};

// Border styles
export const borderStyles = {
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  groove: 'groove',
  ridge: 'ridge',
  inset: 'inset',
  outset: 'outset',
};

// Border radii
export const borderRadii = {
  none: '0',
  xs: '0.125rem',  // 2px
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',  // Fully rounded (circles, pills)
};

// Border colors (using semantic naming)
// Note: These reference color tokens that would be defined in colors.js
export const borderColors = {
  transparent: 'transparent',
  
  // Neutral borders
  default: 'var(--color-gray-200)',
  light: 'var(--color-gray-100)',
  dark: 'var(--color-gray-300)',
  
  // Interactive borders
  focus: 'var(--color-blue-500)',
  hover: 'var(--color-gray-300)',
  active: 'var(--color-gray-400)',
  disabled: 'var(--color-gray-100)',
  
  // Status borders
  error: 'var(--color-red-500)',
  warning: 'var(--color-yellow-500)',
  success: 'var(--color-green-500)',
  info: 'var(--color-blue-500)',
};

// Border presets (combinations of width, style, and color)
export const borders = {
  none: 'none',
  
  // Basic borders
  thin: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.default}`,
  thick: `${borderWidths.thick} ${borderStyles.solid} ${borderColors.default}`,
  
  // Status borders
  error: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.error}`,
  warning: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.warning}`,
  success: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.success}`,
  info: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.info}`,
  
  // Interactive borders
  focus: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.focus}`,
  hover: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.hover}`,
  active: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.active}`,
  disabled: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.disabled}`,
  
  // Special borders
  dashed: `${borderWidths.thin} ${borderStyles.dashed} ${borderColors.default}`,
  dotted: `${borderWidths.thin} ${borderStyles.dotted} ${borderColors.default}`,
};

// Component-specific border presets
export const componentBorders = {
  // Input borders
  input: borders.thin,
  inputFocus: borders.focus,
  inputError: borders.error,
  inputDisabled: borders.disabled,
  
  // Button borders
  button: borders.thin,
  buttonHover: borders.hover,
  buttonActive: borders.active,
  buttonDisabled: borders.disabled,
  
  // Card borders
  card: borders.thin,
  
  // Table borders
  table: borders.thin,
  tableHeader: borders.thick,
  
  // Modal borders
  modal: borders.none,
  
  // Divider
  divider: `${borderWidths.thin} ${borderStyles.solid} ${borderColors.light}`,
  
  // Tabs
  tabActive: `0 ${borderWidths.thick} 0 0 ${borderColors.focus}`,
  
  // Accordion
  accordion: borders.thin,
};

// Border radius presets for components
export const componentRadii = {
  // Button radii
  buttonNone: borderRadii.none,
  buttonSmall: borderRadii.sm,
  buttonMedium: borderRadii.md,
  buttonLarge: borderRadii.lg,
  buttonPill: borderRadii.full,
  
  // Input radii
  input: borderRadii.md,
  
  // Card radii
  card: borderRadii.lg,
  cardSmall: borderRadii.md,
  cardLarge: borderRadii.xl,
  
  // Modal radii
  modal: borderRadii.lg,
  
  // Tooltip radii
  tooltip: borderRadii.md,
  
  // Badge radii
  badge: borderRadii.full,
  badgeSquare: borderRadii.sm,
  
  // Avatar radii
  avatarRound: borderRadii.full,
  avatarSquare: borderRadii.md,
  
  // Checkbox and radio
  checkbox: borderRadii.sm,
  radio: borderRadii.full,
};

export default {
  borderWidths,
  borderStyles,
  borderRadii,
  borderColors,
  borders,
  componentBorders,
  componentRadii,
};
