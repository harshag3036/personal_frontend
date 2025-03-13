/**
 * ActivityFilter Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActivityFilter from './ActivityFilter';
import { ACTIVITY_FILTER_TYPES, ACTIVITY_FILTER_CATEGORIES } from './constants';

// Sample filter options for testing
const mockFilters = [
  {
    id: 'status',
    type: ACTIVITY_FILTER_TYPES.CHECKBOX,
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
      { value: 'pending', label: 'Pending' }
    ],
    category: ACTIVITY_FILTER_CATEGORIES.STATUS
  },
  {
    id: 'search',
    type: ACTIVITY_FILTER_TYPES.SEARCH,
    label: 'Search',
    placeholder: 'Search activities...',
    category: ACTIVITY_FILTER_CATEGORIES.CUSTOM
  }
];

describe('ActivityFilter Component', () => {
  test('renders with title and subtitle', () => {
    render(
      <ActivityFilter
        title="Test Filters"
        subtitle="Filter test activities"
        filters={mockFilters}
      />
    );
    
    expect(screen.getByText('Test Filters')).toBeInTheDocument();
    expect(screen.getByText('Filter test activities')).toBeInTheDocument();
  });

  test('renders filter sections correctly', () => {
    render(<ActivityFilter filters={mockFilters} />);
    
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onFilterChange when a filter value changes', () => {
    const handleFilterChange = jest.fn();
    
    render(
      <ActivityFilter
        filters={mockFilters}
        onFilterChange={handleFilterChange}
      />
    );
    
    // Find and click a checkbox
    const checkbox = screen.getByLabelText('Active');
    fireEvent.click(checkbox);
    
    expect(handleFilterChange).toHaveBeenCalledWith('status', ['active']);
  });

  test('calls onClearFilters when clear button is clicked', () => {
    const handleClearFilters = jest.fn();
    
    render(
      <ActivityFilter
        filters={mockFilters}
        onClearFilters={handleClearFilters}
        showClearButton={true}
      />
    );
    
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);
    
    expect(handleClearFilters).toHaveBeenCalled();
  });

  test('calls onApplyFilters when apply button is clicked', () => {
    const handleApplyFilters = jest.fn();
    const activeFilters = { status: ['active'] };
    
    render(
      <ActivityFilter
        filters={mockFilters}
        activeFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
        showApplyButton={true}
      />
    );
    
    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);
    
    expect(handleApplyFilters).toHaveBeenCalledWith(activeFilters);
  });

  test('renders loading state correctly', () => {
    render(
      <ActivityFilter
        filters={mockFilters}
        loading={true}
        loadingMessage="Loading test filters..."
      />
    );
    
    expect(screen.getByText('Loading test filters...')).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Test error message';
    
    render(
      <ActivityFilter
        filters={mockFilters}
        error={new Error(errorMessage)}
        errorMessage="Failed to load test filters."
      />
    );
    
    expect(screen.getByText('Failed to load test filters.')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('applies variant and size classes correctly', () => {
    const { container } = render(
      <ActivityFilter
        filters={mockFilters}
        variant="compact"
        size="small"
      />
    );
    
    const filterElement = container.firstChild;
    expect(filterElement).toHaveClass('ui-activity-filter--compact');
    expect(filterElement).toHaveClass('ui-activity-filter--small');
  });
});
