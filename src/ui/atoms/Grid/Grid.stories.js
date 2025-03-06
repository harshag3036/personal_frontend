/**
 * Grid Component Stories
 */

import React from 'react';
import Grid, { GRID_MODIFIERS } from './index';
import Box from '../Box';
import Text from '../Text';

export default {
  title: 'Atoms/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: 'A CSS Grid container with responsive props. This component extends the Box component with grid-specific properties.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'text',
      description: 'Grid template columns (e.g., "1fr 2fr", "repeat(3, 1fr)") or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: '1fr' },
      },
    },
    rows: {
      control: 'text',
      description: 'Grid template rows (e.g., "auto 1fr auto") or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between grid items or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    columnGap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Column gap between grid items or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    rowGap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Row gap between grid items or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    areas: {
      control: 'text',
      description: 'Grid template areas or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    autoColumns: {
      control: 'text',
      description: 'Grid auto columns or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    autoRows: {
      control: 'text',
      description: 'Grid auto rows or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    autoFlow: {
      control: 'select',
      options: ['row', 'column', 'row dense', 'column dense'],
      description: 'Grid auto flow or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Grid as',
      table: {
        type: { summary: 'string | React.ComponentType' },
        defaultValue: { summary: 'div' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

// Create a grid item component for the stories
const GridItem = ({ children, ...props }) => (
  <Box 
    padding="md" 
    background="background-secondary" 
    borderRadius="md" 
    border="secondary"
    {...props}
  >
    <Text>{children}</Text>
  </Box>
);

// Basic Grid
export const Basic = {
  args: {
    columns: '1fr 1fr',
    gap: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
};

// Grid with different column widths
export const DifferentColumnWidths = {
  args: {
    columns: '1fr 2fr 1fr',
    gap: 'md',
    children: (
      <>
        <GridItem>1fr</GridItem>
        <GridItem>2fr</GridItem>
        <GridItem>1fr</GridItem>
      </>
    ),
  },
};

// Grid with auto-fill
export const AutoFill = {
  args: {
    columns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
        <GridItem>Item 7</GridItem>
        <GridItem>Item 8</GridItem>
      </>
    ),
  },
};

// Grid with auto-fit
export const AutoFit = {
  args: {
    columns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
};

// Grid with template areas
export const TemplateAreas = {
  args: {
    columns: '1fr 3fr',
    rows: 'auto 1fr auto',
    areas: `
      "header header"
      "sidebar content"
      "footer footer"
    `,
    gap: 'md',
    children: (
      <>
        <GridItem style={{ gridArea: 'header' }}>Header</GridItem>
        <GridItem style={{ gridArea: 'sidebar' }}>Sidebar</GridItem>
        <GridItem style={{ gridArea: 'content' }}>Content</GridItem>
        <GridItem style={{ gridArea: 'footer' }}>Footer</GridItem>
      </>
    ),
  },
};

// Grid with responsive columns
export const ResponsiveColumns = {
  args: {
    columns: {
      base: '1fr',
      sm: '1fr 1fr',
      md: '1fr 1fr 1fr',
      lg: '1fr 2fr 1fr',
    },
    gap: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
      </>
    ),
  },
};

// Grid with responsive gap
export const ResponsiveGap = {
  args: {
    columns: '1fr 1fr 1fr',
    gap: {
      base: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    },
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
};

// Grid with different gaps
export const DifferentGaps = {
  args: {
    columns: '1fr 1fr 1fr',
    columnGap: 'lg',
    rowGap: 'sm',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
};

// Grid with auto flow
export const AutoFlow = {
  args: {
    columns: '1fr 1fr 1fr',
    autoFlow: 'dense',
    gap: 'md',
    children: (
      <>
        <GridItem style={{ gridColumn: 'span 2' }}>Span 2</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem style={{ gridColumn: 'span 2' }}>Span 2</GridItem>
        <GridItem>Item 5</GridItem>
      </>
    ),
  },
};

// Grid with auto rows
export const AutoRows = {
  args: {
    columns: '1fr 1fr 1fr',
    autoRows: 'minmax(100px, auto)',
    gap: 'md',
    children: (
      <>
        <GridItem>Short content</GridItem>
        <GridItem>
          This cell has more content, which will make the row taller.
          The auto rows property ensures that all rows are at least 100px tall.
        </GridItem>
        <GridItem>Short content</GridItem>
        <GridItem>Short content</GridItem>
        <GridItem>Short content</GridItem>
        <GridItem>Short content</GridItem>
      </>
    ),
  },
};

// Grid with BEM modifiers
export const WithBEMModifiers = {
  args: {
    className: `ui-grid--${GRID_MODIFIERS.THREE_COLUMNS} ui-grid--${GRID_MODIFIERS.GAP_MD}`,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
};

// Grid with predefined layouts
export const PredefinedLayouts = () => (
  <Box display="flex" flexDirection="column" gap="xl">
    <Box>
      <Text as="h3">Sidebar Content Layout</Text>
      <Grid className={`ui-grid--${GRID_MODIFIERS.SIDEBAR_CONTENT}`} gap="md">
        <GridItem>Sidebar</GridItem>
        <GridItem>Content</GridItem>
      </Grid>
    </Box>
    
    <Box>
      <Text as="h3">Content Sidebar Layout</Text>
      <Grid className={`ui-grid--${GRID_MODIFIERS.CONTENT_SIDEBAR}`} gap="md">
        <GridItem>Content</GridItem>
        <GridItem>Sidebar</GridItem>
      </Grid>
    </Box>
    
    <Box>
      <Text as="h3">Header Content Footer Layout</Text>
      <Grid className={`ui-grid--${GRID_MODIFIERS.HEADER_CONTENT_FOOTER}`} gap="md">
        <GridItem>Header</GridItem>
        <GridItem>Content</GridItem>
        <GridItem>Footer</GridItem>
      </Grid>
    </Box>
    
    <Box>
      <Text as="h3">Holy Grail Layout</Text>
      <Grid className={`ui-grid--${GRID_MODIFIERS.AREAS_HOLY_GRAIL}`} gap="md" height="300px">
        <GridItem style={{ gridArea: 'header' }}>Header</GridItem>
        <GridItem style={{ gridArea: 'nav' }}>Nav</GridItem>
        <GridItem style={{ gridArea: 'content' }}>Content</GridItem>
        <GridItem style={{ gridArea: 'aside' }}>Aside</GridItem>
        <GridItem style={{ gridArea: 'footer' }}>Footer</GridItem>
      </Grid>
    </Box>
    
    <Box>
      <Text as="h3">Dashboard Layout</Text>
      <Grid className={`ui-grid--${GRID_MODIFIERS.AREAS_DASHBOARD}`} gap="md" height="300px">
        <GridItem style={{ gridArea: 'header' }}>Header</GridItem>
        <GridItem style={{ gridArea: 'sidebar' }}>Sidebar</GridItem>
        <GridItem style={{ gridArea: 'content' }}>Content</GridItem>
      </Grid>
    </Box>
  </Box>
);

// Grid with polymorphic as prop
export const PolymorphicAs = {
  args: {
    as: 'section',
    columns: '1fr 1fr',
    gap: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
};

// Grid with Box props
export const WithBoxProps = {
  args: {
    columns: '1fr 1fr',
    gap: 'md',
    padding: 'lg',
    background: 'background-tertiary',
    borderRadius: 'lg',
    shadow: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
};
