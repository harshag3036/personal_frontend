/**
 * Settings Component
 * 
 * This component allows users to manage application settings
 * including theme preferences and view UI component demo.
 */

import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Text, 
  Flex, 
  Stack, 
  Button, 
  Tabs, 
  Tab,
  Divider,
  Switch,
  useTheme
} from '../ui';
import UIIntegrationDemo from './UIIntegrationDemo';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');
  
  return (
    <Box maxWidth="1200px" margin="0 auto" padding="lg">
      <Text variant="h1" marginBottom="lg">Settings</Text>
      
      <Flex>
        <Box width="250px" marginRight="xl">
          <Card padding="md">
            <Stack spacing="md">
              <Button 
                variant={activeTab === 'appearance' ? 'primary' : 'text'} 
                onClick={() => setActiveTab('appearance')}
                justifyContent="flex-start"
              >
                Appearance
              </Button>
              <Button 
                variant={activeTab === 'ui-components' ? 'primary' : 'text'} 
                onClick={() => setActiveTab('ui-components')}
                justifyContent="flex-start"
              >
                UI Components
              </Button>
              <Button 
                variant={activeTab === 'account' ? 'primary' : 'text'} 
                onClick={() => setActiveTab('account')}
                justifyContent="flex-start"
              >
                Account
              </Button>
              <Button 
                variant={activeTab === 'notifications' ? 'primary' : 'text'} 
                onClick={() => setActiveTab('notifications')}
                justifyContent="flex-start"
              >
                Notifications
              </Button>
              <Button 
                variant={activeTab === 'privacy' ? 'primary' : 'text'} 
                onClick={() => setActiveTab('privacy')}
                justifyContent="flex-start"
              >
                Privacy
              </Button>
            </Stack>
          </Card>
        </Box>
        
        <Box flex="1">
          {activeTab === 'appearance' && (
            <Card padding="lg">
              <Text variant="h2" marginBottom="md">Appearance Settings</Text>
              <Divider marginBottom="lg" />
              
              <Box marginBottom="xl">
                <Text variant="h3" marginBottom="md">Theme</Text>
                <Text variant="body1" marginBottom="md">Choose how the application looks to you.</Text>
                
                <Flex gap="md">
                  <Card 
                    padding="lg" 
                    backgroundColor="background-default" 
                    borderColor={theme === 'light' ? 'primary-500' : 'border-light'} 
                    borderWidth={theme === 'light' ? '2px' : '1px'}
                    cursor="pointer"
                    onClick={() => setTheme('light')}
                    width="150px"
                    textAlign="center"
                  >
                    <Box backgroundColor="white" height="80px" marginBottom="sm" borderRadius="md"/>
                    <Text>Light Mode</Text>
                  </Card>
                  
                  <Card 
                    padding="lg" 
                    backgroundColor="background-dark" 
                    color="text-light"
                    borderColor={theme === 'dark' ? 'primary-500' : 'border-light'} 
                    borderWidth={theme === 'dark' ? '2px' : '1px'}
                    cursor="pointer"
                    onClick={() => setTheme('dark')}
                    width="150px"
                    textAlign="center"
                  >
                    <Box backgroundColor="#222" height="80px" marginBottom="sm" borderRadius="md"/>
                    <Text>Dark Mode</Text>
                  </Card>
                </Flex>
              </Box>
              
              <Box>
                <Text variant="h3" marginBottom="md">Font Size</Text>
                <Text variant="body1" marginBottom="md">Adjust the text size for comfortable reading.</Text>
                
                <Flex gap="md" alignItems="center">
                  <Text>A</Text>
                  <input 
                    type="range" 
                    min="80" 
                    max="120" 
                    defaultValue="100"
                    style={{ width: '200px' }}
                  />
                  <Text>A</Text>
                </Flex>
              </Box>
            </Card>
          )}
          
          {activeTab === 'ui-components' && (
            <UIIntegrationDemo />
          )}
          
          {activeTab === 'account' && (
            <Card padding="lg">
              <Text variant="h2" marginBottom="md">Account Settings</Text>
              <Divider marginBottom="lg" />
              <Text variant="body1">Account settings are currently unavailable.</Text>
            </Card>
          )}
          
          {activeTab === 'notifications' && (
            <Card padding="lg">
              <Text variant="h2" marginBottom="md">Notification Settings</Text>
              <Divider marginBottom="lg" />
              
              <Box marginBottom="xl">
                <Text variant="h3" marginBottom="md">Notification Preferences</Text>
                <Stack spacing="md">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Comments on your posts</Text>
                    <Switch defaultChecked />
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Likes on your content</Text>
                    <Switch defaultChecked />
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Mentions in discussions</Text>
                    <Switch defaultChecked />
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>New followers</Text>
                    <Switch defaultChecked />
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Community updates</Text>
                    <Switch defaultChecked />
                  </Flex>
                </Stack>
              </Box>
              
              <Box>
                <Text variant="h3" marginBottom="md">Email Notifications</Text>
                <Stack spacing="md">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Send email notifications</Text>
                    <Switch defaultChecked />
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Daily digest</Text>
                    <Switch />
                  </Flex>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>Weekly summary</Text>
                    <Switch defaultChecked />
                  </Flex>
                </Stack>
              </Box>
            </Card>
          )}
          
          {activeTab === 'privacy' && (
            <Card padding="lg">
              <Text variant="h2" marginBottom="md">Privacy Settings</Text>
              <Divider marginBottom="lg" />
              <Text variant="body1">Privacy settings are currently unavailable.</Text>
            </Card>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Settings;
