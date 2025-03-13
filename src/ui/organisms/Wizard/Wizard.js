/**
 * Wizard Component
 * 
 * A multi-step wizard component for guiding users through complex processes.
 */

import React, { forwardRef, useState, useEffect, useCallback, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { 
  WIZARD_VARIANTS,
  WIZARD_SIZES,
  WIZARD_MODIFIERS,
  WIZARD_NAVIGATION_TYPES,
  WIZARD_STEP_STATES,
  WIZARD_ARIA,
  WIZARD_DATA_ATTRIBUTES,
  WIZARD_CLASS_NAMES,
  WIZARD_DEFAULT_PROPS
} from './constants';
import { Button } from '../../atoms';
import './Wizard.css';

// Create context for wizard state
const WizardContext = createContext({
  currentStep: 0,
  totalSteps: 0,
  goToStep: () => {},
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  isFirstStep: true,
  isLastStep: false,
  stepStates: {},
  setStepState: () => {},
  registerStep: () => {},
  navigationType: WIZARD_NAVIGATION_TYPES.BUTTONS,
  validateOnNext: true,
  linear: true,
  allowJumpToStep: true,
  allowSkip: false,
  summaryData: {},
  updateSummaryData: () => {},
});

/**
 * Wizard Header Component
 * 
 * Renders the header section of the wizard.
 */
const WizardHeader = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.HEADER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

WizardHeader.displayName = 'Wizard.Header';

WizardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Body Component
 * 
 * Renders the body section of the wizard.
 */
const WizardBody = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.BODY} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

WizardBody.displayName = 'Wizard.Body';

WizardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Footer Component
 * 
 * Renders the footer section of the wizard.
 */
const WizardFooter = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.FOOTER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

WizardFooter.displayName = 'Wizard.Footer';

WizardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Navigation Component
 * 
 * Renders the navigation section of the wizard.
 */
const WizardNavigation = forwardRef(({ 
  children, 
  className,
  type = WIZARD_NAVIGATION_TYPES.BUTTONS,
  ...props 
}, ref) => {
  const navigationClass = `${WIZARD_CLASS_NAMES.NAVIGATION} ${WIZARD_CLASS_NAMES.NAVIGATION}--${type} ${className || ''}`;
  
  return (
    <div 
      ref={ref}
      className={navigationClass}
      role={WIZARD_ARIA.NAVIGATION_ROLE}
      {...props}
    >
      {children}
    </div>
  );
});

WizardNavigation.displayName = 'Wizard.Navigation';

WizardNavigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(WIZARD_NAVIGATION_TYPES))
};

/**
 * Wizard Step Component
 * 
 * Renders a step in the wizard.
 */
const WizardStep = forwardRef(({ 
  children, 
  className,
  title,
  validate,
  onEnter,
  onExit,
  ...props 
}, ref) => {
  const { currentStep, registerStep } = useContext(WizardContext);
  const [stepIndex, setStepIndex] = useState(null);
  
  // Register this step with the wizard
  useEffect(() => {
    if (stepIndex === null) {
      const index = registerStep({ validate, onEnter, onExit });
      setStepIndex(index);
    }
  }, [stepIndex, registerStep, validate, onEnter, onExit]);
  
  const isActive = stepIndex === currentStep;
  
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.STEP} ${className || ''}`}
      role={WIZARD_ARIA.STEP_ROLE}
      data-state={isActive ? WIZARD_STEP_STATES.ACTIVE : WIZARD_STEP_STATES.PENDING}
      hidden={!isActive}
      {...props}
    >
      {title && <div className={WIZARD_CLASS_NAMES.STEP_TITLE}>{title}</div>}
      <div className={WIZARD_CLASS_NAMES.STEP_CONTENT}>
        {children}
      </div>
    </div>
  );
});

WizardStep.displayName = 'Wizard.Step';

WizardStep.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  validate: PropTypes.func,
  onEnter: PropTypes.func,
  onExit: PropTypes.func
};

/**
 * Wizard Step Indicator Component
 * 
 * Renders an indicator for a step in the wizard navigation.
 */
const WizardStepIndicator = forwardRef(({ 
  index,
  label,
  className,
  ...props 
}, ref) => {
  const { 
    currentStep, 
    goToStep, 
    stepStates, 
    allowJumpToStep,
    linear
  } = useContext(WizardContext);
  
  const state = stepStates[index] || WIZARD_STEP_STATES.PENDING;
  const isActive = currentStep === index;
  const isCompleted = state === WIZARD_STEP_STATES.COMPLETED;
  const isDisabled = state === WIZARD_STEP_STATES.DISABLED || 
    (linear && index > currentStep + 1) || 
    (!allowJumpToStep && !isActive);
  
  const handleClick = () => {
    if (!isDisabled) {
      goToStep(index);
    }
  };
  
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.STEP_INDICATOR} ${className || ''}`}
      data-state={isActive ? WIZARD_STEP_STATES.ACTIVE : state}
      onClick={handleClick}
      role="tab"
      aria-selected={isActive}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      {...props}
    >
      {label || index + 1}
    </div>
  );
});

WizardStepIndicator.displayName = 'Wizard.StepIndicator';

WizardStepIndicator.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Progress Bar Component
 * 
 * Renders a progress bar for the wizard.
 */
const WizardProgressBar = forwardRef(({ 
  className,
  ...props 
}, ref) => {
  const { currentStep, totalSteps } = useContext(WizardContext);
  const progress = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;
  
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.PROGRESS_BAR} ${className || ''}`}
      {...props}
    >
      <div 
        className={WIZARD_CLASS_NAMES.PROGRESS_INDICATOR}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
});

WizardProgressBar.displayName = 'Wizard.ProgressBar';

WizardProgressBar.propTypes = {
  className: PropTypes.string
};

/**
 * Wizard Button Group Component
 * 
 * Renders a group of navigation buttons for the wizard.
 */
const WizardButtonGroup = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.BUTTON_GROUP} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

WizardButtonGroup.displayName = 'Wizard.ButtonGroup';

WizardButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Previous Button Component
 * 
 * Renders a button to navigate to the previous step.
 */
const WizardPreviousButton = forwardRef(({ 
  children = 'Previous',
  className,
  ...props 
}, ref) => {
  const { goToPreviousStep, isFirstStep } = useContext(WizardContext);
  
  return (
    <Button 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.BUTTON_PREVIOUS} ${className || ''}`}
      onClick={goToPreviousStep}
      disabled={isFirstStep}
      variant="secondary"
      {...props}
    >
      {children}
    </Button>
  );
});

WizardPreviousButton.displayName = 'Wizard.PreviousButton';

WizardPreviousButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Next Button Component
 * 
 * Renders a button to navigate to the next step.
 */
const WizardNextButton = forwardRef(({ 
  children = 'Next',
  className,
  ...props 
}, ref) => {
  const { goToNextStep, isLastStep } = useContext(WizardContext);
  
  return (
    <Button 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.BUTTON_NEXT} ${className || ''}`}
      onClick={goToNextStep}
      disabled={isLastStep}
      variant="primary"
      {...props}
    >
      {children}
    </Button>
  );
});

WizardNextButton.displayName = 'Wizard.NextButton';

WizardNextButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Wizard Finish Button Component
 * 
 * Renders a button to finish the wizard.
 */
const WizardFinishButton = forwardRef(({ 
  children = 'Finish',
  className,
  onClick,
  ...props 
}, ref) => {
  const { isLastStep } = useContext(WizardContext);
  
  return (
    <Button 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.BUTTON_FINISH} ${className || ''}`}
      onClick={onClick}
      disabled={!isLastStep}
      variant="primary"
      {...props}
    >
      {children}
    </Button>
  );
});

WizardFinishButton.displayName = 'Wizard.FinishButton';

WizardFinishButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

/**
 * Wizard Cancel Button Component
 * 
 * Renders a button to cancel the wizard.
 */
const WizardCancelButton = forwardRef(({ 
  children = 'Cancel',
  className,
  onClick,
  ...props 
}, ref) => {
  return (
    <Button 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.BUTTON_CANCEL} ${className || ''}`}
      onClick={onClick}
      variant="tertiary"
      {...props}
    >
      {children}
    </Button>
  );
});

WizardCancelButton.displayName = 'Wizard.CancelButton';

WizardCancelButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

/**
 * Wizard Summary Component
 * 
 * Renders a summary of the wizard data.
 */
const WizardSummary = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  const { summaryData } = useContext(WizardContext);
  
  return (
    <div 
      ref={ref}
      className={`${WIZARD_CLASS_NAMES.SUMMARY} ${className || ''}`}
      {...props}
    >
      {typeof children === 'function' ? children(summaryData) : children}
    </div>
  );
});

WizardSummary.displayName = 'Wizard.Summary';

WizardSummary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string
};

/**
 * Wizard Component
 * 
 * Main wizard component.
 */
const Wizard = forwardRef(({ 
  children,
  variant = WIZARD_DEFAULT_PROPS.variant,
  size = WIZARD_DEFAULT_PROPS.size,
  withBorder = WIZARD_DEFAULT_PROPS.withBorder,
  withShadow = WIZARD_DEFAULT_PROPS.withShadow,
  withProgressBar = WIZARD_DEFAULT_PROPS.withProgressBar,
  withStepNumbers = WIZARD_DEFAULT_PROPS.withStepNumbers,
  withStepIcons = WIZARD_DEFAULT_PROPS.withStepIcons,
  withNavigation = WIZARD_DEFAULT_PROPS.withNavigation,
  withSummary = WIZARD_DEFAULT_PROPS.withSummary,
  navigationType = WIZARD_DEFAULT_PROPS.navigationType,
  showPreviousButton = WIZARD_DEFAULT_PROPS.showPreviousButton,
  showNextButton = WIZARD_DEFAULT_PROPS.showNextButton,
  showCancelButton = WIZARD_DEFAULT_PROPS.showCancelButton,
  showFinishButton = WIZARD_DEFAULT_PROPS.showFinishButton,
  allowSkip = WIZARD_DEFAULT_PROPS.allowSkip,
  allowJumpToStep = WIZARD_DEFAULT_PROPS.allowJumpToStep,
  validateOnNext = WIZARD_DEFAULT_PROPS.validateOnNext,
  linear = WIZARD_DEFAULT_PROPS.linear,
  initialStep = 0,
  onStepChange,
  onComplete,
  onCancel,
  className,
  style,
  ...props 
}, ref) => {
  // State
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [steps, setSteps] = useState([]);
  const [stepStates, setStepStates] = useState({});
  const [summaryData, setSummaryData] = useState({});
  
  // Derived state
  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  
  // Register a step
  const registerStep = useCallback((stepProps) => {
    const stepIndex = steps.length;
    setSteps(prevSteps => [...prevSteps, stepProps]);
    setStepStates(prevStates => ({
      ...prevStates,
      [stepIndex]: WIZARD_STEP_STATES.PENDING
    }));
    return stepIndex;
  }, [steps.length]);
  
  // Set the state of a step
  const setStepState = useCallback((stepIndex, state) => {
    setStepStates(prevStates => ({
      ...prevStates,
      [stepIndex]: state
    }));
  }, []);
  
  // Update summary data
  const updateSummaryData = useCallback((data) => {
    setSummaryData(prevData => ({
      ...prevData,
      ...data
    }));
  }, []);
  
  // Validate the current step
  const validateCurrentStep = useCallback(async () => {
    const step = steps[currentStep];
    if (step && step.validate) {
      try {
        const result = await step.validate();
        return result;
      } catch (error) {
        console.error('Step validation failed:', error);
        return false;
      }
    }
    return true;
  }, [currentStep, steps]);
  
  // Handle step change
  const handleStepChange = useCallback(async (nextStep) => {
    // Call onExit for the current step
    const currentStepObj = steps[currentStep];
    if (currentStepObj && currentStepObj.onExit) {
      await currentStepObj.onExit();
    }
    
    // Update current step
    setCurrentStep(nextStep);
    
    // Call onEnter for the next step
    const nextStepObj = steps[nextStep];
    if (nextStepObj && nextStepObj.onEnter) {
      await nextStepObj.onEnter();
    }
    
    // Call onStepChange callback
    if (onStepChange) {
      onStepChange(nextStep, currentStep);
    }
  }, [currentStep, onStepChange, steps]);
  
  // Go to a specific step
  const goToStep = useCallback(async (stepIndex) => {
    if (stepIndex < 0 || stepIndex >= totalSteps) {
      return;
    }
    
    // If going forward and validation is required
    if (stepIndex > currentStep && validateOnNext) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        setStepState(currentStep, WIZARD_STEP_STATES.ERROR);
        return;
      }
      
      // Mark current step as completed
      setStepState(currentStep, WIZARD_STEP_STATES.COMPLETED);
    }
    
    // Change step
    handleStepChange(stepIndex);
  }, [currentStep, handleStepChange, setStepState, totalSteps, validateCurrentStep, validateOnNext]);
  
  // Go to the next step
  const goToNextStep = useCallback(async () => {
    if (isLastStep) {
      return;
    }
    
    await goToStep(currentStep + 1);
  }, [currentStep, goToStep, isLastStep]);
  
  // Go to the previous step
  const goToPreviousStep = useCallback(() => {
    if (isFirstStep) {
      return;
    }
    
    goToStep(currentStep - 1);
  }, [currentStep, goToStep, isFirstStep]);
  
  // Build class names
  const wizardClasses = [
    WIZARD_CLASS_NAMES.ROOT,
    `${WIZARD_CLASS_NAMES.ROOT}--${variant}`,
    `${WIZARD_CLASS_NAMES.ROOT}--${size}`,
    withBorder ? `${WIZARD_CLASS_NAMES.ROOT}--${WIZARD_MODIFIERS.WITH_BORDER}` : '',
    withShadow ? `${WIZARD_CLASS_NAMES.ROOT}--${WIZARD_MODIFIERS.WITH_SHADOW}` : '',
    className || ''
  ].filter(Boolean).join(' ');
  
  // Context value
  const contextValue = {
    currentStep,
    totalSteps,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    stepStates,
    setStepState,
    registerStep,
    navigationType,
    validateOnNext,
    linear,
    allowJumpToStep,
    allowSkip,
    summaryData,
    updateSummaryData,
  };
  
  // Find and organize children by type
  const renderChildren = () => {
    let header = null;
    let body = null;
    let footer = null;
    let navigation = null;
    let stepComponents = [];
    let summary = null;
    
    React.Children.forEach(children, child => {
      if (!child) return;
      
      if (child.type?.displayName === 'Wizard.Header') {
        header = child;
      } else if (child.type?.displayName === 'Wizard.Body') {
        body = child;
      } else if (child.type?.displayName === 'Wizard.Footer') {
        footer = child;
      } else if (child.type?.displayName === 'Wizard.Navigation') {
        navigation = child;
      } else if (child.type?.displayName === 'Wizard.Step') {
        stepComponents.push(child);
      } else if (child.type?.displayName === 'Wizard.Summary') {
        summary = child;
      }
    });
    
    // If no navigation is provided, create a default one
    if (!navigation && withNavigation) {
      navigation = (
        <WizardNavigation type={navigationType}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <WizardStepIndicator key={index} index={index} />
          ))}
        </WizardNavigation>
      );
    }
    
    // If no footer is provided, create a default one
    if (!footer) {
      footer = (
        <WizardFooter>
          <WizardButtonGroup>
            {showCancelButton && (
              <WizardCancelButton onClick={onCancel} />
            )}
            {showPreviousButton && (
              <WizardPreviousButton />
            )}
            {showNextButton && !isLastStep && (
              <WizardNextButton />
            )}
            {showFinishButton && isLastStep && (
              <WizardFinishButton onClick={onComplete} />
            )}
          </WizardButtonGroup>
        </WizardFooter>
      );
    }
    
    return (
      <>
        {header}
        {navigation}
        {withProgressBar && <WizardProgressBar />}
        {body ? body : <WizardBody>{stepComponents}</WizardBody>}
        {withSummary && summary}
        {footer}
      </>
    );
  };
  
  return (
    <WizardContext.Provider value={contextValue}>
      <div 
        ref={ref}
        className={wizardClasses}
        style={style}
        role={WIZARD_ARIA.ROLE}
        aria-label={WIZARD_ARIA.LABEL}
        data-variant={variant}
        data-size={size}
        data-current-step={currentStep}
        data-total-steps={totalSteps}
        {...props}
      >
        <div className={WIZARD_CLASS_NAMES.CONTAINER}>
          {renderChildren()}
        </div>
      </div>
    </WizardContext.Provider>
  );
});

Wizard.displayName = 'Wizard';

Wizard.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(WIZARD_VARIANTS)),
  size: PropTypes.oneOf(Object.values(WIZARD_SIZES)),
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  withProgressBar: PropTypes.bool,
  withStepNumbers: PropTypes.bool,
  withStepIcons: PropTypes.bool,
  withNavigation: PropTypes.bool,
  withSummary: PropTypes.bool,
  navigationType: PropTypes.oneOf(Object.values(WIZARD_NAVIGATION_TYPES)),
  showPreviousButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showFinishButton: PropTypes.bool,
  allowSkip: PropTypes.bool,
  allowJumpToStep: PropTypes.bool,
  validateOnNext: PropTypes.bool,
  linear: PropTypes.bool,
  initialStep: PropTypes.number,
  onStepChange: PropTypes.func,
  onComplete: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
Wizard.Header = WizardHeader;
Wizard.Body = WizardBody;
Wizard.Footer = WizardFooter;
Wizard.Navigation = WizardNavigation;
Wizard.Step = WizardStep;
Wizard.StepIndicator = WizardStepIndicator;
Wizard.ProgressBar = WizardProgressBar;
Wizard.ButtonGroup = WizardButtonGroup;
Wizard.PreviousButton = WizardPreviousButton;
Wizard.NextButton = WizardNextButton;
Wizard.FinishButton = WizardFinishButton;
Wizard.CancelButton = WizardCancelButton;
Wizard.Summary = WizardSummary;

export default Wizard;
