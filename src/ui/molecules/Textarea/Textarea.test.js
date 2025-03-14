/**
 * Textarea Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from './index';
import { 
  TEXTAREA_CLASS, 
  TEXTAREA_VARIANTS, 
  TEXTAREA_SIZES, 
  TEXTAREA_STATES,
  TEXTAREA_MODIFIERS
} from './constants';

describe('Textarea Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Textarea id="test" name="test" label="Test Textarea" />);
    expect(screen.getByText('Test Textarea')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Textarea id="test" name="test" />);
    expect(container.firstChild).toHaveClass(TEXTAREA_CLASS);
  });

  // Variant tests
  test('applies the correct variant class for default', () => {
    const { container } = render(<Textarea id="test" name="test" variant={TEXTAREA_VARIANTS.DEFAULT} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_VARIANTS.DEFAULT}`);
  });

  test('applies the correct variant class for filled', () => {
    const { container } = render(<Textarea id="test" name="test" variant={TEXTAREA_VARIANTS.FILLED} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_VARIANTS.FILLED}`);
  });

  test('applies the correct variant class for outlined', () => {
    const { container } = render(<Textarea id="test" name="test" variant={TEXTAREA_VARIANTS.OUTLINED} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_VARIANTS.OUTLINED}`);
  });

  // Size tests
  test('applies the correct size class for small', () => {
    const { container } = render(<Textarea id="test" name="test" size={TEXTAREA_SIZES.SMALL} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_SIZES.SMALL}`);
  });

  test('applies the correct size class for medium', () => {
    const { container } = render(<Textarea id="test" name="test" size={TEXTAREA_SIZES.MEDIUM} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_SIZES.MEDIUM}`);
  });

  test('applies the correct size class for large', () => {
    const { container } = render(<Textarea id="test" name="test" size={TEXTAREA_SIZES.LARGE} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_SIZES.LARGE}`);
  });

  // State tests
  test('applies the correct state class for default', () => {
    const { container } = render(<Textarea id="test" name="test" state={TEXTAREA_STATES.DEFAULT} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_STATES.DEFAULT}`);
  });

  test('applies the correct state class for success', () => {
    const { container } = render(<Textarea id="test" name="test" state={TEXTAREA_STATES.SUCCESS} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_STATES.SUCCESS}`);
  });

  test('applies the correct state class for error', () => {
    const { container } = render(<Textarea id="test" name="test" state={TEXTAREA_STATES.ERROR} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_STATES.ERROR}`);
  });

  test('applies the correct state class for warning', () => {
    const { container } = render(<Textarea id="test" name="test" state={TEXTAREA_STATES.WARNING} />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_STATES.WARNING}`);
  });

  // Modifier tests
  test('applies the disabled class when disabled', () => {
    const { container } = render(<Textarea id="test" name="test" disabled />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.DISABLED}`);
  });

  test('applies the readonly class when readOnly', () => {
    const { container } = render(<Textarea id="test" name="test" readOnly />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.READONLY}`);
  });

  test('applies the required class when required', () => {
    const { container } = render(<Textarea id="test" name="test" required />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.REQUIRED}`);
  });

  test('applies the full width class when fullWidth is true', () => {
    const { container } = render(<Textarea id="test" name="test" fullWidth />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.FULL_WIDTH}`);
  });

  test('applies the auto-resize class when autoResize is true', () => {
    const { container } = render(<Textarea id="test" name="test" autoResize />);
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.AUTO_RESIZE}`);
  });

  // Label and helper text tests
  test('renders label when provided', () => {
    render(<Textarea id="test" name="test" label="Textarea Label" />);
    expect(screen.getByText('Textarea Label')).toBeInTheDocument();
    expect(screen.getByText('Textarea Label').tagName.toLowerCase()).toBe('label');
  });

  test('renders required indicator when required', () => {
    render(<Textarea id="test" name="test" label="Textarea Label" required />);
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass(`${TEXTAREA_CLASS}-required`);
  });

  test('renders helper text when provided', () => {
    render(<Textarea id="test" name="test" helperText="Helper Text" />);
    expect(screen.getByText('Helper Text')).toBeInTheDocument();
    expect(screen.getByText('Helper Text')).toHaveClass(`${TEXTAREA_CLASS}-helper-text`);
  });

  test('renders error text when in error state and errorText is provided', () => {
    render(<Textarea id="test" name="test" state={TEXTAREA_STATES.ERROR} errorText="Error Text" />);
    expect(screen.getByText('Error Text')).toBeInTheDocument();
    expect(screen.getByText('Error Text').className).toContain(`${TEXTAREA_CLASS}-error-text`);
  });

  // Character count tests
  test('renders character count when maxLength is provided', () => {
    render(<Textarea id="test" name="test" value="Test" maxLength={100} />);
    expect(screen.getByText('4/100')).toBeInTheDocument();
    expect(screen.getByText('4/100')).toHaveClass(`${TEXTAREA_CLASS}-char-count`);
  });

  test('applies exceeded class when character count exceeds maxLength', () => {
    // Mock the situation where the value exceeds maxLength
    // This is a bit of a hack since we can't actually set value > maxLength in the DOM
    const { container } = render(<Textarea id="test" name="test" value="Test" maxLength={2} />);
    const charCount = container.querySelector(`.${TEXTAREA_CLASS}-char-count`);
    expect(charCount).toHaveClass(`${TEXTAREA_CLASS}-char-count-exceeded`);
  });

  // Value and onChange tests
  test('displays the provided value', () => {
    render(<Textarea id="test" name="test" value="Test Value" />);
    expect(screen.getByRole('textbox')).toHaveValue('Test Value');
  });

  test('calls onChange when the value changes', () => {
    const handleChange = jest.fn();
    render(<Textarea id="test" name="test" onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Textarea id="test" name="test" onChange={handleChange} disabled />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('does not call onChange when readOnly', () => {
    const handleChange = jest.fn();
    render(<Textarea id="test" name="test" onChange={handleChange} readOnly />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Focus and blur tests
  test('applies focused class when focused', () => {
    const { container } = render(<Textarea id="test" name="test" />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    
    expect(container.firstChild).toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.FOCUSED}`);
    
    fireEvent.blur(textarea);
    
    expect(container.firstChild).not.toHaveClass(`${TEXTAREA_CLASS}-${TEXTAREA_MODIFIERS.FOCUSED}`);
  });

  // Error handling tests
  test('handles invalid variant gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textarea id="test" name="test" variant="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid variant'));
    consoleSpy.mockRestore();
  });

  test('handles invalid size gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textarea id="test" name="test" size="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid size'));
    consoleSpy.mockRestore();
  });

  test('handles invalid state gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textarea id="test" name="test" state="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid state'));
    consoleSpy.mockRestore();
  });

  test('handles onChange errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleChange = () => {
      throw new Error('Test error');
    };
    
    render(<Textarea id="test" name="test" onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    
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
    
    render(<Textarea id="test" name="test" extensions={['test']} />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error applying extensions'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Responsive props tests
  test('handles responsive props correctly', () => {
    const { container } = render(
      <Textarea 
        id="test" 
        name="test" 
        size={{ 
          base: TEXTAREA_SIZES.SMALL, 
          md: TEXTAREA_SIZES.MEDIUM, 
          lg: TEXTAREA_SIZES.LARGE 
        }}
      />
    );
    
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Textarea id="test" name="test" as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('renders as a div element by default', () => {
    const { container } = render(<Textarea id="test" name="test" />);
    expect(container.firstChild.tagName).toBe('DIV');
  });

  test('passes additional props to the rendered element', () => {
    const { container } = render(
      <Textarea id="test" name="test" as="section" data-testid="test-textarea" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-textarea');
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Textarea id="test" name="test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(TEXTAREA_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Textarea id="test" name="test" style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Accessibility tests
  test('sets aria-invalid when in error state', () => {
    render(<Textarea id="test" name="test" state={TEXTAREA_STATES.ERROR} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('sets aria-describedby when helper text is provided', () => {
    render(<Textarea id="test" name="test" helperText="Helper Text" />);
    const textarea = screen.getByRole('textbox');
    const helperTextId = textarea.getAttribute('aria-describedby');
    expect(helperTextId).toBeTruthy();
    expect(screen.getByText('Helper Text').id).toBe(helperTextId);
  });

  // Auto-resize tests
  test('calls autoResizeTextarea when autoResize is true and value changes', () => {
    // Mock the autoResizeTextarea function
    const autoResizeSpy = jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 100);
    const styleSpy = jest.spyOn(HTMLElement.prototype.style, 'height', 'set');
    
    const { rerender } = render(<Textarea id="test" name="test" autoResize value="Initial" />);
    
    // Re-render with a different value to trigger the useEffect
    rerender(<Textarea id="test" name="test" autoResize value="New value that is longer" />);
    
    expect(styleSpy).toHaveBeenCalled();
    
    autoResizeSpy.mockRestore();
    styleSpy.mockRestore();
  });
});
