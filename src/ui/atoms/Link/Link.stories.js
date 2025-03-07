import React from 'react';
import Link from './Link';
import { LINK_VARIANTS, LINK_SIZES } from './index';
import { Icon } from '../../atoms';

export default {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    componentSubtitle: 'A versatile link component for navigation and actions',
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'URL for the link',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(LINK_VARIANTS),
      },
      description: 'Visual variant of the link',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(LINK_SIZES),
      },
      description: 'Size of the link',
    },
    color: {
      control: 'text',
      description: 'Color from design tokens',
    },
    underline: {
      control: 'boolean',
      description: 'Whether to show underline',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
    },
    external: {
      control: 'boolean',
      description: 'Whether the link opens in a new tab',
    },
    as: {
      control: {
        type: 'select',
        options: ['a', 'button', 'span'],
      },
      description: 'Element to render the Link as',
    },
    children: {
      control: 'text',
      description: 'Link content',
    },
  },
};

// Template for creating stories
const Template = (args) => <Link {...args} />;

// Basic link
export const Basic = Template.bind({});
Basic.args = {
  href: '#',
  children: 'Basic Link',
};

// Different variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(LINK_VARIANTS).map((variant) => (
      <Link key={variant} href="#" variant={variant}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)} Link
      </Link>
    ))}
  </div>
);

// Different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {Object.values(LINK_SIZES).map((size) => (
      <Link key={size} href="#" size={size}>
        {size.toUpperCase()} Size Link
      </Link>
    ))}
  </div>
);

// With custom color
export const Colors = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#" color="accent-primary">Primary Link</Link>
    <Link href="#" color="accent-secondary">Secondary Link</Link>
    <Link href="#" color="success">Success Link</Link>
    <Link href="#" color="warning">Warning Link</Link>
    <Link href="#" color="error">Error Link</Link>
  </div>
);

// With and without underline
export const Underline = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#" underline={true}>Link with underline</Link>
    <Link href="#" underline={false}>Link without underline</Link>
  </div>
);

// Disabled state
export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#" disabled={false}>Enabled Link</Link>
    <Link href="#" disabled={true}>Disabled Link</Link>
  </div>
);

// External link
export const External = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#" external={false}>Internal Link</Link>
    <Link href="https://example.com" external={true}>External Link</Link>
  </div>
);

// As different elements
export const AsElement = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#">As anchor (default)</Link>
    <Link as="button" onClick={() => alert('Button clicked!')}>As button</Link>
    <Link as="span" style={{ cursor: 'pointer' }}>As span</Link>
  </div>
);

// With icon
export const WithIcon = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#">
      <Icon name="home" size="sm" />
      Home
    </Link>
    <Link href="#">
      Settings
      <Icon name="settings" size="sm" />
    </Link>
    <Link href="#" variant="button">
      <Icon name="add" size="sm" />
      Add Item
    </Link>
  </div>
);

// Community-specific links
export const CommunityLinks = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Link href="#" className="ui-link--community">
      <Icon name="group" size="sm" />
      Community Link
    </Link>
    <Link href="#" className="ui-link--activity">
      <Icon name="activity" size="sm" />
      Activity Link
    </Link>
    <Link href="#" className="ui-link--milestone">
      Milestone Link
    </Link>
  </div>
);

// Usage in context
export const UsageInContext = () => (
  <div>
    <div style={{ 
      padding: '1rem',
      borderBottom: '1px solid #eee',
      display: 'flex',
      gap: '1rem'
    }}>
      <Link href="#" variant="nav">Home</Link>
      <Link href="#" variant="nav">Activities</Link>
      <Link href="#" variant="nav">Community</Link>
      <Link href="#" variant="nav">Profile</Link>
    </div>
    
    <div style={{ 
      padding: '1rem',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      fontSize: '0.875rem'
    }}>
      <Link href="#" variant="breadcrumb">Home</Link>
      <span>/</span>
      <Link href="#" variant="breadcrumb">Community</Link>
      <span>/</span>
      <Link href="#" variant="breadcrumb">Activities</Link>
      <span>/</span>
      <span>Current Page</span>
    </div>
    
    <div style={{ 
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      margin: '1rem 0'
    }}>
      <h3 style={{ marginTop: 0 }}>Activity Details</h3>
      <p>This is a sample activity description. Learn more about this activity and how to participate.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="#" variant="button">
          <Icon name="activity" size="sm" />
          Join Activity
        </Link>
        <Link href="#" variant="text">Learn More</Link>
      </div>
    </div>
    
    <div style={{ padding: '1rem' }}>
      <p>
        Check out our <Link href="#">community guidelines</Link> for more information.
        You can also <Link href="#" external>visit our documentation</Link> for detailed instructions.
      </p>
    </div>
  </div>
);
