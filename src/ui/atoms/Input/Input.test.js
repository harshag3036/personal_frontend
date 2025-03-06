/**
 * Input Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input, { 
  INPUT_CLASS, 
  INPUT_VARIANTS, 
  INPUT_SIZES, 
  INPUT_STATES,
  INPUT_MODIFIERS,
  INPUT_BREAKPOINTS
} from './index';

describe('Input Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Input placeholder="Test Input" />);
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}-wrapper`);
    expect(container.querySelector(`.${INPUT_CLASS}__field`)).toBeInTheDocument();
  });

  // Label tests
  test('renders label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  test('renders required indicator when required is true', () => {
    const { container } = render(<Input label="Username" required />);
    expect(container.querySelector(`.${INPUT_CLASS}__required`)).toBeInTheDocument();
  });

  // Helper text tests
  test('renders helper text when provided', () => {
    render(<Input helperText="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  test('renders error text when state is error and errorText is provided', () => {
    render(<Input state="error" errorText="Username is required" />);
    const helperText = screen.getByText('Username is required');
    expect(helperText).toBeInTheDocument();
    expect(helperText.className).toContain(`${INPUT_CLASS}__helper-text--error`);
  });

  // Icon tests
  test('renders start icon when provided', () => {
    const { container } = render(<Input startIcon={<span data-testid="start-icon">🔍</span>} />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(container.querySelector(`.${INPUT_CLASS}__icon--start`)).toBeInTheDocument();
  });

  test('renders end icon when provided', () => {
    const { container } = render(<Input endIcon={<span data-testid="end-icon">✖</span>} />);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(container.querySelector(`.${INPUT_CLASS}__icon--end`)).toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(<Input variant="filled" />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--${INPUT_VARIANTS.FILLED}`);
  });

  test('applies the default variant class when no variant is provided', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--${INPUT_VARIANTS.DEFAULT}`);
  });

  // Size tests
  test('applies the correct size class', () => {
    const { container } = render(<Input size="large" />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--${INPUT_SIZES.LARGE}`);
  });

  test('applies the default size class when no size is provided', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--${INPUT_SIZES.MEDIUM}`);
  });

  // State tests
  test('applies the correct state class', () => {
    const { container } = render(<Input state="success" />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--${INPUT_STATES.SUCCESS}`);
  });

  test('applies the default state class when no state is provided', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--${INPUT_STATES.DEFAULT}`);
  });

  // Disabled state test
  test('applies the disabled class and attribute when disabled is true', () => {
    const { container } = render(<Input disabled />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--disabled`);
    expect(container.querySelector(`.${INPUT_CLASS}__field`)).toBeDisabled();
  });

  // Full width test
  test('applies the full width class when fullWidth is true', () => {
    const { container } = render(<Input fullWidth />);
    expect(container.firstChild).toHaveClass(`${INPUT_CLASS}--full-width`);
  });

  // Input type test
  test('applies the correct type attribute', () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector(`.${INPUT_CLASS}__field`)).toHaveAttribute('type', 'password');
  });

  // Responsive props tests
  test('handles responsive variant prop correctly', () => {
    const { container } = render(
      <Input 
        variant={{ 
          base: 'default', 
          md: 'filled', 
          lg: 'outlined' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive size prop correctly', () => {
    const { container } = render(
      <Input 
        size={{ 
          base: 'small', 
          md: 'medium', 
          lg: 'large' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive state prop correctly', () => {
    const { container } = render(
      <Input 
        state={{ 
          base: 'default', 
          md: 'success', 
          lg: 'error' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive disabled prop correctly', () => {
    const { container } = render(
      <Input 
        disabled={{ 
          base: true, 
          md: false, 
          lg: true 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive fullWidth prop correctly', () => {
    const { container } = render(
      <Input 
        fullWidth={{ 
          base: true, 
          md: false, 
          lg: true 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Event handling tests
  test('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('calls onFocus handler when input is focused', () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} />);
    fireEvent.focus(screen.getByRole('textbox'));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  test('calls onBlur handler when input loses focus', () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Input className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Input style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Ref forwarding test
  test('forwards ref to the input element', () => {
    const ref = React.createRef();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(INPUT_VARIANTS)).toContain('default');
    expect(Object.values(INPUT_SIZES)).toContain('medium');
    expect(Object.values(INPUT_STATES)).toContain('error');
    expect(Object.keys(INPUT_MODIFIERS).length).toBeGreaterThan(0);
    expect(INPUT_BREAKPOINTS).toBeDefined();
  });
});
