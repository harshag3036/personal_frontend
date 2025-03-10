/**
 * Timeline Component Example
 * 
 * This example demonstrates how to use the Timeline component in a real-world scenario.
 */

import React from 'react';
import Timeline, { 
  TimelineItem, 
  TimelineDot, 
  TimelineConnector, 
  TimelineContent 
} from '../molecules/Timeline';
import { TIMELINE_VARIANTS } from '../molecules/Timeline/constants';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import Card from '../molecules/Card';

/**
 * Project Timeline Example
 * 
 * This example shows a project timeline with different statuses.
 */
const ProjectTimeline = () => {
  const projectSteps = [
    {
      id: 1,
      title: 'Project Planning',
      date: 'March 15, 2025',
      description: 'Define project scope, objectives, and requirements. Create project plan and timeline.',
      status: 'completed',
      icon: 'clipboard-check'
    },
    {
      id: 2,
      title: 'Design Phase',
      date: 'April 2, 2025',
      description: 'Create wireframes, mockups, and design system. Review and finalize designs.',
      status: 'completed',
      icon: 'palette'
    },
    {
      id: 3,
      title: 'Development',
      date: 'May 10, 2025',
      description: 'Implement frontend and backend components. Integrate APIs and services.',
      status: 'in-progress',
      icon: 'code'
    },
    {
      id: 4,
      title: 'Testing',
      date: 'June 20, 2025',
      description: 'Perform unit testing, integration testing, and user acceptance testing.',
      status: 'pending',
      icon: 'bug'
    },
    {
      id: 5,
      title: 'Deployment',
      date: 'July 15, 2025',
      description: 'Deploy to production environment. Monitor for issues and performance.',
      status: 'pending',
      icon: 'rocket'
    }
  ];

  // Map status to variant
  const getVariantForStatus = (status) => {
    switch (status) {
      case 'completed':
        return TIMELINE_VARIANTS.SUCCESS;
      case 'in-progress':
        return TIMELINE_VARIANTS.PRIMARY;
      case 'pending':
        return TIMELINE_VARIANTS.SECONDARY;
      default:
        return TIMELINE_VARIANTS.INFO;
    }
  };

  return (
    <Box padding="4">
      <Text variant="h4" marginBottom="4">Project Timeline</Text>
      <Timeline>
        {projectSteps.map((step, index) => (
          <TimelineItem key={step.id}>
            <TimelineDot variant={getVariantForStatus(step.status)}>
              <Icon name={step.icon} size="small" />
            </TimelineDot>
            {index < projectSteps.length - 1 && (
              <TimelineConnector variant={getVariantForStatus(step.status)} />
            )}
            <TimelineContent>
              <Card 
                variant={step.status === 'in-progress' ? 'highlighted' : 'default'}
                padding="3"
                marginBottom="3"
              >
                <Text variant="h6">{step.title}</Text>
                <Text variant="caption" color="text-secondary">{step.date}</Text>
                <Text marginTop="2">{step.description}</Text>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  marginTop="2"
                  padding="1"
                  backgroundColor={`${getVariantForStatus(step.status)}-light`}
                  borderRadius="rounded"
                  width="fit-content"
                >
                  <Icon 
                    name={step.status === 'completed' ? 'check-circle' : step.status === 'in-progress' ? 'clock' : 'circle'} 
                    size="small" 
                    color={getVariantForStatus(step.status)}
                    marginRight="1"
                  />
                  <Text 
                    variant="small" 
                    color={getVariantForStatus(step.status)}
                    fontWeight="medium"
                  >
                    {step.status === 'completed' ? 'Completed' : step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </Text>
                </Box>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

/**
 * Activity Timeline Example
 * 
 * This example shows a user activity timeline.
 */
const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'created',
      target: 'Project X',
      time: '2 hours ago',
      icon: 'plus-circle',
      variant: TIMELINE_VARIANTS.SUCCESS
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'commented on',
      target: 'Task #123',
      time: 'Yesterday',
      icon: 'message-circle',
      variant: TIMELINE_VARIANTS.INFO
    },
    {
      id: 3,
      user: 'Alex Johnson',
      action: 'assigned',
      target: 'Bug #456 to Sarah',
      time: '3 days ago',
      icon: 'user-plus',
      variant: TIMELINE_VARIANTS.PRIMARY
    },
    {
      id: 4,
      user: 'Sarah Williams',
      action: 'completed',
      target: 'Feature #789',
      time: 'Last week',
      icon: 'check-circle',
      variant: TIMELINE_VARIANTS.SUCCESS
    },
    {
      id: 5,
      user: 'Mike Brown',
      action: 'flagged',
      target: 'Issue #101 as critical',
      time: '2 weeks ago',
      icon: 'flag',
      variant: TIMELINE_VARIANTS.DANGER
    }
  ];

  return (
    <Box padding="4">
      <Text variant="h4" marginBottom="4">Activity Feed</Text>
      <Timeline>
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id}>
            <TimelineDot variant={activity.variant}>
              <Icon name={activity.icon} size="small" />
            </TimelineDot>
            {index < activities.length - 1 && (
              <TimelineConnector />
            )}
            <TimelineContent>
              <Box marginBottom="3">
                <Text fontWeight="bold">{activity.user}</Text>
                <Text>
                  {activity.action} <Text as="span" fontWeight="medium">{activity.target}</Text>
                </Text>
                <Text variant="small" color="text-secondary">{activity.time}</Text>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

/**
 * Responsive Timeline Example
 * 
 * This example demonstrates a responsive timeline that changes orientation based on screen size.
 */
const ResponsiveTimeline = () => {
  const milestones = [
    {
      id: 1,
      title: 'Phase 1',
      description: 'Research and Planning',
      date: 'Q1 2025'
    },
    {
      id: 2,
      title: 'Phase 2',
      description: 'Design and Prototyping',
      date: 'Q2 2025'
    },
    {
      id: 3,
      title: 'Phase 3',
      description: 'Development and Testing',
      date: 'Q3 2025'
    },
    {
      id: 4,
      title: 'Phase 4',
      description: 'Deployment and Monitoring',
      date: 'Q4 2025'
    }
  ];

  return (
    <Box padding="4">
      <Text variant="h4" marginBottom="4">Project Roadmap</Text>
      <Text marginBottom="3">
        This timeline is vertical on mobile and horizontal on larger screens.
      </Text>
      <Timeline 
        orientation={{ 
          base: 'vertical', 
          md: 'horizontal' 
        }}
      >
        {milestones.map((milestone, index) => (
          <TimelineItem key={milestone.id}>
            <TimelineDot variant={TIMELINE_VARIANTS.PRIMARY} />
            {index < milestones.length - 1 && (
              <TimelineConnector />
            )}
            <TimelineContent>
              <Box 
                textAlign={{ 
                  base: 'left', 
                  md: 'center' 
                }}
                marginBottom="3"
              >
                <Text variant="h6">{milestone.title}</Text>
                <Text>{milestone.description}</Text>
                <Text variant="small" fontWeight="bold">{milestone.date}</Text>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

/**
 * Combined Timeline Examples
 */
const TimelineExample = () => {
  return (
    <Box>
      <ProjectTimeline />
      <Box marginY="6" borderTop="1" borderColor="border" />
      <ActivityTimeline />
      <Box marginY="6" borderTop="1" borderColor="border" />
      <ResponsiveTimeline />
    </Box>
  );
};

export default TimelineExample;
