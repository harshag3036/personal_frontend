import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';

/**
 * Box Component
 * 
 * A basic layout container with spacing and styling props.
 * This is a fundamental building block for layouts.
 * 
 * @example
 * ```jsx
 * <Box padding="md" background="background-surface">
 *   Content goes here
 * </Box>
 * ```
 */
const Box = ({
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
  // Combine all styles
  const combinedStyle = {
    ...(padding && { padding: `var(--spacing-${padding})` }),
    ...(margin && { margin: `var(--spacing-${margin})` }),
    ...(background && { backgroundColor: `var(--color-${background})` }),
    ...(border && { border: `1px solid var(--color-border-${border})` }),
    ...(borderRadius && { borderRadius: `var(--border-radius-${borderRadius})` }),
    ...(shadow && { boxShadow: `var(--shadow-${shadow})` }),
    ...(width && { width }),
    ...(height && { height }),
    ...(display && { display }),
    ...(position && { position }),
    ...(overflow && { overflow }),
    ...style,
  };
  
  // Combine class names
  const boxClasses = ['ui-box', className].filter(Boolean).join(' ');
  
  return (
    <div 
      className={boxClasses}
      style={combinedStyle}
      {...restProps}
    >
      {children}
    </div>
  );
};

Box.propTypes = {
  /** Box content */
  children: PropTypes.node,
  /** Padding size (xs, sm, md, lg, xl) */
  padding: PropTypes.string,
  /** Margin size (xs, sm, md, lg, xl) */
  margin: PropTypes.string,
  /** Background color from design tokens */
  background: PropTypes.string,
  /** Border color from design tokens */
  border: PropTypes.string,
  /** Border radius (sm, md, lg, circle) */
  borderRadius: PropTypes.string,
  /** Box shadow (sm, md, lg) */
  shadow: PropTypes.string,
  /** Width (any valid CSS width) */
  width: PropTypes.string,
  /** Height (any valid CSS height) */
  height: PropTypes.string,
  /** Display property (flex, block, inline, etc.) */
  display: PropTypes.string,
  /** Position property (relative, absolute, etc.) */
  position: PropTypes.string,
  /** Overflow property (hidden, auto, scroll, etc.) */
  overflow: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

export default Box;
