/**
 * Alert Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from './Alert';
import { ALERT_VARIANTS, ALERT_SIZES, ALERT_ICON_POSITIONS } from './constants';

describe('Alert Component', () => {
  // Basic rendering tests
  test('renders correctly with default props', () => {
    render(<Alert>Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent('Test alert');
    expect(alertElement).toHaveClass('ui-alert');
    expect(alertElement).toHaveClass('ui-alert--info');
    expect(alertElement).toHaveClass('ui-alert--medium');
  });

  test('renders with custom className', () => {
    render(<Alert className="custom-class">Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement).toHaveClass('custom-class');
  });

  test('renders with custom style', () => {
    render(<Alert style={{ margin: '10px' }}>Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement).toHaveStyle('margin: 10px');
  });

  // Variant tests
  test.each(Object.values(ALERT_VARIANTS))('renders with %s variant', (variant) => {
    render(<Alert variant={variant}>Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement).toHaveClass(`ui-alert--${variant}`);
  });

  // Size tests
  test.each(Object.values(ALERT_SIZES))('renders with %s size', (size) => {
    render(<Alert size={size}>Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement).toHaveClass(`ui-alert--${size}`);
  });

  // Icon tests
  test('renders with icon when hasIcon is true', () => {
    render(<Alert hasIcon>Test alert</Alert>);
    const iconElement = document.querySelector('.ui-alert__icon');

    expect(iconElement).toBeInTheDocument();
  });

  test('does not render icon when hasIcon is false', () => {
    render(<Alert hasIcon={false}>Test alert</Alert>);
    const iconElement = document.querySelector('.ui-alert__icon');
    
    expect(iconElement).not.toBeInTheDocument();
  });

  test.each(Object.values(ALERT_ICON_POSITIONS))('renders with icon position %s', (position) => {
    render(<Alert hasIcon iconPosition={position}>Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement).toHaveClass(`ui-alert--icon-${position}`);
  });

  // Title tests
  test('renders with title', () => {
    render(<Alert title="Alert Title">Test alert</Alert>);
    const titleElement = screen.getByText('Alert Title');
    
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('ui-alert__title');
  });

  // Close button tests
  test('renders with close button when closable is true', () => {
    render(<Alert closable>Test alert</Alert>);
    const closeButton = screen.getByRole('button', { name: /close alert/i });
    
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('ui-alert__close');
  });

  test('does not render close button when closable is false', () => {
    render(<Alert closable={false}>Test alert</Alert>);
    const closeButton = screen.queryByRole('button', { name: /close alert/i });
    
    expect(closeButton).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Alert closable onClose={onCloseMock}>Test alert</Alert>);
    const closeButton = screen.getByRole('button', { name: /close alert/i });
    
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('hides alert when close button is clicked', () => {
    render(<Alert closable>Test alert</Alert>);
    const closeButton = screen.getByRole('button', { name: /close alert/i });
    
    fireEvent.click(closeButton);
    
    const alertElement = screen.queryByRole('alert');
    expect(alertElement).not.toBeInTheDocument();
  });

  // Polymorphic as prop tests
  test('renders as a different element when as prop is provided', () => {
    render(<Alert as="section">Test alert</Alert>);
    const alertElement = screen.getByRole('alert');
    
    expect(alertElement.tagName).toBe('SECTION');
  });

  // Responsive props tests
  test('handles responsive variant prop', () => {
    render(
      <Alert 
        variant={{ base: 'info', md: 'success', lg: 'warning' }}
      >
        Test alert
      </Alert>
    );
    
    const alertElement = screen.getByRole('alert');
    // We can only test that it doesn't have the standard classes since
    // responsive styles are handled at runtime
    expect(alertElement).not.toHaveClass('ui-alert--info');
    expect(alertElement).not.toHaveClass('ui-alert--success');
    expect(alertElement).not.toHaveClass('ui-alert--warning');
  });
});
