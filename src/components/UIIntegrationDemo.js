/**
 * UI Integration Demo
 * 
 * This component demonstrates the integration of the UI component library
 * into the main application, showcasing theming and component usage.
 */

import React, { useState } from 'react';
import { 
  Box, 
  Text, 
  Button, 
  Grid, 
  Card, 
  Flex,
  Stack,
  Badge,
  Tabs,
  Tab,
  useTheme
} from '../ui';
import UIComponentDemo from '../ui/examples/UIComponentDemo';
import CommunitiesRefactored from './community/CommunitiesRefactored';
import ActivityCardRefactored from './community/ActivityCardRefactored';
import ActivityDisplayRefactored from './community/ActivityDisplayRefactored';
import StatusBadgeRefactored from './community/shared/StatusBadgeRefactored';

// Mock data for activity display
const mockActivities = [
  {
    id: '1',
    title: 'Weekly Meditation Session',
    description: 'Join our weekly meditation session to practice mindfulness techniques and discuss your experiences.',
    type: 'event',
    category: 'wellness',
    status: 'active',
    createdAt: '2025-04-01T10:00:00Z',
    tags: ['meditation', 'mindfulness', 'weekly'],
    participants: [
      { id: '101', name: 'Alex Chen', avatar: null },
      { id: '102', name: 'Maya Patel', avatar: null },
      { id: '103', name: 'Jordan Kim', avatar: null },
      { id: '104', name: 'Taylor Swift', avatar: null }
    ]
  },
  {
    id: '2',
    title: 'Book Club: "The Silent World"',
    description: 'Discussion of this month\'s book "The Silent World" by Jacques Cousteau. Exploring themes of ocean conservation and exploration.',
    type: 'discussion',
    category: 'literature',
    status: 'upcoming',
    createdAt: '2025-04-02T14:30:00Z',
    tags: ['books', 'ocean', 'conservation'],
    participants: [
      { id: '201', name: 'Robin Singh', avatar: null },
      { id: '202', name: 'Elena Gomez', avatar: null }
    ]
  },
  {
    id: '3',
    title: 'Beginner\'s Python Workshop',
    description: 'Learn the basics of Python programming in this interactive workshop. No prior experience required.',
    type: 'workshop',
    category: 'technology',
    status: 'completed',
    createdAt: '2025-03-20T09:15:00Z',
    progress: 100,
    tags: ['python', 'coding', 'beginners'],
    participants: [
      { id: '301', name: 'Chris Thompson', avatar: null },
      { id: '302', name: 'Aisha Khan', avatar: null },
      { id: '303', name: 'David Chen', avatar: null }
    ]
  }
];

// Mock activity type configuration
const mockTypeConfig = {
  event: { icon: '📅', color: '#4CAF50', label: 'Event' },
  discussion: { icon: '💬', color: '#2196F3', label: 'Discussion' },
  workshop: { icon: '🛠️', color: '#FF9800', label: 'Workshop' },
  challenge: { icon: '🏆', color: '#9C27B0', label: 'Challenge' },
  project: { icon: '📋', color: '#607D8B', label: 'Project' }
};

// Mock categories
const mockCategories = [
  { value: 'wellness', label: 'Wellness', icon: '🧘' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'literature', label: 'Literature', icon: '📚' },
  { value: 'art', label: 'Art', icon: '🎨' },
  { value: 'music', label: 'Music', icon: '🎵' }
];

// Mock status options
const mockStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'draft', label: 'Draft' }
];

// Format date helper function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const UIIntegrationDemo = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('components');
  const [viewMode, setViewMode] = useState('grid');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Box maxWidth="1200px" margin="0 auto" padding="lg">
      <Card padding="lg" marginBottom="xl">
        <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
          <Text variant="h1" color="text-primary">UI Library Integration Demo</Text>
          <Button 
            variant="primary" 
            onClick={toggleTheme}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </Button>
        </Flex>
        
        <Text variant="body1" marginBottom="lg">
          This demo showcases the integration of the UI component library with the main application.
          The components below use the UI library's components for consistent styling and theming.
        </Text>
        
        <Tabs 
          value={activeTab}
          onChange={(tab) => setActiveTab(tab)}
          marginBottom="xl"
        >
          <Tab value="components" label="UI Components" />
          <Tab value="enhanced" label="Enhanced Components" />
          <Tab value="communities" label="Communities Component" />
          <Tab value="activities" label="Activities Component" />
        </Tabs>
        
        {activeTab === 'components' && (
          <>
            <Text variant="h2" marginBottom="md">UI Components Showcase</Text>
            
            <Grid columns={{ base: 1, md: 2 }} gap="lg" marginBottom="xl">
              <Card padding="md" backgroundColor="background-secondary">
                <Text variant="h3" marginBottom="sm">Button Variants</Text>
                <Flex gap="sm" marginBottom="md" wrap="wrap">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="text">Text</Button>
                </Flex>
                
                <Text variant="h3" marginBottom="sm">Button Sizes</Text>
                <Flex gap="sm" alignItems="center" marginBottom="md">
                  <Button variant="primary" size="small">Small</Button>
                  <Button variant="primary" size="medium">Medium</Button>
                  <Button variant="primary" size="large">Large</Button>
                </Flex>
              </Card>
              
              <Card padding="md" backgroundColor="background-secondary">
                <Text variant="h3" marginBottom="sm">Text Variants</Text>
                <Stack spacing="sm">
                  <Text variant="h1">Heading 1</Text>
                  <Text variant="h2">Heading 2</Text>
                  <Text variant="h3">Heading 3</Text>
                  <Text variant="body1">Body 1 text for regular paragraphs</Text>
                  <Text variant="body2">Body 2 text for smaller content</Text>
                  <Text variant="caption">Caption text for supplementary information</Text>
                </Stack>
              </Card>
            </Grid>
            
            <Text variant="h2" marginBottom="md">Badge Component</Text>
            <Flex gap="md" marginBottom="xl" wrap="wrap">
              <Badge variant="primary">Primary Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="success">Success Badge</Badge>
              <Badge variant="error">Error Badge</Badge>
              <Badge variant="warning">Warning Badge</Badge>
              <Badge variant="info">Info Badge</Badge>
            </Flex>
            
            <Text variant="h2" marginBottom="md">Status Badge Component</Text>
            <Flex gap="md" marginBottom="xl" wrap="wrap">
              <StatusBadgeRefactored status="active" />
              <StatusBadgeRefactored status="completed" />
              <StatusBadgeRefactored status="draft" />
              <StatusBadgeRefactored status="pending" />
              <StatusBadgeRefactored status="rejected" />
              <StatusBadgeRefactored status="warning" />
            </Flex>
          </>
        )}
        
        {activeTab === 'communities' && (
          <>
            <Text variant="h2" marginBottom="lg">Refactored Communities Component</Text>
            <Box border="1px solid" borderColor="border-light" borderRadius="md" marginBottom="xl">
              <CommunitiesRefactored />
            </Box>
          </>
        )}
        
        {activeTab === 'activities' && (
          <>
            <Text variant="h2" marginBottom="md">Activity Components</Text>
            
            <Flex justifyContent="space-between" alignItems="center" marginBottom="lg">
              <Text variant="h3">View Mode</Text>
              <Flex gap="sm">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => setViewMode('list')}
                >
                  List View
                </Button>
              </Flex>
            </Flex>
            
            <Card padding="lg" marginBottom="xl">
              <Text variant="h3" marginBottom="md">Activity Cards</Text>
              
              <ActivityDisplayRefactored 
                displayedActivities={mockActivities}
                viewMode={viewMode}
                groupBy="none"
                handleActivityClick={(id) => console.log(`Activity clicked: ${id}`)}
                typeConfig={mockTypeConfig}
                categories={mockCategories}
                statusOptions={mockStatusOptions}
                formatDate={formatDate}
              />
            </Card>
            
            <Card padding="lg">
              <Text variant="h3" marginBottom="md">Grouped by Type</Text>
              
              <ActivityDisplayRefactored 
                displayedActivities={mockActivities}
                viewMode={viewMode}
                groupBy="type"
                handleActivityClick={(id) => console.log(`Activity clicked: ${id}`)}
                typeConfig={mockTypeConfig}
                categories={mockCategories}
                statusOptions={mockStatusOptions}
                formatDate={formatDate}
              />
            </Card>
          </>
        )}
      </Card>
      
      <Box textAlign="center" marginY="xl">
        <Text variant="body2" color="text-secondary">
          Current theme: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </Text>
        <Button variant="outline" size="small" onClick={toggleTheme} marginTop="sm">
          Toggle Theme
        </Button>
      </Box>
    </Box>
  );
};

export default UIIntegrationDemo;
