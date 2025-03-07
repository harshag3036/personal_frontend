import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './Tabs';

/**
 * Tab Component
 * 
 * An individual tab button that can be selected to show its associated content.
 * This component follows the WAI-ARIA Tabs Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <Tab>Tab 1</Tab>
 * ```
 */
const Tab = ({
  children,
  index,
  disabled = false,
  icon,
  className = '',
  ...restProps
}) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const tabRef = useRef(null);
  const isActive = activeTab === index;

  // Handle tab click
  const handleClick = () => {
    if (!disabled) {
      setActiveTab(index);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveTab(index);
    }
  };

  // Focus the active tab on mount and when activeTab changes
  useEffect(() => {
    if (isActive && tabRef.current) {
      tabRef.current.focus();
    }
  }, [isActive]);

  // Combine class names
  const tabClasses = [
    'ui-tab',
    isActive && 'ui-tab--active',
    disabled && 'ui-tab--disabled',
    icon && 'ui-tab--with-icon',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={tabRef}
      className={tabClasses}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {icon && <span className="ui-tab__icon">{icon}</span>}
      <span className="ui-tab__text">{children}</span>
    </button>
  );
};

Tab.propTypes = {
  /** Tab label */
  children: PropTypes.node.isRequired,
  /** Tab index (automatically provided by TabList) */
  index: PropTypes.number,
  /** Whether the tab is disabled */
  disabled: PropTypes.bool,
  /** Optional icon to display with the tab */
  icon: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Tab;
