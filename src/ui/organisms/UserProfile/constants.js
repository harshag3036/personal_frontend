/**
 * UserProfile Component Constants
 * 
 * This file contains all the constants used by the UserProfile component.
 */

// UserProfile variants
export const USER_PROFILE_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  EXPANDED: 'expanded',
  CARD: 'card',
  INLINE: 'inline',
};

// UserProfile sizes
export const USER_PROFILE_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// UserProfile modifiers
export const USER_PROFILE_MODIFIERS = {
  WITH_BORDER: 'with-border',
  WITH_SHADOW: 'with-shadow',
  WITH_HEADER: 'with-header',
  WITH_FOOTER: 'with-footer',
  WITH_AVATAR: 'with-avatar',
  WITH_COVER: 'with-cover',
  WITH_STATS: 'with-stats',
  WITH_BIO: 'with-bio',
  WITH_CONTACT: 'with-contact',
  WITH_SOCIAL: 'with-social',
  WITH_ACTIONS: 'with-actions',
  WITH_BADGES: 'with-badges',
  WITH_TABS: 'with-tabs',
};

// UserProfile sections
export const USER_PROFILE_SECTIONS = {
  HEADER: 'header',
  AVATAR: 'avatar',
  COVER: 'cover',
  INFO: 'info',
  BIO: 'bio',
  STATS: 'stats',
  CONTACT: 'contact',
  SOCIAL: 'social',
  ACTIONS: 'actions',
  BADGES: 'badges',
  TABS: 'tabs',
  CONTENT: 'content',
  FOOTER: 'footer',
};

// UserProfile ARIA attributes
export const USER_PROFILE_ARIA = {
  ROLE: 'region',
  LABEL: 'user profile',
};

// UserProfile data attributes
export const USER_PROFILE_DATA_ATTRIBUTES = {
  VARIANT: 'data-variant',
  SIZE: 'data-size',
};

// UserProfile class names
export const USER_PROFILE_CLASS_NAMES = {
  ROOT: 'ui-user-profile',
  CONTAINER: 'ui-user-profile__container',
  HEADER: 'ui-user-profile__header',
  AVATAR: 'ui-user-profile__avatar',
  COVER: 'ui-user-profile__cover',
  INFO: 'ui-user-profile__info',
  NAME: 'ui-user-profile__name',
  USERNAME: 'ui-user-profile__username',
  TITLE: 'ui-user-profile__title',
  BIO: 'ui-user-profile__bio',
  STATS: 'ui-user-profile__stats',
  STAT: 'ui-user-profile__stat',
  STAT_LABEL: 'ui-user-profile__stat-label',
  STAT_VALUE: 'ui-user-profile__stat-value',
  CONTACT: 'ui-user-profile__contact',
  CONTACT_ITEM: 'ui-user-profile__contact-item',
  SOCIAL: 'ui-user-profile__social',
  SOCIAL_ITEM: 'ui-user-profile__social-item',
  ACTIONS: 'ui-user-profile__actions',
  ACTION: 'ui-user-profile__action',
  BADGES: 'ui-user-profile__badges',
  BADGE: 'ui-user-profile__badge',
  TABS: 'ui-user-profile__tabs',
  TAB: 'ui-user-profile__tab',
  CONTENT: 'ui-user-profile__content',
  FOOTER: 'ui-user-profile__footer',
};

// Default props
export const USER_PROFILE_DEFAULT_PROPS = {
  variant: USER_PROFILE_VARIANTS.DEFAULT,
  size: USER_PROFILE_SIZES.MEDIUM,
  withBorder: true,
  withShadow: false,
  withHeader: true,
  withFooter: false,
  withAvatar: true,
  withCover: false,
  withStats: true,
  withBio: true,
  withContact: true,
  withSocial: true,
  withActions: true,
  withBadges: false,
  withTabs: false,
};
