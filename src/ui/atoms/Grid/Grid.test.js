/**
 * Grid Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid, { 
  GRID_CLASS, 
  GRID_MODIFIERS, 
  GRID_AUTO_FLOW, 
  GRID_GAP_SIZES,
  GRID_BREAKPOINTS
} from './index';

describe('Grid Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Grid>Test Content</Grid>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Grid>Test Content</Grid>);
    expect(container.firstChild).toHaveClass(GRID_CLASS);
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Grid as="section">Test Content</Grid>);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('passes additional props to the rendered element', () => {
    const testId = 'test-grid';
    render(<Grid data-testid={testId}>Test Content</Grid>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Grid-specific props tests
  test('applies grid template columns style when columns prop is provided', () => {
    const { container } = render(<Grid columns="1fr 2fr">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gridTemplateColumns: '1fr 2fr' });
  });

  test('applies grid template rows style when rows prop is provided', () => {
    const { container } = render(<Grid rows="auto 1fr auto">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gridTemplateRows: 'auto 1fr auto' });
  });

  test('applies gap style when gap prop is provided', () => {
    const { container } = render(<Grid gap="md">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gap: 'var(--spacing-md)' });
  });

  test('applies column gap style when columnGap prop is provided', () => {
    const { container } = render(<Grid columnGap="md">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ columnGap: 'var(--spacing-md)' });
  });

  test('applies row gap style when rowGap prop is provided', () => {
    const { container } = render(<Grid rowGap="md">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ rowGap: 'var(--spacing-md)' });
  });

  test('applies grid template areas style when areas prop is provided', () => {
    const areas = `
      "header header"
      "sidebar content"
      "footer footer"
    `;
    const { container } = render(<Grid areas={areas}>Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gridTemplateAreas: areas });
  });

  test('applies grid auto columns style when autoColumns prop is provided', () => {
    const { container } = render(<Grid autoColumns="min-content">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gridAutoColumns: 'min-content' });
  });

  test('applies grid auto rows style when autoRows prop is provided', () => {
    const { container } = render(<Grid autoRows="min-content">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gridAutoRows: 'min-content' });
  });

  test('applies grid auto flow style when autoFlow prop is provided', () => {
    const { container } = render(<Grid autoFlow="dense">Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ gridAutoFlow: 'dense' });
  });

  // Box props pass-through tests
  test('passes Box props through to the Box component', () => {
    const { container } = render(
      <Grid 
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
      </Grid>
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
    const { container } = render(<Grid className="custom-class">Test Content</Grid>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(GRID_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Grid style={{ color: 'red' }}>Test Content</Grid>);
    expect(container.firstChild).toHaveStyle({ color: 'red' });
  });

  // Responsive props tests
  test('handles responsive props correctly', () => {
    const { container } = render(
      <Grid 
        columns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 2fr 1fr' }}
        gap={{ base: 'sm', md: 'lg' }}
      >
        Test Content
      </Grid>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // BEM modifier tests
  test('applies BEM modifiers correctly', () => {
    const { container } = render(
      <Grid className={`ui-grid--${GRID_MODIFIERS.TWO_COLUMNS}`}>
        Test Content
      </Grid>
    );
    
    expect(container.firstChild).toHaveClass(`ui-grid--${GRID_MODIFIERS.TWO_COLUMNS}`);
  });

  test('applies multiple BEM modifiers correctly', () => {
    const { container } = render(
      <Grid className={`ui-grid--${GRID_MODIFIERS.TWO_COLUMNS} ui-grid--${GRID_MODIFIERS.GAP_MD}`}>
        Test Content
      </Grid>
    );
    
    expect(container.firstChild).toHaveClass(`ui-grid--${GRID_MODIFIERS.TWO_COLUMNS}`);
    expect(container.firstChild).toHaveClass(`ui-grid--${GRID_MODIFIERS.GAP_MD}`);
  });

  // Default props tests
  test('applies default props correctly', () => {
    const { container } = render(<Grid>Test Content</Grid>);
    
    expect(container.firstChild).toHaveStyle({ 
      display: 'grid',
      gridTemplateColumns: '1fr',
    });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(GRID_AUTO_FLOW).toContain('row');
    expect(GRID_AUTO_FLOW).toContain('column');
    expect(GRID_GAP_SIZES).toContain('md');
    expect(GRID_BREAKPOINTS).toBeDefined();
    expect(Object.keys(GRID_MODIFIERS).length).toBeGreaterThan(0);
  });
});
