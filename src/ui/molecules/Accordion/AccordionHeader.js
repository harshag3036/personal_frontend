import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionItem } from './AccordionItem';
import { useAccordion } from './Accordion';
import { Icon } from '../../atoms';

/**
 * AccordionHeader Component
 * 
 * A component that represents the header of an accordion item.
 * 
 * @example
 * ```jsx
 * <AccordionHeader>Section 1</AccordionHeader>
 * ```
 */
const AccordionHeader = ({
  children,
  icon,
  className = '',
  ...restProps
}) => {
  const { isExpanded, toggleItem, index } = useAccordionItem();
  const { size } = useAccordion();
  
  // Generate unique IDs for accessibility
  const headerId = `accordion-header-${index}`;
  const panelId = `accordion-panel-${index}`;
  
  // Combine class names
  const headerClasses = [
    'ui-accordion-header',
    isExpanded && 'ui-accordion-header--expanded',
    className
  ].filter(Boolean).join(' ');
  
  // Handle keyboard events
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem();
    }
  };
  
  // Default icon is chevron-down/up
  const defaultIcon = (
    <Icon 
      name={isExpanded ? 'chevron-up' : 'chevron-down'} 
      size={size === 'lg' ? 'md' : 'sm'} 
      className="ui-accordion-header__icon"
    />
  );
  
  return (
    <div
      className={headerClasses}
      onClick={toggleItem}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      id={headerId}
      {...restProps}
    >
      <div className="ui-accordion-header__content">
        {children}
      </div>
      {icon || defaultIcon}
    </div>
  );
};

AccordionHeader.propTypes = {
  /** Header content */
  children: PropTypes.node.isRequired,
  /** Custom icon to display instead of the default chevron */
  icon: PropTypes.node,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default AccordionHeader;
