import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMenu } from './Menu';

/**
 * MenuItem Component
 * 
 * A component that represents an item in a Menu.
 * 
 * @example
 * ```jsx
 * <MenuItem icon={<Icon name="user" />} value="profile">
 *   Profile
 * </MenuItem>
 * ```
 */
const MenuItem = ({
  children,
  icon,
  rightIcon,
  value,
  disabled = false,
  index: controlledIndex,
  onClick,
  className = '',
  ...restProps
}) => {
  const {
    activeIndex,
    variant,
    size,
    onItemClick,
    registerItem,
    setActiveIndex,
  } = useMenu();
  
  // Ref for the menu item
  const itemRef = useRef(null);
  
  // Determine the index
  const index = controlledIndex !== undefined ? controlledIndex : -1;
  
  // Register the item with the menu
  useEffect(() => {
    if (index !== -1) {
      registerItem(index, itemRef);
    }
  }, [index, registerItem]);
  
  // Handle click - memoized to prevent unnecessary re-renders
  const handleClick = useCallback((event) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(event);
    }
    
    onItemClick(event, index, value);
  }, [disabled, onClick, onItemClick, index, value]);
  
  // Handle mouse enter - memoized to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    
    setActiveIndex(index);
  }, [disabled, index, setActiveIndex]);
  
  // Handle key down - memoized to prevent unnecessary re-renders
  const handleKeyDown = useCallback((event) => {
    if (disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  }, [disabled, handleClick]);
  
  // Combine class names
  const itemClasses = [
    'ui-menu-item',
    `ui-menu-item--${variant}`,
    `ui-menu-item--${size}`,
    activeIndex === index && 'ui-menu-item--active',
    disabled && 'ui-menu-item--disabled',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={itemRef}
      className={itemClasses}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {icon && <span className="ui-menu-item__icon">{icon}</span>}
      <span className="ui-menu-item__content">{children}</span>
      {rightIcon && <span className="ui-menu-item__right-icon">{rightIcon}</span>}
    </div>
  );
};

MenuItem.propTypes = {
  /** The content of the menu item */
  children: PropTypes.node.isRequired,
  /** Icon to display before the content */
  icon: PropTypes.node,
  /** Icon to display after the content */
  rightIcon: PropTypes.node,
  /** The value of the menu item */
  value: PropTypes.any,
  /** Whether the menu item is disabled */
  disabled: PropTypes.bool,
  /** The index of the menu item (usually provided by the Menu) */
  index: PropTypes.number,
  /** Callback when the menu item is clicked */
  onClick: PropTypes.func,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default MenuItem;
