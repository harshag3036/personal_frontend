import Accordion, { useAccordion } from './Accordion';
import AccordionItem, { useAccordionItem } from './AccordionItem';
import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';

// Export accordion variants as constants
export const ACCORDION_VARIANTS = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
  FILLED: 'filled',
  SUBTLE: 'subtle',
};

// Export accordion sizes as constants
export const ACCORDION_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

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
