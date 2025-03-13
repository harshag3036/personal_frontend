/**
 * CommentSection Component Stories
 */

import React from 'react';
import CommentSection from './CommentSection';
import { COMMENT_SECTION_VARIANTS, COMMENT_SECTION_SIZES, COMMENT_SECTION_COMMENT_TYPES } from './constants';

export default {
  title: 'Organisms/CommentSection',
  component: CommentSection,
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive component for displaying and managing comments and discussions.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
      defaultValue: 'Comments'
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle'
    },
    comments: {
      control: 'object',
      description: 'Array of comment objects'
    },
    loading: {
      control: 'boolean',
      description: 'Whether comments are loading',
      defaultValue: false
    },
    error: {
      control: 'text',
      description: 'Error message'
    },
    onAddComment: {
      action: 'onAddComment',
      description: 'Function to handle adding a new comment'
    },
    onEditComment: {
      action: 'onEditComment',
      description: 'Function to handle editing a comment'
    },
    onDeleteComment: {
      action: 'onDeleteComment',
      description: 'Function to handle deleting a comment'
    },
    onReplyToComment: {
      action: 'onReplyToComment',
      description: 'Function to handle replying to a comment'
    },
    onLikeComment: {
      action: 'onLikeComment',
      description: 'Function to handle liking a comment'
    },
    onSortChange: {
      action: 'onSortChange',
      description: 'Function to handle sort option change'
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(COMMENT_SECTION_VARIANTS)
      },
      description: 'Component variant',
      defaultValue: COMMENT_SECTION_VARIANTS.DEFAULT
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(COMMENT_SECTION_SIZES)
      },
      description: 'Component size',
      defaultValue: COMMENT_SECTION_SIZES.MEDIUM
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the comment input',
      defaultValue: 'Write a comment...'
    },
    submitLabel: {
      control: 'text',
      description: 'Label for the submit button',
      defaultValue: 'Post'
    },
    cancelLabel: {
      control: 'text',
      description: 'Label for the cancel button',
      defaultValue: 'Cancel'
    },
    emptyStateMessage: {
      control: 'text',
      description: 'Message to display when there are no comments',
      defaultValue: 'No comments yet. Be the first to comment!'
    },
    loadingMessage: {
      control: 'text',
      description: 'Message to display when comments are loading',
      defaultValue: 'Loading comments...'
    },
    errorMessage: {
      control: 'text',
      description: 'Message to display when there is an error loading comments',
      defaultValue: 'Failed to load comments. Please try again later.'
    },
    maxCommentLength: {
      control: 'number',
      description: 'Maximum length of a comment',
      defaultValue: 1000
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the comment section is read-only',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the comment section is disabled',
      defaultValue: false
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names'
    }
  }
};

// Mock data for stories
const mockComments = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar: 'https://i.pravatar.cc/150?u=john',
    content: 'This is a test comment with some content that might span multiple lines. It demonstrates how the component handles longer text content in comments.',
    timestamp: '2025-03-13T10:30:00Z',
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: 'Jane Smith',
        authorAvatar: 'https://i.pravatar.cc/150?u=jane',
        content: 'This is a reply to the test comment. Replies can be nested to show threaded conversations.',
        timestamp: '2025-03-13T11:00:00Z',
        likes: 2,
        replies: []
      }
    ]
  },
  {
    id: '2',
    author: 'Alice Johnson',
    authorAvatar: 'https://i.pravatar.cc/150?u=alice',
    content: 'Another test comment with different content. This helps demonstrate how multiple comments are displayed in the component.',
    timestamp: '2025-03-13T09:45:00Z',
    likes: 3,
    replies: []
  },
  {
    id: '3',
    author: 'Bob Wilson',
    authorAvatar: 'https://i.pravatar.cc/150?u=bob',
    content: 'A third comment to show how the component handles multiple comments and maintains proper spacing between them.',
    timestamp: '2025-03-13T08:15:00Z',
    likes: 1,
    replies: [
      {
        id: '3-1',
        author: 'Charlie Brown',
        authorAvatar: 'https://i.pravatar.cc/150?u=charlie',
        content: 'A reply to the third comment.',
        timestamp: '2025-03-13T08:30:00Z',
        likes: 0,
        replies: []
      },
      {
        id: '3-2',
        author: 'Diana Prince',
        authorAvatar: 'https://i.pravatar.cc/150?u=diana',
        content: 'Another reply to the third comment to demonstrate multiple replies.',
        timestamp: '2025-03-13T09:00:00Z',
        likes: 1,
        replies: []
      }
    ]
  }
];

// Different comment types for demonstration
const commentsWithTypes = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar: 'https://i.pravatar.cc/150?u=john',
    content: 'This is a standard comment.',
    timestamp: '2025-03-13T10:30:00Z',
    type: COMMENT_SECTION_COMMENT_TYPES.STANDARD,
    likes: 5
  },
  {
    id: '2',
    author: 'Admin',
    authorAvatar: 'https://i.pravatar.cc/150?u=admin',
    content: 'This is a pinned comment that appears at the top of the discussion.',
    timestamp: '2025-03-13T09:45:00Z',
    type: COMMENT_SECTION_COMMENT_TYPES.PINNED,
    likes: 3
  },
  {
    id: '3',
    author: 'Moderator',
    authorAvatar: 'https://i.pravatar.cc/150?u=moderator',
    content: 'This is a highlighted comment that stands out from the rest.',
    timestamp: '2025-03-13T09:30:00Z',
    type: COMMENT_SECTION_COMMENT_TYPES.HIGHLIGHTED,
    likes: 2
  },
  {
    id: '4',
    author: 'System',
    authorAvatar: 'https://i.pravatar.cc/150?u=system',
    content: 'This is a system message that provides information about the discussion.',
    timestamp: '2025-03-13T09:00:00Z',
    type: COMMENT_SECTION_COMMENT_TYPES.SYSTEM,
    likes: 0
  }
];

// Template for stories
const Template = (args) => <CommentSection {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  title: 'Comments',
  subtitle: 'Join the discussion',
  comments: mockComments
};

// Empty state story
export const EmptyState = Template.bind({});
EmptyState.args = {
  title: 'Comments',
  subtitle: 'Be the first to comment',
  comments: []
};

// Loading state story
export const Loading = Template.bind({});
Loading.args = {
  title: 'Comments',
  loading: true
};

// Error state story
export const Error = Template.bind({});
Error.args = {
  title: 'Comments',
  error: 'Failed to load comments due to a server error.'
};

// Read-only story
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  title: 'Comments',
  subtitle: 'View-only mode',
  comments: mockComments,
  readOnly: true
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  title: 'Comments',
  subtitle: 'Commenting is currently disabled',
  comments: mockComments,
  disabled: true
};

// Compact variant story
export const CompactVariant = Template.bind({});
CompactVariant.args = {
  title: 'Comments',
  comments: mockComments,
  variant: COMMENT_SECTION_VARIANTS.COMPACT
};

// Expanded variant story
export const ExpandedVariant = Template.bind({});
ExpandedVariant.args = {
  title: 'Comments',
  comments: mockComments,
  variant: COMMENT_SECTION_VARIANTS.EXPANDED
};

// Embedded variant story
export const EmbeddedVariant = Template.bind({});
EmbeddedVariant.args = {
  title: 'Comments',
  comments: mockComments,
  variant: COMMENT_SECTION_VARIANTS.EMBEDDED
};

// Small size story
export const SmallSize = Template.bind({});
SmallSize.args = {
  title: 'Comments',
  comments: mockComments,
  size: COMMENT_SECTION_SIZES.SMALL
};

// Large size story
export const LargeSize = Template.bind({});
LargeSize.args = {
  title: 'Comments',
  comments: mockComments,
  size: COMMENT_SECTION_SIZES.LARGE
};

// Different comment types story
export const CommentTypes = Template.bind({});
CommentTypes.args = {
  title: 'Comment Types',
  subtitle: 'Demonstrating different types of comments',
  comments: commentsWithTypes
};
