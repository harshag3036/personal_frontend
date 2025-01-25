import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, InputAdornment, Container, Typography, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './Login.css';

const funnyPrefixes = [
  'ninja_potato',
  'dancing_taco',
  'sleepy_unicorn',
  'cosmic_waffle',
  'lazy_panda',
  'confused_penguin',
  'happy_pickle',
  'silly_noodle',
  'funky_banana',
  'dizzy_donut'
];

const generateGuestCredentials = () => {
  const randomPrefix = funnyPrefixes[Math.floor(Math.random() * funnyPrefixes.length)];
  // Generate a longer random suffix using timestamp and random string
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  const username = `${randomPrefix}_${timestamp}${randomStr}`;
  
  // Generate a strong random password
  const password = Math.random().toString(36).substring(2, 10) + 
                  Math.random().toString(36).substring(2, 10) +
                  Math.floor(Math.random() * 10000);
  
  return { username, password };
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAutofill = (e) => {
      e.target.classList.add('autofilled');
    };

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('animationstart', handleAutofill);
      input.addEventListener('input', handleAutofill);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('animationstart', handleAutofill);
        input.removeEventListener('input', handleAutofill);
      });
    };
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });
      const result = await response.json();
      
      if (response.status === 200 && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('firstLogin', credentials.isGuest ? 'false' : result.firstLogin);
        localStorage.setItem('isGuest', credentials.isGuest ? 'true' : 'false');
        if (result.customerId) {
          localStorage.setItem('customerId', result.customerId);
        }
        navigate('/home');
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleRegularLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await handleLogin({ username, password, isGuest: false });
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const guestCredentials = generateGuestCredentials();
      console.log('Creating guest account with username:', guestCredentials.username);
      
      // First create the guest account
      const signUpResponse = await fetch(`${config.API_BASE_URL}/api/v1/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: guestCredentials.username,
          password: guestCredentials.password
        })
      });

      if (!signUpResponse.ok) {
        throw new Error('Failed to create guest account');
      }

      // Then log in with the created account
      await handleLogin({ ...guestCredentials, isGuest: true });
      
    } catch (error) {
      console.error('Guest login error:', error);
      setError('Failed to create guest account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="username"
        className="input-field"
        disabled={isLoading}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="current-password"
        className="input-field"
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disabled={isLoading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleRegularLogin}
        className="login-button"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <Button 
        color="secondary" 
        fullWidth 
        onClick={handleSignIn}
        className="signin-button"
        disabled={isLoading}
      >
        Sign Up
      </Button>
      
      <Divider style={{ margin: '20px 0' }}>or</Divider>
      
      <Button 
        variant="outlined" 
        color="primary" 
        fullWidth 
        onClick={handleGuestLogin}
        className="guest-button"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Guest Account...' : 'Login as Guest'}
      </Button>
    </Container>
  );
};

export default Login;
