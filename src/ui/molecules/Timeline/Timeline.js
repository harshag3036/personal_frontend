/**
 * Timeline Component
 * 
 * A flexible timeline component for displaying a sequence of events.
 */

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { withPolymorphic } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import './Timeline.css';
import {
  TIMELINE_VARIANTS,
  TIMELINE_SIZES,
  TIMELINE_ORIENTATIONS,
  TIMELINE_ALIGNMENTS,
  TIMELINE_CONNECTOR_TYPES,
  TIMELINE_DEFAULT_PROPS
} from './constants';

// Create a context to share timeline props with child components
const TimelineContext = createContext({});

/**
 * Timeline component
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const Timeline = ({
  as: Component = 'div',
  children,
  className,
  variant = TIMELINE_DEFAULT_PROPS.variant,
  size = TIMELINE_DEFAULT_PROPS.size,
  orientation = TIMELINE_DEFAULT_PROPS.orientation,
  alignment = TIMELINE_DEFAULT_PROPS.alignment,
  connectorType = TIMELINE_DEFAULT_PROPS.connectorType,
  showConnectors = TIMELINE_DEFAULT_PROPS.showConnectors,
  ...rest
}) => {
  // Process responsive props for orientation
  const timelineProps = {};
  
  if (isResponsiveObject(orientation)) {
    // Add data attributes for responsive orientation
    Object.entries(orientation).forEach(([breakpoint, value]) => {
      if (breakpoint !== 'base') {
        timelineProps[`data-${breakpoint}-orientation`] = value;
      }
    });
  }
  
  // Join class names
  const timelineClasses = [
    'ui-timeline',
    `ui-timeline--${isResponsiveObject(orientation) ? orientation.base || TIMELINE_ORIENTATIONS.VERTICAL : orientation}`,
    `ui-timeline--${variant}`,
    className
  ].filter(Boolean).join(' ');

  // Create context value to share with child components
  const contextValue = {
    variant,
    size,
    orientation,
    alignment,
    connectorType,
    showConnectors
  };

  return (
    <TimelineContext.Provider value={contextValue}>
      <Component className={timelineClasses} {...timelineProps} {...rest}>
        {children}
      </Component>
    </TimelineContext.Provider>
  );
};

Timeline.propTypes = {
  /** The HTML element or component to render as */
  as: PropTypes.elementType,
  /** The content of the timeline */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** The visual style variant of the timeline */
  variant: PropTypes.oneOf(Object.values(TIMELINE_VARIANTS)),
  /** The size of the timeline dots */
  size: PropTypes.oneOf(Object.values(TIMELINE_SIZES)),
  /** The orientation of the timeline or responsive object */
  orientation: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TIMELINE_ORIENTATIONS)),
    PropTypes.object,
  ]),
  /** The alignment of timeline items (for vertical orientation) */
  alignment: PropTypes.oneOf(Object.values(TIMELINE_ALIGNMENTS)),
  /** The style of the connectors between timeline items */
  connectorType: PropTypes.oneOf(Object.values(TIMELINE_CONNECTOR_TYPES)),
  /** Whether to show connectors between timeline items */
  showConnectors: PropTypes.bool
};

/**
 * TimelineItem component
 * 
 * Represents a single event in the timeline.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const TimelineItem = ({
  as: Component = 'div',
  children,
  className,
  ...rest
}) => {
  const { alignment, orientation } = useContext(TimelineContext);
  
  // Join class names
  const itemClasses = [
    'ui-timeline-item',
    orientation === TIMELINE_ORIENTATIONS.VERTICAL ? `ui-timeline-item--${alignment}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={itemClasses} {...rest}>
      {children}
    </Component>
  );
};

TimelineItem.propTypes = {
  /** The HTML element or component to render as */
  as: PropTypes.elementType,
  /** The content of the timeline item */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * TimelineDot component
 * 
 * Represents a dot marker in the timeline.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const TimelineDot = ({
  as: Component = 'div',
  children,
  className,
  variant: propVariant,
  size: propSize,
  ...rest
}) => {
  const { variant: contextVariant, size: contextSize } = useContext(TimelineContext);
  
  const variant = propVariant || contextVariant;
  const size = propSize || contextSize;
  
  // Join class names
  const dotClasses = [
    'ui-timeline-dot',
    `ui-timeline-dot--${variant}`,
    `ui-timeline-dot--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={dotClasses} {...rest}>
      {children}
    </Component>
  );
};

TimelineDot.propTypes = {
  /** The HTML element or component to render as */
  as: PropTypes.elementType,
  /** The content of the timeline dot */
  children: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** The visual style variant of the dot */
  variant: PropTypes.oneOf(Object.values(TIMELINE_VARIANTS)),
  /** The size of the dot */
  size: PropTypes.oneOf(Object.values(TIMELINE_SIZES))
};

/**
 * TimelineConnector component
 * 
 * Represents a connector line between timeline items.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const TimelineConnector = ({
  as: Component = 'div',
  className,
  variant: propVariant,
  connectorType: propConnectorType,
  ...rest
}) => {
  const { 
    variant: contextVariant, 
    connectorType: contextConnectorType,
    showConnectors
  } = useContext(TimelineContext);
  
  // Don't render if connectors are disabled
  if (!showConnectors) {
    return null;
  }
  
  const variant = propVariant || contextVariant;
  const connectorType = propConnectorType || contextConnectorType;
  
  // Join class names
  const connectorClasses = [
    'ui-timeline-connector',
    `ui-timeline-connector--${variant}`,
    `ui-timeline-connector--${connectorType}`,
    className
  ].filter(Boolean).join(' ');

  return <Component className={connectorClasses} {...rest} />;
};

TimelineConnector.propTypes = {
  /** The HTML element or component to render as */
  as: PropTypes.elementType,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** The visual style variant of the connector */
  variant: PropTypes.oneOf(Object.values(TIMELINE_VARIANTS)),
  /** The style of the connector */
  connectorType: PropTypes.oneOf(Object.values(TIMELINE_CONNECTOR_TYPES))
};

/**
 * TimelineContent component
 * 
 * Represents the content of a timeline item.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const TimelineContent = ({
  as: Component = 'div',
  children,
  className,
  ...rest
}) => {
  // Join class names
  const contentClasses = [
    'ui-timeline-content',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={contentClasses} {...rest}>
      {children}
    </Component>
  );
};

TimelineContent.propTypes = {
  /** The HTML element or component to render as */
  as: PropTypes.elementType,
  /** The content of the timeline item */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};

// Apply polymorphic HOC
const PolymorphicTimeline = withPolymorphic(Timeline);
const PolymorphicTimelineItem = withPolymorphic(TimelineItem);
const PolymorphicTimelineDot = withPolymorphic(TimelineDot);
const PolymorphicTimelineConnector = withPolymorphic(TimelineConnector);
const PolymorphicTimelineContent = withPolymorphic(TimelineContent);

// Attach subcomponents to the main component
PolymorphicTimeline.Item = PolymorphicTimelineItem;
PolymorphicTimeline.Dot = PolymorphicTimelineDot;
PolymorphicTimeline.Connector = PolymorphicTimelineConnector;
PolymorphicTimeline.Content = PolymorphicTimelineContent;

export default PolymorphicTimeline;
export { 
  PolymorphicTimelineItem as TimelineItem,
  PolymorphicTimelineDot as TimelineDot,
  PolymorphicTimelineConnector as TimelineConnector,
  PolymorphicTimelineContent as TimelineContent
};
