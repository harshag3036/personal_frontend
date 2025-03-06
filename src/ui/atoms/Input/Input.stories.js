/**
 * Input Component Stories
 */

import React from 'react';
import Input, { INPUT_VARIANTS, INPUT_SIZES, INPUT_STATES, INPUT_MODIFIERS } from './index';
import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';

export default {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'A customizable input component with support for variants, sizes, states, and responsive props.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url', 'date', 'time', 'datetime-local'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(INPUT_VARIANTS),
      description: 'Input variant or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(INPUT_SIZES),
      description: 'Input size or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: 'select',
      options: Object.values(INPUT_STATES),
      description: 'Input state or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Input label',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder',
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
      description: 'Whether the input is disabled or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      control: { type: null },
      description: 'Icon to display at the start of the input',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    endIcon: {
      control: { type: null },
      description: 'Icon to display at the end of the input',
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
    style: {
      control: 'object',
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
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
  },
};

// Basic Input
export const Basic = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

// All Input Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Input variant="default" label="Default Input" placeholder="Default variant" />
    <Input variant="filled" label="Filled Input" placeholder="Filled variant" />
    <Input variant="outlined" label="Outlined Input" placeholder="Outlined variant" />
  </Box>
);

// Input Sizes
export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Input size="small" label="Small Input" placeholder="Small size" />
    <Input size="medium" label="Medium Input" placeholder="Medium size" />
    <Input size="large" label="Large Input" placeholder="Large size" />
  </Box>
);

// Input States
export const States = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Input state="default" label="Default State" placeholder="Default state" />
    <Input state="success" label="Success State" placeholder="Success state" helperText="Input is valid" />
    <Input state="error" label="Error State" placeholder="Error state" errorText="This field is required" />
    <Input state="warning" label="Warning State" placeholder="Warning state" helperText="Please check your input" />
  </Box>
);

// Input with Icons
export const WithIcons = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Input 
      startIcon={<span>🔍</span>} 
      label="Search" 
      placeholder="Search..." 
    />
    <Input 
      endIcon={<span>📅</span>} 
      label="Date" 
      placeholder="Select a date" 
    />
    <Input 
      startIcon={<span>📧</span>} 
      endIcon={<span>✓</span>} 
      label="Email" 
      placeholder="Enter your email" 
    />
  </Box>
);

// Full Width Input
export const FullWidth = {
  args: {
    fullWidth: true,
    label: 'Full Width Input',
    placeholder: 'This input takes up the full width',
  },
};

// Disabled Input
export const Disabled = {
  args: {
    disabled: true,
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    value: 'Cannot edit this value',
  },
};

// Required Input
export const Required = {
  args: {
    required: true,
    label: 'Required Input',
    placeholder: 'This field is required',
  },
};

// Input with Helper Text
export const WithHelperText = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters long',
  },
};

// Input with Error Text
export const WithErrorText = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    state: 'error',
    errorText: 'Please enter a valid email address',
  },
};

// Input Types
export const InputTypes = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Input type="text" label="Text Input" placeholder="Text input" />
    <Input type="password" label="Password Input" placeholder="Password input" />
    <Input type="email" label="Email Input" placeholder="Email input" />
    <Input type="number" label="Number Input" placeholder="Number input" />
    <Input type="search" label="Search Input" placeholder="Search input" startIcon={<span>🔍</span>} />
    <Input type="tel" label="Telephone Input" placeholder="Telephone input" />
    <Input type="url" label="URL Input" placeholder="URL input" />
    <Input type="date" label="Date Input" />
    <Input type="time" label="Time Input" />
    <Input type="datetime-local" label="Datetime Input" />
  </Box>
);

// Responsive Input
export const ResponsiveInput = {
  args: {
    variant: {
      base: 'default',
      md: 'filled',
      lg: 'outlined',
    },
    size: {
      base: 'small',
      md: 'medium',
      lg: 'large',
    },
    fullWidth: {
      base: true,
      md: false,
    },
    label: 'Responsive Input',
    placeholder: 'This input changes based on screen size',
  },
};

// Input with Custom Styling
export const CustomStyling = {
  args: {
    label: 'Custom Styled Input',
    placeholder: 'Custom styling',
    style: {
      '--color-brand-500': '#9c27b0',
      '--color-brand-100': 'rgba(156, 39, 176, 0.2)',
    },
  },
};

// Input in Form Context
export const InFormContext = () => (
  <Box 
    padding="lg" 
    background="background-secondary" 
    borderRadius="md"
    display="flex"
    flexDirection="column"
    gap="md"
    maxWidth="400px"
  >
    <Text variant="h3">Sign Up Form</Text>
    
    <Input 
      label="Full Name" 
      placeholder="Enter your full name" 
      required 
      fullWidth 
    />
    
    <Input 
      label="Email" 
      type="email" 
      placeholder="Enter your email" 
      required 
      fullWidth 
      startIcon={<span>📧</span>}
    />
    
    <Input 
      label="Password" 
      type="password" 
      placeholder="Enter your password" 
      required 
      fullWidth 
      helperText="Password must be at least 8 characters long"
    />
    
    <Input 
      label="Confirm Password" 
      type="password" 
      placeholder="Confirm your password" 
      required 
      fullWidth 
    />
    
    <Flex justifyContent="flex-end">
      <button style={{ padding: '8px 16px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
        Sign Up
      </button>
    </Flex>
  </Box>
);

// Input with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Input 
      className={`ui-input--${INPUT_MODIFIERS.FILLED} ui-input--${INPUT_MODIFIERS.LARGE}`}
      label="Filled Large Input"
      placeholder="Using BEM modifiers"
    />
    <Input 
      className={`ui-input--${INPUT_MODIFIERS.OUTLINED} ui-input--${INPUT_MODIFIERS.SMALL}`}
      label="Outlined Small Input"
      placeholder="Using BEM modifiers"
    />
    <Input 
      className={`ui-input--${INPUT_MODIFIERS.DEFAULT} ui-input--${INPUT_MODIFIERS.SUCCESS}`}
      label="Success Input"
      placeholder="Using BEM modifiers"
      helperText="Input is valid"
    />
  </Box>
);
