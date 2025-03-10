/**
 * Radio Example Component
 * 
 * This example demonstrates various ways to use the Radio component
 * in real-world scenarios.
 */

import React, { useState } from 'react';
import Radio from '../atoms/Radio';
import Box from '../atoms/Box';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Card from '../molecules/Card';

const RadioExample = () => {
  // State for selected plan
  const [selectedPlan, setSelectedPlan] = useState('basic');
  
  // State for selected payment method
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  // State for selected notification preferences
  const [notificationPreference, setNotificationPreference] = useState('email');
  
  // Handle plan selection
  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };
  
  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  // Handle notification preference selection
  const handleNotificationPreferenceChange = (e) => {
    setNotificationPreference(e.target.value);
  };

  return (
    <Box padding="lg">
      <Text as="h1" size="xl" marginBottom="md">Radio Component Examples</Text>
      
      {/* Basic Usage */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Basic Usage</Text>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Subscription Plans</Text>
          <Flex direction="column" gap="sm">
            <Radio 
              label="Basic Plan - $9.99/month"
              name="plan"
              value="basic"
              checked={selectedPlan === 'basic'}
              onChange={handlePlanChange}
              variant="primary"
            />
            <Radio 
              label="Pro Plan - $19.99/month"
              name="plan"
              value="pro"
              checked={selectedPlan === 'pro'}
              onChange={handlePlanChange}
              variant="primary"
            />
            <Radio 
              label="Enterprise Plan - $49.99/month"
              name="plan"
              value="enterprise"
              checked={selectedPlan === 'enterprise'}
              onChange={handlePlanChange}
              variant="primary"
            />
          </Flex>
          
          <Box marginTop="md" padding="sm" background="background-alt">
            <Text size="sm">
              Selected Plan: {selectedPlan === 'basic' ? 'Basic Plan' : selectedPlan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
            </Text>
          </Box>
        </Card>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Different Sizes</Text>
          <Flex direction="column" gap="sm">
            <Radio 
              label="Small Radio Button"
              name="size-example"
              value="small"
              size="small"
            />
            <Radio 
              label="Medium Radio Button"
              name="size-example"
              value="medium"
              size="medium"
            />
            <Radio 
              label="Large Radio Button"
              name="size-example"
              value="large"
              size="large"
            />
          </Flex>
        </Card>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Different Variants</Text>
          <Flex direction="column" gap="sm">
            <Radio 
              label="Primary Variant"
              name="variant-example"
              value="primary"
              variant="primary"
            />
            <Radio 
              label="Secondary Variant"
              name="variant-example"
              value="secondary"
              variant="secondary"
            />
            <Radio 
              label="Success Variant"
              name="variant-example"
              value="success"
              variant="success"
            />
            <Radio 
              label="Error Variant"
              name="variant-example"
              value="error"
              variant="error"
            />
          </Flex>
        </Card>
      </Box>
      
      {/* Advanced Usage */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Advanced Usage</Text>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Payment Methods</Text>
          <Flex direction="column" gap="sm">
            <Radio 
              label="Credit Card"
              name="payment"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={handlePaymentMethodChange}
              variant="primary"
            />
            <Radio 
              label="PayPal"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
              variant="primary"
            />
            <Radio 
              label="Bank Transfer"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={handlePaymentMethodChange}
              variant="primary"
            />
            <Radio 
              label="Cryptocurrency"
              name="payment"
              value="crypto"
              checked={paymentMethod === 'crypto'}
              onChange={handlePaymentMethodChange}
              variant="primary"
            />
          </Flex>
          
          {paymentMethod === 'credit' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm" marginBottom="xs">Please enter your credit card details:</Text>
              <Flex direction="column" gap="sm">
                <input type="text" placeholder="Card Number" style={{ padding: '8px' }} />
                <Flex gap="sm">
                  <input type="text" placeholder="MM/YY" style={{ padding: '8px', width: '100px' }} />
                  <input type="text" placeholder="CVC" style={{ padding: '8px', width: '80px' }} />
                </Flex>
              </Flex>
            </Box>
          )}
          
          {paymentMethod === 'paypal' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm">You will be redirected to PayPal to complete your payment.</Text>
            </Box>
          )}
          
          {paymentMethod === 'bank' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm" marginBottom="xs">Please enter your bank details:</Text>
              <Flex direction="column" gap="sm">
                <input type="text" placeholder="Account Number" style={{ padding: '8px' }} />
                <input type="text" placeholder="Routing Number" style={{ padding: '8px' }} />
              </Flex>
            </Box>
          )}
          
          {paymentMethod === 'crypto' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm">Send payment to: 0x1234567890abcdef1234567890abcdef12345678</Text>
            </Box>
          )}
        </Card>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Notification Preferences</Text>
          <Flex direction="column" gap="sm">
            <Radio 
              label="Email Notifications"
              name="notification"
              value="email"
              checked={notificationPreference === 'email'}
              onChange={handleNotificationPreferenceChange}
              variant="accent"
            />
            <Radio 
              label="SMS Notifications"
              name="notification"
              value="sms"
              checked={notificationPreference === 'sms'}
              onChange={handleNotificationPreferenceChange}
              variant="accent"
            />
            <Radio 
              label="Push Notifications"
              name="notification"
              value="push"
              checked={notificationPreference === 'push'}
              onChange={handleNotificationPreferenceChange}
              variant="accent"
            />
            <Radio 
              label="No Notifications"
              name="notification"
              value="none"
              checked={notificationPreference === 'none'}
              onChange={handleNotificationPreferenceChange}
              variant="accent"
            />
          </Flex>
          
          {notificationPreference === 'email' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm" marginBottom="xs">Please confirm your email address:</Text>
              <input type="email" placeholder="Email Address" style={{ padding: '8px', width: '100%' }} />
            </Box>
          )}
          
          {notificationPreference === 'sms' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm" marginBottom="xs">Please enter your phone number:</Text>
              <input type="tel" placeholder="Phone Number" style={{ padding: '8px', width: '100%' }} />
            </Box>
          )}
          
          {notificationPreference === 'push' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm">Push notifications will be sent to your device.</Text>
            </Box>
          )}
          
          {notificationPreference === 'none' && (
            <Box marginTop="md" padding="sm" background="background-alt">
              <Text size="sm">You will not receive any notifications.</Text>
            </Box>
          )}
        </Card>
      </Box>
      
      {/* Form Integration */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Form Integration</Text>
        
        <Card>
          <Text as="h3" size="md" marginBottom="sm">Survey Form</Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const formValues = Object.fromEntries(formData.entries());
              
              // In a real app, you would submit this data to an API
              alert(`Form submitted with values: ${JSON.stringify(formValues, null, 2)}`);
            }}
          >
            <Flex direction="column" gap="md">
              <Box>
                <Text marginBottom="xs">How did you hear about us?</Text>
                <Flex direction="column" gap="sm">
                  <Radio 
                    name="referral"
                    value="search"
                    label="Search Engine"
                  />
                  <Radio 
                    name="referral"
                    value="social"
                    label="Social Media"
                  />
                  <Radio 
                    name="referral"
                    value="friend"
                    label="Friend or Colleague"
                  />
                  <Radio 
                    name="referral"
                    value="other"
                    label="Other"
                  />
                </Flex>
              </Box>
              
              <Box>
                <Text marginBottom="xs">How would you rate your experience?</Text>
                <Flex direction="column" gap="sm">
                  <Radio 
                    name="rating"
                    value="excellent"
                    label="Excellent"
                    variant="success"
                  />
                  <Radio 
                    name="rating"
                    value="good"
                    label="Good"
                    variant="info"
                  />
                  <Radio 
                    name="rating"
                    value="average"
                    label="Average"
                    variant="warning"
                  />
                  <Radio 
                    name="rating"
                    value="poor"
                    label="Poor"
                    variant="error"
                  />
                </Flex>
              </Box>
              
              <Box marginTop="md">
                <button type="submit" style={{ padding: '8px 16px' }}>
                  Submit Survey
                </button>
              </Box>
            </Flex>
          </form>
        </Card>
      </Box>
      
      {/* Responsive Example */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Responsive Example</Text>
        
        <Card>
          <Text as="h3" size="md" marginBottom="sm">Responsive Radio</Text>
          <Radio 
            label="This radio changes size based on screen width"
            size={{ base: 'small', md: 'medium', lg: 'large' }}
            variant={{ base: 'primary', md: 'accent', lg: 'success' }}
            name="responsive-example"
            value="responsive"
          />
          <Text size="sm" marginTop="xs">
            Resize your browser window to see the radio change size and color.
          </Text>
        </Card>
      </Box>
    </Box>
  );
};

export default RadioExample;
