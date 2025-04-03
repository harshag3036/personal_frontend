import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Card, Icon, Stack, Dropdown } from '../index';

/**
 * Navigation Render Props Example
 * 
 * This example demonstrates how to use the Navigation component with render props pattern
 * to create a highly customized navigation interface with complete control over rendering.
 */
const NavigationRenderPropsExample = () => {
  // Sample navigation structure
  const [routes, setRoutes] = useState([
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: 'grid', 
      path: '/dashboard',
      active: true 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: 'bar-chart-2', 
      path: '/analytics',
      active: false,
      badge: {
        text: 'New',
        variant: 'success'
      }
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: 'users', 
      path: '/users',
      active: false 
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: 'folder', 
      path: '/projects',
      active: false,
      children: [
        { id: 'active', label: 'Active Projects', path: '/projects/active' },
        { id: 'archived', label: 'Archived Projects', path: '/projects/archived' },
        { id: 'create', label: 'Create Project', path: '/projects/create' }
      ]
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: 'settings', 
      path: '/settings',
      active: false,
      children: [
        { id: 'profile', label: 'Profile', path: '/settings/profile' },
        { id: 'security', label: 'Security', path: '/settings/security' },
        { id: 'preferences', label: 'Preferences', path: '/settings/preferences' },
        { id: 'notifications', label: 'Notifications', path: '/settings/notifications' }
      ]
    }
  ]);

  // Navigation state
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [theme, setTheme] = useState('light');

  // User state
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://ui.shadcn/avatars/01.png',
    role: 'Administrator'
  });

  // Handle route change
  const handleRouteChange = (routeId) => {
    setRoutes(prevRoutes => 
      prevRoutes.map(route => ({
        ...route,
        active: route.id === routeId
      }))
    );
  };

  // Toggle submenu expanded state
  const toggleSubmenu = (routeId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [routeId]: !prev[routeId]
    }));
  };

  // Toggle navigation collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Render different navigation layouts
  const renderHorizontalNavigation = () => {
    return (
      <Box
        backgroundColor={theme === 'light' ? 'white' : 'gray.900'}
        color={theme === 'light' ? 'textColor' : 'white'}
        borderBottom="1px solid"
        borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
        paddingY="md"
        width="100%"
      >
        <Flex 
          justifyContent="space-between" 
          alignItems="center"
          paddingX="md"
        >
          {/* Logo */}
          <Flex alignItems="center" gap="md">
            <Icon name="zap" size="md" color="primary" />
            <Text as="h2" fontWeight="bold">AppName</Text>
          </Flex>
          
          {/* Main Navigation - Desktop */}
          <Flex 
            alignItems="center"
            gap="md"
            display={{ base: 'none', lg: 'flex' }}
          >
            {routes.map(route => (
              <Box key={route.id} position="relative">
                <Button
                  variant={route.active ? 'subtle' : 'ghost'}
                  onClick={() => route.children ? toggleSubmenu(route.id) : handleRouteChange(route.id)}
                  rightIcon={route.children ? expandedMenus[route.id] ? 'chevron-up' : 'chevron-down' : null}
                >
                  <Flex alignItems="center" gap="xs">
                    <Icon name={route.icon} size="sm" />
                    <Text>{route.label}</Text>
                    {route.badge && (
                      <Box 
                        as="span"
                        backgroundColor={`${route.badge.variant}.500`}
                        color="white"
                        borderRadius="full"
                        fontSize="xs"
                        paddingX="xs"
                        marginLeft="xs"
                      >
                        {route.badge.text}
                      </Box>
                    )}
                  </Flex>
                </Button>
                
                {route.children && expandedMenus[route.id] && (
                  <Box
                    position="absolute"
                    top="100%"
                    left="0"
                    backgroundColor={theme === 'light' ? 'white' : 'gray.800'}
                    borderRadius="md"
                    boxShadow="md"
                    marginTop="xs"
                    width="200px"
                    zIndex="dropdown"
                    border="1px solid"
                    borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
                  >
                    <Stack padding="xs">
                      {route.children.map(child => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={() => handleRouteChange(`${route.id}.${child.id}`)}
                        >
                          {child.label}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            ))}
          </Flex>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            display={{ base: 'flex', lg: 'none' }}
            onClick={toggleMobileMenu}
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size="md" />
          </Button>
          
          {/* User Menu */}
          <Flex 
            alignItems="center"
            gap="md"
            display={{ base: 'none', lg: 'flex' }}
          >
            <Button 
              variant="ghost" 
              onClick={toggleTheme}
            >
              <Icon name={theme === 'light' ? 'moon' : 'sun'} size="sm" />
            </Button>
            
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="ghost">
                  <Flex alignItems="center" gap="sm">
                    <Box
                      width="32px"
                      height="32px"
                      borderRadius="full"
                      overflow="hidden"
                      backgroundColor="gray.100"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Box>
                      <Text fontWeight="medium">{user.name}</Text>
                      <Text fontSize="xs" color="textColorSecondary">{user.role}</Text>
                    </Box>
                  </Flex>
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item icon="user">Profile</Dropdown.Item>
                <Dropdown.Item icon="settings">Settings</Dropdown.Item>
                <Dropdown.Item icon="help-circle">Help</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item icon="log-out">Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Flex>
        </Flex>
        
        {/* Mobile Navigation Menu */}
        {mobileOpen && (
          <Box 
            marginTop="md" 
            padding="md"
            borderTop="1px solid"
            borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
          >
            <Stack spacing="sm">
              {routes.map(route => (
                <Box key={route.id}>
                  <Button
                    variant={route.active ? 'subtle' : 'ghost'}
                    justifyContent="flex-start"
                    width="100%"
                    onClick={() => route.children ? toggleSubmenu(route.id) : handleRouteChange(route.id)}
                  >
                    <Flex 
                      alignItems="center" 
                      gap="sm"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Flex alignItems="center" gap="sm">
                        <Icon name={route.icon} size="sm" />
                        <Text>{route.label}</Text>
                        {route.badge && (
                          <Box 
                            as="span"
                            backgroundColor={`${route.badge.variant}.500`}
                            color="white"
                            borderRadius="full"
                            fontSize="xs"
                            paddingX="xs"
                          >
                            {route.badge.text}
                          </Box>
                        )}
                      </Flex>
                      {route.children && (
                        <Icon name={expandedMenus[route.id] ? 'chevron-up' : 'chevron-down'} size="sm" />
                      )}
                    </Flex>
                  </Button>
                  
                  {route.children && expandedMenus[route.id] && (
                    <Box 
                      paddingLeft="xl" 
                      marginTop="xs"
                    >
                      <Stack spacing="xs">
                        {route.children.map(child => (
                          <Button
                            key={child.id}
                            variant="ghost"
                            justifyContent="flex-start"
                            onClick={() => handleRouteChange(`${route.id}.${child.id}`)}
                          >
                            {child.label}
                          </Button>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Box>
              ))}
              
              {/* Mobile User Menu */}
              <Box 
                paddingTop="md" 
                marginTop="md" 
                borderTop="1px solid"
                borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap="sm">
                    <Box
                      width="40px"
                      height="40px"
                      borderRadius="full"
                      overflow="hidden"
                      backgroundColor="gray.100"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Box>
                      <Text fontWeight="medium">{user.name}</Text>
                      <Text fontSize="xs" color="textColorSecondary">{user.role}</Text>
                    </Box>
                  </Flex>
                  
                  <Button 
                    variant="ghost" 
                    onClick={toggleTheme}
                  >
                    <Icon name={theme === 'light' ? 'moon' : 'sun'} size="sm" />
                  </Button>
                </Flex>
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    );
  };

  const renderVerticalNavigation = () => {
    return (
      <Box
        backgroundColor={theme === 'light' ? 'white' : 'gray.900'}
        color={theme === 'light' ? 'textColor' : 'white'}
        borderRight="1px solid"
        borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
        width={collapsed ? '80px' : '250px'}
        height="100vh"
        transition="width 0.2s ease"
      >
        {/* Header */}
        <Flex 
          alignItems="center" 
          justifyContent={collapsed ? 'center' : 'space-between'}
          padding="md"
          borderBottom="1px solid"
          borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
        >
          {!collapsed && (
            <Flex alignItems="center" gap="sm">
              <Icon name="zap" size="md" color="primary" />
              <Text as="h2" fontWeight="bold">AppName</Text>
            </Flex>
          )}
          
          {collapsed && (
            <Icon name="zap" size="md" color="primary" />
          )}
          
          <Button 
            variant="ghost" 
            onClick={toggleCollapsed}
            display={collapsed ? 'none' : 'flex'}
          >
            <Icon name="chevrons-left" size="sm" />
          </Button>
        </Flex>
        
        {/* Navigation Items */}
        <Box 
          padding={collapsed ? 'xs' : 'md'}
          overflowY="auto"
          height="calc(100vh - 140px)"
        >
          <Stack spacing={collapsed ? 'lg' : 'sm'}>
            {routes.map(route => (
              <Box key={route.id}>
                <Button
                  variant={route.active ? 'subtle' : 'ghost'}
                  justifyContent={collapsed ? 'center' : 'flex-start'}
                  width="100%"
                  onClick={() => route.children && !collapsed ? toggleSubmenu(route.id) : handleRouteChange(route.id)}
                  title={collapsed ? route.label : undefined}
                >
                  <Flex 
                    alignItems="center" 
                    gap={collapsed ? '0' : 'sm'}
                    width="100%"
                    justifyContent={collapsed ? 'center' : 'space-between'}
                  >
                    <Flex alignItems="center" gap={collapsed ? '0' : 'sm'}>
                      <Icon name={route.icon} size="sm" />
                      {!collapsed && <Text>{route.label}</Text>}
                      {!collapsed && route.badge && (
                        <Box 
                          as="span"
                          backgroundColor={`${route.badge.variant}.500`}
                          color="white"
                          borderRadius="full"
                          fontSize="xs"
                          paddingX="xs"
                        >
                          {route.badge.text}
                        </Box>
                      )}
                      {collapsed && route.badge && (
                        <Box
                          position="absolute"
                          top="0"
                          right="0"
                          width="8px"
                          height="8px"
                          borderRadius="full"
                          backgroundColor={`${route.badge.variant}.500`}
                        />
                      )}
                    </Flex>
                    {!collapsed && route.children && (
                      <Icon name={expandedMenus[route.id] ? 'chevron-up' : 'chevron-down'} size="sm" />
                    )}
                  </Flex>
                </Button>
                
                {!collapsed && route.children && expandedMenus[route.id] && (
                  <Box paddingLeft="xl" marginTop="xs">
                    <Stack spacing="xs">
                      {route.children.map(child => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={() => handleRouteChange(`${route.id}.${child.id}`)}
                        >
                          {child.label}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
        
        {/* Footer */}
        <Box 
          padding={collapsed ? 'xs' : 'md'} 
          borderTop="1px solid"
          borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
          marginTop="auto"
        >
          {collapsed ? (
            <Flex flexDirection="column" alignItems="center" gap="md">
              <Button 
                variant="ghost" 
                onClick={toggleTheme}
              >
                <Icon name={theme === 'light' ? 'moon' : 'sun'} size="sm" />
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={toggleCollapsed}
              >
                <Icon name="chevrons-right" size="sm" />
              </Button>
              
              <Box
                width="32px"
                height="32px"
                borderRadius="full"
                overflow="hidden"
                backgroundColor="gray.100"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Flex>
          ) : (
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" gap="sm">
                <Box
                  width="40px"
                  height="40px"
                  borderRadius="full"
                  overflow="hidden"
                  backgroundColor="gray.100"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium">{user.name}</Text>
                  <Text fontSize="xs" color="textColorSecondary">{user.role}</Text>
                </Box>
              </Flex>
              
              <Button 
                variant="ghost" 
                onClick={toggleTheme}
              >
                <Icon name={theme === 'light' ? 'moon' : 'sun'} size="sm" />
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Navigation with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the Navigation component with render props pattern
        to create highly customized navigation interfaces with complete control over rendering.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Horizontal Navigation Example */}
        <Box 
          width="100%" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          overflow="hidden"
          marginBottom="xl"
        >
          <Text padding="md" fontSize="lg" fontWeight="bold">Horizontal Navigation Example</Text>
          {renderHorizontalNavigation()}
          
          <Box padding="lg" backgroundColor="gray.50" minHeight="300px">
            <Text fontSize="xl" fontWeight="bold">Content Area</Text>
            <Text color="textColorSecondary">Main content would appear here.</Text>
          </Box>
        </Box>
        
        {/* Vertical Navigation Example */}
        <Box 
          width="100%" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          overflow="hidden"
          marginBottom="lg"
        >
          <Text padding="md" fontSize="lg" fontWeight="bold">Vertical Navigation Example</Text>
          <Flex>
            {renderVerticalNavigation()}
            
            <Box padding="lg" backgroundColor="gray.50" flex="1" minHeight="400px">
              <Text fontSize="xl" fontWeight="bold">Content Area</Text>
              <Text color="textColorSecondary">Main content would appear here.</Text>
            </Box>
          </Flex>
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">Navigation with Render Props</Text>
            <Text marginBottom="md">
              The Navigation component would benefit greatly from the render props pattern, 
              allowing for completely customized navigation layouts, styling, and behaviors
              while leveraging the component's state management capabilities.
            </Text>
            
            <Text as="h4" marginBottom="sm">Benefits of Render Props for Navigation:</Text>
            <ul>
              <li>Custom styling and layout for different navigation patterns (horizontal, vertical, etc.)</li>
              <li>Role-based navigation item visibility and permissions</li>
              <li>Custom animations and transitions for menus and dropdowns</li>
              <li>Integration with application routing and state management</li>
              <li>Support for complex nested navigation structures</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<Navigation
  routes={routes}
  variant="vertical"
  collapsible={true}
  defaultCollapsed={false}
  onRouteChange={handleRouteChange}
>
  {({
    routes,
    activeRoute,
    isCollapsed,
    expandedMenus,
    toggleCollapse,
    toggleSubmenu,
    navigateTo,
    // Additional context
  }) => (
    <Box
      width={isCollapsed ? "80px" : "250px"}
      transition="width 0.2s ease"
    >
      {/* Custom header */}
      <YourCustomHeader
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      
      {/* Custom navigation items */}
      <YourCustomNavList>
        {routes.map(route => (
          <YourCustomNavItem
            key={route.id}
            route={route}
            isActive={route.id === activeRoute}
            isCollapsed={isCollapsed}
            isSubmenuExpanded={expandedMenus[route.id]}
            onToggleSubmenu={() => toggleSubmenu(route.id)}
            onNavigate={() => navigateTo(route.id)}
          />
        ))}
      </YourCustomNavList>
      
      {/* Custom footer */}
      <YourCustomFooter
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
    </Box>
  )}
</Navigation>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example demonstrates how the Navigation component would work with render props,
              though the component doesn't currently implement this pattern in our UI library. The custom 
              implementation shown here illustrates what would be possible with a render props-enabled version.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavigationRenderPropsExample;
