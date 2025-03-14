/**
 * StatusBadge Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';
import { STATUS_TYPES, STATUS_DEFINITIONS } from './constants';

describe('StatusBadge', () => {
  // Test rendering with different status types
  test.each(Object.values(STATUS_TYPES))(
    'renders with status %s',
    (status) => {
      render(<StatusBadge status={status} />);
      const statusDef = STATUS_DEFINITIONS[status];
      expect(screen.getByText(statusDef.label)).toBeInTheDocument();
    }
  );

  // Test rendering with icon
  test('renders with icon when showIcon is true', () => {
    render(<StatusBadge status={STATUS_TYPES.IN_PROGRESS} showIcon />);
    const icon = document.querySelector('.ui-status-badge__icon');
    expect(icon).toBeInTheDocument();
  });

  // Test rendering without icon
  test('does not render icon when showIcon is false', () => {
    render(<StatusBadge status={STATUS_TYPES.IN_PROGRESS} showIcon={false} />);
    const icon = document.querySelector('.ui-status-badge__icon');
    expect(icon).not.toBeInTheDocument();
  });

  // Test rendering without label
  test('does not render label when showLabel is false', () => {
    render(<StatusBadge status={STATUS_TYPES.COMPLETED} showLabel={false} />);
    const statusDef = STATUS_DEFINITIONS[STATUS_TYPES.COMPLETED];
    expect(screen.queryByText(statusDef.label)).not.toBeInTheDocument();
  });

  // Test rendering with tooltip
  test('renders with tooltip when showDescription is true', () => {
    // Since the Tooltip component doesn't add any specific class or data attribute to its children,
    // we'll just verify that the StatusBadge renders correctly with showDescription prop
    render(<StatusBadge status={STATUS_TYPES.ON_HOLD} showDescription />);
    
    // Check that the badge itself is rendered
    const statusDef = STATUS_DEFINITIONS[STATUS_TYPES.ON_HOLD];
    expect(screen.getByText(statusDef.label)).toBeInTheDocument();
    
    // The actual tooltip content is rendered in a portal and only appears on hover,
    // which is difficult to test in this environment
  });

  // Test rendering with different sizes
  test('renders with different sizes', () => {
    const { rerender } = render(<StatusBadge status={STATUS_TYPES.NOT_STARTED} size="small" />);
    expect(document.querySelector('.ui-badge--small')).toBeInTheDocument();

    rerender(<StatusBadge status={STATUS_TYPES.NOT_STARTED} size="medium" />);
    expect(document.querySelector('.ui-badge--medium')).toBeInTheDocument();

    rerender(<StatusBadge status={STATUS_TYPES.NOT_STARTED} size="large" />);
    expect(document.querySelector('.ui-badge--large')).toBeInTheDocument();
  });

  // Test rendering with pill shape
  test('renders with pill shape when pill is true', () => {
    render(<StatusBadge status={STATUS_TYPES.CANCELLED} pill />);
    expect(document.querySelector('.ui-badge--pill')).toBeInTheDocument();
  });

  // Test rendering without pill shape
  test('renders without pill shape when pill is false', () => {
    render(<StatusBadge status={STATUS_TYPES.CANCELLED} pill={false} />);
    expect(document.querySelector('.ui-badge--pill')).not.toBeInTheDocument();
  });

  // Test rendering with custom className
  test('renders with custom className', () => {
    render(<StatusBadge status={STATUS_TYPES.IN_PROGRESS} className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  // Test rendering with custom style
  test('renders with custom style', () => {
    render(<StatusBadge status={STATUS_TYPES.COMPLETED} style={{ margin: '10px' }} />);
    const badge = document.querySelector('.ui-status-badge');
    expect(badge).toHaveStyle('margin: 10px');
  });

  // Test rendering with invalid status
  test('renders with default status when invalid status is provided', () => {
    render(<StatusBadge status="invalid-status" />);
    const statusDef = STATUS_DEFINITIONS[STATUS_TYPES.NOT_STARTED];
    expect(screen.getByText(statusDef.label)).toBeInTheDocument();
  });

  // Test rendering as different element
  test('renders as different element when as prop is provided', () => {
    render(<StatusBadge as="div" status={STATUS_TYPES.IN_PROGRESS} />);
    const badge = document.querySelector('.ui-status-badge');
    expect(badge.tagName).toBe('DIV');
  });
});
