import React from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import CommentThread from '../molecules/CommentThread';

/**
 * CommentThreadExample Component
 * 
 * This example demonstrates how to use the CommentThread component.
 */
const CommentThreadExample = () => {
  // Mock data
  const mockComment = {
    id: '1',
    userId: 'user1',
    currentUserId: 'user1',
    userName: 'John Doe',
    userRole: 'admin',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'This is an example of the CommentThread component. It supports nested replies, reactions, and various customization options.',
    createdAt: new Date().toISOString(),
    reactions: {
      like: {
        count: 3,
        users: ['user2', 'user3', 'user4']
      }
    }
  };

  const mockReplies = [
    {
      id: '2',
      userId: 'user2',
      currentUserId: 'user1',
      userName: 'Jane Smith',
      userRole: 'moderator',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'This is a reply to the main comment.',
      createdAt: new Date().toISOString(),
      reactions: {}
    }
  ];

  // Mock handlers
  const mockHandlers = {
    onReply: (commentId, content) => console.log('Reply to comment', commentId, content),
    onEdit: (commentId, content) => console.log('Edit comment', commentId, content),
    onDelete: (commentId) => console.log('Delete comment', commentId),
    onReport: (commentId) => console.log('Report comment', commentId),
    onReaction: (commentId, reactionType) => console.log('React to comment', commentId, reactionType)
  };

  return (
    <Box p="lg">
      <Text variant="h2" mb="md">Comment Thread Example</Text>
      
      <Box mb="lg">
        <Text variant="h4" mb="sm">Default Comment Thread</Text>
        <CommentThread
          comment={mockComment}
          replies={mockReplies}
          {...mockHandlers}
        />
      </Box>
      
      <Box mb="lg">
        <Text variant="h4" mb="sm">Compact Comment Thread</Text>
        <CommentThread
          comment={mockComment}
          replies={mockReplies}
          variant="compact"
          {...mockHandlers}
        />
      </Box>
      
      <Box mb="lg">
        <Text variant="h4" mb="sm">Expanded Comment Thread</Text>
        <CommentThread
          comment={mockComment}
          replies={mockReplies}
          variant="expanded"
          {...mockHandlers}
        />
      </Box>
      
      <Box mb="lg">
        <Text variant="h4" mb="sm">Comment Thread with Dashed Connector</Text>
        <CommentThread
          comment={mockComment}
          replies={mockReplies}
          connectorType="dashed"
          {...mockHandlers}
        />
      </Box>
      
      <Box mb="lg">
        <Text variant="h4" mb="sm">Comment Thread with Primary Connector Color</Text>
        <CommentThread
          comment={mockComment}
          replies={mockReplies}
          connectorColor="primary"
          {...mockHandlers}
        />
      </Box>
    </Box>
  );
};

export default CommentThreadExample;
