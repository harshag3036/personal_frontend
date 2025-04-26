/**
 * ActivityCalendar Component
 * 
 * Provides calendar and timeline visualizations of activities with
 * date-based filtering and navigation capabilities.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Text,
  Grid,
  Card,
  Button,
  Badge,
  Stack,
  Divider
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const ActivityCalendar = ({ onViewActivity, onCreateActivity }) => {
  const {
    getAllActivities,
    getUserActivities,
  } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();

  // State
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'timeline'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState({
    status: 'all', // 'all', 'active', 'upcoming', 'completed'
    community: 'all', // 'all', 'global', or specific communityId
    type: 'all', // 'all' or specific activity type
    participation: 'all', // 'all', 'participating', 'created'
  });

  // Load activities
  useEffect(() => {
    const fetchActivities = () => {
      const userActivities = getUserActivities();
      setActivities(userActivities);
    };

    fetchActivities();
  }, [getUserActivities, user]);

  // Filter activities based on current filter settings
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Filter by status
      if (filter.status !== 'all' && activity.status !== filter.status) {
        return false;
      }

      // Filter by community
      if (filter.community !== 'all') {
        if (filter.community === 'global') {
          // Show only global activities
          if (activity.communityId || activity.circleId) {
            return false;
          }
        } else if (
          activity.communityId !== filter.community && 
          activity.circleId !== filter.community
        ) {
          return false;
        }
      }

      // Filter by type
      if (filter.type !== 'all' && 
          activity.type !== filter.type && 
          activity.category !== filter.type) {
        return false;
      }

      // Filter by participation
      if (filter.participation === 'created' && 
          activity.createdBy?.id !== user?.id) {
        return false;
      } else if (filter.participation === 'participating' && 
                !activity.participants?.some(p => p.id === user?.id)) {
        return false;
      }

      return true;
    });
  }, [activities, filter, user]);

  // Helper functions for date manipulation
  const getMonthDays = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Get the first day of the month
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for starting Monday
    
    const monday = new Date(date);
    monday.setDate(diff);
    
    const days = [new Date(monday)];
    
    for (let i = 1; i < 7; i++) {
      const next = new Date(monday);
      next.setDate(monday.getDate() + i);
      days.push(next);
    }
    
    return days;
  };

  // Format date for display
  const formatDate = (date, format = 'short') => {
    if (!date) return '';
    
    if (format === 'short') {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } else if (format === 'time') {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (format === 'datetime') {
      return `${date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    } else if (format === 'month') {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
    } else if (format === 'weekday') {
      return date.toLocaleDateString('en-US', {
        weekday: 'short'
      });
    }
    
    return date.toLocaleDateString();
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Get activities for a specific date
  const getActivitiesForDate = (date) => {
    return filteredActivities.filter(activity => {
      // For activities with a specific date/time
      if (activity.startDate) {
        const activityDate = new Date(activity.startDate);
        return activityDate.getDate() === date.getDate() &&
          activityDate.getMonth() === date.getMonth() &&
          activityDate.getFullYear() === date.getFullYear();
      }
      
      // For activities spanning multiple days or without specific dates
      if (activity.startDate && activity.endDate) {
        const startDate = new Date(activity.startDate);
        const endDate = new Date(activity.endDate);
        return date >= startDate && date <= endDate;
      }
      
      // For activities with only an end date (deadline)
      if (activity.endDate) {
        const endDate = new Date(activity.endDate);
        return endDate.getDate() === date.getDate() &&
          endDate.getMonth() === date.getMonth() &&
          endDate.getFullYear() === date.getFullYear();
      }
      
      return false;
    });
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToPreviousWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Render activity item for calendar
  const renderActivityItem = (activity) => {
    // Activity type configuration for visual styling
    const typeConfig = {
      discussion: { icon: '🌱', color: '#4caf50' },
      event: { icon: '📅', color: '#2196f3' },
      project: { icon: '🎯', color: '#9c27b0' },
      'skill-share': { icon: '🎓', color: '#ff9800' },
      resource: { icon: '📚', color: '#795548' },
      challenge: { icon: '🏆', color: '#f44336' },
      wellness: { icon: '🧘', color: '#009688' }
    };
    
    const type = activity.type || activity.category || 'discussion';
    const typeInfo = typeConfig[type] || { icon: '📋', color: '#607d8b' };
    
    // Community info if available
    const communityId = activity.communityId || activity.circleId;
    const community = communityId ? 
      communities.find(c => c.id === communityId) : null;
    
    return (
      <Box 
        key={activity.id}
        borderLeft={`3px solid ${typeInfo.color}`}
        paddingLeft="xs"
        paddingY="xxs"
        marginBottom="xxs"
        backgroundColor="background-alt"
        borderRadius="sm"
        cursor="pointer"
        _hover={{ backgroundColor: 'background-hover' }}
        onClick={() => onViewActivity(activity.id)}
      >
        <Flex alignItems="center" gap="xxs">
          <Text fontSize="xs">{typeInfo.icon}</Text>
          <Text fontSize="xs" fontWeight="bold" truncate>
            {activity.title}
          </Text>
        </Flex>
        
        {activity.startDate && viewMode === 'week' && (
          <Text fontSize="xs" color="text-secondary">
            {formatDate(new Date(activity.startDate), 'time')}
          </Text>
        )}
        
        {community && viewMode === 'month' && (
          <Text fontSize="xxs" color="text-secondary" truncate>
            {community.name}
          </Text>
        )}
      </Box>
    );
  };

  // Render day cell for month view
  const renderDayCell = (date) => {
    const dayActivities = getActivitiesForDate(date);
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    const isDateToday = isToday(date);
    
    return (
      <Box 
        key={date.toISOString()}
        borderWidth="1px"
        borderColor="border"
        height="120px"
        backgroundColor={isCurrentMonth ? 'background' : 'background-alt'}
        overflow="hidden"
        position="relative"
        padding="xxs"
      >
        <Box 
          backgroundColor={isDateToday ? 'primary' : 'transparent'}
          borderRadius="full"
          width="24px"
          height="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text 
            fontSize="sm" 
            fontWeight={isDateToday ? 'bold' : 'normal'}
            color={isDateToday ? 'white' : isCurrentMonth ? 'text-primary' : 'text-secondary'}
          >
            {date.getDate()}
          </Text>
        </Box>
        
        <Box marginTop="xxs" maxHeight="90px" overflowY="auto">
          {dayActivities.map(activity => renderActivityItem(activity))}
          
          {dayActivities.length === 0 && isCurrentMonth && (
            <Box 
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              opacity="0.5"
              padding="xs"
            >
              <Button 
                size="xs" 
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateActivity();
                }}
              >
                +
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  // Render hour cell for week view
  const renderHourCell = (date, hour) => {
    const startHour = new Date(date);
    startHour.setHours(hour, 0, 0, 0);
    
    const endHour = new Date(date);
    endHour.setHours(hour + 1, 0, 0, 0);
    
    // Find activities that occur during this hour
    const hourActivities = filteredActivities.filter(activity => {
      if (!activity.startDate) return false;
      
      const activityStart = new Date(activity.startDate);
      
      // Check if same day
      if (activityStart.getDate() !== date.getDate() ||
          activityStart.getMonth() !== date.getMonth() ||
          activityStart.getFullYear() !== date.getFullYear()) {
        return false;
      }
      
      // Check if starts during this hour
      const activityHour = activityStart.getHours();
      return activityHour === hour;
    });
    
    return (
      <Box 
        key={`${date.toISOString()}-${hour}`}
        borderWidth="1px"
        borderColor="border"
        height="60px"
        backgroundColor="background"
        padding="xxs"
        position="relative"
      >
        {hourActivities.map(activity => renderActivityItem(activity))}
      </Box>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Get all days in the current month
    const days = getMonthDays(year, month);
    
    // Get the day of the week for the first day of the month
    const firstDayOfMonth = days[0].getDay();
    
    // Add empty cells for days before the first of the month
    const daysBefore = [];
    if (firstDayOfMonth > 0) {
      const lastMonthDate = new Date(year, month, 0);
      const daysInLastMonth = lastMonthDate.getDate();
      
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, daysInLastMonth - i);
        daysBefore.push(date);
      }
    }
    
    // Add empty cells for days after the last of the month
    const daysAfter = [];
    const lastDayOfMonth = days[days.length - 1].getDay();
    
    if (lastDayOfMonth < 6) {
      for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
        const date = new Date(year, month + 1, i);
        daysAfter.push(date);
      }
    }
    
    // Combine all days
    const allDays = [...daysBefore, ...days, ...daysAfter];
    
    return (
      <Box>
        <Grid 
          templateColumns="repeat(7, 1fr)" 
          width="100%"
        >
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <Box 
              key={day} 
              padding="xs"
              textAlign="center"
              backgroundColor="background-alt"
              borderBottom="1px solid"
              borderBottomColor="border"
            >
              <Text fontWeight="bold" fontSize="sm">{day}</Text>
            </Box>
          ))}
          
          {allDays.map(date => renderDayCell(date))}
        </Grid>
      </Box>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <Box>
        <Grid templateColumns="80px repeat(7, 1fr)" width="100%">
          {/* Header row with days */}
          <Box></Box>
          {weekDays.map(day => (
            <Box 
              key={day.toISOString()} 
              padding="sm"
              textAlign="center"
              backgroundColor="background-alt"
              borderBottom="1px solid"
              borderBottomColor="border"
            >
              <Text 
                fontWeight={isToday(day) ? 'bold' : 'normal'} 
                fontSize="xs"
                color={isToday(day) ? 'primary' : 'text-primary'}
              >
                {formatDate(day, 'weekday')}
              </Text>
              <Text 
                fontWeight="bold" 
                fontSize="sm"
                backgroundColor={isToday(day) ? 'primary' : 'transparent'}
                color={isToday(day) ? 'white' : 'text-primary'}
                borderRadius="full"
                width="24px"
                height="24px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                marginTop="xxs"
              >
                {day.getDate()}
              </Text>
            </Box>
          ))}
          
          {/* Hour rows */}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              {/* Hour label */}
              <Box 
                padding="xs"
                textAlign="right"
                backgroundColor="background-alt"
                borderRight="1px solid"
                borderRightColor="border"
                borderBottom="1px solid"
                borderBottomColor="border"
              >
                <Text fontSize="xs" color="text-secondary">
                  {hour}:00
                </Text>
              </Box>
              
              {/* Day cells for this hour */}
              {weekDays.map(day => renderHourCell(day, hour))}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    );
  };

  // Render timeline view
  const renderTimelineView = () => {
    // Sort activities by start date
    const sortedActivities = [...filteredActivities].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate) : new Date(9999, 11, 31);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(9999, 11, 31);
      return dateA - dateB;
    });
    
    // Group activities by month
    const groupedActivities = {};
    
    sortedActivities.forEach(activity => {
      if (!activity.startDate) return;
      
      const date = new Date(activity.startDate);
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!groupedActivities[monthYear]) {
        groupedActivities[monthYear] = {
          label: formatDate(date, 'month'),
          activities: []
        };
      }
      
      groupedActivities[monthYear].activities.push(activity);
    });
    
    return (
      <Box>
        {Object.values(groupedActivities).map((group, index) => (
          <Box key={index} marginBottom="lg">
            <Text variant="h3" marginBottom="md">{group.label}</Text>
            
            <Stack spacing="sm">
              {group.activities.map(activity => (
                <Card 
                  key={activity.id}
                  padding="md"
                  boxShadow="sm"
                  cursor="pointer"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  onClick={() => onViewActivity(activity.id)}
                >
                  <Flex justifyContent="space-between" alignItems="center" marginBottom="xs">
                    <Box>
                      <Text variant="h4">{activity.title}</Text>
                      
                      {activity.startDate && (
                        <Text fontSize="sm" color="text-secondary">
                          {formatDate(new Date(activity.startDate), 'datetime')}
                        </Text>
                      )}
                    </Box>
                    
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
                    <Text fontSize="sm" marginBottom="sm">
                      {activity.description.substring(0, 150)}
                      {activity.description.length > 150 ? '...' : ''}
                    </Text>
                  )}
                  
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap="md">
                      <Text fontSize="xs">
                        👥 {activity.participants?.length || 0} participants
                      </Text>
                      
                      {activity.communityId && (
                        <Text fontSize="xs">
                          {communities.find(c => c.id === activity.communityId)?.name || 'Unknown Community'}
                        </Text>
                      )}
                    </Flex>
                    
                    {activity.endDate && (
                      <Text fontSize="xs" color={
                        new Date(activity.endDate) < new Date() ? 'error' : 'text-secondary'
                      }>
                        {new Date(activity.endDate) < new Date() ? 
                          'Ended on ' : 'Ends on '} 
                        {formatDate(new Date(activity.endDate))}
                      </Text>
                    )}
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Box>
        ))}
        
        {Object.keys(groupedActivities).length === 0 && (
          <Box 
            padding="xl" 
            textAlign="center" 
            backgroundColor="background-alt"
            borderRadius="md"
          >
            <Text marginBottom="md">No activities found for the selected filters</Text>
            <Button variant="primary" onClick={onCreateActivity}>
              Create New Activity
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  // Render filter section
  const renderFilters = () => {
    // Get unique communities and types for filter options
    const uniqueCommunities = [...new Set(
      activities
        .filter(a => a.communityId || a.circleId)
        .map(a => a.communityId || a.circleId)
    )];
    
    const uniqueTypes = [...new Set(
      activities
        .filter(a => a.type || a.category)
        .map(a => a.type || a.category)
    )];
    
    return (
      <Box marginBottom="lg">
        <Flex justifyContent="space-between" alignItems="center" marginBottom="sm">
          <Text variant="h3">Filters</Text>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setFilter({
              status: 'all',
              community: 'all',
              type: 'all',
              participation: 'all'
            })}
          >
            Reset Filters
          </Button>
        </Flex>
        
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
          gap="md"
        >
          {/* Status filter */}
          <Box>
            <Text fontSize="sm" fontWeight="bold" marginBottom="xs">Status</Text>
            <Flex gap="xs" flexWrap="wrap">
              {['all', 'active', 'upcoming', 'completed'].map(status => (
                <Button 
                  key={status}
                  size="xs"
                  variant={filter.status === status ? 'primary' : 'outline'}
                  onClick={() => setFilter(prev => ({ ...prev, status }))}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </Flex>
          </Box>
          
          {/* Community filter */}
          <Box>
            <Text fontSize="sm" fontWeight="bold" marginBottom="xs">Community</Text>
            <Flex gap="xs" flexWrap="wrap">
              <Button 
                size="xs"
                variant={filter.community === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter(prev => ({ ...prev, community: 'all' }))}
              >
                All
              </Button>
              
              <Button 
                size="xs"
                variant={filter.community === 'global' ? 'primary' : 'outline'}
                onClick={() => setFilter(prev => ({ ...prev, community: 'global' }))}
              >
                Global
              </Button>
              
              {uniqueCommunities.slice(0, 3).map(communityId => {
                const community = communities.find(c => c.id === communityId);
                return (
                  <Button 
                    key={communityId}
                    size="xs"
                    variant={filter.community === communityId ? 'primary' : 'outline'}
                    onClick={() => setFilter(prev => ({ ...prev, community: communityId }))}
                  >
                    {community?.name || 'Unknown'}
                  </Button>
                );
              })}
            </Flex>
          </Box>
          
          {/* Type filter */}
          <Box>
            <Text fontSize="sm" fontWeight="bold" marginBottom="xs">Type</Text>
            <Flex gap="xs" flexWrap="wrap">
              <Button 
                size="xs"
                variant={filter.type === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter(prev => ({ ...prev, type: 'all' }))}
              >
                All
              </Button>
              
              {uniqueTypes.slice(0, 4).map(type => (
                <Button 
                  key={type}
                  size="xs"
                  variant={filter.type === type ? 'primary' : 'outline'}
                  onClick={() => setFilter(prev => ({ ...prev, type }))}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </Flex>
          </Box>
          
          {/* Participation filter */}
          <Box>
            <Text fontSize="sm" fontWeight="bold" marginBottom="xs">Participation</Text>
            <Flex gap="xs">
              <Button 
                size="xs"
                variant={filter.participation === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter(prev => ({ ...prev, participation: 'all' }))}
              >
                All
              </Button>
              
              <Button 
                size="xs"
                variant={filter.participation === 'participating' ? 'primary' : 'outline'}
                onClick={() => setFilter(prev => ({ ...prev, participation: 'participating' }))}
              >
                Participating
              </Button>
              
              <Button 
                size="xs"
                variant={filter.participation === 'created' ? 'primary' : 'outline'}
                onClick={() => setFilter(prev => ({ ...prev, participation: 'created' }))}
              >
                Created
              </Button>
            </Flex>
          </Box>
        </Grid>
      </Box>
    );
  };

  return (
    <Box className="activity-calendar" maxWidth="1200px" margin="0 auto">
      <Box marginBottom="xl">
        <Text variant="h1" marginBottom="md">Activity Calendar</Text>
        <Text variant="body1">
          View and manage your activities in a calendar format.
        </Text>
      </Box>
      
      {/* View mode selector and navigation */}
      <Flex justifyContent="space-between" alignItems="center" marginBottom="lg">
        <Flex gap="md">
          <Button
            variant={viewMode === 'month' ? 'primary' : 'outline'}
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'primary' : 'outline'}
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'primary' : 'outline'}
            onClick={() => setViewMode('timeline')}
          >
            Timeline
          </Button>
        </Flex>
        
        <Flex gap="sm" alignItems="center">
          {viewMode === 'month' && (
            <>
              <Button variant="outline" onClick={goToPreviousMonth}>
                &lt;
              </Button>
              <Text variant="h3">
                {formatDate(currentDate, 'month')}
              </Text>
              <Button variant="outline" onClick={goToNextMonth}>
                &gt;
              </Button>
            </>
          )}
          
          {viewMode === 'week' && (
            <>
              <Button variant="outline" onClick={goToPreviousWeek}>
                &lt;
              </Button>
              <Text variant="h3">
                Week of {formatDate(getWeekDays(currentDate)[0])}
              </Text>
              <Button variant="outline" onClick={goToNextWeek}>
                &gt;
              </Button>
            </>
          )}
          
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
        </Flex>
        
        <Button variant="primary" onClick={onCreateActivity}>
          New Activity
        </Button>
      </Flex>
      
      {/* Render filters */}
      {renderFilters()}
      
      {/* Divider */}
      <Divider marginBottom="lg" />
      
      {/* Calendar view content */}
      <Box>
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'timeline' && renderTimelineView()}
      </Box>
    </Box>
  );
};

export default ActivityCalendar;
