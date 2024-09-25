import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Container } from '@mui/material';
import './Profile.css'; // Import the CSS file

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage');
        return;
      }
      try {
        const response = await fetch('http://localhost:8080/api/v1/customerData', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Container className="profile-container">
      {profileData && (
        <Paper elevation={3} className="profile-paper">
          <Typography variant="h6" align="center">Profile Information</Typography>
          <Grid container spacing={2}>
            {Object.entries(profileData).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="body1"><strong>{key}:</strong> {value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
}