/**
 * Radio Component Stories
 * 
 * This file contains stories for the Radio component.
 */

import React, { useState } from 'react';
import Radio from './Radio';
import { RADIO_VARIANTS, RADIO_SIZES } from './constants';
import Box from '../Box';
import Text from '../Text';
import Flex from '../Flex';

export default {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'A customizable radio button component that can be used in forms for selecting a single option from a group.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(RADIO_VARIANTS),
      },
      description: 'The visual style variant of the radio button',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(RADIO_SIZES),
      },
      description: 'The size of the radio button',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    label: {
      control: 'text',
      description: 'Optional label to display with the radio button',
    },
    labelPosition: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
      description: 'Position of the label relative to the radio button',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the radio button state changes',
    },
  },
};

// Basic Radio
export const Basic = (args) => <Radio {...args} />;
Basic.args = {
  label: 'Select me',
};

// Variants
export const Variants = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Radio Variants</Text>
    <Flex gap="lg" wrap="wrap">
      {Object.values(RADIO_VARIANTS).map((variant) => (
        <Box key={variant}>
          <Text marginBottom="xs">{variant}</Text>
          <Radio variant={variant} label={variant} name="variants" value={variant} />
        </Box>
      ))}
    </Flex>
  </Flex>
);

// Sizes
export const Sizes = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Radio Sizes</Text>
    <Flex gap="lg" wrap="wrap" alignItems="center">
      {Object.values(RADIO_SIZES).map((size) => (
        <Box key={size}>
          <Text marginBottom="xs">{size}</Text>
          <Radio size={size} label={size} name="sizes" value={size} />
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
        <Radio label="Label on right" name="labelPosition" value="right" />
      </Box>
      <Box>
        <Text marginBottom="xs">Left</Text>
        <Radio label="Label on left" labelPosition="left" name="labelPosition" value="left" />
      </Box>
    </Flex>
  </Flex>
);

// States
export const States = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Radio States</Text>
    <Flex gap="lg" wrap="wrap">
      <Box>
        <Text marginBottom="xs">Unchecked</Text>
        <Radio label="Unchecked" name="states" value="unchecked" />
      </Box>
      <Box>
        <Text marginBottom="xs">Checked</Text>
        <Radio label="Checked" defaultChecked name="states" value="checked" />
      </Box>
      <Box>
        <Text marginBottom="xs">Disabled Unchecked</Text>
        <Radio label="Disabled Unchecked" disabled name="states" value="disabledUnchecked" />
      </Box>
      <Box>
        <Text marginBottom="xs">Disabled Checked</Text>
        <Radio label="Disabled Checked" defaultChecked disabled name="states" value="disabledChecked" />
      </Box>
    </Flex>
  </Flex>
);

// Radio Group Example
export const RadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('option1');
  
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  
  return (
    <Flex direction="column" gap="md">
      <Text as="h3" size="md" marginBottom="sm">Radio Group</Text>
      <Box>
        <Text marginBottom="sm">Selected value: {selectedValue}</Text>
        <Flex direction="column" gap="sm">
          <Radio 
            label="Option 1"
            name="radioGroup"
            value="option1"
            checked={selectedValue === 'option1'}
            onChange={handleChange}
          />
          <Radio 
            label="Option 2"
            name="radioGroup"
            value="option2"
            checked={selectedValue === 'option2'}
            onChange={handleChange}
          />
          <Radio 
            label="Option 3"
            name="radioGroup"
            value="option3"
            checked={selectedValue === 'option3'}
            onChange={handleChange}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

// Responsive Example
export const Responsive = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Responsive Radio</Text>
    <Radio 
      label="This radio changes size based on screen width"
      size={{ base: 'small', md: 'medium', lg: 'large' }}
      variant={{ base: 'primary', md: 'accent', lg: 'success' }}
      name="responsive"
      value="responsive"
    />
    <Text size="sm" marginTop="xs">
      Resize your browser window to see the radio change size and color.
    </Text>
  </Flex>
);

// Polymorphic Example
export const Polymorphic = () => (
  <Flex direction="column" gap="md">
    <Text as="h3" size="md" marginBottom="sm">Polymorphic Radio</Text>
    <Radio 
      as="div"
      label="Rendered as a div"
      name="polymorphic"
      value="polymorphic"
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
        <Text marginBottom="xs">Preferred contact method:</Text>
        <Radio 
          name="contactMethod"
          value="email"
          label="Email"
          defaultChecked
        />
        <Radio 
          name="contactMethod"
          value="phone"
          label="Phone"
        />
        <Radio 
          name="contactMethod"
          value="mail"
          label="Mail"
        />
        <button type="submit" style={{ marginTop: '16px' }}>
          Submit Form
        </button>
      </Flex>
    </form>
  </Flex>
);
