/**
 * Responsive Example Component
 * 
 * This component demonstrates the use of responsive props in the UI library.
 */

import React from 'react';
import { Box, Flex, Grid, Text, Button, Card } from '../';
import { breakpoints } from '../utilities/responsive-props';

/**
 * Responsive Example Component
 * 
 * @returns {JSX.Element} Responsive example component
 */
const ResponsiveExample = () => {
  return (
    <Box
      padding={{ base: 'sm', md: 'md', lg: 'lg' }}
      backgroundColor={{ base: 'background.primary', md: 'background.secondary' }}
    >
      <Text variant="h1" marginBottom="md">Responsive Props Example</Text>
      
      <Text variant="body1" marginBottom="lg">
        This example demonstrates the use of responsive props in the UI library.
        Resize your browser window to see the changes.
      </Text>
      
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h2">Breakpoints</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            The UI library defines the following breakpoints:
          </Text>
          
          <Grid
            columns={{ base: 1, md: 2 }}
            gap="md"
            marginBottom="md"
          >
            {Object.entries(breakpoints).map(([key, value]) => (
              <Box
                key={key}
                padding="md"
                backgroundColor="background.tertiary"
                borderRadius="md"
              >
                <Text variant="h3">{key}</Text>
                <Text variant="body2">{value}</Text>
              </Box>
            ))}
          </Grid>
        </Card.Body>
      </Card>
      
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h2">Responsive Layout</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            This grid changes from 1 column on mobile to 2 columns on tablets and 3 columns on desktops.
          </Text>
          
          <Grid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 'sm', md: 'md' }}
            marginBottom="md"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box
                key={item}
                padding="md"
                backgroundColor="background.accent"
                color="text.onAccent"
                borderRadius="md"
              >
                <Text variant="h3">Item {item}</Text>
                <Text variant="body2">This is a grid item</Text>
              </Box>
            ))}
          </Grid>
        </Card.Body>
      </Card>
      
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h2">Responsive Components</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            Components like Button support responsive variants and sizes.
          </Text>
          
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap="md"
            marginBottom="md"
          >
            <Button
              variant={{ base: 'primary', md: 'outline', lg: 'accent' }}
              size={{ base: 'small', md: 'medium', lg: 'large' }}
            >
              Responsive Button
            </Button>
            
            <Button
              variant={{ base: 'secondary', md: 'primary' }}
              size={{ base: 'medium', md: 'large' }}
            >
              Another Button
            </Button>
            
            <Button
              variant={{ base: 'outline', md: 'text' }}
              size={{ base: 'small', md: 'medium' }}
            >
              Third Button
            </Button>
          </Flex>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Header>
          <Text variant="h2">Responsive Text</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            Text components can have responsive styles too.
          </Text>
          
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={{ base: 'normal', md: 'bold' }}
            color={{ base: 'text.primary', md: 'text.accent' }}
            marginBottom="md"
          >
            This text changes size, weight, and color based on screen size.
          </Text>
          
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            fontStyle={{ base: 'normal', md: 'italic' }}
            marginBottom="md"
          >
            This text changes size and style based on screen size.
          </Text>
        </Card.Body>
      </Card>
    </Box>
  );
};

export default ResponsiveExample;
