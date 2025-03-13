/**
 * Form Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form, { useFormContext } from './index';
import { 
  FORM_CLASS, 
  FORM_GROUP_CLASS, 
  FORM_LABEL_CLASS, 
  FORM_CONTROL_CLASS,
  FORM_FEEDBACK_CLASS,
  FORM_TEXT_CLASS,
  FORM_SUBMIT_CLASS,
  FORM_REQUIRED_CLASS,
  FORM_VARIANTS,
  FORM_SIZES,
  FORM_FEEDBACK_TYPES,
  FORM_MODIFIERS
} from './constants';

describe('Form Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<Form><div>Form Content</div></Form>);
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<Form><div>Form Content</div></Form>);
    expect(container.firstChild).toHaveClass(FORM_CLASS);
  });

  // Form submission tests
  test('calls onSubmit handler when form is submitted', async () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('does not call onSubmit handler when form is disabled', () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit} disabled>
        <button type="submit">Submit</button>
      </Form>
    );
    
    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  // Form.Group tests
  test('Form.Group renders correctly', () => {
    const { container } = render(
      <Form>
        <Form.Group>Group Content</Form.Group>
      </Form>
    );
    
    expect(screen.getByText('Group Content')).toBeInTheDocument();
    expect(container.querySelector(`.${FORM_GROUP_CLASS}`)).toBeInTheDocument();
  });

  // Form.Label tests
  test('Form.Label renders correctly', () => {
    render(
      <Form>
        <Form.Label htmlFor="test-input">Test Label</Form.Label>
      </Form>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Label').tagName).toBe('LABEL');
    expect(screen.getByText('Test Label')).toHaveAttribute('for', 'test-input');
  });

  test('Form.Label shows required indicator when required is true', () => {
    const { container } = render(
      <Form>
        <Form.Label htmlFor="test-input" required>Test Label</Form.Label>
      </Form>
    );
    
    expect(container.querySelector(`.${FORM_REQUIRED_CLASS}`)).toBeInTheDocument();
  });

  // Form.Control tests
  test('Form.Control renders correctly', () => {
    const { container } = render(
      <Form>
        <Form.Control name="test" id="test-input" />
      </Form>
    );
    
    expect(container.querySelector(`.${FORM_CONTROL_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector('input')).toHaveAttribute('name', 'test');
    expect(container.querySelector('input')).toHaveAttribute('id', 'test-input');
  });

  test('Form.Control updates form state when changed', () => {
    const TestComponent = () => {
      const { formState } = useFormContext();
      
      return (
        <Form>
          <Form.Control name="test" id="test-input" data-testid="test-input" />
          <div data-testid="form-value">{formState.values.test || ''}</div>
        </Form>
      );
    };
    
    render(<TestComponent />);
    
    fireEvent.change(screen.getByTestId('test-input'), { target: { value: 'test value' } });
    expect(screen.getByTestId('form-value')).toHaveTextContent('test value');
  });

  // Form.Feedback tests
  test('Form.Feedback renders correctly', () => {
    const { container } = render(
      <Form>
        <Form.Feedback>Feedback message</Form.Feedback>
      </Form>
    );
    
    expect(screen.getByText('Feedback message')).toBeInTheDocument();
    expect(container.querySelector(`.${FORM_FEEDBACK_CLASS}`)).toBeInTheDocument();
  });

  test('Form.Feedback applies the correct type class', () => {
    const { container } = render(
      <Form>
        <Form.Feedback type="valid">Valid feedback</Form.Feedback>
      </Form>
    );
    
    expect(container.querySelector(`.${FORM_FEEDBACK_CLASS}--valid`)).toBeInTheDocument();
  });

  // Form.Text tests
  test('Form.Text renders correctly', () => {
    const { container } = render(
      <Form>
        <Form.Text>Help text</Form.Text>
      </Form>
    );
    
    expect(screen.getByText('Help text')).toBeInTheDocument();
    expect(container.querySelector(`.${FORM_TEXT_CLASS}`)).toBeInTheDocument();
    expect(screen.getByText('Help text').tagName).toBe('SMALL');
  });

  // Form.Submit tests
  test('Form.Submit renders correctly', () => {
    const { container } = render(
      <Form>
        <Form.Submit>Submit Form</Form.Submit>
      </Form>
    );
    
    expect(screen.getByText('Submit Form')).toBeInTheDocument();
    expect(container.querySelector(`.${FORM_SUBMIT_CLASS}`)).toBeInTheDocument();
    expect(screen.getByText('Submit Form').tagName).toBe('BUTTON');
    expect(screen.getByText('Submit Form')).toHaveAttribute('type', 'submit');
  });

  test('Form.Submit is disabled when form is disabled', () => {
    render(
      <Form disabled>
        <Form.Submit>Submit Form</Form.Submit>
      </Form>
    );
    
    expect(screen.getByText('Submit Form')).toBeDisabled();
  });

  test('Form.Submit shows loading text when form is submitting', async () => {
    const handleSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(
      <Form onSubmit={handleSubmit}>
        <Form.Submit>Submit Form</Form.Submit>
      </Form>
    );
    
    fireEvent.click(screen.getByText('Submit Form'));
    
    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });
  });

  // Additional class names and styles tests
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(
      <Form className="custom-class">
        <div>Form Content</div>
      </Form>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(FORM_CLASS);
  });

  // Form context hook tests
  test('useFormContext throws error when used outside Form component', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const TestComponent = () => {
      try {
        useFormContext();
        return <div>Should not render</div>;
      } catch (error) {
        return <div>Error thrown</div>;
      }
    };
    
    render(<TestComponent />);
    
    expect(screen.getByText('Error thrown')).toBeInTheDocument();
    
    consoleErrorSpy.mockRestore();
  });

  // Form reset tests
  test('resetForm function clears form state', () => {
    const TestComponent = () => {
      const { formState, setFieldValue, resetForm } = useFormContext();
      
      const handleSetValue = () => {
        setFieldValue('test', 'test value');
      };
      
      const handleReset = () => {
        resetForm();
      };
      
      return (
        <>
          <div data-testid="form-value">{formState.values.test || ''}</div>
          <button type="button" onClick={handleSetValue}>Set Value</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </>
      );
    };
    
    render(
      <Form>
        <TestComponent />
      </Form>
    );
    
    fireEvent.click(screen.getByText('Set Value'));
    expect(screen.getByTestId('form-value')).toHaveTextContent('test value');
    
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('form-value')).toHaveTextContent('');
  });

  // Error handling tests
  test('setFieldError and clearFieldError functions work correctly', () => {
    const TestComponent = () => {
      const { formState, setFieldError, clearFieldError } = useFormContext();
      
      const handleSetError = () => {
        setFieldError('test', 'Test error');
      };
      
      const handleClearError = () => {
        clearFieldError('test');
      };
      
      return (
        <>
          <div data-testid="form-error">{formState.errors.test || ''}</div>
          <button type="button" onClick={handleSetError}>Set Error</button>
          <button type="button" onClick={handleClearError}>Clear Error</button>
        </>
      );
    };
    
    render(
      <Form>
        <TestComponent />
      </Form>
    );
    
    fireEvent.click(screen.getByText('Set Error'));
    expect(screen.getByTestId('form-error')).toHaveTextContent('Test error');
    
    fireEvent.click(screen.getByText('Clear Error'));
    expect(screen.getByTestId('form-error')).toHaveTextContent('');
  });

  // Constants export tests
  test('exports the correct constants', () => {
    expect(Object.values(FORM_VARIANTS)).toContain('default');
    expect(Object.values(FORM_SIZES)).toContain('medium');
    expect(Object.values(FORM_FEEDBACK_TYPES)).toContain('valid');
    expect(Object.keys(FORM_MODIFIERS).length).toBeGreaterThan(0);
  });
});
