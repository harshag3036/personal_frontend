/**
 * Animation tokens for the UI library
 * 
 * This file defines all animation-related design tokens including:
 * - Animation durations
 * - Animation easing functions
 * - Animation keyframes
 * - Animation presets
 */

// Animation durations (in milliseconds)
export const durations = {
  instant: 0,
  fastest: 50,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 400,
  slowest: 500,
  
  // Semantic durations
  entrance: 250,
  exit: 200,
  complex: 400,
  emphasis: 150,
};

// Easing functions
export const easings = {
  // Standard easings
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier easings
  // Format: cubic-bezier(x1, y1, x2, y2)
  
  // Entrance easings (accelerate)
  easeInSine: 'cubic-bezier(0.12, 0, 0.39, 0)',
  easeInQuad: 'cubic-bezier(0.11, 0, 0.5, 0)',
  easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
  easeInQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
  easeInQuint: 'cubic-bezier(0.64, 0, 0.78, 0)',
  easeInExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
  easeInCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
  easeInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  
  // Exit easings (decelerate)
  easeOutSine: 'cubic-bezier(0.61, 1, 0.88, 1)',
  easeOutQuad: 'cubic-bezier(0.5, 1, 0.89, 1)',
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeOutCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  // Combined easings (accelerate and decelerate)
  easeInOutSine: 'cubic-bezier(0.37, 0, 0.63, 1)',
  easeInOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',
  easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
  easeInOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
};

// Animation keyframes
// These are defined as strings that can be used with CSS @keyframes
export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,
  
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  
  scaleOut: `
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.8); opacity: 0; }
    }
  `,
  
  slideInTop: `
    @keyframes slideInTop {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  
  slideOutTop: `
    @keyframes slideOutTop {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-20px); opacity: 0; }
    }
  `,
  
  slideInBottom: `
    @keyframes slideInBottom {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  
  slideOutBottom: `
    @keyframes slideOutBottom {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(20px); opacity: 0; }
    }
  `,
  
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  
  slideOutLeft: `
    @keyframes slideOutLeft {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(-20px); opacity: 0; }
    }
  `,
  
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  
  slideOutRight: `
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(20px); opacity: 0; }
    }
  `,
  
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `,
  
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `,
  
  bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
  `,
};

// Animation presets (combinations of duration, easing, and keyframes)
export const animations = {
  // Fade animations
  fadeIn: `fadeIn ${durations.normal}ms ${easings.easeOut}`,
  fadeOut: `fadeOut ${durations.normal}ms ${easings.easeIn}`,
  fadeInSlow: `fadeIn ${durations.slow}ms ${easings.easeOut}`,
  fadeOutSlow: `fadeOut ${durations.slow}ms ${easings.easeIn}`,
  
  // Scale animations
  scaleIn: `scaleIn ${durations.normal}ms ${easings.easeOutQuart}`,
  scaleOut: `scaleOut ${durations.normal}ms ${easings.easeInQuart}`,
  
  // Slide animations
  slideInTop: `slideInTop ${durations.normal}ms ${easings.easeOutQuint}`,
  slideOutTop: `slideOutTop ${durations.normal}ms ${easings.easeInQuint}`,
  slideInBottom: `slideInBottom ${durations.normal}ms ${easings.easeOutQuint}`,
  slideOutBottom: `slideOutBottom ${durations.normal}ms ${easings.easeInQuint}`,
  slideInLeft: `slideInLeft ${durations.normal}ms ${easings.easeOutQuint}`,
  slideOutLeft: `slideOutLeft ${durations.normal}ms ${easings.easeInQuint}`,
  slideInRight: `slideInRight ${durations.normal}ms ${easings.easeOutQuint}`,
  slideOutRight: `slideOutRight ${durations.normal}ms ${easings.easeInQuint}`,
  
  // Utility animations
  spin: `spin ${durations.slower}ms ${easings.linear} infinite`,
  pulse: `pulse ${durations.slow}ms ${easings.easeInOutCubic} infinite`,
  shake: `shake ${durations.normal}ms ${easings.easeInOut}`,
  bounce: `bounce ${durations.slow}ms ${easings.easeInOutQuad}`,
};

// Component-specific animation presets
export const componentAnimations = {
  // Button animations
  buttonHover: `all ${durations.fast}ms ${easings.easeOut}`,
  buttonActive: `all ${durations.fastest}ms ${easings.easeOut}`,
  
  // Form element animations
  inputFocus: `all ${durations.fast}ms ${easings.easeOut}`,
  checkboxToggle: `all ${durations.fast}ms ${easings.easeInOutBack}`,
  
  // Feedback animations
  loading: animations.spin,
  success: animations.pulse,
  error: animations.shake,
  
  // Component entrance/exit
  modalEnter: animations.scaleIn,
  modalExit: animations.scaleOut,
  drawerEnter: animations.slideInRight,
  drawerExit: animations.slideOutRight,
  tooltipEnter: animations.fadeIn,
  tooltipExit: animations.fadeOut,
  dropdownEnter: animations.slideInTop,
  dropdownExit: animations.slideOutTop,
  toastEnter: animations.slideInBottom,
  toastExit: animations.slideOutBottom,
  
  // Interactive animations
  accordionExpand: `all ${durations.normal}ms ${easings.easeOutCubic}`,
  tabSwitch: `all ${durations.fast}ms ${easings.easeInOut}`,
  pageTransition: `all ${durations.slow}ms ${easings.easeInOutQuart}`,
};

export default {
  durations,
  easings,
  keyframes,
  animations,
  componentAnimations,
};
