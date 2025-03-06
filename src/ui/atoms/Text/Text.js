import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import './Text.css';

/**
 * Text Component
 * 
 * A component for displaying text with consistent styling.
 * This component extends the Box component with typography-specific properties.
 * 
 * @example
 * ```jsx
 * <Text variant="h1" color="primary">Heading</Text>
 * <Text variant="body1">Regular text content</Text>
 * <Text variant="caption" color="text-secondary">Small caption text</Text>
 * ```
 */
const Text = ({
  children,
  variant = 'body1',
  color = 'text-primary',
  align = 'left',
  weight,
  transform,
  italic = false,
  truncate = false,
  className = '',
  as,
  ...restProps
}) => {
  // Map variant to HTML element if 'as' prop is not provided
  const getElement = () => {
    if (as) return as;
    
    switch (variant) {
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
  
  // Combine styles
  const style = {
    color: `var(--color-${color})`,
    textAlign: align,
    ...(weight && { fontWeight: weight }),
    ...(transform && { textTransform: transform }),
    ...(italic && { fontStyle: 'italic' }),
    ...(truncate && { 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),
  };
  
  // Combine class names
  const textClasses = [
    'ui-text',
    `ui-text-${variant}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Box 
      as={getElement()}
      className={textClasses}
      style={style}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Text.propTypes = {
  /** Text content */
  children: PropTypes.node,
  /** Typography variant */
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'caption', 'overline'
  ]),
  /** Text color (from design tokens) */
  color: PropTypes.string,
  /** Text alignment */
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  /** Font weight */
  weight: PropTypes.oneOf(['normal', 'medium', 'bold']),
  /** Text transform */
  transform: PropTypes.oneOf(['none', 'capitalize', 'uppercase', 'lowercase']),
  /** Italic style */
  italic: PropTypes.bool,
  /** Truncate text with ellipsis */
  truncate: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Override the rendered element */
  as: PropTypes.elementType,
};

export default Text;
