import { TAB_VARIANTS, TAB_SIZES } from './constants';
import React, { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={tabsClasses} {...restProps}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  /** Tab content */
  children: PropTypes.node.isRequired,
  /** Index of the default active tab */
  defaultTab: PropTypes.number,
  /** Visual variant of the tabs */
  variant: PropTypes.oneOf(['default', 'pills', 'underline', 'contained']),
  /** Size of the tabs */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Callback function when tab changes */
  onChange: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Tabs;
