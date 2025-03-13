/**
 * Wizard Component Constants
 * 
 * This file contains all the constants used by the Wizard component.
 */

// Wizard variants
export const WIZARD_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  COMPACT: 'compact',
  VERTICAL: 'vertical',
};

// Wizard sizes
export const WIZARD_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Wizard modifiers
export const WIZARD_MODIFIERS = {
  WITH_BORDER: 'with-border',
  WITH_SHADOW: 'with-shadow',
  WITH_PROGRESS_BAR: 'with-progress-bar',
  WITH_STEP_NUMBERS: 'with-step-numbers',
  WITH_STEP_ICONS: 'with-step-icons',
  WITH_NAVIGATION: 'with-navigation',
  WITH_SUMMARY: 'with-summary',
};

// Wizard navigation types
export const WIZARD_NAVIGATION_TYPES = {
  BUTTONS: 'buttons',
  TABS: 'tabs',
  DOTS: 'dots',
  PROGRESS: 'progress',
};

// Wizard step states
export const WIZARD_STEP_STATES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PENDING: 'pending',
  ERROR: 'error',
  DISABLED: 'disabled',
};

// Wizard ARIA attributes
export const WIZARD_ARIA = {
  ROLE: 'region',
  LABEL: 'wizard',
  STEP_ROLE: 'tabpanel',
  NAVIGATION_ROLE: 'tablist',
};

// Wizard data attributes
export const WIZARD_DATA_ATTRIBUTES = {
  VARIANT: 'data-variant',
  SIZE: 'data-size',
  CURRENT_STEP: 'data-current-step',
  TOTAL_STEPS: 'data-total-steps',
};

// Wizard class names
export const WIZARD_CLASS_NAMES = {
  ROOT: 'ui-wizard',
  CONTAINER: 'ui-wizard__container',
  HEADER: 'ui-wizard__header',
  BODY: 'ui-wizard__body',
  FOOTER: 'ui-wizard__footer',
  NAVIGATION: 'ui-wizard__navigation',
  STEP: 'ui-wizard__step',
  STEP_TITLE: 'ui-wizard__step-title',
  STEP_CONTENT: 'ui-wizard__step-content',
  STEP_INDICATOR: 'ui-wizard__step-indicator',
  PROGRESS_BAR: 'ui-wizard__progress-bar',
  PROGRESS_INDICATOR: 'ui-wizard__progress-indicator',
  BUTTON_GROUP: 'ui-wizard__button-group',
  BUTTON_PREVIOUS: 'ui-wizard__button-previous',
  BUTTON_NEXT: 'ui-wizard__button-next',
  BUTTON_FINISH: 'ui-wizard__button-finish',
  BUTTON_CANCEL: 'ui-wizard__button-cancel',
  SUMMARY: 'ui-wizard__summary',
};

// Default props
export const WIZARD_DEFAULT_PROPS = {
  variant: WIZARD_VARIANTS.DEFAULT,
  size: WIZARD_SIZES.MEDIUM,
  withBorder: true,
  withShadow: false,
  withProgressBar: true,
  withStepNumbers: true,
  withStepIcons: false,
  withNavigation: true,
  withSummary: false,
  navigationType: WIZARD_NAVIGATION_TYPES.BUTTONS,
  showPreviousButton: true,
  showNextButton: true,
  showCancelButton: true,
  showFinishButton: true,
  allowSkip: false,
  allowJumpToStep: true,
  validateOnNext: true,
  linear: true,
};
