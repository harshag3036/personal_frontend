import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import SectionHeader from './shared/SectionHeader';
import ActivityInsights from './ActivityInsights';
import ActivityFilters from './ActivityFilters';
import ActivityDisplay from './ActivityDisplay';
import './ActivityBrowser.css';

const ActivityBrowser = ({ communityId, onActivityClick, onCreateActivity }) => {
  const { getActivities } = useActivity();
  const { user } = useUser();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [displayedActivities, setDisplayedActivities] = useState([]);
  
  // Initialize activity types with default values
  const defaultTypes = [
    { value: '', label: 'All Types' },
    { value: 'discussion', label: 'Discussion', icon: '🌱' },
    { value: 'event', label: 'Event', icon: '📅' },
    { value: 'project', label: 'Project', icon: '🎯' },
    { value: 'skill-share', label: 'Skill Share', icon: '🎓' },
    { value: 'resource', label: 'Resource', icon: '📚' },
    { value: 'challenge', label: 'Challenge', icon: '🏆' }
  ];
  
  // Initialize categories
  const [categories] = useState([
    { value: '', label: 'All Categories' },
    { value: 'fitness', label: 'Fitness', icon: '🏃' },
    { value: 'learning', label: 'Learning', icon: '📚' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'wellness', label: 'Wellness', icon: '🧘' },
    { value: 'technology', label: 'Technology', icon: '💻' }
  ]);
  
  // Initialize tags
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags] = useState([
    'beginner', 'advanced', 'indoor', 'outdoor', 
    'quick', 'intensive', 'relaxing', 'collaborative',
    'competitive', 'educational', 'fun', 'challenging'
  ]);
  
  const [activityTypes, setActivityTypes] = useState(defaultTypes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    category: '',
    search: '',
    dateRange: 'all',
    sortBy: 'newest'
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [groupBy, setGroupBy] = useState('none'); // 'none', 'category', 'type', 'status'
  const [showRecommended, setShowRecommended] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Activity type icons and colors
  const typeConfig = {
    discussion: { icon: '🌱', color: '#4caf50', label: 'Discussion' },
    event: { icon: '📅', color: '#2196f3', label: 'Event' },
    project: { icon: '🎯', color: '#9c27b0', label: 'Project' },
    'skill-share': { icon: '🎓', color: '#ff9800', label: 'Skill Share' },
    resource: { icon: '📚', color: '#795548', label: 'Resource' },
    challenge: { icon: '🏆', color: '#f44336', label: 'Challenge' }
  };

  // Status options
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' }
  ];

  // Date range options
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'active', label: 'Most Active' }
  ];

  // No need for additional initialization since we set the default state above

  // Load activities
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Fetching activities for communityId:', communityId);
        
        // Get all activities to debug
        const allActivities = JSON.parse(localStorage.getItem('activities') || '[]');
        console.log('All activities in localStorage:', allActivities);
        
        const activitiesData = await getActivities(communityId);
        console.log('Fetched activities for this community:', activitiesData);
        
        if (Array.isArray(activitiesData) && activitiesData.length > 0) {
          setActivities(activitiesData);
          setFilteredActivities(activitiesData);
          setError(null);
        } else {
          console.log('No activities found or empty array returned');
          setActivities([]);
          setFilteredActivities([]);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities. Please try again later.');
        setActivities([]);
        setFilteredActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [communityId, getActivities]);

  // Parse URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeParam = queryParams.get('type') || '';
    const statusParam = queryParams.get('status') || '';
    const searchParam = queryParams.get('search') || '';
    const dateRangeParam = queryParams.get('dateRange') || 'all';
    const sortByParam = queryParams.get('sortBy') || 'newest';
    const viewModeParam = queryParams.get('view') || 'grid';

    setFilters({
      type: typeParam,
      status: statusParam,
      search: searchParam,
      dateRange: dateRangeParam,
      sortBy: sortByParam
    });
    
    setViewMode(viewModeParam);
  }, [location.search]);

  // Update URL with current filters
  const updateQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams();
    
    if (filters.type) queryParams.set('type', filters.type);
    if (filters.status) queryParams.set('status', filters.status);
    if (filters.search) queryParams.set('search', filters.search);
    if (filters.dateRange !== 'all') queryParams.set('dateRange', filters.dateRange);
    if (filters.sortBy !== 'newest') queryParams.set('sortBy', filters.sortBy);
    if (viewMode !== 'grid') queryParams.set('view', viewMode);
    
    const queryString = queryParams.toString();
    navigate({
      pathname: location.pathname,
      search: queryString ? `?${queryString}` : ''
    });
  }, [filters, viewMode, navigate, location.pathname]);

  // Handle tag toggle
  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Get recommended activities
  const getRecommendedActivities = () => {
    // This would ideally use user preferences, history, etc.
    // For now, we'll use a simple algorithm
    const userInterests = user?.interests || [];
    const userSkills = user?.skills || [];
    
    // First normalize the activities to ensure consistent data
    const normalizedActivities = activities.map(normalizeActivityData);
    
    return normalizedActivities.filter(activity => {
      // Match by category
      const categoryMatch = userInterests.includes(activity.category);
      // Match by required skills
      const skillMatch = activity.requiredSkills?.some(skill => 
        userSkills.includes(skill)
      );
      // Match by popularity
      const isPopular = (activity.participants?.length || 0) > 5;
      
      return categoryMatch || skillMatch || isPopular;
    });
  };

  // Normalize activity data to ensure consistent grouping
  const normalizeActivityData = (activity) => {
    return {
      ...activity,
      // Ensure type is valid or set to default
      type: (activity.type && activity.type.trim() !== '' && typeConfig[activity.type]) 
        ? activity.type 
        : 'discussion',
      // Ensure category is valid or set to default
      category: (activity.category && activity.category.trim() !== '' && 
                categories.some(c => c.value === activity.category)) 
        ? activity.category 
        : '',
      // Ensure status is valid or set to default
      status: (activity.status && activity.status.trim() !== '' && 
              statusOptions.some(s => s.value === activity.status)) 
        ? activity.status 
        : 'active'
    };
  };

  // Apply filters and sorting
  useEffect(() => {
    if (!activities.length) return;

    // Normalize all activities to ensure consistent data
    let result = activities.map(normalizeActivityData);

    // Apply type filter
    if (filters.type) {
      result = result.filter(activity => activity.type === filters.type);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(activity => activity.status === filters.status);
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(activity => activity.category === filters.category);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(activity => 
        selectedTags.every(tag => activity.tags?.includes(tag))
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        activity =>
          activity.title.toLowerCase().includes(searchLower) ||
          activity.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      result = result.filter(activity => {
        const activityDate = new Date(activity.createdAt);
        switch (filters.dateRange) {
          case 'today':
            return activityDate >= today;
          case 'week':
            return activityDate >= startOfWeek;
          case 'month':
            return activityDate >= startOfMonth;
          case 'year':
            return activityDate >= startOfYear;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'popular':
          return (b.participants?.length || 0) - (a.participants?.length || 0);
        case 'active':
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        default:
          return 0;
      }
    });

    setFilteredActivities(result);
    
    // Apply recommendations if enabled
    if (showRecommended) {
      setDisplayedActivities(getRecommendedActivities());
    } else {
      setDisplayedActivities(result);
    }
  }, [activities, filters, selectedTags, showRecommended, user, categories, typeConfig, statusOptions]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    handleFilterChange('search', e.target.value);
  };

  // Handle view mode toggle
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Update URL when filters or view mode change
  useEffect(() => {
    updateQueryParams();
  }, [filters, viewMode, updateQueryParams]);

  // Handle activity click
  const handleActivityClick = (activityId) => {
    if (onActivityClick) {
      onActivityClick(activityId);
    } else {
      navigate(`/community/${communityId}/activity/${activityId}`);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      type: '',
      status: '',
      search: '',
      dateRange: 'all',
      sortBy: 'newest'
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="activity-browser">
      <SectionHeader 
        title="Activities" 
        subtitle="Discover and join community activities"
        actions={
          <button 
            className="create-activity-button"
            onClick={() => onCreateActivity ? onCreateActivity() : navigate(`/community/${communityId}/create-activity`)}
          >
            Create Activity
          </button>
        }
      />

      <ActivityFilters 
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
        viewMode={viewMode}
        handleViewModeChange={handleViewModeChange}
        filtersExpanded={filtersExpanded}
        setFiltersExpanded={setFiltersExpanded}
        activityTypes={activityTypes}
        statusOptions={statusOptions}
        categories={categories}
        dateRangeOptions={dateRangeOptions}
        sortOptions={sortOptions}
        selectedTags={selectedTags}
        availableTags={availableTags}
        handleTagToggle={handleTagToggle}
        handleClearFilters={handleClearFilters}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        showRecommended={showRecommended}
        setShowRecommended={setShowRecommended}
      />

      {/* Activity Insights */}
      {!loading && !error && filteredActivities.length > 0 && (
        <ActivityInsights activities={filteredActivities} />
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading activities...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No activities found</h3>
          <p>
            {filters.type || filters.status || filters.category || filters.search || filters.dateRange !== 'all' || selectedTags.length > 0 ? (
              <>
                No activities match your current filters. Try adjusting your filters or{' '}
                <button className="text-button" onClick={handleClearFilters}>
                  clear all filters
                </button>
                .
              </>
            ) : (
              <>
                There are no activities in this community yet. Be the first to{' '}
                <button 
                  className="text-button"
                  onClick={() => onCreateActivity ? onCreateActivity() : navigate(`/community/${communityId}/create-activity`)}
                >
                  create an activity
                </button>
                !
              </>
            )}
          </p>
        </div>
      ) : (
        <ActivityDisplay 
          displayedActivities={displayedActivities}
          viewMode={viewMode}
          groupBy={groupBy}
          handleActivityClick={handleActivityClick}
          typeConfig={typeConfig}
          categories={categories}
          statusOptions={statusOptions}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default ActivityBrowser;
