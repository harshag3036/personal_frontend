/**
 * Alert Component Stories
 */

import React from 'react';
import Alert from './Alert';
import { ALERT_VARIANTS, ALERT_SIZES, ALERT_ICON_POSITIONS } from './constants';
import Icon from '../../atoms/Icon';

export default {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'A customizable alert component for displaying messages, notifications, and feedback to users.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(ALERT_VARIANTS),
      },
      description: 'The visual style variant of the alert',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ALERT_VARIANTS.INFO },
      },
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(ALERT_SIZES),
      },
      description: 'The size of the alert',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ALERT_SIZES.MEDIUM },
      },
    },
    iconPosition: {
      control: {
        type: 'select',
        options: Object.values(ALERT_ICON_POSITIONS),
      },
      description: 'Position of the icon relative to the content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ALERT_ICON_POSITIONS.LEFT },
      },
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    hasIcon: {
      control: 'boolean',
      description: 'Whether to show an icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    title: {
      control: 'text',
      description: 'Alert title',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Alert content',
      table: {
        type: { summary: 'node' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when the alert is closed',
      table: {
        type: { summary: 'function' },
      },
    },
    as: {
      control: 'text',
      description: 'The HTML element to render the alert as',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

// Basic Alert
export const Basic = {
  args: {
    children: 'This is a basic alert message.',
  },
};

// Alert with title
export const WithTitle = {
  args: {
    title: 'Alert Title',
    children: 'This is an alert with a title.',
  },
};

// Alert variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(ALERT_VARIANTS).map((variant) => (
      <Alert key={variant} variant={variant} title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`}>
        This is a {variant} alert message.
      </Alert>
    ))}
  </div>
);

// Alert sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(ALERT_SIZES).map((size) => (
      <Alert key={size} size={size} title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}>
        This is a {size} sized alert message.
      </Alert>
    ))}
  </div>
);

// Alert with icon positions
export const IconPositions = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(ALERT_ICON_POSITIONS).map((position) => (
      <Alert key={position} hasIcon iconPosition={position} title={`Icon ${position}`}>
        This alert has an icon positioned to the {position}.
      </Alert>
    ))}
  </div>
);

// Alert with custom icon
export const CustomIcon = {
  args: {
    hasIcon: true,
    icon: <Icon name="star" />,
    title: 'Custom Icon',
    children: 'This alert has a custom icon.',
  },
};

// Closable Alert
export const Closable = {
  args: {
    closable: true,
    title: 'Closable Alert',
    children: 'This alert can be dismissed by clicking the close button.',
  },
};

// Alert with all features
export const AllFeatures = {
  args: {
    variant: ALERT_VARIANTS.SUCCESS,
    size: ALERT_SIZES.LARGE,
    hasIcon: true,
    iconPosition: ALERT_ICON_POSITIONS.LEFT,
    closable: true,
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

// Responsive Alert
export const Responsive = {
  args: {
    variant: { base: ALERT_VARIANTS.INFO, md: ALERT_VARIANTS.SUCCESS, lg: ALERT_VARIANTS.WARNING },
    size: { base: ALERT_SIZES.SMALL, md: ALERT_SIZES.MEDIUM, lg: ALERT_SIZES.LARGE },
    title: 'Responsive Alert',
    children: 'This alert changes variant and size based on screen width. Resize your browser to see the changes.',
    hasIcon: true,
  },
};

// Alert as different element
export const AsSection = {
  args: {
    as: 'section',
    title: 'Alert as Section',
    children: 'This alert is rendered as a section element instead of a div.',
  },
};
