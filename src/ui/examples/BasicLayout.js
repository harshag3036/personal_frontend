import React from 'react';
import { Box, Flex, Grid, Text, Stack, Divider } from '../atoms';

/**
 * BasicLayout Example
 * 
 * This example demonstrates how to use the UI components
 * together to create a simple layout.
 */
const BasicLayout = () => {
  return (
    <Box padding="lg" background="background-surface">
      <Text variant="h1">Basic Layout Example</Text>
      <Text variant="body1">This example demonstrates how to use the UI components together.</Text>
      
      <Divider margin="lg" />
      
      {/* Flex layout example */}
      <Box padding="md" margin="md" border="light" borderRadius="md">
        <Text variant="h2">Flex Layout</Text>
        <Text variant="body2">A flexible box layout with items aligned in a row.</Text>
        
        <Flex direction="row" align="center" justify="space-between" gap="md" margin="md">
          <Box padding="sm" background="primary-light" borderRadius="sm">Item 1</Box>
          <Box padding="sm" background="primary-light" borderRadius="sm">Item 2</Box>
          <Box padding="sm" background="primary-light" borderRadius="sm">Item 3</Box>
        </Flex>
      </Box>
      
      {/* Stack layout example */}
      <Box padding="md" margin="md" border="light" borderRadius="md">
        <Text variant="h2">Stack Layout</Text>
        <Text variant="body2">A vertical stack with consistent spacing between items.</Text>
        
        <Stack spacing="md" margin="md">
          <Box padding="sm" background="info-light" borderRadius="sm">Stack Item 1</Box>
          <Box padding="sm" background="info-light" borderRadius="sm">Stack Item 2</Box>
          <Box padding="sm" background="info-light" borderRadius="sm">Stack Item 3</Box>
        </Stack>
      </Box>
      
      <Divider margin="lg" />
      
      {/* Grid layout example */}
      <Box padding="md" margin="md" border="light" borderRadius="md">
        <Text variant="h2">Grid Layout</Text>
        <Text variant="body2">A grid layout with three columns of different widths.</Text>
        
        <Grid 
          columns="1fr 2fr 1fr" 
          gap="md"
          rows="auto"
          margin="md"
        >
          <Box padding="sm" background="secondary-light" borderRadius="sm">Column 1</Box>
          <Box padding="sm" background="secondary-light" borderRadius="sm">Column 2</Box>
          <Box padding="sm" background="secondary-light" borderRadius="sm">Column 3</Box>
        </Grid>
      </Box>
      
      {/* Responsive grid example */}
      <Box padding="md" margin="md" border="light" borderRadius="md">
        <Text variant="h2">Responsive Grid</Text>
        <Text variant="body2">Resize the window to see the grid change from 3 columns to 1 column on small screens.</Text>
        
        <Grid 
          columns={{
            xs: "1fr",
            md: "1fr 1fr 1fr"
          }}
          gap="md"
          margin="md"
        >
          <Box padding="sm" background="accent-light" borderRadius="sm">Item 1</Box>
          <Box padding="sm" background="accent-light" borderRadius="sm">Item 2</Box>
          <Box padding="sm" background="accent-light" borderRadius="sm">Item 3</Box>
          <Box padding="sm" background="accent-light" borderRadius="sm">Item 4</Box>
          <Box padding="sm" background="accent-light" borderRadius="sm">Item 5</Box>
          <Box padding="sm" background="accent-light" borderRadius="sm">Item 6</Box>
        </Grid>
      </Box>
      
      <Divider margin="lg" />
      
      {/* Typography example */}
      <Box padding="md" margin="md" border="light" borderRadius="md">
        <Text variant="h2">Typography</Text>
        <Text variant="body2">Examples of different text variants.</Text>
        
        <Stack spacing="md" margin="md">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="subtitle1">Subtitle 1</Text>
          <Text variant="body1">Body 1 - Regular text content for paragraphs and general content.</Text>
          <Text variant="body2">Body 2 - Smaller text for secondary information.</Text>
          <Text variant="caption" color="text-secondary">Caption - Very small text for captions and labels.</Text>
          <Text variant="overline">OVERLINE - ALL CAPS TEXT FOR SECTION HEADERS</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default BasicLayout;
