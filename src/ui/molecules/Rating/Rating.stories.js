import React, { useState } from 'react';
import Rating from './Rating';
import { RATING_SIZES, RATING_VARIANTS, RATING_PRECISION } from './constants';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

export default {
  title: 'Molecules/Rating',
  component: Rating,
  parameters: {
    docs: {
      description: {
        component: 'A component that allows users to rate items on a scale, typically using stars or other symbols.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'The rating value'
    },
    size: {
      control: { type: 'select', options: Object.values(RATING_SIZES) },
      description: 'The size of the rating'
    },
    variant: {
      control: { type: 'select', options: Object.values(RATING_VARIANTS) },
      description: 'The variant of the rating'
    },
    precision: {
      control: { type: 'select', options: Object.values(RATING_PRECISION) },
      description: 'The precision of the rating'
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'The maximum rating value'
    },
    readOnly: {
      control: 'boolean',
      description: 'If true, the rating will be read-only'
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the rating will be disabled'
    },
    showValue: {
      control: 'boolean',
      description: 'If true, the rating value will be displayed'
    },
    name: {
      control: 'text',
      description: 'The name attribute for the hidden input'
    }
  }
};

// Default Rating
export const Default = (args) => <Rating {...args} />;
Default.args = {
  value: 3,
  showValue: true
};

// Interactive Rating
export const Interactive = () => {
  const [value, setValue] = useState(2.5);
  
  return (
    <Box>
      <Text marginBottom="md">Selected value: {value}</Text>
      <Rating 
        value={value} 
        onChange={setValue} 
        showValue 
      />
    </Box>
  );
};

// Sizes
export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Box>
      <Text marginBottom="sm">Small</Text>
      <Rating size={RATING_SIZES.SMALL} value={3} />
    </Box>
    <Box>
      <Text marginBottom="sm">Medium (default)</Text>
      <Rating size={RATING_SIZES.MEDIUM} value={3} />
    </Box>
    <Box>
      <Text marginBottom="sm">Large</Text>
      <Rating size={RATING_SIZES.LARGE} value={3} />
    </Box>
  </Box>
);

// Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Box>
      <Text marginBottom="sm">Star (default)</Text>
      <Rating variant={RATING_VARIANTS.STAR} value={3} />
    </Box>
    <Box>
      <Text marginBottom="sm">Heart</Text>
      <Rating variant={RATING_VARIANTS.HEART} value={3} />
    </Box>
    <Box>
      <Text marginBottom="sm">Circle</Text>
      <Rating variant={RATING_VARIANTS.CIRCLE} value={3} />
    </Box>
  </Box>
);

// Precision
export const Precision = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Box>
      <Text marginBottom="sm">Full (default)</Text>
      <Rating precision={RATING_PRECISION.FULL} value={3} />
    </Box>
    <Box>
      <Text marginBottom="sm">Half</Text>
      <Rating precision={RATING_PRECISION.HALF} value={3.5} />
    </Box>
  </Box>
);

// Max Value
export const MaxValue = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Box>
      <Text marginBottom="sm">Default (5)</Text>
      <Rating value={3} />
    </Box>
    <Box>
      <Text marginBottom="sm">Custom (10)</Text>
      <Rating max={10} value={7} />
    </Box>
  </Box>
);

// Read-only
export const ReadOnly = () => (
  <Box>
    <Text marginBottom="sm">Read-only</Text>
    <Rating value={4} readOnly />
  </Box>
);

// Disabled
export const Disabled = () => (
  <Box>
    <Text marginBottom="sm">Disabled</Text>
    <Rating value={4} disabled />
  </Box>
);
