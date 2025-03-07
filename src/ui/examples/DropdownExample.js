import React, { useState } from 'react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  DROPDOWN_VARIANTS
} from '../molecules';
import { Button, Text, Box, Flex, Icon, Divider } from '../atoms';

/**
 * DropdownExample Component
 * 
 * This example demonstrates how to use the Dropdown component in a real-world scenario.
 * It shows a community activity management interface with different dropdown types.
 */
const DropdownExample = () => {
  // State for selected values
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [selectedView, setSelectedView] = useState('Grid');
  
  // State for activity dropdown menus
  const [activityMenuStates, setActivityMenuStates] = useState({
    1: false,
    2: false,
    3: false
  });
  
  // Toggle activity menu
  const toggleActivityMenu = (activityId) => {
    setActivityMenuStates(prev => ({
      ...prev,
      [activityId]: !prev[activityId]
    }));
  };
  
  // Sample activity data
  const activities = [
    {
      id: 1,
      title: 'Weekly Community Discussion',
      type: 'Discussion',
      date: 'Every Friday',
      participants: 12,
      status: 'active',
    },
    {
      id: 2,
      title: 'Community Cleanup Project',
      type: 'Project',
      date: 'July 15, 2025',
      participants: 8,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Mindfulness Workshop',
      type: 'Workshop',
      date: 'July 10, 2025',
      participants: 15,
      status: 'upcoming',
    },
  ];
  
  // Filter options
  const filterOptions = [
    { label: 'All Activities', value: 'All' },
    { label: 'Discussions', value: 'Discussion' },
    { label: 'Projects', value: 'Project' },
    { label: 'Workshops', value: 'Workshop' },
  ];
  
  // Sort options
  const sortOptions = [
    { label: 'Newest First', value: 'Newest' },
    { label: 'Oldest First', value: 'Oldest' },
    { label: 'Most Participants', value: 'Participants' },
    { label: 'Alphabetical', value: 'Alphabetical' },
  ];
  
  // View options
  const viewOptions = [
    { label: 'Grid View', value: 'Grid', icon: 'grid' },
    { label: 'List View', value: 'List', icon: 'list' },
    { label: 'Calendar View', value: 'Calendar', icon: 'calendar' },
  ];
  
  // Activity actions
  const activityActions = [
    { label: 'Edit', icon: 'edit-2', onClick: (id) => console.log(`Edit activity ${id}`) },
    { label: 'Share', icon: 'share-2', onClick: (id) => console.log(`Share activity ${id}`) },
    { label: 'Duplicate', icon: 'copy', onClick: (id) => console.log(`Duplicate activity ${id}`) },
    { label: 'Archive', icon: 'archive', onClick: (id) => console.log(`Archive activity ${id}`) },
    { label: 'Delete', icon: 'trash-2', onClick: (id) => console.log(`Delete activity ${id}`) },
  ];
  
  // User menu options
  const userMenuOptions = [
    { label: 'Profile', icon: 'user', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', icon: 'settings', onClick: () => console.log('Settings clicked') },
    { label: 'Help', icon: 'help-circle', onClick: () => console.log('Help clicked') },
    { label: 'Logout', icon: 'log-out', onClick: () => console.log('Logout clicked') },
  ];
  
  return (
    <Box p="lg" maxWidth="800px" mx="auto">
      <Text as="h2" mb="md">Community Activity Management</Text>
      
      {/* Top toolbar with filters and actions */}
      <Flex justifyContent="space-between" alignItems="center" mb="lg">
        <Flex gap="md">
          {/* Filter dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="outline" size="sm">
                <Icon name="filter" size="sm" style={{ marginRight: '0.5rem' }} />
                {selectedFilter === 'All' ? 'All Activities' : selectedFilter}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {filterOptions.map((option) => (
                <DropdownItem 
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          {/* Sort dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="outline" size="sm">
                <Icon name="sort" size="sm" style={{ marginRight: '0.5rem' }} />
                Sort: {selectedSort}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {sortOptions.map((option) => (
                <DropdownItem 
                  key={option.value}
                  onClick={() => setSelectedSort(option.value)}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Flex>
        
        <Flex gap="md">
          {/* View options dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="outline" size="sm">
                <Icon 
                  name={viewOptions.find(o => o.value === selectedView)?.icon || 'grid'} 
                  size="sm" 
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {viewOptions.map((option) => (
                <DropdownItem 
                  key={option.value}
                  onClick={() => setSelectedView(option.value)}
                  icon={<Icon name={option.icon} size="sm" />}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          {/* Create activity button */}
          <Button 
            variant="primary" 
            size="sm"
            leftIcon={<Icon name="plus" size="sm" />}
            onClick={() => console.log('Create activity')}
          >
            Create Activity
          </Button>
          
          {/* User menu dropdown */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="subtle" size="sm" style={{ padding: '0.25rem' }}>
                <Box 
                  width="32px" 
                  height="32px" 
                  borderRadius="circle" 
                  bg="primary" 
                  color="white"
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                >
                  <Text fontWeight="bold">JD</Text>
                </Box>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <Box p="sm">
                <Text fontWeight="bold">John Doe</Text>
                <Text size="sm" color="text-muted">john.doe@example.com</Text>
              </Box>
              <Divider my="xs" />
              {userMenuOptions.map((option) => (
                <DropdownItem 
                  key={option.label}
                  onClick={option.onClick}
                  icon={<Icon name={option.icon} size="sm" />}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Flex>
      </Flex>
      
      {/* Activity cards */}
      <Box>
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
                <Text as="h3" mb="xs">{activity.title}</Text>
                <Flex gap="sm" mb="sm">
                  <Text size="sm" color="text-muted">
                    <Icon name="tag" size="sm" style={{ marginRight: '4px' }} />
                    {activity.type}
                  </Text>
                  <Text size="sm" color="text-muted">
                    <Icon name="calendar" size="sm" style={{ marginRight: '4px' }} />
                    {activity.date}
                  </Text>
                  <Text size="sm" color="text-muted">
                    <Icon name="users" size="sm" style={{ marginRight: '4px' }} />
                    {activity.participants} participants
                  </Text>
                </Flex>
              </Box>
              
              {/* Activity actions dropdown */}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button variant="ghost" size="sm">
                    <Icon name="more-vertical" size="sm" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {activityActions.map((action) => (
                    <DropdownItem 
                      key={action.label}
                      onClick={() => action.onClick(activity.id)}
                      icon={<Icon name={action.icon} size="sm" />}
                    >
                      {action.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Flex>
            
            <Flex justifyContent="flex-end" mt="sm">
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
            </Flex>
          </Box>
        ))}
      </Box>
      
      {/* Bulk actions dropdown (disabled until items are selected) */}
      <Flex justifyContent="flex-start" mt="lg">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="outline" disabled>
              Bulk Actions
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem disabled>Select items first</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Flex>
    </Box>
  );
};

export default DropdownExample;
