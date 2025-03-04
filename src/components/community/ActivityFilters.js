import React from 'react';
import './ActivityBrowser.css';
import './ActivityFilters.css';

const ActivityFilters = ({ 
  filters, 
  setFilters, 
  handleFilterChange, 
  handleSearchChange, 
  viewMode, 
  handleViewModeChange,
  filtersExpanded,
  setFiltersExpanded,
  activityTypes,
  statusOptions,
  categories,
  dateRangeOptions,
  sortOptions,
  selectedTags,
  availableTags,
  handleTagToggle,
  handleClearFilters,
  groupBy,
  setGroupBy,
  showRecommended,
  setShowRecommended
}) => {
  return (
    <div className={`activity-browser-filters ${filtersExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="filter-row">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search activities..."
            value={filters.search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="view-toggle">
          <button
            className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
            aria-label="Grid view"
          >
            <span className="view-icon">▦</span>
          </button>
          <button
            className={`view-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('list')}
            aria-label="List view"
          >
            <span className="view-icon">☰</span>
          </button>
        </div>
      </div>
      
      <div 
        className={`filter-content ${filtersExpanded ? '' : 'hidden'}`} 
        aria-hidden={!filtersExpanded} 
        style={{
          display: filtersExpanded ? 'block' : 'none', 
          pointerEvents: filtersExpanded ? 'auto' : 'none'
        }}
      >
        <div className="filter-row">
          <div className="filter-group">
            <div className="select-wrapper">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                {activityTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon && `${type.icon} `}{type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <div className="select-wrapper">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="filter-select"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="filter-group">
            <div className="select-wrapper">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.icon && `${category.icon} `}{category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <div className="select-wrapper">
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="filter-select"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <div className="select-wrapper">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(filters.type || filters.status || filters.category || filters.search || filters.dateRange !== 'all' || filters.sortBy !== 'newest' || selectedTags.length > 0) && (
            <button className="clear-filters-button" onClick={handleClearFilters}>
              Clear Filters
            </button>
          )}
        </div>
        
        <div className="filter-row">
          <div className="grouping-controls">
            <span>Group by:</span>
            <div className="group-buttons">
              <button 
                className={`group-button ${groupBy === 'none' ? 'active' : ''}`}
                onClick={() => setGroupBy('none')}
              >
                None
              </button>
              <button 
                className={`group-button ${groupBy === 'category' ? 'active' : ''}`}
                onClick={() => setGroupBy('category')}
              >
                Category
              </button>
              <button 
                className={`group-button ${groupBy === 'type' ? 'active' : ''}`}
                onClick={() => setGroupBy('type')}
              >
                Type
              </button>
              <button 
                className={`group-button ${groupBy === 'status' ? 'active' : ''}`}
                onClick={() => setGroupBy('status')}
              >
                Status
              </button>
            </div>
          </div>
          
          <div className="recommendation-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showRecommended}
                onChange={() => setShowRecommended(!showRecommended)}
              />
              <span className="toggle-text">Show recommended activities</span>
            </label>
          </div>
        </div>
        
        <div className="tag-filter">
          <h4>Tags</h4>
          <div className="tag-cloud">
            {availableTags.map(tag => (
              <div 
                key={tag}
                className={`filter-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        className="filter-toggle" 
        onClick={() => setFiltersExpanded(!filtersExpanded)}
      >
        {filtersExpanded ? 'Show Less' : 'Show More'} 
        <span className={`filter-toggle-icon ${filtersExpanded ? 'up' : ''}`}>▼</span>
      </button>
    </div>
  );
};

export default ActivityFilters;
