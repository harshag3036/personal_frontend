import React, { useState } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Stack from '../atoms/Stack';
import Button from '../atoms/Button';
import Flex from '../atoms/Flex';
import Icon from '../atoms/Icon';
import Toast from '../molecules/Toast/Toast';
import { TOAST_VARIANTS, TOAST_POSITIONS } from '../molecules/Toast/constants';

/**
 * ToastRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the Toast component.
 */
const ToastRenderPropsExample = () => {
  const [isDefaultVisible, setIsDefaultVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isCustomVisible, setIsCustomVisible] = useState(false);
  const [isAnimatedVisible, setIsAnimatedVisible] = useState(false);

  // Example icon components
  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
    </svg>
  );

  const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
    </svg>
  );

  return (
    <Stack spacing="lg" p={4}>
      <Box mb={4}>
        <Text variant="h2">Toast with Render Props</Text>
        <Text mb={4}>The Toast component supports render props for complete UI customization</Text>
      </Box>

      <Stack spacing="md">
        {/* Standard Toast Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Standard Toast (without render props)</Text>
          <Button onClick={() => setIsDefaultVisible(true)}>Show Standard Toast</Button>
          
          <Toast 
            visible={isDefaultVisible}
            onClose={() => setIsDefaultVisible(false)}
            duration={5000}
            variant={TOAST_VARIANTS.INFO}
            position={TOAST_POSITIONS.TOP_RIGHT}
            icon={<InfoIcon />}
          >
            This is a standard toast notification
          </Toast>
        </Box>

        {/* Basic Render Props Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Custom Toast with Render Props</Text>
          <Button onClick={() => setIsSuccessVisible(true)}>Show Success Toast</Button>
          
          <Toast 
            visible={isSuccessVisible}
            onClose={() => setIsSuccessVisible(false)}
            duration={5000}
            variant={TOAST_VARIANTS.SUCCESS}
            position={TOAST_POSITIONS.TOP_CENTER}
            icon={<SuccessIcon />}
          >
            {(toastState) => (
              <Flex 
                bg={toastState.variant === TOAST_VARIANTS.SUCCESS ? "green.100" : "gray.100"}
                p={3} 
                borderRadius="md" 
                alignItems="center" 
                boxShadow="md"
                border="1px solid"
                borderColor="green.200"
                width="100%"
                maxWidth="400px"
              >
                <Box mr={3} color="green.500">
                  {toastState.icon}
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" color="green.700">Success!</Text>
                  <Text color="green.600">Operation completed successfully</Text>
                </Box>
                {toastState.showCloseButton && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toastState.handleClose}
                    color="green.500"
                    _hover={{ bg: "green.50" }}
                  >
                    ✕
                  </Button>
                )}
              </Flex>
            )}
          </Toast>
        </Box>

        {/* Error Toast Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Error Toast with Render Props</Text>
          <Button variant="danger" onClick={() => setIsErrorVisible(true)}>Show Error Toast</Button>
          
          <Toast 
            visible={isErrorVisible}
            onClose={() => setIsErrorVisible(false)}
            duration={10000}
            variant={TOAST_VARIANTS.ERROR}
            position={TOAST_POSITIONS.BOTTOM_CENTER}
            icon={<ErrorIcon />}
          >
            {(toastState) => (
              <Flex 
                bg="red.50" 
                p={3} 
                borderRadius="md" 
                alignItems="center"
                boxShadow="md"
                border="1px solid"
                borderColor="red.200"
                width="100%"
                maxWidth="400px"
              >
                <Box mr={3} color="red.500">
                  {toastState.icon}
                </Box>
                <Box flex="1">
                  <Text fontWeight="bold" color="red.700">Error</Text>
                  <Text color="red.600">Something went wrong. Please try again.</Text>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    colorScheme="red" 
                    mt={2}
                    onClick={() => {
                      alert('Retrying operation...');
                      toastState.handleClose();
                    }}
                  >
                    Retry
                  </Button>
                </Box>
                {toastState.showCloseButton && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toastState.handleClose}
                    color="red.500"
                    _hover={{ bg: "red.50" }}
                  >
                    ✕
                  </Button>
                )}
              </Flex>
            )}
          </Toast>
        </Box>

        {/* Highly Custom Toast Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Highly Custom Toast with Render Props</Text>
          <Button variant="primary" onClick={() => setIsCustomVisible(true)}>Show Custom Toast</Button>
          
          <Toast 
            visible={isCustomVisible}
            onClose={() => setIsCustomVisible(false)}
            duration={8000}
            variant={TOAST_VARIANTS.INFO}
            position={TOAST_POSITIONS.TOP_LEFT}
          >
            {(toastState) => (
              <Box 
                p={0} 
                borderRadius="lg" 
                overflow="hidden"
                boxShadow="xl"
                maxWidth="350px"
                bg="white"
              >
                {/* Header */}
                <Box bg="blue.500" p={3} color="white">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold">New Message</Text>
                    {toastState.showCloseButton && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        color="white"
                        onClick={toastState.handleClose}
                        _hover={{ bg: "blue.600" }}
                      >
                        ✕
                      </Button>
                    )}
                  </Flex>
                </Box>
                
                {/* Content */}
                <Box p={3}>
                  <Flex mb={3}>
                    <Box 
                      as="img" 
                      src="https://via.placeholder.com/50" 
                      borderRadius="full" 
                      mr={3}
                      alt="User avatar"
                    />
                    <Box>
                      <Text fontWeight="bold">John Doe</Text>
                      <Text fontSize="sm" color="gray.500">2 minutes ago</Text>
                    </Box>
                  </Flex>
                  <Text mb={3}>Hey there! Just checking in about the project. How's it going?</Text>
                </Box>
                
                {/* Actions */}
                <Flex p={3} bg="gray.50" justifyContent="space-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      alert('Marked as read');
                      toastState.handleClose();
                    }}
                  >
                    Mark as read
                  </Button>
                  <Button 
                    variant="solid" 
                    size="sm" 
                    colorScheme="blue"
                    onClick={() => {
                      alert('Replied to message');
                      toastState.handleClose();
                    }}
                  >
                    Reply
                  </Button>
                </Flex>
              </Box>
            )}
          </Toast>
        </Box>
        
        {/* Animated Toast Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Animated Toast with Render Props</Text>
          <Button onClick={() => setIsAnimatedVisible(true)}>Show Animated Toast</Button>
          
          <Toast 
            visible={isAnimatedVisible}
            onClose={() => setIsAnimatedVisible(false)}
            duration={7000}
            variant={TOAST_VARIANTS.WARNING}
            position={TOAST_POSITIONS.BOTTOM_RIGHT}
          >
            {(toastState) => (
              <Box 
                className="animated-toast"
                p={4} 
                borderRadius="md" 
                bg="orange.100"
                border="1px solid"
                borderColor="orange.300"
                boxShadow="md"
                maxWidth="300px"
                position="relative"
                overflow="hidden"
                style={{
                  animation: "bounceIn 0.5s"
                }}
              >
                {/* Progress bar */}
                <Box 
                  position="absolute"
                  bottom="0"
                  left="0"
                  height="3px"
                  width="100%"
                  bg="orange.300"
                  style={{
                    animation: `progressBar ${toastState.duration}ms linear`,
                    transformOrigin: "left"
                  }}
                />
                
                <Flex alignItems="center" mb={2}>
                  <Box 
                    color="orange.500" 
                    mr={2}
                    style={{
                      animation: "pulse 2s infinite"
                    }}
                  >
                    ⚠️
                  </Box>
                  <Text fontWeight="bold" color="orange.800">Connection Warning</Text>
                  {toastState.showCloseButton && (
                    <Button 
                      ml="auto"
                      variant="ghost" 
                      size="sm" 
                      onClick={toastState.handleClose}
                      color="orange.500"
                      _hover={{ bg: "orange.200" }}
                    >
                      ✕
                    </Button>
                  )}
                </Flex>
                
                <Text color="orange.700" mb={3}>
                  Your internet connection appears to be unstable.
                </Text>
                
                <Box textAlign="right">
                  <Button 
                    size="sm" 
                    variant="solid" 
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    onClick={() => {
                      alert('Reconnecting...');
                      toastState.handleClose();
                    }}
                  >
                    Reconnect
                  </Button>
                </Box>
                
                <style jsx>{`
                  @keyframes bounceIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  
                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                  }
                  
                  @keyframes progressBar {
                    0% { transform: scaleX(1); }
                    100% { transform: scaleX(0); }
                  }
                `}</style>
              </Box>
            )}
          </Toast>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ToastRenderPropsExample;
