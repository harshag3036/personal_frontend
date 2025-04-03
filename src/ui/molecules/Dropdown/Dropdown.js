import { DROPDOWN_VARIANTS, DROPDOWN_SIZES, DROPDOWN_PLACEMENTS } from './constants';
import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import './Dropdown.css';

/**
 * Dropdown Context
 * 
 * Provides state and methods for dropdown components.
 */
export const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
  close: () => {},
  triggerRef: null,
  menuRef: null,
  placement: 'bottom-start',
  variant: 'default',
  size: 'md',
});

/**
 * Dropdown Component
 * 
 * A versatile dropdown component that can be used to display a menu of options.
 * This component follows the WAI-ARIA Menu Button Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <Dropdown>
 *   <DropdownTrigger>
 *     <Button>Options</Button>
 *   </DropdownTrigger>
 *   <DropdownMenu>
 *     <DropdownItem>Option 1</DropdownItem>
 *     <DropdownItem>Option 2</DropdownItem>
 *     <DropdownItem>Option 3</DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 * ```
 */
const Dropdown = ({
  children,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onToggle,
  placement = 'bottom-start',
  variant = 'default',
  size = 'md',
  closeOnItemClick = true,
  closeOnOutsideClick = true,
  className = '',
  ...restProps
}) => {
  // Determine if the component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  
  // Use the controlled value if provided, otherwise use the uncontrolled value
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // Refs for positioning
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Toggle the dropdown
  const toggle = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(!isOpen);
    }
    
    if (onToggle) {
      onToggle(!isOpen);
    }
  };
  
  // Close the dropdown
  const close = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(false);
    }
    
    if (onToggle && isOpen) {
      onToggle(false);
    }
  };
  
  // Handle outside clicks
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;
    
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        close();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick]);
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);
  
  // Combine class names
  const dropdownClasses = [
    'ui-dropdown',
    `ui-dropdown--${variant}`,
    `ui-dropdown--${size}`,
    className
  ].filter(Boolean).join(' ');
  
  // Context value
  const contextValue = {
    isOpen,
    toggle,
    close,
    triggerRef,
    menuRef,
    placement,
    variant,
    size,
    closeOnItemClick,
  };

  // Create dropdown state object for render props
  const dropdownState = useMemo(() => ({
    // Current state
    isOpen,
    
    // Refs
    triggerRef,
    menuRef,
    dropdownRef,
    
    // Configuration
    variant,
    size,
    placement,
    closeOnItemClick,
    closeOnOutsideClick,
    
    // Actions
    toggle,
    close,
    open: () => {
      if (!isControlled) {
        setUncontrolledIsOpen(true);
      }
      
      if (onToggle && !isOpen) {
        onToggle(true);
      }
    },
    
    // CSS Classes
    dropdownClasses,
    
    // Constants
    variants: DROPDOWN_VARIANTS,
    sizes: DROPDOWN_SIZES,
    placements: DROPDOWN_PLACEMENTS
  }), [
    isOpen, 
    variant, 
    size, 
    placement, 
    closeOnItemClick, 
    closeOnOutsideClick, 
    dropdownClasses, 
    isControlled, 
    onToggle
  ]);
  
  // Check if using render props
  const isRenderProps = isFunction(children);
  
  // If using render props, return children as a function with dropdown state
  if (isRenderProps) {
    return (
      <DropdownContext.Provider value={contextValue}>
        <div 
          ref={dropdownRef}
          className={dropdownClasses}
          {...restProps}
        >
          {children(dropdownState)}
        </div>
      </DropdownContext.Provider>
    );
  }
  
  // Default rendering with compound components
  return (
    <DropdownContext.Provider value={contextValue}>
      <div 
        ref={dropdownRef}
        className={dropdownClasses}
        {...restProps}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.propTypes = {
  /** 
   * Dropdown content or render props function
   * If a function is provided, it will be called with the dropdown state
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  /** Whether the dropdown is open (controlled) */
  isOpen: PropTypes.bool,
  /** Whether the dropdown is open by default (uncontrolled) */
  defaultOpen: PropTypes.bool,
  /** Callback when the dropdown is toggled */
  onToggle: PropTypes.func,
  /** Placement of the dropdown menu */
  placement: PropTypes.oneOf(Object.values(DROPDOWN_PLACEMENTS)),
  /** Visual variant of the dropdown */
  variant: PropTypes.oneOf(Object.values(DROPDOWN_VARIANTS)),
  /** Size of the dropdown */
  size: PropTypes.oneOf(Object.values(DROPDOWN_SIZES)),
  /** Whether to close the dropdown when an item is clicked */
  closeOnItemClick: PropTypes.bool,
  /** Whether to close the dropdown when clicking outside */
  closeOnOutsideClick: PropTypes.bool,
  /** Additional CSS class */
  className: PropTypes.string,
};

/**
 * useDropdown Hook
 * 
 * A hook to access the dropdown context.
 */
export const useDropdown = () => {
  const context = useContext(DropdownContext);
  
  if (!context) {
    throw new Error('useDropdown must be used within a Dropdown component');
  }
  
  return context;
};

export default Dropdown;
