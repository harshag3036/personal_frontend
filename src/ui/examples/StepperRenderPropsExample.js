import React, { useState } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Stack from '../atoms/Stack';
import Flex from '../atoms/Flex';
import Divider from '../atoms/Divider';
import Stepper from '../molecules/Stepper/Stepper';
import Step from '../molecules/Stepper/Step';
import StepLabel from '../molecules/Stepper/StepLabel';
import StepContent from '../molecules/Stepper/StepContent';
import { STEPPER_VARIANTS, CONNECTOR_TYPES, STEP_STATES } from '../molecules/Stepper/constants';

/**
 * StepperRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the Stepper component.
 */
const StepperRenderPropsExample = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Mock data for steps
  const steps = [
    { label: 'Account Setup', description: 'Create your account' },
    { label: 'Personal Details', description: 'Fill in your information' },
    { label: 'Preferences', description: 'Choose your settings' },
    { label: 'Confirmation', description: 'Review and confirm' }
  ];
  
  return (
    <Stack spacing="xl" p={4}>
      <Box mb={4}>
        <Text variant="h2">Stepper with Render Props</Text>
        <Text mb={4}>The Stepper component supports render props for complete UI customization</Text>
      </Box>
      
      {/* Standard Stepper (without render props) */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Standard Stepper</Text>
        <Stepper activeStep={activeStep} nonLinear>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Flex mt={4} justifyContent="space-between">
          <Button 
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button 
            onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStep === steps.length - 1}
            variant="primary"
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      </Box>
      
      <Divider my={4} />
      
      {/* Custom Stepper with Render Props */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Custom Styled Stepper with Render Props</Text>
        <Stepper 
          activeStep={1} 
          nonLinear
          variant={STEPPER_VARIANTS.HORIZONTAL}
        >
          {(stepperState) => (
            <Box width="100%">
              <Flex justifyContent="space-between" width="100%" mb={4}>
                {steps.map((step, index) => (
                  <Box 
                    key={index} 
                    onClick={() => stepperState.nonLinear && stepperState.setStep(index)}
                    style={{ cursor: stepperState.nonLinear ? 'pointer' : 'default' }}
                  >
                    <Flex direction="column" alignItems="center">
                      <Box 
                        width="50px" 
                        height="50px" 
                        borderRadius="50%" 
                        bg={
                          stepperState.getStepState(index) === STEP_STATES.COMPLETED ? 'green.500' :
                          stepperState.getStepState(index) === STEP_STATES.ACTIVE ? 'blue.500' :
                          'gray.300'
                        }
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                        mb={2}
                      >
                        {stepperState.getStepState(index) === STEP_STATES.COMPLETED ? '✓' : index + 1}
                      </Box>
                      <Text 
                        fontWeight={stepperState.getStepState(index) === STEP_STATES.ACTIVE ? 'bold' : 'normal'}
                        color={
                          stepperState.getStepState(index) === STEP_STATES.COMPLETED ? 'green.600' :
                          stepperState.getStepState(index) === STEP_STATES.ACTIVE ? 'blue.600' :
                          'gray.600'
                        }
                        textAlign="center"
                      >
                        {step.label}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Flex>
              
              {/* Connecting lines between steps */}
              <Box position="relative" height="2px" bg="gray.200" mt={-28} mb={20}>
                <Box 
                  position="absolute" 
                  height="100%" 
                  bg="green.500" 
                  width={`${(stepperState.activeStep / (steps.length - 1)) * 100}%`}
                />
              </Box>
              
              {/* Step content */}
              <Box p={4} borderRadius="md" bg="blue.50" borderLeft="4px solid" borderColor="blue.500">
                <Text fontWeight="bold">{steps[stepperState.activeStep].label}</Text>
                <Text color="gray.700" mt={1}>{steps[stepperState.activeStep].description}</Text>
              </Box>
              
              {/* Navigation buttons */}
              <Flex mt={4} justifyContent="space-between">
                <Button 
                  onClick={stepperState.prevStep}
                  disabled={stepperState.activeStep === 0}
                >
                  Back
                </Button>
                <Button 
                  onClick={stepperState.nextStep}
                  disabled={stepperState.activeStep === steps.length - 1}
                  variant="primary"
                >
                  {stepperState.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Flex>
            </Box>
          )}
        </Stepper>
      </Box>
      
      <Divider my={4} />
      
      {/* Vertical Stepper with Render Props */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Vertical Stepper with Render Props</Text>
        <Stepper 
          activeStep={2} 
          variant={STEPPER_VARIANTS.VERTICAL} 
          connectorType={CONNECTOR_TYPES.LINE}
          nonLinear
        >
          {(stepperState) => (
            <Stack spacing={0} width="100%">
              {steps.map((step, index) => {
                const stepState = stepperState.getStepState(index);
                const isActive = stepState === STEP_STATES.ACTIVE;
                const isCompleted = stepState === STEP_STATES.COMPLETED;
                
                return (
                  <Box key={index} mb={index < steps.length - 1 ? 4 : 0}>
                    <Flex alignItems="flex-start">
                      {/* Step circle */}
                      <Box 
                        width="36px" 
                        height="36px" 
                        borderRadius="50%" 
                        bg={isCompleted ? 'purple.500' : isActive ? 'purple.600' : 'gray.300'}
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        fontSize="sm"
                        mr={3}
                        onClick={() => stepperState.nonLinear && stepperState.setStep(index)}
                        style={{ cursor: stepperState.nonLinear ? 'pointer' : 'default' }}
                      >
                        {isCompleted ? '✓' : index + 1}
                      </Box>
                      
                      {/* Step content */}
                      <Box flex="1">
                        <Text 
                          fontWeight={isActive ? 'bold' : 'normal'} 
                          color={isCompleted ? 'purple.700' : isActive ? 'purple.800' : 'gray.700'}
                          onClick={() => stepperState.nonLinear && stepperState.setStep(index)}
                          style={{ cursor: stepperState.nonLinear ? 'pointer' : 'default' }}
                        >
                          {step.label}
                        </Text>
                        
                        {isActive && (
                          <Box 
                            mt={2} 
                            p={3} 
                            borderRadius="md" 
                            bg="purple.50" 
                            borderLeft="3px solid" 
                            borderColor="purple.400"
                          >
                            <Text color="gray.800" fontSize="sm">{step.description}</Text>
                            <Flex mt={3} justifyContent="flex-end">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                mr={2}
                                onClick={stepperState.prevStep}
                                disabled={index === 0}
                              >
                                Back
                              </Button>
                              <Button 
                                size="sm" 
                                colorScheme="purple"
                                onClick={stepperState.nextStep}
                                disabled={index === steps.length - 1}
                              >
                                Continue
                              </Button>
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <Box 
                        ml="18px" 
                        height="24px" 
                        borderLeft="2px solid" 
                        borderColor={isCompleted ? 'purple.500' : 'gray.300'} 
                        mt={1}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>
          )}
        </Stepper>
      </Box>
      
      <Divider my={4} />
      
      {/* Interactive Stepper with Render Props */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Interactive Progress Stepper with Render Props</Text>
        <Stepper 
          activeStep={1} 
          nonLinear
        >
          {(stepperState) => {
            const progressPercent = Math.round((stepperState.activeStep / (steps.length - 1)) * 100);
            
            return (
              <Box width="100%">
                {/* Progress bar */}
                <Box mb={4}>
                  <Flex alignItems="center" mb={1}>
                    <Text fontWeight="bold" mr={2}>Progress</Text>
                    <Text>{progressPercent}%</Text>
                  </Flex>
                  <Box position="relative" height="8px" bg="gray.100" borderRadius="full" overflow="hidden">
                    <Box 
                      position="absolute" 
                      height="100%" 
                      width={`${progressPercent}%`} 
                      bg="teal.500"
                      borderRadius="full"
                    />
                  </Box>
                </Box>
                
                {/* Step indicators */}
                <Flex justifyContent="space-between" mb={6}>
                  {steps.map((step, index) => {
                    const stepState = stepperState.getStepState(index);
                    return (
                      <Box key={index} textAlign="center">
                        <Box 
                          width="12px" 
                          height="12px" 
                          borderRadius="full" 
                          bg={
                            stepState === STEP_STATES.COMPLETED ? 'teal.500' :
                            stepState === STEP_STATES.ACTIVE ? 'teal.200' :
                            'gray.200'
                          }
                          mx="auto"
                          mb={2}
                          cursor="pointer"
                          onClick={() => stepperState.setStep(index)}
                        />
                        <Text 
                          fontSize="xs" 
                          color={
                            stepState === STEP_STATES.COMPLETED ? 'teal.600' :
                            stepState === STEP_STATES.ACTIVE ? 'teal.800' :
                            'gray.500'
                          }
                        >
                          {step.label}
                        </Text>
                      </Box>
                    );
                  })}
                </Flex>
                
                {/* Current step content */}
                <Box p={5} bg="gray.50" borderRadius="lg" boxShadow="sm" mb={4}>
                  <Text variant="h4" mb={3} color="teal.700">{steps[stepperState.activeStep].label}</Text>
                  <Text color="gray.700" mb={4}>{steps[stepperState.activeStep].description}</Text>
                  
                  {/* Placeholder form content */}
                  {stepperState.activeStep === 0 && (
                    <Stack spacing={3}>
                      <Box>
                        <Text mb={1} fontWeight="medium">Email</Text>
                        <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '8px' }} />
                      </Box>
                      <Box>
                        <Text mb={1} fontWeight="medium">Password</Text>
                        <input type="password" placeholder="Create a password" style={{ width: '100%', padding: '8px' }} />
                      </Box>
                    </Stack>
                  )}
                  
                  {stepperState.activeStep === 1 && (
                    <Stack spacing={3}>
                      <Box>
                        <Text mb={1} fontWeight="medium">Full Name</Text>
                        <input type="text" placeholder="Enter your full name" style={{ width: '100%', padding: '8px' }} />
                      </Box>
                      <Box>
                        <Text mb={1} fontWeight="medium">Phone Number</Text>
                        <input type="tel" placeholder="Enter your phone number" style={{ width: '100%', padding: '8px' }} />
                      </Box>
                    </Stack>
                  )}
                  
                  {stepperState.activeStep === 2 && (
                    <Stack spacing={3}>
                      <Box>
                        <Text mb={1} fontWeight="medium">Notification Preferences</Text>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input type="checkbox" /> Email notifications
                          </label>
                          <label style={{ display: 'block', marginBottom: '8px' }}>
                            <input type="checkbox" /> SMS notifications
                          </label>
                          <label style={{ display: 'block' }}>
                            <input type="checkbox" /> Push notifications
                          </label>
                        </div>
                      </Box>
                    </Stack>
                  )}
                  
                  {stepperState.activeStep === 3 && (
                    <Box textAlign="center" py={4}>
                      <Text fontWeight="bold" fontSize="xl" color="teal.600" mb={2}>
                        All steps completed!
                      </Text>
                      <Text color="gray.600">
                        Your account has been set up successfully.
                      </Text>
                    </Box>
                  )}
                </Box>
                
                {/* Navigation buttons */}
                <Flex justifyContent="space-between">
                  <Button 
                    onClick={stepperState.prevStep}
                    disabled={stepperState.activeStep === 0}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={stepperState.nextStep}
                    disabled={stepperState.activeStep === steps.length - 1}
                    colorScheme="teal"
                  >
                    {stepperState.activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                </Flex>
              </Box>
            );
          }}
        </Stepper>
      </Box>
    </Stack>
  );
};

export default StepperRenderPropsExample;
