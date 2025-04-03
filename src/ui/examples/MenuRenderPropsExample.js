import React, { useState } from 'react';
import { Box, Text, Button, Icon, Flex, Badge, Avatar, Divider } from '../atoms';
import { Menu } from '../molecules/Menu';

/**
 * MenuRenderPropsExample
 * 
 * This example demonstrates how to use the Menu component with render props
 * to create highly customized menu interfaces.
 */
const MenuRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Menus with Render Props</Text>
      
      {/* Basic Custom Menu */}
      <Text as="h3" marginBottom="md">Basic Custom Menu</Text>
      <Box marginBottom="xl">
        <BasicCustomMenu />
      </Box>
      
      {/* Advanced Custom Menu */}
      <Text as="h3" marginY="md">Advanced Custom Menu</Text>
      <Box marginBottom="xl">
        <AdvancedCustomMenu />
      </Box>
      
      {/* Interactive Menu with Nested Structure */}
      <Text as="h3" marginY="md">Interactive Nested Menu</Text>
      <Box marginBottom="xl">
        <NestedCustomMenu />
      </Box>
    </Box>
  );
};

/**
 * BasicCustomMenu Component
 * 
 * Demonstrates a simple menu implementation using render props.
 */
const BasicCustomMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { id: 'view', label: 'View', icon: 'eye' },
    { id: 'edit', label: 'Edit', icon: 'edit-2' },
    { id: 'share', label: 'Share', icon: 'share-2' },
    { id: 'delete', label: 'Delete', icon: 'trash-2', danger: true }
  ];
  
  const handleAction = (action) => {
    console.log(`Action selected: ${action}`);
    setIsOpen(false);
  };

  return (
    <Box position="relative" display="inline-block">
      <Button 
        variant="outline"
        rightIcon="chevron-down"
        onClick={() => setIsOpen(true)}
      >
        Actions
      </Button>
      
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnItemClick
        closeOnBlur
      >
        {(menuState) => (
          <Box 
            boxShadow="md" 
            borderRadius="md" 
            border="1px solid" 
            borderColor="border"
            backgroundColor="white"
            minWidth="180px"
          >
            {menuItems.map((item, index) => (
              <Flex
                key={item.id}
                px="md"
                py="sm"
                alignItems="center"
                onClick={() => handleAction(item.id)}
                cursor="pointer"
                backgroundColor={menuState.activeIndex === index ? 'primary.50' : 'transparent'}
                color={item.danger ? 'danger.500' : 'text'}
                _hover={{ backgroundColor: item.danger ? 'danger.50' : 'primary.50' }}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction(item.id);
                  }
                }}
              >
                <Icon 
                  name={item.icon} 
                  marginRight="sm" 
                  color={item.danger ? 'danger.500' : 'primary.500'}
                />
                {item.label}
              </Flex>
            ))}
          </Box>
        )}
      </Menu>
    </Box>
  );
};

/**
 * AdvancedCustomMenu Component
 * 
 * Demonstrates a more advanced menu with sections and custom styling.
 */
const AdvancedCustomMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'My Profile', icon: 'user' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
        { id: 'billing', label: 'Billing', icon: 'credit-card', badge: 'New' }
      ]
    },
    {
      title: 'Workspace',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
        { id: 'projects', label: 'Projects', icon: 'folder', badge: '5' },
        { id: 'teams', label: 'Teams', icon: 'users' }
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'help', label: 'Help Center', icon: 'help-circle' },
        { id: 'logout', label: 'Logout', icon: 'log-out', danger: true }
      ]
    }
  ];
  
  const handleSelect = (itemId) => {
    console.log(`Selected: ${itemId}`);
    setIsOpen(false);
  };

  return (
    <Box position="relative" display="inline-block">
      <Flex
        alignItems="center"
        backgroundColor="primary.700"
        color="white"
        p="sm"
        borderRadius="md"
        cursor="pointer"
        onClick={() => setIsOpen(true)}
      >
        <Avatar 
          size="sm" 
          name="Jane Doe" 
          src="https://i.pravatar.cc/300" 
          marginRight="sm"
        />
        
        <Box>
          <Text fontWeight="bold">Jane Doe</Text>
          <Text fontSize="xs">Admin</Text>
        </Box>
        
        <Icon 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          marginLeft="md"
        />
      </Flex>
      
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        variant="primary"
        closeOnItemClick
      >
        {(menuState) => (
          <Box 
            boxShadow="lg" 
            borderRadius="md" 
            backgroundColor="white"
            width="280px"
            overflow="hidden"
          >
            <Box 
              p="md" 
              backgroundColor="primary.700" 
              color="white"
            >
              <Flex alignItems="center">
                <Avatar 
                  size="md" 
                  name="Jane Doe" 
                  src="https://i.pravatar.cc/300" 
                  marginRight="md"
                />
                <Box>
                  <Text fontWeight="bold">Jane Doe</Text>
                  <Text fontSize="sm">jane.doe@example.com</Text>
                </Box>
              </Flex>
            </Box>
            
            <Box maxHeight="400px" overflowY="auto">
              {menuSections.map((section, sectionIndex) => (
                <Box key={section.title}>
                  {sectionIndex > 0 && <Divider />}
                  <Text 
                    fontSize="xs" 
                    fontWeight="bold" 
                    color="text.muted" 
                    textTransform="uppercase" 
                    p="xs" 
                    px="md"
                  >
                    {section.title}
                  </Text>
                  
                  {section.items.map((item) => {
                    const itemIndex = menuSections
                      .slice(0, sectionIndex)
                      .reduce((count, s) => count + s.items.length, 0) + section.items.indexOf(item);
                    
                    return (
                      <Flex
                        key={item.id}
                        px="md"
                        py="sm"
                        alignItems="center"
                        justifyContent="space-between"
                        cursor="pointer"
                        backgroundColor={menuState.activeIndex === itemIndex ? 'primary.50' : 'transparent'}
                        _hover={{ backgroundColor: item.danger ? 'danger.50' : 'primary.50' }}
                        onClick={() => handleSelect(item.id)}
                        color={item.danger ? 'danger.500' : 'text'}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <Flex alignItems="center">
                          <Icon 
                            name={item.icon} 
                            marginRight="sm" 
                            color={item.danger ? 'danger.500' : 'primary.500'}
                          />
                          {item.label}
                        </Flex>
                        
                        {item.badge && (
                          <Badge 
                            variant="subtle" 
                            colorScheme={item.badge === 'New' ? 'success' : 'primary'}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Flex>
                    );
                  })}
                </Box>
              ))}
            </Box>
            
            <Divider />
            
            <Flex 
              p="sm" 
              justifyContent="space-between" 
              backgroundColor="background.alt"
            >
              <Text fontSize="xs" color="text.muted">Version 1.2.0</Text>
              <Text fontSize="xs" color="primary.500" cursor="pointer">
                Check for updates
              </Text>
            </Flex>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

/**
 * NestedCustomMenu Component
 * 
 * Demonstrates a menu with nested submenus using render props.
 */
const NestedCustomMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  
  const menuItems = [
    { id: 'file', label: 'File', icon: 'file', 
      submenu: [
        { id: 'file-new', label: 'New', shortcut: 'Ctrl+N' },
        { id: 'file-open', label: 'Open...', shortcut: 'Ctrl+O' },
        { id: 'file-save', label: 'Save', shortcut: 'Ctrl+S' },
        { id: 'file-export', label: 'Export', 
          submenu: [
            { id: 'file-export-pdf', label: 'PDF' },
            { id: 'file-export-word', label: 'Word' },
            { id: 'file-export-image', label: 'Image' }
          ]
        }
      ]
    },
    { id: 'edit', label: 'Edit', icon: 'edit',
      submenu: [
        { id: 'edit-undo', label: 'Undo', shortcut: 'Ctrl+Z' },
        { id: 'edit-redo', label: 'Redo', shortcut: 'Ctrl+Y' },
        { id: 'edit-cut', label: 'Cut', shortcut: 'Ctrl+X' },
        { id: 'edit-copy', label: 'Copy', shortcut: 'Ctrl+C' },
        { id: 'edit-paste', label: 'Paste', shortcut: 'Ctrl+V' }
      ]
    },
    { id: 'view', label: 'View', icon: 'eye',
      submenu: [
        { id: 'view-zoom-in', label: 'Zoom In', shortcut: 'Ctrl+Plus' },
        { id: 'view-zoom-out', label: 'Zoom Out', shortcut: 'Ctrl+Minus' },
        { id: 'view-fullscreen', label: 'Fullscreen', shortcut: 'F11' }
      ]
    },
    { id: 'help', label: 'Help', icon: 'help-circle',
      submenu: [
        { id: 'help-docs', label: 'Documentation' },
        { id: 'help-about', label: 'About' }
      ]
    }
  ];
  
  const handleSelect = (itemId) => {
    console.log(`Selected: ${itemId}`);
    setIsOpen(false);
    setActiveSubmenu(null);
  };
  
  // Helper function to render a submenu
  const renderSubmenu = (items, parentId, level = 0) => {
    return (
      <Box 
        position="absolute"
        left={level === 0 ? "100%" : "calc(100% - 5px)"}
        top={level === 0 ? "0" : "-5px"}
        backgroundColor="white"
        border="1px solid"
        borderColor="border"
        borderRadius="md"
        boxShadow="md"
        minWidth="180px"
        zIndex={(level + 1) * 10}
        display={activeSubmenu === parentId ? "block" : "none"}
      >
        {items.map((item) => (
          <Flex
            key={item.id}
            px="md"
            py="sm"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            _hover={{ backgroundColor: 'primary.50' }}
            onMouseEnter={() => item.submenu && setActiveSubmenu(item.id)}
            onMouseLeave={() => !item.submenu && setActiveSubmenu(parentId)}
            onClick={() => !item.submenu && handleSelect(item.id)}
            position="relative"
          >
            <Text>{item.label}</Text>
            
            {item.shortcut && (
              <Text fontSize="xs" color="text.muted" ml="lg">
                {item.shortcut}
              </Text>
            )}
            
            {item.submenu && (
              <Icon 
                name="chevron-right" 
                size="sm" 
                ml={item.shortcut ? "sm" : "lg"}
              />
            )}
            
            {item.submenu && renderSubmenu(item.submenu, item.id, level + 1)}
          </Flex>
        ))}
      </Box>
    );
  };

  return (
    <Box position="relative" display="inline-block">
      <Button 
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        Application Menu
      </Button>
      
      <Menu
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setActiveSubmenu(null);
        }}
        closeOnBlur
      >
        {(menuState) => (
          <Box 
            boxShadow="md" 
            borderRadius="md" 
            border="1px solid" 
            borderColor="border"
            backgroundColor="white"
            minWidth="200px"
          >
            {menuItems.map((item, index) => (
              <Flex
                key={item.id}
                px="md"
                py="sm"
                alignItems="center"
                justifyContent="space-between"
                cursor="pointer"
                backgroundColor={menuState.activeIndex === index ? 'primary.50' : 'transparent'}
                _hover={{ backgroundColor: 'primary.50' }}
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.id)}
                onMouseLeave={() => !item.submenu && setActiveSubmenu(null)}
                onClick={() => !item.submenu && handleSelect(item.id)}
                position="relative"
              >
                <Flex alignItems="center">
                  <Icon 
                    name={item.icon} 
                    marginRight="sm" 
                    color="primary.500"
                  />
                  {item.label}
                </Flex>
                
                {item.submenu && (
                  <Icon name="chevron-right" size="sm" />
                )}
                
                {item.submenu && renderSubmenu(item.submenu, item.id)}
              </Flex>
            ))}
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default MenuRenderPropsExample;
