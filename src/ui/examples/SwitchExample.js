/**
 * Switch Example Component
 * 
 * This example demonstrates various ways to use the Switch component
 * in real-world scenarios.
 */

import React, { useState } from 'react';
import Switch from '../atoms/Switch';
import Box from '../atoms/Box';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Card from '../molecules/Card';

const SwitchExample = () => {
  // State for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    sms: false,
    inApp: true,
  });
  
  // State for feature flags
  const [featureFlags, setFeatureFlags] = useState({
    betaFeatures: false,
    analytics: true,
    autoSave: true,
  });
  
  // Handle theme toggle
  const handleThemeToggle = (e) => {
    setIsDarkMode(e.target.checked);
    // In a real app, you would apply the theme change here
  };
  
  // Handle notification setting change
  const handleNotificationChange = (setting) => (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: e.target.checked,
    });
  };
  
  // Handle feature flag change
  const handleFeatureFlagChange = (flag) => (e) => {
    setFeatureFlags({
      ...featureFlags,
      [flag]: e.target.checked,
    });
  };

  return (
    <Box padding="lg">
      <Text as="h1" size="xl" marginBottom="md">Switch Component Examples</Text>
      
      {/* Basic Usage */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Basic Usage</Text>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Theme Toggle</Text>
          <Flex alignItems="center">
            <Switch 
              label={`${isDarkMode ? 'Dark' : 'Light'} Mode`}
              checked={isDarkMode}
              onChange={handleThemeToggle}
              variant="primary"
              size="medium"
            />
          </Flex>
        </Card>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Different Sizes</Text>
          <Flex direction="column" gap="md">
            <Switch 
              label="Small Switch"
              size="small"
            />
            <Switch 
              label="Medium Switch"
              size="medium"
            />
            <Switch 
              label="Large Switch"
              size="large"
            />
          </Flex>
        </Card>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Different Variants</Text>
          <Flex direction="column" gap="md">
            <Switch 
              label="Primary Variant"
              variant="primary"
              defaultChecked
            />
            <Switch 
              label="Secondary Variant"
              variant="secondary"
              defaultChecked
            />
            <Switch 
              label="Success Variant"
              variant="success"
              defaultChecked
            />
            <Switch 
              label="Error Variant"
              variant="error"
              defaultChecked
            />
          </Flex>
        </Card>
      </Box>
      
      {/* Advanced Usage */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Advanced Usage</Text>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Notification Settings</Text>
          <Flex direction="column" gap="md">
            <Switch 
              label="Email Notifications"
              checked={notificationSettings.email}
              onChange={handleNotificationChange('email')}
              variant="primary"
            />
            <Switch 
              label="Push Notifications"
              checked={notificationSettings.push}
              onChange={handleNotificationChange('push')}
              variant="primary"
            />
            <Switch 
              label="SMS Notifications"
              checked={notificationSettings.sms}
              onChange={handleNotificationChange('sms')}
              variant="primary"
            />
            <Switch 
              label="In-App Notifications"
              checked={notificationSettings.inApp}
              onChange={handleNotificationChange('inApp')}
              variant="primary"
            />
          </Flex>
          
          <Box marginTop="md" padding="sm" background="background-alt">
            <Text size="sm">
              Current Settings: {JSON.stringify(notificationSettings, null, 2)}
            </Text>
          </Box>
        </Card>
        
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Feature Flags</Text>
          <Flex direction="column" gap="md">
            <Switch 
              label="Enable Beta Features"
              checked={featureFlags.betaFeatures}
              onChange={handleFeatureFlagChange('betaFeatures')}
              variant="accent"
            />
            <Switch 
              label="Enable Analytics"
              checked={featureFlags.analytics}
              onChange={handleFeatureFlagChange('analytics')}
              variant="accent"
            />
            <Switch 
              label="Enable Auto-Save"
              checked={featureFlags.autoSave}
              onChange={handleFeatureFlagChange('autoSave')}
              variant="accent"
            />
          </Flex>
          
          <Box marginTop="md" padding="sm" background="background-alt">
            <Text size="sm">
              Active Features: {Object.entries(featureFlags)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(', ')}
            </Text>
          </Box>
        </Card>
      </Box>
      
      {/* Form Integration */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Form Integration</Text>
        
        <Card>
          <Text as="h3" size="md" marginBottom="sm">User Preferences Form</Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const formValues = Object.fromEntries(formData.entries());
              
              // Convert checkbox values to booleans
              Object.keys(formValues).forEach(key => {
                if (formValues[key] === 'on') {
                  formValues[key] = true;
                }
              });
              
              // In a real app, you would submit this data to an API
              alert(`Form submitted with values: ${JSON.stringify(formValues, null, 2)}`);
            }}
          >
            <Flex direction="column" gap="md">
              <Switch 
                name="darkMode"
                label="Use Dark Mode"
                defaultChecked={isDarkMode}
              />
              <Switch 
                name="emailNotifications"
                label="Receive Email Notifications"
                defaultChecked={notificationSettings.email}
              />
              <Switch 
                name="saveLoginInfo"
                label="Remember Me"
                defaultChecked
              />
              <Switch 
                name="shareUsageData"
                label="Share Anonymous Usage Data"
                defaultChecked={featureFlags.analytics}
              />
              
              <Box marginTop="md">
                <button type="submit" style={{ padding: '8px 16px' }}>
                  Save Preferences
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
          <Text as="h3" size="md" marginBottom="sm">Responsive Switch</Text>
          <Switch 
            label="This switch changes size based on screen width"
            size={{ base: 'small', md: 'medium', lg: 'large' }}
            variant={{ base: 'primary', md: 'accent', lg: 'success' }}
          />
          <Text size="sm" marginTop="xs">
            Resize your browser window to see the switch change size and color.
          </Text>
        </Card>
      </Box>
    </Box>
  );
};

export default SwitchExample;
