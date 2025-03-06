/**
 * Checkbox Component
 * 
 * A customizable checkbox component with support for sizes, states, and responsive props.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Checkbox label="Accept terms" />
 * 
 * // Controlled checkbox
 * <Checkbox 
 *   label="Remember me" 
 *   checked={isChecked} 
 *   onChange={handleChange} 
 * />
 * 
 * // With description
 * <Checkbox 
 *   label="Subscribe to newsletter" 
 *   description="Receive updates about new products and features"
 * />
 * 
 * // Different sizes
 * <Checkbox label="Small checkbox" size="sm" />
 * <Checkbox label="Medium checkbox" size="md" />
 * <Checkbox label="Large checkbox" size="lg" />
 * 
 * // States
 * <Checkbox label="Disabled checkbox" disabled />
 * <Checkbox label="Invalid checkbox" invalid errorMessage="This field is required" />
 * <Checkbox label="Indeterminate checkbox" indeterminate />
 * 
 * // Responsive props
 * <Checkbox 
 *   label="Responsive checkbox" 
 *   size={{ base: "sm", md: "md", lg: "lg" }}
 * />
 * 
 * // Polymorphic rendering
 * <Checkbox 
 *   as="div"
 *   label="Polymorphic checkbox" 
 * />
 * ```
 */

import React, { forwardRef, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { componentExtension } from '../../utilities';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { CHECKBOX_CLASS, CHECKBOX_SIZES, CHECKBOX_MODIFIERS } from './index';
import './Checkbox.css';

/**
 * Checkbox Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='label'] - Element to render the Checkbox as
 * @param {string} [props.id] - Checkbox ID
 * @param {string} [props.name] - Checkbox name
 * @param {string} [props.label] - Checkbox label
 * @param {string} [props.description] - Additional description text
 * @param {boolean} [props.checked=false] - Whether the checkbox is checked
 * @param {boolean} [props.defaultChecked] - Default checked state (uncontrolled)
 * @param {boolean} [props.indeterminate=false] - Whether the checkbox is in indeterminate state
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {boolean} [props.invalid=false] - Whether the checkbox has an error
 * @param {string} [props.errorMessage] - Error message to display when invalid
 * @param {string|Object} [props.size=CHECKBOX_SIZES.MD] - Checkbox size or responsive object
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onFocus] - Focus handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the checkbox
 * @param {Object} [props.inputProps={}] - Additional props for the input element
 * @returns {JSX.Element} Checkbox component
 */
const Checkbox = forwardRef(({
  as = 'label',
  id,
  name,
  label,
  description,
  checked = false,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  invalid = false,
  errorMessage,
  size = CHECKBOX_SIZES.MD,
  onChange,
  onFocus,
  onBlur,
  className = '',
  style = {},
  extensions = [],
  inputProps = {},
  ...props
}, ref) => {
  // Create a ref for the input element
  const inputRef = useRef(null);
  
  // Forward the ref to the input element
  const combinedRef = (node) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };
  
  // State for focus tracking
  const [isFocused, setIsFocused] = useState(false);
  
  // State for internal checked state (for uncontrolled component)
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const isChecked = isControlled ? checked : internalChecked;
  
  // Process responsive props
  const responsiveProps = {
    size,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(size)) {
      responsiveClasses.size = size;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const baseSize = !isResponsiveObject(size) ? size : CHECKBOX_SIZES.MD;
  
  // Error handling for invalid sizes
  if (baseSize && !Object.values(CHECKBOX_SIZES).includes(baseSize)) {
    console.warn(`Checkbox: Invalid size "${baseSize}". Falling back to MD.`);
    size = CHECKBOX_SIZES.MD;
  }
  
  // Set indeterminate property on input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  // Handle change event
  const handleChange = (event) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    
    if (onChange) {
      try {
        onChange(event);
      } catch (error) {
        console.error('Checkbox: Error in onChange handler:', error);
      }
    }
  };
  
  // Handle focus event
  const handleFocus = (event) => {
    setIsFocused(true);
    
    if (onFocus) {
      try {
        onFocus(event);
      } catch (error) {
        console.error('Checkbox: Error in onFocus handler:', error);
      }
    }
  };
  
  // Handle blur event
  const handleBlur = (event) => {
    setIsFocused(false);
    
    if (onBlur) {
      try {
        onBlur(event);
      } catch (error) {
        console.error('Checkbox: Error in onBlur handler:', error);
      }
    }
  };
  
  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Checkbox', {
      as,
      id,
      name,
      label,
      description,
      checked: isChecked,
      indeterminate,
      disabled,
      invalid,
      errorMessage,
      size: baseSize,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className,
      style,
      inputProps,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Checkbox: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      as,
      id,
      name,
      label,
      description,
      checked: isChecked,
      indeterminate,
      disabled,
      invalid,
      errorMessage,
      size: baseSize,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className,
      style,
      inputProps,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    as: extendedAs,
    id: extendedId,
    name: extendedName,
    label: extendedLabel,
    description: extendedDescription,
    checked: extendedChecked,
    indeterminate: extendedIndeterminate,
    disabled: extendedDisabled,
    invalid: extendedInvalid,
    errorMessage: extendedErrorMessage,
    size: extendedSize,
    onChange: extendedOnChange,
    onFocus: extendedOnFocus,
    onBlur: extendedOnBlur,
    className: extendedClassName,
    style: extendedStyle,
    inputProps: extendedInputProps,
    ...restProps
  } = extendedProps;
  
  // Generate a unique ID if not provided
  const uniqueId = extendedId || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  
  // Combine class names
  const checkboxClasses = [
    CHECKBOX_CLASS,
    `${CHECKBOX_CLASS}--${extendedSize}`,
    extendedChecked ? `${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.CHECKED}` : `${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.UNCHECKED}`,
    extendedIndeterminate ? `${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.INDETERMINATE}` : '',
    extendedDisabled ? `${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.DISABLED}` : '',
    isFocused ? `${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.FOCUSED}` : '',
    extendedInvalid ? `${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.INVALID}` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const checkboxStyle = {
    ...extendedStyle,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    checkboxStyle['--responsive-styles'] = responsiveStyles;
  }
  
  return (
    <Box as={extendedAs} className={checkboxClasses} style={checkboxStyle} htmlFor={uniqueId} {...restProps}>
      <input
        ref={combinedRef}
        id={uniqueId}
        type="checkbox"
        name={extendedName}
        className={`${CHECKBOX_CLASS}__input`}
        checked={extendedChecked}
        disabled={extendedDisabled}
        onChange={extendedOnChange}
        onFocus={extendedOnFocus}
        onBlur={extendedOnBlur}
        aria-invalid={extendedInvalid}
        aria-describedby={
          (extendedDescription || extendedErrorMessage) ? 
          `${uniqueId}-description ${extendedInvalid ? `${uniqueId}-error` : ''}`.trim() : 
          undefined
        }
        {...extendedInputProps}
      />
      <div className={`${CHECKBOX_CLASS}__control`}>
        {extendedIndeterminate ? (
          <svg className={`${CHECKBOX_CLASS}__icon`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className={`${CHECKBOX_CLASS}__icon`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
      </div>
      {extendedLabel && (
        <div>
          <span className={`${CHECKBOX_CLASS}__label`}>{extendedLabel}</span>
          {extendedDescription && (
            <Text 
              id={`${uniqueId}-description`}
              className={`${CHECKBOX_CLASS}__description`}
              variant="body2"
            >
              {extendedDescription}
            </Text>
          )}
          {extendedInvalid && extendedErrorMessage && (
            <Text 
              id={`${uniqueId}-error`}
              className={`${CHECKBOX_CLASS}__error`}
              variant="body2"
            >
              {extendedErrorMessage}
            </Text>
          )}
        </div>
      )}
    </Box>
  );
});

Checkbox.propTypes = {
  /** Element to render the Checkbox as */
  ...polymorphicPropTypes,
  /** Checkbox ID */
  id: PropTypes.string,
  /** Checkbox name */
  name: PropTypes.string,
  /** Checkbox label */
  label: PropTypes.node,
  /** Additional description text */
  description: PropTypes.node,
  /** Whether the checkbox is checked (controlled) */
  checked: PropTypes.bool,
  /** Default checked state (uncontrolled) */
  defaultChecked: PropTypes.bool,
  /** Whether the checkbox is in indeterminate state */
  indeterminate: PropTypes.bool,
  /** Whether the checkbox is disabled */
  disabled: PropTypes.bool,
  /** Whether the checkbox has an error */
  invalid: PropTypes.bool,
  /** Error message to display when invalid */
  errorMessage: PropTypes.node,
  /** Checkbox size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(CHECKBOX_SIZES)),
    PropTypes.object,
  ]),
  /** Change handler */
  onChange: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Extensions to apply to the checkbox */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Additional props for the input element */
  inputProps: PropTypes.object,
};

export default Checkbox;
