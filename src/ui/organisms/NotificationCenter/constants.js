/**
 * NotificationCenter Component Constants
 * 
 * This file contains all the constants used by the NotificationCenter component.
 */

// NotificationCenter variants
export const NOTIFICATION_CENTER_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  EXPANDED: 'expanded',
  INLINE: 'inline',
  DROPDOWN: 'dropdown',
};

// NotificationCenter sizes
export const NOTIFICATION_CENTER_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// NotificationCenter modifiers
export const NOTIFICATION_CENTER_MODIFIERS = {
  WITH_BORDER: 'with-border',
  WITH_SHADOW: 'with-shadow',
  WITH_HEADER: 'with-header',
  WITH_FOOTER: 'with-footer',
  WITH_FILTERS: 'with-filters',
  WITH_SEARCH: 'with-search',
  WITH_ACTIONS: 'with-actions',
  WITH_COUNTER: 'with-counter',
  WITH_GROUPS: 'with-groups',
  WITH_TABS: 'with-tabs',
};

// NotificationCenter sections
export const NOTIFICATION_CENTER_SECTIONS = {
  HEADER: 'header',
  FILTERS: 'filters',
  SEARCH: 'search',
  LIST: 'list',
  ITEM: 'item',
  EMPTY: 'empty',
  LOADING: 'loading',
  ERROR: 'error',
  FOOTER: 'footer',
};

// NotificationCenter item types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  SYSTEM: 'system',
  MESSAGE: 'message',
  ACTIVITY: 'activity',
  ALERT: 'alert',
  REMINDER: 'reminder',
  UPDATE: 'update',
};

// NotificationCenter item states
export const NOTIFICATION_STATES = {
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived',
  PINNED: 'pinned',
  DISMISSED: 'dismissed',
};

// NotificationCenter filter types
export const NOTIFICATION_FILTER_TYPES = {
  ALL: 'all',
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived',
  PINNED: 'pinned',
  TYPE: 'type',
  DATE: 'date',
  PRIORITY: 'priority',
};

// NotificationCenter sort types
export const NOTIFICATION_SORT_TYPES = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRIORITY: 'priority',
  TYPE: 'type',
};

// NotificationCenter ARIA attributes
export const NOTIFICATION_CENTER_ARIA = {
  ROLE: 'region',
  LABEL: 'notification center',
  ITEM_ROLE: 'listitem',
  LIST_ROLE: 'list',
};

// NotificationCenter data attributes
export const NOTIFICATION_CENTER_DATA_ATTRIBUTES = {
  VARIANT: 'data-variant',
  SIZE: 'data-size',
  UNREAD_COUNT: 'data-unread-count',
  TOTAL_COUNT: 'data-total-count',
};

// NotificationCenter class names
export const NOTIFICATION_CENTER_CLASS_NAMES = {
  ROOT: 'ui-notification-center',
  CONTAINER: 'ui-notification-center__container',
  HEADER: 'ui-notification-center__header',
  TITLE: 'ui-notification-center__title',
  COUNTER: 'ui-notification-center__counter',
  FILTERS: 'ui-notification-center__filters',
  FILTER: 'ui-notification-center__filter',
  FILTER_BUTTON: 'ui-notification-center__filter-button',
  SEARCH: 'ui-notification-center__search',
  SEARCH_INPUT: 'ui-notification-center__search-input',
  TABS: 'ui-notification-center__tabs',
  TAB: 'ui-notification-center__tab',
  LIST: 'ui-notification-center__list',
  GROUP: 'ui-notification-center__group',
  GROUP_TITLE: 'ui-notification-center__group-title',
  ITEM: 'ui-notification-center__item',
  ITEM_ICON: 'ui-notification-center__item-icon',
  ITEM_CONTENT: 'ui-notification-center__item-content',
  ITEM_TITLE: 'ui-notification-center__item-title',
  ITEM_MESSAGE: 'ui-notification-center__item-message',
  ITEM_META: 'ui-notification-center__item-meta',
  ITEM_TIME: 'ui-notification-center__item-time',
  ITEM_ACTIONS: 'ui-notification-center__item-actions',
  ITEM_ACTION: 'ui-notification-center__item-action',
  EMPTY: 'ui-notification-center__empty',
  EMPTY_ICON: 'ui-notification-center__empty-icon',
  EMPTY_TITLE: 'ui-notification-center__empty-title',
  EMPTY_MESSAGE: 'ui-notification-center__empty-message',
  LOADING: 'ui-notification-center__loading',
  ERROR: 'ui-notification-center__error',
  FOOTER: 'ui-notification-center__footer',
  ACTIONS: 'ui-notification-center__actions',
  ACTION: 'ui-notification-center__action',
};

// Default props
export const NOTIFICATION_CENTER_DEFAULT_PROPS = {
  variant: NOTIFICATION_CENTER_VARIANTS.DEFAULT,
  size: NOTIFICATION_CENTER_SIZES.MEDIUM,
  withBorder: true,
  withShadow: false,
  withHeader: true,
  withFooter: true,
  withFilters: false,
  withSearch: false,
  withActions: true,
  withCounter: true,
  withGroups: false,
  withTabs: false,
  defaultFilter: NOTIFICATION_FILTER_TYPES.ALL,
  defaultSort: NOTIFICATION_SORT_TYPES.NEWEST,
  maxItems: 50,
  loadingText: 'Loading notifications...',
  emptyText: 'No notifications',
  errorText: 'Failed to load notifications',
  title: 'Notifications',
  markAllAsReadText: 'Mark all as read',
  clearAllText: 'Clear all',
  viewAllText: 'View all',
};
