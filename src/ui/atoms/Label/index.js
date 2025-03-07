/**
 * Label Component
 * 
 * A versatile label component that can be used for form fields, tags, or other labeling needs.
 * This component supports various visual styles and behaviors.
 */

export { default } from './Label';

// Export Label modifiers for external use
export const LABEL_MODIFIERS = {
  // Variant modifiers
  VARIANT_DEFAULT: 'default',
  VARIANT_FLOATING: 'floating',
  VARIANT_INLINE: 'inline',
  VARIANT_TAG: 'tag',
  VARIANT_BADGE: 'badge',
  
  // Size modifiers
  SIZE_SM: 'sm',
  SIZE_MD: 'md',
  SIZE_LG: 'lg',
  
  // State modifiers
  REQUIRED: 'required',
  DISABLED: 'disabled',
  
  // Community-specific modifiers
  COMMUNITY: 'community',
  ACTIVITY: 'activity',
  MILESTONE: 'milestone',
};

// Export Label variants
export const LABEL_VARIANTS = {
  DEFAULT: 'default',
  FLOATING: 'floating',
  INLINE: 'inline',
  TAG: 'tag',
  BADGE: 'badge',
};

// Export Label sizes
export const LABEL_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

// Export Label CSS class for external use
export const LABEL_CLASS = 'ui-label';
