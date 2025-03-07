import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';
import { ICON_NAMES } from './index';

describe('Icon Component', () => {
  test('renders with default props', () => {
    render(<Icon name="user" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.tagName).toBe('I'); // Default element is 'i'
    expect(iconElement.className).toContain('ui-icon');
    expect(iconElement.className).toContain('ui-icon--user');
    expect(iconElement.className).toContain('ui-icon--size-md');
    expect(iconElement.getAttribute('data-icon')).toBe('user');
    expect(iconElement.getAttribute('role')).toBe('img');
    expect(iconElement.getAttribute('aria-hidden')).toBe('true');
  });

  test('renders with custom size', () => {
    render(<Icon name="star" size="lg" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement.className).toContain('ui-icon--size-lg');
  });

  test('renders with custom color', () => {
    render(<Icon name="check" color="success" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement).toHaveStyle('color: var(--color-success)');
  });

  test('renders as a different element', () => {
    render(<Icon as="span" name="home" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement.tagName).toBe('SPAN');
  });

  test('applies additional className', () => {
    render(<Icon name="info" className="custom-class" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement.className).toContain('custom-class');
  });

  test('applies additional styles', () => {
    render(<Icon name="warning" style={{ marginRight: '8px' }} data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement).toHaveStyle('margin-right: 8px');
  });

  test('sets aria-hidden to false when aria-label is provided', () => {
    render(<Icon name="error" aria-label="Error icon" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement.getAttribute('aria-hidden')).toBe('false');
    expect(iconElement.getAttribute('aria-label')).toBe('Error icon');
  });

  test('passes through additional props', () => {
    render(<Icon name="search" id="search-icon" data-custom="value" data-testid="icon" />);
    const iconElement = screen.getByTestId('icon');
    
    expect(iconElement.id).toBe('search-icon');
    expect(iconElement.getAttribute('data-custom')).toBe('value');
  });

  test('renders all icon names defined in ICON_NAMES', () => {
    // Test a sample of icon names to ensure they render correctly
    Object.values(ICON_NAMES).slice(0, 5).forEach(iconName => {
      const { container, unmount } = render(<Icon name={iconName} />);
      expect(container.querySelector(`.ui-icon--${iconName}`)).toBeInTheDocument();
      unmount();
    });
  });
});
