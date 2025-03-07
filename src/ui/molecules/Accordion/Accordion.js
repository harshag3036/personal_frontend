import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

/**
 * Accordion Context
 * 
 * Provides state and methods for accordion components.
 */
export const AccordionContext = createContext({
  expandedItems: [],
  toggleItem: () => {},
  allowMultiple: false,
  variant: 'default',
  size: 'md',
});

/**
 * Accordion Component
 * 
 * A versatile accordion component that can be used to display collapsible content.
 * This component follows the WAI-ARIA Accordion Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <Accordion>
 *   <AccordionItem>
 *     <AccordionHeader>Section 1</AccordionHeader>
 *     <AccordionPanel>Content for section 1</AccordionPanel>
 *   </AccordionItem>
 *   <AccordionItem>
 *     <AccordionHeader>Section 2</AccordionHeader>
 *     <AccordionPanel>Content for section 2</AccordionPanel>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = ({
  children,
  defaultIndex = [],
  allowMultiple = false,
  variant = 'default',
  size = 'md',
  className = '',
  ...restProps
}) => {
  // Convert defaultIndex to array if it's a number
  const defaultExpandedItems = Array.isArray(defaultIndex) 
    ? defaultIndex 
    : [defaultIndex].filter(index => index !== undefined);
  
  // State for expanded items
  const [expandedItems, setExpandedItems] = useState(defaultExpandedItems);
  
  // Toggle item expansion
  const toggleItem = (index) => {
    setExpandedItems(prevExpandedItems => {
      // Check if the item is already expanded
      const isExpanded = prevExpandedItems.includes(index);
      
      if (isExpanded) {
        // Remove the item from expanded items
        return prevExpandedItems.filter(item => item !== index);
      } else if (allowMultiple) {
        // Add the item to expanded items
        return [...prevExpandedItems, index];
      } else {
        // Replace expanded items with the new item
        return [index];
      }
    });
  };
  
  // Combine class names
  const accordionClasses = [
    'ui-accordion',
    `ui-accordion--${variant}`,
    `ui-accordion--${size}`,
    className
  ].filter(Boolean).join(' ');
  
  // Context value
  const contextValue = {
    expandedItems,
    toggleItem,
    allowMultiple,
    variant,
    size,
  };
  
  return (
    <AccordionContext.Provider value={contextValue}>
      <div 
        className={accordionClasses}
        {...restProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          
          return React.cloneElement(child, {
            index,
          });
        })}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.propTypes = {
  /** Accordion items */
  children: PropTypes.node.isRequired,
  /** Index or array of indices of the expanded items by default */
  defaultIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  /** Whether multiple items can be expanded at the same time */
  allowMultiple: PropTypes.bool,
  /** Visual variant of the accordion */
  variant: PropTypes.oneOf(['default', 'outline', 'filled', 'subtle']),
  /** Size of the accordion */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS class */
  className: PropTypes.string,
};

/**
 * useAccordion Hook
 * 
 * A hook to access the accordion context.
 */
export const useAccordion = () => {
  const context = useContext(AccordionContext);
  
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion component');
  }
  
  return context;
};

export default Accordion;
