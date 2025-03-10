/**
 * Switch Component Stories
 * 
 * This file contains stories for the Switch component.
 */

import React, { useState } from 'react';
import Switch from './Switch';
import { SWITCH_VARIANTS, SWITCH_SIZES } from './constants';
import Box from '../Box';
import Text from '../Text';
import Flex from '../Flex';

export default {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'A customizable toggle switch component that can be used as an alternative to a checkbox.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(SWITCH_VARIANTS),
      },
      description: 'The visual style variant of the switch',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(SWITCH_SIZES),
      },
      description: 'The size of the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    label: {
      control: 'text',
      description: 'Optional label to display with the switch',
    },
    labelPosition: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
      description: 'Position of the label relative to the switch',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the switch state changes',
    },
  },
};

// Basic Switch
export const Basic = (args) => <Switch {...args} />;
Basic.args = {
  label: 'Toggle me',
};

// Variants
export const Variants = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Switch Variants</Text>
    <Flex gap="lg" wrap="wrap">
      {Object.values(SWITCH_VARIANTS).map((variant) => (
        <Box key={variant}>
          <Text marginBottom="xs">{variant}</Text>
          <Switch variant={variant} label={variant} defaultChecked />
        </Box>
      ))}
    </Flex>
  </Flex>
);

// Sizes
export const Sizes = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Switch Sizes</Text>
    <Flex gap="lg" wrap="wrap" alignItems="center">
      {Object.values(SWITCH_SIZES).map((size) => (
        <Box key={size}>
          <Text marginBottom="xs">{size}</Text>
          <Switch size={size} label={size} defaultChecked />
        </Box>
      ))}
    </Flex>
  </Flex>
);

// Label Positions
export const LabelPositions = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Label Positions</Text>
    <Flex gap="lg" wrap="wrap">
      <Box>
        <Text marginBottom="xs">Right (Default)</Text>
        <Switch label="Label on right" />
      </Box>
      <Box>
        <Text marginBottom="xs">Left</Text>
        <Switch label="Label on left" labelPosition="left" />
      </Box>
    </Flex>
  </Flex>
);

// States
export const States = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Switch States</Text>
    <Flex gap="lg" wrap="wrap">
      <Box>
        <Text marginBottom="xs">Unchecked</Text>
        <Switch label="Unchecked" />
      </Box>
      <Box>
        <Text marginBottom="xs">Checked</Text>
        <Switch label="Checked" defaultChecked />
      </Box>
      <Box>
        <Text marginBottom="xs">Disabled Unchecked</Text>
        <Switch label="Disabled Unchecked" disabled />
      </Box>
      <Box>
        <Text marginBottom="xs">Disabled Checked</Text>
        <Switch label="Disabled Checked" defaultChecked disabled />
      </Box>
    </Flex>
  </Flex>
);

// Controlled Example
export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Flex direction="column" gap="md">
      <Text as="h3" size="md" marginBottom="sm">Controlled Switch</Text>
      <Switch 
        label={`Switch is ${checked ? 'ON' : 'OFF'}`}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Box marginTop="md">
        <button onClick={() => setChecked(!checked)}>
          Toggle from outside
        </button>
      </Box>
    </Flex>
  );
};

// Responsive Example
export const Responsive = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Responsive Switch</Text>
    <Switch 
      label="Responsive size and variant"
      size={{ base: 'small', md: 'medium', lg: 'large' }}
      variant={{ base: 'primary', md: 'accent', lg: 'success' }}
    />
    <Text size="sm" marginTop="xs">
      Resize your browser window to see the switch change size and color.
    </Text>
  </Flex>
);

// Polymorphic Example
export const Polymorphic = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Polymorphic Switch</Text>
    <Switch 
      as="div"
      label="Rendered as a div"
      defaultChecked
    />
  </Flex>
);

// Form Integration Example
export const FormIntegration = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Form Integration</Text>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        alert(`Form submitted with values: ${JSON.stringify(Object.fromEntries(formData))}`);
      }}
    >
      <Flex direction="column" gap="md">
        <Switch 
          name="notifications"
          label="Enable notifications"
          defaultChecked
        />
        <Switch 
          name="darkMode"
          label="Dark mode"
        />
        <Switch 
          name="emailUpdates"
          label="Receive email updates"
        />
        <button type="submit" style={{ marginTop: '16px' }}>
          Submit Form
        </button>
      </Flex>
    </form>
  </Flex>
);
