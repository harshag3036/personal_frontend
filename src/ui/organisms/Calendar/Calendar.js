/**
 * Calendar Component
 * 
 * A flexible calendar component that supports multiple views, event display,
 * and date selection.
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Button, Icon, Flex } from '../../atoms';
import { 
  CALENDAR_VIEW_TYPES,
  CALENDAR_SIZES,
  CALENDAR_VARIANTS,
  CALENDAR_EVENT_DISPLAY,
  CALENDAR_SELECTION_MODES,
  CALENDAR_FIRST_DAY,
  CALENDAR_MODIFIERS
} from './constants';
import './Calendar.css';

/**
 * Helper functions for date manipulation
 */
const getMonthName = (date) => {
  return date.toLocaleString('default', { month: 'long' });
};

const getWeekdayNames = (firstDayOfWeek) => {
  const weekdays = [];
  const date = new Date();
  const day = date.getDay();
  
  date.setDate(date.getDate() - day + firstDayOfWeek);
  
  for (let i = 0; i < 7; i++) {
    weekdays.push(date.toLocaleString('default', { weekday: 'short' }));
    date.setDate(date.getDate() + 1);
  }
  
  return weekdays;
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month, firstDayOfWeek) => {
  const firstDay = new Date(year, month, 1).getDay();
  return (7 + firstDay - firstDayOfWeek) % 7;
};

const isSameDay = (date1, date2) => {
  return date1 && date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

const isDateInRange = (date, startDate, endDate) => {
  if (!startDate || !endDate) return false;
  
  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
};

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Calendar Component
 */
const Calendar = ({
  date: initialDate,
  events = [],
  view: initialView = CALENDAR_VIEW_TYPES.MONTH,
  size = CALENDAR_SIZES.MEDIUM,
  variant = CALENDAR_VARIANTS.DEFAULT,
  eventDisplay = CALENDAR_EVENT_DISPLAY.BLOCK,
  selectionMode = CALENDAR_SELECTION_MODES.NONE,
  selectedDates = [],
  onDateSelect,
  onEventClick,
  onViewChange,
  onNavigate,
  minDate,
  maxDate,
  disabledDates = [],
  firstDayOfWeek = CALENDAR_FIRST_DAY.SUNDAY,
  showWeekends = true,
  showAdjacentMonths = true,
  maxEventsPerDay = 3,
  eventRenderer,
  headerToolbar = true,
  viewToolbar = true,
  views = Object.values(CALENDAR_VIEW_TYPES),
  className,
  ...props
}) => {
  // State
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [currentView, setCurrentView] = useState(initialView);
  const [selected, setSelected] = useState(Array.isArray(selectedDates) ? selectedDates : [selectedDates].filter(Boolean));
  
  // Derived state
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  
  // Update state when props change
  useEffect(() => {
    if (initialDate) {
      setCurrentDate(initialDate);
    }
  }, [initialDate]);
  
  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);
  
  useEffect(() => {
    setSelected(Array.isArray(selectedDates) ? selectedDates : [selectedDates].filter(Boolean));
  }, [selectedDates]);
  
  // Navigation handlers
  const navigateToPrev = useCallback(() => {
    let newDate;
    
    switch (currentView) {
      case CALENDAR_VIEW_TYPES.MONTH:
        newDate = new Date(year, month - 1, 1);
        break;
      case CALENDAR_VIEW_TYPES.WEEK:
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        break;
      case CALENDAR_VIEW_TYPES.DAY:
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        break;
      default:
        newDate = new Date(year, month - 1, 1);
    }
    
    setCurrentDate(newDate);
    onNavigate && onNavigate(newDate, 'prev');
  }, [currentDate, currentView, month, onNavigate, year]);
  
  const navigateToNext = useCallback(() => {
    let newDate;
    
    switch (currentView) {
      case CALENDAR_VIEW_TYPES.MONTH:
        newDate = new Date(year, month + 1, 1);
        break;
      case CALENDAR_VIEW_TYPES.WEEK:
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        break;
      case CALENDAR_VIEW_TYPES.DAY:
        newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        break;
      default:
        newDate = new Date(year, month + 1, 1);
    }
    
    setCurrentDate(newDate);
    onNavigate && onNavigate(newDate, 'next');
  }, [currentDate, currentView, month, onNavigate, year]);
  
  const navigateToToday = useCallback(() => {
    const newDate = new Date();
    setCurrentDate(newDate);
    onNavigate && onNavigate(newDate, 'today');
  }, [onNavigate]);
  
  // View change handler
  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
    onViewChange && onViewChange(view);
  }, [onViewChange]);
  
  // Date selection handler
  const handleDateSelect = useCallback((date) => {
    if (!onDateSelect) return;
    
    let newSelected;
    
    switch (selectionMode) {
      case CALENDAR_SELECTION_MODES.SINGLE:
        newSelected = [date];
        break;
      case CALENDAR_SELECTION_MODES.MULTIPLE:
        newSelected = [...selected];
        const existingIndex = newSelected.findIndex(d => isSameDay(d, date));
        
        if (existingIndex >= 0) {
          newSelected.splice(existingIndex, 1);
        } else {
          newSelected.push(date);
        }
        break;
      case CALENDAR_SELECTION_MODES.RANGE:
        if (selected.length === 0 || selected.length === 2) {
          newSelected = [date];
        } else {
          const startDate = selected[0];
          newSelected = startDate < date ? [startDate, date] : [date, startDate];
        }
        break;
      default:
        newSelected = [];
    }
    
    setSelected(newSelected);
    onDateSelect(newSelected, date);
  }, [onDateSelect, selected, selectionMode]);
  
  // Event click handler
  const handleEventClick = useCallback((event, e) => {
    e.stopPropagation();
    onEventClick && onEventClick(event);
  }, [onEventClick]);
  
  // Check if a date is disabled
  const isDateDisabled = useCallback((date) => {
    if (!date) return false;
    
    // Check min/max dates
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    
    // Check explicitly disabled dates
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  }, [disabledDates, maxDate, minDate]);
  
  // Get events for a specific date
  const getEventsForDate = useCallback((date) => {
    if (!date || !events.length) return [];
    
    return events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = event.end ? new Date(event.end) : new Date(eventStart);
      
      // For all-day events or events spanning multiple days
      if (event.allDay) {
        return isDateInRange(date, eventStart, eventEnd);
      }
      
      // For regular events, check if the date matches
      return isSameDay(date, eventStart);
    });
  }, [events]);
  
  // Render month view
  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonthIndex = getFirstDayOfMonth(year, month, firstDayOfWeek);
    const weekdayNames = getWeekdayNames(firstDayOfWeek);
    
    // Calculate days from previous month to display
    const prevMonthDays = [];
    if (showAdjacentMonths && firstDayOfMonthIndex > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
      
      for (let i = 0; i < firstDayOfMonthIndex; i++) {
        const day = daysInPrevMonth - firstDayOfMonthIndex + i + 1;
        const date = new Date(prevMonthYear, prevMonth, day);
        prevMonthDays.push({ date, outsideMonth: true });
      }
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      currentMonthDays.push({ date, outsideMonth: false });
    }
    
    // Calculate days from next month to display
    const nextMonthDays = [];
    if (showAdjacentMonths) {
      const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length;
      const remainingCells = 42 - totalDaysDisplayed; // 6 rows of 7 days
      
      if (remainingCells > 0) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextMonthYear = month === 11 ? year + 1 : year;
        
        for (let day = 1; day <= remainingCells; day++) {
          const date = new Date(nextMonthYear, nextMonth, day);
          nextMonthDays.push({ date, outsideMonth: true });
        }
      }
    }
    
    // Combine all days
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    
    return (
      <div className="ui-calendar__month-view">
        <div className="ui-calendar__weekdays">
          {weekdayNames.map((weekday, index) => (
            <div key={index} className="ui-calendar__weekday">
              {weekday}
            </div>
          ))}
        </div>
        
        <div className="ui-calendar__grid">
          {allDays.map(({ date, outsideMonth }, index) => {
            const dateEvents = getEventsForDate(date);
            const isToday = isSameDay(date, today);
            const isSelected = selected.some(selectedDate => isSameDay(selectedDate, date));
            const isRangeStart = selectionMode === CALENDAR_SELECTION_MODES.RANGE && 
              selected.length === 2 && isSameDay(date, selected[0]);
            const isRangeEnd = selectionMode === CALENDAR_SELECTION_MODES.RANGE && 
              selected.length === 2 && isSameDay(date, selected[1]);
            const isInRange = selectionMode === CALENDAR_SELECTION_MODES.RANGE && 
              selected.length === 2 && isDateInRange(date, selected[0], selected[1]) &&
              !isRangeStart && !isRangeEnd;
            const isWeekendDay = isWeekend(date);
            const disabled = isDateDisabled(date) || (isWeekendDay && !showWeekends);
            
            const cellClassNames = [
              'ui-calendar__cell',
              outsideMonth ? 'ui-calendar__cell--outside-month' : '',
              isToday ? 'ui-calendar__cell--today' : '',
              isSelected ? 'ui-calendar__cell--selected' : '',
              isRangeStart ? 'ui-calendar__cell--range-start' : '',
              isRangeEnd ? 'ui-calendar__cell--range-end' : '',
              isInRange ? 'ui-calendar__cell--range-middle' : '',
              disabled ? 'ui-calendar__cell--disabled' : '',
              isWeekendDay ? 'ui-calendar__cell--weekend' : '',
              dateEvents.length > 0 ? 'ui-calendar__cell--has-events' : ''
            ].filter(Boolean).join(' ');
            
            return (
              <div
                key={index}
                className={cellClassNames}
                onClick={() => !disabled && handleDateSelect(date)}
              >
                {date.getDate()}
                
                {dateEvents.length > 0 && eventDisplay !== CALENDAR_EVENT_DISPLAY.DOT && (
                  <div className="ui-calendar__events">
                    {dateEvents.slice(0, maxEventsPerDay).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`ui-calendar__event ${eventDisplay === CALENDAR_EVENT_DISPLAY.CUSTOM ? 'ui-calendar__event--custom' : ''}`}
                        style={{ backgroundColor: event.color }}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        {eventDisplay === CALENDAR_EVENT_DISPLAY.CUSTOM && eventRenderer ? (
                          eventRenderer(event)
                        ) : (
                          event.title
                        )}
                      </div>
                    ))}
                    
                    {dateEvents.length > maxEventsPerDay && (
                      <div className="ui-calendar__more-events">
                        +{dateEvents.length - maxEventsPerDay} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render week view
  const renderWeekView = () => {
    // Clone current date and set to the start of the week
    const startOfWeek = new Date(currentDate);
    const currentDay = startOfWeek.getDay();
    const diff = (currentDay - firstDayOfWeek + 7) % 7;
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    
    // Generate array of dates for the week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      weekDates.push(date);
    }
    
    // Generate time slots
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(new Date(year, month, currentDate.getDate(), hour));
    }
    
    return (
      <div className="ui-calendar__week-view">
        <div className="ui-calendar__week-header">
          <div></div> {/* Empty cell for time column */}
          {weekDates.map((date, index) => {
            const isToday = isSameDay(date, today);
            const isWeekendDay = isWeekend(date);
            
            return (
              <div 
                key={index} 
                className={`ui-calendar__week-day ${isToday ? 'ui-calendar__week-day--today' : ''} ${isWeekendDay ? 'ui-calendar__week-day--weekend' : ''}`}
              >
                <span className="ui-calendar__week-day-name">
                  {date.toLocaleString('default', { weekday: 'short' })}
                </span>
                <span className="ui-calendar__week-day-date">
                  {date.getDate()}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="ui-calendar__week-body">
          <div className="ui-calendar__week-times">
            {timeSlots.map((time, index) => (
              <div key={index} className="ui-calendar__week-time">
                {time.getHours()}:00
              </div>
            ))}
          </div>
          
          <div className="ui-calendar__week-grid">
            {weekDates.map((date, dateIndex) => {
              const isWeekendDay = isWeekend(date);
              const disabled = isDateDisabled(date) || (isWeekendDay && !showWeekends);
              
              return (
                <div 
                  key={dateIndex} 
                  className={`ui-calendar__week-column ${disabled ? 'ui-calendar__week-column--disabled' : ''}`}
                >
                  {timeSlots.map((time, timeIndex) => {
                    const slotDate = new Date(date);
                    slotDate.setHours(time.getHours());
                    
                    // Get events that start in this time slot
                    const slotEvents = events.filter(event => {
                      const eventStart = new Date(event.start);
                      return isSameDay(slotDate, eventStart) && 
                        eventStart.getHours() === slotDate.getHours();
                    });
                    
                    return (
                      <div 
                        key={timeIndex} 
                        className="ui-calendar__week-slot"
                        onClick={() => !disabled && handleDateSelect(slotDate)}
                      >
                        {slotEvents.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="ui-calendar__event"
                            style={{ backgroundColor: event.color }}
                            onClick={(e) => handleEventClick(event, e)}
                          >
                            {formatTime(new Date(event.start))} {event.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  // Render day view
  const renderDayView = () => {
    // Generate time slots
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(new Date(year, month, currentDate.getDate(), hour));
    }
    
    // Get events for the current day
    const dayEvents = getEventsForDate(currentDate);
    
    return (
      <div className="ui-calendar__day-view">
        <div className="ui-calendar__day-header">
          <Text variant="h3">
            {currentDate.toLocaleDateString('default', { weekday: 'long' })}, {currentDate.getDate()}
          </Text>
        </div>
        
        <div className="ui-calendar__day-body">
          {timeSlots.map((time, index) => {
            const slotDate = new Date(currentDate);
            slotDate.setHours(time.getHours());
            
            // Get events that start in this time slot
            const slotEvents = dayEvents.filter(event => {
              const eventStart = new Date(event.start);
              return eventStart.getHours() === slotDate.getHours();
            });
            
            return (
              <div 
                key={index} 
                className="ui-calendar__day-slot"
                onClick={() => handleDateSelect(slotDate)}
              >
                <div className="ui-calendar__day-time">
                  {time.getHours()}:00
                </div>
                
                <div className="ui-calendar__day-events">
                  {slotEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="ui-calendar__event"
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      {formatTime(new Date(event.start))} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render agenda view
  const renderAgendaView = () => {
    // Group events by date
    const eventsByDate = {};
    
    events.forEach(event => {
      const eventDate = new Date(event.start);
      const dateKey = eventDate.toISOString().split('T')[0];
      
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      
      eventsByDate[dateKey].push(event);
    });
    
    // Sort dates
    const sortedDates = Object.keys(eventsByDate).sort();
    
    return (
      <div className="ui-calendar__agenda-view">
        {sortedDates.map(dateKey => {
          const date = new Date(dateKey);
          const dateEvents = eventsByDate[dateKey];
          
          return (
            <div key={dateKey} className="ui-calendar__agenda-day">
              <div className="ui-calendar__agenda-date">
                {date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              
              <div className="ui-calendar__agenda-events">
                {dateEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className="ui-calendar__agenda-event"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="ui-calendar__agenda-time">
                      {event.allDay ? 'All day' : formatTime(new Date(event.start))}
                    </div>
                    <div 
                      className="ui-calendar__agenda-title"
                      style={{ color: event.color }}
                    >
                      {event.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {sortedDates.length === 0 && (
          <Box padding="md" textAlign="center">
            <Text color="text-muted">No events to display</Text>
          </Box>
        )}
      </div>
    );
  };
  
  // Render the appropriate view
  const renderView = () => {
    switch (currentView) {
      case CALENDAR_VIEW_TYPES.WEEK:
        return renderWeekView();
      case CALENDAR_VIEW_TYPES.DAY:
        return renderDayView();
      case CALENDAR_VIEW_TYPES.AGENDA:
        return renderAgendaView();
      case CALENDAR_VIEW_TYPES.MONTH:
      default:
        return renderMonthView();
    }
  };
  
  // Get title based on current view and date
  const getTitle = () => {
    switch (currentView) {
      case CALENDAR_VIEW_TYPES.MONTH:
        return `${getMonthName(currentDate)} ${year}`;
      case CALENDAR_VIEW_TYPES.WEEK:
        const startOfWeek = new Date(currentDate);
        const currentDay = startOfWeek.getDay();
        const diff = (currentDay - firstDayOfWeek + 7) % 7;
        startOfWeek.setDate(startOfWeek.getDate() - diff);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        
        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
          return `${getMonthName(startOfWeek)} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${year}`;
        } else {
          return `${startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })}, ${year}`;
        }
      case CALENDAR_VIEW_TYPES.DAY:
        return currentDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      case CALENDAR_VIEW_TYPES.AGENDA:
        return 'Agenda';
      default:
        return `${getMonthName(currentDate)} ${year}`;
    }
  };
  
  // Component classes
  const calendarClasses = [
    'ui-calendar',
    `ui-calendar--${variant}`,
    `ui-calendar--${size}`,
    className
  ].filter(Boolean).join(' ');
  
  // Create a calendar context object with all state and handlers
  const calendarContext = {
    // State
    currentDate,
    currentView,
    selected,
    events,
    year,
    month,
    today,
    
    // View information
    views,
    
    // Handlers
    navigateToPrev,
    navigateToNext,
    navigateToToday,
    handleViewChange,
    handleDateSelect,
    handleEventClick,
    
    // Helper functions
    isDateDisabled,
    getEventsForDate,
    isSameDay,
    isDateInRange,
    isWeekend,
    formatTime,
    getMonthName,
    getWeekdayNames,
    getTitle,
    
    // Render methods
    renderMonthView,
    renderWeekView,
    renderDayView,
    renderAgendaView,
    renderView
  };
  
  // Check if children is a function (render props pattern)
  if (typeof props.children === 'function') {
    return (
      <div className={calendarClasses}>
        {props.children(calendarContext)}
      </div>
    );
  }
  
  // Default rendering if not using render props
  return (
    <div className={calendarClasses} {...props}>
      {headerToolbar && (
        <div className="ui-calendar__header">
          <Text as="h2" className="ui-calendar__title">{getTitle()}</Text>
          
          <div className="ui-calendar__navigation">
            <Button 
              variant="text" 
              size="sm" 
              className="ui-calendar__nav-button"
              onClick={navigateToToday}
            >
              Today
            </Button>
            
            <Button 
              variant="icon" 
              size="sm" 
              className="ui-calendar__nav-button"
              onClick={navigateToPrev}
              aria-label="Previous"
            >
              <Icon name="chevron-left" />
            </Button>
            
            <Button 
              variant="icon" 
              size="sm" 
              className="ui-calendar__nav-button"
              onClick={navigateToNext}
              aria-label="Next"
            >
              <Icon name="chevron-right" />
            </Button>
          </div>
        </div>
      )}
      
      {viewToolbar && views.length > 1 && (
        <div className="ui-calendar__toolbar">
          <div className="ui-calendar__view-selector">
            {views.map(view => (
              <Button
                key={view}
                variant={currentView === view ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleViewChange(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {renderView()}
    </div>
  );
};

Calendar.propTypes = {
  /** 
   * Optional children as a render prop function that receives the calendar context
   * and returns React elements
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  /** The initial date to display */
  date: PropTypes.instanceOf(Date),
  /** Array of events to display */
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    allDay: PropTypes.bool,
    color: PropTypes.string,
    // Additional custom properties can be added
  })),
  /** The initial view to display */
  view: PropTypes.oneOf(Object.values(CALENDAR_VIEW_TYPES)),
  /** The size of the calendar */
  size: PropTypes.oneOf(Object.values(CALENDAR_SIZES)),
  /** The visual variant of the calendar */
  variant: PropTypes.oneOf(Object.values(CALENDAR_VARIANTS)),
  /** How events should be displayed */
  eventDisplay: PropTypes.oneOf(Object.values(CALENDAR_EVENT_DISPLAY)),
  /** The date selection mode */
  selectionMode: PropTypes.oneOf(Object.values(CALENDAR_SELECTION_MODES)),
  /** Array of selected dates */
  selectedDates: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date))
  ]),
  /** Callback when a date is selected */
  onDateSelect: PropTypes.func,
  /** Callback when an event is clicked */
  onEventClick: PropTypes.func,
  /** Callback when the view is changed */
  onViewChange: PropTypes.func,
  /** Callback when navigation occurs */
  onNavigate: PropTypes.func,
  /** Minimum selectable date */
  minDate: PropTypes.instanceOf(Date),
  /** Maximum selectable date */
  maxDate: PropTypes.instanceOf(Date),
  /** Array of disabled dates */
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** First day of the week (0 = Sunday, 1 = Monday) */
  firstDayOfWeek: PropTypes.oneOf(Object.values(CALENDAR_FIRST_DAY)),
  /** Whether to show weekends */
  showWeekends: PropTypes.bool,
  /** Whether to show days from adjacent months */
  showAdjacentMonths: PropTypes.bool,
  /** Maximum number of events to display per day */
  maxEventsPerDay: PropTypes.number,
  /** Custom event renderer function */
  eventRenderer: PropTypes.func,
  /** Whether to show the header toolbar */
  headerToolbar: PropTypes.bool,
  /** Whether to show the view toolbar */
  viewToolbar: PropTypes.bool,
  /** Available views to display in the toolbar */
  views: PropTypes.arrayOf(PropTypes.oneOf(Object.values(CALENDAR_VIEW_TYPES))),
  /** Additional class name */
  className: PropTypes.string,
};

export default Calendar;
