import React from 'react';
import Avatar from './Avatar';
import { AVATAR_STATUS, AVATAR_SHAPES, AVATAR_SIZES } from './index';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    componentSubtitle: 'A versatile avatar component for displaying user profile images or initials',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is available',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(AVATAR_SIZES),
      },
      description: 'Size of the avatar',
    },
    shape: {
      control: {
        type: 'select',
        options: Object.values(AVATAR_SHAPES),
      },
      description: 'Shape of the avatar',
    },
    status: {
      control: {
        type: 'select',
        options: [null, ...Object.values(AVATAR_STATUS)],
      },
      description: 'Status indicator',
    },
    backgroundColor: {
      control: 'text',
      description: 'Background color from design tokens (for initials display)',
    },
    as: {
      control: {
        type: 'select',
        options: ['div', 'span', 'button'],
      },
      description: 'Element to render the Avatar as',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

// Template for creating stories
const Template = (args) => <Avatar {...args} />;

// Basic avatar with image
export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://i.pravatar.cc/300',
  alt: 'User Avatar',
};

// Avatar with initials
export const WithInitials = Template.bind({});
WithInitials.args = {
  initials: 'JD',
  backgroundColor: 'accent-primary',
};

// Different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    {Object.values(AVATAR_SIZES).map((size) => (
      <Avatar 
        key={size} 
        size={size} 
        initials={size.toUpperCase()} 
        backgroundColor="accent-secondary"
      />
    ))}
  </div>
);

// Different shapes
export const Shapes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    {Object.values(AVATAR_SHAPES).map((shape) => (
      <Avatar 
        key={shape} 
        shape={shape} 
        src="https://i.pravatar.cc/300" 
        alt={`${shape} avatar`}
      />
    ))}
  </div>
);

// Status indicators
export const StatusIndicators = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    {Object.values(AVATAR_STATUS).map((status) => (
      <div key={status} style={{ textAlign: 'center' }}>
        <Avatar 
          status={status} 
          src="https://i.pravatar.cc/300" 
          alt={`${status} avatar`}
        />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{status}</div>
      </div>
    ))}
  </div>
);

// Fallback behavior
export const FallbackBehavior = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src="https://i.pravatar.cc/300" 
        alt="With image"
      />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>With image</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src="invalid-url.jpg" 
        alt="Invalid image"
        initials="FB"
      />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Invalid image</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        initials="IN" 
        backgroundColor="success"
      />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>With initials</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        alt="John Doe"
      />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>From alt text</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar />
      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>No props</div>
    </div>
  </div>
);

// Custom background colors
export const BackgroundColors = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Avatar initials="A" backgroundColor="accent-primary" />
    <Avatar initials="B" backgroundColor="accent-secondary" />
    <Avatar initials="C" backgroundColor="success" />
    <Avatar initials="D" backgroundColor="warning" />
    <Avatar initials="E" backgroundColor="error" />
  </div>
);

// Avatar group
export const AvatarGroup = () => (
  <div className="ui-avatar-group">
    <Avatar src="https://i.pravatar.cc/300?img=1" alt="User 1" />
    <Avatar src="https://i.pravatar.cc/300?img=2" alt="User 2" />
    <Avatar src="https://i.pravatar.cc/300?img=3" alt="User 3" />
    <Avatar src="https://i.pravatar.cc/300?img=4" alt="User 4" />
    <Avatar initials="+3" backgroundColor="accent-secondary" />
  </div>
);

// Usage in context
export const UsageInContext = () => (
  <div>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem',
      padding: '1rem',
      borderBottom: '1px solid #eee'
    }}>
      <Avatar 
        src="https://i.pravatar.cc/300?img=5" 
        alt="John Doe" 
        status="online"
      />
      <div>
        <div style={{ fontWeight: 'bold' }}>John Doe</div>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>Online</div>
      </div>
    </div>
    
    <div style={{ 
      margin: '1rem 0',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px'
    }}>
      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Team Members</div>
      <div className="ui-avatar-group">
        <Avatar src="https://i.pravatar.cc/300?img=6" alt="User 1" status="online" />
        <Avatar src="https://i.pravatar.cc/300?img=7" alt="User 2" status="away" />
        <Avatar src="https://i.pravatar.cc/300?img=8" alt="User 3" status="offline" />
        <Avatar initials="JD" backgroundColor="accent-primary" />
        <Avatar initials="+5" backgroundColor="accent-secondary" />
      </div>
    </div>
    
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.75rem',
      backgroundColor: '#e9f5ff',
      borderRadius: '4px'
    }}>
      <Avatar 
        size="sm"
        src="https://i.pravatar.cc/300?img=9" 
        alt="Comment Author" 
      />
      <div style={{ fontSize: '0.875rem' }}>
        <span style={{ fontWeight: 'bold' }}>Jane Smith</span>
        <span> commented on your post</span>
      </div>
    </div>
  </div>
);
