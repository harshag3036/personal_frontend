/**
 * ActivityDetailView Component
 * 
 * Provides an expanded view for activity details with participation management,
 * comments, file attachments, and activity progress tracking.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Stack,
  Button,
  Input,
  Badge,
  Divider,
  Avatar,
  Card,
  Grid
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const ActivityDetailView = ({ activityId, onClose, onParticipationChange }) => {
  const { getActivity, updateActivity, joinActivity, leaveActivity } = useActivity();
  const { user } = useUser();
  const { communities, getCommunityById } = useCommunity();
  
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);
  
  // Activity type configuration
  const typeConfig = {
    discussion: { icon: '🌱', color: '#4caf50', label: 'Discussion' },
    event: { icon: '📅', color: '#2196f3', label: 'Event' },
    project: { icon: '🎯', color: '#9c27b0', label: 'Project' },
    'skill-share': { icon: '🎓', color: '#ff9800', label: 'Skill Share' },
    resource: { icon: '📚', color: '#795548', label: 'Resource' },
    challenge: { icon: '🏆', color: '#f44336', label: 'Challenge' }
  };
  
  // Fetch activity data
  useEffect(() => {
    if (!activityId) return;
    
    setLoading(true);
    try {
      const activityData = getActivity(activityId);
      if (activityData) {
        setActivity(activityData);
        
        // Check if user is participating
        const isUserParticipating = activityData.participants?.some(
          participant => participant.id === user?.id
        );
        setIsParticipating(isUserParticipating);
        
        setError(null);
      } else {
        setError('Activity not found');
      }
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError('Failed to load activity details');
    } finally {
      setLoading(false);
    }
  }, [activityId, getActivity, user]);
  
  // Get community information
  const getCommunityInfo = () => {
    if (!activity) return null;
    
    const communityId = activity.communityId || activity.circleId;
    if (!communityId) return null;
    
    return getCommunityById(communityId);
  };
  
  // Handle join activity
  const handleJoinActivity = async () => {
    if (!activity || !user) return;
    
    try {
      await joinActivity(activity.id);
      
      // Update local state
      setIsParticipating(true);
      setActivity(prev => ({
        ...prev,
        participants: [...(prev.participants || []), {
          id: user.id,
          name: user.name,
          joinedAt: new Date().toISOString()
        }]
      }));
      
      // Notify parent component
      if (onParticipationChange) {
        onParticipationChange('join', activity.id);
      }
    } catch (err) {
      console.error('Error joining activity:', err);
    }
  };
  
  // Handle leave activity
  const handleLeaveActivity = async () => {
    if (!activity || !user) return;
    
    try {
      await leaveActivity(activity.id);
      
      // Update local state
      setIsParticipating(false);
      setActivity(prev => ({
        ...prev,
        participants: (prev.participants || []).filter(p => p.id !== user.id)
      }));
      
      // Notify parent component
      if (onParticipationChange) {
        onParticipationChange('leave', activity.id);
      }
    } catch (err) {
      console.error('Error leaving activity:', err);
    }
  };
  
  // Handle adding a comment
  const handleAddComment = () => {
    if (!commentText.trim() || !activity || !user) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
      author: {
        id: user.id,
        name: user.name
      }
    };
    
    // Update local state
    setActivity(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newComment]
    }));
    
    // Clear input
    setCommentText('');
    
    // Update in backend
    updateActivity(activity.id, {
      ...activity,
      comments: [...(activity.comments || []), newComment]
    });
  };
  
  // Handle file upload (placeholder)
  const handleFileUpload = (e) => {
    // In a real implementation, this would upload the file to storage
    // and add the URL to the attachments list
    const files = Array.from(e.target.files);
    
    const newAttachments = files.map(file => ({
      id: `attachment-${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      uploadedBy: {
        id: user?.id,
        name: user?.name
      },
      // In a real app, this would be the actual URL after upload
      url: URL.createObjectURL(file)
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <Box textAlign="center" padding="xl">
        <Text>Loading activity details...</Text>
      </Box>
    );
  }
  
  if (error || !activity) {
    return (
      <Box textAlign="center" padding="xl">
        <Text color="error">{error || 'Activity not found'}</Text>
        <Button 
          variant="primary" 
          marginTop="md"
          onClick={onClose}
        >
          Go Back
        </Button>
      </Box>
    );
  }
  
  // Get type info for the activity
  const typeInfo = activity.type && typeConfig[activity.type] ? 
    typeConfig[activity.type] : 
    { icon: '📋', color: '#607d8b', label: 'Activity' };
  
  // Get community info
  const community = getCommunityInfo();
  
  return (
    <Box className="activity-detail-view" maxWidth="900px" margin="0 auto">
      <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
        <Text variant="h1">{activity.title}</Text>
        <Button 
          variant="outline"
          onClick={onClose}
        >
          Back to Activities
        </Button>
      </Flex>
      
      {/* Activity header */}
      <Card 
        padding="lg"
        marginBottom="lg"
        borderTop="4px solid"
        borderTopColor={typeInfo.color}
      >
        <Flex gap="md" alignItems="center" marginBottom="md">
          <Flex 
            alignItems="center" 
            justifyContent="center"
            width="40px"
            height="40px"
            borderRadius="full"
            backgroundColor={typeInfo.color}
            color="white"
            fontSize="xl"
          >
            {typeInfo.icon}
          </Flex>
          
          <Box>
            <Flex gap="sm" alignItems="center">
              <Text variant="h3">{activity.title}</Text>
              <Badge variant={
                activity.status === 'active' ? 'success' :
                activity.status === 'upcoming' ? 'info' :
                activity.status === 'completed' ? 'secondary' :
                'outline'
              }>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </Badge>
            </Flex>
            
            <Text color="text-secondary">
              {typeInfo.label} • Created {formatDate(activity.createdAt)}
            </Text>
          </Box>
        </Flex>
        
        {/* Community badge for community-specific activities */}
        {(activity.communityId || activity.circleId) && community && (
          <Flex gap="sm" alignItems="center" marginBottom="md">
            <Text>Community:</Text>
            <Badge variant="outline">
              {community.name}
            </Badge>
          </Flex>
        )}
        
        {/* Global badge for global activities */}
        {!activity.communityId && !activity.circleId && (
          <Flex gap="sm" alignItems="center" marginBottom="md">
            <Text>Scope:</Text>
            <Badge variant="primary">
              Global
            </Badge>
          </Flex>
        )}
        
        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <Flex gap="sm" flexWrap="wrap" marginBottom="md">
            <Text>Tags:</Text>
            {activity.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </Flex>
        )}
        
        {/* Creator info */}
        <Flex gap="sm" alignItems="center" marginBottom="lg">
          <Text>Created by:</Text>
          <Text fontWeight="bold">
            {activity.createdBy?.name || 'Unknown'}
          </Text>
        </Flex>
        
        {/* Join/Leave buttons */}
        <Flex justifyContent="space-between" alignItems="center">
          <Button
            variant={isParticipating ? "outline" : "primary"}
            onClick={isParticipating ? handleLeaveActivity : handleJoinActivity}
          >
            {isParticipating ? "Leave Activity" : "Join Activity"}
          </Button>
          
          <Text>
            {activity.participants?.length || 0} participants
          </Text>
        </Flex>
      </Card>
      
      {/* Activity details */}
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="md">Description</Text>
        <Box 
          backgroundColor="background-paper"
          padding="lg"
          borderRadius="md"
        >
          <Text>{activity.description}</Text>
        </Box>
      </Box>
      
      {/* Activity details - time, location, etc. */}
      {(activity.startDate || activity.endDate || activity.location || activity.maxParticipants) && (
        <Box marginBottom="lg">
          <Text variant="h2" marginBottom="md">Details</Text>
          <Box 
            backgroundColor="background-paper"
            padding="lg"
            borderRadius="md"
          >
            <Grid templateColumns="1fr 1fr" gap="md">
              {activity.startDate && (
                <Flex direction="column">
                  <Text fontWeight="bold">Start Date</Text>
                  <Text>{formatDate(activity.startDate)}</Text>
                </Flex>
              )}
              
              {activity.endDate && (
                <Flex direction="column">
                  <Text fontWeight="bold">End Date</Text>
                  <Text>{formatDate(activity.endDate)}</Text>
                </Flex>
              )}
              
              {activity.location && (
                <Flex direction="column">
                  <Text fontWeight="bold">Location</Text>
                  <Text>{activity.location}</Text>
                </Flex>
              )}
              
              {activity.maxParticipants && (
                <Flex direction="column">
                  <Text fontWeight="bold">Max Participants</Text>
                  <Text>{activity.maxParticipants}</Text>
                </Flex>
              )}
            </Grid>
          </Box>
        </Box>
      )}
      
      {/* Participants */}
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="md">Participants</Text>
        <Box 
          backgroundColor="background-paper"
          padding="lg"
          borderRadius="md"
        >
          {activity.participants && activity.participants.length > 0 ? (
            <Stack spacing="md">
              {activity.participants.map(participant => (
                <Flex key={participant.id} gap="md" alignItems="center">
                  <Avatar 
                    size="sm"
                    name={participant.name}
                  />
                  <Box>
                    <Text>{participant.name}</Text>
                    {participant.joinedAt && (
                      <Text variant="caption">
                        Joined {formatDate(participant.joinedAt)}
                      </Text>
                    )}
                  </Box>
                </Flex>
              ))}
            </Stack>
          ) : (
            <Text>No participants yet. Be the first to join!</Text>
          )}
        </Box>
      </Box>
      
      {/* Attachments */}
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="md">Attachments</Text>
        <Box 
          backgroundColor="background-paper"
          padding="lg"
          borderRadius="md"
        >
          {attachments.length > 0 ? (
            <Stack spacing="sm">
              {attachments.map(attachment => (
                <Flex 
                  key={attachment.id} 
                  justifyContent="space-between"
                  alignItems="center"
                  padding="sm"
                  borderRadius="md"
                  backgroundColor="background-alt"
                >
                  <Flex gap="sm" alignItems="center">
                    <Text>📎</Text>
                    <Text>{attachment.name}</Text>
                  </Flex>
                  <Button 
                    variant="text"
                    as="a"
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </Button>
                </Flex>
              ))}
            </Stack>
          ) : (
            <Text marginBottom="md">No attachments yet.</Text>
          )}
          
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload').click()}
          >
            Add Attachment
          </Button>
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            multiple
          />
        </Box>
      </Box>
      
      {/* Comments */}
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="md">Discussion</Text>
        <Box 
          backgroundColor="background-paper"
          padding="lg"
          borderRadius="md"
        >
          {activity.comments && activity.comments.length > 0 ? (
            <Stack spacing="lg" marginBottom="lg">
              {activity.comments.map(comment => (
                <Box key={comment.id}>
                  <Flex gap="md" alignItems="center" marginBottom="sm">
                    <Avatar 
                      size="sm"
                      name={comment.author?.name}
                    />
                    <Box>
                      <Text fontWeight="bold">{comment.author?.name}</Text>
                      <Text variant="caption">
                        {formatDate(comment.createdAt)}
                      </Text>
                    </Box>
                  </Flex>
                  <Text>{comment.text}</Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <Text marginBottom="lg">No comments yet. Start the conversation!</Text>
          )}
          
          <Divider marginBottom="md" />
          
          <Flex gap="md">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              flex="1"
            />
            <Button
              variant="primary"
              onClick={handleAddComment}
              disabled={!commentText.trim()}
            >
              Comment
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityDetailView;
