import React, { useState } from 'react';
import { 
  Pagination, 
  PAGINATION_VARIANTS, 
  PAGINATION_SIZES, 
  PAGINATION_SHAPES 
} from '../molecules';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Grid
} from '../atoms';
import { Card } from '../molecules';

/**
 * PaginationExample Component
 * 
 * This example demonstrates how to use the Pagination component in a real-world scenario.
 * It shows a community activity list with pagination for navigating through pages.
 */
const PaginationExample = () => {
  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for the pagination variant
  const [variant, setVariant] = useState('default');
  
  // State for the pagination size
  const [size, setSize] = useState('md');
  
  // State for the pagination shape
  const [shape, setShape] = useState('rounded');
  
  // Total number of pages
  const totalPages = 10;
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Sample activity data (simulating different pages)
  const getActivitiesForPage = (page) => {
    const baseActivities = [
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
      {
        id: 4,
        title: 'Meditation Workshop',
        type: 'Workshop',
        date: 'July 20, 2025',
        participants: 15,
        status: 'upcoming',
      },
      {
        id: 5,
        title: 'Community Garden Project',
        type: 'Project',
        date: 'Weekends',
        participants: 30,
        status: 'active',
      },
    ];
    
    // Offset the IDs based on the page to simulate different data
    return baseActivities.map(activity => ({
      ...activity,
      id: activity.id + (page - 1) * 5,
      title: `${activity.title} - Page ${page}`,
    }));
  };
  
  // Get activities for the current page
  const activities = getActivitiesForPage(currentPage);
  
  return (
    <Box maxWidth="900px" mx="auto" p="lg">
      <Text as="h2" mb="lg">Community Activity List</Text>
      
      {/* Controls for the example */}
      <Box mb="xl" p="md" borderRadius="md" bg="background-muted">
        <Text as="h3" mb="md">Pagination Controls</Text>
        
        {/* Variant controls */}
        <Box mb="md">
          <Text fontWeight="medium" mb="xs">Variant:</Text>
          <Flex gap="md" flexWrap="wrap">
            {Object.entries(PAGINATION_VARIANTS).map(([key, value]) => (
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
        
        {/* Size controls */}
        <Box mb="md">
          <Text fontWeight="medium" mb="xs">Size:</Text>
          <Flex gap="md">
            {Object.entries(PAGINATION_SIZES).map(([key, value]) => (
              <Button 
                key={value} 
                size="sm" 
                variant={size === value ? 'primary' : 'outline'}
                onClick={() => setSize(value)}
              >
                {key.replace('_', ' ')}
              </Button>
            ))}
          </Flex>
        </Box>
        
        {/* Shape controls */}
        <Box>
          <Text fontWeight="medium" mb="xs">Shape:</Text>
          <Flex gap="md">
            {Object.entries(PAGINATION_SHAPES).map(([key, value]) => (
              <Button 
                key={value} 
                size="sm" 
                variant={shape === value ? 'primary' : 'outline'}
                onClick={() => setShape(value)}
              >
                {key.replace('_', ' ')}
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>
      
      {/* Current page display */}
      <Box 
        mb="lg" 
        p="md" 
        borderRadius="md" 
        bg="primary-50" 
        color="primary-700"
      >
        <Text>Current Page: {currentPage} of {totalPages}</Text>
      </Box>
      
      {/* Activity list */}
      <Box mb="xl">
        <Text as="h3" mb="md">Activities</Text>
        
        {activities.map((activity) => (
          <Card 
            key={activity.id}
            p="lg" 
            mb="md" 
            borderRadius="md" 
            boxShadow="sm" 
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
                  <Text size="sm" color="text-muted">Type: {activity.type}</Text>
                  <Text size="sm" color="text-muted">Date: {activity.date}</Text>
                  <Text size="sm" color="text-muted">Participants: {activity.participants}</Text>
                </Flex>
              </Box>
              
              <Button variant="outline" size="sm">View Details</Button>
            </Flex>
          </Card>
        ))}
      </Box>
      
      {/* Pagination examples */}
      <Box mb="xl">
        <Text as="h3" mb="md">Basic Pagination</Text>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
          variant={variant}
          size={size}
          shape={shape}
        />
      </Box>
      
      {/* More pagination examples */}
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="lg" mt="xl">
        {/* Minimal pagination */}
        <Box>
          <Text as="h3" mb="md">Minimal Pagination</Text>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
            variant="minimal"
            size={size}
            shape={shape}
            showFirstButton={false}
            showLastButton={false}
          />
        </Box>
        
        {/* Compact pagination */}
        <Box>
          <Text as="h3" mb="md">Compact Pagination</Text>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
            variant={variant}
            size="sm"
            shape="pill"
            siblingCount={0}
            boundaryCount={1}
          />
        </Box>
      </Grid>
      
      {/* Responsive pagination */}
      <Box mt="xl">
        <Text as="h3" mb="md">Responsive Pagination</Text>
        <Text size="sm" color="text-muted" mb="md">
          Resize your browser window to see how the pagination adapts to different screen sizes.
          On small screens, the first and last buttons are hidden.
        </Text>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
          variant={variant}
          size={size}
          shape={shape}
        />
      </Box>
    </Box>
  );
};

export default PaginationExample;
