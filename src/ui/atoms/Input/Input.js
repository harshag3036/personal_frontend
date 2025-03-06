/**
 * Input Component
 * 
 * A customizable input component with support for variants and extensions.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Input.css';

// Input variants
export const INPUT_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Input sizes
export const INPUT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Input states
export const INPUT_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

/**
 * Input Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.variant=INPUT_VARIANTS.DEFAULT] - Input variant
 * @param {string} [props.size=INPUT_SIZES.MEDIUM] - Input size
 * @param {string} [props.state=INPUT_STATES.DEFAULT] - Input state
 * @param {string} [props.label] - Input label
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.errorText] - Error text (shown when state is ERROR)
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean} [props.fullWidth=false] - Whether the input should take full width
 * @param {React.ReactNode} [props.startIcon] - Icon to display at the start of the input
 * @param {React.ReactNode} [props.endIcon] - Icon to display at the end of the input
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the input
 * @returns {JSX.Element} Input component
 */
const Input = forwardRef(({
  type = 'text',
  variant = INPUT_VARIANTS.DEFAULT,
  size = INPUT_SIZES.MEDIUM,
  state = INPUT_STATES.DEFAULT,
  label,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  required = false,
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
  extensions = [],
  ...props
}, ref) => {
  // Error handling for invalid variants
  if (variant && !Object.values(INPUT_VARIANTS).includes(variant)) {
    console.warn(`Input: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = INPUT_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (size && !Object.values(INPUT_SIZES).includes(size)) {
    console.warn(`Input: Invalid size "${size}". Falling back to MEDIUM.`);
    size = INPUT_SIZES.MEDIUM;
  }

  // Error handling for invalid states
  if (state && !Object.values(INPUT_STATES).includes(state)) {
    console.warn(`Input: Invalid state "${state}". Falling back to DEFAULT.`);
    state = INPUT_STATES.DEFAULT;
  }

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Input', {
      type,
      variant,
      size,
      state,
      label,
      placeholder,
      helperText,
      errorText,
      disabled,
      required,
      fullWidth,
      startIcon,
      endIcon,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Input: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      type,
      variant,
      size,
      state,
      label,
      placeholder,
      helperText,
      errorText,
      disabled,
      required,
      fullWidth,
      startIcon,
      endIcon,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    type: extendedType,
    variant: extendedVariant,
    size: extendedSize,
    state: extendedState,
    label: extendedLabel,
    placeholder: extendedPlaceholder,
    helperText: extendedHelperText,
    errorText: extendedErrorText,
    disabled: extendedDisabled,
    required: extendedRequired,
    fullWidth: extendedFullWidth,
    startIcon: extendedStartIcon,
    endIcon: extendedEndIcon,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const inputWrapperClasses = [
    'ds-input-wrapper',
    `ds-input-${extendedVariant}`,
    `ds-input-${extendedSize}`,
    `ds-input-${extendedState}`,
    extendedDisabled ? 'ds-input-disabled' : '',
    extendedFullWidth ? 'ds-input-full-width' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Determine if we should show error text
  const showErrorText = extendedState === INPUT_STATES.ERROR && extendedErrorText;
  
  // Determine helper text to display
  const displayHelperText = showErrorText ? extendedErrorText : extendedHelperText;
  
  return (
    <div className={inputWrapperClasses}>
      {extendedLabel && (
        <label className="ds-input-label">
          {extendedLabel}
          {extendedRequired && <span className="ds-input-required">*</span>}
        </label>
      )}
      
      <div className="ds-input-container">
        {extendedStartIcon && (
          <div className="ds-input-icon ds-input-start-icon">
            {extendedStartIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={extendedType}
          className="ds-input"
          placeholder={extendedPlaceholder}
          disabled={extendedDisabled}
          required={extendedRequired}
          aria-invalid={extendedState === INPUT_STATES.ERROR}
          {...restProps}
        />
        
        {extendedEndIcon && (
          <div className="ds-input-icon ds-input-end-icon">
            {extendedEndIcon}
          </div>
        )}
      </div>
      
      {displayHelperText && (
        <div className={`ds-input-helper-text ${showErrorText ? 'ds-input-error-text' : ''}`}>
          {displayHelperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** Input type */
  type: PropTypes.string,
  /** Input variant */
  variant: PropTypes.oneOf(Object.values(INPUT_VARIANTS)),
  /** Input size */
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  /** Input state */
  state: PropTypes.oneOf(Object.values(INPUT_STATES)),
  /** Input label */
  label: PropTypes.string,
  /** Input placeholder */
  placeholder: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Error text (shown when state is ERROR) */
  errorText: PropTypes.string,
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  /** Whether the input is required */
  required: PropTypes.bool,
  /** Whether the input should take full width */
  fullWidth: PropTypes.bool,
  /** Icon to display at the start of the input */
  startIcon: PropTypes.node,
  /** Icon to display at the end of the input */
  endIcon: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the input */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Input;
