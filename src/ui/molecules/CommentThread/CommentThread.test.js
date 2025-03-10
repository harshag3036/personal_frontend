import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommentThread from './CommentThread';
import { 
  COMMENT_THREAD_VARIANTS, 
  COMMENT_THREAD_SIZES, 
  COMMENT_THREAD_CONNECTOR_TYPES,
  COMMENT_THREAD_CONNECTOR_COLORS
} from './constants';

// Mock data for testing
const mockComment = {
  id: '1',
  userId: 'user1',
  currentUserId: 'user1',
  userName: 'John Doe',
  userRole: 'admin',
  userAvatar: 'https://example.com/avatar.jpg',
  content: 'This is a test comment',
  createdAt: new Date().toISOString(),
  reactions: {
    like: {
      count: 2,
      users: ['user2', 'user3']
    }
  }
};

const mockReplies = [
  {
    id: '2',
    userId: 'user2',
    currentUserId: 'user1',
    userName: 'Jane Smith',
    userRole: 'user',
    content: 'This is a reply to the test comment',
    createdAt: new Date().toISOString(),
    reactions: {}
  }
];

// Mock functions
const mockOnReply = jest.fn();
const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnReport = jest.fn();
const mockOnReaction = jest.fn();

describe('CommentThread Component', () => {
  it('renders the comment content correctly', () => {
    render(
      <CommentThread 
        comment={mockComment}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders replies when provided', () => {
    render(
      <CommentThread 
        comment={mockComment}
        replies={mockReplies}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('This is a reply to the test comment')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { container } = render(
      <CommentThread 
        comment={mockComment}
        variant={COMMENT_THREAD_VARIANTS.COMPACT}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    expect(container.querySelector(`.ui-comment-thread--${COMMENT_THREAD_VARIANTS.COMPACT}`)).toBeInTheDocument();
  });

  it('applies the correct size class', () => {
    const { container } = render(
      <CommentThread 
        comment={mockComment}
        size={COMMENT_THREAD_SIZES.LARGE}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    expect(container.querySelector(`.ui-comment-thread--${COMMENT_THREAD_SIZES.LARGE}`)).toBeInTheDocument();
  });

  it('shows edit and delete buttons for the author', () => {
    render(
      <CommentThread 
        comment={mockComment}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    // Find buttons by their aria-label
    expect(screen.getByLabelText('Edit comment')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete comment')).toBeInTheDocument();
  });

  it('does not show report button for the author', () => {
    render(
      <CommentThread 
        comment={mockComment}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    // Report button should not be present for the author
    expect(screen.queryByLabelText('Report comment')).not.toBeInTheDocument();
  });

  it('shows report button for non-authors', () => {
    const nonAuthorComment = {
      ...mockComment,
      userId: 'user2', // Different from currentUserId
    };
    
    render(
      <CommentThread 
        comment={nonAuthorComment}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    // Report button should be present for non-authors
    expect(screen.getByLabelText('Report comment')).toBeInTheDocument();
    
    // Edit and delete buttons should not be present for non-authors
    expect(screen.queryByLabelText('Edit comment')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Delete comment')).not.toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <CommentThread 
        comment={mockComment}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Delete comment'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockComment.id);
  });

  it('shows reply form when reply button is clicked', () => {
    render(
      <CommentThread 
        comment={mockComment}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    fireEvent.click(screen.getByText('Reply'));
    expect(screen.getByPlaceholderText('Write a reply...')).toBeInTheDocument();
  });

  it('respects the maxNestingDepth prop', () => {
    const deeplyNestedReplies = [
      {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        content: 'Level 1 reply',
        createdAt: new Date().toISOString(),
        replies: [
          {
            id: '3',
            userId: 'user3',
            userName: 'Bob Johnson',
            content: 'Level 2 reply',
            createdAt: new Date().toISOString(),
            replies: [
              {
                id: '4',
                userId: 'user4',
                userName: 'Alice Brown',
                content: 'Level 3 reply',
                createdAt: new Date().toISOString(),
              }
            ]
          }
        ]
      }
    ];
    
    render(
      <CommentThread 
        comment={mockComment}
        replies={deeplyNestedReplies}
        maxNestingDepth={2}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onReport={mockOnReport}
        onReaction={mockOnReaction}
      />
    );
    
    expect(screen.getByText('Level 1 reply')).toBeInTheDocument();
    expect(screen.getByText('Level 2 reply')).toBeInTheDocument();
    expect(screen.getByText('Level 3 reply')).toBeInTheDocument();
    
    // Check that the replies are properly nested
    const replies = document.querySelectorAll('.ui-comment-thread__replies');
    expect(replies.length).toBe(2); // Only 2 levels of nesting due to maxNestingDepth
  });
});
