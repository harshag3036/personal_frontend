import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAccordion } from './Accordion';

/**
 * AccordionItem Context
 * 
 * Provides state and methods for accordion item components.
 */
export const AccordionItemContext = createContext({
  isExpanded: false,
  index: -1,
  toggleItem: () => {},
});

/**
 * AccordionItem Component
 * 
 * A component that represents an item in an accordion.
 * 
 * @example
 * ```jsx
 * <AccordionItem>
 *   <AccordionHeader>Section 1</AccordionHeader>
 *   <AccordionPanel>Content for section 1</AccordionPanel>
 * </AccordionItem>
 * ```
 */
const AccordionItem = ({
  children,
  index,
  className = '',
  ...restProps
}) => {
  const { expandedItems, toggleItem } = useAccordion();
  
  // Check if this item is expanded
  const isExpanded = expandedItems.includes(index);
  
  // Combine class names
  const itemClasses = [
    'ui-accordion-item',
    isExpanded && 'ui-accordion-item--expanded',
    className
  ].filter(Boolean).join(' ');
  
  // Context value
  const contextValue = {
    isExpanded,
    index,
    toggleItem: () => toggleItem(index),
  };
  
  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div 
        className={itemClasses}
        {...restProps}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

AccordionItem.propTypes = {
  /** Accordion item content */
  children: PropTypes.node.isRequired,
  /** Index of the item (provided by Accordion) */
  index: PropTypes.number,
  /** Additional CSS class */
  className: PropTypes.string,
};

/**
 * useAccordionItem Hook
 * 
 * A hook to access the accordion item context.
 */
export const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  
  if (!context) {
    throw new Error('useAccordionItem must be used within an AccordionItem component');
  }
  
  return context;
};

export default AccordionItem;
