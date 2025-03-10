/**
 * Textarea Component
 * 
 * A customizable textarea component with support for variants, sizes, states, and responsive props.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Textarea 
 *   id="description"
 *   name="description"
 *   label="Description"
 * />
 * 
 * // Controlled textarea
 * <Textarea 
 *   id="message"
 *   name="message"
 *   label="Message"
 *   value={message}
 *   onChange={handleChange}
 * />
 * 
 * // With helper text
 * <Textarea 
 *   id="bio"
 *   name="bio"
 *   label="Bio"
 *   helperText="Tell us about yourself"
 * />
 * 
 * // Different variants
 * <Textarea id="default" name="default" label="Default variant" variant="default" />
 * <Textarea id="filled" name="filled" label="Filled variant" variant="filled" />
 * <Textarea id="outlined" name="outlined" label="Outlined variant" variant="outlined" />
 * 
 * // Different sizes
 * <Textarea id="small" name="small" label="Small textarea" size="small" />
 * <Textarea id="medium" name="medium" label="Medium textarea" size="medium" />
 * <Textarea id="large" name="large" label="Large textarea" size="large" />
 * 
 * // Different states
 * <Textarea id="default-state" name="default-state" label="Default state" state="default" />
 * <Textarea id="success" name="success" label="Success state" state="success" />
 * <Textarea id="error" name="error" label="Error state" state="error" errorText="This field is required" />
 * <Textarea id="warning" name="warning" label="Warning state" state="warning" />
 * 
 * // Auto-resize
 * <Textarea 
 *   id="auto-resize"
 *   name="auto-resize"
 *   label="Auto-resize textarea"
 *   autoResize
 *   minRows={2}
 *   maxRows={10}
 * />
 * 
 * // With character count
 * <Textarea 
 *   id="char-count"
 *   name="char-count"
 *   label="Character count"
 *   maxLength={100}
 * />
 * 
 * // Responsive props
 * <Textarea 
 *   id="responsive"
 *   name="responsive"
 *   label="Responsive textarea"
 *   size={{ base: "small", md: "medium", lg: "large" }}
 * />
 * 
 * // Polymorphic rendering
 * <Textarea 
 *   as="section"
 *   id="polymorphic"
 *   name="polymorphic"
 *   label="Polymorphic textarea"
 * />
 * ```
 */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { 
  TEXTAREA_CLASS, 
  TEXTAREA_VARIANTS, 
  TEXTAREA_SIZES, 
  TEXTAREA_STATES,
  TEXTAREA_MODIFIERS, 
  TEXTAREA_BREAKPOINTS 
} from './constants';
import './Textarea.css';

/**
 * Textarea Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='div'] - Element to render the Textarea as
 * @param {string} props.id - Textarea ID
 * @param {string} props.name - Textarea name
 * @param {string} [props.value=''] - Textarea value
 * @param {Function} [props.onChange] - Callback when textarea value changes
 * @param {string} [props.label] - Textarea label
 * @param {string} [props.placeholder=''] - Textarea placeholder
 * @param {string|Object} [props.variant=TEXTAREA_VARIANTS.DEFAULT] - Textarea variant or responsive object
 * @param {string|Object} [props.size=TEXTAREA_SIZES.MEDIUM] - Textarea size or responsive object
 * @param {string|Object} [props.state=TEXTAREA_STATES.DEFAULT] - Textarea state or responsive object
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.errorText] - Error text (shown when state is ERROR)
 * @param {boolean} [props.disabled=false] - Whether the textarea is disabled
 * @param {boolean} [props.required=false] - Whether the textarea is required
 * @param {boolean} [props.readOnly=false] - Whether the textarea is read-only
 * @param {number} [props.rows=3] - Number of rows
 * @param {number} [props.minRows=2] - Minimum number of rows (for auto-resize)
 * @param {number} [props.maxRows=10] - Maximum number of rows (for auto-resize)
 * @param {boolean} [props.autoResize=false] - Whether to auto-resize the textarea
 * @param {number} [props.maxLength] - Maximum length of the textarea value
 * @param {boolean} [props.fullWidth=false] - Whether the textarea should take up the full width
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the textarea
 * @returns {JSX.Element} Textarea component
 */
const Textarea = forwardRef(({
  as = 'div',
  id,
  name,
  value = '',
  onChange,
  label,
  placeholder = '',
  variant = TEXTAREA_VARIANTS.DEFAULT,
  size = TEXTAREA_SIZES.MEDIUM,
  state = TEXTAREA_STATES.DEFAULT,
  helperText,
  errorText,
  disabled = false,
  required = false,
  readOnly = false,
  rows = 3,
  minRows = 2,
  maxRows = 10,
  autoResize = false,
  maxLength,
  fullWidth = false,
  className = '',
  style = {},
  extensions = [],
  ...props
}, ref) => {
  // State for focus tracking
  const [isFocused, setIsFocused] = useState(false);
  
  // Internal ref for auto-resize
  const textareaRef = useRef(null);
  
  // Combine refs
  const combinedRef = (element) => {
    textareaRef.current = element;
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };
  
  // Process responsive props
  const responsiveProps = {
    variant,
    size,
    state,
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
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const baseVariant = !isResponsiveObject(variant) ? variant : TEXTAREA_VARIANTS.DEFAULT;
  const baseSize = !isResponsiveObject(size) ? size : TEXTAREA_SIZES.MEDIUM;
  const baseState = !isResponsiveObject(state) ? state : TEXTAREA_STATES.DEFAULT;

  // Error handling for invalid variants
  if (baseVariant && !Object.values(TEXTAREA_VARIANTS).includes(baseVariant)) {
    console.warn(`Textarea: Invalid variant "${baseVariant}". Falling back to DEFAULT.`);
    variant = TEXTAREA_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (baseSize && !Object.values(TEXTAREA_SIZES).includes(baseSize)) {
    console.warn(`Textarea: Invalid size "${baseSize}". Falling back to MEDIUM.`);
    size = TEXTAREA_SIZES.MEDIUM;
  }

  // Error handling for invalid states
  if (baseState && !Object.values(TEXTAREA_STATES).includes(baseState)) {
    console.warn(`Textarea: Invalid state "${baseState}". Falling back to DEFAULT.`);
    state = TEXTAREA_STATES.DEFAULT;
  }

  // Auto-resize the textarea
  const autoResizeTextarea = (element) => {
    if (!element) return;
    
    // Reset height to auto to get the correct scrollHeight
    element.style.height = 'auto';
    
    // Calculate the new height
    const lineHeight = parseInt(getComputedStyle(element).lineHeight, 10) || 20;
    const paddingTop = parseInt(getComputedStyle(element).paddingTop, 10) || 0;
    const paddingBottom = parseInt(getComputedStyle(element).paddingBottom, 10) || 0;
    const borderTop = parseInt(getComputedStyle(element).borderTopWidth, 10) || 0;
    const borderBottom = parseInt(getComputedStyle(element).borderBottomWidth, 10) || 0;
    
    const minHeight = (minRows * lineHeight) + paddingTop + paddingBottom + borderTop + borderBottom;
    const maxHeight = (maxRows * lineHeight) + paddingTop + paddingBottom + borderTop + borderBottom;
    
    // Set the height based on scrollHeight, but constrained by minHeight and maxHeight
    const newHeight = Math.min(Math.max(element.scrollHeight, minHeight), maxHeight);
    element.style.height = `${newHeight}px`;
    
    // Set overflow to auto if the content exceeds maxHeight
    element.style.overflow = element.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  // Handle textarea change
  const handleChange = (event) => {
    if (disabled || readOnly) return;
    
    if (onChange) {
      try {
        onChange(event);
      } catch (error) {
        console.error('Textarea: Error in onChange handler:', error);
      }
    }

    // Auto-resize the textarea if enabled
    if (autoResize && event.target) {
      autoResizeTextarea(event.target);
    }
  };
  
  // Handle focus event
  const handleFocus = (event) => {
    setIsFocused(true);
    
    if (props.onFocus) {
      try {
        props.onFocus(event);
      } catch (error) {
        console.error('Textarea: Error in onFocus handler:', error);
      }
    }
  };
  
  // Handle blur event
  const handleBlur = (event) => {
    setIsFocused(false);
    
    if (props.onBlur) {
      try {
        props.onBlur(event);
      } catch (error) {
        console.error('Textarea: Error in onBlur handler:', error);
      }
    }
  };

  // Auto-resize on mount and when value changes
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      autoResizeTextarea(textareaRef.current);
    }
  }, [autoResize, value]);

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Textarea', {
      as,
      id,
      name,
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      label,
      placeholder,
      variant: baseVariant,
      size: baseSize,
      state: baseState,
      helperText,
      errorText,
      disabled,
      required,
      readOnly,
      rows,
      minRows,
      maxRows,
      autoResize,
      maxLength,
      fullWidth,
      className,
      style,
      isFocused,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Textarea: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      as,
      id,
      name,
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      label,
      placeholder,
      variant: baseVariant,
      size: baseSize,
      state: baseState,
      helperText,
      errorText,
      disabled,
      required,
      readOnly,
      rows,
      minRows,
      maxRows,
      autoResize,
      maxLength,
      fullWidth,
      className,
      style,
      isFocused,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    as: extendedAs,
    id: extendedId,
    name: extendedName,
    value: extendedValue,
    onChange: extendedOnChange,
    onFocus: extendedOnFocus,
    onBlur: extendedOnBlur,
    label: extendedLabel,
    placeholder: extendedPlaceholder,
    variant: extendedVariant,
    size: extendedSize,
    state: extendedState,
    helperText: extendedHelperText,
    errorText: extendedErrorText,
    disabled: extendedDisabled,
    required: extendedRequired,
    readOnly: extendedReadOnly,
    rows: extendedRows,
    minRows: extendedMinRows,
    maxRows: extendedMaxRows,
    autoResize: extendedAutoResize,
    maxLength: extendedMaxLength,
    fullWidth: extendedFullWidth,
    className: extendedClassName,
    style: extendedStyle,
    isFocused: extendedIsFocused,
    ...restProps
  } = extendedProps;
  
  // Generate a unique ID if not provided
  const uniqueId = extendedId || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  // Combine class names
  const textareaWrapperClasses = [
    TEXTAREA_CLASS,
    `${TEXTAREA_CLASS}-wrapper`,
    `${TEXTAREA_CLASS}-${extendedVariant}`,
    `${TEXTAREA_CLASS}-${extendedSize}`,
    `${TEXTAREA_CLASS}-${extendedState}`,
    extendedDisabled ? `${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.DISABLED}` : '',
    extendedReadOnly ? `${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.READONLY}` : '',
    extendedRequired ? `${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.REQUIRED}` : '',
    extendedFullWidth ? `${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.FULL_WIDTH}` : '',
    extendedAutoResize ? `${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.AUTO_RESIZE}` : '',
    extendedIsFocused ? `${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.FOCUSED}` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const textareaWrapperStyle = {
    ...extendedStyle,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    textareaWrapperStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Determine if we should show error text
  const showErrorText = extendedState === TEXTAREA_STATES.ERROR && extendedErrorText;
  
  // Determine helper text to display
  const displayHelperText = showErrorText ? extendedErrorText : extendedHelperText;

  // Character count display
  const showCharCount = extendedMaxLength !== undefined;
  const charCount = extendedValue ? extendedValue.length : 0;
  const charCountClasses = [
    `${TEXTAREA_CLASS}-char-count`,
    charCount > extendedMaxLength ? `${TEXTAREA_CLASS}-char-count-exceeded` : '',
  ].filter(Boolean).join(' ');
  
  return (
    <Box as={extendedAs} className={textareaWrapperClasses} style={textareaWrapperStyle} {...restProps}>
      {extendedLabel && (
        <label 
          htmlFor={uniqueId} 
          className={`${TEXTAREA_CLASS}-label`}
        >
          {extendedLabel}
          {extendedRequired && <span className={`${TEXTAREA_CLASS}-required`}>*</span>}
        </label>
      )}
      
      <div className={`${TEXTAREA_CLASS}-container`}>
        <textarea
          ref={combinedRef}
          id={uniqueId}
          name={extendedName}
          value={extendedValue}
          onChange={extendedOnChange}
          onFocus={extendedOnFocus}
          onBlur={extendedOnBlur}
          placeholder={extendedPlaceholder}
          disabled={extendedDisabled}
          required={extendedRequired}
          readOnly={extendedReadOnly}
          rows={extendedRows}
          maxLength={extendedMaxLength}
          className={`${TEXTAREA_CLASS}-input`}
          aria-invalid={extendedState === TEXTAREA_STATES.ERROR}
          aria-describedby={displayHelperText ? `${uniqueId}-helper-text` : undefined}
        />
        
        {showCharCount && (
          <div className={charCountClasses}>
            {charCount}/{extendedMaxLength}
          </div>
        )}
      </div>
      
      {displayHelperText && (
        <div 
          id={`${uniqueId}-helper-text`}
          className={`${TEXTAREA_CLASS}-helper-text ${showErrorText ? `${TEXTAREA_CLASS}-error-text` : ''}`}
        >
          {displayHelperText}
        </div>
      )}
    </Box>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  /** Element to render the Textarea as */
  ...polymorphicPropTypes,
  /** Textarea ID */
  id: PropTypes.string,
  /** Textarea name */
  name: PropTypes.string.isRequired,
  /** Textarea value */
  value: PropTypes.string,
  /** Callback when textarea value changes */
  onChange: PropTypes.func,
  /** Textarea label */
  label: PropTypes.node,
  /** Textarea placeholder */
  placeholder: PropTypes.string,
  /** Textarea variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXTAREA_VARIANTS)),
    PropTypes.object
  ]),
  /** Textarea size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXTAREA_SIZES)),
    PropTypes.object
  ]),
  /** Textarea state or responsive object */
  state: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXTAREA_STATES)),
    PropTypes.object
  ]),
  /** Helper text */
  helperText: PropTypes.string,
  /** Error text (shown when state is ERROR) */
  errorText: PropTypes.string,
  /** Whether the textarea is disabled */
  disabled: PropTypes.bool,
  /** Whether the textarea is required */
  required: PropTypes.bool,
  /** Whether the textarea is read-only */
  readOnly: PropTypes.bool,
  /** Number of rows */
  rows: PropTypes.number,
  /** Minimum number of rows (for auto-resize) */
  minRows: PropTypes.number,
  /** Maximum number of rows (for auto-resize) */
  maxRows: PropTypes.number,
  /** Whether to auto-resize the textarea */
  autoResize: PropTypes.bool,
  /** Maximum length of the textarea value */
  maxLength: PropTypes.number,
  /** Whether the textarea should take up the full width */
  fullWidth: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Extensions to apply to the textarea */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Textarea;
