import React, { useState } from 'react';
import { Box, Text, Button } from '../atoms';
import Form, { useFormContext } from '../organisms/Form';

/**
 * FormExample Component
 * 
 * This example demonstrates how to use the Form component
 * to create a functional contact form with validation.
 */
const FormExample = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  // Form validation component using the form context
  const FormValidation = () => {
    const { formState, setFieldError, clearFieldError } = useFormContext();
    
    // Email validation function
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    
    // Handle email field change
    const handleEmailChange = (e) => {
      const email = e.target.value;
      
      if (!email) {
        setFieldError('email', 'Email is required');
      } else if (!validateEmail(email)) {
        setFieldError('email', 'Please enter a valid email address');
      } else {
        clearFieldError('email');
      }
    };
    
    // Handle message field change
    const handleMessageChange = (e) => {
      const message = e.target.value;
      
      if (!message) {
        setFieldError('message', 'Message is required');
      } else if (message.length < 10) {
        setFieldError('message', 'Message must be at least 10 characters long');
      } else {
        clearFieldError('message');
      }
    };
    
    return (
      <>
        <Box marginBottom="lg">
          <Text variant="h2">Contact Us</Text>
          <Text variant="body1">Fill out the form below to get in touch with our team.</Text>
        </Box>
        
        <Form.Group>
          <Form.Label htmlFor="name" required>Name</Form.Label>
          <Form.Control name="name" id="name" required />
          {formState.errors.name && (
            <Form.Feedback type="invalid">{formState.errors.name}</Form.Feedback>
          )}
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="email" required>Email</Form.Label>
          <Form.Control 
            name="email" 
            id="email" 
            type="email" 
            required 
            onChange={handleEmailChange}
          />
          {formState.errors.email && (
            <Form.Feedback type="invalid">{formState.errors.email}</Form.Feedback>
          )}
          <Form.Text>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="subject">Subject</Form.Label>
          <Form.Control name="subject" id="subject" />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="message" required>Message</Form.Label>
          <textarea 
            name="message" 
            id="message" 
            rows="5" 
            className="ui-form-control"
            required
            onChange={handleMessageChange}
          ></textarea>
          {formState.errors.message && (
            <Form.Feedback type="invalid">{formState.errors.message}</Form.Feedback>
          )}
        </Form.Group>
        
        <Box display="flex" gap="md" marginTop="lg">
          <Form.Submit>Send Message</Form.Submit>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => document.getElementById('contact-form').reset()}
          >
            Reset
          </Button>
        </Box>
      </>
    );
  };

  // Form submission handler
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    
    // Simulate server request
    return new Promise((resolve) => {
      setTimeout(() => {
        setFormData(values);
        setFormSubmitted(true);
        resolve();
      }, 1000);
    });
  };

  return (
    <Box padding="lg" background="background-surface" borderRadius="md">
      {formSubmitted ? (
        <Box>
          <Text variant="h2" marginBottom="md">Thank You!</Text>
          <Text variant="body1" marginBottom="lg">
            Your message has been sent successfully. We'll get back to you soon.
          </Text>
          
          <Box background="background-secondary" padding="md" borderRadius="md" marginBottom="lg">
            <Text variant="h3" marginBottom="sm">Submitted Information:</Text>
            <Box as="dl">
              <Box as="dt" fontWeight="bold">Name:</Box>
              <Box as="dd" marginBottom="sm">{formData.name}</Box>
              
              <Box as="dt" fontWeight="bold">Email:</Box>
              <Box as="dd" marginBottom="sm">{formData.email}</Box>
              
              <Box as="dt" fontWeight="bold">Subject:</Box>
              <Box as="dd" marginBottom="sm">{formData.subject || '(Not provided)'}</Box>
              
              <Box as="dt" fontWeight="bold">Message:</Box>
              <Box as="dd">{formData.message}</Box>
            </Box>
          </Box>
          
          <Button onClick={() => setFormSubmitted(false)}>Send Another Message</Button>
        </Box>
      ) : (
        <Form id="contact-form" onSubmit={handleSubmit}>
          <FormValidation />
        </Form>
      )}
    </Box>
  );
};

export default FormExample;
