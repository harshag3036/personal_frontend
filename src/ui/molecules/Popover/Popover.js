import { POPOVER_VARIANTS, POPOVER_SIZES, POPOVER_PLACEMENTS } from './constants';
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popover.css';

/**
 * Popover Context
 * 
 * Provides state and handlers for the Popover component and its children.
 */
const PopoverContext = createContext({
  isOpen: false,
  triggerRef: null,
  contentRef: null,
  placement: 'bottom',
  variant: 'default',
  size: 'md',
  arrow: true,
  offset: 8,
  onOpen: () => {},
  onClose: () => {},
  toggle: () => {},
});

/**
 * usePopover Hook
 * 
 * Custom hook to access the Popover context.
 */
export const usePopover = () => useContext(PopoverContext);

/**
 * Popover Component
 * 
 * A component that displays content when a trigger element is clicked.
 * 
 * @example
 * ```jsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <Text>This is the popover content</Text>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
const Popover = ({
  children,
  placement = 'bottom',
  variant = 'default',
  size = 'md',
  arrow = true,
  offset = 8,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  closeOnBlur = true,
  closeOnEsc = true,
  initialFocusRef,
  returnFocusRef,
  autoFocus = true,
  trapFocus = true,
  ...restProps
}) => {
  // State for uncontrolled component
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // Refs for positioning
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  
  // Handle opening the popover
  const handleOpen = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }
  };
  
  // Handle closing the popover
  const handleClose = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };
  
  // Toggle the popover
  const toggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };
  
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
  }, [isOpen, closeOnEsc]);
  
  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnBlur) return;
    
    const handleClickOutside = (event) => {
      if (
        contentRef.current && 
        !contentRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnBlur]);
  
  // Focus management
  useEffect(() => {
    if (!isOpen) return;
    
    // Store the active element to return focus later
    const activeElement = document.activeElement;
    
    // Focus the initial element if provided
    if (initialFocusRef && initialFocusRef.current && autoFocus) {
      initialFocusRef.current.focus();
    } else if (contentRef.current && autoFocus) {
      // Focus the content if no initial focus ref is provided
      contentRef.current.focus();
    }
    
    return () => {
      // Return focus when popover closes
      if (returnFocusRef && returnFocusRef.current) {
        returnFocusRef.current.focus();
      } else if (activeElement) {
        activeElement.focus();
      }
    };
  }, [isOpen, initialFocusRef, returnFocusRef, autoFocus]);
  
  // Context value
  const contextValue = {
    isOpen,
    triggerRef,
    contentRef,
    placement,
    variant,
    size,
    arrow,
    offset,
    onOpen: handleOpen,
    onClose: handleClose,
    toggle,
    initialFocusRef,
    trapFocus,
  };
  
  return (
    <PopoverContext.Provider value={contextValue}>
      <div className="ui-popover" {...restProps}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

Popover.propTypes = {
  /** The content of the popover */
  children: PropTypes.node.isRequired,
  /** The placement of the popover relative to the trigger */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end']),
  /** The visual variant of the popover */
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'info', 'success', 'warning', 'error']),
  /** The size of the popover */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether to show an arrow pointing to the trigger */
  arrow: PropTypes.bool,
  /** The distance between the popover and the trigger (in pixels) */
  offset: PropTypes.number,
  /** Whether the popover is open (controlled) */
  isOpen: PropTypes.bool,
  /** Callback when the popover opens */
  onOpen: PropTypes.func,
  /** Callback when the popover closes */
  onClose: PropTypes.func,
  /** Whether to close the popover when clicking outside */
  closeOnBlur: PropTypes.bool,
  /** Whether to close the popover when pressing escape */
  closeOnEsc: PropTypes.bool,
  /** Ref to the element to focus when the popover opens */
  initialFocusRef: PropTypes.shape({ current: PropTypes.any }),
  /** Ref to the element to focus when the popover closes */
  returnFocusRef: PropTypes.shape({ current: PropTypes.any }),
  /** Whether to automatically focus the popover content when it opens */
  autoFocus: PropTypes.bool,
  /** Whether to trap focus within the popover */
  trapFocus: PropTypes.bool,
};

export default Popover;
