/**
 * Navigation Component Constants
 * 
 * This file contains constants used by the Navigation component.
 */

/**
 * Navigation variants
 */
export const NAVIGATION_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TRANSPARENT: 'transparent',
  MINIMAL: 'minimal'
};

/**
 * Navigation sizes
 */
export const NAVIGATION_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

/**
 * Navigation positions
 */
export const NAVIGATION_POSITIONS = {
  STATIC: 'static',
  FIXED_TOP: 'fixed-top',
  FIXED_BOTTOM: 'fixed-bottom',
  STICKY_TOP: 'sticky-top'
};

/**
 * Navigation alignments
 */
export const NAVIGATION_ALIGNMENTS = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  SPACE_BETWEEN: 'space-between',
  SPACE_AROUND: 'space-around'
};

/**
 * Navigation modifiers
 */
export const NAVIGATION_MODIFIERS = {
  WITH_SHADOW: 'with-shadow',
  WITH_BORDER: 'with-border',
  SCROLLED: 'scrolled',
  COLLAPSIBLE: 'collapsible',
  EXPANDED: 'expanded'
};

/**
 * Navigation breakpoints
 */
export const NAVIGATION_BREAKPOINTS = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
};

/**
 * Navigation item states
 */
export const NAVIGATION_ITEM_STATES = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
  DROPDOWN: 'dropdown'
};

/**
 * Navigation aria attributes
 */
export const NAVIGATION_ARIA = {
  EXPANDED: 'aria-expanded',
  CONTROLS: 'aria-controls',
  LABEL: 'aria-label',
  CURRENT: 'aria-current',
  HASPOPUP: 'aria-haspopup',
  HIDDEN: 'aria-hidden'
};

/**
 * Navigation data attributes
 */
export const NAVIGATION_DATA_ATTRIBUTES = {
  TOGGLE: 'data-toggle',
  TARGET: 'data-target',
  COLLAPSE: 'data-collapse',
  EXPANDED: 'data-expanded'
};

/**
 * Navigation class name prefixes
 */
export const NAVIGATION_CLASS_NAMES = {
  ROOT: 'ui-navigation',
  CONTAINER: 'ui-navigation-container',
  BRAND: 'ui-navigation-brand',
  ITEMS: 'ui-navigation-items',
  ITEM: 'ui-navigation-item',
  LINK: 'ui-navigation-link',
  DROPDOWN: 'ui-navigation-dropdown',
  DROPDOWN_MENU: 'ui-navigation-dropdown-menu',
  DROPDOWN_ITEM: 'ui-navigation-dropdown-item',
  TOGGLE: 'ui-navigation-toggle',
  COLLAPSE: 'ui-navigation-collapse',
  ACTIONS: 'ui-navigation-actions',
  SEARCH: 'ui-navigation-search',
  USER: 'ui-navigation-user'
};

/**
 * Navigation default props
 */
export const NAVIGATION_DEFAULT_PROPS = {
  variant: NAVIGATION_VARIANTS.DEFAULT,
  size: NAVIGATION_SIZES.MEDIUM,
  position: NAVIGATION_POSITIONS.STATIC,
  alignment: NAVIGATION_ALIGNMENTS.SPACE_BETWEEN,
  breakpoint: NAVIGATION_BREAKPOINTS.MD,
  expanded: false,
  collapsible: false,
  withShadow: false,
  withBorder: true,
  transparent: false,
  fixed: false,
  sticky: false
};
