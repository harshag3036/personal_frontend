import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CssBaseline, AppBar, Button, Toolbar, Typography, Paper } from '@mui/material';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import LandingPage from './components/LandingPage';
import ChatBot from './components/ChatBot';
import AddChatData from './components/AddChatData';
import UpdateChatData from './components/UpdateChatData';
import Feedback from './components/Feedback';
import ProtectedRoute from './components/ProtectedRoute';
import config from './config';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isGuest = localStorage.getItem('isGuest') === 'true';

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      const isGuest = localStorage.getItem('isGuest') === 'true';

      if (token) {
        try {
          const response = await fetch(`${config.API_BASE_URL}/api/v1/home`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            if (location.pathname === '/') {
              navigate('/home');
            }
          } else {
            if (!isGuest) {
              localStorage.clear();
              navigate('/');
            }
          }
        } catch (error) {
          if (!isGuest) {
            localStorage.clear();
            navigate('/');
          }
        }
      }
    };

    if (location.pathname !== '/signin' && location.pathname !== '/login') {
      checkToken();
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const showNavbar = !['/login', '/signin', '/'].includes(location.pathname);

  return (
    <>
      <CssBaseline />
      <div className="app-container">
        {showNavbar && (
          <AppBar position="static" className="app-bar">
            <Toolbar>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ flexGrow: 1 }} 
                className="app-title"
              >
                RoastMe
              </Typography>
              <div className="nav-buttons">
                <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
                <Button color="inherit" onClick={() => navigate('/chatbot')}>Chat Bot</Button>
                {!isGuest && (
                  <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
                )}
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </div>
            </Toolbar>
          </AppBar>
        )}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/add-chat-data" element={<AddChatData />} />
            <Route path="/chatbot-update" element={<UpdateChatData />} />
            {!isGuest && (
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            )}
            <Route path="/create-post" element={
              <ProtectedRoute>
                {isGuest ? (
                  <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Create Your First Post
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      You need to be logged in to create posts. Please login or sign up to continue.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => {
                        localStorage.clear();
                        navigate('/login');
                      }}
                      style={{ marginTop: '16px' }}
                    >
                      Go to Login
                    </Button>
                  </Paper>
                ) : (
                  <CreatePost />
                )}
              </ProtectedRoute>
            } />
          </Routes>
          <Feedback />
        </main>
      </div>
    </>
  );
}

export default App;
