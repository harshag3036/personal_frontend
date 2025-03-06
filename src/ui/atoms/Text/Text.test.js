/**
 * Text Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Text, { 
  TEXT_CLASS, 
  TEXT_VARIANTS, 
  TEXT_WEIGHTS, 
  TEXT_TRANSFORMS, 
  TEXT_ALIGNS,
  TEXT_MODIFIERS,
  TEXT_BREAKPOINTS
} from './index';

describe('Text Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Text>Test Content</Text>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Text>Test Content</Text>);
    expect(container.firstChild).toHaveClass(TEXT_CLASS);
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Text as="span">Test Content</Text>);
    expect(container.firstChild.tagName).toBe('SPAN');
  });

  test('renders as the correct HTML element based on variant', () => {
    const { container } = render(<Text variant="h1">Test Content</Text>);
    expect(container.firstChild.tagName).toBe('H1');
  });

  test('passes additional props to the rendered element', () => {
    const testId = 'test-text';
    render(<Text data-testid={testId}>Test Content</Text>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(<Text variant="h1">Test Content</Text>);
    expect(container.firstChild).toHaveClass(`${TEXT_CLASS}-${TEXT_VARIANTS.H1}`);
  });

  test('applies the default variant class when no variant is provided', () => {
    const { container } = render(<Text>Test Content</Text>);
    expect(container.firstChild).toHaveClass(`${TEXT_CLASS}-${TEXT_VARIANTS.BODY1}`);
  });

  // Style props tests
  test('applies color style when color prop is provided', () => {
    const { container } = render(<Text color="primary">Test Content</Text>);
    expect(container.firstChild).toHaveStyle({ color: 'var(--color-primary)' });
  });

  test('applies text alignment style when align prop is provided', () => {
    const { container } = render(<Text align="center">Test Content</Text>);
    expect(container.firstChild).toHaveStyle({ textAlign: 'center' });
  });

  test('applies font weight style when weight prop is provided', () => {
    const { container } = render(<Text weight="bold">Test Content</Text>);
    expect(container.firstChild).toHaveStyle({ fontWeight: 'bold' });
  });

  test('applies text transform style when transform prop is provided', () => {
    const { container } = render(<Text transform="uppercase">Test Content</Text>);
    expect(container.firstChild).toHaveStyle({ textTransform: 'uppercase' });
  });

  test('applies italic style when italic prop is true', () => {
    const { container } = render(<Text italic>Test Content</Text>);
    expect(container.firstChild).toHaveClass(`${TEXT_CLASS}--italic`);
    expect(container.firstChild).toHaveStyle({ fontStyle: 'italic' });
  });

  test('applies truncate style when truncate prop is true', () => {
    const { container } = render(<Text truncate>Test Content</Text>);
    expect(container.firstChild).toHaveClass(`${TEXT_CLASS}--truncate`);
    expect(container.firstChild).toHaveStyle({ 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    });
  });

  // Responsive props tests
  test('handles responsive variant prop correctly', () => {
    const { container } = render(
      <Text 
        variant={{ 
          base: 'body1', 
          md: 'h3', 
          lg: 'h1' 
        }}
      >
        Test Content
      </Text>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive align prop correctly', () => {
    const { container } = render(
      <Text 
        align={{ 
          base: 'left', 
          md: 'center', 
          lg: 'right' 
        }}
      >
        Test Content
      </Text>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Text className="custom-class">Test Content</Text>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(TEXT_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Text style={{ marginTop: '10px' }}>Test Content</Text>);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Box props pass-through tests
  test('passes Box props through to the Box component', () => {
    const { container } = render(
      <Text 
        padding="md" 
        margin="lg" 
        background="background-primary"
        border="primary"
        borderRadius="md"
        shadow="md"
        width="200px"
        height="100px"
      >
        Test Content
      </Text>
    );
    
    expect(container.firstChild).toHaveStyle({ 
      padding: 'var(--spacing-md)',
      margin: 'var(--spacing-lg)',
      backgroundColor: 'var(--color-background-primary)',
      border: '1px solid var(--color-border-primary)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-md)',
      width: '200px',
      height: '100px',
    });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(TEXT_VARIANTS)).toContain('h1');
    expect(Object.values(TEXT_VARIANTS)).toContain('body1');
    expect(Object.values(TEXT_WEIGHTS)).toContain('bold');
    expect(Object.values(TEXT_TRANSFORMS)).toContain('uppercase');
    expect(Object.values(TEXT_ALIGNS)).toContain('center');
    expect(Object.keys(TEXT_MODIFIERS).length).toBeGreaterThan(0);
    expect(TEXT_BREAKPOINTS).toBeDefined();
  });
});
