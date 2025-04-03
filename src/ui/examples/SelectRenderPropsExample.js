import React, { useState } from 'react';
import { Box, Text, Flex, Button, Icon, Badge, Input, Divider } from '../atoms';
import Card from '../molecules/Card';
import Select from '../molecules/Select';

/**
 * SelectRenderPropsExample
 * 
 * This example demonstrates how to use the Select component with render props
 * to create highly customized select interfaces.
 */
const SelectRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Selects with Render Props</Text>
      
      {/* Basic Custom Select */}
      <Text as="h3" marginBottom="md">Basic Custom Select</Text>
      <Box marginBottom="xl">
        <BasicCustomSelect />
      </Box>
      
      {/* Multi-column Select */}
      <Text as="h3" marginY="md">Multi-column Select</Text>
      <Box marginBottom="xl">
        <MultiColumnSelect />
      </Box>
      
      {/* Searchable Select */}
      <Text as="h3" marginY="md">Searchable Select</Text>
      <Box marginBottom="xl">
        <SearchableSelect />
      </Box>
    </Box>
  );
};

/**
 * BasicCustomSelect
 * 
 * Demonstrates a simple select component with custom styling using render props.
 */
const BasicCustomSelect = () => {
  const [value, setValue] = useState('option2');
  
  const options = [
    { value: 'option1', label: 'Option 1', description: 'The first option' },
    { value: 'option2', label: 'Option 2', description: 'The second option' },
    { value: 'option3', label: 'Option 3', description: 'The third option' },
    { value: 'option4', label: 'Option 4', description: 'The fourth option' },
    { value: 'option5', label: 'Option 5', description: 'The fifth option' },
  ];
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box maxWidth="400px">
      <Select
        label="Select with custom options"
        options={options}
        value={value}
        onChange={handleChange}
        variant="outlined"
      >
        {(selectState) => (
          <Box>
            {/* Custom Label */}
            {selectState.required ? (
              <Text as="label" fontSize="sm" fontWeight="bold" color="text.primary" mb="xs" display="block">
                Select an option <Text as="span" color="error.500">*</Text>
              </Text>
            ) : (
              <Text as="label" fontSize="sm" fontWeight="bold" color="text.primary" mb="xs" display="block">
                Select an option
              </Text>
            )}
            
            {/* Custom Select Container */}
            <Box
              onClick={selectState.toggle}
              border="1px solid"
              borderColor={selectState.isOpen ? "primary.500" : "border"}
              borderRadius="md"
              p="sm"
              backgroundColor="white"
              cursor="pointer"
              _hover={{ borderColor: "primary.400" }}
              boxShadow={selectState.isOpen ? "0 0 0 2px rgba(66, 153, 225, 0.3)" : "none"}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight={selectState.value ? "medium" : "normal"} color={selectState.value ? "text.primary" : "text.muted"}>
                  {selectState.selectedOption ? selectState.selectedOption.label : selectState.placeholder}
                </Text>
                <Icon name={selectState.isOpen ? "chevron-up" : "chevron-down"} size="sm" color="text.muted" />
              </Flex>
            </Box>
            
            {/* Custom Dropdown */}
            {selectState.isOpen && (
              <Box
                ref={selectState.dropdownRef}
                mt="xs"
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                backgroundColor="white"
                boxShadow="md"
                overflow="hidden"
                maxHeight="200px"
                overflowY="auto"
              >
                {selectState.options.map((option, index) => (
                  <Box
                    key={option.value}
                    p="sm"
                    cursor="pointer"
                    backgroundColor={
                      option.value === selectState.value
                        ? "primary.50"
                        : index === selectState.highlightedIndex
                        ? "gray.50"
                        : "white"
                    }
                    _hover={{ backgroundColor: "gray.50" }}
                    onClick={() => selectState.select(option)}
                  >
                    <Text fontWeight={option.value === selectState.value ? "medium" : "normal"}>
                      {option.label}
                    </Text>
                    <Text fontSize="xs" color="text.muted" mt="xxs">
                      {option.description}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Select>
    </Box>
  );
};

/**
 * MultiColumnSelect
 * 
 * Demonstrates a select component with multiple columns using render props.
 */
const MultiColumnSelect = () => {
  const [value, setValue] = useState('user-3');
  
  const users = [
    { value: 'user-1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { value: 'user-2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { value: 'user-3', name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer', status: 'Inactive' },
    { value: 'user-4', name: 'Emily Wilson', email: 'emily@example.com', role: 'Editor', status: 'Active' },
    { value: 'user-5', name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', status: 'Active' },
    { value: 'user-6', name: 'Sarah Davis', email: 'sarah@example.com', role: 'Viewer', status: 'Inactive' },
  ];
  
  // Transform users to the format expected by the Select component
  const options = users.map(user => ({
    value: user.value,
    label: user.name, // This is used as fallback for the default rendering
    user: user,       // We'll use this in our custom render
  }));
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  const getSelectedUserName = () => {
    const selectedUser = users.find(user => user.value === value);
    return selectedUser ? selectedUser.name : 'Select a user';
  };
  
  return (
    <Box maxWidth="600px">
      <Select
        label="Assign user"
        options={options}
        value={value}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        {(selectState) => (
          <Box>
            {/* Custom Label */}
            <Text as="label" fontSize="sm" fontWeight="bold" color="text.primary" mb="xs" display="block">
              Assign user
            </Text>
            
            {/* Custom Select Button */}
            <Box
              onClick={selectState.toggle}
              border="1px solid"
              borderColor={selectState.isOpen ? "primary.500" : "border"}
              borderRadius="md"
              p="sm"
              backgroundColor="white"
              cursor="pointer"
              _hover={{ borderColor: "primary.400" }}
              transition="all 0.2s"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="medium">
                  {getSelectedUserName()}
                </Text>
                <Icon name={selectState.isOpen ? "chevron-up" : "chevron-down"} />
              </Flex>
            </Box>
            
            {/* Custom Dropdown with Multi-Column Layout */}
            {selectState.isOpen && (
              <Card
                ref={selectState.dropdownRef}
                mt="xs"
                boxShadow="md"
                overflow="hidden"
                p="0"
              >
                {/* Table Header */}
                <Flex 
                  borderBottom="1px solid" 
                  borderColor="border" 
                  backgroundColor="background.alt"
                  p="sm"
                  fontWeight="medium"
                >
                  <Box width="30%" px="sm">Name</Box>
                  <Box width="40%" px="sm">Email</Box>
                  <Box width="15%" px="sm">Role</Box>
                  <Box width="15%" px="sm">Status</Box>
                </Flex>
                
                {/* Table Rows */}
                <Box maxHeight="300px" overflowY="auto">
                  {selectState.options.map((option, index) => {
                    const user = option.user;
                    const isSelected = option.value === selectState.value;
                    const isHighlighted = index === selectState.highlightedIndex;
                    
                    return (
                      <Flex
                        key={option.value}
                        p="sm"
                        cursor="pointer"
                        backgroundColor={
                          isSelected
                            ? "primary.50"
                            : isHighlighted
                            ? "gray.50"
                            : "white"
                        }
                        borderLeft={isSelected ? "3px solid" : "3px solid transparent"}
                        borderLeftColor="primary.500"
                        _hover={{ backgroundColor: isSelected ? "primary.50" : "gray.50" }}
                        onClick={() => selectState.select(option)}
                        alignItems="center"
                      >
                        <Box width="30%" px="sm" fontWeight={isSelected ? "bold" : "normal"}>
                          {user.name}
                        </Box>
                        <Box width="40%" px="sm" color="text.muted" fontSize="sm">
                          {user.email}
                        </Box>
                        <Box width="15%" px="sm">
                          <Badge 
                            variant="subtle" 
                            colorScheme={user.role === 'Admin' ? 'purple' : user.role === 'Editor' ? 'blue' : 'gray'}
                          >
                            {user.role}
                          </Badge>
                        </Box>
                        <Box width="15%" px="sm">
                          <Badge 
                            variant="subtle" 
                            colorScheme={user.status === 'Active' ? 'green' : 'gray'}
                          >
                            {user.status}
                          </Badge>
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
              </Card>
            )}
          </Box>
        )}
      </Select>
    </Box>
  );
};

/**
 * SearchableSelect
 * 
 * Demonstrates a select component with search functionality using render props.
 */
const SearchableSelect = () => {
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // A larger list of options to demonstrate search functionality
  const allOptions = [
    { value: 'us', label: 'United States', group: 'North America' },
    { value: 'ca', label: 'Canada', group: 'North America' },
    { value: 'mx', label: 'Mexico', group: 'North America' },
    { value: 'br', label: 'Brazil', group: 'South America' },
    { value: 'ar', label: 'Argentina', group: 'South America' },
    { value: 'cl', label: 'Chile', group: 'South America' },
    { value: 'co', label: 'Colombia', group: 'South America' },
    { value: 'pe', label: 'Peru', group: 'South America' },
    { value: 'fr', label: 'France', group: 'Europe' },
    { value: 'de', label: 'Germany', group: 'Europe' },
    { value: 'it', label: 'Italy', group: 'Europe' },
    { value: 'es', label: 'Spain', group: 'Europe' },
    { value: 'uk', label: 'United Kingdom', group: 'Europe' },
    { value: 'ru', label: 'Russia', group: 'Europe' },
    { value: 'jp', label: 'Japan', group: 'Asia' },
    { value: 'cn', label: 'China', group: 'Asia' },
    { value: 'in', label: 'India', group: 'Asia' },
    { value: 'kr', label: 'South Korea', group: 'Asia' },
    { value: 'au', label: 'Australia', group: 'Oceania' },
    { value: 'nz', label: 'New Zealand', group: 'Oceania' },
    { value: 'za', label: 'South Africa', group: 'Africa' },
    { value: 'eg', label: 'Egypt', group: 'Africa' },
    { value: 'ng', label: 'Nigeria', group: 'Africa' },
  ];
  
  // Filter options based on search term
  const filteredOptions = searchTerm 
    ? allOptions.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.group.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allOptions;
  
  // Group options by continent
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = acc.find(g => g.name === option.group);
    if (group) {
      group.options.push(option);
    } else {
      acc.push({
        name: option.group,
        options: [option]
      });
    }
    return acc;
  }, []);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    setSearchTerm(''); // Clear search when an option is selected
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const getSelectedCountryName = () => {
    const selectedOption = allOptions.find(option => option.value === value);
    return selectedOption ? selectedOption.label : 'Select a country';
  };
  
  return (
    <Box maxWidth="400px">
      <Select
        label="Select Country"
        options={filteredOptions}
        value={value}
        onChange={handleChange}
        placeholder="Search and select a country"
      >
        {(selectState) => (
          <Box>
            {/* Custom Label */}
            <Text as="label" fontSize="sm" fontWeight="bold" color="text.primary" mb="xs" display="block">
              Select Country
            </Text>
            
            {/* Custom Select Container */}
            <Box
              border="1px solid"
              borderColor={selectState.isOpen ? "primary.500" : "border"}
              borderRadius="md"
              backgroundColor="white"
              cursor="pointer"
              _hover={{ borderColor: "primary.400" }}
              boxShadow={selectState.isOpen ? "0 0 0 2px rgba(66, 153, 225, 0.3)" : "none"}
              transition="all 0.2s"
            >
              <Flex 
                justifyContent="space-between" 
                alignItems="center"
                onClick={selectState.toggle}
                p="sm"
              >
                <Text fontWeight="medium" color={value ? "text.primary" : "text.muted"}>
                  {value ? getSelectedCountryName() : "Select a country"}
                </Text>
                <Icon name={selectState.isOpen ? "chevron-up" : "chevron-down"} size="sm" color="text.muted" />
              </Flex>
              
              {/* Search input shown only when dropdown is open */}
              {selectState.isOpen && (
                <Box p="xs" borderTop="1px solid" borderColor="border">
                  <Flex alignItems="center" backgroundColor="background.alt" borderRadius="md" px="sm">
                    <Icon name="search" size="sm" color="text.muted" mr="xs" />
                    <Input
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search countries..."
                      border="none"
                      _focus={{ boxShadow: "none" }}
                      onClick={(e) => e.stopPropagation()}
                      size="sm"
                    />
                    {searchTerm && (
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchTerm('');
                        }}
                        p="0"
                        minWidth="auto"
                      >
                        <Icon name="x" size="xs" />
                      </Button>
                    )}
                  </Flex>
                </Box>
              )}
            </Box>
            
            {/* Custom Dropdown with Grouped Options */}
            {selectState.isOpen && (
              <Box
                ref={selectState.dropdownRef}
                mt="xs"
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                backgroundColor="white"
                boxShadow="md"
                maxHeight="300px"
                overflowY="auto"
              >
                {filteredOptions.length === 0 ? (
                  <Box p="md" textAlign="center" color="text.muted">
                    No countries found
                  </Box>
                ) : (
                  groupedOptions.map(group => (
                    <Box key={group.name}>
                      <Box
                        backgroundColor="background.alt"
                        p="xs"
                        fontWeight="bold"
                        fontSize="xs"
                        color="text.muted"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        {group.name}
                      </Box>
                      {group.options.map(option => {
                        const isSelected = option.value === selectState.value;
                        
                        return (
                          <Box
                            key={option.value}
                            p="sm"
                            cursor="pointer"
                            backgroundColor={isSelected ? "primary.50" : "white"}
                            _hover={{ backgroundColor: isSelected ? "primary.50" : "gray.50" }}
                            onClick={() => selectState.select(option)}
                          >
                            <Flex alignItems="center" justifyContent="space-between">
                              <Text fontWeight={isSelected ? "bold" : "normal"}>
                                {option.label}
                              </Text>
                              {isSelected && (
                                <Icon name="check" color="primary.500" />
                              )}
                            </Flex>
                          </Box>
                        );
                      })}
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>
        )}
      </Select>
    </Box>
  );
};

export default SelectRenderPropsExample;
