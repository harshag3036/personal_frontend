/**
 * Home Component
 * 
 * Purpose:
 * This component serves as the main interface for users to:
 * 1. Begin their journey of self-discovery
 * 2. Share and explore insights mindfully
 * 3. Engage with content in a way that promotes understanding
 * 4. Track their progress in understanding
 */

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Container, 
    Tabs, 
    Tab 
} from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config';
import '../styles/shared.css';
import './Home.css';
import InsightCollection from './mindful/InsightCollection';

export default function Home() {
  const [firstLogin, setFirstLogin] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isGuest, isAuthenticated, authChecked } = useUser();

  useEffect(() => {
    if (authChecked) {
      if (!isAuthenticated) {
        navigate('/');
        return;
      }

      if (!isGuest) {
        const firstLoginStatus = localStorage.getItem('firstLogin') === 'true';
        setFirstLogin(firstLoginStatus);
      }

      if (location.state?.showMyPosts) {
        setTabValue(1);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, isGuest, isAuthenticated, authChecked, navigate]);

  if (!authChecked) {
    return null; // Don't render anything until auth is checked
  }

  const handleSubmit = async () => {
    if (!name || !dob || !gender) {
      alert('Please complete all fields to begin your journey');
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
        setFirstLogin(false);
        localStorage.setItem('firstLogin', 'false');
      } else {
        console.error('Unable to begin journey');
      }
    } catch (error) {
      console.error('Error starting journey:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreateInsight = () => {
    if (isGuest) {
      setShowLoginPrompt(true);
      return;
    }
    navigate('/share-insight');
  };

  const handleChatBot = () => {
    navigate('/chatbot');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <Container maxWidth="md" className="main-content">
        <div className="header">
          <Typography variant="h4" className="welcome-text">
            Journey of Understanding
          </Typography>
          <div className="header-buttons">
            <Button 
              variant="contained" 
              onClick={handleCreateInsight}
              className="create-insight-btn"
            >
              Share Your Understanding
            </Button>
          </div>
        </div>

        {showLoginPrompt && isGuest ? (
          <Paper elevation={3} className="login-prompt-paper">
            <Typography variant="h6" align="center" gutterBottom>
              Begin Your Journey of Understanding
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              To share your insights and contribute to our collective understanding, 
              please join our community of seekers and explorers.
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleLoginRedirect}
              className="start-button"
              fullWidth
            >
              Begin Journey
            </Button>
            <Button 
              variant="text" 
              onClick={() => setShowLoginPrompt(false)}
              className="continue-button"
              fullWidth
            >
              Continue Exploring
            </Button>
          </Paper>
        ) : firstLogin && !isGuest ? (
          <Paper elevation={3} className="profile-paper">
            <Typography variant="h6" align="center">Create Your Path</Typography>
            <Box className="profile-form">
              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
                required
                placeholder="As you wish to be known"
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Your Journey's Beginning"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => 
                    <TextField {...params} required className="profile-input" />
                  }
                />
              </LocalizationProvider>
              <FormControl className="profile-input" required>
                <InputLabel>Identity</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Identity"
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                onClick={handleSubmit} 
                className="start-button"
              >
                Begin Your Journey
              </Button>
            </Box>
          </Paper>
        ) : (
          <Box className="insights-container">
            <Tabs value={tabValue} onChange={handleTabChange} centered className="insight-tabs">
              <Tab label="All Insights" />
              <Tab label="My Journey" />
            </Tabs>
            {tabValue === 0 && <InsightCollection key="all-insights" />}
            {tabValue === 1 && <InsightCollection key="my-insights" userInsights />}
          </Box>
        )}
      </Container>
    </div>
  );
}
