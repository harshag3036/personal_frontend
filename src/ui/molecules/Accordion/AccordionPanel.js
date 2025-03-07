import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionItem } from './AccordionItem';

/**
 * AccordionPanel Component
 * 
 * A component that represents the content panel of an accordion item.
 * 
 * @example
 * ```jsx
 * <AccordionPanel>Content for section 1</AccordionPanel>
 * ```
 */
const AccordionPanel = ({
  children,
  className = '',
  ...restProps
}) => {
  const { isExpanded, index } = useAccordionItem();
  
  // Generate unique IDs for accessibility
  const headerId = `accordion-header-${index}`;
  const panelId = `accordion-panel-${index}`;
  
  // Combine class names
  const panelClasses = [
    'ui-accordion-panel',
    isExpanded && 'ui-accordion-panel--expanded',
    className
  ].filter(Boolean).join(' ');
  
  // Don't render if not expanded
  if (!isExpanded) return null;
  
  return (
    <div
      className={panelClasses}
      role="region"
      aria-labelledby={headerId}
      id={panelId}
      {...restProps}
    >
      <div className="ui-accordion-panel__content">
        {children}
      </div>
    </div>
  );
};

AccordionPanel.propTypes = {
  /** Panel content */
  children: PropTypes.node.isRequired,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default AccordionPanel;
