/**
 * Navigation Example
 * 
 * This example demonstrates how to use the Navigation component
 * with various features and configurations.
 */

import React, { useState } from 'react';
import { Box, Text, Button, Icon, Avatar } from '../atoms';
import { SearchInput } from '../molecules';
import Navigation, { 
  NAVIGATION_VARIANTS, 
  NAVIGATION_SIZES,
  NAVIGATION_POSITIONS,
  NAVIGATION_ALIGNMENTS,
  NAVIGATION_BREAKPOINTS
} from '../organisms/Navigation';

/**
 * NavigationExample Component
 * 
 * Demonstrates the usage of the Navigation component with
 * various configurations and features.
 */
const NavigationExample = () => {
  // State for active navigation item
  const [activeItem, setActiveItem] = useState('home');
  
  // Handle navigation item click
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  
  return (
    <Box padding="lg">
      <Text variant="h1" marginBottom="md">Navigation Component</Text>
      <Text variant="body1" marginBottom="lg">
        This example demonstrates a flexible Navigation component with various features like responsive behavior, dropdown menus, and different visual styles.
      </Text>
      
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="sm">Features</Text>
        <Box display="flex" gap="md" flexWrap="wrap">
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Responsive Design</Text>
            <Text variant="body2">Automatically adapts to different screen sizes with collapsible menu.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Multiple Variants</Text>
            <Text variant="body2">Different visual styles including default, primary, secondary, and transparent.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Flexible Positioning</Text>
            <Text variant="body2">Static, fixed, or sticky positioning options for different use cases.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Customizable</Text>
            <Text variant="body2">Easily customize with brand logos, user menus, search inputs, and more.</Text>
          </Box>
        </Box>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Basic Navigation</Text>
        <Navigation>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item 
              href="/" 
              active={activeItem === 'home'} 
              onClick={() => handleItemClick('home')}
            >
              Home
            </Navigation.Item>
            <Navigation.Item 
              href="/about" 
              active={activeItem === 'about'} 
              onClick={() => handleItemClick('about')}
            >
              About
            </Navigation.Item>
            <Navigation.Item 
              href="/services" 
              active={activeItem === 'services'} 
              onClick={() => handleItemClick('services')}
            >
              Services
            </Navigation.Item>
            <Navigation.Item 
              href="/contact" 
              active={activeItem === 'contact'} 
              onClick={() => handleItemClick('contact')}
            >
              Contact
            </Navigation.Item>
          </Navigation.Items>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Navigation with Actions</Text>
        <Navigation>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/services">Services</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
          <Navigation.Actions>
            <Box className="ui-navigation-search">
              <SearchInput placeholder="Search..." size="sm" />
            </Box>
            <Button variant="primary" size="sm">Sign In</Button>
          </Navigation.Actions>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Primary Variant</Text>
        <Navigation variant={NAVIGATION_VARIANTS.PRIMARY}>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/services">Services</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
          <Navigation.Actions>
            <Button variant="secondary" size="sm">Sign In</Button>
          </Navigation.Actions>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Secondary Variant</Text>
        <Navigation variant={NAVIGATION_VARIANTS.SECONDARY}>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/services">Services</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
          <Navigation.Actions>
            <Button variant="primary" size="sm">Sign In</Button>
          </Navigation.Actions>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Transparent Variant</Text>
        <Box padding="md" background="background-subtle">
          <Navigation variant={NAVIGATION_VARIANTS.TRANSPARENT}>
            <Navigation.Brand>Brand</Navigation.Brand>
            <Navigation.Items>
              <Navigation.Item href="/" active>Home</Navigation.Item>
              <Navigation.Item href="/about">About</Navigation.Item>
              <Navigation.Item href="/services">Services</Navigation.Item>
              <Navigation.Item href="/contact">Contact</Navigation.Item>
            </Navigation.Items>
            <Navigation.Actions>
              <Button variant="primary" size="sm">Sign In</Button>
            </Navigation.Actions>
          </Navigation>
        </Box>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">With Dropdown Menu</Text>
        <Navigation>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item 
              dropdown 
              dropdownContent={
                <Box className="ui-navigation-dropdown-menu">
                  <Box className="ui-navigation-dropdown-item">Option 1</Box>
                  <Box className="ui-navigation-dropdown-item">Option 2</Box>
                  <Box className="ui-navigation-dropdown-item">Option 3</Box>
                </Box>
              }
            >
              Dropdown
            </Navigation.Item>
            <Navigation.Item href="/services">Services</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">With Icons</Text>
        <Navigation>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active icon="home">Home</Navigation.Item>
            <Navigation.Item href="/about" icon="info">About</Navigation.Item>
            <Navigation.Item href="/services" icon="settings">Services</Navigation.Item>
            <Navigation.Item href="/contact" icon="mail">Contact</Navigation.Item>
          </Navigation.Items>
          <Navigation.Actions>
            <Button variant="icon" aria-label="Notifications">
              <Icon name="bell" />
            </Button>
            <Button variant="icon" aria-label="Settings">
              <Icon name="settings" />
            </Button>
            <Box className="ui-navigation-user">
              <Avatar 
                src="https://via.placeholder.com/40" 
                alt="User" 
                size="sm"
              />
            </Box>
          </Navigation.Actions>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Responsive Navigation</Text>
        <Text variant="body1" marginBottom="md">
          Resize the browser window to see the responsive behavior. On smaller screens, the navigation collapses into a hamburger menu.
        </Text>
        <Navigation collapsible breakpoint={NAVIGATION_BREAKPOINTS.MD}>
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/services">Services</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
          <Navigation.Actions>
            <Button variant="primary" size="sm">Sign In</Button>
          </Navigation.Actions>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Different Sizes</Text>
        
        <Text variant="h3" marginBottom="sm">Small</Text>
        <Navigation size={NAVIGATION_SIZES.SMALL} marginBottom="md">
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
        </Navigation>
        
        <Text variant="h3" marginBottom="sm">Medium (Default)</Text>
        <Navigation size={NAVIGATION_SIZES.MEDIUM} marginBottom="md">
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
        </Navigation>
        
        <Text variant="h3" marginBottom="sm">Large</Text>
        <Navigation size={NAVIGATION_SIZES.LARGE} marginBottom="md">
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
        </Navigation>
      </Box>
      
      <Box marginBottom="xl">
        <Text variant="h2" marginBottom="md">Styling Options</Text>
        
        <Text variant="h3" marginBottom="sm">With Shadow</Text>
        <Navigation withShadow marginBottom="md">
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
        </Navigation>
        
        <Text variant="h3" marginBottom="sm">Without Border</Text>
        <Navigation withBorder={false} marginBottom="md">
          <Navigation.Brand>Brand</Navigation.Brand>
          <Navigation.Items>
            <Navigation.Item href="/" active>Home</Navigation.Item>
            <Navigation.Item href="/about">About</Navigation.Item>
            <Navigation.Item href="/contact">Contact</Navigation.Item>
          </Navigation.Items>
        </Navigation>
      </Box>
    </Box>
  );
};

export default NavigationExample;
