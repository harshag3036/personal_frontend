import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { STEP_STATES } from './constants';
import { StepperContext } from './Stepper';
import Icon from '../../atoms/Icon';

/**
 * StepIcon Component
 * 
 * Displays the icon for a step.
 */
const StepIcon = ({
  index,
  state,
  icon,
  ...props
}) => {
  const { variant } = useContext(StepperContext);
  
  // Build class names
  const classNames = [
    'ui-step-icon',
    `ui-step-icon--${state}`
  ].filter(Boolean).join(' ');
  
  // Render custom icon if provided
  if (icon) {
    return (
      <div className={classNames} {...props}>
        {icon}
      </div>
    );
  }
  
  // Render default icon based on state
  let iconName;
  
  switch (state) {
    case STEP_STATES.COMPLETED:
      iconName = 'check';
      break;
    case STEP_STATES.ERROR:
      iconName = 'error';
      break;
    default:
      // For numbered variant, show the step number
      if (variant === 'numbered') {
        return (
          <div className={classNames} {...props}>
            {index + 1}
          </div>
        );
      }
      // For other variants, show a circle
      return (
        <div className={classNames} {...props}>
          <span className="ui-step-icon-circle" />
        </div>
      );
  }
  
  return (
    <div className={classNames} {...props}>
      <Icon name={iconName} size="sm" />
    </div>
  );
};

StepIcon.propTypes = {
  /** The index of the step (provided by StepLabel) */
  index: PropTypes.number,
  /** The state of the step (provided by StepLabel) */
  state: PropTypes.oneOf(Object.values(STEP_STATES)),
  /** Custom icon to display */
  icon: PropTypes.node
};

export default StepIcon;
