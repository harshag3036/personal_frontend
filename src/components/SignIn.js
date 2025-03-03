import React, { useState, useEffect } from 'react';
import { TextField, FormControl, OutlinedInput, InputAdornment, Button, IconButton, Typography } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import '../styles/shared.css';
import './SignIn.css';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    setIsSigningIn(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      
      const result = await response.json();
      
      if (response.status === 200 && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('firstLogin', result.firstLogin);
        if (result.customerId) {
          localStorage.setItem('customerId', result.customerId);
        }
        // UserContext will handle the navigation after detecting the token
      } else {
        setError(result.message || 'Unable to begin journey. Please try again.');
        setIsSigningIn(false);
      }
    } catch (error) {
      console.error('SignIn error:', error);
      setError('A moment of pause. Please try again when ready.');
      setIsSigningIn(false);
    }
  };

  return (
    <div className="signin-container">
      <Typography variant="h4" className="signin-title">
        Begin Your Journey
      </Typography>
      <Typography variant="body1" className="signin-subtitle">
        Every journey of understanding begins with a single step. 
        Create your space for exploration, questioning, and growth.
      </Typography>
      
      <TextField
        label="Choose Your Path Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
        disabled={isSigningIn}
        placeholder="A name for your journey"
      />
      
      <FormControl className="input-field">
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSigningIn}
          placeholder="Create a key for your path"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                disabled={isSigningIn}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button 
        variant="contained" 
        onClick={handleSubmit} 
        className="start-button"
        disabled={isSigningIn || !username || !password}
      >
        {isSigningIn ? 'Creating Your Path...' : 'Begin Journey'}
      </Button>

      {error && (
        <Typography className="error-message">
          {error}
        </Typography>
      )}
      
      <Button 
        onClick={() => navigate('/login')} 
        className="return-button"
        disabled={isSigningIn}
      >
        Return to Path
      </Button>
    </div>
  );
};

export default SignIn;
