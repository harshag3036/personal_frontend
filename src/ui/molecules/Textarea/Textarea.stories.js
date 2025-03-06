/**
 * Textarea Component Stories
 */

import React, { useState } from 'react';
import Textarea, { TEXTAREA_VARIANTS, TEXTAREA_SIZES, TEXTAREA_STATES } from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Stack from '../../atoms/Stack';

export default {
  title: 'Molecules/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: 'A customizable textarea component with support for variants, sizes, states, and responsive props.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Textarea ID',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Textarea name',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Textarea value (controlled)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when textarea value changes',
      table: {
        type: { summary: 'function' },
      },
    },
    label: {
      control: 'text',
      description: 'Textarea label',
      table: {
        type: { summary: 'node' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Textarea placeholder',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(TEXTAREA_VARIANTS),
      description: 'Textarea variant or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(TEXTAREA_SIZES),
      description: 'Textarea size or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: 'select',
      options: Object.values(TEXTAREA_STATES),
      description: 'Textarea state or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'default' },
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
      description: 'Whether the textarea is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rows: {
      control: 'number',
      description: 'Number of rows',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    minRows: {
      control: 'number',
      description: 'Minimum number of rows (for auto-resize)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    maxRows: {
      control: 'number',
      description: 'Maximum number of rows (for auto-resize)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether to auto-resize the textarea',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'Maximum length of the textarea value',
      table: {
        type: { summary: 'number' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the textarea should take up the full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
      description: 'Element to render the Textarea as',
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
      description: 'Extensions to apply to the textarea',
      table: {
        type: { summary: 'Array<string>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// Basic Textarea
export const Basic = {
  args: {
    id: 'basic',
    name: 'basic',
    label: 'Basic textarea',
    placeholder: 'Enter text here...',
  },
};

// Textarea Variants
export const Variants = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Default Variant</Text>
      <Textarea 
        id="default" 
        name="default" 
        variant={TEXTAREA_VARIANTS.DEFAULT} 
        label="Default variant" 
        placeholder="Enter text here..."
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Filled Variant</Text>
      <Textarea 
        id="filled" 
        name="filled" 
        variant={TEXTAREA_VARIANTS.FILLED} 
        label="Filled variant" 
        placeholder="Enter text here..."
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Outlined Variant</Text>
      <Textarea 
        id="outlined" 
        name="outlined" 
        variant={TEXTAREA_VARIANTS.OUTLINED} 
        label="Outlined variant" 
        placeholder="Enter text here..."
      />
    </Box>
  </Stack>
);

// Textarea Sizes
export const Sizes = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Small Size</Text>
      <Textarea 
        id="small" 
        name="small" 
        size={TEXTAREA_SIZES.SMALL} 
        label="Small textarea" 
        placeholder="Enter text here..."
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Size</Text>
      <Textarea 
        id="medium" 
        name="medium" 
        size={TEXTAREA_SIZES.MEDIUM} 
        label="Medium textarea" 
        placeholder="Enter text here..."
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Size</Text>
      <Textarea 
        id="large" 
        name="large" 
        size={TEXTAREA_SIZES.LARGE} 
        label="Large textarea" 
        placeholder="Enter text here..."
      />
    </Box>
  </Stack>
);

// Textarea States
export const States = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Default State</Text>
      <Textarea 
        id="default-state" 
        name="default-state" 
        state={TEXTAREA_STATES.DEFAULT} 
        label="Default state" 
        placeholder="Enter text here..."
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Success State</Text>
      <Textarea 
        id="success" 
        name="success" 
        state={TEXTAREA_STATES.SUCCESS} 
        label="Success state" 
        placeholder="Enter text here..."
        helperText="Input is valid"
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Error State</Text>
      <Textarea 
        id="error" 
        name="error" 
        state={TEXTAREA_STATES.ERROR} 
        label="Error state" 
        placeholder="Enter text here..."
        errorText="This field is required"
      />
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Warning State</Text>
      <Textarea 
        id="warning" 
        name="warning" 
        state={TEXTAREA_STATES.WARNING} 
        label="Warning state" 
        placeholder="Enter text here..."
        helperText="Please review your input"
      />
    </Box>
  </Stack>
);

// Textarea with Helper Text
export const WithHelperText = {
  args: {
    id: 'helper-text',
    name: 'helper-text',
    label: 'Textarea with helper text',
    placeholder: 'Enter text here...',
    helperText: 'This is a helpful description',
  },
};

// Textarea with Error Text
export const WithErrorText = {
  args: {
    id: 'error-text',
    name: 'error-text',
    label: 'Textarea with error',
    placeholder: 'Enter text here...',
    state: TEXTAREA_STATES.ERROR,
    errorText: 'This field is required',
  },
};

// Disabled Textarea
export const Disabled = {
  args: {
    id: 'disabled',
    name: 'disabled',
    label: 'Disabled textarea',
    placeholder: 'Enter text here...',
    disabled: true,
  },
};

// Required Textarea
export const Required = {
  args: {
    id: 'required',
    name: 'required',
    label: 'Required textarea',
    placeholder: 'Enter text here...',
    required: true,
  },
};

// Read-only Textarea
export const ReadOnly = {
  args: {
    id: 'readonly',
    name: 'readonly',
    label: 'Read-only textarea',
    value: 'This text cannot be edited',
    readOnly: true,
  },
};

// Full Width Textarea
export const FullWidth = {
  args: {
    id: 'full-width',
    name: 'full-width',
    label: 'Full width textarea',
    placeholder: 'Enter text here...',
    fullWidth: true,
  },
};

// Auto-resize Textarea
export const AutoResize = {
  args: {
    id: 'auto-resize',
    name: 'auto-resize',
    label: 'Auto-resize textarea',
    placeholder: 'Type here and watch me grow...',
    autoResize: true,
    minRows: 2,
    maxRows: 10,
  },
};

// Textarea with Character Count
export const WithCharacterCount = {
  args: {
    id: 'char-count',
    name: 'char-count',
    label: 'Textarea with character count',
    placeholder: 'Enter text here...',
    maxLength: 100,
  },
};

// Controlled Textarea
export const Controlled = () => {
  const [value, setValue] = useState('This is a controlled textarea');
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Controlled Textarea</Text>
        <Textarea 
          id="controlled" 
          name="controlled" 
          value={value} 
          onChange={handleChange} 
          label="Controlled textarea" 
        />
      </Box>
      
      <Box>
        <Text variant="body1">
          Current value: {value}
        </Text>
      </Box>
      
      <Box>
        <button 
          onClick={() => setValue('')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#144272',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px',
          }}
        >
          Clear
        </button>
        
        <button 
          onClick={() => setValue('Reset to default value')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#144272',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </Box>
    </Stack>
  );
};

// Responsive Textarea
export const ResponsiveTextarea = {
  args: {
    id: 'responsive',
    name: 'responsive',
    label: 'Responsive textarea',
    placeholder: 'Enter text here...',
    size: {
      base: TEXTAREA_SIZES.SMALL,
      md: TEXTAREA_SIZES.MEDIUM,
      lg: TEXTAREA_SIZES.LARGE,
    },
    helperText: 'This textarea changes size at different breakpoints. Resize the window to see the changes.',
  },
};

// Polymorphic Textarea
export const PolymorphicTextarea = {
  args: {
    id: 'polymorphic',
    name: 'polymorphic',
    label: 'Polymorphic textarea',
    placeholder: 'Enter text here...',
    as: 'section',
    helperText: 'This textarea is rendered as a section element instead of a div.',
  },
};

// Textarea with Custom Styling
export const CustomStyling = {
  args: {
    id: 'custom-style',
    name: 'custom-style',
    label: 'Custom styled textarea',
    placeholder: 'Enter text here...',
    style: {
      '--color-brand-500': 'purple',
      '--color-brand-600': 'darkpurple',
    },
    helperText: 'This textarea has custom styling applied through CSS variables.',
  },
};

// Textarea in Form Context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  
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
    
    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <Box maxWidth="500px">
      <Text variant="h3" marginBottom="md">Textarea in Form Context</Text>
      
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
            <Textarea
              id="message"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleInputChange('message')}
              state={errors.message ? TEXTAREA_STATES.ERROR : TEXTAREA_STATES.DEFAULT}
              errorText={errors.message}
              placeholder="Enter your message here..."
              rows={5}
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
