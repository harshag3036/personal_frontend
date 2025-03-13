/**
 * CommentSection Example
 * 
 * This example demonstrates how to use the CommentSection component
 * with various features and configurations.
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, Button } from '../atoms';
import { CommentSection } from '../organisms';
import { COMMENT_SECTION_COMMENT_TYPES } from '../organisms/CommentSection/constants';

// Initial mock comments for the example
const initialComments = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar: 'https://i.pravatar.cc/150?u=john',
    content: 'This is a test comment with some content that might span multiple lines. It demonstrates how the component handles longer text content in comments.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: 'Jane Smith',
        authorAvatar: 'https://i.pravatar.cc/150?u=jane',
        content: 'This is a reply to the test comment. Replies can be nested to show threaded conversations.',
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
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
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    likes: 3,
    replies: []
  },
  {
    id: '3',
    author: 'Admin',
    authorAvatar: 'https://i.pravatar.cc/150?u=admin',
    content: 'This is a pinned comment that appears at the top of the discussion.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    type: COMMENT_SECTION_COMMENT_TYPES.PINNED,
    likes: 10,
    replies: []
  }
];

/**
 * CommentSectionExample Component
 * 
 * Demonstrates the usage of the CommentSection component with
 * interactive features like adding, editing, and deleting comments.
 */
const CommentSectionExample = () => {
  // State for comments
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('medium');
  const [readOnly, setReadOnly] = useState(false);

  // Generate a unique ID for new comments
  const generateId = () => {
    return Date.now().toString();
  };

  // Add a new comment
  const handleAddComment = useCallback((content) => {
    // Simulate API call
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          id: generateId(),
          author: 'Current User',
          authorAvatar: 'https://i.pravatar.cc/150?u=currentuser',
          content,
          timestamp: new Date().toISOString(),
          likes: 0,
          replies: []
        };
        
        setComments(prevComments => [newComment, ...prevComments]);
        setLoading(false);
        resolve();
      }, 1000);
    });
  }, []);

  // Edit a comment
  const handleEditComment = useCallback((commentId, newContent) => {
    setComments(prevComments => {
      const updateComment = (comments) => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, content: newContent };
          }
          
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateComment(comment.replies)
            };
          }
          
          return comment;
        });
      };
      
      return updateComment(prevComments);
    });
  }, []);

  // Delete a comment
  const handleDeleteComment = useCallback((commentId) => {
    setComments(prevComments => {
      const filterComments = (comments) => {
        return comments.filter(comment => {
          if (comment.id === commentId) {
            return false;
          }
          
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = filterComments(comment.replies);
          }
          
          return true;
        });
      };
      
      return filterComments(prevComments);
    });
  }, []);

  // Reply to a comment
  const handleReplyToComment = useCallback((commentId, content) => {
    setComments(prevComments => {
      const addReply = (comments) => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            const newReply = {
              id: `${commentId}-${generateId()}`,
              author: 'Current User',
              authorAvatar: 'https://i.pravatar.cc/150?u=currentuser',
              content,
              timestamp: new Date().toISOString(),
              likes: 0,
              replies: []
            };
            
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            };
          }
          
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReply(comment.replies)
            };
          }
          
          return comment;
        });
      };
      
      return addReply(prevComments);
    });
  }, []);

  // Like a comment
  const handleLikeComment = useCallback((commentId, liked) => {
    setComments(prevComments => {
      const updateLikes = (comments) => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: liked ? comment.likes + 1 : Math.max(0, comment.likes - 1)
            };
          }
          
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateLikes(comment.replies)
            };
          }
          
          return comment;
        });
      };
      
      return updateLikes(prevComments);
    });
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sortOption) => {
    console.log(`Sorting comments by: ${sortOption}`);
    // In a real application, you would sort the comments here
  }, []);

  // Toggle loading state
  const toggleLoading = () => {
    setLoading(prevLoading => !prevLoading);
    setError(null);
  };

  // Toggle error state
  const toggleError = () => {
    setError(error ? null : 'Failed to load comments due to a server error.');
    setLoading(false);
  };

  // Toggle read-only state
  const toggleReadOnly = () => {
    setReadOnly(prevReadOnly => !prevReadOnly);
  };

  // Change variant
  const changeVariant = (newVariant) => {
    setVariant(newVariant);
  };

  // Change size
  const changeSize = (newSize) => {
    setSize(newSize);
  };

  // Reset to initial state
  const resetComments = () => {
    setComments(initialComments);
    setLoading(false);
    setError(null);
  };

  return (
    <Box padding="lg">
      <Text variant="h1" marginBottom="md">CommentSection Example</Text>
      <Text variant="body1" marginBottom="lg">
        This example demonstrates how to use the CommentSection component with various features and configurations.
      </Text>
      
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="sm">Controls</Text>
        <Box display="flex" gap="md" flexWrap="wrap" marginBottom="md">
          <Button onClick={toggleLoading}>
            {loading ? 'Stop Loading' : 'Simulate Loading'}
          </Button>
          <Button onClick={toggleError}>
            {error ? 'Clear Error' : 'Simulate Error'}
          </Button>
          <Button onClick={toggleReadOnly}>
            {readOnly ? 'Enable Editing' : 'Make Read-Only'}
          </Button>
          <Button onClick={resetComments}>
            Reset Comments
          </Button>
        </Box>
        
        <Box marginBottom="md">
          <Text variant="h3" marginBottom="sm">Variant</Text>
          <Box display="flex" gap="md">
            <Button 
              variant={variant === 'default' ? 'primary' : 'outline'} 
              onClick={() => changeVariant('default')}
            >
              Default
            </Button>
            <Button 
              variant={variant === 'compact' ? 'primary' : 'outline'} 
              onClick={() => changeVariant('compact')}
            >
              Compact
            </Button>
            <Button 
              variant={variant === 'expanded' ? 'primary' : 'outline'} 
              onClick={() => changeVariant('expanded')}
            >
              Expanded
            </Button>
            <Button 
              variant={variant === 'embedded' ? 'primary' : 'outline'} 
              onClick={() => changeVariant('embedded')}
            >
              Embedded
            </Button>
          </Box>
        </Box>
        
        <Box marginBottom="md">
          <Text variant="h3" marginBottom="sm">Size</Text>
          <Box display="flex" gap="md">
            <Button 
              variant={size === 'small' ? 'primary' : 'outline'} 
              onClick={() => changeSize('small')}
            >
              Small
            </Button>
            <Button 
              variant={size === 'medium' ? 'primary' : 'outline'} 
              onClick={() => changeSize('medium')}
            >
              Medium
            </Button>
            <Button 
              variant={size === 'large' ? 'primary' : 'outline'} 
              onClick={() => changeSize('large')}
            >
              Large
            </Button>
          </Box>
        </Box>
      </Box>
      
      <Box background="background-surface" padding="lg" borderRadius="md">
        <CommentSection
          title="Discussion"
          subtitle="Join the conversation and share your thoughts"
          comments={comments}
          loading={loading}
          error={error}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          onReplyToComment={handleReplyToComment}
          onLikeComment={handleLikeComment}
          onSortChange={handleSortChange}
          variant={variant}
          size={size}
          readOnly={readOnly}
        />
      </Box>
    </Box>
  );
};

export default CommentSectionExample;
