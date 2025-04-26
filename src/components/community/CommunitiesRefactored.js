/**
 * Communities Component (Refactored with UI Library)
 * 
 * A clean, minimal implementation using UI components with focus on
 * functionality and readability.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Text, 
  Button,
  Input,
  Badge,
  Flex,
  Grid,
  Stack,
  Card,
  useTheme
} from '../../ui';

const CommunitiesRefactored = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('open');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with actual data fetching
  const allCommunities = {
    open: [
      {
        id: 'badminton',
        name: 'Badminton Enthusiasts',
        description: 'Connect with fellow badminton players, organize matches, and improve together',
        category: 'Sports',
        memberCount: 1200,
        activityCount: 156,
        lastActive: '2 hours ago',
        type: 'open'
      },
      {
        id: 'film',
        name: 'Film Analysis',
        description: 'Deep dive into cinema, analyze techniques, and explore storytelling',
        category: 'Arts',
        memberCount: 850,
        activityCount: 243,
        lastActive: '5 minutes ago',
        type: 'open'
      }
    ],
    private: [
      {
        id: 'meditation',
        name: 'Mindful Meditation Circle',
        description: 'A private group for deep meditation practice and sharing experiences',
        category: 'Wellness',
        memberCount: 15,
        activityCount: 45,
        lastActive: '1 hour ago',
        type: 'private'
      },
      {
        id: 'philosophy',
        name: 'Philosophy Study Group',
        description: 'Exploring philosophical texts and discussing their practical applications',
        category: 'Philosophy',
        memberCount: 12,
        activityCount: 78,
        lastActive: '30 minutes ago',
        type: 'private'
      }
    ]
  };

  // Available categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts' },
    { value: 'technology', label: 'Technology' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'philosophy', label: 'Philosophy' }
  ];

  const filterCommunities = () => {
    const communities = allCommunities[activeTab];
    return communities.filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                            community.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  };

  const communities = filterCommunities();

  const handleCommunityClick = (id) => {
    navigate(`/community-refactored/${id}`);
  };

  const handleCreateCommunity = () => {
    navigate('/community/new');
  };

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="30px 20px">
      {/* Page Header */}
      <Flex 
        width="100%" 
        justifyContent="space-between" 
        alignItems="flex-start"
        marginBottom="30px"
        direction={{ base: "column", md: "row" }}
        gap={{ base: "15px", md: "0" }}
      >
        <Stack spacing="4">
          <Text 
            as="h1" 
            fontSize="28px"
            fontWeight="700" 
            color={theme === 'dark' ? 'white' : 'gray.800'}
          >
            Communities
          </Text>
          <Text 
            fontSize="16px"
            color={theme === 'dark' ? 'gray.300' : 'gray.600'}
          >
            Find and join communities based on your interests
          </Text>
        </Stack>
          
        <Button 
          variant="outline"
          size="sm"
          borderRadius="md"
          onClick={() => navigate('/community')}
        >
          Back to Classic UI
        </Button>
      </Flex>

      {/* Search and Filters */}
      <Flex 
        direction={{ base: "column", md: "row" }}
        gap="15px"
        marginBottom="25px"
        width="100%"
      >
        <Input
          flex="2"
          placeholder="Search communities..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Box 
          as="select"
          flex="1"
          maxWidth={{ base: "100%", md: "200px" }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value.toLowerCase())}
          borderColor={theme === 'dark' ? 'gray.600' : 'gray.300'}
          borderRadius="md"
          padding="8px 12px"
          backgroundColor={theme === 'dark' ? 'gray.700' : 'white'}
          color={theme === 'dark' ? 'white' : 'gray.800'}
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Box>
      </Flex>
      
      {/* Create Community Button */}
      <Box width="100%" marginBottom="25px">
        <Button 
          width="100%"
          variant="primary"
          onClick={handleCreateCommunity}
        >
          Create New Community
        </Button>
      </Box>
      
      {/* Tabs */}
      <Flex 
        borderBottom="1px solid" 
        borderColor={theme === 'dark' ? 'gray.700' : 'gray.200'}
        marginBottom="25px"
      >
        <Box 
          paddingX="20px"
          paddingY="10px"
          borderBottom={activeTab === 'open' ? '2px solid' : 'none'}
          borderColor={activeTab === 'open' ? 'blue.500' : 'transparent'}
          color={activeTab === 'open' ? (theme === 'dark' ? 'blue.300' : 'blue.500') : (theme === 'dark' ? 'gray.400' : 'gray.500')}
          fontWeight={activeTab === 'open' ? '600' : 'normal'}
          cursor="pointer"
          onClick={() => setActiveTab('open')}
        >
          Open Communities
        </Box>
        
        <Box 
          paddingX="20px"
          paddingY="10px"
          borderBottom={activeTab === 'private' ? '2px solid' : 'none'}
          borderColor={activeTab === 'private' ? 'blue.500' : 'transparent'}
          color={activeTab === 'private' ? (theme === 'dark' ? 'blue.300' : 'blue.500') : (theme === 'dark' ? 'gray.400' : 'gray.500')}
          fontWeight={activeTab === 'private' ? '600' : 'normal'}
          cursor="pointer"
          onClick={() => setActiveTab('private')}
        >
          Private Circles
        </Box>
      </Flex>
      
      {/* Communities Grid */}
      {communities.length > 0 ? (
        <Grid
          templateColumns={{ 
            base: "1fr", 
            md: "repeat(2, 1fr)", 
            lg: "repeat(3, 1fr)" 
          }}
          gap="20px"
          width="100%"
        >
          {communities.map(community => (
            <Card 
              key={community.id}
              backgroundColor={theme === 'dark' ? 'gray.800' : 'white'}
              borderRadius="md"
              overflow="hidden"
              padding="0"
              cursor="pointer"
              onClick={() => handleCommunityClick(community.id)}
              _hover={{
                boxShadow: theme === 'dark' ? '0 0 0 1px #4299E1' : '0 0 0 1px #3182CE',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.2s"
            >
              <Box 
                height="5px" 
                width="100%" 
                backgroundColor={
                  community.category === 'Sports' ? 'blue.500' :
                  community.category === 'Arts' ? 'purple.500' :
                  community.category === 'Wellness' ? 'orange.500' :
                  community.category === 'Philosophy' ? 'cyan.500' :
                  'gray.500'
                }
              />
              <Box padding="20px">
                <Flex justifyContent="space-between" alignItems="center" marginBottom="10px">
                  <Badge 
                    colorScheme={
                      community.category === 'Sports' ? 'blue' :
                      community.category === 'Arts' ? 'purple' :
                      community.category === 'Wellness' ? 'orange' :
                      community.category === 'Philosophy' ? 'cyan' :
                      'gray'
                    }
                  >
                    {community.category}
                  </Badge>
                  
                  <Text fontSize="14px" color={theme === 'dark' ? 'gray.400' : 'gray.500'}>
                    {community.type === 'private' ? 'Private' : 'Open'}
                  </Text>
                </Flex>

                <Text 
                  fontSize="18px" 
                  fontWeight="600" 
                  marginBottom="8px"
                  color={theme === 'dark' ? 'white' : 'gray.800'}
                >
                  {community.name}
                </Text>
                
                <Text 
                  fontSize="14px" 
                  color={theme === 'dark' ? 'gray.300' : 'gray.600'} 
                  marginBottom="16px"
                  noOfLines={2}
                  height="42px"
                >
                  {community.description}
                </Text>
                
                <Flex 
                  borderTop="1px solid" 
                  borderColor={theme === 'dark' ? 'gray.700' : 'gray.100'} 
                  paddingTop="12px"
                  justifyContent="space-between"
                >
                  <Flex gap="20px">
                    <Stack spacing="0">
                      <Text 
                        fontWeight="600"
                        fontSize="16px"
                        color={theme === 'dark' ? 'white' : 'gray.800'}
                      >
                        {community.memberCount}
                      </Text>
                      <Text 
                        fontSize="14px"
                        color={theme === 'dark' ? 'gray.400' : 'gray.500'}
                      >
                        Members
                      </Text>
                    </Stack>
                    
                    <Stack spacing="0">
                      <Text 
                        fontWeight="600"
                        fontSize="16px"
                        color={theme === 'dark' ? 'white' : 'gray.800'}
                      >
                        {community.activityCount}
                      </Text>
                      <Text 
                        fontSize="14px"
                        color={theme === 'dark' ? 'gray.400' : 'gray.500'}
                      >
                        Activities
                      </Text>
                    </Stack>
                  </Flex>
                  
                  <Text 
                    fontSize="13px"
                    color={theme === 'dark' ? 'gray.400' : 'gray.500'}
                    alignSelf="flex-end"
                  >
                    {community.lastActive}
                  </Text>
                </Flex>
              </Box>
            </Card>
          ))}
        </Grid>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          padding="50px 20px"
          backgroundColor={theme === 'dark' ? 'gray.800' : 'gray.50'}
          borderRadius="md"
          width="100%"
        >
          <Text 
            fontSize="18px"
            fontWeight="600"
            marginBottom="15px"
            color={theme === 'dark' ? 'white' : 'gray.800'}
          >
            No communities found matching your criteria
          </Text>
          
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear filters
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default CommunitiesRefactored;
