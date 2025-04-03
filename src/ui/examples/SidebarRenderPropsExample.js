import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Card, Icon, Stack } from '../index';

/**
 * Sidebar Render Props Example
 * 
 * This example demonstrates how to use the Sidebar component with render props pattern
 * to create highly customized sidebar interfaces with complete control over rendering.
 */
const SidebarRenderPropsExample = () => {
  // Sidebar state
  const [collapsed, setCollapsed] = useState(false);
  const [variant, setVariant] = useState('default'); // default, floating, overlay, mini
  const [position, setPosition] = useState('left'); // left, right
  const [theme, setTheme] = useState('light'); // light, dark
  const [nestedOpen, setNestedOpen] = useState({});

  // Sample sidebar sections
  const sections = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'grid', active: true },
        { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2', active: false },
        { id: 'customers', label: 'Customers', icon: 'users', active: false }
      ]
    },
    {
      id: 'content',
      title: 'Content',
      items: [
        { id: 'articles', label: 'Articles', icon: 'file-text', active: false },
        { id: 'media', label: 'Media Library', icon: 'image', active: false },
        { 
          id: 'collections', 
          label: 'Collections', 
          icon: 'folder', 
          active: false,
          children: [
            { id: 'featured', label: 'Featured', active: false },
            { id: 'recent', label: 'Recent', active: false },
            { id: 'archived', label: 'Archived', active: false }
          ]
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      items: [
        { id: 'profile', label: 'Profile Settings', icon: 'user', active: false },
        { id: 'security', label: 'Security', icon: 'shield', active: false },
        { id: 'preferences', label: 'Preferences', icon: 'settings', active: false }
      ]
    }
  ];

  const [activeSections, setActiveSections] = useState(sections);

  // Toggle item active state
  const handleItemClick = (sectionId, itemId, childId = null) => {
    setActiveSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        items: section.items.map(item => {
          // Clear active state for all items
          let updatedItem = {
            ...item,
            active: false
          };
          
          // If this item has children, update their active state too
          if (item.children) {
            updatedItem.children = item.children.map(child => ({
              ...child,
              active: false
            }));
          }
          
          // Set active state for the clicked item or child
          if (section.id === sectionId) {
            if (childId !== null && item.id === itemId) {
              updatedItem.children = item.children.map(child => ({
                ...child,
                active: child.id === childId
              }));
            } else if (item.id === itemId && childId === null) {
              updatedItem.active = true;
            }
          }
          
          return updatedItem;
        })
      }))
    );
  };

  // Toggle nested menu
  const toggleNested = (itemId) => {
    setNestedOpen(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Change sidebar variant
  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
  };

  // Toggle position
  const togglePosition = () => {
    setPosition(position === 'left' ? 'right' : 'left');
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Sidebar with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the Sidebar component with render props pattern
        to create highly customized sidebar interfaces with complete control over rendering.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Controls */}
        <Card padding="md" width="100%" marginBottom="lg">
          <Text as="h3" marginBottom="sm">Sidebar Configuration</Text>
          <Flex gap="md" flexWrap="wrap" alignItems="center">
            <Button
              variant={collapsed ? 'outline' : 'primary'}
              onClick={toggleCollapsed}
            >
              {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            </Button>
            
            <Button
              variant="outline"
              onClick={togglePosition}
            >
              Position: {position}
            </Button>
            
            <Button
              variant="outline"
              onClick={toggleTheme}
            >
              Theme: {theme}
            </Button>
            
            <Box marginLeft="md">
              <Text marginBottom="xs">Variant:</Text>
              <Flex gap="sm">
                {['default', 'floating', 'overlay', 'mini'].map(v => (
                  <Button 
                    key={v}
                    size="sm"
                    variant={variant === v ? 'primary' : 'outline'}
                    onClick={() => handleVariantChange(v)}
                  >
                    {v}
                  </Button>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Card>
        
        {/* Sidebar Demo */}
        <Box
          width="100%"
          border="1px solid"
          borderColor="borderColor"
          borderRadius="md"
          overflow="hidden"
          position="relative"
          height="600px"
        >
          {/* Application Layout with Sidebar */}
          <Flex height="100%">
            {/* Custom Sidebar Implementation - to demonstrate how render props would work */}
            <Box
              width={collapsed ? '80px' : '250px'}
              backgroundColor={theme === 'light' ? 'white' : 'gray.900'}
              color={theme === 'light' ? 'textColor' : 'white'}
              borderRight={position === 'left' ? '1px solid' : 'none'}
              borderLeft={position === 'right' ? '1px solid' : 'none'}
              borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
              height="100%"
              order={position === 'left' ? 0 : 2}
              transition="width 0.2s ease"
              boxShadow={variant === 'floating' ? 'md' : 'none'}
              position={variant === 'overlay' ? 'absolute' : 'relative'}
              zIndex={variant === 'overlay' ? 10 : 1}
              left={variant === 'overlay' && position === 'left' ? 0 : 'auto'}
              right={variant === 'overlay' && position === 'right' ? 0 : 'auto'}
              transform={variant === 'overlay' && !collapsed ? 'translateX(0)' : 
                         variant === 'overlay' && collapsed && position === 'left' ? 'translateX(-100%)' : 
                         variant === 'overlay' && collapsed && position === 'right' ? 'translateX(100%)' : 'none'}
            >
              {/* Sidebar Header */}
              <Flex 
                height="64px" 
                alignItems="center" 
                justifyContent={collapsed ? 'center' : 'space-between'}
                padding={collapsed ? 'xs' : 'md'}
                borderBottom="1px solid"
                borderColor={theme === 'light' ? 'borderColor' : 'gray.700'}
              >
                {!collapsed && (
                  <Flex alignItems="center" gap="sm">
                    <Icon name="layout" size="md" color="primary" />
                    <Text fontWeight="bold">AppName</Text>
                  </Flex>
                )}
                
                {collapsed && (
                  <Icon name="layout" size="md" color="primary" />
                )}
                
                <Button 
                  variant="ghost" 
                  onClick={toggleCollapsed}
                  size="sm"
                  display={collapsed ? 'none' : 'flex'}
                >
                  <Icon name={position === 'left' ? 'chevrons-left' : 'chevrons-right'} size="sm" />
                </Button>
              </Flex>
              
              {/* Sidebar Content */}
              <Box 
                overflowY="auto" 
                height="calc(100% - 64px)"
                padding={collapsed ? 'xs' : 'md'}
              >
                <Stack spacing={collapsed ? 'lg' : 'md'}>
                  {activeSections.map(section => (
                    <Box key={section.id}>
                      {!collapsed && (
                        <Text 
                          fontSize="xs" 
                          fontWeight="medium" 
                          color={theme === 'light' ? 'textColorSecondary' : 'gray.400'}
                          textTransform="uppercase"
                          letterSpacing="0.05em"
                          marginBottom="xs"
                          paddingLeft="xs"
                        >
                          {section.title}
                        </Text>
                      )}
                      
                      {collapsed && section.id === 'main' && (
                        <Box 
                          height="1px" 
                          backgroundColor={theme === 'light' ? 'borderColor' : 'gray.700'} 
                          marginY="md"
                        />
                      )}
                      
                      <Stack spacing="xs">
                        {section.items.map(item => (
                          <Box key={item.id}>
                            <Button
                              variant={item.active ? 'subtle' : 'ghost'}
                              justifyContent={collapsed ? 'center' : 'flex-start'}
                              width="100%"
                              onClick={() => item.children ? toggleNested(item.id) : handleItemClick(section.id, item.id)}
                              title={collapsed ? item.label : undefined}
                            >
                              <Flex 
                                alignItems="center" 
                                gap={collapsed ? '0' : 'sm'}
                                width="100%"
                                justifyContent={collapsed ? 'center' : 'space-between'}
                              >
                                <Flex alignItems="center" gap={collapsed ? '0' : 'sm'}>
                                  <Icon name={item.icon} size="sm" />
                                  {!collapsed && <Text>{item.label}</Text>}
                                </Flex>
                                {!collapsed && item.children && (
                                  <Icon 
                                    name={nestedOpen[item.id] ? 'chevron-down' : 'chevron-right'} 
                                    size="sm" 
                                  />
                                )}
                              </Flex>
                            </Button>
                            
                            {!collapsed && item.children && nestedOpen[item.id] && (
                              <Box paddingLeft="md" marginTop="xs">
                                <Stack spacing="xs">
                                  {item.children.map(child => (
                                    <Button
                                      key={child.id}
                                      variant={child.active ? 'subtle' : 'ghost'}
                                      justifyContent="flex-start"
                                      size="sm"
                                      onClick={() => handleItemClick(section.id, item.id, child.id)}
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
                  ))}
                </Stack>
              </Box>
            </Box>
            
            {/* Main Content Area */}
            <Box flex="1" padding="lg" backgroundColor={theme === 'light' ? 'gray.50' : 'gray.800'} order="1">
              <Flex justifyContent="space-between" marginBottom="lg">
                <Text as="h3">Dashboard</Text>
                
                {variant === 'overlay' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleCollapsed}
                  >
                    <Icon name="menu" size="sm" marginRight="xs" />
                    Toggle Sidebar
                  </Button>
                )}
              </Flex>
              
              <Text>Main content area. The sidebar can be customized with different variants, positions, and themes.</Text>
              
              <Box marginTop="lg" padding="lg" backgroundColor={theme === 'light' ? 'white' : 'gray.900'} borderRadius="md">
                <Text as="h4" marginBottom="sm">Active Settings</Text>
                <Stack spacing="sm">
                  <Flex gap="sm">
                    <Text fontWeight="medium">Variant:</Text>
                    <Text>{variant}</Text>
                  </Flex>
                  <Flex gap="sm">
                    <Text fontWeight="medium">Position:</Text>
                    <Text>{position}</Text>
                  </Flex>
                  <Flex gap="sm">
                    <Text fontWeight="medium">Collapsed:</Text>
                    <Text>{collapsed ? 'Yes' : 'No'}</Text>
                  </Flex>
                  <Flex gap="sm">
                    <Text fontWeight="medium">Theme:</Text>
                    <Text>{theme}</Text>
                  </Flex>
                </Stack>
              </Box>
            </Box>
          </Flex>
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">Sidebar with Render Props</Text>
            <Text marginBottom="md">
              The Sidebar component would benefit greatly from the render props pattern, 
              allowing for completely customized sidebar layouts, styling, and behaviors
              while leveraging the component's state management and navigation capabilities.
            </Text>
            
            <Text as="h4" marginBottom="sm">Benefits of Render Props for Sidebar:</Text>
            <ul>
              <li>Custom styling and layout for different sidebar variants</li>
              <li>Custom content sections and navigation items</li>
              <li>Specialized animations and transitions for collapsing/expanding</li>
              <li>Role-based content visibility and permissions</li>
              <li>Integration with application routing and state management</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<Sidebar
  sections={sections}
  variant="default"
  position="left"
  theme="light"
  collapsible={true}
  defaultCollapsed={false}
  onItemClick={handleItemClick}
>
  {({
    sections,
    activeItem,
    isCollapsed,
    variant,
    position,
    theme,
    expandedSections,
    toggleCollapse,
    toggleSection,
    navigateTo,
    // Additional context
  }) => (
    <Box
      width={isCollapsed ? "80px" : "250px"}
      backgroundColor={theme === "light" ? "white" : "gray.900"}
      transition="width 0.2s ease"
    >
      {/* Custom header */}
      <YourCustomHeader
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      
      {/* Custom sections and items */}
      <Box overflowY="auto">
        {sections.map(section => (
          <YourCustomSection
            key={section.id}
            section={section}
            isCollapsed={isCollapsed}
            isExpanded={expandedSections[section.id]}
            onToggleSection={() => toggleSection(section.id)}
          >
            {section.items.map(item => (
              <YourCustomSidebarItem
                key={item.id}
                item={item}
                isActive={item.id === activeItem}
                isCollapsed={isCollapsed}
                onClick={() => navigateTo(section.id, item.id)}
              />
            ))}
          </YourCustomSection>
        ))}
      </Box>
      
      {/* Custom footer */}
      <YourCustomFooter
        isCollapsed={isCollapsed}
        variant={variant}
        theme={theme}
      />
    </Box>
  )}
</Sidebar>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example demonstrates how the Sidebar component would work with render props,
              though the component doesn't currently implement this pattern in our UI library. The custom 
              implementation shown here illustrates what would be possible with a render props-enabled version.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarRenderPropsExample;
