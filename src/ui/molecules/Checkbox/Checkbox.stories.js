/**
 * Checkbox Component Stories
 */

import React, { useState } from 'react';
import Checkbox, { CHECKBOX_SIZES, CHECKBOX_MODIFIERS } from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Stack from '../../atoms/Stack';

export default {
  title: 'Molecules/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'A customizable checkbox component with support for sizes, states, and responsive props.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox label',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: 'Additional description text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the checkbox has an error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display when invalid',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(CHECKBOX_SIZES),
      description: 'Checkbox size or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'md' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler',
      table: {
        type: { summary: 'function' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Checkbox as',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'label' },
      },
    },
    inputProps: {
      control: 'object',
      description: 'Additional props for the input element',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

// Basic Checkbox
export const Basic = {
  args: {
    label: 'Basic checkbox',
  },
};

// Checkbox Sizes
export const Sizes = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Small Checkbox</Text>
      <Checkbox size="sm" label="Small checkbox" />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Checkbox</Text>
      <Checkbox size="md" label="Medium checkbox" />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Checkbox</Text>
      <Checkbox size="lg" label="Large checkbox" />
    </Box>
  </Stack>
);

// Checkbox States
export const States = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Unchecked</Text>
      <Checkbox label="Unchecked checkbox" />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Checked</Text>
      <Checkbox label="Checked checkbox" defaultChecked />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Indeterminate</Text>
      <Checkbox label="Indeterminate checkbox" indeterminate />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Disabled</Text>
      <Checkbox label="Disabled checkbox" disabled />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Disabled Checked</Text>
      <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Invalid</Text>
      <Checkbox label="Invalid checkbox" invalid />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Invalid with Error Message</Text>
      <Checkbox 
        label="Invalid checkbox with error message" 
        invalid 
        errorMessage="This field is required" 
      />
    </Box>
  </Stack>
);

// Checkbox with Description
export const WithDescription = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Receive updates about new products and features',
  },
};

// Controlled Checkbox
export const Controlled = () => {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Controlled Checkbox</Text>
        <Checkbox 
          label={`Controlled checkbox (${isChecked ? 'checked' : 'unchecked'})`} 
          checked={isChecked} 
          onChange={handleChange} 
        />
      </Box>
      
      <Box>
        <Text variant="body1">
          This checkbox is controlled by React state. The current value is: {isChecked ? 'checked' : 'unchecked'}
        </Text>
      </Box>
      
      <Box>
        <button onClick={() => setIsChecked(!isChecked)}>
          Toggle checkbox
        </button>
      </Box>
    </Stack>
  );
};

// Checkbox Group
export const CheckboxGroup = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    option1: true,
    option2: false,
    option3: false,
  });
  
  const handleChange = (option) => (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: event.target.checked,
    });
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Checkbox Group</Text>
        <Text variant="body1" marginBottom="md">
          Select your favorite fruits:
        </Text>
        
        <Stack spacing="md">
          <Checkbox 
            label="Apples" 
            checked={selectedOptions.option1} 
            onChange={handleChange('option1')} 
          />
          <Checkbox 
            label="Bananas" 
            checked={selectedOptions.option2} 
            onChange={handleChange('option2')} 
          />
          <Checkbox 
            label="Oranges" 
            checked={selectedOptions.option3} 
            onChange={handleChange('option3')} 
          />
        </Stack>
      </Box>
      
      <Box>
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
      </Box>
    </Stack>
  );
};

// Indeterminate Checkbox with Children
export const IndeterminateWithChildren = () => {
  const [parentChecked, setParentChecked] = useState(false);
  const [parentIndeterminate, setParentIndeterminate] = useState(true);
  const [childrenChecked, setChildrenChecked] = useState({
    child1: true,
    child2: false,
    child3: false,
  });
  
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
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Indeterminate Checkbox with Children</Text>
        
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
    </Stack>
  );
};

// Responsive Checkbox
export const ResponsiveCheckbox = {
  args: {
    label: 'Responsive checkbox',
    size: {
      base: 'sm',
      md: 'md',
      lg: 'lg',
    },
    description: 'This checkbox changes size at different breakpoints. Resize the window to see the changes.',
  },
};

// Polymorphic Checkbox
export const PolymorphicCheckbox = {
  args: {
    label: 'Polymorphic checkbox',
    as: 'div',
    description: 'This checkbox is rendered as a div element instead of a label.',
  },
};

// Checkbox with Custom Styling
export const CustomStyling = {
  args: {
    label: 'Custom styled checkbox',
    style: {
      '--color-brand-500': 'purple',
      '--color-brand-600': 'darkpurple',
    },
    description: 'This checkbox has custom styling applied through CSS variables.',
  },
};

// Checkbox in Form Context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agreeToTerms: false,
    receiveNewsletter: false,
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when field is changed
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <Box maxWidth="500px">
      <Text variant="h3" marginBottom="md">Checkbox in Form Context</Text>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <Box>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '8px',
                marginTop: '4px',
                border: errors.name ? '1px solid red' : '1px solid #ccc',
              }}
            />
            {errors.name && (
              <Text style={{ color: 'red', fontSize: '14px' }}>{errors.name}</Text>
            )}
          </Box>
          
          <Box>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '8px',
                marginTop: '4px',
                border: errors.email ? '1px solid red' : '1px solid #ccc',
              }}
            />
            {errors.email && (
              <Text style={{ color: 'red', fontSize: '14px' }}>{errors.email}</Text>
            )}
          </Box>
          
          <Box>
            <Checkbox
              label="I agree to the terms and conditions"
              checked={formData.agreeToTerms}
              onChange={handleInputChange('agreeToTerms')}
              invalid={!!errors.agreeToTerms}
              errorMessage={errors.agreeToTerms}
            />
          </Box>
          
          <Box>
            <Checkbox
              label="I would like to receive the newsletter"
              checked={formData.receiveNewsletter}
              onChange={handleInputChange('receiveNewsletter')}
              description="We'll send you updates about new products and features"
            />
          </Box>
          
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
      </form>
    </Box>
  );
};

// Checkbox with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Checkbox 
      label="Unchecked Checkbox" 
      className={`ui-checkbox--${CHECKBOX_MODIFIERS.UNCHECKED}`}
    />
    
    <Checkbox 
      label="Checked Checkbox" 
      defaultChecked
      className={`ui-checkbox--${CHECKBOX_MODIFIERS.CHECKED}`}
    />
    
    <Checkbox 
      label="Indeterminate Checkbox" 
      indeterminate
      className={`ui-checkbox--${CHECKBOX_MODIFIERS.INDETERMINATE}`}
    />
    
    <Checkbox 
      label="Disabled Checkbox" 
      disabled
      className={`ui-checkbox--${CHECKBOX_MODIFIERS.DISABLED}`}
    />
    
    <Checkbox 
      label="Focused Checkbox" 
      className={`ui-checkbox--${CHECKBOX_MODIFIERS.FOCUSED}`}
    />
    
    <Checkbox 
      label="Invalid Checkbox" 
      invalid
      className={`ui-checkbox--${CHECKBOX_MODIFIERS.INVALID}`}
    />
  </Box>
);
