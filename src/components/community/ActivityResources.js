import React, { useState } from 'react';
import './ActivityResources.css';

/**
 * ActivityResources Component
 * Manages activity resources and materials
 * Supports resource organization, sharing, and access management
 */
const ActivityResources = ({ activity, onUpdateActivity }) => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [resourceType, setResourceType] = useState('document');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceTags, setResourceTags] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [error, setError] = useState(null);

  const handleAddResource = async (e) => {
    e.preventDefault();
    setError(null);

    if (!resourceTitle.trim() || !resourceDescription.trim() || !resourceUrl.trim()) {
      setError('Please provide all resource details');
      return;
    }

    try {
      const newResource = {
        id: Date.now().toString(),
        title: resourceTitle.trim(),
        description: resourceDescription.trim(),
        type: resourceType,
        url: resourceUrl.trim(),
        tags: resourceTags,
        downloads: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        resources: [...(activity.resources || []), newResource]
      };

      await onUpdateActivity(updatedActivity);
      setResourceTitle('');
      setResourceDescription('');
      setResourceType('document');
      setResourceUrl('');
      setResourceTags([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedResource) return;

    try {
      const updatedResource = {
        ...selectedResource,
        title: resourceTitle.trim(),
        description: resourceDescription.trim(),
        type: resourceType,
        url: resourceUrl.trim(),
        tags: resourceTags,
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        resources: activity.resources.map(resource =>
          resource.id === selectedResource.id ? updatedResource : resource
        )
      };

      await onUpdateActivity(updatedActivity);
      setSelectedResource(null);
      setResourceTitle('');
      setResourceDescription('');
      setResourceType('document');
      setResourceUrl('');
      setResourceTags([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      const updatedActivity = {
        ...activity,
        resources: activity.resources.filter(resource => resource.id !== resourceId)
      };

      await onUpdateActivity(updatedActivity);
      setSelectedResource(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const selectResource = (resource) => {
    setSelectedResource(resource);
    setResourceTitle(resource.title);
    setResourceDescription(resource.description);
    setResourceType(resource.type);
    setResourceUrl(resource.url);
    setResourceTags(resource.tags);
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTag = e.target.value.trim();
      if (!resourceTags.includes(newTag)) {
        setResourceTags([...resourceTags, newTag]);
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setResourceTags(resourceTags.filter(tag => tag !== tagToRemove));
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document': return '📄';
      case 'video': return '🎥';
      case 'audio': return '🎧';
      case 'image': return '🖼️';
      case 'link': return '🔗';
      default: return '📁';
    }
  };

  const getFilteredResources = () => {
    let filtered = [...(activity.resources || [])];

    if (filter !== 'all') {
      filtered = filtered.filter(r => r.type === filter);
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.downloads + b.views) - (a.downloads + a.views));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredResources = getFilteredResources();

  return (
    <div className="activity-resources">
      <div className="resources-header">
        <h2>Resources & Materials</h2>
        <button
          className="new-resource-button"
          onClick={() => {
            setSelectedResource(null);
            setResourceTitle('');
            setResourceDescription('');
            setResourceType('document');
            setResourceUrl('');
            setResourceTags([]);
          }}
        >
          Add Resource
        </button>
      </div>

      <div className="resources-controls">
        <div className="resources-filters">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="image">Images</option>
            <option value="link">Links</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      <div className="resources-grid">
        <div className="resources-list">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div
                key={resource.id}
                className={`resource-card ${selectedResource?.id === resource.id ? 'selected' : ''}`}
                onClick={() => selectResource(resource)}
              >
                <div className="resource-header">
                  <div className="resource-info">
                    <span className="resource-icon">{getResourceIcon(resource.type)}</span>
                    <div className="resource-meta">
                      <h4>{resource.title}</h4>
                      <span className="resource-type">{resource.type}</span>
                    </div>
                  </div>
                  <div className="resource-stats">
                    <span className="stat-item">
                      👁️ {resource.views}
                    </span>
                    <span className="stat-item">
                      ⬇️ {resource.downloads}
                    </span>
                  </div>
                </div>
                <p className="resource-description">{resource.description}</p>
                {resource.tags.length > 0 && (
                  <div className="resource-tags">
                    {resource.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="resource-footer">
                  <span className="resource-date">
                    Added {new Date(resource.createdAt).toLocaleDateString()}
                  </span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                    onClick={e => e.stopPropagation()}
                  >
                    Open Resource
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No resources found</p>
              <p>Add resources to share with participants</p>
            </div>
          )}
        </div>

        <form onSubmit={selectedResource ? handleUpdateResource : handleAddResource} className="resource-form">
          <div className="form-section">
            <h3>{selectedResource ? 'Edit Resource' : 'Add Resource'}</h3>
            
            <div className="form-group">
              <label>Resource Type</label>
              <select
                value={resourceType}
                onChange={e => setResourceType(e.target.value)}
              >
                <option value="document">Document</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="image">Image</option>
                <option value="link">Link</option>
              </select>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={resourceTitle}
                onChange={e => setResourceTitle(e.target.value)}
                placeholder="Enter resource title..."
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={resourceDescription}
                onChange={e => setResourceDescription(e.target.value)}
                placeholder="Describe this resource..."
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                value={resourceUrl}
                onChange={e => setResourceUrl(e.target.value)}
                placeholder="Enter resource URL..."
                required
              />
            </div>

            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input">
                <div className="tags-list">
                  {resourceTags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tags... (Press Enter)"
                  onKeyDown={handleTagInput}
                />
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            {selectedResource && (
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteResource(selectedResource.id)}
              >
                Delete Resource
              </button>
            )}
            <div className="action-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setSelectedResource(null);
                  setResourceTitle('');
                  setResourceDescription('');
                  setResourceType('document');
                  setResourceUrl('');
                  setResourceTags([]);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                {selectedResource ? 'Update Resource' : 'Add Resource'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityResources;
