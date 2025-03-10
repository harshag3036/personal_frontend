import Accordion, { useAccordion } from './Accordion';
import AccordionItem, { useAccordionItem } from './AccordionItem';
import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';

// Re-export constants from constants.js
export { ACCORDION_VARIANTS, ACCORDION_SIZES } from './constants';

// Export components
export { 
  Accordion, 
  AccordionItem, 
  AccordionHeader, 
  AccordionPanel,
  useAccordion,
  useAccordionItem
};

// Default export
export default Accordion;
