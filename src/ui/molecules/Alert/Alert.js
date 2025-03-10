/**
 * Alert Component
 * 
 * A customizable alert component for displaying messages, notifications, and feedback to users.
 * Supports different variants, sizes, and can include icons and a close button.
 * 
 * @example
 * // Basic usage
 * <Alert>This is a basic alert</Alert>
 * 
 * // With variant and size
 * <Alert variant="success" size="large">Operation completed successfully!</Alert>
 * 
 * // With title and description
 * <Alert title="Success" variant="success">Your changes have been saved.</Alert>
 * 
 * // With close button
 * <Alert closable onClose={() => console.log('Alert closed')}>Dismissible alert</Alert>
 * 
 * // With custom icon
 * <Alert hasIcon icon={<CustomIcon />}>Alert with custom icon</Alert>
 * 
 * // With responsive props
 * <Alert size={{ base: 'small', md: 'medium', lg: 'large' }}>Responsive alert</Alert>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Icon from '../../atoms/Icon';
import {
  ALERT_CLASS,
  ALERT_VARIANTS,
  ALERT_SIZES,
  ALERT_ICON_POSITIONS,
  ALERT_DEFAULT_PROPS,
} from './constants';
import './Alert.css';

/**
 * Get the appropriate icon for the alert variant
 * 
 * @param {string} variant - The alert variant
 * @returns {string} The icon name
 */
const getIconForVariant = (variant) => {
  switch (variant) {
    case ALERT_VARIANTS.SUCCESS:
      return 'check-circle';
    case ALERT_VARIANTS.WARNING:
      return 'exclamation-triangle';
    case ALERT_VARIANTS.ERROR:
      return 'exclamation-circle';
    case ALERT_VARIANTS.INFO:
    default:
      return 'info-circle';
  }
};

/**
 * Get responsive value for the current breakpoint
 * 
 * @param {Object|any} value - The responsive object or static value
 * @returns {any} The value for the current breakpoint
 */
const getResponsiveValue = (value) => {
  // If the value is not a responsive object, return it as is
  if (!isResponsiveObject(value)) {
    return value;
  }
  
  // For simplicity, we'll just return the base value or the first defined value
  return value.base !== undefined ? value.base : Object.values(value)[0];
};

const Alert = React.forwardRef(function Alert(props, ref) {
  const {
    as: Element = 'div',
    className,
    style,
    variant = ALERT_DEFAULT_PROPS.variant,
    size = ALERT_DEFAULT_PROPS.size,
    iconPosition = ALERT_DEFAULT_PROPS.iconPosition,
    closable = ALERT_DEFAULT_PROPS.closable,
    hasIcon = ALERT_DEFAULT_PROPS.hasIcon,
    icon,
    title,
    children,
    onClose,
    ...rest
  } = props;

  // State for visibility when closable is true
  const [isVisible, setIsVisible] = useState(true);

  // Handle close button click
  const handleClose = (e) => {
    setIsVisible(false);
    if (onClose) {
      onClose(e);
    }
  };

  // If the alert is closed, don't render anything
  if (!isVisible) {
    return null;
  }

  // Process responsive props
  const responsiveProps = {
    variant,
    size,
    iconPosition,
  };

  // Determine base classes based on non-responsive props
  const baseVariantClass = !isResponsiveObject(variant) ? `${ALERT_CLASS}--${getResponsiveValue(variant)}` : '';
  const baseSizeClass = !isResponsiveObject(size) ? `${ALERT_CLASS}--${getResponsiveValue(size)}` : '';
  const baseIconPositionClass = !isResponsiveObject(iconPosition) && hasIcon ? `${ALERT_CLASS}--icon-${getResponsiveValue(iconPosition)}` : '';

  // Combine class names
  const alertClasses = [
    ALERT_CLASS,
    baseVariantClass,
    baseSizeClass,
    baseIconPositionClass,
    className
  ].filter(Boolean).join(' ');

  // Determine the icon to use
  const iconToRender = hasIcon ? (
    icon || <Icon name={getIconForVariant(getResponsiveValue(variant))} />
  ) : null;

  return (
    <Element
      ref={ref}
      className={alertClasses}
      style={style}
      role="alert"
      {...rest}
    >
      {hasIcon && iconToRender && (
        <div className={`${ALERT_CLASS}__icon`}>
          {iconToRender}
        </div>
      )}

      <div className={`${ALERT_CLASS}__content`}>
        {title && (
          <div className={`${ALERT_CLASS}__title`}>{title}</div>
        )}
        <div className={`${ALERT_CLASS}__description`}>{children}</div>
      </div>

      {closable && (
        <button
          type="button"
          className={`${ALERT_CLASS}__close`}
          onClick={handleClose}
          aria-label="Close alert"
        >
          <Icon name="times" size="small" />
        </button>
      )}
    </Element>
  );
});

Alert.propTypes = {
  /** The HTML element to render the alert as */
  ...polymorphicPropTypes,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Additional inline styles */
  style: PropTypes.object,
  
  /** The visual style variant of the alert */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(ALERT_VARIANTS)),
    PropTypes.object, // For responsive props
  ]),
  
  /** The size of the alert */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(ALERT_SIZES)),
    PropTypes.object, // For responsive props
  ]),
  
  /** Position of the icon relative to the content */
  iconPosition: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(ALERT_ICON_POSITIONS)),
    PropTypes.object, // For responsive props
  ]),
  
  /** Whether the alert can be dismissed */
  closable: PropTypes.bool,
  
  /** Whether to show an icon */
  hasIcon: PropTypes.bool,
  
  /** Custom icon to display */
  icon: PropTypes.node,
  
  /** Alert title */
  title: PropTypes.node,
  
  /** Alert content */
  children: PropTypes.node,
  
  /** Callback function when the alert is closed */
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  as: 'div',
  variant: ALERT_DEFAULT_PROPS.variant,
  size: ALERT_DEFAULT_PROPS.size,
  iconPosition: ALERT_DEFAULT_PROPS.iconPosition,
  closable: ALERT_DEFAULT_PROPS.closable,
  hasIcon: ALERT_DEFAULT_PROPS.hasIcon,
};

export default Alert;
