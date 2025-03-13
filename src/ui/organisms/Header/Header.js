/**
 * Header Component
 * 
 * A flexible header component for application navigation, branding, and actions.
 */

import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  HEADER_VARIANTS,
  HEADER_SIZES,
  HEADER_POSITIONS,
  HEADER_STATES,
  HEADER_MODIFIERS,
  HEADER_BREAKPOINTS,
  HEADER_ARIA,
  HEADER_DATA_ATTRIBUTES,
  HEADER_CLASS_NAMES,
  HEADER_DEFAULT_PROPS
} from './constants';
import './Header.css';

/**
 * Header Logo Component
 * 
 * Renders the logo section of the header.
 */
const HeaderLogo = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.LOGO} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

HeaderLogo.displayName = 'Header.Logo';

HeaderLogo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Header Navigation Component
 * 
 * Renders the navigation section of the header.
 */
const HeaderNavigation = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <nav 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.NAVIGATION} ${className || ''}`}
      {...props}
    >
      {children}
    </nav>
  );
});

HeaderNavigation.displayName = 'Header.Navigation';

HeaderNavigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Header Actions Component
 * 
 * Renders the actions section of the header.
 */
const HeaderActions = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.ACTIONS} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

HeaderActions.displayName = 'Header.Actions';

HeaderActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Header Search Component
 * 
 * Renders the search section of the header.
 */
const HeaderSearch = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.SEARCH} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

HeaderSearch.displayName = 'Header.Search';

HeaderSearch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Header UserMenu Component
 * 
 * Renders the user menu section of the header.
 */
const HeaderUserMenu = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.USER_MENU} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

HeaderUserMenu.displayName = 'Header.UserMenu';

HeaderUserMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Header Notifications Component
 * 
 * Renders the notifications section of the header.
 */
const HeaderNotifications = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.NOTIFICATIONS} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

HeaderNotifications.displayName = 'Header.Notifications';

HeaderNotifications.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Header MobileToggle Component
 * 
 * Renders the mobile toggle button of the header.
 */
const HeaderMobileToggle = forwardRef(({ 
  children, 
  className,
  onClick,
  ...props 
}, ref) => {
  return (
    <button 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.MOBILE_TOGGLE} ${className || ''}`}
      onClick={onClick}
      aria-label="Toggle mobile menu"
      {...props}
    >
      {children}
    </button>
  );
});

HeaderMobileToggle.displayName = 'Header.MobileToggle';

HeaderMobileToggle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

/**
 * Header MobileMenu Component
 * 
 * Renders the mobile menu of the header.
 */
const HeaderMobileMenu = forwardRef(({ 
  children, 
  className,
  isOpen,
  onClose,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${HEADER_CLASS_NAMES.MOBILE_MENU} ${isOpen ? HEADER_CLASS_NAMES.MOBILE_MENU + '--open' : ''} ${className || ''}`}
      aria-hidden={!isOpen}
      {...props}
    >
      <button 
        onClick={onClose}
        aria-label="Close mobile menu"
        style={{ 
          position: 'absolute', 
          top: '16px', 
          right: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px'
        }}
      >
        &times;
      </button>
      {children}
    </div>
  );
});

HeaderMobileMenu.displayName = 'Header.MobileMenu';

HeaderMobileMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

/**
 * Header Component
 * 
 * Main header component.
 */
const Header = forwardRef(({ 
  children,
  variant = HEADER_DEFAULT_PROPS.variant,
  size = HEADER_DEFAULT_PROPS.size,
  position = HEADER_DEFAULT_PROPS.position,
  state = HEADER_DEFAULT_PROPS.state,
  withBorder = HEADER_DEFAULT_PROPS.withBorder,
  withShadow = HEADER_DEFAULT_PROPS.withShadow,
  withSearch = HEADER_DEFAULT_PROPS.withSearch,
  withNotifications = HEADER_DEFAULT_PROPS.withNotifications,
  withUserMenu = HEADER_DEFAULT_PROPS.withUserMenu,
  withLogo = HEADER_DEFAULT_PROPS.withLogo,
  withNavigation = HEADER_DEFAULT_PROPS.withNavigation,
  withActions = HEADER_DEFAULT_PROPS.withActions,
  breakpoint = HEADER_DEFAULT_PROPS.breakpoint,
  className,
  style,
  ...props 
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const breakpoints = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1400
      };
      
      const breakpointValue = breakpoints[breakpoint] || breakpoints.md;
      setIsMobile(window.innerWidth < breakpointValue);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Build class names
  const headerClasses = [
    HEADER_CLASS_NAMES.ROOT,
    `${HEADER_CLASS_NAMES.ROOT}--${variant}`,
    `${HEADER_CLASS_NAMES.ROOT}--${size}`,
    `${HEADER_CLASS_NAMES.ROOT}--${position}`,
    `${HEADER_CLASS_NAMES.ROOT}--${state}`,
    withBorder ? `${HEADER_CLASS_NAMES.ROOT}--${HEADER_MODIFIERS.WITH_BORDER}` : '',
    withShadow ? `${HEADER_CLASS_NAMES.ROOT}--${HEADER_MODIFIERS.WITH_SHADOW}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Find and clone children with appropriate props
  const renderChildren = () => {
    let logo = null;
    let navigation = null;
    let actions = null;
    let search = null;
    let userMenu = null;
    let notifications = null;
    let mobileToggle = null;
    let mobileMenu = null;
    
    React.Children.forEach(children, child => {
      if (!child) return;
      
      if (child.type?.displayName === 'Header.Logo') {
        logo = child;
      } else if (child.type?.displayName === 'Header.Navigation') {
        navigation = child;
      } else if (child.type?.displayName === 'Header.Actions') {
        actions = child;
      } else if (child.type?.displayName === 'Header.Search') {
        search = child;
      } else if (child.type?.displayName === 'Header.UserMenu') {
        userMenu = child;
      } else if (child.type?.displayName === 'Header.Notifications') {
        notifications = child;
      } else if (child.type?.displayName === 'Header.MobileToggle') {
        mobileToggle = React.cloneElement(child, {
          onClick: toggleMobileMenu
        });
      } else if (child.type?.displayName === 'Header.MobileMenu') {
        mobileMenu = React.cloneElement(child, {
          isOpen: isMobileMenuOpen,
          onClose: closeMobileMenu
        });
      }
    });

    // If no mobile toggle is provided, create a default one
    if (isMobile && !mobileToggle && (navigation || search)) {
      mobileToggle = (
        <HeaderMobileToggle onClick={toggleMobileMenu}>
          <span style={{ fontSize: '24px' }}>☰</span>
        </HeaderMobileToggle>
      );
    }

    // If no mobile menu is provided, create a default one
    if (isMobile && !mobileMenu && (navigation || search)) {
      mobileMenu = (
        <HeaderMobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
          {navigation && React.cloneElement(navigation, {
            style: { display: 'flex', flexDirection: 'column', marginTop: '48px' }
          })}
          {search && React.cloneElement(search, {
            style: { margin: '16px 0' }
          })}
        </HeaderMobileMenu>
      );
    }

    return (
      <div className={HEADER_CLASS_NAMES.CONTAINER}>
        {logo}
        {!isMobile && navigation}
        {!isMobile && search}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {!isMobile && actions}
          {!isMobile && notifications}
          {!isMobile && userMenu}
          {mobileToggle}
        </div>
        {mobileMenu}
      </div>
    );
  };

  return (
    <header 
      ref={ref}
      className={headerClasses}
      style={style}
      role={HEADER_ARIA.ROLE}
      aria-label={HEADER_ARIA.LABEL}
      data-variant={variant}
      data-size={size}
      data-position={position}
      data-state={state}
      {...props}
    >
      {renderChildren()}
    </header>
  );
});

Header.displayName = 'Header';

Header.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(HEADER_VARIANTS)),
  size: PropTypes.oneOf(Object.values(HEADER_SIZES)),
  position: PropTypes.oneOf(Object.values(HEADER_POSITIONS)),
  state: PropTypes.oneOf(Object.values(HEADER_STATES)),
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  withSearch: PropTypes.bool,
  withNotifications: PropTypes.bool,
  withUserMenu: PropTypes.bool,
  withLogo: PropTypes.bool,
  withNavigation: PropTypes.bool,
  withActions: PropTypes.bool,
  breakpoint: PropTypes.oneOf(Object.values(HEADER_BREAKPOINTS)),
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
Header.Logo = HeaderLogo;
Header.Navigation = HeaderNavigation;
Header.Actions = HeaderActions;
Header.Search = HeaderSearch;
Header.UserMenu = HeaderUserMenu;
Header.Notifications = HeaderNotifications;
Header.MobileToggle = HeaderMobileToggle;
Header.MobileMenu = HeaderMobileMenu;

export default Header;
