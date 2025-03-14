/**
 * ToastContainer Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ToastContainer from './ToastContainer';
import { 
  TOAST_CONTAINER_CLASS, 
  TOAST_GROUP_CLASS,
  TOAST_POSITIONS, 
  TOAST_CLASS,
  TOAST_BREAKPOINTS
} from './constants';

describe('ToastContainer Component', () => {
  // Mock toasts for testing
  const mockToasts = [
    {
      id: 'toast-1',
      content: 'Toast 1',
      variant: 'success',
      position: TOAST_POSITIONS.TOP_RIGHT,
      duration: 0,
    },
    {
      id: 'toast-2',
      content: 'Toast 2',
      variant: 'error',
      position: TOAST_POSITIONS.BOTTOM_LEFT,
      duration: 0,
    },
  ];

  // Basic rendering tests
  test('renders correctly', () => {
    render(<ToastContainer toasts={mockToasts} />);
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<ToastContainer toasts={mockToasts} />);
    expect(container.firstChild).toHaveClass(TOAST_CONTAINER_CLASS);
  });

  test('renders empty container when no toasts are provided', () => {
    const { container } = render(<ToastContainer toasts={[]} />);
    expect(container.firstChild).toHaveClass(TOAST_CONTAINER_CLASS);
    expect(container.firstChild.children.length).toBe(0);
  });

  // Toast grouping tests
  test('groups toasts by position', () => {
    const { container } = render(<ToastContainer toasts={mockToasts} />);
    
    const groups = container.querySelectorAll(`.${TOAST_GROUP_CLASS}`);
    expect(groups.length).toBe(2);
    
    expect(groups[0].classList).toContain(`${TOAST_GROUP_CLASS}-${TOAST_POSITIONS.TOP_RIGHT}`);
    expect(groups[1].classList).toContain(`${TOAST_GROUP_CLASS}-${TOAST_POSITIONS.BOTTOM_LEFT}`);
  });

  test('applies default position to toasts without position', () => {
    const toastsWithoutPosition = [
      {
        id: 'toast-1',
        content: 'Toast 1',
        variant: 'success',
      },
    ];
    
    const { container } = render(
      <ToastContainer 
        toasts={toastsWithoutPosition} 
        position={TOAST_POSITIONS.BOTTOM_RIGHT} 
      />
    );
    
    const group = container.querySelector(`.${TOAST_GROUP_CLASS}`);
    expect(group.classList).toContain(`${TOAST_GROUP_CLASS}-${TOAST_POSITIONS.BOTTOM_RIGHT}`);
  });

  // Toast rendering tests
  test('renders toast with correct variant', () => {
    render(<ToastContainer toasts={mockToasts} />);
    
    const toast1 = screen.getByText('Toast 1').closest(`.${TOAST_CLASS}`);
    const toast2 = screen.getByText('Toast 2').closest(`.${TOAST_CLASS}`);
    
    expect(toast1).toHaveClass(`${TOAST_CLASS}-success`);
    expect(toast2).toHaveClass(`${TOAST_CLASS}-error`);
  });

  test('renders toast with correct position', () => {
    render(<ToastContainer toasts={mockToasts} />);
    
    const toast1 = screen.getByText('Toast 1').closest(`.${TOAST_CLASS}`);
    const toast2 = screen.getByText('Toast 2').closest(`.${TOAST_CLASS}`);
    
    expect(toast1).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.TOP_RIGHT}`);
    expect(toast2).toHaveClass(`${TOAST_CLASS}-${TOAST_POSITIONS.BOTTOM_LEFT}`);
  });

  // Toast removal tests
  test('calls onRemove when a toast is closed', () => {
    const handleRemove = jest.fn();
    render(<ToastContainer toasts={mockToasts} onRemove={handleRemove} />);
    
    const closeButtons = screen.getAllByRole('button', { name: /close notification/i });
    fireEvent.click(closeButtons[0]);
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('toast-1');
  });

  test('calls toast onClose when a toast is closed', () => {
    const handleClose = jest.fn();
    const toastsWithOnClose = [
      {
        id: 'toast-1',
        content: 'Toast 1',
        variant: 'success',
        onClose: handleClose,
      },
    ];
    
    render(<ToastContainer toasts={toastsWithOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // Auto-dismiss tests
  test('auto-dismisses toast after duration', () => {
    jest.useFakeTimers();
    
    const handleRemove = jest.fn();
    const toastsWithDuration = [
      {
        id: 'toast-1',
        content: 'Toast 1',
        duration: 1000,
      },
    ];
    
    render(<ToastContainer toasts={toastsWithDuration} onRemove={handleRemove} />);
    
    expect(handleRemove).not.toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('toast-1');
    
    jest.useRealTimers();
  });

  test('does not auto-dismiss toast when duration is 0', () => {
    jest.useFakeTimers();
    
    const handleRemove = jest.fn();
    const toastsWithZeroDuration = [
      {
        id: 'toast-1',
        content: 'Toast 1',
        duration: 0,
      },
    ];
    
    render(<ToastContainer toasts={toastsWithZeroDuration} onRemove={handleRemove} />);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(handleRemove).not.toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  // Max toasts tests
  test('limits the number of toasts to maxToasts', () => {
    const manyToasts = [
      { id: 'toast-1', content: 'Toast 1' },
      { id: 'toast-2', content: 'Toast 2' },
      { id: 'toast-3', content: 'Toast 3' },
      { id: 'toast-4', content: 'Toast 4' },
      { id: 'toast-5', content: 'Toast 5' },
      { id: 'toast-6', content: 'Toast 6' },
    ];
    
    render(<ToastContainer toasts={manyToasts} maxToasts={3} />);
    
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 3')).toBeInTheDocument();
    expect(screen.queryByText('Toast 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Toast 5')).not.toBeInTheDocument();
    expect(screen.queryByText('Toast 6')).not.toBeInTheDocument();
  });

  // Error handling tests
  test('handles invalid position gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(<ToastContainer toasts={mockToasts} position="invalid" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid position'));
    consoleSpy.mockRestore();
  });

  test('handles non-array toasts gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { container } = render(<ToastContainer toasts="not an array" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('toasts prop is not an array'));
    expect(container.firstChild.children.length).toBe(0);
    
    consoleSpy.mockRestore();
  });

  test('handles onRemove errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const handleRemove = () => {
      throw new Error('Test error');
    };
    
    render(<ToastContainer toasts={mockToasts} onRemove={handleRemove} />);
    
    const closeButton = screen.getAllByRole('button', { name: /close notification/i })[0];
    fireEvent.click(closeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in onRemove handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  test('handles toast onClose errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const handleClose = () => {
      throw new Error('Test error');
    };
    
    const toastsWithErrorOnClose = [
      {
        id: 'toast-1',
        content: 'Toast 1',
        onClose: handleClose,
      },
    ];
    
    render(<ToastContainer toasts={toastsWithErrorOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(closeButton);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in toast onClose handler'), expect.any(Error));
    consoleSpy.mockRestore();
  });

  // Responsive props tests
  test('handles responsive position prop correctly', () => {
    const { container } = render(
      <ToastContainer 
        toasts={mockToasts} 
        position={{ 
          base: TOAST_POSITIONS.BOTTOM_RIGHT, 
          md: TOAST_POSITIONS.TOP_RIGHT, 
          lg: TOAST_POSITIONS.TOP_CENTER 
        }}
      />
    );
    
    expect(container.firstChild.style.getPropertyValue('--responsive-styles')).toBeTruthy();
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(<ToastContainer toasts={mockToasts} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(TOAST_CONTAINER_CLASS);
  });

  test('applies additional styles when style prop is provided', () => {
    const { container } = render(<ToastContainer toasts={mockToasts} style={{ marginTop: '10px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  // Polymorphic rendering tests
  test('renders as a different HTML element when "as" prop is provided', () => {
    const { container } = render(<ToastContainer toasts={mockToasts} as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('passes additional props to the rendered element', () => {
    const { container } = render(
      <ToastContainer toasts={mockToasts} as="section" data-testid="test-container" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-container');
  });

  // Accessibility tests
  test('toasts have correct accessibility attributes', () => {
    render(<ToastContainer toasts={mockToasts} />);
    
    const toasts = screen.getAllByRole('alert');
    expect(toasts.length).toBe(2);
    
    toasts.forEach((toast) => {
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });

  test('close buttons have correct accessibility attributes', () => {
    render(<ToastContainer toasts={mockToasts} />);
    
    const closeButtons = screen.getAllByRole('button', { name: /close notification/i });
    expect(closeButtons.length).toBe(2);
    
    closeButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label', 'Close notification');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(TOAST_CONTAINER_CLASS).toBeDefined();
    expect(TOAST_GROUP_CLASS).toBeDefined();
    expect(TOAST_POSITIONS).toBeDefined();
    expect(TOAST_CLASS).toBeDefined();
    expect(TOAST_BREAKPOINTS).toBeDefined();
  });
});
