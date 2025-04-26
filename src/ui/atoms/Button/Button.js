import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Box from '../Box';
import { BUTTON_CLASS, BUTTON_VARIANTS, BUTTON_SIZES } from './constants';
import './Button.css';

/**
 * Enhanced Button Component
 * 
 * A button component with improved handling of variants, sizes, and states.
 * This implementation resolves conflicts between styling approaches and provides
 * a consistent API for all button variations.
 */
const Button = ({
  as = 'button',
  children,
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MD,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  borderRadius,
  onClick,
  className = '',
  style = {},
  ...restProps
}) => {
  // Process variant
  const processedVariant = variant || BUTTON_VARIANTS.PRIMARY;
  
  // Process size
  const processedSize = size || BUTTON_SIZES.MD;
  
  // Build class names
  const btnClasses = [
    BUTTON_CLASS,
    `${BUTTON_CLASS}--${processedVariant}`,
    `${BUTTON_CLASS}--${processedSize}`,
    fullWidth ? `${BUTTON_CLASS}--full-width` : '',
    isLoading ? `${BUTTON_CLASS}--loading` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Handle button click
  const handleClick = (event) => {
    if (disabled || isLoading) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
  };
  
  // Process border radius
  let processedBorderRadius;
  if (borderRadius === 'full') {
    processedBorderRadius = '9999px';
  } else if (borderRadius) {
    processedBorderRadius = `var(--border-radius-${borderRadius})`;
  }
  
  // Apply base button styles
  const buttonStyles = {
    ...style,
    borderRadius: processedBorderRadius,
  };
  
  // Spinner for loading state
  const LoadingSpinner = () => (
    <span className={`${BUTTON_CLASS}__spinner`}>
      <span className={`${BUTTON_CLASS}__spinner-dot`}></span>
      <span className={`${BUTTON_CLASS}__spinner-dot`}></span>
      <span className={`${BUTTON_CLASS}__spinner-dot`}></span>
    </span>
  );

  return (
    <Box
      as={as}
      className={btnClasses}
      style={buttonStyles}
      disabled={disabled || isLoading}
      onClick={handleClick}
      role={as !== 'button' ? 'button' : undefined}
      aria-disabled={disabled || isLoading}
      tabIndex={disabled ? -1 : 0}
      {...restProps}
    >
      {isLoading && <LoadingSpinner />}
      
      {leftIcon && (
        <span className={`${BUTTON_CLASS}__icon ${BUTTON_CLASS}__icon--left`}>
          {leftIcon}
        </span>
      )}
      
      <span className={`${BUTTON_CLASS}__text`}>
        {children}
      </span>
      
      {rightIcon && (
        <span className={`${BUTTON_CLASS}__icon ${BUTTON_CLASS}__icon--right`}>
          {rightIcon}
        </span>
      )}
    </Box>
  );
};

Button.propTypes = {
  /** Element to render the Button as */
  ...polymorphicPropTypes,
  /** Button content */
  children: PropTypes.node,
  /** Button variant (primary, secondary, outline, ghost, link) */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
    PropTypes.object, // For responsive variants
  ]),
  /** Button size (xs, sm, md, lg, xl) */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BUTTON_SIZES)),
    PropTypes.object, // For responsive sizes
  ]),
  /** Whether the button should take full width */
  fullWidth: PropTypes.bool,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether the button is in a loading state */
  isLoading: PropTypes.bool,
  /** Icon to display on the left side of the button */
  leftIcon: PropTypes.node,
  /** Icon to display on the right side of the button */
  rightIcon: PropTypes.node,
  /** Border radius override (sm, md, lg, xl, full) */
  borderRadius: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Button.defaultProps = {
  as: 'button',
  variant: BUTTON_VARIANTS.PRIMARY,
  size: BUTTON_SIZES.MD,
  fullWidth: false,
  disabled: false,
  isLoading: false,
  className: '',
  style: {},
};

export default Button;
