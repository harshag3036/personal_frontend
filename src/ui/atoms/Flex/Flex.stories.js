/**
 * Flex Component Stories
 */

import React from 'react';
import Flex, { 
  FLEX_MODIFIERS, 
  FLEX_DIRECTIONS, 
  FLEX_ALIGNMENTS, 
  FLEX_JUSTIFICATIONS, 
  FLEX_WRAPS,
  FLEX_GAP_SIZES
} from './index';

export default {
  title: 'Atoms/Flex',
  component: Flex,
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside'],
      description: 'HTML element to render the Flex as',
      defaultValue: 'div',
    },
    direction: {
      control: 'select',
      options: FLEX_DIRECTIONS,
      description: 'Flex direction',
      defaultValue: 'row',
    },
    align: {
      control: 'select',
      options: FLEX_ALIGNMENTS,
      description: 'Align items',
      defaultValue: 'stretch',
    },
    justify: {
      control: 'select',
      options: FLEX_JUSTIFICATIONS,
      description: 'Justify content',
      defaultValue: 'flex-start',
    },
    wrap: {
      control: 'select',
      options: FLEX_WRAPS,
      description: 'Flex wrap',
      defaultValue: 'nowrap',
    },
    gap: {
      control: 'select',
      options: FLEX_GAP_SIZES,
      description: 'Gap between items',
    },
    flexGrow: {
      control: 'number',
      description: 'Flex grow property',
    },
    flexShrink: {
      control: 'number',
      description: 'Flex shrink property',
    },
    flexBasis: {
      control: 'text',
      description: 'Flex basis property',
    },
    flex: {
      control: 'text',
      description: 'Flex shorthand property',
    },
    order: {
      control: 'number',
      description: 'Order property',
    },
    alignSelf: {
      control: 'select',
      options: FLEX_ALIGNMENTS,
      description: 'Align self property',
    },
    padding: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size',
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
  },
};

// Basic Flex
export const Basic = (args) => (
  <Flex {...args}>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
  </Flex>
);

Basic.args = {
  padding: 'md',
  background: 'background-surface',
  gap: 'md',
};

// Row Layout
export const RowLayout = (args) => (
  <Flex {...args}>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
  </Flex>
);

RowLayout.args = {
  direction: 'row',
  align: 'center',
  justify: 'space-between',
  padding: 'md',
  background: 'background-surface',
  gap: 'md',
};

// Column Layout
export const ColumnLayout = (args) => (
  <Flex {...args}>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
  </Flex>
);

ColumnLayout.args = {
  direction: 'column',
  align: 'stretch',
  justify: 'flex-start',
  padding: 'md',
  background: 'background-surface',
  gap: 'md',
};

// Centered Content
export const CenteredContent = (args) => (
  <Flex {...args}>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Centered Content</div>
  </Flex>
);

CenteredContent.args = {
  direction: 'row',
  align: 'center',
  justify: 'center',
  padding: 'md',
  background: 'background-surface',
  height: '200px',
};

// Flex with Wrap
export const WithWrap = (args) => (
  <Flex {...args}>
    {Array.from({ length: 10 }).map((_, index) => (
      <div key={index} style={{ padding: '16px', background: '#e0e0e0', width: '100px' }}>
        Item {index + 1}
      </div>
    ))}
  </Flex>
);

WithWrap.args = {
  direction: 'row',
  wrap: 'wrap',
  padding: 'md',
  background: 'background-surface',
  gap: 'md',
};

// Flex as Navigation
export const AsNavigation = (args) => (
  <Flex {...args}>
    <a href="#" style={{ padding: '16px', textDecoration: 'none', color: 'inherit' }}>Home</a>
    <a href="#" style={{ padding: '16px', textDecoration: 'none', color: 'inherit' }}>About</a>
    <a href="#" style={{ padding: '16px', textDecoration: 'none', color: 'inherit' }}>Services</a>
    <a href="#" style={{ padding: '16px', textDecoration: 'none', color: 'inherit' }}>Contact</a>
  </Flex>
);

AsNavigation.args = {
  as: 'nav',
  direction: 'row',
  align: 'center',
  justify: 'flex-start',
  padding: 'md',
  background: 'background-primary',
  gap: 'md',
};

// Flex with Responsive Props
export const WithResponsiveProps = (args) => (
  <Flex {...args}>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
    <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
  </Flex>
);

WithResponsiveProps.args = {
  direction: { base: 'column', md: 'row' },
  align: { base: 'stretch', md: 'center' },
  justify: { base: 'flex-start', md: 'space-between' },
  padding: 'md',
  background: 'background-surface',
  gap: 'md',
};

// Flex with BEM Modifiers
export const WithBEMModifiers = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Flex className={`ui-flex--${FLEX_MODIFIERS.CENTER_ALL}`} padding="md" background="background-surface" height="100px">
      Centered Content (using CENTER_ALL modifier)
    </Flex>
    
    <Flex className={`ui-flex--${FLEX_MODIFIERS.SPACE_BETWEEN}`} padding="md" background="background-surface">
      <div>Left</div>
      <div>Right</div>
    </Flex>
    
    <Flex className={`ui-flex--${FLEX_MODIFIERS.EQUAL_COLUMNS}`} padding="md" background="background-surface">
      <div style={{ padding: '16px', background: '#e0e0e0' }}>Equal Column 1</div>
      <div style={{ padding: '16px', background: '#e0e0e0' }}>Equal Column 2</div>
      <div style={{ padding: '16px', background: '#e0e0e0' }}>Equal Column 3</div>
    </Flex>
    
    <Flex className={`ui-flex--${FLEX_MODIFIERS.RESPONSIVE}`} padding="md" background="background-surface">
      <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
      <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
      <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
    </Flex>
  </div>
);

// Flex Item Properties
export const FlexItemProperties = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Flex Grow</h3>
      <Flex padding="md" background="background-surface" borderRadius="md">
        <Flex padding="md" background="background-primary" color="white" style={{ width: '100px' }}>
          Fixed Width
        </Flex>
        <Flex padding="md" background="background-secondary" color="white" flexGrow={1}>
          Flex Grow 1
        </Flex>
        <Flex padding="md" background="background-tertiary" color="white" flexGrow={2}>
          Flex Grow 2
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Flex Shrink</h3>
      <Flex padding="md" background="background-surface" borderRadius="md" style={{ width: '400px' }}>
        <Flex padding="md" background="background-primary" color="white" style={{ width: '200px' }} flexShrink={0}>
          No Shrink
        </Flex>
        <Flex padding="md" background="background-secondary" color="white" style={{ width: '200px' }} flexShrink={1}>
          Shrink 1
        </Flex>
        <Flex padding="md" background="background-tertiary" color="white" style={{ width: '200px' }} flexShrink={2}>
          Shrink 2
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Flex Basis</h3>
      <Flex padding="md" background="background-surface" borderRadius="md">
        <Flex padding="md" background="background-primary" color="white" flexBasis="100px">
          Basis 100px
        </Flex>
        <Flex padding="md" background="background-secondary" color="white" flexBasis="200px">
          Basis 200px
        </Flex>
        <Flex padding="md" background="background-tertiary" color="white" flexBasis="300px">
          Basis 300px
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Flex Shorthand</h3>
      <Flex padding="md" background="background-surface" borderRadius="md">
        <Flex padding="md" background="background-primary" color="white" flex="1 0 0">
          Flex: 1 0 0
        </Flex>
        <Flex padding="md" background="background-secondary" color="white" flex="2 0 0">
          Flex: 2 0 0
        </Flex>
        <Flex padding="md" background="background-tertiary" color="white" flex="0 0 200px">
          Flex: 0 0 200px
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Order</h3>
      <Flex padding="md" background="background-surface" borderRadius="md">
        <Flex padding="md" background="background-primary" color="white" order={3}>
          Order 3 (Third)
        </Flex>
        <Flex padding="md" background="background-secondary" color="white" order={1}>
          Order 1 (First)
        </Flex>
        <Flex padding="md" background="background-tertiary" color="white" order={2}>
          Order 2 (Second)
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Align Self</h3>
      <Flex padding="md" background="background-surface" borderRadius="md" height="200px" align="flex-start">
        <Flex padding="md" background="background-primary" color="white">
          Default
        </Flex>
        <Flex padding="md" background="background-secondary" color="white" alignSelf="center">
          Align Self: Center
        </Flex>
        <Flex padding="md" background="background-tertiary" color="white" alignSelf="flex-end">
          Align Self: Flex End
        </Flex>
      </Flex>
    </div>
  </div>
);

// Gap Modifiers
export const GapModifiers = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Gap XS</h3>
      <Flex className={`ui-flex--${FLEX_MODIFIERS.GAP_XS}`} padding="md" background="background-surface" borderRadius="md">
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
      </Flex>
    </div>
    
    <div>
      <h3>Gap SM</h3>
      <Flex className={`ui-flex--${FLEX_MODIFIERS.GAP_SM}`} padding="md" background="background-surface" borderRadius="md">
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
      </Flex>
    </div>
    
    <div>
      <h3>Gap MD</h3>
      <Flex className={`ui-flex--${FLEX_MODIFIERS.GAP_MD}`} padding="md" background="background-surface" borderRadius="md">
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
      </Flex>
    </div>
    
    <div>
      <h3>Gap LG</h3>
      <Flex className={`ui-flex--${FLEX_MODIFIERS.GAP_LG}`} padding="md" background="background-surface" borderRadius="md">
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
      </Flex>
    </div>
    
    <div>
      <h3>Gap XL</h3>
      <Flex className={`ui-flex--${FLEX_MODIFIERS.GAP_XL}`} padding="md" background="background-surface" borderRadius="md">
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e0e0e0' }}>Item 3</div>
      </Flex>
    </div>
  </div>
);

// Common Layout Patterns
export const CommonLayoutPatterns = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Header, Content, Footer Layout</h3>
      <Flex direction="column" padding="md" background="background-surface" borderRadius="md" style={{ minHeight: '300px' }}>
        <Flex padding="md" background="background-primary" color="white" flex="0 0 auto">
          Header
        </Flex>
        <Flex padding="md" background="background-tertiary" flex="1 1 auto">
          Main Content
        </Flex>
        <Flex padding="md" background="background-primary" color="white" flex="0 0 auto">
          Footer
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Sidebar Layout</h3>
      <Flex direction={{ base: 'column', md: 'row' }} padding="md" background="background-surface" borderRadius="md" style={{ minHeight: '300px' }}>
        <Flex direction="column" padding="md" background="background-secondary" color="white" flex="0 0 200px">
          <div>Menu Item 1</div>
          <div>Menu Item 2</div>
          <div>Menu Item 3</div>
        </Flex>
        <Flex padding="md" background="background-tertiary" flex="1 1 auto">
          Main Content
        </Flex>
      </Flex>
    </div>
    
    <div>
      <h3>Card Layout</h3>
      <Flex wrap="wrap" gap="md" padding="md" background="background-surface" borderRadius="md">
        {Array.from({ length: 6 }).map((_, index) => (
          <Flex 
            key={index}
            direction="column" 
            padding="md" 
            background="background-tertiary" 
            borderRadius="sm"
            flex="1 1 200px"
          >
            <div style={{ fontWeight: 'bold' }}>Card {index + 1}</div>
            <div>Card content goes here</div>
            <Flex justify="flex-end" style={{ marginTop: '16px' }}>
              <button>Action</button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  </div>
);
