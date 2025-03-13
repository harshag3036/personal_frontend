/**
 * Wizard Example
 * 
 * This file demonstrates how to use the Wizard component.
 */

import React, { useState } from 'react';
import { Wizard } from '../organisms';
import { Button, Text, Input, Stack, Flex } from '../atoms';
import { Card, Checkbox, Select } from '../molecules';

const WizardExample = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    interests: [],
    agreeToTerms: false,
  });

  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [navigationType, setNavigationType] = useState('buttons');
  const [withBorder, setWithBorder] = useState(true);
  const [withShadow, setWithShadow] = useState(false);
  const [withProgressBar, setWithProgressBar] = useState(true);
  const [linear, setLinear] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return {
          ...prev,
          interests: interests.filter(i => i !== interest)
        };
      } else {
        return {
          ...prev,
          interests: [...interests, interest]
        };
      }
    });
  };

  const validatePersonalInfo = () => {
    return formData.firstName && formData.lastName && formData.email;
  };

  const validateAddress = () => {
    return formData.address && formData.city && formData.state && formData.zipCode;
  };

  const validatePreferences = () => {
    return formData.interests.length > 0;
  };

  const validateTerms = () => {
    return formData.agreeToTerms;
  };

  const handleComplete = () => {
    alert('Wizard completed! Form data: ' + JSON.stringify(formData, null, 2));
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        interests: [],
        agreeToTerms: false,
      });
    }
  };

  const toggleVariant = () => {
    const variants = ['default', 'primary', 'secondary', 'compact', 'vertical'];
    const currentIndex = variants.indexOf(variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setVariant(variants[nextIndex]);
  };

  const toggleSize = () => {
    const sizes = ['sm', 'md', 'lg'];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  const toggleNavigationType = () => {
    const types = ['buttons', 'tabs', 'dots', 'progress'];
    const currentIndex = types.indexOf(navigationType);
    const nextIndex = (currentIndex + 1) % types.length;
    setNavigationType(types[nextIndex]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h2">Wizard Component</Text>
        <Text>A multi-step wizard component for guiding users through complex processes.</Text>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <Button onClick={toggleVariant}>
            Toggle Variant ({variant})
          </Button>
          <Button onClick={toggleSize}>
            Toggle Size ({size})
          </Button>
          <Button onClick={toggleNavigationType}>
            Toggle Navigation Type ({navigationType})
          </Button>
          <Button onClick={() => setWithBorder(!withBorder)}>
            Toggle Border ({withBorder ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setWithShadow(!withShadow)}>
            Toggle Shadow ({withShadow ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setWithProgressBar(!withProgressBar)}>
            Toggle Progress Bar ({withProgressBar ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setLinear(!linear)}>
            Toggle Linear Mode ({linear ? 'On' : 'Off'})
          </Button>
        </div>
      </div>

      <Card style={{ padding: 0 }}>
        <Wizard
          variant={variant}
          size={size}
          navigationType={navigationType}
          withBorder={withBorder}
          withShadow={withShadow}
          withProgressBar={withProgressBar}
          linear={linear}
          onComplete={handleComplete}
          onCancel={handleCancel}
        >
          <Wizard.Header>
            <Text variant="h3" style={{ padding: '16px' }}>Registration Wizard</Text>
          </Wizard.Header>

          <Wizard.Step 
            title="Personal Information" 
            validate={validatePersonalInfo}
          >
            <Stack spacing="md">
              <Text>Please enter your personal information below.</Text>
              
              <Flex gap="md">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
              </Flex>
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </Stack>
          </Wizard.Step>

          <Wizard.Step 
            title="Address Information" 
            validate={validateAddress}
          >
            <Stack spacing="md">
              <Text>Please enter your address information below.</Text>
              
              <Input
                label="Street Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
              
              <Flex gap="md">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <Input
                  label="State/Province"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
              </Flex>
              
              <Flex gap="md">
                <Input
                  label="Zip/Postal Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <Select
                  label="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="USA">United States</option>
                  <option value="CAN">Canada</option>
                  <option value="MEX">Mexico</option>
                  <option value="GBR">United Kingdom</option>
                  <option value="FRA">France</option>
                  <option value="DEU">Germany</option>
                  <option value="JPN">Japan</option>
                  <option value="AUS">Australia</option>
                </Select>
              </Flex>
            </Stack>
          </Wizard.Step>

          <Wizard.Step 
            title="Preferences" 
            validate={validatePreferences}
          >
            <Stack spacing="md">
              <Text>Please select your interests below (at least one).</Text>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                {['Technology', 'Science', 'Art', 'Music', 'Sports', 'Travel', 'Food', 'Fashion'].map(interest => (
                  <Checkbox
                    key={interest}
                    label={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                  />
                ))}
              </div>
            </Stack>
          </Wizard.Step>

          <Wizard.Step 
            title="Terms & Conditions" 
            validate={validateTerms}
          >
            <Stack spacing="md">
              <Text>Please review and agree to our terms and conditions.</Text>
              
              <div style={{ 
                height: '200px', 
                overflow: 'auto', 
                border: '1px solid var(--color-border)', 
                padding: '16px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-background-light)'
              }}>
                <Text variant="h4">Terms and Conditions</Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, 
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Lorem ipsum dolor sit amet, consectetur 
                  adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam 
                  nisl nunc quis nisl.
                </Text>
                <Text>
                  Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                  nisl nunc quis nisl.
                </Text>
              </div>
              
              <Checkbox
                label="I agree to the terms and conditions"
                checked={formData.agreeToTerms}
                onChange={() => handleCheckboxChange('agreeToTerms')}
              />
            </Stack>
          </Wizard.Step>

          <Wizard.Step title="Summary">
            <Stack spacing="md">
              <Text variant="h4">Registration Summary</Text>
              
              <Card>
                <Stack spacing="sm">
                  <Text variant="h5">Personal Information</Text>
                  <Text>Name: {formData.firstName} {formData.lastName}</Text>
                  <Text>Email: {formData.email}</Text>
                </Stack>
              </Card>
              
              <Card>
                <Stack spacing="sm">
                  <Text variant="h5">Address</Text>
                  <Text>{formData.address}</Text>
                  <Text>{formData.city}, {formData.state} {formData.zipCode}</Text>
                  <Text>{formData.country}</Text>
                </Stack>
              </Card>
              
              <Card>
                <Stack spacing="sm">
                  <Text variant="h5">Interests</Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {formData.interests.map(interest => (
                      <span 
                        key={interest}
                        style={{ 
                          padding: '4px 8px', 
                          backgroundColor: 'var(--color-primary-light)', 
                          borderRadius: '4px',
                          fontSize: '0.875rem'
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Wizard.Step>
        </Wizard>
      </Card>

      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h3">Wizard Features</Text>
        <ul>
          <li>Multiple variants (default, primary, secondary, compact, vertical)</li>
          <li>Different sizes (small, medium, large)</li>
          <li>Various navigation types (buttons, tabs, dots, progress)</li>
          <li>Step validation</li>
          <li>Linear or non-linear navigation</li>
          <li>Progress tracking</li>
          <li>Customizable header, footer, and navigation</li>
          <li>Step lifecycle hooks (onEnter, onExit)</li>
          <li>Accessible with proper ARIA attributes</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </div>
  );
};

export default WizardExample;
