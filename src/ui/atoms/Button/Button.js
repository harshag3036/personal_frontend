/**
 * Button Component
 * 
 * A customizable button component with support for variants, sizes, and responsive props.
 * This component can be rendered as different HTML elements using the `as` prop.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Button variant="primary" size="medium">Click Me</Button>
 * 
 * // As a link
 * <Button as="a" href="/page" variant="secondary">Go to Page</Button>
 * 
 * // With responsive props
 * <Button 
 *   variant={{ base: "primary", md: "outline" }}
 *   size={{ base: "small", md: "medium", lg: "large" }}
 * >
 *   Responsive Button
 * </Button>
 * 
 * // With icon
 * <Button leftIcon={<Icon name="star" />} variant="accent">
 *   With Icon
 * </Button>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import { BUTTON_CLASS, BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_STATES } from './constants';
import './Button.css';

/**
 * Button Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='button'] - Element to render the Button as
 * @param {React.ReactNode} props.children - Button content
 * @param {string|Object} [props.variant='primary'] - Button variant or responsive object
 * @param {string|Object} [props.size='medium'] - Button size or responsive object
 * @param {boolean|Object} [props.fullWidth=false] - Whether the button should take full width or responsive object
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {boolean} [props.loading=false] - Whether the button is in loading state
 * @param {React.ReactNode} [props.leftIcon] - Icon to display on the left side of the button
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right side of the button
 * @param {string} [props.type='button'] - Button type attribute (button, submit, reset)
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Function} [props.onClick] - Click handler
 * @returns {JSX.Element} Button component
 */
const Button = ({
  as = 'button',
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  type = 'button',
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  // Process responsive props
  const responsiveProps = {
    variant,
    size,
    fullWidth,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(variant)) {
      responsiveClasses.variant = variant;
    }
    
    if (isResponsiveObject(size)) {
      responsiveClasses.size = size;
    }
    
    if (isResponsiveObject(fullWidth)) {
      responsiveClasses.fullWidth = fullWidth;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Safe click handler with error boundary
  const handleClick = (event) => {
    if (disabled || loading) return;
    
    if (onClick) {
      try {
        onClick(event);
      } catch (error) {
        console.error('Button: Error in onClick handler:', error);
      }
    }
  };
  
  // Determine base classes based on non-responsive props
  const baseVariantClass = !isResponsiveObject(variant) ? `${BUTTON_CLASS}--${variant}` : '';
  const baseSizeClass = !isResponsiveObject(size) ? `${BUTTON_CLASS}--${size}` : '';
  const baseFullWidthClass = !isResponsiveObject(fullWidth) && fullWidth ? `${BUTTON_CLASS}--full-width` : '';
  
  // Combine class names
  const buttonClasses = [
    BUTTON_CLASS,
    baseVariantClass,
    baseSizeClass,
    baseFullWidthClass,
    loading ? `${BUTTON_CLASS}--loading` : '',
    leftIcon ? `${BUTTON_CLASS}--with-left-icon` : '',
    rightIcon ? `${BUTTON_CLASS}--with-right-icon` : '',
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
  
  // Determine the element to render
  const Element = as;
  
  // Props specific to button element
  const buttonSpecificProps = Element === 'button' ? {
    type,
    disabled: disabled || loading,
  } : {};
  
  // For anchor elements, add role="button" for accessibility
  const anchorSpecificProps = Element === 'a' ? {
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled || loading,
  } : {};
  
  return (
    <Element
      className={buttonClasses}
      style={combinedStyle}
      onClick={handleClick}
      {...buttonSpecificProps}
      {...anchorSpecificProps}
      {...props}
    >
      {leftIcon && (
        <span className={`${BUTTON_CLASS}__icon ${BUTTON_CLASS}__icon--left`}>
          {leftIcon}
        </span>
      )}
      {children || 'Button'}
      {rightIcon && (
        <span className={`${BUTTON_CLASS}__icon ${BUTTON_CLASS}__icon--right`}>
          {rightIcon}
        </span>
      )}
    </Element>
  );
};

Button.propTypes = {
  /** Element to render the Button as */
  ...polymorphicPropTypes,
  /** Button content */
  children: PropTypes.node,
  /** Button variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
    PropTypes.object,
  ]),
  /** Button size or responsive object */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BUTTON_SIZES)),
    PropTypes.object,
  ]),
  /** Whether the button should take full width or responsive object */
  fullWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether the button is in loading state */
  loading: PropTypes.bool,
  /** Icon to display on the left side of the button */
  leftIcon: PropTypes.node,
  /** Icon to display on the right side of the button */
  rightIcon: PropTypes.node,
  /** Button type attribute (button, submit, reset) */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Click handler */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  as: 'button',
  variant: 'primary',
  size: 'medium',
  fullWidth: false,
  disabled: false,
  loading: false,
  type: 'button',
  className: '',
  style: {},
};

export default Button;
