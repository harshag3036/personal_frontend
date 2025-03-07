import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent } from './index';

describe('Popover Component', () => {
  // Basic rendering test
  test('renders without crashing', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });
  
  // Test opening and closing
  test('opens when trigger is clicked', async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Initially closed
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Should be open now
    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });
  });
  
  // Test closing on outside click
  test('closes when clicking outside', async () => {
    // Create a div to click outside
    const { container } = render(
      <div>
        <div data-testid="outside">Outside</div>
        <Popover>
          <PopoverTrigger>
            <button>Open Popover</button>
          </PopoverTrigger>
          <PopoverContent>
            <div>Popover Content</div>
          </PopoverContent>
        </Popover>
      </div>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify it's open
    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    // Verify it's closed
    await waitFor(() => {
      expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    });
  });
  
  // Test closing on Escape key
  test('closes when pressing Escape key', async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify it's open
    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });
    
    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Verify it's closed
    await waitFor(() => {
      expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    });
  });
  
  // Test controlled mode
  test('works in controlled mode', async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      
      return (
        <div>
          <button data-testid="external-button" onClick={() => setIsOpen(!isOpen)}>
            Toggle Popover
          </button>
          
          <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <PopoverTrigger>
              <button>Popover Trigger</button>
            </PopoverTrigger>
            <PopoverContent>
              <div>Controlled Popover</div>
            </PopoverContent>
          </Popover>
        </div>
      );
    };
    
    render(<TestComponent />);
    
    // Initially closed
    expect(screen.queryByText('Controlled Popover')).not.toBeInTheDocument();
    
    // Open with external control
    fireEvent.click(screen.getByTestId('external-button'));
    
    // Should be open now
    await waitFor(() => {
      expect(screen.getByText('Controlled Popover')).toBeInTheDocument();
    });
    
    // Close with external control
    fireEvent.click(screen.getByTestId('external-button'));
    
    // Should be closed now
    await waitFor(() => {
      expect(screen.queryByText('Controlled Popover')).not.toBeInTheDocument();
    });
  });
  
  // Test different placements
  test('applies the correct placement class', async () => {
    render(
      <Popover placement="top">
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify the placement class
    await waitFor(() => {
      const popoverContent = screen.getByTestId('popover-content');
      expect(popoverContent).toHaveClass('ui-popover-content--top');
    });
  });
  
  // Test different variants
  test('applies the correct variant class', async () => {
    render(
      <Popover variant="success">
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify the variant class
    await waitFor(() => {
      const popoverContent = screen.getByTestId('popover-content');
      expect(popoverContent).toHaveClass('ui-popover-content--success');
    });
  });
  
  // Test arrow rendering
  test('renders arrow when arrow prop is true', async () => {
    render(
      <Popover arrow={true}>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify the arrow class and element
    await waitFor(() => {
      const popoverContent = screen.getByTestId('popover-content');
      expect(popoverContent).toHaveClass('ui-popover-content--arrow');
      expect(popoverContent.querySelector('.ui-popover-arrow')).toBeInTheDocument();
    });
  });
  
  // Test without arrow
  test('does not render arrow when arrow prop is false', async () => {
    render(
      <Popover arrow={false}>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify no arrow
    await waitFor(() => {
      const popoverContent = screen.getByTestId('popover-content');
      expect(popoverContent).not.toHaveClass('ui-popover-content--arrow');
      expect(popoverContent.querySelector('.ui-popover-arrow')).not.toBeInTheDocument();
    });
  });
  
  // Test callbacks
  test('calls onOpen and onClose callbacks', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    
    render(
      <Popover onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify onOpen was called
    expect(onOpen).toHaveBeenCalledTimes(1);
    
    // Close the popover
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Verify onClose was called
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
  
  // Test focus management
  test('focuses the content when opened', async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    
    // Open the popover
    fireEvent.click(screen.getByText('Open Popover'));
    
    // Verify focus
    await waitFor(() => {
      const popoverContent = screen.getByTestId('popover-content');
      expect(document.activeElement).toBe(popoverContent);
    });
  });
});
