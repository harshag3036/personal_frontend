/**
 * Textarea Component
 * 
 * A customizable textarea component with support for variants and extensions.
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Textarea.css';

// Textarea variants
export const TEXTAREA_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Textarea sizes
export const TEXTAREA_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Textarea states
export const TEXTAREA_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

/**
 * Textarea Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Textarea ID
 * @param {string} props.name - Textarea name
 * @param {string} [props.value=''] - Textarea value
 * @param {Function} [props.onChange] - Callback when textarea value changes
 * @param {string} [props.label] - Textarea label
 * @param {string} [props.placeholder=''] - Textarea placeholder
 * @param {string} [props.variant=TEXTAREA_VARIANTS.DEFAULT] - Textarea variant
 * @param {string} [props.size=TEXTAREA_SIZES.MEDIUM] - Textarea size
 * @param {string} [props.state=TEXTAREA_STATES.DEFAULT] - Textarea state
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
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the textarea
 * @returns {JSX.Element} Textarea component
 */
const Textarea = forwardRef(({
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
  extensions = [],
  ...props
}, ref) => {
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

  // Error handling for invalid variants
  if (variant && !Object.values(TEXTAREA_VARIANTS).includes(variant)) {
    console.warn(`Textarea: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = TEXTAREA_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (size && !Object.values(TEXTAREA_SIZES).includes(size)) {
    console.warn(`Textarea: Invalid size "${size}". Falling back to MEDIUM.`);
    size = TEXTAREA_SIZES.MEDIUM;
  }

  // Error handling for invalid states
  if (state && !Object.values(TEXTAREA_STATES).includes(state)) {
    console.warn(`Textarea: Invalid state "${state}". Falling back to DEFAULT.`);
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
      id,
      name,
      value,
      onChange: handleChange,
      label,
      placeholder,
      variant,
      size,
      state,
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
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Textarea: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      id,
      name,
      value,
      onChange: handleChange,
      label,
      placeholder,
      variant,
      size,
      state,
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
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    id: extendedId,
    name: extendedName,
    value: extendedValue,
    onChange: extendedOnChange,
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
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const textareaWrapperClasses = [
    'ds-textarea-wrapper',
    `ds-textarea-${extendedVariant}`,
    `ds-textarea-${extendedSize}`,
    `ds-textarea-${extendedState}`,
    extendedDisabled ? 'ds-textarea-disabled' : '',
    extendedReadOnly ? 'ds-textarea-readonly' : '',
    extendedFullWidth ? 'ds-textarea-full-width' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Determine if we should show error text
  const showErrorText = extendedState === TEXTAREA_STATES.ERROR && extendedErrorText;
  
  // Determine helper text to display
  const displayHelperText = showErrorText ? extendedErrorText : extendedHelperText;

  // Character count display
  const showCharCount = extendedMaxLength !== undefined;
  const charCount = extendedValue ? extendedValue.length : 0;
  const charCountClasses = [
    'ds-textarea-char-count',
    charCount > extendedMaxLength ? 'ds-textarea-char-count-exceeded' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={textareaWrapperClasses}>
      {extendedLabel && (
        <label 
          htmlFor={extendedId} 
          className="ds-textarea-label"
        >
          {extendedLabel}
          {extendedRequired && <span className="ds-textarea-required">*</span>}
        </label>
      )}
      
      <div className="ds-textarea-container">
        <textarea
          ref={combinedRef}
          id={extendedId}
          name={extendedName}
          value={extendedValue}
          onChange={extendedOnChange}
          placeholder={extendedPlaceholder}
          disabled={extendedDisabled}
          required={extendedRequired}
          readOnly={extendedReadOnly}
          rows={extendedRows}
          maxLength={extendedMaxLength}
          className="ds-textarea-input"
          aria-invalid={extendedState === TEXTAREA_STATES.ERROR}
          aria-describedby={displayHelperText ? `${extendedId}-helper-text` : undefined}
          {...restProps}
        />
        
        {showCharCount && (
          <div className={charCountClasses}>
            {charCount}/{extendedMaxLength}
          </div>
        )}
      </div>
      
      {displayHelperText && (
        <div 
          id={`${extendedId}-helper-text`}
          className={`ds-textarea-helper-text ${showErrorText ? 'ds-textarea-error-text' : ''}`}
        >
          {displayHelperText}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  /** Textarea ID */
  id: PropTypes.string.isRequired,
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
  /** Textarea variant */
  variant: PropTypes.oneOf(Object.values(TEXTAREA_VARIANTS)),
  /** Textarea size */
  size: PropTypes.oneOf(Object.values(TEXTAREA_SIZES)),
  /** Textarea state */
  state: PropTypes.oneOf(Object.values(TEXTAREA_STATES)),
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
  /** Extensions to apply to the textarea */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Textarea;
