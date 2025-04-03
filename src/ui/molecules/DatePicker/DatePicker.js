import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import './DatePicker.css';
import { 
  DATEPICKER_VARIANTS, 
  DATEPICKER_SIZES, 
  DATEPICKER_FORMATS,
  DEFAULT_PROPS,
  CLASS_PREFIX
} from './constants';

/**
 * DatePicker Component
 * 
 * A customizable date picker component that allows users to select a date.
 */
const DatePicker = ({
  children,
  id,
  name,
  value,
  onChange,
  onBlur,
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  format = DEFAULT_PROPS.format,
  placeholder = DEFAULT_PROPS.placeholder,
  disabled = DEFAULT_PROPS.disabled,
  readOnly = DEFAULT_PROPS.readOnly,
  required = DEFAULT_PROPS.required,
  clearable = DEFAULT_PROPS.clearable,
  showTodayButton = DEFAULT_PROPS.showTodayButton,
  showWeekNumbers = DEFAULT_PROPS.showWeekNumbers,
  firstDayOfWeek = DEFAULT_PROPS.firstDayOfWeek,
  minDate = DEFAULT_PROPS.minDate,
  maxDate = DEFAULT_PROPS.maxDate,
  className,
  ...restProps
}) => {
  // State for the selected date
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  
  // State for the currently displayed month/year in the calendar
  const [displayDate, setDisplayDate] = useState(selectedDate || new Date());
  
  // State for the calendar visibility
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Ref for the component container (for handling outside clicks)
  const containerRef = useRef(null);

  // Update the selected date when the value prop changes
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Handle outside clicks to close the calendar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isCalendarOpen]);

  // Format the date based on the specified format
  const formatDate = (date) => {
    if (!date) return '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    switch (format) {
      case DATEPICKER_FORMATS.SHORT:
        return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
      case DATEPICKER_FORMATS.MEDIUM:
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[month - 1]} ${day}, ${year}`;
      case DATEPICKER_FORMATS.LONG:
        const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${fullMonthNames[month - 1]} ${day}, ${year}`;
      case DATEPICKER_FORMATS.ISO:
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      default:
        return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    }
  };

  // Toggle the calendar visibility
  const toggleCalendar = () => {
    if (!disabled && !readOnly) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  // Clear the selected date
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange && onChange(null);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    onChange && onChange(date);
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
  };

  // Set the date to today
  const goToToday = () => {
    const today = new Date();
    setDisplayDate(today);
    handleDateSelect(today);
  };

  // Check if a date is selectable (within min/max range)
  const isDateSelectable = (date) => {
    if (minDate && date < new Date(minDate)) return false;
    if (maxDate && date > new Date(maxDate)) return false;
    return true;
  };

  // Generate the days for the current month view
  const generateDays = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeekIndex = firstDay.getDay();
    
    // Adjust for the specified first day of the week
    firstDayOfWeekIndex = (firstDayOfWeekIndex - firstDayOfWeek + 7) % 7;
    
    // Days from the previous month to show
    const prevMonthDays = [];
    if (firstDayOfWeekIndex > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthLastDay = prevMonth.getDate();
      
      for (let i = prevMonthLastDay - firstDayOfWeekIndex + 1; i <= prevMonthLastDay; i++) {
        prevMonthDays.push({
          date: new Date(year, month - 1, i),
          isCurrentMonth: false,
          isSelectable: isDateSelectable(new Date(year, month - 1, i))
        });
      }
    }
    
    // Days from the current month
    const currentMonthDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      currentMonthDays.push({
        date,
        isCurrentMonth: true,
        isSelectable: isDateSelectable(date)
      });
    }
    
    // Days from the next month to show
    const nextMonthDays = [];
    const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = 42 - totalDaysShown; // 6 rows of 7 days
    
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      nextMonthDays.push({
        date,
        isCurrentMonth: false,
        isSelectable: isDateSelectable(date)
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Get the day names for the calendar header
  const getDayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const reorderedDayNames = [
      ...dayNames.slice(firstDayOfWeek),
      ...dayNames.slice(0, firstDayOfWeek)
    ];
    return reorderedDayNames;
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  // Get the month and year display string
  const getMonthYearString = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
  };

  // Generate the CSS classes for the component
  const getClassNames = () => {
    const classes = [
      CLASS_PREFIX,
      `${CLASS_PREFIX}-variant-${variant}`,
      `${CLASS_PREFIX}-size-${size}`
    ];
    
    if (className) {
      classes.push(className);
    }
    
    if (disabled) {
      classes.push(`${CLASS_PREFIX}-disabled`);
    }
    
    return classes.join(' ');
  };
  
  // Create datePickerState object for render props
  const datePickerState = useMemo(() => ({
    // Current state
    selectedDate,
    displayDate,
    isCalendarOpen,
    days: generateDays(),
    dayNames: getDayNames(),
    
    // Formatting
    formattedDate: formatDate(selectedDate),
    monthYearString: getMonthYearString(),
    
    // Configuration
    format,
    variant,
    size,
    disabled,
    readOnly,
    required,
    clearable,
    showTodayButton,
    showWeekNumbers,
    firstDayOfWeek,
    minDate: minDate && new Date(minDate),
    maxDate: maxDate && new Date(maxDate),
    
    // Actions
    selectDate: handleDateSelect,
    clearDate: handleClear,
    toggleCalendar,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    
    // Helper methods
    isToday,
    isSelected,
    isDateSelectable,
    formatDate,
    getWeekNumber,
    
    // Refs
    containerRef,
    
    // CSS Classes
    classNames: getClassNames(),
    
    // Constants
    variants: DATEPICKER_VARIANTS,
    sizes: DATEPICKER_SIZES,
    formats: DATEPICKER_FORMATS
  }), [
    selectedDate,
    displayDate,
    isCalendarOpen,
    format,
    variant,
    size,
    disabled,
    readOnly,
    required,
    clearable,
    showTodayButton,
    showWeekNumbers,
    firstDayOfWeek,
    minDate,
    maxDate
  ]);

  // Check if using render props
  const isRenderProps = isFunction(children);
  
  // If using render props, return children as a function with datePicker state
  if (isRenderProps) {
    return (
      <div 
        ref={containerRef}
        className={getClassNames()}
        {...restProps}
      >
        {children(datePickerState)}
      </div>
    );
  }
  
  // Default rendering
  return (
    <div 
      ref={containerRef}
      className={getClassNames()}
      {...restProps}
    >
      <div className={`${CLASS_PREFIX}-input-wrapper`} onClick={toggleCalendar}>
        <input
          id={id}
          name={name}
          type="text"
          className={`${CLASS_PREFIX}-input`}
          placeholder={placeholder}
          value={formatDate(selectedDate)}
          readOnly
          disabled={disabled}
          required={required}
          onBlur={onBlur}
        />
        
        {selectedDate && clearable && !disabled && !readOnly && (
          <button
            type="button"
            className={`${CLASS_PREFIX}-clear-button`}
            onClick={handleClear}
            aria-label="Clear date"
          >
            ✕
          </button>
        )}
        
        <span className={`${CLASS_PREFIX}-icon`}>
          📅
        </span>
      </div>
      
      {isCalendarOpen && (
        <div className={`${CLASS_PREFIX}-calendar-wrapper`}>
          <div className={`${CLASS_PREFIX}-header`}>
            <button
              type="button"
              className={`${CLASS_PREFIX}-nav-button`}
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              &lt;
            </button>
            
            <div className={`${CLASS_PREFIX}-month-year`}>
              {getMonthYearString()}
            </div>
            
            <button
              type="button"
              className={`${CLASS_PREFIX}-nav-button`}
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              &gt;
            </button>
          </div>
          
          <table className={`${CLASS_PREFIX}-calendar`}>
            <thead>
              <tr>
                {showWeekNumbers && <th>#</th>}
                {getDayNames().map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {generateDays().reduce((rows, day, index) => {
                if (index % 7 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(day);
                return rows;
              }, []).map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {showWeekNumbers && (
                    <td className={`${CLASS_PREFIX}-week-number`}>
                      {getWeekNumber(week[0].date)}
                    </td>
                  )}
                  
                  {week.map((day, dayIndex) => (
                    <td key={dayIndex}>
                      <div
                        className={`
                          ${CLASS_PREFIX}-day
                          ${!day.isCurrentMonth ? `${CLASS_PREFIX}-day-outside-month` : ''}
                          ${isToday(day.date) ? `${CLASS_PREFIX}-day-today` : ''}
                          ${isSelected(day.date) ? `${CLASS_PREFIX}-day-selected` : ''}
                          ${!day.isSelectable ? `${CLASS_PREFIX}-day-disabled` : ''}
                        `}
                        onClick={() => day.isSelectable && handleDateSelect(day.date)}
                      >
                        {day.date.getDate()}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          {showTodayButton && (
            <div className={`${CLASS_PREFIX}-footer`}>
              <button
                type="button"
                className={`${CLASS_PREFIX}-today-button`}
                onClick={goToToday}
              >
                Today
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to get the week number
const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

DatePicker.propTypes = {
  /** 
   * DatePicker content or render props function
   * If a function is provided, it will be called with the datePicker state 
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  
  /** Unique identifier for the input */
  id: PropTypes.string,
  
  /** Name attribute for the input */
  name: PropTypes.string,
  
  /** Selected date value */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  
  /** Callback fired when the date changes */
  onChange: PropTypes.func,
  
  /** Callback fired when the input loses focus */
  onBlur: PropTypes.func,
  
  /** Visual variant of the date picker */
  variant: PropTypes.oneOf(Object.values(DATEPICKER_VARIANTS)),
  
  /** Size variant of the date picker */
  size: PropTypes.oneOf(Object.values(DATEPICKER_SIZES)),
  
  /** Date format to display */
  format: PropTypes.oneOf(Object.values(DATEPICKER_FORMATS)),
  
  /** Placeholder text when no date is selected */
  placeholder: PropTypes.string,
  
  /** Whether the date picker is disabled */
  disabled: PropTypes.bool,
  
  /** Whether the date picker is read-only */
  readOnly: PropTypes.bool,
  
  /** Whether the date picker is required */
  required: PropTypes.bool,
  
  /** Whether to show a clear button */
  clearable: PropTypes.bool,
  
  /** Whether to show a "Today" button */
  showTodayButton: PropTypes.bool,
  
  /** Whether to show week numbers */
  showWeekNumbers: PropTypes.bool,
  
  /** First day of the week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek: PropTypes.number,
  
  /** Minimum selectable date */
  minDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  
  /** Maximum selectable date */
  maxDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  
  /** Additional CSS class */
  className: PropTypes.string
};

export default DatePicker;
