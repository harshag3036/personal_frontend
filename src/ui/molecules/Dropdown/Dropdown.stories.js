import React, { useState } from 'react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  DROPDOWN_VARIANTS,
  DROPDOWN_SIZES,
  DROPDOWN_PLACEMENTS
} from './index';
import { Button, Icon } from '../../atoms';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    componentSubtitle: 'A versatile dropdown menu component for displaying a list of options',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is open (controlled)',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is open by default (uncontrolled)',
    },
    placement: {
      control: {
        type: 'select',
        options: Object.values(DROPDOWN_PLACEMENTS),
      },
      description: 'Placement of the dropdown menu',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(DROPDOWN_VARIANTS),
      },
      description: 'Visual variant of the dropdown',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(DROPDOWN_SIZES),
      },
      description: 'Size of the dropdown',
    },
    closeOnItemClick: {
      control: 'boolean',
      description: 'Whether to close the dropdown when an item is clicked',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close the dropdown when clicking outside',
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback when the dropdown is toggled',
    },
  },
};

// Template for creating stories
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(args.defaultOpen || false);
  
  const handleToggle = (open) => {
    setIsOpen(open);
    args.onToggle && args.onToggle(open);
  };
  
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown 
        {...args} 
        isOpen={args.isOpen !== undefined ? args.isOpen : isOpen}
        onToggle={handleToggle}
      >
        <DropdownTrigger>
          <Button>Options</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => console.log('Option 1 clicked')}>
            Option 1
          </DropdownItem>
          <DropdownItem onClick={() => console.log('Option 2 clicked')}>
            Option 2
          </DropdownItem>
          <DropdownItem onClick={() => console.log('Option 3 clicked')}>
            Option 3
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

// Basic dropdown
export const Basic = Template.bind({});
Basic.args = {
  placement: DROPDOWN_PLACEMENTS.BOTTOM_START,
  variant: DROPDOWN_VARIANTS.DEFAULT,
  size: DROPDOWN_SIZES.MEDIUM,
  closeOnItemClick: true,
  closeOnOutsideClick: true,
};

// Different placements
export const Placements = () => {
  return (
    <div style={{ 
      padding: '5rem', 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gap: '2rem',
      alignItems: 'center',
      justifyItems: 'center',
    }}>
      <Dropdown placement={DROPDOWN_PLACEMENTS.TOP_START}>
        <DropdownTrigger>
          <Button>Top Start</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.TOP}>
        <DropdownTrigger>
          <Button>Top</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.TOP_END}>
        <DropdownTrigger>
          <Button>Top End</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.LEFT_START}>
        <DropdownTrigger>
          <Button>Left Start</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.BOTTOM_START}>
        <DropdownTrigger>
          <Button>Bottom Start (Default)</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.RIGHT_START}>
        <DropdownTrigger>
          <Button>Right Start</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.LEFT_END}>
        <DropdownTrigger>
          <Button>Left End</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.BOTTOM_END}>
        <DropdownTrigger>
          <Button>Bottom End</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <Dropdown placement={DROPDOWN_PLACEMENTS.RIGHT_END}>
        <DropdownTrigger>
          <Button>Right End</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

// Different variants
export const Variants = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      gap: '2rem',
      flexWrap: 'wrap',
    }}>
      {Object.entries(DROPDOWN_VARIANTS).map(([key, value]) => (
        <Dropdown key={value} variant={value}>
          <DropdownTrigger>
            <Button variant={value === 'default' ? 'primary' : value}>
              {key.replace('_', ' ')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}
    </div>
  );
};

// Different sizes
export const Sizes = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      gap: '2rem',
      alignItems: 'center',
    }}>
      {Object.entries(DROPDOWN_SIZES).map(([key, value]) => (
        <Dropdown key={value} size={value}>
          <DropdownTrigger>
            <Button size={value}>
              {key.replace('_', ' ')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}
    </div>
  );
};

// With icons
export const WithIcons = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>
            <Icon name="settings" size="sm" style={{ marginRight: '0.5rem' }} />
            Settings
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem icon={<Icon name="user" size="sm" />}>
            Profile
          </DropdownItem>
          <DropdownItem icon={<Icon name="settings" size="sm" />}>
            Settings
          </DropdownItem>
          <DropdownItem icon={<Icon name="help-circle" size="sm" />}>
            Help
          </DropdownItem>
          <DropdownItem icon={<Icon name="log-out" size="sm" />}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

// Disabled items
export const DisabledItems = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Options</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Enabled Option</DropdownItem>
          <DropdownItem disabled>Disabled Option</DropdownItem>
          <DropdownItem>Enabled Option</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

// Controlled dropdown
export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
        >
          {isOpen ? 'Close Dropdown' : 'Open Dropdown'}
        </Button>
      </div>
      
      <Dropdown 
        isOpen={isOpen} 
        onToggle={setIsOpen}
      >
        <DropdownTrigger>
          <Button>Controlled Dropdown</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

// Community-specific dropdown
export const CommunityDropdown = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Dropdown className="ui-dropdown--community">
        <DropdownTrigger>
          <Button variant="primary">Community Actions</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem icon={<Icon name="plus" size="sm" />}>
            Create Activity
          </DropdownItem>
          <DropdownItem icon={<Icon name="users" size="sm" />}>
            Manage Members
          </DropdownItem>
          <DropdownItem icon={<Icon name="calendar" size="sm" />}>
            Schedule Event
          </DropdownItem>
          <DropdownItem icon={<Icon name="message-circle" size="sm" />}>
            Send Announcement
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
