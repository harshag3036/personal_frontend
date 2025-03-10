/**
 * StatusBadge Example
 * 
 * This example demonstrates how to use the StatusBadge component in a real-world scenario.
 */

import React, { useState } from 'react';
import Box from '../atoms/Box/Box';
import Flex from '../atoms/Flex/Flex';
import Text from '../atoms/Text/Text';
import Button from '../atoms/Button/Button';
import Card from '../molecules/Card/Card';
import StatusBadge from '../molecules/StatusBadge/StatusBadge';
import { STATUS_TYPES, STATUS_DEFINITIONS } from '../molecules/StatusBadge/constants';

/**
 * StatusBadgeExample Component
 * 
 * This example shows how to use the StatusBadge component in a task management interface.
 * It demonstrates:
 * - Displaying different status types
 * - Changing status with transitions
 * - Using the StatusBadge with icons and tooltips
 * 
 * @returns {JSX.Element} Example component
 */
const StatusBadgeExample = () => {
  // State for the current task status
  const [taskStatus, setTaskStatus] = useState(STATUS_TYPES.NOT_STARTED);
  
  // Get the current status definition
  const statusDef = STATUS_DEFINITIONS[taskStatus];
  
  // Handle status change
  const handleStatusChange = (newStatus) => {
    setTaskStatus(newStatus);
  };
  
  // Sample tasks with different statuses
  const tasks = [
    { id: 1, title: 'Create UI design', status: STATUS_TYPES.COMPLETED },
    { id: 2, title: 'Implement StatusBadge component', status: STATUS_TYPES.IN_PROGRESS },
    { id: 3, title: 'Write documentation', status: STATUS_TYPES.NOT_STARTED },
    { id: 4, title: 'Add unit tests', status: STATUS_TYPES.ON_HOLD },
    { id: 5, title: 'Refactor code', status: STATUS_TYPES.CANCELLED },
  ];
  
  return (
    <Box padding="lg">
      <Text variant="h2" marginBottom="md">StatusBadge Example</Text>
      
      {/* Task Status Changer */}
      <Card marginBottom="lg">
        <Card.Header>
          <Text variant="h3">Task Status Changer</Text>
        </Card.Header>
        <Card.Body>
          <Flex direction="column" gap="md">
            <Flex alignItems="center" gap="md">
              <Text>Current Status:</Text>
              <StatusBadge 
                status={taskStatus} 
                showIcon 
                showDescription
                size="medium"
              />
            </Flex>
            
            <Text>Change Status:</Text>
            <Flex gap="sm" flexWrap="wrap">
              {statusDef.allowedTransitions.map((nextStatus) => (
                <Button
                  key={nextStatus}
                  variant="outline"
                  onClick={() => handleStatusChange(nextStatus)}
                >
                  Change to {STATUS_DEFINITIONS[nextStatus].label}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
      
      {/* Task List */}
      <Card>
        <Card.Header>
          <Text variant="h3">Task List</Text>
        </Card.Header>
        <Card.Body>
          <Flex direction="column" gap="md">
            {tasks.map((task) => (
              <Flex 
                key={task.id} 
                justifyContent="space-between" 
                alignItems="center"
                padding="sm"
                borderBottom="1px solid var(--color-border)"
              >
                <Text>{task.title}</Text>
                <StatusBadge 
                  status={task.status} 
                  showIcon 
                  showDescription
                />
              </Flex>
            ))}
          </Flex>
        </Card.Body>
      </Card>
      
      {/* Status Legend */}
      <Card marginTop="lg">
        <Card.Header>
          <Text variant="h3">Status Legend</Text>
        </Card.Header>
        <Card.Body>
          <Flex direction="column" gap="md">
            {Object.entries(STATUS_DEFINITIONS).map(([status, def]) => (
              <Flex key={status} alignItems="center" gap="md">
                <StatusBadge status={status} showIcon />
                <Text>{def.description}</Text>
              </Flex>
            ))}
          </Flex>
        </Card.Body>
      </Card>
      
      {/* Responsive Example */}
      <Card marginTop="lg">
        <Card.Header>
          <Text variant="h3">Responsive StatusBadge</Text>
        </Card.Header>
        <Card.Body>
          <Flex direction="column" gap="md">
            <Text>Resize the window to see how the StatusBadge responds:</Text>
            <StatusBadge 
              status={STATUS_TYPES.IN_PROGRESS} 
              size={{ base: 'small', md: 'medium', lg: 'large' }}
              showIcon={{ base: false, md: true }}
              showDescription
            />
          </Flex>
        </Card.Body>
      </Card>
    </Box>
  );
};

export default StatusBadgeExample;
