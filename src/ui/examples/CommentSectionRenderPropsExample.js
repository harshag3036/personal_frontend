import React, { useState, useEffect } from 'react';
import { CommentSection, Box, Text, Flex, Button, Card, Avatar, Icon, Badge } from '../index';
import { 
  COMMENT_SECTION_COMMENT_TYPES,
  COMMENT_SECTION_SORT_OPTIONS 
} from '../organisms/CommentSection/constants';

/**
 * CommentSection Render Props Example
 * 
 * This example demonstrates using the CommentSection component with render props pattern
 * to create a highly customized comment interface with complete control over rendering.
 */
const CommentSectionRenderPropsExample = () => {
  // Sample comments data
  const initialComments = [
    {
      id: 1,
      author: 'Jane Smith',
      authorAvatar: 'https://ui.shadcn/avatars/01.png',
      content: 'This is a really insightful article. I particularly enjoyed the section about component composition patterns!',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: COMMENT_SECTION_COMMENT_TYPES.STANDARD,
      likes: 5,
      replies: [
        {
          id: 2,
          author: 'Alex Johnson',
          authorAvatar: 'https://ui.shadcn/avatars/02.png',
          content: 'I agree! The examples provided were very clear and helpful.',
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          type: COMMENT_SECTION_COMMENT_TYPES.STANDARD,
          likes: 2
        }
      ]
    },
    {
      id: 3,
      author: 'Sam Williams',
      authorAvatar: 'https://ui.shadcn/avatars/03.png',
      content: 'I have a question about the implementation of render props in the Form component. Is it possible to use it with formik or react-hook-form?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: COMMENT_SECTION_COMMENT_TYPES.QUESTION,
      likes: 0,
      replies: [
        {
          id: 4,
          author: 'Taylor Chen',
          authorAvatar: 'https://ui.shadcn/avatars/04.png',
          content: 'Yes, you can integrate it with either library. The render props pattern exposes the internal state which you can merge with your form library of choice.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          type: COMMENT_SECTION_COMMENT_TYPES.ANSWER,
          likes: 3
        }
      ]
    },
    {
      id: 5,
      author: 'Morgan Lee',
      authorAvatar: 'https://ui.shadcn/avatars/05.png',
      content: 'The documentation could be improved with more examples of advanced use cases. Otherwise, great work!',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: COMMENT_SECTION_COMMENT_TYPES.FEEDBACK,
      likes: 1,
      replies: []
    }
  ];

  // State
  const [comments, setComments] = useState(initialComments);
  const [sortOption, setSortOption] = useState(COMMENT_SECTION_SORT_OPTIONS.NEWEST);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [currentUser] = useState({
    name: 'Current User',
    avatar: 'https://ui.shadcn/avatars/06.png'
  });

  // Sort comments based on the selected sort option
  const sortComments = (commentsToSort, option) => {
    if (!commentsToSort.length) return [];
    
    const sorted = [...commentsToSort];
    
    switch (option) {
      case COMMENT_SECTION_SORT_OPTIONS.NEWEST:
        return sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case COMMENT_SECTION_SORT_OPTIONS.OLDEST:
        return sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case COMMENT_SECTION_SORT_OPTIONS.MOST_LIKED:
        return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case COMMENT_SECTION_SORT_OPTIONS.MOST_REPLIED:
        return sorted.sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0));
      default:
        return sorted;
    }
  };

  // Get sorted comments
  const getSortedComments = () => {
    return sortComments(comments, sortOption);
  };

  // Add new comment
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: commentText,
      timestamp: new Date(),
      type: COMMENT_SECTION_COMMENT_TYPES.STANDARD,
      likes: 0,
      replies: []
    };
    
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  // Add reply to comment
  const handleReplyToComment = (commentId) => {
    if (!replyText.trim()) return;
    
    const reply = {
      id: Date.now(),
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: replyText,
      timestamp: new Date(),
      type: COMMENT_SECTION_COMMENT_TYPES.STANDARD,
      likes: 0
    };
    
    const addReplyToComment = (comments, targetId, newReply) => {
      return comments.map(comment => {
        if (comment.id === targetId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies, targetId, newReply)
          };
        }
        
        return comment;
      });
    };
    
    setComments(prev => addReplyToComment(prev, commentId, reply));
    setReplyingTo(null);
    setReplyText('');
  };

  // Edit comment
  const handleEditComment = (commentId) => {
    if (!editText.trim()) return;
    
    const updateComment = (comments, targetId, newContent) => {
      return comments.map(comment => {
        if (comment.id === targetId) {
          return {
            ...comment,
            content: newContent
          };
        }
        
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: updateComment(comment.replies, targetId, newContent)
          };
        }
        
        return comment;
      });
    };
    
    setComments(prev => updateComment(prev, commentId, editText));
    setEditingId(null);
    setEditText('');
  };

  // Delete comment
  const handleDeleteComment = (commentId) => {
    const removeComment = (comments, targetId) => {
      return comments.filter(comment => {
        if (comment.id === targetId) {
          return false;
        }
        
        if (comment.replies?.length) {
          comment.replies = removeComment(comment.replies, targetId);
        }
        
        return true;
      });
    };
    
    setComments(prev => removeComment(prev, commentId));
  };

  // Like comment
  const handleLikeComment = (commentId, liked) => {
    const updateLikes = (comments, targetId, increment) => {
      return comments.map(comment => {
        if (comment.id === targetId) {
          return {
            ...comment,
            likes: Math.max(0, (comment.likes || 0) + (increment ? 1 : -1))
          };
        }
        
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: updateLikes(comment.replies, targetId, increment)
          };
        }
        
        return comment;
      });
    };
    
    setComments(prev => updateLikes(prev, commentId, liked));
  };

  // Start editing comment
  const startEditing = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.content);
  };

  // Start replying to comment
  const startReplying = (commentId) => {
    setReplyingTo(commentId);
    setReplyText('');
  };

  // Format timestamp
  const formatTimestamp = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    
    return new Date(date).toLocaleDateString();
  };

  // Render a single comment and its replies recursively
  const renderComment = (comment, depth = 0) => {
    const isEditing = editingId === comment.id;
    const isReplying = replyingTo === comment.id;
    
    return (
      <Box 
        key={comment.id}
        marginLeft={depth > 0 ? `${depth * 24}px` : '0'}
        marginBottom="md"
        padding="md"
        borderRadius="md"
        border="1px solid"
        borderColor="borderColor"
        backgroundColor={depth % 2 === 1 ? 'background' : 'white'}
      >
        <Flex gap="sm" alignItems="flex-start">
          <Avatar 
            src={comment.authorAvatar} 
            name={comment.author} 
            size="sm" 
          />
          
          <Box flex="1">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" gap="xs">
                <Text fontWeight="bold">{comment.author}</Text>
                {comment.type !== COMMENT_SECTION_COMMENT_TYPES.STANDARD && (
                  <Badge variant="outline" size="sm">{comment.type}</Badge>
                )}
              </Flex>
              <Text fontSize="sm" color="textColorSecondary">
                {formatTimestamp(comment.timestamp)}
              </Text>
            </Flex>
            
            {isEditing ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '8px',
                    marginTop: '8px',
                    marginBottom: '8px',
                    minHeight: '80px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
                <Flex gap="sm" justifyContent="flex-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={() => handleEditComment(comment.id)}
                  >
                    Save
                  </Button>
                </Flex>
              </>
            ) : (
              <Text marginY="sm">{comment.content}</Text>
            )}
            
            <Flex gap="sm" marginTop="xs">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleLikeComment(comment.id, true)}
              >
                <Icon name="thumbs-up" size="sm" />
                {comment.likes > 0 && <Text marginLeft="xs">{comment.likes}</Text>}
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => startReplying(comment.id)}
              >
                <Icon name="reply" size="sm" />
                <Text marginLeft="xs">Reply</Text>
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => startEditing(comment)}
              >
                <Icon name="edit" size="sm" />
                <Text marginLeft="xs">Edit</Text>
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <Icon name="trash" size="sm" />
                <Text marginLeft="xs">Delete</Text>
              </Button>
            </Flex>
          </Box>
        </Flex>
        
        {isReplying && (
          <Box marginTop="md" marginLeft="24px">
            <Flex gap="sm" alignItems="flex-start">
              <Avatar 
                src={currentUser.avatar} 
                name={currentUser.name} 
                size="sm" 
              />
              <Box flex="1">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  style={{ 
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    minHeight: '80px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
                <Flex gap="sm" justifyContent="flex-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={() => handleReplyToComment(comment.id)}
                    disabled={!replyText.trim()}
                  >
                    Reply
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        )}
        
        {comment.replies?.length > 0 && (
          <Box marginTop="md">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Comment Section with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the CommentSection component with render props pattern
        to create a highly customized comment interface with complete control over rendering and behavior.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Custom Comment Section Implementation - to demonstrate how render props would work */}
        <Box 
          width="100%" 
          maxWidth="800px" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          padding="md"
        >
          <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
            <Text as="h3">Discussion</Text>
            
            <Flex alignItems="center" gap="sm">
              <Text>Sort by:</Text>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: '4px',
                  border: '1px solid #ccc' 
                }}
              >
                <option value={COMMENT_SECTION_SORT_OPTIONS.NEWEST}>Newest</option>
                <option value={COMMENT_SECTION_SORT_OPTIONS.OLDEST}>Oldest</option>
                <option value={COMMENT_SECTION_SORT_OPTIONS.MOST_LIKED}>Most Liked</option>
                <option value={COMMENT_SECTION_SORT_OPTIONS.MOST_REPLIED}>Most Replies</option>
              </select>
            </Flex>
          </Flex>
          
          {/* New Comment Form */}
          <Box marginBottom="lg">
            <Flex gap="sm" alignItems="flex-start">
              <Avatar 
                src={currentUser.avatar} 
                name={currentUser.name} 
                size="sm" 
              />
              <Box flex="1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  style={{ 
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    minHeight: '80px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
                <Flex justifyContent="flex-end">
                  <Button 
                    variant="primary"
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                  >
                    Post Comment
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
          
          {/* Comments List */}
          <Box>
            {getSortedComments().length === 0 ? (
              <Box 
                padding="lg" 
                textAlign="center" 
                borderRadius="md"
                backgroundColor="background"
              >
                <Icon name="message-circle" size="lg" />
                <Text marginTop="sm">No comments yet. Be the first to comment!</Text>
              </Box>
            ) : (
              getSortedComments().map(comment => renderComment(comment))
            )}
          </Box>
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">CommentSection with Render Props</Text>
            <Text marginBottom="md">
              The CommentSection component would benefit greatly from the render props pattern, 
              allowing for completely custom comment rendering and interactive behavior while 
              leveraging the component's state management.
            </Text>
            
            <Text as="h4" marginBottom="sm">Benefits of Render Props:</Text>
            <ul>
              <li>Custom comment thread visualization and nested replies</li>
              <li>Customized comment forms with rich text editing</li>
              <li>Integration with animation libraries for comment transitions</li>
              <li>Custom actions and interactions beyond the built-in options</li>
              <li>Advanced styling and theming for different contexts</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<CommentSection
  comments={comments}
  onAddComment={handleAddComment}
  onEditComment={handleEditComment}
  onDeleteComment={handleDeleteComment}
  onReplyToComment={handleReplyToComment}
  onLikeComment={handleLikeComment}
  onSortChange={handleSortChange}
>
  {({
    comments,
    sortedComments,
    sortOption,
    commentText,
    isSubmitting,
    handleCommentChange,
    handleSortChange,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment,
    handleReplyToComment,
    handleLikeComment
  }) => (
    <div className="custom-comments">
      {/* Custom header */}
      <header>
        <h3>Discussion ({comments.length})</h3>
        <CustomSortDropdown 
          value={sortOption}
          onChange={handleSortChange}
        />
      </header>
      
      {/* Custom comment form */}
      <div className="comment-form">
        <YourCustomEditor
          value={commentText}
          onChange={handleCommentChange}
          onSubmit={handleSubmitComment}
        />
      </div>
      
      {/* Custom comments list */}
      <div className="comments-list">
        {sortedComments.map(comment => (
          <YourCustomComment
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            onReply={handleReplyToComment}
            onLike={handleLikeComment}
            renderReplies={true}
          />
        ))}
      </div>
    </div>
  )}
</CommentSection>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example demonstrates how the CommentSection component could work with render props,
              though the component doesn't currently implement this pattern in our UI library. The custom 
              implementation shown here shows what would be possible with a render props-enabled version.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default CommentSectionRenderPropsExample;
