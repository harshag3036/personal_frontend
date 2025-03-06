/**
 * Checkbox Component Usage Example
 * 
 * This file demonstrates how to use the Checkbox component in various scenarios.
 */

import React, { useState } from 'react';
import { Checkbox, Stack, Box, Text } from '../index';

/**
 * CheckboxExample Component
 * 
 * Demonstrates various ways to use the Checkbox component:
 * - Basic usage
 * - Controlled checkbox
 * - Different sizes
 * - Different states (checked, unchecked, indeterminate, disabled, invalid)
 * - With description
 * - Checkbox group
 * - Responsive props
 */
const CheckboxExample = () => {
  // State for controlled checkbox
  const [isChecked, setIsChecked] = useState(false);
  
  // State for checkbox group
  const [selectedOptions, setSelectedOptions] = useState({
    option1: true,
    option2: false,
    option3: false,
  });
  
  // State for indeterminate checkbox with children
  const [parentChecked, setParentChecked] = useState(false);
  const [parentIndeterminate, setParentIndeterminate] = useState(true);
  const [childrenChecked, setChildrenChecked] = useState({
    child1: true,
    child2: false,
    child3: false,
  });
  
  // Handler for controlled checkbox
  const handleControlledChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  // Handler for checkbox group
  const handleGroupChange = (option) => (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: event.target.checked,
    });
  };
  
  // Handlers for indeterminate checkbox with children
  const updateParentState = (newChildrenState) => {
    const checkedCount = Object.values(newChildrenState).filter(Boolean).length;
    const totalCount = Object.values(newChildrenState).length;
    
    setParentIndeterminate(checkedCount > 0 && checkedCount < totalCount);
    setParentChecked(checkedCount === totalCount);
  };
  
  const handleParentChange = (event) => {
    const newCheckedState = event.target.checked;
    setParentChecked(newCheckedState);
    setParentIndeterminate(false);
    
    const newChildrenState = Object.keys(childrenChecked).reduce((acc, key) => {
      acc[key] = newCheckedState;
      return acc;
    }, {});
    
    setChildrenChecked(newChildrenState);
  };
  
  const handleChildChange = (child) => (event) => {
    const newChildrenState = {
      ...childrenChecked,
      [child]: event.target.checked,
    };
    
    setChildrenChecked(newChildrenState);
    updateParentState(newChildrenState);
  };
  
  return (
    <Stack spacing="xl">
      {/* Section: Basic Usage */}
      <Box>
        <Text variant="h2" marginBottom="md">Basic Usage</Text>
        <Checkbox label="Accept terms and conditions" />
      </Box>
      
      {/* Section: Controlled Checkbox */}
      <Box>
        <Text variant="h2" marginBottom="md">Controlled Checkbox</Text>
        <Stack spacing="md">
          <Checkbox 
            label={`Controlled checkbox (${isChecked ? 'checked' : 'unchecked'})`} 
            checked={isChecked} 
            onChange={handleControlledChange} 
          />
          <button onClick={() => setIsChecked(!isChecked)}>
            Toggle checkbox
          </button>
        </Stack>
      </Box>
      
      {/* Section: Checkbox Sizes */}
      <Box>
        <Text variant="h2" marginBottom="md">Checkbox Sizes</Text>
        <Stack spacing="md">
          <Checkbox size="sm" label="Small checkbox" />
          <Checkbox size="md" label="Medium checkbox" />
          <Checkbox size="lg" label="Large checkbox" />
        </Stack>
      </Box>
      
      {/* Section: Checkbox States */}
      <Box>
        <Text variant="h2" marginBottom="md">Checkbox States</Text>
        <Stack spacing="md">
          <Checkbox label="Unchecked checkbox" />
          <Checkbox label="Checked checkbox" defaultChecked />
          <Checkbox label="Indeterminate checkbox" indeterminate />
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
          <Checkbox label="Invalid checkbox" invalid />
          <Checkbox 
            label="Invalid checkbox with error message" 
            invalid 
            errorMessage="This field is required" 
          />
        </Stack>
      </Box>
      
      {/* Section: Checkbox with Description */}
      <Box>
        <Text variant="h2" marginBottom="md">Checkbox with Description</Text>
        <Checkbox 
          label="Subscribe to newsletter" 
          description="Receive updates about new products and features" 
        />
      </Box>
      
      {/* Section: Checkbox Group */}
      <Box>
        <Text variant="h2" marginBottom="md">Checkbox Group</Text>
        <Stack spacing="md">
          <Text variant="body1" marginBottom="md">
            Select your favorite fruits:
          </Text>
          
          <Checkbox 
            label="Apples" 
            checked={selectedOptions.option1} 
            onChange={handleGroupChange('option1')} 
          />
          <Checkbox 
            label="Bananas" 
            checked={selectedOptions.option2} 
            onChange={handleGroupChange('option2')} 
          />
          <Checkbox 
            label="Oranges" 
            checked={selectedOptions.option3} 
            onChange={handleGroupChange('option3')} 
          />
          
          <Text variant="body1">
            Selected options: {Object.entries(selectedOptions)
              .filter(([_, value]) => value)
              .map(([key]) => key.replace('option', ''))
              .map(num => {
                switch(num) {
                  case '1': return 'Apples';
                  case '2': return 'Bananas';
                  case '3': return 'Oranges';
                  default: return '';
                }
              })
              .join(', ') || 'None'}
          </Text>
        </Stack>
      </Box>
      
      {/* Section: Indeterminate Checkbox with Children */}
      <Box>
        <Text variant="h2" marginBottom="md">Indeterminate Checkbox with Children</Text>
        
        <Checkbox 
          label="Select all items" 
          checked={parentChecked} 
          indeterminate={parentIndeterminate} 
          onChange={handleParentChange} 
        />
        
        <Box marginLeft="lg" marginTop="md">
          <Stack spacing="sm">
            <Checkbox 
              label="Item 1" 
              checked={childrenChecked.child1} 
              onChange={handleChildChange('child1')} 
            />
            <Checkbox 
              label="Item 2" 
              checked={childrenChecked.child2} 
              onChange={handleChildChange('child2')} 
            />
            <Checkbox 
              label="Item 3" 
              checked={childrenChecked.child3} 
              onChange={handleChildChange('child3')} 
            />
          </Stack>
        </Box>
      </Box>
      
      {/* Section: Responsive Checkbox */}
      <Box>
        <Text variant="h2" marginBottom="md">Responsive Checkbox</Text>
        <Checkbox 
          label="Responsive checkbox" 
          size={{ 
            base: "sm", 
            md: "md", 
            lg: "lg" 
          }}
          description="This checkbox changes size at different breakpoints. Resize the window to see the changes." 
        />
      </Box>
      
      {/* Section: Form Example */}
      <Box>
        <Text variant="h2" marginBottom="md">Form Example</Text>
        <Box 
          as="form" 
          onSubmit={(e) => e.preventDefault()} 
          style={{ 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '8px',
            maxWidth: '500px'
          }}
        >
          <Stack spacing="md">
            <Text variant="h3">Sign up for our service</Text>
            
            <Box>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '8px',
                  marginTop: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </Box>
            
            <Box>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '8px',
                  marginTop: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </Box>
            
            <Checkbox
              label="I agree to the terms and conditions"
              required
            />
            
            <Checkbox
              label="I would like to receive the newsletter"
              description="We'll send you updates about new products and features"
            />
            
            <Box marginTop="md">
              <button 
                type="submit"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#144272',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default CheckboxExample;
