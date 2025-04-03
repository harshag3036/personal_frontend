import { TAB_VARIANTS, TAB_SIZES } from './constants';
import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import './Tabs.css';

// Create a context for the tabs state
export const TabsContext = createContext({
  activeTab: 0,
  setActiveTab: () => {},
});

/**
 * Tabs Component
 * 
 * A versatile tabs component that provides an accessible way to organize content into separate views.
 * This component follows the WAI-ARIA Tabs Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <Tabs defaultTab={0}>
 *   <TabList>
 *     <Tab>Tab 1</Tab>
 *     <Tab>Tab 2</Tab>
 *     <Tab>Tab 3</Tab>
 *   </TabList>
 *   <TabPanel>Content for Tab 1</TabPanel>
 *   <TabPanel>Content for Tab 2</TabPanel>
 *   <TabPanel>Content for Tab 3</TabPanel>
 * </Tabs>
 * ```
 */
const Tabs = ({
  children,
  defaultTab = 0,
  variant = 'default',
  size = 'md',
  onChange,
  className = '',
  ...restProps
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  // Combine class names
  const tabsClasses = [
    'ui-tabs',
    `ui-tabs--${variant}`,
    `ui-tabs--size-${size}`,
    className
  ].filter(Boolean).join(' ');

  // Create tabs state object for render props
  const tabsState = useMemo(() => ({
    // Current state
    activeTab,
    
    // Configuration
    variant,
    size,
    
    // Actions
    setActiveTab: handleTabChange,
    
    // CSS Classes
    tabsClasses,
    
    // Constants
    variants: TAB_VARIANTS,
    sizes: TAB_SIZES
  }), [activeTab, variant, size, tabsClasses, handleTabChange]);
  
  // Check if using render props
  const isRenderProps = isFunction(children);
  
  // If using render props, call the children function with the tabs state
  if (isRenderProps) {
    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
        <div className={tabsClasses} {...restProps}>
          {children(tabsState)}
        </div>
      </TabsContext.Provider>
    );
  }

  // Clone children to add index prop to TabPanel components
  let tabPanelIndex = 0;
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // If it's a TabPanel, add the current index and increment the counter
      if (child.type.name === 'TabPanel') {
        const panel = React.cloneElement(child, { index: tabPanelIndex });
        tabPanelIndex++;
        return panel;
      }
    }
    return child;
  });

  // Default rendering with compound components
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={tabsClasses} {...restProps}>
        {childrenWithProps}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  /** 
   * Tab content or render props function
   * If a function is provided, it will be called with the tabs state 
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  /** Index of the default active tab */
  defaultTab: PropTypes.number,
  /** Visual variant of the tabs */
  variant: PropTypes.oneOf(Object.values(TAB_VARIANTS)),
  /** Size of the tabs */
  size: PropTypes.oneOf(Object.values(TAB_SIZES)),
  /** Callback function when tab changes */
  onChange: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Tabs;
