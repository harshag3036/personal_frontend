import React, { useState } from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  POPOVER_VARIANTS, 
  POPOVER_PLACEMENTS 
} from '../molecules';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Icon, 
  Grid, 
  Divider,
  Input
} from '../atoms';

/**
 * PopoverExample Component
 * 
 * This example demonstrates how to use the Popover component in a real-world scenario.
 * It shows a community activity management interface with popovers for various actions.
 */
const PopoverExample = () => {
  // State for the active variant
  const [variant, setVariant] = useState('default');
  
  // Sample activity data
  const activities = [
    {
      id: 1,
      title: 'Weekly Mindfulness Session',
      type: 'Workshop',
      date: 'Every Tuesday',
      time: '7:00 PM - 8:00 PM',
      location: 'Community Center',
      participants: 18,
      status: 'active',
      description: 'A guided meditation and mindfulness practice session for all community members.',
    },
    {
      id: 2,
      title: 'Community Book Club',
      type: 'Discussion',
      date: 'July 15, 2025',
      time: '6:30 PM - 8:30 PM',
      location: 'Virtual Meeting',
      participants: 12,
      status: 'upcoming',
      description: 'Join us to discuss "The Power of Now" by Eckhart Tolle.',
    },
    {
      id: 3,
      title: 'Volunteer Outreach Program',
      type: 'Project',
      date: 'Ongoing',
      time: 'Flexible',
      location: 'Various Locations',
      participants: 24,
      status: 'active',
      description: 'Coordinating community efforts to support local charitable organizations.',
    },
  ];
  
  return (
    <Box maxWidth="900px" mx="auto" p="lg">
      <Text as="h2" mb="lg">Community Activity Management</Text>
      
      {/* Controls for the example */}
      <Box mb="xl" p="md" borderRadius="md" bg="background-muted">
        <Text as="h3" mb="md">Popover Controls</Text>
        <Flex gap="md">
          <Text fontWeight="medium">Variant:</Text>
          {Object.entries(POPOVER_VARIANTS).map(([key, value]) => (
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
      
      {/* Header with actions */}
      <Flex justifyContent="space-between" alignItems="center" mb="lg">
        <Text as="h3">Activity Dashboard</Text>
        
        <Flex gap="md">
          <Popover placement={POPOVER_PLACEMENTS.BOTTOM_END} variant={variant}>
            <PopoverTrigger>
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<Icon name="filter" size="sm" />}
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Box className="ui-popover-header">
                <Text fontWeight="bold">Filter Activities</Text>
              </Box>
              <Box className="ui-popover-body">
                <Flex flexDirection="column" gap="md">
                  <Box>
                    <Text as="label" htmlFor="filter-type" fontWeight="medium" mb="xs" display="block">
                      Activity Type
                    </Text>
                    <select 
                      id="filter-type" 
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
                    <Text as="label" htmlFor="filter-status" fontWeight="medium" mb="xs" display="block">
                      Status
                    </Text>
                    <select 
                      id="filter-status" 
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
                    <Text as="label" htmlFor="filter-date" fontWeight="medium" mb="xs" display="block">
                      Date Range
                    </Text>
                    <select 
                      id="filter-date" 
                      style={{ width: '100%', padding: '8px' }}
                    >
                      <option value="">All Dates</option>
                      <option value="today">Today</option>
                      <option value="this-week">This Week</option>
                      <option value="this-month">This Month</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </Box>
                </Flex>
              </Box>
              <Box className="ui-popover-footer">
                <Button variant="outline" size="sm">Reset</Button>
                <Button variant="primary" size="sm">Apply</Button>
              </Box>
            </PopoverContent>
          </Popover>
          
          <Popover placement={POPOVER_PLACEMENTS.BOTTOM_END} variant={variant}>
            <PopoverTrigger>
              <Button 
                variant="primary" 
                size="sm"
                leftIcon={<Icon name="plus" size="sm" />}
              >
                Create Activity
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Box className="ui-popover-header">
                <Text fontWeight="bold">Create New Activity</Text>
              </Box>
              <Box className="ui-popover-body">
                <Flex flexDirection="column" gap="md">
                  <Box>
                    <Text as="label" htmlFor="activity-title" fontWeight="medium" mb="xs" display="block">
                      Title
                    </Text>
                    <Input id="activity-title" placeholder="Enter activity title" />
                  </Box>
                  
                  <Box>
                    <Text as="label" htmlFor="activity-type" fontWeight="medium" mb="xs" display="block">
                      Type
                    </Text>
                    <select 
                      id="activity-type" 
                      style={{ width: '100%', padding: '8px' }}
                    >
                      <option value="">Select type</option>
                      <option value="discussion">Discussion</option>
                      <option value="workshop">Workshop</option>
                      <option value="project">Project</option>
                      <option value="social">Social Event</option>
                    </select>
                  </Box>
                  
                  <Grid templateColumns="1fr 1fr" gap="md">
                    <Box>
                      <Text as="label" htmlFor="activity-date" fontWeight="medium" mb="xs" display="block">
                        Date
                      </Text>
                      <Input id="activity-date" type="date" />
                    </Box>
                    
                    <Box>
                      <Text as="label" htmlFor="activity-time" fontWeight="medium" mb="xs" display="block">
                        Time
                      </Text>
                      <Input id="activity-time" type="time" />
                    </Box>
                  </Grid>
                  
                  <Box>
                    <Text as="label" htmlFor="activity-location" fontWeight="medium" mb="xs" display="block">
                      Location
                    </Text>
                    <Input id="activity-location" placeholder="Enter location" />
                  </Box>
                  
                  <Box>
                    <Text as="label" htmlFor="activity-description" fontWeight="medium" mb="xs" display="block">
                      Description
                    </Text>
                    <textarea 
                      id="activity-description" 
                      placeholder="Enter description" 
                      style={{ width: '100%', padding: '8px', minHeight: '80px' }}
                    />
                  </Box>
                </Flex>
              </Box>
              <Box className="ui-popover-footer">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Create</Button>
              </Box>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      
      {/* Activity list */}
      <Box>
        {activities.map((activity) => (
          <Box 
            key={activity.id}
            p="lg" 
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
                  <Box 
                    px="sm" 
                    py="xs" 
                    borderRadius="pill"
                    bg={activity.status === 'active' ? 'success-50' : 'primary-50'}
                    color={activity.status === 'active' ? 'success-700' : 'primary-700'}
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Box>
                </Flex>
                <Text mb="md">{activity.description}</Text>
                <Flex gap="md" mb="sm">
                  <Flex alignItems="center">
                    <Icon name="tag" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.type}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Icon name="calendar" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.date}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Icon name="clock" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.time}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Icon name="map-pin" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.location}</Text>
                  </Flex>
                </Flex>
              </Box>
              
              <Flex>
                <Popover placement={POPOVER_PLACEMENTS.BOTTOM_END} variant={variant}>
                  <PopoverTrigger>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      leftIcon={<Icon name="more-vertical" size="sm" />}
                    >
                      Actions
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Flex flexDirection="column" gap="md">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Icon name="eye" size="sm" />}
                        justifyContent="flex-start"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Icon name="edit" size="sm" />}
                        justifyContent="flex-start"
                      >
                        Edit Activity
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Icon name="users" size="sm" />}
                        justifyContent="flex-start"
                      >
                        Manage Participants
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Icon name="message-square" size="sm" />}
                        justifyContent="flex-start"
                      >
                        Send Notification
                      </Button>
                      <Divider my="xs" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Icon name="archive" size="sm" />}
                        justifyContent="flex-start"
                      >
                        Archive
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Icon name="trash-2" size="sm" color="error" />}
                        justifyContent="flex-start"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
            
            <Flex justifyContent="space-between" alignItems="center" mt="md">
              <Flex alignItems="center">
                <Text size="sm" mr="sm">{activity.participants} participants</Text>
                <Popover placement={POPOVER_PLACEMENTS.TOP} variant={variant}>
                  <PopoverTrigger>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      p="0"
                    >
                      <Flex>
                        <Box 
                          width="24px" 
                          height="24px" 
                          borderRadius="full" 
                          bg="primary-500" 
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xs"
                          mr="-8px"
                          border="2px solid white"
                        >
                          JD
                        </Box>
                        <Box 
                          width="24px" 
                          height="24px" 
                          borderRadius="full" 
                          bg="success-500" 
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xs"
                          mr="-8px"
                          border="2px solid white"
                        >
                          AS
                        </Box>
                        <Box 
                          width="24px" 
                          height="24px" 
                          borderRadius="full" 
                          bg="warning-500" 
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xs"
                          border="2px solid white"
                        >
                          +{activity.participants - 2}
                        </Box>
                      </Flex>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Box className="ui-popover-header">
                      <Text fontWeight="bold">Participants</Text>
                    </Box>
                    <Box className="ui-popover-body">
                      <Text mb="sm">View and manage participants for this activity.</Text>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Icon name="users" size="sm" />}
                        width="100%"
                      >
                        Manage Participants
                      </Button>
                    </Box>
                  </PopoverContent>
                </Popover>
              </Flex>
              
              <Flex gap="sm">
                <Popover placement={POPOVER_PLACEMENTS.TOP_END} variant={variant}>
                  <PopoverTrigger>
                    <Button 
                      variant="outline" 
                      size="sm"
                      leftIcon={<Icon name="share-2" size="sm" />}
                    >
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Box className="ui-popover-header">
                      <Text fontWeight="bold">Share Activity</Text>
                    </Box>
                    <Box className="ui-popover-body">
                      <Flex flexDirection="column" gap="md">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          leftIcon={<Icon name="mail" size="sm" />}
                          justifyContent="flex-start"
                        >
                          Email
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          leftIcon={<Icon name="message-circle" size="sm" />}
                          justifyContent="flex-start"
                        >
                          Message
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          leftIcon={<Icon name="link" size="sm" />}
                          justifyContent="flex-start"
                        >
                          Copy Link
                        </Button>
                      </Flex>
                    </Box>
                  </PopoverContent>
                </Popover>
                
                <Button 
                  variant="primary" 
                  size="sm"
                >
                  {activity.status === 'active' ? 'Join Activity' : 'Register'}
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PopoverExample;
