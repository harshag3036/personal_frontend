/**
 * Select Component Stories
 */

import React, { useState } from 'react';
import Select, { SELECT_VARIANTS, SELECT_SIZES, SELECT_STATES } from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Stack from '../../atoms/Stack';

export default {
  title: 'Molecules/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'A customizable select/dropdown component with support for variants, sizes, states, and responsive props.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to display in the select',
      table: {
        type: { summary: 'Array<{value: string|number, label: ReactNode}>' },
      },
    },
    value: {
      control: 'text',
      description: 'Selected value (controlled)',
      table: {
        type: { summary: 'string|number' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
      table: {
        type: { summary: 'function' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(SELECT_VARIANTS),
      description: 'Select variant or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(SELECT_SIZES),
      description: 'Select size or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: 'select',
      options: Object.values(SELECT_STATES),
      description: 'Select state or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Select label',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
      table: {
        type: { summary: 'string' },
      },
    },
    errorText: {
      control: 'text',
      description: 'Error text (shown when state is ERROR)',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the select should take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      control: 'text',
      description: 'Icon to display at the start of the select',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    endIcon: {
      control: 'text',
      description: 'Icon to display at the end of the select',
      table: {
        type: { summary: 'ReactNode' },
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
    as: {
      control: 'text',
      description: 'Element to render the Select as',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
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
    extensions: {
      control: 'array',
      description: 'Extensions to apply to the select',
      table: {
        type: { summary: 'Array<string>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// Mock options for all stories
const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

// Basic Select
export const Basic = {
  args: {
    options: mockOptions,
    label: 'Basic select',
  },
};

// Select Variants
export const Variants = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Default Variant</Text>
      <Select 
        options={mockOptions} 
        variant={SELECT_VARIANTS.DEFAULT} 
        label="Default variant" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Filled Variant</Text>
      <Select 
        options={mockOptions} 
        variant={SELECT_VARIANTS.FILLED} 
        label="Filled variant" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Outlined Variant</Text>
      <Select 
        options={mockOptions} 
        variant={SELECT_VARIANTS.OUTLINED} 
        label="Outlined variant" 
      />
    </Box>
  </Stack>
);

// Select Sizes
export const Sizes = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Small Size</Text>
      <Select 
        options={mockOptions} 
        size={SELECT_SIZES.SMALL} 
        label="Small select" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Size</Text>
      <Select 
        options={mockOptions} 
        size={SELECT_SIZES.MEDIUM} 
        label="Medium select" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Size</Text>
      <Select 
        options={mockOptions} 
        size={SELECT_SIZES.LARGE} 
        label="Large select" 
      />
    </Box>
  </Stack>
);

// Select States
export const States = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Default State</Text>
      <Select 
        options={mockOptions} 
        state={SELECT_STATES.DEFAULT} 
        label="Default state" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Success State</Text>
      <Select 
        options={mockOptions} 
        state={SELECT_STATES.SUCCESS} 
        label="Success state" 
        helperText="Selection is valid" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Error State</Text>
      <Select 
        options={mockOptions} 
        state={SELECT_STATES.ERROR} 
        label="Error state" 
        errorText="This field is required" 
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Warning State</Text>
      <Select 
        options={mockOptions} 
        state={SELECT_STATES.WARNING} 
        label="Warning state" 
        helperText="Please review your selection" 
      />
    </Box>
  </Stack>
);

// Select with Helper Text
export const WithHelperText = {
  args: {
    options: mockOptions,
    label: 'Select with helper text',
    helperText: 'This is a helpful description',
  },
};

// Select with Error Text
export const WithErrorText = {
  args: {
    options: mockOptions,
    label: 'Select with error',
    state: SELECT_STATES.ERROR,
    errorText: 'This field is required',
  },
};

// Disabled Select
export const Disabled = {
  args: {
    options: mockOptions,
    label: 'Disabled select',
    disabled: true,
  },
};

// Required Select
export const Required = {
  args: {
    options: mockOptions,
    label: 'Required select',
    required: true,
  },
};

// Full Width Select
export const FullWidth = {
  args: {
    options: mockOptions,
    label: 'Full width select',
    fullWidth: true,
  },
};

// Select with Icons
export const WithIcons = () => {
  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">With Start Icon</Text>
        <Select 
          options={mockOptions} 
          label="Select with start icon" 
          startIcon={<SearchIcon />} 
        />
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">With End Icon</Text>
        <Select 
          options={mockOptions} 
          label="Select with end icon" 
          endIcon={<ArrowIcon />} 
        />
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">With Both Icons</Text>
        <Select 
          options={mockOptions} 
          label="Select with both icons" 
          startIcon={<SearchIcon />} 
          endIcon={<ArrowIcon />} 
        />
      </Box>
    </Stack>
  );
};

// Controlled Select
export const Controlled = () => {
  const [selectedValue, setSelectedValue] = useState('option2');
  
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Controlled Select</Text>
        <Select 
          options={mockOptions} 
          value={selectedValue} 
          onChange={handleChange} 
          label={`Controlled select (${selectedValue})`} 
        />
      </Box>
      
      <Box>
        <Text variant="body1">
          This select is controlled by React state. The current value is: {selectedValue}
        </Text>
      </Box>
      
      <Box>
        <Stack direction="row" spacing="md">
          {mockOptions.map(option => (
            <button 
              key={option.value} 
              onClick={() => setSelectedValue(option.value)}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedValue === option.value ? '#144272' : '#e0e0e0',
                color: selectedValue === option.value ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Set to {option.label}
            </button>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

// Responsive Select
export const ResponsiveSelect = {
  args: {
    options: mockOptions,
    label: 'Responsive select',
    size: {
      base: SELECT_SIZES.SMALL,
      md: SELECT_SIZES.MEDIUM,
      lg: SELECT_SIZES.LARGE,
    },
    helperText: 'This select changes size at different breakpoints. Resize the window to see the changes.',
  },
};

// Polymorphic Select
export const PolymorphicSelect = {
  args: {
    options: mockOptions,
    label: 'Polymorphic select',
    as: 'section',
    helperText: 'This select is rendered as a section element instead of a div.',
  },
};

// Select with Custom Styling
export const CustomStyling = {
  args: {
    options: mockOptions,
    label: 'Custom styled select',
    style: {
      '--color-brand-500': 'purple',
      '--color-brand-600': 'darkpurple',
    },
    helperText: 'This select has custom styling applied through CSS variables.',
  },
};

// Select in Form Context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    interests: [],
  });
  
  const [errors, setErrors] = useState({});
  
  const countryOptions = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'in', label: 'India' },
  ];
  
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    
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
  
  const handleSelectChange = (field) => (value) => {
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
    
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <Box maxWidth="500px">
      <Text variant="h3" marginBottom="md">Select in Form Context</Text>
      
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
            <Select
              options={countryOptions}
              value={formData.country}
              onChange={handleSelectChange('country')}
              label="Country"
              state={errors.country ? SELECT_STATES.ERROR : SELECT_STATES.DEFAULT}
              errorText={errors.country}
              fullWidth
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
