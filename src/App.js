import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Button, Toolbar, Typography } from '@mui/material';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Profile from './components/Profile'; // Import the Profile component
import ProtectedRoute from './components/ProtectedRoute';
import config from './config';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Token found:', token);
          const response = await fetch(`${config.API_BASE_URL}/api/v1/home`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log('Token validation response:', response);
          if (response.status === 200) {
            if (location.pathname === '/' || location.pathname === '/signin') {
              navigate('/home');
            }
          } else {
            console.error('Token validation failed', response.statusText);
            navigate('/');
          }
        } catch (error) {
          console.error('Token validation failed', error);
          navigate('/');
        }
      } else {
        console.log('No token found, navigating to login');
        navigate('/'); // Navigate to login page if no token is found
      }
    };

    if (location.pathname !== '/signin') {
      checkToken();
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            My Application
          </Typography>
          {location.pathname !== '/' && location.pathname !== '/signin' && (
            <>
              <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            </>
          )}
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Add the profile route */}
        </Routes>
      </Container>
    </>
  );
}

export default App;