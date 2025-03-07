/**
 * Shadow tokens for the UI library
 * 
 * This file defines all shadow-related design tokens including:
 * - Box shadows
 * - Drop shadows
 * - Inner shadows
 * - Elevation levels
 */

// Base shadow values
const shadowColor = 'rgba(0, 0, 0, 0.1)';
const shadowColorDarker = 'rgba(0, 0, 0, 0.15)';
const shadowColorLighter = 'rgba(0, 0, 0, 0.05)';

// Box shadows
export const boxShadows = {
  none: 'none',
  xs: `0 1px 2px 0 ${shadowColor}`,
  sm: `0 1px 3px 0 ${shadowColor}, 0 1px 2px -1px ${shadowColorLighter}`,
  md: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -2px ${shadowColorLighter}`,
  lg: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColorLighter}`,
  xl: `0 20px 25px -5px ${shadowColor}, 0 8px 10px -6px ${shadowColorLighter}`,
  '2xl': `0 25px 50px -12px ${shadowColorDarker}`,
  inner: `inset 0 2px 4px 0 ${shadowColorLighter}`,
};

// Directional shadows
export const directionalShadows = {
  top: `0 -6px 16px -6px ${shadowColor}`,
  right: `6px 0 16px -6px ${shadowColor}`,
  bottom: `0 6px 16px -6px ${shadowColor}`,
  left: `-6px 0 16px -6px ${shadowColor}`,
};

// Elevation levels (combinations of shadows for different elevations)
export const elevations = {
  // No elevation (flat)
  0: boxShadows.none,
  
  // Subtle elevation (cards, buttons)
  1: boxShadows.sm,
  
  // Medium elevation (dropdowns, popovers)
  2: boxShadows.md,
  
  // High elevation (modals, dialogs)
  3: boxShadows.lg,
  
  // Highest elevation (notifications, tooltips)
  4: boxShadows.xl,
  
  // Maximum elevation (full-screen modals)
  5: boxShadows['2xl'],
};

// Focused element shadow
export const focusShadow = `0 0 0 3px rgba(66, 153, 225, 0.5)`;

// Hover shadows (subtle enhancements for hover states)
export const hoverShadows = {
  sm: `0 4px 8px 0 ${shadowColorLighter}`,
  md: `0 8px 16px 0 ${shadowColorLighter}`,
  lg: `0 16px 32px 0 ${shadowColorLighter}`,
};

// Active shadows (for pressed states)
export const activeShadows = {
  sm: `inset 0 1px 2px 0 ${shadowColor}`,
  md: `inset 0 2px 4px 0 ${shadowColor}`,
  lg: `inset 0 4px 8px 0 ${shadowColor}`,
};

// Shadow presets for common components
export const componentShadows = {
  button: elevations[1],
  buttonHover: hoverShadows.sm,
  buttonActive: activeShadows.sm,
  
  card: elevations[1],
  cardHover: hoverShadows.sm,
  
  dropdown: elevations[2],
  popover: elevations[2],
  
  modal: elevations[3],
  dialog: elevations[3],
  
  tooltip: elevations[4],
  notification: elevations[4],
  
  sidebar: directionalShadows.right,
  header: directionalShadows.bottom,
  
  focused: focusShadow,
};

export default {
  boxShadows,
  directionalShadows,
  elevations,
  focusShadow,
  hoverShadows,
  activeShadows,
  componentShadows,
};
