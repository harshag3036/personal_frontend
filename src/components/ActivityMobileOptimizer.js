/**
 * ActivityMobileOptimizer Component
 * 
 * Provides mobile-optimized views for the Activities Master section.
 * Includes responsive layout adjustments, touch-friendly controls,
 * and compact views for small screens.
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Card,
  Badge,
  Divider
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';

const ActivityMobileOptimizer = ({ 
  onViewActivity, 
  onCreateActivity,
  activeTab,
  onChangeTab
}) => {
  const { getUserActivities } = useActivity();
  const { user } = useUser();
  
  const [activities, setActivities] = useState([]);
  const [viewMode, setViewMode] = useState('compact'); // 'compact' or 'list'
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Load activities when the component mounts
  useEffect(() => {
    const fetchActivities = () => {
      const userActivities = getUserActivities();
      setActivities(userActivities);
    };
    
    fetchActivities();
    
    // Set up an interval to refresh activities data
    const intervalId = setInterval(fetchActivities, 60000); // 60 seconds
    
    return () => clearInterval(intervalId);
  }, [getUserActivities]);
  
  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Determine if this is a small screen/mobile device
  const isMobileView = screenSize.width < 768;
  
  // Activity card variants
  const CompactActivityCard = ({ activity }) => {
    const truncateTitle = (title) => {
      return title.length > 25 ? `${title.substring(0, 22)}...` : title;
    };
    
    const statusClass = 
      activity.status === 'active' ? 'active' :
      activity.status === 'upcoming' ? 'upcoming' :
      activity.status === 'completed' ? 'completed' : '';
    
    return (
      <Card
        className={`activity-card ${statusClass}`}
        padding="sm"
        marginBottom="xs"
        onClick={() => onViewActivity(activity.id)}
        cursor="pointer"
        transition="all 0.2s ease"
        borderRadius="md"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Flex alignItems="center" gap="2xs">
              <Text fontSize="xs" color="primary" marginRight="2xs">
                {getActivityTypeIcon(activity)}
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                {truncateTitle(activity.title)}
              </Text>
            </Flex>
            
            {activity.communityName && (
              <Text fontSize="xs" color="text-secondary">
                {activity.communityName}
              </Text>
            )}
          </Box>
          
          <Badge
            variant={
              activity.status === 'active' ? 'success' :
              activity.status === 'upcoming' ? 'info' :
              'default'
            }
            size="xs"
          >
            {activity.status}
          </Badge>
        </Flex>
      </Card>
    );
  };
  
  const ListActivityCard = ({ activity }) => {
    const statusClass = 
      activity.status === 'active' ? 'active' :
      activity.status === 'upcoming' ? 'upcoming' :
      activity.status === 'completed' ? 'completed' : '';
      
    return (
      <Card
        className={`activity-card ${statusClass}`}
        padding="md"
        marginBottom="sm"
        onClick={() => onViewActivity(activity.id)}
        cursor="pointer"
        transition="all 0.2s ease"
        borderRadius="md"
      >
        <Flex justifyContent="space-between" alignItems="flex-start" marginBottom="xs">
          <Box>
            <Flex alignItems="center" gap="xs" marginBottom="2xs">
              <Text color="primary" marginRight="2xs">
                {getActivityTypeIcon(activity)}
              </Text>
              <Text fontWeight="bold">
                {activity.title}
              </Text>
            </Flex>
            
            {activity.description && (
              <Text fontSize="sm" color="text-secondary" marginBottom="xs">
                {truncateDescription(activity.description)}
              </Text>
            )}
            
            <Flex alignItems="center" gap="md">
              {activity.communityName && (
                <Text fontSize="xs" color="text-secondary">
                  {activity.communityName}
                </Text>
              )}
              
              <Text fontSize="xs" color="text-secondary">
                {activity.participants?.length || 0} participants
              </Text>
              
              {activity.date && (
                <Text fontSize="xs" color="text-secondary">
                  {formatDate(activity.date)}
                </Text>
              )}
            </Flex>
          </Box>
          
          <Badge
            variant={
              activity.status === 'active' ? 'success' :
              activity.status === 'upcoming' ? 'info' :
              'default'
            }
          >
            {activity.status}
          </Badge>
        </Flex>
      </Card>
    );
  };
  
  // Helper functions
  const getActivityTypeIcon = (activity) => {
    const type = activity.type || activity.category || 'default';
    
    const iconMap = {
      discussion: '🌱',
      event: '📅',
      project: '🎯',
      challenge: '🏆',
      resource: '📚',
      'skill-share': '🎓',
      wellness: '🧘',
      default: '📋'
    };
    
    return iconMap[type] || iconMap.default;
  };
  
  const truncateDescription = (description) => {
    return description.length > 80 ? `${description.substring(0, 77)}...` : description;
  };
  
  // Tab bar for mobile navigation
  const MobileTabBar = () => {
    const tabs = [
      { id: 'my-activities', label: 'My', icon: '👤' },
      { id: 'all-activities', label: 'All', icon: '🌐' },
      { id: 'discover', label: 'Discover', icon: '🔍' },
      { id: 'insights', label: 'Insights', icon: '📊' },
      { id: 'calendar', label: 'Calendar', icon: '📆' },
      { id: 'export', label: 'Export', icon: '📤' }
    ];
    
    return (
      <Box 
        position="fixed" 
        bottom="0" 
        left="0" 
        width="100%" 
        backgroundColor="background-paper"
        borderTop="1px solid" 
        borderTopColor="border"
        zIndex="999"
        padding="xs"
      >
        <Flex justifyContent="space-around">
          {tabs.map(tab => (
            <Box 
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              padding="xs"
              textAlign="center"
              cursor="pointer"
              color={activeTab === tab.id ? 'primary' : 'text-secondary'}
              fontWeight={activeTab === tab.id ? 'bold' : 'normal'}
              borderBottom={activeTab === tab.id ? '2px solid' : 'none'}
              borderBottomColor="primary"
            >
              <Text fontSize="lg">{tab.icon}</Text>
              <Text fontSize="xs">{tab.label}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  };
  
  // Floating action button for mobile
  const FloatingActionButton = () => {
    return (
      <Box
        position="fixed"
        bottom="80px"
        right="20px"
        zIndex="1000"
      >
        <Button
          variant="primary"
          borderRadius="full"
          width="56px"
          height="56px"
          onClick={onCreateActivity}
          boxShadow="lg"
        >
          +
        </Button>
      </Box>
    );
  };
  
  // Toggle view mode button
  const ViewToggle = () => {
    return (
      <Flex justifyContent="flex-end" marginBottom="md">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode(viewMode === 'compact' ? 'list' : 'compact')}
        >
          {viewMode === 'compact' ? 'Show Details' : 'Compact View'}
        </Button>
      </Flex>
    );
  };
  
  return (
    <Box className="activity-mobile-optimizer" paddingBottom="70px">
      {isMobileView && <ViewToggle />}
      
      {/* Activity List */}
      <div className="activities-content">
        {activities.length > 0 ? (
          <Stack spacing={viewMode === 'compact' ? 'xs' : 'sm'}>
            {activities.map(activity => (
              viewMode === 'compact' ? 
                <CompactActivityCard key={activity.id} activity={activity} /> :
                <ListActivityCard key={activity.id} activity={activity} />
            ))}
          </Stack>
        ) : (
          <div className="empty-state">
            <h3 className="empty-state-title">No activities available</h3>
            <p className="empty-state-message">Create a new activity to get started.</p>
            <Button 
              className="create-activity-btn"
              variant="primary" 
              onClick={onCreateActivity}
            >
              Create Activity
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile nav bar */}
      {isMobileView && <MobileTabBar />}
      
      {/* Floating action button for mobile */}
      {isMobileView && <FloatingActionButton />}
    </Box>
  );
};

export default ActivityMobileOptimizer;
