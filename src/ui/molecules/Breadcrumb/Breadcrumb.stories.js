import React from 'react';
import Breadcrumb from './Breadcrumb';
import Icon from '../../atoms/Icon';

export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    componentSubtitle: 'A navigation component that helps users understand their current location within a website\'s hierarchy.',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'compact', 'expanded'],
      },
      description: 'Visual variant of the breadcrumb',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      description: 'Size of the breadcrumb',
    },
    separatorType: {
      control: {
        type: 'select',
        options: ['slash', 'chevron', 'arrow', 'dot', 'custom'],
      },
      description: 'Type of separator between items',
    },
    customSeparator: {
      control: 'text',
      description: 'Custom separator element (only used when separatorType is "custom")',
    },
    maxItems: {
      control: {
        type: 'number',
        min: 0,
      },
      description: 'Maximum number of items to display (0 = show all)',
    },
    collapsedLabel: {
      control: 'text',
      description: 'Label for collapsed items',
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'Whether to show home icon for the first item',
    },
    homeIconName: {
      control: 'text',
      description: 'Icon name for the home icon',
    },
    homeLabel: {
      control: 'text',
      description: 'Label for the home item when not provided',
    },
    lastItemClickable: {
      control: 'boolean',
      description: 'Whether the last item should be clickable',
    },
    as: {
      control: {
        type: 'select',
        options: ['nav', 'div', 'section', 'header'],
      },
      description: 'Element to render the Breadcrumb as',
    },
  },
};

// Basic breadcrumb
export const Basic = (args) => (
  <Breadcrumb
    {...args}
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', href: '/products/laptops' },
      { label: 'MacBook Pro', href: '/products/laptops/macbook-pro' }
    ]}
  />
);

Basic.args = {
  variant: 'default',
  size: 'medium',
  separatorType: 'slash',
  maxItems: 0,
  collapsedLabel: '...',
  showHomeIcon: true,
  homeIconName: 'home',
  homeLabel: 'Home',
  lastItemClickable: false,
};

// With custom separator
export const WithCustomSeparator = (args) => (
  <Breadcrumb
    {...args}
    items={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/dashboard/settings' },
      { label: 'Profile', href: '/dashboard/settings/profile' }
    ]}
    separatorType="custom"
    customSeparator={<span style={{ margin: '0 8px', color: '#999' }}>|</span>}
  />
);

// With collapsed items
export const WithCollapsedItems = (args) => (
  <Breadcrumb
    {...args}
    items={[
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
      { label: 'Product', href: '/category/subcategory/product' },
      { label: 'Details', href: '/category/subcategory/product/details' }
    ]}
    maxItems={3}
  />
);

// With different separator types
export const SeparatorTypes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      separatorType="slash"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      separatorType="chevron"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      separatorType="arrow"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      separatorType="dot"
    />
  </div>
);

// With different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      size="small"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      size="medium"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      size="large"
    />
  </div>
);

// With different variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      variant="default"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      variant="compact"
    />
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Laptops', href: '/products/laptops' }
      ]}
      variant="expanded"
    />
  </div>
);

// With responsive variant
export const ResponsiveVariant = () => (
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', href: '/products/laptops' }
    ]}
    variant={{ base: 'compact', md: 'default', lg: 'expanded' }}
  />
);

// With custom home icon
export const CustomHomeIcon = () => (
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', href: '/products/laptops' }
    ]}
    showHomeIcon={true}
    homeIconName="house"
  />
);

// With clickable last item
export const ClickableLastItem = () => (
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', href: '/products/laptops' }
    ]}
    lastItemClickable={true}
  />
);

// With onClick handlers
export const WithOnClickHandlers = () => (
  <Breadcrumb
    items={[
      { 
        label: 'Home', 
        href: '/', 
        onClick: (e) => {
          e.preventDefault();
          alert('Home clicked');
        } 
      },
      { 
        label: 'Products', 
        href: '/products', 
        onClick: (e) => {
          e.preventDefault();
          alert('Products clicked');
        } 
      },
      { 
        label: 'Laptops', 
        href: '/products/laptops', 
        onClick: (e) => {
          e.preventDefault();
          alert('Laptops clicked');
        } 
      }
    ]}
    lastItemClickable={true}
  />
);

// With custom element
export const AsCustomElement = () => (
  <Breadcrumb
    as="div"
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Laptops', href: '/products/laptops' }
    ]}
  />
);
