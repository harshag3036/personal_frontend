/**
 * Layout Component
 * 
 * A flexible layout component for structuring application pages with header, sidebar, main content, footer, and aside areas.
 */

import React, { forwardRef, Children, cloneElement, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  LAYOUT_VARIANTS,
  LAYOUT_SIZES,
  LAYOUT_AREAS,
  LAYOUT_MODIFIERS,
  LAYOUT_BREAKPOINTS,
  LAYOUT_ARIA,
  LAYOUT_DATA_ATTRIBUTES,
  LAYOUT_CLASS_NAMES,
  LAYOUT_DEFAULT_PROPS
} from './constants';
import './Layout.css';

/**
 * Layout Header Component
 * 
 * Renders the header section of the layout.
 */
const LayoutHeader = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <header 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.HEADER} ${className || ''}`}
      role={LAYOUT_ARIA.ROLE_BANNER}
      {...props}
    >
      {children}
    </header>
  );
});

LayoutHeader.displayName = 'Layout.Header';

LayoutHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Sidebar Component
 * 
 * Renders the sidebar section of the layout.
 */
const LayoutSidebar = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <aside 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.SIDEBAR} ${className || ''}`}
      role={LAYOUT_ARIA.ROLE_COMPLEMENTARY}
      {...props}
    >
      {children}
    </aside>
  );
});

LayoutSidebar.displayName = 'Layout.Sidebar';

LayoutSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Main Component
 * 
 * Renders the main content section of the layout.
 */
const LayoutMain = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <main 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.MAIN} ${className || ''}`}
      role={LAYOUT_ARIA.ROLE_MAIN}
      {...props}
    >
      {children}
    </main>
  );
});

LayoutMain.displayName = 'Layout.Main';

LayoutMain.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Footer Component
 * 
 * Renders the footer section of the layout.
 */
const LayoutFooter = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <footer 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.FOOTER} ${className || ''}`}
      role={LAYOUT_ARIA.ROLE_CONTENTINFO}
      {...props}
    >
      {children}
    </footer>
  );
});

LayoutFooter.displayName = 'Layout.Footer';

LayoutFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Aside Component
 * 
 * Renders the aside section of the layout.
 */
const LayoutAside = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <aside 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.ASIDE} ${className || ''}`}
      role={LAYOUT_ARIA.ROLE_COMPLEMENTARY}
      {...props}
    >
      {children}
    </aside>
  );
});

LayoutAside.displayName = 'Layout.Aside';

LayoutAside.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Content Component
 * 
 * Renders a content container with padding.
 */
const LayoutContent = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.CONTENT} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

LayoutContent.displayName = 'Layout.Content';

LayoutContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Container Component
 * 
 * Renders a centered container with max-width.
 */
const LayoutContainer = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${LAYOUT_CLASS_NAMES.CONTAINER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

LayoutContainer.displayName = 'Layout.Container';

LayoutContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Layout Component
 * 
 * Main layout component.
 */
const Layout = forwardRef(({ 
  children,
  variant = LAYOUT_DEFAULT_PROPS.variant,
  size = LAYOUT_DEFAULT_PROPS.size,
  withHeader = LAYOUT_DEFAULT_PROPS.withHeader,
  withSidebar = LAYOUT_DEFAULT_PROPS.withSidebar,
  withFooter = LAYOUT_DEFAULT_PROPS.withFooter,
  withAside = LAYOUT_DEFAULT_PROPS.withAside,
  fixedHeader = LAYOUT_DEFAULT_PROPS.fixedHeader,
  fixedSidebar = LAYOUT_DEFAULT_PROPS.fixedSidebar,
  fixedFooter = LAYOUT_DEFAULT_PROPS.fixedFooter,
  stickyHeader = LAYOUT_DEFAULT_PROPS.stickyHeader,
  stickySidebar = LAYOUT_DEFAULT_PROPS.stickySidebar,
  stickyFooter = LAYOUT_DEFAULT_PROPS.stickyFooter,
  sidebarPosition = LAYOUT_DEFAULT_PROPS.sidebarPosition,
  asidePosition = LAYOUT_DEFAULT_PROPS.asidePosition,
  breakpoint = LAYOUT_DEFAULT_PROPS.breakpoint,
  className,
  style,
  ...props 
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAside, setShowAside] = useState(false);

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

  // Toggle sidebar visibility on mobile
  const toggleSidebar = useCallback(() => {
    setShowSidebar(prev => !prev);
  }, []);

  // Toggle aside visibility on mobile
  const toggleAside = useCallback(() => {
    setShowAside(prev => !prev);
  }, []);

  // Close sidebar/aside when clicking on backdrop
  const handleBackdropClick = useCallback(() => {
    setShowSidebar(false);
    setShowAside(false);
  }, []);

  // Build class names
  const layoutClasses = [
    LAYOUT_CLASS_NAMES.ROOT,
    `${LAYOUT_CLASS_NAMES.ROOT}--${variant}`,
    `${LAYOUT_CLASS_NAMES.ROOT}--${size}`,
    withSidebar ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.WITH_SIDEBAR}` : '',
    withHeader ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.WITH_HEADER}` : '',
    withFooter ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.WITH_FOOTER}` : '',
    withAside ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.WITH_ASIDE}` : '',
    fixedHeader ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.FIXED_HEADER}` : '',
    fixedSidebar ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.FIXED_SIDEBAR}` : '',
    fixedFooter ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.FIXED_FOOTER}` : '',
    stickyHeader ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.STICKY_HEADER}` : '',
    stickySidebar ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.STICKY_SIDEBAR}` : '',
    stickyFooter ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.STICKY_FOOTER}` : '',
    isMobile && showSidebar ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.WITH_SIDEBAR}` : '',
    isMobile && showAside ? `${LAYOUT_CLASS_NAMES.ROOT}--${LAYOUT_MODIFIERS.WITH_ASIDE}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Find and clone children with appropriate props
  const renderChildren = () => {
    let header = null;
    let sidebar = null;
    let main = null;
    let footer = null;
    let aside = null;
    
    Children.forEach(children, child => {
      if (!child) return;
      
      if (child.type?.displayName === 'Layout.Header') {
        header = child;
      } else if (child.type?.displayName === 'Layout.Sidebar') {
        sidebar = child;
      } else if (child.type?.displayName === 'Layout.Main') {
        main = child;
      } else if (child.type?.displayName === 'Layout.Footer') {
        footer = child;
      } else if (child.type?.displayName === 'Layout.Aside') {
        aside = child;
      } else if (!main) {
        // If no Main component is provided, wrap all children in a Main component
        main = <LayoutMain>{children}</LayoutMain>;
      }
    });

    return (
      <>
        {withHeader && header}
        {withSidebar && sidebar}
        {main}
        {withAside && aside}
        {withFooter && footer}
        
        {isMobile && (showSidebar || showAside) && (
          <div 
            className={LAYOUT_CLASS_NAMES.BACKDROP}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
      </>
    );
  };

  return (
    <div 
      ref={ref}
      className={layoutClasses}
      style={style}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {renderChildren()}
    </div>
  );
});

Layout.displayName = 'Layout';

Layout.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(LAYOUT_VARIANTS)),
  size: PropTypes.oneOf(Object.values(LAYOUT_SIZES)),
  withHeader: PropTypes.bool,
  withSidebar: PropTypes.bool,
  withFooter: PropTypes.bool,
  withAside: PropTypes.bool,
  fixedHeader: PropTypes.bool,
  fixedSidebar: PropTypes.bool,
  fixedFooter: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  stickySidebar: PropTypes.bool,
  stickyFooter: PropTypes.bool,
  sidebarPosition: PropTypes.oneOf(['left', 'right']),
  asidePosition: PropTypes.oneOf(['left', 'right']),
  breakpoint: PropTypes.oneOf(Object.values(LAYOUT_BREAKPOINTS)),
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
Layout.Header = LayoutHeader;
Layout.Sidebar = LayoutSidebar;
Layout.Main = LayoutMain;
Layout.Footer = LayoutFooter;
Layout.Aside = LayoutAside;
Layout.Content = LayoutContent;
Layout.Container = LayoutContainer;

export default Layout;
