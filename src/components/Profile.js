import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Container } from '@mui/material';
import '../styles/shared.css';
import './Profile.css';
import config from '../config';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Unable to verify seeker identity');
        return;
      }
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/customerData`, {
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
          console.error('Unable to retrieve path details');
        }
      } catch (error) {
        console.error('Error retrieving path details:', error);
      }
    };

    fetchProfileData();
  }, []);

  const formatFieldName = (key) => {
    const fieldMappings = {
      'name': 'Known As',
      'dob': 'Journey Began',
      'gender': 'Identity',
      'customerId': 'Path ID',
      'userName': 'Seeker Name'
    };
    return fieldMappings[key] || key;
  };

  const formatFieldValue = (key, value) => {
    if (key === 'dob') {
      return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return value;
  };

  return (
    <Container className="profile-container">
      {profileData && (
        <Paper elevation={3} className="profile-paper">
          <Typography variant="h5" className="profile-title">
            Your Journey Details
          </Typography>
          <Typography variant="body1" className="profile-subtitle">
            A reflection of your path in our contemplative space
          </Typography>
          <Grid container spacing={3} className="profile-grid">
            {Object.entries(profileData)
              .filter(([key]) => !['createdAt', 'updatedAt'].includes(key))
              .map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <div className="profile-field">
                    <Typography variant="subtitle2" className="field-label">
                      {formatFieldName(key)}
                    </Typography>
                    <Typography variant="body1" className="field-value">
                      {formatFieldValue(key, value)}
                    </Typography>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
