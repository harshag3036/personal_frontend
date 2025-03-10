import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimePicker from './TimePicker';
import { TIMEPICKER_VARIANTS, TIMEPICKER_SIZES, TIMEPICKER_FORMATS, CLASS_PREFIX } from './constants';

describe('TimePicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<TimePicker onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Select time');
    expect(input).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<TimePicker onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Minute')).toBeInTheDocument();
    expect(screen.getByText('AM/PM')).toBeInTheDocument();
  });

  it('does not open dropdown when disabled', () => {
    render(<TimePicker onChange={mockOnChange} disabled />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
  });

  it('does not open dropdown when readOnly', () => {
    render(<TimePicker onChange={mockOnChange} readOnly />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
  });

  it('shows seconds column when showSeconds is true', () => {
    render(<TimePicker onChange={mockOnChange} showSeconds />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('does not show AM/PM when format is 24-hour', () => {
    render(<TimePicker onChange={mockOnChange} format={TIMEPICKER_FORMATS.TWENTY_FOUR_HOUR} />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    expect(screen.queryByText('AM/PM')).not.toBeInTheDocument();
  });

  it('applies variant class correctly', () => {
    const { container } = render(
      <TimePicker onChange={mockOnChange} variant={TIMEPICKER_VARIANTS.SECONDARY} />
    );
    
    expect(container.firstChild).toHaveClass(`${CLASS_PREFIX}-variant-${TIMEPICKER_VARIANTS.SECONDARY}`);
  });

  it('applies size class correctly', () => {
    const { container } = render(
      <TimePicker onChange={mockOnChange} size={TIMEPICKER_SIZES.LARGE} />
    );
    
    expect(container.firstChild).toHaveClass(`${CLASS_PREFIX}-size-${TIMEPICKER_SIZES.LARGE}`);
  });

  it('applies disabled class correctly', () => {
    const { container } = render(
      <TimePicker onChange={mockOnChange} disabled />
    );
    
    expect(container.firstChild).toHaveClass(`${CLASS_PREFIX}-disabled`);
  });

  it('applies readonly class correctly', () => {
    const { container } = render(
      <TimePicker onChange={mockOnChange} readOnly />
    );
    
    expect(container.firstChild).toHaveClass(`${CLASS_PREFIX}-readonly`);
  });

  it('displays error message when error is true', () => {
    render(
      <TimePicker 
        onChange={mockOnChange} 
        error 
        errorMessage="This field is required" 
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('calls onChange when a time is selected', () => {
    render(<TimePicker onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    // Select hour
    fireEvent.click(screen.getByText('10'));
    
    // Select minute
    fireEvent.click(screen.getByText('30'));
    
    // Select AM
    fireEvent.click(screen.getByText('AM'));
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls onChange with current time when Now button is clicked', () => {
    render(<TimePicker onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    fireEvent.click(screen.getByText('Now'));
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls onChange with null when Clear button is clicked', () => {
    render(<TimePicker onChange={mockOnChange} value={new Date()} />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    fireEvent.click(screen.getByText('Clear'));
    
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('does not show Clear button when clearable is false', () => {
    render(<TimePicker onChange={mockOnChange} clearable={false} />);
    
    const input = screen.getByPlaceholderText('Select time');
    fireEvent.click(input);
    
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  it('supports polymorphic as prop', () => {
    render(<TimePicker as="div" onChange={mockOnChange} data-testid="timepicker" />);
    
    expect(screen.getByTestId('timepicker').tagName).toBe('DIV');
  });
});
