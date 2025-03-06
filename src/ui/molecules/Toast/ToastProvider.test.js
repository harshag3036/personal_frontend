/**
 * ToastProvider Component Tests
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ToastProvider } from './index';
import { useToast } from '../../utilities';

// Mock the useToast hook
jest.mock('../../utilities', () => ({
  useToast: jest.fn(),
}));

// Mock the ToastContainer component
jest.mock('./index', () => ({
  ToastContainer: jest.fn(({ as, toasts, position, maxToasts }) => (
    <div data-testid="mock-toast-container" data-as={as} data-position={position} data-max-toasts={maxToasts}>
      {toasts?.length || 0} toasts
    </div>
  )),
  ToastProvider: jest.requireActual('./ToastProvider').default,
}));

describe('ToastProvider Component', () => {
  beforeEach(() => {
    // Reset mocks
    useToast.mockReset();
    
    // Setup default mock implementation
    useToast.mockImplementation(() => ({
      toasts: [],
      setMaxToasts: jest.fn(),
    }));
  });

  // Basic rendering tests
  test('renders children correctly', () => {
    const { getByText } = render(
      <ToastProvider>
        <div>Test Children</div>
      </ToastProvider>
    );
    
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  test('renders ToastContainer with correct props', () => {
    const mockToasts = [{ id: 'toast-1', content: 'Test Toast' }];
    useToast.mockImplementation(() => ({
      toasts: mockToasts,
      setMaxToasts: jest.fn(),
    }));
    
    const { getByTestId } = render(
      <ToastProvider position="top-right" maxToasts={3}>
        <div>Test Children</div>
      </ToastProvider>
    );
    
    const container = getByTestId('mock-toast-container');
    expect(container).toHaveAttribute('data-position', 'top-right');
    expect(container).toHaveAttribute('data-max-toasts', '3');
    expect(container).toHaveTextContent('1 toasts');
  });

  // Polymorphic rendering tests
  test('passes "as" prop to ToastContainer', () => {
    const { getByTestId } = render(
      <ToastProvider as="section">
        <div>Test Children</div>
      </ToastProvider>
    );
    
    const container = getByTestId('mock-toast-container');
    expect(container).toHaveAttribute('data-as', 'section');
  });

  // MaxToasts tests
  test('calls setMaxToasts with correct value', () => {
    const setMaxToastsMock = jest.fn();
    useToast.mockImplementation(() => ({
      toasts: [],
      setMaxToasts: setMaxToastsMock,
    }));
    
    render(
      <ToastProvider maxToasts={10}>
        <div>Test Children</div>
      </ToastProvider>
    );
    
    expect(setMaxToastsMock).toHaveBeenCalledWith(10);
  });

  test('updates maxToasts when prop changes', () => {
    const setMaxToastsMock = jest.fn();
    useToast.mockImplementation(() => ({
      toasts: [],
      setMaxToasts: setMaxToastsMock,
    }));
    
    const { rerender } = render(
      <ToastProvider maxToasts={5}>
        <div>Test Children</div>
      </ToastProvider>
    );
    
    expect(setMaxToastsMock).toHaveBeenCalledWith(5);
    
    rerender(
      <ToastProvider maxToasts={10}>
        <div>Test Children</div>
      </ToastProvider>
    );
    
    expect(setMaxToastsMock).toHaveBeenCalledWith(10);
  });
});
