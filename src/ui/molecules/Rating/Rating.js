import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  RATING_SIZES, 
  RATING_VARIANTS, 
  RATING_PRECISION, 
  DEFAULT_MAX_VALUE 
} from './constants';
import Icon from '../../atoms/Icon';
import './Rating.css';

/**
 * Rating Component
 * 
 * A component that allows users to rate items on a scale, typically using stars or other symbols.
 */
const Rating = ({
  value: initialValue = 0,
  onChange,
  size = RATING_SIZES.MEDIUM,
  variant = RATING_VARIANTS.STAR,
  precision = RATING_PRECISION.FULL,
  max = DEFAULT_MAX_VALUE,
  readOnly = false,
  disabled = false,
  showValue = false,
  name,
  className,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [hoverValue, setHoverValue] = useState(-1);
  
  // Determine the icon to use based on the variant
  const getIcon = useCallback((variant) => {
    switch (variant) {
      case RATING_VARIANTS.HEART:
        return 'heart';
      case RATING_VARIANTS.CIRCLE:
        return 'circle';
      case RATING_VARIANTS.STAR:
      default:
        return 'star';
    }
  }, []);
  
  const icon = getIcon(variant);
  
  // Generate the items array
  const items = useMemo(() => {
    return Array.from({ length: max }, (_, index) => index + 1);
  }, [max]);
  
  // Handle mouse enter event
  const handleMouseEnter = (newHoverValue) => {
    if (readOnly || disabled) return;
    setHoverValue(newHoverValue);
  };
  
  // Handle mouse leave event
  const handleMouseLeave = () => {
    if (readOnly || disabled) return;
    setHoverValue(-1);
  };
  
  // Handle click event
  const handleClick = (newValue) => {
    if (readOnly || disabled) return;
    
    // If clicking on the same value, clear the rating
    const updatedValue = newValue === value ? 0 : newValue;
    
    setValue(updatedValue);
    if (onChange) {
      onChange(updatedValue);
    }
  };
  
  // Determine if an item should be filled
  const isFilled = (itemValue) => {
    const ratingValue = hoverValue !== -1 ? hoverValue : value;
    
    if (precision === RATING_PRECISION.HALF) {
      return itemValue <= ratingValue;
    }
    
    return itemValue <= Math.floor(ratingValue);
  };
  
  // Determine if an item should be half-filled
  const isHalf = (itemValue) => {
    if (precision !== RATING_PRECISION.HALF) return false;
    
    const ratingValue = hoverValue !== -1 ? hoverValue : value;
    return itemValue === Math.ceil(ratingValue) && ratingValue % 1 !== 0;
  };
  
  // Build class names
  const classNames = [
    'ui-rating',
    `ui-rating--${size}`,
    `ui-rating--${variant}`,
    disabled && 'ui-rating--disabled',
    readOnly && 'ui-rating--readonly',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={classNames}
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label="Rating"
      {...props}
    >
      {items.map((itemValue) => {
        const filled = isFilled(itemValue);
        const half = isHalf(itemValue);
        
        return (
          <button
            key={itemValue}
            type="button"
            className="ui-rating__item"
            onMouseEnter={() => handleMouseEnter(itemValue)}
            onClick={() => handleClick(itemValue)}
            aria-checked={value === itemValue}
            aria-posinset={itemValue}
            aria-setsize={max}
            role="radio"
            tabIndex={readOnly ? -1 : 0}
            disabled={disabled}
          >
            <span className="ui-rating__label">
              {itemValue} of {max}
            </span>
            <span 
              className={`ui-rating__icon ${filled ? 'ui-rating__icon--filled' : ''} ${half ? 'ui-rating__icon--half' : ''}`}
            >
              <Icon name={icon} />
            </span>
          </button>
        );
      })}
      
      {showValue && (
        <span className="ui-rating__value">
          {value}
        </span>
      )}
      
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={value} 
        />
      )}
    </div>
  );
};

Rating.propTypes = {
  /** The rating value */
  value: PropTypes.number,
  /** Callback fired when the value changes */
  onChange: PropTypes.func,
  /** The size of the rating */
  size: PropTypes.oneOf(Object.values(RATING_SIZES)),
  /** The variant of the rating */
  variant: PropTypes.oneOf(Object.values(RATING_VARIANTS)),
  /** The precision of the rating */
  precision: PropTypes.oneOf(Object.values(RATING_PRECISION)),
  /** The maximum rating value */
  max: PropTypes.number,
  /** If true, the rating will be read-only */
  readOnly: PropTypes.bool,
  /** If true, the rating will be disabled */
  disabled: PropTypes.bool,
  /** If true, the rating value will be displayed */
  showValue: PropTypes.bool,
  /** The name attribute for the hidden input */
  name: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string
};

export default Rating;
