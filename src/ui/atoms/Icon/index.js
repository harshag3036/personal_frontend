/**
 * Icon Component
 * 
 * A versatile icon component that supports various icon types, sizes, and colors.
 * This component can be used to display icons throughout the application.
 */

export { default } from './Icon';

// Export Icon modifiers for external use
export const ICON_MODIFIERS = {
  // Size modifiers
  SIZE_XS: 'size-xs',
  SIZE_SM: 'size-sm',
  SIZE_MD: 'size-md',
  SIZE_LG: 'size-lg',
  SIZE_XL: 'size-xl',
  
  // Animation modifiers
  ANIMATED: 'animated',
  SPIN: 'spin',
};

// Export common icon names
export const ICON_NAMES = {
  // General UI icons
  USER: 'user',
  HOME: 'home',
  SETTINGS: 'settings',
  MENU: 'menu',
  CLOSE: 'close',
  CHECK: 'check',
  STAR: 'star',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  SEARCH: 'search',
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'add',
  REMOVE: 'remove',
  CALENDAR: 'calendar',
  NOTIFICATION: 'notification',
  MESSAGE: 'message',
  SHARE: 'share',
  BOOKMARK: 'bookmark',
  
  // Community-specific icons
  ACTIVITY: 'activity',
  GROUP: 'group',
  MILESTONE: 'milestone',
  COMMENT: 'comment',
  TIMELINE: 'timeline',
  ANALYTICS: 'analytics',
  FEEDBACK: 'feedback',
  ARCHIVE: 'archive',
};

// Export Icon CSS class for external use
export const ICON_CLASS = 'ui-icon';
