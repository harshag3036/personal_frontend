import React from 'react';
import MetricCard from './MetricCard';
import { METRIC_CARD_VARIANTS, METRIC_CARD_SIZES } from './constants';

export default {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  parameters: {
    componentSubtitle: 'A component for displaying metric information with value, label, and optional icon and trend.',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The metric value to display',
    },
    label: {
      control: 'text',
      description: 'The label for the metric',
    },
    detail: {
      control: 'text',
      description: 'Optional additional detail text',
    },
    icon: {
      control: 'text',
      description: 'Optional icon name to display',
    },
    iconColor: {
      control: 'text',
      description: 'Optional color for the icon',
    },
    trend: {
      control: 'object',
      description: 'Optional trend information',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(METRIC_CARD_VARIANTS),
      },
      description: 'The visual variant of the card',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(METRIC_CARD_SIZES),
      },
      description: 'The size of the card',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (clickable)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the card should take up the full width of its container',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive cards',
    },
  },
  args: {
    value: '85%',
    label: 'Completion Rate',
    variant: 'default',
    size: 'medium',
    interactive: false,
    fullWidth: false,
  },
};

// Basic MetricCard
export const Basic = (args) => <MetricCard {...args} />;

// MetricCard with icon
export const WithIcon = (args) => (
  <MetricCard
    {...args}
    icon="analytics"
    iconColor="primary"
  />
);
WithIcon.args = {
  value: '42',
  label: 'Active Users',
};

// MetricCard with trend
export const WithTrend = (args) => (
  <MetricCard
    {...args}
    trend={{
      value: '+15%',
      direction: 'up',
      label: 'vs last month',
    }}
  />
);
WithTrend.args = {
  value: '$1,234',
  label: 'Revenue',
};

// MetricCard with negative trend
export const WithNegativeTrend = (args) => (
  <MetricCard
    {...args}
    trend={{
      value: '-8%',
      direction: 'down',
      label: 'vs last month',
    }}
  />
);
WithNegativeTrend.args = {
  value: '92',
  label: 'Conversion Rate',
};

// MetricCard with icon and trend
export const WithIconAndTrend = (args) => (
  <MetricCard
    {...args}
    icon="analytics"
    iconColor="primary"
    trend={{
      value: '+15%',
      direction: 'up',
      label: 'vs last month',
    }}
  />
);
WithIconAndTrend.args = {
  value: '$1,234',
  label: 'Revenue',
};

// MetricCard with detail
export const WithDetail = (args) => (
  <MetricCard
    {...args}
    detail="Last updated: Today"
  />
);
WithDetail.args = {
  value: '99.9%',
  label: 'Uptime',
};

// Interactive MetricCard
export const Interactive = (args) => (
  <MetricCard
    {...args}
    interactive={true}
  />
);
Interactive.args = {
  value: '8',
  label: 'Pending Tasks',
  variant: 'info',
};

// MetricCard variants
export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {Object.values(METRIC_CARD_VARIANTS).map((variant) => (
      <MetricCard
        key={variant}
        value={variant}
        label={`${variant.charAt(0).toUpperCase()}${variant.slice(1)} Variant`}
        variant={variant}
      />
    ))}
  </div>
);

// MetricCard sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {Object.values(METRIC_CARD_SIZES).map((size) => (
      <MetricCard
        key={size}
        value={size}
        label={`${size.charAt(0).toUpperCase()}${size.slice(1)} Size`}
        size={size}
      />
    ))}
  </div>
);

// Grid of MetricCards
export const MetricGrid = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
    gap: '1rem' 
  }}>
    <MetricCard
      value="85%"
      label="Completion Rate"
      icon="analytics"
      variant="default"
    />
    <MetricCard
      value="42"
      label="Active Users"
      icon="user"
      variant="info"
      trend={{
        value: '+12%',
        direction: 'up',
        label: 'vs last week',
      }}
    />
    <MetricCard
      value="$1,234"
      label="Revenue"
      icon="analytics"
      variant="success"
      trend={{
        value: '+15%',
        direction: 'up',
        label: 'vs last month',
      }}
    />
    <MetricCard
      value="92"
      label="Conversion Rate"
      icon="analytics"
      variant="warning"
      trend={{
        value: '-8%',
        direction: 'down',
        label: 'vs last month',
      }}
    />
    <MetricCard
      value="99.9%"
      label="Uptime"
      icon="check"
      variant="success"
      detail="Last updated: Today"
    />
    <MetricCard
      value="8"
      label="Pending Tasks"
      icon="warning"
      variant="error"
      interactive={true}
    />
  </div>
);

// Responsive MetricCard
export const Responsive = () => (
  <MetricCard
    value="99.9%"
    label="Uptime"
    size={{ base: 'small', md: 'medium', lg: 'large' }}
    variant={{ base: 'default', md: 'info' }}
  />
);
