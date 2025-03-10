import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { STEP_STATES } from './constants';
import { StepperContext } from './Stepper';

/**
 * StepConnector Component
 * 
 * Displays the connector between steps.
 */
const StepConnector = ({
  state,
  className,
  ...props
}) => {
  const { connectorType } = useContext(StepperContext);
  
  // Build class names
  const classNames = [
    'ui-step-connector',
    `ui-step-connector--${connectorType}`,
    state === STEP_STATES.COMPLETED ? 'ui-step-connector--completed' : '',
    state === STEP_STATES.ACTIVE ? 'ui-step-connector--active' : '',
    state === STEP_STATES.ERROR ? 'ui-step-connector--error' : '',
    className
  ].filter(Boolean).join(' ');
  
  return <div className={classNames} {...props} />;
};

StepConnector.propTypes = {
  /** The state of the step (provided by Step) */
  state: PropTypes.oneOf(Object.values(STEP_STATES)),
  /** Additional CSS class */
  className: PropTypes.string
};

export default StepConnector;
