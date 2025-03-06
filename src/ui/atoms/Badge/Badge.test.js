/**
 * Badge Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge, { 
  BADGE_CLASS, 
  BADGE_VARIANTS, 
  BADGE_SIZES, 
  BADGE_MODIFIERS,
  BADGE_BREAKPOINTS
} from './index';

describe('Badge Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Badge>New</Badge>);
    expect(container.firstChild).toHaveClass(BADGE_CLASS);
  });

  // Polymorphic rendering tests
  test('renders as a span element by default', () => {
    const { container } = render(<Badge>New</Badge>);
    expect(container.firstChild.tagName).toBe('SPAN');
  });

  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Badge as="div">New</Badge>);
    expect(container.firstChild.tagName).toBe('DIV');
  });

  test('passes additional props to the rendered element', () => {
    const testId = 'test-badge';
    render(<Badge data-testid={testId}>New</Badge>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(<Badge variant="primary">New</Badge>);
    expect(container.firstChild).toHaveClass(`${BADGE_CLASS}--${BADGE_VARIANTS.PRIMARY}`);
  });

  test('applies the default variant class when no variant is provided', () => {
    const { container } = render(<Badge>New</Badge>);
    expect(container.firstChild).toHaveClass(`${BADGE_CLASS}--${BADGE_VARIANTS.DEFAULT}`);
  });

  // Size tests
  test('applies the correct size class', () => {
    const { container } = render(<Badge size="large">New</Badge>);
    expect(container.firstChild).toHaveClass(`${BADGE_CLASS}--${BADGE_SIZES.LARGE}`);
  });

  test('applies the default size class when no size is provided', () => {
    const { container } = render(<Badge>New</Badge>);
    expect(container.firstChild).toHaveClass(`${BADGE_CLASS}--${BADGE_SIZES.MEDIUM}`);
  });

  // Pill shape test
  test('applies the pill class when pill is true', () => {
    const { container } = render(<Badge pill>New</Badge>);
    expect(container.firstChild).toHaveClass(`${BADGE_CLASS}--pill`);
  });

  // Responsive props tests
  test('handles responsive variant prop correctly', () => {
    const { container } = render(
      <Badge 
        variant={{ 
          base: 'primary', 
          md: 'secondary', 
          lg: 'success' 
        }}
      >
        New
      </Badge>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive size prop correctly', () => {
    const { container } = render(
      <Badge 
        size={{ 
          base: 'small', 
          md: 'medium', 
          lg: 'large' 
        }}
      >
        New
      </Badge>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive pill prop correctly', () => {
    const { container } = render(
      <Badge 
        pill={{ 
          base: true, 
          md: false, 
          lg: true 
        }}
      >
        New
      </Badge>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Badge className="custom-class">New</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(BADGE_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Badge style={{ marginTop: '10px' }}>New</Badge>);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Empty content test
  test('renders empty string when no children are provided', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild.textContent).toBe('');
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(BADGE_VARIANTS)).toContain('primary');
    expect(Object.values(BADGE_SIZES)).toContain('medium');
    expect(Object.keys(BADGE_MODIFIERS).length).toBeGreaterThan(0);
    expect(BADGE_BREAKPOINTS).toBeDefined();
  });
});
