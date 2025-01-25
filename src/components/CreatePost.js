import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
      console.error('Customer ID not found');
      return;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/createPost`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          customerId,
        }),
      });

      if (response.ok) {
        if (onPostCreated) {
          onPostCreated();
        }
        // Navigate to home page with MyPosts tab selected
        navigate('/home', { state: { showMyPosts: true } });
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ 
      padding: '30px',
      maxWidth: '800px',
      margin: '20px auto',
      borderRadius: '12px',
      backgroundColor: '#ffffff'
    }}>
      <Typography variant="h5" gutterBottom style={{ 
        color: '#1a237e',
        textAlign: 'center',
        marginBottom: '24px',
        fontWeight: '600'
      }}>
        Create New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
          variant="outlined"
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&:hover fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
          multiline
          rows={6}
          margin="normal"
          variant="outlined"
          sx={{
            marginBottom: '24px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&:hover fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          style={{ 
            padding: '12px',
            backgroundColor: '#3f51b5',
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          Create Post
        </Button>
      </form>
    </Paper>
  );
};

export default CreatePost;
