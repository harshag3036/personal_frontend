/**
 * Spinner Component
 * 
 * A customizable loading spinner component with support for different variants, sizes, speeds, and label positions.
 * The Spinner component is used to indicate loading states and provide visual feedback during async operations.
 * 
 * @example
 * // Basic usage
 * <Spinner />
 * 
 * // With variant and size
 * <Spinner variant="primary" size="large" />
 * 
 * // With label
 * <Spinner label="Loading..." labelPosition="right" />
 * 
 * // Fullscreen spinner
 * <Spinner fullscreen label="Loading application..." />
 * 
 * // With responsive props
 * <Spinner size={{ base: 'small', md: 'medium', lg: 'large' }} />
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import {
  SPINNER_CLASS,
  SPINNER_VARIANTS,
  SPINNER_SIZES,
  SPINNER_SPEEDS,
  SPINNER_LABEL_POSITIONS,
} from './constants';
import './Spinner.css';

const Spinner = React.forwardRef(function Spinner(props, ref) {
  const {
    as: Element = 'div',
    className,
    style,
    variant = SPINNER_VARIANTS.PRIMARY,
    size = SPINNER_SIZES.MEDIUM,
    speed = SPINNER_SPEEDS.MEDIUM,
    label,
    labelPosition = SPINNER_LABEL_POSITIONS.RIGHT,
    fullscreen = false,
    ariaLabel = 'Loading',
    ...rest
  } = props;

  // Process responsive props
  const responsiveProps = {
    variant,
    size,
    speed,
    labelPosition,
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
    
    if (isResponsiveObject(speed)) {
      responsiveClasses.speed = speed;
    }
    
    if (isResponsiveObject(labelPosition)) {
      responsiveClasses.labelPosition = labelPosition;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }

  // Determine base classes based on non-responsive props
  const baseVariantClass = !isResponsiveObject(variant) ? `${SPINNER_CLASS}--${variant.toLowerCase()}` : '';
  const baseSizeClass = !isResponsiveObject(size) ? `${SPINNER_CLASS}--${size.toLowerCase()}` : '';
  const baseSpeedClass = !isResponsiveObject(speed) ? `${SPINNER_CLASS}--${speed.toLowerCase()}` : '';
  const baseLabelPositionClass = !isResponsiveObject(labelPosition) && label ? `${SPINNER_CLASS}--label-${labelPosition.toLowerCase()}` : '';
  
  // Combine class names
  const spinnerClasses = [
    SPINNER_CLASS,
    baseVariantClass,
    baseSizeClass,
    baseSpeedClass,
    label ? `${SPINNER_CLASS}--with-label` : '',
    baseLabelPositionClass,
    fullscreen ? `${SPINNER_CLASS}--fullscreen` : '',
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

  return (
    <Element
      ref={ref}
      className={spinnerClasses}
      style={combinedStyle}
      role="status"
      aria-label={ariaLabel}
      {...rest}
    >
      <div className={`${SPINNER_CLASS}__circle`} />
      {label && <div className={`${SPINNER_CLASS}__label`}>{label}</div>}
    </Element>
  );
});

Spinner.propTypes = {
  /** The HTML element to render the spinner as */
  ...polymorphicPropTypes,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Additional inline styles */
  style: PropTypes.object,
  
  /** The visual style variant of the spinner */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SPINNER_VARIANTS)),
    PropTypes.object, // For responsive props
  ]),
  
  /** The size of the spinner */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SPINNER_SIZES)),
    PropTypes.object, // For responsive props
  ]),
  
  /** The animation speed of the spinner */
  speed: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SPINNER_SPEEDS)),
    PropTypes.object, // For responsive props
  ]),
  
  /** Optional label to display with the spinner */
  label: PropTypes.node,
  
  /** Position of the label relative to the spinner */
  labelPosition: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SPINNER_LABEL_POSITIONS)),
    PropTypes.object, // For responsive props
  ]),
  
  /** Whether the spinner should be displayed fullscreen */
  fullscreen: PropTypes.bool,
  
  /** Accessibility label for screen readers */
  ariaLabel: PropTypes.string,
};

Spinner.defaultProps = {
  as: 'div',
  variant: SPINNER_VARIANTS.PRIMARY,
  size: SPINNER_SIZES.MEDIUM,
  speed: SPINNER_SPEEDS.MEDIUM,
  labelPosition: SPINNER_LABEL_POSITIONS.RIGHT,
  fullscreen: false,
  ariaLabel: 'Loading',
};

export default Spinner;
