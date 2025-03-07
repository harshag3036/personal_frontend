import React from 'react';
import Icon from './Icon';
import { ICON_NAMES, ICON_MODIFIERS } from './index';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    componentSubtitle: 'A versatile icon component for displaying various icons',
  },
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: Object.values(ICON_NAMES),
      },
      description: 'Name of the icon to display',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'Size of the icon',
    },
    color: {
      control: 'text',
      description: 'Color of the icon from design tokens',
    },
    as: {
      control: {
        type: 'select',
        options: ['i', 'span', 'div'],
      },
      description: 'Element to render the Icon as',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

// Template for creating stories
const Template = (args) => <Icon {...args} />;

// Basic icon
export const Basic = Template.bind({});
Basic.args = {
  name: 'user',
};

// Different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Icon name="star" size="xs" />
    <Icon name="star" size="sm" />
    <Icon name="star" size="md" />
    <Icon name="star" size="lg" />
    <Icon name="star" size="xl" />
  </div>
);

// Different colors
export const Colors = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Icon name="info" color="text-primary" />
    <Icon name="info" color="accent-primary" />
    <Icon name="info" color="success" />
    <Icon name="info" color="warning" />
    <Icon name="info" color="error" />
  </div>
);

// With aria-label for accessibility
export const WithAriaLabel = Template.bind({});
WithAriaLabel.args = {
  name: 'info',
  'aria-label': 'Information',
};

// Animated icons
export const Animated = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Icon name="settings" className={`ui-icon--${ICON_MODIFIERS.ANIMATED}`} />
    <Icon name="settings" className={`ui-icon--${ICON_MODIFIERS.SPIN}`} />
  </div>
);

// Common UI icons
export const CommonIcons = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
    {Object.values(ICON_NAMES).slice(0, 20).map((iconName) => (
      <div key={iconName} style={{ textAlign: 'center' }}>
        <Icon name={iconName} size="md" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{iconName}</div>
      </div>
    ))}
  </div>
);

// Community-specific icons
export const CommunityIcons = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.ACTIVITY} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>activity</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.GROUP} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>group</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.MILESTONE} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>milestone</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.COMMENT} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>comment</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.TIMELINE} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>timeline</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.ANALYTICS} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>analytics</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.FEEDBACK} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>feedback</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Icon name={ICON_NAMES.ARCHIVE} size="md" />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>archive</div>
    </div>
  </div>
);

// Usage in context
export const UsageInContext = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <Icon name="home" size="sm" />
      <span>Home</span>
    </div>
    
    <button style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: 'none',
      cursor: 'pointer'
    }}>
      <Icon name="add" size="sm" />
      <span>Add Item</span>
    </button>
    
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px'
    }}>
      <Icon name="info" color="accent-primary" />
      <span>This is an informational message.</span>
    </div>
    
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#fff3cd',
      borderRadius: '4px'
    }}>
      <Icon name="warning" color="warning" />
      <span>This is a warning message.</span>
    </div>
  </div>
);
