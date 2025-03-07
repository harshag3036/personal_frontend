import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './Tabs';

/**
 * TabPanel Component
 * 
 * A container for tab content that is shown when its associated tab is selected.
 * This component follows the WAI-ARIA Tabs Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <TabPanel>Content for Tab 1</TabPanel>
 * ```
 */
const TabPanel = ({
  children,
  index,
  className = '',
  ...restProps
}) => {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  // Combine class names
  const tabPanelClasses = [
    'ui-tab-panel',
    isActive && 'ui-tab-panel--active',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={tabPanelClasses}
      role="tabpanel"
      aria-hidden={!isActive}
      hidden={!isActive}
      tabIndex={0}
      {...restProps}
    >
      {children}
    </div>
  );
};

TabPanel.propTypes = {
  /** Tab panel content */
  children: PropTypes.node.isRequired,
  /** Tab panel index (automatically provided by Tabs) */
  index: PropTypes.number,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default TabPanel;
