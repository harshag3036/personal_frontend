/**
 * Divider Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Divider, { 
  DIVIDER_CLASS, 
  DIVIDER_ORIENTATIONS, 
  DIVIDER_MODIFIERS,
  DIVIDER_BREAKPOINTS
} from './index';

describe('Divider Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass(DIVIDER_CLASS);
  });

  // Orientation tests
  test('applies the correct orientation class for horizontal', () => {
    const { container } = render(<Divider orientation="horizontal" />);
    expect(container.firstChild).toHaveClass(`${DIVIDER_CLASS}--${DIVIDER_ORIENTATIONS.HORIZONTAL}`);
  });

  test('applies the correct orientation class for vertical', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild).toHaveClass(`${DIVIDER_CLASS}--${DIVIDER_ORIENTATIONS.VERTICAL}`);
  });

  test('applies the default orientation class when no orientation is provided', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass(`${DIVIDER_CLASS}--${DIVIDER_ORIENTATIONS.HORIZONTAL}`);
  });

  // Color tests
  test('applies the correct color style', () => {
    const { container } = render(<Divider color="primary" />);
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--color-primary)' });
  });

  test('applies the default color style when no color is provided', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--color-border-medium)' });
  });

  // Thickness tests
  test('applies the correct thickness style for horizontal orientation', () => {
    const { container } = render(<Divider orientation="horizontal" thickness="2px" />);
    expect(container.firstChild).toHaveStyle({ height: '2px' });
  });

  test('applies the correct thickness style for vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" thickness="2px" />);
    expect(container.firstChild).toHaveStyle({ width: '2px' });
  });

  // Margin tests
  test('applies the correct margin style for horizontal orientation', () => {
    const { container } = render(<Divider orientation="horizontal" margin="lg" />);
    expect(container.firstChild).toHaveStyle({ 
      marginTop: 'var(--spacing-lg)',
      marginBottom: 'var(--spacing-lg)'
    });
  });

  test('applies the correct margin style for vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" margin="lg" />);
    expect(container.firstChild).toHaveStyle({ 
      marginLeft: 'var(--spacing-lg)',
      marginRight: 'var(--spacing-lg)'
    });
  });

  // Width and height tests
  test('applies the correct width style for horizontal orientation', () => {
    const { container } = render(<Divider orientation="horizontal" width="50%" />);
    expect(container.firstChild).toHaveStyle({ width: '50%' });
  });

  test('applies the correct height style for vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" height="50px" />);
    expect(container.firstChild).toHaveStyle({ height: '50px' });
  });

  // With text tests
  test('applies the with-text class when withText is true', () => {
    const { container } = render(<Divider withText>Text</Divider>);
    expect(container.firstChild).toHaveClass(`${DIVIDER_CLASS}--with-text`);
  });

  test('renders text content when withText is true', () => {
    render(<Divider withText>Section Title</Divider>);
    expect(screen.getByText('Section Title')).toBeInTheDocument();
  });

  test('renders as div when withText is true', () => {
    const { container } = render(<Divider withText>Text</Divider>);
    expect(container.firstChild.tagName).toBe('DIV');
  });

  // Polymorphic rendering tests
  test('renders as hr by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild.tagName).toBe('HR');
  });

  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Divider as="span" />);
    expect(container.firstChild.tagName).toBe('SPAN');
  });

  // Responsive props tests
  test('handles responsive orientation prop correctly', () => {
    const { container } = render(
      <Divider 
        orientation={{ 
          base: 'horizontal', 
          md: 'vertical', 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive color prop correctly', () => {
    const { container } = render(
      <Divider 
        color={{ 
          base: 'border-medium', 
          md: 'primary', 
          lg: 'secondary' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive thickness prop correctly', () => {
    const { container } = render(
      <Divider 
        thickness={{ 
          base: '1px', 
          md: '2px', 
          lg: '3px' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive margin prop correctly', () => {
    const { container } = render(
      <Divider 
        margin={{ 
          base: 'sm', 
          md: 'md', 
          lg: 'lg' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive width prop correctly', () => {
    const { container } = render(
      <Divider 
        width={{ 
          base: '100%', 
          md: '75%', 
          lg: '50%' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive height prop correctly', () => {
    const { container } = render(
      <Divider 
        orientation="vertical"
        height={{ 
          base: '100px', 
          md: '200px', 
          lg: '300px' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive withText prop correctly', () => {
    const { container } = render(
      <Divider 
        withText={{ 
          base: true, 
          md: false, 
          lg: true 
        }}
      >
        Text
      </Divider>
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(DIVIDER_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Divider style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Accessibility tests
  test('has the correct role attribute', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveAttribute('role', 'separator');
  });

  test('has the correct aria-orientation attribute', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(DIVIDER_ORIENTATIONS)).toContain('horizontal');
    expect(Object.values(DIVIDER_ORIENTATIONS)).toContain('vertical');
    expect(Object.keys(DIVIDER_MODIFIERS).length).toBeGreaterThan(0);
    expect(DIVIDER_BREAKPOINTS).toBeDefined();
  });
});
