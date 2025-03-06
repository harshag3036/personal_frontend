/**
 * Button Component
 * 
 * A customizable button component with support for variants and extensions.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Button.css';

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  OUTLINE: 'outline',
  TEXT: 'text',
  DANGER: 'danger',
  SUCCESS: 'success',
};

// Button sizes
export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Button Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant=BUTTON_VARIANTS.PRIMARY] - Button variant
 * @param {string} [props.size=BUTTON_SIZES.MEDIUM] - Button size
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the button
 * @param {Function} [props.onClick] - Click handler
 * @returns {JSX.Element} Button component
 */
const Button = ({
  children,
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MEDIUM,
  fullWidth = false,
  disabled = false,
  className = '',
  extensions = [],
  onClick,
  ...props
}) => {
  // Error handling for invalid variants
  if (variant && !Object.values(BUTTON_VARIANTS).includes(variant)) {
    console.warn(`Button: Invalid variant "${variant}". Falling back to PRIMARY.`);
    variant = BUTTON_VARIANTS.PRIMARY;
  }

  // Error handling for invalid sizes
  if (size && !Object.values(BUTTON_SIZES).includes(size)) {
    console.warn(`Button: Invalid size "${size}". Falling back to MEDIUM.`);
    size = BUTTON_SIZES.MEDIUM;
  }

  // Safe click handler with error boundary
  const handleClick = (event) => {
    if (disabled) return;
    
    if (onClick) {
      try {
        onClick(event);
      } catch (error) {
        console.error('Button: Error in onClick handler:', error);
      }
    }
  };

  // Apply extensions
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Button', {
      children,
      variant,
      size,
      fullWidth,
      disabled,
      className,
      onClick: handleClick,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Button: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      children,
      variant,
      size,
      fullWidth,
      disabled,
      className,
      onClick: handleClick,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    children: extendedChildren,
    variant: extendedVariant,
    size: extendedSize,
    fullWidth: extendedFullWidth,
    disabled: extendedDisabled,
    className: extendedClassName,
    onClick: extendedOnClick,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const buttonClasses = [
    'ds-button',
    `ds-button-${extendedVariant}`,
    `ds-button-${extendedSize}`,
    extendedFullWidth ? 'ds-button-full-width' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={buttonClasses}
      disabled={extendedDisabled}
      onClick={extendedOnClick}
      {...restProps}
    >
      {extendedChildren || 'Button'}
    </button>
  );
};

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Button variant */
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  /** Button size */
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  /** Whether the button should take full width */
  fullWidth: PropTypes.bool,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the button */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Click handler */
  onClick: PropTypes.func,
};

export default Button;
