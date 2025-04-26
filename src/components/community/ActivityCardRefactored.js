/**
 * ActivityCard Component (Refactored with UI Library)
 * 
 * A reusable card component for displaying activity information in grid view.
 * This version uses the UI component library for styling and layout.
 */

import React from 'react';
import { 
  Box, 
  Card, 
  Text, 
  Badge, 
  Flex, 
  Stack,
  Avatar
} from '../../ui';

/**
 * ActivityCard Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.activity - Activity data
 * @param {Object} props.typeConfig - Configuration for activity types
 * @param {Array} props.categories - Available categories
 * @param {Function} props.formatDate - Function to format dates
 * @param {Function} props.onClick - Click handler
 * @param {boolean} [props.showParticipants=true] - Whether to show participants
 * @param {boolean} [props.showCategory=true] - Whether to show category
 * @param {boolean} [props.showTags=true] - Whether to show tags
 * @param {number} [props.maxDescriptionLength=120] - Max length for description
 * @returns {JSX.Element} ActivityCard component
 */
const ActivityCardRefactored = ({ 
  activity, 
  typeConfig, 
  categories, 
  formatDate, 
  onClick,
  showParticipants = true,
  showCategory = true,
  showTags = true,
  maxDescriptionLength = 120
}) => {
  const typeInfo = typeConfig[activity.type] || { icon: '📋', color: '#607d8b', label: 'Activity' };
  
  // Truncate description if it's too long
  const truncateDescription = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Format description
  const description = truncateDescription(activity.description, maxDescriptionLength);
  
  // Get category info
  const categoryInfo = activity.category ? 
    categories.find(c => c.value === activity.category) || 
    { icon: '📂', label: activity.category } : 
    null;
  
  // Calculate activity progress
  const getActivityProgress = () => {
    if (activity.status === 'completed') return 100;
    if (activity.status === 'draft') return 0;
    
    // If there's explicit progress data, use it
    if (activity.progress !== undefined) return activity.progress;
    
    // Otherwise estimate based on dates if available
    if (activity.startDate && activity.endDate) {
      const start = new Date(activity.startDate).getTime();
      const end = new Date(activity.endDate).getTime();
      const now = new Date().getTime();
      
      if (now < start) return 0;
      if (now > end) return 100;
      
      return Math.round(((now - start) / (end - start)) * 100);
    }
    
    // Default progress for active activities without dates
    return activity.status === 'active' ? 50 : 0;
  };
  
  const progress = getActivityProgress();

  // Map status to variant for Badge
  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'info';
      case 'completed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };
  
  return (
    <Card 
      onClick={() => onClick(activity.id)}
      cursor="pointer"
      transition="all 0.2s ease"
      overflow="hidden"
      height="100%"
      display="flex"
      flexDirection="column"
      borderTop="4px solid"
      borderTopColor={typeInfo.color}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'md'
      }}
      data-status={activity.status}
    >
      <Box padding="md">
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="center" marginBottom="sm">
          {/* Type icon */}
          <Flex 
            width="28px" 
            height="28px" 
            borderRadius="full" 
            backgroundColor={typeInfo.color} 
            justifyContent="center" 
            alignItems="center" 
            color="white" 
            fontSize="sm"
          >
            {typeInfo.icon}
          </Flex>
          
          {/* Status badge */}
          <Badge variant={getStatusVariant(activity.status)}>
            {activity.status}
          </Badge>
        </Flex>
        
        {/* Title */}
        <Text variant="h3" marginBottom="xs">{activity.title}</Text>
        
        {/* Category */}
        {showCategory && categoryInfo && (
          <Flex 
            alignItems="center" 
            backgroundColor="background-secondary" 
            padding="xs" 
            borderRadius="sm" 
            fontSize="sm" 
            color="text-secondary" 
            width="fit-content" 
            marginBottom="sm"
          >
            {categoryInfo.icon} {categoryInfo.label}
          </Flex>
        )}
        
        {/* Description */}
        <Text 
          variant="body2" 
          color="text-secondary" 
          marginBottom="md" 
          flexGrow={1}
        >
          {description}
        </Text>
        
        {/* Tags */}
        {showTags && activity.tags && activity.tags.length > 0 && (
          <Flex gap="xs" flexWrap="wrap" marginBottom="md">
            {activity.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" size="small">
                {tag}
              </Badge>
            ))}
            {activity.tags.length > 3 && (
              <Badge variant="outline" size="small">
                +{activity.tags.length - 3}
              </Badge>
            )}
          </Flex>
        )}
        
        {/* Progress bar */}
        <Box 
          width="100%" 
          height="4px" 
          backgroundColor="background-tertiary" 
          borderRadius="sm" 
          marginBottom="md" 
          overflow="hidden"
        >
          <Box 
            height="100%" 
            width={`${progress}%`}
            backgroundColor={activity.status === 'completed' ? 'success-500' : 
                            activity.status === 'draft' ? 'neutral-500' : 
                            typeInfo.color} 
            borderRadius="sm" 
            transition="width 0.3s ease"
          />
        </Box>
        
        {/* Footer */}
        <Flex 
          justifyContent="space-between" 
          alignItems="center" 
          marginTop="auto" 
          paddingTop="sm" 
          borderTop="1px solid" 
          borderColor="border-light" 
          fontSize="xs" 
          color="text-secondary"
        >
          {/* Date */}
          <Text variant="caption">
            {formatDate(activity.createdAt)}
          </Text>
          
          {/* Participants */}
          {showParticipants && (
            <Flex alignItems="center" gap="sm">
              <Flex alignItems="center" gap="xs">
                <Text>👥</Text>
                <Text>{activity.participants?.length || 0}</Text>
              </Flex>
              
              {activity.participants && activity.participants.length > 0 && (
                <Flex>
                  {activity.participants.slice(0, 3).map((participant, index) => (
                    <Avatar 
                      key={participant.id || index}
                      name={participant.name || `Participant ${index + 1}`}
                      src={participant.avatar}
                      size="xs"
                      marginLeft={index > 0 ? "-8px" : "0"}
                      border="2px solid"
                      borderColor="background-default"
                      zIndex={3 - index}
                      backgroundColor={!participant.avatar ? `hsl(${(index * 60) % 360}, 70%, 60%)` : undefined}
                    />
                  ))}
                  {activity.participants.length > 3 && (
                    <Flex 
                      width="24px" 
                      height="24px" 
                      borderRadius="full" 
                      backgroundColor="background-tertiary" 
                      border="2px solid"
                      borderColor="background-default"
                      marginLeft="-8px"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="2xs"
                      color="text-secondary"
                    >
                      +{activity.participants.length - 3}
                    </Flex>
                  )}
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Box>
    </Card>
  );
};

export default ActivityCardRefactored;
