import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import '../styles/shared.css';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
      console.error('Unable to identify seeker');
      return;
    }

    try {
      console.log('Creating post with:', {
        url: `${config.API_BASE_URL}/api/v1/createPost`,
        token: token ? 'Token exists' : 'No token',
        customerId: customerId || 'No customerId'
      });

      const response = await fetch(`${config.API_BASE_URL}/api/v1/createPost`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          title,
          content,
          customerId,
        }),
      });

      console.log('Create post response status:', response.status);
      const result = await response.json();
      console.log('Create post response:', result);

      if (response.ok) {
        console.log('Post created successfully');
        if (onPostCreated) {
          onPostCreated();
        }
        navigate('/home', { state: { showMyPosts: true } });
      } else {
        console.error('Unable to share insight');
      }
    } catch (error) {
      console.error('Error sharing insight:', error);
    }
  };

  return (
    <Paper elevation={3} className="create-post-container">
      <Typography variant="h5" gutterBottom className="create-post-title">
        Share Your Insight
      </Typography>
      <Typography variant="body1" className="create-post-subtitle">
        Share your understanding and reflections with fellow seekers
      </Typography>
      <form onSubmit={handleSubmit} className="create-post-form">
        <TextField
          label="Title of Your Insight"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
          variant="outlined"
          placeholder="What is the essence of your understanding?"
          className="input-field"
        />
        <TextField
          label="Your Reflection"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
          multiline
          rows={8}
          margin="normal"
          variant="outlined"
          placeholder="Share your thoughts, experiences, and realizations..."
          className="input-field"
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          className="share-button"
        >
          Share Insight
        </Button>
      </form>
    </Paper>
  );
};

export default CreatePost;
