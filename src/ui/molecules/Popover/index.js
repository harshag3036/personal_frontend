import Popover, { usePopover } from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';

// Export popover variants as constants
export const POPOVER_VARIANTS = {
  DEFAULT: 'default',
  LIGHT: 'light',
  DARK: 'dark',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Export popover sizes as constants
export const POPOVER_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Export popover placements as constants
export const POPOVER_PLACEMENTS = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
};

// Export components
export { Popover, PopoverTrigger, PopoverContent, usePopover };

// Default export
export default Popover;
