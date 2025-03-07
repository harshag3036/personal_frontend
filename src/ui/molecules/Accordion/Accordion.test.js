import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionHeader, 
  AccordionPanel 
} from './index';

describe('Accordion Component', () => {
  const renderAccordion = (props = {}) => {
    return render(
      <Accordion {...props}>
        <AccordionItem>
          <AccordionHeader>Section 1</AccordionHeader>
          <AccordionPanel>Content 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>Section 2</AccordionHeader>
          <AccordionPanel>Content 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>Section 3</AccordionHeader>
          <AccordionPanel>Content 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  };

  test('renders accordion headers', () => {
    renderAccordion();
    
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  test('expands the first item by default when defaultIndex is 0', () => {
    renderAccordion({ defaultIndex: 0 });
    
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  test('expands multiple items when allowMultiple is true and defaultIndex is an array', () => {
    renderAccordion({ allowMultiple: true, defaultIndex: [0, 2] });
    
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });

  test('toggles item expansion when header is clicked', () => {
    renderAccordion();
    
    // Initially, no items are expanded
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    
    // Click the first header
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Click the first header again to collapse it
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test('collapses previously expanded item when a new item is clicked and allowMultiple is false', () => {
    renderAccordion({ defaultIndex: 0 });
    
    // Initially, the first item is expanded
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Click the second header
    fireEvent.click(screen.getByText('Section 2'));
    
    // The first item should be collapsed and the second item expanded
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('keeps previously expanded item when a new item is clicked and allowMultiple is true', () => {
    renderAccordion({ allowMultiple: true, defaultIndex: 0 });
    
    // Initially, the first item is expanded
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Click the second header
    fireEvent.click(screen.getByText('Section 2'));
    
    // Both items should be expanded
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('applies variant and size classes correctly', () => {
    renderAccordion({ variant: 'filled', size: 'lg' });
    
    const accordion = screen.getByText('Section 1').closest('.ui-accordion');
    expect(accordion).toHaveClass('ui-accordion--filled');
    expect(accordion).toHaveClass('ui-accordion--lg');
  });

  test('applies custom className correctly', () => {
    renderAccordion({ className: 'custom-accordion' });
    
    const accordion = screen.getByText('Section 1').closest('.ui-accordion');
    expect(accordion).toHaveClass('custom-accordion');
  });

  test('expands item when Enter key is pressed on header', () => {
    renderAccordion();
    
    const header = screen.getByText('Section 1');
    
    // Initially, the item is collapsed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    
    // Press Enter key on the header
    fireEvent.keyDown(header, { key: 'Enter' });
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('expands item when Space key is pressed on header', () => {
    renderAccordion();
    
    const header = screen.getByText('Section 1');
    
    // Initially, the item is collapsed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    
    // Press Space key on the header
    fireEvent.keyDown(header, { key: ' ' });
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('sets correct ARIA attributes for accessibility', () => {
    renderAccordion({ defaultIndex: 0 });
    
    const header = screen.getByText('Section 1');
    const panel = screen.getByText('Content 1').closest('[role="region"]');
    
    // Header should have aria-expanded="true" and aria-controls pointing to the panel
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(header).toHaveAttribute('aria-controls', panel.id);
    
    // Panel should have aria-labelledby pointing to the header
    expect(panel).toHaveAttribute('aria-labelledby', header.id);
  });
});
