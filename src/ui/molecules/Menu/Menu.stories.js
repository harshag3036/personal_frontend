import React, { useState } from 'react';
import { Menu, MenuItem, MenuDivider, MENU_VARIANTS, MENU_SIZES } from './index';
import { Icon, Button, Text, Box } from '../../atoms';

export default {
  title: 'Molecules/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: 'A menu component that displays a list of options when triggered.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(MENU_VARIANTS),
      description: 'The visual style variant of the menu',
      defaultValue: MENU_VARIANTS.DEFAULT,
    },
    size: {
      control: 'select',
      options: Object.values(MENU_SIZES),
      description: 'The size of the menu',
      defaultValue: MENU_SIZES.MEDIUM,
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Whether to close the menu when clicking outside',
      defaultValue: true,
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the menu when pressing escape',
      defaultValue: true,
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether to close the menu when an item is selected',
      defaultValue: true,
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to automatically focus the menu when it opens',
      defaultValue: true,
    },
    initialFocusIndex: {
      control: 'number',
      description: 'The index of the item to focus initially',
      defaultValue: 0,
    },
  },
};

// Basic Menu Template
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleItemClick = (event, index, value) => {
    setSelectedItem(value);
    setIsOpen(false);
  };
  
  return (
    <Box p="lg">
      <Box position="relative" mb="lg">
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Open Menu
        </Button>
        
        <Menu 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          onItemClick={handleItemClick}
        >
          <MenuItem 
            icon={<Icon name="user" size="sm" />} 
            value="profile"
            index={0}
          >
            Profile
          </MenuItem>
          <MenuItem 
            icon={<Icon name="settings" size="sm" />} 
            value="settings"
            index={1}
          >
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem 
            icon={<Icon name="help-circle" size="sm" />} 
            value="help"
            index={2}
          >
            Help
          </MenuItem>
          <MenuItem 
            icon={<Icon name="log-out" size="sm" />} 
            value="logout"
            index={3}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
      
      {selectedItem && (
        <Box p="md" bg="background-muted" borderRadius="md">
          <Text>Selected: {selectedItem}</Text>
        </Box>
      )}
    </Box>
  );
};

// Basic Menu Story
export const Basic = Template.bind({});
Basic.args = {
  variant: MENU_VARIANTS.DEFAULT,
  size: MENU_SIZES.MEDIUM,
};

// Different Variants Story
export const Variants = () => {
  const [openMenu, setOpenMenu] = useState(null);
  
  return (
    <Box p="lg">
      <Text as="h3" mb="md">Menu Variants</Text>
      <Box display="flex" flexWrap="wrap" gap="md">
        {Object.entries(MENU_VARIANTS).map(([key, value]) => (
          <Box key={value} position="relative" mb="lg">
            <Button 
              onClick={() => setOpenMenu(openMenu === value ? null : value)}
              aria-expanded={openMenu === value}
              aria-haspopup="true"
              variant={value === 'default' ? 'primary' : value}
            >
              {key.replace('_', ' ')}
            </Button>
            
            <Menu 
              variant={value}
              isOpen={openMenu === value} 
              onClose={() => setOpenMenu(null)}
            >
              <MenuItem index={0} value="item1">Option 1</MenuItem>
              <MenuItem index={1} value="item2">Option 2</MenuItem>
              <MenuDivider />
              <MenuItem index={2} value="item3">Option 3</MenuItem>
            </Menu>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Different Sizes Story
export const Sizes = () => {
  const [openMenu, setOpenMenu] = useState(null);
  
  return (
    <Box p="lg">
      <Text as="h3" mb="md">Menu Sizes</Text>
      <Box display="flex" flexWrap="wrap" gap="md">
        {Object.entries(MENU_SIZES).map(([key, value]) => (
          <Box key={value} position="relative" mb="lg">
            <Button 
              onClick={() => setOpenMenu(openMenu === value ? null : value)}
              aria-expanded={openMenu === value}
              aria-haspopup="true"
              size={value}
            >
              {key.replace('_', ' ')}
            </Button>
            
            <Menu 
              size={value}
              isOpen={openMenu === value} 
              onClose={() => setOpenMenu(null)}
            >
              <MenuItem index={0} value="item1">Option 1</MenuItem>
              <MenuItem index={1} value="item2">Option 2</MenuItem>
              <MenuDivider />
              <MenuItem index={2} value="item3">Option 3</MenuItem>
            </Menu>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Menu with Icons Story
export const WithIcons = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box p="lg">
      <Text as="h3" mb="md">Menu with Icons</Text>
      <Box position="relative" mb="lg">
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Open Menu with Icons
        </Button>
        
        <Menu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <MenuItem 
            icon={<Icon name="user" size="sm" />} 
            value="profile"
            index={0}
          >
            Profile
          </MenuItem>
          <MenuItem 
            icon={<Icon name="settings" size="sm" />} 
            value="settings"
            index={1}
          >
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem 
            icon={<Icon name="bell" size="sm" />} 
            value="notifications"
            index={2}
            rightIcon={<Text size="xs" color="text-muted">5</Text>}
          >
            Notifications
          </MenuItem>
          <MenuItem 
            icon={<Icon name="message-circle" size="sm" />} 
            value="messages"
            index={3}
            rightIcon={<Text size="xs" color="text-muted">3</Text>}
          >
            Messages
          </MenuItem>
          <MenuDivider />
          <MenuItem 
            icon={<Icon name="log-out" size="sm" color="error" />} 
            value="logout"
            index={4}
          >
            <Text color="error">Logout</Text>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

// Menu with Disabled Items Story
export const WithDisabledItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box p="lg">
      <Text as="h3" mb="md">Menu with Disabled Items</Text>
      <Box position="relative" mb="lg">
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Open Menu with Disabled Items
        </Button>
        
        <Menu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <MenuItem 
            icon={<Icon name="edit-2" size="sm" />} 
            value="edit"
            index={0}
          >
            Edit
          </MenuItem>
          <MenuItem 
            icon={<Icon name="copy" size="sm" />} 
            value="duplicate"
            index={1}
          >
            Duplicate
          </MenuItem>
          <MenuDivider />
          <MenuItem 
            icon={<Icon name="share-2" size="sm" />} 
            value="share"
            index={2}
            disabled
          >
            Share (Disabled)
          </MenuItem>
          <MenuItem 
            icon={<Icon name="trash-2" size="sm" color="error" />} 
            value="delete"
            index={3}
            disabled
          >
            <Text color="error">Delete (Disabled)</Text>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

// Nested Menu Example
export const NestedMenus = () => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  return (
    <Box p="lg">
      <Text as="h3" mb="md">Nested Menus</Text>
      <Box position="relative" mb="lg">
        <Button 
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          aria-expanded={isMainMenuOpen}
          aria-haspopup="true"
        >
          Open Main Menu
        </Button>
        
        <Menu 
          isOpen={isMainMenuOpen} 
          onClose={() => setIsMainMenuOpen(false)}
          closeOnSelect={false}
        >
          <MenuItem 
            icon={<Icon name="file" size="sm" />} 
            value="file"
            index={0}
          >
            File
          </MenuItem>
          <MenuItem 
            icon={<Icon name="edit" size="sm" />} 
            value="edit"
            index={1}
            rightIcon={<Icon name="chevron-right" size="sm" />}
            onClick={(e) => {
              e.stopPropagation();
              setIsSubMenuOpen(true);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem 
            icon={<Icon name="eye" size="sm" />} 
            value="view"
            index={2}
          >
            View
          </MenuItem>
          <MenuDivider />
          <MenuItem 
            icon={<Icon name="help-circle" size="sm" />} 
            value="help"
            index={3}
          >
            Help
          </MenuItem>
        </Menu>
        
        {/* Sub Menu */}
        {isMainMenuOpen && (
          <Box position="absolute" left="100%" top="25%" ml="xs">
            <Menu 
              isOpen={isSubMenuOpen} 
              onClose={() => setIsSubMenuOpen(false)}
              closeOnSelect={true}
              onItemClick={() => {
                setIsSubMenuOpen(false);
                setIsMainMenuOpen(false);
              }}
            >
              <MenuItem index={0} value="undo">Undo</MenuItem>
              <MenuItem index={1} value="redo">Redo</MenuItem>
              <MenuDivider />
              <MenuItem index={2} value="cut">Cut</MenuItem>
              <MenuItem index={3} value="copy">Copy</MenuItem>
              <MenuItem index={4} value="paste">Paste</MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  );
};
