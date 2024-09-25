import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, InputAdornment, Container, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Add a class to the input fields when they are autofilled
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

  const handleSubmit = async () => {
    console.log('Login handleSubmit called');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log('Login response:', response);
      if (response.status === 200 && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('firstLogin', result.firstLogin);
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignIn = () => {
    console.log('Navigating to SignIn');
    navigate('/signin');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center">
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Login
      </Button>
      <Button color="secondary" fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
    </Container>
  );
};

export default Login;