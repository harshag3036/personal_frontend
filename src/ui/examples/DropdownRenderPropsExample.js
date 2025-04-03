import React, { useState } from 'react';
import { Box, Button, Text, Flex, Icon, Input, Avatar, Badge } from '../atoms';
import Card from '../molecules/Card';
import Dropdown from '../molecules/Dropdown';

/**
 * DropdownRenderPropsExample
 * 
 * This example demonstrates how to use the Dropdown component with render props
 * to create highly customized dropdown interfaces.
 */
const DropdownRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Dropdowns with Render Props</Text>
      
      {/* Basic Custom Dropdown */}
      <Text as="h3" marginBottom="md">Basic Custom Dropdown</Text>
      <Box marginBottom="lg">
        <BasicCustomDropdown />
      </Box>
      
      {/* Advanced Custom Dropdown */}
      <Text as="h3" marginY="md">Advanced Custom Dropdown</Text>
      <Box marginBottom="lg">
        <AdvancedCustomDropdown />
      </Box>
      
      {/* Interactive Custom Dropdown */}
      <Text as="h3" marginY="md">Interactive Custom Dropdown</Text>
      <Box marginBottom="lg">
        <InteractiveCustomDropdown />
      </Box>
    </Box>
  );
};

/**
 * BasicCustomDropdown Component
 * 
 * Demonstrates a simple dropdown implementation using render props.
 */
const BasicCustomDropdown = () => {
  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
    { id: 'option4', label: 'Option 4' },
  ];
  
  const [selectedOption, setSelectedOption] = useState(null);
  
  return (
    <Dropdown closeOnItemClick>
      {(dropdownState) => (
        <>
          {/* Custom Trigger */}
          <Button 
            ref={dropdownState.triggerRef}
            onClick={dropdownState.toggle}
            aria-expanded={dropdownState.isOpen}
            aria-haspopup="true"
            rightIcon={dropdownState.isOpen ? "chevron-up" : "chevron-down"}
          >
            {selectedOption ? selectedOption.label : 'Select an option'}
          </Button>
          
          {/* Custom Menu */}
          {dropdownState.isOpen && (
            <Box 
              ref={dropdownState.menuRef}
              position="absolute"
              marginTop="xs"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
              backgroundColor="white"
              boxShadow="md"
              zIndex="dropdown"
              width="200px"
              overflow="hidden"
            >
              {options.map((option) => (
                <Box 
                  key={option.id}
                  padding="sm"
                  cursor="pointer"
                  _hover={{ backgroundColor: "primary.50" }}
                  onClick={() => {
                    setSelectedOption(option);
                    dropdownState.close();
                  }}
                  backgroundColor={selectedOption?.id === option.id ? "primary.100" : "transparent"}
                >
                  {option.label}
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Dropdown>
  );
};

/**
 * AdvancedCustomDropdown Component
 * 
 * Demonstrates a more advanced dropdown with custom styling and icons.
 */
const AdvancedCustomDropdown = () => {
  const userActions = [
    { id: 'profile', label: 'View Profile', icon: 'user' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'logout', label: 'Logout', icon: 'log-out' },
  ];
  
  const handleAction = (actionId) => {
    console.log(`Action clicked: ${actionId}`);
  };
  
  return (
    <Dropdown placement="bottom-end" closeOnItemClick>
      {(dropdownState) => (
        <>
          {/* Custom Trigger */}
          <Box 
            ref={dropdownState.triggerRef}
            onClick={dropdownState.toggle}
            cursor="pointer"
            display="inline-block"
          >
            <Avatar 
              src="https://i.pravatar.cc/300" 
              name="Jane Doe" 
              size="md"
              status="online"
            />
          </Box>
          
          {/* Custom Menu */}
          {dropdownState.isOpen && (
            <Card 
              ref={dropdownState.menuRef}
              position="absolute"
              marginTop="xs"
              right="0"
              width="250px"
              padding="none"
              boxShadow="lg"
              zIndex="dropdown"
              overflow="hidden"
            >
              <Box padding="md" borderBottom="1px solid" borderColor="border" backgroundColor="background.alt">
                <Flex alignItems="center" marginBottom="sm">
                  <Avatar 
                    src="https://i.pravatar.cc/300" 
                    name="Jane Doe" 
                    size="sm"
                    marginRight="sm"
                  />
                  <Box>
                    <Text fontWeight="bold">Jane Doe</Text>
                    <Text fontSize="sm" color="text.muted">jane.doe@example.com</Text>
                  </Box>
                </Flex>
                <Badge colorScheme="success" variant="subtle">Premium Account</Badge>
              </Box>
              
              <Box>
                {userActions.map((action) => (
                  <Flex 
                    key={action.id}
                    padding="sm"
                    alignItems="center"
                    cursor="pointer"
                    _hover={{ backgroundColor: "background.hover" }}
                    onClick={() => {
                      handleAction(action.id);
                      dropdownState.close();
                    }}
                    color={action.id === 'logout' ? "danger.500" : "text"}
                  >
                    <Icon 
                      name={action.icon} 
                      marginRight="sm"
                      color={action.id === 'logout' ? "danger.500" : "primary.500"}
                    />
                    {action.label}
                  </Flex>
                ))}
              </Box>
            </Card>
          )}
        </>
      )}
    </Dropdown>
  );
};

/**
 * InteractiveCustomDropdown Component
 * 
 * Demonstrates a dropdown with interactive content.
 */
const InteractiveCustomDropdown = () => {
  // State for color customizer
  const [color, setColor] = useState('#3182CE');
  const [size, setSize] = useState('md');
  const [shape, setShape] = useState('circle');
  
  // Size options
  const sizeOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];
  
  // Shape options
  const shapeOptions = [
    { value: 'circle', label: 'Circle' },
    { value: 'square', label: 'Square' },
    { value: 'rounded', label: 'Rounded' },
  ];
  
  // Size to pixel mapping
  const sizeToPixel = {
    sm: 32,
    md: 48,
    lg: 64,
  };
  
  // Shape to border-radius mapping
  const shapeToBorderRadius = {
    circle: '50%',
    square: '0',
    rounded: '8px',
  };
  
  return (
    <Flex alignItems="center" gap="md">
      {/* Preview of the customized shape */}
      <Box 
        width={`${sizeToPixel[size]}px`}
        height={`${sizeToPixel[size]}px`}
        backgroundColor={color}
        borderRadius={shapeToBorderRadius[shape]}
      />
      
      <Dropdown closeOnItemClick={false} closeOnOutsideClick={true}>
        {(dropdownState) => (
          <>
            {/* Custom Trigger */}
            <Button 
              ref={dropdownState.triggerRef}
              onClick={dropdownState.toggle}
              rightIcon={dropdownState.isOpen ? "chevron-up" : "chevron-down"}
              variant="outline"
            >
              Customize Shape
            </Button>
            
            {/* Custom Menu */}
            {dropdownState.isOpen && (
              <Box 
                ref={dropdownState.menuRef}
                position="absolute"
                marginTop="xs"
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                backgroundColor="white"
                boxShadow="md"
                zIndex="dropdown"
                width="300px"
                padding="md"
              >
                <Text fontWeight="bold" marginBottom="sm">Shape Customizer</Text>
                
                {/* Color picker */}
                <Box marginBottom="md">
                  <Text fontSize="sm" marginBottom="xs">Color</Text>
                  <Flex alignItems="center" gap="sm">
                    <Input 
                      type="color" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      width="40px"
                      height="40px"
                      padding="xs"
                      cursor="pointer"
                    />
                    <Input 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      width="120px"
                    />
                  </Flex>
                </Box>
                
                {/* Size selector */}
                <Box marginBottom="md">
                  <Text fontSize="sm" marginBottom="xs">Size</Text>
                  <Flex gap="sm">
                    {sizeOptions.map((option) => (
                      <Button 
                        key={option.value}
                        variant={size === option.value ? "solid" : "outline"}
                        size="sm"
                        onClick={() => setSize(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Flex>
                </Box>
                
                {/* Shape selector */}
                <Box marginBottom="md">
                  <Text fontSize="sm" marginBottom="xs">Shape</Text>
                  <Flex gap="sm">
                    {shapeOptions.map((option) => (
                      <Button 
                        key={option.value}
                        variant={shape === option.value ? "solid" : "outline"}
                        size="sm"
                        onClick={() => setShape(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Flex>
                </Box>
                
                {/* Apply and Cancel buttons */}
                <Flex justifyContent="flex-end" gap="sm" marginTop="md">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setColor('#3182CE');
                      setSize('md');
                      setShape('circle');
                    }}
                  >
                    Reset
                  </Button>
                  <Button 
                    variant="solid" 
                    size="sm"
                    onClick={dropdownState.close}
                  >
                    Close
                  </Button>
                </Flex>
              </Box>
            )}
          </>
        )}
      </Dropdown>
      
      <Text>
        {sizeOptions.find(o => o.value === size)?.label} {shapeOptions.find(o => o.value === shape)?.label}
      </Text>
    </Flex>
  );
};

export default DropdownRenderPropsExample;
