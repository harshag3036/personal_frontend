/**
 * Stack Component Stories
 */

import React from 'react';
import Stack, { STACK_DIRECTIONS, STACK_MODIFIERS } from './index';
import Box from '../Box';
import Text from '../Text';

export default {
  title: 'Atoms/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: 'A component for stacking elements vertically or horizontally with consistent spacing. This component is a specialized version of Flex with a simpler API.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: Object.values(STACK_DIRECTIONS),
      description: 'Stack direction or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'vertical' },
      },
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Spacing between items or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'md' },
      },
    },
    align: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end', 'baseline', 'flex-start', 'flex-end'],
      description: 'Alignment of items or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end'],
      description: 'Justification of items or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    dividers: {
      control: 'boolean',
      description: 'Show dividers between items or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Stack as',
      table: {
        type: { summary: 'string | React.ComponentType' },
        defaultValue: { summary: 'div' },
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
      control: { type: null },
      description: 'Stack content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Helper function to create a box with a border
const BoxItem = ({ children, ...props }) => (
  <Box 
    padding="md" 
    border="1px solid" 
    borderColor="border-medium" 
    borderRadius="md"
    background="background-secondary"
    {...props}
  >
    {children}
  </Box>
);

// Basic Stack
export const Basic = {
  args: {
    children: (
      <>
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </>
    ),
  },
};

// Stack Directions
export const Directions = () => (
  <Box display="flex" flexDirection="column" gap="xl">
    <Box>
      <Text variant="h3" marginBottom="md">Vertical Stack (Default)</Text>
      <Stack spacing="md">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Horizontal Stack</Text>
      <Stack direction="horizontal" spacing="md">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
  </Box>
);

// Stack Spacing
export const Spacing = () => (
  <Box display="flex" flexDirection="column" gap="xl">
    <Box>
      <Text variant="h3" marginBottom="md">Extra Small Spacing (xs)</Text>
      <Stack spacing="xs">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Small Spacing (sm)</Text>
      <Stack spacing="sm">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Spacing (md - Default)</Text>
      <Stack spacing="md">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Spacing (lg)</Text>
      <Stack spacing="lg">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Extra Large Spacing (xl)</Text>
      <Stack spacing="xl">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
  </Box>
);

// Stack Alignment
export const Alignment = () => (
  <Box display="flex" flexDirection="column" gap="xl">
    <Box>
      <Text variant="h3" marginBottom="md">Stretch Alignment (Default)</Text>
      <Stack align="stretch" spacing="md">
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Start Alignment</Text>
      <Stack align="start" spacing="md" direction="horizontal">
        <BoxItem height="50px">Item 1</BoxItem>
        <BoxItem height="75px">Item 2</BoxItem>
        <BoxItem height="100px">Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Center Alignment</Text>
      <Stack align="center" spacing="md" direction="horizontal">
        <BoxItem height="50px">Item 1</BoxItem>
        <BoxItem height="75px">Item 2</BoxItem>
        <BoxItem height="100px">Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">End Alignment</Text>
      <Stack align="end" spacing="md" direction="horizontal">
        <BoxItem height="50px">Item 1</BoxItem>
        <BoxItem height="75px">Item 2</BoxItem>
        <BoxItem height="100px">Item 3</BoxItem>
      </Stack>
    </Box>
  </Box>
);

// Stack Justification
export const Justification = () => (
  <Box display="flex" flexDirection="column" gap="xl">
    <Box>
      <Text variant="h3" marginBottom="md">Start Justification (Default)</Text>
      <Stack justify="start" spacing="md" direction="horizontal" width="100%">
        <BoxItem width="100px">Item 1</BoxItem>
        <BoxItem width="100px">Item 2</BoxItem>
        <BoxItem width="100px">Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Center Justification</Text>
      <Stack justify="center" spacing="md" direction="horizontal" width="100%">
        <BoxItem width="100px">Item 1</BoxItem>
        <BoxItem width="100px">Item 2</BoxItem>
        <BoxItem width="100px">Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">End Justification</Text>
      <Stack justify="end" spacing="md" direction="horizontal" width="100%">
        <BoxItem width="100px">Item 1</BoxItem>
        <BoxItem width="100px">Item 2</BoxItem>
        <BoxItem width="100px">Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Space Between Justification</Text>
      <Stack justify="space-between" spacing="md" direction="horizontal" width="100%">
        <BoxItem width="100px">Item 1</BoxItem>
        <BoxItem width="100px">Item 2</BoxItem>
        <BoxItem width="100px">Item 3</BoxItem>
      </Stack>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Space Around Justification</Text>
      <Stack justify="space-around" spacing="md" direction="horizontal" width="100%">
        <BoxItem width="100px">Item 1</BoxItem>
        <BoxItem width="100px">Item 2</BoxItem>
        <BoxItem width="100px">Item 3</BoxItem>
      </Stack>
    </Box>
  </Box>
);

// Stack with Dividers
export const WithDividers = {
  args: {
    dividers: true,
    children: (
      <>
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </>
    ),
  },
};

// Horizontal Stack with Dividers
export const HorizontalWithDividers = {
  args: {
    direction: 'horizontal',
    dividers: true,
    children: (
      <>
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </>
    ),
  },
};

// Responsive Stack
export const ResponsiveStack = {
  args: {
    direction: {
      base: 'vertical',
      md: 'horizontal',
    },
    spacing: {
      base: 'sm',
      md: 'md',
      lg: 'lg',
    },
    align: {
      base: 'stretch',
      md: 'center',
    },
    children: (
      <>
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </>
    ),
  },
};

// Stack as Different Element
export const AsElement = {
  args: {
    as: 'section',
    children: (
      <>
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </>
    ),
  },
};

// Stack with Custom Styling
export const CustomStyling = {
  args: {
    style: {
      background: 'var(--color-background-tertiary)',
      padding: 'var(--spacing-md)',
      borderRadius: 'var(--border-radius-md)',
    },
    children: (
      <>
        <BoxItem>Item 1</BoxItem>
        <BoxItem>Item 2</BoxItem>
        <BoxItem>Item 3</BoxItem>
      </>
    ),
  },
};

// Nested Stacks
export const NestedStacks = () => (
  <Stack spacing="lg">
    <Text variant="h3">Nested Stacks Example</Text>
    
    <Stack spacing="md">
      <BoxItem>
        <Text variant="h4" marginBottom="sm">Section 1</Text>
        <Stack direction="horizontal" spacing="sm">
          <BoxItem width="100px" height="100px" display="flex" alignItems="center" justifyContent="center">1.1</BoxItem>
          <BoxItem width="100px" height="100px" display="flex" alignItems="center" justifyContent="center">1.2</BoxItem>
          <BoxItem width="100px" height="100px" display="flex" alignItems="center" justifyContent="center">1.3</BoxItem>
        </Stack>
      </BoxItem>
      
      <BoxItem>
        <Text variant="h4" marginBottom="sm">Section 2</Text>
        <Stack direction="horizontal" spacing="sm">
          <BoxItem width="100px" height="100px" display="flex" alignItems="center" justifyContent="center">2.1</BoxItem>
          <BoxItem width="100px" height="100px" display="flex" alignItems="center" justifyContent="center">2.2</BoxItem>
          <BoxItem width="100px" height="100px" display="flex" alignItems="center" justifyContent="center">2.3</BoxItem>
        </Stack>
      </BoxItem>
    </Stack>
  </Stack>
);

// Stack in Real-World Context
export const InContext = () => (
  <Box padding="lg" background="background-secondary" borderRadius="md" maxWidth="600px">
    <Stack spacing="lg">
      <Text variant="h2">User Profile</Text>
      
      <Stack spacing="xs">
        <Text variant="h4">Personal Information</Text>
        <Stack direction="horizontal" spacing="md" dividers>
          <Box>
            <Text variant="label">Name</Text>
            <Text>John Doe</Text>
          </Box>
          <Box>
            <Text variant="label">Email</Text>
            <Text>john.doe@example.com</Text>
          </Box>
          <Box>
            <Text variant="label">Phone</Text>
            <Text>+1 (555) 123-4567</Text>
          </Box>
        </Stack>
      </Stack>
      
      <Stack spacing="xs">
        <Text variant="h4">Address</Text>
        <Box padding="md" background="background-tertiary" borderRadius="md">
          <Stack spacing="sm">
            <Stack direction="horizontal" spacing="md">
              <Box flex="1">
                <Text variant="label">Street</Text>
                <Text>123 Main St</Text>
              </Box>
              <Box width="100px">
                <Text variant="label">Apt/Suite</Text>
                <Text>Apt 4B</Text>
              </Box>
            </Stack>
            <Stack direction="horizontal" spacing="md">
              <Box flex="1">
                <Text variant="label">City</Text>
                <Text>New York</Text>
              </Box>
              <Box width="100px">
                <Text variant="label">State</Text>
                <Text>NY</Text>
              </Box>
              <Box width="100px">
                <Text variant="label">Zip</Text>
                <Text>10001</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      
      <Stack spacing="xs">
        <Text variant="h4">Preferences</Text>
        <Stack direction="horizontal" spacing="md" dividers>
          <Box>
            <Text variant="label">Theme</Text>
            <Text>Dark</Text>
          </Box>
          <Box>
            <Text variant="label">Language</Text>
            <Text>English</Text>
          </Box>
          <Box>
            <Text variant="label">Notifications</Text>
            <Text>Enabled</Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  </Box>
);

// Stack with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Stack className={`ui-stack--${STACK_MODIFIERS.VERTICAL} ui-stack--${STACK_MODIFIERS.DIVIDERS}`}>
      <BoxItem>Vertical Stack with Dividers</BoxItem>
      <BoxItem>Using BEM modifiers</BoxItem>
      <BoxItem>Third item</BoxItem>
    </Stack>
    
    <Stack className={`ui-stack--${STACK_MODIFIERS.HORIZONTAL} ui-stack--${STACK_MODIFIERS.RESPONSIVE}`}>
      <BoxItem>Horizontal Stack</BoxItem>
      <BoxItem>With responsive modifier</BoxItem>
      <BoxItem>Third item</BoxItem>
    </Stack>
  </Box>
);
