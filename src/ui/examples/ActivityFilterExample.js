/**
 * ActivityFilter Example
 * 
 * This example demonstrates how to use the ActivityFilter component
 * with various features and configurations.
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, Button, Flex } from '../atoms';
import { ActivityFilter } from '../organisms';
import { ACTIVITY_FILTER_TYPES, ACTIVITY_FILTER_CATEGORIES } from '../organisms/ActivityFilter';

// Sample filter options
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived' }
];

const typeOptions = [
  { value: 'task', label: 'Task' },
  { value: 'event', label: 'Event' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'meeting', label: 'Meeting' }
];

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

const assigneeOptions = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'alice', label: 'Alice Johnson' },
  { value: 'bob', label: 'Bob Wilson' }
];

const tagOptions = [
  'Frontend',
  'Backend',
  'Design',
  'Documentation',
  'Testing',
  'DevOps',
  'Research',
  'Planning'
];

/**
 * ActivityFilterExample Component
 * 
 * Demonstrates the usage of the ActivityFilter component with
 * interactive features and different configurations.
 */
const ActivityFilterExample = () => {
  // State for filters
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('medium');
  const [collapsible, setCollapsible] = useState(true);
  const [showClearButton, setShowClearButton] = useState(true);
  const [showApplyButton, setShowApplyButton] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Sample filters configuration
  const filters = [
    {
      id: 'status',
      type: ACTIVITY_FILTER_TYPES.CHECKBOX,
      label: 'Status',
      options: statusOptions,
      category: ACTIVITY_FILTER_CATEGORIES.STATUS
    },
    {
      id: 'type',
      type: ACTIVITY_FILTER_TYPES.RADIO,
      label: 'Type',
      options: typeOptions,
      category: ACTIVITY_FILTER_CATEGORIES.TYPE
    },
    {
      id: 'priority',
      type: ACTIVITY_FILTER_TYPES.SELECT,
      label: 'Priority',
      options: priorityOptions.map(option => ({ value: option.value, label: option.label })),
      category: ACTIVITY_FILTER_CATEGORIES.PRIORITY
    },
    {
      id: 'assignee',
      type: ACTIVITY_FILTER_TYPES.MULTI_SELECT,
      label: 'Assignee',
      options: assigneeOptions.map(option => ({ value: option.value, label: option.label })),
      category: ACTIVITY_FILTER_CATEGORIES.ASSIGNEE
    },
    {
      id: 'dateRange',
      type: ACTIVITY_FILTER_TYPES.DATE,
      label: 'Date Range',
      category: ACTIVITY_FILTER_CATEGORIES.DATE
    },
    {
      id: 'search',
      type: ACTIVITY_FILTER_TYPES.SEARCH,
      label: 'Search',
      placeholder: 'Search activities...',
      category: ACTIVITY_FILTER_CATEGORIES.CUSTOM
    },
    {
      id: 'tags',
      type: ACTIVITY_FILTER_TYPES.TAG,
      label: 'Tags',
      options: tagOptions,
      category: ACTIVITY_FILTER_CATEGORIES.TAG
    },
    {
      id: 'progress',
      type: ACTIVITY_FILTER_TYPES.RANGE,
      label: 'Progress',
      min: 0,
      max: 100,
      step: 5,
      formatValue: (value) => `${value}%`,
      category: ACTIVITY_FILTER_CATEGORIES.CUSTOM
    }
  ];

  // Handle filter change
  const handleFilterChange = useCallback((filterId, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  }, []);

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  // Handle apply filters
  const handleApplyFilters = useCallback((filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  }, []);

  // Toggle loading state
  const toggleLoading = () => {
    setLoading(prevLoading => !prevLoading);
    setError(null);
  };

  // Toggle error state
  const toggleError = () => {
    setError(error ? null : 'Failed to load filters due to a server error.');
    setLoading(false);
  };

  // Toggle collapsible state
  const toggleCollapsible = () => {
    setCollapsible(prevCollapsible => !prevCollapsible);
  };

  // Toggle clear button
  const toggleClearButton = () => {
    setShowClearButton(prevShowClearButton => !prevShowClearButton);
  };

  // Toggle apply button
  const toggleApplyButton = () => {
    setShowApplyButton(prevShowApplyButton => !prevShowApplyButton);
  };

  // Change variant
  const changeVariant = (newVariant) => {
    setVariant(newVariant);
  };

  // Change size
  const changeSize = (newSize) => {
    setSize(newSize);
  };

  // Format applied filters for display
  const formatAppliedFilters = () => {
    return Object.entries(appliedFilters).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(', ')}`;
      } else if (typeof value === 'object' && value !== null) {
        return `${key}: ${JSON.stringify(value)}`;
      } else {
        return `${key}: ${value}`;
      }
    }).join('\n');
  };

  return (
    <Box padding="lg">
      <Text variant="h1" marginBottom="md">ActivityFilter Example</Text>
      <Text variant="body1" marginBottom="lg">
        This example demonstrates how to use the ActivityFilter component with various features and configurations.
      </Text>
      
      <Flex gap="xl">
        <Box width="300px">
          <ActivityFilter
            title="Activity Filters"
            subtitle="Filter activities based on various criteria"
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onApplyFilters={handleApplyFilters}
            loading={loading}
            error={error}
            variant={variant}
            size={size}
            collapsible={collapsible}
            showClearButton={showClearButton}
            showApplyButton={showApplyButton}
          />
        </Box>
        
        <Box flex="1">
          <Box marginBottom="lg">
            <Text variant="h2" marginBottom="sm">Controls</Text>
            <Box display="flex" gap="md" flexWrap="wrap" marginBottom="md">
              <Button onClick={toggleLoading}>
                {loading ? 'Stop Loading' : 'Simulate Loading'}
              </Button>
              <Button onClick={toggleError}>
                {error ? 'Clear Error' : 'Simulate Error'}
              </Button>
              <Button onClick={toggleCollapsible}>
                {collapsible ? 'Disable Collapsible' : 'Enable Collapsible'}
              </Button>
              <Button onClick={toggleClearButton}>
                {showClearButton ? 'Hide Clear Button' : 'Show Clear Button'}
              </Button>
              <Button onClick={toggleApplyButton}>
                {showApplyButton ? 'Hide Apply Button' : 'Show Apply Button'}
              </Button>
            </Box>
            
            <Box marginBottom="md">
              <Text variant="h3" marginBottom="sm">Variant</Text>
              <Box display="flex" gap="md">
                <Button 
                  variant={variant === 'default' ? 'primary' : 'outline'} 
                  onClick={() => changeVariant('default')}
                >
                  Default
                </Button>
                <Button 
                  variant={variant === 'compact' ? 'primary' : 'outline'} 
                  onClick={() => changeVariant('compact')}
                >
                  Compact
                </Button>
                <Button 
                  variant={variant === 'expanded' ? 'primary' : 'outline'} 
                  onClick={() => changeVariant('expanded')}
                >
                  Expanded
                </Button>
                <Button 
                  variant={variant === 'sidebar' ? 'primary' : 'outline'} 
                  onClick={() => changeVariant('sidebar')}
                >
                  Sidebar
                </Button>
                <Button 
                  variant={variant === 'inline' ? 'primary' : 'outline'} 
                  onClick={() => changeVariant('inline')}
                >
                  Inline
                </Button>
              </Box>
            </Box>
            
            <Box marginBottom="md">
              <Text variant="h3" marginBottom="sm">Size</Text>
              <Box display="flex" gap="md">
                <Button 
                  variant={size === 'small' ? 'primary' : 'outline'} 
                  onClick={() => changeSize('small')}
                >
                  Small
                </Button>
                <Button 
                  variant={size === 'medium' ? 'primary' : 'outline'} 
                  onClick={() => changeSize('medium')}
                >
                  Medium
                </Button>
                <Button 
                  variant={size === 'large' ? 'primary' : 'outline'} 
                  onClick={() => changeSize('large')}
                >
                  Large
                </Button>
              </Box>
            </Box>
          </Box>
          
          <Box background="background-surface" padding="lg" borderRadius="md">
            <Text variant="h2" marginBottom="md">Applied Filters</Text>
            {Object.keys(appliedFilters).length > 0 ? (
              <Box as="pre" padding="md" background="background-alt" borderRadius="sm" overflow="auto">
                {formatAppliedFilters()}
              </Box>
            ) : (
              <Text>No filters applied yet. Use the filter panel on the left and click "Apply Filters".</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ActivityFilterExample;
