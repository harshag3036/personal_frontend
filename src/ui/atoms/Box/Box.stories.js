/**
 * Box Component Stories
 */

import React from 'react';
import Box, { BOX_MODIFIERS } from './index';

export default {
  title: 'Atoms/Box',
  component: Box,
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'header', 'footer', 'aside'],
      description: 'HTML element to render the Box as',
      defaultValue: 'div',
    },
    padding: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size',
    },
    margin: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Margin size',
    },
    background: {
      control: 'select',
      options: [
        'background-primary',
        'background-secondary',
        'background-tertiary',
        'background-surface',
        'background-muted',
      ],
      description: 'Background color',
    },
    border: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'muted'],
      description: 'Border color',
    },
    borderRadius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'circle'],
      description: 'Border radius',
    },
    shadow: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Box shadow',
    },
    width: {
      control: 'text',
      description: 'Width (any valid CSS width)',
    },
    height: {
      control: 'text',
      description: 'Height (any valid CSS height)',
    },
    display: {
      control: 'select',
      options: ['block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
      description: 'Display property',
    },
    position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'Position property',
    },
    overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'Overflow property',
    },
    children: {
      control: 'text',
      description: 'Box content',
      defaultValue: 'Box Content',
    },
  },
};

// Basic Box
export const Basic = (args) => (
  <Box {...args}>
    {args.children}
  </Box>
);

Basic.args = {
  padding: 'md',
  background: 'background-surface',
  children: 'Basic Box Example',
};

// Box with border and shadow
export const WithBorderAndShadow = (args) => (
  <Box {...args}>
    {args.children}
  </Box>
);

WithBorderAndShadow.args = {
  padding: 'md',
  background: 'background-surface',
  border: 'primary',
  borderRadius: 'md',
  shadow: 'md',
  children: 'Box with Border and Shadow',
};

// Box as another element
export const AsAnotherElement = (args) => (
  <Box {...args}>
    {args.children}
  </Box>
);

AsAnotherElement.args = {
  as: 'section',
  padding: 'lg',
  background: 'background-primary',
  color: 'white',
  children: 'Box as a Section Element',
};

// Box with responsive props
export const WithResponsiveProps = (args) => (
  <Box {...args}>
    {args.children}
  </Box>
);

WithResponsiveProps.args = {
  padding: { base: 'sm', md: 'md', lg: 'lg' },
  display: { base: 'block', md: 'flex' },
  background: 'background-surface',
  children: 'This box has responsive padding and display properties. Resize the window to see the changes.',
};

// Box with BEM modifiers
export const WithBEMModifiers = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Box className={`ui-box--${BOX_MODIFIERS.FULL_WIDTH}`} padding="md" background="background-surface">
      Full Width Box
    </Box>
    
    <Box className={`ui-box--${BOX_MODIFIERS.FLEX}`} padding="md" background="background-surface">
      <div style={{ marginRight: '16px' }}>Flex Item 1</div>
      <div>Flex Item 2</div>
    </Box>
    
    <Box className={`ui-box--${BOX_MODIFIERS.CENTER}`} padding="md" background="background-surface" height="100px">
      Centered Content
    </Box>
    
    <Box className={`ui-box--${BOX_MODIFIERS.RESPONSIVE}`} padding="md" background="background-surface">
      Responsive Box (resize window to see changes)
    </Box>
  </div>
);

// Nested Boxes
export const NestedBoxes = () => (
  <Box padding="lg" background="background-surface" borderRadius="md">
    <h3>Outer Box</h3>
    <Box padding="md" background="background-primary" color="white" borderRadius="sm" margin="md">
      <h4>Inner Box 1</h4>
      <p>Content for inner box 1</p>
    </Box>
    <Box padding="md" background="background-secondary" color="white" borderRadius="sm" margin="md">
      <h4>Inner Box 2</h4>
      <p>Content for inner box 2</p>
    </Box>
  </Box>
);

// Box with custom styles
export const WithCustomStyles = () => (
  <Box 
    padding="md" 
    style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}
    borderRadius="md"
  >
    Box with Custom Gradient Background
  </Box>
);

// Box layout examples
export const LayoutExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <Box padding="md" background="background-surface" borderRadius="md">
      <h3>Card Layout</h3>
      <Box 
        padding="md" 
        background="background-tertiary" 
        borderRadius="sm" 
        margin="md"
        display="flex"
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h4>Card Title</h4>
          <p>Card description goes here</p>
        </div>
        <button>Action</button>
      </Box>
    </Box>
    
    <Box padding="md" background="background-surface" borderRadius="md">
      <h3>Split Layout</h3>
      <Box 
        display="flex" 
        style={{ gap: '16px' }}
      >
        <Box padding="md" background="background-primary" color="white" borderRadius="sm" width="50%">
          Left Column
        </Box>
        <Box padding="md" background="background-secondary" color="white" borderRadius="sm" width="50%">
          Right Column
        </Box>
      </Box>
    </Box>
    
    <Box padding="md" background="background-surface" borderRadius="md">
      <h3>Three Column Layout</h3>
      <Box 
        display="flex" 
        style={{ gap: '16px' }}
      >
        <Box padding="md" background="background-muted" borderRadius="sm" width="33.33%">
          Column 1
        </Box>
        <Box padding="md" background="background-muted" borderRadius="sm" width="33.33%">
          Column 2
        </Box>
        <Box padding="md" background="background-muted" borderRadius="sm" width="33.33%">
          Column 3
        </Box>
      </Box>
    </Box>
  </div>
);
