import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Container, Tabs, Tab } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config';
import './Home.css';
import PostList from './PostList';

export default function Home() {
  const [firstLogin, setFirstLogin] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isGuest = localStorage.getItem('isGuest') === 'true';

  useEffect(() => {
    if (!isGuest) {
      const firstLoginStatus = localStorage.getItem('firstLogin') === 'true';
      setFirstLogin(firstLoginStatus);
    }

    if (location.state?.showMyPosts) {
      setTabValue(1);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, isGuest]);

  const handleSubmit = async () => {
    if (!name || !dob || !gender) {
      alert('All fields are required');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/customerData`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dob, gender }),
      });
      if (response.ok) {
        console.log('Customer data submitted successfully');
        setFirstLogin(false);
        localStorage.setItem('firstLogin', 'false');
      } else {
        console.error('Failed to submit customer data');
      }
    } catch (error) {
      console.error('Error submitting customer data:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreatePost = () => {
    if (isGuest) {
      setShowLoginPrompt(true);
      return;
    }
    navigate('/create-post');
  };

  const handleChatBot = () => {
    navigate('/chatbot');
  };

  const handleLoginRedirect = () => {
    localStorage.clear(); // Clear all localStorage items
    navigate('/');
  };

  return (
    <div className="home-container">
      <Container maxWidth="md" className="main-content">
        <div className="header">
          <Typography variant="h4" className="welcome-text">Social Feed</Typography>
          <div className="header-buttons">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCreatePost}
              className="create-post-btn"
            >
              Create Post
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleChatBot}
              className="chatbot-btn"
            >
              Chat Bot
            </Button>
          </div>
        </div>

        {showLoginPrompt && isGuest ? (
          <Paper elevation={3} className="login-prompt-paper">
            <Typography variant="h6" align="center" gutterBottom>
              Create Your First Post
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              You need to be logged in to create posts. Please login or sign up to continue.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLoginRedirect}
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Go to Login
            </Button>
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => setShowLoginPrompt(false)}
              fullWidth
              style={{ marginTop: '8px' }}
            >
              Continue Browsing
            </Button>
          </Paper>
        ) : firstLogin && !isGuest ? (
          <Paper elevation={3} className="profile-paper">
            <Typography variant="h6" align="center">Complete Your Profile</Typography>
            <Box className="profile-form">
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => {
                    console.log('Date of Birth selected:', newValue);
                    setDob(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} required className="profile-input" />}
                />
              </LocalizationProvider>
              <FormControl className="profile-input" required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit} 
                className="profile-submit"
              >
                Submit
              </Button>
            </Box>
          </Paper>
        ) : (
          <Box className="posts-container">
            <Tabs value={tabValue} onChange={handleTabChange} centered className="post-tabs">
              <Tab label="All Posts" />
              <Tab label="My Posts" />
            </Tabs>
            {tabValue === 0 && <PostList key="all-posts" />}
            {tabValue === 1 && <PostList key="my-posts" userPosts />}
          </Box>
        )}
      </Container>
    </div>
  );
}
