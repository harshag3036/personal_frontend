import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent } from './index';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import Box from '../../atoms/Box';

export default {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: 'A stepper component that displays progress through a sequence of logical and numbered steps.'
      }
    }
  }
};

// Basic Stepper
export const Default = () => (
  <Stepper activeStep={1}>
    <Step>
      <StepLabel>Step 1</StepLabel>
    </Step>
    <Step>
      <StepLabel>Step 2</StepLabel>
    </Step>
    <Step>
      <StepLabel>Step 3</StepLabel>
    </Step>
  </Stepper>
);

// Stepper with descriptions
export const WithDescriptions = () => (
  <Stepper activeStep={1}>
    <Step>
      <StepLabel optional optionalText="First step">Step 1</StepLabel>
    </Step>
    <Step>
      <StepLabel optional optionalText="Second step">Step 2</StepLabel>
    </Step>
    <Step>
      <StepLabel optional optionalText="Last step">Step 3</StepLabel>
    </Step>
  </Stepper>
);

// Stepper with error state
export const WithError = () => (
  <Stepper activeStep={1}>
    <Step>
      <StepLabel>Step 1</StepLabel>
    </Step>
    <Step error>
      <StepLabel error errorText="There was an error">Step 2</StepLabel>
    </Step>
    <Step disabled>
      <StepLabel>Step 3</StepLabel>
    </Step>
  </Stepper>
);

// Vertical Stepper
export const Vertical = () => (
  <Stepper activeStep={1} variant="vertical">
    <Step>
      <StepLabel>Step 1</StepLabel>
      <StepContent>
        <Box padding="md">
          <Text>Content for step 1</Text>
        </Box>
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Step 2</StepLabel>
      <StepContent>
        <Box padding="md">
          <Text>Content for step 2</Text>
        </Box>
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Step 3</StepLabel>
      <StepContent>
        <Box padding="md">
          <Text>Content for step 3</Text>
        </Box>
      </StepContent>
    </Step>
  </Stepper>
);

// Interactive Stepper
export const Interactive = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3'];
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box marginTop="lg">
        {activeStep === steps.length ? (
          <Box>
            <Text>All steps completed!</Text>
            <Button onClick={handleReset} variant="secondary" marginTop="md">
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            <Text>Step {activeStep + 1} content goes here</Text>
            <Box display="flex" gap="md" marginTop="md">
              <Button 
                disabled={activeStep === 0} 
                onClick={handleBack}
                variant="secondary"
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
