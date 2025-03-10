import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';
import { DATEPICKER_FORMATS } from './constants';

describe('DatePicker', () => {
  test('renders with default props', () => {
    render(<DatePicker />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Select a date');
  });

  test('renders with custom placeholder', () => {
    render(<DatePicker placeholder="Choose date" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Choose date');
  });

  test('renders with a selected date', () => {
    const date = new Date(2023, 0, 15); // January 15, 2023
    render(<DatePicker value={date} format={DATEPICKER_FORMATS.SHORT} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('01/15/2023');
  });

  test('opens calendar when input is clicked', () => {
    render(<DatePicker />);
    const input = screen.getByRole('textbox');
    
    // Calendar should not be visible initially
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    
    // Click the input to open the calendar
    fireEvent.click(input);
    
    // Calendar should now be visible
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('does not open calendar when disabled', () => {
    render(<DatePicker disabled />);
    const input = screen.getByRole('textbox');
    
    // Click the input
    fireEvent.click(input);
    
    // Calendar should not be visible
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('does not open calendar when readOnly', () => {
    render(<DatePicker readOnly />);
    const input = screen.getByRole('textbox');
    
    // Click the input
    fireEvent.click(input);
    
    // Calendar should not be visible
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('selects a date when clicked', () => {
    const handleChange = jest.fn();
    render(<DatePicker onChange={handleChange} />);
    
    // Open the calendar
    fireEvent.click(screen.getByRole('textbox'));
    
    // Find a day in the current month and click it
    const days = screen.getAllByText(/\d+/); // Find all day numbers
    const dayInCurrentMonth = days.find(day => 
      !day.parentElement.className.includes('outside-month')
    );
    
    fireEvent.click(dayInCurrentMonth);
    
    // onChange should have been called with a Date object
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBeInstanceOf(Date);
    
    // Calendar should be closed after selection
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('clears the date when clear button is clicked', () => {
    const handleChange = jest.fn();
    const date = new Date();
    render(<DatePicker value={date} onChange={handleChange} clearable />);
    
    // Clear button should be visible
    const clearButton = screen.getByLabelText('Clear date');
    expect(clearButton).toBeInTheDocument();
    
    // Click the clear button
    fireEvent.click(clearButton);
    
    // onChange should have been called with null
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  test('navigates to previous month', () => {
    render(<DatePicker />);
    
    // Open the calendar
    fireEvent.click(screen.getByRole('textbox'));
    
    // Get the current month/year display
    const initialMonthYear = screen.getByText(/^\w+ \d{4}$/); // e.g., "March 2023"
    const initialText = initialMonthYear.textContent;
    
    // Click the previous month button
    const prevButton = screen.getByLabelText('Previous month');
    fireEvent.click(prevButton);
    
    // Month/year display should have changed
    expect(initialMonthYear.textContent).not.toBe(initialText);
  });

  test('navigates to next month', () => {
    render(<DatePicker />);
    
    // Open the calendar
    fireEvent.click(screen.getByRole('textbox'));
    
    // Get the current month/year display
    const initialMonthYear = screen.getByText(/^\w+ \d{4}$/); // e.g., "March 2023"
    const initialText = initialMonthYear.textContent;
    
    // Click the next month button
    const nextButton = screen.getByLabelText('Next month');
    fireEvent.click(nextButton);
    
    // Month/year display should have changed
    expect(initialMonthYear.textContent).not.toBe(initialText);
  });

  test('goes to today when today button is clicked', () => {
    const handleChange = jest.fn();
    render(<DatePicker onChange={handleChange} showTodayButton />);
    
    // Open the calendar
    fireEvent.click(screen.getByRole('textbox'));
    
    // Click the today button
    const todayButton = screen.getByText('Today');
    fireEvent.click(todayButton);
    
    // onChange should have been called with today's date
    expect(handleChange).toHaveBeenCalledTimes(1);
    
    const today = new Date();
    const selectedDate = handleChange.mock.calls[0][0];
    
    expect(selectedDate.getDate()).toBe(today.getDate());
    expect(selectedDate.getMonth()).toBe(today.getMonth());
    expect(selectedDate.getFullYear()).toBe(today.getFullYear());
    
    // Calendar should be closed after selection
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('shows week numbers when showWeekNumbers is true', () => {
    render(<DatePicker showWeekNumbers />);
    
    // Open the calendar
    fireEvent.click(screen.getByRole('textbox'));
    
    // There should be an extra column for week numbers
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells.length).toBe(8); // 7 days + 1 for week numbers
  });

  test('respects min and max date constraints', () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 5);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5);
    
    render(<DatePicker minDate={minDate} maxDate={maxDate} />);
    
    // Open the calendar
    fireEvent.click(screen.getByRole('textbox'));
    
    // Find all day elements
    const dayElements = screen.getAllByText(/\d+/);
    
    // Check that days outside the min/max range have the disabled class
    dayElements.forEach(day => {
      const dayNumber = parseInt(day.textContent, 10);
      const isCurrentMonth = !day.parentElement.className.includes('outside-month');
      
      if (isCurrentMonth) {
        const date = new Date(today.getFullYear(), today.getMonth(), dayNumber);
        const isDisabled = day.parentElement.className.includes('disabled');
        
        if (date < minDate || date > maxDate) {
          expect(isDisabled).toBe(true);
        }
      }
    });
  });
});
