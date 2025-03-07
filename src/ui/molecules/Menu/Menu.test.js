import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu, MenuItem, MenuDivider } from './index';

describe('Menu Component', () => {
  // Basic rendering test
  test('renders when open and does not render when closed', () => {
    const { rerender } = render(
      <Menu isOpen={true}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    
    // Rerender with isOpen=false
    rerender(
      <Menu isOpen={false}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });
  
  // Test menu item click
  test('calls onItemClick when a menu item is clicked', () => {
    const handleItemClick = jest.fn();
    
    render(
      <Menu isOpen={true} onItemClick={handleItemClick}>
        <MenuItem index={0} value="option1">Option 1</MenuItem>
        <MenuItem index={1} value="option2">Option 2</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(handleItemClick).toHaveBeenCalledWith(expect.anything(), 0, 'option1');
  });
  
  // Test menu close on item click
  test('closes the menu when an item is clicked and closeOnSelect is true', () => {
    const handleClose = jest.fn();
    
    render(
      <Menu isOpen={true} onClose={handleClose} closeOnSelect={true}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(handleClose).toHaveBeenCalled();
  });
  
  // Test menu does not close on item click when closeOnSelect is false
  test('does not close the menu when an item is clicked and closeOnSelect is false', () => {
    const handleClose = jest.fn();
    
    render(
      <Menu isOpen={true} onClose={handleClose} closeOnSelect={false}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(handleClose).not.toHaveBeenCalled();
  });
  
  // Test menu close on escape key
  test('closes the menu when escape key is pressed', async () => {
    const handleClose = jest.fn();
    
    render(
      <Menu isOpen={true} onClose={handleClose} closeOnEsc={true}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(handleClose).toHaveBeenCalled();
  });
  
  // Test menu does not close on escape key when closeOnEsc is false
  test('does not close the menu when escape key is pressed and closeOnEsc is false', () => {
    const handleClose = jest.fn();
    
    render(
      <Menu isOpen={true} onClose={handleClose} closeOnEsc={false}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(handleClose).not.toHaveBeenCalled();
  });
  
  // Test menu close on outside click
  test('closes the menu when clicking outside', async () => {
    const handleClose = jest.fn();
    
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Menu isOpen={true} onClose={handleClose} closeOnBlur={true}>
          <MenuItem index={0}>Option 1</MenuItem>
          <MenuItem index={1}>Option 2</MenuItem>
        </Menu>
      </div>
    );
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    expect(handleClose).toHaveBeenCalled();
  });
  
  // Test menu does not close on outside click when closeOnBlur is false
  test('does not close the menu when clicking outside and closeOnBlur is false', () => {
    const handleClose = jest.fn();
    
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Menu isOpen={true} onClose={handleClose} closeOnBlur={false}>
          <MenuItem index={0}>Option 1</MenuItem>
          <MenuItem index={1}>Option 2</MenuItem>
        </Menu>
      </div>
    );
    
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    expect(handleClose).not.toHaveBeenCalled();
  });
  
  // Test disabled menu item
  test('does not call onItemClick when a disabled menu item is clicked', () => {
    const handleItemClick = jest.fn();
    
    render(
      <Menu isOpen={true} onItemClick={handleItemClick}>
        <MenuItem index={0} disabled>Option 1</MenuItem>
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(handleItemClick).not.toHaveBeenCalled();
  });
  
  // Test menu divider
  test('renders menu divider correctly', () => {
    render(
      <Menu isOpen={true}>
        <MenuItem index={0}>Option 1</MenuItem>
        <MenuDivider data-testid="divider" />
        <MenuItem index={1}>Option 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('divider')).toBeInTheDocument();
    expect(screen.getByTestId('divider')).toHaveAttribute('role', 'separator');
  });
  
  // Test keyboard navigation
  test('handles keyboard navigation correctly', () => {
    render(
      <Menu isOpen={true}>
        <MenuItem index={0} data-testid="item-0">Option 1</MenuItem>
        <MenuItem index={1} data-testid="item-1">Option 2</MenuItem>
        <MenuItem index={2} data-testid="item-2">Option 3</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByRole('menu');
    
    // Initial focus should be on the first item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('item-1'));
    
    // Move down again
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('item-2'));
    
    // Move down again should cycle back to the first item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('item-0'));
    
    // Move up should go to the last item
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(screen.getByTestId('item-2'));
    
    // Home key should go to the first item
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(screen.getByTestId('item-0'));
    
    // End key should go to the last item
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByTestId('item-2'));
  });
  
  // Test menu item with icon and right icon
  test('renders menu item with icon and right icon correctly', () => {
    render(
      <Menu isOpen={true}>
        <MenuItem 
          index={0} 
          icon={<span data-testid="left-icon">🔍</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Option 1
        </MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
  
  // Test different variants
  test('applies the correct variant class', () => {
    render(
      <Menu isOpen={true} variant="primary" data-testid="menu">
        <MenuItem index={0}>Option 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('ui-menu--primary');
  });
  
  // Test different sizes
  test('applies the correct size class', () => {
    render(
      <Menu isOpen={true} size="lg" data-testid="menu">
        <MenuItem index={0}>Option 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('ui-menu--lg');
  });
});
