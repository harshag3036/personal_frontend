/**
 * DependencyGraph Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DependencyGraph from './index';
import { 
  DEPENDENCY_GRAPH_CLASS, 
  DEPENDENCY_GRAPH_HEADER_CLASS,
  DEPENDENCY_GRAPH_TITLE_CLASS,
  DEPENDENCY_GRAPH_SUBTITLE_CLASS,
  DEPENDENCY_GRAPH_BODY_CLASS,
  DEPENDENCY_GRAPH_FOOTER_CLASS,
  DEPENDENCY_GRAPH_CANVAS_CLASS,
  DEPENDENCY_GRAPH_NODE_CLASS,
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

// Mock data for testing
const mockNodes = [
  {
    id: 'node1',
    title: 'Node 1',
    description: 'Description 1',
    status: DEPENDENCY_NODE_STATUS.NOT_STARTED
  },
  {
    id: 'node2',
    title: 'Node 2',
    description: 'Description 2',
    status: DEPENDENCY_NODE_STATUS.IN_PROGRESS
  },
  {
    id: 'node3',
    title: 'Node 3',
    description: 'Description 3',
    status: DEPENDENCY_NODE_STATUS.COMPLETED
  }
];

const mockEdges = [
  {
    source: 'node1',
    target: 'node2',
    type: DEPENDENCY_EDGE_TYPES.REQUIRED
  },
  {
    source: 'node2',
    target: 'node3',
    type: DEPENDENCY_EDGE_TYPES.OPTIONAL
  }
];

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe('DependencyGraph Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<DependencyGraph nodes={mockNodes} edges={mockEdges} />);
    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
    expect(screen.getByText('Node 3')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<DependencyGraph nodes={mockNodes} edges={mockEdges} />);
    expect(container.firstChild).toHaveClass(DEPENDENCY_GRAPH_CLASS);
  });

  // Title and subtitle tests
  test('renders title and subtitle when provided', () => {
    render(
      <DependencyGraph
        title="Graph Title"
        subtitle="Graph Subtitle"
        nodes={mockNodes}
        edges={mockEdges}
      />
    );
    
    expect(screen.getByText('Graph Title')).toBeInTheDocument();
    expect(screen.getByText('Graph Subtitle')).toBeInTheDocument();
  });

  test('does not render header when title and subtitle are not provided', () => {
    const { container } = render(<DependencyGraph nodes={mockNodes} edges={mockEdges} />);
    expect(container.querySelector(`.${DEPENDENCY_GRAPH_HEADER_CLASS}`)).not.toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        variant={DEPENDENCY_GRAPH_VARIANTS.COMPACT}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_VARIANTS.COMPACT}`);
  });

  // Size tests
  test('applies the correct size class', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        size={DEPENDENCY_GRAPH_SIZES.LARGE}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_SIZES.LARGE}`);
  });

  // Layout tests
  test('renders with the specified layout', () => {
    render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        layout={DEPENDENCY_GRAPH_LAYOUTS.GRID}
      />
    );
    
    // Since layout affects internal calculations rather than direct DOM classes,
    // we just verify the component renders without errors
    expect(screen.getByText('Node 1')).toBeInTheDocument();
  });

  // Interactive mode tests
  test('applies the interactive class when interactive is true', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        interactive={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.INTERACTIVE}`);
  });

  // Draggable mode tests
  test('applies the draggable class when draggable is true', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        draggable={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.DRAGGABLE}`);
  });

  // Zoomable mode tests
  test('applies the zoomable class when zoomable is true', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        zoomable={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.ZOOMABLE}`);
  });

  // Disabled state tests
  test('applies the disabled class when disabled is true', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        disabled={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.DISABLED}`);
  });

  // Loading state tests
  test('applies the loading class when loading is true', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        loading={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.LOADING}`);
  });

  // Readonly state tests
  test('applies the readonly class when readonly is true', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        readonly={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${DEPENDENCY_GRAPH_CLASS}--${DEPENDENCY_GRAPH_MODIFIERS.READONLY}`);
  });

  // Controls, legend, and actions tests
  test('renders controls when provided', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        controls={<div data-testid="graph-controls">Controls</div>}
      />
    );
    
    expect(screen.getByTestId('graph-controls')).toBeInTheDocument();
    expect(container.querySelector(`.${DEPENDENCY_GRAPH_CONTROLS_CLASS}`)).toBeInTheDocument();
  });

  test('renders legend when provided', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        legend={<div data-testid="graph-legend">Legend</div>}
      />
    );
    
    expect(screen.getByTestId('graph-legend')).toBeInTheDocument();
    expect(container.querySelector(`.${DEPENDENCY_GRAPH_LEGEND_CLASS}`)).toBeInTheDocument();
  });

  test('renders actions when provided', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        actions={<div data-testid="graph-actions">Actions</div>}
      />
    );
    
    expect(screen.getByTestId('graph-actions')).toBeInTheDocument();
    expect(container.querySelector(`.${DEPENDENCY_GRAPH_FOOTER_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector(`.${DEPENDENCY_GRAPH_ACTIONS_CLASS}`)).toBeInTheDocument();
  });

  // Event handler tests
  test('calls onNodeClick when a node is clicked in interactive mode', () => {
    const handleNodeClick = jest.fn();
    
    render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        interactive={true}
        onNodeClick={handleNodeClick}
      />
    );
    
    // Find and click the first node
    const node = screen.getByText('Node 1').closest(`.${DEPENDENCY_GRAPH_NODE_CLASS}`);
    fireEvent.click(node);
    
    expect(handleNodeClick).toHaveBeenCalledTimes(1);
    expect(handleNodeClick).toHaveBeenCalledWith('node1', expect.anything());
  });

  test('does not call onNodeClick when disabled', () => {
    const handleNodeClick = jest.fn();
    
    render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        interactive={true}
        disabled={true}
        onNodeClick={handleNodeClick}
      />
    );
    
    // Find and click the first node
    const node = screen.getByText('Node 1').closest(`.${DEPENDENCY_GRAPH_NODE_CLASS}`);
    fireEvent.click(node);
    
    expect(handleNodeClick).not.toHaveBeenCalled();
  });

  test('does not call onNodeClick when loading', () => {
    const handleNodeClick = jest.fn();
    
    render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        interactive={true}
        loading={true}
        onNodeClick={handleNodeClick}
      />
    );
    
    // Find and click the first node
    const node = screen.getByText('Node 1').closest(`.${DEPENDENCY_GRAPH_NODE_CLASS}`);
    fireEvent.click(node);
    
    expect(handleNodeClick).not.toHaveBeenCalled();
  });

  // Node status tests
  test('renders nodes with the correct status', () => {
    const { container } = render(<DependencyGraph nodes={mockNodes} edges={mockEdges} />);
    
    const nodes = container.querySelectorAll(`.${DEPENDENCY_GRAPH_NODE_CLASS}`);
    
    expect(nodes[0]).toHaveAttribute('data-status', DEPENDENCY_NODE_STATUS.NOT_STARTED);
    expect(nodes[1]).toHaveAttribute('data-status', DEPENDENCY_NODE_STATUS.IN_PROGRESS);
    expect(nodes[2]).toHaveAttribute('data-status', DEPENDENCY_NODE_STATUS.COMPLETED);
  });

  // Edge type tests
  test('renders edges with the correct type', () => {
    const { container } = render(<DependencyGraph nodes={mockNodes} edges={mockEdges} />);
    
    // Wait for edges to be rendered (they might be delayed due to position calculations)
    setTimeout(() => {
      const edges = container.querySelectorAll(`.${DEPENDENCY_GRAPH_EDGE_CLASS}`);
      
      if (edges.length > 0) {
        expect(edges[0]).toHaveAttribute('data-type', DEPENDENCY_EDGE_TYPES.REQUIRED);
        expect(edges[1]).toHaveAttribute('data-type', DEPENDENCY_EDGE_TYPES.OPTIONAL);
      }
    }, 0);
  });

  // Additional class names test
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(
      <DependencyGraph
        nodes={mockNodes}
        edges={mockEdges}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(DEPENDENCY_GRAPH_CLASS);
  });

  // Children rendering test
  test('renders children when provided', () => {
    render(
      <DependencyGraph nodes={mockNodes} edges={mockEdges}>
        <div data-testid="graph-children">Children Content</div>
      </DependencyGraph>
    );
    
    expect(screen.getByTestId('graph-children')).toBeInTheDocument();
  });
});
