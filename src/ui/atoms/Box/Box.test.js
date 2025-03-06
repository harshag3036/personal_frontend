/**
 * Box Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Box, { BOX_MODIFIERS, BOX_CLASS } from './index';

describe('Box Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Box>Test Content</Box>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Box>Test Content</Box>);
    expect(container.firstChild).toHaveClass(BOX_CLASS);
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Box as="section">Test Content</Box>);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('passes additional props to the rendered element', () => {
    const testId = 'test-box';
    render(<Box data-testid={testId}>Test Content</Box>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Style props tests
  test('applies padding style when padding prop is provided', () => {
    const { container } = render(<Box padding="md">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ padding: 'var(--spacing-md)' });
  });

  test('applies margin style when margin prop is provided', () => {
    const { container } = render(<Box margin="lg">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ margin: 'var(--spacing-lg)' });
  });

  test('applies background color style when background prop is provided', () => {
    const { container } = render(<Box background="background-primary">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--color-background-primary)' });
  });

  test('applies border style when border prop is provided', () => {
    const { container } = render(<Box border="primary">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ border: '1px solid var(--color-border-primary)' });
  });

  test('applies border radius style when borderRadius prop is provided', () => {
    const { container } = render(<Box borderRadius="md">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ borderRadius: 'var(--border-radius-md)' });
  });

  test('applies box shadow style when shadow prop is provided', () => {
    const { container } = render(<Box shadow="md">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ boxShadow: 'var(--shadow-md)' });
  });

  test('applies width style when width prop is provided', () => {
    const { container } = render(<Box width="200px">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  test('applies height style when height prop is provided', () => {
    const { container } = render(<Box height="100px">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ height: '100px' });
  });

  test('applies display style when display prop is provided', () => {
    const { container } = render(<Box display="flex">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ display: 'flex' });
  });

  test('applies position style when position prop is provided', () => {
    const { container } = render(<Box position="relative">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ position: 'relative' });
  });

  test('applies overflow style when overflow prop is provided', () => {
    const { container } = render(<Box overflow="hidden">Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ overflow: 'hidden' });
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Box className="custom-class">Test Content</Box>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(BOX_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Box style={{ color: 'red' }}>Test Content</Box>);
    expect(container.firstChild).toHaveStyle({ color: 'red' });
  });

  // Responsive props tests
  test('handles responsive props correctly', () => {
    const { container } = render(
      <Box 
        display={{ base: 'block', md: 'flex' }}
        padding={{ base: 'sm', lg: 'lg' }}
      >
        Test Content
      </Box>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });
});
