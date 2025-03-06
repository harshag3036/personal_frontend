/**
 * Stack Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Stack, { 
  STACK_CLASS, 
  STACK_DIRECTIONS, 
  STACK_MODIFIERS,
  STACK_BREAKPOINTS
} from './index';

describe('Stack Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).toHaveClass(STACK_CLASS);
  });

  // Direction tests
  test('applies the correct direction class for vertical', () => {
    const { container } = render(<Stack direction="vertical" />);
    expect(container.firstChild).toHaveClass(`${STACK_CLASS}--${STACK_DIRECTIONS.VERTICAL}`);
  });

  test('applies the correct direction class for horizontal', () => {
    const { container } = render(<Stack direction="horizontal" />);
    expect(container.firstChild).toHaveClass(`${STACK_CLASS}--${STACK_DIRECTIONS.HORIZONTAL}`);
  });

  test('applies the default direction class when no direction is provided', () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).toHaveClass(`${STACK_CLASS}--${STACK_DIRECTIONS.VERTICAL}`);
  });

  // Dividers test
  test('applies the dividers class when dividers is true', () => {
    const { container } = render(<Stack dividers />);
    expect(container.firstChild).toHaveClass(`${STACK_CLASS}--dividers`);
  });

  // Spacing test
  test('passes spacing to Flex as gap', () => {
    const { container } = render(<Stack spacing="lg" />);
    // Since Stack uses Flex internally, we need to check if the gap style is applied
    expect(container.firstChild).toHaveStyle({ gap: 'var(--spacing-lg)' });
  });

  // Alignment tests
  test('passes align to Flex', () => {
    const { container } = render(<Stack align="center" />);
    expect(container.firstChild).toHaveStyle({ alignItems: 'center' });
  });

  test('maps align "start" to "flex-start"', () => {
    const { container } = render(<Stack align="start" />);
    expect(container.firstChild).toHaveStyle({ alignItems: 'flex-start' });
  });

  test('maps align "end" to "flex-end"', () => {
    const { container } = render(<Stack align="end" />);
    expect(container.firstChild).toHaveStyle({ alignItems: 'flex-end' });
  });

  // Justification tests
  test('passes justify to Flex', () => {
    const { container } = render(<Stack justify="center" />);
    expect(container.firstChild).toHaveStyle({ justifyContent: 'center' });
  });

  test('maps justify "start" to "flex-start"', () => {
    const { container } = render(<Stack justify="start" />);
    expect(container.firstChild).toHaveStyle({ justifyContent: 'flex-start' });
  });

  test('maps justify "end" to "flex-end"', () => {
    const { container } = render(<Stack justify="end" />);
    expect(container.firstChild).toHaveStyle({ justifyContent: 'flex-end' });
  });

  // Polymorphic rendering tests
  test('passes as prop to Flex', () => {
    const { container } = render(<Stack as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  // Responsive props tests
  test('handles responsive direction prop correctly', () => {
    const { container } = render(
      <Stack 
        direction={{ 
          base: 'vertical', 
          md: 'horizontal', 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive spacing prop correctly', () => {
    const { container } = render(
      <Stack 
        spacing={{ 
          base: 'sm', 
          md: 'md', 
          lg: 'lg' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive align prop correctly', () => {
    const { container } = render(
      <Stack 
        align={{ 
          base: 'stretch', 
          md: 'center', 
          lg: 'end' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive justify prop correctly', () => {
    const { container } = render(
      <Stack 
        justify={{ 
          base: 'flex-start', 
          md: 'center', 
          lg: 'flex-end' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive dividers prop correctly', () => {
    const { container } = render(
      <Stack 
        dividers={{ 
          base: true, 
          md: false, 
          lg: true 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Stack className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(STACK_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Stack style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(STACK_DIRECTIONS)).toContain('vertical');
    expect(Object.values(STACK_DIRECTIONS)).toContain('horizontal');
    expect(Object.keys(STACK_MODIFIERS).length).toBeGreaterThan(0);
    expect(STACK_BREAKPOINTS).toBeDefined();
  });

  // Passing props to Flex test
  test('passes additional props to Flex', () => {
    const { container } = render(<Stack data-testid="stack-test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'stack-test');
  });
});
