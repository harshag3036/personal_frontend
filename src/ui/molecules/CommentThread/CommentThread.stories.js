import React from 'react';
import CommentThread from './CommentThread';
import { 
  COMMENT_THREAD_VARIANTS, 
  COMMENT_THREAD_SIZES, 
  COMMENT_THREAD_CONNECTOR_TYPES,
  COMMENT_THREAD_CONNECTOR_COLORS
} from './constants';

export default {
  title: 'Molecules/CommentThread',
  component: CommentThread,
  parameters: {
    docs: {
      description: {
        component: 'CommentThread component displays a comment and its nested replies with various customization options.'
      }
    }
  }
};

// Mock data for stories
const mockComment = {
  id: '1',
  userId: 'user1',
  currentUserId: 'user1',
  userName: 'John Doe',
  userRole: 'admin',
  userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  content: 'This is a test comment with some content. It demonstrates how the CommentThread component displays user-generated content in a structured and interactive way.',
  createdAt: new Date().toISOString(),
  reactions: {
    like: {
      count: 5,
      users: ['user2', 'user3', 'user4', 'user5', 'user6']
    },
    love: {
      count: 2,
      users: ['user7', 'user8']
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
    content: 'This is a reply to the test comment. It shows how nested comments are displayed in the thread.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    reactions: {
      like: {
        count: 2,
        users: ['user1', 'user3']
      }
    },
    replies: [
      {
        id: '3',
        userId: 'user3',
        currentUserId: 'user1',
        userName: 'Bob Johnson',
        userRole: 'user',
        userAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        content: 'This is a nested reply to demonstrate deeper levels of nesting in the comment thread.',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        reactions: {}
      }
    ]
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

// Default story
export const Default = () => (
  <CommentThread
    comment={mockComment}
    replies={mockReplies}
    {...mockHandlers}
  />
);

// Variants
export const Compact = () => (
  <CommentThread
    comment={mockComment}
    replies={mockReplies}
    variant={COMMENT_THREAD_VARIANTS.COMPACT}
    {...mockHandlers}
  />
);

export const Expanded = () => (
  <CommentThread
    comment={mockComment}
    replies={mockReplies}
    variant={COMMENT_THREAD_VARIANTS.EXPANDED}
    {...mockHandlers}
  />
);

// Sizes
export const Small = () => (
  <CommentThread
    comment={mockComment}
    replies={mockReplies}
    size={COMMENT_THREAD_SIZES.SMALL}
    {...mockHandlers}
  />
);

export const Large = () => (
  <CommentThread
    comment={mockComment}
    replies={mockReplies}
    size={COMMENT_THREAD_SIZES.LARGE}
    {...mockHandlers}
  />
);
