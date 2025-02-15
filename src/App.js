/**
 * App Component
 * 
 * Purpose:
 * This is the main application component that:
 * 1. Manages routing and navigation
 * 2. Handles authentication state
 * 3. Provides the core application structure
 * 4. Supports the journey of understanding
 */

import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CssBaseline, Paper, Typography, Button } from '@mui/material';
import Login from './components/Login';
import Activities from './components/Activities';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Profile from './components/Profile';
import ShareInsight from './components/ShareInsight';
import LandingPage from './components/LandingPage';
import ChatBot from './components/ChatBot';
import AddChatData from './components/AddChatData';
import UpdateChatData from './components/UpdateChatData';
import Feedback from './components/Feedback';
import NoteBook from './components/NoteBook';
import Articles from './components/Articles';
import PostView from './components/PostView';
import BookmarkManager from './components/BookmarkManager';
import ForumList from './components/ForumList';
import ForumTopic from './components/ForumTopic';
import ThreadView from './components/ThreadView';
import CreateThread from './components/CreateThread';
import ProtectedRoute from './components/ProtectedRoute';
import Appbar from './components/Appbar';
import config from './config';
import './styles/shared.css';
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

  const showNavbar = !['/login', '/signin', '/'].includes(location.pathname);

  return (
    <div className="app">
      <CssBaseline />
      {showNavbar && <Appbar />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/add-chat-data" element={<AddChatData />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/posts/:postId" element={<PostView />} />
          <Route path="/articles/bookmarks" element={<BookmarkManager />} />
          {!isGuest && (
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          )}
          <Route path="/forums" element={<ProtectedRoute><ForumList /></ProtectedRoute>} />
          <Route path="/forums/:categoryId" element={<ProtectedRoute><ForumTopic /></ProtectedRoute>} />
          <Route path="/forums/:categoryId/thread/:threadId" element={<ProtectedRoute><ThreadView /></ProtectedRoute>} />
          <Route path="/forums/:categoryId/create" element={<ProtectedRoute><CreateThread /></ProtectedRoute>} />
          <Route path="/share-insight" element={
            <ProtectedRoute>
              {isGuest ? (
                <Paper elevation={3} className="guest-prompt">
                  <Typography variant="h6" gutterBottom className="guest-prompt-title">
                    Begin Your Journey of Understanding
                  </Typography>
                  <Typography variant="body1" gutterBottom className="guest-prompt-text">
                    To share your insights and contribute to our collective understanding, 
                    please join our community of seekers and explorers.
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => {
                      localStorage.clear();
                      navigate('/login');
                    }}
                    className="start-button"
                  >
                    Begin Journey
                  </Button>
                </Paper>
              ) : (
                <ShareInsight />
              )}
            </ProtectedRoute>
          } />
          <Route path="/notebook" element={<NoteBook />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/chatbot-update" element={<UpdateChatData />} />
        </Routes>
        <Feedback />
      </div>
    </div>
  );
}

export default App;
