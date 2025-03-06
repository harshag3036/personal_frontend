/**
 * Badge Component Stories
 */

import React from 'react';
import Badge, { BADGE_VARIANTS, BADGE_SIZES, BADGE_MODIFIERS } from './index';
import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'A customizable badge component with support for variants, sizes, and responsive props. This component can be rendered as different HTML elements using the `as` prop.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(BADGE_VARIANTS),
      description: 'Badge variant or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(BADGE_SIZES),
      description: 'Badge size or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'medium' },
      },
    },
    pill: {
      control: 'boolean',
      description: 'Whether the badge should have pill shape or responsive object',
      table: {
        type: { summary: 'boolean | object' },
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Badge as',
      table: {
        type: { summary: 'string | React.ComponentType' },
        defaultValue: { summary: 'span' },
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
      description: 'Badge content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Basic Badge
export const Basic = {
  args: {
    children: 'New',
  },
};

// All Badge Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Flex gap="md" wrap="wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </Flex>
  </Box>
);

// Badge Sizes
export const Sizes = () => (
  <Box display="flex" alignItems="center" gap="md">
    <Badge size="small">Small</Badge>
    <Badge size="medium">Medium</Badge>
    <Badge size="large">Large</Badge>
  </Box>
);

// Pill Badge
export const PillShape = {
  args: {
    pill: true,
    children: 'Pill Badge',
  },
};

// Badge as Different Element
export const AsElement = {
  args: {
    as: 'div',
    children: 'Div Badge',
    style: { display: 'inline-block' },
  },
};

// Responsive Badge
export const ResponsiveBadge = {
  args: {
    variant: {
      base: 'primary',
      md: 'success',
      lg: 'warning',
    },
    size: {
      base: 'small',
      md: 'medium',
      lg: 'large',
    },
    pill: {
      base: false,
      md: true,
    },
    children: 'Responsive Badge',
  },
};

// Badge with Custom Styling
export const CustomStyling = {
  args: {
    style: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
      fontWeight: 'bold',
    },
    children: 'Custom Badge',
  },
};

// Badge Positions
export const Positions = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Text variant="h3">Badge Positions</Text>
    
    <Flex gap="lg">
      <Box position="relative" width="100px" height="100px" background="background-secondary" borderRadius="md">
        <Badge className="ui-badge--top-right" variant="primary">1</Badge>
        <Text align="center" padding="md">Top Right</Text>
      </Box>
      
      <Box position="relative" width="100px" height="100px" background="background-secondary" borderRadius="md">
        <Badge className="ui-badge--top-left" variant="success">2</Badge>
        <Text align="center" padding="md">Top Left</Text>
      </Box>
      
      <Box position="relative" width="100px" height="100px" background="background-secondary" borderRadius="md">
        <Badge className="ui-badge--bottom-right" variant="error">3</Badge>
        <Text align="center" padding="md">Bottom Right</Text>
      </Box>
      
      <Box position="relative" width="100px" height="100px" background="background-secondary" borderRadius="md">
        <Badge className="ui-badge--bottom-left" variant="info">4</Badge>
        <Text align="center" padding="md">Bottom Left</Text>
      </Box>
    </Flex>
  </Box>
);

// Dot Badge
export const DotBadge = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text variant="h3">Dot Badges</Text>
    
    <Flex gap="md" alignItems="center">
      <Badge className="ui-badge--dot" variant="primary"></Badge>
      <Text>Primary</Text>
      
      <Badge className="ui-badge--dot" variant="success"></Badge>
      <Text>Success</Text>
      
      <Badge className="ui-badge--dot" variant="warning"></Badge>
      <Text>Warning</Text>
      
      <Badge className="ui-badge--dot" variant="error"></Badge>
      <Text>Error</Text>
    </Flex>
  </Box>
);

// Badge in Context
export const InContext = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Text variant="h3">Badges in Context</Text>
    
    <Flex gap="md" flexDirection="column">
      <Box padding="md" background="background-secondary" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="h4">Notifications</Text>
          <Badge variant="primary" pill>5 new</Badge>
        </Flex>
      </Box>
      
      <Box padding="md" background="background-secondary" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="h4">Messages</Text>
          <Badge variant="success" pill>3 unread</Badge>
        </Flex>
      </Box>
      
      <Box padding="md" background="background-secondary" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="h4">Tasks</Text>
          <Badge variant="warning">2 pending</Badge>
        </Flex>
      </Box>
      
      <Box padding="md" background="background-secondary" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="h4">Alerts</Text>
          <Badge variant="error">1 critical</Badge>
        </Flex>
      </Box>
    </Flex>
  </Box>
);

// Badge with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Badge className={`ui-badge--${BADGE_MODIFIERS.PRIMARY} ui-badge--${BADGE_MODIFIERS.LARGE}`}>
      Primary Large Badge
    </Badge>
    <Badge className={`ui-badge--${BADGE_MODIFIERS.OUTLINE} ui-badge--${BADGE_MODIFIERS.SMALL}`}>
      Outline Small Badge
    </Badge>
    <Badge className={`ui-badge--${BADGE_MODIFIERS.ERROR} ui-badge--${BADGE_MODIFIERS.PILL}`}>
      Error Pill Badge
    </Badge>
  </Box>
);

// Clickable Badge
export const ClickableBadge = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text variant="h3">Clickable Badges</Text>
    
    <Flex gap="md">
      <Badge 
        className="ui-badge--clickable" 
        variant="primary"
        onClick={() => alert('Primary badge clicked')}
      >
        Click me
      </Badge>
      
      <Badge 
        className="ui-badge--clickable" 
        variant="success"
        onClick={() => alert('Success badge clicked')}
      >
        Click me
      </Badge>
      
      <Badge 
        className="ui-badge--clickable" 
        variant="warning"
        onClick={() => alert('Warning badge clicked')}
      >
        Click me
      </Badge>
    </Flex>
  </Box>
);
