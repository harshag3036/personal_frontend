import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, InputAdornment, Container, Typography, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import '../styles/shared.css';
import './Login.css';

const wisdomPrefixes = [
  'seeker',
  'observer',
  'wanderer',
  'explorer',
  'questioner',
  'contemplator',
  'listener',
  'wonderer',
  'thinker',
  'learner'
];

const generateGuestCredentials = () => {
  const randomPrefix = wisdomPrefixes[Math.floor(Math.random() * wisdomPrefixes.length)];
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  const username = `${randomPrefix}_${timestamp}${randomStr}`;
  
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
      console.log('Attempting login with:', {
        url: `${config.API_BASE_URL}/api/v1/login`,
        credentials: {
          username: credentials.username,
          isGuest: credentials.isGuest
        }
      });
      
      const response = await fetch(`${config.API_BASE_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });
      
      console.log('Login response status:', response.status);
      const result = await response.json();
      console.log('Login response:', result);
      
      if (response.status === 200 && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('firstLogin', credentials.isGuest ? 'false' : result.firstLogin);
        localStorage.setItem('isGuest', credentials.isGuest ? 'true' : 'false');
        if (result.customerId) {
          localStorage.setItem('customerId', result.customerId);
        }
        navigate('/home');
      } else {
        throw new Error(result.message || 'Unable to begin journey');
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
      setError('The path seems unclear. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const guestCredentials = generateGuestCredentials();
      console.log('Creating guest path with username:', guestCredentials.username);
      
      const signUpResponse = await fetch(`${config.API_BASE_URL}/api/v1/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username: guestCredentials.username,
          password: guestCredentials.password
        })
      });

      if (!signUpResponse.ok) {
        throw new Error('Unable to create guest path');
      }

      await handleLogin({ ...guestCredentials, isGuest: true });
      
    } catch (error) {
      console.error('Guest login error:', error);
      setError('A moment of pause. Please try again when ready.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="login-container">
      <Typography variant="h4" className="login-title">
        Welcome Back
      </Typography>
      <Typography variant="body1" className="login-subtitle">
        Continue your journey of exploration and understanding
      </Typography>
      
      {error && (
        <Typography className="error-message">
          {error}
        </Typography>
      )}
      
      <TextField
        label="Path Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
        autoComplete="username"
        disabled={isLoading}
        placeholder="Your journey's name"
      />
      
      <TextField
        label="Key"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
        autoComplete="current-password"
        disabled={isLoading}
        placeholder="Your path's key"
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
        onClick={handleRegularLogin}
        className="start-button"
        disabled={isLoading}
      >
        {isLoading ? 'Opening Path...' : 'Continue Journey'}
      </Button>
      
      <Button 
        onClick={handleSignIn}
        className="create-button"
        disabled={isLoading}
      >
        Begin New Journey
      </Button>
      
      <Divider className="divider">or</Divider>
      
      <Button 
        variant="outlined" 
        onClick={handleGuestLogin}
        className="guest-button"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Guest Path...' : 'Explore as Guest'}
      </Button>
    </div>
  );
};

export default Login;
