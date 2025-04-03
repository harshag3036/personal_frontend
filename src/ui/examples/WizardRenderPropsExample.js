import React, { useState } from 'react';
import { Wizard, Box, Text, Button, Flex, Stack } from '../index';
import { WIZARD_NAVIGATION_TYPES, WIZARD_STEP_STATES } from '../organisms/Wizard/constants';

/**
 * Wizard Render Props Example
 * 
 * This example demonstrates using the Wizard component with the render props pattern
 * to create a highly customized multi-step form with tailored UI and validation.
 */
const WizardRenderPropsExample = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'basic',
    addons: [],
    complete: false
  });
  
  // Update form data
  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Validation for each step
  const validatePersonalInfo = () => {
    const { name, email } = formData;
    const nameValid = name.trim().length >= 2;
    const emailValid = /\S+@\S+\.\S+/.test(email);
    return nameValid && emailValid;
  };
  
  const validatePlan = () => {
    return !!formData.plan;
  };
  
  // Custom step implementation components
  const PersonalInfoStep = ({ goToNextStep }) => {
    const [errors, setErrors] = useState({});
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      const nameValid = formData.name.trim().length >= 2;
      const emailValid = /\S+@\S+\.\S+/.test(formData.email);
      
      const newErrors = {};
      if (!nameValid) newErrors.name = 'Name must be at least 2 characters';
      if (!emailValid) newErrors.email = 'Please enter a valid email';
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        goToNextStep();
      }
    };
    
    return (
      <Box as="form" onSubmit={handleSubmit} padding="lg">
        <Text as="h2" marginBottom="md">Your Information</Text>
        
        <Stack spacing="md">
          <Box>
            <Text as="label" htmlFor="name" display="block" marginBottom="xs">Name</Text>
            <input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="custom-input"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: errors.name ? '1px solid red' : '1px solid #ddd'
              }}
            />
            {errors.name && (
              <Text color="danger" fontSize="sm" marginTop="xs">{errors.name}</Text>
            )}
          </Box>
          
          <Box>
            <Text as="label" htmlFor="email" display="block" marginBottom="xs">Email</Text>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="custom-input"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: errors.email ? '1px solid red' : '1px solid #ddd'
              }}
            />
            {errors.email && (
              <Text color="danger" fontSize="sm" marginTop="xs">{errors.email}</Text>
            )}
          </Box>
          
          <Flex justifyContent="flex-end" marginTop="md">
            <Button type="submit" variant="primary">Continue</Button>
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  const PlanSelectionStep = ({ goToNextStep, goToPreviousStep }) => {
    const plans = [
      { id: 'basic', name: 'Basic', price: '$9/month', features: ['10 users', '1GB storage', 'Basic support'] },
      { id: 'pro', name: 'Pro', price: '$15/month', features: ['50 users', '10GB storage', 'Priority support'] },
      { id: 'enterprise', name: 'Enterprise', price: '$29/month', features: ['Unlimited users', '100GB storage', '24/7 support'] }
    ];
    
    return (
      <Box padding="lg">
        <Text as="h2" marginBottom="md">Select Your Plan</Text>
        
        <Stack spacing="md">
          <Flex gap="md" wrap="wrap">
            {plans.map(plan => (
              <Box
                key={plan.id}
                padding="md"
                border="1px solid"
                borderColor={formData.plan === plan.id ? 'primary' : 'borderColor'}
                borderRadius="md"
                width="200px"
                cursor="pointer"
                onClick={() => updateFormData('plan', plan.id)}
                backgroundColor={formData.plan === plan.id ? 'rgba(0,0,255,0.05)' : 'transparent'}
              >
                <Text as="h3" fontSize="lg" fontWeight="bold">{plan.name}</Text>
                <Text fontWeight="bold" color="primary" marginBottom="md">{plan.price}</Text>
                
                <Stack spacing="sm">
                  {plan.features.map((feature, index) => (
                    <Text key={index} fontSize="sm">• {feature}</Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </Flex>
          
          <Flex justifyContent="space-between" marginTop="md">
            <Button variant="outline" onClick={goToPreviousStep}>Back</Button>
            <Button variant="primary" onClick={goToNextStep}>Continue</Button>
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  const AddonsStep = ({ goToNextStep, goToPreviousStep }) => {
    const addons = [
      { id: 'storage', name: 'Extra Storage', description: 'Additional 100GB of storage', price: '+$2/month' },
      { id: 'support', name: 'Premium Support', description: '24/7 phone and email support', price: '+$5/month' },
      { id: 'profile', name: 'Custom Profile', description: 'Custom theme and branding options', price: '+$3/month' }
    ];
    
    const toggleAddon = (addonId) => {
      setFormData(prev => {
        const addons = [...prev.addons];
        if (addons.includes(addonId)) {
          return { ...prev, addons: addons.filter(id => id !== addonId) };
        } else {
          return { ...prev, addons: [...addons, addonId] };
        }
      });
    };
    
    return (
      <Box padding="lg">
        <Text as="h2" marginBottom="md">Add-ons</Text>
        <Text color="text-muted" marginBottom="lg">Enhance your plan with add-ons</Text>
        
        <Stack spacing="md">
          {addons.map(addon => (
            <Box
              key={addon.id}
              padding="md"
              border="1px solid"
              borderColor={formData.addons.includes(addon.id) ? 'primary' : 'borderColor'}
              borderRadius="md"
              display="flex"
              alignItems="center"
              gap="md"
              cursor="pointer"
              onClick={() => toggleAddon(addon.id)}
              backgroundColor={formData.addons.includes(addon.id) ? 'rgba(0,0,255,0.05)' : 'transparent'}
            >
              <input
                type="checkbox"
                checked={formData.addons.includes(addon.id)}
                onChange={() => toggleAddon(addon.id)}
              />
              
              <div style={{ flex: 1 }}>
                <Text fontWeight="bold">{addon.name}</Text>
                <Text fontSize="sm" color="text-muted">{addon.description}</Text>
              </div>
              
              <Text color="primary">{addon.price}</Text>
            </Box>
          ))}
          
          <Flex justifyContent="space-between" marginTop="md">
            <Button variant="outline" onClick={goToPreviousStep}>Back</Button>
            <Button variant="primary" onClick={goToNextStep}>Continue</Button>
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  const SummaryStep = ({ goToPreviousStep, updateSummaryData }) => {
    const planNames = {
      basic: 'Basic Plan ($9/month)',
      pro: 'Pro Plan ($15/month)',
      enterprise: 'Enterprise Plan ($29/month)'
    };
    
    const addonNames = {
      storage: 'Extra Storage (+$2/month)',
      support: 'Premium Support (+$5/month)',
      profile: 'Custom Profile (+$3/month)'
    };
    
    const calculateTotal = () => {
      let total = 0;
      
      // Add plan cost
      if (formData.plan === 'basic') total += 9;
      else if (formData.plan === 'pro') total += 15;
      else if (formData.plan === 'enterprise') total += 29;
      
      // Add addon costs
      if (formData.addons.includes('storage')) total += 2;
      if (formData.addons.includes('support')) total += 5;
      if (formData.addons.includes('profile')) total += 3;
      
      return total;
    };
    
    const handleConfirm = () => {
      // In a real app, this would submit the data to a server
      updateFormData('complete', true);
      
      // Update summary data for the wizard to access
      updateSummaryData({
        name: formData.name,
        email: formData.email,
        plan: planNames[formData.plan],
        addons: formData.addons.map(addon => addonNames[addon]),
        total: calculateTotal()
      });
    };
    
    return (
      <Box padding="lg">
        <Text as="h2" marginBottom="md">Summary</Text>
        
        <Stack spacing="lg">
          <Box
            padding="lg"
            backgroundColor="background.secondary"
            borderRadius="md"
          >
            <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
              <div>
                <Text fontWeight="bold">{planNames[formData.plan]}</Text>
              </div>
            </Flex>
            
            {formData.addons.length > 0 && (
              <>
                <Box height="1px" backgroundColor="borderColor" marginY="md" />
                
                <Stack spacing="sm">
                  {formData.addons.map(addon => (
                    <Flex key={addon} justifyContent="space-between">
                      <Text color="text-muted">{addonNames[addon]}</Text>
                    </Flex>
                  ))}
                </Stack>
              </>
            )}
          </Box>
          
          <Flex justifyContent="space-between" padding="md">
            <Text>Total (per month)</Text>
            <Text fontWeight="bold" color="primary">${calculateTotal()}/month</Text>
          </Flex>
          
          <Box 
            padding="md" 
            backgroundColor="rgba(0,0,255,0.05)" 
            borderRadius="md"
            marginTop="lg"
          >
            <Text>
              <strong>Name:</strong> {formData.name}
            </Text>
            <Text>
              <strong>Email:</strong> {formData.email}
            </Text>
          </Box>
          
          <Flex justifyContent="space-between" marginTop="md">
            <Button variant="outline" onClick={goToPreviousStep}>Back</Button>
            <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  const ThankYouStep = () => (
    <Box padding="lg" textAlign="center">
      <Box 
        width="60px" 
        height="60px" 
        borderRadius="50%" 
        backgroundColor="success" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        margin="0 auto 2rem"
      >
        <span style={{ color: 'white', fontSize: '2rem' }}>✓</span>
      </Box>
      
      <Text as="h2" marginBottom="md">Thank you!</Text>
      <Text marginBottom="lg">
        Thanks for confirming your subscription! We hope you enjoy using our platform.
        If you need support, please email us at support@example.com.
      </Text>
    </Box>
  );
  
  return (
    <Box maxWidth="700px" margin="0 auto" padding="xl">
      <Text as="h1" marginBottom="lg">Wizard with Render Props</Text>
      
      <Box 
        border="1px solid" 
        borderColor="borderColor" 
        borderRadius="lg" 
        overflow="hidden"
        boxShadow="0 4px 6px rgba(0,0,0,0.1)"
      >
        <Wizard 
          navigationType={WIZARD_NAVIGATION_TYPES.PROGRESS_BAR}
          withProgressBar={true}
          validateOnNext={true}
        >
          {({ 
            currentStep,
            totalSteps,
            goToStep,
            goToNextStep,
            goToPreviousStep,
            isFirstStep,
            isLastStep,
            stepStates,
            setStepState,
            updateSummaryData
          }) => {
            // Register steps
            const steps = [
              {
                name: 'Personal Info',
                validate: validatePersonalInfo,
                component: <PersonalInfoStep goToNextStep={goToNextStep} />
              },
              {
                name: 'Plan Selection',
                validate: validatePlan,
                component: <PlanSelectionStep goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
              },
              {
                name: 'Add-ons',
                component: <AddonsStep goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
              },
              {
                name: 'Summary',
                component: <SummaryStep goToPreviousStep={goToPreviousStep} updateSummaryData={updateSummaryData} />
              },
              {
                name: 'Thank You',
                component: <ThankYouStep />
              }
            ];
            
            return (
              <Stack>
                {/* Custom header with step indicators */}
                <Flex 
                  backgroundColor="primary" 
                  color="white" 
                  padding="lg"
                  justifyContent="center"
                >
                  <Flex gap="md" maxWidth="500px" width="100%" justifyContent="space-between">
                    {steps.map((step, index) => {
                      const isActive = currentStep === index;
                      const isCompleted = index < currentStep || (formData.complete && index === steps.length - 1);
                      
                      return (
                        <Box 
                          key={index}
                          onClick={() => !isActive && index < currentStep && goToStep(index)}
                          style={{ cursor: !isActive && index < currentStep ? 'pointer' : 'default' }}
                        >
                          <Flex 
                            alignItems="center" 
                            justifyContent="center" 
                            width="32px" 
                            height="32px" 
                            borderRadius="50%" 
                            backgroundColor={isActive ? 'white' : 'transparent'}
                            color={isActive ? 'primary' : 'white'}
                            border="1px solid white"
                            marginBottom="xs"
                          >
                            {isCompleted ? '✓' : index + 1}
                          </Flex>
                          <Text 
                            fontSize="xs" 
                            display={['none', 'none', 'block']}
                          >
                            {step.name}
                          </Text>
                        </Box>
                      );
                    })}
                  </Flex>
                </Flex>
                
                {/* Active step content */}
                {steps[currentStep]?.component}
              </Stack>
            );
          }}
        </Wizard>
      </Box>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Benefits of Render Props with Wizard</Text>
      <ul>
        <li>Complete control over wizard UI while leveraging complex state management</li>
        <li>Custom step validation and navigation logic</li>
        <li>Ability to implement completely custom step indicators and navigation</li>
        <li>Create specialized multi-step forms with domain-specific features</li>
        <li>Maintain state between steps with your own state management</li>
      </ul>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Code Example</Text>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto', 
        fontSize: '0.9em' 
      }}>
{`<Wizard validateOnNext={true}>
  {({ 
    currentStep,
    goToNextStep,
    goToPreviousStep,
    // ...other context properties
  }) => {
    // Define your steps
    const steps = [
      {
        name: 'Step 1',
        component: <Step1 onContinue={goToNextStep} />
      },
      {
        name: 'Step 2',
        component: <Step2 
          onBack={goToPreviousStep}
          onContinue={goToNextStep} 
        />
      },
      // ...more steps
    ];
    
    return (
      <div>
        {/* Custom step indicators */}
        <YourCustomStepIndicator 
          steps={steps} 
          currentStep={currentStep} 
        />
        
        {/* Render the current step */}
        {steps[currentStep].component}
      </div>
    );
  }}
</Wizard>`}
      </pre>
    </Box>
  );
};

export default WizardRenderPropsExample;
