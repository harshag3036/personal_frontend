import React, { useState } from 'react';
import { 
  Menu, 
  MenuItem, 
  MenuDivider, 
  MENU_VARIANTS 
} from '../molecules';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Icon, 
  Grid 
} from '../atoms';

/**
 * MenuExample Component
 * 
 * This example demonstrates how to use the Menu component in a real-world scenario.
 * It shows a community activity management interface with menus for various actions.
 */
const MenuExample = () => {
  // State for the active variant
  const [variant, setVariant] = useState('default');
  
  // State for the selected menu item
  const [selectedAction, setSelectedAction] = useState('');
  
  // State for the menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for activity menus
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
      title: 'Weekly Mindfulness Session',
      type: 'Workshop',
      date: 'Every Tuesday',
      participants: 18,
      status: 'active',
    },
    {
      id: 2,
      title: 'Community Book Club',
      type: 'Discussion',
      date: 'July 15, 2025',
      participants: 12,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Volunteer Outreach Program',
      type: 'Project',
      date: 'Ongoing',
      participants: 24,
      status: 'active',
    },
  ];
  
  // Handle menu item click
  const handleMenuItemClick = (event, index, value) => {
    setSelectedAction(`${value} action selected`);
    setIsMenuOpen(false);
  };
  
  return (
    <Box maxWidth="900px" mx="auto" p="lg">
      <Text as="h2" mb="lg">Community Activity Management</Text>
      
      {/* Controls for the example */}
      <Box mb="xl" p="md" borderRadius="md" bg="background-muted">
        <Text as="h3" mb="md">Menu Controls</Text>
        <Flex gap="md">
          <Text fontWeight="medium">Variant:</Text>
          {Object.entries(MENU_VARIANTS).map(([key, value]) => (
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
      
      {/* Selected action display */}
      {selectedAction && (
        <Box 
          mb="lg" 
          p="md" 
          borderRadius="md" 
          bg="success-50" 
          color="success-700"
        >
          <Text>{selectedAction}</Text>
        </Box>
      )}
      
      {/* Basic Menu Example */}
      <Box mb="xl">
        <Text as="h3" mb="md">Basic Menu</Text>
        <Flex gap="md">
          <Box position="relative">
            <Button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              Open Menu
            </Button>
            
            <Menu 
              isOpen={isMenuOpen} 
              onClose={() => setIsMenuOpen(false)}
              variant={variant}
            >
              <MenuItem 
                icon={<Icon name="user" size="sm" />} 
                value="profile"
                index={0}
                onClick={handleMenuItemClick}
              >
                Profile
              </MenuItem>
              <MenuItem 
                icon={<Icon name="settings" size="sm" />} 
                value="settings"
                index={1}
                onClick={handleMenuItemClick}
              >
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem 
                icon={<Icon name="help-circle" size="sm" />} 
                value="help"
                index={2}
                onClick={handleMenuItemClick}
              >
                Help
              </MenuItem>
              <MenuItem 
                icon={<Icon name="log-out" size="sm" />} 
                value="logout"
                index={3}
                onClick={handleMenuItemClick}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Flex>
      </Box>
      
      {/* Activity list with menus */}
      <Box>
        <Text as="h3" mb="md">Activity Management</Text>
        
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
            <Flex justifyContent="space-between" alignItems="center">
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
                <Flex gap="md">
                  <Flex alignItems="center">
                    <Icon name="tag" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.type}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Icon name="calendar" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.date}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Icon name="users" size="sm" style={{ marginRight: '4px' }} />
                    <Text size="sm" color="text-muted">{activity.participants} participants</Text>
                  </Flex>
                </Flex>
              </Box>
              
              <Box position="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => toggleActivityMenu(activity.id)}
                  aria-expanded={activityMenuStates[activity.id]}
                  aria-haspopup="true"
                >
                  <Icon name="more-vertical" size="sm" />
                </Button>
                
                <Menu 
                  isOpen={activityMenuStates[activity.id]} 
                  onClose={() => setActivityMenuStates(prev => ({...prev, [activity.id]: false}))}
                  variant={variant}
                >
                  <MenuItem 
                    icon={<Icon name="eye" size="sm" />} 
                    value={`view-${activity.id}`}
                    index={0}
                    onClick={handleMenuItemClick}
                  >
                    View Details
                  </MenuItem>
                  <MenuItem 
                    icon={<Icon name="edit-2" size="sm" />} 
                    value={`edit-${activity.id}`}
                    index={1}
                    onClick={handleMenuItemClick}
                  >
                    Edit Activity
                  </MenuItem>
                  <MenuItem 
                    icon={<Icon name="users" size="sm" />} 
                    value={`participants-${activity.id}`}
                    index={2}
                    onClick={handleMenuItemClick}
                  >
                    Manage Participants
                  </MenuItem>
                  <MenuItem 
                    icon={<Icon name="share-2" size="sm" />} 
                    value={`share-${activity.id}`}
                    index={3}
                    onClick={handleMenuItemClick}
                  >
                    Share Activity
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem 
                    icon={<Icon name="archive" size="sm" />} 
                    value={`archive-${activity.id}`}
                    index={4}
                    onClick={handleMenuItemClick}
                  >
                    Archive
                  </MenuItem>
                  <MenuItem 
                    icon={<Icon name="trash-2" size="sm" color="error" />} 
                    value={`delete-${activity.id}`}
                    index={5}
                    onClick={handleMenuItemClick}
                    disabled={activity.status === 'active'}
                  >
                    <Text color="error">Delete</Text>
                  </MenuItem>
                </Menu>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      
      {/* Advanced Menu Examples */}
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="lg" mt="xl">
        {/* Menu with right icons */}
        <Box>
          <Text as="h3" mb="md">Menu with Right Icons</Text>
          <Box position="relative">
            <Button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              variant="outline"
              width="100%"
            >
              Select an Option
            </Button>
            
            <Menu 
              isOpen={isMenuOpen} 
              onClose={() => setIsMenuOpen(false)}
              variant={variant}
            >
              <MenuItem 
                value="option1"
                index={0}
                onClick={handleMenuItemClick}
                rightIcon={<Icon name="check" size="sm" color="success" />}
              >
                Option 1
              </MenuItem>
              <MenuItem 
                value="option2"
                index={1}
                onClick={handleMenuItemClick}
                rightIcon={<Icon name="chevron-right" size="sm" />}
              >
                Option 2
              </MenuItem>
              <MenuItem 
                value="option3"
                index={2}
                onClick={handleMenuItemClick}
                rightIcon={<Text size="xs" color="text-muted">Ctrl+S</Text>}
              >
                Option 3
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        
        {/* Menu with disabled items */}
        <Box>
          <Text as="h3" mb="md">Menu with Disabled Items</Text>
          <Box position="relative">
            <Button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              variant="outline"
              width="100%"
            >
              Actions
            </Button>
            
            <Menu 
              isOpen={isMenuOpen} 
              onClose={() => setIsMenuOpen(false)}
              variant={variant}
            >
              <MenuItem 
                icon={<Icon name="edit-2" size="sm" />} 
                value="edit"
                index={0}
                onClick={handleMenuItemClick}
              >
                Edit
              </MenuItem>
              <MenuItem 
                icon={<Icon name="copy" size="sm" />} 
                value="duplicate"
                index={1}
                onClick={handleMenuItemClick}
              >
                Duplicate
              </MenuItem>
              <MenuDivider />
              <MenuItem 
                icon={<Icon name="archive" size="sm" />} 
                value="archive"
                index={2}
                onClick={handleMenuItemClick}
                disabled
              >
                Archive (Disabled)
              </MenuItem>
              <MenuItem 
                icon={<Icon name="trash-2" size="sm" color="error" />} 
                value="delete"
                index={3}
                onClick={handleMenuItemClick}
                disabled
              >
                <Text color="error">Delete (Disabled)</Text>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default MenuExample;
