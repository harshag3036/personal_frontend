/**
 * MilestoneTracker Example
 * 
 * This file demonstrates the usage of the MilestoneTracker component.
 */

import React, { useState } from 'react';
import { MilestoneTracker } from '../organisms';
import { Button, Icon, Text, Box } from '../atoms';
import { 
  MILESTONE_STATUS, 
  MILESTONE_TRACKER_VARIANTS, 
  MILESTONE_TRACKER_SIZES 
} from '../organisms/MilestoneTracker';

const MilestoneTrackerExample = () => {
  // Sample milestone data
  const [milestones, setMilestones] = useState([
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
  ]);

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

  // Handler for milestone click
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

  // Sample actions
  const trackerActions = (
    <>
      <Button variant="secondary" size="small">Cancel</Button>
      <Button variant="primary" size="small">Save Progress</Button>
    </>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>MilestoneTracker Examples</h2>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Default Vertical Tracker</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Track project progress through key milestones"
          milestones={milestones}
          progress={calculateProgress()}
          interactive={true}
          onMilestoneClick={handleMilestoneClick}
          actions={trackerActions}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Horizontal Tracker</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Horizontal layout for timeline view"
          milestones={milestones}
          progress={calculateProgress()}
          variant={MILESTONE_TRACKER_VARIANTS.HORIZONTAL}
          interactive={true}
          onMilestoneClick={handleMilestoneClick}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Compact Tracker</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Compact view for space efficiency"
          milestones={milestones}
          progress={calculateProgress()}
          variant={MILESTONE_TRACKER_VARIANTS.COMPACT}
          size={MILESTONE_TRACKER_SIZES.SMALL}
          interactive={true}
          onMilestoneClick={handleMilestoneClick}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Detailed Tracker</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Detailed view with more information"
          milestones={milestones}
          progress={calculateProgress()}
          variant={MILESTONE_TRACKER_VARIANTS.DETAILED}
          size={MILESTONE_TRACKER_SIZES.LARGE}
          interactive={true}
          onMilestoneClick={handleMilestoneClick}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Read-only Tracker</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Read-only view for display purposes"
          milestones={milestones}
          progress={calculateProgress()}
          readonly={true}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Loading State</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Loading milestones..."
          milestones={milestones}
          progress={calculateProgress()}
          loading={true}
        />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>Disabled State</h3>
        <MilestoneTracker
          title="Project Timeline"
          subtitle="Disabled milestone tracker"
          milestones={milestones}
          progress={calculateProgress()}
          disabled={true}
        />
      </section>
      
      <section>
        <h3>Usage Instructions</h3>
        <Box padding="md" background="background-surface" borderRadius="md">
          <Text>
            Click on any milestone in the interactive trackers to cycle through the status: Not Started → In Progress → Completed → Not Started
          </Text>
        </Box>
      </section>
    </div>
  );
};

export default MilestoneTrackerExample;
