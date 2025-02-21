import React, { useState } from 'react';
import './ResourceHub.css';

/**
 * ResourceHub Component
 * Manages shared resources within activities
 * Supports various resource types and organization
 */
const ResourceHub = ({ resources, onAddResource, onRemoveResource }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'link',
    url: '',
    description: '',
    tags: []
  });
  const [error, setError] = useState(null);

  const resourceTypes = [
    { id: 'link', label: 'Link', icon: '🔗' },
    { id: 'document', label: 'Document', icon: '📄' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'file', label: 'File', icon: '📁' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await onAddResource(newResource);
      setShowAddForm(false);
      setNewResource({
        title: '',
        type: 'link',
        url: '',
        description: '',
        tags: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !newResource.tags.includes(newTag)) {
        setNewResource(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setNewResource(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const renderResourceCard = (resource) => (
    <div key={resource.id} className="resource-card">
      <div className="resource-header">
        <span className={`resource-type type-${resource.type}`}>
          {resourceTypes.find(t => t.id === resource.type)?.icon}
        </span>
        <h3>{resource.title}</h3>
        <button
          className="remove-button"
          onClick={() => onRemoveResource(resource.id)}
        >
          ×
        </button>
      </div>

      <p className="resource-description">{resource.description}</p>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
      >
        {resource.url}
      </a>

      {resource.tags?.length > 0 && (
        <div className="resource-tags">
          {resource.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="resource-meta">
        <span>Added by {resource.addedBy}</span>
        <span>{new Date(resource.addedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );

  return (
    <div className="resource-hub">
      <div className="hub-header">
        <h2>Resources</h2>
        <button
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          Add Resource
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="resource-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newResource.title}
              onChange={e => setNewResource(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter resource title"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                value={newResource.type}
                onChange={e => setNewResource(prev => ({ ...prev, type: e.target.value }))}
              >
                {resourceTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                value={newResource.url}
                onChange={e => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                placeholder="Enter resource URL"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newResource.description}
              onChange={e => setNewResource(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe this resource"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Tags (Press Enter to add)</label>
            <input
              type="text"
              onKeyDown={handleTagInput}
              placeholder="Add tags"
            />
            {newResource.tags.length > 0 && (
              <div className="tag-list">
                {newResource.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Resource
            </button>
          </div>
        </form>
      )}

      <div className="resources-grid">
        {resources.map(resource => renderResourceCard(resource))}
      </div>
    </div>
  );
};

export default ResourceHub;
