import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import './Divider.css';

/**
 * Divider Component
 * 
 * A component for visually separating content.
 * 
 * @example
 * ```jsx
 * <Divider />
 * ```
 * 
 * @example
 * ```jsx
 * <Divider orientation="vertical" height="100px" />
 * ```
 * 
 * @example
 * ```jsx
 * <Divider color="primary" thickness="2px" margin="lg" />
 * ```
 */
const Divider = ({
  orientation = 'horizontal',
  color = 'border',
  thickness = '1px',
  margin = 'md',
  width,
  height,
  className = '',
  ...restProps
}) => {
  // Determine the appropriate styles based on orientation
  const style = {
    backgroundColor: `var(--color-${color})`,
    ...(orientation === 'horizontal' ? {
      height: thickness,
      width: width || '100%',
      marginTop: `var(--spacing-${margin})`,
      marginBottom: `var(--spacing-${margin})`,
    } : {
      width: thickness,
      height: height || '100%',
      marginLeft: `var(--spacing-${margin})`,
      marginRight: `var(--spacing-${margin})`,
    }),
  };
  
  // Combine class names
  const dividerClasses = [
    'ui-divider',
    `ui-divider-${orientation}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Box 
      as="hr"
      className={dividerClasses}
      style={style}
      role="separator"
      aria-orientation={orientation}
      {...restProps}
    />
  );
};

Divider.propTypes = {
  /** Orientation of the divider */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Color of the divider (from design tokens) */
  color: PropTypes.string,
  /** Thickness of the divider */
  thickness: PropTypes.string,
  /** Margin around the divider (xs, sm, md, lg, xl) */
  margin: PropTypes.string,
  /** Width of the divider (for horizontal orientation) */
  width: PropTypes.string,
  /** Height of the divider (for vertical orientation) */
  height: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Divider;
