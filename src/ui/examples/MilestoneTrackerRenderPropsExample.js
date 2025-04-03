import React, { useState } from 'react';
import { Box, Text, Flex, Button, Stack, Divider } from '../atoms';
import Card from '../molecules/Card';
import { StatusBadge as Progress } from '../index';

/**
 * MilestoneTracker Render Props Example
 * 
 * This example demonstrates how to use the MilestoneTracker component with render props pattern
 * to create highly customized milestone tracking visualizations with complete control over rendering.
 */
const MilestoneTrackerRenderPropsExample = () => {
  // Sample milestones data for a project
  const [milestones, setMilestones] = useState([
    { 
      id: 1, 
      title: 'Project Planning', 
      description: 'Define project scope, objectives, and requirements',
      dueDate: '2025-01-15',
      completedDate: '2025-01-12',
      status: 'completed',
      progress: 100
    },
    { 
      id: 2, 
      title: 'Design Phase', 
      description: 'Create wireframes, mockups, and design system',
      dueDate: '2025-02-28',
      completedDate: '2025-03-05',
      status: 'completed',
      progress: 100
    },
    { 
      id: 3, 
      title: 'Development', 
      description: 'Implement frontend and backend functionality',
      dueDate: '2025-04-15',
      completedDate: null,
      status: 'in-progress',
      progress: 65
    },
    { 
      id: 4, 
      title: 'Testing', 
      description: 'Quality assurance and bug fixing',
      dueDate: '2025-05-15',
      completedDate: null,
      status: 'not-started',
      progress: 0
    },
    { 
      id: 5, 
      title: 'Deployment', 
      description: 'Launch application to production',
      dueDate: '2025-06-01',
      completedDate: null,
      status: 'not-started',
      progress: 0
    }
  ]);

  // Tracker configuration state
  const [variant, setVariant] = useState('vertical');  // vertical, horizontal, timeline
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Calculate overall project progress
  const calculateOverallProgress = () => {
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    const inProgressMilestone = milestones.find(m => m.status === 'in-progress');
    
    if (totalMilestones === 0) return 0;
    
    // Count completed milestones as 100% and in-progress milestone with its actual progress
    let progressSum = completedMilestones * 100;
    if (inProgressMilestone) {
      progressSum += inProgressMilestone.progress;
    }
    
    return Math.round(progressSum / totalMilestones);
  };

  // Update milestone status
  const updateMilestoneStatus = (id, newStatus) => {
    setMilestones(prevMilestones => 
      prevMilestones.map(milestone => {
        if (milestone.id === id) {
          const updatedMilestone = {
            ...milestone,
            status: newStatus,
            progress: newStatus === 'completed' ? 100 : 
                     newStatus === 'in-progress' ? 
                       (milestone.progress > 0 ? milestone.progress : 25) : 0,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
          };
          return updatedMilestone;
        }
        return milestone;
      })
    );
  };

  // Handle milestone selection
  const handleMilestoneSelect = (milestone) => {
    setSelectedMilestone(milestone.id === selectedMilestone ? null : milestone.id);
  };

  // Get milestone status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'not-started': return 'textColorSecondary';
      default: return 'textColorSecondary';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Toggle tracker variant
  const toggleVariant = () => {
    setVariant(prev => 
      prev === 'vertical' ? 'horizontal' : 
      prev === 'horizontal' ? 'timeline' : 'vertical'
    );
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">MilestoneTracker with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how the MilestoneTracker component could use the render props pattern
        to create highly customized milestone tracking visualizations.
      </Text>
      
      <Card padding="md" marginBottom="lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h3">Project Progress: {calculateOverallProgress()}%</Text>
          <Button onClick={toggleVariant}>
            Change View: {variant === 'vertical' ? 'Vertical' : variant === 'horizontal' ? 'Horizontal' : 'Timeline'}
          </Button>
        </Flex>
        
        <Progress 
          value={calculateOverallProgress()} 
          size="lg" 
          color="primary"
          marginTop="md"
        />
      </Card>
      
      {/* Example showing how MilestoneTracker would work with render props */}
      <Card padding="md">
        <Text as="h3" marginBottom="md">Using Render Props Pattern</Text>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px', 
          overflowX: 'auto', 
          fontSize: '0.9em' 
        }}>
{`<MilestoneTracker
  milestones={milestones}
  variant={variant}
  onMilestoneSelect={handleMilestoneSelect}
  onStatusChange={updateMilestoneStatus}
>
  {({
    milestones,
    selectedMilestone,
    getStatusColor,
    getStatusIcon,
    overallProgress,
    formatDate,
    variant,
    handleMilestoneSelect,
    updateMilestoneStatus,
    // Additional context
  }) => (
    <Box>
      {/* Custom progress visualization */}
      <YourCustomProgressTracker 
        value={overallProgress} 
      />
      
      {/* Custom milestone rendering based on variant */}
      {variant === 'vertical' && (
        <YourCustomVerticalTracker 
          milestones={milestones}
          selectedMilestone={selectedMilestone}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          onSelect={handleMilestoneSelect}
          onStatusChange={updateMilestoneStatus}
        />
      )}
      
      {variant === 'horizontal' && (
        <YourCustomHorizontalTracker 
          milestones={milestones}
          selectedMilestone={selectedMilestone}
          getStatusColor={getStatusColor}
          onSelect={handleMilestoneSelect}
        />
      )}
      
      {variant === 'timeline' && (
        <YourCustomTimelineTracker 
          milestones={milestones}
          selectedMilestone={selectedMilestone}
          onSelect={handleMilestoneSelect}
          formatDate={formatDate}
        />
      )}
    </Box>
  )}
</MilestoneTracker>`}
        </pre>
      </Card>
      
      <Card padding="md" marginTop="lg">
        <Text as="h3" marginBottom="md">Milestone List</Text>
        <Stack spacing="md">
          {milestones.map(milestone => (
            <Flex 
              key={milestone.id}
              padding="md"
              borderRadius="md"
              border="1px solid"
              borderColor={milestone.id === selectedMilestone ? 'primary' : 'borderColor'}
              backgroundColor={milestone.id === selectedMilestone ? 'background' : 'white'}
              onClick={() => handleMilestoneSelect(milestone)}
              cursor="pointer"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Flex alignItems="center" gap="sm" marginBottom="xs">
                  <Box 
                    width="12px" 
                    height="12px" 
                    borderRadius="full" 
                    backgroundColor={getStatusColor(milestone.status)}
                  />
                  <Text fontWeight="bold">{milestone.title}</Text>
                </Flex>
                <Text fontSize="sm" color="textColorSecondary">
                  {milestone.completedDate ? 
                    `Completed: ${formatDate(milestone.completedDate)}` : 
                    `Due: ${formatDate(milestone.dueDate)}`}
                </Text>
              </Box>
              
              <Box>
                <Text 
                  as="span" 
                  padding="xs" 
                  paddingX="sm" 
                  backgroundColor={getStatusColor(milestone.status)} 
                  color="white" 
                  borderRadius="full" 
                  fontSize="sm"
                >
                  {milestone.status === 'completed' ? 'Completed' : 
                    milestone.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                </Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Card>

      {/* Selected Milestone Details */}
      {selectedMilestone && (
        <Card padding="md" marginTop="lg">
          {milestones
            .filter(milestone => milestone.id === selectedMilestone)
            .map(milestone => (
              <Box key={milestone.id}>
                <Text as="h3" marginBottom="sm">{milestone.title}</Text>
                <Text marginBottom="md">{milestone.description}</Text>
                
                <Flex justifyContent="space-between" alignItems="center" marginBottom="md">
                  <Flex alignItems="center" gap="sm">
                    <Text fontWeight="medium">Status:</Text>
                    <Text 
                      color={getStatusColor(milestone.status)}
                      fontWeight="medium"
                    >
                      {milestone.status === 'completed' ? 'Completed' : 
                      milestone.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                    </Text>
                  </Flex>
                  
                  <Flex alignItems="center" gap="sm">
                    <Text fontWeight="medium">Progress:</Text>
                    <Text fontWeight="medium">{milestone.progress}%</Text>
                  </Flex>
                </Flex>
                
                <Progress 
                  value={milestone.progress} 
                  size="md" 
                  color={getStatusColor(milestone.status)}
                  marginBottom="lg"
                />
                
                <Divider marginY="md" />
                
                <Flex gap="md" justifyContent="center" marginTop="md">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => updateMilestoneStatus(milestone.id, 'not-started')}
                    isDisabled={milestone.status === 'not-started'}
                  >
                    Not Started
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => updateMilestoneStatus(milestone.id, 'in-progress')}
                    isDisabled={milestone.status === 'in-progress'}
                  >
                    In Progress
                  </Button>
                  <Button 
                    variant="primary"
                    size="sm"
                    onClick={() => updateMilestoneStatus(milestone.id, 'completed')}
                    isDisabled={milestone.status === 'completed'}
                  >
                    Complete
                  </Button>
                </Flex>
              </Box>
            ))}
        </Card>
      )}
      
      <Box marginTop="xl">
        <Text as="h3" marginBottom="md">Benefits of Render Props for MilestoneTracker:</Text>
        <ul>
          <li>Custom milestone visualization styles (cards, timelines, gantt charts)</li>
          <li>Different interaction models for different applications</li>
          <li>Specialized progress visualizations</li>
          <li>Custom milestone details views</li>
          <li>Integration with project management tools or data sources</li>
        </ul>
      </Box>
    </Box>
  );
};

export default MilestoneTrackerRenderPropsExample;
