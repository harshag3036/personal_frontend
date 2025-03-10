/**
 * Input Component
 * 
 * A customizable input component with support for variants, sizes, states, and responsive props.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Input label="Username" placeholder="Enter your username" />
 * 
 * // With different variant and state
 * <Input 
 *   variant="filled" 
 *   state="success" 
 *   label="Email" 
 *   helperText="Email is valid"
 * />
 * 
 * // With responsive props
 * <Input 
 *   variant={{ base: "default", md: "filled" }}
 *   size={{ base: "small", md: "medium", lg: "large" }}
 *   fullWidth={{ base: true, md: false }}
 *   label="Password"
 *   type="password"
 * />
 * 
 * // With icons
 * <Input 
 *   startIcon={<SearchIcon />}
 *   endIcon={<ClearIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import { INPUT_CLASS, INPUT_VARIANTS, INPUT_SIZES, INPUT_STATES } from './constants';
import './Input.css';

/**
 * Input Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type
 * @param {string|Object} [props.variant='default'] - Input variant or responsive object
 * @param {string|Object} [props.size='medium'] - Input size or responsive object
 * @param {string|Object} [props.state='default'] - Input state or responsive object
 * @param {string} [props.label] - Input label
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.errorText] - Error text (shown when state is ERROR)
 * @param {boolean|Object} [props.disabled=false] - Whether the input is disabled or responsive object
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean|Object} [props.fullWidth=false] - Whether the input should take full width or responsive object
 * @param {React.ReactNode} [props.startIcon] - Icon to display at the start of the input
 * @param {React.ReactNode} [props.endIcon] - Icon to display at the end of the input
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {JSX.Element} Input component
 */
const Input = forwardRef(({
  type = 'text',
  variant = 'default',
  size = 'medium',
  state = 'default',
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
  style = {},
  ...props
}, ref) => {
  // Process responsive props
  const responsiveProps = {
    variant,
    size,
    state,
    disabled,
    fullWidth,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(variant)) {
      responsiveClasses.variant = variant;
    }
    
    if (isResponsiveObject(size)) {
      responsiveClasses.size = size;
    }
    
    if (isResponsiveObject(state)) {
      responsiveClasses.state = state;
    }
    
    if (isResponsiveObject(disabled)) {
      responsiveClasses.disabled = disabled;
    }
    
    if (isResponsiveObject(fullWidth)) {
      responsiveClasses.fullWidth = fullWidth;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base classes based on non-responsive props
  const baseVariantClass = !isResponsiveObject(variant) ? `${INPUT_CLASS}--${variant}` : '';
  const baseSizeClass = !isResponsiveObject(size) ? `${INPUT_CLASS}--${size}` : '';
  const baseStateClass = !isResponsiveObject(state) ? `${INPUT_CLASS}--${state}` : '';
  const baseDisabledClass = !isResponsiveObject(disabled) && disabled ? `${INPUT_CLASS}--disabled` : '';
  const baseFullWidthClass = !isResponsiveObject(fullWidth) && fullWidth ? `${INPUT_CLASS}--full-width` : '';
  
  // Combine class names for wrapper
  const inputWrapperClasses = [
    `${INPUT_CLASS}-wrapper`,
    baseVariantClass,
    baseSizeClass,
    baseStateClass,
    baseDisabledClass,
    baseFullWidthClass,
    className
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const combinedStyle = {
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    combinedStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Determine if we should show error text
  const showErrorText = state === 'error' && errorText;
  
  // Determine helper text to display
  const displayHelperText = showErrorText ? errorText : helperText;
  
  return (
    <div className={inputWrapperClasses} style={combinedStyle}>
      {label && (
        <label className={`${INPUT_CLASS}__label`}>
          {label}
          {required && <span className={`${INPUT_CLASS}__required`}>*</span>}
        </label>
      )}
      
      <div className={`${INPUT_CLASS}__container`}>
        {startIcon && (
          <div className={`${INPUT_CLASS}__icon ${INPUT_CLASS}__icon--start`}>
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${INPUT_CLASS}__field`}
          placeholder={placeholder}
          disabled={!isResponsiveObject(disabled) && disabled}
          required={required}
          aria-invalid={state === 'error'}
          {...props}
        />
        
        {endIcon && (
          <div className={`${INPUT_CLASS}__icon ${INPUT_CLASS}__icon--end`}>
            {endIcon}
          </div>
        )}
      </div>
      
      {displayHelperText && (
        <div className={`${INPUT_CLASS}__helper-text ${showErrorText ? `${INPUT_CLASS}__helper-text--error` : ''}`}>
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
  /** Input variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(INPUT_VARIANTS)),
    PropTypes.object,
  ]),
  /** Input size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(INPUT_SIZES)),
    PropTypes.object,
  ]),
  /** Input state or responsive object */
  state: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(INPUT_STATES)),
    PropTypes.object,
  ]),
  /** Input label */
  label: PropTypes.string,
  /** Input placeholder */
  placeholder: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Error text (shown when state is ERROR) */
  errorText: PropTypes.string,
  /** Whether the input is disabled or responsive object */
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Whether the input is required */
  required: PropTypes.bool,
  /** Whether the input should take full width or responsive object */
  fullWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Icon to display at the start of the input */
  startIcon: PropTypes.node,
  /** Icon to display at the end of the input */
  endIcon: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Input.defaultProps = {
  type: 'text',
  variant: 'default',
  size: 'medium',
  state: 'default',
  disabled: false,
  required: false,
  fullWidth: false,
  className: '',
  style: {},
};

export default Input;
