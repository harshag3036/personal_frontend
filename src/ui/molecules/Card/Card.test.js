/**
 * Card Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card, { 
  CARD_CLASS, 
  CARD_VARIANTS, 
  CARD_MODIFIERS,
  CARD_BREAKPOINTS
} from './index';

describe('Card Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass(CARD_CLASS);
  });

  // Variant tests
  test('applies the correct variant class for default', () => {
    const { container } = render(<Card variant={CARD_VARIANTS.DEFAULT} />);
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--${CARD_VARIANTS.DEFAULT}`);
  });

  test('applies the correct variant class for elevated', () => {
    const { container } = render(<Card variant={CARD_VARIANTS.ELEVATED} />);
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--${CARD_VARIANTS.ELEVATED}`);
  });

  test('applies the correct variant class for outlined', () => {
    const { container } = render(<Card variant={CARD_VARIANTS.OUTLINED} />);
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--${CARD_VARIANTS.OUTLINED}`);
  });

  test('applies the correct variant class for interactive', () => {
    const { container } = render(<Card variant={CARD_VARIANTS.INTERACTIVE} />);
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--${CARD_VARIANTS.INTERACTIVE}`);
  });

  test('applies the default variant class when no variant is provided', () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--${CARD_VARIANTS.DEFAULT}`);
  });

  // Header and footer tests
  test('renders header when provided', () => {
    render(<Card header="Card Header">Card Content</Card>);
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Card Header').className).toContain(`${CARD_CLASS}__header`);
  });

  test('renders footer when provided', () => {
    render(<Card footer="Card Footer">Card Content</Card>);
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
    expect(screen.getByText('Card Footer').className).toContain(`${CARD_CLASS}__footer`);
  });

  test('renders both header and footer when provided', () => {
    render(
      <Card header="Card Header" footer="Card Footer">
        Card Content
      </Card>
    );
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  // Full width test
  test('applies the full-width class when fullWidth is true', () => {
    const { container } = render(<Card fullWidth />);
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--full-width`);
  });

  // Empty content test
  test('renders empty state when no children are provided', () => {
    render(<Card />);
    expect(screen.getByText('No content')).toBeInTheDocument();
    expect(screen.getByText('No content').className).toContain(`${CARD_CLASS}__empty`);
  });

  // Interactive card tests
  test('adds role="button" and tabIndex=0 for interactive cards', () => {
    const { container } = render(<Card variant={CARD_VARIANTS.INTERACTIVE} />);
    expect(container.firstChild).toHaveAttribute('role', 'button');
    expect(container.firstChild).toHaveAttribute('tabIndex', '0');
  });

  test('adds role="button" and tabIndex=0 when onClick is provided', () => {
    const handleClick = jest.fn();
    const { container } = render(<Card onClick={handleClick} />);
    expect(container.firstChild).toHaveAttribute('role', 'button');
    expect(container.firstChild).toHaveAttribute('tabIndex', '0');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    fireEvent.click(screen.getByText('Clickable Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Card as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  // Responsive props tests
  test('handles responsive variant prop correctly', () => {
    const { container } = render(
      <Card 
        variant={{ 
          base: CARD_VARIANTS.DEFAULT, 
          md: CARD_VARIANTS.ELEVATED, 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive fullWidth prop correctly', () => {
    const { container } = render(
      <Card 
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

  test('handles responsive padding prop correctly', () => {
    const { container } = render(
      <Card 
        padding={{ 
          base: 'sm', 
          md: 'md', 
          lg: 'lg' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive radius prop correctly', () => {
    const { container } = render(
      <Card 
        radius={{ 
          base: 'sm', 
          md: 'md', 
          lg: 'lg' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive elevation prop correctly', () => {
    const { container } = render(
      <Card 
        elevation={{ 
          base: 'sm', 
          md: 'md', 
          lg: 'lg' 
        }}
      />
    );
    
    // Check if the responsive styles are applied as a custom property
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Card className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(CARD_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Card style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Padding, radius, and elevation tests
  test('applies padding style when padding prop is provided', () => {
    const { container } = render(<Card padding="lg" />);
    expect(container.firstChild).toHaveStyle({ padding: 'var(--spacing-lg)' });
  });

  test('applies border radius style when radius prop is provided', () => {
    const { container } = render(<Card radius="lg" />);
    expect(container.firstChild).toHaveStyle({ borderRadius: 'var(--border-radius-lg)' });
  });

  test('applies box shadow style when elevation prop is provided', () => {
    const { container } = render(<Card elevation="lg" />);
    expect(container.firstChild).toHaveStyle({ boxShadow: 'var(--shadow-lg)' });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(CARD_VARIANTS)).toContain('default');
    expect(Object.values(CARD_VARIANTS)).toContain('elevated');
    expect(Object.values(CARD_VARIANTS)).toContain('outlined');
    expect(Object.values(CARD_VARIANTS)).toContain('interactive');
    expect(Object.keys(CARD_MODIFIERS).length).toBeGreaterThan(0);
    expect(CARD_BREAKPOINTS).toBeDefined();
  });

  // Error handling tests
  test('logs a warning and falls back to default variant when an invalid variant is provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Card variant="invalid" />);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid variant'));
    expect(container.firstChild).toHaveClass(`${CARD_CLASS}--${CARD_VARIANTS.DEFAULT}`);
    consoleSpy.mockRestore();
  });

  test('handles onClick errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleClick = () => {
      throw new Error('Test error');
    };
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    fireEvent.click(screen.getByText('Clickable Card'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onClick handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  test('handles extension errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock componentExtension to throw an error
    jest.spyOn(require('../../utilities').componentExtension, 'applyComponentExtensions').mockImplementation(() => {
      throw new Error('Test error');
    });
    render(<Card extensions={['test']}>Card Content</Card>);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error applying extensions'), expect.any(Error));
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
