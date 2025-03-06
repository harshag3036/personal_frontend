/**
 * Form Usage Example
 * 
 * This file demonstrates how to use the Form component with its compound components.
 */

import React, { useState } from 'react';
import { Form, useFormContext, Button } from '../components';

/**
 * Basic Form Example
 */
const BasicFormExample = () => {
  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // In a real application, you would typically make an API call here
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        resolve();
        alert('Form submitted successfully!');
      }, 1000);
    });
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            name="name"
            id="name"
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Form.Text>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
    </div>
  );
};

/**
 * Form with Validation Example
 */
const FormWithValidationExample = () => {
  // Custom validation component that uses the form context
  const FormValidation = () => {
    const { formState, setFieldError, clearFieldError } = useFormContext();
    const { values } = formState;
    
    // Validate password
    React.useEffect(() => {
      if (values.password) {
        if (values.password.length < 8) {
          setFieldError('password', 'Password must be at least 8 characters long');
        } else {
          clearFieldError('password');
        }
      }
    }, [values.password, setFieldError, clearFieldError]);
    
    // Validate password confirmation
    React.useEffect(() => {
      if (values.passwordConfirm && values.password) {
        if (values.passwordConfirm !== values.password) {
          setFieldError('passwordConfirm', 'Passwords do not match');
        } else {
          clearFieldError('passwordConfirm');
        }
      }
    }, [values.passwordConfirm, values.password, setFieldError, clearFieldError]);
    
    return null;
  };
  
  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        alert('Registration successful!');
      }, 1000);
    });
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Form with Validation</h2>
      <Form onSubmit={handleSubmit}>
        {/* This component handles validation logic */}
        <FormValidation />
        
        <Form.Group>
          <Form.Label htmlFor="username" required>Username</Form.Label>
          <Form.Control
            name="username"
            id="username"
            placeholder="Choose a username"
            required
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="password" required>Password</Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Form.Feedback type="invalid">
            {/* This will show if there's an error for the password field */}
          </Form.Feedback>
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="passwordConfirm" required>Confirm Password</Form.Label>
          <Form.Control
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            placeholder="Confirm your password"
            required
          />
          <Form.Feedback type="invalid">
            {/* This will show if there's an error for the passwordConfirm field */}
          </Form.Feedback>
        </Form.Group>
        
        <Form.Submit>Register</Form.Submit>
      </Form>
    </div>
  );
};

/**
 * Form Layout Example
 */
const FormLayoutExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Form Layout</h2>
      
      <h3>Form Row</h3>
      <Form>
        <div className="ds-form-row">
          <div className="ds-form-col">
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </Form.Group>
          </div>
          <div className="ds-form-col">
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </Form.Group>
          </div>
        </div>
        
        <Form.Group>
          <Form.Label htmlFor="address">Address</Form.Label>
          <Form.Control
            name="address"
            id="address"
            placeholder="1234 Main St"
          />
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
      
      <h3>Inline Form</h3>
      <Form className="ds-form-inline">
        <Form.Group>
          <Form.Label htmlFor="inlineEmail">Email</Form.Label>
          <Form.Control
            name="inlineEmail"
            id="inlineEmail"
            placeholder="Email"
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="inlinePassword">Password</Form.Label>
          <Form.Control
            name="inlinePassword"
            id="inlinePassword"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        
        <Form.Submit>Sign In</Form.Submit>
      </Form>
    </div>
  );
};

/**
 * Form States Example
 */
const FormStatesExample = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Form States</h2>
      
      <Button onClick={() => setIsDisabled(!isDisabled)}>
        {isDisabled ? 'Enable Form' : 'Disable Form'}
      </Button>
      
      <h3>Form with {isDisabled ? 'Disabled' : 'Enabled'} State</h3>
      <Form disabled={isDisabled}>
        <Form.Group>
          <Form.Label htmlFor="disabledName">Name</Form.Label>
          <Form.Control
            name="disabledName"
            id="disabledName"
            placeholder="Enter your name"
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="disabledEmail">Email</Form.Label>
          <Form.Control
            name="disabledEmail"
            id="disabledEmail"
            type="email"
            placeholder="Enter your email"
          />
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
      
      <h3>Individual Disabled Fields</h3>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="enabledName">Name</Form.Label>
          <Form.Control
            name="enabledName"
            id="enabledName"
            placeholder="Enter your name"
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="individualDisabledEmail">Email (Disabled)</Form.Label>
          <Form.Control
            name="individualDisabledEmail"
            id="individualDisabledEmail"
            type="email"
            placeholder="Enter your email"
            disabled
          />
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
    </div>
  );
};

/**
 * Complete Form Example
 */
const FormExample = () => {
  return (
    <div>
      <h1>Form Component Examples</h1>
      <BasicFormExample />
      <hr />
      <FormWithValidationExample />
      <hr />
      <FormLayoutExample />
      <hr />
      <FormStatesExample />
    </div>
  );
};

export default FormExample;
