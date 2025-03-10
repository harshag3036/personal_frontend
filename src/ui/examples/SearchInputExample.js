import React, { useState } from 'react';
import SearchInput from '../molecules/SearchInput';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Stack from '../atoms/Stack';
import { SEARCH_INPUT_VARIANTS } from '../molecules/SearchInput/constants';

/**
 * SearchInputExample Component
 * 
 * Demonstrates the usage of the SearchInput component with various configurations.
 */
const SearchInputExample = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Simulates a search operation with a delay
  const handleSearch = (value) => {
    setSearchValue(value);
    
    if (!value) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const mockResults = [
        `Result 1 for "${value}"`,
        `Result 2 for "${value}"`,
        `Result 3 for "${value}"`,
        `Result 4 for "${value}"`,
      ];
      
      setResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  // Handle clear
  const handleClear = () => {
    setResults([]);
  };

  return (
    <Stack spacing="lg">
      <Box mb="md">
        <Text variant="h2">SearchInput Examples</Text>
        <Text>A versatile search input component with various configurations.</Text>
      </Box>
      
      {/* Basic example */}
      <Box mb="lg">
        <Text variant="h3" mb="sm">Basic Search</Text>
        <SearchInput 
          placeholder="Search anything..."
          onChange={handleSearch}
          onClear={handleClear}
          isLoading={isLoading}
          clearable
        />
        
        {/* Display results */}
        {results.length > 0 && (
          <Box mt="md" p="md" border="1px solid" borderColor="border-subtle" borderRadius="md">
            <Text mb="sm">Results for: <strong>{searchValue}</strong></Text>
            <Stack spacing="sm">
              {results.map((result, index) => (
                <Box key={index} p="sm" bg="background-subtle" borderRadius="sm">
                  {result}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      
      {/* Variants */}
      <Box mb="lg">
        <Text variant="h3" mb="sm">Search Input Variants</Text>
        <Stack spacing="md">
          <Box>
            <Text mb="xs">Default</Text>
            <SearchInput 
              variant={SEARCH_INPUT_VARIANTS.DEFAULT}
              placeholder="Default variant..."
            />
          </Box>
          
          <Box>
            <Text mb="xs">Filled</Text>
            <SearchInput 
              variant={SEARCH_INPUT_VARIANTS.FILLED}
              placeholder="Filled variant..."
            />
          </Box>
          
          <Box>
            <Text mb="xs">Outlined</Text>
            <SearchInput 
              variant={SEARCH_INPUT_VARIANTS.OUTLINED}
              placeholder="Outlined variant..."
            />
          </Box>
          
          <Box>
            <Text mb="xs">Minimal</Text>
            <SearchInput 
              variant={SEARCH_INPUT_VARIANTS.MINIMAL}
              placeholder="Minimal variant..."
            />
          </Box>
        </Stack>
      </Box>
      
      {/* States */}
      <Box mb="lg">
        <Text variant="h3" mb="sm">Search Input States</Text>
        <Stack spacing="md">
          <Box>
            <Text mb="xs">With initial value</Text>
            <SearchInput 
              value="Initial search term"
              clearable
            />
          </Box>
          
          <Box>
            <Text mb="xs">Disabled</Text>
            <SearchInput 
              placeholder="Disabled search input..."
              disabled
            />
          </Box>
          
          <Box>
            <Text mb="xs">Loading</Text>
            <SearchInput 
              placeholder="Loading results..."
              isLoading
            />
          </Box>
        </Stack>
      </Box>
      
      {/* Custom debounce */}
      <Box>
        <Text variant="h3" mb="sm">Custom Debounce Time</Text>
        <SearchInput 
          placeholder="Type to search (2 second debounce)..."
          debounceTime={2000}
          onChange={(value) => console.log('Search after 2 seconds:', value)}
        />
        <Text variant="caption" mt="xs">
          This input has a 2-second debounce time. The onChange event will only fire 2 seconds after you stop typing.
        </Text>
      </Box>
    </Stack>
  );
};

export default SearchInputExample;
