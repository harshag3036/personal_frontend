import React, { useState } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Stack from '../atoms/Stack';
import Divider from '../atoms/Divider';
import Icon from '../atoms/Icon';
import StatusBadge from '../molecules/StatusBadge/StatusBadge';
import { STATUS_TYPES } from '../molecules/StatusBadge/constants';

/**
 * Interactive StatusBadge component to fix the React Hook rules violation
 */
const InteractiveStatusBadge = ({ status }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <StatusBadge status={status}>
      {(badgeState) => {
        const { statusDef, getStatusDescription } = badgeState;
        
        return (
          <Box 
            width="100%"
            borderRadius="md" 
            overflow="hidden"
            transition="all 0.3s"
            boxShadow={isExpanded ? "md" : "sm"}
            border="1px solid"
            borderColor={isExpanded ? statusDef.color : "gray.200"}
          >
            <Flex 
              p={3} 
              alignItems="center" 
              bg={isExpanded ? `${statusDef.color}15` : "white"}
              justifyContent="space-between"
              onClick={() => setIsExpanded(!isExpanded)}
              cursor="pointer"
              borderBottom={isExpanded ? "1px solid" : "none"}
              borderBottomColor={`${statusDef.color}40`}
              transition="background-color 0.3s"
              _hover={{
                bg: `${statusDef.color}10`
              }}
            >
              <Flex alignItems="center">
                <Box 
                  width="10px" 
                  height="10px" 
                  borderRadius="full" 
                  bg={statusDef.color} 
                  mr={2}
                />
                <Text fontWeight="bold" color="gray.800">
                  {statusDef.label}
                </Text>
              </Flex>
              <Box
                transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                transition="transform 0.3s"
              >
                <Icon name="chevron-down" />
              </Box>
            </Flex>
            
            {isExpanded && (
              <Box p={3} bg="white">
                <Text color="gray.600">{getStatusDescription(status)}</Text>
                
                {/* Example actions for each status */}
                <Flex mt={3} justifyContent="flex-end">
                  {status === STATUS_TYPES.NOT_STARTED && (
                    <Box 
                      as="button" 
                      px={3} 
                      py={1} 
                      bg="blue.500" 
                      color="white" 
                      borderRadius="md"
                      fontSize="sm"
                    >
                      Start Now
                    </Box>
                  )}
                  
                  {status === STATUS_TYPES.IN_PROGRESS && (
                    <Flex gap={2}>
                      <Box 
                        as="button" 
                        px={3} 
                        py={1} 
                        bg="orange.500" 
                        color="white" 
                        borderRadius="md"
                        fontSize="sm"
                      >
                        Put On Hold
                      </Box>
                      <Box 
                        as="button" 
                        px={3} 
                        py={1} 
                        bg="green.500" 
                        color="white" 
                        borderRadius="md"
                        fontSize="sm"
                      >
                        Mark Complete
                      </Box>
                    </Flex>
                  )}
                  
                  {status === STATUS_TYPES.ON_HOLD && (
                    <Box 
                      as="button" 
                      px={3} 
                      py={1} 
                      bg="blue.500" 
                      color="white" 
                      borderRadius="md"
                      fontSize="sm"
                    >
                      Resume
                    </Box>
                  )}
                  
                  {status === STATUS_TYPES.COMPLETED && (
                    <Box 
                      as="button" 
                      px={3} 
                      py={1} 
                      bg="purple.500" 
                      color="white" 
                      borderRadius="md"
                      fontSize="sm"
                    >
                      View Details
                    </Box>
                  )}
                  
                  {status === STATUS_TYPES.CANCELLED && (
                    <Box 
                      as="button" 
                      px={3} 
                      py={1} 
                      bg="blue.500" 
                      color="white" 
                      borderRadius="md"
                      fontSize="sm"
                    >
                      Restart
                    </Box>
                  )}
                </Flex>
              </Box>
            )}
          </Box>
        );
      }}
    </StatusBadge>
  );
};

/**
 * Timeline item component to fix React Hook rules violation
 */
const TimelineItem = ({ status, index }) => {
  return (
    <StatusBadge status={status}>
      {(badgeState) => {
        const { statusDef } = badgeState;
        const date = new Date();
        date.setDate(date.getDate() - (Object.values(STATUS_TYPES).length - index - 1));
        
        return (
          <Flex py={3} position="relative" alignItems="flex-start">
            {/* Date column */}
            <Box width="120px" pr={3} fontSize="sm" textAlign="right">
              <Text fontWeight="medium">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Text>
              <Text color="gray.500" fontSize="xs">
                {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Box>
            
            {/* Status dot */}
            <Box 
              width="24px" 
              height="24px" 
              borderRadius="full" 
              bg={statusDef.color} 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              color="white"
              zIndex={2}
              boxShadow="0 0 0 4px white"
            >
              <Icon name={statusDef.icon} size="xs" />
            </Box>
            
            {/* Content */}
            <Box flex={1} ml={4}>
              <Flex alignItems="center" mb={1}>
                <Text fontWeight="bold">{statusDef.label}</Text>
                <Box 
                  ml={2} 
                  px={2} 
                  py="2px" 
                  bg={`${statusDef.color}20`} 
                  borderRadius="full"
                  fontSize="xs"
                  color={statusDef.color}
                >
                  {status}
                </Box>
              </Flex>
              <Text color="gray.600" fontSize="sm">
                {index === 0 ? 'Project created and waiting to be started' : 
                index === 1 ? 'Work actively in progress with 3 team members' : 
                index === 2 ? 'All tasks completed ahead of schedule' : 
                index === 3 ? 'Paused due to dependency on external team' : 
                'Project cancelled due to budget constraints'}
              </Text>
              
              {/* Conditional extra info */}
              {index === 1 && (
                <Flex mt={2} gap={2}>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="purple.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    fontWeight="bold"
                    color="purple.700"
                  >
                    JD
                  </Box>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="blue.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    fontWeight="bold"
                    color="blue.700"
                  >
                    MK
                  </Box>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="green.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    fontWeight="bold"
                    color="green.700"
                  >
                    TS
                  </Box>
                </Flex>
              )}
              
              {index === 2 && (
                <Flex mt={2} alignItems="center" color="green.500" fontSize="sm">
                  <Icon name="check-circle" mr={1} />
                  <Text>Completed 2 days ahead of schedule</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        );
      }}
    </StatusBadge>
  );
};

/**
 * StatusBadgeRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the StatusBadge component.
 */
const StatusBadgeRenderPropsExample = () => {
  return (
    <Stack spacing="xl" p={4}>
      <Box mb={4}>
        <Text variant="h2">StatusBadge with Render Props</Text>
        <Text mb={4}>The StatusBadge component supports render props for complete UI customization</Text>
      </Box>
      
      {/* Standard StatusBadge Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Standard StatusBadge (without render props)</Text>
        <Flex alignItems="center" flexWrap="wrap" gap={3}>
          <StatusBadge status={STATUS_TYPES.NOT_STARTED} showIcon showDescription />
          <StatusBadge status={STATUS_TYPES.IN_PROGRESS} showIcon />
          <StatusBadge status={STATUS_TYPES.COMPLETED} showIcon />
          <StatusBadge status={STATUS_TYPES.ON_HOLD} showIcon />
          <StatusBadge status={STATUS_TYPES.CANCELLED} showIcon />
        </Flex>
      </Box>
      
      <Divider my={4} />
      
      {/* Custom Styled StatusBadge */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Custom Styled StatusBadge with Render Props</Text>
        <Flex flexWrap="wrap" gap={3}>
          {Object.values(STATUS_TYPES).map(statusType => (
            <StatusBadge key={statusType} status={statusType}>
              {(badgeState) => {
                // Get standard props from the badge state
                const { statusDef, getStatusIcon, getStatusLabel } = badgeState;
                
                return (
                  <Box 
                    p={1} 
                    pl={2} 
                    pr={3}
                    borderRadius="full" 
                    bg={`${statusDef.color}15`} 
                    border="1px solid" 
                    borderColor={`${statusDef.color}40`} 
                    display="flex" 
                    alignItems="center"
                    boxShadow="sm"
                  >
                    <Box 
                      width="20px" 
                      height="20px" 
                      borderRadius="full" 
                      bg={statusDef.color} 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center" 
                      mr={2}
                      color="white"
                      fontSize="0.7em"
                    >
                      <Icon name={getStatusIcon(statusType)} size="sm" />
                    </Box>
                    <Text fontWeight="medium" fontSize="sm" color={statusDef.color}>
                      {getStatusLabel(statusType)}
                    </Text>
                  </Box>
                );
              }}
            </StatusBadge>
          ))}
        </Flex>
      </Box>
      
      <Divider my={4} />
      
      {/* Interactive StatusBadge */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Interactive StatusBadge with Render Props</Text>
        
        <Stack spacing={4}>
          {Object.values(STATUS_TYPES).map(statusType => (
            <InteractiveStatusBadge key={statusType} status={statusType} />
          ))}
        </Stack>
      </Box>
      
      <Divider my={4} />
      
      {/* Timeline Status Badge */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Timeline Status Badges with Render Props</Text>
        
        <Box position="relative" p={4}>
          {/* Timeline line */}
          <Box 
            position="absolute" 
            left="calc(120px + 12px)" 
            top={0} 
            bottom={0} 
            width="2px" 
            bg="gray.200" 
            zIndex={1}
          />
          
          <Stack spacing={0}>
            {Object.values(STATUS_TYPES).map((statusType, index) => (
              <TimelineItem key={statusType} status={statusType} index={index} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default StatusBadgeRenderPropsExample;
