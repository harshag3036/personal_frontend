import React, { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { useDropdown } from './Dropdown';

/**
 * DropdownTrigger Component
 * 
 * A component that wraps a button or other interactive element to trigger the dropdown.
 * 
 * @example
 * ```jsx
 * <DropdownTrigger>
 *   <Button>Options</Button>
 * </DropdownTrigger>
 * ```
 */
const DropdownTrigger = ({
  children,
  className = '',
  ...restProps
}) => {
  const { isOpen, toggle, triggerRef } = useDropdown();
  
  // Ensure children is a valid React element
  if (!isValidElement(children)) {
    throw new Error('DropdownTrigger must have a single React element as a child');
  }
  
  // Combine class names
  const triggerClasses = [
    'ui-dropdown-trigger',
    className
  ].filter(Boolean).join(' ');
  
  // Clone the child element to add necessary props
  const enhancedChild = cloneElement(children, {
    ref: triggerRef,
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    onClick: (event) => {
      // Call the original onClick if it exists
      if (children.props.onClick) {
        children.props.onClick(event);
      }
      
      toggle();
    },
    className: [
      children.props.className,
      'ui-dropdown-trigger__button'
    ].filter(Boolean).join(' '),
  });
  
  return (
    <div className={triggerClasses} {...restProps}>
      {enhancedChild}
    </div>
  );
};

DropdownTrigger.propTypes = {
  /** Trigger element (usually a button) */
  children: PropTypes.element.isRequired,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default DropdownTrigger;
