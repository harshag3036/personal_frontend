import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuDivider Component
 * 
 * A component that represents a divider in a Menu.
 * 
 * @example
 * ```jsx
 * <Menu>
 *   <MenuItem>Option 1</MenuItem>
 *   <MenuDivider />
 *   <MenuItem>Option 2</MenuItem>
 * </Menu>
 * ```
 */
const MenuDivider = ({ className = '', ...restProps }) => {
  // Combine class names
  const dividerClasses = [
    'ui-menu-divider',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={dividerClasses}
      role="separator"
      {...restProps}
    />
  );
};

MenuDivider.propTypes = {
  /** Additional CSS class */
  className: PropTypes.string,
};

export default MenuDivider;
