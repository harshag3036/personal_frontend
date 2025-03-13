/**
 * Header Component Constants
 * 
 * This file contains all the constants used by the Header component.
 */

// Header variants
export const HEADER_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TRANSPARENT: 'transparent',
  COMPACT: 'compact',
};

// Header sizes
export const HEADER_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Header positions
export const HEADER_POSITIONS = {
  STATIC: 'static',
  FIXED: 'fixed',
  STICKY: 'sticky',
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
};

// Header states
export const HEADER_STATES = {
  DEFAULT: 'default',
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed',
  HIDDEN: 'hidden',
};

// Header modifiers
export const HEADER_MODIFIERS = {
  WITH_BORDER: 'with-border',
  WITH_SHADOW: 'with-shadow',
  WITH_SEARCH: 'with-search',
  WITH_NOTIFICATIONS: 'with-notifications',
  WITH_USER_MENU: 'with-user-menu',
  WITH_LOGO: 'with-logo',
  WITH_NAVIGATION: 'with-navigation',
  WITH_ACTIONS: 'with-actions',
};

// Header breakpoints
export const HEADER_BREAKPOINTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Header ARIA attributes
export const HEADER_ARIA = {
  ROLE: 'banner',
  LABEL: 'header',
};

// Header data attributes
export const HEADER_DATA_ATTRIBUTES = {
  VARIANT: 'data-variant',
  SIZE: 'data-size',
  POSITION: 'data-position',
  STATE: 'data-state',
};

// Header class names
export const HEADER_CLASS_NAMES = {
  ROOT: 'ui-header',
  CONTAINER: 'ui-header__container',
  LOGO: 'ui-header__logo',
  NAVIGATION: 'ui-header__navigation',
  ACTIONS: 'ui-header__actions',
  SEARCH: 'ui-header__search',
  USER_MENU: 'ui-header__user-menu',
  NOTIFICATIONS: 'ui-header__notifications',
  MOBILE_TOGGLE: 'ui-header__mobile-toggle',
  MOBILE_MENU: 'ui-header__mobile-menu',
};

// Default props
export const HEADER_DEFAULT_PROPS = {
  variant: HEADER_VARIANTS.DEFAULT,
  size: HEADER_SIZES.MEDIUM,
  position: HEADER_POSITIONS.STATIC,
  state: HEADER_STATES.DEFAULT,
  withBorder: true,
  withShadow: false,
  withSearch: false,
  withNotifications: false,
  withUserMenu: false,
  withLogo: true,
  withNavigation: true,
  withActions: false,
  breakpoint: HEADER_BREAKPOINTS.MD,
};
