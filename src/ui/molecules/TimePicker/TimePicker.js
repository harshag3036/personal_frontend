import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import Icon from '../../atoms/Icon';
import { 
  TIMEPICKER_VARIANTS, 
  TIMEPICKER_SIZES, 
  TIMEPICKER_FORMATS,
  TIMEPICKER_STEP,
  DEFAULT_PROPS,
  CLASS_PREFIX
} from './constants';
import './TimePicker.css';

/**
 * TimePicker Component
 * 
 * A customizable time picker component that allows users to select a time.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <TimePicker value={new Date()} onChange={handleTimeChange} />
 * 
 * // With different format
 * <TimePicker format={TIMEPICKER_FORMATS.TWENTY_FOUR_HOUR} onChange={handleTimeChange} />
 * 
 * // With seconds and custom step
 * <TimePicker showSeconds step={TIMEPICKER_STEP.MINUTE} onChange={handleTimeChange} />
 * ```
 */
const TimePicker = (props) => {
  const {
    as = 'div',
    className,
    style,
    variant = DEFAULT_PROPS.variant,
    size = DEFAULT_PROPS.size,
    format = DEFAULT_PROPS.format,
    step = DEFAULT_PROPS.step,
    value,
    onChange,
    placeholder = DEFAULT_PROPS.placeholder,
    disabled = DEFAULT_PROPS.disabled,
    readOnly = DEFAULT_PROPS.readOnly,
    required = DEFAULT_PROPS.required,
    clearable = DEFAULT_PROPS.clearable,
    showSeconds = DEFAULT_PROPS.showSeconds,
    showMeridiem = DEFAULT_PROPS.showMeridiem,
    minTime,
    maxTime,
    error,
    errorMessage,
    ...rest
  } = props;

  const Component = as;
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedSecond, setSelectedSecond] = useState(null);
  const [selectedMeridiem, setSelectedMeridiem] = useState('AM');

  // Generate hours based on format
  const hours = format === TIMEPICKER_FORMATS.TWELVE_HOUR
    ? Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i)
    : Array.from({ length: 24 }, (_, i) => i);

  // Generate minutes and seconds based on step
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  // Format time value for display
  const formatTimeValue = (date) => {
    if (!date) return '';
    
    try {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      
      if (format === TIMEPICKER_FORMATS.TWELVE_HOUR) {
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        
        return showSeconds
          ? `${hour12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${meridiem}`
          : `${hour12}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
      } else {
        return showSeconds
          ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    } catch (error) {
      console.error('TimePicker: Error formatting time value:', error);
      return '';
    }
  };

  // Initialize time values from props
  useEffect(() => {
    if (value) {
      try {
        const hours = value.getHours();
        const minutes = value.getMinutes();
        const seconds = value.getSeconds();
        
        if (format === TIMEPICKER_FORMATS.TWELVE_HOUR) {
          setSelectedHour(hours % 12 === 0 ? 12 : hours % 12);
          setSelectedMeridiem(hours >= 12 ? 'PM' : 'AM');
        } else {
          setSelectedHour(hours);
        }
        
        setSelectedMinute(minutes);
        setSelectedSecond(seconds);
        
        // Format the input value
        setInputValue(formatTimeValue(value));
      } catch (error) {
        console.error('TimePicker: Error initializing from value:', error);
        setSelectedHour(null);
        setSelectedMinute(null);
        setSelectedSecond(null);
        setSelectedMeridiem('AM');
        setInputValue('');
      }
    }
  }, [value, format, showSeconds]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    try {
      // Try to parse the input value
      const timeRegex = format === TIMEPICKER_FORMATS.TWELVE_HOUR
        ? showSeconds
          ? /^(\d{1,2}):(\d{1,2}):(\d{1,2})\s*(AM|PM)$/i
          : /^(\d{1,2}):(\d{1,2})\s*(AM|PM)$/i
        : showSeconds
          ? /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/
          : /^(\d{1,2}):(\d{1,2})$/;
      
      const match = e.target.value.match(timeRegex);
      
      if (match) {
        let hours, minutes, seconds = 0, meridiem;
        
        if (format === TIMEPICKER_FORMATS.TWELVE_HOUR) {
          hours = parseInt(match[1], 10);
          minutes = parseInt(match[2], 10);
          
          if (showSeconds) {
            seconds = parseInt(match[3], 10);
            meridiem = match[4].toUpperCase();
          } else {
            meridiem = match[3].toUpperCase();
          }
          
          if (hours === 12) {
            hours = meridiem === 'AM' ? 0 : 12;
          } else if (meridiem === 'PM') {
            hours += 12;
          }
        } else {
          hours = parseInt(match[1], 10);
          minutes = parseInt(match[2], 10);
          
          if (showSeconds) {
            seconds = parseInt(match[3], 10);
          }
        }
        
        // Validate time values
        if (
          hours >= 0 && hours < 24 &&
          minutes >= 0 && minutes < 60 &&
          seconds >= 0 && seconds < 60
        ) {
          const newDate = new Date();
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
          newDate.setSeconds(seconds);
          
          // Check if the time is within the allowed range
          if ((!minTime || newDate >= minTime) && (!maxTime || newDate <= maxTime)) {
            onChange && onChange(newDate);
          }
        }
      }
    } catch (error) {
      console.error('TimePicker: Error parsing input value:', error);
    }
  };

  // Handle time selection
  const handleTimeSelection = () => {
    if (selectedHour === null || selectedMinute === null) return;
    
    try {
      let hours = selectedHour;
      
      if (format === TIMEPICKER_FORMATS.TWELVE_HOUR) {
        if (selectedHour === 12) {
          hours = selectedMeridiem === 'AM' ? 0 : 12;
        } else if (selectedMeridiem === 'PM') {
          hours += 12;
        }
      }
      
      const newDate = new Date();
      newDate.setHours(hours);
      newDate.setMinutes(selectedMinute);
      newDate.setSeconds(selectedSecond || 0);
      
      // Check if the time is within the allowed range
      if ((!minTime || newDate >= minTime) && (!maxTime || newDate <= maxTime)) {
        onChange && onChange(newDate);
        setInputValue(formatTimeValue(newDate));
        setIsOpen(false);
      }
    } catch (error) {
      console.error('TimePicker: Error handling time selection:', error);
    }
  };

  // Handle hour selection
  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    if (selectedMinute !== null) {
      handleTimeSelection();
    }
  };

  // Handle minute selection
  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);
    if (selectedHour !== null) {
      handleTimeSelection();
    }
  };

  // Handle second selection
  const handleSecondSelect = (second) => {
    setSelectedSecond(second);
    if (selectedHour !== null && selectedMinute !== null) {
      handleTimeSelection();
    }
  };

  // Handle meridiem selection
  const handleMeridiemSelect = (meridiem) => {
    setSelectedMeridiem(meridiem);
    if (selectedHour !== null && selectedMinute !== null) {
      handleTimeSelection();
    }
  };

  // Handle now button click
  const handleNowClick = () => {
    try {
      const now = new Date();
      
      // Check if the current time is within the allowed range
      if ((!minTime || now >= minTime) && (!maxTime || now <= maxTime)) {
        onChange && onChange(now);
        setInputValue(formatTimeValue(now));
        setIsOpen(false);
      }
    } catch (error) {
      console.error('TimePicker: Error handling now button click:', error);
    }
  };

  // Handle clear button click
  const handleClearClick = (e) => {
    e.stopPropagation();
    try {
      onChange && onChange(null);
      setInputValue('');
      setSelectedHour(null);
      setSelectedMinute(null);
      setSelectedSecond(null);
      setSelectedMeridiem('AM');
      setIsOpen(false);
    } catch (error) {
      console.error('TimePicker: Error handling clear button click:', error);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Generate class names
  const getClassNames = () => {
    const classes = [
      CLASS_PREFIX,
      `${CLASS_PREFIX}-variant-${variant}`,
      `${CLASS_PREFIX}-size-${size}`
    ];
    
    if (error) {
      classes.push(`${CLASS_PREFIX}-error`);
    }
    
    if (disabled) {
      classes.push(`${CLASS_PREFIX}-disabled`);
    }
    
    if (readOnly) {
      classes.push(`${CLASS_PREFIX}-readonly`);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <Component className={getClassNames()} style={style} {...rest}>
      <div className={`${CLASS_PREFIX}-input-container`} ref={inputRef}>
        <input
          type="text"
          className={`${CLASS_PREFIX}-input`}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onClick={() => !disabled && !readOnly && setIsOpen(true)}
        />
        {inputValue && clearable && !disabled && !readOnly && (
          <button
            type="button"
            className={`${CLASS_PREFIX}-clear-button`}
            onClick={handleClearClick}
            aria-label="Clear time"
          >
            ✕
          </button>
        )}
        <div 
          className={`${CLASS_PREFIX}-icon`}
          onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
        >
          <Icon name="clock" size="sm" />
        </div>
      </div>
      
      {error && errorMessage && (
        <div className={`${CLASS_PREFIX}-error-message`}>{errorMessage}</div>
      )}
      
      {isOpen && !disabled && !readOnly && (
        <div className={`${CLASS_PREFIX}-dropdown`} ref={dropdownRef}>
          <div className={`${CLASS_PREFIX}-section`}>
            {/* Hours column */}
            <div className={`${CLASS_PREFIX}-column`}>
              <div className={`${CLASS_PREFIX}-column-header`}>Hour</div>
              <div className={`${CLASS_PREFIX}-column-value`}>
                {hours.map((hour) => (
                  <div
                    key={`hour-${hour}`}
                    className={`${CLASS_PREFIX}-item ${selectedHour === hour ? `${CLASS_PREFIX}-item-selected` : ''}`}
                    onClick={() => handleHourSelect(hour)}
                  >
                    {hour.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Minutes column */}
            <div className={`${CLASS_PREFIX}-column`}>
              <div className={`${CLASS_PREFIX}-column-header`}>Minute</div>
              <div className={`${CLASS_PREFIX}-column-value`}>
                {minutes.map((minute) => (
                  <div
                    key={`minute-${minute}`}
                    className={`${CLASS_PREFIX}-item ${selectedMinute === minute ? `${CLASS_PREFIX}-item-selected` : ''}`}
                    onClick={() => handleMinuteSelect(minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Seconds column (optional) */}
            {showSeconds && (
              <div className={`${CLASS_PREFIX}-column`}>
                <div className={`${CLASS_PREFIX}-column-header`}>Second</div>
                <div className={`${CLASS_PREFIX}-column-value`}>
                  {seconds.map((second) => (
                    <div
                      key={`second-${second}`}
                      className={`${CLASS_PREFIX}-item ${selectedSecond === second ? `${CLASS_PREFIX}-item-selected` : ''}`}
                      onClick={() => handleSecondSelect(second)}
                    >
                      {second.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* AM/PM column (for 12-hour format) */}
            {format === TIMEPICKER_FORMATS.TWELVE_HOUR && showMeridiem && (
              <div className={`${CLASS_PREFIX}-column`}>
                <div className={`${CLASS_PREFIX}-column-header`}>AM/PM</div>
                <div className={`${CLASS_PREFIX}-column-value`}>
                  <div
                    className={`${CLASS_PREFIX}-item ${selectedMeridiem === 'AM' ? `${CLASS_PREFIX}-item-selected` : ''}`}
                    onClick={() => handleMeridiemSelect('AM')}
                  >
                    AM
                  </div>
                  <div
                    className={`${CLASS_PREFIX}-item ${selectedMeridiem === 'PM' ? `${CLASS_PREFIX}-item-selected` : ''}`}
                    onClick={() => handleMeridiemSelect('PM')}
                  >
                    PM
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className={`${CLASS_PREFIX}-actions`}>
            <button 
              type="button"
              className={`${CLASS_PREFIX}-now-button`}
              onClick={handleNowClick}
            >
              Now
            </button>
            
            {clearable && (
              <button 
                type="button"
                className={`${CLASS_PREFIX}-clear-button`}
                onClick={handleClearClick}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </Component>
  );
};

TimePicker.propTypes = {
  /** Polymorphic component element */
  ...polymorphicPropTypes,
  
  /** Additional class name */
  className: PropTypes.string,
  
  /** Inline styles */
  style: PropTypes.object,
  
  /** TimePicker variant */
  variant: PropTypes.oneOf(Object.values(TIMEPICKER_VARIANTS)),
  
  /** TimePicker size */
  size: PropTypes.oneOf(Object.values(TIMEPICKER_SIZES)),
  
  /** Time format (12-hour or 24-hour) */
  format: PropTypes.oneOf(Object.values(TIMEPICKER_FORMATS)),
  
  /** Time step for minutes */
  step: PropTypes.oneOf(Object.values(TIMEPICKER_STEP)),
  
  /** Selected time value */
  value: PropTypes.instanceOf(Date),
  
  /** Callback when time changes */
  onChange: PropTypes.func.isRequired,
  
  /** Input placeholder */
  placeholder: PropTypes.string,
  
  /** Whether the TimePicker is disabled */
  disabled: PropTypes.bool,
  
  /** Whether the TimePicker is read-only */
  readOnly: PropTypes.bool,
  
  /** Whether the TimePicker is required */
  required: PropTypes.bool,
  
  /** Whether the TimePicker can be cleared */
  clearable: PropTypes.bool,
  
  /** Whether to show seconds */
  showSeconds: PropTypes.bool,
  
  /** Whether to show AM/PM selector (for 12-hour format) */
  showMeridiem: PropTypes.bool,
  
  /** Minimum allowed time */
  minTime: PropTypes.instanceOf(Date),
  
  /** Maximum allowed time */
  maxTime: PropTypes.instanceOf(Date),
  
  /** Whether the TimePicker has an error */
  error: PropTypes.bool,
  
  /** Error message to display */
  errorMessage: PropTypes.string,
};

TimePicker.defaultProps = {
  as: 'div',
  variant: DEFAULT_PROPS.variant,
  size: DEFAULT_PROPS.size,
  format: DEFAULT_PROPS.format,
  step: DEFAULT_PROPS.step,
  placeholder: DEFAULT_PROPS.placeholder,
  disabled: DEFAULT_PROPS.disabled,
  readOnly: DEFAULT_PROPS.readOnly,
  required: DEFAULT_PROPS.required,
  clearable: DEFAULT_PROPS.clearable,
  showSeconds: DEFAULT_PROPS.showSeconds,
  showMeridiem: DEFAULT_PROPS.showMeridiem,
  className: DEFAULT_PROPS.className,
  style: DEFAULT_PROPS.style,
};

export default TimePicker;
