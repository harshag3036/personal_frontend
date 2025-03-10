import React, { useContext, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { STEP_STATES } from './constants';
import { StepperContext } from './Stepper';
import StepConnector from './StepConnector';

/**
 * Step Component
 * 
 * Represents a single step in the stepper.
 */
const Step = ({
  index,
  state,
  isLast,
  onClick,
  disabled,
  completed,
  error,
  className,
  children,
  ...props
}) => {
  const {
    handleStepClick,
    nonLinear
  } = useContext(StepperContext);
  
  // Determine step state
  const stepState = disabled ? STEP_STATES.DISABLED :
                   error ? STEP_STATES.ERROR :
                   completed ? STEP_STATES.COMPLETED :
                   state;
  
  // Handle click
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick(index);
    handleStepClick(index);
  };
  
  // Build class names
  const classNames = [
    'ui-step',
    `ui-step--${stepState}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={classNames}
      onClick={nonLinear ? handleClick : undefined}
      aria-current={stepState === STEP_STATES.ACTIVE ? 'step' : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        
        // Pass props to child components
        return cloneElement(child, {
          index,
          state: stepState,
          isLast
        });
      })}
      
      {!isLast && <StepConnector state={stepState} />}
    </div>
  );
};

Step.propTypes = {
  /** The index of the step (provided by Stepper) */
  index: PropTypes.number,
  /** The state of the step (provided by Stepper) */
  state: PropTypes.oneOf(Object.values(STEP_STATES)),
  /** Whether this is the last step (provided by Stepper) */
  isLast: PropTypes.bool,
  /** Callback fired when the step is clicked */
  onClick: PropTypes.func,
  /** Whether the step is disabled */
  disabled: PropTypes.bool,
  /** Whether the step is completed */
  completed: PropTypes.bool,
  /** Whether the step has an error */
  error: PropTypes.bool,
  /** Additional CSS class */
  className: PropTypes.string,
  /** Step content components */
  children: PropTypes.node
};

export default Step;
