/**
 * DependencyGraph Component Stories
 */

import React, { useState } from 'react';
import DependencyGraph from './index';
import { 
  DEPENDENCY_NODE_STATUS, 
  DEPENDENCY_EDGE_TYPES, 
  DEPENDENCY_GRAPH_VARIANTS, 
  DEPENDENCY_GRAPH_LAYOUTS 
} from './constants';
import { Box, Text, Button, Icon } from '../../atoms';

export default {
  title: 'Organisms/DependencyGraph',
  component: DependencyGraph,
  parameters: {
    docs: {
      description: {
        component: 'A component for visualizing dependencies between nodes in a graph structure. Supports different layouts, interactive nodes, and customizable styling.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Graph ID',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Graph title',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Graph subtitle',
      table: {
        type: { summary: 'string' },
      },
    },
    nodes: {
      control: { type: 'object' },
      description: 'Array of node objects',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    edges: {
      control: { type: 'object' },
      description: 'Array of edge objects',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    controls: {
      control: { type: null },
      description: 'Controls to display in the graph',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    legend: {
      control: { type: null },
      description: 'Legend to display in the graph',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    actions: {
      control: { type: null },
      description: 'Actions to display in the footer',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(DEPENDENCY_GRAPH_VARIANTS),
      description: 'Graph variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(DEPENDENCY_GRAPH_SIZES),
      description: 'Graph size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    layout: {
      control: 'select',
      options: Object.values(DEPENDENCY_GRAPH_LAYOUTS),
      description: 'Graph layout',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'dagre' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether nodes are interactive',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    draggable: {
      control: 'boolean',
      description: 'Whether nodes are draggable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    zoomable: {
      control: 'boolean',
      description: 'Whether the graph is zoomable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the graph is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the graph is loading',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the graph is readonly',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onNodeClick: {
      action: 'nodeClicked',
      description: 'Node click handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onNodeDragStart: {
      action: 'nodeDragStarted',
      description: 'Node drag start handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onNodeDrag: {
      action: 'nodeDragged',
      description: 'Node drag handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onNodeDragEnd: {
      action: 'nodeDragEnded',
      description: 'Node drag end handler',
      table: {
        type: { summary: 'function' },
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
    extensions: {
      control: { type: 'array' },
      description: 'Extensions to apply to the graph',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    children: {
      control: { type: null },
      description: 'Additional content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

// Sample node data
const sampleNodes = [
  {
    id: 'node1',
    title: 'Project Setup',
    description: 'Initial project configuration',
    icon: <Icon name="settings" />,
    status: DEPENDENCY_NODE_STATUS.COMPLETED
  },
  {
    id: 'node2',
    title: 'Design System',
    description: 'Create design tokens and components',
    icon: <Icon name="palette" />,
    status: DEPENDENCY_NODE_STATUS.COMPLETED
  },
  {
    id: 'node3',
    title: 'Frontend Framework',
    description: 'Set up React and routing',
    icon: <Icon name="code" />,
    status: DEPENDENCY_NODE_STATUS.COMPLETED
  },
  {
    id: 'node4',
    title: 'API Integration',
    description: 'Connect to backend services',
    icon: <Icon name="api" />,
    status: DEPENDENCY_NODE_STATUS.IN_PROGRESS
  },
  {
    id: 'node5',
    title: 'Authentication',
    description: 'Implement user login and registration',
    icon: <Icon name="lock" />,
    status: DEPENDENCY_NODE_STATUS.NOT_STARTED
  }
];

// Sample edge data
const sampleEdges = [
  {
    source: 'node1',
    target: 'node2',
    type: DEPENDENCY_EDGE_TYPES.REQUIRED
  },
  {
    source: 'node1',
    target: 'node3',
    type: DEPENDENCY_EDGE_TYPES.REQUIRED
  },
  {
    source: 'node2',
    target: 'node4',
    type: DEPENDENCY_EDGE_TYPES.REQUIRED
  },
  {
    source: 'node3',
    target: 'node4',
    type: DEPENDENCY_EDGE_TYPES.REQUIRED
  },
  {
    source: 'node4',
    target: 'node5',
    type: DEPENDENCY_EDGE_TYPES.REQUIRED
  }
];

// Sample controls
const sampleControls = (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button size="small" variant="secondary">Reset</Button>
    <Button size="small" variant="secondary">Zoom In</Button>
    <Button size="small" variant="secondary">Zoom Out</Button>
  </div>
);

// Sample legend
const sampleLegend = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Text size="sm" weight="bold">Status:</Text>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-background-primary)', border: '1px solid var(--color-border-medium)', borderRadius: '50%' }}></div>
      <Text size="sm">Not Started</Text>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-info-100)', border: '1px solid var(--color-info-500)', borderRadius: '50%' }}></div>
      <Text size="sm">In Progress</Text>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-success-100)', border: '1px solid var(--color-success-500)', borderRadius: '50%' }}></div>
      <Text size="sm">Completed</Text>
    </div>
  </div>
);

// Sample actions
const sampleActions = (
  <>
    <Button variant="secondary" size="small">Cancel</Button>
    <Button variant="primary" size="small">Save Changes</Button>
  </>
);

// Basic DependencyGraph
export const Basic = {
  args: {
    title: 'Project Dependencies',
    subtitle: 'Visualizing the dependencies between project components',
    nodes: sampleNodes,
    edges: sampleEdges,
    layout: DEPENDENCY_GRAPH_LAYOUTS.DAGRE,
  },
};

// Interactive DependencyGraph
export const Interactive = {
  args: {
    title: 'Interactive Dependencies',
    subtitle: 'Click on nodes to interact with them',
    nodes: sampleNodes,
    edges: sampleEdges,
    layout: DEPENDENCY_GRAPH_LAYOUTS.DAGRE,
    interactive: true,
  },
};

// Draggable DependencyGraph
export const Draggable = {
  args: {
    title: 'Draggable Dependencies',
    subtitle: 'Drag nodes to rearrange them',
    nodes: sampleNodes,
    edges: sampleEdges,
    layout: DEPENDENCY_GRAPH_LAYOUTS.DAGRE,
    interactive: true,
    draggable: true,
  },
};

// With Controls, Legend, and Actions
export const WithControlsLegendActions = {
  args: {
    title: 'Project Dependencies',
    subtitle: 'With controls, legend, and actions',
    nodes: sampleNodes,
    edges: sampleEdges,
    layout: DEPENDENCY_GRAPH_LAYOUTS.DAGRE,
    interactive: true,
    controls: sampleControls,
    legend: sampleLegend,
    actions: sampleActions,
  },
};

// Different Layouts
export const Layouts = () => {
  const [currentLayout, setCurrentLayout] = useState(DEPENDENCY_GRAPH_LAYOUTS.DAGRE);
  
  return (
    <Box display="flex" flexDirection="column" gap="lg">
      <Box>
        <Text variant="h3">Select Layout:</Text>
        <Box display="flex" gap="sm" marginTop="sm">
          {Object.values(DEPENDENCY_GRAPH_LAYOUTS).map(layout => (
            <Button 
              key={layout}
              size="small" 
              variant={layout === currentLayout ? 'primary' : 'secondary'}
              onClick={() => setCurrentLayout(layout)}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </Button>
          ))}
        </Box>
      </Box>
      
      <DependencyGraph
        title={`${currentLayout.charAt(0).toUpperCase() + currentLayout.slice(1)} Layout`}
        subtitle={`Using the ${currentLayout} layout algorithm`}
        nodes={sampleNodes}
        edges={sampleEdges}
        layout={currentLayout}
        interactive={true}
      />
    </Box>
  );
};

// Different Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(DEPENDENCY_GRAPH_VARIANTS).map(variant => (
      <Box key={variant}>
        <Text variant="h3">{variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</Text>
        <DependencyGraph
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
          subtitle={`Using the ${variant} variant`}
          nodes={sampleNodes}
          edges={sampleEdges}
          variant={variant}
          interactive={true}
        />
      </Box>
    ))}
  </Box>
);

// Different Sizes
export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(DEPENDENCY_GRAPH_SIZES).map(size => (
      <Box key={size}>
        <Text variant="h3">{size.charAt(0).toUpperCase() + size.slice(1)} Size</Text>
        <DependencyGraph
          title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
          subtitle={`Using the ${size} size`}
          nodes={sampleNodes}
          edges={sampleEdges}
          size={size}
          interactive={true}
        />
      </Box>
    ))}
  </Box>
);

// Different States
export const States = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    <Box>
      <Text variant="h3">Default State</Text>
      <DependencyGraph
        title="Default State"
        subtitle="Normal interactive graph"
        nodes={sampleNodes}
        edges={sampleEdges}
        interactive={true}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Disabled State</Text>
      <DependencyGraph
        title="Disabled State"
        subtitle="Graph is disabled"
        nodes={sampleNodes}
        edges={sampleEdges}
        interactive={true}
        disabled={true}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Loading State</Text>
      <DependencyGraph
        title="Loading State"
        subtitle="Graph is loading"
        nodes={sampleNodes}
        edges={sampleEdges}
        interactive={true}
        loading={true}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Readonly State</Text>
      <DependencyGraph
        title="Readonly State"
        subtitle="Graph is readonly"
        nodes={sampleNodes}
        edges={sampleEdges}
        interactive={true}
        readonly={true}
      />
    </Box>
  </Box>
);

// Interactive Example with State Changes
export const InteractiveWithStateChanges = () => {
  const [nodes, setNodes] = useState(sampleNodes);
  
  const handleNodeClick = (nodeId) => {
    setNodes(prevNodes => 
      prevNodes.map(node => {
        if (node.id === nodeId) {
          // Cycle through statuses: NOT_STARTED -> IN_PROGRESS -> COMPLETED -> NOT_STARTED
          let newStatus;
          switch (node.status) {
            case DEPENDENCY_NODE_STATUS.NOT_STARTED:
              newStatus = DEPENDENCY_NODE_STATUS.IN_PROGRESS;
              break;
            case DEPENDENCY_NODE_STATUS.IN_PROGRESS:
              newStatus = DEPENDENCY_NODE_STATUS.COMPLETED;
              break;
            case DEPENDENCY_NODE_STATUS.COMPLETED:
              newStatus = DEPENDENCY_NODE_STATUS.NOT_STARTED;
              break;
            default:
              newStatus = DEPENDENCY_NODE_STATUS.NOT_STARTED;
          }
          return { ...node, status: newStatus };
        }
        return node;
      })
    );
  };
  
  return (
    <Box display="flex" flexDirection="column" gap="md">
      <Text>Click on any node to cycle through the status: Not Started → In Progress → Completed → Not Started</Text>
      
      <DependencyGraph
        title="Interactive State Changes"
        subtitle="Click on nodes to change their status"
        nodes={nodes}
        edges={sampleEdges}
        interactive={true}
        onNodeClick={handleNodeClick}
        legend={sampleLegend}
      />
    </Box>
  );
};

// Custom Styling
export const CustomStyling = {
  args: {
    title: 'Custom Styled Graph',
    subtitle: 'With custom styling applied',
    nodes: sampleNodes,
    edges: sampleEdges,
    interactive: true,
    className: 'custom-graph',
    style: {
      backgroundColor: 'var(--color-background-secondary)',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-md)',
    },
  },
};
