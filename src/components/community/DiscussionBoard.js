import React, { useState, useEffect } from 'react';
import { SectionHeader } from './shared';
import { useTemplate } from '../../contexts/TemplateContext';
import TemplateConfiguration from './TemplateConfiguration';
import StructuredDiscussionForm from './StructuredDiscussionForm';
import './DiscussionBoard.css';

/**
 * DiscussionBoard Component
 * 
 * Displays a list of discussions for a community and allows users to create new discussions
 * 
 * @param {Object} props
 * @param {Array} props.discussions - List of discussions
 * @param {Function} props.onCreateDiscussion - Function to call when creating a new discussion
 * @param {Function} props.onViewDiscussion - Function to call when viewing a discussion
 * @param {String} props.communityId - ID of the community
 */
const DiscussionBoard = ({ 
  discussions = [], 
  onCreateDiscussion, 
  onViewDiscussion,
  communityId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTemplateConfig, setShowTemplateConfig] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    tags: [],
    templateId: null,
    requiredSections: [],
    strictRigourEnforcement: false
  });
  const { getTemplatesByType, getTemplate } = useTemplate();
  const [tagInput, setTagInput] = useState('');

  // Filter discussions based on search term
  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (discussion.content && discussion.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (discussion.tags && discussion.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  // Sort discussions based on sort option
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return (b.commentCount || 0) - (a.commentCount || 0);
      case 'activity':
        return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      default:
        return 0;
    }
  });

  const handleCreateSubmit = (data) => {
    // If data is an event (from the regular form), handle it differently
    if (data && data.preventDefault) {
      data.preventDefault();
      if (newDiscussion.title.trim() && (newDiscussion.content.trim() || newDiscussion.templateId)) {
        onCreateDiscussion({
          ...newDiscussion,
          communityId,
          createdAt: new Date().toISOString()
        });
      }
    } else {
      // This is structured discussion data from the StructuredDiscussionForm
      onCreateDiscussion({
        ...data,
        communityId
      });
    }
    
    // Reset form state
    setNewDiscussion({ 
      title: '', 
      content: '', 
      tags: [],
      templateId: null,
      requiredSections: [],
      strictRigourEnforcement: false
    });
    setShowCreateForm(false);
    setShowTemplateConfig(false);
  };
  
  const handleTemplateConfigSave = (templateConfig) => {
    setNewDiscussion({
      ...newDiscussion,
      templateId: templateConfig.templateId,
      requiredSections: templateConfig.requiredSections,
      strictRigourEnforcement: templateConfig.strictRigourEnforcement
    });
    setShowTemplateConfig(false);
    // Immediately show the structured form after template selection
    setShowCreateForm(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newDiscussion.tags.includes(tagInput.trim())) {
      setNewDiscussion({
        ...newDiscussion,
        tags: [...newDiscussion.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewDiscussion({
      ...newDiscussion,
      tags: newDiscussion.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="discussion-board">
      <div className="discussion-board-header">
        <SectionHeader 
          title="Discussions" 
          subtitle="Join the conversation"
          actions={
            <button 
              className="create-discussion-button"
              onClick={() => setShowCreateForm(true)}
            >
              Start Discussion
            </button>
          }
        />
        
        <div className="discussion-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="activity">Recent Activity</option>
            </select>
          </div>
        </div>
      </div>

      {showCreateForm && !showTemplateConfig && (
        <>
          {newDiscussion.templateId ? (
            <StructuredDiscussionForm
              communityId={communityId}
              template={getTemplate(newDiscussion.templateId)}
              requiredSections={newDiscussion.requiredSections}
              strictRigourEnforcement={newDiscussion.strictRigourEnforcement}
              tags={newDiscussion.tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              tagInput={tagInput}
              onTagInputChange={(e) => setTagInput(e.target.value)}
              title={newDiscussion.title}
              onTitleChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
              onSubmit={handleCreateSubmit}
              onCancel={() => setShowCreateForm(false)}
            />
          ) : (
            <div className="create-discussion-form">
              <h3>Start a New Discussion</h3>
              <form onSubmit={handleCreateSubmit}>
                <div className="template-option">
                  <button
                    type="button"
                    className="template-button"
                    onClick={() => setShowTemplateConfig(true)}
                  >
                    Use Discussion Template
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="discussion-title">Title</label>
                  <input
                    id="discussion-title"
                    type="text"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                    placeholder="Enter a descriptive title"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="discussion-content">Content</label>
                  <textarea
                    id="discussion-content"
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                    placeholder="Share your thoughts or questions..."
                    rows={5}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="discussion-tags">Tags</label>
                  <div className="tag-input-container">
                    <input
                      id="discussion-tags"
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tags (press Enter to add)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddTag}
                      className="add-tag-button"
                    >
                      Add
                    </button>
                  </div>
                  
                  {newDiscussion.tags.length > 0 && (
                    <div className="tags-container">
                      {newDiscussion.tags.map(tag => (
                        <span key={tag} className="tag">
                          {tag}
                          <button 
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
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
                    onClick={() => setShowCreateForm(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="submit-button"
                  >
                    Post Discussion
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
      
      {showTemplateConfig && (
        <TemplateConfiguration
          communityId={communityId}
          selectedTemplateId={newDiscussion.templateId}
          onSave={handleTemplateConfigSave}
          onCancel={() => setShowTemplateConfig(false)}
        />
      )}

      <div className="discussions-list">
        {sortedDiscussions.length > 0 ? (
          sortedDiscussions.map(discussion => (
            <div 
              key={discussion.id} 
              className="discussion-card"
              onClick={() => onViewDiscussion(discussion.id)}
            >
              <div className="discussion-card-header">
                <h3 className="discussion-title">{discussion.title}</h3>
                {discussion.tags && discussion.tags.length > 0 && (
                  <div className="discussion-tags">
                    {discussion.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="discussion-preview">
                <p>
                  {discussion.templateId ? (
                    <span className="template-badge">
                      {getTemplate(discussion.templateId)?.name || 'Structured Discussion'}
                    </span>
                  ) : discussion.content ? (
                    <>
                      {discussion.content.substring(0, 150)}
                      {discussion.content.length > 150 ? '...' : ''}
                    </>
                  ) : (
                    <em>No content preview available</em>
                  )}
                </p>
              </div>
              
              <div className="discussion-meta">
                <div className="discussion-author">
                  <span className="author-name">{discussion.author.name}</span>
                </div>
                <div className="discussion-stats">
                  <span className="comment-count">
                    {discussion.commentCount || 0} comments
                  </span>
                  <span className="date">
                    {formatDate(discussion.updatedAt || discussion.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No discussions found. Start a new conversation!</p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="create-discussion-button"
            >
              Start Discussion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionBoard;
