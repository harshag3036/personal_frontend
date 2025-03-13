/**
 * Form Component Stories
 */

import React, { useState } from 'react';
import Form, { useFormContext } from './index';
import { FORM_VARIANTS, FORM_SIZES } from './constants';
import { Box, Text, Button } from '../../atoms';

export default {
  title: 'Organisms/Form',
  component: Form,
  parameters: {
    docs: {
      description: {
        component: 'A compound component for creating forms with consistent styling and behavior. Uses the context API to manage form state and provide a more intuitive API.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Form ID',
      table: {
        type: { summary: 'string' },
      },
    },
    onSubmit: {
      action: 'submitted',
      description: 'Form submit handler',
      table: {
        type: { summary: 'function' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the form is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    extensions: {
      control: { type: 'array' },
      description: 'Extensions to apply to the form',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    children: {
      control: { type: null },
      description: 'Form content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Basic Form
export const Basic = () => (
  <Form onSubmit={(values) => console.log('Form submitted:', values)}>
    <Form.Group>
      <Form.Label htmlFor="name" required>Name</Form.Label>
      <Form.Control name="name" id="name" required />
    </Form.Group>
    
    <Form.Group>
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control name="email" id="email" type="email" />
      <Form.Text>We'll never share your email with anyone else.</Form.Text>
    </Form.Group>
    
    <Form.Submit>Submit</Form.Submit>
  </Form>
);

// Form with Validation
export const WithValidation = () => {
  const FormWithValidation = () => {
    const { formState, setFieldError, clearFieldError } = useFormContext();
    
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    
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
    
    return (
      <>
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
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </>
    );
  };
  
  const handleSubmit = (values, event) => {
    console.log('Form submitted:', values);
    
    // Simulate server validation
    if (!values.name) {
      // Return a promise to show loading state
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Name is required'));
        }, 1000);
      });
    }
    
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormWithValidation />
    </Form>
  );
};

// Disabled Form
export const Disabled = () => (
  <Form disabled>
    <Form.Group>
      <Form.Label htmlFor="name">Name</Form.Label>
      <Form.Control name="name" id="name" />
    </Form.Group>
    
    <Form.Group>
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control name="email" id="email" type="email" />
    </Form.Group>
    
    <Form.Submit>Submit</Form.Submit>
  </Form>
);

// Form with Feedback
export const WithFeedback = () => (
  <Form>
    <Form.Group>
      <Form.Label htmlFor="name">Name</Form.Label>
      <Form.Control name="name" id="name" />
      <Form.Feedback type="valid">Looks good!</Form.Feedback>
    </Form.Group>
    
    <Form.Group>
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control name="email" id="email" type="email" />
      <Form.Feedback type="invalid">Please enter a valid email address.</Form.Feedback>
    </Form.Group>
    
    <Form.Submit>Submit</Form.Submit>
  </Form>
);

// Form with Help Text
export const WithHelpText = () => (
  <Form>
    <Form.Group>
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control name="username" id="username" />
      <Form.Text>Your username must be 8-20 characters long.</Form.Text>
    </Form.Group>
    
    <Form.Group>
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control name="password" id="password" type="password" />
      <Form.Text>Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</Form.Text>
    </Form.Group>
    
    <Form.Submit>Submit</Form.Submit>
  </Form>
);

// Form with Reset
export const WithReset = () => {
  const FormWithReset = () => {
    const { resetForm } = useFormContext();
    
    return (
      <>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control name="name" id="name" />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control name="email" id="email" type="email" />
        </Form.Group>
        
        <Box display="flex" gap="md">
          <Form.Submit>Submit</Form.Submit>
          <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
        </Box>
      </>
    );
  };
  
  return (
    <Form>
      <FormWithReset />
    </Form>
  );
};

// Form with Dynamic Fields
export const WithDynamicFields = () => {
  const [fields, setFields] = useState([{ id: 1, name: 'field-1' }]);
  
  const addField = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId, name: `field-${newId}` }]);
  };
  
  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };
  
  return (
    <Form>
      <Text variant="h3" marginBottom="md">Dynamic Form Fields</Text>
      
      {fields.map((field) => (
        <Form.Group key={field.id}>
          <Box display="flex" alignItems="center" gap="sm">
            <Form.Label htmlFor={field.name}>Field {field.id}</Form.Label>
            <Button 
              type="button" 
              variant="text" 
              size="small"
              onClick={() => removeField(field.id)}
            >
              Remove
            </Button>
          </Box>
          <Form.Control name={field.name} id={field.name} />
        </Form.Group>
      ))}
      
      <Box marginBottom="md">
        <Button type="button" variant="outline" onClick={addField}>
          Add Field
        </Button>
      </Box>
      
      <Form.Submit>Submit</Form.Submit>
    </Form>
  );
};

// Form with Complex Layout
export const ComplexLayout = () => (
  <Form>
    <Text variant="h3" marginBottom="md">Registration Form</Text>
    
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="md" marginBottom="md">
      <Form.Group>
        <Form.Label htmlFor="firstName" required>First Name</Form.Label>
        <Form.Control name="firstName" id="firstName" required />
      </Form.Group>
      
      <Form.Group>
        <Form.Label htmlFor="lastName" required>Last Name</Form.Label>
        <Form.Control name="lastName" id="lastName" required />
      </Form.Group>
    </Box>
    
    <Form.Group>
      <Form.Label htmlFor="email" required>Email</Form.Label>
      <Form.Control name="email" id="email" type="email" required />
    </Form.Group>
    
    <Form.Group>
      <Form.Label htmlFor="password" required>Password</Form.Label>
      <Form.Control name="password" id="password" type="password" required />
      <Form.Text>Password must be at least 8 characters long.</Form.Text>
    </Form.Group>
    
    <Form.Group>
      <Form.Label htmlFor="confirmPassword" required>Confirm Password</Form.Label>
      <Form.Control name="confirmPassword" id="confirmPassword" type="password" required />
    </Form.Group>
    
    <Box marginTop="lg">
      <Form.Submit>Register</Form.Submit>
    </Box>
  </Form>
);

// Form in Context
export const InContext = () => (
  <Box padding="lg" background="background-surface" borderRadius="md">
    <Text variant="h2" marginBottom="md">Contact Us</Text>
    <Text variant="body1" marginBottom="lg">Fill out the form below to get in touch with our team.</Text>
    
    <Form>
      <Form.Group>
        <Form.Label htmlFor="name" required>Name</Form.Label>
        <Form.Control name="name" id="name" required />
      </Form.Group>
      
      <Form.Group>
        <Form.Label htmlFor="email" required>Email</Form.Label>
        <Form.Control name="email" id="email" type="email" required />
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
          className={FORM_CONTROL_CLASS}
          required
        ></textarea>
      </Form.Group>
      
      <Box marginTop="lg">
        <Form.Submit>Send Message</Form.Submit>
      </Box>
    </Form>
  </Box>
);
