/**
 * ActivityCard Example
 * 
 * This example demonstrates how to use the ActivityCard organism component
 * to display activity information in different layouts and states.
 */

import React, { useState } from 'react';
import { 
  ActivityCard, 
  Box, 
  Text, 
  Button, 
  Flex, 
  Stack, 
  Badge, 
  Avatar, 
  Icon 
} from '../index';
import { ACTIVITY_CARD_STATUS, ACTIVITY_CARD_VARIANTS, ACTIVITY_CARD_SIZES } from '../organisms/ActivityCard/constants';

// Sample activity data
const sampleActivities = [
  {
    id: 'activity1',
    title: 'Community Meetup',
    description: 'Join us for our monthly community meetup where we discuss upcoming projects and share ideas.',
    status: ACTIVITY_CARD_STATUS.ACTIVE,
    date: 'March 15, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Community Center',
    author: 'Community Team',
    participants: 24,
    tags: ['community', 'meetup', 'networking'],
    image: 'https://source.unsplash.com/random/800x600/?community'
  },
  {
    id: 'activity2',
    title: 'Project Workshop',
    description: 'A hands-on workshop to learn new skills and collaborate on community projects.',
    status: ACTIVITY_CARD_STATUS.UPCOMING,
    date: 'April 5, 2025',
    time: '10:00 AM - 2:00 PM',
    location: 'Innovation Hub',
    author: 'Workshop Team',
    participants: 18,
    tags: ['workshop', 'skills', 'collaboration'],
    image: 'https://source.unsplash.com/random/800x600/?workshop'
  },
  {
    id: 'activity3',
    title: 'Milestone Review',
    description: 'Review progress on key milestones and plan next steps for the community project.',
    status: ACTIVITY_CARD_STATUS.COMPLETED,
    date: 'February 28, 2025',
    time: '3:00 PM - 4:30 PM',
    location: 'Virtual Meeting',
    author: 'Project Lead',
    participants: 12,
    tags: ['milestone', 'review', 'planning'],
    image: 'https://source.unsplash.com/random/800x600/?meeting'
  }
];

// Helper function to create media content
const createMediaContent = (imageUrl) => (
  <div style={{ 
    height: '200px', 
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '4px 4px 0 0'
  }} />
);

// Helper function to create action buttons
const createActionButtons = (activity, onJoin, onShare) => (
  <Flex gap="sm" justifyContent="flex-end">
    <Button 
      variant="secondary" 
      size="small" 
      onClick={() => onShare(activity.id)}
    >
      Share
    </Button>
    <Button 
      variant="primary" 
      size="small" 
      onClick={() => onJoin(activity.id)}
    >
      {activity.status === ACTIVITY_CARD_STATUS.ACTIVE ? 'Join' : 
       activity.status === ACTIVITY_CARD_STATUS.UPCOMING ? 'Register' : 'View Details'}
    </Button>
  </Flex>
);

// ActivityCard Example Component
const ActivityCardExample = () => {
  const [activities, setActivities] = useState(sampleActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // Handle joining an activity
  const handleJoin = (activityId) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, participants: activity.participants + 1 }
          : activity
      )
    );
    alert(`Joined activity: ${activityId}`);
  };
  
  // Handle sharing an activity
  const handleShare = (activityId) => {
    alert(`Shared activity: ${activityId}`);
  };
  
  // Handle clicking on an activity card
  const handleCardClick = (activityId) => {
    setSelectedActivity(
      activities.find(activity => activity.id === activityId)
    );
  };
  
  return (
    <Box padding="lg">
      <Text variant="h1" marginBottom="lg">Activity Card Examples</Text>
      
      {/* Basic Usage */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Basic Usage</Text>
        <ActivityCard 
          activity={activities[0]}
          onClick={() => handleCardClick(activities[0].id)}
        />
      </Box>
      
      {/* With Media and Actions */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">With Media and Actions</Text>
        <ActivityCard 
          activity={activities[0]}
          media={createMediaContent(activities[0].image)}
          actions={createActionButtons(activities[0], handleJoin, handleShare)}
          onClick={() => handleCardClick(activities[0].id)}
        />
      </Box>
      
      {/* Different Variants */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Different Variants</Text>
        <Stack spacing="lg">
          {Object.values(ACTIVITY_CARD_VARIANTS).map(variant => (
            <Box key={variant}>
              <Text variant="h3" marginBottom="sm">{variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</Text>
              <ActivityCard
                activity={activities[0]}
                media={variant !== ACTIVITY_CARD_VARIANTS.COMPACT ? createMediaContent(activities[0].image) : undefined}
                actions={createActionButtons(activities[0], handleJoin, handleShare)}
                variant={variant}
                onClick={() => handleCardClick(activities[0].id)}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      
      {/* Different Sizes */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Different Sizes</Text>
        <Stack spacing="lg">
          {Object.values(ACTIVITY_CARD_SIZES).map(size => (
            <Box key={size}>
              <Text variant="h3" marginBottom="sm">{size.charAt(0).toUpperCase() + size.slice(1)} Size</Text>
              <ActivityCard
                activity={activities[0]}
                media={createMediaContent(activities[0].image)}
                actions={createActionButtons(activities[0], handleJoin, handleShare)}
                size={size}
                onClick={() => handleCardClick(activities[0].id)}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      
      {/* Different Activity Statuses */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Different Activity Statuses</Text>
        <Stack spacing="lg">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              media={createMediaContent(activity.image)}
              actions={createActionButtons(activity, handleJoin, handleShare)}
              onClick={() => handleCardClick(activity.id)}
            />
          ))}
        </Stack>
      </Box>
      
      {/* Custom Content */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Custom Content</Text>
        <ActivityCard
          activity={activities[0]}
          media={createMediaContent(activities[0].image)}
          actions={createActionButtons(activities[0], handleJoin, handleShare)}
          onClick={() => handleCardClick(activities[0].id)}
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
              {activities[0].tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </Box>
            
            <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
              <Icon name="calendar" size="sm" />
              <Text>{activities[0].date}</Text>
            </Box>
            
            <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
              <Icon name="clock" size="sm" />
              <Text>{activities[0].time}</Text>
            </Box>
            
            <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
              <Icon name="map-pin" size="sm" />
              <Text>{activities[0].location}</Text>
            </Box>
            
            <Box display="flex" alignItems="center" gap="sm">
              <Icon name="users" size="sm" />
              <Text>{activities[0].participants} participants</Text>
            </Box>
          </Box>
        </ActivityCard>
      </Box>
      
      {/* Activity List */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Activity List</Text>
        <Stack spacing="md">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              variant={ACTIVITY_CARD_VARIANTS.COMPACT}
              interactive={true}
              onClick={() => handleCardClick(activity.id)}
            />
          ))}
        </Stack>
      </Box>
      
      {/* Selected Activity Details */}
      {selectedActivity && (
        <Box marginBottom="xl">
          <Text variant="h2" marginBottom="md">Selected Activity Details</Text>
          <ActivityCard
            activity={selectedActivity}
            media={createMediaContent(selectedActivity.image)}
            actions={createActionButtons(selectedActivity, handleJoin, handleShare)}
            variant={ACTIVITY_CARD_VARIANTS.DETAILED}
          >
            <Box padding="md">
              <Text variant="body1" marginBottom="md">{selectedActivity.description}</Text>
              
              <Box display="flex" gap="sm" marginBottom="md" flexWrap="wrap">
                {selectedActivity.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </Box>
              
              <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
                <Icon name="calendar" size="sm" />
                <Text>{selectedActivity.date}</Text>
              </Box>
              
              <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
                <Icon name="clock" size="sm" />
                <Text>{selectedActivity.time}</Text>
              </Box>
              
              <Box display="flex" alignItems="center" gap="sm" marginBottom="sm">
                <Icon name="map-pin" size="sm" />
                <Text>{selectedActivity.location}</Text>
              </Box>
              
              <Box display="flex" alignItems="center" gap="sm">
                <Icon name="users" size="sm" />
                <Text>{selectedActivity.participants} participants</Text>
              </Box>
            </Box>
          </ActivityCard>
        </Box>
      )}
    </Box>
  );
};

export default ActivityCardExample;
