/**
 * DataTable Component
 * 
 * A comprehensive component for displaying and managing tabular data.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { Box, Text, Button, Icon, Flex, Stack } from '../../atoms';
import { SearchInput, Pagination } from '../../molecules';
import {
  DATA_TABLE_CLASS,
  DATA_TABLE_HEADER_CLASS,
  DATA_TABLE_BODY_CLASS,
  DATA_TABLE_FOOTER_CLASS,
  DATA_TABLE_ROW_CLASS,
  DATA_TABLE_CELL_CLASS,
  DATA_TABLE_HEAD_CELL_CLASS,
  DATA_TABLE_PAGINATION_CLASS,
  DATA_TABLE_TOOLBAR_CLASS,
  DATA_TABLE_SEARCH_CLASS,
  DATA_TABLE_ACTIONS_CLASS,
  DATA_TABLE_EMPTY_CLASS,
  DATA_TABLE_LOADING_CLASS,
  DATA_TABLE_ERROR_CLASS,
  DATA_TABLE_VARIANTS,
  DATA_TABLE_SIZES,
  DATA_TABLE_SORT_DIRECTIONS,
  DATA_TABLE_CELL_TYPES,
  DATA_TABLE_SELECTION_TYPES,
  DATA_TABLE_MODIFIERS
} from './constants';
import './DataTable.css';

/**
 * DataTable Component
 * 
 * A comprehensive component for displaying and managing tabular data.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} DataTable component
 */
const DataTable = ({
  columns = [],
  data = [],
  title,
  subtitle,
  loading = false,
  error = null,
  emptyMessage = 'No data available',
  loadingMessage = 'Loading data...',
  errorMessage = 'Failed to load data. Please try again later.',
  variant = DATA_TABLE_VARIANTS.DEFAULT,
  size = DATA_TABLE_SIZES.MEDIUM,
  sortable = true,
  defaultSortColumn = null,
  defaultSortDirection = DATA_TABLE_SORT_DIRECTIONS.ASC,
  selectionType = DATA_TABLE_SELECTION_TYPES.NONE,
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  onSort,
  pagination = false,
  pageSize = 10,
  totalItems,
  currentPage = 1,
  onPageChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearch,
  actions = [],
  rowActions = [],
  toolbar = true,
  footer = true,
  className = '',
  extensions = [],
  ...props
}) => {
  // State
  const [sortColumn, setSortColumn] = useState(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);
  const [selected, setSelected] = useState(selectedRows || []);
  const [searchTerm, setSearchTerm] = useState(searchValue || '');
  const [page, setPage] = useState(currentPage);
  const [internalData, setInternalData] = useState(data);

  // Update internal state when props change
  useEffect(() => {
    setInternalData(data);
  }, [data]);

  useEffect(() => {
    setSelected(selectedRows || []);
  }, [selectedRows]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setSearchTerm(searchValue || '');
  }, [searchValue]);

  // Handle sort
  const handleSort = useCallback((column) => {
    if (!sortable || !column.sortable) return;

    let newDirection = DATA_TABLE_SORT_DIRECTIONS.ASC;
    
    if (sortColumn === column.key) {
      if (sortDirection === DATA_TABLE_SORT_DIRECTIONS.ASC) {
        newDirection = DATA_TABLE_SORT_DIRECTIONS.DESC;
      } else if (sortDirection === DATA_TABLE_SORT_DIRECTIONS.DESC) {
        newDirection = DATA_TABLE_SORT_DIRECTIONS.NONE;
      }
    }

    setSortColumn(newDirection === DATA_TABLE_SORT_DIRECTIONS.NONE ? null : column.key);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(column.key, newDirection);
    } else {
      // Internal sorting if no external handler provided
      const sorted = [...internalData].sort((a, b) => {
        if (newDirection === DATA_TABLE_SORT_DIRECTIONS.NONE) return 0;
        
        const aValue = a[column.key];
        const bValue = b[column.key];
        
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        const comparison = aValue < bValue ? -1 : 1;
        return newDirection === DATA_TABLE_SORT_DIRECTIONS.ASC ? comparison : -comparison;
      });
      
      setInternalData(sorted);
    }
  }, [sortable, sortColumn, sortDirection, onSort, internalData]);

  // Handle selection
  const handleSelectAll = useCallback(() => {
    if (selectionType !== DATA_TABLE_SELECTION_TYPES.MULTIPLE) return;
    
    const allSelected = selected.length === internalData.length;
    const newSelected = allSelected ? [] : internalData.map(row => row.id);
    
    setSelected(newSelected);
    
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  }, [selectionType, selected, internalData, onSelectionChange]);

  const handleSelectRow = useCallback((rowId) => {
    if (selectionType === DATA_TABLE_SELECTION_TYPES.NONE) return;
    
    let newSelected = [...selected];
    
    if (selectionType === DATA_TABLE_SELECTION_TYPES.SINGLE) {
      newSelected = selected.includes(rowId) ? [] : [rowId];
    } else {
      if (selected.includes(rowId)) {
        newSelected = newSelected.filter(id => id !== rowId);
      } else {
        newSelected.push(rowId);
      }
    }
    
    setSelected(newSelected);
    
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  }, [selectionType, selected, onSelectionChange]);

  // Handle search
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onSearch) {
      onSearch(value);
    } else {
      // Internal search if no external handler provided
      if (!value.trim()) {
        setInternalData(data);
      } else {
        const filtered = data.filter(row => {
          return columns.some(column => {
            const cellValue = row[column.key];
            if (cellValue === null || cellValue === undefined) return false;
            return String(cellValue).toLowerCase().includes(value.toLowerCase());
          });
        });
        setInternalData(filtered);
      }
    }
  }, [onSearch, data, columns]);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    
    if (onPageChange) {
      onPageChange(newPage);
    }
  }, [onPageChange]);

  // Handle row click
  const handleRowClick = useCallback((row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }, [onRowClick]);

  // Calculate displayed data
  const displayedData = useMemo(() => {
    if (pagination && !onPageChange) {
      // Internal pagination if no external handler provided
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return internalData.slice(startIndex, endIndex);
    }
    return internalData;
  }, [pagination, onPageChange, page, pageSize, internalData]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (totalItems !== undefined) {
      return Math.ceil(totalItems / pageSize);
    }
    return Math.ceil(internalData.length / pageSize);
  }, [totalItems, internalData.length, pageSize]);

  // Render cell content based on type
  const renderCellContent = useCallback((column, value, row) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (column.render) {
      return column.render(value, row);
    }

    switch (column.type) {
      case DATA_TABLE_CELL_TYPES.NUMBER:
        return column.format ? column.format(value) : value.toLocaleString();
      case DATA_TABLE_CELL_TYPES.DATE:
        return column.format ? column.format(value) : new Date(value).toLocaleDateString();
      case DATA_TABLE_CELL_TYPES.BOOLEAN:
        return value ? 'Yes' : 'No';
      case DATA_TABLE_CELL_TYPES.CUSTOM:
        return column.customRenderer ? column.customRenderer(value, row) : value;
      case DATA_TABLE_CELL_TYPES.ACTION:
        return (
          <Flex gap="sm">
            {column.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'icon'}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(row);
                }}
                aria-label={action.label}
                title={action.label}
              >
                {action.icon && <Icon name={action.icon} size="sm" />}
                {action.label && action.showLabel && action.label}
              </Button>
            ))}
          </Flex>
        );
      case DATA_TABLE_CELL_TYPES.TEXT:
      default:
        return value;
    }
  }, []);

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('DataTable', {
      title,
      subtitle,
      variant,
      size,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('DataTable: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      title,
      subtitle,
      variant,
      size,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    title: extendedTitle,
    subtitle: extendedSubtitle,
    variant: extendedVariant,
    size: extendedSize,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const tableClasses = [
    DATA_TABLE_CLASS,
    `${DATA_TABLE_CLASS}--${extendedVariant}`,
    `${DATA_TABLE_CLASS}--${extendedSize}`,
    loading ? `${DATA_TABLE_CLASS}--loading` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');

  // Render loading state
  if (loading) {
    return (
      <div className={tableClasses} {...restProps}>
        {(toolbar && (extendedTitle || extendedSubtitle || actions.length > 0)) && (
          <div className={DATA_TABLE_TOOLBAR_CLASS}>
            <div>
              {extendedTitle && <Text variant="h3">{extendedTitle}</Text>}
              {extendedSubtitle && <Text variant="body2">{extendedSubtitle}</Text>}
            </div>
            
            {actions.length > 0 && (
              <div className={DATA_TABLE_ACTIONS_CLASS}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'secondary'}
                    size="small"
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.icon && <Icon name={action.icon} size="sm" />}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className={DATA_TABLE_LOADING_CLASS}>
          <Icon name="loader" size="lg" />
          <Text>{loadingMessage}</Text>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={tableClasses} {...restProps}>
        {(toolbar && (extendedTitle || extendedSubtitle)) && (
          <div className={DATA_TABLE_TOOLBAR_CLASS}>
            <div>
              {extendedTitle && <Text variant="h3">{extendedTitle}</Text>}
              {extendedSubtitle && <Text variant="body2">{extendedSubtitle}</Text>}
            </div>
          </div>
        )}
        
        <div className={DATA_TABLE_ERROR_CLASS}>
          <Icon name="alert-circle" size="lg" />
          <Text>{errorMessage}</Text>
          <Text variant="caption">{error.message || error}</Text>
        </div>
      </div>
    );
  }

  // Render empty state
  if (displayedData.length === 0) {
    return (
      <div className={tableClasses} {...restProps}>
        {(toolbar && (extendedTitle || extendedSubtitle || searchable || actions.length > 0)) && (
          <div className={DATA_TABLE_TOOLBAR_CLASS}>
            <div>
              {extendedTitle && <Text variant="h3">{extendedTitle}</Text>}
              {extendedSubtitle && <Text variant="body2">{extendedSubtitle}</Text>}
            </div>
            
            <Flex gap="md">
              {searchable && (
                <div className={DATA_TABLE_SEARCH_CLASS}>
                  <SearchInput
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder={searchPlaceholder}
                  />
                </div>
              )}
              
              {actions.length > 0 && (
                <div className={DATA_TABLE_ACTIONS_CLASS}>
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || 'secondary'}
                      size="small"
                      onClick={action.onClick}
                      disabled={action.disabled}
                    >
                      {action.icon && <Icon name={action.icon} size="sm" />}
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </Flex>
          </div>
        )}
        
        <div className={DATA_TABLE_EMPTY_CLASS}>
          <Icon name="inbox" size="lg" />
          <Text>{emptyMessage}</Text>
        </div>
      </div>
    );
  }

  // Create a data table context object with all state and handlers
  const dataTableContext = {
    // State
    data: internalData,
    displayedData,
    sortColumn,
    sortDirection,
    selectedRows: selected,
    searchTerm,
    page,
    totalPages,
    
    // Handlers
    handleSort,
    handleSelectAll,
    handleSelectRow,
    handleSearch,
    handlePageChange,
    handleRowClick,
    
    // Rendering helpers
    renderCellContent,
    
    // Component props
    selectionType,
    columns,
    rowActions,
    loading,
    error
  };
  
  // Check if children is a function (render props pattern)
  if (typeof props.children === 'function') {
    return (
      <div className={tableClasses} {...restProps}>
        {props.children(dataTableContext)}
      </div>
    );
  }
  
  // Default rendering if not using render props
  return (
    <div className={tableClasses} {...restProps}>
      {/* Toolbar */}
      {toolbar && (extendedTitle || extendedSubtitle || searchable || actions.length > 0) && (
        <div className={DATA_TABLE_TOOLBAR_CLASS}>
          <div>
            {extendedTitle && <Text variant="h3">{extendedTitle}</Text>}
            {extendedSubtitle && <Text variant="body2">{extendedSubtitle}</Text>}
          </div>
          
          <Flex gap="md">
            {searchable && (
              <div className={DATA_TABLE_SEARCH_CLASS}>
                <SearchInput
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder={searchPlaceholder}
                />
              </div>
            )}
            
            {actions.length > 0 && (
              <div className={DATA_TABLE_ACTIONS_CLASS}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'secondary'}
                    size="small"
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.icon && <Icon name={action.icon} size="sm" />}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </Flex>
        </div>
      )}
      
      {/* Table */}
      <table className={tableClasses}>
        {/* Header */}
        <thead className={DATA_TABLE_HEADER_CLASS}>
          <tr>
            {/* Selection column */}
            {selectionType !== DATA_TABLE_SELECTION_TYPES.NONE && (
              <th className={DATA_TABLE_HEAD_CELL_CLASS}>
                {selectionType === DATA_TABLE_SELECTION_TYPES.MULTIPLE && (
                  <input
                    type="checkbox"
                    checked={selected.length > 0 && selected.length === displayedData.length}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                )}
              </th>
            )}
            
            {/* Column headers */}
            {columns.map((column) => (
              <th
                key={column.key}
                className={DATA_TABLE_HEAD_CELL_CLASS}
                onClick={() => sortable && column.sortable && handleSort(column)}
                data-sortable={sortable && column.sortable}
                data-sort-direction={sortColumn === column.key ? sortDirection : DATA_TABLE_SORT_DIRECTIONS.NONE}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  ...column.headerStyle
                }}
              >
                {column.header}
              </th>
            ))}
            
            {/* Row actions column */}
            {rowActions.length > 0 && (
              <th className={DATA_TABLE_HEAD_CELL_CLASS} style={{ width: '1%', whiteSpace: 'nowrap' }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        
        {/* Body */}
        <tbody className={DATA_TABLE_BODY_CLASS}>
          {displayedData.map((row) => (
            <tr
              key={row.id}
              className={DATA_TABLE_ROW_CLASS}
              onClick={() => handleRowClick(row)}
              data-selected={selected.includes(row.id)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {/* Selection cell */}
              {selectionType !== DATA_TABLE_SELECTION_TYPES.NONE && (
                <td className={DATA_TABLE_CELL_CLASS}>
                  <input
                    type={selectionType === DATA_TABLE_SELECTION_TYPES.MULTIPLE ? 'checkbox' : 'radio'}
                    checked={selected.includes(row.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectRow(row.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select row ${row.id}`}
                  />
                </td>
              )}
              
              {/* Data cells */}
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className={DATA_TABLE_CELL_CLASS}
                  style={column.cellStyle}
                >
                  {renderCellContent(column, row[column.key], row)}
                </td>
              ))}
              
              {/* Row actions cell */}
              {rowActions.length > 0 && (
                <td className={DATA_TABLE_CELL_CLASS}>
                  <Flex gap="sm">
                    {rowActions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || 'icon'}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                        aria-label={action.label}
                        title={action.label}
                      >
                        {action.icon && <Icon name={action.icon} size="sm" />}
                        {action.label && action.showLabel && action.label}
                      </Button>
                    ))}
                  </Flex>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Footer with pagination */}
      {footer && pagination && (
        <div className={DATA_TABLE_FOOTER_CLASS}>
          <div>
            <Text variant="caption">
              Showing {displayedData.length} of {totalItems || internalData.length} items
            </Text>
          </div>
          
          <div className={DATA_TABLE_PAGINATION_CLASS}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onChange={handlePageChange}
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  /** 
   * Optional children as a render prop function that receives the data table context 
   * and returns React elements
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  /** Array of column definitions */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** Unique key for the column */
    key: PropTypes.string.isRequired,
    /** Header text or component */
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** Cell type */
    type: PropTypes.oneOf(Object.values(DATA_TABLE_CELL_TYPES)),
    /** Whether the column is sortable */
    sortable: PropTypes.bool,
    /** Width of the column */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Minimum width of the column */
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Maximum width of the column */
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Custom render function for the cell */
    render: PropTypes.func,
    /** Format function for the cell value */
    format: PropTypes.func,
    /** Custom renderer for CUSTOM type cells */
    customRenderer: PropTypes.func,
    /** Actions for ACTION type cells */
    actions: PropTypes.arrayOf(PropTypes.shape({
      /** Action label */
      label: PropTypes.string.isRequired,
      /** Action icon */
      icon: PropTypes.string,
      /** Whether to show the label */
      showLabel: PropTypes.bool,
      /** Button variant */
      variant: PropTypes.string,
      /** Click handler */
      onClick: PropTypes.func.isRequired
    })),
    /** Custom style for the header cell */
    headerStyle: PropTypes.object,
    /** Custom style for the data cells */
    cellStyle: PropTypes.object
  })),
  /** Array of data objects */
  data: PropTypes.arrayOf(PropTypes.object),
  /** Table title */
  title: PropTypes.string,
  /** Table subtitle */
  subtitle: PropTypes.string,
  /** Whether the table is loading */
  loading: PropTypes.bool,
  /** Error object or message */
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Message to display when there is no data */
  emptyMessage: PropTypes.string,
  /** Message to display when data is loading */
  loadingMessage: PropTypes.string,
  /** Message to display when there is an error */
  errorMessage: PropTypes.string,
  /** Table variant */
  variant: PropTypes.oneOf(Object.values(DATA_TABLE_VARIANTS)),
  /** Table size */
  size: PropTypes.oneOf(Object.values(DATA_TABLE_SIZES)),
  /** Whether the table is sortable */
  sortable: PropTypes.bool,
  /** Default sort column */
  defaultSortColumn: PropTypes.string,
  /** Default sort direction */
  defaultSortDirection: PropTypes.oneOf(Object.values(DATA_TABLE_SORT_DIRECTIONS)),
  /** Selection type */
  selectionType: PropTypes.oneOf(Object.values(DATA_TABLE_SELECTION_TYPES)),
  /** Array of selected row IDs */
  selectedRows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** Function to handle selection change */
  onSelectionChange: PropTypes.func,
  /** Function to handle row click */
  onRowClick: PropTypes.func,
  /** Function to handle sort */
  onSort: PropTypes.func,
  /** Whether to show pagination */
  pagination: PropTypes.bool,
  /** Number of items per page */
  pageSize: PropTypes.number,
  /** Total number of items */
  totalItems: PropTypes.number,
  /** Current page */
  currentPage: PropTypes.number,
  /** Function to handle page change */
  onPageChange: PropTypes.func,
  /** Whether the table is searchable */
  searchable: PropTypes.bool,
  /** Placeholder text for the search input */
  searchPlaceholder: PropTypes.string,
  /** Search input value */
  searchValue: PropTypes.string,
  /** Function to handle search */
  onSearch: PropTypes.func,
  /** Array of table actions */
  actions: PropTypes.arrayOf(PropTypes.shape({
    /** Action label */
    label: PropTypes.string.isRequired,
    /** Action icon */
    icon: PropTypes.string,
    /** Button variant */
    variant: PropTypes.string,
    /** Whether the action is disabled */
    disabled: PropTypes.bool,
    /** Click handler */
    onClick: PropTypes.func.isRequired
  })),
  /** Array of row actions */
  rowActions: PropTypes.arrayOf(PropTypes.shape({
    /** Action label */
    label: PropTypes.string.isRequired,
    /** Action icon */
    icon: PropTypes.string,
    /** Whether to show the label */
    showLabel: PropTypes.bool,
    /** Button variant */
    variant: PropTypes.string,
    /** Click handler */
    onClick: PropTypes.func.isRequired
  })),
  /** Whether to show the toolbar */
  toolbar: PropTypes.bool,
  /** Whether to show the footer */
  footer: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the component */
  extensions: PropTypes.arrayOf(PropTypes.string)
};

export default DataTable;
