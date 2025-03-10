import React, { useState, useEffect } from 'react';
import Spinner from '../atoms/Spinner';
import Button from '../atoms/Button';
import Flex from '../atoms/Flex';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
// Molecules (used only in the Advanced Usage section)
import Card from '../molecules/Card';

/**
 * SpinnerExample Component
 * 
 * This example demonstrates various ways to use the Spinner component
 * in real-world scenarios. The example is divided into two sections:
 * 
 * 1. Basic Usage: Shows how to use the Spinner component with only atoms
 * 2. Advanced Usage: Shows how to use the Spinner component with other components,
 *    including molecules like Card
 */
const SpinnerExample = () => {
  // State for the loading demo
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simulate a loading process
  useEffect(() => {
    let interval;
    
    if (isLoading && loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            setIsLoading(false);
            setLoadingComplete(true);
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, loadingProgress]);

  // Start the loading process
  const handleStartLoading = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingComplete(false);
  };

  // Reset the loading process
  const handleReset = () => {
    setIsLoading(false);
    setLoadingProgress(0);
    setLoadingComplete(false);
  };

  return (
    <Box padding="lg">
      <Text as="h1" size="xl" marginBottom="md">Spinner Component Examples</Text>
      
      {/* SECTION 1: BASIC USAGE (ATOMS ONLY) */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Basic Usage (Atoms Only)</Text>
        
        {/* Basic spinners */}
        <Box marginBottom="lg" padding="md" border="neutral">
          <Text as="h3" size="md" marginBottom="sm">Basic Spinners</Text>
          <Flex gap="md" wrap="wrap">
            <Box>
              <Text marginBottom="xs">Default</Text>
              <Spinner />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Primary</Text>
              <Spinner variant="primary" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Secondary</Text>
              <Spinner variant="secondary" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Accent</Text>
              <Spinner variant="accent" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Success</Text>
              <Spinner variant="success" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Error</Text>
              <Spinner variant="error" />
            </Box>
          </Flex>
        </Box>
        
        {/* Sizes */}
        <Box marginBottom="lg" padding="md" border="neutral">
          <Text as="h3" size="md" marginBottom="sm">Spinner Sizes</Text>
          <Flex gap="md" wrap="wrap" alignItems="center">
            <Box>
              <Text marginBottom="xs">XS</Text>
              <Spinner size="xs" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Small</Text>
              <Spinner size="small" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Medium</Text>
              <Spinner size="medium" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Large</Text>
              <Spinner size="large" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">XL</Text>
              <Spinner size="xl" />
            </Box>
          </Flex>
        </Box>
        
        {/* With labels */}
        <Box marginBottom="lg" padding="md" border="neutral">
          <Text as="h3" size="md" marginBottom="sm">Spinners with Labels</Text>
          <Flex gap="md" wrap="wrap">
            <Box>
              <Text marginBottom="xs">Label on Right</Text>
              <Spinner label="Loading..." labelPosition="right" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Label on Left</Text>
              <Spinner label="Loading..." labelPosition="left" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Label on Top</Text>
              <Spinner label="Loading..." labelPosition="top" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Label on Bottom</Text>
              <Spinner label="Loading..." labelPosition="bottom" />
            </Box>
          </Flex>
        </Box>
        
        {/* Loading button example */}
        <Box marginBottom="lg" padding="md" border="neutral">
          <Text as="h3" size="md" marginBottom="sm">Loading Button Example</Text>
          <Box>
            <Button 
              onClick={handleStartLoading} 
              disabled={isLoading}
              leftIcon={isLoading ? <Spinner size="xs" /> : null}
              marginRight="sm"
            >
              {isLoading ? 'Loading...' : 'Start Loading'}
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={handleReset}
              disabled={!isLoading && loadingProgress === 0}
            >
              Reset
            </Button>
            
            <Box marginTop="md">
              {isLoading && (
                <Flex alignItems="center">
                  <Spinner size="small" marginRight="sm" />
                  <Text>Loading: {loadingProgress}%</Text>
                </Flex>
              )}
              
              {loadingComplete && (
                <Text color="success">Loading complete!</Text>
              )}
            </Box>
          </Box>
        </Box>
        
        {/* Overlay loading state */}
        <Box marginBottom="lg" padding="md" border="neutral">
          <Text as="h3" size="md" marginBottom="sm">Overlay Loading State</Text>
          <Box position="relative" padding="md" height="150px" background="background-alt">
            {isLoading && (
              <Flex 
                position="absolute" 
                top="0" 
                left="0" 
                width="100%" 
                height="100%" 
                justifyContent="center" 
                alignItems="center"
                background="background-overlay"
              >
                <Spinner size="large" label="Loading content..." />
              </Flex>
            )}
            
            <Text>Content goes here. This content would be blurred or overlaid during loading.</Text>
            
            <Flex marginTop="md">
              <Button 
                onClick={handleStartLoading} 
                disabled={isLoading}
                size="small"
                marginRight="sm"
              >
                Load Content
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={handleReset}
                disabled={!isLoading && loadingProgress === 0}
                size="small"
              >
                Cancel
              </Button>
            </Flex>
          </Box>
        </Box>
        
        {/* Responsive spinner */}
        <Box marginBottom="lg" padding="md" border="neutral">
          <Text as="h3" size="md" marginBottom="sm">Responsive Spinner</Text>
          <Box>
            <Spinner 
              size={{ base: 'small', md: 'medium', lg: 'large' }}
              variant={{ base: 'primary', md: 'accent' }}
              label="This spinner changes size and color based on screen size"
            />
            <Text marginTop="sm" size="sm">
              Resize your browser window to see the spinner change size and color.
            </Text>
          </Box>
        </Box>
      </Box>
      
      {/* SECTION 2: ADVANCED USAGE (WITH MOLECULES) */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Advanced Usage (With Molecules)</Text>
        
        {/* Basic spinners in Card */}
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Basic Spinners in Card</Text>
          <Flex gap="md" wrap="wrap">
            <Box>
              <Text marginBottom="xs">Default</Text>
              <Spinner />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Primary</Text>
              <Spinner variant="primary" />
            </Box>
            
            <Box>
              <Text marginBottom="xs">Secondary</Text>
              <Spinner variant="secondary" />
            </Box>
          </Flex>
        </Card>
        
        {/* Card loading state */}
        <Card marginBottom="lg">
          <Text as="h3" size="md" marginBottom="sm">Card Loading State</Text>
          <Box position="relative" padding="md" height="150px" border="neutral">
            {isLoading && (
              <Flex 
                position="absolute" 
                top="0" 
                left="0" 
                width="100%" 
                height="100%" 
                justifyContent="center" 
                alignItems="center"
                background="background-overlay"
              >
                <Spinner size="large" label="Loading content..." />
              </Flex>
            )}
            
            <Text>Card content goes here. This content would be blurred or overlaid during loading.</Text>
            
            <Flex marginTop="md">
              <Button 
                onClick={handleStartLoading} 
                disabled={isLoading}
                size="small"
                marginRight="sm"
              >
                Load Content
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={handleReset}
                disabled={!isLoading && loadingProgress === 0}
                size="small"
              >
                Cancel
              </Button>
            </Flex>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default SpinnerExample;
