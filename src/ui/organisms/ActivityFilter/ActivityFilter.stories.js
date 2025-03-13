/**
 * ActivityFilter Component Stories
 */

import React, { useState } from 'react';
import ActivityFilter from './ActivityFilter';
import { ACTIVITY_FILTER_TYPES, ACTIVITY_FILTER_CATEGORIES } from './constants';

export default {
  title: 'Organisms/ActivityFilter',
  component: ActivityFilter,
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive component for filtering activities based on various criteria.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Filter panel title'
    },
    subtitle: {
      control: 'text',
      description: 'Filter panel subtitle'
    },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'compact', 'expanded', 'sidebar', 'inline']
      },
      description: 'Component variant'
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      },
      description: 'Component size'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether filter sections are collapsible'
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether filter sections are expanded by default'
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show the clear button'
    },
    showApplyButton: {
      control: 'boolean',
      description: 'Whether to show the apply button'
    },
    loading: {
      control: 'boolean',
      description: 'Whether filters are loading'
    },
    error: {
      control: 'object',
      description: 'Error object or message'
    }
  }
};

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

// Sample filters configuration
const sampleFilters = [
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

// Template for all stories
const Template = (args) => {
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (filterId, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <ActivityFilter
        {...args}
        filters={sampleFilters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  title: 'Activity Filters',
  subtitle: 'Filter activities based on various criteria',
  variant: 'default',
  size: 'medium',
  collapsible: true,
  defaultExpanded: true,
  showClearButton: true,
  showApplyButton: true,
  loading: false,
  error: null
};

// Compact variant
export const Compact = Template.bind({});
Compact.args = {
  ...Default.args,
  title: 'Compact Filters',
  variant: 'compact',
  size: 'small'
};

// Expanded variant
export const Expanded = Template.bind({});
Expanded.args = {
  ...Default.args,
  title: 'Expanded Filters',
  variant: 'expanded',
  size: 'large'
};

// Sidebar variant
export const Sidebar = Template.bind({});
Sidebar.args = {
  ...Default.args,
  title: 'Sidebar Filters',
  variant: 'sidebar'
};
Sidebar.parameters = {
  docs: {
    description: {
      story: 'Sidebar variant is designed to be used in a sidebar layout.'
    }
  }
};

// Inline variant
export const Inline = Template.bind({});
Inline.args = {
  ...Default.args,
  title: 'Inline Filters',
  variant: 'inline',
  showApplyButton: false
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
  loadingMessage: 'Loading filters...'
};

// Error state
export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: new Error('Failed to load filters due to a server error.'),
  errorMessage: 'Failed to load filters. Please try again later.'
};

// Non-collapsible sections
export const NonCollapsible = Template.bind({});
NonCollapsible.args = {
  ...Default.args,
  title: 'Non-Collapsible Filters',
  collapsible: false
};

// Without buttons
export const WithoutButtons = Template.bind({});
WithoutButtons.args = {
  ...Default.args,
  title: 'Filters Without Buttons',
  showClearButton: false,
  showApplyButton: false
};
