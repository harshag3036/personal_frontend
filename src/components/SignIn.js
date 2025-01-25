import React, { useState } from 'react';
import { Box, TextField, FormControl, OutlinedInput, InputAdornment, Button, IconButton, Typography, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function SignIn() {
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

  const handleSubmit = async () => {
    console.log('SignIn handleSubmit called');
    setIsSigningIn(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const result = await response.json();
      console.log('SignIn response:', response);
      if (response.status === 200 && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('firstLogin', result.firstLogin);
        if (result.customerId) {
          localStorage.setItem('customerId', result.customerId);
        }
        navigate('/home');
      } else {
        setError(result.message || 'Sign in failed');
        setIsSigningIn(false);
      }
    } catch (error) {
      console.error('SignIn error:', error);
      setError('An error occurred. Please try again.');
      setIsSigningIn(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <TextField
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ m: 1, width: '100%' }}
          disabled={isSigningIn}
        />
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSigningIn}
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
            placeholder="Password"
          />
        </FormControl>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          sx={{ m: 1, width: '100%' }}
          disabled={isSigningIn || !username || !password}
        >
          {isSigningIn ? 'Signing In...' : 'Sign In'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Button 
          color="secondary" 
          onClick={() => navigate('/login')} 
          sx={{ mt: 2 }}
          disabled={isSigningIn}
        >
          Back to Login
        </Button>
      </Box>
    </Paper>
  );
}
