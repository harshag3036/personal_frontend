/**
 * Form Component
 * 
 * A compound component for creating forms with consistent styling and behavior.
 * Uses the compound component pattern to provide a more intuitive API.
 */

export { default, useFormContext } from './Form';

// Re-export constants from constants.js
export {
  FORM_CLASS,
  FORM_GROUP_CLASS,
  FORM_LABEL_CLASS,
  FORM_CONTROL_CLASS,
  FORM_FEEDBACK_CLASS,
  FORM_TEXT_CLASS,
  FORM_SUBMIT_CLASS,
  FORM_REQUIRED_CLASS,
  FORM_VARIANTS,
  FORM_SIZES,
  FORM_FEEDBACK_TYPES,
  FORM_MODIFIERS
} from './constants';
