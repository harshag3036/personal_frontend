/**
 * StatusBadge Component Constants
 * 
 * This file contains constants used by the StatusBadge component.
 */

// Import breakpoints from responsive-props utility
import { breakpoints } from '../../utilities/responsive-props';

// StatusBadge CSS class for external use
export const STATUS_BADGE_CLASS = 'ui-status-badge';

// Status types for external use
export const STATUS_TYPES = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  ON_HOLD: 'on-hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Status definitions with metadata
export const STATUS_DEFINITIONS = {
  [STATUS_TYPES.NOT_STARTED]: {
    label: 'Not Started',
    description: 'Activity has been created but work has not begun',
    color: '#6c757d',
    variant: 'secondary',
    icon: 'clock',
    allowedTransitions: [STATUS_TYPES.IN_PROGRESS, STATUS_TYPES.CANCELLED]
  },
  [STATUS_TYPES.IN_PROGRESS]: {
    label: 'In Progress',
    description: 'Work on the activity is currently underway',
    color: '#007bff',
    variant: 'primary',
    icon: 'play',
    allowedTransitions: [STATUS_TYPES.COMPLETED, STATUS_TYPES.ON_HOLD, STATUS_TYPES.CANCELLED]
  },
  [STATUS_TYPES.ON_HOLD]: {
    label: 'On Hold',
    description: 'Activity is temporarily paused',
    color: '#ffc107',
    variant: 'warning',
    icon: 'pause',
    allowedTransitions: [STATUS_TYPES.IN_PROGRESS, STATUS_TYPES.CANCELLED]
  },
  [STATUS_TYPES.COMPLETED]: {
    label: 'Completed',
    description: 'All work on the activity has been finished',
    color: '#28a745',
    variant: 'success',
    icon: 'check',
    allowedTransitions: [STATUS_TYPES.IN_PROGRESS] // Can reopen if needed
  },
  [STATUS_TYPES.CANCELLED]: {
    label: 'Cancelled',
    description: 'Activity has been cancelled and will not be completed',
    color: '#dc3545',
    variant: 'error',
    icon: 'x',
    allowedTransitions: [STATUS_TYPES.IN_PROGRESS] // Can reopen if needed
  }
};

// StatusBadge sizes for external use
export const STATUS_BADGE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// StatusBadge modifiers for external use
export const STATUS_BADGE_MODIFIERS = {
  // Size modifiers
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  
  // Display modifiers
  WITH_ICON: 'with-icon',
  WITH_LABEL: 'with-label',
  WITH_DESCRIPTION: 'with-description',
  
  // Shape modifiers
  PILL: 'pill',
  SQUARE: 'square',
  
  // Interaction modifiers
  CLICKABLE: 'clickable',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
};

// Export breakpoints
export const STATUS_BADGE_BREAKPOINTS = breakpoints;
