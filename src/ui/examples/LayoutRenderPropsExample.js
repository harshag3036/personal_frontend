import React, { useState } from 'react';
import { Box, Text, Flex, Button, Card, Icon, Stack, Grid } from '../index';

/**
 * Layout Render Props Example
 * 
 * This example demonstrates how to use the Layout component with render props pattern
 * to create highly customized application layouts with complete control over rendering.
 */
const LayoutRenderPropsExample = () => {
  // Layout configuration
  const [collapsed, setCollapsed] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [sidebarPosition, setSidebarPosition] = useState('left');
  const [theme, setTheme] = useState('light');
  const [contentLayout, setContentLayout] = useState('default'); // default, article, dashboard

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Toggle sidebar position
  const toggleSidebarPosition = () => {
    setSidebarPosition(sidebarPosition === 'left' ? 'right' : 'left');
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Toggle header visibility
  const toggleHeader = () => {
    setShowHeader(!showHeader);
  };

  // Toggle footer visibility
  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  // Set content layout
  const setLayout = (layout) => {
    setContentLayout(layout);
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Layout with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how the Layout component could use the render props pattern
        to create highly customized application layouts with complete control over rendering.
      </Text>
      
      {/* Layout Configuration Controls */}
      <Card padding="md" marginBottom="xl">
        <Text as="h3" marginBottom="md">Layout Configuration</Text>
        <Flex gap="md" flexWrap="wrap">
          <Button 
            variant={collapsed ? 'outline' : 'primary'}
            size="sm"
            onClick={toggleCollapsed}
          >
            {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebarPosition}
          >
            Sidebar: {sidebarPosition === 'left' ? 'Left' : 'Right'}
          </Button>
          
          <Button
            variant={showHeader ? 'primary' : 'outline'}
            size="sm"
            onClick={toggleHeader}
          >
            {showHeader ? 'Hide Header' : 'Show Header'}
          </Button>
          
          <Button
            variant={showFooter ? 'primary' : 'outline'}
            size="sm"
            onClick={toggleFooter}
          >
            {showFooter ? 'Hide Footer' : 'Show Footer'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >
            Theme: {theme === 'light' ? 'Light' : 'Dark'}
          </Button>
        </Flex>
        
        <Box marginTop="md">
          <Text marginBottom="xs">Content Layout:</Text>
          <Flex gap="sm">
            <Button 
              size="sm"
              variant={contentLayout === 'default' ? 'primary' : 'outline'}
              onClick={() => setLayout('default')}
            >
              Default
            </Button>
            <Button 
              size="sm"
              variant={contentLayout === 'article' ? 'primary' : 'outline'}
              onClick={() => setLayout('article')}
            >
              Article
            </Button>
            <Button 
              size="sm"
              variant={contentLayout === 'dashboard' ? 'primary' : 'outline'}
              onClick={() => setLayout('dashboard')}
            >
              Dashboard
            </Button>
          </Flex>
        </Box>
      </Card>
      
      {/* Layout Preview */}
      <Box 
        border="1px solid" 
        borderColor="borderColor" 
        borderRadius="md" 
        overflow="hidden" 
        height="500px"
        backgroundColor={theme === 'light' ? 'white' : 'gray.900'}
        color={theme === 'light' ? 'textColor' : 'white'}
      >
        {/* Header */}
        {showHeader && (
          <Box 
            height="64px" 
            padding="md" 
            borderBottom="1px solid" 
            borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
            backgroundColor={theme === 'light' ? 'background' : 'gray.800'}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" gap="md">
                <Icon name="layout" size="md" color="primary" />
                <Text fontWeight="bold">Application Header</Text>
              </Flex>
              
              <Flex alignItems="center" gap="md">
                <Icon name="search" size="sm" />
                <Icon name="bell" size="sm" />
                <Icon name="user" size="sm" />
              </Flex>
            </Flex>
          </Box>
        )}
        
        {/* Main Content Area */}
        <Flex height={showHeader && showFooter ? 'calc(500px - 64px - 64px)' : 
                      showHeader ? 'calc(500px - 64px)' :
                      showFooter ? 'calc(500px - 64px)' : '500px'}>
          {/* Sidebar */}
          <Box 
            width={collapsed ? '60px' : '240px'} 
            padding={collapsed ? 'xs' : 'md'}
            borderRight={sidebarPosition === 'left' ? '1px solid' : 'none'}
            borderLeft={sidebarPosition === 'right' ? '1px solid' : 'none'}
            borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
            backgroundColor={theme === 'light' ? 'white' : 'gray.900'}
            order={sidebarPosition === 'left' ? 0 : 2}
          >
            <Stack spacing={collapsed ? 'lg' : 'md'}>
              <Flex 
                alignItems="center" 
                justifyContent={collapsed ? 'center' : 'flex-start'} 
                gap="sm"
              >
                <Icon name="home" size="sm" />
                {!collapsed && <Text>Home</Text>}
              </Flex>
              <Flex 
                alignItems="center" 
                justifyContent={collapsed ? 'center' : 'flex-start'} 
                gap="sm"
              >
                <Icon name="bar-chart-2" size="sm" />
                {!collapsed && <Text>Analytics</Text>}
              </Flex>
              <Flex 
                alignItems="center" 
                justifyContent={collapsed ? 'center' : 'flex-start'} 
                gap="sm"
              >
                <Icon name="users" size="sm" />
                {!collapsed && <Text>Users</Text>}
              </Flex>
              <Flex 
                alignItems="center" 
                justifyContent={collapsed ? 'center' : 'flex-start'} 
                gap="sm"
              >
                <Icon name="settings" size="sm" />
                {!collapsed && <Text>Settings</Text>}
              </Flex>
            </Stack>
          </Box>
          
          {/* Main Content */}
          <Box 
            flex="1" 
            padding="md" 
            backgroundColor={theme === 'light' ? 'gray.50' : 'gray.800'}
            overflowY="auto"
            order="1"
          >
            {contentLayout === 'default' && (
              <Stack spacing="md">
                <Text as="h2">Default Content Layout</Text>
                <Text>This is a standard layout with a flexible content area.</Text>
                
                <Box 
                  padding="md" 
                  backgroundColor={theme === 'light' ? 'white' : 'gray.900'} 
                  borderRadius="md"
                  border="1px solid"
                  borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
                >
                  <Text as="h3" marginBottom="sm">Content Block</Text>
                  <Text>
                    The default layout adapts to various content types and screen sizes. 
                    It's suitable for general-purpose applications with mixed content.
                  </Text>
                </Box>
              </Stack>
            )}
            
            {contentLayout === 'article' && (
              <Box maxWidth="800px" marginX="auto">
                <Text as="h1" fontSize="2xl" marginBottom="sm">Article Layout</Text>
                <Text color="textColorSecondary" marginBottom="lg">Published on March 18, 2025</Text>
                
                <Text marginBottom="md">
                  This layout is optimized for reading experiences like articles, blog posts, and documentation.
                  It uses a centered column with comfortable line lengths for readability.
                </Text>
                
                <Text as="h2" marginTop="lg" marginBottom="sm">Section Heading</Text>
                <Text marginBottom="md">
                  The article layout maintains consistent spacing and typography to enhance readability.
                  It's designed to keep the reader's focus on the content with minimal distractions.
                </Text>
                
                <Box 
                  padding="md" 
                  backgroundColor={theme === 'light' ? 'background' : 'gray.700'} 
                  borderRadius="md"
                  marginY="lg"
                >
                  <Text fontStyle="italic">
                    "Articles, blog posts, and long-form content benefit from dedicated layouts that prioritize readability and engagement."
                  </Text>
                </Box>
                
                <Text>
                  The layout can be customized further with typography adjustments, column width variations, and additional elements like pull quotes and imagery.
                </Text>
              </Box>
            )}
            
            {contentLayout === 'dashboard' && (
              <Box>
                <Flex justifyContent="space-between" alignItems="center" marginBottom="lg">
                  <Text as="h2">Dashboard Layout</Text>
                  <Button size="sm" variant="primary">Export Data</Button>
                </Flex>
                
                <Grid 
                  templateColumns="repeat(12, 1fr)" 
                  gap="md"
                >
                  {/* Summary Stats */}
                  <Box gridColumn={{ base: 'span 12', md: 'span 3' }}>
                    <Card padding="md">
                      <Text color="textColorSecondary" fontSize="sm">Total Users</Text>
                      <Text as="h3" fontSize="2xl">2,845</Text>
                      <Flex alignItems="center" gap="xs" color="success">
                        <Icon name="arrow-up" size="xs" />
                        <Text fontSize="sm">12%</Text>
                      </Flex>
                    </Card>
                  </Box>
                  
                  <Box gridColumn={{ base: 'span 12', md: 'span 3' }}>
                    <Card padding="md">
                      <Text color="textColorSecondary" fontSize="sm">Revenue</Text>
                      <Text as="h3" fontSize="2xl">$8,423</Text>
                      <Flex alignItems="center" gap="xs" color="error">
                        <Icon name="arrow-down" size="xs" />
                        <Text fontSize="sm">2%</Text>
                      </Flex>
                    </Card>
                  </Box>
                  
                  <Box gridColumn={{ base: 'span 12', md: 'span 3' }}>
                    <Card padding="md">
                      <Text color="textColorSecondary" fontSize="sm">New Orders</Text>
                      <Text as="h3" fontSize="2xl">145</Text>
                      <Flex alignItems="center" gap="xs" color="success">
                        <Icon name="arrow-up" size="xs" />
                        <Text fontSize="sm">8%</Text>
                      </Flex>
                    </Card>
                  </Box>
                  
                  <Box gridColumn={{ base: 'span 12', md: 'span 3' }}>
                    <Card padding="md">
                      <Text color="textColorSecondary" fontSize="sm">Conversion Rate</Text>
                      <Text as="h3" fontSize="2xl">3.2%</Text>
                      <Flex alignItems="center" gap="xs" color="success">
                        <Icon name="arrow-up" size="xs" />
                        <Text fontSize="sm">0.5%</Text>
                      </Flex>
                    </Card>
                  </Box>
                  
                  {/* Chart Area */}
                  <Box gridColumn={{ base: 'span 12', md: 'span 8' }}>
                    <Card padding="md" height="240px">
                      <Text as="h3" marginBottom="sm">Performance Metrics</Text>
                      <Box 
                        height="180px" 
                        backgroundColor={theme === 'light' ? 'background' : 'gray.700'} 
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text>Chart Visualization</Text>
                      </Box>
                    </Card>
                  </Box>
                  
                  {/* Activity Feed */}
                  <Box gridColumn={{ base: 'span 12', md: 'span 4' }}>
                    <Card padding="md" height="240px">
                      <Text as="h3" marginBottom="sm">Recent Activity</Text>
                      <Stack spacing="sm">
                        <Flex gap="sm" alignItems="flex-start">
                          <Icon name="user-plus" size="sm" />
                          <Box>
                            <Text fontSize="sm">New user registered</Text>
                            <Text fontSize="xs" color="textColorSecondary">10 minutes ago</Text>
                          </Box>
                        </Flex>
                        <Flex gap="sm" alignItems="flex-start">
                          <Icon name="shopping-cart" size="sm" />
                          <Box>
                            <Text fontSize="sm">New order placed</Text>
                            <Text fontSize="xs" color="textColorSecondary">1 hour ago</Text>
                          </Box>
                        </Flex>
                        <Flex gap="sm" alignItems="flex-start">
                          <Icon name="mail" size="sm" />
                          <Box>
                            <Text fontSize="sm">Newsletter sent</Text>
                            <Text fontSize="xs" color="textColorSecondary">3 hours ago</Text>
                          </Box>
                        </Flex>
                      </Stack>
                    </Card>
                  </Box>
                </Grid>
              </Box>
            )}
          </Box>
        </Flex>
        
        {/* Footer */}
        {showFooter && (
          <Box 
            height="64px" 
            padding="md" 
            borderTop="1px solid" 
            borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
            backgroundColor={theme === 'light' ? 'background' : 'gray.800'}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm">© 2025 Your Company</Text>
              
              <Flex gap="md">
                <Text fontSize="sm">Terms</Text>
                <Text fontSize="sm">Privacy</Text>
                <Text fontSize="sm">Contact</Text>
              </Flex>
            </Flex>
          </Box>
        )}
      </Box>
      
      {/* Documentation */}
      <Card padding="md" marginTop="xl">
        <Text as="h3" marginBottom="md">Using Render Props for Layout</Text>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px', 
          overflowX: 'auto', 
          fontSize: '0.9em' 
        }}>
{`<Layout
  showHeader={showHeader}
  showFooter={showFooter}
  sidebarPosition={sidebarPosition}
  sidebarCollapsed={collapsed}
  theme={theme}
  contentLayout={contentLayout}
>
  {({
    showHeader,
    showFooter,
    sidebarPosition,
    isSidebarCollapsed,
    theme,
    contentLayout,
    toggleSidebar,
    setTheme,
    isSmallScreen,
    // Additional context
  }) => (
    <Box>
      {/* Custom header rendering */}
      {showHeader && (
        <YourCustomHeader
          theme={theme}
          onThemeChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          onMenuToggle={toggleSidebar}
        />
      )}
      
      {/* Main content area */}
      <Flex height={calculatedContentHeight}>
        {/* Custom sidebar rendering */}
        <YourCustomSidebar
          position={sidebarPosition}
          isCollapsed={isSidebarCollapsed}
          theme={theme}
          isSmallScreen={isSmallScreen}
        />
        
        {/* Custom content container */}
        <YourCustomContent
          theme={theme}
          layout={contentLayout}
          sidebarPosition={sidebarPosition}
          isSidebarCollapsed={isSidebarCollapsed}
        >
          {/* Your page content goes here */}
          {children}
        </YourCustomContent>
      </Flex>
      
      {/* Custom footer rendering */}
      {showFooter && (
        <YourCustomFooter theme={theme} />
      )}
    </Box>
  )}
</Layout>`}
        </pre>
        
        <Text as="h3" marginTop="lg" marginBottom="md">Benefits of Render Props for Layout:</Text>
        <ul>
          <li>Custom layout configurations for different sections of your application</li>
          <li>Specialized content containers (article, dashboard, multi-column, etc.)</li>
          <li>Context-aware responsive layouts</li>
          <li>Application-specific header and footer implementations</li>
          <li>Custom sidebar layouts and interactions</li>
          <li>Theme-specific layout variations</li>
        </ul>
        
        <Text marginTop="md">
          The Layout component is particularly well-suited for the render props pattern because it needs to be 
          highly customizable across different applications, while still providing consistent structure and 
          responsive behavior. This approach lets you maintain the core layout logic in a reusable component 
          while giving complete control over the rendering of each layout section.
        </Text>
      </Card>
    </Box>
  );
};

export default LayoutRenderPropsExample;
