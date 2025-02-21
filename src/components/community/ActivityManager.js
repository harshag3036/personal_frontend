import React, { useState } from 'react';
import './ActivityManager.css';

/**
 * ActivityManager Component
 * Handles creation and management of different activity types
 * Supports events, projects, skill-sharing, resources, and challenges
 */
const ActivityManager = ({ onActivityCreate, onActivityUpdate }) => {
  const [activityType, setActivityType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    metadata: {}
  });

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

  const handleTypeSelect = (type) => {
    setActivityType(type);
    setFormData(prev => ({ ...prev, type }));
  };

  const renderTypeSelection = () => (
    <div className="activity-types">
      <h3>What would you like to create?</h3>
      <div className="type-grid">
        {activityTypes.map(type => (
          <button
            key={type.id}
            className={`type-card ${activityType === type.id ? 'selected' : ''}`}
            onClick={() => handleTypeSelect(type.id)}
          >
            <span className="type-icon">{type.icon}</span>
            <h4>{type.label}</h4>
            <p>{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderEventForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Event Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Give your event a clear name"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="What's this event about?"
          rows={4}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            onChange={e => setFormData({
              ...formData,
              metadata: { ...formData.metadata, startDate: e.target.value }
            })}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            onChange={e => setFormData({
              ...formData,
              metadata: { ...formData.metadata, location: e.target.value }
            })}
            placeholder="Where will this happen?"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Maximum Participants (optional)</label>
        <input
          type="number"
          onChange={e => setFormData({
            ...formData,
            metadata: { ...formData.metadata, maxParticipants: e.target.value }
          })}
          placeholder="Leave blank for no limit"
        />
      </div>
    </div>
  );

  const renderProjectForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Name your project"
        />
      </div>
      <div className="form-group">
        <label>Objective</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="What do you want to achieve?"
          rows={4}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            onChange={e => setFormData({
              ...formData,
              metadata: { ...formData.metadata, startDate: e.target.value }
            })}
          />
        </div>
        <div className="form-group">
          <label>Target End Date (optional)</label>
          <input
            type="date"
            onChange={e => setFormData({
              ...formData,
              metadata: { ...formData.metadata, endDate: e.target.value }
            })}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Required Skills (optional)</label>
        <input
          type="text"
          placeholder="Separate skills with commas"
          onChange={e => setFormData({
            ...formData,
            metadata: { ...formData.metadata, skills: e.target.value.split(',').map(s => s.trim()) }
          })}
        />
      </div>
    </div>
  );

  const renderSkillShareForm = () => (
    <div className="activity-form-fields">
      <div className="form-group">
        <label>Skill Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="What skill will be shared?"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe what will be taught/learned"
          rows={4}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Level</label>
          <select
            onChange={e => setFormData({
              ...formData,
              metadata: { ...formData.metadata, level: e.target.value }
            })}
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group">
          <label>Duration (optional)</label>
          <input
            type="text"
            placeholder="e.g., 4 weeks, 2 sessions"
            onChange={e => setFormData({
              ...formData,
              metadata: { ...formData.metadata, duration: e.target.value }
            })}
          />
        </div>
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onActivityCreate(formData);
  };

  return (
    <div className="activity-manager">
      {!activityType && renderTypeSelection()}
      
      {activityType && (
        <form onSubmit={handleSubmit} className="activity-form">
          <button 
            type="button" 
            className="back-button"
            onClick={() => setActivityType('')}
          >
            ← Back to Types
          </button>

          {activityType === 'event' && renderEventForm()}
          {activityType === 'project' && renderProjectForm()}
          {activityType === 'skill-share' && renderSkillShareForm()}
          {activityType === 'discussion' && (
            <div className="activity-form-fields">
              <div className="form-group">
                <label>Discussion Topic</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What would you like to explore together?"
                />
              </div>
              <div className="form-group">
                <label>Initial Reflection</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share your thoughts or questions to start the exploration..."
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Discussion Guidelines</label>
                <textarea
                  onChange={e => setFormData({
                    ...formData,
                    metadata: { ...formData.metadata, guidelines: e.target.value }
                  })}
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
                    onChange={e => setFormData({
                      ...formData,
                      metadata: { ...formData.metadata, focusAreas: e.target.value.split(',').map(s => s.trim()) }
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Other form types will be added here */}

          <div className="form-actions">
            <button type="submit" className="create-button">
              Create {activityTypes.find(t => t.id === activityType)?.label}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ActivityManager;
