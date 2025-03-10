import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import Box from '../../atoms/Box';
import Stack from '../../atoms/Stack';
import Text from '../../atoms/Text';
import Icon from '../../atoms/Icon';
import { 
  METRIC_CARD_CLASS, 
  METRIC_CARD_VARIANTS, 
  METRIC_CARD_SIZES 
} from './constants';
import './MetricCard.css';

/**
 * MetricCard Component
 * 
 * A component for displaying metric information with value, label, and optional icon and trend.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <MetricCard
 *   value="85%"
 *   label="Completion Rate"
 * />
 * 
 * // With icon and trend
 * <MetricCard
 *   value="$1,234"
 *   label="Revenue"
 *   icon="analytics"
 *   trend={{
 *     value: "+12%",
 *     direction: "up",
 *     label: "vs last month"
 *   }}
 * />
 * 
 * // With variant and size
 * <MetricCard
 *   value="42"
 *   label="New Users"
 *   variant="success"
 *   size="large"
 * />
 * 
 * // Interactive card
 * <MetricCard
 *   value="8"
 *   label="Pending Tasks"
 *   interactive
 *   onClick={() => console.log('Card clicked')}
 * />
 * 
 * // With responsive props
 * <MetricCard
 *   value="99.9%"
 *   label="Uptime"
 *   size={{ base: "small", md: "medium", lg: "large" }}
 *   variant={{ base: "default", md: "info" }}
 * />
 * ```
 */
const MetricCard = ({
  as,
  value,
  label,
  detail,
  icon,
  iconColor,
  trend,
  variant = 'default',
  size = 'medium',
  interactive = false,
  fullWidth = false,
  className = '',
  style = {},
  onClick,
  ...restProps
}) => {
  // Process responsive props
  const responsiveProps = {
    variant,
    size,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(variant)) {
      responsiveClasses.variant = variant;
    }
    
    if (isResponsiveObject(size)) {
      responsiveClasses.size = size;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const baseVariant = !isResponsiveObject(variant) ? variant : 'default';
  const baseSize = !isResponsiveObject(size) ? size : 'medium';
  
  // Combine class names
  const metricCardClasses = [
    METRIC_CARD_CLASS,
    `${METRIC_CARD_CLASS}--${baseVariant}`,
    `${METRIC_CARD_CLASS}--${baseSize}`,
    interactive ? `${METRIC_CARD_CLASS}--interactive` : '',
    fullWidth ? `${METRIC_CARD_CLASS}--full-width` : '',
    icon ? `${METRIC_CARD_CLASS}--with-icon` : '',
    trend ? `${METRIC_CARD_CLASS}--with-trend` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const combinedStyle = {
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    combinedStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Determine trend direction and color
  const getTrendColor = () => {
    if (!trend) return null;
    
    if (trend.direction === 'up') {
      return 'success';
    } else if (trend.direction === 'down') {
      return 'error';
    }
    
    return 'text-tertiary';
  };
  
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.direction === 'up') {
      return 'arrow-up';
    } else if (trend.direction === 'down') {
      return 'arrow-down';
    }
    
    return 'arrow-right';
  };
  
  const getTrendClass = () => {
    if (!trend) return '';
    
    if (trend.direction === 'up') {
      return `${METRIC_CARD_CLASS}__trend--positive`;
    } else if (trend.direction === 'down') {
      return `${METRIC_CARD_CLASS}__trend--negative`;
    }
    
    return `${METRIC_CARD_CLASS}__trend--neutral`;
  };
  
  return (
    <Box
      as={as}
      className={metricCardClasses}
      style={combinedStyle}
      onClick={interactive ? onClick : undefined}
      {...restProps}
    >
      <div className={`${METRIC_CARD_CLASS}__content`}>
        {icon && (
          <Icon 
            name={icon} 
            color={iconColor} 
            size="md" 
            className={`${METRIC_CARD_CLASS}__icon`}
          />
        )}
        
        <Text 
          variant="h3" 
          className={`${METRIC_CARD_CLASS}__value`}
        >
          {value}
        </Text>
        
        <Text 
          variant="body2" 
          color="text-secondary" 
          className={`${METRIC_CARD_CLASS}__label`}
        >
          {label}
        </Text>
        
        {detail && (
          <Text 
            variant="caption" 
            color="text-tertiary" 
            className={`${METRIC_CARD_CLASS}__detail`}
          >
            {detail}
          </Text>
        )}
        
        {trend && (
          <div className={`${METRIC_CARD_CLASS}__trend ${getTrendClass()}`}>
            {getTrendIcon() && (
              <Icon 
                name={getTrendIcon()} 
                size="sm" 
                className={`${METRIC_CARD_CLASS}__trend-icon`}
              />
            )}
            <span>{trend.value}</span>
            {trend.label && (
              <Text 
                as="span" 
                variant="caption" 
                color="text-tertiary" 
                style={{ marginLeft: 'var(--spacing-1)' }}
              >
                {trend.label}
              </Text>
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

MetricCard.propTypes = {
  /** Element to render the MetricCard as */
  ...polymorphicPropTypes,
  /** The metric value to display */
  value: PropTypes.node.isRequired,
  /** The label for the metric */
  label: PropTypes.node.isRequired,
  /** Optional additional detail text */
  detail: PropTypes.node,
  /** Optional icon name to display */
  icon: PropTypes.string,
  /** Optional color for the icon */
  iconColor: PropTypes.string,
  /** Optional trend information */
  trend: PropTypes.shape({
    /** The trend value (e.g., "+15%") */
    value: PropTypes.node.isRequired,
    /** The direction of the trend: 'up', 'down', or 'neutral' */
    direction: PropTypes.oneOf(['up', 'down', 'neutral']),
    /** Optional label for the trend (e.g., "vs last month") */
    label: PropTypes.node,
  }),
  /** The visual variant of the card */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(METRIC_CARD_VARIANTS)),
    PropTypes.object,
  ]),
  /** The size of the card */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(METRIC_CARD_SIZES)),
    PropTypes.object,
  ]),
  /** Whether the card is interactive (clickable) */
  interactive: PropTypes.bool,
  /** Whether the card should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Click handler for interactive cards */
  onClick: PropTypes.func,
};

MetricCard.defaultProps = {
  variant: 'default',
  size: 'medium',
  interactive: false,
  fullWidth: false,
  className: '',
  style: {},
};

export default MetricCard;
