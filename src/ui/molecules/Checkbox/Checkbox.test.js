/**
 * Checkbox Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox, { 
  CHECKBOX_CLASS, 
  CHECKBOX_SIZES, 
  CHECKBOX_MODIFIERS,
  CHECKBOX_BREAKPOINTS
} from './index';

describe('Checkbox Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Checkbox label="Test Checkbox" />);
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toHaveClass(CHECKBOX_CLASS);
  });

  // Size tests
  test('applies the correct size class for small', () => {
    const { container } = render(<Checkbox size={CHECKBOX_SIZES.SM} />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_SIZES.SM}`);
  });

  test('applies the correct size class for medium', () => {
    const { container } = render(<Checkbox size={CHECKBOX_SIZES.MD} />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_SIZES.MD}`);
  });

  test('applies the correct size class for large', () => {
    const { container } = render(<Checkbox size={CHECKBOX_SIZES.LG} />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_SIZES.LG}`);
  });

  test('applies the medium size class when no size is provided', () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_SIZES.MD}`);
  });

  // State tests
  test('applies the checked class when checked', () => {
    const { container } = render(<Checkbox checked />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.CHECKED}`);
  });

  test('applies the unchecked class when not checked', () => {
    const { container } = render(<Checkbox checked={false} />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.UNCHECKED}`);
  });

  test('applies the disabled class when disabled', () => {
    const { container } = render(<Checkbox disabled />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.DISABLED}`);
  });

  test('applies the invalid class when invalid', () => {
    const { container } = render(<Checkbox invalid />);
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_MODIFIERS.INVALID}`);
  });

  // Label and description tests
  test('renders label when provided', () => {
    render(<Checkbox label="Checkbox Label" />);
    expect(screen.getByText('Checkbox Label')).toBeInTheDocument();
    expect(screen.getByText('Checkbox Label').className).toContain(`${CHECKBOX_CLASS}__label`);
  });

  test('renders description when provided', () => {
    render(<Checkbox label="Checkbox Label" description="Checkbox Description" />);
    expect(screen.getByText('Checkbox Description')).toBeInTheDocument();
    expect(screen.getByText('Checkbox Description').className).toContain(`${CHECKBOX_CLASS}__description`);
  });

  test('renders error message when invalid and errorMessage is provided', () => {
    render(<Checkbox label="Checkbox Label" invalid errorMessage="Error Message" />);
    expect(screen.getByText('Error Message')).toBeInTheDocument();
    expect(screen.getByText('Error Message').className).toContain(`${CHECKBOX_CLASS}__error`);
  });

  // Controlled vs uncontrolled tests
  test('works as a controlled component', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox label="Controlled Checkbox" checked={false} onChange={handleChange} />
    );
    
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBe(false); // Still false because it's controlled
  });

  test('works as an uncontrolled component', () => {
    const { getByRole } = render(
      <Checkbox label="Uncontrolled Checkbox" defaultChecked={false} />
    );
    
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
    
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true); // Changes because it's uncontrolled
  });

  // Indeterminate state test
  test('sets indeterminate property on input element', () => {
    const { getByRole } = render(<Checkbox indeterminate />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.indeterminate).toBe(true);
  });

  // Event handler tests
  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox onChange={handleChange} />);
    
    fireEvent.click(getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('calls onFocus when focused', () => {
    const handleFocus = jest.fn();
    const { getByRole } = render(<Checkbox onFocus={handleFocus} />);
    
    fireEvent.focus(getByRole('checkbox'));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  test('calls onBlur when blurred', () => {
    const handleBlur = jest.fn();
    const { getByRole } = render(<Checkbox onBlur={handleBlur} />);
    
    fireEvent.focus(getByRole('checkbox'));
    fireEvent.blur(getByRole('checkbox'));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Accessibility tests
  test('sets aria-invalid when invalid', () => {
    const { getByRole } = render(<Checkbox invalid />);
    expect(getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('sets aria-describedby when description is provided', () => {
    const { getByRole } = render(<Checkbox label="Label" description="Description" />);
    const checkbox = getByRole('checkbox');
    const descriptionId = checkbox.getAttribute('aria-describedby');
    
    expect(descriptionId).toBeTruthy();
    expect(screen.getByText('Description').id).toBe(descriptionId);
  });

  test('sets aria-describedby when error message is provided', () => {
    const { getByRole } = render(<Checkbox label="Label" invalid errorMessage="Error" />);
    const checkbox = getByRole('checkbox');
    const errorId = checkbox.getAttribute('aria-describedby');
    
    expect(errorId).toBeTruthy();
    expect(screen.getByText('Error').id).toBe(errorId);
  });

  // Responsive props tests
  test('handles responsive size prop correctly', () => {
    const { container } = render(
      <Checkbox 
        size={{ 
          base: CHECKBOX_SIZES.SM, 
          md: CHECKBOX_SIZES.MD, 
          lg: CHECKBOX_SIZES.LG 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Checkbox className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(CHECKBOX_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Checkbox style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Checkbox as="div" />);
    expect(container.firstChild.tagName).toBe('DIV');
  });

  test('renders as a label element by default', () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild.tagName).toBe('LABEL');
  });

  test('passes additional props to the rendered element', () => {
    const { container } = render(
      <Checkbox as="div" data-testid="test-checkbox" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-checkbox');
  });

  // Input props test
  test('passes additional props to input element', () => {
    const { getByRole } = render(<Checkbox inputProps={{ 'data-testid': 'test-input' }} />);
    expect(getByRole('checkbox')).toHaveAttribute('data-testid', 'test-input');
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(CHECKBOX_SIZES)).toContain('sm');
    expect(Object.values(CHECKBOX_SIZES)).toContain('md');
    expect(Object.values(CHECKBOX_SIZES)).toContain('lg');
    expect(Object.values(CHECKBOX_MODIFIERS)).toContain('checked');
    expect(Object.values(CHECKBOX_MODIFIERS)).toContain('unchecked');
    expect(Object.values(CHECKBOX_MODIFIERS)).toContain('indeterminate');
    expect(Object.values(CHECKBOX_MODIFIERS)).toContain('disabled');
    expect(Object.values(CHECKBOX_MODIFIERS)).toContain('focused');
    expect(Object.values(CHECKBOX_MODIFIERS)).toContain('invalid');
    expect(CHECKBOX_BREAKPOINTS).toBeDefined();
  });

  // Error handling tests
  test('logs a warning and falls back to default size when an invalid size is provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Checkbox size="invalid" />);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid size'));
    expect(container.firstChild).toHaveClass(`${CHECKBOX_CLASS}--${CHECKBOX_SIZES.MD}`);
    consoleSpy.mockRestore();
  });

  test('handles onChange errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleChange = () => {
      throw new Error('Test error');
    };
    const { getByRole } = render(<Checkbox onChange={handleChange} />);
    
    fireEvent.click(getByRole('checkbox'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onChange handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  test('handles onFocus errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleFocus = () => {
      throw new Error('Test error');
    };
    const { getByRole } = render(<Checkbox onFocus={handleFocus} />);
    
    fireEvent.focus(getByRole('checkbox'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onFocus handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  test('handles onBlur errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleBlur = () => {
      throw new Error('Test error');
    };
    const { getByRole } = render(<Checkbox onBlur={handleBlur} />);
    
    fireEvent.focus(getByRole('checkbox'));
    fireEvent.blur(getByRole('checkbox'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onBlur handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  test('handles extension errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock componentExtension to throw an error
    jest.spyOn(require('../../utilities').componentExtension, 'applyComponentExtensions').mockImplementation(() => {
      throw new Error('Test error');
    });
    render(<Checkbox extensions={['test']} />);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error applying extensions'), expect.any(Error));
    consoleSpy.mockRestore();
  });
});
