/**
 * StatusBadge Component
 * 
 * A specialized badge component for displaying activity statuses with consistent styling and behavior.
 * This component extends the Badge component with status-specific features like icons and tooltips.
 * 
 * @example
 * ```jsx
 * // Basic usage with status type
 * <StatusBadge status="in-progress" />
 * 
 * // With custom size
 * <StatusBadge status="completed" size="large" />
 * 
 * // With icon
 * <StatusBadge status="on-hold" showIcon />
 * 
 * // With description tooltip
 * <StatusBadge status="not-started" showDescription />
 * 
 * // As a different element with responsive props
 * <StatusBadge 
 *   as="div"
 *   status="in-progress"
 *   size={{ base: "small", md: "medium" }}
 *   showIcon={{ base: false, md: true }}
 * />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../atoms/Badge/Badge';
import Icon from '../../atoms/Icon/Icon';
import Tooltip from '../../molecules/Tooltip/Tooltip';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { 
  STATUS_BADGE_CLASS, 
  STATUS_TYPES, 
  STATUS_DEFINITIONS,
  STATUS_BADGE_SIZES
} from './constants';
import './StatusBadge.css';

/**
 * StatusBadge Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='span'] - Element to render the StatusBadge as
 * @param {string} props.status - Status type (one of STATUS_TYPES values)
 * @param {string|Object} [props.size='medium'] - Badge size or responsive object
 * @param {boolean|Object} [props.showIcon=false] - Whether to show the status icon or responsive object
 * @param {boolean|Object} [props.showLabel=true] - Whether to show the status label or responsive object
 * @param {boolean|Object} [props.showDescription=false] - Whether to show the status description tooltip or responsive object
 * @param {boolean|Object} [props.pill=true] - Whether the badge should have pill shape or responsive object
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {JSX.Element} StatusBadge component
 */
const StatusBadge = ({
  as = 'span',
  status,
  size = 'medium',
  showIcon = false,
  showLabel = true,
  showDescription = false,
  pill = true,
  className = '',
  style = {},
  children,
  ...props
}) => {
  // Validate status and get status definition
  const statusType = Object.values(STATUS_TYPES).includes(status) ? status : STATUS_TYPES.NOT_STARTED;
  const statusDef = STATUS_DEFINITIONS[statusType];
  
  // Process responsive props
  const responsiveProps = {
    size,
    showIcon,
    showLabel,
    showDescription,
    pill
  };
  
  // Check if any props are responsive objects
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  // Combine class names
  const statusBadgeClasses = [
    STATUS_BADGE_CLASS,
    `${STATUS_BADGE_CLASS}--${statusType}`,
    hasResponsiveProps ? `${STATUS_BADGE_CLASS}--responsive` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Determine if we should show the icon (for non-responsive case)
  const shouldShowIcon = !isResponsiveObject(showIcon) && showIcon;
  
  // Determine if we should show the label (for non-responsive case)
  const shouldShowLabel = !isResponsiveObject(showLabel) && showLabel;
  
  // Create the badge content
  const badgeContent = (
    <>
      {shouldShowIcon && (
        <Icon 
          name={statusDef.icon} 
          className={`${STATUS_BADGE_CLASS}__icon`}
          size={!isResponsiveObject(size) ? size : 'medium'}
        />
      )}
      {shouldShowLabel && (
        <span className={`${STATUS_BADGE_CLASS}__label`}>
          {statusDef.label}
        </span>
      )}
    </>
  );
  
  // Determine if we should show the description tooltip
  const shouldShowDescription = !isResponsiveObject(showDescription) && showDescription;
  
  // Create status badge state object for render props pattern
  const statusBadgeState = {
    // Data
    status: statusType,
    statusDef,
    
    // Configuration
    size,
    showIcon,
    showLabel,
    showDescription,
    pill,
    hasResponsiveProps,
    
    // Computed values
    shouldShowIcon,
    shouldShowLabel,
    shouldShowDescription,
    
    // Utilities
    getStatusDefinition: (statusType) => STATUS_DEFINITIONS[statusType],
    getStatusVariant: (statusType) => STATUS_DEFINITIONS[statusType].variant,
    getStatusColor: (statusType) => STATUS_DEFINITIONS[statusType].color,
    getStatusIcon: (statusType) => STATUS_DEFINITIONS[statusType].icon,
    getStatusLabel: (statusType) => STATUS_DEFINITIONS[statusType].label,
    getStatusDescription: (statusType) => STATUS_DEFINITIONS[statusType].description
  };
  
  // Check if children is a function (render props pattern)
  const isRenderProps = typeof children === 'function';
  
  // If using render props, pass the state to the children function
  if (isRenderProps) {
    return children(statusBadgeState);
  }
  
  // Standard rendering
  
  // Create the badge with or without tooltip
  const badge = (
    <Badge
      as={as}
      variant={statusDef.variant}
      size={size}
      pill={pill}
      className={statusBadgeClasses}
      style={{
        ...style,
        '--status-color': statusDef.color
      }}
      {...props}
    >
      {badgeContent}
    </Badge>
  );
  
  // Wrap with tooltip if description should be shown
  if (shouldShowDescription) {
    return (
      <Tooltip content={statusDef.description}>
        {badge}
      </Tooltip>
    );
  }
  
  return badge;
};

StatusBadge.propTypes = {
  /** Element to render the StatusBadge as */
  ...polymorphicPropTypes,
  /** Status type */
  status: PropTypes.oneOf(Object.values(STATUS_TYPES)).isRequired,
  /** Badge size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(STATUS_BADGE_SIZES)),
    PropTypes.object,
  ]),
  /** Whether to show the status icon or responsive object */
  showIcon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Whether to show the status label or responsive object */
  showLabel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Whether to show the status description tooltip or responsive object */
  showDescription: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Whether the badge should have pill shape or responsive object */
  pill: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** 
   * StatusBadge content or render props function
   * When a function is provided, it receives the status badge state object
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

StatusBadge.defaultProps = {
  as: 'span',
  size: 'medium',
  showIcon: false,
  showLabel: true,
  showDescription: false,
  pill: true,
  className: '',
  style: {},
};

export default StatusBadge;
