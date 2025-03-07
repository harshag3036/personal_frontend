import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes, VALID_ELEMENTS } from '../../utilities/polymorphic';
import './Icon.css';

/**
 * Icon Component
 * 
 * A versatile icon component that supports various icon types, sizes, and colors.
 * This component can be used to display icons throughout the application.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Icon name="user" />
 * 
 * // With custom size and color
 * <Icon name="star" size="lg" color="accent-primary" />
 * 
 * // As another element with additional props
 * <Icon 
 *   as="span"
 *   name="check" 
 *   size="sm" 
 *   color="success"
 *   aria-label="Completed"
 * />
 * ```
 */
const Icon = ({
  as: Element = 'i',
  name,
  size = 'md',
  color,
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
  const iconClasses = [
    'ui-icon',
    `ui-icon--${name}`,
    `ui-icon--size-${size}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Element 
      className={iconClasses}
      style={combinedStyle}
      data-icon={name}
      role="img"
      aria-hidden={!restProps['aria-label']}
      {...restProps}
    >
      {/* Icon content will be rendered via CSS */}
    </Element>
  );
};

Icon.propTypes = {
  /** Element to render the Icon as */
  ...polymorphicPropTypes,
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Size of the icon (xs, sm, md, lg, xl) */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Color of the icon from design tokens */
  color: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Icon.defaultProps = {
  as: 'i',
  size: 'md',
  className: '',
  style: {},
};

export default Icon;
