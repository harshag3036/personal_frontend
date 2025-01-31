import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, List, ListItem, ListItemText, Divider, IconButton, Modal, Box, Avatar, CircularProgress } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CloseIcon from '@mui/icons-material/Close';
import config from '../config';
import '../styles/shared.css';
import './PostItem.css';

const Comment = ({ comment, onLike, isLiked }) => (
  <ListItem alignItems="flex-start" className="comment-item">
    <ListItemText
      primary={comment.content}
      secondary={
        <React.Fragment>
          <Typography component="span" variant="body2" className="comment-author">
            {comment.author}
          </Typography>
          {' — '}
          <Typography component="span" variant="body2" className="comment-likes">
            {comment.likes} resonated with this
          </Typography>
        </React.Fragment>
      }
    />
    <IconButton
      edge="end"
      aria-label="resonate"
      onClick={() => onLike(comment.id)}
      disabled={isLiked}
      className="resonate-button"
    >
      {isLiked ? <ThumbUpIcon className="resonated" /> : <ThumbUpOffAltIcon />}
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
        console.error('Unable to fetch reflections');
      }
    } catch (error) {
      console.error('Error fetching reflections:', error);
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
        console.error('Unable to fetch resonated reflections');
      }
    } catch (error) {
      console.error('Error fetching resonated reflections:', error);
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
        console.error('Unable to share reflection');
      }
    } catch (error) {
      console.error('Error sharing reflection:', error);
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
        console.error('Unable to resonate with reflection');
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
      console.error('Error resonating with reflection:', error);
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
      <Typography variant="h5" component="div" className="insight-title">
        {post.title}
      </Typography>
      <Typography variant="body1" className="insight-content">
        {post.content}
      </Typography>
      <Box className="insight-author">
        <Avatar className="author-avatar">
          {post.customerUserName ? post.customerUserName[0].toUpperCase() : 'S'}
        </Avatar>
        <Typography variant="subtitle2" className="author-name">
          Shared by: {post.customerUserName || 'Seeker'}
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Share your reflection..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="reflection-input"
      />
      <Button 
        variant="contained" 
        onClick={handleCreateComment} 
        className="share-reflection-button"
      >
        Share Reflection
      </Button>
      <Box className="reflections-container">
        {loading ? (
          <Box className="loading-indicator">
            <CircularProgress size={24} />
          </Box>
        ) : comments.length > 0 ? (
          <List className="reflections-list">
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
          <Typography className="no-reflections">
            Be the first to share your reflection on this insight.
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <Card onClick={onExpand} className="insight-card">
        <CardContent>
          <Typography variant="h6" component="div" className="insight-title">
            {post.title.length > 100 ? `${post.title.substring(0, 100)}...` : post.title}
          </Typography>
          <Typography variant="body2" className="insight-preview">
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
