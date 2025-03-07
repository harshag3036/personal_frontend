/**
 * Z-index tokens for the UI library
 * 
 * This file defines all z-index-related design tokens to ensure consistent
 * stacking order across the application. Using a standardized z-index scale
 * helps prevent z-index wars and makes it easier to reason about element stacking.
 */

// Base z-index values
// Using a scale with large gaps between values to allow for component-specific adjustments
export const zIndices = {
  hide: -1,       // Below the content, hidden but still accessible
  base: 0,        // Default z-index
  raised: 1,      // Slightly raised above the base content
  dropdown: 1000, // Dropdown menus, select menus
  sticky: 1100,   // Sticky elements like headers, footers
  overlay: 1200,  // Overlays, backdrops
  modal: 1300,    // Modal dialogs
  popover: 1400,  // Popovers, tooltips
  toast: 1500,    // Toast notifications
  skipLink: 1600, // Skip links (accessibility)
  loader: 1700,   // Full-screen loaders
  alert: 1800,    // Critical alerts
  max: 9999,      // Maximum z-index for special cases
};

// Component-specific z-indices
// These reference the base z-index values and can include small offsets
export const componentZIndices = {
  // Navigation components
  header: zIndices.sticky,
  footer: zIndices.sticky,
  sidebar: zIndices.sticky + 10,
  navbar: zIndices.sticky + 20,
  
  // Interactive components
  button: zIndices.base,
  buttonHover: zIndices.raised,
  
  // Dropdown components
  select: zIndices.dropdown,
  selectOptions: zIndices.dropdown + 10,
  dropdown: zIndices.dropdown,
  dropdownMenu: zIndices.dropdown + 10,
  autocomplete: zIndices.dropdown + 20,
  
  // Overlay components
  modalBackdrop: zIndices.overlay,
  modalContent: zIndices.modal,
  drawer: zIndices.modal + 10,
  
  // Floating components
  tooltip: zIndices.popover,
  popover: zIndices.popover + 10,
  
  // Notification components
  toast: zIndices.toast,
  snackbar: zIndices.toast + 10,
  
  // Utility components
  skipLink: zIndices.skipLink,
  loader: zIndices.loader,
  progressBar: zIndices.sticky + 50,
  
  // Critical components
  alert: zIndices.alert,
  
  // Form components
  formElements: zIndices.base,
  formElementsFocus: zIndices.raised,
  
  // Table components
  tableHeader: zIndices.sticky + 5,
  tableFooter: zIndices.sticky + 5,
  
  // Tabs components
  tabList: zIndices.sticky + 5,
};

// Z-index stacking contexts
// These represent groups of components that should be stacked together
export const stackingContexts = {
  // Base content
  content: [
    'formElements',
    'button',
    'tableCell',
  ],
  
  // Raised content
  raised: [
    'formElementsFocus',
    'buttonHover',
  ],
  
  // Navigation
  navigation: [
    'header',
    'footer',
    'sidebar',
    'navbar',
    'tabList',
    'tableHeader',
    'tableFooter',
    'progressBar',
  ],
  
  // Dropdowns
  dropdowns: [
    'select',
    'selectOptions',
    'dropdown',
    'dropdownMenu',
    'autocomplete',
  ],
  
  // Overlays
  overlays: [
    'modalBackdrop',
    'modalContent',
    'drawer',
  ],
  
  // Floating elements
  floating: [
    'tooltip',
    'popover',
  ],
  
  // Notifications
  notifications: [
    'toast',
    'snackbar',
  ],
  
  // Utilities
  utilities: [
    'skipLink',
    'loader',
  ],
  
  // Critical
  critical: [
    'alert',
  ],
};

// Helper function to get a z-index value
export const getZIndex = (key) => {
  if (componentZIndices[key]) {
    return componentZIndices[key];
  }
  
  if (zIndices[key]) {
    return zIndices[key];
  }
  
  console.warn(`Z-index key "${key}" not found. Using base z-index.`);
  return zIndices.base;
};

export default {
  zIndices,
  componentZIndices,
  stackingContexts,
  getZIndex,
};
