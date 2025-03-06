/**
 * Checkbox Component
 * 
 * A customizable checkbox component with support for variants and extensions.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Checkbox.css';

// Checkbox variants
export const CHECKBOX_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Checkbox sizes
export const CHECKBOX_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Checkbox states
export const CHECKBOX_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

/**
 * Checkbox Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Checkbox ID
 * @param {string} props.name - Checkbox name
 * @param {boolean} [props.checked=false] - Whether the checkbox is checked
 * @param {Function} [props.onChange] - Callback when checkbox state changes
 * @param {string} [props.label] - Checkbox label
 * @param {string} [props.variant=CHECKBOX_VARIANTS.DEFAULT] - Checkbox variant
 * @param {string} [props.size=CHECKBOX_SIZES.MEDIUM] - Checkbox size
 * @param {string} [props.state=CHECKBOX_STATES.DEFAULT] - Checkbox state
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.errorText] - Error text (shown when state is ERROR)
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {boolean} [props.required=false] - Whether the checkbox is required
 * @param {boolean} [props.indeterminate=false] - Whether the checkbox is in an indeterminate state
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the checkbox
 * @returns {JSX.Element} Checkbox component
 */
const Checkbox = forwardRef(({
  id,
  name,
  checked = false,
  onChange,
  label,
  variant = CHECKBOX_VARIANTS.DEFAULT,
  size = CHECKBOX_SIZES.MEDIUM,
  state = CHECKBOX_STATES.DEFAULT,
  helperText,
  errorText,
  disabled = false,
  required = false,
  indeterminate = false,
  className = '',
  extensions = [],
  ...props
}, ref) => {
  // Error handling for invalid variants
  if (variant && !Object.values(CHECKBOX_VARIANTS).includes(variant)) {
    console.warn(`Checkbox: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = CHECKBOX_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (size && !Object.values(CHECKBOX_SIZES).includes(size)) {
    console.warn(`Checkbox: Invalid size "${size}". Falling back to MEDIUM.`);
    size = CHECKBOX_SIZES.MEDIUM;
  }

  // Error handling for invalid states
  if (state && !Object.values(CHECKBOX_STATES).includes(state)) {
    console.warn(`Checkbox: Invalid state "${state}". Falling back to DEFAULT.`);
    state = CHECKBOX_STATES.DEFAULT;
  }

  // Handle checkbox change
  const handleChange = (event) => {
    if (disabled) return;
    
    if (onChange) {
      try {
        onChange(event);
      } catch (error) {
        console.error('Checkbox: Error in onChange handler:', error);
      }
    }
  };

  // Set indeterminate state on checkbox element
  const checkboxRef = React.useRef(null);
  const combinedRef = (element) => {
    checkboxRef.current = element;
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Checkbox', {
      id,
      name,
      checked,
      onChange: handleChange,
      label,
      variant,
      size,
      state,
      helperText,
      errorText,
      disabled,
      required,
      indeterminate,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Checkbox: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      id,
      name,
      checked,
      onChange: handleChange,
      label,
      variant,
      size,
      state,
      helperText,
      errorText,
      disabled,
      required,
      indeterminate,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    id: extendedId,
    name: extendedName,
    checked: extendedChecked,
    onChange: extendedOnChange,
    label: extendedLabel,
    variant: extendedVariant,
    size: extendedSize,
    state: extendedState,
    helperText: extendedHelperText,
    errorText: extendedErrorText,
    disabled: extendedDisabled,
    required: extendedRequired,
    indeterminate: extendedIndeterminate,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const checkboxWrapperClasses = [
    'ds-checkbox-wrapper',
    `ds-checkbox-${extendedVariant}`,
    `ds-checkbox-${extendedSize}`,
    `ds-checkbox-${extendedState}`,
    extendedDisabled ? 'ds-checkbox-disabled' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Determine if we should show error text
  const showErrorText = extendedState === CHECKBOX_STATES.ERROR && extendedErrorText;
  
  // Determine helper text to display
  const displayHelperText = showErrorText ? extendedErrorText : extendedHelperText;

  // Custom checkbox icon
  const CheckboxIcon = () => (
    <svg 
      className="ds-checkbox-icon" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
        fill="currentColor"
      />
    </svg>
  );

  // Indeterminate icon
  const IndeterminateIcon = () => (
    <svg 
      className="ds-checkbox-icon" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19 13H5v-2h14v2z" 
        fill="currentColor"
      />
    </svg>
  );
  
  return (
    <div className={checkboxWrapperClasses}>
      <div className="ds-checkbox-container">
        <input
          ref={combinedRef}
          type="checkbox"
          id={extendedId}
          name={extendedName}
          checked={extendedChecked}
          onChange={extendedOnChange}
          disabled={extendedDisabled}
          required={extendedRequired}
          className="ds-checkbox-input"
          aria-invalid={extendedState === CHECKBOX_STATES.ERROR}
          aria-describedby={displayHelperText ? `${extendedId}-helper-text` : undefined}
          {...restProps}
        />
        <div className="ds-checkbox-control">
          {extendedIndeterminate ? <IndeterminateIcon /> : <CheckboxIcon />}
        </div>
        {extendedLabel && (
          <label 
            htmlFor={extendedId} 
            className="ds-checkbox-label"
          >
            {extendedLabel}
            {extendedRequired && <span className="ds-checkbox-required">*</span>}
          </label>
        )}
      </div>
      
      {displayHelperText && (
        <div 
          id={`${extendedId}-helper-text`}
          className={`ds-checkbox-helper-text ${showErrorText ? 'ds-checkbox-error-text' : ''}`}
        >
          {displayHelperText}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /** Checkbox ID */
  id: PropTypes.string.isRequired,
  /** Checkbox name */
  name: PropTypes.string.isRequired,
  /** Whether the checkbox is checked */
  checked: PropTypes.bool,
  /** Callback when checkbox state changes */
  onChange: PropTypes.func,
  /** Checkbox label */
  label: PropTypes.node,
  /** Checkbox variant */
  variant: PropTypes.oneOf(Object.values(CHECKBOX_VARIANTS)),
  /** Checkbox size */
  size: PropTypes.oneOf(Object.values(CHECKBOX_SIZES)),
  /** Checkbox state */
  state: PropTypes.oneOf(Object.values(CHECKBOX_STATES)),
  /** Helper text */
  helperText: PropTypes.string,
  /** Error text (shown when state is ERROR) */
  errorText: PropTypes.string,
  /** Whether the checkbox is disabled */
  disabled: PropTypes.bool,
  /** Whether the checkbox is required */
  required: PropTypes.bool,
  /** Whether the checkbox is in an indeterminate state */
  indeterminate: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the checkbox */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Checkbox;
