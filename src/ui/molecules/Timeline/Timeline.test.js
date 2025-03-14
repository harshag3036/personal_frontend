/**
 * Timeline Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline, { 
  TimelineItem, 
  TimelineDot, 
  TimelineConnector, 
  TimelineContent 
} from './index';
import { 
  TIMELINE_VARIANTS, 
  TIMELINE_SIZES, 
  TIMELINE_ORIENTATIONS, 
  TIMELINE_ALIGNMENTS,
  TIMELINE_CONNECTOR_TYPES
} from './constants';

describe('Timeline Component', () => {
  // Test basic rendering
  test('renders without crashing', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // Test orientation prop
  test('applies correct orientation class', () => {
    const { container, rerender } = render(
      <Timeline orientation={TIMELINE_ORIENTATIONS.VERTICAL}>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline--vertical')).toBeInTheDocument();
    
    rerender(
      <Timeline orientation={TIMELINE_ORIENTATIONS.HORIZONTAL}>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline--horizontal')).toBeInTheDocument();
  });

  // Test variant prop
  test('applies correct variant to dots', () => {
    const { container } = render(
      <Timeline variant={TIMELINE_VARIANTS.SUCCESS}>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline-dot--success')).toBeInTheDocument();
  });

  // Test size prop
  test('applies correct size to dots', () => {
    const { container } = render(
      <Timeline size={TIMELINE_SIZES.LARGE}>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline-dot--large')).toBeInTheDocument();
  });

  // Test alignment prop
  test('applies correct alignment to items', () => {
    const { container } = render(
      <Timeline alignment={TIMELINE_ALIGNMENTS.RIGHT}>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline-item--right')).toBeInTheDocument();
  });

  // Test connector type prop
  test('applies correct connector type', () => {
    const { container } = render(
      <Timeline connectorType={TIMELINE_CONNECTOR_TYPES.DASHED}>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline-connector--dashed')).toBeInTheDocument();
  });

  // Test showConnectors prop
  test('hides connectors when showConnectors is false', () => {
    const { container } = render(
      <Timeline showConnectors={false}>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    expect(container.querySelector('.ui-timeline-connector')).not.toBeInTheDocument();
  });

  // Test polymorphic rendering
  test('renders with custom HTML element', () => {
    const { container } = render(
      <Timeline as="section">
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    const timeline = container.querySelector('section.ui-timeline');
    expect(timeline).toBeInTheDocument();
  });

  // Test TimelineItem component
  test('renders TimelineItem correctly', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem className="custom-item-class">
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    const item = container.querySelector('.ui-timeline-item.custom-item-class');
    expect(item).toBeInTheDocument();
  });

  // Test TimelineDot component
  test('renders TimelineDot with custom props', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineDot 
            variant={TIMELINE_VARIANTS.WARNING} 
            size={TIMELINE_SIZES.SMALL}
            className="custom-dot-class"
          />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    const dot = container.querySelector('.ui-timeline-dot.ui-timeline-dot--warning.ui-timeline-dot--small.custom-dot-class');
    expect(dot).toBeInTheDocument();
  });

  // Test TimelineConnector component
  test('renders TimelineConnector with custom props', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineDot />
          <TimelineConnector 
            variant={TIMELINE_VARIANTS.WARNING} 
            connectorType={TIMELINE_CONNECTOR_TYPES.DOTTED}
            className="custom-connector-class"
          />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    const connector = container.querySelector('.ui-timeline-connector.ui-timeline-connector--warning.ui-timeline-connector--dotted.custom-connector-class');
    expect(connector).toBeInTheDocument();
  });

  // Test TimelineContent component
  test('renders TimelineContent with custom props', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent className="custom-content-class">
            Test Content
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    const content = container.querySelector('.ui-timeline-content.custom-content-class');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  // Test responsive props
  test('applies responsive props correctly', () => {
    const { container } = render(
      <Timeline 
        orientation={{ 
          base: TIMELINE_ORIENTATIONS.VERTICAL, 
          md: TIMELINE_ORIENTATIONS.HORIZONTAL 
        }}
      >
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>Test Content</TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    
    // Base orientation should be vertical
    expect(container.querySelector('.ui-timeline')).toHaveClass('ui-timeline--vertical');
    
    // For medium screens and up, it should have a data attribute for horizontal
    expect(container.querySelector('.ui-timeline')).toHaveAttribute(
      'data-md-orientation', 
      TIMELINE_ORIENTATIONS.HORIZONTAL
    );
  });
});
