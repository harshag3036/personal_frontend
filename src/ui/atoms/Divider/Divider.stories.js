/**
 * Divider Component Stories
 */

import React from 'react';
import Divider, { DIVIDER_ORIENTATIONS, DIVIDER_MODIFIERS } from './index';
import Box from '../Box';
import Text from '../Text';
import Stack from '../Stack';

export default {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: 'A component for visually separating content.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: Object.values(DIVIDER_ORIENTATIONS),
      description: 'Orientation of the divider or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    color: {
      control: 'text',
      description: 'Color of the divider (from design tokens) or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'border-medium' },
      },
    },
    thickness: {
      control: 'text',
      description: 'Thickness of the divider or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: '1px' },
      },
    },
    margin: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Margin around the divider or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'md' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the divider (for horizontal orientation) or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the divider (for vertical orientation) or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: '100%' },
      },
    },
    withText: {
      control: 'boolean',
      description: 'Whether the divider has text or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Divider as',
      table: {
        type: { summary: 'string | React.ComponentType' },
        defaultValue: { summary: 'hr' },
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
    children: {
      control: 'text',
      description: 'Content for divider with text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Basic Divider
export const Basic = {
  args: {},
};

// Divider Orientations
export const Orientations = () => (
  <Box display="flex" flexDirection="column" gap="xl">
    <Box>
      <Text variant="h3" marginBottom="md">Horizontal Divider (Default)</Text>
      <Box padding="md" background="background-secondary" borderRadius="md">
        <Text marginBottom="md">Content above the divider</Text>
        <Divider />
        <Text marginTop="md">Content below the divider</Text>
      </Box>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Vertical Divider</Text>
      <Box 
        display="flex" 
        height="100px" 
        padding="md" 
        background="background-secondary" 
        borderRadius="md"
      >
        <Text>Content left of the divider</Text>
        <Divider orientation="vertical" margin="lg" />
        <Text>Content right of the divider</Text>
      </Box>
    </Box>
  </Box>
);

// Divider Colors
export const Colors = () => (
  <Stack spacing="lg">
    <Text variant="h3">Divider Colors</Text>
    
    <Box>
      <Text variant="body" marginBottom="xs">Default (border-medium)</Text>
      <Divider />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">Primary</Text>
      <Divider color="primary" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">Secondary</Text>
      <Divider color="secondary" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">Success</Text>
      <Divider color="success-500" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">Error</Text>
      <Divider color="error-500" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">Warning</Text>
      <Divider color="warning-500" />
    </Box>
  </Stack>
);

// Divider Thickness
export const Thickness = () => (
  <Stack spacing="lg">
    <Text variant="h3">Divider Thickness</Text>
    
    <Box>
      <Text variant="body" marginBottom="xs">Default (1px)</Text>
      <Divider />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">2px</Text>
      <Divider thickness="2px" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">3px</Text>
      <Divider thickness="3px" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">5px</Text>
      <Divider thickness="5px" />
    </Box>
  </Stack>
);

// Divider Margin
export const Margins = () => (
  <Stack spacing="lg">
    <Text variant="h3">Divider Margins</Text>
    
    <Box background="background-secondary" padding="md" borderRadius="md">
      <Text variant="body">Extra Small Margin (xs)</Text>
      <Divider margin="xs" />
      <Text variant="body">Content below</Text>
    </Box>
    
    <Box background="background-secondary" padding="md" borderRadius="md">
      <Text variant="body">Small Margin (sm)</Text>
      <Divider margin="sm" />
      <Text variant="body">Content below</Text>
    </Box>
    
    <Box background="background-secondary" padding="md" borderRadius="md">
      <Text variant="body">Medium Margin (md - Default)</Text>
      <Divider margin="md" />
      <Text variant="body">Content below</Text>
    </Box>
    
    <Box background="background-secondary" padding="md" borderRadius="md">
      <Text variant="body">Large Margin (lg)</Text>
      <Divider margin="lg" />
      <Text variant="body">Content below</Text>
    </Box>
    
    <Box background="background-secondary" padding="md" borderRadius="md">
      <Text variant="body">Extra Large Margin (xl)</Text>
      <Divider margin="xl" />
      <Text variant="body">Content below</Text>
    </Box>
  </Stack>
);

// Divider Width
export const Widths = () => (
  <Stack spacing="lg">
    <Text variant="h3">Divider Widths</Text>
    
    <Box>
      <Text variant="body" marginBottom="xs">Default (100%)</Text>
      <Divider />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">75%</Text>
      <Divider width="75%" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">50%</Text>
      <Divider width="50%" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">25%</Text>
      <Divider width="25%" />
    </Box>
    
    <Box>
      <Text variant="body" marginBottom="xs">200px</Text>
      <Divider width="200px" />
    </Box>
  </Stack>
);

// Divider Height (for vertical orientation)
export const Heights = () => (
  <Box>
    <Text variant="h3" marginBottom="lg">Divider Heights (Vertical)</Text>
    
    <Box 
      display="flex" 
      alignItems="center" 
      gap="xl" 
      padding="md" 
      background="background-secondary" 
      borderRadius="md"
      height="200px"
    >
      <Box display="flex" alignItems="center" height="100%">
        <Text>50px</Text>
        <Divider orientation="vertical" height="50px" margin="md" />
        <Text>Content</Text>
      </Box>
      
      <Box display="flex" alignItems="center" height="100%">
        <Text>100px</Text>
        <Divider orientation="vertical" height="100px" margin="md" />
        <Text>Content</Text>
      </Box>
      
      <Box display="flex" alignItems="center" height="100%">
        <Text>150px</Text>
        <Divider orientation="vertical" height="150px" margin="md" />
        <Text>Content</Text>
      </Box>
      
      <Box display="flex" alignItems="center" height="100%">
        <Text>100%</Text>
        <Divider orientation="vertical" height="100%" margin="md" />
        <Text>Content</Text>
      </Box>
    </Box>
  </Box>
);

// Divider with Text
export const WithText = {
  args: {
    withText: true,
    children: 'Section Title',
  },
};

// Divider with Text Variants
export const WithTextVariants = () => (
  <Stack spacing="lg">
    <Text variant="h3">Divider with Text</Text>
    
    <Divider withText>Default</Divider>
    
    <Divider withText color="primary">Primary</Divider>
    
    <Divider withText color="secondary">Secondary</Divider>
    
    <Divider withText color="success-500">Success</Divider>
    
    <Divider withText color="error-500">Error</Divider>
    
    <Divider withText thickness="2px">Thicker</Divider>
  </Stack>
);

// Divider as Different Element
export const AsElement = {
  args: {
    as: 'div',
  },
};

// Responsive Divider
export const ResponsiveDivider = {
  args: {
    orientation: {
      base: 'horizontal',
      md: 'vertical',
    },
    margin: {
      base: 'sm',
      md: 'md',
      lg: 'lg',
    },
    thickness: {
      base: '1px',
      md: '2px',
      lg: '3px',
    },
    color: {
      base: 'border-medium',
      md: 'primary',
      lg: 'secondary',
    },
  },
};

// Divider with Custom Styling
export const CustomStyling = {
  args: {
    style: {
      background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
      height: '3px',
      borderRadius: '1.5px',
    },
  },
};

// Divider in Context
export const InContext = () => (
  <Box padding="lg" background="background-secondary" borderRadius="md" maxWidth="600px">
    <Stack spacing="md">
      <Text variant="h2">User Profile</Text>
      <Divider />
      
      <Stack spacing="xs">
        <Text variant="h4">Personal Information</Text>
        <Box padding="md" background="background-tertiary" borderRadius="md">
          <Stack spacing="md">
            <Box>
              <Text variant="label">Name</Text>
              <Text>John Doe</Text>
            </Box>
            <Divider margin="xs" />
            <Box>
              <Text variant="label">Email</Text>
              <Text>john.doe@example.com</Text>
            </Box>
            <Divider margin="xs" />
            <Box>
              <Text variant="label">Phone</Text>
              <Text>+1 (555) 123-4567</Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
      
      <Divider withText>Address Information</Divider>
      
      <Box padding="md" background="background-tertiary" borderRadius="md">
        <Stack spacing="md">
          <Box>
            <Text variant="label">Street</Text>
            <Text>123 Main St, Apt 4B</Text>
          </Box>
          <Divider margin="xs" />
          <Box>
            <Text variant="label">City, State, Zip</Text>
            <Text>New York, NY 10001</Text>
          </Box>
        </Stack>
      </Box>
      
      <Divider withText>Preferences</Divider>
      
      <Box padding="md" background="background-tertiary" borderRadius="md">
        <Stack direction="horizontal" spacing="lg">
          <Box>
            <Text variant="label">Theme</Text>
            <Text>Dark</Text>
          </Box>
          <Divider orientation="vertical" height="40px" margin="sm" />
          <Box>
            <Text variant="label">Language</Text>
            <Text>English</Text>
          </Box>
          <Divider orientation="vertical" height="40px" margin="sm" />
          <Box>
            <Text variant="label">Notifications</Text>
            <Text>Enabled</Text>
          </Box>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

// Divider with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Divider className={`ui-divider--${DIVIDER_MODIFIERS.HORIZONTAL}`} />
    
    <Box display="flex" height="50px">
      <Text>Left</Text>
      <Divider className={`ui-divider--${DIVIDER_MODIFIERS.VERTICAL}`} margin="md" />
      <Text>Right</Text>
    </Box>
    
    <Divider className={`ui-divider--${DIVIDER_MODIFIERS.WITH_TEXT}`}>
      With Text Modifier
    </Divider>
  </Box>
);
