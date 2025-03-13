/**
 * Calendar Component Constants
 * 
 * This file defines constants used by the Calendar component.
 */

/**
 * Calendar view types
 */
export const CALENDAR_VIEW_TYPES = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  AGENDA: 'agenda',
};

/**
 * Calendar size variants
 */
export const CALENDAR_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Calendar visual variants
 */
export const CALENDAR_VARIANTS = {
  DEFAULT: 'default',
  BORDERED: 'bordered',
  CARD: 'card',
  MINIMAL: 'minimal',
};

/**
 * Calendar event display modes
 */
export const CALENDAR_EVENT_DISPLAY = {
  BLOCK: 'block',      // Events displayed as blocks
  DOT: 'dot',          // Events displayed as dots
  TEXT: 'text',        // Events displayed as text only
  CUSTOM: 'custom',    // Custom event rendering
};

/**
 * Calendar date selection modes
 */
export const CALENDAR_SELECTION_MODES = {
  NONE: 'none',        // No date selection
  SINGLE: 'single',    // Single date selection
  MULTIPLE: 'multiple', // Multiple date selection
  RANGE: 'range',      // Date range selection
};

/**
 * Calendar first day of week options
 */
export const CALENDAR_FIRST_DAY = {
  SUNDAY: 0,
  MONDAY: 1,
};

/**
 * Calendar modifiers for styling specific dates
 */
export const CALENDAR_MODIFIERS = {
  TODAY: 'today',
  SELECTED: 'selected',
  DISABLED: 'disabled',
  HIGHLIGHTED: 'highlighted',
  RANGE_START: 'range-start',
  RANGE_END: 'range-end',
  RANGE_MIDDLE: 'range-middle',
  WEEKEND: 'weekend',
  HAS_EVENTS: 'has-events',
};
