import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, List, ListItem, ListItemText, Divider, IconButton, Modal, Box, Avatar, CircularProgress } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CloseIcon from '@mui/icons-material/Close';
import config from '../config';
import './PostItem.css';

const Comment = ({ comment, onLike, isLiked }) => (
  <ListItem alignItems="flex-start" className="comment-item">
    <ListItemText
      primary={comment.content}
      secondary={
        <React.Fragment>
          <Typography component="span" variant="body2" color="text.primary">
            {comment.author}
          </Typography>
          {' — '}
          <Typography component="span" variant="body2" color="text.secondary">
            Likes: {comment.likes}
          </Typography>
        </React.Fragment>
      }
    />
    <IconButton
      edge="end"
      aria-label="like"
      onClick={() => onLike(comment.id)}
      disabled={isLiked}
      className="like-button"
    >
      {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOffAltIcon />}
    </IconButton>
  </ListItem>
);

const PostItem = ({ post, expanded, onExpand, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expanded) {
      fetchComments();
      fetchLikedComments();
    }
  }, [expanded, post.postId]);

  const fetchComments = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/getAllComments/${post.postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data.content);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedComments = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/getLikedComments/${post.postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const likedCommentIds = await response.json();
        setLikedComments(new Set(likedCommentIds));
      } else {
        console.error('Failed to fetch liked comments');
      }
    } catch (error) {
      console.error('Error fetching liked comments:', error);
    }
  };

  const handleCreateComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/createComment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: newComment,
          author: customerId,
          postId: post.postId,
        }),
      });
      if (response.ok) {
        const createdComment = await response.json();
        setComments(prevComments => [createdComment, ...prevComments]);
        setNewComment('');
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleLike = async (commentId) => {
    if (likedComments.has(commentId)) {
      return;
    }

    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
    setLikedComments(prevLiked => new Set(prevLiked).add(commentId));

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/increaseLikes/${commentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error('Failed to update like');
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === commentId ? { ...comment, likes: comment.likes - 1 } : comment
          )
        );
        setLikedComments(prevLiked => {
          const newSet = new Set(prevLiked);
          newSet.delete(commentId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error updating like:', error);
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId ? { ...comment, likes: comment.likes - 1 } : comment
        )
      );
      setLikedComments(prevLiked => {
        const newSet = new Set(prevLiked);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const renderExpandedContent = () => (
    <Box className="modal-content">
      <IconButton
        aria-label="close"
        onClick={onClose}
        className="close-button"
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="div" className="post-title">
        {post.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" className="post-content">
        {post.content}
      </Typography>
      <Box className="post-author">
        <Avatar className="author-avatar">{post.customerUserName ? post.customerUserName[0].toUpperCase() : 'A'}</Avatar>
        <Typography variant="subtitle2" color="text.secondary">
          Posted by: {post.customerUserName || 'Anonymous'}
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="comment-input"
      />
      <Button variant="contained" onClick={handleCreateComment} className="post-comment-button">
        Post Comment
      </Button>
      <Box className="comments-container">
        {loading ? (
          <Box className="loading-indicator">
            <CircularProgress size={24} />
          </Box>
        ) : comments.length > 0 ? (
          <List className="comments-list">
            {comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <Comment
                  comment={comment}
                  onLike={handleLike}
                  isLiked={likedComments.has(comment.id)}
                />
                {index < comments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography className="no-comments">No comments yet.</Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <Card onClick={onExpand} className="post-card">
        <CardContent>
          <Typography variant="h6" component="div" className="post-title">
            {post.title.length > 100 ? `${post.title.substring(0, 100)}...` : post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="post-content">
            {post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={expanded}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {renderExpandedContent()}
      </Modal>
    </React.Fragment>
  );
};

export default PostItem;
