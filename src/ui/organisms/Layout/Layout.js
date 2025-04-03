/**
 * Layout Component
 * 
 * A flexible layout component for structuring application pages with header, sidebar, main content, footer, and aside areas.
 */

import React, { forwardRef, Children, cloneElement, useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
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
  const [theme, setTheme] = useState('light'); // Add theme state
  const [contentLayout, setContentLayout] = useState('default'); // Add content layout state

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
  
  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);
  
  // Set content layout
  const setLayout = useCallback((layout) => {
    setContentLayout(layout);
  }, []);
  
  // Build layout state object for render props
  const layoutState = useMemo(() => ({
    // Configuration
    variant,
    size,
    withHeader,
    withSidebar,
    withFooter,
    withAside,
    sidebarPosition,
    asidePosition,
    
    // State
    isMobile,
    showSidebar,
    showAside,
    theme,
    contentLayout,
    
    // Handlers
    toggleSidebar,
    toggleAside,
    toggleTheme,
    setLayout,
    
    // Sub-components
    Header: LayoutHeader,
    Sidebar: LayoutSidebar,
    Main: LayoutMain,
    Footer: LayoutFooter,
    Aside: LayoutAside,
    Content: LayoutContent,
    Container: LayoutContainer
  }), [
    variant, size, withHeader, withSidebar, withFooter, withAside,
    sidebarPosition, asidePosition, isMobile, showSidebar, showAside,
    theme, contentLayout, toggleSidebar, toggleAside, toggleTheme, setLayout
  ]);

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

  // Determine if we're using render props
  const isRenderProps = isFunction(children);
  
  // If using render props, call the children function with the layout state
  if (isRenderProps) {
    return (
      <div 
        ref={ref}
        className={layoutClasses}
        style={style}
        data-variant={variant}
        data-size={size}
        data-theme={theme}
        data-content-layout={contentLayout}
        {...props}
      >
        {children(layoutState)}
      </div>
    );
  }
  
  // Otherwise use traditional component structure
  return (
    <div 
      ref={ref}
      className={layoutClasses}
      style={style}
      data-variant={variant}
      data-size={size}
      data-theme={theme}
      data-content-layout={contentLayout}
      {...props}
    >
      {renderChildren()}
    </div>
  );
});

Layout.displayName = 'Layout';

Layout.propTypes = {
  /** Children node or render props function */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  /** Layout variant */
  variant: PropTypes.oneOf(Object.values(LAYOUT_VARIANTS)),
  /** Layout size */
  size: PropTypes.oneOf(Object.values(LAYOUT_SIZES)),
  /** Whether to include header */
  withHeader: PropTypes.bool,
  /** Whether to include sidebar */
  withSidebar: PropTypes.bool,
  /** Whether to include footer */
  withFooter: PropTypes.bool,
  /** Whether to include aside */
  withAside: PropTypes.bool,
  /** Whether header is fixed */
  fixedHeader: PropTypes.bool,
  /** Whether sidebar is fixed */
  fixedSidebar: PropTypes.bool,
  /** Whether footer is fixed */
  fixedFooter: PropTypes.bool,
  /** Whether header is sticky */
  stickyHeader: PropTypes.bool,
  /** Whether sidebar is sticky */
  stickySidebar: PropTypes.bool,
  /** Whether footer is sticky */
  stickyFooter: PropTypes.bool,
  /** Sidebar position (left or right) */
  sidebarPosition: PropTypes.oneOf(['left', 'right']),
  /** Aside position (left or right) */
  asidePosition: PropTypes.oneOf(['left', 'right']),
  /** Responsive breakpoint */
  breakpoint: PropTypes.oneOf(Object.values(LAYOUT_BREAKPOINTS)),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Custom styles */
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
