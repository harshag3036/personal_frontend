import { MENU_VARIANTS, MENU_SIZES } from './constants';
import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import './Menu.css';

/**
 * Menu Context
 * 
 * Provides state and handlers for the Menu component and its children.
 */
const MenuContext = createContext({
  isOpen: false,
  activeIndex: -1,
  variant: 'default',
  size: 'md',
  onClose: () => {},
  onItemClick: () => {},
  registerItem: () => {},
  setActiveIndex: () => {},
});

/**
 * useMenu Hook
 * 
 * Custom hook to access the Menu context.
 */
export const useMenu = () => useContext(MenuContext);

/**
 * Menu Component
 * 
 * A component that displays a menu with selectable items.
 * 
 * @example
 * ```jsx
 * <Menu>
 *   <MenuItem>Option 1</MenuItem>
 *   <MenuItem>Option 2</MenuItem>
 *   <MenuDivider />
 *   <MenuItem>Option 3</MenuItem>
 * </Menu>
 * ```
 */
const Menu = ({
  children,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onItemClick,
  variant = 'default',
  size = 'md',
  closeOnBlur = true,
  closeOnEsc = true,
  closeOnSelect = true,
  autoFocus = true,
  initialFocusIndex = 0,
  ...restProps
}) => {
  // State for uncontrolled component
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialFocusIndex);
  const [items, setItems] = useState([]);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // Refs
  const menuRef = useRef(null);
  
  // Handle opening the menu
  const handleOpen = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }
  };
  
  // Handle closing the menu - memoized to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    if (!isControlled) {
      setUncontrolledIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
    setActiveIndex(initialFocusIndex);
  }, [isControlled, onClose, initialFocusIndex, setUncontrolledIsOpen]);
  
  // Handle item click - memoized to prevent unnecessary re-renders
  const handleItemClick = useCallback((event, index, value) => {
    if (onItemClick) {
      onItemClick(event, index, value);
    }
    
    if (closeOnSelect) {
      handleClose();
    }
  }, [onItemClick, closeOnSelect, handleClose]);
  
  // Register menu item - memoized with useCallback to prevent infinite re-renders
  const registerItem = useCallback((index, ref) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = ref;
      return newItems;
    });
  }, []);
  
  // Handle escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeOnEsc, handleClose]);
  
  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnBlur) return;
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnBlur, handleClose]);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % items.length;
            if (items[nextIndex] && items[nextIndex].current) {
              items[nextIndex].current.focus();
            }
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex((prevIndex) => {
            const nextIndex = (prevIndex - 1 + items.length) % items.length;
            if (items[nextIndex] && items[nextIndex].current) {
              items[nextIndex].current.focus();
            }
            return nextIndex;
          });
          break;
        case 'Home':
          event.preventDefault();
          if (items[0] && items[0].current) {
            items[0].current.focus();
          }
          setActiveIndex(0);
          break;
        case 'End':
          event.preventDefault();
          const lastIndex = items.length - 1;
          if (items[lastIndex] && items[lastIndex].current) {
            items[lastIndex].current.focus();
          }
          setActiveIndex(lastIndex);
          break;
        default:
          break;
      }
    };
    
    menuRef.current?.addEventListener('keydown', handleKeyDown);
    
    return () => {
      menuRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, items]);
  
  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen && autoFocus && items.length > 0) {
      const focusIndex = initialFocusIndex >= 0 && initialFocusIndex < items.length
        ? initialFocusIndex
        : 0;
      
      if (items[focusIndex] && items[focusIndex].current) {
        items[focusIndex].current.focus();
      }
    }
  }, [isOpen, items, autoFocus, initialFocusIndex]);
  
  // Context value - memoize functions that could cause re-renders
  const setActiveIndexCallback = useCallback((index) => {
    setActiveIndex(index);
  }, []);
  
  // Combine class names
  const menuClasses = [
    'ui-menu',
    `ui-menu--${variant}`,
    `ui-menu--${size}`,
  ].filter(Boolean).join(' ');
  
  // Context value
  const contextValue = {
    isOpen,
    activeIndex,
    variant,
    size,
    onClose: handleClose,
    onItemClick: handleItemClick,
    registerItem,
    setActiveIndex: setActiveIndexCallback,
  };
  
  // Create menu state object for render props
  const menuState = useMemo(() => ({
    // Current state
    isOpen,
    activeIndex,
    items,
    
    // Configuration
    variant,
    size,
    closeOnBlur,
    closeOnEsc,
    closeOnSelect,
    autoFocus,
    initialFocusIndex,
    
    // Actions
    open: handleOpen,
    close: handleClose,
    onItemClick: handleItemClick,
    registerItem,
    setActiveIndex: setActiveIndexCallback,
    
    // Refs
    menuRef,
    
    // Functions for keyboard navigation
    navigateNext: () => {
      if (items.length === 0) return;
      const nextIndex = (activeIndex + 1) % items.length;
      if (items[nextIndex] && items[nextIndex].current) {
        items[nextIndex].current.focus();
      }
      setActiveIndex(nextIndex);
    },
    
    navigatePrevious: () => {
      if (items.length === 0) return;
      const nextIndex = (activeIndex - 1 + items.length) % items.length;
      if (items[nextIndex] && items[nextIndex].current) {
        items[nextIndex].current.focus();
      }
      setActiveIndex(nextIndex);
    },
    
    navigateToFirst: () => {
      if (items.length === 0 || !items[0] || !items[0].current) return;
      items[0].current.focus();
      setActiveIndex(0);
    },
    
    navigateToLast: () => {
      if (items.length === 0) return;
      const lastIndex = items.length - 1;
      if (items[lastIndex] && items[lastIndex].current) {
        items[lastIndex].current.focus();
      }
      setActiveIndex(lastIndex);
    },
    
    // CSS Classes
    menuClasses,
    
    // Constants
    variants: MENU_VARIANTS,
    sizes: MENU_SIZES
  }), [
    isOpen, 
    activeIndex, 
    items, 
    variant, 
    size, 
    closeOnBlur, 
    closeOnEsc, 
    closeOnSelect, 
    autoFocus, 
    initialFocusIndex, 
    handleOpen,
    handleClose, 
    handleItemClick, 
    registerItem, 
    setActiveIndexCallback,
    menuClasses
  ]);
  
  // Check if using render props
  const isRenderProps = isFunction(children);
  
  // Don't render if not open
  if (!isOpen) return null;
  
  // If using render props, return children as a function with menu state
  if (isRenderProps) {
    return (
      <MenuContext.Provider value={contextValue}>
        <div
          ref={menuRef}
          className={menuClasses}
          role="menu"
          tabIndex={-1}
          {...restProps}
        >
          {children(menuState)}
        </div>
      </MenuContext.Provider>
    );
  }
  
  // Default rendering with compound components
  return (
    <MenuContext.Provider value={contextValue}>
      <div
        ref={menuRef}
        className={menuClasses}
        role="menu"
        tabIndex={-1}
        {...restProps}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
};

Menu.propTypes = {
  /** 
   * Menu content or render props function
   * If a function is provided, it will be called with the menu state 
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  /** Whether the menu is open (controlled) */
  isOpen: PropTypes.bool,
  /** Callback when the menu opens */
  onOpen: PropTypes.func,
  /** Callback when the menu closes */
  onClose: PropTypes.func,
  /** Callback when a menu item is clicked */
  onItemClick: PropTypes.func,
  /** The visual variant of the menu */
  variant: PropTypes.oneOf(Object.values(MENU_VARIANTS)),
  /** The size of the menu */
  size: PropTypes.oneOf(Object.values(MENU_SIZES)),
  /** Whether to close the menu when clicking outside */
  closeOnBlur: PropTypes.bool,
  /** Whether to close the menu when pressing escape */
  closeOnEsc: PropTypes.bool,
  /** Whether to close the menu when an item is selected */
  closeOnSelect: PropTypes.bool,
  /** Whether to automatically focus the menu when it opens */
  autoFocus: PropTypes.bool,
  /** The index of the item to focus initially */
  initialFocusIndex: PropTypes.number,
};

export default Menu;
