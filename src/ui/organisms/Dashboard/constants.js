/**
 * Dashboard Component Constants
 * 
 * This file contains constants used by the Dashboard component.
 */

// Dashboard variants
export const DASHBOARD_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  EXPANDED: 'expanded',
  GRID: 'grid',
  LIST: 'list'
};

// Dashboard sizes
export const DASHBOARD_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full'
};

// Dashboard layouts
export const DASHBOARD_LAYOUTS = {
  FIXED: 'fixed',
  FLUID: 'fluid',
  RESPONSIVE: 'responsive',
  CUSTOM: 'custom'
};

// Dashboard sections
export const DASHBOARD_SECTIONS = {
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  MAIN: 'main',
  WIDGETS: 'widgets',
  FOOTER: 'footer'
};

// Dashboard widget types
export const WIDGET_TYPES = {
  METRIC: 'metric',
  CHART: 'chart',
  TABLE: 'table',
  LIST: 'list',
  CALENDAR: 'calendar',
  ACTIVITY: 'activity',
  NOTIFICATION: 'notification',
  CUSTOM: 'custom'
};

// Dashboard default props
export const DASHBOARD_DEFAULT_PROPS = {
  variant: DASHBOARD_VARIANTS.DEFAULT,
  size: DASHBOARD_SIZES.MD,
  layout: DASHBOARD_LAYOUTS.RESPONSIVE,
  withHeader: true,
  withSidebar: true,
  withFooter: true,
  withBorder: true,
  withShadow: true,
  withPadding: true,
  withGap: true,
  withBackground: true,
  loading: false,
  error: null
};

// CSS class prefix for the component
export const DASHBOARD_CLASS_PREFIX = 'ui-dashboard';

// Dashboard component display name
export const DASHBOARD_DISPLAY_NAME = 'Dashboard';
