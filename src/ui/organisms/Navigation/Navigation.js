/**
 * Navigation Component
 * 
 * A flexible navigation component for application headers, menus, and navigation bars.
 */

import React, { useState, useEffect, useCallback, useRef, forwardRef, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { 
  NAVIGATION_VARIANTS,
  NAVIGATION_SIZES,
  NAVIGATION_POSITIONS,
  NAVIGATION_ALIGNMENTS,
  NAVIGATION_MODIFIERS,
  NAVIGATION_BREAKPOINTS,
  NAVIGATION_ITEM_STATES,
  NAVIGATION_ARIA,
  NAVIGATION_DATA_ATTRIBUTES,
  NAVIGATION_CLASS_NAMES,
  NAVIGATION_DEFAULT_PROPS
} from './constants';
import { Icon } from '../../atoms';
import './Navigation.css';

/**
 * Navigation Brand Component
 * 
 * Renders the brand section of the navigation.
 */
const NavigationBrand = forwardRef(({ 
  children, 
  logo, 
  alt, 
  href = '/', 
  onClick,
  className,
  ...props 
}, ref) => {
  const brandContent = (
    <>
      {logo && <img src={logo} alt={alt || 'Logo'} />}
      {children}
    </>
  );

  return (
    <div 
      ref={ref}
      className={`${NAVIGATION_CLASS_NAMES.BRAND} ${className || ''}`}
      {...props}
    >
      {href ? (
        <a href={href} onClick={onClick}>
          {brandContent}
        </a>
      ) : (
        brandContent
      )}
    </div>
  );
});

NavigationBrand.displayName = 'Navigation.Brand';

NavigationBrand.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.string,
  alt: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

/**
 * Navigation Items Component
 * 
 * Container for navigation items.
 */
const NavigationItems = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <ul 
      ref={ref}
      className={`${NAVIGATION_CLASS_NAMES.ITEMS} ${className || ''}`}
      {...props}
    >
      {children}
    </ul>
  );
});

NavigationItems.displayName = 'Navigation.Items';

NavigationItems.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Navigation Item Component
 * 
 * Individual navigation item.
 */
const NavigationItem = forwardRef(({ 
  children, 
  href, 
  active, 
  disabled,
  dropdown,
  dropdownContent,
  icon,
  onClick,
  className,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = useCallback((e) => {
    if (dropdown) {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
    
    if (onClick) {
      onClick(e);
    }
  }, [dropdown, onClick]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const itemClasses = [
    NAVIGATION_CLASS_NAMES.ITEM,
    active ? `${NAVIGATION_CLASS_NAMES.ITEM}--${NAVIGATION_ITEM_STATES.ACTIVE}` : '',
    disabled ? `${NAVIGATION_CLASS_NAMES.ITEM}--${NAVIGATION_ITEM_STATES.DISABLED}` : '',
    dropdown ? `${NAVIGATION_CLASS_NAMES.ITEM}--${NAVIGATION_ITEM_STATES.DROPDOWN}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <li 
      ref={ref}
      className={itemClasses}
      {...props}
    >
      {dropdown ? (
        <div ref={dropdownRef}>
          <button 
            className={NAVIGATION_CLASS_NAMES.DROPDOWN}
            onClick={handleDropdownToggle}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {icon && <Icon name={icon} size="sm" marginRight="2xs" />}
            {children}
            <Icon name="chevron-down" size="sm" marginLeft="2xs" />
          </button>
          {isOpen && dropdownContent}
        </div>
      ) : (
        <a 
          href={href} 
          className={NAVIGATION_CLASS_NAMES.LINK}
          onClick={onClick}
          aria-current={active ? 'page' : undefined}
        >
          {icon && <Icon name={icon} size="sm" marginRight="2xs" />}
          {children}
        </a>
      )}
    </li>
  );
});

NavigationItem.displayName = 'Navigation.Item';

NavigationItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  dropdown: PropTypes.bool,
  dropdownContent: PropTypes.node,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

/**
 * Navigation Actions Component
 * 
 * Container for navigation actions (buttons, search, user menu, etc.).
 */
const NavigationActions = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NAVIGATION_CLASS_NAMES.ACTIONS} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

NavigationActions.displayName = 'Navigation.Actions';

NavigationActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Navigation Component
 * 
 * Main navigation component.
 */
const Navigation = forwardRef(({ 
  children,
  variant = NAVIGATION_DEFAULT_PROPS.variant,
  size = NAVIGATION_DEFAULT_PROPS.size,
  position = NAVIGATION_DEFAULT_PROPS.position,
  alignment = NAVIGATION_DEFAULT_PROPS.alignment,
  breakpoint = NAVIGATION_DEFAULT_PROPS.breakpoint,
  expanded = NAVIGATION_DEFAULT_PROPS.expanded,
  collapsible = NAVIGATION_DEFAULT_PROPS.collapsible,
  withShadow = NAVIGATION_DEFAULT_PROPS.withShadow,
  withBorder = NAVIGATION_DEFAULT_PROPS.withBorder,
  transparent = NAVIGATION_DEFAULT_PROPS.transparent,
  fixed = NAVIGATION_DEFAULT_PROPS.fixed,
  sticky = NAVIGATION_DEFAULT_PROPS.sticky,
  className,
  ...props 
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isScrolled, setIsScrolled] = useState(false);
  const collapseId = useRef(`navigation-collapse-${Math.random().toString(36).substr(2, 9)}`);

  // Handle scroll effect for transparent navigation
  useEffect(() => {
    if (transparent) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [transparent]);

  // Toggle mobile menu
  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  // Determine position class
  const getPositionClass = () => {
    if (fixed) return `${NAVIGATION_CLASS_NAMES.ROOT}--fixed-top`;
    if (sticky) return `${NAVIGATION_CLASS_NAMES.ROOT}--sticky-top`;
    if (position !== NAVIGATION_POSITIONS.STATIC) return `${NAVIGATION_CLASS_NAMES.ROOT}--${position}`;
    return '';
  };

  // Build class names
  const navigationClasses = [
    NAVIGATION_CLASS_NAMES.ROOT,
    `${NAVIGATION_CLASS_NAMES.ROOT}--${variant}`,
    `${NAVIGATION_CLASS_NAMES.ROOT}--${size}`,
    getPositionClass(),
    `${NAVIGATION_CLASS_NAMES.ROOT}--${alignment}`,
    collapsible ? `${NAVIGATION_CLASS_NAMES.ROOT}--collapsible` : '',
    collapsible ? `${NAVIGATION_CLASS_NAMES.ROOT}--breakpoint-${breakpoint}` : '',
    withShadow ? `${NAVIGATION_CLASS_NAMES.ROOT}--${NAVIGATION_MODIFIERS.WITH_SHADOW}` : '',
    withBorder ? `${NAVIGATION_CLASS_NAMES.ROOT}--${NAVIGATION_MODIFIERS.WITH_BORDER}` : '',
    transparent ? `${NAVIGATION_CLASS_NAMES.ROOT}--transparent` : '',
    isScrolled ? `${NAVIGATION_CLASS_NAMES.ROOT}--${NAVIGATION_MODIFIERS.SCROLLED}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Find and clone children with appropriate props
  const renderChildren = () => {
    let brand = null;
    let items = null;
    let actions = null;
    
    Children.forEach(children, child => {
      if (!child) return;
      
      if (child.type?.displayName === 'Navigation.Brand') {
        brand = child;
      } else if (child.type?.displayName === 'Navigation.Items') {
        items = child;
      } else if (child.type?.displayName === 'Navigation.Actions') {
        actions = child;
      }
    });

    return (
      <>
        {brand}
        
        {collapsible && (
          <button 
            className={NAVIGATION_CLASS_NAMES.TOGGLE}
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={collapseId.current}
            aria-label="Toggle navigation"
          >
            <Icon name="menu" size="md" />
          </button>
        )}
        
        <div 
          id={collapseId.current}
          className={`${NAVIGATION_CLASS_NAMES.COLLAPSE} ${isExpanded ? `${NAVIGATION_CLASS_NAMES.COLLAPSE}--expanded` : ''}`}
        >
          {items}
          {actions}
        </div>
      </>
    );
  };

  return (
    <nav 
      ref={ref}
      className={navigationClasses}
      {...props}
    >
      <div className={NAVIGATION_CLASS_NAMES.CONTAINER}>
        {renderChildren()}
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

Navigation.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(NAVIGATION_VARIANTS)),
  size: PropTypes.oneOf(Object.values(NAVIGATION_SIZES)),
  position: PropTypes.oneOf(Object.values(NAVIGATION_POSITIONS)),
  alignment: PropTypes.oneOf(Object.values(NAVIGATION_ALIGNMENTS)),
  breakpoint: PropTypes.oneOf(Object.values(NAVIGATION_BREAKPOINTS)),
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  withShadow: PropTypes.bool,
  withBorder: PropTypes.bool,
  transparent: PropTypes.bool,
  fixed: PropTypes.bool,
  sticky: PropTypes.bool,
  className: PropTypes.string
};

// Attach sub-components
Navigation.Brand = NavigationBrand;
Navigation.Items = NavigationItems;
Navigation.Item = NavigationItem;
Navigation.Actions = NavigationActions;

export default Navigation;
