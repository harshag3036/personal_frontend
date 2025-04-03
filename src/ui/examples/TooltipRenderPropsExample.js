import React, { useState } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Stack from '../atoms/Stack';
import Button from '../atoms/Button';
import Flex from '../atoms/Flex';
import Icon from '../atoms/Icon';
import Tooltip from '../molecules/Tooltip/Tooltip';
import Divider from '../atoms/Divider';

/**
 * TooltipRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the Tooltip component.
 */
const TooltipRenderPropsExample = () => {
  const [count, setCount] = useState(0);
  
  return (
    <Stack direction="column" spacing="lg" p={4}>
      <Box mb={4}>
        <Text variant="h2">Tooltip with Render Props</Text>
        <Text mb={4}>The Tooltip component supports render props for complete UI customization</Text>
      </Box>

      <Stack spacing="md">
        {/* Standard Tooltip Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Standard Tooltip (without render props)</Text>
          <Flex justifyContent="center" p={4}>
            <Tooltip 
              content="This is a standard tooltip"
              placement="top"
              variant="default"
            >
              <Button>Hover me</Button>
            </Tooltip>
          </Flex>
        </Box>

        <Divider my={4} />

        {/* Basic Render Props Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Custom Styled Tooltip with Render Props</Text>
          <Flex justifyContent="center" p={4}>
            <Tooltip 
              content={(tooltipState) => (
                <Box 
                  bg="blue.500" 
                  color="white" 
                  p={3} 
                  borderRadius="md" 
                  maxWidth="300px"
                  boxShadow="lg"
                >
                  <Text fontWeight="bold" mb={1}>Custom Tooltip</Text>
                  <Text fontSize="sm">
                    This tooltip uses render props to customize its appearance.
                    Current placement: <strong>{tooltipState.placement}</strong>
                  </Text>
                </Box>
              )}
              placement="top"
            >
              <Button variant="primary">Hover for custom tooltip</Button>
            </Tooltip>
          </Flex>
        </Box>

        <Divider my={4} />

        {/* Interactive Tooltip Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Interactive Tooltip with Render Props</Text>
          <Flex justifyContent="center" p={4}>
            <Tooltip
              content={(tooltipState) => (
                <Box 
                  bg="gray.50" 
                  p={3} 
                  borderRadius="md" 
                  boxShadow="md"
                  border="1px solid"
                  borderColor="gray.200"
                  width="200px"
                >
                  <Text fontWeight="bold" mb={2} textAlign="center">Counter: {count}</Text>
                  <Flex justifyContent="space-between">
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCount(prev => prev - 1);
                      }}
                      variant="outline"
                    >
                      Decrease
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCount(prev => prev + 1);
                      }}
                      variant="solid"
                    >
                      Increase
                    </Button>
                  </Flex>
                </Box>
              )}
              placement="right"
              delay={100}
              interactable={true}
            >
              <Button variant="outline">Interactive tooltip</Button>
            </Tooltip>
          </Flex>
          <Flex justifyContent="center" mt={2}>
            <Text fontSize="sm" color="gray.500">
              (Tooltip stays open when you hover over it)
            </Text>
          </Flex>
        </Box>

        <Divider my={4} />

        {/* Multi-part Tooltip Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Multi-part Tooltip with Render Props</Text>
          <Flex justifyContent="center" p={4}>
            <Tooltip
              content={(tooltipState) => (
                <Box 
                  p={0} 
                  borderRadius="md" 
                  overflow="hidden"
                  bg="white"
                  boxShadow="lg"
                  maxWidth="280px"
                >
                  {/* Header */}
                  <Box bg="purple.500" p={2} color="white">
                    <Text fontWeight="bold" fontSize="sm">Component Usage</Text>
                  </Box>
                  
                  {/* Content */}
                  <Box p={3}>
                    <Text fontSize="sm" mb={2}>
                      <code>{"<Tooltip>"}</code> displays informative text when users hover over elements.
                    </Text>
                    
                    <Box 
                      bg="gray.50" 
                      p={2} 
                      borderRadius="md" 
                      fontSize="xs" 
                      mb={2}
                      fontFamily="monospace"
                    >
                      <Text color="purple.600" mb={1}>// Example usage</Text>
                      <Text color="gray.800">
                        {"<Tooltip content=\"Info\">"}
                      </Text>
                      <Text color="gray.800" ml={2}>
                        {"<Button>Hover</Button>"}
                      </Text>
                      <Text color="gray.800">
                        {"</Tooltip>"}
                      </Text>
                    </Box>
                  </Box>
                  
                  {/* Footer */}
                  <Flex bg="gray.50" p={2} justifyContent="flex-end" borderTop="1px solid" borderColor="gray.100">
                    <Button 
                      size="xs" 
                      variant="link" 
                      colorScheme="purple"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Documentation clicked');
                      }}
                    >
                      View Documentation
                    </Button>
                  </Flex>
                </Box>
              )}
              placement="bottom"
              interactable={true}
              delay={200}
              maxWidth={300}
            >
              <Button variant="ghost" colorScheme="purple">
                <Flex alignItems="center">
                  <Box mr={2}>?</Box>
                  <Text>Help</Text>
                </Flex>
              </Button>
            </Tooltip>
          </Flex>
        </Box>

        <Divider my={4} />

        {/* Color Picker Tooltip Example */}
        <Box mb={4}>
          <Text variant="h3" mb={2}>Color Picker Tooltip with Render Props</Text>
          <Flex justifyContent="center" p={4}>
            <Tooltip
              content={(tooltipState) => {
                const colors = [
                  'red.500', 'orange.500', 'yellow.500', 'green.500', 
                  'teal.500', 'blue.500', 'cyan.500', 'purple.500',
                  'pink.500', 'gray.500', 'red.300', 'orange.300',
                  'yellow.300', 'green.300', 'teal.300', 'blue.300'
                ];
                
                return (
                  <Box 
                    bg="white" 
                    p={3} 
                    borderRadius="md" 
                    boxShadow="lg"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Text fontWeight="bold" mb={2} fontSize="sm">Select a color</Text>
                    <Flex flexWrap="wrap" width="160px" gap={1}>
                      {colors.map((color) => (
                        <Box 
                          key={color}
                          width="35px"
                          height="35px"
                          bg={color}
                          borderRadius="md"
                          cursor="pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Selected color: ${color}`);
                            tooltipState.hide();
                          }}
                          _hover={{
                            transform: 'scale(1.1)',
                            boxShadow: 'sm'
                          }}
                          transition="all 0.2s"
                        />
                      ))}
                    </Flex>
                  </Box>
                );
              }}
              placement="left"
              interactable={true}
              delay={100}
            >
              <Button 
                variant="outline" 
                colorScheme="blue"
                leftIcon={<Box width="12px" height="12px" borderRadius="full" bg="blue.500" />}
              >
                Choose color
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      </Stack>
    </Stack>
  );
};

export default TooltipRenderPropsExample;
