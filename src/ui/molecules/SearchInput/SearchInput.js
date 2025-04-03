import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveClassNames } from '../../utilities/responsive-props';
import { 
  SEARCH_INPUT_VARIANTS, 
  SEARCH_INPUT_SIZES, 
  DEFAULT_PROPS 
} from './constants';
import Icon from '../../atoms/Icon';
import './SearchInput.css';

/**
 * SearchInput Component
 * 
 * A search input component with debounce functionality, clear button, and loading state.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <SearchInput 
 *   placeholder="Search products..." 
 *   onChange={handleSearch} 
 * />
 * 
 * // With custom configuration
 * <SearchInput 
 *   variant="filled"
 *   size="large"
 *   placeholder="Search users..."
 *   debounceTime={500}
 *   clearable={true}
 *   onChange={handleSearch}
 *   onClear={handleClear}
 *   isLoading={isSearching}
 * />
 * ```
 */
const SearchInput = ({
  as: Element = 'div',
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  placeholder = DEFAULT_PROPS.placeholder,
  value: initialValue = '',
  clearable = DEFAULT_PROPS.clearable,
  disabled = DEFAULT_PROPS.disabled,
  autoFocus = DEFAULT_PROPS.autoFocus,
  debounceTime = DEFAULT_PROPS.debounceTime,
  isLoading = false,
  className = '',
  style = {},
  onChange,
  onFocus,
  onBlur,
  onClear,
  children,
  ...restProps
}) => {
  // State
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Handle responsive variants
  const variantClass = isResponsiveObject(variant)
    ? createResponsiveClassNames('ui-search-input', variant)
    : `ui-search-input--${variant}`;

  // Handle responsive sizes
  const sizeClass = isResponsiveObject(size)
    ? createResponsiveClassNames('ui-search-input', size)
    : `ui-search-input--${size}`;

  // Combine class names
  const searchInputClasses = [
    'ui-search-input',
    variantClass,
    sizeClass,
    isFocused && 'ui-search-input--focused',
    disabled && 'ui-search-input--disabled',
    className
  ].filter(Boolean).join(' ');

  // Handle input change with debounce
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      if (onChange) {
        onChange(newValue);
      }
    }, debounceTime);
  }, [onChange, debounceTime]);

  // Handle focus
  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);

  // Handle blur
  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);

  // Handle clear
  const handleClear = useCallback(() => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Call onChange with empty value
    if (onChange) {
      onChange('');
    }
    
    // Call onClear if provided
    if (onClear) {
      onClear();
    }
  }, [onChange, onClear]);

  // Update value when initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Create search input state object for render props pattern
  const searchInputState = {
    // Data
    value,
    isFocused,
    
    // Configuration
    variant,
    size,
    placeholder,
    clearable,
    disabled,
    isLoading,
    
    // References
    inputRef,
    
    // Methods
    setValue: (newValue) => {
      setValue(newValue);
      if (onChange) {
        // Clear previous debounce timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        // Set new debounce timer
        debounceTimerRef.current = setTimeout(() => {
          onChange(newValue);
        }, debounceTime);
      }
    },
    handleChange,
    handleFocus,
    handleBlur,
    handleClear,
    
    // Utilities
    startLoading: () => {
      // This is just a placeholder, actual loading state is controlled via props
      console.log('Set isLoading to true in parent component');
    },
    stopLoading: () => {
      // This is just a placeholder, actual loading state is controlled via props
      console.log('Set isLoading to false in parent component');
    }
  };
  
  // Check if children is a function (render props pattern)
  const isRenderProps = typeof children === 'function';
  
  return (
    <Element className={searchInputClasses} style={style} {...restProps}>
      {isRenderProps ? (
        // Render props pattern - pass search input state to the children function
        children(searchInputState)
      ) : (
        <div className="ui-search-input__container">
          <div className="ui-search-input__icon">
            <Icon name="search" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            className="ui-search-input__field"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            aria-label={placeholder}
          />
          
          {isLoading && (
            <div className="ui-search-input__loading">
              <Icon name="spinner" className="ui-search-input__loading-icon" />
            </div>
          )}
          
          {clearable && value && !isLoading && (
            <button
              type="button"
              className="ui-search-input__clear"
              onClick={handleClear}
              aria-label="Clear search"
              tabIndex={0}
            >
              <Icon name="close" />
            </button>
          )}
        </div>
      )}
    </Element>
  );
};

SearchInput.propTypes = {
  /** Element to render the SearchInput as */
  ...polymorphicPropTypes,
  /** Visual variant of the search input */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SEARCH_INPUT_VARIANTS)),
    PropTypes.object, // For responsive variants
  ]),
  /** Size of the search input */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SEARCH_INPUT_SIZES)),
    PropTypes.object, // For responsive sizes
  ]),
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Initial value */
  value: PropTypes.string,
  /** Whether to show clear button */
  clearable: PropTypes.bool,
  /** Whether the search input is disabled */
  disabled: PropTypes.bool,
  /** Whether to auto focus the input */
  autoFocus: PropTypes.bool,
  /** Debounce time in milliseconds */
  debounceTime: PropTypes.number,
  /** Whether the search is loading */
  isLoading: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Callback fired when the value changes */
  onChange: PropTypes.func,
  /** Callback fired when the input is focused */
  onFocus: PropTypes.func,
  /** Callback fired when the input is blurred */
  onBlur: PropTypes.func,
  /** Callback fired when the clear button is clicked */
  onClear: PropTypes.func,
  /** 
   * SearchInput content or render props function
   * When a function is provided, it receives the search input state object
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ])
};

export default SearchInput;
