/**
 * Breadcrumb Component Constants
 * 
 * This file contains constants used by the Breadcrumb component.
 */

// Breadcrumb variants
export const BREADCRUMB_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  EXPANDED: 'expanded',
};

// Breadcrumb sizes
export const BREADCRUMB_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Breadcrumb separator types
export const BREADCRUMB_SEPARATOR_TYPES = {
  SLASH: 'slash',
  CHEVRON: 'chevron',
  ARROW: 'arrow',
  DOT: 'dot',
  CUSTOM: 'custom',
};

// Default props
export const DEFAULT_PROPS = {
  variant: BREADCRUMB_VARIANTS.DEFAULT,
  size: BREADCRUMB_SIZES.MEDIUM,
  separatorType: BREADCRUMB_SEPARATOR_TYPES.SLASH,
  maxItems: 0, // 0 means show all items
  collapsedLabel: '...',
  showHomeIcon: true,
  homeIconName: 'home',
  homeLabel: 'Home',
  lastItemClickable: false,
};
