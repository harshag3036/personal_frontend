import { BOX_MODIFIERS, BOX_CLASS, BOX_BREAKPOINTS } from './constants';
import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes, VALID_ELEMENTS } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles, layoutPropConfig } from '../../utilities/responsive-props';
import './Box.css';

/**
 * Box Component
 * 
 * A basic layout container with spacing and styling props.
 * This is a fundamental building block for layouts.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Box padding="md" background="background-surface">
 *   Content goes here
 * </Box>
 * 
 * // As another element
 * <Box as="section" padding="lg" background="background-primary">
 *   Section content
 * </Box>
 * 
 * // With responsive props
 * <Box 
 *   padding={{ base: 'sm', md: 'md', lg: 'lg' }}
 *   display={{ base: 'block', md: 'flex' }}
 * >
 *   Responsive content
 * </Box>
 * ```
 */
const Box = ({
  as: Element = 'div',
  children,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  width,
  height,
  display,
  position,
  overflow,
  className = '',
  style = {},
  ...restProps
}) => {
  // Process responsive props
  const responsiveProps = {
    padding,
    margin,
    width,
    height,
    display,
    position,
    overflow,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    responsiveStyles = createResponsiveStyles(responsiveProps, layoutPropConfig);
  }
  
  // Combine all styles
  const combinedStyle = {
    ...(padding && !isResponsiveObject(padding) && { padding: `var(--spacing-${padding})` }),
    ...(margin && !isResponsiveObject(margin) && { margin: `var(--spacing-${margin})` }),
    ...(background && { backgroundColor: `var(--color-${background})` }),
    ...(border && { border: `1px solid var(--color-border-${border})` }),
    ...(borderRadius && { borderRadius: `var(--border-radius-${borderRadius})` }),
    ...(shadow && { boxShadow: `var(--shadow-${shadow})` }),
    ...(width && !isResponsiveObject(width) && { width }),
    ...(height && !isResponsiveObject(height) && { height }),
    ...(display && !isResponsiveObject(display) && { display }),
    ...(position && !isResponsiveObject(position) && { position }),
    ...(overflow && !isResponsiveObject(overflow) && { overflow }),
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    combinedStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Combine class names using BEM convention
  const boxClasses = ['ui-box', className].filter(Boolean).join(' ');
  
  return (
    <Element 
      className={boxClasses}
      style={combinedStyle}
      {...restProps}
    >
      {children}
    </Element>
  );
};

Box.propTypes = {
  /** Element to render the Box as */
  ...polymorphicPropTypes,
  /** Box content */
  children: PropTypes.node,
  /** Padding size (xs, sm, md, lg, xl) or responsive object */
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Margin size (xs, sm, md, lg, xl) or responsive object */
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Background color from design tokens */
  background: PropTypes.string,
  /** Border color from design tokens */
  border: PropTypes.string,
  /** Border radius (sm, md, lg, circle) */
  borderRadius: PropTypes.string,
  /** Box shadow (sm, md, lg) */
  shadow: PropTypes.string,
  /** Width (any valid CSS width) or responsive object */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Height (any valid CSS height) or responsive object */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Display property (flex, block, inline, etc.) or responsive object */
  display: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Position property (relative, absolute, etc.) or responsive object */
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Overflow property (hidden, auto, scroll, etc.) or responsive object */
  overflow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Box.defaultProps = {
  as: 'div',
  className: '',
  style: {},
};

export default Box;
