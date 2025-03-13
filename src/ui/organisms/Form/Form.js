/**
 * Form Component
 * 
 * A compound component for creating forms with consistent styling and behavior.
 * Uses the compound component pattern to provide a more intuitive API.
 */

import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { 
  FORM_CLASS, 
  FORM_GROUP_CLASS, 
  FORM_LABEL_CLASS, 
  FORM_CONTROL_CLASS,
  FORM_FEEDBACK_CLASS,
  FORM_TEXT_CLASS,
  FORM_SUBMIT_CLASS,
  FORM_REQUIRED_CLASS,
  FORM_FEEDBACK_TYPES,
  FORM_VARIANTS
} from './constants';
import './Form.css';

// Create a context for the form
const FormContext = createContext({});

/**
 * Form Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.id] - Form ID
 * @param {Function} [props.onSubmit] - Form submit handler
 * @param {boolean} [props.disabled=false] - Whether the form is disabled
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the form
 * @param {React.ReactNode} props.children - Form content
 * @returns {JSX.Element} Form component
 */
const Form = ({
  id,
  onSubmit,
  disabled = false,
  className = '',
  extensions = [],
  children,
  ...props
}) => {
  // Form state
  const [formState, setFormState] = useState({
    isSubmitting: false,
    errors: {},
    touched: {},
    values: {},
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (disabled || formState.isSubmitting) return;
    
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    if (onSubmit) {
      try {
        const result = onSubmit(formState.values, event);
        
        // Handle promise result
        if (result instanceof Promise) {
          result
            .then(() => {
              setFormState(prev => ({ ...prev, isSubmitting: false }));
            })
            .catch(error => {
              console.error('Form: Error in onSubmit handler:', error);
              setFormState(prev => ({ ...prev, isSubmitting: false }));
            });
        } else {
          setFormState(prev => ({ ...prev, isSubmitting: false }));
        }
      } catch (error) {
        console.error('Form: Error in onSubmit handler:', error);
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    } else {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // Set field value
  const setFieldValue = (name, value) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
      touched: {
        ...prev.touched,
        [name]: true,
      },
    }));
  };

  // Set field error
  const setFieldError = (name, error) => {
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: error,
      },
    }));
  };

  // Clear field error
  const clearFieldError = (name) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[name];
      return {
        ...prev,
        errors: newErrors,
      };
    });
  };

  // Reset form
  const resetForm = () => {
    setFormState({
      isSubmitting: false,
      errors: {},
      touched: {},
      values: {},
    });
  };

  // Form context value
  const formContextValue = {
    formState,
    setFieldValue,
    setFieldError,
    clearFieldError,
    resetForm,
    disabled,
  };

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Form', {
      id,
      onSubmit: handleSubmit,
      disabled,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Form: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      id,
      onSubmit: handleSubmit,
      disabled,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    id: extendedId,
    onSubmit: extendedOnSubmit,
    disabled: extendedDisabled,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const formClasses = [
    FORM_CLASS,
    extendedDisabled ? `${FORM_CLASS}--disabled` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  return (
    <FormContext.Provider value={formContextValue}>
      <form
        id={extendedId}
        className={formClasses}
        onSubmit={extendedOnSubmit}
        noValidate
        {...restProps}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.propTypes = {
  /** Form ID */
  id: PropTypes.string,
  /** Form submit handler */
  onSubmit: PropTypes.func,
  /** Whether the form is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the form */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Form content */
  children: PropTypes.node.isRequired,
};

/**
 * Hook to access form context
 * @returns {Object} Form context
 */
const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
};

/**
 * Form.Group Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.ReactNode} props.children - Group content
 * @returns {JSX.Element} Form.Group component
 */
const FormGroup = ({
  className = '',
  children,
  ...props
}) => {
  const groupClasses = [
    FORM_GROUP_CLASS,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={groupClasses} {...props}>
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Group content */
  children: PropTypes.node.isRequired,
};

/**
 * Form.Label Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.htmlFor - ID of the form control
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.ReactNode} props.children - Label content
 * @returns {JSX.Element} Form.Label component
 */
const FormLabel = ({
  htmlFor,
  required = false,
  className = '',
  children,
  ...props
}) => {
  const { disabled } = useFormContext();
  
  const labelClasses = [
    FORM_LABEL_CLASS,
    disabled ? `${FORM_LABEL_CLASS}--disabled` : '',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <label
      htmlFor={htmlFor}
      className={labelClasses}
      {...props}
    >
      {children}
      {required && <span className={FORM_REQUIRED_CLASS}>*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  /** ID of the form control */
  htmlFor: PropTypes.string.isRequired,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Label content */
  children: PropTypes.node.isRequired,
};

/**
 * Form.Control Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Field name
 * @param {string} [props.id] - Field ID (defaults to name if not provided)
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.value=''] - Field value
 * @param {Function} [props.onChange] - Change handler
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.className=''] - Additional CSS class names
 * @returns {JSX.Element} Form.Control component
 */
const FormControl = ({
  name,
  id,
  type = 'text',
  value: propValue = '',
  onChange,
  required = false,
  className = '',
  ...props
}) => {
  const {
    formState,
    setFieldValue,
    disabled: formDisabled,
  } = useFormContext();
  
  const fieldId = id || name;
  const fieldValue = formState.values[name] !== undefined ? formState.values[name] : propValue;
  const isInvalid = !!formState.errors[name];
  const isDisabled = formDisabled || props.disabled;
  
  const handleChange = (event) => {
    const newValue = event.target.value;
    setFieldValue(name, newValue);
    
    if (onChange) {
      try {
        onChange(event);
      } catch (error) {
        console.error('FormControl: Error in onChange handler:', error);
      }
    }
  };
  
  const controlClasses = [
    FORM_CONTROL_CLASS,
    isInvalid ? `${FORM_CONTROL_CLASS}--invalid` : '',
    isDisabled ? `${FORM_CONTROL_CLASS}--disabled` : '',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <input
      id={fieldId}
      name={name}
      type={type}
      value={fieldValue}
      onChange={handleChange}
      required={required}
      disabled={isDisabled}
      className={controlClasses}
      aria-invalid={isInvalid}
      {...props}
    />
  );
};

FormControl.propTypes = {
  /** Field name */
  name: PropTypes.string.isRequired,
  /** Field ID (defaults to name if not provided) */
  id: PropTypes.string,
  /** Input type */
  type: PropTypes.string,
  /** Field value */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Change handler */
  onChange: PropTypes.func,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

/**
 * Form.Feedback Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='invalid'] - Feedback type (valid or invalid)
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.ReactNode} props.children - Feedback content
 * @returns {JSX.Element} Form.Feedback component
 */
const FormFeedback = ({
  type = 'invalid',
  className = '',
  children,
  ...props
}) => {
  const feedbackClasses = [
    FORM_FEEDBACK_CLASS,
    `${FORM_FEEDBACK_CLASS}--${type}`,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={feedbackClasses}
      {...props}
    >
      {children}
    </div>
  );
};

FormFeedback.propTypes = {
  /** Feedback type (valid or invalid) */
  type: PropTypes.oneOf(Object.values(FORM_FEEDBACK_TYPES)),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Feedback content */
  children: PropTypes.node.isRequired,
};

/**
 * Form.Text Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.ReactNode} props.children - Text content
 * @returns {JSX.Element} Form.Text component
 */
const FormText = ({
  className = '',
  children,
  ...props
}) => {
  const textClasses = [
    FORM_TEXT_CLASS,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <small
      className={textClasses}
      {...props}
    >
      {children}
    </small>
  );
};

FormText.propTypes = {
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Text content */
  children: PropTypes.node.isRequired,
};

/**
 * Form.Submit Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} Form.Submit component
 */
const FormSubmit = ({
  className = '',
  children,
  ...props
}) => {
  const { formState, disabled: formDisabled } = useFormContext();
  
  const isDisabled = formDisabled || formState.isSubmitting || props.disabled;
  
  const submitClasses = [
    FORM_SUBMIT_CLASS,
    isDisabled ? `${FORM_SUBMIT_CLASS}--disabled` : '',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type="submit"
      className={submitClasses}
      disabled={isDisabled}
      {...props}
    >
      {formState.isSubmitting ? 'Submitting...' : children}
    </button>
  );
};

FormSubmit.propTypes = {
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Button content */
  children: PropTypes.node.isRequired,
};

// Attach sub-components to Form
Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Control = FormControl;
Form.Feedback = FormFeedback;
Form.Text = FormText;
Form.Submit = FormSubmit;

// Export the form context hook
export { useFormContext };

export default Form;
