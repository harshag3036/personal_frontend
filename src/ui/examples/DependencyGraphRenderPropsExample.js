import React, { useState } from 'react';
import { DependencyGraph, Box, Text, Button, Flex, Stack, Card } from '../index';
import { 
  DEPENDENCY_GRAPH_LAYOUTS,
  DEPENDENCY_NODE_STATUS, 
  DEPENDENCY_EDGE_TYPES
} from '../organisms/DependencyGraph/constants';

/**
 * DependencyGraph Render Props Example
 * 
 * This example demonstrates using the DependencyGraph component with the render props pattern
 * to create a highly customized dependency visualization with tailored UI and interactions.
 */
const DependencyGraphRenderPropsExample = () => {
  // Sample nodes and edges data
  const initialNodes = [
    { id: '1', title: 'Front-end', description: 'UI Components', status: DEPENDENCY_NODE_STATUS.COMPLETED, level: 0 },
    { id: '2', title: 'Backend API', description: 'REST Endpoints', status: DEPENDENCY_NODE_STATUS.COMPLETED, level: 0 },
    { id: '3', title: 'Database', description: 'Data Storage', status: DEPENDENCY_NODE_STATUS.COMPLETED, level: 1 },
    { id: '4', title: 'Authentication', description: 'User Auth', status: DEPENDENCY_NODE_STATUS.IN_PROGRESS, level: 1 },
    { id: '5', title: 'Analytics', description: 'Data Tracking', status: DEPENDENCY_NODE_STATUS.NOT_STARTED, level: 2 },
    { id: '6', title: 'Notifications', description: 'User Alerts', status: DEPENDENCY_NODE_STATUS.BLOCKED, level: 2 },
    { id: '7', title: 'Deployment', description: 'Production Release', status: DEPENDENCY_NODE_STATUS.NOT_STARTED, level: 3 }
  ];
  
  const initialEdges = [
    { id: 'e1-3', source: '1', target: '3', type: DEPENDENCY_EDGE_TYPES.REQUIRED },
    { id: 'e1-4', source: '1', target: '4', type: DEPENDENCY_EDGE_TYPES.REQUIRED },
    { id: 'e2-3', source: '2', target: '3', type: DEPENDENCY_EDGE_TYPES.REQUIRED },
    { id: 'e2-4', source: '2', target: '4', type: DEPENDENCY_EDGE_TYPES.REQUIRED },
    { id: 'e3-5', source: '3', target: '5', type: DEPENDENCY_EDGE_TYPES.OPTIONAL },
    { id: 'e4-6', source: '4', target: '6', type: DEPENDENCY_EDGE_TYPES.REQUIRED },
    { id: 'e5-7', source: '5', target: '7', type: DEPENDENCY_EDGE_TYPES.OPTIONAL },
    { id: 'e6-7', source: '6', target: '7', type: DEPENDENCY_EDGE_TYPES.REQUIRED }
  ];
  
  // State
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [layout, setLayout] = useState(DEPENDENCY_GRAPH_LAYOUTS.DAGRE);
  const [nodePositions, setNodePositions] = useState({});
  
  // Handle node click
  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId === selectedNodeId ? null : nodeId);
  };
  
  // Update node status
  const updateNodeStatus = (nodeId, status) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId ? { ...node, status } : node
      )
    );
  };
  
  // Get the status name
  const getStatusName = (status) => {
    switch(status) {
      case DEPENDENCY_NODE_STATUS.COMPLETED: return 'Completed';
      case DEPENDENCY_NODE_STATUS.IN_PROGRESS: return 'In Progress';
      case DEPENDENCY_NODE_STATUS.NOT_STARTED: return 'Not Started';
      case DEPENDENCY_NODE_STATUS.BLOCKED: return 'Blocked';
      default: return 'Unknown';
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case DEPENDENCY_NODE_STATUS.COMPLETED: return '#4CAF50';
      case DEPENDENCY_NODE_STATUS.IN_PROGRESS: return '#2196F3';
      case DEPENDENCY_NODE_STATUS.NOT_STARTED: return '#9E9E9E';
      case DEPENDENCY_NODE_STATUS.BLOCKED: return '#F44336';
      default: return '#000000';
    }
  };
  
  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Dependency Graph with Render Props</Text>
      
      <Box 
        border="1px solid" 
        borderColor="borderColor" 
        borderRadius="lg" 
        padding="md"
        marginBottom="lg"
      >
        <Flex marginBottom="md" justifyContent="space-between" alignItems="center">
          <Text as="h3">Project Dependencies</Text>
          
          <Box>
            <select 
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              style={{ 
                padding: '8px 12px', 
                borderRadius: '4px',
                border: '1px solid #ccc' 
              }}
            >
              <option value={DEPENDENCY_GRAPH_LAYOUTS.DAGRE}>Hierarchical</option>
              <option value={DEPENDENCY_GRAPH_LAYOUTS.TREE}>Tree</option>
              <option value={DEPENDENCY_GRAPH_LAYOUTS.RADIAL}>Radial</option>
              <option value={DEPENDENCY_GRAPH_LAYOUTS.GRID}>Grid</option>
            </select>
          </Box>
        </Flex>
        
        {/* Custom DependencyGraph using render props */}
        <Box height="500px" position="relative">
          <DependencyGraph
            nodes={nodes}
            edges={edges}
            layout={layout}
            interactive={true}
            draggable={true}
          >
            {({
              nodes,
              edges,
              nodePositions,
              canvasRef,
              handleNodeClick,
              handleNodeDragStart,
              handleNodeDrag,
              handleNodeDragEnd,
              Node,
              Edge
            }) => (
              <>
                {/* Custom Legend */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: 100
                  }}
                >
                  <Text as="h4" marginBottom="xs">Status</Text>
                  <Flex direction="column" gap="xs">
                    {Object.values(DEPENDENCY_NODE_STATUS).map(status => (
                      <Flex key={status} alignItems="center" gap="xs">
                        <Box 
                          width="12px" 
                          height="12px" 
                          backgroundColor={getStatusColor(status)}
                          borderRadius="50%"
                        />
                        <Text fontSize="sm">{getStatusName(status)}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </div>
                
                {/* Canvas Container */}
                <div 
                  ref={canvasRef} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #eee',
                    borderRadius: '4px',
                    background: '#fafafa'
                  }}
                >
                  {/* Render edges with custom styling */}
                  {edges.map(edge => (
                    <Edge
                      key={edge.id || `${edge.source}-${edge.target}`}
                      id={edge.id || `${edge.source}-${edge.target}`}
                      sourceId={edge.source}
                      targetId={edge.target}
                      sourcePosition={nodePositions[edge.source]}
                      targetPosition={nodePositions[edge.target]}
                      type={edge.type}
                    />
                  ))}
                  
                  {/* Render nodes with custom styling */}
                  {nodes.map(node => {
                    const isSelected = node.id === selectedNodeId;
                    
                    return (
                      <Node
                        key={node.id}
                        id={node.id}
                        title={node.title}
                        description={node.description}
                        status={node.status}
                        position={nodePositions[node.id]}
                        onClick={handleNodeClick}
                        onDragStart={handleNodeDragStart}
                        onDrag={handleNodeDrag}
                        onDragEnd={handleNodeDragEnd}
                      >
                        {isSelected && (
                          <div style={{
                            marginTop: '8px',
                            padding: '4px',
                            borderTop: '1px solid #eee'
                          }}>
                            <Button 
                              size="xs" 
                              onClick={(e) => {
                                e.stopPropagation();
                                updateNodeStatus(node.id, DEPENDENCY_NODE_STATUS.COMPLETED);
                              }}
                              style={{ marginRight: '4px' }}
                            >
                              Complete
                            </Button>
                            <Button 
                              size="xs" 
                              onClick={(e) => {
                                e.stopPropagation();
                                updateNodeStatus(node.id, DEPENDENCY_NODE_STATUS.IN_PROGRESS);
                              }}
                            >
                              Start
                            </Button>
                          </div>
                        )}
                      </Node>
                    );
                  })}
                </div>
              </>
            )}
          </DependencyGraph>
        </Box>
      </Box>
      
      {/* Node Detail Panel */}
      {selectedNodeId && (
        <Card padding="md" marginY="md">
          <Text as="h3" marginBottom="sm">Node Details</Text>
          {nodes.filter(node => node.id === selectedNodeId).map(node => (
            <Box key={node.id}>
              <Text as="h4">{node.title}</Text>
              <Text marginBottom="sm">{node.description}</Text>
              
              <Flex alignItems="center" marginBottom="sm">
                <Text fontWeight="bold" marginRight="sm">Status:</Text>
                <Box 
                  padding="xs" 
                  backgroundColor={getStatusColor(node.status)} 
                  color="white"
                  borderRadius="sm"
                >
                  {getStatusName(node.status)}
                </Box>
              </Flex>
              
              <Text marginBottom="xs" fontWeight="bold">Update Status:</Text>
              <Flex gap="sm" flexWrap="wrap">
                {Object.values(DEPENDENCY_NODE_STATUS).map(status => (
                  <Button
                    key={status}
                    size="sm"
                    variant={node.status === status ? 'primary' : 'outline'}
                    onClick={() => updateNodeStatus(node.id, status)}
                  >
                    {getStatusName(status)}
                  </Button>
                ))}
              </Flex>
              
              <Text marginTop="md" marginBottom="xs" fontWeight="bold">Dependencies:</Text>
              <Box>
                <Text fontWeight="bold" marginRight="sm">Depends on:</Text>
                <ul style={{ paddingLeft: '20px', marginTop: '4px' }}>
                  {edges
                    .filter(edge => edge.target === node.id)
                    .map(edge => {
                      const sourceNode = nodes.find(n => n.id === edge.source);
                      return (
                        <li key={edge.id}>
                          {sourceNode?.title} ({edge.type === DEPENDENCY_EDGE_TYPES.REQUIRED ? 'Required' : 'Optional'})
                        </li>
                      );
                    })}
                </ul>
              </Box>
              
              <Box marginTop="sm">
                <Text fontWeight="bold" marginRight="sm">Required for:</Text>
                <ul style={{ paddingLeft: '20px', marginTop: '4px' }}>
                  {edges
                    .filter(edge => edge.source === node.id)
                    .map(edge => {
                      const targetNode = nodes.find(n => n.id === edge.target);
                      return (
                        <li key={edge.id}>
                          {targetNode?.title} ({edge.type === DEPENDENCY_EDGE_TYPES.REQUIRED ? 'Required' : 'Optional'})
                        </li>
                      );
                    })}
                </ul>
              </Box>
            </Box>
          ))}
        </Card>
      )}
      
      <Text as="h3" marginTop="xl" marginBottom="md">Benefits of Render Props with DependencyGraph</Text>
      <ul>
        <li>Complete control over graph rendering while leveraging layout algorithm</li>
        <li>Custom node styling and interactive elements based on state</li>
        <li>Add context-sensitive node actions directly within the graph</li>
        <li>Create integrated legends and controls that interact with the graph</li>
        <li>Build domain-specific dependency visualizations with tailored UX</li>
      </ul>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Code Example</Text>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto', 
        fontSize: '0.9em' 
      }}>
{`<DependencyGraph
  nodes={nodes}
  edges={edges}
  layout={layout}
  interactive={true}
>
  {({
    nodes,
    edges,
    nodePositions,
    canvasRef,
    handleNodeClick,
    Node,
    Edge
  }) => (
    <div ref={canvasRef} className="custom-canvas">
      {/* Custom edges */}
      {edges.map(edge => (
        <Edge
          key={edge.id}
          sourceId={edge.source}
          targetId={edge.target}
          sourcePosition={nodePositions[edge.source]}
          targetPosition={nodePositions[edge.target]}
          type={edge.type}
        />
      ))}
      
      {/* Custom nodes */}
      {nodes.map(node => (
        <Node
          key={node.id}
          id={node.id}
          title={node.title}
          description={node.description}
          status={node.status}
          position={nodePositions[node.id]}
          onClick={handleNodeClick}
        >
          {/* Custom node content */}
          {selectedNode === node.id && (
            <div className="node-actions">
              <button onClick={handleComplete}>
                Complete
              </button>
            </div>
          )}
        </Node>
      ))}
    </div>
  )}
</DependencyGraph>`}
      </pre>
    </Box>
  );
};

export default DependencyGraphRenderPropsExample;
