/**
 * Flex Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Flex, { 
  FLEX_CLASS, 
  FLEX_MODIFIERS, 
  FLEX_DIRECTIONS, 
  FLEX_ALIGNMENTS, 
  FLEX_JUSTIFICATIONS, 
  FLEX_WRAPS,
  FLEX_GAP_SIZES,
  FLEX_BREAKPOINTS
} from './index';

describe('Flex Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Flex>Test Content</Flex>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Flex>Test Content</Flex>);
    expect(container.firstChild).toHaveClass(FLEX_CLASS);
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Flex as="section">Test Content</Flex>);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('passes additional props to the rendered element', () => {
    const testId = 'test-flex';
    render(<Flex data-testid={testId}>Test Content</Flex>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Flex-specific props tests
  test('applies flex direction style when direction prop is provided', () => {
    const { container } = render(<Flex direction="column">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ flexDirection: 'column' });
  });

  test('applies align items style when align prop is provided', () => {
    const { container } = render(<Flex align="center">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ alignItems: 'center' });
  });

  test('applies justify content style when justify prop is provided', () => {
    const { container } = render(<Flex justify="space-between">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ justifyContent: 'space-between' });
  });

  test('applies flex wrap style when wrap prop is provided', () => {
    const { container } = render(<Flex wrap="wrap">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ flexWrap: 'wrap' });
  });

  test('applies gap style when gap prop is provided', () => {
    const { container } = render(<Flex gap="md">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ gap: 'var(--spacing-md)' });
  });

  // Flex item props tests
  test('applies flex grow style when flexGrow prop is provided', () => {
    const { container } = render(<Flex flexGrow={1}>Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ flexGrow: 1 });
  });

  test('applies flex shrink style when flexShrink prop is provided', () => {
    const { container } = render(<Flex flexShrink={0}>Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ flexShrink: 0 });
  });

  test('applies flex basis style when flexBasis prop is provided', () => {
    const { container } = render(<Flex flexBasis="200px">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ flexBasis: '200px' });
  });

  test('applies flex shorthand style when flex prop is provided', () => {
    const { container } = render(<Flex flex="1 0 auto">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ flex: '1 0 auto' });
  });

  test('applies order style when order prop is provided', () => {
    const { container } = render(<Flex order={2}>Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ order: 2 });
  });

  test('applies align self style when alignSelf prop is provided', () => {
    const { container } = render(<Flex alignSelf="flex-end">Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ alignSelf: 'flex-end' });
  });

  // Box props pass-through tests
  test('passes Box props through to the Box component', () => {
    const { container } = render(
      <Flex 
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
      </Flex>
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

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Flex className="custom-class">Test Content</Flex>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(FLEX_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Flex style={{ color: 'red' }}>Test Content</Flex>);
    expect(container.firstChild).toHaveStyle({ color: 'red' });
  });

  // Responsive props tests
  test('handles responsive props correctly', () => {
    const { container } = render(
      <Flex 
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify={{ base: 'flex-start', md: 'space-between' }}
        flexGrow={{ base: 0, md: 1 }}
        gap={{ base: 'sm', md: 'lg' }}
      >
        Test Content
      </Flex>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // BEM modifier tests
  test('applies BEM modifiers correctly', () => {
    const { container } = render(
      <Flex className={`ui-flex--${FLEX_MODIFIERS.CENTER_ALL}`}>
        Test Content
      </Flex>
    );
    
    expect(container.firstChild).toHaveClass(`ui-flex--${FLEX_MODIFIERS.CENTER_ALL}`);
  });

  test('applies multiple BEM modifiers correctly', () => {
    const { container } = render(
      <Flex className={`ui-flex--${FLEX_MODIFIERS.CENTER_ALL} ui-flex--${FLEX_MODIFIERS.GAP_MD}`}>
        Test Content
      </Flex>
    );
    
    expect(container.firstChild).toHaveClass(`ui-flex--${FLEX_MODIFIERS.CENTER_ALL}`);
    expect(container.firstChild).toHaveClass(`ui-flex--${FLEX_MODIFIERS.GAP_MD}`);
  });

  // Default props tests
  test('applies default props correctly', () => {
    const { container } = render(<Flex>Test Content</Flex>);
    
    expect(container.firstChild).toHaveStyle({ 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
    });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(FLEX_DIRECTIONS).toContain('row');
    expect(FLEX_DIRECTIONS).toContain('column');
    expect(FLEX_ALIGNMENTS).toContain('center');
    expect(FLEX_JUSTIFICATIONS).toContain('space-between');
    expect(FLEX_WRAPS).toContain('wrap');
    expect(FLEX_GAP_SIZES).toContain('md');
    expect(FLEX_BREAKPOINTS).toBeDefined();
  });
});
