import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Box from '../Box';
import { TEXT_CLASS, TEXT_VARIANTS, TEXT_SIZES, TEXT_WEIGHTS } from './constants';
import './Text.css';

/**
 * Enhanced Text Component
 * 
 * A typography component with support for variants, responsive props, and theming.
 * This implementation provides consistent typography across the application.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Text>Regular text</Text>
 * 
 * // With variant
 * <Text variant="h1">Heading 1</Text>
 * <Text variant="body">Body text</Text>
 * 
 * // With custom styling
 * <Text color="primary" fontWeight="bold">Emphasized text</Text>
 * 
 * // As another element
 * <Text as="label" htmlFor="input-id">Form label</Text>
 * 
 * // With responsive size
 * <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Responsive text</Text>
 * ```
 */
const Text = ({
  as,
  children,
  variant = TEXT_VARIANTS.BODY,
  size,
  fontSize,
  fontWeight,
  fontStyle,
  fontFamily,
  letterSpacing,
  lineHeight,
  textAlign,
  textDecoration,
  textTransform,
  color,
  opacity,
  truncate,
  noOfLines,
  isTruncated = false, // alias for truncate
  className = '',
  ...restProps
}) => {
  // Process text variant 
  const processedVariant = variant || TEXT_VARIANTS.BODY;
  
  // Determine appropriate html element based on variant if 'as' is not provided
  const defaultElement = getDefaultElement(processedVariant);
  const Element = as || defaultElement;
  
  // Build class names
  const textClasses = [
    TEXT_CLASS,
    `${TEXT_CLASS}--${processedVariant}`,
    (size && !isResponsiveObject(size)) ? `${TEXT_CLASS}--${size}` : '',
    truncate || isTruncated ? `${TEXT_CLASS}--truncate` : '',
    noOfLines ? `${TEXT_CLASS}--clamp` : '',
    className
  ].filter(Boolean).join(' ');
  
  // If using noOfLines, apply line clamp style
  const lineClampStyle = noOfLines ? {
    WebkitLineClamp: noOfLines,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  } : {};
  
  return (
    <Box
      as={Element}
      className={textClasses}
      color={color}
      fontSize={fontSize || size}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      fontFamily={fontFamily}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      textAlign={textAlign}
      textDecoration={textDecoration}
      textTransform={textTransform}
      opacity={opacity}
      data-variant={processedVariant}
      data-truncate={truncate || isTruncated}
      data-no-of-lines={noOfLines}
      style={lineClampStyle}
      {...restProps}
    >
      {children}
    </Box>
  );
};

// Helper to determine default HTML element based on variant
function getDefaultElement(variant) {
  switch (variant) {
    case TEXT_VARIANTS.H1:
      return 'h1';
    case TEXT_VARIANTS.H2:
      return 'h2';
    case TEXT_VARIANTS.H3:
      return 'h3';
    case TEXT_VARIANTS.H4:
      return 'h4';
    case TEXT_VARIANTS.H5:
      return 'h5';
    case TEXT_VARIANTS.H6:
      return 'h6';
    case TEXT_VARIANTS.SUBTITLE:
      return 'h6';
    case TEXT_VARIANTS.BODY:
      return 'p';
    case TEXT_VARIANTS.BODY_SMALL:
      return 'p';
    case TEXT_VARIANTS.CAPTION:
      return 'span';
    case TEXT_VARIANTS.LABEL:
      return 'label';
    case TEXT_VARIANTS.BUTTON:
      return 'span';
    default:
      return 'p';
  }
}

Text.propTypes = {
  /** Element to render the Text as */
  ...polymorphicPropTypes,
  /** Text content */
  children: PropTypes.node,
  /** Text variant (h1, h2, h3, body, etc.) */
  variant: PropTypes.oneOf(Object.values(TEXT_VARIANTS)),
  /** Text size (xs, sm, md, lg, xl) or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXT_SIZES)),
    PropTypes.object, // For responsive sizes
  ]),
  /** Font size (exact size or responsive object) */
  fontSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  /** Font weight (normal, bold, etc.) */
  fontWeight: PropTypes.oneOf(Object.values(TEXT_WEIGHTS)),
  /** Font style (normal, italic, etc.) */
  fontStyle: PropTypes.string,
  /** Font family */
  fontFamily: PropTypes.string,
  /** Letter spacing */
  letterSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Line height */
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Text align (left, center, right, justify) */
  textAlign: PropTypes.string,
  /** Text decoration (none, underline, line-through) */
  textDecoration: PropTypes.string,
  /** Text transform (none, uppercase, lowercase, capitalize) */
  textTransform: PropTypes.string,
  /** Text color (using theme tokens) */
  color: PropTypes.string,
  /** Text opacity */
  opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Whether to truncate text with ellipsis */
  truncate: PropTypes.bool,
  /** Number of lines to show before truncating with ellipsis */
  noOfLines: PropTypes.number,
  /** Alias for truncate */
  isTruncated: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

Text.defaultProps = {
  variant: TEXT_VARIANTS.BODY,
  isTruncated: false,
  className: '',
};

export default Text;
