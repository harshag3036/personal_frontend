import React, { useState } from 'react';
import { 
  Tabs, 
  TabList, 
  Tab, 
  TabPanel, 
  TAB_VARIANTS,
  Card
} from '../molecules';
import { 
  Text,
  Box,
  Flex,
  Button,
  Icon,
  Divider
} from '../atoms';

/**
 * TabsExample Component
 * 
 * This example demonstrates how to use the Tabs component in a real-world scenario.
 * It shows a community activity dashboard with different tabs for various aspects
 * of community management.
 */
const TabsExample = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Sample data for the example
  const activities = [
    { id: 1, title: 'Weekly Discussion', status: 'active', participants: 12 },
    { id: 2, title: 'Book Club', status: 'active', participants: 8 },
    { id: 3, title: 'Coding Challenge', status: 'upcoming', participants: 5 },
  ];
  
  const milestones = [
    { id: 1, title: 'Launch Community', completed: true },
    { id: 2, title: 'Reach 50 Members', completed: true },
    { id: 3, title: 'Complete 10 Activities', completed: false },
  ];
  
  const participants = [
    { id: 1, name: 'Jane Smith', role: 'Admin', activities: 5 },
    { id: 2, name: 'John Doe', role: 'Moderator', activities: 3 },
    { id: 3, name: 'Alice Johnson', role: 'Member', activities: 2 },
  ];

  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Box p="lg" maxWidth="800px" mx="auto">
      <Text as="h2" mb="md">Community Dashboard</Text>
      
      <Tabs 
        variant={TAB_VARIANTS.PILLS} 
        defaultTab={activeTab} 
        onChange={handleTabChange}
        className="ui-tabs--community"
      >
        <TabList>
          <Tab icon={<Icon name="activity" size="sm" />}>Activities</Tab>
          <Tab icon={<Icon name="milestone" size="sm" />}>Milestones</Tab>
          <Tab icon={<Icon name="users" size="sm" />}>Participants</Tab>
          <Tab icon={<Icon name="settings" size="sm" />}>Settings</Tab>
        </TabList>
        
        {/* Activities Tab */}
        <TabPanel>
          <Box my="md">
            <Flex justifyContent="space-between" alignItems="center" mb="md">
              <Text as="h3">Community Activities</Text>
              <Button variant="primary" size="sm">
                <Icon name="plus" size="sm" />
                New Activity
              </Button>
            </Flex>
            
            {activities.map((activity) => (
              <Card key={activity.id} mb="md" p="md">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text as="h4" mb="xs">{activity.title}</Text>
                    <Flex gap="sm" alignItems="center">
                      <Text size="sm" color="text-muted">
                        Status: <span className={`status-${activity.status}`}>{activity.status}</span>
                      </Text>
                      <Text size="sm" color="text-muted">
                        Participants: {activity.participants}
                      </Text>
                    </Flex>
                  </Box>
                  <Flex gap="sm">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Box>
        </TabPanel>
        
        {/* Milestones Tab */}
        <TabPanel>
          <Box my="md">
            <Text as="h3" mb="md">Community Milestones</Text>
            
            {milestones.map((milestone) => (
              <Card key={milestone.id} mb="md" p="md">
                <Flex alignItems="center" gap="md">
                  <Box 
                    className={`milestone-indicator ${milestone.completed ? 'completed' : 'pending'}`}
                    width="24px"
                    height="24px"
                    borderRadius="circle"
                    bg={milestone.completed ? 'success' : 'background-muted'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {milestone.completed && <Icon name="check" size="sm" color="text-on-color" />}
                  </Box>
                  <Text as="h4" mb="0">{milestone.title}</Text>
                </Flex>
              </Card>
            ))}
          </Box>
        </TabPanel>
        
        {/* Participants Tab */}
        <TabPanel>
          <Box my="md">
            <Flex justifyContent="space-between" alignItems="center" mb="md">
              <Text as="h3">Community Participants</Text>
              <Button variant="primary" size="sm">
                <Icon name="plus" size="sm" />
                Invite Member
              </Button>
            </Flex>
            
            <Card p="0" mb="md">
              <Box p="md" bg="background-muted">
                <Flex>
                  <Box flex="2"><Text weight="bold">Name</Text></Box>
                  <Box flex="1"><Text weight="bold">Role</Text></Box>
                  <Box flex="1"><Text weight="bold">Activities</Text></Box>
                  <Box flex="1"><Text weight="bold">Actions</Text></Box>
                </Flex>
              </Box>
              <Divider />
              {participants.map((participant, index) => (
                <React.Fragment key={participant.id}>
                  {index > 0 && <Divider />}
                  <Box p="md">
                    <Flex alignItems="center">
                      <Box flex="2">
                        <Text>{participant.name}</Text>
                      </Box>
                      <Box flex="1">
                        <Text size="sm">{participant.role}</Text>
                      </Box>
                      <Box flex="1">
                        <Text size="sm">{participant.activities}</Text>
                      </Box>
                      <Box flex="1">
                        <Button variant="text" size="sm">
                          <Icon name="more" size="sm" />
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                </React.Fragment>
              ))}
            </Card>
          </Box>
        </TabPanel>
        
        {/* Settings Tab */}
        <TabPanel>
          <Box my="md">
            <Text as="h3" mb="md">Community Settings</Text>
            
            <Card mb="md" p="md">
              <Text as="h4" mb="sm">General Settings</Text>
              <Divider mb="md" />
              
              <Flex direction="column" gap="md">
                <Box>
                  <Text weight="bold" mb="xs">Community Name</Text>
                  <Text size="sm" color="text-muted" mb="xs">
                    This is the name that will be displayed to all members.
                  </Text>
                  <input 
                    type="text" 
                    defaultValue="Our Community" 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem',
                      border: '1px solid #ced4da',
                      borderRadius: '4px'
                    }} 
                  />
                </Box>
                
                <Box>
                  <Text weight="bold" mb="xs">Community Description</Text>
                  <Text size="sm" color="text-muted" mb="xs">
                    Briefly describe the purpose of your community.
                  </Text>
                  <textarea 
                    defaultValue="A place for like-minded individuals to connect and collaborate." 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      minHeight: '100px'
                    }} 
                  />
                </Box>
                
                <Flex justifyContent="flex-end" mt="md">
                  <Button variant="primary">Save Changes</Button>
                </Flex>
              </Flex>
            </Card>
          </Box>
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default TabsExample;
