import React, { useState, useEffect } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Stack from '../atoms/Stack';
import Divider from '../atoms/Divider';
import Icon from '../atoms/Icon';
import SearchInput from '../molecules/SearchInput/SearchInput';
import { SEARCH_INPUT_VARIANTS, SEARCH_INPUT_SIZES } from '../molecules/SearchInput/constants';

/**
 * CustomSearchResults component 
 */
const CustomSearchResults = ({ searchResults }) => {
  return (
    <Box 
      mt={2} 
      maxH="300px" 
      overflowY="auto" 
      borderTop="1px solid" 
      borderColor="gray.200"
      pt={2}
    >
      {searchResults.map(result => (
        <Box 
          key={result.id} 
          p={3} 
          _hover={{ bg: 'blue.50' }}
          cursor="pointer"
          transition="background 0.2s"
          borderRadius="md"
        >
          <Flex alignItems="center">
            <Box 
              width="36px" 
              height="36px" 
              borderRadius="md" 
              bg={
                result.category === 'Programming' ? 'blue.100' : 
                result.category === 'Design' ? 'purple.100' : 
                'green.100'
              }
              color={
                result.category === 'Programming' ? 'blue.700' : 
                result.category === 'Design' ? 'purple.700' : 
                'green.700'
              }
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={3}
            >
              <Icon 
                name={
                  result.category === 'Programming' ? 'code' : 
                  result.category === 'Design' ? 'brush' : 
                  'database'
                } 
              />
            </Box>
            <Box>
              <Text fontWeight="medium">{result.name}</Text>
              <Text fontSize="sm" color="gray.600">{result.category}</Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

/**
 * VoiceSearchInput component - extracted to fix React Hook rules violation
 */
const VoiceSearchInput = ({ onChange, isLoading, searchResults }) => {
  const [isListening, setIsListening] = useState(false);
  
  const startVoiceSearch = () => {
    setIsListening(true);
    
    // Simulate voice recognition with a delayed result
    setTimeout(() => {
      const mockVoiceResult = "responsive web design";
      onChange(mockVoiceResult);
      setIsListening(false);
    }, 2000);
  };
  
  return (
    <SearchInput
      onChange={onChange}
      isLoading={isLoading}
    >
      {(searchState) => (
        <Box position="relative" width="100%">
          <Flex 
            alignItems="center" 
            bg={searchState.isFocused ? 'white' : 'gray.100'} 
            px={4} 
            py={3} 
            borderRadius="full"
            boxShadow={searchState.isFocused ? 'md' : 'none'}
            transition="all 0.2s"
            border="1px solid"
            borderColor={searchState.isFocused ? 'blue.300' : 'gray.200'}
          >
            <Icon name="search" color="gray.500" />
            
            <input
              ref={searchState.inputRef}
              type="text"
              placeholder="Search or say something..."
              value={searchState.value}
              onChange={searchState.handleChange}
              onFocus={searchState.handleFocus}
              onBlur={searchState.handleBlur}
              style={{
                width: '100%',
                marginLeft: '12px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
              }}
            />
            
            {searchState.value && !searchState.isLoading && !isListening && (
              <Box 
                cursor="pointer" 
                onClick={searchState.handleClear}
                ml={2}
              >
                <Icon name="close" color="gray.500" />
              </Box>
            )}
            
            {searchState.isLoading && (
              <Box animation="spin 1s linear infinite" ml={2}>
                <Icon name="spinner" color="blue.500" />
              </Box>
            )}
            
            <Divider orientation="vertical" height="24px" mx={3} />
            
            <Box 
              cursor="pointer"
              onClick={startVoiceSearch}
              p={2}
              borderRadius="full"
              bg={isListening ? 'red.100' : 'transparent'}
              color={isListening ? 'red.500' : 'gray.500'}
              _hover={{ bg: isListening ? 'red.200' : 'gray.200' }}
              animation={isListening ? 'pulse 1s infinite' : 'none'}
            >
              <Icon name="microphone" />
            </Box>
          </Flex>
          
          {/* Voice listening indicator */}
          {isListening && (
            <Box 
              position="absolute" 
              top="100%" 
              left={0} 
              right={0} 
              mt={2}
              p={3}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
            >
              <Flex alignItems="center" justifyContent="center">
                <Box 
                  width="12px" 
                  height="12px" 
                  borderRadius="full" 
                  bg="red.500" 
                  mr={2}
                  animation="pulse 1s infinite"
                />
                <Text>Listening...</Text>
              </Flex>
            </Box>
          )}
          
          {/* Search results dropdown */}
          {searchResults.length > 0 && searchState.value && !isListening && (
            <Box 
              position="absolute" 
              top="100%" 
              left={0} 
              right={0} 
              mt={2}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              maxH="300px"
              overflowY="auto"
              zIndex={10}
            >
              {searchResults.map(result => (
                <Box 
                  key={result.id} 
                  p={3} 
                  _hover={{ bg: 'gray.50' }}
                  cursor="pointer"
                >
                  <Text fontWeight="medium">{result.name}</Text>
                  <Text fontSize="sm" color="gray.600">{result.category}</Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </SearchInput>
  );
};

/**
 * CategoryFilterSearch component - extracted to fix React Hook rules violation
 */
const CategoryFilterSearch = ({ onChange, isLoading, searchResults }) => {
  const categories = ['All', 'Programming', 'Design', 'API'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter results by category
  const filteredResults = searchResults.filter(result => 
    selectedCategory === 'All' || result.category === selectedCategory
  );
  
  return (
    <SearchInput
      onChange={onChange}
      isLoading={isLoading}
    >
      {(searchState) => (
        <Box width="100%">
          {/* Category tabs */}
          <Flex mb={3} borderBottom="1px solid" borderColor="gray.200">
            {categories.map(category => (
              <Box 
                key={category}
                px={4}
                py={2}
                cursor="pointer"
                fontWeight={selectedCategory === category ? 'bold' : 'normal'}
                color={selectedCategory === category ? 'blue.600' : 'gray.600'}
                borderBottom="2px solid"
                borderColor={selectedCategory === category ? 'blue.500' : 'transparent'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Box>
            ))}
          </Flex>
          
          {/* Search input */}
          <Flex 
            alignItems="center" 
            bg="white" 
            border="1px solid" 
            borderColor="gray.300" 
            borderRadius="md"
            p={2}
            mb={3}
          >
            <Box color="gray.500" mx={2}>
              <Icon name="search" />
            </Box>
            
            <input
              ref={searchState.inputRef}
              type="text"
              placeholder={`Search in ${selectedCategory.toLowerCase()}...`}
              value={searchState.value}
              onChange={searchState.handleChange}
              onFocus={searchState.handleFocus}
              onBlur={searchState.handleBlur}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                padding: '8px 0',
              }}
            />
            
            {searchState.isLoading && (
              <Box mx={2} animation="spin 1s linear infinite">
                <Icon name="spinner" />
              </Box>
            )}
            
            {searchState.value && !searchState.isLoading && (
              <Box 
                mx={2} 
                cursor="pointer" 
                onClick={searchState.handleClear}
              >
                <Icon name="close" />
              </Box>
            )}
          </Flex>
          
          {/* Results summary */}
          {searchState.value && (
            <Text fontSize="sm" mb={2}>
              Found {filteredResults.length} results in {selectedCategory}
              {selectedCategory !== 'All' && (
                <Text 
                  as="span" 
                  color="blue.500" 
                  ml={1} 
                  cursor="pointer"
                  onClick={() => setSelectedCategory('All')}
                >
                  (Show all)
                </Text>
              )}
            </Text>
          )}
          
          {/* Search results */}
          {filteredResults.length > 0 ? (
            <Stack spacing={3} bg="gray.50" p={3} borderRadius="md">
              {filteredResults.map(result => (
                <Flex 
                  key={result.id} 
                  p={3} 
                  borderRadius="md" 
                  bg="white" 
                  boxShadow="sm"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text fontWeight="medium">{result.name}</Text>
                    <Flex alignItems="center" mt={1}>
                      <Box 
                        px={2} 
                        py={1} 
                        borderRadius="full" 
                        bg={
                          result.category === 'Programming' ? 'blue.100' : 
                          result.category === 'Design' ? 'purple.100' : 
                          'green.100'
                        }
                        fontSize="xs"
                        color={
                          result.category === 'Programming' ? 'blue.700' : 
                          result.category === 'Design' ? 'purple.700' : 
                          'green.700'
                        }
                      >
                        {result.category}
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Box>
                    <Icon name="chevron-right" />
                  </Box>
                </Flex>
              ))}
            </Stack>
          ) : (
            searchState.value && (
              <Box p={4} textAlign="center" bg="gray.50" borderRadius="md">
                <Text color="gray.600">No results found for "{searchState.value}" in {selectedCategory}</Text>
              </Box>
            )
          )}
        </Box>
      )}
    </SearchInput>
  );
};

/**
 * SearchInputRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the SearchInput component.
 */
const SearchInputRenderPropsExample = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Mock search results
  const mockSearch = async (query) => {
    setIsSearching(true);
    
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = [
          { id: 1, name: 'React Fundamentals', category: 'Programming' },
          { id: 2, name: 'Advanced JavaScript', category: 'Programming' },
          { id: 3, name: 'UI Design Principles', category: 'Design' },
          { id: 4, name: 'Responsive Web Design', category: 'Design' },
          { id: 5, name: 'Node.js Basics', category: 'Programming' },
          { id: 6, name: 'GraphQL API Design', category: 'API' },
          { id: 7, name: 'TypeScript Fundamentals', category: 'Programming' },
          { id: 8, name: 'CSS Grid Layout', category: 'Design' },
        ].filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        resolve(results);
        setIsSearching(false);
      }, 500);
    });
  };
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      mockSearch(searchQuery).then(setSearchResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  return (
    <Stack spacing="xl" p={4}>
      <Box mb={4}>
        <Text variant="h2">SearchInput with Render Props</Text>
        <Text mb={4}>The SearchInput component supports render props for complete UI customization</Text>
      </Box>
      
      {/* Standard SearchInput Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Standard SearchInput (without render props)</Text>
        <SearchInput
          placeholder="Search courses..."
          onChange={setSearchQuery}
          clearable
          isLoading={isSearching}
        />
        
        {searchResults.length > 0 && (
          <Box mt={2}>
            <Text fontWeight="bold" mb={2}>Search Results ({searchResults.length})</Text>
            <Stack spacing={2}>
              {searchResults.map(result => (
                <Box key={result.id} p={2} borderRadius="md" bg="gray.100">
                  <Text fontWeight="medium">{result.name}</Text>
                  <Text fontSize="sm" color="gray.600">{result.category}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      
      <Divider my={4} />
      
      {/* Custom Styled SearchInput */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Custom Styled SearchInput with Render Props</Text>
        <SearchInput
          onChange={setSearchQuery}
          isLoading={isSearching}
          debounceTime={300}
        >
          {(searchState) => (
            <Box
              bg="white"
              boxShadow="md"
              borderRadius="xl"
              p={2}
              width="100%"
            >
              <Flex alignItems="center">
                <Box color="blue.500" mx={2}>
                  <Icon name="search" size="lg" />
                </Box>
                
                <input
                  ref={searchState.inputRef}
                  type="text"
                  placeholder="Search for courses, topics, or categories..."
                  value={searchState.value}
                  onChange={searchState.handleChange}
                  onFocus={searchState.handleFocus}
                  onBlur={searchState.handleBlur}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    padding: '10px 0',
                  }}
                />
                
                {searchState.isLoading && (
                  <Box mx={2} color="blue.500" animation="spin 1s linear infinite">
                    <Icon name="spinner" />
                  </Box>
                )}
                
                {searchState.value && !searchState.isLoading && (
                  <Box 
                    mx={2} 
                    cursor="pointer"
                    onClick={searchState.handleClear}
                    p={1}
                    borderRadius="full"
                    _hover={{ bg: 'blue.50' }}
                    color="blue.500"
                  >
                    <Icon name="close" />
                  </Box>
                )}
              </Flex>
              
              {searchResults.length > 0 && searchState.isFocused && (
                <CustomSearchResults searchResults={searchResults} />
              )}
            </Box>
          )}
        </SearchInput>
      </Box>
      
      <Divider my={4} />
      
      {/* Voice Search Input Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Voice Search Input with Render Props</Text>
        <VoiceSearchInput 
          onChange={setSearchQuery}
          isLoading={isSearching}
          searchResults={searchResults}
        />
      </Box>
      
      <Divider my={4} />
      
      {/* Category Filter Search */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Category Filter Search with Render Props</Text>
        <CategoryFilterSearch 
          onChange={setSearchQuery}
          isLoading={isSearching}
          searchResults={searchResults}
        />
      </Box>
    </Stack>
  );
};

export default SearchInputRenderPropsExample;
