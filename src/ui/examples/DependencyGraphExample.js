/**
 * DependencyGraph Example
 * 
 * This file demonstrates the usage of the DependencyGraph component.
 */

import React, { useState } from 'react';
import { DependencyGraph } from '../organisms';
import { Button, Icon, Text } from '../atoms';
import { 
  DEPENDENCY_NODE_STATUS, 
  DEPENDENCY_EDGE_TYPES, 
  DEPENDENCY_GRAPH_VARIANTS, 
  DEPENDENCY_GRAPH_LAYOUTS 
} from '../organisms/DependencyGraph';

const DependencyGraphExample = () => {
  // Sample node data
  const [nodes, setNodes] = useState([
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
    },
    {
      id: 'node6',
      title: 'Testing',
      description: 'Write unit and integration tests',
      icon: <Icon name="bug" />,
      status: DEPENDENCY_NODE_STATUS.NOT_STARTED
    },
    {
      id: 'node7',
      title: 'Deployment',
      description: 'Configure CI/CD pipeline',
      icon: <Icon name="rocket" />,
      status: DEPENDENCY_NODE_STATUS.NOT_STARTED
    }
  ]);

  // Sample edge data
  const [edges, setEdges] = useState([
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
    },
    {
      source: 'node4',
      target: 'node6',
      type: DEPENDENCY_EDGE_TYPES.OPTIONAL
    },
    {
      source: 'node5',
      target: 'node7',
      type: DEPENDENCY_EDGE_TYPES.WEAK
    },
    {
      source: 'node6',
      target: 'node7',
      type: DEPENDENCY_EDGE_TYPES.STRONG
    }
  ]);

  // Handler for node click
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

  // Handler for node drag
  const handleNodeDrag = (nodeId, position) => {
    // In a real application, you might want to update the node position in your state
    console.log(`Node ${nodeId} dragged to position:`, position);
  };

  // Graph controls
  const graphControls = (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button size="small" variant="secondary">Reset</Button>
      <Button size="small" variant="secondary">Zoom In</Button>
      <Button size="small" variant="secondary">Zoom Out</Button>
    </div>
  );

  // Graph legend
  const graphLegend = (
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

  // Graph actions
  const graphActions = (
    <>
      <Button variant="secondary" size="small">Cancel</Button>
      <Button variant="primary" size="small">Save Changes</Button>
    </>
  );

  // Available layouts
  const layouts = Object.values(DEPENDENCY_GRAPH_LAYOUTS);
  const [currentLayout, setCurrentLayout] = useState(DEPENDENCY_GRAPH_LAYOUTS.DAGRE);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>DependencyGraph Examples</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <Text>Select Layout:</Text>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {layouts.map(layout => (
            <Button 
              key={layout}
              size="small" 
              variant={layout === currentLayout ? 'primary' : 'secondary'}
              onClick={() => setCurrentLayout(layout)}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Default Graph</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Visualizing the dependencies between project components"
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          interactive={true}
          onNodeClick={handleNodeClick}
          controls={graphControls}
          legend={graphLegend}
          actions={graphActions}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Draggable Graph</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Drag nodes to rearrange them"
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          interactive={true}
          draggable={true}
          onNodeClick={handleNodeClick}
          onNodeDrag={handleNodeDrag}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Compact Graph</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Compact view of dependencies"
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          variant={DEPENDENCY_GRAPH_VARIANTS.COMPACT}
          size="small"
          interactive={true}
          onNodeClick={handleNodeClick}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Detailed Graph</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Detailed view of dependencies"
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          variant={DEPENDENCY_GRAPH_VARIANTS.DETAILED}
          size="large"
          interactive={true}
          onNodeClick={handleNodeClick}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Read-only Graph</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Read-only view of dependencies"
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          readonly={true}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Loading State</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Loading dependencies..."
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          loading={true}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Disabled State</h3>
        <DependencyGraph
          title="Project Dependencies"
          subtitle="Disabled dependencies"
          nodes={nodes}
          edges={edges}
          layout={currentLayout}
          disabled={true}
        />
      </section>
      
      <section>
        <h3>Usage Instructions</h3>
        <Text>
          Click on any node in the interactive graphs to cycle through the status: Not Started → In Progress → Completed → Not Started
        </Text>
      </section>
    </div>
  );
};

export default DependencyGraphExample;
