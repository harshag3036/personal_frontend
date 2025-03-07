import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useDropdown } from './Dropdown';

/**
 * DropdownItem Component
 * 
 * A component that represents an item in a dropdown menu.
 * 
 * @example
 * ```jsx
 * <DropdownItem onClick={() => console.log('Item clicked')}>
 *   Option 1
 * </DropdownItem>
 * ```
 */
const DropdownItem = forwardRef(({
  children,
  onClick,
  disabled = false,
  icon,
  className = '',
  ...restProps
}, ref) => {
  const { close, closeOnItemClick } = useDropdown();
  
  // Handle click
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
    
    if (closeOnItemClick) {
      close();
    }
  };
  
  // Handle keyboard events
  const handleKeyDown = (event) => {
    if (disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };
  
  // Combine class names
  const itemClasses = [
    'ui-dropdown-item',
    disabled && 'ui-dropdown-item--disabled',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={ref}
      className={itemClasses}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      {...restProps}
    >
      {icon && (
        <span className="ui-dropdown-item__icon">
          {icon}
        </span>
      )}
      <span className="ui-dropdown-item__content">
        {children}
      </span>
    </div>
  );
});

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  /** Item content */
  children: PropTypes.node.isRequired,
  /** Callback when the item is clicked */
  onClick: PropTypes.func,
  /** Whether the item is disabled */
  disabled: PropTypes.bool,
  /** Icon to display before the content */
  icon: PropTypes.node,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default DropdownItem;
