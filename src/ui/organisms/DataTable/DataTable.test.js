/**
 * DataTable Component Tests
 * 
 * This file contains tests for the DataTable component.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTable from './DataTable';
import { DATA_TABLE_SELECTION_TYPES } from './constants';

// Mock data for testing
const mockColumns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' }
];

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
];

describe('DataTable Component', () => {
  test('renders with basic props', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    
    // Check if column headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    
    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  test('renders empty state when no data is provided', () => {
    render(<DataTable columns={mockColumns} data={[]} emptyMessage="No data found" />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(<DataTable columns={mockColumns} data={mockData} loading={true} loadingMessage="Loading data..." />);
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        error="Failed to load data" 
        errorMessage="Error occurred" 
      />
    );
    
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  test('handles row click', () => {
    const handleRowClick = jest.fn();
    render(<DataTable columns={mockColumns} data={mockData} onRowClick={handleRowClick} />);
    
    // Click on a row
    fireEvent.click(screen.getByText('John Doe'));
    
    // Check if the handler was called with the correct row data
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  test('handles sorting', async () => {
    const handleSort = jest.fn();
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        sortable={true} 
        onSort={handleSort} 
      />
    );
    
    // Click on a sortable column header
    fireEvent.click(screen.getByText('Name'));
    
    // Check if the handler was called with the correct column and direction
    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    
    // Click again to sort in descending order
    fireEvent.click(screen.getByText('Name'));
    
    // Check if the handler was called with the correct column and direction
    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  test('handles row selection', () => {
    const handleSelectionChange = jest.fn();
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        selectionType={DATA_TABLE_SELECTION_TYPES.MULTIPLE} 
        onSelectionChange={handleSelectionChange} 
      />
    );
    
    // Find checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Select a row
    fireEvent.click(checkboxes[1]); // First row checkbox (index 0 is the select all checkbox)
    
    // Check if the handler was called with the correct selection
    expect(handleSelectionChange).toHaveBeenCalledWith([1]);
    
    // Select another row
    fireEvent.click(checkboxes[2]);
    
    // Check if the handler was called with the correct selection
    expect(handleSelectionChange).toHaveBeenCalledWith([1, 2]);
    
    // Deselect a row
    fireEvent.click(checkboxes[1]);
    
    // Check if the handler was called with the correct selection
    expect(handleSelectionChange).toHaveBeenCalledWith([2]);
  });

  test('handles search', async () => {
    const handleSearch = jest.fn();
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        searchable={true} 
        onSearch={handleSearch} 
      />
    );
    
    // Find search input
    const searchInput = screen.getByPlaceholderText('Search...');
    
    // Type in search input
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // Check if the handler was called with the correct search term
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('John');
    });
  });

  test('handles pagination', () => {
    const handlePageChange = jest.fn();
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        pagination={true} 
        pageSize={2} 
        totalItems={10} 
        currentPage={1} 
        onPageChange={handlePageChange} 
      />
    );
    
    // Find pagination buttons
    const nextPageButton = screen.getByLabelText('Next page');
    
    // Click next page button
    fireEvent.click(nextPageButton);
    
    // Check if the handler was called with the correct page
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
