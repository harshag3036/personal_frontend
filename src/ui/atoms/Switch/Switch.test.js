/**
 * Switch Component Tests
 * 
 * This file contains tests for the Switch component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './Switch';
import { SWITCH_VARIANTS, SWITCH_SIZES } from './constants';

describe('Switch Component', () => {
  // Basic rendering tests
  test('renders without crashing', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with label', () => {
    const labelText = 'Toggle me';
    render(<Switch label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  // Functionality tests
  test('handles checked state correctly', () => {
    render(<Switch defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('handles onChange callback', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles disabled state correctly', () => {
    render(<Switch disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  // Variant tests
  test.each(Object.values(SWITCH_VARIANTS))('renders %s variant correctly', (variant) => {
    render(<Switch variant={variant} />);
    const switchElement = screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass(`ui-switch--${variant.toLowerCase()}`);
  });

  // Size tests
  test.each(Object.values(SWITCH_SIZES))('renders %s size correctly', (size) => {
    render(<Switch size={size} />);
    const switchElement = screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass(`ui-switch--${size.toLowerCase()}`);
  });

  // Label position tests
  test('renders label on the left when labelPosition is "left"', () => {
    render(<Switch label="Label" labelPosition="left" />);
    const switchElement = screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('ui-switch--label-left');
  });

  test('renders label on the right when labelPosition is "right"', () => {
    render(<Switch label="Label" labelPosition="right" />);
    const switchElement = screen.getByRole('checkbox').closest('label');
    expect(switchElement).not.toHaveClass('ui-switch--label-left');
  });

  // Polymorphic tests
  test('renders as a different element when "as" prop is provided', () => {
    const { container } = render(<Switch as="div" />);
    expect(container.querySelector('div.ui-switch')).toBeInTheDocument();
  });

  // Accessibility tests
  test('has accessible label when ariaLabel is provided', () => {
    const ariaLabel = 'Accessible Switch';
    render(<Switch ariaLabel={ariaLabel} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', ariaLabel);
  });

  test('uses label as aria-label when no ariaLabel is provided', () => {
    const labelText = 'Switch Label';
    render(<Switch label={labelText} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', labelText);
  });

  // Additional props tests
  test('passes additional props to the root element', () => {
    const dataTestId = 'test-switch';
    render(<Switch data-testid={dataTestId} />);
    const switchElement = screen.getByTestId(dataTestId);
    expect(switchElement).toBeInTheDocument();
  });
});
