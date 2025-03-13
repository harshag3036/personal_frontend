/**
 * Navigation Component Stories
 * 
 * This file contains Storybook stories for the Navigation component.
 */

import React from 'react';
import Navigation from './Navigation';
import { 
  NAVIGATION_VARIANTS, 
  NAVIGATION_SIZES,
  NAVIGATION_POSITIONS,
  NAVIGATION_ALIGNMENTS,
  NAVIGATION_BREAKPOINTS
} from './constants';
import { Box, Text, Button, Icon, Avatar } from '../../atoms';
import { SearchInput } from '../../molecules';

export default {
  title: 'Organisms/Navigation',
  component: Navigation,
  parameters: {
    docs: {
      description: {
        component: 'A flexible navigation component for application headers, menus, and navigation bars.'
      }
    }
  },
  argTypes: {
    variant: { 
      control: { type: 'select', options: Object.values(NAVIGATION_VARIANTS) },
      defaultValue: NAVIGATION_VARIANTS.DEFAULT
    },
    size: { 
      control: { type: 'select', options: Object.values(NAVIGATION_SIZES) },
      defaultValue: NAVIGATION_SIZES.MEDIUM
    },
    position: { 
      control: { type: 'select', options: Object.values(NAVIGATION_POSITIONS) },
      defaultValue: NAVIGATION_POSITIONS.STATIC
    },
    alignment: { 
      control: { type: 'select', options: Object.values(NAVIGATION_ALIGNMENTS) },
      defaultValue: NAVIGATION_ALIGNMENTS.SPACE_BETWEEN
    },
    breakpoint: { 
      control: { type: 'select', options: Object.values(NAVIGATION_BREAKPOINTS) },
      defaultValue: NAVIGATION_BREAKPOINTS.MD
    },
    expanded: { control: 'boolean', defaultValue: false },
    collapsible: { control: 'boolean', defaultValue: true },
    withShadow: { control: 'boolean', defaultValue: false },
    withBorder: { control: 'boolean', defaultValue: true },
    transparent: { control: 'boolean', defaultValue: false },
    fixed: { control: 'boolean', defaultValue: false },
    sticky: { control: 'boolean', defaultValue: false }
  }
};

// Default Template
const Template = (args) => (
  <Navigation {...args}>
    <Navigation.Brand>Brand</Navigation.Brand>
    <Navigation.Items>
      <Navigation.Item href="/" active>Home</Navigation.Item>
      <Navigation.Item href="/about">About</Navigation.Item>
      <Navigation.Item href="/services">Services</Navigation.Item>
      <Navigation.Item href="/contact">Contact</Navigation.Item>
    </Navigation.Items>
  </Navigation>
);

// Basic Navigation
export const Basic = Template.bind({});
Basic.args = {};

// Navigation with Logo
export const WithLogo = (args) => (
  <Navigation {...args}>
    <Navigation.Brand logo="https://via.placeholder.com/40" alt="Logo">Brand</Navigation.Brand>
    <Navigation.Items>
      <Navigation.Item href="/" active>Home</Navigation.Item>
      <Navigation.Item href="/about">About</Navigation.Item>
      <Navigation.Item href="/services">Services</Navigation.Item>
      <Navigation.Item href="/contact">Contact</Navigation.Item>
    </Navigation.Items>
  </Navigation>
);

// Navigation with Actions
export const WithActions = (args) => (
  <Navigation {...args}>
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
);

// Navigation with Search
export const WithSearch = (args) => (
  <Navigation {...args}>
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
);

// Navigation with User
export const WithUser = (args) => (
  <Navigation {...args}>
    <Navigation.Brand>Brand</Navigation.Brand>
    <Navigation.Items>
      <Navigation.Item href="/" active>Home</Navigation.Item>
      <Navigation.Item href="/about">About</Navigation.Item>
      <Navigation.Item href="/services">Services</Navigation.Item>
      <Navigation.Item href="/contact">Contact</Navigation.Item>
    </Navigation.Items>
    <Navigation.Actions>
      <Box className="ui-navigation-user">
        <Avatar 
          src="https://via.placeholder.com/40" 
          alt="User" 
          size="sm"
        />
      </Box>
    </Navigation.Actions>
  </Navigation>
);

// Navigation with Dropdown
export const WithDropdown = (args) => (
  <Navigation {...args}>
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
);

// Navigation with Icons
export const WithIcons = (args) => (
  <Navigation {...args}>
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
);

// Navigation Variants
export const DefaultVariant = Template.bind({});
DefaultVariant.args = {
  variant: NAVIGATION_VARIANTS.DEFAULT
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.args = {
  variant: NAVIGATION_VARIANTS.PRIMARY
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.args = {
  variant: NAVIGATION_VARIANTS.SECONDARY
};

export const TransparentVariant = Template.bind({});
TransparentVariant.args = {
  variant: NAVIGATION_VARIANTS.TRANSPARENT
};

export const MinimalVariant = Template.bind({});
MinimalVariant.args = {
  variant: NAVIGATION_VARIANTS.MINIMAL
};

// Navigation Sizes
export const SmallSize = Template.bind({});
SmallSize.args = {
  size: NAVIGATION_SIZES.SMALL
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  size: NAVIGATION_SIZES.MEDIUM
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: NAVIGATION_SIZES.LARGE
};

// Navigation Positions
export const StaticPosition = Template.bind({});
StaticPosition.args = {
  position: NAVIGATION_POSITIONS.STATIC
};

export const FixedTopPosition = Template.bind({});
FixedTopPosition.args = {
  position: NAVIGATION_POSITIONS.FIXED_TOP
};

export const FixedBottomPosition = Template.bind({});
FixedBottomPosition.args = {
  position: NAVIGATION_POSITIONS.FIXED_BOTTOM
};

export const StickyTopPosition = Template.bind({});
StickyTopPosition.args = {
  position: NAVIGATION_POSITIONS.STICKY_TOP
};

// Navigation Alignments
export const StartAlignment = Template.bind({});
StartAlignment.args = {
  alignment: NAVIGATION_ALIGNMENTS.START
};

export const CenterAlignment = Template.bind({});
CenterAlignment.args = {
  alignment: NAVIGATION_ALIGNMENTS.CENTER
};

export const EndAlignment = Template.bind({});
EndAlignment.args = {
  alignment: NAVIGATION_ALIGNMENTS.END
};

export const SpaceBetweenAlignment = Template.bind({});
SpaceBetweenAlignment.args = {
  alignment: NAVIGATION_ALIGNMENTS.SPACE_BETWEEN
};

export const SpaceAroundAlignment = Template.bind({});
SpaceAroundAlignment.args = {
  alignment: NAVIGATION_ALIGNMENTS.SPACE_AROUND
};

// Navigation Modifiers
export const WithShadow = Template.bind({});
WithShadow.args = {
  withShadow: true
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  withBorder: true
};

export const Transparent = Template.bind({});
Transparent.args = {
  transparent: true
};

// Responsive Navigation
export const Responsive = (args) => (
  <Box>
    <Text variant="body1" marginBottom="md">
      Resize the browser window to see the responsive behavior.
    </Text>
    <Navigation {...args}>
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
);

Responsive.args = {
  collapsible: true,
  breakpoint: NAVIGATION_BREAKPOINTS.MD
};

// Interactive Navigation
export const Interactive = (args) => {
  const [activeItem, setActiveItem] = React.useState('home');
  
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  
  return (
    <Navigation {...args}>
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
      <Navigation.Actions>
        <Button variant="primary" size="sm">Sign In</Button>
      </Navigation.Actions>
    </Navigation>
  );
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'An interactive navigation that updates the active item when clicked.'
    }
  }
};
