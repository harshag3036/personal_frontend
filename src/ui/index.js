/**
 * UI Component Library
 * 
 * This file exports all UI components organized by category.
 */

// Export atoms (basic building blocks)
export * from './atoms';

// Export molecules (combinations of atoms)
export * from './molecules';

// Export organisms (complex components)
export * from './organisms';

// Export design tokens
export * from './tokens';

// Export themes
export * from './themes';

// Export utilities - use named imports to avoid conflicts with tokens
import * as utilityExports from './utilities';
// Re-export everything except breakpoints which would conflict with tokens.breakpoints
export const {
  cssVariables,
  componentExtension,
  toastService,
  useToast,
  responsiveProps,
  polymorphic,
  // Exclude breakpoints from utilities to avoid conflict with tokens
} = utilityExports;
// Re-export specific exports from responsive-props
export const {
  breakpointKeys,
  isResponsiveObject,
  getValueForBreakpoint,
  createResponsiveStyles,
  createResponsiveClassNames,
  createResponsiveVariantStyles,
  layoutPropConfig,
  flexPropConfig,
  gridPropConfig,
} = utilityExports;
// Re-export specific exports from polymorphic
export const {
  forwardRefWithAs,
} = utilityExports;

// Export examples
export * as Examples from './examples';

// Export documentation
export * as Docs from './docs';

// In the future, we can add more categories:
// export * from './templates';
