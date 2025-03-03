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
import { CssBaseline } from '@mui/material';
import { UserProvider, useUser } from './contexts/UserContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { TemplateProvider } from './contexts/TemplateContext';
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
import Communities from './components/community/Communities';
import CreateCommunity from './components/community/CreateCommunity';
import CircleView from './components/community/CircleView';
import config from './config';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/signin', '/'];
  const showNavbar = !publicRoutes.includes(location.pathname);

  return (
    <UserProvider>
      <ActivityProvider>
        <TemplateProvider>
          <AppContent location={location} navigate={navigate} showNavbar={showNavbar} publicRoutes={publicRoutes} />
        </TemplateProvider>
      </ActivityProvider>
    </UserProvider>
  );
}

const AppContent = ({ location, navigate, showNavbar, publicRoutes }) => {
  const { isAuthenticated, isGuest, authChecked } = useUser();

  useEffect(() => {
    if (authChecked && isAuthenticated && publicRoutes.includes(location.pathname)) {
      navigate('/home');
    }
  }, [authChecked, isAuthenticated, location.pathname, navigate, publicRoutes]);

  if (!authChecked) {
    return null; // Don't render anything until auth is checked
  }

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
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          } />
          <Route path="/add-chat-data" element={
            <ProtectedRoute>
              <AddChatData />
            </ProtectedRoute>
          } />
          <Route path="/articles" element={
            <ProtectedRoute>
              <Articles />
            </ProtectedRoute>
          } />
          <Route path="/forums" element={
            <ProtectedRoute>
              <ForumList />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Communities />
            </ProtectedRoute>
          } />
          <Route path="/community/new" element={
            <ProtectedRoute>
              <CreateCommunity />
            </ProtectedRoute>
          } />
          <Route path="/community/:id" element={
            <ProtectedRoute>
              <CircleView />
            </ProtectedRoute>
          } />
          {!isGuest && (
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          )}
          <Route path="/notebook" element={
            <ProtectedRoute>
              <NoteBook />
            </ProtectedRoute>
          } />
          <Route path="/activities" element={
            <ProtectedRoute>
              <Activities />
            </ProtectedRoute>
          } />
          <Route path="/chatbot-update" element={
            <ProtectedRoute>
              <UpdateChatData />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Feedback />
    </div>
  );
}

export default App;
