/**
 * DependencyGraph Constants
 * 
 * This file contains constants used by the DependencyGraph component.
 */

// CSS class names
export const DEPENDENCY_GRAPH_CLASS = 'ui-dependency-graph';
export const DEPENDENCY_GRAPH_HEADER_CLASS = 'ui-dependency-graph-header';
export const DEPENDENCY_GRAPH_TITLE_CLASS = 'ui-dependency-graph-title';
export const DEPENDENCY_GRAPH_SUBTITLE_CLASS = 'ui-dependency-graph-subtitle';
export const DEPENDENCY_GRAPH_BODY_CLASS = 'ui-dependency-graph-body';
export const DEPENDENCY_GRAPH_FOOTER_CLASS = 'ui-dependency-graph-footer';
export const DEPENDENCY_GRAPH_CANVAS_CLASS = 'ui-dependency-graph-canvas';
export const DEPENDENCY_GRAPH_NODE_CLASS = 'ui-dependency-graph-node';
export const DEPENDENCY_GRAPH_NODE_CONTENT_CLASS = 'ui-dependency-graph-node-content';
export const DEPENDENCY_GRAPH_NODE_TITLE_CLASS = 'ui-dependency-graph-node-title';
export const DEPENDENCY_GRAPH_NODE_DESCRIPTION_CLASS = 'ui-dependency-graph-node-description';
export const DEPENDENCY_GRAPH_EDGE_CLASS = 'ui-dependency-graph-edge';
export const DEPENDENCY_GRAPH_CONTROLS_CLASS = 'ui-dependency-graph-controls';
export const DEPENDENCY_GRAPH_LEGEND_CLASS = 'ui-dependency-graph-legend';
export const DEPENDENCY_GRAPH_ACTIONS_CLASS = 'ui-dependency-graph-actions';

// Variants
export const DEPENDENCY_GRAPH_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  DETAILED: 'detailed',
  HIERARCHICAL: 'hierarchical',
  FORCE_DIRECTED: 'force-directed'
};

// Sizes
export const DEPENDENCY_GRAPH_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

// Node Status
export const DEPENDENCY_NODE_STATUS = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  BLOCKED: 'blocked',
  ERROR: 'error',
  WARNING: 'warning'
};

// Edge Types
export const DEPENDENCY_EDGE_TYPES = {
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  BIDIRECTIONAL: 'bidirectional',
  WEAK: 'weak',
  STRONG: 'strong'
};

// Layout Types
export const DEPENDENCY_GRAPH_LAYOUTS = {
  TREE: 'tree',
  RADIAL: 'radial',
  FORCE: 'force',
  GRID: 'grid',
  DAGRE: 'dagre'
};

// Modifiers
export const DEPENDENCY_GRAPH_MODIFIERS = {
  INTERACTIVE: 'interactive',
  DISABLED: 'disabled',
  LOADING: 'loading',
  READONLY: 'readonly',
  EDITABLE: 'editable',
  ZOOMABLE: 'zoomable',
  DRAGGABLE: 'draggable'
};
