import React, { useState } from 'react';
import { Pagination, PAGINATION_VARIANTS, PAGINATION_SIZES, PAGINATION_SHAPES } from './index';
import { Box, Flex, Text, Button } from '../../atoms';

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'A pagination component for navigating through pages of content.',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current page number (1-based)',
      defaultValue: 1,
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
      defaultValue: 10,
    },
    siblingCount: {
      control: 'number',
      description: 'Number of siblings on each side of current page',
      defaultValue: 1,
    },
    boundaryCount: {
      control: 'number',
      description: 'Number of pages to show at the beginning and end',
      defaultValue: 1,
    },
    showFirstButton: {
      control: 'boolean',
      description: 'Whether to show the first page button',
      defaultValue: true,
    },
    showLastButton: {
      control: 'boolean',
      description: 'Whether to show the last page button',
      defaultValue: true,
    },
    showPrevButton: {
      control: 'boolean',
      description: 'Whether to show the previous page button',
      defaultValue: true,
    },
    showNextButton: {
      control: 'boolean',
      description: 'Whether to show the next page button',
      defaultValue: true,
    },
    variant: {
      control: 'select',
      options: Object.values(PAGINATION_VARIANTS),
      description: 'The visual style variant of the pagination',
      defaultValue: PAGINATION_VARIANTS.DEFAULT,
    },
    size: {
      control: 'select',
      options: Object.values(PAGINATION_SIZES),
      description: 'The size of the pagination',
      defaultValue: PAGINATION_SIZES.MEDIUM,
    },
    shape: {
      control: 'select',
      options: Object.values(PAGINATION_SHAPES),
      description: 'The shape of the pagination buttons',
      defaultValue: PAGINATION_SHAPES.ROUNDED,
    },
  },
};

// Basic Pagination Template
const Template = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`Page changed to ${page}`);
  };
  
  return (
    <Box p="lg">
      <Pagination 
        {...args} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      
      <Box mt="md" p="md" bg="background-muted" borderRadius="md">
        <Text>Current Page: {currentPage}</Text>
      </Box>
    </Box>
  );
};

// Basic Pagination Story
export const Basic = Template.bind({});
Basic.args = {
  currentPage: 1,
  totalPages: 10,
  siblingCount: 1,
  boundaryCount: 1,
  showFirstButton: true,
  showLastButton: true,
  showPrevButton: true,
  showNextButton: true,
  variant: PAGINATION_VARIANTS.DEFAULT,
  size: PAGINATION_SIZES.MEDIUM,
  shape: PAGINATION_SHAPES.ROUNDED,
};

// Different Variants Story
export const Variants = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Pagination Variants</Text>
      
      {Object.entries(PAGINATION_VARIANTS).map(([key, value]) => (
        <Box key={value} mb="xl">
          <Text fontWeight="medium" mb="md">{key.replace('_', ' ')}:</Text>
          <Pagination 
            currentPage={currentPage} 
            totalPages={10} 
            onPageChange={handlePageChange}
            variant={value}
          />
        </Box>
      ))}
    </Box>
  );
};

// Different Sizes Story
export const Sizes = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Pagination Sizes</Text>
      
      {Object.entries(PAGINATION_SIZES).map(([key, value]) => (
        <Box key={value} mb="xl">
          <Text fontWeight="medium" mb="md">{key.replace('_', ' ')}:</Text>
          <Pagination 
            currentPage={currentPage} 
            totalPages={10} 
            onPageChange={handlePageChange}
            size={value}
          />
        </Box>
      ))}
    </Box>
  );
};

// Different Shapes Story
export const Shapes = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Pagination Shapes</Text>
      
      {Object.entries(PAGINATION_SHAPES).map(([key, value]) => (
        <Box key={value} mb="xl">
          <Text fontWeight="medium" mb="md">{key.replace('_', ' ')}:</Text>
          <Pagination 
            currentPage={currentPage} 
            totalPages={10} 
            onPageChange={handlePageChange}
            shape={value}
          />
        </Box>
      ))}
    </Box>
  );
};

// Minimal Pagination Story
export const Minimal = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Minimal Pagination</Text>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={10} 
        onPageChange={handlePageChange}
        variant="minimal"
        showFirstButton={false}
        showLastButton={false}
      />
    </Box>
  );
};

// Compact Pagination Story
export const Compact = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Compact Pagination</Text>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={10} 
        onPageChange={handlePageChange}
        size="sm"
        siblingCount={0}
        boundaryCount={1}
      />
    </Box>
  );
};

// Many Pages Story
export const ManyPages = () => {
  const [currentPage, setCurrentPage] = useState(50);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Pagination with Many Pages</Text>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={100} 
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

// Controlled Pagination Story
export const Controlled = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <Box p="lg">
      <Text as="h3" mb="lg">Controlled Pagination</Text>
      
      <Flex gap="md" mb="lg">
        <Button 
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First Page
        </Button>
        <Button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Button 
          onClick={() => setCurrentPage(prev => Math.min(10, prev + 1))}
          disabled={currentPage === 10}
        >
          Next Page
        </Button>
        <Button 
          onClick={() => setCurrentPage(10)}
          disabled={currentPage === 10}
        >
          Last Page
        </Button>
      </Flex>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={10} 
        onPageChange={handlePageChange}
      />
      
      <Box mt="md" p="md" bg="background-muted" borderRadius="md">
        <Text>Current Page: {currentPage}</Text>
      </Box>
    </Box>
  );
};
