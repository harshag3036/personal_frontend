/**
 * MetricCard Component Constants
 * 
 * This file contains constants used by the MetricCard component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// Export MetricCard CSS class for external use
export const METRIC_CARD_CLASS = 'ui-metric-card';

// Export MetricCard variants for external use
export const METRIC_CARD_VARIANTS = {
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  OUTLINED: 'outlined',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
};

// Export MetricCard sizes for external use
export const METRIC_CARD_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Export MetricCard modifiers for external use
export const METRIC_CARD_MODIFIERS = {
  // Variant modifiers
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  OUTLINED: 'outlined',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Feature modifiers
  INTERACTIVE: 'interactive',
  FULL_WIDTH: 'full-width',
  WITH_ICON: 'with-icon',
  WITH_TREND: 'with-trend',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Export breakpoints from responsive-props utility
export const METRIC_CARD_BREAKPOINTS = breakpoints;
