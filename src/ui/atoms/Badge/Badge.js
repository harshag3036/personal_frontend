/**
 * Badge Component
 * 
 * A customizable badge component with support for variants, sizes, and responsive props.
 * This component can be rendered as different HTML elements using the `as` prop.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Badge variant="primary" size="medium">New</Badge>
 * 
 * // As a different element
 * <Badge as="div" variant="success">Completed</Badge>
 * 
 * // With responsive props
 * <Badge 
 *   variant={{ base: "primary", md: "outline" }}
 *   size={{ base: "small", md: "medium" }}
 * >
 *   Responsive Badge
 * </Badge>
 * 
 * // With pill shape
 * <Badge pill variant="warning">Alert</Badge>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import { BADGE_CLASS, BADGE_VARIANTS, BADGE_SIZES } from './constants';
import './Badge.css';

/**
 * Badge Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='span'] - Element to render the Badge as
 * @param {React.ReactNode} props.children - Badge content
 * @param {string|Object} [props.variant='default'] - Badge variant or responsive object
 * @param {string|Object} [props.size='medium'] - Badge size or responsive object
 * @param {boolean|Object} [props.pill=false] - Whether the badge should have pill shape or responsive object
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {JSX.Element} Badge component
 */
const Badge = ({
  as = 'span',
  children,
  variant = 'default',
  size = 'medium',
  pill = false,
  className = '',
  style = {},
  ...props
}) => {
  // Process responsive props
  const responsiveProps = {
    variant,
    size,
    pill,
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
    
    if (isResponsiveObject(pill)) {
      responsiveClasses.pill = pill;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base classes based on non-responsive props
  const baseVariantClass = !isResponsiveObject(variant) ? `${BADGE_CLASS}--${variant}` : '';
  const baseSizeClass = !isResponsiveObject(size) ? `${BADGE_CLASS}--${size}` : '';
  const basePillClass = !isResponsiveObject(pill) && pill ? `${BADGE_CLASS}--pill` : '';
  
  // Combine class names
  const badgeClasses = [
    BADGE_CLASS,
    baseVariantClass,
    baseSizeClass,
    basePillClass,
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
  
  // Determine the element to render
  const Element = as;
  
  return (
    <Element
      className={badgeClasses}
      style={combinedStyle}
      {...props}
    >
      {children || ''}
    </Element>
  );
};

Badge.propTypes = {
  /** Element to render the Badge as */
  ...polymorphicPropTypes,
  /** Badge content */
  children: PropTypes.node,
  /** Badge variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BADGE_VARIANTS)),
    PropTypes.object,
  ]),
  /** Badge size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BADGE_SIZES)),
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
};

Badge.defaultProps = {
  as: 'span',
  variant: 'default',
  size: 'medium',
  pill: false,
  className: '',
  style: {},
};

export default Badge;
