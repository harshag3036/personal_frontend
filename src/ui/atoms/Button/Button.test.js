/**
 * Button Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { 
  BUTTON_CLASS, 
  BUTTON_VARIANTS, 
  BUTTON_SIZES, 
  BUTTON_STATES,
  BUTTON_MODIFIERS,
  BUTTON_BREAKPOINTS
} from './index';

describe('Button Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toHaveClass(BUTTON_CLASS);
  });

  // Polymorphic rendering tests
  test('renders as a button element by default', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild.tagName).toBe('BUTTON');
  });

  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Button as="a" href="#">Test Button</Button>);
    expect(container.firstChild.tagName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#');
    expect(container.firstChild).toHaveAttribute('role', 'button');
  });

  test('passes additional props to the rendered element', () => {
    const testId = 'test-button';
    render(<Button data-testid={testId}>Test Button</Button>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(<Button variant="primary">Test Button</Button>);
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--${BUTTON_VARIANTS.PRIMARY}`);
  });

  test('applies the default variant class when no variant is provided', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--${BUTTON_VARIANTS.PRIMARY}`);
  });

  // Size tests
  test('applies the correct size class', () => {
    const { container } = render(<Button size="large">Test Button</Button>);
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--${BUTTON_SIZES.LARGE}`);
  });

  test('applies the default size class when no size is provided', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--${BUTTON_SIZES.MEDIUM}`);
  });

  // Full width test
  test('applies the full width class when fullWidth is true', () => {
    const { container } = render(<Button fullWidth>Test Button</Button>);
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--full-width`);
  });

  // Disabled state test
  test('applies the disabled attribute when disabled is true', () => {
    const { container } = render(<Button disabled>Test Button</Button>);
    expect(container.firstChild).toHaveAttribute('disabled');
  });

  // Loading state test
  test('applies the loading class when loading is true', () => {
    const { container } = render(<Button loading>Test Button</Button>);
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--loading`);
  });

  // Icon tests
  test('renders left icon when leftIcon prop is provided', () => {
    const { container } = render(
      <Button leftIcon={<span data-testid="left-icon">🔍</span>}>
        Test Button
      </Button>
    );
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--with-left-icon`);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(container.querySelector(`.${BUTTON_CLASS}__icon--left`)).toBeInTheDocument();
  });

  test('renders right icon when rightIcon prop is provided', () => {
    const { container } = render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        Test Button
      </Button>
    );
    expect(container.firstChild).toHaveClass(`${BUTTON_CLASS}--with-right-icon`);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(container.querySelector(`.${BUTTON_CLASS}__icon--right`)).toBeInTheDocument();
  });

  // Click handler tests
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not call onClick handler when loading', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} loading>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Type attribute tests
  test('applies the default type attribute of "button"', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toHaveAttribute('type', 'button');
  });

  test('applies the specified type attribute', () => {
    const { container } = render(<Button type="submit">Test Button</Button>);
    expect(container.firstChild).toHaveAttribute('type', 'submit');
  });

  // Responsive props tests
  test('handles responsive variant prop correctly', () => {
    const { container } = render(
      <Button 
        variant={{ 
          base: 'primary', 
          md: 'secondary', 
          lg: 'accent' 
        }}
      >
        Test Button
      </Button>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive size prop correctly', () => {
    const { container } = render(
      <Button 
        size={{ 
          base: 'small', 
          md: 'medium', 
          lg: 'large' 
        }}
      >
        Test Button
      </Button>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive fullWidth prop correctly', () => {
    const { container } = render(
      <Button 
        fullWidth={{ 
          base: true, 
          md: false, 
          lg: true 
        }}
      >
        Test Button
      </Button>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Button className="custom-class">Test Button</Button>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(BUTTON_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Button style={{ marginTop: '10px' }}>Test Button</Button>);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(BUTTON_VARIANTS)).toContain('primary');
    expect(Object.values(BUTTON_SIZES)).toContain('medium');
    expect(Object.values(BUTTON_STATES)).toContain('loading');
    expect(Object.keys(BUTTON_MODIFIERS).length).toBeGreaterThan(0);
    expect(BUTTON_BREAKPOINTS).toBeDefined();
  });
});
