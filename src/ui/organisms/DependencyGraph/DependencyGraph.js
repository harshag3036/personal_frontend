/**
 * DependencyGraph Component
 * 
 * A component for visualizing dependencies between nodes in a graph structure.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { 
  DEPENDENCY_GRAPH_CLASS,
  DEPENDENCY_GRAPH_HEADER_CLASS,
  DEPENDENCY_GRAPH_TITLE_CLASS,
  DEPENDENCY_GRAPH_SUBTITLE_CLASS,
  DEPENDENCY_GRAPH_BODY_CLASS,
  DEPENDENCY_GRAPH_FOOTER_CLASS,
  DEPENDENCY_GRAPH_CANVAS_CLASS,
  DEPENDENCY_GRAPH_NODE_CLASS,
  DEPENDENCY_GRAPH_NODE_CONTENT_CLASS,
  DEPENDENCY_GRAPH_NODE_TITLE_CLASS,
  DEPENDENCY_GRAPH_NODE_DESCRIPTION_CLASS,
  DEPENDENCY_GRAPH_EDGE_CLASS,
  DEPENDENCY_GRAPH_CONTROLS_CLASS,
  DEPENDENCY_GRAPH_LEGEND_CLASS,
  DEPENDENCY_GRAPH_ACTIONS_CLASS,
  DEPENDENCY_GRAPH_VARIANTS,
  DEPENDENCY_GRAPH_SIZES,
  DEPENDENCY_NODE_STATUS,
  DEPENDENCY_EDGE_TYPES,
  DEPENDENCY_GRAPH_LAYOUTS,
  DEPENDENCY_GRAPH_MODIFIERS
} from './constants';
import './DependencyGraph.css';

/**
 * Node Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Node ID
 * @param {string} props.title - Node title
 * @param {string} props.description - Node description
 * @param {React.ReactNode} props.icon - Node icon
 * @param {string} props.status - Node status
 * @param {Object} props.position - Node position {x, y}
 * @param {Function} props.onClick - Click handler
 * @param {Function} props.onDragStart - Drag start handler
 * @param {Function} props.onDrag - Drag handler
 * @param {Function} props.onDragEnd - Drag end handler
 * @returns {JSX.Element} Node component
 */
const Node = ({
  id,
  title,
  description,
  icon,
  status = DEPENDENCY_NODE_STATUS.NOT_STARTED,
  position,
  onClick,
  onDragStart,
  onDrag,
  onDragEnd,
  children
}) => {
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const handleClick = (event) => {
    if (onClick && !isDragging) {
      onClick(id, event);
    }
  };
  
  const handleMouseDown = (event) => {
    if (onDragStart) {
      const rect = nodeRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      
      setDragOffset({ x: offsetX, y: offsetY });
      setIsDragging(true);
      
      onDragStart(id, event);
    }
  };
  
  const handleMouseMove = (event) => {
    if (isDragging && onDrag) {
      const x = event.clientX - dragOffset.x;
      const y = event.clientY - dragOffset.y;
      
      onDrag(id, { x, y }, event);
    }
  };
  
  const handleMouseUp = (event) => {
    if (isDragging && onDragEnd) {
      setIsDragging(false);
      onDragEnd(id, event);
    }
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const nodeStyle = {
    left: `${position?.x || 0}px`,
    top: `${position?.y || 0}px`,
    cursor: onDragStart ? (isDragging ? 'grabbing' : 'grab') : 'pointer'
  };
  
  return (
    <div
      ref={nodeRef}
      className={DEPENDENCY_GRAPH_NODE_CLASS}
      data-status={status}
      style={nodeStyle}
      onClick={handleClick}
      onMouseDown={onDragStart ? handleMouseDown : undefined}
      role="button"
      tabIndex={0}
    >
      <div className={DEPENDENCY_GRAPH_NODE_CONTENT_CLASS}>
        {icon && <div className="ui-dependency-graph-node-icon">{icon}</div>}
        <h4 className={DEPENDENCY_GRAPH_NODE_TITLE_CLASS}>{title}</h4>
        {description && (
          <p className={DEPENDENCY_GRAPH_NODE_DESCRIPTION_CLASS}>{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Edge Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Edge ID
 * @param {string} props.sourceId - Source node ID
 * @param {string} props.targetId - Target node ID
 * @param {Object} props.sourcePosition - Source node position {x, y}
 * @param {Object} props.targetPosition - Target node position {x, y}
 * @param {string} props.type - Edge type
 * @returns {JSX.Element} Edge component
 */
const Edge = ({
  id,
  sourceId,
  targetId,
  sourcePosition,
  targetPosition,
  type = DEPENDENCY_EDGE_TYPES.REQUIRED
}) => {
  if (!sourcePosition || !targetPosition) {
    return null;
  }
  
  // Calculate edge position and rotation
  const dx = targetPosition.x - sourcePosition.x;
  const dy = targetPosition.y - sourcePosition.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  const edgeStyle = {
    left: `${sourcePosition.x}px`,
    top: `${sourcePosition.y}px`,
    width: `${length}px`,
    transform: `rotate(${angle}deg)`
  };
  
  return (
    <div
      className={DEPENDENCY_GRAPH_EDGE_CLASS}
      data-type={type}
      style={edgeStyle}
      data-source={sourceId}
      data-target={targetId}
    />
  );
};

/**
 * DependencyGraph Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.id] - Graph ID
 * @param {string} [props.title] - Graph title
 * @param {string} [props.subtitle] - Graph subtitle
 * @param {Array<Object>} [props.nodes=[]] - Array of node objects
 * @param {Array<Object>} [props.edges=[]] - Array of edge objects
 * @param {React.ReactNode} [props.controls] - Controls to display in the graph
 * @param {React.ReactNode} [props.legend] - Legend to display in the graph
 * @param {React.ReactNode} [props.actions] - Actions to display in the footer
 * @param {string} [props.variant=DEPENDENCY_GRAPH_VARIANTS.DEFAULT] - Graph variant
 * @param {string} [props.size=DEPENDENCY_GRAPH_SIZES.MEDIUM] - Graph size
 * @param {string} [props.layout=DEPENDENCY_GRAPH_LAYOUTS.DAGRE] - Graph layout
 * @param {boolean} [props.interactive=false] - Whether nodes are interactive
 * @param {boolean} [props.draggable=false] - Whether nodes are draggable
 * @param {boolean} [props.zoomable=false] - Whether the graph is zoomable
 * @param {boolean} [props.disabled=false] - Whether the graph is disabled
 * @param {boolean} [props.loading=false] - Whether the graph is loading
 * @param {boolean} [props.readonly=false] - Whether the graph is readonly
 * @param {Function} [props.onNodeClick] - Node click handler
 * @param {Function} [props.onNodeDragStart] - Node drag start handler
 * @param {Function} [props.onNodeDrag] - Node drag handler
 * @param {Function} [props.onNodeDragEnd] - Node drag end handler
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the graph
 * @param {React.ReactNode} [props.children] - Additional content
 * @returns {JSX.Element} DependencyGraph component
 */
const DependencyGraph = ({
  id,
  title,
  subtitle,
  nodes = [],
  edges = [],
  controls,
  legend,
  actions,
  variant = DEPENDENCY_GRAPH_VARIANTS.DEFAULT,
  size = DEPENDENCY_GRAPH_SIZES.MEDIUM,
  layout = DEPENDENCY_GRAPH_LAYOUTS.DAGRE,
  interactive = false,
  draggable = false,
  zoomable = false,
  disabled = false,
  loading = false,
  readonly = false,
  onNodeClick,
  onNodeDragStart,
  onNodeDrag,
  onNodeDragEnd,
  className = '',
  extensions = [],
  children,
  ...props
}) => {
  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('DependencyGraph', {
      id,
      title,
      subtitle,
      nodes,
      edges,
      controls,
      legend,
      actions,
      variant,
      size,
      layout,
      interactive,
      draggable,
      zoomable,
      disabled,
      loading,
      readonly,
      onNodeClick,
      onNodeDragStart,
      onNodeDrag,
      onNodeDragEnd,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('DependencyGraph: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      id,
      title,
      subtitle,
      nodes,
      edges,
      controls,
      legend,
      actions,
      variant,
      size,
      layout,
      interactive,
      draggable,
      zoomable,
      disabled,
      loading,
      readonly,
      onNodeClick,
      onNodeDragStart,
      onNodeDrag,
      onNodeDragEnd,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    id: extendedId,
    title: extendedTitle,
    subtitle: extendedSubtitle,
    nodes: extendedNodes,
    edges: extendedEdges,
    controls: extendedControls,
    legend: extendedLegend,
    actions: extendedActions,
    variant: extendedVariant,
    size: extendedSize,
    layout: extendedLayout,
    interactive: extendedInteractive,
    draggable: extendedDraggable,
    zoomable: extendedZoomable,
    disabled: extendedDisabled,
    loading: extendedLoading,
    readonly: extendedReadonly,
    onNodeClick: extendedOnNodeClick,
    onNodeDragStart: extendedOnNodeDragStart,
    onNodeDrag: extendedOnNodeDrag,
    onNodeDragEnd: extendedOnNodeDragEnd,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // State for node positions
  const [nodePositions, setNodePositions] = useState({});
  
  // Canvas ref for calculating positions
  const canvasRef = useRef(null);
  
  // Calculate initial node positions based on layout
  useEffect(() => {
    if (canvasRef.current && extendedNodes.length > 0) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const canvasWidth = canvasRect.width;
      const canvasHeight = canvasRect.height;
      
      // Simple layout algorithm based on the selected layout type
      let positions = {};
      
      switch (extendedLayout) {
        case DEPENDENCY_GRAPH_LAYOUTS.TREE:
          // Simple tree layout
          const levels = {};
          
          // Group nodes by level
          extendedNodes.forEach(node => {
            const level = node.level || 0;
            if (!levels[level]) {
              levels[level] = [];
            }
            levels[level].push(node);
          });
          
          // Calculate positions for each level
          Object.keys(levels).forEach(level => {
            const nodesInLevel = levels[level];
            const levelHeight = canvasHeight / (Object.keys(levels).length + 1);
            const levelY = levelHeight * (parseInt(level) + 1);
            
            nodesInLevel.forEach((node, index) => {
              const nodeWidth = 150; // Approximate node width
              const totalWidth = nodeWidth * nodesInLevel.length;
              const startX = (canvasWidth - totalWidth) / 2;
              const x = startX + (index * nodeWidth);
              
              positions[node.id] = { x, y: levelY };
            });
          });
          break;
          
        case DEPENDENCY_GRAPH_LAYOUTS.RADIAL:
          // Simple radial layout
          const centerX = canvasWidth / 2;
          const centerY = canvasHeight / 2;
          const radius = Math.min(canvasWidth, canvasHeight) * 0.4;
          
          extendedNodes.forEach((node, index) => {
            const angle = (index / extendedNodes.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            positions[node.id] = { x, y };
          });
          break;
          
        case DEPENDENCY_GRAPH_LAYOUTS.GRID:
          // Simple grid layout
          const cols = Math.ceil(Math.sqrt(extendedNodes.length));
          const rows = Math.ceil(extendedNodes.length / cols);
          const cellWidth = canvasWidth / cols;
          const cellHeight = canvasHeight / rows;
          
          extendedNodes.forEach((node, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const x = (col * cellWidth) + (cellWidth / 2) - 75; // 75 is half of node width
            const y = (row * cellHeight) + (cellHeight / 2) - 30; // 30 is half of node height
            
            positions[node.id] = { x, y };
          });
          break;
          
        case DEPENDENCY_GRAPH_LAYOUTS.FORCE:
          // Simple force-directed layout (initial positions only)
          extendedNodes.forEach((node, index) => {
            const angle = (index / extendedNodes.length) * 2 * Math.PI;
            const radius = Math.min(canvasWidth, canvasHeight) * 0.4;
            const x = (canvasWidth / 2) + radius * Math.cos(angle);
            const y = (canvasHeight / 2) + radius * Math.sin(angle);
            
            positions[node.id] = { x, y };
          });
          break;
          
        case DEPENDENCY_GRAPH_LAYOUTS.DAGRE:
        default:
          // Simple DAG layout (top to bottom)
          // For simplicity, we'll use a layered approach similar to tree layout
          const nodeMap = {};
          extendedNodes.forEach(node => {
            nodeMap[node.id] = { ...node, level: 0, children: [] };
          });
          
          // Build the graph structure
          extendedEdges.forEach(edge => {
            if (nodeMap[edge.source] && nodeMap[edge.target]) {
              nodeMap[edge.source].children.push(edge.target);
            }
          });
          
          // Find root nodes (nodes with no incoming edges)
          const rootNodes = extendedNodes.filter(node => {
            return !extendedEdges.some(edge => edge.target === node.id);
          });
          
          // Assign levels to nodes
          const assignLevels = (nodeId, level) => {
            const node = nodeMap[nodeId];
            if (!node) return;
            
            if (level > node.level) {
              node.level = level;
            }
            
            node.children.forEach(childId => {
              assignLevels(childId, level + 1);
            });
          };
          
          rootNodes.forEach(node => {
            assignLevels(node.id, 0);
          });
          
          // Group nodes by level
          const dagLevels = {};
          Object.values(nodeMap).forEach(node => {
            if (!dagLevels[node.level]) {
              dagLevels[node.level] = [];
            }
            dagLevels[node.level].push(node);
          });
          
          // Calculate positions for each level
          Object.keys(dagLevels).forEach(level => {
            const nodesInLevel = dagLevels[level];
            const levelHeight = canvasHeight / (Object.keys(dagLevels).length + 1);
            const levelY = levelHeight * (parseInt(level) + 1);
            
            nodesInLevel.forEach((node, index) => {
              const nodeWidth = 150; // Approximate node width
              const totalWidth = nodeWidth * nodesInLevel.length;
              const startX = (canvasWidth - totalWidth) / 2;
              const x = startX + (index * nodeWidth);
              
              positions[node.id] = { x, y: levelY };
            });
          });
          break;
      }
      
      setNodePositions(positions);
    }
  }, [extendedNodes, extendedEdges, extendedLayout, canvasRef.current]);
  
  // Handle node click
  const handleNodeClick = (nodeId, event) => {
    if (extendedDisabled || extendedLoading || !extendedOnNodeClick) return;
    
    try {
      extendedOnNodeClick(nodeId, event);
    } catch (error) {
      console.error('DependencyGraph: Error in onNodeClick handler:', error);
    }
  };
  
  // Handle node drag start
  const handleNodeDragStart = (nodeId, event) => {
    if (extendedDisabled || extendedLoading || extendedReadonly || !extendedOnNodeDragStart) return;
    
    try {
      extendedOnNodeDragStart(nodeId, event);
    } catch (error) {
      console.error('DependencyGraph: Error in onNodeDragStart handler:', error);
    }
  };
  
  // Handle node drag
  const handleNodeDrag = (nodeId, position, event) => {
    if (extendedDisabled || extendedLoading || extendedReadonly || !extendedOnNodeDrag) return;
    
    try {
      extendedOnNodeDrag(nodeId, position, event);
      
      // Update node position
      setNodePositions(prevPositions => ({
        ...prevPositions,
        [nodeId]: position
      }));
    } catch (error) {
      console.error('DependencyGraph: Error in onNodeDrag handler:', error);
    }
  };
  
  // Handle node drag end
  const handleNodeDragEnd = (nodeId, event) => {
    if (extendedDisabled || extendedLoading || extendedReadonly || !extendedOnNodeDragEnd) return;
    
    try {
      extendedOnNodeDragEnd(nodeId, event);
    } catch (error) {
      console.error('DependencyGraph: Error in onNodeDragEnd handler:', error);
    }
  };
  
  // Combine class names
  const graphClasses = [
    DEPENDENCY_GRAPH_CLASS,
    `${DEPENDENCY_GRAPH_CLASS}--${extendedVariant}`,
    `${DEPENDENCY_GRAPH_CLASS}--${extendedSize}`,
    extendedInteractive && `${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.INTERACTIVE}`,
    extendedDraggable && `${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.DRAGGABLE}`,
    extendedZoomable && `${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.ZOOMABLE}`,
    extendedDisabled && `${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.DISABLED}`,
    extendedLoading && `${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.LOADING}`,
    extendedReadonly && `${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.READONLY}`,
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      id={extendedId}
      className={graphClasses}
      {...restProps}
    >
      {(extendedTitle || extendedSubtitle) && (
        <div className={DEPENDENCY_GRAPH_HEADER_CLASS}>
          {extendedTitle && (
            <h3 className={DEPENDENCY_GRAPH_TITLE_CLASS}>{extendedTitle}</h3>
          )}
          {extendedSubtitle && (
            <p className={DEPENDENCY_GRAPH_SUBTITLE_CLASS}>{extendedSubtitle}</p>
          )}
        </div>
      )}
      
      <div className={DEPENDENCY_GRAPH_BODY_CLASS}>
        <div ref={canvasRef} className={DEPENDENCY_GRAPH_CANVAS_CLASS}>
          {/* Render edges */}
          {extendedEdges.map(edge => (
            <Edge
              key={edge.id || `${edge.source}-${edge.target}`}
              id={edge.id || `${edge.source}-${edge.target}`}
              sourceId={edge.source}
              targetId={edge.target}
              sourcePosition={nodePositions[edge.source]}
              targetPosition={nodePositions[edge.target]}
              type={edge.type || DEPENDENCY_EDGE_TYPES.REQUIRED}
            />
          ))}
          
          {/* Render nodes */}
          {extendedNodes.map(node => (
            <Node
              key={node.id}
              id={node.id}
              title={node.title}
              description={node.description}
              icon={node.icon}
              status={node.status || DEPENDENCY_NODE_STATUS.NOT_STARTED}
              position={nodePositions[node.id]}
              onClick={extendedInteractive ? handleNodeClick : undefined}
              onDragStart={extendedDraggable ? handleNodeDragStart : undefined}
              onDrag={extendedDraggable ? handleNodeDrag : undefined}
              onDragEnd={extendedDraggable ? handleNodeDragEnd : undefined}
            >
              {node.content}
            </Node>
          ))}
          
          {extendedControls && (
            <div className={DEPENDENCY_GRAPH_CONTROLS_CLASS}>
              {extendedControls}
            </div>
          )}
          
          {extendedLegend && (
            <div className={DEPENDENCY_GRAPH_LEGEND_CLASS}>
              {extendedLegend}
            </div>
          )}
        </div>
        
        {children}
      </div>
      
      {extendedActions && (
        <div className={DEPENDENCY_GRAPH_FOOTER_CLASS}>
          <div className={DEPENDENCY_GRAPH_ACTIONS_CLASS}>
            {extendedActions}
          </div>
        </div>
      )}
    </div>
  );
};

DependencyGraph.propTypes = {
  /** Graph ID */
  id: PropTypes.string,
  /** Graph title */
  title: PropTypes.string,
  /** Graph subtitle */
  subtitle: PropTypes.string,
  /** Array of node objects */
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.node,
      status: PropTypes.oneOf(Object.values(DEPENDENCY_NODE_STATUS)),
      content: PropTypes.node,
      level: PropTypes.number,
    })
  ),
  /** Array of edge objects */
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf(Object.values(DEPENDENCY_EDGE_TYPES)),
    })
  ),
  /** Controls to display in the graph */
  controls: PropTypes.node,
  /** Legend to display in the graph */
  legend: PropTypes.node,
  /** Actions to display in the footer */
  actions: PropTypes.node,
  /** Graph variant */
  variant: PropTypes.oneOf(Object.values(DEPENDENCY_GRAPH_VARIANTS)),
  /** Graph size */
  size: PropTypes.oneOf(Object.values(DEPENDENCY_GRAPH_SIZES)),
  /** Graph layout */
  layout: PropTypes.oneOf(Object.values(DEPENDENCY_GRAPH_LAYOUTS)),
  /** Whether nodes are interactive */
  interactive: PropTypes.bool,
  /** Whether nodes are draggable */
  draggable: PropTypes.bool,
  /** Whether the graph is zoomable */
  zoomable: PropTypes.bool,
  /** Whether the graph is disabled */
  disabled: PropTypes.bool,
  /** Whether the graph is loading */
  loading: PropTypes.bool,
  /** Whether the graph is readonly */
  readonly: PropTypes.bool,
  /** Node click handler */
  onNodeClick: PropTypes.func,
  /** Node drag start handler */
  onNodeDragStart: PropTypes.func,
  /** Node drag handler */
  onNodeDrag: PropTypes.func,
  /** Node drag end handler */
  onNodeDragEnd: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the graph */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Additional content */
  children: PropTypes.node,
};

export default DependencyGraph;
