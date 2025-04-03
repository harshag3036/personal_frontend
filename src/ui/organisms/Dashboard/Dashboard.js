/**
 * Dashboard Component
 * 
 * A flexible dashboard component that can be used to create various dashboard layouts.
 * It supports different variants, sizes, and layouts, and can be customized with
 * various sections like header, sidebar, main content, widgets, and footer.
 */

import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import './Dashboard.css';
import {
  DASHBOARD_VARIANTS,
  DASHBOARD_SIZES,
  DASHBOARD_LAYOUTS,
  DASHBOARD_SECTIONS,
  WIDGET_TYPES,
  DASHBOARD_DEFAULT_PROPS,
  DASHBOARD_CLASS_PREFIX,
  DASHBOARD_DISPLAY_NAME
} from './constants';
import { Spinner, Text, Button } from '../../atoms';

// Create context for the Dashboard component
const DashboardContext = createContext({});

/**
 * Dashboard component
 */
const Dashboard = ({
  variant = DASHBOARD_DEFAULT_PROPS.variant,
  size = DASHBOARD_DEFAULT_PROPS.size,
  layout = DASHBOARD_DEFAULT_PROPS.layout,
  withHeader = DASHBOARD_DEFAULT_PROPS.withHeader,
  withSidebar = DASHBOARD_DEFAULT_PROPS.withSidebar,
  withFooter = DASHBOARD_DEFAULT_PROPS.withFooter,
  withBorder = DASHBOARD_DEFAULT_PROPS.withBorder,
  withShadow = DASHBOARD_DEFAULT_PROPS.withShadow,
  withPadding = DASHBOARD_DEFAULT_PROPS.withPadding,
  withGap = DASHBOARD_DEFAULT_PROPS.withGap,
  withBackground = DASHBOARD_DEFAULT_PROPS.withBackground,
  loading = DASHBOARD_DEFAULT_PROPS.loading,
  error = DASHBOARD_DEFAULT_PROPS.error,
  className,
  style,
  children,
  title,
  description,
  widgets = [],
  onRefresh,
  ...rest
}) => {
  // Add state for dashboard layout editing
  const [currentLayout, setCurrentLayout] = useState(layout);
  const [editMode, setEditMode] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState(widgets.map(widget => widget.id));

  // Determine if we're using compound components, render props, or simple props
  const isRenderProps = isFunction(children);
  const isCompoundComponent = !isRenderProps && React.Children.count(children) > 0;

  // Create context value
  const contextValue = useMemo(() => ({
    variant,
    size,
    layout: currentLayout,
    withBorder,
    withShadow,
    withPadding,
    withGap,
    withBackground,
    editMode,
    visibleWidgets
  }), [
    variant,
    size,
    currentLayout,
    withBorder,
    withShadow,
    withPadding,
    withGap,
    withBackground,
    editMode,
    visibleWidgets
  ]);
  
  // Build dashboard state object to pass to render function
  const dashboardState = {
    // Configuration props
    variant,
    size,
    layout: currentLayout,
    withHeader,
    withSidebar,
    withFooter,
    withBorder,
    withShadow,
    withPadding,
    withGap,
    withBackground,
    
    // State
    loading,
    error,
    editMode,
    widgets,
    visibleWidgets: widgets.filter(widget => visibleWidgets.includes(widget.id || '')),
    hiddenWidgets: widgets.filter(widget => !visibleWidgets.includes(widget.id || '')),
    
    // Handlers
    toggleLayout: (newLayout) => setCurrentLayout(newLayout),
    toggleEditMode: () => setEditMode(prev => !prev),
    setEditMode,
    
    // Widget operations
    moveWidget: (id, direction) => {
      // Implementation would go here
      console.log(`Move widget ${id} ${direction}`);
    },
    
    resizeWidget: (id, size) => {
      // Implementation would go here
      console.log(`Resize widget ${id} to ${size}`);
    },
    
    hideWidget: (id) => {
      setVisibleWidgets(prev => prev.filter(widgetId => widgetId !== id));
    },
    
    showWidget: (id) => {
      setVisibleWidgets(prev => [...prev, id]);
    },
    
    // Sub-components
    Header: DashboardHeader,
    Sidebar: DashboardSidebar,
    Main: DashboardMain,
    Widgets: DashboardWidgets,
    Widget: DashboardWidget,
    Footer: DashboardFooter,
    Empty: DashboardEmpty
  };

  // Generate class names
  const classNames = [
    DASHBOARD_CLASS_PREFIX,
    `${DASHBOARD_CLASS_PREFIX}--${variant}`,
    `${DASHBOARD_CLASS_PREFIX}--${size}`,
    `${DASHBOARD_CLASS_PREFIX}--${layout}`,
    withSidebar && `${DASHBOARD_CLASS_PREFIX}--with-sidebar`,
    withBorder && `${DASHBOARD_CLASS_PREFIX}--with-border`,
    withShadow && `${DASHBOARD_CLASS_PREFIX}--with-shadow`,
    withPadding && `${DASHBOARD_CLASS_PREFIX}--with-padding`,
    withGap && `${DASHBOARD_CLASS_PREFIX}--with-gap`,
    withBackground && `${DASHBOARD_CLASS_PREFIX}--with-background`,
    loading && `${DASHBOARD_CLASS_PREFIX}--loading`,
    className
  ].filter(Boolean).join(' ');

  // If using render props, call the children function with state
  if (isRenderProps) {
    return (
      <DashboardContext.Provider value={contextValue}>
        <div 
          className={classNames} 
          style={style} 
          data-edit-mode={editMode ? 'true' : 'false'} 
          data-layout={currentLayout}
          {...rest}
        >
          {loading && (
            <div className={`${DASHBOARD_CLASS_PREFIX}__loading-overlay`}>
              <Spinner size="lg" />
            </div>
          )}
          {error && (
            <div className={`${DASHBOARD_CLASS_PREFIX}__error`}>
              {typeof error === 'string' ? error : 'An error occurred while loading the dashboard.'}
            </div>
          )}
          {children(dashboardState)}
        </div>
      </DashboardContext.Provider>
    );
  }
  
  // If using compound components, render children within context provider
  if (isCompoundComponent) {
    return (
      <DashboardContext.Provider value={contextValue}>
        <div 
          className={classNames} 
          style={style} 
          data-edit-mode={editMode ? 'true' : 'false'} 
          data-layout={currentLayout}
          {...rest}
        >
          {loading && (
            <div className={`${DASHBOARD_CLASS_PREFIX}__loading-overlay`}>
              <Spinner size="lg" />
            </div>
          )}
          {error && (
            <div className={`${DASHBOARD_CLASS_PREFIX}__error`}>
              {typeof error === 'string' ? error : 'An error occurred while loading the dashboard.'}
            </div>
          )}
          {children}
        </div>
      </DashboardContext.Provider>
    );
  }

  // Otherwise, render using props (default implementation)
  return (
    <DashboardContext.Provider value={contextValue}>
      <div className={classNames} style={style} {...rest}>
        {loading && (
          <div className={`${DASHBOARD_CLASS_PREFIX}__loading-overlay`}>
            <Spinner size="lg" />
          </div>
        )}
        
        {error && (
          <div className={`${DASHBOARD_CLASS_PREFIX}__error`}>
            {typeof error === 'string' ? error : 'An error occurred while loading the dashboard.'}
          </div>
        )}
        
        {withHeader && (
          <DashboardHeader>
            <div>
              {title && <Text variant="h4">{title}</Text>}
              {description && <Text variant="body2" color="secondary">{description}</Text>}
            </div>
            {onRefresh && (
              <Button variant="secondary" onClick={onRefresh}>
                Refresh
              </Button>
            )}
          </DashboardHeader>
        )}
        
        <div className={`${DASHBOARD_CLASS_PREFIX}--with-sidebar`}>
          {withSidebar && <DashboardSidebar />}
          
          <DashboardMain>
            {widgets.length > 0 && (
              <DashboardWidgets>
                {widgets.map((widget, index) => (
                  <DashboardWidget
                    key={widget.id || index}
                    title={widget.title}
                    type={widget.type}
                    withBorder={withBorder}
                    withShadow={withShadow}
                  >
                    {widget.content}
                  </DashboardWidget>
                ))}
              </DashboardWidgets>
            )}
          </DashboardMain>
        </div>
        
        {withFooter && <DashboardFooter />}
      </div>
    </DashboardContext.Provider>
  );
};

Dashboard.propTypes = {
  variant: PropTypes.oneOf(Object.values(DASHBOARD_VARIANTS)),
  size: PropTypes.oneOf(Object.values(DASHBOARD_SIZES)),
  layout: PropTypes.oneOf(Object.values(DASHBOARD_LAYOUTS)),
  withHeader: PropTypes.bool,
  withSidebar: PropTypes.bool,
  withFooter: PropTypes.bool,
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  withPadding: PropTypes.bool,
  withGap: PropTypes.bool,
  withBackground: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      type: PropTypes.oneOf(Object.values(WIDGET_TYPES)),
      content: PropTypes.node
    })
  ),
  onRefresh: PropTypes.func
};

/**
 * Dashboard Header component
 */
const DashboardHeader = ({ children, className, ...rest }) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__header`,
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={classNames} {...rest}>
      {children}
    </header>
  );
};

DashboardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Dashboard Sidebar component
 */
const DashboardSidebar = ({ children, className, ...rest }) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__sidebar`,
    className
  ].filter(Boolean).join(' ');

  return (
    <aside className={classNames} {...rest}>
      {children}
    </aside>
  );
};

DashboardSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Dashboard Main component
 */
const DashboardMain = ({ children, className, ...rest }) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__main`,
    className
  ].filter(Boolean).join(' ');

  return (
    <main className={classNames} {...rest}>
      {children}
    </main>
  );
};

DashboardMain.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Dashboard Widgets component
 */
const DashboardWidgets = ({ children, className, ...rest }) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__widgets`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

DashboardWidgets.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Dashboard Widget component
 */
const DashboardWidget = ({
  title,
  type = WIDGET_TYPES.CUSTOM,
  withBorder = true,
  withShadow = true,
  children,
  className,
  actions,
  footer,
  ...rest
}) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__widget`,
    `${DASHBOARD_CLASS_PREFIX}__widget--${type}`,
    withBorder && `${DASHBOARD_CLASS_PREFIX}__widget--with-border`,
    withShadow && `${DASHBOARD_CLASS_PREFIX}__widget--with-shadow`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...rest}>
      {title && (
        <div className={`${DASHBOARD_CLASS_PREFIX}__widget-header`}>
          <div className={`${DASHBOARD_CLASS_PREFIX}__widget-title`}>{title}</div>
          {actions && (
            <div className={`${DASHBOARD_CLASS_PREFIX}__widget-actions`}>
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={`${DASHBOARD_CLASS_PREFIX}__widget-content`}>
        {children}
      </div>
      {footer && (
        <div className={`${DASHBOARD_CLASS_PREFIX}__widget-footer`}>
          {footer}
        </div>
      )}
    </div>
  );
};

DashboardWidget.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.values(WIDGET_TYPES)),
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  actions: PropTypes.node,
  footer: PropTypes.node
};

/**
 * Dashboard Footer component
 */
const DashboardFooter = ({ children, className, ...rest }) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__footer`,
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classNames} {...rest}>
      {children}
    </footer>
  );
};

DashboardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Dashboard Empty component
 */
const DashboardEmpty = ({
  title = 'No data available',
  message = 'There is no data to display at the moment.',
  action,
  className,
  ...rest
}) => {
  const classNames = [
    `${DASHBOARD_CLASS_PREFIX}__empty`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...rest}>
      <div className={`${DASHBOARD_CLASS_PREFIX}__empty-title`}>{title}</div>
      <div className={`${DASHBOARD_CLASS_PREFIX}__empty-message`}>{message}</div>
      {action && <div className={`${DASHBOARD_CLASS_PREFIX}__empty-action`}>{action}</div>}
    </div>
  );
};

DashboardEmpty.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string
};

// Attach sub-components to Dashboard
Dashboard.Header = DashboardHeader;
Dashboard.Sidebar = DashboardSidebar;
Dashboard.Main = DashboardMain;
Dashboard.Widgets = DashboardWidgets;
Dashboard.Widget = DashboardWidget;
Dashboard.Footer = DashboardFooter;
Dashboard.Empty = DashboardEmpty;

// Set display name
Dashboard.displayName = DASHBOARD_DISPLAY_NAME;

export default Dashboard;
