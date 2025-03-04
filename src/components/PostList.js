import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, Box, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import PostItem from './PostItem';
import '../styles/shared.css';
import './PostList.css';

const PostList = ({ userPosts = false }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [userPosts]);

  const fetchPosts = async () => {
    if (!hasMore) return;

    setLoading(true);
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    const url = userPosts
      ? `${config.API_BASE_URL}/api/v1/getAllPosts/${customerId}?page=${page}&size=10`
      : `${config.API_BASE_URL}/api/v1/getAllPosts?page=${page}&size=10`;

    try {
      console.log('Fetching posts with:', {
        url,
        token: token ? 'Token exists' : 'No token',
        customerId: customerId || 'No customerId'
      });
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
      console.log('Posts response status:', response.status);
      const data = await response.json();
      console.log('Posts response data:', data);
      
      if (response.ok) {
        setPosts(prevPosts => [...prevPosts, ...data.content]);
        setHasMore(data.content.length === 10);
        setPage(prevPage => prevPage + 1);
      } else {
        console.error('Unable to fetch insights');
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = (postId) => {
    setExpandedPostId(postId);
  };

  const handleClose = () => {
    setExpandedPostId(null);
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  if (loading && posts.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <Paper elevation={3} className="post-list-container">
        <Typography variant="h5" gutterBottom className="post-list-title">
          {userPosts ? 'Your Reflections' : 'Shared Insights'}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
          <Typography variant="body1" gutterBottom className="empty-message">
            {userPosts 
              ? "Begin your journey of sharing insights and reflections." 
              : "Be the first to share your insights with our community of seekers."}
          </Typography>
          {userPosts && (
            <Button 
              variant="contained" 
              onClick={handleCreatePost}
              className="start-button"
            >
              Share Your First Insight
            </Button>
          )}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className="post-list-container">
      <Typography variant="h5" gutterBottom className="post-list-title">
        {userPosts ? 'Your Reflections' : 'Shared Insights'}
      </Typography>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Typography variant="body2" textAlign="center" my={2} className="end-message">
            You've explored all shared insights
          </Typography>
        }
        scrollThreshold={0.9}
      >
        {posts.map(post => (
          <PostItem
            key={post.postId}
            post={post}
            expanded={post.postId === expandedPostId}
            onExpand={() => handleExpand(post.postId)}
            onClose={handleClose}
          />
        ))}
      </InfiniteScroll>
    </Paper>
  );
};

export default PostList;
