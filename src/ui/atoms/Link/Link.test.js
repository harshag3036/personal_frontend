import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Link from './Link';
import { LINK_VARIANTS, LINK_SIZES } from './index';

describe('Link Component', () => {
  test('renders with default props', () => {
    render(<Link href="/test">Test Link</Link>);
    const linkElement = screen.getByText('Test Link');
    
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement.className).toContain('ui-link');
    expect(linkElement.className).toContain('ui-link--default');
    expect(linkElement.className).toContain('ui-link--size-md');
    expect(linkElement.className).toContain('ui-link--underline');
    expect(linkElement.getAttribute('href')).toBe('/test');
  });

  test('renders with custom variant', () => {
    render(<Link href="/test" variant="button">Button Link</Link>);
    const linkElement = screen.getByText('Button Link');
    
    expect(linkElement.className).toContain('ui-link--button');
  });

  test('renders with custom size', () => {
    render(<Link href="/test" size="lg">Large Link</Link>);
    const linkElement = screen.getByText('Large Link');
    
    expect(linkElement.className).toContain('ui-link--size-lg');
  });

  test('renders with custom color', () => {
    render(<Link href="/test" color="success">Colored Link</Link>);
    const linkElement = screen.getByText('Colored Link');
    
    expect(linkElement).toHaveStyle('color: var(--color-success)');
  });

  test('renders without underline', () => {
    render(<Link href="/test" underline={false}>No Underline</Link>);
    const linkElement = screen.getByText('No Underline');
    
    expect(linkElement.className).not.toContain('ui-link--underline');
  });

  test('renders as disabled', () => {
    render(<Link href="/test" disabled>Disabled Link</Link>);
    const linkElement = screen.getByText('Disabled Link');
    
    expect(linkElement.className).toContain('ui-link--disabled');
    expect(linkElement.getAttribute('aria-disabled')).toBe('true');
  });

  test('renders as external link', () => {
    render(<Link href="https://example.com" external>External Link</Link>);
    const linkElement = screen.getByText('External Link');
    
    expect(linkElement.className).toContain('ui-link--external');
    expect(linkElement.getAttribute('target')).toBe('_blank');
    expect(linkElement.getAttribute('rel')).toBe('noopener noreferrer');
  });

  test('renders as a different element', () => {
    render(<Link as="button" onClick={() => {}}>Button Link</Link>);
    const linkElement = screen.getByText('Button Link');
    
    expect(linkElement.tagName).toBe('BUTTON');
  });

  test('applies additional className', () => {
    render(<Link href="/test" className="custom-class">Custom Class</Link>);
    const linkElement = screen.getByText('Custom Class');
    
    expect(linkElement.className).toContain('custom-class');
  });

  test('applies additional styles', () => {
    render(<Link href="/test" style={{ marginRight: '8px' }}>Custom Style</Link>);
    const linkElement = screen.getByText('Custom Style');
    
    expect(linkElement).toHaveStyle('margin-right: 8px');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Link href="/test" onClick={handleClick}>Clickable Link</Link>);
    const linkElement = screen.getByText('Clickable Link');
    
    fireEvent.click(linkElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Link href="/test" onClick={handleClick} disabled>Disabled Link</Link>);
    const linkElement = screen.getByText('Disabled Link');
    
    fireEvent.click(linkElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('passes through additional props', () => {
    render(<Link href="/test" id="test-id" data-testid="test-link">Test Link</Link>);
    const linkElement = screen.getByTestId('test-link');
    
    expect(linkElement.id).toBe('test-id');
  });

  test('renders with all variants', () => {
    Object.values(LINK_VARIANTS).forEach(variant => {
      const { container, unmount } = render(<Link href="/test" variant={variant}>{variant} Link</Link>);
      expect(container.querySelector(`.ui-link--${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with all sizes', () => {
    Object.values(LINK_SIZES).forEach(size => {
      const { container, unmount } = render(<Link href="/test" size={size}>{size} Link</Link>);
      expect(container.querySelector(`.ui-link--size-${size}`)).toBeInTheDocument();
      unmount();
    });
  });
});
