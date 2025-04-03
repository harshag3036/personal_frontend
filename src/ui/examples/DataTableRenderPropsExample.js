import React, { useState } from 'react';
import { DataTable, Box, Text, Button, Flex, Stack, Input } from '../index';
import { DATA_TABLE_CELL_TYPES, DATA_TABLE_SELECTION_TYPES } from '../organisms/DataTable/constants';

/**
 * DataTable Render Props Example
 * 
 * This example demonstrates using the DataTable component with the render props pattern
 * to create a custom table implementation with advanced filtering and custom UI.
 */
const DataTableRenderPropsExample = () => {
  // Sample data
  const initialData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: new Date('2025-03-10') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastLogin: new Date('2025-03-15') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', lastLogin: new Date('2025-02-28') },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Admin', status: 'Pending', lastLogin: new Date('2025-03-05') },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', lastLogin: new Date('2025-03-12') },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'Pending', lastLogin: new Date('2025-02-25') },
    { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'Inactive', lastLogin: new Date('2025-01-15') },
    { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Admin', status: 'Active', lastLogin: new Date('2025-03-17') }
  ];
  
  // Column definitions
  const columns = [
    { key: 'id', header: 'ID', sortable: true, width: '70px' },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      type: DATA_TABLE_CELL_TYPES.CUSTOM,
      customRenderer: (value) => {
        const color = value === 'Active' ? 'green' : value === 'Inactive' ? 'red' : 'orange';
        return <span style={{ color }}>{value}</span>;
      }
    },
    { key: 'lastLogin', header: 'Last Login', type: DATA_TABLE_CELL_TYPES.DATE, sortable: true }
  ];
  
  // State
  const [data, setData] = useState(initialData);
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Action handlers
  const handleDelete = () => {
    if (selectedRows.length === 0) return;
    
    const newData = data.filter(row => !selectedRows.includes(row.id));
    setData(newData);
    setSelectedRows([]);
  };
  
  const handleSelectionChange = (selectedIds) => {
    setSelectedRows(selectedIds);
  };
  
  // Custom filter handlers
  const handleRoleFilter = (role) => {
    setRoleFilter(role);
  };
  
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };
  
  // Apply filters to data
  const getFilteredData = () => {
    return data.filter(row => {
      const roleMatch = roleFilter === 'All' || row.role === roleFilter;
      const statusMatch = statusFilter === 'All' || row.status === statusFilter;
      return roleMatch && statusMatch;
    });
  };
  
  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">DataTable with Render Props</Text>
      
      <DataTable
        columns={columns}
        data={getFilteredData()}
        selectionType={DATA_TABLE_SELECTION_TYPES.MULTIPLE}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        pagination={true}
        pageSize={5}
        searchable={true}
      >
        {(tableContext) => {
          const { 
            displayedData, 
            selectedRows, 
            handleSort, 
            handleSelectAll, 
            handleSelectRow,
            renderCellContent,
            columns,
            selectionType
          } = tableContext;
          
          return (
            <Stack spacing="md">
              {/* Custom filters UI - not part of the standard DataTable */}
              <Flex gap="lg" marginBottom="md">
                <Box flex="1">
                  <Text as="label" display="block" marginBottom="xs">Filter by Role:</Text>
                  <Box as="select" 
                    value={roleFilter} 
                    onChange={(e) => handleRoleFilter(e.target.value)}
                    width="100%"
                    padding="sm"
                  >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="User">User</option>
                  </Box>
                </Box>
                
                <Box flex="1">
                  <Text as="label" display="block" marginBottom="xs">Filter by Status:</Text>
                  <Box as="select" 
                    value={statusFilter} 
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    width="100%"
                    padding="sm"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </Box>
                </Box>
                
                {selectedRows.length > 0 && (
                  <Box alignSelf="flex-end">
                    <Button 
                      variant="danger" 
                      onClick={handleDelete}
                    >
                      Delete Selected ({selectedRows.length})
                    </Button>
                  </Box>
                )}
              </Flex>
              
              {/* Custom table rendering */}
              <div className="custom-data-table">
                <table width="100%" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {/* Selection column */}
                      {selectionType !== DATA_TABLE_SELECTION_TYPES.NONE && (
                        <th style={{ padding: '8px', textAlign: 'left' }}>
                          <input
                            type="checkbox"
                            checked={selectedRows.length > 0 && selectedRows.length === displayedData.length}
                            onChange={handleSelectAll}
                          />
                        </th>
                      )}
                      
                      {/* Column headers */}
                      {columns.map((column) => (
                        <th 
                          key={column.key}
                          style={{ 
                            padding: '12px 8px',
                            textAlign: 'left',
                            borderBottom: '2px solid #e0e0e0',
                            cursor: column.sortable ? 'pointer' : 'default'
                          }}
                          onClick={() => column.sortable && handleSort(column)}
                        >
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody>
                    {displayedData.map((row) => (
                      <tr 
                        key={row.id}
                        style={{ 
                          backgroundColor: selectedRows.includes(row.id) ? '#f0f7ff' : 'transparent',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {/* Selection cell */}
                        {selectionType !== DATA_TABLE_SELECTION_TYPES.NONE && (
                          <td style={{ padding: '8px' }}>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(row.id)}
                              onChange={() => handleSelectRow(row.id)}
                            />
                          </td>
                        )}
                        
                        {/* Data cells */}
                        {columns.map((column) => (
                          <td 
                            key={`${row.id}-${column.key}`}
                            style={{ 
                              padding: '10px 8px', 
                              borderBottom: '1px solid #e0e0e0'
                            }}
                          >
                            {renderCellContent(column, row[column.key], row)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Stats section - custom addition */}
              <Box 
                padding="md" 
                backgroundColor="rgba(0, 0, 0, 0.03)"
                borderRadius="md"
                marginTop="lg"
              >
                <Text as="h3" marginBottom="sm">Data Statistics</Text>
                <Flex gap="lg">
                  <Box>
                    <Text as="div" fontWeight="bold">Total Users</Text>
                    <Text>{data.length}</Text>
                  </Box>
                  <Box>
                    <Text as="div" fontWeight="bold">Active Users</Text>
                    <Text>{data.filter(u => u.status === 'Active').length}</Text>
                  </Box>
                  <Box>
                    <Text as="div" fontWeight="bold">Admins</Text>
                    <Text>{data.filter(u => u.role === 'Admin').length}</Text>
                  </Box>
                  <Box>
                    <Text as="div" fontWeight="bold">Editors</Text>
                    <Text>{data.filter(u => u.role === 'Editor').length}</Text>
                  </Box>
                  <Box>
                    <Text as="div" fontWeight="bold">Regular Users</Text>
                    <Text>{data.filter(u => u.role === 'User').length}</Text>
                  </Box>
                </Flex>
              </Box>
            </Stack>
          );
        }}
      </DataTable>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Benefits of Render Props Pattern</Text>
      <ul>
        <li>Complete control over table rendering while utilizing the DataTable's state management</li>
        <li>Add custom UI elements and filters not available in the standard component</li>
        <li>Customize styles and layout while maintaining functionality</li>
        <li>Create specialized data visualizations based on the table data</li>
        <li>Combine multiple components in ways not possible with the standard API</li>
      </ul>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Code Example</Text>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto', 
        fontSize: '0.9em' 
      }}>
{`<DataTable
  columns={columns}
  data={data}
  selectionType={DATA_TABLE_SELECTION_TYPES.MULTIPLE}
>
  {(tableContext) => {
    const { 
      displayedData, 
      selectedRows, 
      handleSort,
      handleSelectRow
    } = tableContext;
    
    return (
      // Your custom UI implementation
      <div>
        {/* Custom filters */}
        <div className="custom-filters">...</div>
        
        {/* Custom table implementation */}
        <table>
          {/* Use tableContext values and handlers */}
        </table>
      </div>
    );
  }}
</DataTable>`}
      </pre>
    </Box>
  );
};

export default DataTableRenderPropsExample;
