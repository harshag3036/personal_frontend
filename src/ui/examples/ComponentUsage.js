/**
 * Component Usage Example
 * 
 * This file demonstrates how to use the UI components in a real-world scenario.
 */

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Text,
  Stack,
  Divider,
  Button,
  Badge,
  Input,
  Card,
  Form
} from '..';

/**
 * UserProfileForm Component
 * 
 * This example demonstrates how to use various UI components to create a user profile form.
 */
const UserProfileForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    setFormSubmitted(true);
    // In a real application, you would submit the form data to an API
  };
  
  return (
    <Box padding="lg" background="background-surface" borderRadius="md">
      <Stack spacing="lg">
        <Flex justify="space-between" align="center">
          <Text variant="h1">User Profile</Text>
          <Badge variant="primary">New</Badge>
        </Flex>
        
        <Divider />
        
        <Card>
          <Card.Header>
            <Text variant="h2">Personal Information</Text>
          </Card.Header>
          
          <Card.Body>
            {formSubmitted ? (
              <Box padding="md" background="success-light" borderRadius="sm">
                <Text variant="body1">Profile updated successfully!</Text>
              </Box>
            ) : (
              <Form
                onSubmit={handleSubmit}
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  bio: ''
                }}
              >
                {({ values, handleChange, handleSubmit, errors }) => (
                  <Stack spacing="md">
                    <Grid columns="1fr 1fr" gap="md">
                      <Stack spacing="sm">
                        <Text variant="label">First Name</Text>
                        <Input
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          error={errors?.firstName}
                        />
                      </Stack>
                      
                      <Stack spacing="sm">
                        <Text variant="label">Last Name</Text>
                        <Input
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          error={errors?.lastName}
                        />
                      </Stack>
                    </Grid>
                    
                    <Stack spacing="sm">
                      <Text variant="label">Email</Text>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        error={errors?.email}
                      />
                    </Stack>
                    
                    <Stack spacing="sm">
                      <Text variant="label">Bio</Text>
                      <Input
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                        multiline
                        rows={4}
                        error={errors?.bio}
                      />
                    </Stack>
                    
                    <Flex justify="flex-end">
                      <Button variant="primary" onClick={handleSubmit}>
                        Save Profile
                      </Button>
                    </Flex>
                  </Stack>
                )}
              </Form>
            )}
          </Card.Body>
        </Card>
      </Stack>
    </Box>
  );
};

export default UserProfileForm;
