/**
 * Card Component Stories
 */

import React from 'react';
import Card, { CARD_VARIANTS, CARD_MODIFIERS } from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Stack from '../../atoms/Stack';
import Divider from '../../atoms/Divider';

export default {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'A customizable card component with support for variants, responsive props, and polymorphic rendering.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(CARD_VARIANTS),
      description: 'Card variant or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'default' },
      },
    },
    header: {
      control: 'text',
      description: 'Card header content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    footer: {
      control: 'text',
      description: 'Card footer content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the card should take full width or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    padding: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Padding for the card content or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    radius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius for the card or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    elevation: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Elevation (shadow) for the card or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Card as',
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
    onClick: {
      action: 'clicked',
      description: 'Click handler (for interactive cards)',
      table: {
        type: { summary: 'function' },
      },
    },
    children: {
      control: { type: null },
      description: 'Card content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Basic Card
export const Basic = {
  args: {
    children: 'This is a basic card with default styling.',
  },
};

// Card Variants
export const Variants = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Default Card</Text>
      <Card>
        <Text>This is a default card with a subtle shadow and border.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Elevated Card</Text>
      <Card variant="elevated">
        <Text>This is an elevated card with a more pronounced shadow and no border.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Outlined Card</Text>
      <Card variant="outlined">
        <Text>This is an outlined card with a border and no shadow.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Interactive Card</Text>
      <Card variant="interactive" onClick={() => console.log('Card clicked')}>
        <Text>This is an interactive card. Click me!</Text>
      </Card>
    </Box>
  </Stack>
);

// Card with Header and Footer
export const WithHeaderAndFooter = {
  args: {
    header: 'Card Header',
    footer: 'Card Footer',
    children: 'This card has a header and footer.',
  },
};

// Card with Complex Header and Footer
export const ComplexHeaderFooter = () => (
  <Card>
    <div className="ui-card__header">
      <Stack direction="horizontal" justify="space-between" align="center">
        <Text variant="h4">Advanced Header</Text>
        <Button variant="text" size="sm">Action</Button>
      </Stack>
    </div>
    
    <div className="ui-card__content">
      <Text>This card has a complex header and footer with multiple elements.</Text>
      <Box marginY="md">
        <Divider />
      </Box>
      <Text>You can add any content here.</Text>
    </div>
    
    <div className="ui-card__footer">
      <Stack direction="horizontal" justify="flex-end" spacing="sm">
        <Button variant="outlined">Cancel</Button>
        <Button variant="filled">Save</Button>
      </Stack>
    </div>
  </Card>
);

// Full Width Card
export const FullWidth = {
  args: {
    fullWidth: true,
    children: 'This card takes up the full width of its container.',
  },
};

// Card with Custom Padding
export const CustomPadding = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Small Padding</Text>
      <Card padding="sm">
        <Text>This card has small padding.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Padding</Text>
      <Card padding="md">
        <Text>This card has medium padding.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Padding</Text>
      <Card padding="lg">
        <Text>This card has large padding.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Extra Large Padding</Text>
      <Card padding="xl">
        <Text>This card has extra large padding.</Text>
      </Card>
    </Box>
  </Stack>
);

// Card with Custom Border Radius
export const CustomRadius = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Small Radius</Text>
      <Card radius="sm">
        <Text>This card has a small border radius.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Radius</Text>
      <Card radius="md">
        <Text>This card has a medium border radius.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Radius</Text>
      <Card radius="lg">
        <Text>This card has a large border radius.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Full Radius</Text>
      <Card radius="full">
        <Text>This card has a full border radius (pill shape).</Text>
      </Card>
    </Box>
  </Stack>
);

// Card with Custom Elevation
export const CustomElevation = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Small Elevation</Text>
      <Card elevation="sm">
        <Text>This card has a small elevation (shadow).</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Medium Elevation</Text>
      <Card elevation="md">
        <Text>This card has a medium elevation (shadow).</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Large Elevation</Text>
      <Card elevation="lg">
        <Text>This card has a large elevation (shadow).</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Extra Large Elevation</Text>
      <Card elevation="xl">
        <Text>This card has an extra large elevation (shadow).</Text>
      </Card>
    </Box>
  </Stack>
);

// Polymorphic Card
export const PolymorphicCard = () => (
  <Stack spacing="lg">
    <Box>
      <Text variant="h3" marginBottom="md">Card as Article</Text>
      <Card as="article">
        <Text>This card is rendered as an article element.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Card as Section</Text>
      <Card as="section">
        <Text>This card is rendered as a section element.</Text>
      </Card>
    </Box>
    
    <Box>
      <Text variant="h3" marginBottom="md">Card as Aside</Text>
      <Card as="aside">
        <Text>This card is rendered as an aside element.</Text>
      </Card>
    </Box>
  </Stack>
);

// Responsive Card
export const ResponsiveCard = {
  args: {
    variant: {
      base: 'default',
      md: 'elevated',
      lg: 'outlined',
    },
    padding: {
      base: 'sm',
      md: 'md',
      lg: 'lg',
    },
    radius: {
      base: 'sm',
      md: 'md',
      lg: 'lg',
    },
    children: 'This card has responsive properties that change at different breakpoints. Resize the window to see the changes.',
  },
};

// Interactive Card with onClick
export const InteractiveWithOnClick = {
  args: {
    onClick: () => console.log('Card clicked'),
    children: 'This card is interactive because it has an onClick handler. Click me!',
  },
};

// Card with Custom Styling
export const CustomStyling = {
  args: {
    style: {
      background: 'linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-secondary-100) 100%)',
      border: '2px solid var(--color-primary-500)',
    },
    children: 'This card has custom styling applied through the style prop.',
  },
};

// Empty Card
export const EmptyCard = {
  args: {},
};

// Card Grid Layout
export const CardGrid = () => (
  <Box 
    display="grid" 
    gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
    gap="lg"
  >
    <Card>
      <Text variant="h4" marginBottom="sm">Card 1</Text>
      <Text>This is the first card in a grid layout.</Text>
    </Card>
    
    <Card>
      <Text variant="h4" marginBottom="sm">Card 2</Text>
      <Text>This is the second card in a grid layout.</Text>
    </Card>
    
    <Card>
      <Text variant="h4" marginBottom="sm">Card 3</Text>
      <Text>This is the third card in a grid layout.</Text>
    </Card>
    
    <Card>
      <Text variant="h4" marginBottom="sm">Card 4</Text>
      <Text>This is the fourth card in a grid layout.</Text>
    </Card>
  </Box>
);

// Card in Real-World Context
export const InContext = () => (
  <Box maxWidth="800px">
    <Card>
      <div className="ui-card__header">
        <Text variant="h3">User Profile</Text>
      </div>
      
      <div className="ui-card__content">
        <Stack spacing="lg">
          <Box>
            <Text variant="h4" marginBottom="sm">Personal Information</Text>
            <Card variant="outlined" padding="md">
              <Stack spacing="md">
                <Box>
                  <Text variant="label">Name</Text>
                  <Text>John Doe</Text>
                </Box>
                <Divider />
                <Box>
                  <Text variant="label">Email</Text>
                  <Text>john.doe@example.com</Text>
                </Box>
                <Divider />
                <Box>
                  <Text variant="label">Phone</Text>
                  <Text>+1 (555) 123-4567</Text>
                </Box>
              </Stack>
            </Card>
          </Box>
          
          <Box>
            <Text variant="h4" marginBottom="sm">Recent Activity</Text>
            <Stack spacing="md">
              <Card variant="outlined" padding="sm">
                <Text variant="label">Yesterday</Text>
                <Text>Updated profile picture</Text>
              </Card>
              
              <Card variant="outlined" padding="sm">
                <Text variant="label">3 days ago</Text>
                <Text>Changed password</Text>
              </Card>
              
              <Card variant="outlined" padding="sm">
                <Text variant="label">1 week ago</Text>
                <Text>Added new payment method</Text>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </div>
      
      <div className="ui-card__footer">
        <Stack direction="horizontal" justify="flex-end" spacing="sm">
          <Button variant="outlined">Edit Profile</Button>
          <Button variant="filled">Save Changes</Button>
        </Stack>
      </div>
    </Card>
  </Box>
);

// Card with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Card className={`ui-card--${CARD_MODIFIERS.DEFAULT}`}>
      <Text>Default Card with BEM modifier</Text>
    </Card>
    
    <Card className={`ui-card--${CARD_MODIFIERS.ELEVATED}`}>
      <Text>Elevated Card with BEM modifier</Text>
    </Card>
    
    <Card className={`ui-card--${CARD_MODIFIERS.OUTLINED}`}>
      <Text>Outlined Card with BEM modifier</Text>
    </Card>
    
    <Card className={`ui-card--${CARD_MODIFIERS.INTERACTIVE}`}>
      <Text>Interactive Card with BEM modifier</Text>
    </Card>
    
    <Card className={`ui-card--${CARD_MODIFIERS.FULL_WIDTH}`}>
      <Text>Full Width Card with BEM modifier</Text>
    </Card>
  </Box>
);
