import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import { 
  SPINNER_CLASS, 
  SPINNER_VARIANTS, 
  SPINNER_SIZES, 
  SPINNER_SPEEDS, 
  SPINNER_LABEL_POSITIONS 
} from './constants';

describe('Spinner', () => {
  // Basic rendering
  it('renders without crashing', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(SPINNER_CLASS);
  });

  // Variants
  it('applies the correct variant class', () => {
    render(<Spinner variant={SPINNER_VARIANTS.SUCCESS} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(`${SPINNER_CLASS}--${SPINNER_VARIANTS.SUCCESS.toLowerCase()}`);
  });

  // Sizes
  it('applies the correct size class', () => {
    render(<Spinner size={SPINNER_SIZES.LARGE} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(`${SPINNER_CLASS}--${SPINNER_SIZES.LARGE.toLowerCase()}`);
  });

  // Speeds
  it('applies the correct speed class', () => {
    render(<Spinner speed={SPINNER_SPEEDS.FAST} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(`${SPINNER_CLASS}--${SPINNER_SPEEDS.FAST.toLowerCase()}`);
  });

  // Label
  it('renders the label when provided', () => {
    const labelText = 'Loading data...';
    render(<Spinner label={labelText} />);
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(`${SPINNER_CLASS}__label`);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(`${SPINNER_CLASS}--with-label`);
  });

  // Label position
  it('applies the correct label position class', () => {
    render(<Spinner label="Loading..." labelPosition={SPINNER_LABEL_POSITIONS.BOTTOM} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(`${SPINNER_CLASS}--label-${SPINNER_LABEL_POSITIONS.BOTTOM.toLowerCase()}`);
  });

  // Fullscreen
  it('applies the fullscreen class when fullscreen is true', () => {
    render(<Spinner fullscreen />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(`${SPINNER_CLASS}--fullscreen`);
  });

  // Accessibility
  it('has the correct accessibility attributes', () => {
    const ariaLabel = 'Custom loading message';
    render(<Spinner ariaLabel={ariaLabel} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', ariaLabel);
  });

  // Polymorphic as prop
  it('renders as a different element when as prop is provided', () => {
    render(<Spinner as="span" data-testid="spinner-element" />);
    const spinner = screen.getByTestId('spinner-element');
    expect(spinner.tagName).toBe('SPAN');
  });

  // Additional props
  it('passes additional props to the element', () => {
    const dataTestId = 'custom-spinner';
    render(<Spinner data-testid={dataTestId} />);
    const spinner = screen.getByTestId(dataTestId);
    expect(spinner).toBeInTheDocument();
  });

  // Custom className
  it('includes custom className', () => {
    const customClass = 'custom-spinner-class';
    render(<Spinner className={customClass} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(customClass);
  });

  // Custom style
  it('applies custom styles', () => {
    const customStyle = { marginTop: '10px' };
    render(<Spinner style={customStyle} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveStyle(customStyle);
  });
});
