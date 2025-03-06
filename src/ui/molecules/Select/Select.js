/**
 * Select Component
 * 
 * A customizable select/dropdown component with support for variants and extensions.
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Select.css';

// Select variants
export const SELECT_VARIANTS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
};

// Select sizes
export const SELECT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Select states
export const SELECT_STATES = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

/**
 * Select Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of options to display in the select
 * @param {string|number} [props.value] - Selected value
 * @param {Function} [props.onChange] - Callback when selection changes
 * @param {string} [props.placeholder='Select an option'] - Placeholder text
 * @param {string} [props.variant=SELECT_VARIANTS.DEFAULT] - Select variant
 * @param {string} [props.size=SELECT_SIZES.MEDIUM] - Select size
 * @param {string} [props.state=SELECT_STATES.DEFAULT] - Select state
 * @param {string} [props.label] - Select label
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.errorText] - Error text (shown when state is ERROR)
 * @param {boolean} [props.disabled=false] - Whether the select is disabled
 * @param {boolean} [props.required=false] - Whether the select is required
 * @param {boolean} [props.fullWidth=false] - Whether the select should take full width
 * @param {React.ReactNode} [props.startIcon] - Icon to display at the start of the select
 * @param {React.ReactNode} [props.endIcon] - Icon to display at the end of the select
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the select
 * @returns {JSX.Element} Select component
 */
const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  variant = SELECT_VARIANTS.DEFAULT,
  size = SELECT_SIZES.MEDIUM,
  state = SELECT_STATES.DEFAULT,
  label,
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // Error handling for invalid variants
  if (variant && !Object.values(SELECT_VARIANTS).includes(variant)) {
    console.warn(`Select: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = SELECT_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (size && !Object.values(SELECT_SIZES).includes(size)) {
    console.warn(`Select: Invalid size "${size}". Falling back to MEDIUM.`);
    size = SELECT_SIZES.MEDIUM;
  }

  // Error handling for invalid states
  if (state && !Object.values(SELECT_STATES).includes(state)) {
    console.warn(`Select: Invalid state "${state}". Falling back to DEFAULT.`);
    state = SELECT_STATES.DEFAULT;
  }

  // Validate options format
  const validOptions = Array.isArray(options) ? options : [];
  
  // Find selected option
  const selectedOption = validOptions.find(option => 
    option.value === selectedValue
  );

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    
    if (onChange) {
      try {
        onChange(option.value);
      } catch (error) {
        console.error('Select: Error in onChange handler:', error);
      }
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Find and highlight the selected option when opening
        const selectedIndex = validOptions.findIndex(option => option.value === selectedValue);
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : -1);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (event) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex >= 0) {
          handleOptionSelect(validOptions[highlightedIndex]);
        }
        event.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < validOptions.length - 1 ? prev + 1 : prev
          );
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : prev
          );
        }
        event.preventDefault();
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  // Scroll to highlighted option
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, highlightedIndex]);

  // Update internal state when value prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Select', {
      options: validOptions,
      value: selectedValue,
      onChange,
      placeholder,
      variant,
      size,
      state,
      label,
      helperText,
      errorText,
      disabled,
      required,
      fullWidth,
      startIcon,
      endIcon,
      className,
      isOpen,
      onToggle: toggleDropdown,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Select: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      options: validOptions,
      value: selectedValue,
      onChange,
      placeholder,
      variant,
      size,
      state,
      label,
      helperText,
      errorText,
      disabled,
      required,
      fullWidth,
      startIcon,
      endIcon,
      className,
      isOpen,
      onToggle: toggleDropdown,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    options: extendedOptions,
    value: extendedValue,
    onChange: extendedOnChange,
    placeholder: extendedPlaceholder,
    variant: extendedVariant,
    size: extendedSize,
    state: extendedState,
    label: extendedLabel,
    helperText: extendedHelperText,
    errorText: extendedErrorText,
    disabled: extendedDisabled,
    required: extendedRequired,
    fullWidth: extendedFullWidth,
    startIcon: extendedStartIcon,
    endIcon: extendedEndIcon,
    className: extendedClassName,
    isOpen: extendedIsOpen,
    onToggle: extendedOnToggle,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const selectWrapperClasses = [
    'ds-select-wrapper',
    `ds-select-${extendedVariant}`,
    `ds-select-${extendedSize}`,
    `ds-select-${extendedState}`,
    extendedDisabled ? 'ds-select-disabled' : '',
    extendedFullWidth ? 'ds-select-full-width' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Determine if we should show error text
  const showErrorText = extendedState === SELECT_STATES.ERROR && extendedErrorText;
  
  // Determine helper text to display
  const displayHelperText = showErrorText ? extendedErrorText : extendedHelperText;

  // Default dropdown icon
  const defaultEndIcon = (
    <svg 
      className={`ds-select-arrow ${extendedIsOpen ? 'ds-select-arrow-open' : ''}`}
      width="10" 
      height="6" 
      viewBox="0 0 10 6" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  return (
    <div 
      className={selectWrapperClasses} 
      ref={selectRef}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {extendedLabel && (
        <label className="ds-select-label">
          {extendedLabel}
          {extendedRequired && <span className="ds-select-required">*</span>}
        </label>
      )}
      
      <div 
        className={`ds-select-container ${extendedIsOpen ? 'ds-select-open' : ''}`}
        onClick={extendedOnToggle}
        tabIndex={extendedDisabled ? -1 : 0}
        role="combobox"
        aria-expanded={extendedIsOpen}
        aria-haspopup="listbox"
        aria-disabled={extendedDisabled}
        aria-required={extendedRequired}
        aria-invalid={extendedState === SELECT_STATES.ERROR}
      >
        {extendedStartIcon && (
          <div className="ds-select-icon ds-select-start-icon">
            {extendedStartIcon}
          </div>
        )}
        
        <div className="ds-select-value">
          {selectedOption ? selectedOption.label : extendedPlaceholder}
        </div>
        
        <div className="ds-select-icon ds-select-end-icon">
          {extendedEndIcon || defaultEndIcon}
        </div>
      </div>
      
      {extendedIsOpen && (
        <ul 
          className="ds-select-dropdown"
          ref={dropdownRef}
          role="listbox"
          aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
        >
          {extendedOptions.length > 0 ? (
            extendedOptions.map((option, index) => (
              <li
                key={option.value}
                id={`option-${index}`}
                className={`ds-select-option ${option.value === extendedValue ? 'ds-select-option-selected' : ''} ${index === highlightedIndex ? 'ds-select-option-highlighted' : ''}`}
                onClick={() => handleOptionSelect(option)}
                role="option"
                aria-selected={option.value === extendedValue}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="ds-select-no-options">No options available</li>
          )}
        </ul>
      )}
      
      {displayHelperText && (
        <div className={`ds-select-helper-text ${showErrorText ? 'ds-select-error-text' : ''}`}>
          {displayHelperText}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  /** Array of options to display in the select */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.node.isRequired,
    })
  ),
  /** Selected value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback when selection changes */
  onChange: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Select variant */
  variant: PropTypes.oneOf(Object.values(SELECT_VARIANTS)),
  /** Select size */
  size: PropTypes.oneOf(Object.values(SELECT_SIZES)),
  /** Select state */
  state: PropTypes.oneOf(Object.values(SELECT_STATES)),
  /** Select label */
  label: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Error text (shown when state is ERROR) */
  errorText: PropTypes.string,
  /** Whether the select is disabled */
  disabled: PropTypes.bool,
  /** Whether the select is required */
  required: PropTypes.bool,
  /** Whether the select should take full width */
  fullWidth: PropTypes.bool,
  /** Icon to display at the start of the select */
  startIcon: PropTypes.node,
  /** Icon to display at the end of the select */
  endIcon: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the select */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Select;
