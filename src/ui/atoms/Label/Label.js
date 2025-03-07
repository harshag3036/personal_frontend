import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes, VALID_ELEMENTS } from '../../utilities/polymorphic';
import './Label.css';

/**
 * Label Component
 * 
 * A versatile label component that can be used for form fields, tags, or other labeling needs.
 * This component supports various visual styles and behaviors.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Label htmlFor="email">Email Address</Label>
 * 
 * // With custom variant and size
 * <Label 
 *   htmlFor="password" 
 *   variant="floating" 
 *   size="lg"
 *   required
 * >
 *   Password
 * </Label>
 * 
 * // As a tag
 * <Label 
 *   as="span"
 *   variant="tag"
 *   color="accent-primary"
 * >
 *   New Feature
 * </Label>
 * 
 * // With icon
 * <Label htmlFor="search">
 *   <Icon name="search" />
 *   Search
 * </Label>
 * ```
 */
const Label = ({
  as: Element = 'label',
  children,
  htmlFor,
  variant = 'default',
  size = 'md',
  color,
  required = false,
  disabled = false,
  className = '',
  style = {},
  ...restProps
}) => {
  // Combine all styles
  const combinedStyle = {
    ...(color && { color: `var(--color-${color})` }),
    ...style,
  };
  
  // Combine class names using BEM convention
  const labelClasses = [
    'ui-label',
    `ui-label--${variant}`,
    `ui-label--size-${size}`,
    required && 'ui-label--required',
    disabled && 'ui-label--disabled',
    className
  ].filter(Boolean).join(' ');
  
  // Determine appropriate props based on element type
  const elementProps = Element === 'label' ? { htmlFor } : {};
  
  return (
    <Element 
      className={labelClasses}
      style={combinedStyle}
      {...elementProps}
      {...restProps}
    >
      {children}
    </Element>
  );
};

Label.propTypes = {
  /** Element to render the Label as */
  ...polymorphicPropTypes,
  /** Label content */
  children: PropTypes.node.isRequired,
  /** ID of the form element this label is for */
  htmlFor: PropTypes.string,
  /** Visual variant of the label */
  variant: PropTypes.oneOf(['default', 'floating', 'inline', 'tag', 'badge']),
  /** Size of the label */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Color from design tokens */
  color: PropTypes.string,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the label is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Label.defaultProps = {
  as: 'label',
  variant: 'default',
  size: 'md',
  required: false,
  disabled: false,
  className: '',
  style: {},
};

export default Label;
