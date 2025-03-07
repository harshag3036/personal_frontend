import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from './index';

describe('Dropdown Component', () => {
  test('renders closed by default', () => {
    render(
      <Dropdown>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    expect(screen.getByText('Toggle')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('opens when trigger is clicked', () => {
    render(
      <Dropdown>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('closes when item is clicked and closeOnItemClick is true', () => {
    render(
      <Dropdown closeOnItemClick={true}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Click an item
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('stays open when item is clicked and closeOnItemClick is false', () => {
    render(
      <Dropdown closeOnItemClick={false}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Click an item
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('closes when clicking outside and closeOnOutsideClick is true', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown closeOnOutsideClick={true}>
          <DropdownTrigger>
            <button>Toggle</button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    // Wait for the dropdown to close
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  test('closes when escape key is pressed', async () => {
    render(
      <Dropdown>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Press escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Wait for the dropdown to close
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  test('calls onToggle when dropdown is toggled', () => {
    const handleToggle = jest.fn();
    render(
      <Dropdown onToggle={handleToggle}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Toggle'));
    expect(handleToggle).toHaveBeenCalledWith(true);
    
    // Close the dropdown
    fireEvent.click(screen.getByText('Toggle'));
    expect(handleToggle).toHaveBeenCalledWith(false);
  });

  test('controlled dropdown opens and closes based on isOpen prop', () => {
    const { rerender } = render(
      <Dropdown isOpen={false}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Dropdown should be closed
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    
    // Update isOpen prop to true
    rerender(
      <Dropdown isOpen={true}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Dropdown should be open
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('disabled dropdown item does not trigger onClick', () => {
    const handleClick = jest.fn();
    render(
      <Dropdown isOpen={true}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem disabled onClick={handleClick}>
            Disabled Option
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Click the disabled item
    fireEvent.click(screen.getByText('Disabled Option'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies variant and size classes correctly', () => {
    render(
      <Dropdown variant="primary" size="lg" isOpen={true}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const dropdown = screen.getByText('Toggle').closest('.ui-dropdown');
    expect(dropdown).toHaveClass('ui-dropdown--primary');
    expect(dropdown).toHaveClass('ui-dropdown--lg');
  });

  test('renders dropdown item with icon correctly', () => {
    render(
      <Dropdown isOpen={true}>
        <DropdownTrigger>
          <button>Toggle</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem icon={<span data-testid="icon">🔍</span>}>
            Search
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
