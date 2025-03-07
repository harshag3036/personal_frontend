import React, { useState } from 'react';
import { 
  Tooltip, 
  TOOLTIP_VARIANTS, 
  TOOLTIP_PLACEMENTS 
} from '../molecules';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Icon, 
  Grid, 
  Divider 
} from '../atoms';

/**
 * TooltipExample Component
 * 
 * This example demonstrates how to use the Tooltip component in a real-world scenario.
 * It shows a community activity dashboard with tooltips for various UI elements.
 */
const TooltipExample = () => {
  // State for the active variant
  const [variant, setVariant] = useState('default');
  
  // Sample activity data
  const activities = [
    {
      id: 1,
      title: 'Weekly Mindfulness Session',
      type: 'Workshop',
      date: 'Every Tuesday',
      participants: 18,
      status: 'active',
      description: 'A guided meditation and mindfulness practice session for all community members.',
    },
    {
      id: 2,
      title: 'Community Book Club',
      type: 'Discussion',
      date: 'July 15, 2025',
      participants: 12,
      status: 'upcoming',
      description: 'Join us to discuss "The Power of Now" by Eckhart Tolle.',
    },
    {
      id: 3,
      title: 'Volunteer Outreach Program',
      type: 'Project',
      date: 'Ongoing',
      participants: 24,
      status: 'active',
      description: 'Coordinating community efforts to support local charitable organizations.',
    },
  ];
  
  // Sample statistics
  const stats = [
    { label: 'Total Activities', value: 28, icon: 'calendar', tooltip: 'Total number of activities created in the community' },
    { label: 'Active Members', value: 156, icon: 'users', tooltip: 'Members who participated in at least one activity in the last 30 days' },
    { label: 'Avg. Engagement', value: '76%', icon: 'bar-chart-2', tooltip: 'Average percentage of invited members who actively participate' },
    { label: 'New This Month', value: 12, icon: 'plus-circle', tooltip: 'New activities created in the current month' },
  ];
  
  return (
    <Box maxWidth="900px" mx="auto" p="lg">
      <Text as="h2" mb="md">Community Activity Dashboard</Text>
      
      {/* Controls for the example */}
      <Box mb="lg" p="md" borderRadius="md" bg="background-muted">
        <Text as="h3" mb="md">Tooltip Controls</Text>
        <Flex gap="md">
          <Text fontWeight="medium">Variant:</Text>
          {Object.entries(TOOLTIP_VARIANTS).map(([key, value]) => (
            <Button 
              key={value} 
              size="sm" 
              variant={variant === value ? 'primary' : 'outline'}
              onClick={() => setVariant(value)}
            >
              {key.replace('_', ' ')}
            </Button>
          ))}
        </Flex>
      </Box>
      
      {/* Statistics with tooltips */}
      <Grid 
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))" 
        gap="md" 
        mb="xl"
      >
        {stats.map((stat) => (
          <Tooltip 
            key={stat.label} 
            content={stat.tooltip}
            variant={variant}
            placement={TOOLTIP_PLACEMENTS.TOP}
          >
            <Box 
              p="md" 
              borderRadius="md" 
              boxShadow="sm"
              bg="background"
              border="1px solid var(--color-border, #e2e8f0)"
            >
              <Flex alignItems="center" mb="sm">
                <Icon name={stat.icon} size="md" color="primary" />
                <Text ml="sm" fontWeight="bold">{stat.label}</Text>
              </Flex>
              <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
            </Box>
          </Tooltip>
        ))}
      </Grid>
      
      {/* Activity list with tooltips */}
      <Box mb="xl">
        <Flex justifyContent="space-between" alignItems="center" mb="md">
          <Text as="h3">Recent Activities</Text>
          <Tooltip 
            content="Create a new community activity" 
            variant={variant}
            placement={TOOLTIP_PLACEMENTS.LEFT}
          >
            <Button 
              variant="primary" 
              size="sm"
              leftIcon={<Icon name="plus" size="sm" />}
            >
              Create Activity
            </Button>
          </Tooltip>
        </Flex>
        
        {activities.map((activity) => (
          <Box 
            key={activity.id}
            p="md" 
            mb="md" 
            borderRadius="md" 
            boxShadow="sm" 
            bg="background"
            border="1px solid var(--color-border, #e2e8f0)"
          >
            <Flex justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Flex alignItems="center" mb="xs">
                  <Text as="h4" mr="sm">{activity.title}</Text>
                  <Tooltip 
                    content={activity.description} 
                    variant={variant}
                    maxWidth={250}
                  >
                    <Icon name="info" size="sm" style={{ cursor: 'pointer' }} />
                  </Tooltip>
                </Flex>
                <Flex gap="md" mb="sm">
                  <Tooltip content="Activity type" variant={variant}>
                    <Flex alignItems="center">
                      <Icon name="tag" size="sm" style={{ marginRight: '4px' }} />
                      <Text size="sm" color="text-muted">{activity.type}</Text>
                    </Flex>
                  </Tooltip>
                  <Tooltip content="Schedule" variant={variant}>
                    <Flex alignItems="center">
                      <Icon name="calendar" size="sm" style={{ marginRight: '4px' }} />
                      <Text size="sm" color="text-muted">{activity.date}</Text>
                    </Flex>
                  </Tooltip>
                  <Tooltip content="Number of participants" variant={variant}>
                    <Flex alignItems="center">
                      <Icon name="users" size="sm" style={{ marginRight: '4px' }} />
                      <Text size="sm" color="text-muted">{activity.participants} participants</Text>
                    </Flex>
                  </Tooltip>
                </Flex>
              </Box>
              
              <Flex>
                <Tooltip content="View activity details" variant={variant}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    leftIcon={<Icon name="eye" size="sm" />}
                    mr="sm"
                  >
                    View
                  </Button>
                </Tooltip>
                <Tooltip content="Edit activity" variant={variant}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    leftIcon={<Icon name="edit-2" size="sm" />}
                  >
                    Edit
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
            
            <Flex justifyContent="flex-end" mt="sm">
              <Tooltip 
                content={activity.status === 'active' ? 'This activity is currently active' : 'This activity is scheduled for the future'} 
                variant={variant}
              >
                <Box 
                  px="sm" 
                  py="xs" 
                  borderRadius="pill"
                  bg={activity.status === 'active' ? 'success-50' : 'primary-50'}
                  color={activity.status === 'active' ? 'success-700' : 'primary-700'}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </Box>
              </Tooltip>
            </Flex>
          </Box>
        ))}
      </Box>
      
      <Divider my="xl" />
      
      {/* Form with tooltips */}
      <Box>
        <Text as="h3" mb="md">Activity Filters</Text>
        
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="md" mb="lg">
          <Box>
            <Flex alignItems="center" mb="xs">
              <Text as="label" htmlFor="activity-type" mr="sm">Activity Type</Text>
              <Tooltip 
                content="Filter activities by their type" 
                variant={variant}
                placement={TOOLTIP_PLACEMENTS.TOP}
              >
                <Icon name="help-circle" size="sm" style={{ cursor: 'pointer' }} />
              </Tooltip>
            </Flex>
            <select 
              id="activity-type" 
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">All Types</option>
              <option value="discussion">Discussion</option>
              <option value="workshop">Workshop</option>
              <option value="project">Project</option>
              <option value="social">Social Event</option>
            </select>
          </Box>
          
          <Box>
            <Flex alignItems="center" mb="xs">
              <Text as="label" htmlFor="activity-status" mr="sm">Status</Text>
              <Tooltip 
                content="Filter activities by their current status" 
                variant={variant}
                placement={TOOLTIP_PLACEMENTS.TOP}
              >
                <Icon name="help-circle" size="sm" style={{ cursor: 'pointer' }} />
              </Tooltip>
            </Flex>
            <select 
              id="activity-status" 
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </Box>
          
          <Box>
            <Flex alignItems="center" mb="xs">
              <Text as="label" htmlFor="activity-date" mr="sm">Date Range</Text>
              <Tooltip 
                content="Filter activities by date range" 
                variant={variant}
                placement={TOOLTIP_PLACEMENTS.TOP}
              >
                <Icon name="help-circle" size="sm" style={{ cursor: 'pointer' }} />
              </Tooltip>
            </Flex>
            <select 
              id="activity-date" 
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </Box>
        </Grid>
        
        <Flex justifyContent="flex-end" gap="md">
          <Tooltip content="Clear all filters" variant={variant}>
            <Button variant="outline">Reset</Button>
          </Tooltip>
          <Tooltip content="Apply the selected filters" variant={variant}>
            <Button variant="primary">Apply Filters</Button>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

export default TooltipExample;
