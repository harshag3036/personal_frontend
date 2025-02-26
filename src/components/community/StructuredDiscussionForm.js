import React, { useState, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import './DiscussionBoard.css';

/**
 * StructuredDiscussionForm Component
 * 
 * A form for creating structured discussions based on templates
 * 
 * @param {Object} props
 * @param {string} props.communityId - ID of the community this discussion belongs to
 * @param {Object} props.template - The template to use for this discussion
 * @param {Array} props.requiredSections - Array of section IDs that are required
 * @param {boolean} props.strictRigourEnforcement - Whether to strictly enforce rigour requirements
 * @param {Array} props.tags - Array of tags for the discussion
 * @param {Function} props.onAddTag - Function to call when adding a tag
 * @param {Function} props.onRemoveTag - Function to call when removing a tag
 * @param {string} props.tagInput - Current value of the tag input
 * @param {Function} props.onTagInputChange - Function to call when tag input changes
 * @param {string} props.title - Title of the discussion
 * @param {Function} props.onTitleChange - Function to call when title changes
 * @param {Function} props.onSubmit - Function to call when the form is submitted
 * @param {Function} props.onCancel - Function to call when the form is cancelled
 */
const StructuredDiscussionForm = ({
  communityId,
  template,
  requiredSections = template?.defaultRequiredSections || [],
  strictRigourEnforcement = false,
  tags = [],
  onAddTag,
  onRemoveTag,
  tagInput = '',
  onTagInputChange,
  title = '',
  onTitleChange,
  onSubmit,
  onCancel
}) => {
  // Debug log to see what template is being passed
  console.log('Template in StructuredDiscussionForm:', template);
  
  // Initialize section values from template
  const [sectionValues, setSectionValues] = useState(
    template && template.sections ? 
    template.sections.reduce((acc, section) => {
      acc[section.id] = '';
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
    
    // Check if title is filled
    if (!title.trim()) {
      setErrors(prev => ({ ...prev, title: 'Title is required' }));
      return;
    }
    
    // Check if all required sections are filled
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
      // Create discussion data
      const discussionData = {
        title,
        sections: sectionValues,
        templateId: template.id,
        tags,
        userId: user.id,
        author: {
          id: user.id,
          name: user.name
        },
        communityId,
        format: 'markdown',
        createdAt: new Date().toISOString(),
        meetsRigourRequirements: requiredSections.every(sectionId => sectionValues[sectionId]?.trim()),
        strictRigourEnforcement
      };
      
      // Submit the form with the discussion data
      await onSubmit(discussionData);
    } catch (error) {
      console.error('Error submitting discussion:', error);
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

  // Handle title change
  const handleTitleChange = (e) => {
    onTitleChange(e);
    
    // Clear title error if it exists
    if (errors.title) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.title;
        return newErrors;
      });
    }
  };

  // Handle tag input keydown
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTag();
    }
  };

  // If template is not available, show an error message
  if (!template || !template.sections) {
    return (
      <div className="create-discussion-form">
        <h3>Start a New Structured Discussion</h3>
        <div className="error-message general-error">
          Template not found or invalid. Please select a different template.
        </div>
        <div className="form-actions">
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
    );
  }

  return (
    <div className="create-discussion-form">
      <h3>Start a New Structured Discussion</h3>
      
      <div className="template-info">
        <div className="template-header">
          <h4>{template.name}</h4>
          <div className="template-actions">
            <button 
              type="button"
              className="change-template-button"
              onClick={() => onCancel(true)} // Pass true to indicate we want to change template
            >
              Change Template
            </button>
          </div>
          <div className="rigour-level">
            <span>Rigour Level: </span>
            <span className="rigour-indicator">
              {requiredSections && template.sections ? 
                (requiredSections.length === template.sections.length ? 'High' : 
                 requiredSections.length > 1 ? 'Medium' : 'Basic')
                : 'Unknown'
              }
            </span>
          </div>
        </div>
        <p>{template.description}</p>
        <div className="required-sections-info">
          <p>
            {strictRigourEnforcement 
              ? 'Required sections: ' 
              : 'Required for rigour badge: '
            }
            {requiredSections && requiredSections.map(id => {
              const section = template.sections.find(s => s.id === id);
              return section ? section.label : id;
            }).join(', ')}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}
        
        <div className="form-group">
          <label htmlFor="discussion-title">Title</label>
          <input
            id="discussion-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a descriptive title"
            className={errors.title ? 'error' : ''}
            required
          />
          {errors.title && (
            <div className="error-message">{errors.title}</div>
          )}
        </div>
        
        {template.sections && template.sections.length > 0 ? (
          template.sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <div key={section.id} className="template-section form-group">
                <h4>
                  {section.label}
                  {requiredSections.includes(section.id) && 
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
        
        <div className="form-group">
          <label htmlFor="discussion-tags">Tags</label>
          <div className="tag-input-container">
            <input
              id="discussion-tags"
              type="text"
              value={tagInput}
              onChange={onTagInputChange}
              placeholder="Add tags (press Enter to add)"
              onKeyDown={handleTagKeyDown}
            />
            <button 
              type="button" 
              onClick={onAddTag}
              className="add-tag-button"
            >
              Add
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="tags-container">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => onRemoveTag(tag)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Discussion'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StructuredDiscussionForm;
