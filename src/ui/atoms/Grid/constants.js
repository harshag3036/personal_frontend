/**
 * Grid Component Constants
 * 
 * This file contains constants used by the Grid component.
 */

// Import breakpoints from Box component
import { BOX_BREAKPOINTS } from '../Box';

// Export Grid modifiers for external use
export const GRID_MODIFIERS = {
  // Layout modifiers
  AUTO_FILL: 'auto-fill',
  AUTO_FIT: 'auto-fit',
  EQUAL_COLUMNS: 'equal-columns',
  DENSE: 'dense',
  
  // Column count modifiers
  ONE_COLUMN: '1-column',
  TWO_COLUMNS: '2-columns',
  THREE_COLUMNS: '3-columns',
  FOUR_COLUMNS: '4-columns',
  
  // Layout pattern modifiers
  SIDEBAR_CONTENT: 'sidebar-content',
  CONTENT_SIDEBAR: 'content-sidebar',
  HEADER_CONTENT_FOOTER: 'header-content-footer',
  
  // Responsive modifiers
  RESPONSIVE: 'responsive',
  RESPONSIVE_SM: 'responsive-sm',
  RESPONSIVE_MD: 'responsive-md',
  RESPONSIVE_LG: 'responsive-lg',
  
  // Gap modifiers
  GAP_XS: 'gap-xs',
  GAP_SM: 'gap-sm',
  GAP_MD: 'gap-md',
  GAP_LG: 'gap-lg',
  GAP_XL: 'gap-xl',
  
  // Grid areas modifiers
  AREAS_HOLY_GRAIL: 'areas-holy-grail',
  AREAS_DASHBOARD: 'areas-dashboard',
};

// Export Grid CSS class for external use
export const GRID_CLASS = 'ui-grid';

// Export common grid auto flow values
export const GRID_AUTO_FLOW = ['row', 'column', 'row dense', 'column dense'];

// Export common grid gap sizes
export const GRID_GAP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

// Export breakpoints from Box component
export const GRID_BREAKPOINTS = BOX_BREAKPOINTS;
