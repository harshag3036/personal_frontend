import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { SWITCH_CLASS, SWITCH_SIZES, SWITCH_VARIANTS } from './constants';
import './Switch.css';

/**
 * Switch Component
 * 
 * A toggle switch component that provides a visual toggle between two states.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Switch checked={isEnabled} onChange={handleToggle} />
 * 
 * // With label
 * <Switch checked={isEnabled} onChange={handleToggle} label="Enable feature" />
 * 
 * // With custom styling
 * <Switch 
 *   checked={isEnabled} 
 *   onChange={handleToggle} 
 *   variant="success" 
 *   size="lg" 
 *   disabled={isDisabled} 
 * />
 * ```
 */
const Switch = forwardRef(({
  checked = false,
  defaultChecked,
  disabled = false,
  variant = SWITCH_VARIANTS.PRIMARY,
  size = SWITCH_SIZES.MD,
  label,
  labelPosition = 'right',
  onChange,
  id,
  name,
  className = '',
  ...restProps
}, ref) => {
  // Process switch props
  const isControlled = checked !== undefined;
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;
  
  // Build class names
  const switchClasses = [
    SWITCH_CLASS,
    `${SWITCH_CLASS}--${variant}`,
    `${SWITCH_CLASS}--${size}`,
    disabled ? `${SWITCH_CLASS}--disabled` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Handle change
  const handleChange = (e) => {
    if (disabled) return;
    if (onChange) onChange(e);
  };
  
  // Render switch with label if provided
  const switchElement = (
    <Box
      as="label"
      htmlFor={switchId}
      className={`${SWITCH_CLASS}-container`}
      display="inline-flex"
      alignItems="center"
      opacity={disabled ? 0.5 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      {...restProps}
    >
      {label && labelPosition === 'left' && (
        <Box as="span" className={`${SWITCH_CLASS}-label`} marginRight="2">
          {label}
        </Box>
      )}
      
      <Box
        className={switchClasses}
        position="relative"
        display="inline-block"
      >
        <Box
          as="input"
          type="checkbox"
          id={switchId}
          name={name}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          className={`${SWITCH_CLASS}__input`}
          ref={ref}
        />
        <Box
          className={`${SWITCH_CLASS}__track`}
          display="block"
        />
        <Box
          className={`${SWITCH_CLASS}__thumb`}
          display="block"
          position="absolute"
        />
      </Box>
      
      {label && labelPosition === 'right' && (
        <Box as="span" className={`${SWITCH_CLASS}-label`} marginLeft="2">
          {label}
        </Box>
      )}
    </Box>
  );
  
  return switchElement;
});

Switch.displayName = 'Switch';

Switch.propTypes = {
  /** Whether the switch is checked */
  checked: PropTypes.bool,
  /** Default checked state (uncontrolled) */
  defaultChecked: PropTypes.bool,
  /** Whether the switch is disabled */
  disabled: PropTypes.bool,
  /** Switch variant/color */
  variant: PropTypes.oneOf(Object.values(SWITCH_VARIANTS)),
  /** Switch size */
  size: PropTypes.oneOf(Object.values(SWITCH_SIZES)),
  /** Text label for the switch */
  label: PropTypes.node,
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['left', 'right']),
  /** Callback when the state changes */
  onChange: PropTypes.func,
  /** ID for the input element */
  id: PropTypes.string,
  /** Name for the input element */
  name: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

Switch.defaultProps = {
  checked: false,
  disabled: false,
  variant: SWITCH_VARIANTS.PRIMARY,
  size: SWITCH_SIZES.MD,
  labelPosition: 'right',
  className: '',
};

export default Switch;
