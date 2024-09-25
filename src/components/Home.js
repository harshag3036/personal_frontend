import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem, AppBar, Toolbar, Container } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom'; // Updated import
import config from '../config';
import './Home.css'; // Import the CSS file

export default function Home() {
  const [firstLogin, setFirstLogin] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const navigate = useNavigate(); // Updated hook

  useEffect(() => {
    const firstLoginStatus = localStorage.getItem('firstLogin') === 'true';
    setFirstLogin(firstLoginStatus);
  }, []);

  const handleSubmit = async () => {
    if (!name || !dob || !gender) {
      alert('All fields are required');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/customerData`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dob, gender }),
      });
      if (response.ok) {
        console.log('Customer data submitted successfully');
        setFirstLogin(false);
        localStorage.setItem('firstLogin', 'false');
      } else {
        console.error('Failed to submit customer data');
      }
    } catch (error) {
      console.error('Error submitting customer data:', error);
    }
  };

  return (
    <div className="container">
      <AppBar position="static">
        <Toolbar className="header">
          <Typography variant="h6" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            Home
          </Typography>
          <div>
            {/* <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button> */}
            <Button className="logout-button" onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container className="home-container">
        <Typography variant="h4" align="center" className="welcome-text">Welcome to Home Page</Typography>
        {firstLogin && (
          <Paper elevation={3} className="profile-paper">
            <Typography variant="h6" align="center">Complete Your Profile</Typography>
            <Box className="profile-box">
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box className="profile-input">
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(newValue) => {
                      console.log('Date of Birth selected:', newValue);
                      setDob(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </Box>
              </LocalizationProvider>
              <FormControl className="profile-input" required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleSubmit} className="profile-submit">
                Submit
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </div>
  );
}