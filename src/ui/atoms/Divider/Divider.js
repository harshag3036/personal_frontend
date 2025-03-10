/**
 * Divider Component
 * 
 * A component for visually separating content.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Divider />
 * 
 * // Vertical divider
 * <Divider orientation="vertical" height="100px" />
 * 
 * // Custom styling
 * <Divider color="primary" thickness="2px" margin="lg" />
 * 
 * // With text
 * <Divider withText>Section Title</Divider>
 * 
 * // With responsive props
 * <Divider 
 *   orientation={{ base: "horizontal", md: "vertical" }}
 *   margin={{ base: "sm", md: "md", lg: "lg" }}
 *   height={{ base: "auto", md: "200px" }}
 * />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Box from '../Box';
import { DIVIDER_CLASS, DIVIDER_ORIENTATIONS } from './constants';
import './Divider.css';

/**
 * Divider Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='hr'] - Element to render the Divider as
 * @param {string|Object} [props.orientation='horizontal'] - Orientation of the divider or responsive object
 * @param {string|Object} [props.color='border-medium'] - Color of the divider (from design tokens) or responsive object
 * @param {string|Object} [props.thickness='1px'] - Thickness of the divider or responsive object
 * @param {string|Object} [props.margin='md'] - Margin around the divider or responsive object
 * @param {string|Object} [props.width] - Width of the divider (for horizontal orientation) or responsive object
 * @param {string|Object} [props.height] - Height of the divider (for vertical orientation) or responsive object
 * @param {boolean|Object} [props.withText=false] - Whether the divider has text or responsive object
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {JSX.Element} Divider component
 */
const Divider = ({
  as = 'hr',
  orientation = 'horizontal',
  color = 'border-medium',
  thickness = '1px',
  margin = 'md',
  width,
  height,
  withText = false,
  className = '',
  style = {},
  children,
  ...restProps
}) => {
  // Process responsive props
  const responsiveProps = {
    orientation,
    color,
    thickness,
    margin,
    width,
    height,
    withText,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(orientation)) {
      responsiveClasses.orientation = orientation;
    }
    
    if (isResponsiveObject(color)) {
      responsiveClasses.color = color;
    }
    
    if (isResponsiveObject(thickness)) {
      responsiveClasses.thickness = thickness;
    }
    
    if (isResponsiveObject(margin)) {
      responsiveClasses.margin = margin;
    }
    
    if (isResponsiveObject(width)) {
      responsiveClasses.width = width;
    }
    
    if (isResponsiveObject(height)) {
      responsiveClasses.height = height;
    }
    
    if (isResponsiveObject(withText)) {
      responsiveClasses.withText = withText;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const baseOrientation = !isResponsiveObject(orientation) ? orientation : 'horizontal';
  const baseColor = !isResponsiveObject(color) ? color : 'border-medium';
  const baseThickness = !isResponsiveObject(thickness) ? thickness : '1px';
  const baseMargin = !isResponsiveObject(margin) ? margin : 'md';
  const baseWidth = !isResponsiveObject(width) ? width : undefined;
  const baseHeight = !isResponsiveObject(height) ? height : undefined;
  const baseWithText = !isResponsiveObject(withText) && withText;
  
  // Determine the appropriate styles based on orientation
  const dividerStyle = {
    backgroundColor: `var(--color-${baseColor})`,
    ...(baseOrientation === 'horizontal' ? {
      height: baseThickness,
      width: baseWidth || '100%',
      marginTop: `var(--spacing-${baseMargin})`,
      marginBottom: `var(--spacing-${baseMargin})`,
    } : {
      width: baseThickness,
      height: baseHeight || '100%',
      marginLeft: `var(--spacing-${baseMargin})`,
      marginRight: `var(--spacing-${baseMargin})`,
    }),
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    dividerStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Combine class names
  const dividerClasses = [
    DIVIDER_CLASS,
    `${DIVIDER_CLASS}--${baseOrientation}`,
    baseWithText ? `${DIVIDER_CLASS}--with-text` : '',
    className
  ].filter(Boolean).join(' ');
  
  // If the divider has text, render a div with the text
  if (baseWithText && children) {
    return (
      <div 
        className={dividerClasses}
        style={dividerStyle}
        role="separator"
        aria-orientation={baseOrientation}
        {...restProps}
      >
        {children}
      </div>
    );
  }
  
  // Otherwise, render a Box with the appropriate props
  return (
    <Box 
      as={as}
      className={dividerClasses}
      style={dividerStyle}
      role="separator"
      aria-orientation={baseOrientation}
      {...restProps}
    />
  );
};

Divider.propTypes = {
  /** Element to render the Divider as */
  ...polymorphicPropTypes,
  /** Orientation of the divider or responsive object */
  orientation: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(DIVIDER_ORIENTATIONS)),
    PropTypes.object,
  ]),
  /** Color of the divider (from design tokens) or responsive object */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Thickness of the divider or responsive object */
  thickness: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Margin around the divider or responsive object */
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Width of the divider (for horizontal orientation) or responsive object */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Height of the divider (for vertical orientation) or responsive object */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Whether the divider has text or responsive object */
  withText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Content for divider with text */
  children: PropTypes.node,
};

Divider.defaultProps = {
  as: 'hr',
  orientation: 'horizontal',
  color: 'border-medium',
  thickness: '1px',
  margin: 'md',
  withText: false,
  className: '',
  style: {},
};

export default Divider;
