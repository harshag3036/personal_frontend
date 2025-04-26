/**
 * ActivityDisplay Component (Refactored with UI Library)
 * 
 * Displays activities in either grid or list view with optional grouping.
 * This version uses the UI component library for styling and layout.
 */

import React from 'react';
import { 
  Box, 
  Grid, 
  Flex, 
  Text,
  Stack
} from '../../ui';
import ActivityCardRefactored from './ActivityCardRefactored';
import ActivityRow from './ActivityRow'; // Using original ActivityRow for now

/**
 * ActivityDisplay Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.displayedActivities - Activities to display
 * @param {string} props.viewMode - Display mode ('grid' or 'list')
 * @param {string} props.groupBy - Grouping option ('none', 'category', 'type', 'status')
 * @param {Function} props.handleActivityClick - Click handler for activities
 * @param {Object} props.typeConfig - Configuration for activity types
 * @param {Array} props.categories - Available categories
 * @param {Array} props.statusOptions - Available status options
 * @param {Function} props.formatDate - Function to format dates
 * @returns {JSX.Element} ActivityDisplay component
 */
const ActivityDisplayRefactored = ({ 
  displayedActivities, 
  viewMode, 
  groupBy, 
  handleActivityClick, 
  typeConfig, 
  categories, 
  statusOptions,
  formatDate 
}) => {
  // Render activity card (grid view)
  const renderActivityCard = (activity) => {
    return (
      <ActivityCardRefactored
        key={activity.id}
        activity={activity}
        typeConfig={typeConfig}
        categories={categories}
        formatDate={formatDate}
        onClick={handleActivityClick}
      />
    );
  };

  // Render activity row (list view)
  const renderActivityRow = (activity) => {
    return (
      <ActivityRow
        key={activity.id}
        activity={activity}
        typeConfig={typeConfig}
        categories={categories}
        formatDate={formatDate}
        onClick={handleActivityClick}
      />
    );
  };

  // Group activities by the selected criteria
  const getGroupedActivities = () => {
    return displayedActivities.reduce((groups, activity) => {
      let groupKey;
      
      switch (groupBy) {
        case 'category':
          // Ensure category exists, is not empty, and is valid
          groupKey = activity.category && activity.category.trim() !== ''
            ? categories.find(c => c.value === activity.category)?.label || activity.category
            : 'Uncategorized';
          break;
        case 'type':
          // Ensure type exists, is not empty, and is valid
          groupKey = activity.type && activity.type.trim() !== '' && typeConfig[activity.type]
            ? typeConfig[activity.type].label
            : 'Uncategorized';
          break;
        case 'status':
          // Ensure status exists, is not empty, and is valid
          const statusObj = activity.status && activity.status.trim() !== ''
            ? statusOptions.find(s => s.value === activity.status)
            : null;
          groupKey = statusObj?.label || 'Uncategorized';
          break;
        default:
          groupKey = 'All Activities';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      
      groups[groupKey].push(activity);
      return groups;
    }, {});
  };

  // Render activities without grouping
  if (groupBy === 'none') {
    return (
      <Box className={viewMode === 'grid' ? 'grid-view' : 'list-view'}>
        {viewMode === 'grid' ? (
          <Grid 
            columns={{ base: 1, md: 2, lg: 3 }}
            gap="lg"
          >
            {displayedActivities.map(renderActivityCard)}
          </Grid>
        ) : (
          <Stack spacing="md">
            {displayedActivities.map(renderActivityRow)}
          </Stack>
        )}
      </Box>
    );
  } 
  
  // Render activities with grouping
  else {
    const groupedActivities = getGroupedActivities();
    
    return (
      <Stack spacing="xl">
        {Object.entries(groupedActivities).map(([groupName, activities]) => (
          <Box key={groupName}>
            <Text 
              variant="h2" 
              marginBottom="md" 
              paddingBottom="xs"
              borderBottom="1px solid"
              borderColor="border-light"
            >
              {groupName}
            </Text>
            
            {viewMode === 'grid' ? (
              <Grid 
                columns={{ base: 1, md: 2, lg: 3 }}
                gap="lg"
              >
                {activities.map(renderActivityCard)}
              </Grid>
            ) : (
              <Stack spacing="md">
                {activities.map(renderActivityRow)}
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
    );
  }
};

export default ActivityDisplayRefactored;
