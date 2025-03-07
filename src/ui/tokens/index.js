/**
 * Design tokens index file
 * 
 * This file exports all design tokens from the UI library to provide a single
 * import point for all tokens. This makes it easier to use tokens throughout
 * the application and ensures consistency.
 */

// Import all token modules
import animations from './animations';
import aspectRatios from './aspect-ratios';
import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import focusStyles from './focus-styles';
import gridTemplates from './grid-templates';
import shadows from './shadows';
import spacing from './spacing';
import transitions from './transitions';
import typography from './typography';
import zIndex from './z-index';

// Export all token modules
export {
  animations,
  aspectRatios,
  borders,
  breakpoints,
  colors,
  focusStyles,
  gridTemplates,
  shadows,
  spacing,
  transitions,
  typography,
  zIndex,
};

// Export individual token groups for convenience
export const {
  durations,
  easings,
  keyframes,
  componentAnimations,
} = animations;

export const {
  aspectRatios: aspectRatioValues,
  aspectRatioPercentages,
  componentAspectRatios,
  getAspectRatio,
  getAspectRatioPercentage,
} = aspectRatios;

export const {
  borderWidths,
  borderStyles,
  borderRadii,
  borderColors,
  borders: borderValues,
  componentBorders,
  componentRadii,
} = borders;

// Colors are exported directly from colors.js

export const {
  focusColors,
  focusRings,
  focusTransitions,
  focusOutlines,
  componentFocusStyles,
  focusMixins,
  getFocusStyles,
} = focusStyles;

export const {
  gridColumns,
  gridRows,
  gridGaps,
  gridColumnSizes,
  gridRowSizes,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridAutoFlow,
  gridAutoRows,
  gridAutoColumns,
  responsiveGridTemplates,
  layoutPresets,
} = gridTemplates;

export const {
  boxShadows,
  directionalShadows,
  elevations,
  focusShadow,
  hoverShadows,
  activeShadows,
  componentShadows,
} = shadows;

export const {
  baseSpacingUnit,
  spacing: spacingValues,
  spacingAliases,
  insets,
  gaps,
} = spacing;

export const {
  transitionProperties,
  transitionDurations,
  transitionTimingFunctions,
  transitionDelays,
  transitions: transitionValues,
  componentTransitions,
  transitionMixins,
  getTransition,
} = transitions;

export const {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  textStyles,
} = typography;

export const {
  zIndices,
  componentZIndices,
  stackingContexts,
  getZIndex,
} = zIndex;

// Export breakpoint tokens
export const {
  values: breakpointValues,
  mediaQueries,
  helpers: breakpointHelpers,
} = breakpoints;

// Default export with all tokens
export default {
  animations,
  aspectRatios,
  borders,
  breakpoints,
  colors,
  focusStyles,
  gridTemplates,
  shadows,
  spacing,
  transitions,
  typography,
  zIndex,
};
