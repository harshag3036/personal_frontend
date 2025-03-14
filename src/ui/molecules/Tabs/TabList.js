import React from 'react';
import PropTypes from 'prop-types';

/**
 * TabList Component
 * 
 * A container for Tab components that provides the navigation interface for the tabs.
 * This component follows the WAI-ARIA Tabs Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <TabList>
 *   <Tab>Tab 1</Tab>
 *   <Tab>Tab 2</Tab>
 *   <Tab>Tab 3</Tab>
 * </TabList>
 * ```
 */
const TabList = ({
  children,
  className = '',
  ...restProps
}) => {
  // Combine class names
  const tabListClasses = [
    'ui-tab-list',
    className
  ].filter(Boolean).join(' ');

  // Clone children to add index prop
  const tabsWithIndex = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { index });
    }
    return child;
  });

  return (
    <div 
      className={tabListClasses}
      role="tablist"
      {...restProps}
    >
      {tabsWithIndex}
    </div>
  );
};

TabList.propTypes = {
  /** Tab buttons */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default TabList;
