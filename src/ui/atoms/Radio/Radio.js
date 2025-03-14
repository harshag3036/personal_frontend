/**
 * Radio Component
 * 
 * A customizable radio button component that can be used in forms.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { RADIO_VARIANTS, RADIO_SIZES, RADIO_LABEL_POSITIONS, RADIO_DEFAULT_PROPS } from './constants';
import { createPolymorphicComponent } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import './Radio.css';

// Helper function to process responsive props
const getResponsiveProps = (prop) => {
  if (!isResponsiveObject(prop)) {
    return { base: prop };
  }
  return prop;
};

/**
 * Radio component for selecting a single option from a group
 */
const Radio = forwardRef(({
  as: Element = 'label',
  variant = RADIO_DEFAULT_PROPS.variant,
  size = RADIO_DEFAULT_PROPS.size,
  labelPosition = RADIO_DEFAULT_PROPS.labelPosition,
  label,
  name,
  value,
  checked,
  defaultChecked,
  disabled = RADIO_DEFAULT_PROPS.disabled,
  ariaLabel,
  className,
  onChange,
  ...props
}, ref) => {
  // Process responsive props
  const responsiveVariant = getResponsiveProps(variant);
  const responsiveSize = getResponsiveProps(size);
  
  // Generate class names
  const baseClassName = 'ui-radio';
  const classes = [
    baseClassName,
    disabled && `${baseClassName}--disabled`,
    labelPosition === RADIO_LABEL_POSITIONS.LEFT && `${baseClassName}--label-left`,
    ...Object.entries(responsiveVariant).map(([breakpoint, value]) => 
      breakpoint === 'base' 
        ? `${baseClassName}--${value.toLowerCase()}`
        : `${baseClassName}--${value.toLowerCase()}-${breakpoint}`
    ),
    ...Object.entries(responsiveSize).map(([breakpoint, value]) => 
      breakpoint === 'base' 
        ? `${baseClassName}--${value.toLowerCase()}`
        : `${baseClassName}--${value.toLowerCase()}-${breakpoint}`
    ),
    className
  ].filter(Boolean).join(' ');

  return (
    <Element className={classes} {...props}>
      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        aria-label={ariaLabel || label}
        className={`${baseClassName}__input`}
      />
      <span className={`${baseClassName}__control`}>
        <span className={`${baseClassName}__dot`}></span>
      </span>
      {label && <span className={`${baseClassName}__label`}>{label}</span>}
    </Element>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  /** The visual style variant of the radio button */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(RADIO_VARIANTS)),
    PropTypes.object
  ]),
  /** The size of the radio button */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(RADIO_SIZES)),
    PropTypes.object
  ]),
  /** Position of the label relative to the radio button */
  labelPosition: PropTypes.oneOf(Object.values(RADIO_LABEL_POSITIONS)),
  /** Optional label to display with the radio button */
  label: PropTypes.node,
  /** Name attribute for the input element */
  name: PropTypes.string,
  /** Value attribute for the input element */
  value: PropTypes.string,
  /** Whether the radio button is checked (controlled) */
  checked: PropTypes.bool,
  /** Default checked state (uncontrolled) */
  defaultChecked: PropTypes.bool,
  /** Whether the radio button is disabled */
  disabled: PropTypes.bool,
  /** Accessible label for screen readers (falls back to label if not provided) */
  ariaLabel: PropTypes.string,
  /** Additional class names */
  className: PropTypes.string,
  /** Callback when the radio button state changes */
  onChange: PropTypes.func,
};

// Export the component directly
export default Radio;
