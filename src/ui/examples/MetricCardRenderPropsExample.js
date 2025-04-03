import React, { useState } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Grid from '../atoms/Grid';
import Stack from '../atoms/Stack';
import Divider from '../atoms/Divider';
import Icon from '../atoms/Icon';
import MetricCard from '../molecules/MetricCard/MetricCard';
import { METRIC_CARD_VARIANTS } from '../molecules/MetricCard/constants';

/**
 * InteractiveMetricCard component - extracted to fix React Hook rules violation
 */
const InteractiveMetricCard = ({ metric, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <MetricCard
      key={index}
      value={metric.value}
      label={metric.label}
      icon={metric.icon}
      variant={metric.variant}
      trend={metric.trend}
      interactive
      onClick={() => console.log(`Clicked on ${metric.label}`)}
    >
      {(cardState) => (
        <Box 
          p={4} 
          borderRadius="lg" 
          boxShadow={isHovered ? "lg" : "md"} 
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          transition="all 0.2s"
          transform={isHovered ? "translateY(-4px)" : "translateY(0)"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={cardState.handleClick}
          cursor={cardState.interactive ? "pointer" : "default"}
          position="relative"
          overflow="hidden"
        >
          {/* Top color bar */}
          <Box 
            position="absolute" 
            top={0} 
            left={0} 
            right={0} 
            height="4px" 
            bg={
              cardState.variant === 'default' ? 'blue.500' :
              cardState.variant === 'info' ? 'purple.500' :
              cardState.variant === 'success' ? 'green.500' :
              cardState.variant === 'warning' ? 'orange.500' :
              cardState.variant === 'error' ? 'red.500' : 'gray.500'
            }
          />
          
          {/* Icon */}
          <Flex justifyContent="space-between" alignItems="center" mb={3}>
            <Box 
              width="40px" 
              height="40px" 
              borderRadius="md" 
              bg={
                cardState.variant === 'default' ? 'blue.50' :
                cardState.variant === 'info' ? 'purple.50' :
                cardState.variant === 'success' ? 'green.50' :
                cardState.variant === 'warning' ? 'orange.50' :
                cardState.variant === 'error' ? 'red.50' : 'gray.50'
              }
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              color={
                cardState.variant === 'default' ? 'blue.500' :
                cardState.variant === 'info' ? 'purple.500' :
                cardState.variant === 'success' ? 'green.500' :
                cardState.variant === 'warning' ? 'orange.500' :
                cardState.variant === 'error' ? 'red.500' : 'gray.500'
              }
            >
              <Icon name={cardState.icon} size="md" />
            </Box>
            
            {/* Action icon */}
            {isHovered && (
              <Box 
                width="28px" 
                height="28px" 
                borderRadius="md" 
                bg={
                  cardState.variant === 'default' ? 'blue.50' :
                  cardState.variant === 'info' ? 'purple.50' :
                  cardState.variant === 'success' ? 'green.50' :
                  cardState.variant === 'warning' ? 'orange.50' :
                  cardState.variant === 'error' ? 'red.50' : 'gray.50'
                }
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                color="gray.500"
                transition="all 0.2s"
                _hover={{ color: "gray.700" }}
              >
                <Icon name="external-link" size="sm" />
              </Box>
            )}
          </Flex>
          
          {/* Main value */}
          <Text fontWeight="bold" fontSize="2xl">{cardState.value}</Text>
          <Text color="gray.500" fontSize="sm" mb={3}>{cardState.label}</Text>
          
          {/* Trend */}
          {cardState.trend && (
            <Flex alignItems="center">
              <Box 
                width="24px" 
                height="24px" 
                borderRadius="full" 
                bg={cardState.trend.direction === 'up' ? 'green.50' : 'red.50'} 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                color={cardState.trend.direction === 'up' ? 'green.500' : 'red.500'}
                mr={2}
              >
                <Icon name={cardState.trendIcon} size="sm" />
              </Box>
              <Text fontWeight="medium" color={cardState.trend.direction === 'up' ? 'green.500' : 'red.500'}>
                {cardState.trend.value}
              </Text>
              <Text ml={1} fontSize="xs" color="gray.500">
                {cardState.trend.label}
              </Text>
            </Flex>
          )}
        </Box>
      )}
    </MetricCard>
  );
};

/**
 * TimelineMetricCard component - extracted to fix React Hook rules violation
 */
const TimelineMetricCard = () => {
  const hourlyData = [12, 18, 15, 22, 30, 35, 42, 50, 45, 40, 48, 52, 60, 65, 58, 64, 70, 75, 72, 80, 85, 82, 88, 95];
  const maxValue = Math.max(...hourlyData);
  
  return (
    <MetricCard
      value="256"
      label="Active Users"
      icon="users"
      detail="Real-time data from last 24 hours"
      trend={{
        value: "+24",
        direction: "up",
        label: "vs yesterday"
      }}
    >
      {(cardState) => (
        <Box 
          p={5} 
          borderRadius="lg" 
          boxShadow="lg" 
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          width="100%"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Flex alignItems="center" mb={1}>
                <Box 
                  width="36px" 
                  height="36px" 
                  borderRadius="lg" 
                  bg="blue.50" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  color="blue.500"
                  mr={3}
                >
                  <Icon name={cardState.icon} />
                </Box>
                <Text fontSize="2xl" fontWeight="bold">{cardState.value}</Text>
                {cardState.trend && (
                  <Flex alignItems="center" ml={3}>
                    <Box 
                      bg={cardState.trend.direction === 'up' ? 'green.50' : 'red.50'} 
                      color={cardState.trend.direction === 'up' ? 'green.500' : 'red.500'}
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontWeight="medium"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon name={cardState.trendIcon} size="xs" mr={1} />
                      {cardState.trend.value}
                    </Box>
                  </Flex>
                )}
              </Flex>
              <Text color="gray.600">{cardState.label}</Text>
              {cardState.detail && (
                <Text fontSize="sm" color="gray.500">{cardState.detail}</Text>
              )}
            </Box>
            
            <Flex>
              <Box 
                px={3} 
                py={1} 
                borderRadius="md" 
                bg="gray.100" 
                mr={2}
                cursor="pointer"
                _hover={{ bg: "gray.200" }}
              >
                <Text fontSize="sm" fontWeight="medium">Day</Text>
              </Box>
              <Box 
                px={3} 
                py={1} 
                borderRadius="md" 
                bg="blue.50" 
                color="blue.600"
                cursor="pointer"
                _hover={{ bg: "blue.100" }}
              >
                <Text fontSize="sm" fontWeight="medium">Week</Text>
              </Box>
            </Flex>
          </Flex>
          
          {/* Chart visualization */}
          <Box height="150px" position="relative" mb={3}>
            {/* Hour labels */}
            <Flex justifyContent="space-between" position="absolute" bottom="-20px" left={0} right={0}>
              {[0, 6, 12, 18, 23].map(hour => (
                <Text key={hour} fontSize="xs" color="gray.500">
                  {hour}:00
                </Text>
              ))}
            </Flex>
            
            {/* Horizontal grid lines */}
            {[0, 25, 50, 75, 100].map((tick, i) => (
              <Box
                key={i}
                position="absolute"
                left={0}
                right={0}
                bottom={`${tick}%`}
                height="1px"
                bg="gray.100"
              />
            ))}
            
            {/* Data bars */}
            <Flex height="100%" alignItems="flex-end">
              {hourlyData.map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <Box
                    key={index}
                    height={`${height}%`}
                    width="100%"
                    bg={index === hourlyData.length - 1 ? 'blue.500' : 'blue.100'}
                    mx="1px"
                    borderTopLeftRadius="2px"
                    borderTopRightRadius="2px"
                    position="relative"
                    _hover={{
                      bg: index === hourlyData.length - 1 ? 'blue.600' : 'blue.200',
                    }}
                  >
                    {index === hourlyData.length - 1 && (
                      <Box
                        position="absolute"
                        top="-25px"
                        left="50%"
                        transform="translateX(-50%)"
                        bg="blue.500"
                        color="white"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {value}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Flex>
          </Box>
          
          {/* Card footer */}
          <Flex justifyContent="space-between" alignItems="center" mt={6}>
            <Text color="gray.500" fontSize="sm">Updated 5 minutes ago</Text>
            <Box 
              px={3} 
              py={1} 
              borderRadius="md" 
              bg="blue.50" 
              color="blue.600"
              cursor="pointer"
              _hover={{ bg: "blue.100" }}
              fontWeight="medium"
              fontSize="sm"
            >
              View Details
            </Box>
          </Flex>
        </Box>
      )}
    </MetricCard>
  );
};

/**
 * MetricCardRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the MetricCard component.
 */
const MetricCardRenderPropsExample = () => {
  const metricData = [
    { 
      value: "$8,540", 
      label: "Total Revenue", 
      icon: "dollar-sign", 
      variant: "default",
      trend: { value: "+12.5%", direction: "up", label: "vs last month" }
    },
    { 
      value: "324", 
      label: "New Customers", 
      icon: "user-plus", 
      variant: "info",
      trend: { value: "+18.2%", direction: "up", label: "vs last month" }
    },
    { 
      value: "85.2%", 
      label: "Conversion Rate", 
      icon: "chart-line", 
      variant: "success",
      trend: { value: "+2.4%", direction: "up", label: "vs last month" }
    },
    { 
      value: "12", 
      label: "Support Tickets", 
      icon: "life-ring", 
      variant: "warning",
      trend: { value: "-5.1%", direction: "down", label: "vs last month" }
    }
  ];
  
  return (
    <Stack spacing="xl" p={4}>
      <Box mb={4}>
        <Text variant="h2">MetricCard with Render Props</Text>
        <Text mb={4}>The MetricCard component supports render props for complete UI customization</Text>
      </Box>
      
      {/* Standard MetricCard Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Standard MetricCard (without render props)</Text>
        <Flex flexWrap="wrap" gap={4}>
          <MetricCard
            value="85%"
            label="Completion Rate"
            variant="default"
          />
          
          <MetricCard
            value="$12,345"
            label="Revenue"
            icon="chart-line"
            iconColor="blue.500"
            variant="info"
            trend={{
              value: "+12%",
              direction: "up",
              label: "vs last month"
            }}
          />
          
          <MetricCard
            value="24.7k"
            label="New Users"
            icon="users"
            iconColor="green.500"
            variant="success"
            trend={{
              value: "+5%",
              direction: "up",
              label: "vs last month"
            }}
          />
        </Flex>
      </Box>
      
      <Divider my={4} />
      
      {/* Custom Styled MetricCard */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Custom Styled MetricCard with Render Props</Text>
        <Flex flexWrap="wrap" gap={4}>
          <MetricCard
            value="67%"
            label="Progress"
            variant="success"
            trend={{
              value: "+7%",
              direction: "up",
              label: "vs last week"
            }}
          >
            {(cardState) => {
              // Calculate progress bar width
              const progressValue = parseInt(cardState.value, 10);
              
              return (
                <Box 
                  p={4} 
                  borderRadius="lg" 
                  boxShadow="md" 
                  bg="white"
                  width="240px"
                >
                  <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Text fontWeight="bold" fontSize="lg">{cardState.label}</Text>
                    <Text 
                      fontWeight="bold" 
                      fontSize="xl" 
                      color={progressValue > 50 ? "green.500" : "orange.500"}
                    >
                      {cardState.value}
                    </Text>
                  </Flex>
                  
                  {/* Custom progress bar */}
                  <Box 
                    bg="gray.100" 
                    borderRadius="full" 
                    height="12px" 
                    overflow="hidden"
                    mb={3}
                  >
                    <Box 
                      bg={progressValue > 50 ? "green.500" : "orange.500"} 
                      width={`${progressValue}%`} 
                      height="100%"
                      transition="width 0.5s ease-in-out"
                    />
                  </Box>
                  
                  {/* Trend info */}
                  {cardState.trend && (
                    <Flex alignItems="center" justifyContent="flex-end">
                      <Icon 
                        name={cardState.trendIcon} 
                        color={cardState.trend.direction === 'up' ? 'green.500' : 'red.500'} 
                        mr={1}
                      />
                      <Text fontWeight="medium" color={cardState.trend.direction === 'up' ? 'green.500' : 'red.500'}>
                        {cardState.trend.value}
                      </Text>
                      <Text ml={1} fontSize="sm" color="gray.500">
                        {cardState.trend.label}
                      </Text>
                    </Flex>
                  )}
                </Box>
              );
            }}
          </MetricCard>
          
          <MetricCard
            value="1,234"
            label="Daily Views"
            icon="eye"
            trend={{
              value: "-3%",
              direction: "down",
              label: "vs yesterday"
            }}
          >
            {(cardState) => (
              <Box 
                p={4} 
                borderRadius="lg" 
                boxShadow="md" 
                bg="blue.50"
                border="1px solid"
                borderColor="blue.100"
                width="240px"
              >
                <Flex mb={3}>
                  <Box 
                    width="40px" 
                    height="40px" 
                    borderRadius="lg" 
                    bg="blue.500" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    color="white"
                    mr={3}
                  >
                    <Icon name={cardState.icon} size="md" />
                  </Box>
                  
                  <Box>
                    <Text color="gray.600" fontSize="sm">{cardState.label}</Text>
                    <Text fontWeight="bold" fontSize="2xl" color="blue.700">{cardState.value}</Text>
                  </Box>
                </Flex>
                
                {/* Trend with card style based on direction */}
                {cardState.trend && (
                  <Box 
                    p={2} 
                    borderRadius="md" 
                    bg={cardState.trend.direction === 'up' ? 'green.50' : 'red.50'} 
                    color={cardState.trend.direction === 'up' ? 'green.700' : 'red.700'}
                  >
                    <Flex alignItems="center">
                      <Icon name={cardState.trendIcon} mr={2} />
                      <Text fontWeight="medium">{cardState.trend.value}</Text>
                      <Text ml={1} fontSize="sm">
                        {cardState.trend.label}
                      </Text>
                    </Flex>
                  </Box>
                )}
              </Box>
            )}
          </MetricCard>
          
          <MetricCard
            value="42"
            label="Tasks Completed"
            variant="success"
          >
            {(cardState) => (
              <Box 
                borderRadius="lg" 
                overflow="hidden" 
                boxShadow="md"
                width="240px"
              >
                <Box p={4} bg="white">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                      <Text color="gray.500" fontSize="sm">{cardState.label}</Text>
                      <Text fontWeight="bold" fontSize="3xl">{cardState.value}</Text>
                    </Box>
                    
                    <Box
                      width="50px"
                      height="50px"
                      borderRadius="full"
                      bg="green.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon name="check-circle" size="lg" color="green.500" />
                    </Box>
                  </Flex>
                </Box>
                
                <Box height="4px" bg="green.500" width="100%" />
              </Box>
            )}
          </MetricCard>
        </Flex>
      </Box>
      
      <Divider my={4} />
      
      {/* Interactive Dashboard Metrics */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Interactive Dashboard Metrics with Render Props</Text>
        
        <Grid 
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={4}
          mb={4}
        >
          {metricData.map((metric, index) => (
            <InteractiveMetricCard key={index} metric={metric} index={index} />
          ))}
        </Grid>
        
        {/* Large Timeline Metric Card */}
        <TimelineMetricCard />
      </Box>
    </Stack>
  );
};

export default MetricCardRenderPropsExample;
