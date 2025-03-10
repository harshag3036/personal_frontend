/**
 * Radio Component Tests
 * 
 * This file contains tests for the Radio component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from './Radio';
import { RADIO_VARIANTS, RADIO_SIZES } from './constants';

describe('Radio Component', () => {
  // Basic rendering tests
  test('renders without crashing', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  test('renders with label', () => {
    const labelText = 'Select me';
    render(<Radio label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  // Functionality tests
  test('handles checked state correctly', () => {
    render(<Radio defaultChecked />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  test('handles onChange callback', () => {
    const handleChange = jest.fn();
    render(<Radio onChange={handleChange} />);
    const radio = screen.getByRole('radio');
    
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles disabled state correctly', () => {
    render(<Radio disabled />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  // Variant tests
  test.each(Object.values(RADIO_VARIANTS))('renders %s variant correctly', (variant) => {
    render(<Radio variant={variant} />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass(`ui-radio--${variant.toLowerCase()}`);
  });

  // Size tests
  test.each(Object.values(RADIO_SIZES))('renders %s size correctly', (size) => {
    render(<Radio size={size} />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass(`ui-radio--${size.toLowerCase()}`);
  });

  // Label position tests
  test('renders label on the left when labelPosition is "left"', () => {
    render(<Radio label="Label" labelPosition="left" />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('ui-radio--label-left');
  });

  test('renders label on the right when labelPosition is "right"', () => {
    render(<Radio label="Label" labelPosition="right" />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).not.toHaveClass('ui-radio--label-left');
  });

  // Polymorphic tests
  test('renders as a different element when "as" prop is provided', () => {
    const { container } = render(<Radio as="div" />);
    expect(container.querySelector('div.ui-radio')).toBeInTheDocument();
  });

  // Accessibility tests
  test('has accessible label when ariaLabel is provided', () => {
    const ariaLabel = 'Accessible Radio';
    render(<Radio ariaLabel={ariaLabel} />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-label', ariaLabel);
  });

  test('uses label as aria-label when no ariaLabel is provided', () => {
    const labelText = 'Radio Label';
    render(<Radio label={labelText} />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-label', labelText);
  });

  // Additional props tests
  test('passes additional props to the root element', () => {
    const dataTestId = 'test-radio';
    render(<Radio data-testid={dataTestId} />);
    const radioElement = screen.getByTestId(dataTestId);
    expect(radioElement).toBeInTheDocument();
  });
});
