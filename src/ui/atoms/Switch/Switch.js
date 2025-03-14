/**
 * Switch Component
 * 
 * A customizable toggle switch component that can be used as an alternative to a checkbox.
 * The Switch component is used to toggle between two states: on and off.
 * 
 * @example
 * // Basic usage
 * <Switch />
 * 
 * // With label
 * <Switch label="Dark Mode" />
 * 
 * // Controlled component
 * <Switch checked={isDarkMode} onChange={handleDarkModeChange} />
 * 
 * // With variant and size
 * <Switch variant="primary" size="large" />
 * 
 * // Disabled state
 * <Switch disabled />
 * 
 * // With responsive props
 * <Switch size={{ base: 'small', md: 'medium', lg: 'large' }} />
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles } from '../../utilities/responsive-props';
import {
  SWITCH_CLASS,
  SWITCH_VARIANTS,
  SWITCH_SIZES,
  SWITCH_STATES,
  SWITCH_MODIFIERS,
} from './constants';
import './Switch.css';

const Switch = forwardRef(function Switch(props, ref) {
  const {
    as: Element = 'label',
    className,
    style,
    variant = SWITCH_VARIANTS.PRIMARY,
    size = SWITCH_SIZES.MEDIUM,
    checked,
    defaultChecked,
    disabled = false,
    label,
    labelPosition = 'right',
    id,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    ariaLabel,
    ...rest
  } = props;

  // Process responsive props
  const responsiveProps = {
    variant,
    size,
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
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }

  // Determine base classes based on non-responsive props
  const baseVariantClass = !isResponsiveObject(variant) ? `${SWITCH_CLASS}--${variant.toLowerCase()}` : '';
  const baseSizeClass = !isResponsiveObject(size) ? `${SWITCH_CLASS}--${size.toLowerCase()}` : '';
  
  // Combine class names
  const switchClasses = [
    SWITCH_CLASS,
    baseVariantClass,
    baseSizeClass,
    disabled ? `${SWITCH_CLASS}--disabled` : '',
    label ? `${SWITCH_CLASS}--with-label` : '',
    label && labelPosition ? `${SWITCH_CLASS}--label-${labelPosition}` : '',
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

  // Generate a unique ID if one is not provided
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <Element
      ref={ref}
      className={switchClasses}
      style={combinedStyle}
      {...rest}
    >
      <input
        type="checkbox"
        id={switchId}
        className={`${SWITCH_CLASS}__input`}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel || label}
      />
      <span className={`${SWITCH_CLASS}__track`}>
        <span className={`${SWITCH_CLASS}__thumb`} />
      </span>
      {label && (
        <span className={`${SWITCH_CLASS}__label`}>{label}</span>
      )}
    </Element>
  );
});

Switch.propTypes = {
  /** The HTML element to render the switch as */
  ...polymorphicPropTypes,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Additional inline styles */
  style: PropTypes.object,
  
  /** The visual style variant of the switch */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SWITCH_VARIANTS)),
    PropTypes.object, // For responsive props
  ]),
  
  /** The size of the switch */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SWITCH_SIZES)),
    PropTypes.object, // For responsive props
  ]),
  
  /** Whether the switch is checked (controlled) */
  checked: PropTypes.bool,
  
  /** Default checked state (uncontrolled) */
  defaultChecked: PropTypes.bool,
  
  /** Whether the switch is disabled */
  disabled: PropTypes.bool,
  
  /** Optional label to display with the switch */
  label: PropTypes.node,
  
  /** Position of the label relative to the switch */
  labelPosition: PropTypes.oneOf(['left', 'right']),
  
  /** ID for the input element */
  id: PropTypes.string,
  
  /** Name for the input element */
  name: PropTypes.string,
  
  /** Value for the input element */
  value: PropTypes.string,
  
  /** Callback when the switch state changes */
  onChange: PropTypes.func,
  
  /** Callback when the switch receives focus */
  onFocus: PropTypes.func,
  
  /** Callback when the switch loses focus */
  onBlur: PropTypes.func,
  
  /** Accessibility label for screen readers */
  ariaLabel: PropTypes.string,
};

Switch.defaultProps = {
  as: 'label',
  variant: SWITCH_VARIANTS.PRIMARY,
  size: SWITCH_SIZES.MEDIUM,
  disabled: false,
  labelPosition: 'right',
};

export default Switch;
