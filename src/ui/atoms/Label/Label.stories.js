import React from 'react';
import Label from './Label';
import { LABEL_VARIANTS, LABEL_SIZES } from './index';
import { Icon, Input } from '../../atoms';

export default {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    componentSubtitle: 'A versatile label component for form fields, tags, and other labeling needs',
  },
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the form element this label is for',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(LABEL_VARIANTS),
      },
      description: 'Visual variant of the label',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(LABEL_SIZES),
      },
      description: 'Size of the label',
    },
    color: {
      control: 'text',
      description: 'Color from design tokens',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the label is disabled',
    },
    as: {
      control: {
        type: 'select',
        options: ['label', 'span', 'div'],
      },
      description: 'Element to render the Label as',
    },
    children: {
      control: 'text',
      description: 'Label content',
    },
  },
};

// Template for creating stories
const Template = (args) => <Label {...args} />;

// Basic label
export const Basic = Template.bind({});
Basic.args = {
  htmlFor: 'input-example',
  children: 'Basic Label',
};

// Different variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(LABEL_VARIANTS).map((variant) => (
      <div key={variant} style={{ position: 'relative', marginBottom: '1rem' }}>
        <Label htmlFor={`input-${variant}`} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} Label
        </Label>
        {variant === 'floating' && (
          <Input 
            id={`input-${variant}`} 
            style={{ 
              paddingTop: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              padding: '0.5rem',
              width: '100%'
            }} 
          />
        )}
      </div>
    ))}
  </div>
);

// Different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(LABEL_SIZES).map((size) => (
      <Label key={size} htmlFor={`input-${size}`} size={size}>
        {size.toUpperCase()} Size Label
      </Label>
    ))}
  </div>
);

// With custom color
export const Colors = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label htmlFor="input-primary" color="accent-primary">Primary Label</Label>
    <Label htmlFor="input-secondary" color="accent-secondary">Secondary Label</Label>
    <Label htmlFor="input-success" color="success">Success Label</Label>
    <Label htmlFor="input-warning" color="warning">Warning Label</Label>
    <Label htmlFor="input-error" color="error">Error Label</Label>
  </div>
);

// Required and optional labels
export const Required = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label htmlFor="input-required" required={true}>Required Field</Label>
    <Label htmlFor="input-optional" required={false}>Optional Field</Label>
  </div>
);

// Disabled state
export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label htmlFor="input-enabled" disabled={false}>Enabled Label</Label>
    <Label htmlFor="input-disabled" disabled={true}>Disabled Label</Label>
  </div>
);

// As different elements
export const AsElement = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label htmlFor="input-label">As label (default)</Label>
    <Label as="span">As span</Label>
    <Label as="div">As div</Label>
  </div>
);

// With icon
export const WithIcon = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label htmlFor="input-search">
      <Icon name="search" size="sm" />
      Search
    </Label>
    <Label htmlFor="input-email">
      <Icon name="email" size="sm" />
      Email Address
    </Label>
    <Label htmlFor="input-password" required>
      <Icon name="lock" size="sm" />
      Password
    </Label>
  </div>
);

// Tag and badge variants
export const TagsAndBadges = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Label as="span" variant="tag">Default Tag</Label>
      <Label as="span" variant="tag" color="accent-primary">Primary Tag</Label>
      <Label as="span" variant="tag" color="success">Success Tag</Label>
      <Label as="span" variant="tag" color="warning">Warning Tag</Label>
      <Label as="span" variant="tag" color="error">Error Tag</Label>
    </div>
    
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
      <Label as="span" variant="badge">Default Badge</Label>
      <Label as="span" variant="badge" color="accent-secondary">Secondary Badge</Label>
      <Label as="span" variant="badge" color="success">Success Badge</Label>
      <Label as="span" variant="badge" color="warning">Warning Badge</Label>
      <Label as="span" variant="badge" color="error">Error Badge</Label>
    </div>
  </div>
);

// Community-specific labels
export const CommunityLabels = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Label htmlFor="input-community" className="ui-label--community">
      <Icon name="group" size="sm" />
      Community Label
    </Label>
    <Label htmlFor="input-activity" className="ui-label--activity">
      <Icon name="activity" size="sm" />
      Activity Label
    </Label>
    <Label htmlFor="input-milestone" className="ui-label--milestone">
      Milestone Label
    </Label>
  </div>
);

// Usage in context
export const UsageInContext = () => (
  <div>
    <div style={{ 
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      marginBottom: '1rem'
    }}>
      <h3 style={{ marginTop: 0 }}>Form Fields</h3>
      <div style={{ marginBottom: '1rem' }}>
        <Label htmlFor="username" required>Username</Label>
        <Input 
          id="username" 
          style={{ 
            display: 'block',
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ced4da',
            borderRadius: '4px'
          }} 
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Label htmlFor="email" required>
          <Icon name="email" size="sm" />
          Email Address
        </Label>
        <Input 
          id="email" 
          type="email" 
          style={{ 
            display: 'block',
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ced4da',
            borderRadius: '4px'
          }} 
        />
      </div>
      
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Input 
          id="floating-label" 
          style={{ 
            display: 'block',
            width: '100%',
            padding: '1rem 0.5rem 0.5rem',
            border: '1px solid #ced4da',
            borderRadius: '4px'
          }} 
        />
        <Label htmlFor="floating-label" variant="floating" required>Floating Label</Label>
      </div>
    </div>
    
    <div style={{ 
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px'
    }}>
      <h3 style={{ marginTop: 0 }}>Tags and Badges</h3>
      <div style={{ marginBottom: '1rem' }}>
        <p>Activity Status: 
          <Label as="span" variant="tag" color="success" style={{ marginLeft: '0.5rem' }}>Active</Label>
        </p>
        <p>Priority: 
          <Label as="span" variant="badge" color="error" style={{ marginLeft: '0.5rem' }}>High</Label>
        </p>
        <p>Categories: 
          <span style={{ display: 'inline-flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
            <Label as="span" variant="tag">Community</Label>
            <Label as="span" variant="tag">Discussion</Label>
            <Label as="span" variant="tag">Learning</Label>
          </span>
        </p>
      </div>
    </div>
  </div>
);
