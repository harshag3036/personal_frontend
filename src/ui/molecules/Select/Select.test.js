/**
 * Select Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select, { 
  SELECT_CLASS, 
  SELECT_VARIANTS, 
  SELECT_SIZES, 
  SELECT_STATES,
  SELECT_MODIFIERS,
  SELECT_BREAKPOINTS
} from './index';

describe('Select Component', () => {
  // Mock options for testing
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Basic rendering tests
  test('renders correctly', () => {
    render(<Select options={mockOptions} label="Test Select" />);
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Select options={mockOptions} />);
    expect(container.firstChild).toHaveClass(SELECT_CLASS);
  });

  // Variant tests
  test('applies the correct variant class for default', () => {
    const { container } = render(<Select options={mockOptions} variant={SELECT_VARIANTS.DEFAULT} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_VARIANTS.DEFAULT}`);
  });

  test('applies the correct variant class for filled', () => {
    const { container } = render(<Select options={mockOptions} variant={SELECT_VARIANTS.FILLED} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_VARIANTS.FILLED}`);
  });

  test('applies the correct variant class for outlined', () => {
    const { container } = render(<Select options={mockOptions} variant={SELECT_VARIANTS.OUTLINED} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_VARIANTS.OUTLINED}`);
  });

  // Size tests
  test('applies the correct size class for small', () => {
    const { container } = render(<Select options={mockOptions} size={SELECT_SIZES.SMALL} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_SIZES.SMALL}`);
  });

  test('applies the correct size class for medium', () => {
    const { container } = render(<Select options={mockOptions} size={SELECT_SIZES.MEDIUM} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_SIZES.MEDIUM}`);
  });

  test('applies the correct size class for large', () => {
    const { container } = render(<Select options={mockOptions} size={SELECT_SIZES.LARGE} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_SIZES.LARGE}`);
  });

  // State tests
  test('applies the correct state class for default', () => {
    const { container } = render(<Select options={mockOptions} state={SELECT_STATES.DEFAULT} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_STATES.DEFAULT}`);
  });

  test('applies the correct state class for success', () => {
    const { container } = render(<Select options={mockOptions} state={SELECT_STATES.SUCCESS} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_STATES.SUCCESS}`);
  });

  test('applies the correct state class for error', () => {
    const { container } = render(<Select options={mockOptions} state={SELECT_STATES.ERROR} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_STATES.ERROR}`);
  });

  test('applies the correct state class for warning', () => {
    const { container } = render(<Select options={mockOptions} state={SELECT_STATES.WARNING} />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_STATES.WARNING}`);
  });

  // Modifier tests
  test('applies the disabled class when disabled', () => {
    const { container } = render(<Select options={mockOptions} disabled />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_MODIFIERS.DISABLED}`);
  });

  test('applies the required class when required', () => {
    const { container } = render(<Select options={mockOptions} required />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_MODIFIERS.REQUIRED}`);
  });

  test('applies the full width class when fullWidth is true', () => {
    const { container } = render(<Select options={mockOptions} fullWidth />);
    expect(container.firstChild).toHaveClass(`${SELECT_CLASS}-${SELECT_MODIFIERS.FULL_WIDTH}`);
  });

  // Label and helper text tests
  test('renders label when provided', () => {
    render(<Select options={mockOptions} label="Select Label" />);
    expect(screen.getByText('Select Label')).toBeInTheDocument();
  });

  test('renders required indicator when required', () => {
    render(<Select options={mockOptions} label="Select Label" required />);
    const labelElement = screen.getByText('Select Label');
    expect(labelElement.nextSibling).toHaveClass('ds-select-required');
  });

  test('renders helper text when provided', () => {
    render(<Select options={mockOptions} helperText="Helper Text" />);
    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });

  test('renders error text when in error state and errorText is provided', () => {
    render(<Select options={mockOptions} state={SELECT_STATES.ERROR} errorText="Error Text" />);
    expect(screen.getByText('Error Text')).toBeInTheDocument();
    expect(screen.getByText('Error Text').className).toContain('ds-select-error-text');
  });

  // Placeholder test
  test('renders placeholder when no value is selected', () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  // Selected value test
  test('renders selected option label when value is provided', () => {
    render(<Select options={mockOptions} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  // Dropdown tests
  test('opens dropdown when clicked', () => {
    render(<Select options={mockOptions} />);
    const selectContainer = screen.getByRole('combobox');
    
    fireEvent.click(selectContainer);
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('selects option when clicked', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    const selectContainer = screen.getByRole('combobox');
    fireEvent.click(selectContainer);
    
    const option = screen.getByText('Option 2');
    fireEvent.click(option);
    
    expect(handleChange).toHaveBeenCalledWith('option2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // Keyboard navigation tests
  test('opens dropdown with Enter key', () => {
    render(<Select options={mockOptions} />);
    const selectContainer = screen.getByRole('combobox');
    
    fireEvent.keyDown(selectContainer, { key: 'Enter' });
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  test('closes dropdown with Escape key', () => {
    render(<Select options={mockOptions} />);
    const selectContainer = screen.getByRole('combobox');
    
    fireEvent.click(selectContainer);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    fireEvent.keyDown(selectContainer, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // Icon tests
  test('renders start icon when provided', () => {
    const startIcon = <span data-testid="start-icon">🔍</span>;
    render(<Select options={mockOptions} startIcon={startIcon} />);
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  test('renders end icon when provided', () => {
    const endIcon = <span data-testid="end-icon">🔽</span>;
    render(<Select options={mockOptions} endIcon={endIcon} />);
    
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  // Disabled state tests
  test('does not open dropdown when disabled', () => {
    render(<Select options={mockOptions} disabled />);
    const selectContainer = screen.getByRole('combobox');
    
    fireEvent.click(selectContainer);
    
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // Error handling tests
  test('handles invalid variant gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Select options={mockOptions} variant="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid variant'));
    consoleSpy.mockRestore();
  });

  test('handles invalid size gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Select options={mockOptions} size="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid size'));
    consoleSpy.mockRestore();
  });

  test('handles invalid state gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Select options={mockOptions} state="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid state'));
    consoleSpy.mockRestore();
  });

  test('handles onChange errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleChange = () => {
      throw new Error('Test error');
    };
    
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    const selectContainer = screen.getByRole('combobox');
    fireEvent.click(selectContainer);
    
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onChange handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Extension tests
  test('handles extension errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock componentExtension to throw an error
    jest.spyOn(require('../../utilities').componentExtension, 'applyComponentExtensions').mockImplementation(() => {
      throw new Error('Test error');
    });
    
    render(<Select options={mockOptions} extensions={['test']} />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error applying extensions'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Responsive props tests
  test('handles responsive props correctly', () => {
    const { container } = render(
      <Select 
        options={mockOptions} 
        size={{ 
          base: SELECT_SIZES.SMALL, 
          md: SELECT_SIZES.MEDIUM, 
          lg: SELECT_SIZES.LARGE 
        }}
      />
    );
    
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Select options={mockOptions} as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('passes additional props to the rendered element', () => {
    const { container } = render(
      <Select options={mockOptions} as="section" data-testid="test-select" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-select');
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Select options={mockOptions} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(SELECT_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Select options={mockOptions} style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(SELECT_VARIANTS)).toContain('default');
    expect(Object.values(SELECT_VARIANTS)).toContain('filled');
    expect(Object.values(SELECT_VARIANTS)).toContain('outlined');
    
    expect(Object.values(SELECT_SIZES)).toContain('small');
    expect(Object.values(SELECT_SIZES)).toContain('medium');
    expect(Object.values(SELECT_SIZES)).toContain('large');
    
    expect(Object.values(SELECT_STATES)).toContain('default');
    expect(Object.values(SELECT_STATES)).toContain('success');
    expect(Object.values(SELECT_STATES)).toContain('error');
    expect(Object.values(SELECT_STATES)).toContain('warning');
    
    expect(Object.values(SELECT_MODIFIERS)).toContain('open');
    expect(Object.values(SELECT_MODIFIERS)).toContain('disabled');
    expect(Object.values(SELECT_MODIFIERS)).toContain('required');
    expect(Object.values(SELECT_MODIFIERS)).toContain('full-width');
    expect(Object.values(SELECT_MODIFIERS)).toContain('focused');
    
    expect(SELECT_BREAKPOINTS).toBeDefined();
  });
});
