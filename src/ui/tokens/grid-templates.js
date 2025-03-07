/**
 * Grid template tokens for the UI library
 * 
 * This file defines all grid-related design tokens to ensure consistent
 * grid layouts across the application. These tokens provide standardized
 * grid configurations for various layout needs.
 */

// Import spacing tokens for consistency
import { spacing } from './spacing';

// Grid column counts
export const gridColumns = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
};

// Grid row counts
export const gridRows = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
};

// Grid gap sizes
export const gridGaps = {
  none: spacing['0'],
  xs: spacing['1'],
  sm: spacing['2'],
  md: spacing['4'],
  lg: spacing['6'],
  xl: spacing['8'],
  '2xl': spacing['12'],
  '3xl': spacing['16'],
};

// Grid column sizes
export const gridColumnSizes = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr1: '1fr',
  fr2: '2fr',
  fr3: '3fr',
  fr4: '4fr',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
};

// Grid row sizes
export const gridRowSizes = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr1: '1fr',
  fr2: '2fr',
  fr3: '3fr',
  fr4: '4fr',
};

// Grid template columns
export const gridTemplateColumns = {
  none: 'none',
  
  // Equal width columns
  '1': 'repeat(1, minmax(0, 1fr))',
  '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))',
  '4': 'repeat(4, minmax(0, 1fr))',
  '5': 'repeat(5, minmax(0, 1fr))',
  '6': 'repeat(6, minmax(0, 1fr))',
  '8': 'repeat(8, minmax(0, 1fr))',
  '10': 'repeat(10, minmax(0, 1fr))',
  '12': 'repeat(12, minmax(0, 1fr))',
  
  // Auto-fit columns with minimum width
  'autoFit-xs': `repeat(auto-fit, minmax(${spacing['20']}, 1fr))`,
  'autoFit-sm': `repeat(auto-fit, minmax(${spacing['24']}, 1fr))`,
  'autoFit-md': `repeat(auto-fit, minmax(${spacing['32']}, 1fr))`,
  'autoFit-lg': `repeat(auto-fit, minmax(${spacing['40']}, 1fr))`,
  'autoFit-xl': `repeat(auto-fit, minmax(${spacing['48']}, 1fr))`,
  
  // Auto-fill columns with minimum width
  'autoFill-xs': `repeat(auto-fill, minmax(${spacing['20']}, 1fr))`,
  'autoFill-sm': `repeat(auto-fill, minmax(${spacing['24']}, 1fr))`,
  'autoFill-md': `repeat(auto-fill, minmax(${spacing['32']}, 1fr))`,
  'autoFill-lg': `repeat(auto-fill, minmax(${spacing['40']}, 1fr))`,
  'autoFill-xl': `repeat(auto-fill, minmax(${spacing['48']}, 1fr))`,
  
  // Common layouts
  'sidebar': '250px 1fr',
  'sidebarNarrow': '200px 1fr',
  'sidebarWide': '300px 1fr',
  'sidebarRight': '1fr 250px',
  'sidebarRightNarrow': '1fr 200px',
  'sidebarRightWide': '1fr 300px',
  'doubleSidebar': '250px 1fr 250px',
  'doubleSidebarNarrow': '200px 1fr 200px',
  'doubleSidebarWide': '300px 1fr 300px',
  'headerContent': '1fr 3fr',
  'contentHeader': '3fr 1fr',
  'threeColumn': '1fr 2fr 1fr',
  'twoEqualColumns': '1fr 1fr',
  'threeEqualColumns': '1fr 1fr 1fr',
  'fourEqualColumns': '1fr 1fr 1fr 1fr',
};

// Grid template rows
export const gridTemplateRows = {
  none: 'none',
  
  // Equal height rows
  '1': 'repeat(1, minmax(0, 1fr))',
  '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))',
  '4': 'repeat(4, minmax(0, 1fr))',
  '5': 'repeat(5, minmax(0, 1fr))',
  '6': 'repeat(6, minmax(0, 1fr))',
  
  // Auto-fit rows with minimum height
  'autoFit-xs': `repeat(auto-fit, minmax(${spacing['10']}, 1fr))`,
  'autoFit-sm': `repeat(auto-fit, minmax(${spacing['16']}, 1fr))`,
  'autoFit-md': `repeat(auto-fit, minmax(${spacing['20']}, 1fr))`,
  'autoFit-lg': `repeat(auto-fit, minmax(${spacing['24']}, 1fr))`,
  'autoFit-xl': `repeat(auto-fit, minmax(${spacing['32']}, 1fr))`,
  
  // Common layouts
  'header-content': 'auto 1fr',
  'header-content-footer': 'auto 1fr auto',
  'content-footer': '1fr auto',
  'equalHeight': 'repeat(1, 1fr)',
  'autoHeight': 'auto',
};

// Grid template areas
export const gridTemplateAreas = {
  // Basic layout with header, main content, and footer
  'headerContentFooter': `
    "header header header"
    "main main main"
    "footer footer footer"
  `,
  
  // Layout with header, sidebar, main content, and footer
  'headerSidebarContentFooter': `
    "header header header"
    "sidebar main main"
    "footer footer footer"
  `,
  
  // Layout with header, sidebar, main content, aside, and footer
  'headerSidebarContentAsideFooter': `
    "header header header header"
    "sidebar main main aside"
    "footer footer footer footer"
  `,
  
  // Dashboard layout with header, sidebar, and multiple content areas
  'dashboard': `
    "header header header header"
    "sidebar content1 content1 content2"
    "sidebar content3 content4 content4"
    "sidebar content5 content5 content5"
    "footer footer footer footer"
  `,
  
  // App layout with header, navigation, toolbar, main content, and footer
  'app': `
    "header header header"
    "nav toolbar toolbar"
    "nav main main"
    "footer footer footer"
  `,
  
  // Holy grail layout
  'holyGrail': `
    "header header header"
    "left content right"
    "footer footer footer"
  `,
};

// Grid auto flow options
export const gridAutoFlow = {
  row: 'row',
  column: 'column',
  rowDense: 'row dense',
  columnDense: 'column dense',
};

// Grid auto rows
export const gridAutoRows = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: '1fr',
};

// Grid auto columns
export const gridAutoColumns = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: '1fr',
};

// Responsive grid templates
// These can be used with media queries for responsive layouts
export const responsiveGridTemplates = {
  // Mobile-first responsive grid
  columns: {
    xs: gridTemplateColumns['1'],
    sm: gridTemplateColumns['2'],
    md: gridTemplateColumns['3'],
    lg: gridTemplateColumns['4'],
    xl: gridTemplateColumns['6'],
  },
  
  // Responsive sidebar layout
  sidebar: {
    xs: gridTemplateColumns['1'],
    sm: gridTemplateColumns['1'],
    md: gridTemplateColumns.sidebar,
    lg: gridTemplateColumns.sidebar,
    xl: gridTemplateColumns.sidebarWide,
  },
  
  // Responsive dashboard layout
  dashboard: {
    xs: gridTemplateAreas['headerContentFooter'],
    sm: gridTemplateAreas['headerContentFooter'],
    md: gridTemplateAreas['headerSidebarContentFooter'],
    lg: gridTemplateAreas['dashboard'],
    xl: gridTemplateAreas['dashboard'],
  },
};

// Layout presets
// Complete grid configurations for common layouts
export const layoutPresets = {
  // Basic single column layout
  singleColumn: {
    gridTemplateColumns: gridTemplateColumns['1'],
    gridTemplateRows: gridTemplateRows['autoHeight'],
    gridGap: gridGaps.md,
  },
  
  // Two column layout
  twoColumn: {
    gridTemplateColumns: gridTemplateColumns['2'],
    gridTemplateRows: gridTemplateRows['autoHeight'],
    gridGap: gridGaps.md,
  },
  
  // Three column layout
  threeColumn: {
    gridTemplateColumns: gridTemplateColumns['3'],
    gridTemplateRows: gridTemplateRows['autoHeight'],
    gridGap: gridGaps.md,
  },
  
  // Sidebar layout
  sidebar: {
    gridTemplateColumns: gridTemplateColumns.sidebar,
    gridTemplateRows: gridTemplateRows['autoHeight'],
    gridGap: gridGaps.md,
  },
  
  // Header, content, footer layout
  headerContentFooter: {
    gridTemplateColumns: gridTemplateColumns['1'],
    gridTemplateRows: gridTemplateRows['header-content-footer'],
    gridTemplateAreas: gridTemplateAreas.headerContentFooter,
    gridGap: gridGaps.md,
  },
  
  // Dashboard layout
  dashboard: {
    gridTemplateColumns: 'auto 1fr 1fr 1fr',
    gridTemplateRows: 'auto 1fr 1fr 1fr auto',
    gridTemplateAreas: gridTemplateAreas.dashboard,
    gridGap: gridGaps.md,
  },
  
  // Card grid
  cardGrid: {
    gridTemplateColumns: gridTemplateColumns['autoFit-md'],
    gridAutoRows: gridAutoRows.auto,
    gridGap: gridGaps.md,
  },
  
  // Form layout
  form: {
    gridTemplateColumns: 'max-content 1fr',
    gridAutoRows: gridAutoRows.auto,
    gridGap: gridGaps.sm,
    alignItems: 'center',
  },
};

export default {
  gridColumns,
  gridRows,
  gridGaps,
  gridColumnSizes,
  gridRowSizes,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridAutoFlow,
  gridAutoRows,
  gridAutoColumns,
  responsiveGridTemplates,
  layoutPresets,
};
