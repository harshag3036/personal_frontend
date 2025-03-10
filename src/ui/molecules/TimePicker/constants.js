/**
 * Constants for the TimePicker component
 */

export const CLASS_PREFIX = 'ui-timepicker';

export const TIMEPICKER_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  MINIMAL: 'minimal',
};

export const TIMEPICKER_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export const TIMEPICKER_FORMATS = {
  TWELVE_HOUR: '12h',
  TWENTY_FOUR_HOUR: '24h',
};

export const TIMEPICKER_STEP = {
  MINUTE: 1,
  FIVE_MINUTES: 5,
  FIFTEEN_MINUTES: 15,
  THIRTY_MINUTES: 30,
};

export const DEFAULT_PROPS = {
  variant: TIMEPICKER_VARIANTS.PRIMARY,
  size: TIMEPICKER_SIZES.MEDIUM,
  format: TIMEPICKER_FORMATS.TWELVE_HOUR,
  step: TIMEPICKER_STEP.FIFTEEN_MINUTES,
  disabled: false,
  readOnly: false,
  required: false,
  clearable: true,
  showSeconds: false,
  showMeridiem: true,
  placeholder: 'Select time',
  className: '',
  style: {},
};
