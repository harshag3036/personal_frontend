/**
 * Button Component Stories
 */

import React from 'react';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_MODIFIERS } from './index';
import Box from '../Box';

export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with support for variants, sizes, and responsive props. This component can be rendered as different HTML elements using the `as` prop.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(BUTTON_VARIANTS),
      description: 'Button variant or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      description: 'Button size or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'medium' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: { type: null },
      description: 'Icon to display on the left side of the button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    rightIcon: {
      control: { type: null },
      description: 'Icon to display on the right side of the button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Button as',
      table: {
        type: { summary: 'string | React.ComponentType' },
        defaultValue: { summary: 'button' },
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
      description: 'Click handler',
      table: {
        type: { summary: 'function' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Basic Button
export const Basic = {
  args: {
    children: 'Button',
  },
};

// All Button Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Button variant="primary">Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="accent">Accent Button</Button>
    <Button variant="outline">Outline Button</Button>
    <Button variant="text">Text Button</Button>
    <Button variant="danger">Danger Button</Button>
    <Button variant="success">Success Button</Button>
    <Button variant="info">Info Button</Button>
    <Button variant="warning">Warning Button</Button>
  </Box>
);

// Button Sizes
export const Sizes = () => (
  <Box display="flex" alignItems="center" gap="md">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </Box>
);

// Full Width Button
export const FullWidth = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

// Disabled Button
export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Loading Button
export const Loading = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

// Button with Icons
export const WithIcons = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Button leftIcon={<span>🔍</span>}>
      Search
    </Button>
    <Button rightIcon={<span>→</span>}>
      Next
    </Button>
    <Button leftIcon={<span>⬅️</span>} rightIcon={<span>➡️</span>}>
      Navigate
    </Button>
  </Box>
);

// Button as Link
export const AsLink = {
  args: {
    as: 'a',
    href: '#',
    children: 'Link Button',
    variant: 'primary',
  },
};

// Button Types
export const ButtonTypes = () => (
  <Box display="flex" gap="md">
    <Button type="button">Button Type</Button>
    <Button type="submit">Submit Type</Button>
    <Button type="reset">Reset Type</Button>
  </Box>
);

// Responsive Button
export const ResponsiveButton = {
  args: {
    variant: {
      base: 'primary',
      md: 'outline',
      lg: 'accent',
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
    children: 'Responsive Button',
  },
};

// Button Group
export const ButtonGroup = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <div className="ui-button-group">
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </div>
    
    <div className="ui-button-group ui-button-group--vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </div>
  </Box>
);

// Button with Custom Styling
export const CustomStyling = {
  args: {
    style: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      borderRadius: '3px',
    },
    children: 'Custom Styled Button',
  },
};

// Button States
export const States = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Button>Normal Button</Button>
    <Button disabled>Disabled Button</Button>
    <Button loading>Loading Button</Button>
    <Button className={`ui-button--${BUTTON_MODIFIERS.LOADING}`}>
      Custom Loading Button
    </Button>
  </Box>
);

// Button in Context
export const InContext = () => (
  <Box 
    padding="lg" 
    background="background-secondary" 
    borderRadius="md"
    display="flex"
    flexDirection="column"
    gap="md"
  >
    <h3>Sign up for our newsletter</h3>
    <p>Get weekly updates on our latest products and offers.</p>
    <div style={{ display: 'flex', gap: '8px' }}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        style={{ 
          padding: '12px', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          flexGrow: 1
        }} 
      />
      <Button>Subscribe</Button>
    </div>
  </Box>
);

// Button with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Button className={`ui-button--${BUTTON_MODIFIERS.PRIMARY} ui-button--${BUTTON_MODIFIERS.LARGE}`}>
      Primary Large Button
    </Button>
    <Button className={`ui-button--${BUTTON_MODIFIERS.OUTLINE} ui-button--${BUTTON_MODIFIERS.SMALL}`}>
      Outline Small Button
    </Button>
    <Button className={`ui-button--${BUTTON_MODIFIERS.DANGER} ui-button--${BUTTON_MODIFIERS.FULL_WIDTH}`}>
      Danger Full Width Button
    </Button>
  </Box>
);
