/**
 * DataTable Example
 * 
 * This example demonstrates how to use the DataTable component
 * with various features and configurations.
 */

import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Icon } from '../atoms';
import DataTable, { DATA_TABLE_CELL_TYPES, DATA_TABLE_SELECTION_TYPES } from '../organisms/DataTable';

/**
 * DataTableExample Component
 * 
 * Demonstrates the usage of the DataTable component with
 * interactive features like sorting, filtering, pagination, and selection.
 */
const DataTableExample = () => {
  // Sample data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const pageSize = 5;
  
  // Column definitions
  const columns = [
    { 
      key: 'id', 
      header: 'ID', 
      sortable: true, 
      width: '80px' 
    },
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true 
    },
    { 
      key: 'email', 
      header: 'Email', 
      sortable: true 
    },
    { 
      key: 'role', 
      header: 'Role' 
    },
    { 
      key: 'status', 
      header: 'Status', 
      type: DATA_TABLE_CELL_TYPES.CUSTOM, 
      customRenderer: (value) => {
        const color = value === 'Active' ? 'green' : value === 'Inactive' ? 'red' : 'orange';
        return <span style={{ color }}>{value}</span>;
      }
    },
    { 
      key: 'lastLogin', 
      header: 'Last Login', 
      type: DATA_TABLE_CELL_TYPES.DATE,
      format: (value) => new Date(value).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  ];
  
  // Row actions
  const rowActions = [
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (row) => alert(`Edit user ${row.name}`)
    },
    {
      label: 'Delete',
      icon: 'trash',
      variant: 'danger',
      onClick: (row) => handleDeleteUser(row.id)
    },
    {
      label: 'View',
      icon: 'eye',
      onClick: (row) => alert(`View user ${row.name}`)
    }
  ];
  
  // Table actions
  const actions = [
    {
      label: 'Add User',
      icon: 'plus',
      variant: 'primary',
      onClick: () => alert('Add user clicked')
    },
    {
      label: 'Export',
      icon: 'download',
      onClick: () => alert('Export clicked')
    },
    {
      label: 'Refresh',
      icon: 'refresh',
      onClick: handleRefresh
    }
  ];
  
  // Simulate data fetching
  useEffect(() => {
    fetchData();
  }, []);
  
  // Simulate data fetching with search, sort, and pagination
  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Generate mock data
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'User',
          status: i % 4 === 0 ? 'Active' : i % 4 === 1 ? 'Inactive' : 'Pending',
          lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
        }));
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    }, 1000);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    fetchData();
  };
  
  // Handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1); // Reset to first page on search
  };
  
  // Handle sort
  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };
  
  // Handle delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setData(prevData => prevData.filter(user => user.id !== userId));
    }
  };
  
  // Filter and sort data
  const filteredAndSortedData = React.useMemo(() => {
    // Filter data based on search term
    let result = [...data];
    
    if (searchTerm) {
      result = result.filter(item => {
        return columns.some(column => {
          const value = item[column.key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }
    
    // Sort data based on sort column and direction
    if (sortColumn && sortDirection !== 'none') {
      result.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return result;
  }, [data, searchTerm, sortColumn, sortDirection, columns]);
  
  // Paginate data
  const paginatedData = React.useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, page, pageSize]);
  
  return (
    <Box padding="lg">
      <Text variant="h1" marginBottom="md">User Management</Text>
      <Text variant="body1" marginBottom="lg">
        This example demonstrates a DataTable component with various features like sorting, filtering, pagination, and row selection.
      </Text>
      
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="sm">Features</Text>
        <Box display="flex" gap="md" flexWrap="wrap">
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Sorting</Text>
            <Text variant="body2">Click on column headers to sort the data.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Filtering</Text>
            <Text variant="body2">Use the search box to filter the data.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Pagination</Text>
            <Text variant="body2">Navigate through pages of data.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Selection</Text>
            <Text variant="body2">Select rows using checkboxes.</Text>
          </Box>
        </Box>
      </Box>
      
      <Box marginBottom="lg">
        <DataTable
          columns={columns}
          data={paginatedData}
          title="Users"
          subtitle="Manage user accounts"
          loading={loading}
          error={error}
          searchable={true}
          searchValue={searchTerm}
          onSearch={handleSearch}
          pagination={true}
          pageSize={pageSize}
          totalItems={filteredAndSortedData.length}
          currentPage={page}
          onPageChange={setPage}
          selectionType={DATA_TABLE_SELECTION_TYPES.MULTIPLE}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortable={true}
          onSort={handleSort}
          defaultSortColumn={sortColumn}
          defaultSortDirection={sortDirection}
          rowActions={rowActions}
          actions={actions}
          emptyMessage="No users found. Add a user to get started."
          loadingMessage="Loading users..."
          errorMessage="Failed to load users. Please try again later."
        />
      </Box>
      
      {selectedRows.length > 0 && (
        <Box marginTop="lg" padding="md" background="background-subtle" borderRadius="md">
          <Text variant="h3" marginBottom="sm">Selected Users</Text>
          <Text variant="body2">You have selected {selectedRows.length} user(s).</Text>
          <Box marginTop="md" display="flex" gap="md">
            <Button 
              variant="primary" 
              onClick={() => alert(`Perform bulk action on users: ${selectedRows.join(', ')}`)}
            >
              <Icon name="settings" size="sm" />
              Bulk Action
            </Button>
            <Button 
              variant="danger" 
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${selectedRows.length} users?`)) {
                  setData(prevData => prevData.filter(user => !selectedRows.includes(user.id)));
                  setSelectedRows([]);
                }
              }}
            >
              <Icon name="trash" size="sm" />
              Delete Selected
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DataTableExample;
