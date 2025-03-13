/**
 * Layout Component Constants
 * 
 * This file contains all the constants used by the Layout component.
 */

// Layout variants
export const LAYOUT_VARIANTS = {
  DEFAULT: 'default',
  DASHBOARD: 'dashboard',
  ADMIN: 'admin',
  CONTENT: 'content',
  LANDING: 'landing',
};

// Layout sizes
export const LAYOUT_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  FULL: 'full',
};

// Layout areas
export const LAYOUT_AREAS = {
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  MAIN: 'main',
  FOOTER: 'footer',
  ASIDE: 'aside',
};

// Layout modifiers
export const LAYOUT_MODIFIERS = {
  WITH_SIDEBAR: 'with-sidebar',
  WITH_HEADER: 'with-header',
  WITH_FOOTER: 'with-footer',
  WITH_ASIDE: 'with-aside',
  FIXED_HEADER: 'fixed-header',
  FIXED_SIDEBAR: 'fixed-sidebar',
  FIXED_FOOTER: 'fixed-footer',
  STICKY_HEADER: 'sticky-header',
  STICKY_SIDEBAR: 'sticky-sidebar',
  STICKY_FOOTER: 'sticky-footer',
};

// Layout breakpoints
export const LAYOUT_BREAKPOINTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Layout ARIA attributes
export const LAYOUT_ARIA = {
  ROLE_MAIN: 'main',
  ROLE_BANNER: 'banner',
  ROLE_CONTENTINFO: 'contentinfo',
  ROLE_COMPLEMENTARY: 'complementary',
  ROLE_NAVIGATION: 'navigation',
};

// Layout data attributes
export const LAYOUT_DATA_ATTRIBUTES = {
  VARIANT: 'data-variant',
  SIZE: 'data-size',
  AREA: 'data-area',
};

// Layout class names
export const LAYOUT_CLASS_NAMES = {
  ROOT: 'ui-layout',
  HEADER: 'ui-layout__header',
  SIDEBAR: 'ui-layout__sidebar',
  MAIN: 'ui-layout__main',
  FOOTER: 'ui-layout__footer',
  ASIDE: 'ui-layout__aside',
  CONTENT: 'ui-layout__content',
  CONTAINER: 'ui-layout__container',
};

// Default props
export const LAYOUT_DEFAULT_PROPS = {
  variant: LAYOUT_VARIANTS.DEFAULT,
  size: LAYOUT_SIZES.MEDIUM,
  withHeader: true,
  withSidebar: false,
  withFooter: true,
  withAside: false,
  fixedHeader: false,
  fixedSidebar: false,
  fixedFooter: false,
  stickyHeader: false,
  stickySidebar: false,
  stickyFooter: false,
  sidebarPosition: 'left',
  asidePosition: 'right',
  breakpoint: LAYOUT_BREAKPOINTS.MD,
};
