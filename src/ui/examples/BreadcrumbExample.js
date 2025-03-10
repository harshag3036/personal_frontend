import React, { useState } from 'react';
import Breadcrumb from '../molecules/Breadcrumb';
import Box from '../atoms/Box';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Card from '../molecules/Card';
import Icon from '../atoms/Icon';

/**
 * BreadcrumbExample Component
 * 
 * This example demonstrates various ways to use the Breadcrumb component
 * in a real-world application.
 */
const BreadcrumbExample = () => {
  // State to track the current page in the example
  const [currentPage, setCurrentPage] = useState('home');
  
  // Define breadcrumb items based on the current page
  const getBreadcrumbItems = () => {
    switch (currentPage) {
      case 'home':
        return [
          { label: 'Home', href: '#' }
        ];
      case 'products':
        return [
          { label: 'Home', href: '#', onClick: () => setCurrentPage('home') },
          { label: 'Products', href: '#' }
        ];
      case 'laptops':
        return [
          { label: 'Home', href: '#', onClick: () => setCurrentPage('home') },
          { label: 'Products', href: '#', onClick: () => setCurrentPage('products') },
          { label: 'Laptops', href: '#' }
        ];
      case 'macbook':
        return [
          { label: 'Home', href: '#', onClick: () => setCurrentPage('home') },
          { label: 'Products', href: '#', onClick: () => setCurrentPage('products') },
          { label: 'Laptops', href: '#', onClick: () => setCurrentPage('laptops') },
          { label: 'MacBook Pro', href: '#' }
        ];
      case 'settings':
        return [
          { label: 'Home', href: '#', onClick: () => setCurrentPage('home') },
          { label: 'Settings', href: '#' }
        ];
      case 'profile':
        return [
          { label: 'Home', href: '#', onClick: () => setCurrentPage('home') },
          { label: 'Settings', href: '#', onClick: () => setCurrentPage('settings') },
          { label: 'Profile', href: '#' }
        ];
      case 'deep-nested':
        return [
          { label: 'Home', href: '#', onClick: () => setCurrentPage('home') },
          { label: 'Category 1', href: '#' },
          { label: 'Category 2', href: '#' },
          { label: 'Category 3', href: '#' },
          { label: 'Category 4', href: '#' },
          { label: 'Category 5', href: '#' },
          { label: 'Deep Nested Page', href: '#' }
        ];
      default:
        return [
          { label: 'Home', href: '#' }
        ];
    }
  };
  
  // Render content based on the current page
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">Home Page</Text>
            <Text marginBottom="lg">Welcome to the Breadcrumb example. Click on the links below to navigate between pages.</Text>
            
            <Flex gap="md" flexWrap="wrap">
              <Button onClick={() => setCurrentPage('products')}>Go to Products</Button>
              <Button onClick={() => setCurrentPage('settings')}>Go to Settings</Button>
              <Button onClick={() => setCurrentPage('deep-nested')}>Go to Deep Nested Page</Button>
            </Flex>
          </Box>
        );
      case 'products':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">Products</Text>
            <Text marginBottom="lg">Browse our product categories.</Text>
            
            <Flex gap="md" flexWrap="wrap">
              <Button onClick={() => setCurrentPage('laptops')}>View Laptops</Button>
              <Button onClick={() => setCurrentPage('home')}>Back to Home</Button>
            </Flex>
          </Box>
        );
      case 'laptops':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">Laptops</Text>
            <Text marginBottom="lg">Browse our laptop selection.</Text>
            
            <Flex gap="md" flexDirection="column">
              <Card padding="md" onClick={() => setCurrentPage('macbook')} style={{ cursor: 'pointer' }}>
                <Flex alignItems="center" gap="sm">
                  <Icon name="laptop" />
                  <Text>MacBook Pro</Text>
                </Flex>
              </Card>
              
              <Button onClick={() => setCurrentPage('products')}>Back to Products</Button>
            </Flex>
          </Box>
        );
      case 'macbook':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">MacBook Pro</Text>
            <Text marginBottom="lg">Product details for MacBook Pro.</Text>
            
            <Button onClick={() => setCurrentPage('laptops')}>Back to Laptops</Button>
          </Box>
        );
      case 'settings':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">Settings</Text>
            <Text marginBottom="lg">Manage your account settings.</Text>
            
            <Flex gap="md" flexWrap="wrap">
              <Button onClick={() => setCurrentPage('profile')}>View Profile</Button>
              <Button onClick={() => setCurrentPage('home')}>Back to Home</Button>
            </Flex>
          </Box>
        );
      case 'profile':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">Profile</Text>
            <Text marginBottom="lg">Your profile information.</Text>
            
            <Button onClick={() => setCurrentPage('settings')}>Back to Settings</Button>
          </Box>
        );
      case 'deep-nested':
        return (
          <Box padding="lg">
            <Text variant="h1" marginBottom="md">Deep Nested Page</Text>
            <Text marginBottom="lg">This page demonstrates breadcrumb with many levels.</Text>
            
            <Button onClick={() => setCurrentPage('home')}>Back to Home</Button>
          </Box>
        );
      default:
        return null;
    }
  };
  
  return (
    <Box>
      {/* Default breadcrumb */}
      <Box padding="md" backgroundColor="var(--ui-color-background-subtle)">
        <Breadcrumb 
          items={getBreadcrumbItems()} 
          showHomeIcon={true}
          homeIconName="home"
        />
      </Box>
      
      {/* Compact breadcrumb with chevron separator */}
      {currentPage === 'deep-nested' && (
        <Box padding="md" marginTop="md" backgroundColor="var(--ui-color-background-subtle)">
          <Text variant="caption" marginBottom="xs">Compact with max items:</Text>
          <Breadcrumb 
            items={getBreadcrumbItems()} 
            variant="compact"
            separatorType="chevron"
            maxItems={4}
            collapsedLabel="..."
          />
        </Box>
      )}
      
      {/* Expanded breadcrumb with arrow separator */}
      {currentPage !== 'home' && (
        <Box padding="md" marginTop="md" backgroundColor="var(--ui-color-background-subtle)">
          <Text variant="caption" marginBottom="xs">Expanded with arrow separator:</Text>
          <Breadcrumb 
            items={getBreadcrumbItems()} 
            variant="expanded"
            separatorType="arrow"
          />
        </Box>
      )}
      
      {/* Page content */}
      <Box marginTop="lg">
        {renderPageContent()}
      </Box>
    </Box>
  );
};

export default BreadcrumbExample;
