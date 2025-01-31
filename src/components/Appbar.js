import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';
import './Appbar.css';

export default function Appbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <Box className="appbar-wrapper">
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">
          <Typography 
            variant="h6" 
            component="div" 
            className="logo"
            onClick={handleHome}
          >
            Contemplative Space
          </Typography>
          <div className="nav-buttons">
            {isLoggedIn ? (
              <>
                <Button 
                  color="inherit" 
                  onClick={handleHome}
                  className="nav-button"
                >
                  Insights
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/forums')}
                  className="nav-button"
                >
                  Forums
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/articles')}
                  className="nav-button"
                >
                  Articles
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/chatbot')}
                  className="nav-button"
                >
                  ChatBot
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/profile')}
                  className="nav-button"
                >
                  Profile
                </Button>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  className="nav-button"
                >
                  End Journey
                </Button>
              </>
            ) : (
              <Button 
                color="inherit" 
                onClick={handleLogin}
                className="nav-button"
              >
                Begin Journey
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
