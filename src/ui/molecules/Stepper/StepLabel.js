import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { STEP_STATES } from './constants';
import { StepperContext } from './Stepper';
import Text from '../../atoms/Text';
import StepIcon from './StepIcon';

/**
 * StepLabel Component
 * 
 * Displays the label and icon for a step.
 */
const StepLabel = ({
  index,
  state,
  icon,
  optional,
  optionalText,
  error,
  errorText,
  className,
  children,
  ...props
}) => {
  const {
    alternativeLabels,
    size
  } = useContext(StepperContext);
  
  // Build class names
  const classNames = [
    'ui-step-label',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classNames} {...props}>
      <StepIcon 
        index={index}
        state={state}
        icon={icon}
      />
      
      <div className="ui-step-text">
        <Text 
          className="ui-step-label-text"
          variant="body"
          size={size === 'small' ? 'sm' : 'md'}
        >
          {children}
        </Text>
        
        {optional && (
          <Text 
            className="ui-step-description"
            variant="body"
            size="sm"
            color={error ? 'error' : 'neutral'}
          >
            {error ? errorText : optionalText}
          </Text>
        )}
      </div>
    </div>
  );
};

StepLabel.propTypes = {
  /** The index of the step (provided by Step) */
  index: PropTypes.number,
  /** The state of the step (provided by Step) */
  state: PropTypes.oneOf(Object.values(STEP_STATES)),
  /** Custom icon to display */
  icon: PropTypes.node,
  /** Whether the step is optional */
  optional: PropTypes.bool,
  /** Text to display for optional step */
  optionalText: PropTypes.string,
  /** Whether the step has an error */
  error: PropTypes.bool,
  /** Text to display for error state */
  errorText: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string,
  /** Step label content */
  children: PropTypes.node
};

StepLabel.defaultProps = {
  optionalText: 'Optional',
  errorText: 'Error'
};

export default StepLabel;
