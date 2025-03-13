/**
 * DataTable Component Stories
 * 
 * This file contains stories for the DataTable component.
 */

import React, { useState } from 'react';
import DataTable from './DataTable';
import { 
  DATA_TABLE_VARIANTS, 
  DATA_TABLE_SIZES, 
  DATA_TABLE_CELL_TYPES,
  DATA_TABLE_SELECTION_TYPES
} from './constants';

export default {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive component for displaying and managing tabular data.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(DATA_TABLE_VARIANTS),
      description: 'The visual style variant of the table'
    },
    size: {
      control: { type: 'select' },
      options: Object.values(DATA_TABLE_SIZES),
      description: 'The size of the table'
    },
    selectionType: {
      control: { type: 'select' },
      options: Object.values(DATA_TABLE_SELECTION_TYPES),
      description: 'The type of row selection'
    },
    sortable: {
      control: 'boolean',
      description: 'Whether the table columns are sortable'
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the table has search functionality'
    },
    pagination: {
      control: 'boolean',
      description: 'Whether the table has pagination'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the table is in a loading state'
    },
    toolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar'
    },
    footer: {
      control: 'boolean',
      description: 'Whether to show the footer'
    }
  }
};

// Sample data for the stories
const columns = [
  { key: 'id', header: 'ID', sortable: true, width: '80px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status', type: DATA_TABLE_CELL_TYPES.CUSTOM, customRenderer: (value) => {
    const color = value === 'Active' ? 'green' : value === 'Inactive' ? 'red' : 'orange';
    return <span style={{ color }}>{value}</span>;
  }},
  { key: 'lastLogin', header: 'Last Login', type: DATA_TABLE_CELL_TYPES.DATE }
];

const data = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'User',
  status: i % 4 === 0 ? 'Active' : i % 4 === 1 ? 'Inactive' : 'Pending',
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
}));

// Basic story
export const Basic = () => (
  <DataTable
    columns={columns}
    data={data}
    title="Users"
    subtitle="Manage user accounts"
  />
);

// Variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {Object.values(DATA_TABLE_VARIANTS).map(variant => (
      <div key={variant}>
        <h3>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
        <DataTable
          columns={columns}
          data={data.slice(0, 5)}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
          variant={variant}
        />
      </div>
    ))}
  </div>
);

// Sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {Object.values(DATA_TABLE_SIZES).map(size => (
      <div key={size}>
        <h3>{size.charAt(0).toUpperCase() + size.slice(1)}</h3>
        <DataTable
          columns={columns}
          data={data.slice(0, 5)}
          title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
          size={size}
        />
      </div>
    ))}
  </div>
);

// With search
export const WithSearch = () => {
  const [filteredData, setFilteredData] = useState(data);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => {
      return columns.some(column => {
        const value = item[column.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    
    setFilteredData(filtered);
  };
  
  return (
    <DataTable
      columns={columns}
      data={filteredData}
      title="Searchable Table"
      searchable={true}
      onSearch={handleSearch}
    />
  );
};

// With pagination
export const WithPagination = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
  
  return (
    <DataTable
      columns={columns}
      data={paginatedData}
      title="Paginated Table"
      pagination={true}
      pageSize={pageSize}
      totalItems={data.length}
      currentPage={page}
      onPageChange={setPage}
    />
  );
};

// With selection
export const WithSelection = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  
  return (
    <div>
      <DataTable
        columns={columns}
        data={data.slice(0, 10)}
        title="Selectable Table"
        selectionType={DATA_TABLE_SELECTION_TYPES.MULTIPLE}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
      <div style={{ marginTop: '1rem' }}>
        <h4>Selected Rows:</h4>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  );
};

// With sorting
export const WithSorting = () => {
  const [sortedData, setSortedData] = useState([...data]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('none');
  
  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
    
    if (direction === 'none') {
      setSortedData([...data]);
      return;
    }
    
    const sorted = [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      const comparison = aValue < bValue ? -1 : 1;
      return direction === 'asc' ? comparison : -comparison;
    });
    
    setSortedData(sorted);
  };
  
  return (
    <div>
      <DataTable
        columns={columns}
        data={sortedData}
        title="Sortable Table"
        sortable={true}
        onSort={handleSort}
        defaultSortColumn={sortColumn}
        defaultSortDirection={sortDirection}
      />
      <div style={{ marginTop: '1rem' }}>
        <h4>Sort State:</h4>
        <pre>{JSON.stringify({ column: sortColumn, direction: sortDirection }, null, 2)}</pre>
      </div>
    </div>
  );
};

// With row actions
export const WithRowActions = () => {
  const rowActions = [
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (row) => alert(`Edit row ${row.id}`)
    },
    {
      label: 'Delete',
      icon: 'trash',
      variant: 'danger',
      onClick: (row) => alert(`Delete row ${row.id}`)
    },
    {
      label: 'View',
      icon: 'eye',
      onClick: (row) => alert(`View row ${row.id}`)
    }
  ];
  
  return (
    <DataTable
      columns={columns}
      data={data.slice(0, 5)}
      title="Table with Row Actions"
      rowActions={rowActions}
    />
  );
};

// With table actions
export const WithTableActions = () => {
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
      onClick: () => alert('Refresh clicked')
    }
  ];
  
  return (
    <DataTable
      columns={columns}
      data={data.slice(0, 5)}
      title="Table with Actions"
      actions={actions}
    />
  );
};

// Loading state
export const Loading = () => (
  <DataTable
    columns={columns}
    data={data}
    title="Loading Table"
    loading={true}
    loadingMessage="Loading users..."
  />
);

// Error state
export const Error = () => (
  <DataTable
    columns={columns}
    data={data}
    title="Error Table"
    error="Failed to load data"
    errorMessage="There was an error loading the user data. Please try again later."
  />
);

// Empty state
export const Empty = () => (
  <DataTable
    columns={columns}
    data={[]}
    title="Empty Table"
    emptyMessage="No users found. Add a user to get started."
  />
);

// Interactive example with all features
export const Interactive = (args) => {
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('none');
  
  const pageSize = 5;
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => {
      return columns.some(column => {
        const value = item[column.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    
    setFilteredData(filtered);
    setPage(1); // Reset to first page on search
  };
  
  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
    
    if (direction === 'none') {
      setFilteredData([...data]);
      return;
    }
    
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      const comparison = aValue < bValue ? -1 : 1;
      return direction === 'asc' ? comparison : -comparison;
    });
    
    setFilteredData(sorted);
  };
  
  const rowActions = [
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (row) => alert(`Edit row ${row.id}`)
    },
    {
      label: 'Delete',
      icon: 'trash',
      variant: 'danger',
      onClick: (row) => alert(`Delete row ${row.id}`)
    }
  ];
  
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
    }
  ];
  
  return (
    <DataTable
      columns={columns}
      data={paginatedData}
      title="Users"
      subtitle="Manage user accounts"
      searchable={args.searchable}
      onSearch={handleSearch}
      pagination={args.pagination}
      pageSize={pageSize}
      totalItems={filteredData.length}
      currentPage={page}
      onPageChange={setPage}
      selectionType={args.selectionType}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      sortable={args.sortable}
      onSort={handleSort}
      defaultSortColumn={sortColumn}
      defaultSortDirection={sortDirection}
      rowActions={args.rowActions ? rowActions : []}
      actions={args.actions ? actions : []}
      variant={args.variant}
      size={args.size}
      loading={args.loading}
      toolbar={args.toolbar}
      footer={args.footer}
    />
  );
};

Interactive.args = {
  variant: DATA_TABLE_VARIANTS.DEFAULT,
  size: DATA_TABLE_SIZES.MEDIUM,
  selectionType: DATA_TABLE_SELECTION_TYPES.NONE,
  sortable: true,
  searchable: true,
  pagination: true,
  rowActions: true,
  actions: true,
  loading: false,
  toolbar: true,
  footer: true
};
