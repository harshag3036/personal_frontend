import React, { useState } from 'react';
import { Box, Text, Flex, Button, Card, Icon, Stack, Avatar, Badge, Divider } from '../index';

/**
 * ActivityCard Render Props Example
 * 
 * This example demonstrates how to use the ActivityCard component with render props pattern
 * to create highly customized activity cards with complete control over rendering.
 */
const ActivityCardRenderPropsExample = () => {
  // Sample activity data
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Mindfulness Session: Focused Attention',
      type: 'meditation',
      completed: true,
      date: '2025-03-16',
      duration: 15,
      category: 'Mindfulness',
      difficulty: 'beginner',
      streak: 5,
      tags: ['focus', 'meditation', 'beginner'],
      user: {
        id: 'user1',
        name: 'Sarah Johnson',
        avatar: 'https://ui.shadcn/avatars/01.png'
      },
      stats: {
        completions: 12,
        averageRating: 4.5,
        favorites: 24
      },
      engagement: {
        likes: 18,
        comments: 7,
        shares: 3
      }
    },
    {
      id: 2,
      title: 'Goal Setting Workshop',
      type: 'workshop',
      completed: false,
      date: '2025-03-18',
      duration: 45,
      category: 'Personal Growth',
      difficulty: 'intermediate',
      streak: 0,
      tags: ['goals', 'planning', 'productivity'],
      user: {
        id: 'user2',
        name: 'Michael Chen',
        avatar: 'https://ui.shadcn/avatars/02.png'
      },
      stats: {
        completions: 5,
        averageRating: 4.2,
        favorites: 16
      },
      engagement: {
        likes: 12,
        comments: 3,
        shares: 1
      }
    },
    {
      id: 3,
      title: 'Community Discussion: Digital Wellbeing',
      type: 'discussion',
      completed: false,
      date: '2025-03-20',
      duration: 60,
      category: 'Community',
      difficulty: 'all-levels',
      streak: 0,
      tags: ['digital', 'wellbeing', 'community'],
      user: {
        id: 'user3',
        name: 'Emily Rodriguez',
        avatar: 'https://ui.shadcn/avatars/03.png'
      },
      stats: {
        completions: 8,
        averageRating: 4.7,
        favorites: 32
      },
      engagement: {
        likes: 24,
        comments: 15,
        shares: 6
      }
    }
  ]);

  // Card variant state
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [cardVariant, setCardVariant] = useState('default'); // default, compact, expanded, interactive
  const [cardTheme, setCardTheme] = useState('light'); // light, dark, colorful

  // Activity Card actions
  const handleActivityClick = (activityId) => {
    setSelectedActivity(activityId === selectedActivity ? null : activityId);
  };

  const handleMarkComplete = (activityId) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed: true } 
          : activity
      )
    );
  };

  const handleLike = (activityId) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === activityId 
          ? { 
              ...activity, 
              engagement: { 
                ...activity.engagement, 
                likes: activity.engagement.likes + 1 
              } 
            } 
          : activity
      )
    );
  };

  // Activity card renderers
  const renderDefaultCard = (activity) => {
    const isSelected = activity.id === selectedActivity;
    
    return (
      <Card 
        padding="md" 
        borderRadius="md"
        backgroundColor={cardTheme === 'dark' ? 'gray.900' : 
                        cardTheme === 'colorful' ? 'primary.50' : 'white'}
        color={cardTheme === 'dark' ? 'white' : 'textColor'}
        onClick={() => handleActivityClick(activity.id)}
        cursor="pointer"
        boxShadow={isSelected ? 'md' : undefined}
        border="1px solid"
        borderColor={isSelected ? 'primary' : 'borderColor'}
      >
        {/* Activity Header */}
        <Flex justifyContent="space-between" alignItems="flex-start" marginBottom="sm">
          <Box>
            <Flex alignItems="center" gap="sm" marginBottom="xs">
              <Icon 
                name={
                  activity.type === 'meditation' ? 'sun' : 
                  activity.type === 'workshop' ? 'users' : 'message-circle'
                } 
                size="sm" 
                color="primary"
              />
              <Text 
                color={cardTheme === 'dark' ? 'gray.300' : 'textColorSecondary'} 
                fontSize="sm"
              >
                {activity.category}
              </Text>
              {activity.completed && (
                <Badge variant="success">Completed</Badge>
              )}
            </Flex>
            <Text as="h3" fontWeight="bold" marginBottom="xs">{activity.title}</Text>
          </Box>
          
          <Flex 
            backgroundColor={cardTheme === 'dark' ? 'gray.800' : 
                           cardTheme === 'colorful' ? 'primary.100' : 'background'}
            borderRadius="full"
            paddingX="sm"
            paddingY="xs"
          >
            <Text fontSize="sm">{activity.duration} mins</Text>
          </Flex>
        </Flex>
        
        {/* Activity Info */}
        <Flex gap="md" marginBottom="md">
          <Flex alignItems="center" gap="xs">
            <Icon name="calendar" size="sm" />
            <Text fontSize="sm">{new Date(activity.date).toLocaleDateString()}</Text>
          </Flex>
          <Flex alignItems="center" gap="xs">
            <Icon name="activity" size="sm" />
            <Text fontSize="sm">{activity.difficulty}</Text>
          </Flex>
          {activity.streak > 0 && (
            <Flex alignItems="center" gap="xs">
              <Icon name="zap" size="sm" color="warning" />
              <Text fontSize="sm">{activity.streak} day streak</Text>
            </Flex>
          )}
        </Flex>
        
        {/* User Info */}
        <Flex alignItems="center" gap="sm" marginBottom="md">
          <Avatar 
            src={activity.user.avatar} 
            name={activity.user.name} 
            size="sm" 
          />
          <Text fontSize="sm">{activity.user.name}</Text>
        </Flex>
        
        {/* Tags */}
        <Flex gap="xs" flexWrap="wrap" marginBottom="md">
          {activity.tags.map(tag => (
            <Box 
              key={tag}
              backgroundColor={cardTheme === 'dark' ? 'gray.800' : 
                               cardTheme === 'colorful' ? 'primary.100' : 'background'}
              paddingX="sm"
              paddingY="xs"
              borderRadius="full"
              fontSize="xs"
            >
              {tag}
            </Box>
          ))}
        </Flex>
        
        {/* Actions */}
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap="md">
            <Flex alignItems="center" gap="xs">
              <Button 
                variant="ghost" 
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(activity.id);
                }}
              >
                <Icon name="heart" size="sm" />
              </Button>
              <Text fontSize="sm">{activity.engagement.likes}</Text>
            </Flex>
            <Flex alignItems="center" gap="xs">
              <Icon name="message-square" size="sm" />
              <Text fontSize="sm">{activity.engagement.comments}</Text>
            </Flex>
          </Flex>
          
          {!activity.completed && (
            <Button 
              size="sm" 
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkComplete(activity.id);
              }}
            >
              Start Activity
            </Button>
          )}
        </Flex>
        
        {/* Expanded Content (on selection) */}
        {isSelected && (
          <Box marginTop="lg">
            <Divider marginY="md" />
            <Text as="h4" marginBottom="sm">Activity Stats</Text>
            <Flex justifyContent="space-between" marginBottom="md">
              <Flex direction="column" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{activity.stats.completions}</Text>
                <Text fontSize="sm" color={cardTheme === 'dark' ? 'gray.400' : 'textColorSecondary'}>Completions</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{activity.stats.averageRating}</Text>
                <Text fontSize="sm" color={cardTheme === 'dark' ? 'gray.400' : 'textColorSecondary'}>Avg. Rating</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{activity.stats.favorites}</Text>
                <Text fontSize="sm" color={cardTheme === 'dark' ? 'gray.400' : 'textColorSecondary'}>Favorites</Text>
              </Flex>
            </Flex>
            
            <Flex justifyContent="center" marginTop="md">
              <Button variant="outline" size="sm" marginRight="sm">Share</Button>
              <Button variant="outline" size="sm">Save</Button>
            </Flex>
          </Box>
        )}
      </Card>
    );
  };

  const renderCompactCard = (activity) => {
    return (
      <Card 
        padding="sm" 
        borderRadius="md"
        backgroundColor={cardTheme === 'dark' ? 'gray.900' : 
                         cardTheme === 'colorful' ? 'primary.50' : 'white'}
        color={cardTheme === 'dark' ? 'white' : 'textColor'}
        cursor="pointer"
        onClick={() => handleActivityClick(activity.id)}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="sm">
            <Icon 
              name={
                activity.type === 'meditation' ? 'sun' : 
                activity.type === 'workshop' ? 'users' : 'message-circle'
              }
              size="sm" 
              color="primary"
            />
            <Box>
              <Text fontWeight="medium">{activity.title}</Text>
              <Text fontSize="xs" color={cardTheme === 'dark' ? 'gray.400' : 'textColorSecondary'}>
                {activity.duration} mins • {activity.category}
              </Text>
            </Box>
          </Flex>
          
          {activity.completed ? (
            <Badge variant="success" size="sm">Done</Badge>
          ) : (
            <Button 
              size="xs" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkComplete(activity.id);
              }}
            >
              Start
            </Button>
          )}
        </Flex>
      </Card>
    );
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">ActivityCard with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how the ActivityCard component could use the render props pattern
        to create highly customized activity cards with complete control over rendering.
      </Text>
      
      {/* Card Configuration Controls */}
      <Card padding="md" marginBottom="lg">
        <Text as="h3" marginBottom="md">Card Configuration</Text>
        <Flex gap="md" flexWrap="wrap">
          <Box>
            <Text marginBottom="xs">Card Variant:</Text>
            <Flex gap="sm">
              <Button 
                size="sm"
                variant={cardVariant === 'default' ? 'primary' : 'outline'}
                onClick={() => setCardVariant('default')}
              >
                Default
              </Button>
              <Button 
                size="sm"
                variant={cardVariant === 'compact' ? 'primary' : 'outline'}
                onClick={() => setCardVariant('compact')}
              >
                Compact
              </Button>
            </Flex>
          </Box>
          
          <Box>
            <Text marginBottom="xs">Card Theme:</Text>
            <Flex gap="sm">
              <Button 
                size="sm"
                variant={cardTheme === 'light' ? 'primary' : 'outline'}
                onClick={() => setCardTheme('light')}
              >
                Light
              </Button>
              <Button 
                size="sm"
                variant={cardTheme === 'dark' ? 'primary' : 'outline'}
                onClick={() => setCardTheme('dark')}
              >
                Dark
              </Button>
              <Button 
                size="sm"
                variant={cardTheme === 'colorful' ? 'primary' : 'outline'}
                onClick={() => setCardTheme('colorful')}
              >
                Colorful
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Card>
      
      {/* Activity Cards */}
      <Box 
        backgroundColor={cardTheme === 'dark' ? 'gray.800' : 'gray.50'}
        padding="lg"
        borderRadius="md"
      >
        <Stack spacing="md">
          {activities.map(activity => (
            <Box key={activity.id}>
              {cardVariant === 'default' ? renderDefaultCard(activity) : renderCompactCard(activity)}
            </Box>
          ))}
        </Stack>
      </Box>
      
      {/* Documentation */}
      <Card padding="md" marginTop="xl">
        <Text as="h3" marginBottom="md">Using Render Props for ActivityCard</Text>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px', 
          overflowX: 'auto', 
          fontSize: '0.9em' 
        }}>
{`<ActivityCard
  activity={activity}
  variant={cardVariant}
  theme={cardTheme}
  isSelected={selectedActivity === activity.id}
  onSelect={handleActivityClick}
  onComplete={handleMarkComplete}
  onLike={handleLike}
>
  {({
    activity,
    variant,
    theme,
    isSelected,
    isCompleted,
    handleSelect,
    handleComplete,
    handleLike,
    handleShare,
    handleSave,
    // Additional context
  }) => (
    <Card 
      onClick={handleSelect}
      backgroundColor={getBackgroundColor(theme)}
      color={getTextColor(theme)}
    >
      {/* Custom activity header */}
      <YourCustomHeader
        title={activity.title}
        category={activity.category}
        duration={activity.duration}
        type={activity.type}
        isCompleted={isCompleted}
        theme={theme}
      />
      
      {/* Custom activity details based on variant */}
      {variant === 'default' && (
        <YourDefaultContent
          activity={activity}
          theme={theme}
          onLike={handleLike}
          onComplete={handleComplete}
        />
      )}
      
      {variant === 'compact' && (
        <YourCompactContent
          activity={activity}
          theme={theme}
          onComplete={handleComplete}
        />
      )}
      
      {/* Custom expanded content when selected */}
      {isSelected && (
        <YourExpandedContent
          activity={activity}
          theme={theme}
          onShare={handleShare}
          onSave={handleSave}
        />
      )}
    </Card>
  )}
</ActivityCard>`}
        </pre>
        
        <Text as="h3" marginTop="lg" marginBottom="md">Benefits of Render Props for ActivityCard:</Text>
        <ul>
          <li>Custom card layouts for different activity types (meditation, workshop, discussion, etc.)</li>
          <li>Specialized visual treatments based on status (completed, in progress, upcoming)</li>
          <li>Context-specific action buttons and interactions</li>
          <li>Custom activity detail visualizations</li>
          <li>Theme and brand-specific styling variations</li>
          <li>Different card densities for various use cases (feed, dashboard, calendar)</li>
        </ul>
        
        <Text marginTop="md">
          The ActivityCard component is well-suited for the render props pattern because activities can have many
          different representations depending on the application context, activity type, and user role. This approach
          allows for consistent data handling and interaction patterns while giving complete control over the visual 
          representation and available actions.
        </Text>
      </Card>
    </Box>
  );
};

export default ActivityCardRenderPropsExample;
