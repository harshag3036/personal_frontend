/**
 * DatePicker Constants
 * 
 * This file contains all the constants used by the DatePicker component.
 */

// DatePicker variants
export const DATEPICKER_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  MINIMAL: 'minimal',
};

// DatePicker sizes
export const DATEPICKER_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// DatePicker formats
export const DATEPICKER_FORMATS = {
  SHORT: 'short', // MM/DD/YYYY
  MEDIUM: 'medium', // MMM DD, YYYY
  LONG: 'long', // MMMM DD, YYYY
  ISO: 'iso', // YYYY-MM-DD
};

// Default props for the DatePicker component
export const DEFAULT_PROPS = {
  variant: DATEPICKER_VARIANTS.PRIMARY,
  size: DATEPICKER_SIZES.MEDIUM,
  format: DATEPICKER_FORMATS.MEDIUM,
  placeholder: 'Select a date',
  disabled: false,
  readOnly: false,
  required: false,
  clearable: true,
  showTodayButton: true,
  showWeekNumbers: false,
  firstDayOfWeek: 0, // 0 = Sunday, 1 = Monday, etc.
  minDate: null,
  maxDate: null,
};

// CSS class prefix for the DatePicker component
export const CLASS_PREFIX = 'ui-datepicker';
