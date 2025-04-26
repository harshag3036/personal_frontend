/**
 * GlobalActivityBrowser Component
 * 
 * An enhanced version of ActivityBrowser that displays activities across all communities.
 * Includes community-based filtering and grouping, and supports global activities.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Flex, 
  Text, 
  Stack,
  Grid,
  Button,
  Input,
  Badge
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const GlobalActivityBrowser = ({ onActivityClick, onCreateActivity }) => {
  const navigate = useNavigate();
  const { getAllActivities, getUserActivities, getGlobalActivities } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();
  
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [displayedActivities, setDisplayedActivities] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Activity type configuration
  const typeConfig = {
    discussion: { icon: '🌱', color: '#4caf50', label: 'Discussion' },
    event: { icon: '📅', color: '#2196f3', label: 'Event' },
    project: { icon: '🎯', color: '#9c27b0', label: 'Project' },
    'skill-share': { icon: '🎓', color: '#ff9800', label: 'Skill Share' },
    resource: { icon: '📚', color: '#795548', label: 'Resource' },
    challenge: { icon: '🏆', color: '#f44336', label: 'Challenge' }
  };
  
  // Filter states
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    community: '',
    search: '',
    dateRange: 'all',
    sortBy: 'newest',
    participationStatus: 'all' // 'all', 'participating', 'not-participating', 'created'
  });
  
  // View states
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [groupBy, setGroupBy] = useState('none'); // 'none', 'community', 'type', 'status'
  const [showRecommended, setShowRecommended] = useState(false);
  
  // Status and date range options
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' }
  ];
  
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'active', label: 'Most Active' }
  ];
  
  // Load activities
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const activitiesData = getAllActivities();
        
        if (Array.isArray(activitiesData) && activitiesData.length > 0) {
          setActivities(activitiesData);
          setFilteredActivities(activitiesData);
          setDisplayedActivities(activitiesData);
          setError(null);
        } else {
          console.log('No activities found or empty array returned');
          setActivities([]);
          setFilteredActivities([]);
          setDisplayedActivities([]);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities. Please try again later.');
        setActivities([]);
        setFilteredActivities([]);
        setDisplayedActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAllActivities]);
  
  // Get community name from ID
  const getCommunityName = (communityId) => {
    if (!communityId) return 'Global';
    const community = communities.find(c => c.id === communityId);
    return community ? community.name : 'Unknown Community';
  };
  
  // Apply filters and sorting
  useEffect(() => {
    if (!activities.length) return;
    
    let result = [...activities];
    
    // Apply type filter
    if (filters.type) {
      result = result.filter(activity => activity.type === filters.type);
    }
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(activity => activity.status === filters.status);
    }
    
    // Apply community filter
    if (filters.community) {
      if (filters.community === 'global') {
        result = result.filter(activity => 
          !activity.circleId && !activity.communityId
        );
      } else {
        result = result.filter(activity => 
          activity.circleId === filters.community || activity.communityId === filters.community
        );
      }
    }
    
    // Apply participation filter
    if (filters.participationStatus !== 'all' && user) {
      switch (filters.participationStatus) {
        case 'participating':
          result = result.filter(activity => 
            activity.participants?.some(p => p.id === user.id)
          );
          break;
        case 'not-participating':
          result = result.filter(activity => 
            !activity.participants?.some(p => p.id === user.id)
          );
          break;
        case 'created':
          result = result.filter(activity => 
            activity.createdBy?.id === user.id
          );
          break;
        default:
          break;
      }
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(activity =>
        activity.title?.toLowerCase().includes(searchLower) ||
        activity.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      result = result.filter(activity => {
        const activityDate = new Date(activity.createdAt);
        switch (filters.dateRange) {
          case 'today':
            return activityDate >= today;
          case 'week':
            return activityDate >= startOfWeek;
          case 'month':
            return activityDate >= startOfMonth;
          case 'year':
            return activityDate >= startOfYear;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return (a.title || '').localeCompare(b.title || '');
        case 'popular':
          return (b.participants?.length || 0) - (a.participants?.length || 0);
        case 'active':
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        default:
          return 0;
      }
    });
    
    setFilteredActivities(result);
    setDisplayedActivities(result);
  }, [activities, filters, user]);
  
  // Get recommended activities
  const getRecommendedActivities = useCallback(() => {
    if (!user) return [];
    
    // Simple recommendation logic based on user interests and activity
    return filteredActivities.filter(activity => {
      // Recommend based on user's participation in similar types
      const participatingInSimilarType = activities.some(a => 
        a.type === activity.type && 
        a.participants?.some(p => p.id === user.id)
      );
      
      // Recommend based on community membership
      const userIsMember = activity.circleId && communities.some(c => 
        c.id === activity.circleId && c.members?.some(m => m.id === user.id)
      );
      
      // Don't recommend activities the user is already part of
      const alreadyParticipating = activity.participants?.some(p => p.id === user.id);
      
      return (participatingInSimilarType || userIsMember) && !alreadyParticipating;
    });
  }, [filteredActivities, activities, user, communities]);
  
  // Toggle recommendations
  useEffect(() => {
    if (showRecommended) {
      setDisplayedActivities(getRecommendedActivities());
    } else {
      setDisplayedActivities(filteredActivities);
    }
  }, [showRecommended, filteredActivities, getRecommendedActivities]);
  
  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  // Handle activity click
  const handleActivityClick = (activityId) => {
    if (onActivityClick) {
      onActivityClick(activityId);
    } else {
      const activity = activities.find(a => a.id === activityId);
      if (activity.circleId || activity.communityId) {
        navigate(`/community/${activity.circleId || activity.communityId}/activity/${activityId}`);
      } else {
        navigate(`/activities/${activityId}`);
      }
    }
  };
  
  // Group activities based on selected grouping
  const getGroupedActivities = () => {
    return displayedActivities.reduce((groups, activity) => {
      let groupKey;
      
      switch (groupBy) {
        case 'type':
          groupKey = activity.type ? typeConfig[activity.type]?.label || activity.type : 'Other';
          break;
        case 'status':
          groupKey = activity.status ? 
            activity.status.charAt(0).toUpperCase() + activity.status.slice(1) : 
            'Unknown Status';
          break;
        case 'community':
          if (activity.circleId || activity.communityId) {
            groupKey = getCommunityName(activity.circleId || activity.communityId);
          } else {
            groupKey = 'Global Activities';
          }
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
  
  // Render activity card
  const renderActivityCard = (activity) => {
    const typeInfo = activity.type && typeConfig[activity.type] ? 
      typeConfig[activity.type] : 
      { icon: '📋', color: '#607d8b', label: 'Activity' };
      
    return (
      <Box 
        key={activity.id}
        padding="md"
        borderRadius="md"
        backgroundColor="background-paper"
        borderTop="4px solid"
        borderTopColor={typeInfo.color}
        boxShadow="sm"
        cursor="pointer"
        onClick={() => handleActivityClick(activity.id)}
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'md'
        }}
        transition="all 0.2s ease"
      >
        <Flex justifyContent="space-between" alignItems="center" marginBottom="sm">
          <Flex 
            alignItems="center" 
            justifyContent="center"
            width="28px"
            height="28px"
            borderRadius="full"
            backgroundColor={typeInfo.color}
            color="white"
          >
            {typeInfo.icon}
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
        
        <Text variant="h3" marginBottom="xs">{activity.title}</Text>
        
        <Text variant="body2" color="text-secondary" marginBottom="md">
          {activity.description?.substring(0, 100)}
          {activity.description?.length > 100 ? '...' : ''}
        </Text>
        
        {/* Community badge for non-global activities */}
        {(activity.circleId || activity.communityId) && (
          <Badge variant="outline" marginBottom="sm">
            {getCommunityName(activity.circleId || activity.communityId)}
          </Badge>
        )}
        
        {/* Global badge for global activities */}
        {!activity.circleId && !activity.communityId && (
          <Badge variant="primary" marginBottom="sm">
            Global
          </Badge>
        )}
        
        <Flex 
          justifyContent="space-between" 
          alignItems="center"
          paddingTop="sm"
          borderTop="1px solid"
          borderColor="border-light"
          marginTop="auto"
        >
          <Text variant="caption">
            {new Date(activity.createdAt).toLocaleDateString()}
          </Text>
          
          <Flex alignItems="center" gap="xs">
            <Text>👥</Text>
            <Text>{activity.participants?.length || 0}</Text>
          </Flex>
        </Flex>
      </Box>
    );
  };
  
  // Render activity filters
  const renderFilters = () => {
    return (
      <Box marginBottom="lg">
        <Flex 
          direction={{ base: "column", md: "row" }}
          gap="md"
          marginBottom="md"
        >
          <Input
            placeholder="Search activities..." 
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            flex="2"
          />
          
          <Box flex="1">
            <Text marginBottom="xs">Community Filter</Text>
            <Flex gap="xs" flexWrap="wrap">
              <Button
                variant={filters.community === '' ? "primary" : "outline"}
                onClick={() => handleFilterChange('community', '')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filters.community === 'global' ? "primary" : "outline"}
                onClick={() => handleFilterChange('community', 'global')}
                size="sm"
              >
                Global Only
              </Button>
              {communities.map(community => (
                <Button
                  key={community.id}
                  variant={filters.community === community.id ? "primary" : "outline"}
                  onClick={() => handleFilterChange('community', community.id)}
                  size="sm"
                >
                  {community.name}
                </Button>
              ))}
            </Flex>
          </Box>
        </Flex>
        
        <Flex 
          direction={{ base: "column", md: "row" }}
          gap="md"
          marginBottom="md"
        >
          <Box flex="1">
            <Text marginBottom="xs">Activity Type</Text>
            <Flex gap="xs" flexWrap="wrap">
              <Button
                variant={filters.type === '' ? "primary" : "outline"}
                onClick={() => handleFilterChange('type', '')}
                size="sm"
              >
                All Types
              </Button>
              {Object.entries(typeConfig).map(([value, config]) => (
                <Button
                  key={value}
                  variant={filters.type === value ? "primary" : "outline"}
                  onClick={() => handleFilterChange('type', value)}
                  size="sm"
                >
                  {config.icon} {config.label}
                </Button>
              ))}
            </Flex>
          </Box>
          
          <Box flex="1">
            <Text marginBottom="xs">Status</Text>
            <Flex gap="xs" flexWrap="wrap">
              {statusOptions.map(option => (
                <Button
                  key={option.value}
                  variant={filters.status === option.value ? "primary" : "outline"}
                  onClick={() => handleFilterChange('status', option.value)}
                  size="sm"
                >
                  {option.label}
                </Button>
              ))}
            </Flex>
          </Box>
          
          <Box flex="1">
            <Text marginBottom="xs">Date Range</Text>
            <Flex gap="xs" flexWrap="wrap">
              {dateRangeOptions.map(option => (
                <Button
                  key={option.value}
                  variant={filters.dateRange === option.value ? "primary" : "outline"}
                  onClick={() => handleFilterChange('dateRange', option.value)}
                  size="sm"
                >
                  {option.label}
                </Button>
              ))}
            </Flex>
          </Box>
        </Flex>
        
        <Flex 
          justifyContent="space-between" 
          alignItems="center"
          marginBottom="md"
        >
          <Flex gap="md" flexWrap="wrap">
            <Box>
              <Text marginBottom="xs">Group by:</Text>
              <Flex gap="xs" flexWrap="wrap">
                <Button
                  variant={groupBy === 'none' ? "primary" : "outline"}
                  onClick={() => setGroupBy('none')}
                  size="sm"
                >
                  None
                </Button>
                <Button
                  variant={groupBy === 'community' ? "primary" : "outline"}
                  onClick={() => setGroupBy('community')}
                  size="sm"
                >
                  Community
                </Button>
                <Button
                  variant={groupBy === 'type' ? "primary" : "outline"}
                  onClick={() => setGroupBy('type')}
                  size="sm"
                >
                  Type
                </Button>
                <Button
                  variant={groupBy === 'status' ? "primary" : "outline"}
                  onClick={() => setGroupBy('status')}
                  size="sm"
                >
                  Status
                </Button>
              </Flex>
            </Box>
            
            <Box>
              <Text marginBottom="xs">Sort by:</Text>
              <Flex gap="xs" flexWrap="wrap">
                {sortOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={filters.sortBy === option.value ? "primary" : "outline"}
                    onClick={() => handleFilterChange('sortBy', option.value)}
                    size="sm"
                  >
                    {option.label}
                  </Button>
                ))}
              </Flex>
            </Box>
          </Flex>
          
          <Flex gap="md">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </Button>
            
            <Button
              variant={showRecommended ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowRecommended(!showRecommended)}
            >
              {showRecommended ? 'Showing Recommended' : 'Show Recommended'}
            </Button>
          </Flex>
        </Flex>
        
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="body2">
            Showing {displayedActivities.length} of {activities.length} activities
          </Text>
          
          {(filters.type || filters.status || filters.community || filters.search || filters.dateRange !== 'all') && (
            <Button
              variant="text"
              size="sm"
              onClick={() => {
                setFilters({
                  type: '',
                  status: '',
                  community: '',
                  search: '',
                  dateRange: 'all',
                  sortBy: 'newest',
                  participationStatus: 'all'
                });
                setShowRecommended(false);
              }}
            >
              Clear All Filters
            </Button>
          )}
        </Flex>
      </Box>
    );
  };
  
  // Render the activities grid/list
  const renderActivities = () => {
    if (loading) {
      return (
        <Box textAlign="center" padding="xl">
          <Text>Loading activities...</Text>
        </Box>
      );
    }
    
    if (error) {
      return (
        <Box textAlign="center" padding="xl">
          <Text color="error">Error: {error}</Text>
          <Button 
            variant="primary" 
            marginTop="md"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Box>
      );
    }
    
    if (displayedActivities.length === 0) {
      return (
        <Box 
          textAlign="center" 
          padding="xl"
          backgroundColor="background-alt"
          borderRadius="md"
        >
          <Text variant="h3" marginBottom="md">No activities found</Text>
          <Text variant="body1" marginBottom="lg">
            {filters.search || filters.type || filters.status || filters.community || filters.dateRange !== 'all' ? 
              'Try adjusting your filters or clearing them to see more activities.' :
              'There are no activities available at the moment.'
            }
          </Text>
          <Button 
            variant="primary"
            onClick={onCreateActivity}
          >
            Create New Activity
          </Button>
        </Box>
      );
    }
    
    if (groupBy !== 'none') {
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
              
              <Grid 
                templateColumns={viewMode === 'grid' ? 
                  { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" } : 
                  "1fr"
                }
                gap="md"
              >
                {activities.map(activity => renderActivityCard(activity))}
              </Grid>
            </Box>
          ))}
        </Stack>
      );
    }
    
    return (
      <Grid 
        templateColumns={viewMode === 'grid' ? 
          { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" } : 
          "1fr"
        }
        gap="md"
      >
        {displayedActivities.map(activity => renderActivityCard(activity))}
      </Grid>
    );
  };
  
  return (
    <Box className="global-activity-browser">
      <Flex 
        justifyContent="space-between" 
        alignItems="center"
        marginBottom="lg"
      >
        <Box>
          <Text variant="h2" marginBottom="xs">
            {showRecommended ? 'Recommended Activities' : 'Browse Activities'}
          </Text>
          <Text variant="body1" color="text-secondary">
            {showRecommended ? 
              'Activities you might be interested in based on your participation' :
              'Explore activities across all communities'
            }
          </Text>
        </Box>
        
        <Button 
          variant="primary"
          onClick={onCreateActivity}
        >
          Create Activity
        </Button>
      </Flex>
      
      {renderFilters()}
      {renderActivities()}
    </Box>
  );
};

export default GlobalActivityBrowser;
