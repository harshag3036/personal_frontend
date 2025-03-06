import React from 'react';
import PropTypes from 'prop-types';
import Box, { BOX_CLASS } from '../Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import { TEXT_CLASS, TEXT_VARIANTS, TEXT_WEIGHTS, TEXT_TRANSFORMS, TEXT_ALIGNS } from './index';
import './Text.css';

/**
 * Text Component
 * 
 * A component for displaying text with consistent styling.
 * This component extends the Box component with typography-specific properties.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Text variant="h1" color="primary">Heading</Text>
 * <Text variant="body1">Regular text content</Text>
 * <Text variant="caption" color="text-secondary">Small caption text</Text>
 * 
 * // With responsive props
 * <Text 
 *   variant={{ base: "h3", md: "h2", lg: "h1" }}
 *   align={{ base: "left", md: "center" }}
 * >
 *   Responsive Heading
 * </Text>
 * 
 * // With polymorphic as prop
 * <Text as="label" htmlFor="input-id">Form Label</Text>
 * 
 * // With modifiers
 * <Text weight="bold" transform="uppercase" italic truncate>
 *   Styled Text
 * </Text>
 * ```
 */
const Text = ({
  as,
  children,
  variant = 'body1',
  color = 'text-primary',
  align = 'left',
  weight,
  transform,
  italic = false,
  truncate = false,
  className = '',
  style = {},
  ...restProps
}) => {
  // Map variant to HTML element if 'as' prop is not provided
  const getElement = () => {
    if (as) return as;
    
    // If variant is a responsive object, use the base variant or default to 'p'
    const baseVariant = isResponsiveObject(variant) 
      ? (variant.base || 'body1') 
      : variant;
    
    switch (baseVariant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'subtitle1': return 'h6';
      case 'subtitle2': return 'h6';
      case 'body1': return 'p';
      case 'body2': return 'p';
      case 'caption': return 'span';
      case 'overline': return 'span';
      default: return 'p';
    }
  };
  
  // Process responsive props
  const responsiveProps = {
    variant,
    color,
    align,
    weight,
    transform,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    responsiveStyles = createResponsiveStyles(
      {
        variant: isResponsiveObject(variant) ? variant : undefined,
        color: isResponsiveObject(color) ? color : undefined,
        textAlign: isResponsiveObject(align) ? align : undefined,
        fontWeight: isResponsiveObject(weight) ? weight : undefined,
        textTransform: isResponsiveObject(transform) ? transform : undefined,
      },
      {
        variant: { cssProperty: 'font-family' }, // This is a placeholder, we'll handle variant with classes
        color: { 
          cssProperty: 'color',
          transform: value => `var(--color-${value})` 
        },
        textAlign: { cssProperty: 'text-align' },
        fontWeight: { cssProperty: 'font-weight' },
        textTransform: { cssProperty: 'text-transform' },
      }
    );
  }
  
  // Combine styles
  const combinedStyle = {
    ...(color && !isResponsiveObject(color) && { color: `var(--color-${color})` }),
    ...(align && !isResponsiveObject(align) && { textAlign: align }),
    ...(weight && !isResponsiveObject(weight) && { fontWeight: weight }),
    ...(transform && !isResponsiveObject(transform) && { textTransform: transform }),
    ...(italic && { fontStyle: 'italic' }),
    ...(truncate && { 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    combinedStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Combine class names
  const variantClass = !isResponsiveObject(variant) ? `${TEXT_CLASS}-${variant}` : '';
  
  const textClasses = [
    TEXT_CLASS,
    variantClass,
    italic ? `${TEXT_CLASS}--italic` : '',
    truncate ? `${TEXT_CLASS}--truncate` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Add responsive variant classes if needed
  const element = getElement();
  
  return (
    <Box 
      as={element}
      className={textClasses}
      style={combinedStyle}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Text.propTypes = {
  /** Element to render the Text as */
  ...polymorphicPropTypes,
  /** Text content */
  children: PropTypes.node,
  /** Typography variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXT_VARIANTS)),
    PropTypes.object,
  ]),
  /** Text color (from design tokens) or responsive object */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Text alignment or responsive object */
  align: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXT_ALIGNS)),
    PropTypes.object,
  ]),
  /** Font weight or responsive object */
  weight: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXT_WEIGHTS)),
    PropTypes.object,
  ]),
  /** Text transform or responsive object */
  transform: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXT_TRANSFORMS)),
    PropTypes.object,
  ]),
  /** Italic style */
  italic: PropTypes.bool,
  /** Truncate text with ellipsis */
  truncate: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Text.defaultProps = {
  variant: 'body1',
  color: 'text-primary',
  align: 'left',
  italic: false,
  truncate: false,
  className: '',
  style: {},
};

export default Text;
