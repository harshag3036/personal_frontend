/**
 * Timeline Component Stories
 */

import React from 'react';
import Timeline, { 
  TimelineItem, 
  TimelineDot, 
  TimelineConnector, 
  TimelineContent 
} from './Timeline';
import { 
  TIMELINE_VARIANTS, 
  TIMELINE_SIZES, 
  TIMELINE_ORIENTATIONS, 
  TIMELINE_ALIGNMENTS,
  TIMELINE_CONNECTOR_TYPES
} from './constants';
import Icon from '../../atoms/Icon';
import Text from '../../atoms/Text';

export default {
  title: 'Molecules/Timeline',
  component: Timeline,
  subcomponents: { 
    TimelineItem, 
    TimelineDot, 
    TimelineConnector, 
    TimelineContent 
  },
  parameters: {
    docs: {
      description: {
        component: 'A flexible timeline component for displaying a sequence of events.'
      }
    }
  }
};

// Basic Timeline
export const Basic = () => (
  <Timeline>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 1</Text>
        <Text>First step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 2</Text>
        <Text>Second step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineContent>
        <Text variant="h6">Step 3</Text>
        <Text>Final step description</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with different variants
export const Variants = () => (
  <Timeline>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.PRIMARY} />
      <TimelineConnector variant={TIMELINE_VARIANTS.PRIMARY} />
      <TimelineContent>
        <Text variant="h6">Primary</Text>
        <Text>Primary variant</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.SECONDARY} />
      <TimelineConnector variant={TIMELINE_VARIANTS.SECONDARY} />
      <TimelineContent>
        <Text variant="h6">Secondary</Text>
        <Text>Secondary variant</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.SUCCESS} />
      <TimelineConnector variant={TIMELINE_VARIANTS.SUCCESS} />
      <TimelineContent>
        <Text variant="h6">Success</Text>
        <Text>Success variant</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.DANGER} />
      <TimelineConnector variant={TIMELINE_VARIANTS.DANGER} />
      <TimelineContent>
        <Text variant="h6">Danger</Text>
        <Text>Danger variant</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.WARNING} />
      <TimelineConnector variant={TIMELINE_VARIANTS.WARNING} />
      <TimelineContent>
        <Text variant="h6">Warning</Text>
        <Text>Warning variant</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.INFO} />
      <TimelineContent>
        <Text variant="h6">Info</Text>
        <Text>Info variant</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with different sizes
export const Sizes = () => (
  <Timeline>
    <TimelineItem>
      <TimelineDot size={TIMELINE_SIZES.SMALL} />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Small</Text>
        <Text>Small size</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot size={TIMELINE_SIZES.MEDIUM} />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Medium</Text>
        <Text>Medium size</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot size={TIMELINE_SIZES.LARGE} />
      <TimelineContent>
        <Text variant="h6">Large</Text>
        <Text>Large size</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Horizontal Timeline
export const Horizontal = () => (
  <Timeline orientation={TIMELINE_ORIENTATIONS.HORIZONTAL}>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 1</Text>
        <Text>First step</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 2</Text>
        <Text>Second step</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 3</Text>
        <Text>Third step</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineContent>
        <Text variant="h6">Step 4</Text>
        <Text>Final step</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with right alignment
export const RightAligned = () => (
  <Timeline alignment={TIMELINE_ALIGNMENTS.RIGHT}>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 1</Text>
        <Text>First step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 2</Text>
        <Text>Second step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineContent>
        <Text variant="h6">Step 3</Text>
        <Text>Final step description</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with alternate alignment
export const AlternateAlignment = () => (
  <Timeline alignment={TIMELINE_ALIGNMENTS.ALTERNATE}>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 1</Text>
        <Text>First step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 2</Text>
        <Text>Second step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 3</Text>
        <Text>Third step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineContent>
        <Text variant="h6">Step 4</Text>
        <Text>Final step description</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with different connector types
export const ConnectorTypes = () => (
  <Timeline>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector connectorType={TIMELINE_CONNECTOR_TYPES.SOLID} />
      <TimelineContent>
        <Text variant="h6">Solid</Text>
        <Text>Solid connector</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector connectorType={TIMELINE_CONNECTOR_TYPES.DASHED} />
      <TimelineContent>
        <Text variant="h6">Dashed</Text>
        <Text>Dashed connector</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector connectorType={TIMELINE_CONNECTOR_TYPES.DOTTED} />
      <TimelineContent>
        <Text variant="h6">Dotted</Text>
        <Text>Dotted connector</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineContent>
        <Text variant="h6">No Connector</Text>
        <Text>Final step</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with icons
export const WithIcons = () => (
  <Timeline>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.PRIMARY}>
        <Icon name="calendar" size="small" />
      </TimelineDot>
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Schedule</Text>
        <Text>Schedule the meeting</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.SUCCESS}>
        <Icon name="check" size="small" />
      </TimelineDot>
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Prepare</Text>
        <Text>Prepare the agenda</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.WARNING}>
        <Icon name="bell" size="small" />
      </TimelineDot>
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Notify</Text>
        <Text>Send notifications</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot variant={TIMELINE_VARIANTS.INFO}>
        <Icon name="users" size="small" />
      </TimelineDot>
      <TimelineContent>
        <Text variant="h6">Meet</Text>
        <Text>Conduct the meeting</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with responsive props
export const Responsive = () => (
  <Timeline 
    orientation={{ 
      base: TIMELINE_ORIENTATIONS.VERTICAL, 
      md: TIMELINE_ORIENTATIONS.HORIZONTAL 
    }}
  >
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 1</Text>
        <Text>First step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <Text variant="h6">Step 2</Text>
        <Text>Second step description</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineDot />
      <TimelineContent>
        <Text variant="h6">Step 3</Text>
        <Text>Final step description</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);

// Timeline with custom HTML elements
export const CustomElements = () => (
  <Timeline as="section">
    <TimelineItem as="article">
      <TimelineDot as="span" />
      <TimelineConnector />
      <TimelineContent as="div">
        <Text variant="h6">Custom Elements</Text>
        <Text>Using different HTML elements</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem as="article">
      <TimelineDot as="span" />
      <TimelineConnector />
      <TimelineContent as="div">
        <Text variant="h6">Polymorphic</Text>
        <Text>Rendered with custom elements</Text>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem as="article">
      <TimelineDot as="span" />
      <TimelineContent as="div">
        <Text variant="h6">Flexible</Text>
        <Text>Final step with custom elements</Text>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
);
