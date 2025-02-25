import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import { useActivity } from '../../contexts/ActivityContext';
import './ActivityManager.css';

const ActivityManager = ({ onActivityCreate, onClose }) => {
  const { addFile } = useActivity();
  const [activityType, setActivityType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    metadata: {},
    files: []
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({
    type: null,
    message: '',
    visible: false
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const validationRules = {
    discussion: {
      title: { required: true, minLength: 5, message: 'Title must be at least 5 characters' },
      description: { required: true, minLength: 20, message: 'Description must be at least 20 characters' }
    },
    event: {
      title: { required: true, minLength: 5, message: 'Title must be at least 5 characters' },
      description: { required: true, minLength: 20, message: 'Description must be at least 20 characters' },
      'metadata.startDate': { required: true, message: 'Start date is required' },
      'metadata.location': { required: true, message: 'Location is required' }
    },
    project: {
      title: { required: true, minLength: 5, message: 'Title must be at least 5 characters' },
      description: { required: true, minLength: 20, message: 'Description must be at least 20 characters' },
      'metadata.startDate': { required: true, message: 'Start date is required' }
    },
    'skill-share': {
      title: { required: true, minLength: 5, message: 'Title must be at least 5 characters' },
      description: { required: true, minLength: 20, message: 'Description must be at least 20 characters' },
      'metadata.level': { required: true, message: 'Skill level is required' }
    },
    resource: {
      title: { required: true, minLength: 5, message: 'Title must be at least 5 characters' },
      description: { required: true, minLength: 20, message: 'Description must be at least 20 characters' },
      'metadata.resourceType': { required: true, message: 'Resource type is required' }
    },
    challenge: {
      title: { required: true, minLength: 5, message: 'Title must be at least 5 characters' },
      description: { required: true, minLength: 20, message: 'Description must be at least 20 characters' },
      'metadata.duration': { required: true, message: 'Duration is required' },
      'metadata.goals': { required: true, message: 'At least one goal is required' },
      'metadata.criteria': { required: true, message: 'Success criteria are required' }
    }
  };

  const activityTypes = [
    {
      id: 'discussion',
      label: 'Mindful Discussion',
      icon: '🌱',
      description: 'Create space for meaningful exploration and sharing'
    },
    {
      id: 'event',
      label: 'Event',
      icon: '📅',
      description: 'Organize meetups, gatherings, or sessions'
    },
    {
      id: 'project',
      label: 'Project',
      icon: '🎯',
      description: 'Collaborate on shared goals and creations'
    },
    {
      id: 'skill-share',
      label: 'Skill Share',
      icon: '🎓',
      description: 'Teach or learn from others'
    },
    {
      id: 'resource',
      label: 'Resource',
      icon: '📚',
      description: 'Share helpful materials and links'
    },
    {
      id: 'challenge',
      label: 'Challenge',
      icon: '🏆',
      description: 'Create engaging group challenges'
    }
  ];

  const handleFileUpload = async (file) => {
    try {
      const fileResource = await addFile(null, file); // null activityId until activity is created
      setUploadedFiles(prev => [...prev, fileResource]);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: `Failed to upload file: ${error.message}`,
        visible: true
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const rules = validationRules[activityType];
    
    if (!rules) return true;

    Object.entries(rules).forEach(([field, rule]) => {
      const value = field.includes('metadata') 
        ? formData.metadata[field.split('.')[1]]
        : formData[field];

      if (rule.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field] = rule.message || 'This field is required';
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = rule.message || `Must be at least ${rule.minLength} characters`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: '',
      metadata: {},
      files: []
    });
    setErrors({});
    setFeedback({ type: null, message: '', visible: false });
    setHasUnsavedChanges(false);
    setUploadedFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: null, message: '', visible: false });

    if (!validateForm()) {
      setFeedback({
        type: 'error',
        message: 'Please fix the errors before submitting',
        visible: true
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const activityData = {
        ...formData,
        type: activityType,
        files: uploadedFiles.map(file => file.id)
      };
      
      const activity = await onActivityCreate(activityData);

      // Update file associations with new activity ID
      await Promise.all(uploadedFiles.map(file => 
        addFile(activity.id, file)
      ));

      setFeedback({
        type: 'success',
        message: 'Activity created successfully!',
        visible: true
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating activity:', error);
      setFeedback({
        type: 'error',
        message: error.message || 'Failed to create activity',
        visible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field, value, isMetadata = false) => {
    if (isSubmitting) return;
    
    setFormData(prev => ({
      ...prev,
      ...(isMetadata 
        ? { metadata: { ...prev.metadata, [field]: value } }
        : { [field]: value }
      )
    }));
  };

  const handleTypeSelect = (type) => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      return;
    }
    setActivityType(type);
    setFormData(prev => ({
      ...prev,
      type: type,
      title: '',
      description: '',
      metadata: {}
    }));
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      return;
    }
    if (activityType) {
      setActivityType('');
      resetForm();
    } else {
      onClose();
    }
  };

  const handleConfirmNavigation = (confirmed) => {
    setShowConfirmDialog(false);
    if (confirmed) {
      resetForm();
      if (!activityType) {
        onClose();
      } else {
        setActivityType('');
      }
    }
  };

  const renderTypeSelection = () => (
    <div className="activity-types">
      <div className="modal-header">
        <h2>Create New Activity</h2>
        <p>What would you like to create?</p>
      </div>
      <div className="type-grid">
        {activityTypes.map(type => (
          <button
            key={type.id}
            className={`type-card ${activityType === type.id ? 'selected' : ''}`}
            onClick={() => !isSubmitting && handleTypeSelect(type.id)}
            disabled={isSubmitting}
          >
            <span className="type-icon">{type.icon}</span>
            <h4>{type.label}</h4>
            <p>{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderFileUploader = () => (
    <div className="form-group">
      <label>Attachments (optional)</label>
      <FileUploader
        activityId={null}
        onUpload={handleFileUpload}
      />
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>Uploaded Files:</h4>
          <ul>
            {uploadedFiles.map(file => (
              <li key={file.id}>
                {file.name}
                <button
                  onClick={() => setUploadedFiles(prev => 
                    prev.filter(f => f.id !== file.id)
                  )}
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Add renderFileUploader to each form type's render function
  const renderEventForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Event Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => handleFieldChange('title', e.target.value)}
          disabled={isSubmitting}
          placeholder="Give your event a clear name"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => handleFieldChange('description', e.target.value)}
          disabled={isSubmitting}
          placeholder="What's this event about?"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            onChange={e => handleFieldChange('startDate', e.target.value, true)}
            disabled={isSubmitting}
            className={errors['metadata.startDate'] ? 'error' : ''}
          />
          {errors['metadata.startDate'] && (
            <span className="error-message">{errors['metadata.startDate']}</span>
          )}
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            onChange={e => handleFieldChange('location', e.target.value, true)}
            disabled={isSubmitting}
            placeholder="Where will this happen?"
            className={errors['metadata.location'] ? 'error' : ''}
          />
          {errors['metadata.location'] && (
            <span className="error-message">{errors['metadata.location']}</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <label>Maximum Participants (optional)</label>
        <input
          type="number"
          onChange={e => handleFieldChange('maxParticipants', e.target.value, true)}
          disabled={isSubmitting}
          placeholder="Leave blank for no limit"
        />
      </div>
      {renderFileUploader()}
    </div>
  );

  const renderProjectForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => handleFieldChange('title', e.target.value)}
          disabled={isSubmitting}
          placeholder="Name your project"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Objective</label>
        <textarea
          value={formData.description}
          onChange={e => handleFieldChange('description', e.target.value)}
          disabled={isSubmitting}
          placeholder="What do you want to achieve?"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            onChange={e => handleFieldChange('startDate', e.target.value, true)}
            disabled={isSubmitting}
            className={errors['metadata.startDate'] ? 'error' : ''}
          />
          {errors['metadata.startDate'] && (
            <span className="error-message">{errors['metadata.startDate']}</span>
          )}
        </div>
        <div className="form-group">
          <label>Target End Date (optional)</label>
          <input
            type="date"
            onChange={e => handleFieldChange('endDate', e.target.value, true)}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Required Skills (optional)</label>
        <input
          type="text"
          placeholder="Separate skills with commas"
          onChange={e => handleFieldChange('skills', e.target.value.split(',').map(s => s.trim()), true)}
          disabled={isSubmitting}
        />
      </div>
      {renderFileUploader()}
    </div>
  );

  const renderSkillShareForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Skill Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => handleFieldChange('title', e.target.value)}
          disabled={isSubmitting}
          placeholder="What skill will be shared?"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => handleFieldChange('description', e.target.value)}
          disabled={isSubmitting}
          placeholder="Describe what will be taught/learned"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Level</label>
          <select
            onChange={e => handleFieldChange('level', e.target.value, true)}
            disabled={isSubmitting}
            className={errors['metadata.level'] ? 'error' : ''}
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors['metadata.level'] && (
            <span className="error-message">{errors['metadata.level']}</span>
          )}
        </div>
        <div className="form-group">
          <label>Duration (optional)</label>
          <input
            type="text"
            placeholder="e.g., 4 weeks, 2 sessions"
            onChange={e => handleFieldChange('duration', e.target.value, true)}
            disabled={isSubmitting}
          />
        </div>
      </div>
      {renderFileUploader()}
    </div>
  );

  const renderResourceForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Resource Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => handleFieldChange('title', e.target.value)}
          disabled={isSubmitting}
          placeholder="Name your resource"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => handleFieldChange('description', e.target.value)}
          disabled={isSubmitting}
          placeholder="Describe this resource and its value"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-group">
        <label>Resource Type</label>
        <select
          onChange={e => handleFieldChange('resourceType', e.target.value, true)}
          disabled={isSubmitting}
          className={errors['metadata.resourceType'] ? 'error' : ''}
        >
          <option value="">Select Type</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="book">Book</option>
          <option value="course">Course</option>
          <option value="tool">Tool</option>
          <option value="other">Other</option>
        </select>
        {errors['metadata.resourceType'] && (
          <span className="error-message">{errors['metadata.resourceType']}</span>
        )}
      </div>
      <div className="form-group">
        <label>URL (optional)</label>
        <input
          type="url"
          placeholder="https://example.com"
          onChange={e => handleFieldChange('url', e.target.value, true)}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label>Tags (optional)</label>
        <input
          type="text"
          placeholder="Separate tags with commas"
          onChange={e => handleFieldChange('tags', e.target.value.split(',').map(s => s.trim()), true)}
          disabled={isSubmitting}
        />
      </div>
      {renderFileUploader()}
    </div>
  );

  const renderChallengeForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Challenge Name</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => handleFieldChange('title', e.target.value)}
          disabled={isSubmitting}
          placeholder="Name your challenge"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => handleFieldChange('description', e.target.value)}
          disabled={isSubmitting}
          placeholder="Describe the challenge and its purpose"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-group">
        <label>Duration</label>
        <input
          type="text"
          placeholder="e.g., 30 days, 1 week"
          onChange={e => handleFieldChange('duration', e.target.value, true)}
          disabled={isSubmitting}
          className={errors['metadata.duration'] ? 'error' : ''}
        />
        {errors['metadata.duration'] && (
          <span className="error-message">{errors['metadata.duration']}</span>
        )}
      </div>
      <div className="form-group">
        <label>Goals</label>
        <textarea
          placeholder="Enter each goal on a new line"
          rows={4}
          onChange={e => handleFieldChange('goals', e.target.value.split('\n').filter(g => g.trim()), true)}
          disabled={isSubmitting}
          className={errors['metadata.goals'] ? 'error' : ''}
        />
        {errors['metadata.goals'] && (
          <span className="error-message">{errors['metadata.goals']}</span>
        )}
      </div>
      <div className="form-group">
        <label>Success Criteria</label>
        <textarea
          placeholder="Enter each criterion on a new line"
          rows={4}
          onChange={e => handleFieldChange('criteria', e.target.value.split('\n').filter(c => c.trim()), true)}
          disabled={isSubmitting}
          className={errors['metadata.criteria'] ? 'error' : ''}
        />
        {errors['metadata.criteria'] && (
          <span className="error-message">{errors['metadata.criteria']}</span>
        )}
      </div>
      {renderFileUploader()}
    </div>
  );

  return (
    <div className="activity-manager">
      <div className="modal-header">
        <button 
          type="button" 
          className="back-button"
          onClick={handleBack}
          disabled={isSubmitting}
        >
          ← Back
        </button>
        <button 
          type="button" 
          className="close-button"
          onClick={() => hasUnsavedChanges ? setShowConfirmDialog(true) : onClose()}
          disabled={isSubmitting}
        >
          ×
        </button>
      </div>

      {feedback.visible && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      {!activityType && renderTypeSelection()}
      
      {activityType && (
        <form onSubmit={handleSubmit} className="activity-form">
          <div className="form-header">
            <h2>Create {activityTypes.find(t => t.id === activityType)?.label}</h2>
            <p>Fill in the details below to create your activity</p>
          </div>

          {activityType === 'event' && renderEventForm()}
          {activityType === 'project' && renderProjectForm()}
          {activityType === 'skill-share' && renderSkillShareForm()}
          {activityType === 'resource' && renderResourceForm()}
          {activityType === 'challenge' && renderChallengeForm()}
          {activityType === 'discussion' && (
            <div className="activity-form-fields">
              <div className="form-group">
                <label>Discussion Topic</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  disabled={isSubmitting}
                  placeholder="What would you like to explore together?"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label>Initial Reflection</label>
                <textarea
                  value={formData.description}
                  onChange={e => handleFieldChange('description', e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Share your thoughts or questions to start the exploration..."
                  rows={4}
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
              <div className="form-group">
                <label>Discussion Guidelines</label>
                <textarea
                  onChange={e => handleFieldChange('guidelines', e.target.value, true)}
                  disabled={isSubmitting}
                  placeholder="Optional: Add specific guidelines for this discussion"
                  rows={3}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Focus Areas (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., self-awareness, relationships"
                    onChange={e => handleFieldChange('focusAreas', e.target.value.split(',').map(s => s.trim()), true)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              {renderFileUploader()}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="create-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating...
                </>
              ) : (
                `Create ${activityTypes.find(t => t.id === activityType)?.label}`
              )}
            </button>
          </div>
        </form>
      )}

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Unsaved Changes</h3>
            <p>You have unsaved changes. Are you sure you want to leave?</p>
            <div className="confirm-actions">
              <button 
                className="cancel-button"
                onClick={() => !isSubmitting && handleConfirmNavigation(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                className="confirm-button"
                onClick={() => !isSubmitting && handleConfirmNavigation(true)}
                disabled={isSubmitting}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityManager;
