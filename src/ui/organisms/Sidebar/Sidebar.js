/**
 * Sidebar Component
 * 
 * A flexible sidebar component for application navigation, filters, and additional content.
 */

import React, { useState, useEffect, useCallback, useRef, forwardRef, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import { 
  SIDEBAR_VARIANTS,
  SIDEBAR_SIZES,
  SIDEBAR_POSITIONS,
  SIDEBAR_WIDTHS,
  SIDEBAR_STATES,
  SIDEBAR_MODIFIERS,
  SIDEBAR_BREAKPOINTS,
  SIDEBAR_SECTION_TYPES,
  SIDEBAR_ITEM_STATES,
  SIDEBAR_ARIA,
  SIDEBAR_DATA_ATTRIBUTES,
  SIDEBAR_CLASS_NAMES,
  SIDEBAR_DEFAULT_PROPS
} from './constants';
import { Icon } from '../../atoms';
import './Sidebar.css';

/**
 * Sidebar Header Component
 * 
 * Renders the header section of the sidebar.
 */
const SidebarHeader = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${SIDEBAR_CLASS_NAMES.HEADER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarHeader.displayName = 'Sidebar.Header';

SidebarHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Sidebar Content Component
 * 
 * Renders the main content section of the sidebar.
 */
const SidebarContent = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${SIDEBAR_CLASS_NAMES.CONTENT} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContent.displayName = 'Sidebar.Content';

SidebarContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Sidebar Footer Component
 * 
 * Renders the footer section of the sidebar.
 */
const SidebarFooter = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${SIDEBAR_CLASS_NAMES.FOOTER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarFooter.displayName = 'Sidebar.Footer';

SidebarFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Sidebar Item Component
 * 
 * Renders an individual item in the sidebar.
 */
const SidebarItem = forwardRef(({ 
  children, 
  icon,
  badge,
  href,
  active,
  disabled,
  onClick,
  className,
  ...props 
}, ref) => {
  const itemClasses = [
    SIDEBAR_CLASS_NAMES.ITEM,
    active ? `${SIDEBAR_CLASS_NAMES.ITEM}--${SIDEBAR_ITEM_STATES.ACTIVE}` : '',
    disabled ? `${SIDEBAR_CLASS_NAMES.ITEM}--${SIDEBAR_ITEM_STATES.DISABLED}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  const handleClick = useCallback((e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  }, [disabled, onClick]);

  const content = (
    <>
      {icon && (
        <span className={SIDEBAR_CLASS_NAMES.ITEM_ICON}>
          <Icon name={icon} size="sm" />
        </span>
      )}
      <span className={SIDEBAR_CLASS_NAMES.ITEM_TEXT}>{children}</span>
      {badge && (
        <span className={SIDEBAR_CLASS_NAMES.ITEM_BADGE}>
          {badge}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        ref={ref}
        href={href}
        className={itemClasses}
        onClick={handleClick}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <div 
      ref={ref}
      className={itemClasses}
      onClick={handleClick}
      aria-disabled={disabled ? 'true' : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {content}
    </div>
  );
});

SidebarItem.displayName = 'Sidebar.Item';

SidebarItem.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  href: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

/**
 * Sidebar Group Component
 * 
 * Renders a group of sidebar items with an optional title.
 */
const SidebarGroup = forwardRef(({ 
  children, 
  title,
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${SIDEBAR_CLASS_NAMES.GROUP} ${className || ''}`}
      {...props}
    >
      {title && (
        <div className={SIDEBAR_CLASS_NAMES.GROUP_TITLE}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
});

SidebarGroup.displayName = 'Sidebar.Group';

SidebarGroup.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  className: PropTypes.string
};

/**
 * Sidebar Divider Component
 * 
 * Renders a horizontal divider in the sidebar.
 */
const SidebarDivider = forwardRef(({ 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${SIDEBAR_CLASS_NAMES.DIVIDER} ${className || ''}`}
      role="separator"
      {...props}
    />
  );
});

SidebarDivider.displayName = 'Sidebar.Divider';

SidebarDivider.propTypes = {
  className: PropTypes.string
};

/**
 * Sidebar Component
 * 
 * Main sidebar component.
 */
const Sidebar = forwardRef(({ 
  children,
  variant = SIDEBAR_DEFAULT_PROPS.variant,
  size = SIDEBAR_DEFAULT_PROPS.size,
  position = SIDEBAR_DEFAULT_PROPS.position,
  width = SIDEBAR_DEFAULT_PROPS.width,
  state = SIDEBAR_DEFAULT_PROPS.state,
  collapsible = SIDEBAR_DEFAULT_PROPS.collapsible,
  withShadow = SIDEBAR_DEFAULT_PROPS.withShadow,
  withBorder = SIDEBAR_DEFAULT_PROPS.withBorder,
  withBackdrop = SIDEBAR_DEFAULT_PROPS.withBackdrop,
  fixed = SIDEBAR_DEFAULT_PROPS.fixed,
  sticky = SIDEBAR_DEFAULT_PROPS.sticky,
  overlay = SIDEBAR_DEFAULT_PROPS.overlay,
  pushContent = SIDEBAR_DEFAULT_PROPS.pushContent,
  breakpoint = SIDEBAR_DEFAULT_PROPS.breakpoint,
  onStateChange,
  className,
  style,
  ...props 
}, ref) => {
  const [currentState, setCurrentState] = useState(state);
  const sidebarId = useRef(`sidebar-${Math.random().toString(36).substr(2, 9)}`);

  // Update state when prop changes
  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  // Toggle sidebar state
  const handleToggle = useCallback(() => {
    const newState = currentState === SIDEBAR_STATES.EXPANDED 
      ? SIDEBAR_STATES.COLLAPSED 
      : SIDEBAR_STATES.EXPANDED;
    
    setCurrentState(newState);
    
    if (onStateChange) {
      onStateChange(newState);
    }
  }, [currentState, onStateChange]);

  // Close sidebar when clicking on backdrop
  const handleBackdropClick = useCallback(() => {
    if (currentState === SIDEBAR_STATES.EXPANDED) {
      setCurrentState(SIDEBAR_STATES.HIDDEN);
      
      if (onStateChange) {
        onStateChange(SIDEBAR_STATES.HIDDEN);
      }
    }
  }, [currentState, onStateChange]);

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
      
      if (window.innerWidth < breakpointValue && currentState === SIDEBAR_STATES.EXPANDED) {
        setCurrentState(SIDEBAR_STATES.HIDDEN);
        
        if (onStateChange) {
          onStateChange(SIDEBAR_STATES.HIDDEN);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, currentState, onStateChange]);

  // Custom width style
  const customStyle = {
    ...style,
    ...(width === SIDEBAR_WIDTHS.CUSTOM && style?.width ? { width: style.width } : {})
  };

  // Build class names
  const sidebarClasses = [
    SIDEBAR_CLASS_NAMES.ROOT,
    `${SIDEBAR_CLASS_NAMES.ROOT}--${variant}`,
    `${SIDEBAR_CLASS_NAMES.ROOT}--${size}`,
    `${SIDEBAR_CLASS_NAMES.ROOT}--${position}`,
    `${SIDEBAR_CLASS_NAMES.ROOT}--${width}`,
    `${SIDEBAR_CLASS_NAMES.ROOT}--${currentState}`,
    withShadow ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.WITH_SHADOW}` : '',
    withBorder ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.WITH_BORDER}` : '',
    withBackdrop ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.WITH_BACKDROP}` : '',
    fixed ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.FIXED}` : '',
    sticky ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.STICKY}` : '',
    overlay ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.OVERLAY}` : '',
    pushContent ? `${SIDEBAR_CLASS_NAMES.ROOT}--${SIDEBAR_MODIFIERS.PUSH_CONTENT}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Get state and handlers to pass to render prop function
  const sidebarState = {
    // State properties
    variant,
    size,
    position,
    width,
    state: currentState,
    isExpanded: currentState === SIDEBAR_STATES.EXPANDED,
    isCollapsed: currentState === SIDEBAR_STATES.COLLAPSED,
    isHidden: currentState === SIDEBAR_STATES.HIDDEN,
    isFixed: fixed,
    isSticky: sticky,
    isOverlay: overlay,
    withShadow,
    withBorder,
    withBackdrop,
    pushContent,
    
    // Handlers
    toggleSidebar: handleToggle,
    handleBackdropClick,
    
    // Component references
    Header: SidebarHeader,
    Content: SidebarContent,
    Footer: SidebarFooter,
    Item: SidebarItem,
    Group: SidebarGroup,
    Divider: SidebarDivider
  };

  // Find and clone children with appropriate props (for non-render-props usage)
  const renderStandardChildren = () => {
    let header = null;
    let content = null;
    let footer = null;
    
    Children.forEach(children, child => {
      if (!child) return;
      
      if (child.type?.displayName === 'Sidebar.Header') {
        header = child;
      } else if (child.type?.displayName === 'Sidebar.Content') {
        content = child;
      } else if (child.type?.displayName === 'Sidebar.Footer') {
        footer = child;
      } else if (child.type?.displayName === 'Sidebar.Item' || 
                child.type?.displayName === 'Sidebar.Group' || 
                child.type?.displayName === 'Sidebar.Divider') {
        // If direct sidebar items/groups are provided without a Content wrapper
        if (!content) {
          content = (
            <SidebarContent>
              {Children.map(children, c => {
                if (c.type?.displayName === 'Sidebar.Item' || 
                    c.type?.displayName === 'Sidebar.Group' || 
                    c.type?.displayName === 'Sidebar.Divider') {
                  return c;
                }
                return null;
              })}
            </SidebarContent>
          );
        }
      }
    });

    return (
      <>
        {header}
        
        {collapsible && (
          <button 
            className={SIDEBAR_CLASS_NAMES.TOGGLE}
            onClick={handleToggle}
            aria-expanded={currentState === SIDEBAR_STATES.EXPANDED}
            aria-controls={sidebarId.current}
            aria-label={currentState === SIDEBAR_STATES.EXPANDED ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Icon name={currentState === SIDEBAR_STATES.EXPANDED ? 'chevron-left' : 'chevron-right'} size="sm" />
          </button>
        )}
        
        {content}
        {footer}
        
        {withBackdrop && currentState === SIDEBAR_STATES.EXPANDED && (
          <div 
            className={SIDEBAR_CLASS_NAMES.BACKDROP}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
      </>
    );
  };

  // Render using either standard children or render props pattern
  const renderContent = () => {
    // If children is a function, use render props pattern
    if (isFunction(children)) {
      return children(sidebarState);
    }
    
    // Otherwise, use standard children approach
    return renderStandardChildren();
  };

  return (
    <aside 
      ref={ref}
      id={sidebarId.current}
      className={sidebarClasses}
      style={customStyle}
      role={SIDEBAR_ARIA.ROLE}
      aria-label={SIDEBAR_ARIA.LABEL}
      data-state={currentState}
      data-position={position}
      data-variant={variant}
      data-size={size}
      data-width={width}
      {...props}
    >
      {renderContent()}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  variant: PropTypes.oneOf(Object.values(SIDEBAR_VARIANTS)),
  size: PropTypes.oneOf(Object.values(SIDEBAR_SIZES)),
  position: PropTypes.oneOf(Object.values(SIDEBAR_POSITIONS)),
  width: PropTypes.oneOf(Object.values(SIDEBAR_WIDTHS)),
  state: PropTypes.oneOf(Object.values(SIDEBAR_STATES)),
  collapsible: PropTypes.bool,
  withShadow: PropTypes.bool,
  withBorder: PropTypes.bool,
  withBackdrop: PropTypes.bool,
  fixed: PropTypes.bool,
  sticky: PropTypes.bool,
  overlay: PropTypes.bool,
  pushContent: PropTypes.bool,
  breakpoint: PropTypes.oneOf(Object.values(SIDEBAR_BREAKPOINTS)),
  onStateChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarGroup;
Sidebar.Divider = SidebarDivider;

export default Sidebar;
