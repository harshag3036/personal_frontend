import React, { useState, useRef } from 'react';
import { Box, Button, Text, Flex, Icon, Input, Avatar, Badge, Spinner, Label } from '../atoms';
import { Textarea } from '../index';
import Modal from '../molecules/Modal';

// Local component definitions to avoid import errors
const Heading = ({ as, size, ...props }) => <Text as={as || 'h3'} fontSize={size === 'md' ? 'lg' : 'md'} fontWeight="bold" {...props} />;
const FormControl = ({ children, ...props }) => <Box mb="md" {...props}>{children}</Box>;
const FormLabel = ({ htmlFor, children, ...props }) => <Label htmlFor={htmlFor} mb="xs" display="block" {...props}>{children}</Label>;

/**
 * ModalRenderPropsExample
 * 
 * This example demonstrates how to use the Modal component with render props
 * to create highly customized modal interfaces.
 */
const ModalRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Modals with Render Props</Text>
      
      {/* Basic Custom Modal */}
      <Text as="h3" marginBottom="md">Basic Custom Modal</Text>
      <Box marginBottom="xl">
        <BasicCustomModal />
      </Box>
      
      {/* Multi-step Modal Flow */}
      <Text as="h3" marginY="md">Multi-step Modal Flow</Text>
      <Box marginBottom="xl">
        <MultiStepModal />
      </Box>
      
      {/* Advanced Custom Modal */}
      <Text as="h3" marginY="md">Advanced Custom Modal</Text>
      <Box marginBottom="xl">
        <AdvancedCustomModal />
      </Box>
    </Box>
  );
};

/**
 * BasicCustomModal Component
 * 
 * Demonstrates a simple modal implementation using render props.
 */
const BasicCustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  return (
    <Box>
      <Button onClick={handleOpen} variant="primary">Open Custom Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
      >
        {(modalState) => (
          <Box>
            {/* Custom Header */}
            <Flex 
              p="md" 
              justifyContent="space-between" 
              alignItems="center"
              borderBottom="1px solid"
              borderColor="border"
            >
              <Heading as="h3" size="md">Custom Modal</Heading>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={modalState.close}
                aria-label="Close"
              >
                <Icon name="x" />
              </Button>
            </Flex>
            
            {/* Custom Body */}
            <Box p="md">
              <Text>This is a custom modal created with render props.</Text>
              <Text mt="md">
                You have full control over the styling and layout
                of the modal content.
              </Text>
              
              <Box 
                mt="lg" 
                p="md" 
                backgroundColor="primary.50" 
                borderRadius="md"
              >
                <Text fontWeight="bold">Modal State Information:</Text>
                <Text fontSize="sm">Size: {modalState.size}</Text>
                <Text fontSize="sm">Variant: {modalState.variant}</Text>
                <Text fontSize="sm">Close on Escape: {modalState.closeOnEsc ? 'Yes' : 'No'}</Text>
                <Text fontSize="sm">Close on Overlay Click: {modalState.closeOnOverlayClick ? 'Yes' : 'No'}</Text>
              </Box>
            </Box>
            
            {/* Custom Footer */}
            <Flex 
              p="md" 
              justifyContent="flex-end" 
              borderTop="1px solid"
              borderColor="border"
              backgroundColor="background.alt"
            >
              <Button 
                variant="outline" 
                mr="sm"
                onClick={modalState.close}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  console.log('Confirmed!');
                  modalState.close();
                }}
              >
                Confirm
              </Button>
            </Flex>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

/**
 * MultiStepModal Component
 * 
 * Demonstrates a multi-step modal flow using render props.
 */
const MultiStepModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleOpen = () => {
    setIsOpen(true);
    setCurrentStep(1);
    setFormData({ name: '', email: '', message: '' });
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };
  
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    handleNextStep();
  };
  
  return (
    <Box>
      <Button onClick={handleOpen} variant="primary">Open Multi-step Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
      >
        {(modalState) => (
          <Box>
            {/* Custom Header */}
            <Flex 
              p="md" 
              justifyContent="space-between" 
              alignItems="center"
              borderBottom="1px solid"
              borderColor="border"
            >
              <Heading as="h3" size="md">
                {currentStep === 1 && 'Step 1: Personal Information'}
                {currentStep === 2 && 'Step 2: Message'}
                {currentStep === 3 && 'Step 3: Confirm'}
                {currentStep === 4 && 'Submission Complete'}
              </Heading>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={modalState.close}
                aria-label="Close"
              >
                <Icon name="x" />
              </Button>
            </Flex>
            
            {/* Progress Indicator */}
            <Flex p="md" justifyContent="center">
              {[1, 2, 3, 4].map((step) => (
                <Flex 
                  key={step} 
                  direction="column" 
                  alignItems="center"
                  mx="md"
                >
                  <Box
                    width="30px"
                    height="30px"
                    borderRadius="full"
                    backgroundColor={step <= currentStep ? 'primary.500' : 'gray.200'}
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                  >
                    {step < currentStep ? (
                      <Icon name="check" />
                    ) : (
                      step
                    )}
                  </Box>
                  <Box
                    mt="sm"
                    height="2px"
                    width="100px"
                    backgroundColor={step < currentStep ? 'primary.500' : 'gray.200'}
                    position="absolute"
                    left={`calc(50% + ${(step - 2) * 120}px)`}
                    display={step === 1 ? 'none' : 'block'}
                  />
                </Flex>
              ))}
            </Flex>
            
            {/* Custom Body */}
            <Box p="md" minHeight="250px">
              {currentStep === 1 && (
                <Box>
                  <FormControl mb="md">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                </Box>
              )}
              
              {currentStep === 2 && (
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Enter your message"
                      rows={6}
                    />
                  </FormControl>
                </Box>
              )}
              
              {currentStep === 3 && (
                <Box>
                  <Text fontWeight="bold" mb="md">Please confirm your information:</Text>
                  
                  <Box p="md" backgroundColor="background.alt" borderRadius="md">
                    <Flex justifyContent="space-between" mb="sm">
                      <Text fontWeight="bold">Name:</Text>
                      <Text>{formData.name}</Text>
                    </Flex>
                    
                    <Flex justifyContent="space-between" mb="sm">
                      <Text fontWeight="bold">Email:</Text>
                      <Text>{formData.email}</Text>
                    </Flex>
                    
                    <Text fontWeight="bold" mb="sm">Message:</Text>
                    <Text>{formData.message}</Text>
                  </Box>
                </Box>
              )}
              
              {currentStep === 4 && (
                <Flex direction="column" alignItems="center" justifyContent="center" height="100%">
                  <Box 
                    borderRadius="full" 
                    backgroundColor="success.100" 
                    p="lg" 
                    mb="md"
                  >
                    <Icon name="check-circle" size="xl" color="success.500" />
                  </Box>
                  <Heading as="h4" size="md" mb="sm">Submission Complete!</Heading>
                  <Text>Thank you for your submission.</Text>
                  <Text>We will get back to you shortly.</Text>
                </Flex>
              )}
            </Box>
            
            {/* Custom Footer */}
            <Flex 
              p="md" 
              justifyContent="space-between" 
              borderTop="1px solid"
              borderColor="border"
              backgroundColor="background.alt"
            >
              <Button 
                variant="outline"
                onClick={currentStep === 1 ? modalState.close : handlePrevStep}
                visibility={currentStep === 4 ? 'hidden' : 'visible'}
              >
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </Button>
              
              <Button 
                variant="primary"
                onClick={
                  currentStep === 3 
                    ? handleSubmit 
                    : currentStep === 4 
                    ? modalState.close 
                    : handleNextStep
                }
              >
                {currentStep === 3 
                  ? 'Submit' 
                  : currentStep === 4 
                  ? 'Close' 
                  : 'Next'}
              </Button>
            </Flex>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

/**
 * AdvancedCustomModal Component
 * 
 * Demonstrates an advanced modal with custom styling and loading states.
 */
const AdvancedCustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const searchRef = useRef(null);
  
  const mockUsers = [
    { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'John Smith', email: 'john.smith@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', role: 'Viewer', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Emily Clark', email: 'emily.c@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Michael Brown', email: 'michael.b@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];
  
  const handleOpen = () => {
    setIsOpen(true);
    setSearchResults([]);
    setSelectedUsers([]);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockUsers.filter(
        user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };
  
  const toggleUserSelection = (user) => {
    if (selectedUsers.some(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  
  const handleInvite = () => {
    console.log('Inviting users:', selectedUsers);
    handleClose();
  };
  
  return (
    <Box>
      <Button onClick={handleOpen} variant="primary">Open User Invitation Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        initialFocusRef={searchRef}
      >
        {(modalState) => (
          <Box>
            <Box 
              p="lg" 
              borderTopLeftRadius="md" 
              borderTopRightRadius="md" 
              backgroundColor="primary.700" 
              color="white"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Heading as="h3" size="md">Invite Team Members</Heading>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={modalState.close}
                  color="white"
                  aria-label="Close"
                  _hover={{ backgroundColor: 'primary.600' }}
                >
                  <Icon name="x" />
                </Button>
              </Flex>
              <Text fontSize="sm" mt="xs">Search and select users to invite to your project</Text>
            </Box>
            
            <Box p="lg">
              <Flex 
                position="relative" 
                alignItems="center" 
                backgroundColor="background.alt"
                borderRadius="md"
                px="sm"
                mb="lg"
              >
                <Icon name="search" color="text.muted" mr="sm" />
                <Input
                  ref={searchRef}
                  placeholder="Search by name or email"
                  onChange={handleSearch}
                  border="none"
                  _focus={{ boxShadow: 'none' }}
                  backgroundColor="transparent"
                />
                {isLoading && (
                  <Spinner size="sm" position="absolute" right="sm" />
                )}
              </Flex>
              
              <Box maxHeight="300px" overflowY="auto" mb="lg">
                {searchResults.length > 0 ? (
                  searchResults.map(user => (
                    <Flex 
                      key={user.id}
                      p="sm"
                      borderRadius="md"
                      alignItems="center"
                      justifyContent="space-between"
                      cursor="pointer"
                      onClick={() => toggleUserSelection(user)}
                      backgroundColor={selectedUsers.some(u => u.id === user.id) ? 'primary.50' : 'transparent'}
                      _hover={{ backgroundColor: 'background.hover' }}
                      mb="xs"
                    >
                      <Flex alignItems="center">
                        <Avatar src={user.avatar} name={user.name} size="sm" mr="sm" />
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="text.muted">{user.email}</Text>
                        </Box>
                      </Flex>
                      
                      <Flex alignItems="center">
                        <Badge variant="subtle" colorScheme="primary" mr="sm">{user.role}</Badge>
                        <Icon 
                          name={selectedUsers.some(u => u.id === user.id) ? "check-circle" : "circle"} 
                          color={selectedUsers.some(u => u.id === user.id) ? "primary.500" : "gray.300"} 
                        />
                      </Flex>
                    </Flex>
                  ))
                ) : (
                  <Box textAlign="center" p="lg" color="text.muted">
                    {isLoading ? (
                      <Flex justifyContent="center" alignItems="center" direction="column">
                        <Spinner size="md" mb="sm" />
                        <Text>Searching...</Text>
                      </Flex>
                    ) : (
                      <Text>Search for users by name or email</Text>
                    )}
                  </Box>
                )}
              </Box>
              
              {selectedUsers.length > 0 && (
                <Box mb="lg">
                  <Text fontWeight="bold" mb="sm">{selectedUsers.length} user(s) selected</Text>
                  <Flex flexWrap="wrap">
                    {selectedUsers.map(user => (
                      <Flex 
                        key={user.id}
                        alignItems="center"
                        backgroundColor="primary.100"
                        borderRadius="full"
                        px="sm"
                        py="xs"
                        mr="sm"
                        mb="sm"
                      >
                        <Avatar src={user.avatar} name={user.name} size="xs" mr="xs" />
                        <Text fontSize="sm">{user.name}</Text>
                        <Button 
                          variant="ghost" 
                          size="xs" 
                          ml="xs"
                          p="0"
                          minWidth="auto"
                          height="auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleUserSelection(user);
                          }}
                        >
                          <Icon name="x" size="sm" />
                        </Button>
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>
            
            <Flex 
              p="md" 
              justifyContent="space-between" 
              borderTop="1px solid"
              borderColor="border"
              backgroundColor="background.alt"
            >
              <Button 
                variant="ghost"
                onClick={modalState.close}
              >
                Cancel
              </Button>
              
              <Button 
                variant="primary"
                isDisabled={selectedUsers.length === 0}
                onClick={handleInvite}
              >
                Invite {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ''}
              </Button>
            </Flex>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default ModalRenderPropsExample;
