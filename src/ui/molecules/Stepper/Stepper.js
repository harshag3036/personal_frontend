import React, { createContext, useState, useEffect, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { 
  STEPPER_VARIANTS, 
  STEPPER_SIZES, 
  STEP_STATES, 
  CONNECTOR_TYPES,
  DEFAULT_PROPS 
} from './constants';
import './Stepper.css';

// Context to share state between Stepper and its children
export const StepperContext = createContext({
  activeStep: 0,
  orientation: 'horizontal',
  alternativeLabels: false,
  nonLinear: false,
  connectorType: CONNECTOR_TYPES.LINE,
  variant: STEPPER_VARIANTS.DEFAULT,
  size: STEPPER_SIZES.MEDIUM,
  handleStepClick: () => {},
  steps: []
});

// Helper function to determine step state
export const getStepState = (index, activeStep, nonLinear) => {
  if (index < activeStep) return STEP_STATES.COMPLETED;
  if (index === activeStep) return STEP_STATES.ACTIVE;
  return STEP_STATES.INACTIVE;
};

/**
 * Stepper Component
 * 
 * A component that displays progress through a sequence of logical and numbered steps.
 */
const Stepper = ({
  activeStep = 0,
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  connectorType = DEFAULT_PROPS.connectorType,
  alternativeLabels = DEFAULT_PROPS.alternativeLabels,
  nonLinear = DEFAULT_PROPS.nonLinear,
  onChange,
  className,
  children,
  ...props
}) => {
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [steps, setSteps] = useState([]);
  
  // Update current step when activeStep prop changes
  useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep]);
  
  // Update steps array when children change
  useEffect(() => {
    const stepsArray = Children.toArray(children)
      .filter(child => React.isValidElement(child))
      .map((child, index) => ({
        index,
        state: getStepState(index, currentStep, nonLinear)
      }));
    setSteps(stepsArray);
  }, [children, currentStep, nonLinear]);
  
  // Determine orientation based on variant
  const orientation = variant === STEPPER_VARIANTS.VERTICAL ? 'vertical' : 'horizontal';
  
  // Handle step click for non-linear stepper
  const handleStepClick = (index) => {
    if (nonLinear) {
      setCurrentStep(index);
      if (onChange) {
        onChange(index);
      }
    }
  };
  
  // Build class names
  const classNames = [
    'ui-stepper',
    `ui-stepper--${variant}`,
    `ui-stepper--${size}`,
    alternativeLabels ? 'ui-stepper--alternative-labels' : '',
    nonLinear ? 'ui-stepper--non-linear' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Create stepper state object for render props pattern
  const stepperState = {
    // Data
    activeStep: currentStep,
    steps,
    
    // Configuration
    orientation,
    variant,
    size,
    alternativeLabels,
    nonLinear,
    connectorType,
    
    // Methods
    setStep: (index) => {
      handleStepClick(index);
    },
    nextStep: () => {
      const nextIndex = currentStep + 1;
      if (nextIndex < steps.length) {
        handleStepClick(nextIndex);
      }
    },
    prevStep: () => {
      const prevIndex = currentStep - 1;
      if (prevIndex >= 0) {
        handleStepClick(prevIndex);
      }
    },
    
    // Utilities
    getStepState: (index) => getStepState(index, currentStep, nonLinear)
  };
  
  // Check if children is a function (render props pattern)
  const isRenderProps = typeof children === 'function';
  
  return (
    <StepperContext.Provider
      value={{
        activeStep: currentStep,
        orientation,
        alternativeLabels,
        nonLinear,
        connectorType,
        variant,
        size,
        handleStepClick,
        steps
      }}
    >
      <div className={classNames} {...props}>
        {isRenderProps ? (
          // Render props pattern - pass stepper state to the children function
          children(stepperState)
        ) : (
          // Standard rendering with Step components
          Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null;
            
            // Clone the Step element to pass additional props
            return cloneElement(child, {
              index,
              state: getStepState(index, currentStep, nonLinear),
              isLast: index === Children.count(children) - 1
            });
          })
        )}
      </div>
    </StepperContext.Provider>
  );
};

Stepper.propTypes = {
  /** The active step index (zero-based) */
  activeStep: PropTypes.number,
  /** The variant of the stepper */
  variant: PropTypes.oneOf(Object.values(STEPPER_VARIANTS)),
  /** The size of the stepper */
  size: PropTypes.oneOf(Object.values(STEPPER_SIZES)),
  /** The type of connector between steps */
  connectorType: PropTypes.oneOf(Object.values(CONNECTOR_TYPES)),
  /** Whether to display labels below icons instead of to the right */
  alternativeLabels: PropTypes.bool,
  /** Whether steps can be accessed in any order */
  nonLinear: PropTypes.bool,
  /** Callback fired when the active step changes */
  onChange: PropTypes.func,
  /** Additional CSS class */
  className: PropTypes.string,
  /** 
   * Step components or render props function
   * When a function is provided, it receives the stepper state object
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ])
};

export default Stepper;
