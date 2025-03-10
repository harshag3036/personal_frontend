/**
 * SearchInput Component Constants
 */

// SearchInput variants
export const SEARCH_INPUT_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
  MINIMAL: 'minimal',
};

// SearchInput sizes
export const SEARCH_INPUT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Default props
export const DEFAULT_PROPS = {
  variant: SEARCH_INPUT_VARIANTS.DEFAULT,
  size: SEARCH_INPUT_SIZES.MEDIUM,
  placeholder: 'Search...',
  clearable: true,
  disabled: false,
  autoFocus: false,
  debounceTime: 300,
};
