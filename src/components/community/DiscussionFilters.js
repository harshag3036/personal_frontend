import React, { useState, useEffect } from 'react';
import './DiscussionFilters.css';

/**
 * DiscussionFilters Component
 * 
 * Provides advanced filtering options for discussions
 * 
 * @param {Object} props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Function to call when filters change
 * @param {Array} props.authors - List of available authors
 * @param {Array} props.tags - List of available tags
 * @param {Array} props.templates - List of available templates
 * @param {boolean} props.expanded - Whether the filter panel is expanded
 * @param {Function} props.onToggleExpand - Function to call when expand/collapse is toggled
 */
const DiscussionFilters = ({
  filters = {},
  onFilterChange,
  authors = [],
  tags = [],
  templates = [],
  expanded = false,
  onToggleExpand
}) => {
  const [localFilters, setLocalFilters] = useState({
    dateFrom: filters.dateFrom || '',
    dateTo: filters.dateTo || '',
    author: filters.author || '',
    tags: filters.tags || [],
    templateType: filters.templateType || 'all',
    templateId: filters.templateId || '',
    ...filters
  });

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters({
      dateFrom: filters.dateFrom || '',
      dateTo: filters.dateTo || '',
      author: filters.author || '',
      tags: filters.tags || [],
      templateType: filters.templateType || 'all',
      templateId: filters.templateId || '',
      ...filters
    });
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Handle tag selection
  const handleTagToggle = (tag) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter(t => t !== tag)
      : [...localFilters.tags, tag];
    
    handleFilterChange('tags', newTags);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      author: '',
      tags: [],
      templateType: 'all',
      templateId: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  // Count active filters
  const activeFilterCount = Object.entries(localFilters).reduce((count, [key, value]) => {
    if (key === 'tags' && value.length > 0) return count + 1;
    if (key !== 'tags' && value && value !== 'all') return count + 1;
    return count;
  }, 0);

  return (
    <div className="discussion-filters">
      <div className="filters-header">
        <button 
          className="toggle-filters-button"
          onClick={onToggleExpand}
        >
          {expanded ? 'Hide Filters' : 'Show Filters'} 
          {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
        </button>
        
        {activeFilterCount > 0 && (
          <button 
            className="clear-filters-button"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        )}
      </div>
      
      {expanded && (
        <div className="filters-panel">
          <div className="filter-group">
            <h4>Date Range</h4>
            <div className="date-range-inputs">
              <div className="filter-input">
                <label htmlFor="date-from">From</label>
                <input
                  id="date-from"
                  type="date"
                  value={localFilters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="filter-input">
                <label htmlFor="date-to">To</label>
                <input
                  id="date-to"
                  type="date"
                  value={localFilters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Author</h4>
            <select
              value={localFilters.author}
              onChange={(e) => handleFilterChange('author', e.target.value)}
              className="filter-select"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <h4>Discussion Type</h4>
            <select
              value={localFilters.templateType}
              onChange={(e) => handleFilterChange('templateType', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="regular">Regular Discussions</option>
              <option value="structured">Structured Discussions</option>
            </select>
            
            {localFilters.templateType === 'structured' && templates.length > 0 && (
              <div className="template-filter">
                <label htmlFor="template-select">Template</label>
                <select
                  id="template-select"
                  value={localFilters.templateId}
                  onChange={(e) => handleFilterChange('templateId', e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any Template</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {tags.length > 0 && (
            <div className="filter-group">
              <h4>Tags</h4>
              <div className="tags-filter">
                {tags.map(tag => (
                  <span 
                    key={tag}
                    className={`filter-tag ${localFilters.tags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeFilterCount > 0 && (
        <div className="active-filters">
          <span className="active-filters-label">Active Filters:</span>
          <div className="filter-badges">
            {localFilters.dateFrom && (
              <span className="filter-badge">
                From: {new Date(localFilters.dateFrom).toLocaleDateString()}
                <button 
                  onClick={() => handleFilterChange('dateFrom', '')}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
            
            {localFilters.dateTo && (
              <span className="filter-badge">
                To: {new Date(localFilters.dateTo).toLocaleDateString()}
                <button 
                  onClick={() => handleFilterChange('dateTo', '')}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
            
            {localFilters.author && (
              <span className="filter-badge">
                Author: {authors.find(a => a.id === localFilters.author)?.name || localFilters.author}
                <button 
                  onClick={() => handleFilterChange('author', '')}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
            
            {localFilters.templateType && localFilters.templateType !== 'all' && (
              <span className="filter-badge">
                Type: {localFilters.templateType === 'structured' ? 'Structured' : 'Regular'}
                <button 
                  onClick={() => handleFilterChange('templateType', 'all')}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
            
            {localFilters.templateId && (
              <span className="filter-badge">
                Template: {templates.find(t => t.id === localFilters.templateId)?.name || localFilters.templateId}
                <button 
                  onClick={() => handleFilterChange('templateId', '')}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
            
            {localFilters.tags.map(tag => (
              <span key={tag} className="filter-badge">
                Tag: {tag}
                <button 
                  onClick={() => handleTagToggle(tag)}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionFilters;
