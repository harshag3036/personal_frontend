import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDropdown } from './Dropdown';

/**
 * DropdownMenu Component
 * 
 * A component that displays a menu of options when the dropdown is open.
 * 
 * @example
 * ```jsx
 * <DropdownMenu>
 *   <DropdownItem>Option 1</DropdownItem>
 *   <DropdownItem>Option 2</DropdownItem>
 *   <DropdownItem>Option 3</DropdownItem>
 * </DropdownMenu>
 * ```
 */
const DropdownMenu = ({
  children,
  className = '',
  ...restProps
}) => {
  const { 
    isOpen, 
    menuRef, 
    triggerRef, 
    placement,
    variant,
    size
  } = useDropdown();
  
  // Ref for the first focusable element
  const firstItemRef = useRef(null);
  
  // Focus the first item when the menu opens
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [isOpen]);
  
  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (!isOpen) return;
    
    const menuItems = Array.from(
      menuRef.current.querySelectorAll('[role="menuitem"]')
    );
    
    if (menuItems.length === 0) return;
    
    const currentIndex = menuItems.indexOf(document.activeElement);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex === -1 || currentIndex === menuItems.length - 1) {
          menuItems[0].focus();
        } else {
          menuItems[currentIndex + 1].focus();
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex === -1 || currentIndex === 0) {
          menuItems[menuItems.length - 1].focus();
        } else {
          menuItems[currentIndex - 1].focus();
        }
        break;
        
      case 'Home':
        event.preventDefault();
        menuItems[0].focus();
        break;
        
      case 'End':
        event.preventDefault();
        menuItems[menuItems.length - 1].focus();
        break;
        
      default:
        break;
    }
  };
  
  // Calculate position based on placement
  const getMenuStyle = () => {
    if (!triggerRef.current) return {};
    
    const style = {};
    
    // Default position is bottom-start
    style.top = '100%';
    style.left = '0';
    
    // Adjust based on placement
    if (placement.startsWith('top')) {
      style.top = 'auto';
      style.bottom = '100%';
    }
    
    if (placement.startsWith('right')) {
      style.left = 'auto';
      style.right = '0';
    }
    
    if (placement.startsWith('left')) {
      style.left = '0';
      style.right = 'auto';
    }
    
    if (placement.endsWith('end')) {
      style.left = 'auto';
      style.right = '0';
    }
    
    if (placement.endsWith('start')) {
      style.left = '0';
      style.right = 'auto';
    }
    
    return style;
  };
  
  // Combine class names
  const menuClasses = [
    'ui-dropdown-menu',
    `ui-dropdown-menu--${variant}`,
    `ui-dropdown-menu--${size}`,
    `ui-dropdown-menu--${placement}`,
    isOpen && 'ui-dropdown-menu--open',
    className
  ].filter(Boolean).join(' ');
  
  // Don't render if not open
  if (!isOpen) return null;
  
  return (
    <div
      ref={menuRef}
      className={menuClasses}
      role="menu"
      aria-orientation="vertical"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={getMenuStyle()}
      {...restProps}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        // Add ref to the first item
        if (index === 0) {
          return React.cloneElement(child, {
            ref: firstItemRef,
          });
        }
        
        return child;
      })}
    </div>
  );
};

DropdownMenu.propTypes = {
  /** Menu items */
  children: PropTypes.node.isRequired,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default DropdownMenu;
