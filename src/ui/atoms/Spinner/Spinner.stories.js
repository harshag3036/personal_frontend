import React from 'react';
import Spinner from './Spinner';
import { 
  SPINNER_VARIANTS, 
  SPINNER_SIZES, 
  SPINNER_SPEEDS, 
  SPINNER_LABEL_POSITIONS 
} from './constants';

export default {
  title: 'UI/Atoms/Spinner',
  component: Spinner,
  parameters: {
    componentSubtitle: 'A customizable loading spinner component',
    docs: {
      description: {
        component: `
The Spinner component is used to indicate loading states and provide visual feedback during async operations.
It supports different variants, sizes, speeds, and label positions.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(SPINNER_VARIANTS).map(v => v.toLowerCase()),
      },
      description: 'The visual style variant of the spinner',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(SPINNER_SIZES).map(s => s.toLowerCase()),
      },
      description: 'The size of the spinner',
    },
    speed: {
      control: {
        type: 'select',
        options: Object.values(SPINNER_SPEEDS).map(s => s.toLowerCase()),
      },
      description: 'The animation speed of the spinner',
    },
    label: {
      control: 'text',
      description: 'Optional label to display with the spinner',
    },
    labelPosition: {
      control: {
        type: 'select',
        options: Object.values(SPINNER_LABEL_POSITIONS).map(p => p.toLowerCase()),
      },
      description: 'Position of the label relative to the spinner',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Whether the spinner should be displayed fullscreen',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    as: {
      control: 'text',
      description: 'The HTML element to render the spinner as',
    },
  },
};

// Basic spinner
export const Basic = () => <Spinner />;

// Variants
export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {Object.values(SPINNER_VARIANTS).map((variant) => (
      <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner variant={variant} />
        <span>{variant.toLowerCase()}</span>
      </div>
    ))}
  </div>
);

// Sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
    {Object.values(SPINNER_SIZES).map((size) => (
      <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size={size} />
        <span>{size.toLowerCase()}</span>
      </div>
    ))}
  </div>
);

// Speeds
export const Speeds = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {Object.values(SPINNER_SPEEDS).map((speed) => (
      <div key={speed} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner speed={speed} />
        <span>{speed.toLowerCase()}</span>
      </div>
    ))}
  </div>
);

// With label
export const WithLabel = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {Object.values(SPINNER_LABEL_POSITIONS).map((position) => (
      <div key={position} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner label="Loading..." labelPosition={position} />
        <span>{position.toLowerCase()}</span>
      </div>
    ))}
  </div>
);

// Responsive
export const Responsive = () => (
  <Spinner 
    size={{ base: 'small', md: 'medium', lg: 'large' }}
    variant={{ base: 'primary', md: 'accent' }}
    label="Responsive spinner"
  />
);

// Playground
export const Playground = (args) => <Spinner {...args} />;
Playground.args = {
  variant: 'primary',
  size: 'medium',
  speed: 'medium',
  label: 'Loading...',
  labelPosition: 'right',
  fullscreen: false,
  ariaLabel: 'Loading',
};
