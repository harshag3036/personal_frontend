import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  Avatar,
  Divider,
} from '../atoms';
import Card from '../molecules/Card';
import Textarea from '../molecules/Textarea';
import CommentThread from '../molecules/CommentThread/CommentThread';
import { CodeReviewStyleComments, ForumDiscussionStyleComments } from './CommentThreadExtraExamples';

/**
 * CommentThreadRenderPropsExample
 * 
 * This example demonstrates how to use the CommentThread component with render props
 * to create highly customized comment thread interfaces.
 */
const CommentThreadRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Comment Threads with Render Props</Text>
      
      {/* Basic Custom CommentThread */}
      <Text as="h3" marginBottom="md">Modern Social Media Style</Text>
      <Box marginBottom="xl">
        <SocialMediaStyleComments />
      </Box>
      
      {/* Code Review Style */}
      <Text as="h3" marginY="md">Code Review Style</Text>
      <Box marginBottom="xl">
        <CodeReviewStyleComments />
      </Box>
      
      {/* Forum Discussion Style */}
      <Text as="h3" marginY="md">Forum Discussion Style</Text>
      <Box marginBottom="xl">
        <ForumDiscussionStyleComments />
      </Box>
    </Box>
  );
};

/**
 * SocialMediaStyleComments
 * 
 * Demonstrates a social media style comment thread implementation using render props.
 */
const SocialMediaStyleComments = () => {
  // Sample user data
  const currentUser = {
    id: 'user123',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=68',
  };
  
  // Sample comment data
  const [commentData, setCommentData] = useState({
    id: 'comment1',
    userId: 'user456',
    userName: 'Taylor Smith',
    userAvatar: 'https://i.pravatar.cc/150?img=49',
    content: 'Really enjoyed this post! The insights about responsive design patterns are particularly helpful for my current project.',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    currentUserId: currentUser.id,
    reactions: {
      like: { count: 5, users: ['user123', 'user789'] },
      love: { count: 2, users: [] },
    },
  });
  
  // Sample replies
  const [replies, setReplies] = useState([
    {
      id: 'reply1',
      userId: 'user789',
      userName: 'Jordan Casey',
      userAvatar: 'https://i.pravatar.cc/150?img=32',
      content: "Agreed! I've been implementing these patterns in my work as well, and they've made a huge difference in how our team approaches responsive design.",
      createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      currentUserId: currentUser.id,
      reactions: {
        like: { count: 2, users: [] },
      },
    },
    {
      id: 'reply2',
      userId: 'user123',
      userName: 'Alex Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=68',
      content: 'Have you tried combining this with CSS Grid? I found that approach to be even more flexible for complex layouts.',
      createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      currentUserId: currentUser.id,
      reactions: { },
    },
  ]);
  
  // Handlers
  const handleReply = (commentId, content) => {
    const newReply = {
      id: `reply${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      createdAt: new Date().toISOString(),
      currentUserId: currentUser.id,
      reactions: { },
    };
    
    setReplies([...replies, newReply]);
  };
  
  const handleEdit = (commentId, content) => {
    if (commentId === commentData.id) {
      setCommentData({
        ...commentData,
        content,
        updatedAt: new Date().toISOString(),
      });
    } else {
      setReplies(
        replies.map(reply =>
          reply.id === commentId
            ? { ...reply, content, updatedAt: new Date().toISOString() }
            : reply
        )
      );
    }
  };
  
  const handleDelete = (commentId) => {
    if (commentId === commentData.id) {
      // In a real app, you'd likely hide the comment rather than removing entirely
      console.log('Deleting main comment');
    } else {
      setReplies(replies.filter(reply => reply.id !== commentId));
    }
  };
  
  const handleReaction = (commentId, reactionType) => {
    const userId = currentUser.id;
    
    if (commentId === commentData.id) {
      const hasReacted = commentData.reactions[reactionType]?.users?.includes(userId);
      
      setCommentData({
        ...commentData,
        reactions: {
          ...commentData.reactions,
          [reactionType]: {
            count: hasReacted 
              ? (commentData.reactions[reactionType]?.count || 1) - 1 
              : (commentData.reactions[reactionType]?.count || 0) + 1,
            users: hasReacted
              ? (commentData.reactions[reactionType]?.users || []).filter(id => id !== userId)
              : [...(commentData.reactions[reactionType]?.users || []), userId],
          },
        },
      });
    } else {
      setReplies(
        replies.map(reply => {
          if (reply.id !== commentId) return reply;
          
          const hasReacted = reply.reactions[reactionType]?.users?.includes(userId);
          
          return {
            ...reply,
            reactions: {
              ...reply.reactions,
              [reactionType]: {
                count: hasReacted 
                  ? (reply.reactions[reactionType]?.count || 1) - 1 
                  : (reply.reactions[reactionType]?.count || 0) + 1,
                users: hasReacted
                  ? (reply.reactions[reactionType]?.users || []).filter(id => id !== userId)
                  : [...(reply.reactions[reactionType]?.users || []), userId],
              },
            },
          };
        })
      );
    }
  };
  
  return (
    <Card>
      <CommentThread
        comment={commentData}
        replies={replies}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReaction={handleReaction}
      >
        {(threadState) => (
          <Box>
            {/* Main comment */}
            <SocialMediaComment 
              threadState={threadState} 
              isMainComment={true}
            />
            
            {/* Divider with reply count if there are replies */}
            {threadState.replies.length > 0 && (
              <Flex alignItems="center" my="sm" px="md">
                <Divider flex="1" />
                <Text fontSize="sm" mx="sm" color="gray.500">
                  {threadState.replies.length} {threadState.replies.length === 1 ? 'reply' : 'replies'}
                </Text>
                <Divider flex="1" />
              </Flex>
            )}
            
            {/* Replies */}
            {threadState.replies.map(reply => (
              <CommentThread
                key={reply.id}
                comment={reply}
                replies={[]}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReaction={handleReaction}
                onReply={() => {}} // Not allowing nested replies in this example
                allowReply={false}
              >
                {(replyState) => (
                  <Box ml={24} mb="md">
                    <SocialMediaComment 
                      threadState={replyState} 
                      isMainComment={false}
                    />
                  </Box>
                )}
              </CommentThread>
            ))}
            
            {/* Reply form */}
            {!threadState.isReplying ? (
              <Flex px="md" py="sm" alignItems="center">
                <Avatar 
                  src={currentUser.avatar} 
                  size="sm" 
                  mr="sm"
                />
                <Box 
                  flex="1" 
                  p="sm" 
                  borderRadius="full" 
                  backgroundColor="gray.100"
                  _hover={{ backgroundColor: 'gray.200' }}
                  cursor="pointer"
                  onClick={threadState.handleToggleReply}
                >
                  <Text color="gray.500">Write a reply...</Text>
                </Box>
              </Flex>
            ) : (
              <Box px="md" py="sm">
                <Flex alignItems="start">
                  <Avatar 
                    src={currentUser.avatar} 
                    size="sm" 
                    mr="sm"
                  />
                  <Box flex="1">
                    <Textarea
                      placeholder="Write a reply..."
                      value={threadState.replyContent}
                      onChange={threadState.handleReplyContentChange}
                      rows={3}
                      backgroundColor="white"
                      borderRadius="md"
                      autoFocus
                    />
                    <Flex mt="sm" justifyContent="flex-end">
                      <Button 
                        variant="ghost" 
                        mr="sm"
                        onClick={threadState.handleToggleReply}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary"
                        onClick={threadState.handleReply}
                        isDisabled={!threadState.replyContent.trim()}
                      >
                        Reply
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )}
          </Box>
        )}
      </CommentThread>
    </Card>
  );
};

/**
 * SocialMediaComment - Helper component for the SocialMediaStyleComments example
 */
const SocialMediaComment = ({ threadState, isMainComment }) => {
  const { comment, isEditing, editContent, handleToggleEdit, handleEditContentChange, handleEdit } = threadState;
  
  const getReactionIcon = (reactionType) => {
    switch(reactionType) {
      case 'like': return '👍';
      case 'love': return '❤️';
      case 'haha': return '😂';
      case 'wow': return '😮';
      case 'sad': return '😢';
      case 'angry': return '😡';
      default: return '👍';
    }
  };
  
  return (
    <Box 
      p="md" 
      backgroundColor={isMainComment ? 'white' : 'gray.50'}
      borderRadius="md"
    >
      <Flex alignItems="start">
        {/* Avatar */}
        <Avatar 
          src={comment.userAvatar}
          name={comment.userName}
          size="md"
          mr="sm"
        />
        
        <Box flex="1">
          {/* Comment content */}
          <Box
            backgroundColor="white"
            borderRadius="lg"
            p="md"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            {/* Author and timestamp */}
            <Flex alignItems="center" mb="xs">
              <Text fontWeight="bold" mr="xs">{comment.userName}</Text>
              <Text fontSize="xs" color="gray.500">
                {threadState.formatDate(comment.createdAt)}
                {comment.updatedAt && " • edited"}
              </Text>
            </Flex>
            
            {/* Content or edit form */}
            {isEditing ? (
              <Box>
                <Textarea
                  value={editContent}
                  onChange={handleEditContentChange}
                  rows={3}
                  backgroundColor="white"
                  borderRadius="md"
                />
                <Flex mt="sm">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    mr="sm"
                    onClick={handleToggleEdit}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={handleEdit}
                  >
                    Save
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Text>{comment.content}</Text>
            )}
          </Box>
          
          {/* Reactions and actions */}
          <Flex mt="xs" alignItems="center">
            {/* Reactions */}
            <Flex mr="auto">
              {Object.entries(comment.reactions || {}).filter(([_, data]) => data.count > 0).map(([reaction, data]) => (
                <Box
                  key={reaction}
                  as="button"
                  mr="sm"
                  aria-label={`${reaction} reaction`}
                  display="flex"
                  alignItems="center"
                  color={threadState.hasReacted(reaction) ? 'primary.500' : 'gray.600'}
                  fontWeight={threadState.hasReacted(reaction) ? 'medium' : 'normal'}
                  onClick={() => threadState.handleReaction(reaction)}
                  _hover={{ textDecoration: 'underline' }}
                >
                  <Text as="span" mr="xs">{getReactionIcon(reaction)}</Text>
                  <Text as="span" fontSize="sm">{data.count}</Text>
                </Box>
              ))}
              
              {/* Add reaction */}
              <Box
                as="button"
                mr="sm"
                aria-label="Add reaction"
                display="flex"
                alignItems="center"
                color="gray.600"
                onClick={() => threadState.handleReaction('like')}
                _hover={{ color: 'primary.500' }}
              >
                <Text as="span" fontSize="sm">Like</Text>
              </Box>
            </Flex>
            
            {/* Actions: Reply, Edit, Delete */}
            <Flex>
              {threadState.allowReply && (
                <Button
                  variant="ghost"
                  size="xs"
                  color="gray.600"
                  mr="sm"
                  onClick={threadState.handleToggleReply}
                >
                  Reply
                </Button>
              )}
              
              {threadState.isAuthor && threadState.allowEdit && (
                <Button
                  variant="ghost"
                  size="xs"
                  color="gray.600"
                  mr="sm"
                  onClick={handleToggleEdit}
                >
                  Edit
                </Button>
              )}
              
              {threadState.isAuthor && threadState.allowDelete && (
                <Button
                  variant="ghost"
                  size="xs"
                  color="gray.600"
                  onClick={threadState.handleDelete}
                >
                  Delete
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CommentThreadRenderPropsExample;
