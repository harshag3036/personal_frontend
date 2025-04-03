import React, { useState, useEffect } from 'react';
import { ActivityFilter, Box, Text, Flex, Button, Card, Badge, Stack, Icon } from '../index';
import {
  ACTIVITY_FILTER_TYPES,
  ACTIVITY_FILTER_CATEGORIES
} from '../organisms/ActivityFilter/constants';

/**
 * ActivityFilter Render Props Example
 * 
 * This example demonstrates using the ActivityFilter component with render props pattern
 * to create a highly customized filtering interface with complete control over rendering.
 */
const ActivityFilterRenderPropsExample = () => {
  // Sample filter definitions
  const initialFilters = [
    {
      id: 'category',
      type: ACTIVITY_FILTER_TYPES.CHECKBOX,
      label: 'Categories',
      options: [
        { value: 'learning', label: 'Learning' },
        { value: 'wellness', label: 'Wellness' },
        { value: 'productivity', label: 'Productivity' },
        { value: 'creativity', label: 'Creativity' },
        { value: 'social', label: 'Social' }
      ],
      category: ACTIVITY_FILTER_CATEGORIES.BASIC
    },
    {
      id: 'difficulty',
      type: ACTIVITY_FILTER_TYPES.RADIO,
      label: 'Difficulty',
      options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'all', label: 'All Levels' }
      ],
      category: ACTIVITY_FILTER_CATEGORIES.BASIC
    },
    {
      id: 'duration',
      type: ACTIVITY_FILTER_TYPES.RANGE,
      label: 'Duration (minutes)',
      min: 5,
      max: 120,
      step: 5,
      formatValue: (value) => `${value} min`,
      category: ACTIVITY_FILTER_CATEGORIES.ADVANCED
    },
    {
      id: 'tags',
      type: ACTIVITY_FILTER_TYPES.TAG,
      label: 'Tags',
      options: ['Mind', 'Body', 'Focus', 'Relaxation', 'Energy', 'Calm', 'Productivity', 'Creativity'],
      category: ACTIVITY_FILTER_CATEGORIES.ADVANCED
    },
    {
      id: 'date',
      type: ACTIVITY_FILTER_TYPES.DATE,
      label: 'Date Range',
      category: ACTIVITY_FILTER_CATEGORIES.ADVANCED
    },
    {
      id: 'search',
      type: ACTIVITY_FILTER_TYPES.SEARCH,
      label: 'Search',
      placeholder: 'Search activities...',
      category: ACTIVITY_FILTER_CATEGORIES.BASIC
    }
  ];

  // State
  const [activeFilters, setActiveFilters] = useState({});
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample activities data
  useEffect(() => {
    // This would typically come from an API
    const sampleActivities = [
      { id: 1, title: 'Guided Meditation', category: 'wellness', difficulty: 'beginner', duration: 15, tags: ['Mind', 'Calm', 'Focus'] },
      { id: 2, title: 'Productivity Journaling', category: 'productivity', difficulty: 'beginner', duration: 20, tags: ['Productivity', 'Focus'] },
      { id: 3, title: 'Advanced Yoga Flow', category: 'wellness', difficulty: 'advanced', duration: 45, tags: ['Body', 'Energy'] },
      { id: 4, title: 'Speed Reading Techniques', category: 'learning', difficulty: 'intermediate', duration: 30, tags: ['Mind', 'Productivity'] },
      { id: 5, title: 'Creative Writing Exercise', category: 'creativity', difficulty: 'beginner', duration: 25, tags: ['Creativity'] },
      { id: 6, title: 'Group Discussion', category: 'social', difficulty: 'all', duration: 60, tags: ['Social'] },
      { id: 7, title: 'Focus Training', category: 'productivity', difficulty: 'intermediate', duration: 20, tags: ['Mind', 'Focus'] },
      { id: 8, title: 'Deep Relaxation', category: 'wellness', difficulty: 'beginner', duration: 15, tags: ['Body', 'Calm', 'Relaxation'] }
    ];
    
    setActivities(sampleActivities);
    setFilteredActivities(sampleActivities);
  }, []);

  // Handle filter change
  const handleFilterChange = (filterId, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  // Apply filters to activities
  useEffect(() => {
    let filtered = [...activities];
    
    // Apply category filter
    if (activeFilters.category && activeFilters.category.length) {
      filtered = filtered.filter(activity => 
        activeFilters.category.includes(activity.category)
      );
    }
    
    // Apply difficulty filter
    if (activeFilters.difficulty && activeFilters.difficulty !== 'all') {
      filtered = filtered.filter(activity => 
        activity.difficulty === activeFilters.difficulty
      );
    }
    
    // Apply duration filter
    if (activeFilters.duration) {
      filtered = filtered.filter(activity => 
        activity.duration >= activeFilters.duration[0] && 
        activity.duration <= activeFilters.duration[1]
      );
    }
    
    // Apply tags filter
    if (activeFilters.tags && activeFilters.tags.length) {
      filtered = filtered.filter(activity => 
        activity.tags.some(tag => activeFilters.tags.includes(tag))
      );
    }
    
    // Apply search filter
    if (activeFilters.search) {
      const search = activeFilters.search.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(search)
      );
    }
    
    setFilteredActivities(filtered);
  }, [activeFilters, activities]);

  // Get background color for category badges
  const getCategoryColor = (category) => {
    switch (category) {
      case 'learning': return '#4285F4';
      case 'wellness': return '#34A853';
      case 'productivity': return '#EA4335';
      case 'creativity': return '#FBBC05';
      case 'social': return '#9C27B0';
      default: return '#757575';
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({});
  };

  // Apply button for mobile view
  const handleApplyFilters = () => {
    setIsFilterDrawerOpen(false);
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Activity Filter with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the ActivityFilter component with render props pattern
        to create a highly customized filtering interface with complete control over the filtering UI.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Custom activity filter implementation to demonstrate how render props would work */}
        <Box 
          width="100%" 
          maxWidth="1200px" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          padding="md"
        >
          <Flex marginBottom="md" justifyContent="space-between" alignItems="center">
            <Text as="h3">Activity Browser</Text>
            
            {/* Mobile filter toggle */}
            <Button 
              size="sm"
              variant="outline"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              display={{ base: 'flex', md: 'none' }}
            >
              <Icon name="filter" size="sm" />
              Filters
            </Button>
          </Flex>
          
          <Flex gap="lg" flexWrap="wrap">
            {/* Filter sidebar - would be rendered via render props in the actual implementation */}
            <Box 
              width={{ base: '100%', md: '250px' }}
              display={{ base: isFilterDrawerOpen ? 'block' : 'none', md: 'block' }}
              position={{ base: 'fixed', md: 'relative' }}
              top={{ base: 0, md: 'auto' }}
              left={{ base: 0, md: 'auto' }}
              bottom={{ base: 0, md: 'auto' }}
              right={{ base: 0, md: 'auto' }}
              zIndex={{ base: 1000, md: 1 }}
              backgroundColor="white"
              padding={{ base: 'md', md: 0 }}
              boxShadow={{ base: '0 0 10px rgba(0,0,0,0.1)', md: 'none' }}
            >
              <Flex 
                justifyContent="space-between" 
                alignItems="center" 
                marginBottom="md"
                display={{ base: 'flex', md: 'none' }}
              >
                <Text as="h3">Filters</Text>
                <Button 
                  variant="text" 
                  onClick={() => setIsFilterDrawerOpen(false)}
                >
                  <Icon name="x" size="sm" />
                </Button>
              </Flex>
              
              {/* Category filter */}
              <Box marginBottom="lg">
                <Text fontWeight="bold" marginBottom="sm">Categories</Text>
                <Flex flexDirection="column" gap="xs">
                  {initialFilters.find(f => f.id === 'category').options.map(option => (
                    <Flex 
                      key={option.value} 
                      alignItems="center"
                    >
                      <input 
                        type="checkbox"
                        id={`category-${option.value}`}
                        checked={activeFilters.category?.includes(option.value) || false}
                        onChange={(e) => {
                          const categories = activeFilters.category || [];
                          if (e.target.checked) {
                            handleFilterChange('category', [...categories, option.value]);
                          } else {
                            handleFilterChange('category', categories.filter(c => c !== option.value));
                          }
                        }}
                        style={{ marginRight: '8px' }}
                      />
                      <label htmlFor={`category-${option.value}`}>
                        {option.label}
                      </label>
                    </Flex>
                  ))}
                </Flex>
              </Box>
              
              {/* Difficulty filter */}
              <Box marginBottom="lg">
                <Text fontWeight="bold" marginBottom="sm">Difficulty</Text>
                <Flex flexDirection="column" gap="xs">
                  {initialFilters.find(f => f.id === 'difficulty').options.map(option => (
                    <Flex 
                      key={option.value} 
                      alignItems="center"
                    >
                      <input 
                        type="radio"
                        id={`difficulty-${option.value}`}
                        name="difficulty"
                        value={option.value}
                        checked={activeFilters.difficulty === option.value}
                        onChange={() => handleFilterChange('difficulty', option.value)}
                        style={{ marginRight: '8px' }}
                      />
                      <label htmlFor={`difficulty-${option.value}`}>
                        {option.label}
                      </label>
                    </Flex>
                  ))}
                </Flex>
              </Box>
              
              {/* Duration filter */}
              <Box marginBottom="lg">
                <Text fontWeight="bold" marginBottom="sm">Duration</Text>
                <Box padding="xs">
                  <Flex justifyContent="space-between" marginBottom="xs">
                    <Text>{activeFilters.duration?.[0] || 5} min</Text>
                    <Text>{activeFilters.duration?.[1] || 120} min</Text>
                  </Flex>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={activeFilters.duration?.[0] || 5}
                    onChange={(e) => {
                      const min = parseInt(e.target.value);
                      const max = activeFilters.duration?.[1] || 120;
                      handleFilterChange('duration', [min, Math.max(min, max)]);
                    }}
                    style={{ width: '100%', marginBottom: '8px' }}
                  />
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={activeFilters.duration?.[1] || 120}
                    onChange={(e) => {
                      const max = parseInt(e.target.value);
                      const min = activeFilters.duration?.[0] || 5;
                      handleFilterChange('duration', [Math.min(min, max), max]);
                    }}
                    style={{ width: '100%' }}
                  />
                </Box>
              </Box>
              
              {/* Tags filter */}
              <Box marginBottom="lg">
                <Text fontWeight="bold" marginBottom="sm">Tags</Text>
                <Flex flexWrap="wrap" gap="xs">
                  {initialFilters.find(f => f.id === 'tags').options.map(tag => (
                    <Box
                      key={tag}
                      padding="xs"
                      borderRadius="sm"
                      backgroundColor={activeFilters.tags?.includes(tag) ? 'primary' : 'gray.100'}
                      color={activeFilters.tags?.includes(tag) ? 'white' : 'textColor'}
                      cursor="pointer"
                      onClick={() => {
                        const tags = activeFilters.tags || [];
                        if (tags.includes(tag)) {
                          handleFilterChange('tags', tags.filter(t => t !== tag));
                        } else {
                          handleFilterChange('tags', [...tags, tag]);
                        }
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                </Flex>
              </Box>
              
              {/* Search filter */}
              <Box marginBottom="lg">
                <Text fontWeight="bold" marginBottom="sm">Search</Text>
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={activeFilters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </Box>
              
              {/* Filter actions */}
              <Flex flexDirection="column" gap="sm">
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleApplyFilters}
                  display={{ base: 'block', md: 'none' }}
                >
                  Apply Filters
                </Button>
              </Flex>
            </Box>
            
            {/* Results panel */}
            <Box flex="1">
              {/* Results header */}
              <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
                <Text>
                  Showing {filteredActivities.length} of {activities.length} activities
                </Text>
                <Flex alignItems="center" gap="sm">
                  <Text>Sort by:</Text>
                  <select 
                    style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      border: '1px solid #ccc' 
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                    <option value="duration-asc">Duration (Low to High)</option>
                    <option value="duration-desc">Duration (High to Low)</option>
                  </select>
                </Flex>
              </Flex>
              
              {/* Activity grid */}
              <Box 
                display="grid" 
                gridTemplateColumns={{
                  base: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                }}
                gap="md"
              >
                {filteredActivities.map(activity => (
                  <Card key={activity.id} padding="md">
                    <Flex justifyContent="space-between" marginBottom="xs">
                      <Badge 
                        backgroundColor={getCategoryColor(activity.category)}
                        color="white"
                      >
                        {activity.category}
                      </Badge>
                      <Text fontSize="sm">{activity.duration} min</Text>
                    </Flex>
                    <Text as="h4" marginBottom="xs">{activity.title}</Text>
                    <Text variant="caption" marginBottom="sm">Difficulty: {activity.difficulty}</Text>
                    <Flex flexWrap="wrap" gap="xs">
                      {activity.tags.map(tag => (
                        <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                      ))}
                    </Flex>
                  </Card>
                ))}
              </Box>
              
              {/* Empty state */}
              {filteredActivities.length === 0 && (
                <Box textAlign="center" padding="xl">
                  <Text>No activities match your filters.</Text>
                  <Button variant="primary" onClick={handleClearFilters} marginTop="md">
                    Clear Filters
                  </Button>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">ActivityFilter with Render Props</Text>
            <Text marginBottom="md">
              The ActivityFilter component would benefit greatly from the render props pattern, 
              allowing for completely custom filter interfaces while leveraging the component's 
              filtering logic and state management.
            </Text>
            
            <Text as="h4" marginBottom="sm">Benefits of Render Props for ActivityFilter:</Text>
            <ul>
              <li>Complete control over filter rendering and layout</li>
              <li>Custom filter types beyond the built-in options</li>
              <li>Responsive designs for desktop and mobile</li>
              <li>Integration with other components in the application</li>
              <li>Custom behavior for filter changes and application</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<ActivityFilter
  filters={filters}
  activeFilters={activeFilters}
  onFilterChange={handleFilterChange}
  onClearFilters={handleClearFilters}
  onApplyFilters={handleApplyFilters}
>
  {({
    filters,
    activeFilters,
    filteredItems,
    handleFilterChange,
    handleClearFilters,
    handleApplyFilters,
    // Additional context like grouped filters, etc.
  }) => (
    <Flex>
      {/* Custom filter sidebar */}
      <Box width="250px">
        <Text as="h3">Custom Filters</Text>
        
        {/* Custom filter UI for each filter type */}
        {filters.map(filter => (
          <Box key={filter.id}>
            <Text>{filter.label}</Text>
            
            {/* Custom rendering based on filter type */}
            {filter.type === 'checkbox' && (
              <YourCustomCheckboxGroup
                options={filter.options}
                value={activeFilters[filter.id] || []}
                onChange={value => 
                  handleFilterChange(filter.id, value)
                }
              />
            )}
            
            {/* Add other filter type renderers */}
          </Box>
        ))}
        
        <Button onClick={handleClearFilters}>
          Clear All
        </Button>
      </Box>
      
      {/* Custom results area */}
      <Box flex="1">
        <Flex justifyContent="space-between">
          <Text>
            {filteredItems.length} items
          </Text>
          <YourCustomSorter />
        </Flex>
        
        {/* Custom rendering of filtered items */}
        <Grid>
          {filteredItems.map(item => (
            <YourCustomItemCard
              key={item.id}
              item={item}
            />
          ))}
        </Grid>
      </Box>
    </Flex>
  )}
</ActivityFilter>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example demonstrates how the ActivityFilter component would work with render props,
              though the component doesn't yet implement this pattern in our UI library. The custom 
              implementation shown here mimics what would be possible with a render props-enabled version.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default ActivityFilterRenderPropsExample;
