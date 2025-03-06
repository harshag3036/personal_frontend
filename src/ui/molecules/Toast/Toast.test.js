/**
 * Toast Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast, { 
  TOAST_CLASS, 
  TOAST_VARIANTS, 
  TOAST_POSITIONS,
  TOAST_MODIFIERS,
  TOAST_BREAKPOINTS
} from './index';

describe('Toast Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Toast visible={true}>Test Toast</Toast>);
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Toast visible={true}>Test Toast</Toast>);
    expect(container.firstChild).toHaveClass(TOAST_CLASS);
  });

  test('does not render when visible is false', () => {
    const { container } = render(<Toast visible={false}>Test Toast</Toast>);
    expect(container.firstChild).toBeNull();
  });

  // Variant tests
  test('applies the correct variant class for default', () => {
    const { container } = render(
      <Toast visible={true} variant={TOAST_VARIANTS.DEFAULT}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_VARIANTS.DEFAULT}`);
  });

  test('applies the correct variant class for success', () => {
    const { container } = render(
      <Toast visible={true} variant={TOAST_VARIANTS.SUCCESS}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_VARIANTS.SUCCESS}`);
  });

  test('applies the correct variant class for error', () => {
    const { container } = render(
      <Toast visible={true} variant={TOAST_VARIANTS.ERROR}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_VARIANTS.ERROR}`);
  });

  test('applies the correct variant class for warning', () => {
    const { container } = render(
      <Toast visible={true} variant={TOAST_VARIANTS.WARNING}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_VARIANTS.WARNING}`);
  });

  test('applies the correct variant class for info', () => {
    const { container } = render(
      <Toast visible={true} variant={TOAST_VARIANTS.INFO}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_VARIANTS.INFO}`);
  });

  // Position tests
  test('applies the correct position class for top-left', () => {
    const { container } = render(
      <Toast visible={true} position={TOAST_POSITIONS.TOP_LEFT}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.TOP_LEFT}`);
  });

  test('applies the correct position class for top-center', () => {
    const { container } = render(
      <Toast visible={true} position={TOAST_POSITIONS.TOP_CENTER}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.TOP_CENTER}`);
  });

  test('applies the correct position class for top-right', () => {
    const { container } = render(
      <Toast visible={true} position={TOAST_POSITIONS.TOP_RIGHT}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.TOP_RIGHT}`);
  });

  test('applies the correct position class for bottom-left', () => {
    const { container } = render(
      <Toast visible={true} position={TOAST_POSITIONS.BOTTOM_LEFT}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.BOTTOM_LEFT}`);
  });

  test('applies the correct position class for bottom-center', () => {
    const { container } = render(
      <Toast visible={true} position={TOAST_POSITIONS.BOTTOM_CENTER}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.BOTTOM_CENTER}`);
  });

  test('applies the correct position class for bottom-right', () => {
    const { container } = render(
      <Toast visible={true} position={TOAST_POSITIONS.BOTTOM_RIGHT}>Test Toast</Toast>
    );
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.BOTTOM_RIGHT}`);
  });

  // Icon tests
  test('renders icon when provided', () => {
    const icon = <span data-testid="test-icon">🔔</span>;
    render(<Toast visible={true} icon={icon}>Test Toast</Toast>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('applies with-icon class when icon is provided', () => {
    const icon = <span>🔔</span>;
    const { container } = render(<Toast visible={true} icon={icon}>Test Toast</Toast>);
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_MODIFIERS.WITH_ICON}`);
  });

  // Close button tests
  test('renders close button by default', () => {
    render(<Toast visible={true}>Test Toast</Toast>);
    expect(screen.getByRole('button', { name: /close notification/i })).toBeInTheDocument();
  });

  test('does not render close button when showCloseButton is false', () => {
    render(<Toast visible={true} showCloseButton={false}>Test Toast</Toast>);
    expect(screen.queryByRole('button', { name: /close notification/i })).not.toBeInTheDocument();
  });

  test('applies with-close class when showCloseButton is true', () => {
    const { container } = render(<Toast visible={true} showCloseButton={true}>Test Toast</Toast>);
    expect(container.firstChild).toHaveClass(`${TOAST_CLASS}-${TOAST_MODIFIERS.WITH_CLOSE}`);
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Toast visible={true} onClose={handleClose}>Test Toast</Toast>);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // Auto-dismiss tests
  test('calls onClose after duration', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    
    render(<Toast visible={true} duration={1000} onClose={handleClose}>Test Toast</Toast>);
    
    expect(handleClose).not.toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
    
    jest.useRealTimers();
  });

  test('does not auto-dismiss when duration is 0', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    
    render(<Toast visible={true} duration={0} onClose={handleClose}>Test Toast</Toast>);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(handleClose).not.toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  // Visibility update tests
  test('updates visibility when visible prop changes', () => {
    const { rerender, container } = render(<Toast visible={true}>Test Toast</Toast>);
    expect(container.firstChild).not.toBeNull();
    
    rerender(<Toast visible={false}>Test Toast</Toast>);
    expect(container.firstChild).toBeNull();
    
    rerender(<Toast visible={true}>Test Toast</Toast>);
    expect(container.firstChild).not.toBeNull();
  });

  // Error handling tests
  test('handles invalid variant gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Toast visible={true} variant="invalid">Test Toast</Toast>);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid variant'));
    consoleSpy.mockRestore();
  });

  test('handles invalid position gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Toast visible={true} position="invalid">Test Toast</Toast>);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid position'));
    consoleSpy.mockRestore();
  });

  test('handles onClose errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const handleClose = () => {
      throw new Error('Test error');
    };
    
    render(<Toast visible={true} onClose={handleClose}>Test Toast</Toast>);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(closeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onClose handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Extension tests
  test('handles extension errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock componentExtension to throw an error
    jest.spyOn(require('../../utilities').componentExtension, 'applyComponentExtensions').mockImplementation(() => {
      throw new Error('Test error');
    });
    
    render(<Toast visible={true} extensions={['test']}>Test Toast</Toast>);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error applying extensions'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Responsive props tests
  test('handles responsive variant prop correctly', () => {
    const { container } = render(
      <Toast 
        visible={true} 
        variant={{ 
          base: TOAST_VARIANTS.DEFAULT, 
          md: TOAST_VARIANTS.SUCCESS, 
          lg: TOAST_VARIANTS.ERROR 
        }}
      >
        Test Toast
      </Toast>
    );
    
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  test('handles responsive position prop correctly', () => {
    const { container } = render(
      <Toast 
        visible={true} 
        position={{ 
          base: TOAST_POSITIONS.BOTTOM_RIGHT, 
          md: TOAST_POSITIONS.TOP_RIGHT, 
          lg: TOAST_POSITIONS.TOP_CENTER 
        }}
      >
        Test Toast
      </Toast>
    );
    
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<Toast visible={true} className="custom-class">Test Toast</Toast>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(TOAST_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<Toast visible={true} style={{ marginTop: '10px' }}>Test Toast</Toast>);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<Toast visible={true} as="section">Test Toast</Toast>);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('passes additional props to the rendered element', () => {
    const { container } = render(
      <Toast visible={true} as="section" data-testid="test-toast">Test Toast</Toast>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-toast');
  });

  // Accessibility tests
  test('has correct accessibility attributes', () => {
    const { container } = render(<Toast visible={true}>Test Toast</Toast>);
    expect(container.firstChild).toHaveAttribute('role', 'alert');
    expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
  });

  test('close button has correct accessibility attributes', () => {
    render(<Toast visible={true}>Test Toast</Toast>);
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Close notification');
    expect(closeButton).toHaveAttribute('type', 'button');
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(TOAST_VARIANTS)).toContain('default');
    expect(Object.values(TOAST_VARIANTS)).toContain('success');
    expect(Object.values(TOAST_VARIANTS)).toContain('error');
    expect(Object.values(TOAST_VARIANTS)).toContain('warning');
    expect(Object.values(TOAST_VARIANTS)).toContain('info');
    
    expect(Object.values(TOAST_POSITIONS)).toContain('top-left');
    expect(Object.values(TOAST_POSITIONS)).toContain('top-center');
    expect(Object.values(TOAST_POSITIONS)).toContain('top-right');
    expect(Object.values(TOAST_POSITIONS)).toContain('bottom-left');
    expect(Object.values(TOAST_POSITIONS)).toContain('bottom-center');
    expect(Object.values(TOAST_POSITIONS)).toContain('bottom-right');
    
    expect(Object.values(TOAST_MODIFIERS)).toContain('visible');
    expect(Object.values(TOAST_MODIFIERS)).toContain('hidden');
    expect(Object.values(TOAST_MODIFIERS)).toContain('with-icon');
    expect(Object.values(TOAST_MODIFIERS)).toContain('with-close');
    
    expect(TOAST_BREAKPOINTS).toBeDefined();
  });
});
