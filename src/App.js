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
import LandingPage from './components/LandingPage';
import ChatBot from './components/ChatBot';
import AddChatData from './components/AddChatData';
import UpdateChatData from './components/UpdateChatData';
import Feedback from './components/Feedback';
import NoteBook from './components/NoteBook';
import ProtectedRoute from './components/ProtectedRoute';
import Appbar from './components/Appbar';
import Articles from './components/Articles';
import ForumList from './components/ForumList';
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
          <Route path="/forums" element={<ForumList />} />
          {!isGuest && (
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          )}
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
