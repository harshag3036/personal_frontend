/**
 * MilestoneTracker Component Stories
 */

import React, { useState } from 'react';
import MilestoneTracker from './index';
import { 
  MILESTONE_STATUS, 
  MILESTONE_TRACKER_VARIANTS, 
  MILESTONE_TRACKER_SIZES 
} from './constants';
import { Box, Text, Button, Icon } from '../../atoms';

export default {
  title: 'Organisms/MilestoneTracker',
  component: MilestoneTracker,
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying and tracking milestones in a project or activity. Supports different layouts, interactive milestones, and customizable styling.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Tracker ID',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Tracker title',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Tracker subtitle',
      table: {
        type: { summary: 'string' },
      },
    },
    milestones: {
      control: { type: 'object' },
      description: 'Array of milestone objects',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    progress: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0-100)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
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
      options: Object.values(MILESTONE_TRACKER_VARIANTS),
      description: 'Tracker variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(MILESTONE_TRACKER_SIZES),
      description: 'Tracker size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether milestones are interactive',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tracker is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the tracker is loading',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the tracker is readonly',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onMilestoneClick: {
      action: 'milestoneClicked',
      description: 'Milestone click handler',
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
      description: 'Extensions to apply to the tracker',
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

// Sample milestone data
const sampleMilestones = [
  {
    id: 'milestone1',
    title: 'Project Kickoff',
    date: 'Jan 15, 2025',
    description: 'Initial project planning and requirements gathering',
    icon: <Icon name="flag" />,
    status: MILESTONE_STATUS.COMPLETED
  },
  {
    id: 'milestone2',
    title: 'Design Phase',
    date: 'Feb 1, 2025',
    description: 'UI/UX design and prototyping',
    icon: <Icon name="palette" />,
    status: MILESTONE_STATUS.COMPLETED
  },
  {
    id: 'milestone3',
    title: 'Development Sprint 1',
    date: 'Feb 15, 2025',
    description: 'Core functionality implementation',
    icon: <Icon name="code" />,
    status: MILESTONE_STATUS.IN_PROGRESS
  },
  {
    id: 'milestone4',
    title: 'Testing Phase',
    date: 'Mar 1, 2025',
    description: 'QA testing and bug fixes',
    icon: <Icon name="bug" />,
    status: MILESTONE_STATUS.NOT_STARTED
  },
  {
    id: 'milestone5',
    title: 'Deployment',
    date: 'Mar 15, 2025',
    description: 'Production deployment and launch',
    icon: <Icon name="rocket" />,
    status: MILESTONE_STATUS.NOT_STARTED
  }
];

// Sample actions
const sampleActions = (
  <>
    <Button variant="secondary" size="small">Cancel</Button>
    <Button variant="primary" size="small">Save Progress</Button>
  </>
);

// Basic MilestoneTracker
export const Basic = {
  args: {
    title: 'Project Timeline',
    subtitle: 'Track project progress through key milestones',
    milestones: sampleMilestones,
    progress: 40,
  },
};

// Interactive MilestoneTracker
export const Interactive = {
  args: {
    title: 'Interactive Timeline',
    subtitle: 'Click on milestones to interact with them',
    milestones: sampleMilestones,
    progress: 40,
    interactive: true,
  },
};

// With Actions
export const WithActions = {
  args: {
    title: 'Project Timeline',
    subtitle: 'With action buttons',
    milestones: sampleMilestones,
    progress: 40,
    actions: sampleActions,
  },
};

// Different Variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(MILESTONE_TRACKER_VARIANTS).map(variant => (
      <Box key={variant}>
        <Text variant="h3">{variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</Text>
        <MilestoneTracker
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
          subtitle={`Using the ${variant} variant`}
          milestones={sampleMilestones}
          progress={40}
          variant={variant}
        />
      </Box>
    ))}
  </Box>
);

// Different Sizes
export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.values(MILESTONE_TRACKER_SIZES).map(size => (
      <Box key={size}>
        <Text variant="h3">{size.charAt(0).toUpperCase() + size.slice(1)} Size</Text>
        <MilestoneTracker
          title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
          subtitle={`Using the ${size} size`}
          milestones={sampleMilestones}
          progress={40}
          size={size}
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
      <MilestoneTracker
        title="Default State"
        subtitle="Normal milestone tracker"
        milestones={sampleMilestones}
        progress={40}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Disabled State</Text>
      <MilestoneTracker
        title="Disabled State"
        subtitle="Tracker is disabled"
        milestones={sampleMilestones}
        progress={40}
        disabled={true}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Loading State</Text>
      <MilestoneTracker
        title="Loading State"
        subtitle="Tracker is loading"
        milestones={sampleMilestones}
        progress={40}
        loading={true}
      />
    </Box>
    
    <Box>
      <Text variant="h3">Readonly State</Text>
      <MilestoneTracker
        title="Readonly State"
        subtitle="Tracker is readonly"
        milestones={sampleMilestones}
        progress={40}
        readonly={true}
      />
    </Box>
  </Box>
);

// Interactive Example with State Changes
export const InteractiveWithStateChanges = () => {
  const [milestones, setMilestones] = useState(sampleMilestones);
  
  // Calculate progress based on completed milestones
  const calculateProgress = () => {
    const completedCount = milestones.filter(
      milestone => milestone.status === MILESTONE_STATUS.COMPLETED
    ).length;
    
    const inProgressCount = milestones.filter(
      milestone => milestone.status === MILESTONE_STATUS.IN_PROGRESS
    ).length;
    
    // Count in-progress milestones as half complete
    return ((completedCount + (inProgressCount * 0.5)) / milestones.length) * 100;
  };
  
  const handleMilestoneClick = (milestoneId) => {
    setMilestones(prevMilestones => 
      prevMilestones.map(milestone => {
        if (milestone.id === milestoneId) {
          // Cycle through statuses: NOT_STARTED -> IN_PROGRESS -> COMPLETED -> NOT_STARTED
          let newStatus;
          switch (milestone.status) {
            case MILESTONE_STATUS.NOT_STARTED:
              newStatus = MILESTONE_STATUS.IN_PROGRESS;
              break;
            case MILESTONE_STATUS.IN_PROGRESS:
              newStatus = MILESTONE_STATUS.COMPLETED;
              break;
            case MILESTONE_STATUS.COMPLETED:
              newStatus = MILESTONE_STATUS.NOT_STARTED;
              break;
            default:
              newStatus = MILESTONE_STATUS.NOT_STARTED;
          }
          return { ...milestone, status: newStatus };
        }
        return milestone;
      })
    );
  };
  
  return (
    <Box display="flex" flexDirection="column" gap="md">
      <Text>Click on any milestone to cycle through the status: Not Started → In Progress → Completed → Not Started</Text>
      
      <MilestoneTracker
        title="Interactive State Changes"
        subtitle="Click on milestones to change their status"
        milestones={milestones}
        progress={calculateProgress()}
        interactive={true}
        onMilestoneClick={handleMilestoneClick}
      />
      
      <Box marginTop="md">
        <Text variant="h4">Current Progress: {Math.round(calculateProgress())}%</Text>
      </Box>
    </Box>
  );
};

// Horizontal Layout
export const HorizontalLayout = {
  args: {
    title: 'Horizontal Timeline',
    subtitle: 'Milestones displayed horizontally',
    milestones: sampleMilestones,
    progress: 40,
    variant: MILESTONE_TRACKER_VARIANTS.HORIZONTAL,
  },
};

// Custom Styling
export const CustomStyling = {
  args: {
    title: 'Custom Styled Tracker',
    subtitle: 'With custom styling applied',
    milestones: sampleMilestones,
    progress: 40,
    className: 'custom-tracker',
    style: {
      backgroundColor: 'var(--color-background-secondary)',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-md)',
    },
  },
};
