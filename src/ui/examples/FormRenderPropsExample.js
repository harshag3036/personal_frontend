import React, { useState } from 'react';
import { Form, Button, Text } from '../index';

/**
 * Form Render Props Example
 * 
 * This example demonstrates using the Form component with the render props pattern
 * to create a simple login form with validation.
 */
const FormRenderPropsExample = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  // Form submit handler
  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoginSuccess(true);
        resolve();
      }, 1000);
    });
  };
  
  // Form validation
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };
  
  // Reset success state
  const handleReset = () => {
    setLoginSuccess(false);
  };
  
  return (
    <div className="form-example">
      <Text as="h2" marginBottom="lg">Login Form with Render Props</Text>
      
      {loginSuccess ? (
        <div className="login-success">
          <Text as="p" color="success">Login successful!</Text>
          <Button onClick={handleReset} marginTop="md">Log out</Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {({ formState, setFieldValue, setFieldError, resetForm }) => {
            // Capture form values from state
            const { values, errors, isSubmitting } = formState;
            
            // Handle form validation on submit
            const handleFormSubmit = (e) => {
              e.preventDefault();
              
              // Validate form
              const validationErrors = validateForm(values);
              
              if (Object.keys(validationErrors).length > 0) {
                // Set errors on all fields
                Object.entries(validationErrors).forEach(([field, error]) => {
                  setFieldError(field, error);
                });
                return;
              }
              
              // If valid, submit the form
              handleSubmit(values);
            };
            
            return (
              <>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={values.email || ''}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                  />
                  {errors.email && (
                    <div className="form-error">{errors.email}</div>
                  )}
                </div>
                
                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={values.password || ''}
                    onChange={(e) => setFieldValue('password', e.target.value)}
                  />
                  {errors.password && (
                    <div className="form-error">{errors.password}</div>
                  )}
                </div>
                
                <div className="form-actions">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                    marginRight="sm"
                  >
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => resetForm()}
                  >
                    Reset
                  </Button>
                </div>
              </>
            );
          }}
        </Form>
      )}
      
      <Text as="h3" marginTop="xl" marginBottom="md">Benefits of Render Props Pattern</Text>
      <ul>
        <li>Gives complete control over form rendering</li>
        <li>Provides access to internal form state and methods</li>
        <li>Enables custom validation logic</li>
        <li>Makes complex form interactions easier to implement</li>
      </ul>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Code Example</Text>
      <pre>
{`<Form onSubmit={handleSubmit}>
  {({ formState, setFieldValue, setFieldError, resetForm }) => {
    const { values, errors, isSubmitting } = formState;
    
    return (
      <>
        <input
          type="email"
          value={values.email || ''}
          onChange={(e) => setFieldValue('email', e.target.value)}
        />
        {errors.email && <div>{errors.email}</div>}
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </>
    );
  }}
</Form>`}
      </pre>
    </div>
  );
};

export default FormRenderPropsExample;
