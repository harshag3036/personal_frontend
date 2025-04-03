import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Icon, Input, Avatar, Divider } from '../atoms';
import Card from '../molecules/Card';
import Pagination from '../molecules/Pagination';

/**
 * PaginationRenderPropsExample
 * 
 * This example demonstrates how to use the Pagination component with render props
 * to create highly customized pagination interfaces.
 */
const PaginationRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Pagination with Render Props</Text>
      
      {/* Basic Custom Pagination */}
      <Text as="h3" marginBottom="md">Basic Custom Pagination</Text>
      <Box marginBottom="xl">
        <BasicCustomPagination />
      </Box>
      
      {/* Button Group Pagination */}
      <Text as="h3" marginY="md">Button Group Pagination</Text>
      <Box marginBottom="xl">
        <ButtonGroupPagination />
      </Box>
      
      {/* Table Pagination with Records Per Page */}
      <Text as="h3" marginY="md">Table Pagination with Records Per Page</Text>
      <Box marginBottom="xl">
        <TablePaginationExample />
      </Box>
    </Box>
  );
};

/**
 * BasicCustomPagination
 * 
 * Demonstrates a simple pagination component with custom styling using render props.
 */
const BasicCustomPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  return (
    <Box>
      <Text mb="md">Page {currentPage} of {totalPages}</Text>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        siblingCount={1}
        boundaryCount={1}
      >
        {(paginationState) => (
          <Flex alignItems="center">
            {/* Custom First Page Button */}
            <Button
              variant="ghost"
              colorScheme="primary"
              size="sm"
              onClick={paginationState.goToFirstPage}
              disabled={paginationState.isFirstPage}
              mr="xs"
            >
              <Icon name="chevrons-left" mr="xs" />
              First
            </Button>
            
            {/* Custom Previous Button */}
            <Button
              variant="outline"
              colorScheme="primary"
              size="sm"
              onClick={paginationState.goToPrevPage}
              disabled={paginationState.isFirstPage}
              mr="sm"
            >
              <Icon name="chevron-left" mr="xs" />
              Previous
            </Button>
            
            {/* Custom Page Buttons */}
            <Flex alignItems="center" mx="sm">
              {paginationState.range.map((page) => {
                // For ellipsis
                if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                  return (
                    <Text key={page} mx="xs">
                      ...
                    </Text>
                  );
                }
                
                // For page numbers
                return (
                  <Button
                    key={page}
                    variant={page === paginationState.currentPage ? 'solid' : 'ghost'}
                    colorScheme="primary"
                    size="sm"
                    onClick={() => paginationState.goToPage(page)}
                    mx="xs"
                    minW="32px"
                    height="32px"
                    borderRadius="full"
                  >
                    {page}
                  </Button>
                );
              })}
            </Flex>
            
            {/* Custom Next Button */}
            <Button
              variant="outline"
              colorScheme="primary"
              size="sm"
              onClick={paginationState.goToNextPage}
              disabled={paginationState.isLastPage}
              ml="sm"
            >
              Next
              <Icon name="chevron-right" ml="xs" />
            </Button>
            
            {/* Custom Last Page Button */}
            <Button
              variant="ghost"
              colorScheme="primary"
              size="sm"
              onClick={paginationState.goToLastPage}
              disabled={paginationState.isLastPage}
              ml="xs"
            >
              Last
              <Icon name="chevrons-right" ml="xs" />
            </Button>
          </Flex>
        )}
      </Pagination>
    </Box>
  );
};

/**
 * ButtonGroupPagination
 * 
 * Demonstrates a pagination component with a button group style using render props.
 */
const ButtonGroupPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15;
  
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="md">
        <Text>Showing page {currentPage} of {totalPages}</Text>
        
        <Flex alignItems="center">
          <Text mr="sm">Jump to:</Text>
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 1 && value <= totalPages) {
                setCurrentPage(value);
              }
            }}
            width="60px"
            size="sm"
          />
        </Flex>
      </Flex>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        siblingCount={1}
        boundaryCount={1}
        shape="pill"
      >
        {(paginationState) => (
          <Flex
            backgroundColor="background.alt"
            p="sm"
            borderRadius="lg"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={paginationState.goToFirstPage}
              disabled={paginationState.isFirstPage}
              aria-label="First page"
              p="0"
              width="30px"
              height="30px"
              borderRadius="full"
              mr="sm"
            >
              <Icon name="chevrons-left" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={paginationState.goToPrevPage}
              disabled={paginationState.isFirstPage}
              aria-label="Previous page"
              p="0"
              width="30px"
              height="30px"
              borderRadius="full"
              mr="md"
            >
              <Icon name="chevron-left" />
            </Button>
            
            <Flex 
              borderRadius="full" 
              overflow="hidden" 
              border="1px solid" 
              borderColor="border"
            >
              {paginationState.range.map((page) => {
                if (typeof page === 'string' && page.startsWith('ellipsis')) {
                  return (
                    <Flex
                      key={page}
                      alignItems="center"
                      justifyContent="center"
                      height="30px"
                      width="30px"
                    >
                      <Text fontSize="xs">...</Text>
                    </Flex>
                  );
                }
                
                return (
                  <Button
                    key={page}
                    variant={page === paginationState.currentPage ? 'solid' : 'ghost'}
                    colorScheme={page === paginationState.currentPage ? 'primary' : 'gray'}
                    size="sm"
                    onClick={() => paginationState.goToPage(page)}
                    borderRadius="0"
                    height="30px"
                    minW="30px"
                  >
                    {page}
                  </Button>
                );
              })}
            </Flex>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={paginationState.goToNextPage}
              disabled={paginationState.isLastPage}
              aria-label="Next page"
              p="0"
              width="30px"
              height="30px"
              borderRadius="full"
              ml="md"
            >
              <Icon name="chevron-right" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={paginationState.goToLastPage}
              disabled={paginationState.isLastPage}
              aria-label="Last page"
              p="0"
              width="30px"
              height="30px"
              borderRadius="full"
              ml="sm"
            >
              <Icon name="chevrons-right" />
            </Button>
          </Flex>
        )}
      </Pagination>
    </Box>
  );
};

/**
 * TablePaginationExample
 * 
 * Demonstrates a table with pagination controls and records per page selector using render props.
 */
const TablePaginationExample = () => {
  // Sample data for the table
  const allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Emily Wilson', email: 'emily@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', status: 'Active' },
    { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', role: 'Viewer', status: 'Active' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Editor', status: 'Inactive' },
    { id: 8, name: 'Lisa Wilson', email: 'lisa@example.com', role: 'Viewer', status: 'Active' },
    { id: 9, name: 'Mark Thompson', email: 'mark@example.com', role: 'Admin', status: 'Active' },
    { id: 10, name: 'Amy Johnson', email: 'amy@example.com', role: 'Editor', status: 'Inactive' },
    { id: 11, name: 'Chris Davis', email: 'chris@example.com', role: 'Viewer', status: 'Active' },
    { id: 12, name: 'Kate Wilson', email: 'kate@example.com', role: 'Editor', status: 'Active' },
  ];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  
  // Calculate total pages
  const totalPages = Math.ceil(allUsers.length / recordsPerPage);
  
  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allUsers.slice(indexOfFirstRecord, indexOfLastRecord);
  
  // Handle records per page change
  const handleRecordsPerPageChange = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing records per page
  };
  
  return (
    <Box>
      <Card mb="lg">
        <Box overflowX="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--colors-background-alt)' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--colors-border)' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--colors-border)' }}>Email</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--colors-border)' }}>Role</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--colors-border)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--colors-border)' }}>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>{user.role}</td>
                  <td style={{ padding: '10px' }}>
                    <Box 
                      as="span" 
                      px="xs" 
                      py="xxs" 
                      backgroundColor={user.status === 'Active' ? 'success.100' : 'gray.100'} 
                      color={user.status === 'Active' ? 'success.600' : 'gray.600'}
                      borderRadius="sm"
                      fontSize="xs"
                    >
                      {user.status}
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        
        <Divider my="md" />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={1}
          boundaryCount={1}
          variant="minimal"
        >
          {(paginationState) => (
            <Flex justifyContent="space-between" alignItems="center" p="sm">
              <Flex alignItems="center">
                <Text fontSize="sm" color="text.muted" mr="sm">Records per page:</Text>
                <Flex>
                  {[5, 10, 15].map((value) => (
                    <Button
                      key={value}
                      variant={recordsPerPage === value ? 'solid' : 'ghost'}
                      colorScheme={recordsPerPage === value ? 'primary' : 'gray'}
                      size="sm"
                      minW="30px"
                      height="26px"
                      p="0"
                      mr="xxs"
                      onClick={() => handleRecordsPerPageChange(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </Flex>
              </Flex>
              
              <Flex alignItems="center">
                <Text fontSize="sm" color="text.muted" mr="md">
                  Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, allUsers.length)} of {allUsers.length} records
                </Text>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={paginationState.goToPrevPage}
                  disabled={paginationState.isFirstPage}
                  aria-label="Previous page"
                  p="0"
                  width="26px"
                  height="26px"
                  mr="xxs"
                >
                  <Icon name="chevron-left" size="sm" />
                </Button>
                
                <Text fontSize="sm" mx="xs">
                  Page {paginationState.currentPage} of {paginationState.totalPages}
                </Text>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={paginationState.goToNextPage}
                  disabled={paginationState.isLastPage}
                  aria-label="Next page"
                  p="0"
                  width="26px"
                  height="26px"
                  ml="xxs"
                >
                  <Icon name="chevron-right" size="sm" />
                </Button>
              </Flex>
            </Flex>
          )}
        </Pagination>
      </Card>
    </Box>
  );
};

export default PaginationRenderPropsExample;
