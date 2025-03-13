/**
 * Footer Component Constants
 * 
 * This file contains all the constants used by the Footer component.
 */

// Footer variants
export const FOOTER_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
};

// Footer sizes
export const FOOTER_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Footer positions
export const FOOTER_POSITIONS = {
  STATIC: 'static',
  FIXED: 'fixed',
  STICKY: 'sticky',
  RELATIVE: 'relative',
};

// Footer modifiers
export const FOOTER_MODIFIERS = {
  WITH_BORDER: 'with-border',
  WITH_SHADOW: 'with-shadow',
  WITH_LOGO: 'with-logo',
  WITH_NAVIGATION: 'with-navigation',
  WITH_SOCIAL: 'with-social',
  WITH_COPYRIGHT: 'with-copyright',
  WITH_NEWSLETTER: 'with-newsletter',
  WITH_COLUMNS: 'with-columns',
};

// Footer breakpoints
export const FOOTER_BREAKPOINTS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Footer ARIA attributes
export const FOOTER_ARIA = {
  ROLE: 'contentinfo',
  LABEL: 'footer',
};

// Footer data attributes
export const FOOTER_DATA_ATTRIBUTES = {
  VARIANT: 'data-variant',
  SIZE: 'data-size',
  POSITION: 'data-position',
};

// Footer class names
export const FOOTER_CLASS_NAMES = {
  ROOT: 'ui-footer',
  CONTAINER: 'ui-footer__container',
  LOGO: 'ui-footer__logo',
  NAVIGATION: 'ui-footer__navigation',
  SOCIAL: 'ui-footer__social',
  COPYRIGHT: 'ui-footer__copyright',
  NEWSLETTER: 'ui-footer__newsletter',
  COLUMN: 'ui-footer__column',
  COLUMN_TITLE: 'ui-footer__column-title',
  COLUMN_CONTENT: 'ui-footer__column-content',
  BOTTOM: 'ui-footer__bottom',
};

// Default props
export const FOOTER_DEFAULT_PROPS = {
  variant: FOOTER_VARIANTS.DEFAULT,
  size: FOOTER_SIZES.MEDIUM,
  position: FOOTER_POSITIONS.STATIC,
  withBorder: true,
  withShadow: false,
  withLogo: true,
  withNavigation: true,
  withSocial: true,
  withCopyright: true,
  withNewsletter: false,
  withColumns: true,
  breakpoint: FOOTER_BREAKPOINTS.MD,
};
