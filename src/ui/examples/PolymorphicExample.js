/**
 * Polymorphic Example Component
 * 
 * This component demonstrates the use of polymorphic components in the UI library.
 */

import React from 'react';
import { Box, Flex, Text, Button, Card } from '../';
import { Polymorphic, withPolymorphic } from '../utilities/polymorphic';

/**
 * Custom component that will be made polymorphic
 */
const CustomComponent = ({ children, className = '', ...props }) => {
  return (
    <div className={`custom-component ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Make the custom component polymorphic
 */
const PolymorphicCustomComponent = withPolymorphic({ defaultAs: 'div' })(CustomComponent);

/**
 * Polymorphic Example Component
 * 
 * @returns {JSX.Element} Polymorphic example component
 */
const PolymorphicExample = () => {
  return (
    <Box padding="lg" backgroundColor="background.primary">
      <Text variant="h1" marginBottom="md">Polymorphic Components Example</Text>
      
      <Text variant="body1" marginBottom="lg">
        This example demonstrates the use of polymorphic components in the UI library.
        Polymorphic components can be rendered as different HTML elements using the `as` prop.
      </Text>
      
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h2">Basic Polymorphic Component</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            The `Polymorphic` component can be rendered as any HTML element:
          </Text>
          
          <Flex direction="column" gap="md" marginBottom="md">
            <Polymorphic as="div" style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
              This is a div
            </Polymorphic>
            
            <Polymorphic as="section" style={{ padding: '16px', backgroundColor: '#e0e0e0' }}>
              This is a section
            </Polymorphic>
            
            <Polymorphic as="button" style={{ padding: '16px', backgroundColor: '#d0d0d0' }}>
              This is a button
            </Polymorphic>
            
            <Polymorphic as="a" href="#" style={{ padding: '16px', backgroundColor: '#c0c0c0' }}>
              This is a link
            </Polymorphic>
          </Flex>
        </Card.Body>
      </Card>
      
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h2">Polymorphic HOC</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            The `withPolymorphic` higher-order component can make any component polymorphic:
          </Text>
          
          <Flex direction="column" gap="md" marginBottom="md">
            <PolymorphicCustomComponent style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
              This is the default (div)
            </PolymorphicCustomComponent>
            
            <PolymorphicCustomComponent as="section" style={{ padding: '16px', backgroundColor: '#e0e0e0' }}>
              This is a section
            </PolymorphicCustomComponent>
            
            <PolymorphicCustomComponent as="button" style={{ padding: '16px', backgroundColor: '#d0d0d0' }}>
              This is a button
            </PolymorphicCustomComponent>
            
            <PolymorphicCustomComponent as="a" href="#" style={{ padding: '16px', backgroundColor: '#c0c0c0' }}>
              This is a link
            </PolymorphicCustomComponent>
          </Flex>
        </Card.Body>
      </Card>
      
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h2">Practical Examples</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            Here are some practical examples of polymorphic components:
          </Text>
          
          <Flex direction="column" gap="md" marginBottom="md">
            {/* Text component as different heading levels */}
            <Text as="h1" style={{ fontSize: '2rem', marginBottom: '8px' }}>
              This is an h1 heading
            </Text>
            
            <Text as="h2" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              This is an h2 heading
            </Text>
            
            <Text as="p" style={{ fontSize: '1rem', marginBottom: '8px' }}>
              This is a paragraph
            </Text>
            
            {/* Button component as a link */}
            <Button as="a" href="#" variant="primary">
              This is a button that looks like a link
            </Button>
            
            {/* Box component as a semantic HTML element */}
            <Box as="article" padding="md" backgroundColor="background.secondary">
              <Text as="h3" marginBottom="sm">Article Title</Text>
              <Text as="p">This is an article content.</Text>
            </Box>
          </Flex>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Header>
          <Text variant="h2">Benefits of Polymorphic Components</Text>
        </Card.Header>
        <Card.Body>
          <Text variant="body1" marginBottom="md">
            Polymorphic components offer several benefits:
          </Text>
          
          <Box as="ul" style={{ paddingLeft: '20px' }}>
            <Box as="li" marginBottom="sm">
              <Text>
                <strong>Semantic HTML:</strong> Use the appropriate HTML element for the context while maintaining consistent styling.
              </Text>
            </Box>
            
            <Box as="li" marginBottom="sm">
              <Text>
                <strong>Accessibility:</strong> Improve accessibility by using the correct semantic elements.
              </Text>
            </Box>
            
            <Box as="li" marginBottom="sm">
              <Text>
                <strong>Flexibility:</strong> Reuse the same component in different contexts with different behaviors.
              </Text>
            </Box>
            
            <Box as="li" marginBottom="sm">
              <Text>
                <strong>Consistency:</strong> Maintain consistent styling and behavior across different HTML elements.
              </Text>
            </Box>
          </Box>
        </Card.Body>
      </Card>
    </Box>
  );
};

export default PolymorphicExample;
