/**
 * Calendar Component Tests
 * 
 * This file contains tests for the Calendar component.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from './Calendar';
import { 
  CALENDAR_VIEW_TYPES,
  CALENDAR_SELECTION_MODES,
  CALENDAR_VARIANTS,
  CALENDAR_SIZES,
  CALENDAR_EVENT_DISPLAY
} from './constants';

// Mock data for testing
const mockEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date(2025, 2, 15, 10, 0),
    end: new Date(2025, 2, 15, 11, 30),
    color: 'var(--color-primary)'
  },
  {
    id: 2,
    title: 'Product Demo',
    start: new Date(2025, 2, 18, 14, 0),
    end: new Date(2025, 2, 18, 15, 0),
    color: 'var(--color-success)'
  }
];

// Mock functions
const mockDateSelect = jest.fn();
const mockEventClick = jest.fn();
const mockViewChange = jest.fn();
const mockNavigate = jest.fn();

describe('Calendar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<Calendar />);
    
    // Check if the calendar is rendered
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
    
    // Check if the navigation buttons are rendered
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
  });

  test('renders with custom date', () => {
    const customDate = new Date(2025, 5, 15); // June 15, 2025
    render(<Calendar date={customDate} />);
    
    expect(screen.getByText('June 2025')).toBeInTheDocument();
  });

  test('renders events correctly', () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    render(<Calendar date={testDate} events={mockEvents} />);
    
    // Check if the event is rendered
    expect(screen.getByText('Team Meeting')).toBeInTheDocument();
  });

  test('handles date selection in single mode', async () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    render(
      <Calendar 
        date={testDate} 
        selectionMode={CALENDAR_SELECTION_MODES.SINGLE}
        onDateSelect={mockDateSelect}
      />
    );
    
    // Find and click on a date cell (15th)
    const dateCell = screen.getByText('15');
    fireEvent.click(dateCell);
    
    // Check if the callback was called with the correct date
    expect(mockDateSelect).toHaveBeenCalled();
    const selectedDates = mockDateSelect.mock.calls[0][0];
    expect(selectedDates.length).toBe(1);
    expect(selectedDates[0].getDate()).toBe(15);
  });

  test('handles date selection in multiple mode', async () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    render(
      <Calendar 
        date={testDate} 
        selectionMode={CALENDAR_SELECTION_MODES.MULTIPLE}
        onDateSelect={mockDateSelect}
      />
    );
    
    // Find and click on date cells (15th and 16th)
    const dateCell15 = screen.getByText('15');
    fireEvent.click(dateCell15);
    
    const dateCell16 = screen.getByText('16');
    fireEvent.click(dateCell16);
    
    // Check if the callback was called with the correct dates
    expect(mockDateSelect).toHaveBeenCalledTimes(2);
    const selectedDates = mockDateSelect.mock.calls[1][0];
    expect(selectedDates.length).toBe(2);
  });

  test('handles event click', async () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    render(
      <Calendar 
        date={testDate} 
        events={mockEvents}
        onEventClick={mockEventClick}
      />
    );
    
    // Find and click on an event
    const eventElement = screen.getByText('Team Meeting');
    fireEvent.click(eventElement);
    
    // Check if the callback was called with the correct event
    expect(mockEventClick).toHaveBeenCalledWith(mockEvents[0]);
  });

  test('handles view change', async () => {
    render(
      <Calendar 
        views={Object.values(CALENDAR_VIEW_TYPES)}
        onViewChange={mockViewChange}
      />
    );
    
    // Find and click on the week view button
    const weekViewButton = screen.getByText('Week');
    fireEvent.click(weekViewButton);
    
    // Check if the callback was called with the correct view
    expect(mockViewChange).toHaveBeenCalledWith(CALENDAR_VIEW_TYPES.WEEK);
  });

  test('handles navigation', async () => {
    render(
      <Calendar 
        onNavigate={mockNavigate}
      />
    );
    
    // Find and click on the next button
    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);
    
    // Check if the callback was called
    expect(mockNavigate).toHaveBeenCalled();
    
    // Find and click on the previous button
    const prevButton = screen.getByLabelText('Previous');
    fireEvent.click(prevButton);
    
    // Check if the callback was called
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    
    // Find and click on the today button
    const todayButton = screen.getByText('Today');
    fireEvent.click(todayButton);
    
    // Check if the callback was called
    expect(mockNavigate).toHaveBeenCalledTimes(3);
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Calendar variant={CALENDAR_VARIANTS.DEFAULT} />);
    expect(document.querySelector('.ui-calendar--default')).toBeInTheDocument();
    
    rerender(<Calendar variant={CALENDAR_VARIANTS.BORDERED} />);
    expect(document.querySelector('.ui-calendar--bordered')).toBeInTheDocument();
    
    rerender(<Calendar variant={CALENDAR_VARIANTS.CARD} />);
    expect(document.querySelector('.ui-calendar--card')).toBeInTheDocument();
    
    rerender(<Calendar variant={CALENDAR_VARIANTS.MINIMAL} />);
    expect(document.querySelector('.ui-calendar--minimal')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Calendar size={CALENDAR_SIZES.SMALL} />);
    expect(document.querySelector('.ui-calendar--small')).toBeInTheDocument();
    
    rerender(<Calendar size={CALENDAR_SIZES.MEDIUM} />);
    expect(document.querySelector('.ui-calendar--medium')).toBeInTheDocument();
    
    rerender(<Calendar size={CALENDAR_SIZES.LARGE} />);
    expect(document.querySelector('.ui-calendar--large')).toBeInTheDocument();
  });

  test('renders without header toolbar when headerToolbar is false', () => {
    render(<Calendar headerToolbar={false} />);
    
    expect(screen.queryByText('Today')).not.toBeInTheDocument();
  });

  test('renders without view toolbar when viewToolbar is false', () => {
    render(<Calendar viewToolbar={false} />);
    
    expect(screen.queryByText('Month')).not.toBeInTheDocument();
  });

  test('renders week view correctly', () => {
    render(<Calendar view={CALENDAR_VIEW_TYPES.WEEK} />);
    
    // Check if the week view has time slots
    expect(screen.getAllByText(/\d+:00/).length).toBeGreaterThan(0);
  });

  test('renders day view correctly', () => {
    render(<Calendar view={CALENDAR_VIEW_TYPES.DAY} />);
    
    // Check if the day view has time slots
    expect(screen.getAllByText(/\d+:00/).length).toBeGreaterThan(0);
  });

  test('renders agenda view correctly', () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    render(
      <Calendar 
        view={CALENDAR_VIEW_TYPES.AGENDA}
        date={testDate}
        events={mockEvents}
      />
    );
    
    // Check if the agenda view shows events
    expect(screen.getByText('Team Meeting')).toBeInTheDocument();
  });

  test('renders agenda view with no events message', () => {
    render(<Calendar view={CALENDAR_VIEW_TYPES.AGENDA} events={[]} />);
    
    // Check if the no events message is shown
    expect(screen.getByText('No events to display')).toBeInTheDocument();
  });

  test('handles disabled dates correctly', () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    const disabledDate = new Date(2025, 2, 20); // March 20, 2025
    
    render(
      <Calendar 
        date={testDate}
        disabledDates={[disabledDate]}
        onDateSelect={mockDateSelect}
      />
    );
    
    // Find and click on the disabled date
    const disabledCell = screen.getByText('20');
    fireEvent.click(disabledCell);
    
    // Check that the callback was not called
    expect(mockDateSelect).not.toHaveBeenCalled();
  });

  test('handles min/max date restrictions correctly', () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    const minDate = new Date(2025, 2, 10); // March 10, 2025
    const maxDate = new Date(2025, 2, 20); // March 20, 2025
    
    render(
      <Calendar 
        date={testDate}
        minDate={minDate}
        maxDate={maxDate}
        onDateSelect={mockDateSelect}
      />
    );
    
    // Find and click on a date before minDate (5th)
    const beforeMinCell = screen.getByText('5');
    fireEvent.click(beforeMinCell);
    
    // Check that the callback was not called
    expect(mockDateSelect).not.toHaveBeenCalled();
    
    // Find and click on a date after maxDate (25th)
    const afterMaxCell = screen.getByText('25');
    fireEvent.click(afterMaxCell);
    
    // Check that the callback was not called
    expect(mockDateSelect).not.toHaveBeenCalled();
  });

  test('renders with custom event display mode', () => {
    const testDate = new Date(2025, 2, 15); // March 15, 2025
    
    render(
      <Calendar 
        date={testDate}
        events={mockEvents}
        eventDisplay={CALENDAR_EVENT_DISPLAY.DOT}
      />
    );
    
    // Check that the event title is not displayed
    expect(screen.queryByText('Team Meeting')).not.toBeInTheDocument();
    
    // The dot is rendered using CSS, so we can't directly test for it
    // But we can check that the cell has the has-events class
    const dateCell = screen.getByText('15');
    const cellElement = dateCell.closest('.ui-calendar__cell');
    expect(cellElement).toHaveClass('ui-calendar__cell--has-events');
  });
});
