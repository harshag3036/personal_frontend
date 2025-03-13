/**
 * Sidebar Component Constants
 * 
 * This file contains all the constants used by the Sidebar component.
 */

// Sidebar variants
export const SIDEBAR_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
};

// Sidebar sizes
export const SIDEBAR_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Sidebar positions
export const SIDEBAR_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};

// Sidebar widths
export const SIDEBAR_WIDTHS = {
  NARROW: 'narrow',
  MEDIUM: 'medium',
  WIDE: 'wide',
  CUSTOM: 'custom',
};

// Sidebar states
export const SIDEBAR_STATES = {
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed',
  HIDDEN: 'hidden',
};

// Sidebar modifiers
export const SIDEBAR_MODIFIERS = {
  WITH_SHADOW: 'with-shadow',
  WITH_BORDER: 'with-border',
  WITH_BACKDROP: 'with-backdrop',
  FIXED: 'fixed',
  STICKY: 'sticky',
  OVERLAY: 'overlay',
  PUSH_CONTENT: 'push-content',
};

// Sidebar breakpoints
export const SIDEBAR_BREAKPOINTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Sidebar section types
export const SIDEBAR_SECTION_TYPES = {
  HEADER: 'header',
  CONTENT: 'content',
  FOOTER: 'footer',
};

// Sidebar item states
export const SIDEBAR_ITEM_STATES = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed',
};

// Sidebar ARIA attributes
export const SIDEBAR_ARIA = {
  ROLE: 'complementary',
  LABEL: 'sidebar',
  EXPANDED: 'aria-expanded',
  CONTROLS: 'aria-controls',
  HIDDEN: 'aria-hidden',
  LABELLEDBY: 'aria-labelledby',
};

// Sidebar data attributes
export const SIDEBAR_DATA_ATTRIBUTES = {
  STATE: 'data-state',
  POSITION: 'data-position',
  VARIANT: 'data-variant',
  SIZE: 'data-size',
  WIDTH: 'data-width',
};

// Sidebar class names
export const SIDEBAR_CLASS_NAMES = {
  ROOT: 'ui-sidebar',
  HEADER: 'ui-sidebar__header',
  CONTENT: 'ui-sidebar__content',
  FOOTER: 'ui-sidebar__footer',
  TOGGLE: 'ui-sidebar__toggle',
  BACKDROP: 'ui-sidebar__backdrop',
  ITEM: 'ui-sidebar__item',
  ITEM_ICON: 'ui-sidebar__item-icon',
  ITEM_TEXT: 'ui-sidebar__item-text',
  ITEM_BADGE: 'ui-sidebar__item-badge',
  GROUP: 'ui-sidebar__group',
  GROUP_TITLE: 'ui-sidebar__group-title',
  DIVIDER: 'ui-sidebar__divider',
  SECTION: 'ui-sidebar__section',
};

// Default props
export const SIDEBAR_DEFAULT_PROPS = {
  variant: SIDEBAR_VARIANTS.DEFAULT,
  size: SIDEBAR_SIZES.MEDIUM,
  position: SIDEBAR_POSITIONS.LEFT,
  width: SIDEBAR_WIDTHS.MEDIUM,
  state: SIDEBAR_STATES.EXPANDED,
  collapsible: true,
  withShadow: false,
  withBorder: true,
  withBackdrop: false,
  fixed: false,
  sticky: false,
  overlay: false,
  pushContent: false,
  breakpoint: SIDEBAR_BREAKPOINTS.MD,
};
