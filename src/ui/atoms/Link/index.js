/**
 * Link Component
 * 
 * A versatile link component that can be used for navigation or as an action trigger.
 * This component supports various visual styles and behaviors.
 */

export { default } from './Link';

// Export Link modifiers for external use
export const LINK_MODIFIERS = {
  // Variant modifiers
  VARIANT_DEFAULT: 'default',
  VARIANT_BUTTON: 'button',
  VARIANT_TEXT: 'text',
  VARIANT_NAV: 'nav',
  VARIANT_BREADCRUMB: 'breadcrumb',
  
  // Size modifiers
  SIZE_SM: 'sm',
  SIZE_MD: 'md',
  SIZE_LG: 'lg',
  
  // State modifiers
  UNDERLINE: 'underline',
  DISABLED: 'disabled',
  EXTERNAL: 'external',
  
  // Community-specific modifiers
  COMMUNITY: 'community',
  ACTIVITY: 'activity',
  MILESTONE: 'milestone',
};

// Export Link variants
export const LINK_VARIANTS = {
  DEFAULT: 'default',
  BUTTON: 'button',
  TEXT: 'text',
  NAV: 'nav',
  BREADCRUMB: 'breadcrumb',
};

// Export Link sizes
export const LINK_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

// Export Link CSS class for external use
export const LINK_CLASS = 'ui-link';
