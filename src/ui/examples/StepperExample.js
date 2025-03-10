import React, { useState } from 'react';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent 
} from '../molecules/Stepper';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Card from '../molecules/Card';
import Stack from '../atoms/Stack';
import Input from '../atoms/Input';
import Flex from '../atoms/Flex';

/**
 * StepperExample Component
 * 
 * Demonstrates a multi-step form using the Stepper component.
 */
const StepperExample = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      zipCode: ''
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const steps = [
    {
      label: 'Personal Information',
      content: (
        <Stack spacing="md">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </Stack>
      )
    },
    {
      label: 'Address Information',
      content: (
        <Stack spacing="md">
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
          <Flex gap="md">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
            <Input
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter your zip code"
              required
            />
          </Flex>
        </Stack>
      )
    },
    {
      label: 'Review',
      content: (
        <Card>
          <Stack spacing="md">
            <Text variant="h3">Review Your Information</Text>
            <Box>
              <Text variant="subtitle">Personal Information</Text>
              <Text>Name: {formData.name}</Text>
              <Text>Email: {formData.email}</Text>
            </Box>
            <Box>
              <Text variant="subtitle">Address Information</Text>
              <Text>Address: {formData.address}</Text>
              <Text>City: {formData.city}</Text>
              <Text>Zip Code: {formData.zipCode}</Text>
            </Box>
          </Stack>
        </Card>
      )
    }
  ];
  
  return (
    <Box maxWidth="600px" margin="0 auto">
      <Text variant="h2" marginBottom="lg">Multi-step Form Example</Text>
      
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box marginTop="lg" marginBottom="lg">
        {activeStep === steps.length ? (
          <Box textAlign="center">
            <Text variant="h3" marginBottom="md">Form Submitted Successfully!</Text>
            <Text marginBottom="lg">Thank you for your submission.</Text>
            <Button onClick={handleReset} variant="secondary">
              Start Over
            </Button>
          </Box>
        ) : (
          <>
            <Box padding="lg" marginBottom="lg" border="1px solid #eee" borderRadius="md">
              {steps[activeStep].content}
            </Box>
            
            <Flex justifyContent="space-between">
              <Button 
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="secondary"
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default StepperExample;
