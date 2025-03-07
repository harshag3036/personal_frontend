/**
 * Transition tokens for the UI library
 * 
 * This file defines all transition-related design tokens to ensure consistent
 * and smooth transitions across the application. Proper transitions enhance
 * the user experience by making interface changes feel natural and responsive.
 */

// Import animation durations and easings for consistency
import { durations, easings } from './animations';

// Transition properties
// These define which CSS properties should be animated
export const transitionProperties = {
  none: 'none',
  all: 'all',
  
  // Common transition properties
  colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
  
  // Composite properties
  composite: 'transform, opacity',
  colorAndShadow: 'color, background-color, border-color, box-shadow',
  
  // Individual properties
  backgroundColor: 'background-color',
  borderColor: 'border-color',
  boxShadow: 'box-shadow',
  color: 'color',
  fill: 'fill',
  height: 'height',
  margin: 'margin',
  opacity: 'opacity',
  padding: 'padding',
  stroke: 'stroke',
  transform: 'transform',
  width: 'width',
  visibility: 'visibility',
  zIndex: 'z-index',
};

// Transition durations
// Reusing animation durations for consistency
export const transitionDurations = {
  none: '0ms',
  fastest: `${durations.fastest}ms`,
  fast: `${durations.fast}ms`,
  normal: `${durations.normal}ms`,
  slow: `${durations.slow}ms`,
  slower: `${durations.slower}ms`,
  slowest: `${durations.slowest}ms`,
};

// Transition timing functions
// Reusing animation easings for consistency
export const transitionTimingFunctions = {
  // Standard easings
  linear: easings.linear,
  ease: easings.ease,
  easeIn: easings.easeIn,
  easeOut: easings.easeOut,
  easeInOut: easings.easeInOut,
  
  // Custom easings
  emphasized: easings.easeOutQuart,
  emphasizedDecelerate: easings.easeOutCubic,
  emphasizedAccelerate: easings.easeInCubic,
  standard: easings.easeInOutCubic,
  standardDecelerate: easings.easeOutCubic,
  standardAccelerate: easings.easeInCubic,
};

// Transition delays
export const transitionDelays = {
  none: '0ms',
  tiny: '50ms',
  short: '100ms',
  medium: '200ms',
  long: '300ms',
  extraLong: '500ms',
};

// Transition presets
// Combinations of property, duration, timing function, and delay
export const transitions = {
  none: 'none',
  
  // All properties
  all: `${transitionProperties.all} ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  allFast: `${transitionProperties.all} ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  allSlow: `${transitionProperties.all} ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
  
  // Color transitions
  colors: `${transitionProperties.colors} ${transitionDurations.normal} ${transitionTimingFunctions.easeOut}`,
  colorsFast: `${transitionProperties.colors} ${transitionDurations.fast} ${transitionTimingFunctions.easeOut}`,
  colorsSlow: `${transitionProperties.colors} ${transitionDurations.slow} ${transitionTimingFunctions.easeOut}`,
  
  // Transform transitions
  transform: `${transitionProperties.transform} ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  transformFast: `${transitionProperties.transform} ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  transformSlow: `${transitionProperties.transform} ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
  
  // Opacity transitions
  opacity: `${transitionProperties.opacity} ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  opacityFast: `${transitionProperties.opacity} ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  opacitySlow: `${transitionProperties.opacity} ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
  
  // Shadow transitions
  shadow: `${transitionProperties.shadow} ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  shadowFast: `${transitionProperties.shadow} ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  shadowSlow: `${transitionProperties.shadow} ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
  
  // Composite transitions
  composite: `${transitionProperties.composite} ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  compositeFast: `${transitionProperties.composite} ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  compositeSlow: `${transitionProperties.composite} ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
  
  // Size transitions
  size: `width ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}, height ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  sizeFast: `width ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}, height ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  sizeSlow: `width ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}, height ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
  
  // Position transitions
  position: `top ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}, right ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}, bottom ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}, left ${transitionDurations.normal} ${transitionTimingFunctions.easeInOut}`,
  positionFast: `top ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}, right ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}, bottom ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}, left ${transitionDurations.fast} ${transitionTimingFunctions.easeInOut}`,
  positionSlow: `top ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}, right ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}, bottom ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}, left ${transitionDurations.slow} ${transitionTimingFunctions.easeInOut}`,
};

// Component-specific transitions
export const componentTransitions = {
  // Button transitions
  button: transitions.colors,
  buttonHover: transitions.colorsFast,
  buttonActive: transitions.colorsFast,
  
  // Form element transitions
  input: transitions.colorsFast,
  inputFocus: transitions.colorsFast,
  checkbox: transitions.transformFast,
  
  // Interactive component transitions
  link: transitions.colorsFast,
  card: transitions.shadow,
  cardHover: transitions.shadowFast,
  
  // Navigation transitions
  tab: transitions.colorsFast,
  tabActive: transitions.colorsFast,
  
  // Dropdown transitions
  dropdown: transitions.composite,
  dropdownOpen: transitions.compositeFast,
  
  // Modal transitions
  modal: transitions.composite,
  modalOpen: transitions.compositeFast,
  
  // Tooltip transitions
  tooltip: transitions.opacity,
  tooltipShow: transitions.opacityFast,
  
  // Accordion transitions
  accordion: transitions.size,
  accordionExpand: transitions.sizeFast,
  
  // Toast transitions
  toast: transitions.composite,
  toastShow: transitions.compositeFast,
  
  // Drawer transitions
  drawer: transitions.transform,
  drawerOpen: transitions.transformFast,
  
  // Menu transitions
  menu: transitions.composite,
  menuOpen: transitions.compositeFast,
  
  // Popover transitions
  popover: transitions.composite,
  popoverOpen: transitions.compositeFast,
};

// Transition mixins (can be used in styled-components or other CSS-in-JS libraries)
export const transitionMixins = {
  // Default transition
  transition: `
    transition: ${transitions.all};
  `,
  
  // Color transition
  colorTransition: `
    transition: ${transitions.colors};
  `,
  
  // Transform transition
  transformTransition: `
    transition: ${transitions.transform};
  `,
  
  // Opacity transition
  opacityTransition: `
    transition: ${transitions.opacity};
  `,
  
  // Shadow transition
  shadowTransition: `
    transition: ${transitions.shadow};
  `,
  
  // Size transition
  sizeTransition: `
    transition: ${transitions.size};
  `,
  
  // Position transition
  positionTransition: `
    transition: ${transitions.position};
  `,
};

// Utility function to get transition for a component
export const getTransition = (component) => {
  if (componentTransitions[component]) {
    return componentTransitions[component];
  }
  
  console.warn(`Transition for component "${component}" not found. Using default transition.`);
  return transitions.all;
};

export default {
  transitionProperties,
  transitionDurations,
  transitionTimingFunctions,
  transitionDelays,
  transitions,
  componentTransitions,
  transitionMixins,
  getTransition,
};
