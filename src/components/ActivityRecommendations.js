/**
 * ActivityRecommendations Component
 * 
 * Provides personalized activity recommendations based on user interests,
 * participation history, and community involvement.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Stack,
  Grid,
  Card,
  Button,
  Badge
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const ActivityRecommendations = ({ onViewActivity, onCreateActivity }) => {
  const { 
    getAllActivities, 
    getUserActivities,
    getGlobalActivities,
    getUserInterests,
  } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();
  
  const [recommendations, setRecommendations] = useState({
    forYou: [],
    popular: [],
    newActivities: [],
    basedOnInterests: [],
    fromCommunities: [],
  });
  
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize recommendation categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Get all necessary data
      const allActivities = getAllActivities();
      const userActivities = getUserActivities();
      const userInterests = getUserInterests ? await getUserInterests() : ['technology', 'design', 'productivity'];
      
      // Set interests for display
      setInterests(userInterests);
      
      // Generate recommendations
      const recommendationsData = generateRecommendations(allActivities, userActivities, userInterests);
      setRecommendations(recommendationsData);
      
      setLoading(false);
    };
    
    fetchData();
  }, [getAllActivities, getUserActivities, getUserInterests, user?.id]);
  
  // Generate recommendations based on various factors
  const generateRecommendations = (allActivities, userActivities, userInterests) => {
    // In a real implementation, this would use more sophisticated algorithms,
    // possibly machine learning to generate truly personalized recommendations
    
    // For now, we'll use simpler heuristics
    
    // Activities the user hasn't joined yet
    const notJoinedActivities = allActivities.filter(activity => 
      !userActivities.some(ua => ua.id === activity.id)
    );
    
    // Get a list of communities the user is active in
    const userCommunityIds = [...new Set(userActivities
      .filter(a => a.communityId || a.circleId)
      .map(a => a.communityId || a.circleId))];
    
    // For You: Personalized recommendations based on various factors
    const forYou = notJoinedActivities
      .filter(activity => {
        // Activities from communities the user is already part of get a boost
        const fromUserCommunity = userCommunityIds.includes(activity.communityId || activity.circleId);
        
        // Activities that match user interests get a boost
        const matchesInterests = userInterests.some(interest => 
          activity.tags?.includes(interest) || 
          activity.category === interest ||
          activity.title.toLowerCase().includes(interest.toLowerCase()) ||
          (activity.description && activity.description.toLowerCase().includes(interest.toLowerCase()))
        );
        
        // Activities that are active and have participants get a boost
        const isActiveWithParticipants = 
          activity.status === 'active' && 
          activity.participants && 
          activity.participants.length > 0;
        
        // Combine factors - need at least one positive factor
        return fromUserCommunity || matchesInterests || isActiveWithParticipants;
      })
      .sort((a, b) => {
        // Sort by relevance score (mock implementation)
        const scoreA = calculateRelevanceScore(a, userActivities, userInterests, userCommunityIds);
        const scoreB = calculateRelevanceScore(b, userActivities, userInterests, userCommunityIds);
        return scoreB - scoreA;
      })
      .slice(0, 5); // Top 5
    
    // Popular: Activities with most participants
    const popular = [...notJoinedActivities]
      .sort((a, b) => {
        const aParticipants = a.participants?.length || 0;
        const bParticipants = b.participants?.length || 0;
        return bParticipants - aParticipants;
      })
      .slice(0, 5); // Top 5
    
    // New Activities: Most recently created
    const newActivities = [...notJoinedActivities]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 5); // Top 5
    
    // Based on Interests: Match user interests
    const basedOnInterests = notJoinedActivities
      .filter(activity => 
        userInterests.some(interest => 
          activity.tags?.includes(interest) || 
          activity.category === interest ||
          activity.title.toLowerCase().includes(interest.toLowerCase()) ||
          (activity.description && activity.description.toLowerCase().includes(interest.toLowerCase()))
        )
      )
      .sort((a, b) => {
        // Sort by how many interests match
        const matchesA = countInterestMatches(a, userInterests);
        const matchesB = countInterestMatches(b, userInterests);
        return matchesB - matchesA;
      })
      .slice(0, 5); // Top 5
    
    // From Communities: Activities from communities the user is already in
    const fromCommunities = notJoinedActivities
      .filter(activity => 
        userCommunityIds.includes(activity.communityId || activity.circleId)
      )
      .sort((a, b) => {
        // Sort by recency
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 5); // Top 5
    
    return {
      forYou,
      popular,
      newActivities,
      basedOnInterests,
      fromCommunities
    };
  };
  
  // Helper function to calculate a relevance score for an activity
  const calculateRelevanceScore = (activity, userActivities, userInterests, userCommunityIds) => {
    let score = 0;
    
    // Community match
    if (userCommunityIds.includes(activity.communityId || activity.circleId)) {
      score += 5;
    }
    
    // Interest matches
    const interestMatches = countInterestMatches(activity, userInterests);
    score += interestMatches * 3;
    
    // Activity type match - does the user often participate in this type?
    const userTypePreference = userActivities.filter(a => 
      a.type === activity.type || a.category === activity.category
    ).length;
    score += userTypePreference * 2;
    
    // Popularity boost
    score += (activity.participants?.length || 0) * 0.5;
    
    // Recency boost - newer activities get a boost
    const ageInDays = (new Date() - new Date(activity.createdAt)) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 10 - ageInDays); // Up to 10 points for very recent activities
    
    // Status boost - active activities get a boost
    if (activity.status === 'active') {
      score += 3;
    }
    
    return score;
  };
  
  // Count how many user interests match an activity
  const countInterestMatches = (activity, userInterests) => {
    return userInterests.filter(interest => 
      activity.tags?.includes(interest) || 
      activity.category === interest ||
      activity.title.toLowerCase().includes(interest.toLowerCase()) ||
      (activity.description && activity.description.toLowerCase().includes(interest.toLowerCase()))
    ).length;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Render a recommendation card
  const RecommendationCard = ({ activity, reason }) => {
    // Activity type configuration
    const typeConfig = {
      discussion: { icon: '🌱', color: '#4caf50' },
      event: { icon: '📅', color: '#2196f3' },
      project: { icon: '🎯', color: '#9c27b0' },
      'skill-share': { icon: '🎓', color: '#ff9800' },
      resource: { icon: '📚', color: '#795548' },
      challenge: { icon: '🏆', color: '#f44336' },
      wellness: { icon: '🧘', color: '#009688' }
    };
    
    const type = activity.type || activity.category || 'discussion';
    const typeInfo = typeConfig[type] || { icon: '📋', color: '#607d8b' };
    
    // Find community info if available
    const communityId = activity.communityId || activity.circleId;
    const community = communityId ? 
      communities.find(c => c.id === communityId) : null;
    
    return (
      <Card 
        padding="md"
        marginBottom="sm"
        boxShadow="sm"
        borderLeft="4px solid"
        borderLeftColor={typeInfo.color}
        cursor="pointer"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
        transition="all 0.2s ease"
        onClick={() => onViewActivity(activity.id)}
      >
        <Flex justifyContent="space-between" marginBottom="xs">
          <Flex alignItems="center" gap="xs">
            <Text>{typeInfo.icon}</Text>
            <Text fontWeight="bold">{activity.title}</Text>
          </Flex>
          
          <Badge variant={
            activity.status === 'active' ? 'success' :
            activity.status === 'upcoming' ? 'info' :
            'outline'
          }>
            {activity.status}
          </Badge>
        </Flex>
        
        {activity.description && (
          <Text fontSize="sm" marginBottom="sm" color="text-secondary">
            {activity.description.substring(0, 100)}
            {activity.description.length > 100 ? '...' : ''}
          </Text>
        )}
        
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="sm">
            {community && (
              <Text fontSize="xs" color="text-secondary">
                {community.name}
              </Text>
            )}
            
            <Text fontSize="xs" color="text-secondary">
              {activity.participants?.length || 0} participants
            </Text>
            
            {activity.startDate && (
              <Text fontSize="xs" color="text-secondary">
                Starts {formatDate(activity.startDate)}
              </Text>
            )}
          </Flex>
          
          {reason && (
            <Text fontSize="xs" color="primary" fontStyle="italic">
              {reason}
            </Text>
          )}
        </Flex>
      </Card>
    );
  };
  
  // Render a personalized reason for recommendation
  const getRecommendationReason = (activity, category) => {
    switch (category) {
      case 'forYou':
        // Customize based on what factors made this a "for you" recommendation
        const matchingInterests = interests.filter(interest => 
          activity.tags?.includes(interest) || 
          activity.category === interest ||
          activity.title.toLowerCase().includes(interest.toLowerCase()) ||
          (activity.description && activity.description.toLowerCase().includes(interest.toLowerCase()))
        );
        
        if (matchingInterests.length > 0) {
          return `Matches your interest in ${matchingInterests[0]}`;
        }
        
        const communityId = activity.communityId || activity.circleId;
        if (communityId) {
          const community = communities.find(c => c.id === communityId);
          if (community) {
            return `From ${community.name}`;
          }
        }
        
        return 'Recommended for you';
        
      case 'popular':
        return `${activity.participants?.length || 0} people joined`;
        
      case 'newActivities':
        const daysAgo = Math.floor((new Date() - new Date(activity.createdAt)) / (1000 * 60 * 60 * 24));
        return daysAgo === 0 ? 'Just added today' : `Added ${daysAgo} days ago`;
        
      case 'basedOnInterests':
        const matching = interests.filter(interest => 
          activity.tags?.includes(interest) || 
          activity.category === interest ||
          activity.title.toLowerCase().includes(interest.toLowerCase()) ||
          (activity.description && activity.description.toLowerCase().includes(interest.toLowerCase()))
        );
        return matching.length > 0 ? 
          `Matches your interest in ${matching[0]}` : 
          'Based on your interests';
        
      case 'fromCommunities':
        const cId = activity.communityId || activity.circleId;
        if (cId) {
          const community = communities.find(c => c.id === cId);
          if (community) {
            return `From ${community.name}`;
          }
        }
        return 'From your communities';
        
      default:
        return '';
    }
  };
  
  // Render a section of recommendations
  const renderRecommendationSection = (title, activities, category) => {
    return (
      <Box marginBottom="xl">
        <Text variant="h3" marginBottom="md">{title}</Text>
        
        {activities.length > 0 ? (
          <Stack spacing="md">
            {activities.map(activity => (
              <RecommendationCard 
                key={activity.id} 
                activity={activity} 
                reason={getRecommendationReason(activity, category)}
              />
            ))}
          </Stack>
        ) : (
          <Box padding="lg" backgroundColor="background-alt" borderRadius="md" textAlign="center">
            <Text marginBottom="md">No recommendations available</Text>
          </Box>
        )}
      </Box>
    );
  };
  
  // Render interests tags
  const renderInterests = () => {
    return (
      <Box marginBottom="xl">
        <Flex justifyContent="space-between" alignItems="center" marginBottom="sm">
          <Text variant="h3">Your Interests</Text>
          <Button size="sm" variant="outline">Edit Interests</Button>
        </Flex>
        
        <Flex flexWrap="wrap" gap="sm">
          {interests.map((interest, index) => (
            <Badge key={index} variant="outline" padding="xs">
              {interest}
            </Badge>
          ))}
        </Flex>
      </Box>
    );
  };
  
  // Main render
  return (
    <Box className="activity-recommendations" maxWidth="1200px" margin="0 auto">
      <Box marginBottom="xl">
        <Text variant="h1" marginBottom="md">Discover Activities</Text>
        <Text variant="body1">
          Personalized recommendations based on your interests and community involvement.
        </Text>
      </Box>
      
      {/* Display interests */}
      {renderInterests()}
      
      {/* Loading state */}
      {loading ? (
        <Box padding="xl" textAlign="center">
          <Text>Loading recommendations...</Text>
        </Box>
      ) : (
        <>
          {/* For You section */}
          {renderRecommendationSection(
            'Recommended For You', 
            recommendations.forYou,
            'forYou'
          )}
          
          {/* Popular section */}
          {renderRecommendationSection(
            'Popular Activities', 
            recommendations.popular,
            'popular'
          )}
          
          {/* New Activities section */}
          {renderRecommendationSection(
            'New Activities', 
            recommendations.newActivities,
            'newActivities'
          )}
          
          {/* Based on Interests section */}
          {renderRecommendationSection(
            'Based on Your Interests', 
            recommendations.basedOnInterests,
            'basedOnInterests'
          )}
          
          {/* From Communities section */}
          {renderRecommendationSection(
            'From Your Communities', 
            recommendations.fromCommunities,
            'fromCommunities'
          )}
        </>
      )}
      
      {/* Create Your Own section */}
      <Box 
        marginTop="xl" 
        padding="lg" 
        backgroundColor="background-alt" 
        borderRadius="md"
        textAlign="center"
      >
        <Text variant="h3" marginBottom="md">Don't see what you're looking for?</Text>
        <Text marginBottom="lg">
          Start your own activity and invite others to join you!
        </Text>
        <Button 
          variant="primary" 
          onClick={onCreateActivity}
        >
          Create New Activity
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityRecommendations;
