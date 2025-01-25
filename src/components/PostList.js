import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, Box, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import PostItem from './PostItem';
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
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(prevPosts => [...prevPosts, ...data.content]);
        setHasMore(data.content.length === 10);
        setPage(prevPage => prevPage + 1);
      } else {
        console.error('Failed to fetch posts');
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
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
          {userPosts ? 'My Posts' : 'All Posts'}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
          <Typography variant="body1" gutterBottom>
            {userPosts ? "You haven't created any posts yet." : "There are no posts available."}
          </Typography>
          {userPosts && (
            <Button variant="contained" color="primary" onClick={handleCreatePost}>
              Create Your First Post
            </Button>
          )}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className="post-list-container">
      <Typography variant="h5" gutterBottom className="post-list-title">
        {userPosts ? 'My Posts' : 'All Posts'}
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
          <Typography variant="body2" textAlign="center" my={2}>
            You've seen all posts
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
