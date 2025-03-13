/**
 * ActivityCard Component Stories
 */

import React, { useState } from 'react';
import ActivityCard from './index';
import { 
  ACTIVITY_STATUS, 
  ACTIVITY_CARD_VARIANTS, 
  ACTIVITY_CARD_SIZES 
} from './constants';
import { Box, Text, Button, Icon, Avatar, Badge } from '../../atoms';

export default {
  title: 'Organisms/ActivityCard',
  component: ActivityCard,
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying activity information in a card format. Supports different layouts, interactive cards, and customizable styling.',
      },
    },
  },
  argTypes: {
    activity: {
      control: { type: 'object' },
      description: 'Activity data object',
      table: {
        type: { summary: 'object' },
      },
    },
    title: {
      control: 'text',
      description: 'Card title (overrides activity.title)',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
      table: {
        type: { summary: 'string' },
      },
    },
    media: {
      control: { type: null },
      description: 'Media content to display',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    actions: {
      control: { type: null },
      description: 'Actions to display in the footer',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(ACTIVITY_CARD_VARIANTS),
      description: 'Card variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(ACTIVITY_CARD_SIZES),
      description: 'Card size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the card is loading',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
      table: {
        type: { summary: 'function' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    extensions: {
      control: { type: 'array' },
      description: 'Extensions to apply to the card',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    children: {
      control: { type: null },
      description: 'Additional content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Sample activity data
const sampleActivity = {
  id: 'activity1',
  title: 'Community Meetup',
  description: 'Join us for our monthly community meetup where we discuss upcoming projects and share ideas.',
  status: ACTIVITY_STATUS.ACTIVE,
  date: 'March 15, 2025',
  time: '6:00 PM - 8:00 PM',
  location: 'Community Center',
  author: 'Community Team',
  participants: 24,
  tags: ['community', 'meetup', 'networking'],
  image: 'https://source.unsplash.com/random/800x600/?community'
};

// Sample media content
const sampleMedia = (
  <div style={{ 
    height: '200px', 
    backgroundImage: `url(${sampleActivity.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '4px 4px 0 0'
  }} />
);

// Sample actions
const sampleActions = (
  <>
    <Button variant="secondary" size="small">Share</Button>
    <Button variant="primary" size="small">Join</Button>
  </>
);

// Basic ActivityCard
export const Basic = {
  args: {
    activity: sampleActivity,
  },
};

// With Media
export const WithMedia = {
  args: {
    activity: sampleActivity,
    media: sampleMedia,
  },
};

// With Actions
export const WithActions = {
  args: {
    activity: sampleActivity,
    actions: sampleActions,
  },
};

// With Media and Actions
export const WithMediaAndActions = {
  args: {
    activity: sampleActivity,
    media: sampleMedia,
    actions: sampleActions,
  },
};

// Interactive Card
export const Interactive = {
  args: {
    activity: sampleActivity,
    media: sampleMedia,
    actions: sampleActions,
    interactive: true,
  },
};

// Different Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(ACTIVITY_CARD_VARIANTS).map(variant => (
      <Box key={variant}>
        <Text variant="h3">{variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</Text>
        <ActivityCard
          activity={sampleActivity}
          media={variant !== ACTIVITY_CARD_VARIANTS.COMPACT ? sampleMedia : undefined}
          actions={sampleActions}
          variant={variant}
        />
      </Box>
    ))}
  </Box>
);

// Different Sizes
export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(ACTIVITY_CARD_SIZES).map(size => (
      <Box key={size}>
        <Text variant="h3">{size.charAt(0).toUpperCase() + size.slice(1)} Size</Text>
        <ActivityCard
          activity={sampleActivity}
          media={sampleMedia}
          actions={sampleActions}
          size={size}
        />
      </Box>
    ))}
  </Box>
);

// Different States
export const States = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Box>
      <Text variant="h3">Default State</Text>
      <ActivityCard
        activity={sampleActivity}
        media={sampleMedia}
        actions={sampleActions}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Disabled State</Text>
      <ActivityCard
        activity={sampleActivity}
        media={sampleMedia}
        actions={sampleActions}
        disabled={true}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Loading State</Text>
      <ActivityCard
        activity={sampleActivity}
        media={sampleMedia}
        actions={sampleActions}
        loading={true}
      />
    </Box>
  </Box>
);

// Different Activity Statuses
export const ActivityStatuses = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(ACTIVITY_STATUS).map(status => {
      const activityWithStatus = {
        ...sampleActivity,
        status,
        title: `${status.charAt(0).toUpperCase() + status.slice(1)} Activity`
      };
      
      return (
        <Box key={status}>
          <Text variant="h3">{status.charAt(0).toUpperCase() + status.slice(1)} Status</Text>
          <ActivityCard
            activity={activityWithStatus}
            media={sampleMedia}
            actions={sampleActions}
          />
        </Box>
      );
    })}
  </Box>
);

// Custom Content
export const CustomContent = () => (
  <ActivityCard
    activity={{
      ...sampleActivity,
      title: 'Custom Content Example'
    }}
    media={sampleMedia}
    actions={sampleActions}
  >
    <Box padding="md">
      <Box display="flex" alignItems="center" gap="sm" marginBottom="md">
        <Avatar 
          src="https://source.unsplash.com/random/100x100/?portrait" 
          size="sm" 
          name="John Doe" 
        />
        <Box>
          <Text variant="subtitle1">John Doe</Text>
          <Text variant="caption" color="text-secondary">Organizer</Text>
        </Box>
      </Box>
      
      <Box display="flex" gap="sm" marginBottom="md" flexWrap="wrap">
        {sampleActivity.tags.map(tag => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </Box>
      
      <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
        <Icon name="calendar" size="sm" />
        <Text>{sampleActivity.date}</Text>
      </Box>
      
      <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
        <Icon name="clock" size="sm" />
        <Text>{sampleActivity.time}</Text>
      </Box>
      
      <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
        <Icon name="map-pin" size="sm" />
        <Text>{sampleActivity.location}</Text>
      </Box>
      
      <Box display="flex" alignItems="center" gap="sm">
        <Icon name="users" size="sm" />
        <Text>{sampleActivity.participants} participants</Text>
      </Box>
    </Box>
  </ActivityCard>
);

// Interactive Example with State Changes
export const InteractiveWithStateChanges = () => {
  const [activity, setActivity] = useState({
    ...sampleActivity,
    participants: 24,
    isJoined: false
  });
  
  const handleJoinClick = () => {
    setActivity(prev => ({
      ...prev,
      participants: prev.isJoined ? prev.participants - 1 : prev.participants + 1,
      isJoined: !prev.isJoined
    }));
  };
  
  const customActions = (
    <>
      <Button variant="secondary" size="small">Share</Button>
      <Button 
        variant={activity.isJoined ? "outline" : "primary"} 
        size="small"
        onClick={handleJoinClick}
      >
        {activity.isJoined ? 'Leave' : 'Join'}
      </Button>
    </>
  );
  
  return (
    <Box display="flex" flexDirection="column" gap="md">
      <Text>Click the Join/Leave button to see the participant count change</Text>
      
      <ActivityCard
        activity={activity}
        media={sampleMedia}
        actions={customActions}
      >
        <Box padding="md">
          <Box display="flex" alignItems="center" gap="sm" marginBottom="md">
            <Avatar 
              src="https://source.unsplash.com/random/100x100/?portrait" 
              size="sm" 
              name="John Doe" 
            />
            <Box>
              <Text variant="subtitle1">John Doe</Text>
              <Text variant="caption" color="text-secondary">Organizer</Text>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap="sm">
            <Icon name="users" size="sm" />
            <Text>{activity.participants} participants</Text>
          </Box>
        </Box>
      </ActivityCard>
    </Box>
  );
};

// Custom Styling
export const CustomStyling = {
  args: {
    activity: sampleActivity,
    media: sampleMedia,
    actions: sampleActions,
    className: 'custom-card',
    style: {
      backgroundColor: 'var(--color-background-secondary)',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-lg)',
    },
  },
};
