import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { INPUT_CLASS, INPUT_SIZES, INPUT_VARIANTS } from './constants';
import './Input.css';

/**
 * Enhanced Input Component
 * 
 * A text input component with improved handling of states, variants, and theming.
 * This implementation resolves conflicts between styling approaches and provides
 * a consistent API for all input variations.
 */
const Input = forwardRef(({
  as = 'input',
  type = 'text',
  id,
  name,
  value,
  defaultValue,
  placeholder,
  size = INPUT_SIZES.MD,
  variant = INPUT_VARIANTS.OUTLINE,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  autoComplete,
  autoFocus = false,
  maxLength,
  min,
  max,
  step,
  pattern,
  backgroundColor,
  borderColor,
  focusBorderColor,
  errorBorderColor,
  color,
  width,
  height,
  paddingX,
  paddingY,
  borderRadius,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  leftIcon,
  rightIcon,
  leftAddon,
  rightAddon,
  className = '',
  style = {},
  ...restProps
}, ref) => {
  // Process input variant and size
  const processedVariant = variant || INPUT_VARIANTS.OUTLINE;
  const processedSize = size || INPUT_SIZES.MD;
  
  // Process border color based on status
  let processedBorderColor = borderColor;
  if (isInvalid && errorBorderColor) {
    processedBorderColor = errorBorderColor;
  }
  
  // Build class names
  const inputClasses = [
    INPUT_CLASS,
    `${INPUT_CLASS}--${processedVariant}`,
    `${INPUT_CLASS}--${processedSize}`,
    isInvalid ? `${INPUT_CLASS}--invalid` : '',
    isDisabled ? `${INPUT_CLASS}--disabled` : '',
    isReadOnly ? `${INPUT_CLASS}--readonly` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Create input wrapper to handle icons and addons
  const hasAddons = leftIcon || rightIcon || leftAddon || rightAddon;
  
  // Base input element
  const inputElement = (
    <Box
      as={as}
      className={`${INPUT_CLASS}__field`}
      ref={ref}
      id={id}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      pattern={pattern}
      aria-invalid={isInvalid}
      backgroundColor={backgroundColor}
      borderColor={processedBorderColor}
      color={color}
      width={width}
      height={height}
      borderRadius={borderRadius}
      style={{
        ...style,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      data-focus-border-color={focusBorderColor}
      {...restProps}
    />
  );
  
  // Return input element with or without wrapper
  if (!hasAddons) {
    return inputElement;
  }
  
  // Return input with addons and icons
  return (
    <div className={`${INPUT_CLASS}__group ${inputClasses}`}>
      {leftAddon && (
        <div className={`${INPUT_CLASS}__addon ${INPUT_CLASS}__addon--left`}>
          {leftAddon}
        </div>
      )}
      
      <div className={`${INPUT_CLASS}__wrapper`}>
        {leftIcon && (
          <div className={`${INPUT_CLASS}__icon ${INPUT_CLASS}__icon--left`}>
            {leftIcon}
          </div>
        )}
        
        {inputElement}
        
        {rightIcon && (
          <div className={`${INPUT_CLASS}__icon ${INPUT_CLASS}__icon--right`}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {rightAddon && (
        <div className={`${INPUT_CLASS}__addon ${INPUT_CLASS}__addon--right`}>
          {rightAddon}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** Element to render the Input as */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** Input type (text, password, email, etc.) */
  type: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Input value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Input default value */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Input placeholder */
  placeholder: PropTypes.string,
  /** Input size (xs, sm, md, lg, xl) */
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  /** Input variant (outline, filled, flushed, unstyled) */
  variant: PropTypes.oneOf(Object.values(INPUT_VARIANTS)),
  /** Whether the input is invalid */
  isInvalid: PropTypes.bool,
  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,
  /** Whether the input is read-only */
  isReadOnly: PropTypes.bool,
  /** Whether the input is required */
  isRequired: PropTypes.bool,
  /** Input autocomplete attribute */
  autoComplete: PropTypes.string,
  /** Whether the input should receive focus on mount */
  autoFocus: PropTypes.bool,
  /** Input max length */
  maxLength: PropTypes.number,
  /** Input min value (for number inputs) */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Input max value (for number inputs) */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Input step value (for number inputs) */
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Input pattern (for validation) */
  pattern: PropTypes.string,
  /** Background color */
  backgroundColor: PropTypes.string,
  /** Border color */
  borderColor: PropTypes.string,
  /** Border color when focused */
  focusBorderColor: PropTypes.string,
  /** Border color when invalid */
  errorBorderColor: PropTypes.string,
  /** Text color */
  color: PropTypes.string,
  /** Input width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Input height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Horizontal padding */
  paddingX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Vertical padding */
  paddingY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Focus handler */
  onFocus: PropTypes.func,
  /** Blur handler */
  onBlur: PropTypes.func,
  /** Keydown handler */
  onKeyDown: PropTypes.func,
  /** Keyup handler */
  onKeyUp: PropTypes.func,
  /** Icon to display on the left side of the input */
  leftIcon: PropTypes.node,
  /** Icon to display on the right side of the input */
  rightIcon: PropTypes.node,
  /** Element to display before the input */
  leftAddon: PropTypes.node,
  /** Element to display after the input */
  rightAddon: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Input.defaultProps = {
  as: 'input',
  type: 'text',
  size: INPUT_SIZES.MD,
  variant: INPUT_VARIANTS.OUTLINE,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  autoFocus: false,
  className: '',
  style: {},
};

export default Input;
