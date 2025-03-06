/**
 * Select Component
 * 
 * A customizable select/dropdown component with support for variants, sizes, states, and responsive props.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Select 
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3' }
 *   ]} 
 *   label="Select an option" 
 * />
 * 
 * // Controlled select
 * <Select 
 *   options={options} 
 *   value={selectedValue} 
 *   onChange={handleChange} 
 *   label="Controlled select" 
 * />
 * 
 * // With helper text
 * <Select 
 *   options={options} 
 *   label="Select with helper text" 
 *   helperText="Choose the best option for you"
 * />
 * 
 * // Different variants
 * <Select options={options} label="Default variant" variant="default" />
 * <Select options={options} label="Filled variant" variant="filled" />
 * <Select options={options} label="Outlined variant" variant="outlined" />
 * 
 * // Different sizes
 * <Select options={options} label="Small select" size="small" />
 * <Select options={options} label="Medium select" size="medium" />
 * <Select options={options} label="Large select" size="large" />
 * 
 * // Different states
 * <Select options={options} label="Default state" state="default" />
 * <Select options={options} label="Success state" state="success" />
 * <Select options={options} label="Error state" state="error" errorText="This field is required" />
 * <Select options={options} label="Warning state" state="warning" />
 * 
 * // Disabled select
 * <Select options={options} label="Disabled select" disabled />
 * 
 * // Required select
 * <Select options={options} label="Required select" required />
 * 
 * // Full width select
 * <Select options={options} label="Full width select" fullWidth />
 * 
 * // With icons
 * <Select 
 *   options={options} 
 *   label="Select with icons" 
 *   startIcon={<SearchIcon />} 
 *   endIcon={<ArrowIcon />} 
 * />
 * 
 * // Responsive props
 * <Select 
 *   options={options} 
 *   label="Responsive select" 
 *   size={{ base: "small", md: "medium", lg: "large" }}
 * />
 * 
 * // Polymorphic rendering
 * <Select 
 *   as="section"
 *   options={options} 
 *   label="Polymorphic select" 
 * />
 * ```
 */

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { 
  SELECT_CLASS, 
  SELECT_VARIANTS, 
  SELECT_SIZES, 
  SELECT_STATES, 
  SELECT_MODIFIERS, 
  SELECT_BREAKPOINTS 
} from './index';
import './Select.css';

/**
 * Select Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='div'] - Element to render the Select as
 * @param {Array} props.options - Array of options to display in the select
 * @param {string|number} [props.value] - Selected value
 * @param {Function} [props.onChange] - Callback when selection changes
 * @param {string} [props.placeholder='Select an option'] - Placeholder text
 * @param {string|Object} [props.variant=SELECT_VARIANTS.DEFAULT] - Select variant or responsive object
 * @param {string|Object} [props.size=SELECT_SIZES.MEDIUM] - Select size or responsive object
 * @param {string|Object} [props.state=SELECT_STATES.DEFAULT] - Select state or responsive object
 * @param {string} [props.label] - Select label
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.errorText] - Error text (shown when state is ERROR)
 * @param {boolean} [props.disabled=false] - Whether the select is disabled
 * @param {boolean} [props.required=false] - Whether the select is required
 * @param {boolean} [props.fullWidth=false] - Whether the select should take full width
 * @param {React.ReactNode} [props.startIcon] - Icon to display at the start of the select
 * @param {React.ReactNode} [props.endIcon] - Icon to display at the end of the select
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the select
 * @returns {JSX.Element} Select component
 */
const Select = forwardRef(({
  as = 'div',
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
  style = {},
  extensions = [],
  ...props
}, ref) => {
  // State for dropdown open/close
  const [isOpen, setIsOpen] = useState(false);
  
  // State for selected value
  const [selectedValue, setSelectedValue] = useState(value);
  
  // State for highlighted option index
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  // State for focus tracking
  const [isFocused, setIsFocused] = useState(false);
  
  // Refs for DOM elements
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Forward the ref to the select container
  const combinedRef = (node) => {
    selectRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
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
  const baseVariant = !isResponsiveObject(variant) ? variant : SELECT_VARIANTS.DEFAULT;
  const baseSize = !isResponsiveObject(size) ? size : SELECT_SIZES.MEDIUM;
  const baseState = !isResponsiveObject(state) ? state : SELECT_STATES.DEFAULT;

  // Error handling for invalid variants
  if (baseVariant && !Object.values(SELECT_VARIANTS).includes(baseVariant)) {
    console.warn(`Select: Invalid variant "${baseVariant}". Falling back to DEFAULT.`);
    variant = SELECT_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (baseSize && !Object.values(SELECT_SIZES).includes(baseSize)) {
    console.warn(`Select: Invalid size "${baseSize}". Falling back to MEDIUM.`);
    size = SELECT_SIZES.MEDIUM;
  }

  // Error handling for invalid states
  if (baseState && !Object.values(SELECT_STATES).includes(baseState)) {
    console.warn(`Select: Invalid state "${baseState}". Falling back to DEFAULT.`);
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
  
  // Handle focus event
  const handleFocus = (event) => {
    setIsFocused(true);
  };
  
  // Handle blur event
  const handleBlur = (event) => {
    // Don't blur if clicking on an option
    if (dropdownRef.current && dropdownRef.current.contains(event.relatedTarget)) {
      return;
    }
    setIsFocused(false);
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
      as,
      options: validOptions,
      value: selectedValue,
      onChange,
      placeholder,
      variant: baseVariant,
      size: baseSize,
      state: baseState,
      label,
      helperText,
      errorText,
      disabled,
      required,
      fullWidth,
      startIcon,
      endIcon,
      className,
      style,
      isOpen,
      isFocused,
      onToggle: toggleDropdown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Select: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      as,
      options: validOptions,
      value: selectedValue,
      onChange,
      placeholder,
      variant: baseVariant,
      size: baseSize,
      state: baseState,
      label,
      helperText,
      errorText,
      disabled,
      required,
      fullWidth,
      startIcon,
      endIcon,
      className,
      style,
      isOpen,
      isFocused,
      onToggle: toggleDropdown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    as: extendedAs,
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
    style: extendedStyle,
    isOpen: extendedIsOpen,
    isFocused: extendedIsFocused,
    onToggle: extendedOnToggle,
    onFocus: extendedOnFocus,
    onBlur: extendedOnBlur,
    ...restProps
  } = extendedProps;
  
  // Generate a unique ID for accessibility
  const uniqueId = props.id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  // Combine class names
  const selectWrapperClasses = [
    SELECT_CLASS,
    `${SELECT_CLASS}-wrapper`,
    `${SELECT_CLASS}-${extendedVariant}`,
    `${SELECT_CLASS}-${extendedSize}`,
    `${SELECT_CLASS}-${extendedState}`,
    extendedDisabled ? `${SELECT_CLASS}-${SELECT_MODIFIERS.DISABLED}` : '',
    extendedRequired ? `${SELECT_CLASS}-${SELECT_MODIFIERS.REQUIRED}` : '',
    extendedFullWidth ? `${SELECT_CLASS}-${SELECT_MODIFIERS.FULL_WIDTH}` : '',
    extendedIsFocused ? `${SELECT_CLASS}-${SELECT_MODIFIERS.FOCUSED}` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const selectWrapperStyle = {
    ...extendedStyle,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    selectWrapperStyle['--responsive-styles'] = responsiveStyles;
  }
  
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
  
  // Use Box for consistent rendering and polymorphic support
  return (
    <Box
      as={extendedAs}
      className={selectWrapperClasses} 
      ref={combinedRef}
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
    </Box>
  );
});

Select.propTypes = {
  /** Element to render the Select as */
  ...polymorphicPropTypes,
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
  /** Select variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SELECT_VARIANTS)),
    PropTypes.object
  ]),
  /** Select size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SELECT_SIZES)),
    PropTypes.object
  ]),
  /** Select state or responsive object */
  state: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SELECT_STATES)),
    PropTypes.object
  ]),
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
  /** Additional inline styles */
  style: PropTypes.object,
  /** Extensions to apply to the select */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** ID for the select */
  id: PropTypes.string,
};

export default Select;
