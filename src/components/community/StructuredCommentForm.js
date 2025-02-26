import React, { useState, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import './CommentSection.css';

/**
 * StructuredCommentForm Component
 * 
 * A form for creating structured comments based on templates
 * 
 * @param {Object} props
 * @param {string} props.activityId - ID of the activity this comment belongs to
 * @param {string} [props.parentId] - ID of the parent comment (if this is a reply)
 * @param {Function} props.onSubmit - Function to call when the form is submitted
 * @param {boolean} [props.autoFocus] - Whether to autofocus the first input
 * @param {Function} [props.onCancel] - Function to call when the form is cancelled
 * @param {Object} props.template - The template to use for this comment
 * @param {Object} [props.initialSections] - Initial values for the sections
 * @param {boolean} [props.strictRigourEnforcement] - Whether to strictly enforce rigour requirements
 */
const StructuredCommentForm = ({
  activityId,
  parentId = null,
  onSubmit,
  autoFocus = false,
  onCancel = null,
  template,
  initialSections = {},
  strictRigourEnforcement = false
}) => {
  // Debug log to see what template is being passed
  console.log('Template in StructuredCommentForm:', template);
  
  // Initialize section values from template
  const [sectionValues, setSectionValues] = useState(
    template && template.sections ? 
    template.sections.reduce((acc, section) => {
      acc[section.id] = initialSections[section.id] || '';
      return acc;
    }, {}) : {}
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useUser();
  const firstInputRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Check if template exists
    if (!template || !template.sections) {
      setErrors({ general: 'Template not found or invalid' });
      return;
    }
    
    // Check if all required sections are filled
    const requiredSections = template.defaultRequiredSections || [];
    const allRequiredFilled = requiredSections.every(sectionId => 
      sectionValues[sectionId]?.trim()
    );
    
    // Show warnings for empty required fields
    const newErrors = {};
    requiredSections.forEach(sectionId => {
      if (!sectionValues[sectionId]?.trim()) {
        newErrors[sectionId] = strictRigourEnforcement 
          ? 'This field is required' 
          : 'This field is recommended for rigour';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // If strict enforcement is enabled and there are errors, don't submit
      if (strictRigourEnforcement) {
        return;
      }
    }
    
    // Check if at least one section has content
    const hasAnyContent = Object.values(sectionValues).some(value => value.trim());
    if (!hasAnyContent) {
      setErrors({ general: 'Please fill at least one section' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const commentData = {
        sections: sectionValues,
        templateId: template.id,
        userId: user.id,
        userName: user.name,
        parentId,
        format: 'markdown',
        createdAt: new Date().toISOString(),
        meetsRigourRequirements: allRequiredFilled,
        activityId: activityId
      };
      
      await onSubmit(commentData);
      
      // Reset form
      setSectionValues(
        template.sections.reduce((acc, section) => {
          acc[section.id] = '';
          return acc;
        }, {})
      );
      setErrors({});
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle section value change
  const handleSectionChange = (sectionId, value) => {
    setSectionValues(prev => ({
      ...prev,
      [sectionId]: value
    }));
    
    // Clear error for this section if it exists
    if (errors[sectionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[sectionId];
        return newErrors;
      });
    }
  };

  // If template is not available, show an error message
  if (!template || !template.sections) {
    return (
      <form className="comment-form structured-form">
        <div className="error-message general-error">
          Template not found or invalid. Please select a different template.
        </div>
        <div className="comment-form-footer">
          <div className="comment-form-actions">
            {onCancel && (
              <button 
                type="button" 
                className="cancel-button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form className="comment-form structured-form" onSubmit={handleSubmit}>
      <div className="template-form-header">
        <h3>{template.name}</h3>
        <p>{template.description}</p>
        <div className="rigour-level">
          <span>Rigour Level: </span>
          <span className="rigour-indicator">
            {template.defaultRequiredSections && template.sections ? 
              (template.defaultRequiredSections.length === template.sections.length ? 'High' : 
               template.defaultRequiredSections.length > 1 ? 'Medium' : 'Basic')
              : 'Unknown'
            }
          </span>
        </div>
        <div className="required-sections-info">
          <p>
            {strictRigourEnforcement 
              ? 'Required sections: ' 
              : 'Required for rigour badge: '
            }
            {template.defaultRequiredSections && template.defaultRequiredSections.map(id => {
              const section = template.sections.find(s => s.id === id);
              return section ? section.label : id;
            }).join(', ')}
          </p>
        </div>
      </div>
      
      {errors.general && (
        <div className="error-message general-error">{errors.general}</div>
      )}
      
      {template.sections && template.sections.length > 0 ? (
        template.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div key={section.id} className="template-section form-group">
              <h4>
                {section.label}
                {template.defaultRequiredSections.includes(section.id) && 
                  <span className="required-marker">*</span>
                }
              </h4>
              
              {section.description && (
                <p className="section-description">{section.description}</p>
              )}
              
              <textarea
                ref={index === 0 ? firstInputRef : null}
                value={sectionValues[section.id] || ''}
                onChange={(e) => handleSectionChange(section.id, e.target.value)}
                placeholder={section.placeholder}
                required={false}
                disabled={isSubmitting}
                className={errors[section.id] ? 'error' : ''}
                autoFocus={index === 0 && autoFocus}
                rows={5}
              />
              
              {errors[section.id] && (
                <div className="error-message">{errors[section.id]}</div>
              )}
            </div>
          ))
      ) : (
        <div className="empty-sections-message">
          <p>No template sections found. Please select a different template.</p>
        </div>
      )}
      
      <div className="comment-form-footer">
        <div className="comment-form-info">
          <small>Supports markdown formatting</small>
        </div>
        <div className="comment-form-actions">
          {onCancel && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sharing...' : parentId ? 'Share Reply' : 'Share Reflection'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StructuredCommentForm;
