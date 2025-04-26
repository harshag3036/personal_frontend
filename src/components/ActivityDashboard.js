/**
 * ActivityDashboard Component
 * 
 * Displays activity metrics, visualizations, and upcoming activities.
 * This is a key part of the My Activities tab in the ActivitiesMaster component.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Stack,
  Grid,
  Button,
  Card,
  Badge,
  Divider
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const ActivityDashboard = ({ onViewActivity, onCreateActivity }) => {
  const { 
    getAllActivities, 
    getUserActivities, 
    getGlobalActivities,
    updateStatus,
    getParticipants
  } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();
  
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    active: 0,
    completed: 0,
    created: 0,
    participated: 0,
    upcomingCount: 0
  });
  const [timeSpent, setTimeSpent] = useState({
    week: 0,
    month: 0,
    year: 0
  });
  const [communityBreakdown, setCommunityBreakdown] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [activeActivities, setActiveActivities] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Load activities when the component mounts
  useEffect(() => {
    const fetchActivities = () => {
      // Get all activities the user is participating in
      const userActivities = getUserActivities();
      setActivities(userActivities);
      
      // Calculate metrics
      calculateMetrics(userActivities);
      
      // Calculate time spent (mock implementation)
      calculateTimeSpent(userActivities);
      
      // Calculate breakdowns
      calculateCommunityBreakdown(userActivities);
      calculateCategoryBreakdown(userActivities);
      
      // Get upcoming and active activities
      filterUpcomingActivities(userActivities);
      filterActiveActivities(userActivities);
      
      // Get recent activities (all activities sorted by most recent)
      const sortedByRecent = [...userActivities].sort((a, b) => {
        return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      });
      
      setRecentActivities(sortedByRecent.slice(0, 5));
    };
    
    fetchActivities();
    
    // Set up an interval to refresh data
    const intervalId = setInterval(fetchActivities, 60000); // every minute
    
    return () => clearInterval(intervalId);
  }, [getAllActivities, getUserActivities, user]);
  
  // Calculate key metrics
  const calculateMetrics = (activities) => {
    const metrics = {
      total: activities.length,
      active: activities.filter(a => a.status === 'active').length,
      completed: activities.filter(a => a.status === 'completed').length,
      created: activities.filter(a => a.createdBy?.id === user?.id).length,
      participated: activities.filter(a => 
        a.participants?.some(p => p.id === user?.id) && a.createdBy?.id !== user?.id
      ).length,
      upcomingCount: activities.filter(a => a.status === 'upcoming').length
    };
    
    setMetrics(metrics);
  };
  
  // Calculate time spent on activities (mock implementation)
  const calculateTimeSpent = (activities) => {
    // In a real implementation, this would calculate actual time spent
    // based on check-ins, time logs, or other tracking
    
    // For now, we'll just generate some placeholder data
    const mockWeekHours = activities.length * 2.5;
    const mockMonthHours = mockWeekHours * 4;
    const mockYearHours = mockMonthHours * 12;
    
    setTimeSpent({
      week: mockWeekHours.toFixed(1),
      month: mockMonthHours.toFixed(1),
      year: mockYearHours.toFixed(1)
    });
  };
  
  // Calculate community breakdown
  const calculateCommunityBreakdown = (activities) => {
    const breakdown = {};
    let globalCount = 0;
    
    activities.forEach(activity => {
      if (activity.communityId || activity.circleId) {
        const communityId = activity.communityId || activity.circleId;
        breakdown[communityId] = (breakdown[communityId] || 0) + 1;
      } else {
        globalCount++;
      }
    });
    
    // Convert to array format for easier rendering
    const communityData = Object.entries(breakdown).map(([id, count]) => {
      // Check if communities is defined before using find
      const community = communities && communities.length ? 
        communities.find(c => c.id === id) : null;
      
      return {
        id,
        name: community ? community.name : 'Unknown Community',
        count,
        percentage: (count / activities.length) * 100
      };
    });
    
    // Add global activities
    if (globalCount > 0) {
      communityData.push({
        id: 'global',
        name: 'Global Activities',
        count: globalCount,
        percentage: (globalCount / activities.length) * 100
      });
    }
    
    // Sort by count descending
    communityData.sort((a, b) => b.count - a.count);
    
    setCommunityBreakdown(communityData);
  };
  
  // Calculate category breakdown
  const calculateCategoryBreakdown = (activities) => {
    const breakdown = {};
    
    activities.forEach(activity => {
      const category = activity.category || activity.type || 'uncategorized';
      breakdown[category] = (breakdown[category] || 0) + 1;
    });
    
    // Convert to array format for easier rendering
    const categoryData = Object.entries(breakdown).map(([category, count]) => {
      return {
        category,
        count,
        percentage: (count / activities.length) * 100
      };
    });
    
    // Sort by count descending
    categoryData.sort((a, b) => b.count - a.count);
    
    setCategoryBreakdown(categoryData);
  };
  
  // Filter upcoming activities
  const filterUpcomingActivities = (activities) => {
    const now = new Date();
    
    // Find activities with a future start date
    const upcoming = activities.filter(activity => {
      if (activity.status === 'upcoming') return true;
      
      if (activity.startDate) {
        const startDate = new Date(activity.startDate);
        return startDate > now;
      }
      
      return false;
    });
    
    // Sort by closest start date
    upcoming.sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate) : new Date(9999, 11, 31);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(9999, 11, 31);
      return dateA - dateB;
    });
    
    setUpcomingActivities(upcoming.slice(0, 5)); // Get top 5
  };
  
  // Filter active activities
  const filterActiveActivities = (activities) => {
    // Find activities with 'active' status
    const active = activities.filter(activity => activity.status === 'active');
    
    // Sort by most recently updated
    active.sort((a, b) => {
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    });
    
    setActiveActivities(active.slice(0, 5)); // Get top 5
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle marking an activity as complete
  const handleMarkComplete = (activityId) => {
    updateStatus(activityId, 'completed').then(() => {
      // Refresh activities after status update
      const userActivities = getUserActivities();
      setActivities(userActivities);
      calculateMetrics(userActivities);
      filterActiveActivities(userActivities);
      filterUpcomingActivities(userActivities);
    });
  };
  
  // Activity type configuration
  const typeConfig = {
    discussion: { icon: '🌱', color: '#4caf50' },
    event: { icon: '📅', color: '#2196f3' },
    project: { icon: '🎯', color: '#9c27b0' },
    'skill-share': { icon: '🎓', color: '#ff9800' },
    resource: { icon: '📚', color: '#795548' },
    challenge: { icon: '🏆', color: '#f44336' },
    wellness: { icon: '🧘', color: '#009688' }
  };
  
  // Activity card component
  const ActivityCard = ({ activity, isActive = false }) => {
    
    const type = activity.type || activity.category || 'discussion';
    const typeInfo = typeConfig[type] || { icon: '📋', color: '#607d8b' };
    
    const participantCount = getParticipants(activity.id)?.length || 0;
    
    return (
      <Card 
        key={activity.id}
        padding="md"
        marginBottom="sm"
        boxShadow="sm"
        borderTop="4px solid"
        borderTopColor={typeInfo.color}
        onClick={() => onViewActivity(activity.id)}
        cursor="pointer"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
        transition="all 0.2s ease"
      >
        <Flex justifyContent="space-between" alignItems="center" marginBottom="xs">
          <Flex alignItems="center" gap="xs">
            <Text>{typeInfo.icon}</Text>
            <Text fontWeight="bold">{activity.title}</Text>
          </Flex>
          <Badge variant={
            activity.status === 'active' ? 'success' :
            activity.status === 'upcoming' ? 'info' :
            activity.status === 'completed' ? 'secondary' :
            'outline'
          }>
            {activity.status}
          </Badge>
        </Flex>
        
        {activity.description && (
          <Text fontSize="sm" marginBottom="sm" color="text-secondary">
            {activity.description.substring(0, 120)}
            {activity.description.length > 120 ? '...' : ''}
          </Text>
        )}
        
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="sm">
            <Text fontSize="sm">👥 {participantCount}</Text>
            {activity.startDate && (
              <Text fontSize="sm">📅 {formatDate(activity.startDate)}</Text>
            )}
          </Flex>
          
          {isActive && (
            <Button 
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkComplete(activity.id);
              }}
            >
              Mark Complete
            </Button>
          )}
        </Flex>
      </Card>
    );
  };
  
  return (
    <Box className="activity-dashboard">
      {/* Summary Section */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Activity Summary</Text>
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap="md"
          marginBottom="md"
        >
          <Card padding="md" backgroundColor="background-alt">
            <Text variant="h3" textAlign="center" marginBottom="sm">Participation</Text>
            <Flex justifyContent="space-between" marginBottom="md">
              <Box textAlign="center" flex="1">
                <Text fontSize="sm" color="text-secondary">Active</Text>
                <Text variant="h2" color="primary">{metrics.active}</Text>
              </Box>
              <Box textAlign="center" flex="1">
                <Text fontSize="sm" color="text-secondary">Completed</Text>
                <Text variant="h2" color="success">{metrics.completed}</Text>
              </Box>
              <Box textAlign="center" flex="1">
                <Text fontSize="sm" color="text-secondary">Upcoming</Text>
                <Text variant="h2" color="info">{metrics.upcomingCount}</Text>
              </Box>
            </Flex>
            <Divider marginBottom="md" />
            <Flex justifyContent="space-between">
              <Box textAlign="center" flex="1">
                <Text fontSize="sm" color="text-secondary">Created</Text>
                <Text variant="h3">{metrics.created}</Text>
              </Box>
              <Box textAlign="center" flex="1">
                <Text fontSize="sm" color="text-secondary">Joined</Text>
                <Text variant="h3">{metrics.participated}</Text>
              </Box>
            </Flex>
          </Card>
          
          <Card padding="md" backgroundColor="background-alt">
            <Text variant="h3" textAlign="center" marginBottom="sm">Time Invested</Text>
            <Flex direction="column" gap="md">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" color="text-secondary">This Week</Text>
                <Text variant="h3">{timeSpent.week} hrs</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" color="text-secondary">This Month</Text>
                <Text variant="h3">{timeSpent.month} hrs</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" color="text-secondary">This Year</Text>
                <Text variant="h3">{timeSpent.year} hrs</Text>
              </Flex>
            </Flex>
          </Card>
          
          <Card padding="md" backgroundColor="background-alt">
            <Text variant="h3" textAlign="center" marginBottom="sm">Community Activity</Text>
            <Stack spacing="sm">
              {communityBreakdown.slice(0, 4).map(community => (
                <Flex key={community.id} justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm" truncate maxWidth="70%">{community.name}</Text>
                  <Flex alignItems="center" gap="sm">
                    <Text fontSize="sm" fontWeight="bold">{community.count}</Text>
                    <Box 
                      width="50px" 
                      height="8px" 
                      backgroundColor="background"
                      borderRadius="full"
                      position="relative"
                    >
                      <Box 
                        position="absolute"
                        left="0"
                        top="0"
                        height="100%"
                        width={`${community.percentage}%`}
                        backgroundColor="primary"
                        borderRadius="full"
                      />
                    </Box>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Box>
      
      {/* Active Activities */}
      <Box marginBottom="xl">
        <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
          <Text variant="h2">Active Activities</Text>
          <Button 
            variant="primary"
            onClick={onCreateActivity}
          >
            Create Activity
          </Button>
        </Flex>
        
        {activeActivities.length > 0 ? (
          <Stack spacing="md">
            {activeActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} isActive={true} />
            ))}
          </Stack>
        ) : (
          <Box 
            padding="lg" 
            textAlign="center" 
            backgroundColor="background-alt"
            borderRadius="md"
          >
            <Text marginBottom="md">You don't have any active activities.</Text>
            <Button variant="primary" onClick={onCreateActivity}>
              Create New Activity
            </Button>
          </Box>
        )}
      </Box>
      
      {/* Upcoming Activities */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Upcoming Activities</Text>
        
        {upcomingActivities.length > 0 ? (
          <Stack spacing="md">
            {upcomingActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </Stack>
        ) : (
          <Box 
            padding="lg" 
            textAlign="center" 
            backgroundColor="background-alt"
            borderRadius="md"
          >
            <Text>No upcoming activities scheduled.</Text>
          </Box>
        )}
      </Box>
      
      {/* Category Breakdown */}
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Activity Breakdown</Text>
        
        <Grid 
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="md"
        >
          <Card padding="md" backgroundColor="background-alt">
            <Text variant="h3" marginBottom="md">By Category</Text>
            <Stack spacing="sm">
              {categoryBreakdown.map(category => (
                <Flex key={category.category} justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm" textTransform="capitalize">{category.category}</Text>
                  <Flex alignItems="center" gap="sm">
                    <Text fontSize="sm" fontWeight="bold">{category.count}</Text>
                    <Box 
                      width="100px" 
                      height="8px" 
                      backgroundColor="background"
                      borderRadius="full"
                      position="relative"
                    >
                      <Box 
                        position="absolute"
                        left="0"
                        top="0"
                        height="100%"
                        width={`${category.percentage}%`}
                        backgroundColor="primary"
                        borderRadius="full"
                      />
                    </Box>
                    <Text fontSize="sm">{Math.round(category.percentage)}%</Text>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </Card>
          
          <Card padding="md" backgroundColor="background-alt">
            <Text variant="h3" marginBottom="md">Recent Activity</Text>
            <Stack spacing="sm">
              {recentActivities.map(activity => (
                <Flex 
                  key={activity.id} 
                  justifyContent="space-between" 
                  alignItems="center"
                  padding="xs"
                  borderRadius="md"
                  _hover={{ backgroundColor: "background" }}
                  cursor="pointer"
                  onClick={() => onViewActivity(activity.id)}
                >
                  <Flex alignItems="center" gap="sm">
                    <Text>{typeConfig[activity.type]?.icon || '📋'}</Text>
                    <Text fontSize="sm" truncate maxWidth="200px">{activity.title}</Text>
                  </Flex>
                  <Text fontSize="xs" color="text-secondary">
                    {formatDate(activity.updatedAt || activity.createdAt)}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Box>
    </Box>
  );
};

export default ActivityDashboard;
