import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from './Label';
import { LABEL_VARIANTS, LABEL_SIZES } from './index';

describe('Label Component', () => {
  test('renders with default props', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const labelElement = screen.getByText('Test Label');
    
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement.className).toContain('ui-label');
    expect(labelElement.className).toContain('ui-label--default');
    expect(labelElement.className).toContain('ui-label--size-md');
    expect(labelElement.getAttribute('htmlFor')).toBe('test-input');
  });

  test('renders with custom variant', () => {
    render(<Label htmlFor="test-input" variant="floating">Floating Label</Label>);
    const labelElement = screen.getByText('Floating Label');
    
    expect(labelElement.className).toContain('ui-label--floating');
  });

  test('renders with custom size', () => {
    render(<Label htmlFor="test-input" size="lg">Large Label</Label>);
    const labelElement = screen.getByText('Large Label');
    
    expect(labelElement.className).toContain('ui-label--size-lg');
  });

  test('renders with custom color', () => {
    render(<Label htmlFor="test-input" color="accent-primary">Colored Label</Label>);
    const labelElement = screen.getByText('Colored Label');
    
    expect(labelElement).toHaveStyle('color: var(--color-accent-primary)');
  });

  test('renders with required indicator', () => {
    render(<Label htmlFor="test-input" required>Required Label</Label>);
    const labelElement = screen.getByText('Required Label');
    
    expect(labelElement.className).toContain('ui-label--required');
  });

  test('renders as disabled', () => {
    render(<Label htmlFor="test-input" disabled>Disabled Label</Label>);
    const labelElement = screen.getByText('Disabled Label');
    
    expect(labelElement.className).toContain('ui-label--disabled');
  });

  test('renders as a different element', () => {
    render(<Label as="span">Span Label</Label>);
    const labelElement = screen.getByText('Span Label');
    
    expect(labelElement.tagName).toBe('SPAN');
    expect(labelElement.getAttribute('htmlFor')).toBeNull();
  });

  test('applies additional className', () => {
    render(<Label htmlFor="test-input" className="custom-class">Custom Class</Label>);
    const labelElement = screen.getByText('Custom Class');
    
    expect(labelElement.className).toContain('custom-class');
  });

  test('applies additional styles', () => {
    render(<Label htmlFor="test-input" style={{ marginRight: '8px' }}>Custom Style</Label>);
    const labelElement = screen.getByText('Custom Style');
    
    expect(labelElement).toHaveStyle('margin-right: 8px');
  });

  test('passes through additional props', () => {
    render(<Label htmlFor="test-input" id="test-id" data-testid="test-label">Test Label</Label>);
    const labelElement = screen.getByTestId('test-label');
    
    expect(labelElement.id).toBe('test-id');
  });

  test('renders with all variants', () => {
    Object.values(LABEL_VARIANTS).forEach(variant => {
      const { container, unmount } = render(<Label htmlFor="test-input" variant={variant}>{variant} Label</Label>);
      expect(container.querySelector(`.ui-label--${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with all sizes', () => {
    Object.values(LABEL_SIZES).forEach(size => {
      const { container, unmount } = render(<Label htmlFor="test-input" size={size}>{size} Label</Label>);
      expect(container.querySelector(`.ui-label--size-${size}`)).toBeInTheDocument();
      unmount();
    });
  });
});
