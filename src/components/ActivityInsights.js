/**
 * ActivityInsights Component
 * 
 * Provides detailed analytics and visualizations for activity engagement,
 * time investment, and community participation breakdown.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Stack,
  Grid,
  Card,
  Divider,
  Button
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const ActivityInsights = () => {
  const { 
    getAllActivities, 
    getUserActivities,
    getGlobalActivities,
    getComments,
    getFiles,
    getParticipants
  } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();
  
  const [activities, setActivities] = useState([]);
  const [engagementData, setEngagementData] = useState({
    // Weekly engagement
    weeklyActivity: Array(7).fill(0),
    
    // Monthly engagement
    monthlyActivity: Array(30).fill(0),
    
    // Activity type breakdown
    typeBreakdown: {},
    
    // Community participation
    communityParticipation: {},
    
    // Time metrics
    averageSessionTime: 0,
    totalTimeInvested: 0,
    
    // Engagement metrics
    commentCount: 0,
    fileCount: 0,
    completionRate: 0,
    
    // Community comparison
    communityComparison: []
  });
  
  const [timeFilter, setTimeFilter] = useState('month'); // 'week', 'month', 'year'
  const [insightType, setInsightType] = useState('engagement'); // 'engagement', 'time', 'community'
  
  // Load activities and calculate metrics
  useEffect(() => {
    const fetchData = () => {
      // Get user activities
      const userActivities = getUserActivities();
      setActivities(userActivities);
      
      // Calculate engagement metrics
      calculateEngagementMetrics(userActivities);
    };
    
    fetchData();
    
    // Refresh data every minute
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [getUserActivities, user]);
  
  // Calculate engagement metrics
  const calculateEngagementMetrics = (activities) => {
    const now = new Date();
    const data = {
      weeklyActivity: Array(7).fill(0),
      monthlyActivity: Array(30).fill(0),
      typeBreakdown: {},
      communityParticipation: {},
      averageSessionTime: 0,
      totalTimeInvested: 0,
      commentCount: 0,
      fileCount: 0,
      completionRate: 0,
      communityComparison: []
    };
    
    // Calculate daily engagement for the past week
    activities.forEach(activity => {
      // Get timestamp for last activity
      const lastActivity = new Date(activity.updatedAt || activity.createdAt);
      const dayDiff = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
      
      // Update weekly activity (last 7 days)
      if (dayDiff >= 0 && dayDiff < 7) {
        data.weeklyActivity[dayDiff]++;
      }
      
      // Update monthly activity (last 30 days)
      if (dayDiff >= 0 && dayDiff < 30) {
        data.monthlyActivity[dayDiff]++;
      }
      
      // Update type breakdown
      const type = activity.type || activity.category || 'uncategorized';
      data.typeBreakdown[type] = (data.typeBreakdown[type] || 0) + 1;
      
      // Update community participation
      const communityId = activity.communityId || activity.circleId;
      if (communityId) {
        data.communityParticipation[communityId] = (data.communityParticipation[communityId] || 0) + 1;
      } else {
        // Global activities
        data.communityParticipation['global'] = (data.communityParticipation['global'] || 0) + 1;
      }
      
      // Track comments and files
      try {
        const comments = getComments(activity.id);
        data.commentCount += comments.length;
        
        const files = getFiles(activity.id);
        data.fileCount += files.length;
      } catch (error) {
        console.error('Error fetching activity details:', error);
      }
    });
    
    // Calculate completion rate
    const completedActivities = activities.filter(a => a.status === 'completed').length;
    data.completionRate = activities.length > 0 ? 
      (completedActivities / activities.length) * 100 : 0;
    
    // Calculate mock time invested (this would be replaced with actual tracking)
    data.totalTimeInvested = activities.length * 3.5; // Mock: 3.5 hours per activity
    data.averageSessionTime = activities.length > 0 ? 
      data.totalTimeInvested / (activities.length * 5) : 0; // Mock: assume 5 sessions per activity
    
    // Calculate community comparison
    // In a real implementation, this would compare the user's participation
    // to community averages from a backend API
    
    // For now, we'll generate mock comparison data
    const communityIds = Object.keys(data.communityParticipation);
    data.communityComparison = communityIds.map(id => {
      const community = communities.find(c => c.id === id) || { name: id === 'global' ? 'Global' : 'Unknown' };
      return {
        id,
        name: community.name,
        userParticipation: data.communityParticipation[id],
        communityAverage: data.communityParticipation[id] * (0.5 + Math.random() * 0.5), // Random comparison
        percentile: Math.min(95, Math.round(Math.random() * 100)) // Random percentile
      };
    });
    
    setEngagementData(data);
  };
  
  // Format chart data for weekly activity
  const formatWeeklyChartData = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    
    // Reorder days to show the last 7 days in the correct order (most recent last)
    const orderedDays = [];
    const orderedData = [];
    
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (currentDay - i + 7) % 7;
      orderedDays.push(daysOfWeek[dayIndex]);
      orderedData.push(engagementData.weeklyActivity[i]);
    }
    
    return {
      labels: orderedDays,
      data: orderedData,
      maxValue: Math.max(...orderedData) + 1
    };
  };
  
  // Format chart data for monthly activity
  const formatMonthlyChartData = () => {
    // Group data by weeks for the last 4 weeks
    const weeklyData = [0, 0, 0, 0];
    
    for (let i = 0; i < 28; i++) {
      const weekIndex = Math.floor(i / 7);
      weeklyData[weekIndex] += engagementData.monthlyActivity[i];
    }
    
    return {
      labels: ['Week 4', 'Week 3', 'Week 2', 'Last Week'],
      data: weeklyData,
      maxValue: Math.max(...weeklyData) + 1
    };
  };
  
  // Format community breakdown data
  const formatCommunityData = () => {
    return Object.entries(engagementData.communityParticipation).map(([id, count]) => {
      const community = communities.find(c => c.id === id);
      const name = id === 'global' ? 'Global Activities' : 
        (community ? community.name : 'Unknown Community');
      
      return {
        id,
        name,
        count,
        percentage: (count / activities.length) * 100
      };
    }).sort((a, b) => b.count - a.count);
  };
  
  // Format activity type breakdown data
  const formatTypeData = () => {
    return Object.entries(engagementData.typeBreakdown).map(([type, count]) => {
      return {
        type,
        count,
        percentage: (count / activities.length) * 100
      };
    }).sort((a, b) => b.count - a.count);
  };
  
  // Simple bar chart renderer
  const renderBarChart = (chartData) => {
    const { labels, data, maxValue } = chartData;
    
    return (
      <Box height="250px" position="relative" paddingTop="20px">
        <Flex height="200px" alignItems="flex-end" position="relative">
          {/* Y-axis labels */}
          <Box 
            position="absolute" 
            left="-25px" 
            top="0" 
            bottom="0" 
            width="20px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text fontSize="xs" textAlign="right">{maxValue}</Text>
            <Text fontSize="xs" textAlign="right">{Math.round(maxValue / 2)}</Text>
            <Text fontSize="xs" textAlign="right">0</Text>
          </Box>
          
          {/* Horizontal grid lines */}
          <Box 
            position="absolute" 
            left="0" 
            right="0" 
            top="0" 
            bottom="0" 
            zIndex="0"
          >
            <Box 
              position="absolute"
              left="0"
              right="0"
              top="0"
              height="1px"
              backgroundColor="background-alt"
            />
            <Box 
              position="absolute"
              left="0"
              right="0"
              top="50%"
              height="1px"
              backgroundColor="background-alt"
            />
            <Box 
              position="absolute"
              left="0"
              right="0"
              bottom="0"
              height="1px"
              backgroundColor="background-alt"
            />
          </Box>
          
          {/* Bars */}
          {data.map((value, index) => {
            const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
            
            return (
              <Box 
                key={index}
                height={`${height}%`}
                width="24px"
                backgroundColor="primary"
                marginRight="8px"
                borderRadius="4px 4px 0 0"
                position="relative"
              >
                {value > 0 && (
                  <Text 
                    fontSize="xs" 
                    position="absolute" 
                    top="-20px"
                    width="100%"
                    textAlign="center"
                  >
                    {value}
                  </Text>
                )}
              </Box>
            );
          })}
        </Flex>
        
        {/* X-axis labels */}
        <Flex marginTop="8px">
          {labels.map((label, index) => (
            <Box 
              key={index}
              width="32px"
              marginRight="0px"
            >
              <Text fontSize="xs" textAlign="center">{label}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  };
  
  // Render horizontal bar chart
  const renderHorizontalBarChart = (data, maxItems = 5) => {
    const itemsToShow = data.slice(0, maxItems);
    
    return (
      <Stack spacing="sm">
        {itemsToShow.map((item, index) => (
          <Box key={index}>
            <Flex justifyContent="space-between" marginBottom="2px">
              <Text fontSize="xs" fontWeight="bold">
                {item.type || item.name}
              </Text>
              <Text fontSize="xs">{item.count} ({Math.round(item.percentage)}%)</Text>
            </Flex>
            <Box 
              width="100%"
              height="8px"
              backgroundColor="background-alt"
              borderRadius="full"
              position="relative"
            >
              <Box 
                position="absolute"
                left="0"
                top="0"
                height="100%"
                width={`${item.percentage}%`}
                backgroundColor="primary"
                borderRadius="full"
              />
            </Box>
          </Box>
        ))}
      </Stack>
    );
  };
  
  // Render engagement insights
  const renderEngagementInsights = () => {
    const weeklyChart = formatWeeklyChartData();
    const monthlyChart = formatMonthlyChartData();
    const typeData = formatTypeData();
    
    return (
      <Box>
        <Text variant="h2" marginBottom="lg">Engagement Insights</Text>
        
        <Grid 
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="md"
          marginBottom="xl"
        >
          {/* Activity over time */}
          <Card padding="lg" backgroundColor="background-paper">
            <Text variant="h3" marginBottom="md">
              Activity Over Time
            </Text>
            <Flex marginBottom="md">
              <Button 
                size="sm" 
                variant={timeFilter === 'week' ? 'primary' : 'outline'}
                onClick={() => setTimeFilter('week')}
                marginRight="xs"
              >
                Week
              </Button>
              <Button 
                size="sm" 
                variant={timeFilter === 'month' ? 'primary' : 'outline'}
                onClick={() => setTimeFilter('month')}
              >
                Month
              </Button>
            </Flex>
            {timeFilter === 'week' ? renderBarChart(weeklyChart) : renderBarChart(monthlyChart)}
          </Card>
          
          {/* Activity by Type */}
          <Card padding="lg" backgroundColor="background-paper">
            <Text variant="h3" marginBottom="md">
              Activity by Type
            </Text>
            {renderHorizontalBarChart(typeData)}
            <Box marginTop="md">
              <Text fontSize="sm" color="text-secondary">
                Based on {activities.length} activities you've participated in.
              </Text>
            </Box>
          </Card>
        </Grid>
        
        {/* Engagement metrics */}
        <Text variant="h3" marginBottom="md">Engagement Metrics</Text>
        <Grid 
          templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
          gap="md"
          marginBottom="xl"
        >
          <Card 
            padding="md" 
            backgroundColor="background-paper" 
            textAlign="center"
          >
            <Text color="text-secondary" fontSize="sm">Completion Rate</Text>
            <Text variant="h2" color={engagementData.completionRate > 50 ? 'success' : 'warning'}>
              {Math.round(engagementData.completionRate)}%
            </Text>
            <Text fontSize="sm">
              {Math.round(engagementData.completionRate) > 50 ? 
                'Great job staying on track!' : 
                'Try to complete more activities'
              }
            </Text>
          </Card>
          
          <Card 
            padding="md" 
            backgroundColor="background-paper" 
            textAlign="center"
          >
            <Text color="text-secondary" fontSize="sm">Comments</Text>
            <Text variant="h2">{engagementData.commentCount}</Text>
            <Text fontSize="sm">
              {engagementData.commentCount > 10 ? 
                "You're an active contributor!" : 
                "Try engaging more in discussions"
              }
            </Text>
          </Card>
          
          <Card 
            padding="md" 
            backgroundColor="background-paper" 
            textAlign="center"
          >
            <Text color="text-secondary" fontSize="sm">Resources Shared</Text>
            <Text variant="h2">{engagementData.fileCount}</Text>
            <Text fontSize="sm">
              {engagementData.fileCount > 5 ? 
                'Great resource sharing!' : 
                'Try sharing more resources'
              }
            </Text>
          </Card>
        </Grid>
      </Box>
    );
  };
  
  // Render time investment insights
  const renderTimeInsights = () => {
    return (
      <Box>
        <Text variant="h2" marginBottom="lg">Time Investment</Text>
        
        <Grid 
          templateColumns={{ base: "1fr", md: "2fr 1fr" }}
          gap="md"
          marginBottom="xl"
        >
          {/* Time metrics */}
          <Card padding="lg" backgroundColor="background-paper">
            <Grid 
              templateColumns="1fr 1fr" 
              gap="md"
            >
              <Box textAlign="center" padding="md">
                <Text color="text-secondary" marginBottom="xs">Total Time Invested</Text>
                <Text variant="h2">{engagementData.totalTimeInvested.toFixed(1)} hrs</Text>
                <Text fontSize="sm" marginTop="xs">Across all activities</Text>
              </Box>
              
              <Box textAlign="center" padding="md">
                <Text color="text-secondary" marginBottom="xs">Average Session</Text>
                <Text variant="h2">{(engagementData.averageSessionTime * 60).toFixed(0)} min</Text>
                <Text fontSize="sm" marginTop="xs">Per activity session</Text>
              </Box>
              
              <Box textAlign="center" padding="md">
                <Text color="text-secondary" marginBottom="xs">Weekly Average</Text>
                <Text variant="h2">{(engagementData.totalTimeInvested / 4).toFixed(1)} hrs</Text>
                <Text fontSize="sm" marginTop="xs">Over the past month</Text>
              </Box>
              
              <Box textAlign="center" padding="md">
                <Text color="text-secondary" marginBottom="xs">Consistency Score</Text>
                <Text variant="h2">{Math.min(100, activities.length * 5)}%</Text>
                <Text fontSize="sm" marginTop="xs">Based on regular participation</Text>
              </Box>
            </Grid>
          </Card>
          
          {/* Time distribution */}
          <Card padding="lg" backgroundColor="background-paper">
            <Text variant="h3" marginBottom="md">Time Distribution</Text>
            <Box marginBottom="md">
              <Text fontSize="sm" fontWeight="bold">
                Most Active Time Periods
              </Text>
              <Stack spacing="xs" marginTop="sm">
                <Flex justifyContent="space-between">
                  <Text fontSize="sm">Weekday evenings</Text>
                  <Text fontSize="sm" fontWeight="bold">65%</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontSize="sm">Weekend afternoons</Text>
                  <Text fontSize="sm" fontWeight="bold">22%</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontSize="sm">Weekday mornings</Text>
                  <Text fontSize="sm" fontWeight="bold">13%</Text>
                </Flex>
              </Stack>
            </Box>
            
            <Text fontSize="xs" color="text-secondary" marginTop="md">
              Based on your activity timestamps from the past 30 days
            </Text>
          </Card>
        </Grid>
        
        {/* Productivity insights */}
        <Text variant="h3" marginBottom="md">Productivity Insights</Text>
        <Card padding="lg" backgroundColor="background-paper" marginBottom="xl">
          <Grid 
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap="md"
          >
            <Box>
              <Text fontWeight="bold" marginBottom="sm">
                Optimal Activity Times
              </Text>
              <Stack spacing="sm">
                <Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm">Most productive</Text>
                    <Text fontSize="sm">6 - 8 PM</Text>
                  </Flex>
                  <Box 
                    height="8px"
                    backgroundColor="background-alt"
                    borderRadius="full"
                    position="relative"
                  >
                    <Box 
                      position="absolute"
                      left="0"
                      top="0"
                      height="100%"
                      width="85%"
                      backgroundColor="success"
                      borderRadius="full"
                    />
                  </Box>
                </Box>
                
                <Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm">Most engaged</Text>
                    <Text fontSize="sm">7 - 9 PM</Text>
                  </Flex>
                  <Box 
                    height="8px"
                    backgroundColor="background-alt"
                    borderRadius="full"
                    position="relative"
                  >
                    <Box 
                      position="absolute"
                      left="0"
                      top="0"
                      height="100%"
                      width="75%"
                      backgroundColor="primary"
                      borderRadius="full"
                    />
                  </Box>
                </Box>
                
                <Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm">Longest sessions</Text>
                    <Text fontSize="sm">Weekends</Text>
                  </Flex>
                  <Box 
                    height="8px"
                    backgroundColor="background-alt"
                    borderRadius="full"
                    position="relative"
                  >
                    <Box 
                      position="absolute"
                      left="0"
                      top="0"
                      height="100%"
                      width="65%"
                      backgroundColor="info"
                      borderRadius="full"
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
            
            <Box>
              <Text fontWeight="bold" marginBottom="sm">
                Recommendations
              </Text>
              <Stack spacing="sm">
                <Flex gap="sm" alignItems="flex-start">
                  <Text fontSize="lg" color="success">•</Text>
                  <Text fontSize="sm">
                    Schedule collaborative activities during weekday evenings when you"re most active.
                  </Text>
                </Flex>
                <Flex gap="sm" alignItems="flex-start">
                  <Text fontSize="lg" color="success">•</Text>
                  <Text fontSize="sm">
                    Use weekend time for longer, focused activities that require deeper engagement.
                  </Text>
                </Flex>
                <Flex gap="sm" alignItems="flex-start">
                  <Text fontSize="lg" color="success">•</Text>
                  <Text fontSize="sm">
                    Consider allocating 30-45 minute sessions for optimal productivity.
                  </Text>
                </Flex>
              </Stack>
            </Box>
          </Grid>
        </Card>
      </Box>
    );
  };
  
  // Render community insights
  const renderCommunityInsights = () => {
    const communityData = formatCommunityData();
    
    return (
      <Box>
        <Text variant="h2" marginBottom="lg">Community Insights</Text>
        
        <Grid 
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="md"
          marginBottom="xl"
        >
          {/* Community breakdown */}
          <Card padding="lg" backgroundColor="background-paper">
            <Text variant="h3" marginBottom="md">
              Participation by Community
            </Text>
            {renderHorizontalBarChart(communityData)}
            <Box marginTop="md">
              <Text fontSize="sm" color="text-secondary">
                Based on {activities.length} activities across {communityData.length} communities.
              </Text>
            </Box>
          </Card>
          
          {/* Community comparison */}
          <Card padding="lg" backgroundColor="background-paper">
            <Text variant="h3" marginBottom="md">
              How You Compare
            </Text>
            <Stack spacing="md">
              {engagementData.communityComparison.slice(0, 3).map((item, index) => (
                <Box key={index}>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm" fontWeight="bold">{item.name}</Text>
                    <Text fontSize="sm">
                      {item.percentile}th percentile
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="sm">
                    <Box flex="1">
                      <Box 
                        height="8px"
                        backgroundColor="background-alt"
                        borderRadius="full"
                        position="relative"
                      >
                        <Box 
                          position="absolute"
                          left="0"
                          top="0"
                          height="100%"
                          width={`${item.percentile}%`}
                          backgroundColor={item.percentile > 80 ? 'success' : item.percentile > 50 ? 'primary' : 'warning'}
                          borderRadius="full"
                        />
                      </Box>
                    </Box>
                    <Text fontSize="xs">
                      {item.userParticipation} vs {Math.round(item.communityAverage)} avg
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
            <Text fontSize="xs" color="text-secondary" marginTop="md">
              Percentile rank based on participation level compared to other community members
            </Text>
          </Card>
        </Grid>
        
        {/* Collaboration patterns */}
        <Text variant="h3" marginBottom="md">Collaboration Patterns</Text>
        <Card padding="lg" backgroundColor="background-paper" marginBottom="xl">
          <Grid 
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap="lg"
          >
            <Box>
              <Text fontWeight="bold" marginBottom="sm">
                Your Collaboration Style
              </Text>
              <Stack spacing="md">
                <Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm">Initiator</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {Math.round(engagementData.creatorPercentage || 40)}%
                    </Text>
                  </Flex>
                  <Box 
                    height="8px"
                    backgroundColor="background-alt"
                    borderRadius="full"
                    position="relative"
                    marginBottom="xs"
                  >
                    <Box 
                      position="absolute"
                      left="0"
                      top="0"
                      height="100%"
                      width={`${engagementData.creatorPercentage || 40}%`}
                      backgroundColor="primary"
                      borderRadius="full"
                    />
                  </Box>
                  <Text fontSize="xs" color="text-secondary">
                    You start conversations and activities
                  </Text>
                </Box>
                
                <Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm">Contributor</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {Math.round(engagementData.contributorPercentage || 75)}%
                    </Text>
                  </Flex>
                  <Box 
                    height="8px"
                    backgroundColor="background-alt"
                    borderRadius="full"
                    position="relative"
                    marginBottom="xs"
                  >
                    <Box 
                      position="absolute"
                      left="0"
                      top="0"
                      height="100%"
                      width={`${engagementData.contributorPercentage || 75}%`}
                      backgroundColor="success"
                      borderRadius="full"
                    />
                  </Box>
                  <Text fontSize="xs" color="text-secondary">
                    You actively participate and provide feedback
                  </Text>
                </Box>
                
                <Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="sm">Resource Provider</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {Math.round(engagementData.resourcePercentage || 55)}%
                    </Text>
                  </Flex>
                  <Box 
                    height="8px"
                    backgroundColor="background-alt"
                    borderRadius="full"
                    position="relative"
                    marginBottom="xs"
                  >
                    <Box 
                      position="absolute"
                      left="0"
                      top="0"
                      height="100%"
                      width={`${engagementData.resourcePercentage || 55}%`}
                      backgroundColor="info"
                      borderRadius="full"
                    />
                  </Box>
                  <Text fontSize="xs" color="text-secondary">
                    You share files and information with others
                  </Text>
                </Box>
              </Stack>
            </Box>
            
            <Box>
              <Text fontWeight="bold" marginBottom="sm">
                Connection Suggestions
              </Text>
              <Stack spacing="md">
                <Box padding="md" backgroundColor="background-alt" borderRadius="md">
                  <Text fontSize="sm" fontWeight="bold">Design Community</Text>
                  <Text fontSize="xs" marginBottom="sm">
                    Based on your participation in UI discussions
                  </Text>
                  <Button size="sm" variant="outline" width="100%">
                    View Community
                  </Button>
                </Box>
                
                <Box padding="md" backgroundColor="background-alt" borderRadius="md">
                  <Text fontSize="sm" fontWeight="bold">Web Development Group</Text>
                  <Text fontSize="xs" marginBottom="sm">
                    Your coding skills would be valuable here
                  </Text>
                  <Button size="sm" variant="outline" width="100%">
                    View Community
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Card>
      </Box>
    );
  };
  
  return (
    <Box className="activity-insights" maxWidth="1200px" margin="0 auto">
      <Box marginBottom="xl">
        <Text variant="h1" marginBottom="md">Activity Insights</Text>
        <Text variant="body1">
          Detailed analytics about your activity engagement and participation patterns.
        </Text>
      </Box>
      
      <Flex marginBottom="xl" gap="md">
        <Button 
          variant={insightType === 'engagement' ? 'primary' : 'outline'}
          onClick={() => setInsightType('engagement')}
        >
          Engagement
        </Button>
        <Button 
          variant={insightType === 'time' ? 'primary' : 'outline'}
          onClick={() => setInsightType('time')}
        >
          Time Investment
        </Button>
        <Button 
          variant={insightType === 'community' ? 'primary' : 'outline'}
          onClick={() => setInsightType('community')}
        >
          Community
        </Button>
      </Flex>
      
      {insightType === 'engagement' && renderEngagementInsights()}
      {insightType === 'time' && renderTimeInsights()}
      {insightType === 'community' && renderCommunityInsights()}
    </Box>
  );
};

export default ActivityInsights;
