/**
 * CommentSection Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentSection from './CommentSection';
import { COMMENT_SECTION_COMMENT_TYPES } from './constants';

// Mock data for testing
const mockComments = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar: 'https://example.com/avatar1.jpg',
    content: 'This is a test comment',
    timestamp: '2025-03-13T10:30:00Z',
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: 'Jane Smith',
        authorAvatar: 'https://example.com/avatar2.jpg',
        content: 'This is a reply to the test comment',
        timestamp: '2025-03-13T11:00:00Z',
        likes: 2,
        replies: []
      }
    ]
  },
  {
    id: '2',
    author: 'Alice Johnson',
    authorAvatar: 'https://example.com/avatar3.jpg',
    content: 'Another test comment',
    timestamp: '2025-03-13T09:45:00Z',
    likes: 3,
    replies: []
  }
];

// Mock handlers
const mockHandlers = {
  onAddComment: jest.fn(),
  onEditComment: jest.fn(),
  onDeleteComment: jest.fn(),
  onReplyToComment: jest.fn(),
  onLikeComment: jest.fn(),
  onSortChange: jest.fn()
};

describe('CommentSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with title', () => {
    render(<CommentSection title="Test Comments" />);
    expect(screen.getByText('Test Comments')).toBeInTheDocument();
  });

  it('renders empty state when no comments are provided', () => {
    render(<CommentSection />);
    expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(<CommentSection loading={true} />);
    expect(screen.getByText(/loading comments/i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(<CommentSection error="Test error message" />);
    expect(screen.getByText(/failed to load comments/i)).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders comments correctly', () => {
    render(<CommentSection comments={mockComments} />);
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('Another test comment')).toBeInTheDocument();
    expect(screen.getByText('This is a reply to the test comment')).toBeInTheDocument();
  });

  it('renders author information correctly', () => {
    render(<CommentSection comments={mockComments} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  });

  it('allows adding a new comment', async () => {
    render(<CommentSection {...mockHandlers} />);
    
    const textarea = screen.getByPlaceholderText('Write a comment...');
    const testComment = 'This is a new comment';
    
    await userEvent.type(textarea, testComment);
    expect(textarea).toHaveValue(testComment);
    
    const submitButton = screen.getByText('Post');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockHandlers.onAddComment).toHaveBeenCalledWith(testComment);
    });
  });

  it('disables submit button when comment is empty', () => {
    render(<CommentSection {...mockHandlers} />);
    
    const submitButton = screen.getByText('Post');
    expect(submitButton).toBeDisabled();
    
    const textarea = screen.getByPlaceholderText('Write a comment...');
    fireEvent.change(textarea, { target: { value: 'Test' } });
    
    expect(submitButton).not.toBeDisabled();
    
    fireEvent.change(textarea, { target: { value: '' } });
    expect(submitButton).toBeDisabled();
  });

  it('allows sorting comments', () => {
    render(<CommentSection comments={mockComments} {...mockHandlers} />);
    
    // Open sort dropdown
    const sortButton = screen.getByText(/sort by/i);
    fireEvent.click(sortButton);
    
    // Select oldest sort option
    const oldestOption = screen.getByText('oldest');
    fireEvent.click(oldestOption);
    
    expect(mockHandlers.onSortChange).toHaveBeenCalledWith('oldest');
  });

  it('renders different comment types correctly', () => {
    const commentsWithTypes = [
      {
        id: '1',
        author: 'John Doe',
        content: 'Standard comment',
        timestamp: '2025-03-13T10:30:00Z',
        type: COMMENT_SECTION_COMMENT_TYPES.STANDARD
      },
      {
        id: '2',
        author: 'Admin',
        content: 'Pinned comment',
        timestamp: '2025-03-13T09:45:00Z',
        type: COMMENT_SECTION_COMMENT_TYPES.PINNED
      },
      {
        id: '3',
        author: 'Moderator',
        content: 'Highlighted comment',
        timestamp: '2025-03-13T09:30:00Z',
        type: COMMENT_SECTION_COMMENT_TYPES.HIGHLIGHTED
      },
      {
        id: '4',
        author: 'System',
        content: 'System message',
        timestamp: '2025-03-13T09:00:00Z',
        type: COMMENT_SECTION_COMMENT_TYPES.SYSTEM
      }
    ];
    
    render(<CommentSection comments={commentsWithTypes} />);
    
    expect(screen.getByText('Standard comment')).toBeInTheDocument();
    expect(screen.getByText('Pinned comment')).toBeInTheDocument();
    expect(screen.getByText('Highlighted comment')).toBeInTheDocument();
    expect(screen.getByText('System message')).toBeInTheDocument();
  });

  it('does not render comment form when readOnly is true', () => {
    render(<CommentSection comments={mockComments} readOnly={true} />);
    
    expect(screen.queryByPlaceholderText('Write a comment...')).not.toBeInTheDocument();
  });

  it('does not render comment form when disabled is true', () => {
    render(<CommentSection comments={mockComments} disabled={true} />);
    
    expect(screen.queryByPlaceholderText('Write a comment...')).not.toBeInTheDocument();
  });

  it('applies custom class names correctly', () => {
    const { container } = render(
      <CommentSection 
        comments={mockComments} 
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies variant class correctly', () => {
    const { container } = render(
      <CommentSection 
        comments={mockComments} 
        variant="compact"
      />
    );
    
    expect(container.firstChild).toHaveClass('ui-comment-section--compact');
  });

  it('applies size class correctly', () => {
    const { container } = render(
      <CommentSection 
        comments={mockComments} 
        size="large"
      />
    );
    
    expect(container.firstChild).toHaveClass('ui-comment-section--large');
  });
});
