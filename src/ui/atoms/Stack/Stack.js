/**
 * Stack Component
 * 
 * A component for stacking elements vertically or horizontally with consistent spacing.
 * This component is a specialized version of Flex with a simpler API.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // Horizontal stack with alignment
 * <Stack direction="horizontal" spacing="lg" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // With responsive props
 * <Stack 
 *   direction={{ base: "vertical", md: "horizontal" }}
 *   spacing={{ base: "sm", md: "md", lg: "lg" }}
 *   align={{ base: "stretch", md: "center" }}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // With dividers
 * <Stack dividers>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Flex from '../Flex';
import { STACK_CLASS, STACK_DIRECTIONS } from './index';
import './Stack.css';

/**
 * Stack Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as] - Element to render the Stack as (passed to Flex)
 * @param {React.ReactNode} props.children - Stack content
 * @param {string|Object} [props.direction='vertical'] - Stack direction or responsive object
 * @param {string|Object} [props.spacing='md'] - Spacing between items or responsive object
 * @param {string|Object} [props.align='stretch'] - Alignment of items or responsive object
 * @param {string|Object} [props.justify='flex-start'] - Justification of items or responsive object
 * @param {boolean|Object} [props.dividers=false] - Show dividers between items or responsive object
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {JSX.Element} Stack component
 */
const Stack = ({
  as,
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'flex-start',
  dividers = false,
  className = '',
  style = {},
  ...restProps
}) => {
  // Process responsive props
  const responsiveProps = {
    direction,
    spacing,
    align,
    justify,
    dividers,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(direction)) {
      responsiveClasses.direction = direction;
    }
    
    if (isResponsiveObject(spacing)) {
      responsiveClasses.spacing = spacing;
    }
    
    if (isResponsiveObject(align)) {
      responsiveClasses.align = align;
    }
    
    if (isResponsiveObject(justify)) {
      responsiveClasses.justify = justify;
    }
    
    if (isResponsiveObject(dividers)) {
      responsiveClasses.dividers = dividers;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Map direction to flex direction
  const getFlexDirection = (dir) => dir === 'vertical' ? 'column' : 'row';
  
  // Map align to flex align
  const getFlexAlign = (alignValue) => {
    return alignValue === 'start' ? 'flex-start' 
      : alignValue === 'end' ? 'flex-end' 
      : alignValue;
  };
  
  // Map justify to flex justify
  const getFlexJustify = (justifyValue) => {
    return justifyValue === 'start' ? 'flex-start'
      : justifyValue === 'end' ? 'flex-end'
      : justifyValue;
  };
  
  // Determine base values for non-responsive props
  const baseDirection = !isResponsiveObject(direction) ? direction : 'vertical';
  const baseSpacing = !isResponsiveObject(spacing) ? spacing : 'md';
  const baseAlign = !isResponsiveObject(align) ? getFlexAlign(align) : 'stretch';
  const baseJustify = !isResponsiveObject(justify) ? getFlexJustify(justify) : 'flex-start';
  const baseDividers = !isResponsiveObject(dividers) && dividers;
  
  // Determine flex direction based on direction
  const flexDirection = getFlexDirection(baseDirection);
  
  // Combine class names
  const stackClasses = [
    STACK_CLASS,
    `${STACK_CLASS}--${baseDirection}`,
    baseDividers ? `${STACK_CLASS}--dividers` : '',
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
    <Flex
      as={as}
      direction={flexDirection}
      align={baseAlign}
      justify={baseJustify}
      gap={baseSpacing}
      className={stackClasses}
      style={combinedStyle}
      {...restProps}
    >
      {children}
    </Flex>
  );
};

Stack.propTypes = {
  /** Element to render the Stack as */
  ...polymorphicPropTypes,
  /** Stack content */
  children: PropTypes.node,
  /** Stack direction or responsive object */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(STACK_DIRECTIONS)),
    PropTypes.object,
  ]),
  /** Spacing between items or responsive object */
  spacing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Alignment of items or responsive object */
  align: PropTypes.oneOfType([
    PropTypes.oneOf(['stretch', 'start', 'center', 'end', 'baseline', 'flex-start', 'flex-end']),
    PropTypes.object,
  ]),
  /** Justification of items or responsive object */
  justify: PropTypes.oneOfType([
    PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end']),
    PropTypes.object,
  ]),
  /** Show dividers between items or responsive object */
  dividers: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Stack.defaultProps = {
  direction: 'vertical',
  spacing: 'md',
  align: 'stretch',
  justify: 'flex-start',
  dividers: false,
  className: '',
  style: {},
};

export default Stack;
