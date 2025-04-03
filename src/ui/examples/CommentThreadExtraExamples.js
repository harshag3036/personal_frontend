import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  Icon,
  Avatar,
  Badge,
  Divider,
} from '../atoms';
import Card from '../molecules/Card';
import Textarea from '../molecules/Textarea';
import CommentThread from '../molecules/CommentThread/CommentThread';

/**
 * CodeReviewStyleComments
 * 
 * Demonstrates a code review style comment thread implementation using render props.
 */
const CodeReviewStyleComments = () => {
  // Sample user data
  const currentUser = {
    id: 'user123',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=68',
    role: 'Developer',
  };
  
  // Sample comment data for code review
  const [commentData, setCommentData] = useState({
    id: 'comment1',
    userId: 'user456',
    userName: 'Taylor Smith',
    userRole: 'Senior Developer',
    userAvatar: 'https://i.pravatar.cc/150?img=49',
    content: 'We should use a more descriptive variable name here. `userInput` would be clearer than just `input`.',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    currentUserId: currentUser.id,
    filePath: 'src/components/UserForm.js',
    lineNumber: 42,
    status: 'open', // open, resolved, wontfix
    reactions: { },
  });
  
  // Sample replies
  const [replies, setReplies] = useState([
    {
      id: 'reply1',
      userId: 'user789',
      userName: 'Jordan Casey',
      userRole: 'Tech Lead',
      userAvatar: 'https://i.pravatar.cc/150?img=32',
      content: 'Good catch. We should also consider renaming other variables to follow the same convention for consistency.',
      createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      currentUserId: currentUser.id,
      reactions: { },
    },
    {
      id: 'reply2',
      userId: 'user123',
      userName: 'Alex Johnson',
      userRole: 'Developer',
      userAvatar: 'https://i.pravatar.cc/150?img=68',
      content: 'I\'ve updated this in my latest commit. Changed to `userInput` for clarity and renamed related variables.',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
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
      userRole: currentUser.role,
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
  
  const handleResolve = () => {
    setCommentData({
      ...commentData,
      status: 'resolved',
      resolvedAt: new Date().toISOString(),
      resolvedBy: currentUser.id,
    });
  };
  
  const handleReopen = () => {
    setCommentData({
      ...commentData,
      status: 'open',
      resolvedAt: null,
      resolvedBy: null,
    });
  };
  
  return (
    <Card>
      <CommentThread
        comment={commentData}
        replies={replies}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        variant="compact"
      >
        {(threadState) => (
          <Box>
            {/* File info header */}
            <Flex 
              alignItems="center" 
              px="md" 
              py="sm" 
              borderBottom="1px solid" 
              borderColor="gray.200"
              backgroundColor="gray.50"
            >
              <Icon name="file-code" mr="xs" />
              <Text fontWeight="medium">{commentData.filePath}</Text>
              <Text ml="sm" color="gray.600">Line {commentData.lineNumber}</Text>
              
              <Badge 
                ml="auto" 
                colorScheme={commentData.status === 'resolved' ? 'green' : 'blue'}
              >
                {commentData.status === 'resolved' ? 'Resolved' : 'Open'}
              </Badge>
            </Flex>
            
            {/* Main comment */}
            <Box 
              p="md" 
              backgroundColor={commentData.status === 'resolved' ? 'gray.50' : 'white'}
              opacity={commentData.status === 'resolved' ? 0.8 : 1}
              borderBottom="1px solid" 
              borderColor="gray.200"
            >
              <Flex justifyContent="space-between" mb="sm">
                <Flex alignItems="center">
                  <Avatar 
                    src={threadState.comment.userAvatar} 
                    name={threadState.comment.userName}
                    size="sm"
                    mr="sm"
                  />
                  <Box>
                    <Flex alignItems="center">
                      <Text fontWeight="bold" mr="xs">{threadState.comment.userName}</Text>
                      <Badge size="sm" colorScheme="purple">{threadState.comment.userRole}</Badge>
                    </Flex>
                    <Text fontSize="xs" color="gray.500">{threadState.formatDate(threadState.comment.createdAt)}</Text>
                  </Box>
                </Flex>
                
                <Flex>
                  {commentData.status === 'open' ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      colorScheme="green"
                      leftIcon="check"
                      onClick={handleResolve}
                    >
                      Resolve
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleReopen}
                    >
                      Reopen
                    </Button>
                  )}
                </Flex>
              </Flex>
              
              {threadState.isEditing ? (
                <Box>
                  <Textarea
                    value={threadState.editContent}
                    onChange={threadState.handleEditContentChange}
                    rows={3}
                  />
                  <Flex mt="sm" justifyContent="flex-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      mr="sm"
                      onClick={threadState.handleToggleEdit}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={threadState.handleEdit}
                    >
                      Save
                    </Button>
                  </Flex>
                </Box>
              ) : (
                <Box>
                  <Text mb="sm">{threadState.comment.content}</Text>
                  
                  <Flex justifyContent="flex-end">
                    {threadState.isAuthor && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          leftIcon="edit" 
                          mr="sm"
                          onClick={threadState.handleToggleEdit}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          leftIcon="trash" 
                          colorScheme="red"
                          onClick={threadState.handleDelete}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Flex>
                </Box>
              )}
            </Box>
            
            {/* Replies */}
            {threadState.replies.length > 0 && (
              <Box>
                {threadState.replies.map((reply, index) => (
                  <CommentThread
                    key={reply.id}
                    comment={reply}
                    replies={[]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    allowReply={false}
                    variant="compact"
                  >
                    {(replyState) => (
                      <Box 
                        p="md" 
                        pl={6} 
                        backgroundColor="gray.50"
                        borderBottom={index < threadState.replies.length - 1 ? "1px solid" : "none"}
                        borderColor="gray.200"
                        opacity={commentData.status === 'resolved' ? 0.8 : 1}
                      >
                        <Flex alignItems="center" mb="sm">
                          <Box width="3px" height="100%" backgroundColor="gray.300" mr="sm"></Box>
                          <Avatar 
                            src={replyState.comment.userAvatar} 
                            name={replyState.comment.userName}
                            size="sm"
                            mr="sm"
                          />
                          <Box>
                            <Flex alignItems="center">
                              <Text fontWeight="bold" mr="xs">{replyState.comment.userName}</Text>
                              <Badge size="sm" colorScheme="purple">{replyState.comment.userRole}</Badge>
                            </Flex>
                            <Text fontSize="xs" color="gray.500">{replyState.formatDate(replyState.comment.createdAt)}</Text>
                          </Box>
                        </Flex>
                        
                        {replyState.isEditing ? (
                          <Box ml="6">
                            <Textarea
                              value={replyState.editContent}
                              onChange={replyState.handleEditContentChange}
                              rows={3}
                            />
                            <Flex mt="sm" justifyContent="flex-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                mr="sm"
                                onClick={replyState.handleToggleEdit}
                              >
                                Cancel
                              </Button>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={replyState.handleEdit}
                              >
                                Save
                              </Button>
                            </Flex>
                          </Box>
                        ) : (
                          <Box ml="6">
                            <Text mb="sm">{replyState.comment.content}</Text>
                            
                            {replyState.isAuthor && (
                              <Flex justifyContent="flex-end">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  leftIcon="edit" 
                                  mr="sm"
                                  onClick={replyState.handleToggleEdit}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  leftIcon="trash" 
                                  colorScheme="red"
                                  onClick={replyState.handleDelete}
                                >
                                  Delete
                                </Button>
                              </Flex>
                            )}
                          </Box>
                        )}
                      </Box>
                    )}
                  </CommentThread>
                ))}
              </Box>
            )}
            
            {/* Reply form */}
            {!threadState.isReplying ? (
              <Flex 
                p="md" 
                borderTop={threadState.replies.length > 0 ? "none" : "1px solid"}
                borderColor="gray.200"
                justifyContent="center"
                backgroundColor="gray.50"
              >
                <Button 
                  variant="outline"
                  size="sm"
                  leftIcon="message-circle"
                  onClick={threadState.handleToggleReply}
                  isDisabled={commentData.status === 'resolved'}
                >
                  Add a reply
                </Button>
              </Flex>
            ) : (
              <Box 
                p="md" 
                borderTop={threadState.replies.length > 0 ? "none" : "1px solid"}
                borderColor="gray.200"
                backgroundColor="gray.50"
              >
                <Textarea
                  placeholder="Reply to this comment..."
                  value={threadState.replyContent}
                  onChange={threadState.handleReplyContentChange}
                  rows={3}
                  backgroundColor="white"
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
            )}
          </Box>
        )}
      </CommentThread>
    </Card>
  );
};

/**
 * ForumDiscussionStyleComments
 * 
 * Demonstrates a forum discussion style comment thread implementation using render props.
 */
const ForumDiscussionStyleComments = () => {
  // Sample user data
  const currentUser = {
    id: 'user123',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=68',
    joinDate: '2024-02-15',
    postCount: 157,
    role: 'Member',
  };
  
  // Simplified version - just a placeholder
  return (
    <Card>
      <Box p="md">
        <Text>Forum Discussion Style Example (Simplified)</Text>
        <Text fontSize="sm" color="gray.500" mt="md">
          This would be a more robust forum-style discussion implementation with topic tags, 
          voting, sorting, pagination, badges, etc.
        </Text>
      </Box>
    </Card>
  );
};

export { CodeReviewStyleComments, ForumDiscussionStyleComments };
