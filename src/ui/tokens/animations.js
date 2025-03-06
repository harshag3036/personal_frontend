/**
 * Animation Tokens
 * 
 * This file defines the animation tokens for the design system.
 * Animation tokens include durations, easing functions, and keyframes.
 */

/**
 * Animation Durations
 * 
 * Animation durations define how long an animation takes to complete.
 */
export const durations = {
  instant: '0ms',
  fastest: '100ms',
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
};

/**
 * Animation Easing Functions
 * 
 * Easing functions define the rate of change of an animation over time.
 */
export const easings = {
  // Standard easings
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier easings
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  
  // Spring-like easings
  spring: 'cubic-bezier(0.5, 0, 0.1, 1)',
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

/**
 * Animation Keyframes
 * 
 * Keyframes define the intermediate steps in an animation sequence.
 */
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
  
  slideInUp: `
    @keyframes slideInUp {
      from {
        transform: translateY(10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  
  slideInDown: `
    @keyframes slideInDown {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  
  slideInLeft: `
    @keyframes slideInLeft {
      from {
        transform: translateX(-10px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  
  slideInRight: `
    @keyframes slideInRight {
      from {
        transform: translateX(10px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `,
  
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  
  breathe: `
    @keyframes breathe {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
  `,
};

/**
 * Semantic Animations
 * 
 * Semantic animations provide meaningful names for common animation use cases.
 */
export const animations = {
  // Transition presets
  transition: {
    default: `${durations.normal} ${easings.standard}`,
    fast: `${durations.fast} ${easings.standard}`,
    slow: `${durations.slow} ${easings.standard}`,
    bounce: `${durations.normal} ${easings.bounce}`,
    spring: `${durations.normal} ${easings.spring}`,
  },
  
  // Animation presets
  animation: {
    fadeIn: `fadeIn ${durations.normal} ${easings.standard}`,
    fadeOut: `fadeOut ${durations.normal} ${easings.standard}`,
    slideInUp: `slideInUp ${durations.normal} ${easings.standard}`,
    slideInDown: `slideInDown ${durations.normal} ${easings.standard}`,
    slideInLeft: `slideInLeft ${durations.normal} ${easings.standard}`,
    slideInRight: `slideInRight ${durations.normal} ${easings.standard}`,
    pulse: `pulse ${durations.slow} ${easings.easeInOut} infinite`,
    spin: `spin ${durations.slowest} ${easings.linear} infinite`,
    breathe: `breathe 3s ${easings.easeInOut} infinite`,
  },
  
  // Component-specific animations
  button: {
    hover: `${durations.fast} ${easings.standard}`,
    active: `${durations.fastest} ${easings.standard}`,
  },
  
  card: {
    hover: `${durations.normal} ${easings.standard}`,
  },
  
  modal: {
    enter: `${durations.normal} ${easings.decelerate}`,
    exit: `${durations.fast} ${easings.accelerate}`,
  },
  
  tooltip: {
    enter: `${durations.fast} ${easings.standard}`,
    exit: `${durations.fastest} ${easings.standard}`,
  },
  
  // Durations and easings
  durations,
  easings,
  keyframes,
};

export default animations;
