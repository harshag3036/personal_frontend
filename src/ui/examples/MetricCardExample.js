import React, { useState, useEffect } from 'react';
import Grid from '../atoms/Grid';
import MetricCard from '../molecules/MetricCard';
import Box from '../atoms/Box';
import Text from '../atoms/Text';

/**
 * MetricCardExample Component
 * 
 * This example demonstrates how to use the MetricCard component in a dashboard-like layout.
 * It shows various metrics with different configurations, including icons, trends, and interactive cards.
 */
const MetricCardExample = () => {
  // Simulated data state
  const [metrics, setMetrics] = useState({
    users: { value: '0', trend: { value: '0%', direction: 'neutral' } },
    revenue: { value: '$0', trend: { value: '0%', direction: 'neutral' } },
    conversion: { value: '0%', trend: { value: '0%', direction: 'neutral' } },
    uptime: { value: '0%' },
    tasks: { value: '0' },
    satisfaction: { value: '0%', trend: { value: '0%', direction: 'neutral' } },
  });
  
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        users: { 
          value: '1,234', 
          trend: { value: '+12%', direction: 'up', label: 'vs last month' } 
        },
        revenue: { 
          value: '$8,745', 
          trend: { value: '+15%', direction: 'up', label: 'vs last month' } 
        },
        conversion: { 
          value: '3.2%', 
          trend: { value: '-0.5%', direction: 'down', label: 'vs last month' } 
        },
        uptime: { 
          value: '99.9%',
          detail: 'Last 30 days'
        },
        tasks: { 
          value: '8',
          detail: 'Due this week'
        },
        satisfaction: { 
          value: '92%', 
          trend: { value: '+4%', direction: 'up', label: 'vs last quarter' } 
        },
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle card click
  const handleCardClick = (metricName) => {
    console.log(`Clicked on ${metricName} metric`);
    // In a real application, this could navigate to a detailed view
    // or open a modal with more information
  };
  
  return (
    <Box padding="lg">
      <Text variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
        Dashboard Metrics
      </Text>
      
      <Grid 
        templateColumns={{ 
          base: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)' 
        }}
        gap="md"
      >
        {/* Active Users Metric */}
        <MetricCard
          value={loading ? '...' : metrics.users.value}
          label="Active Users"
          icon="user"
          iconColor="primary"
          trend={!loading ? metrics.users.trend : undefined}
          variant="info"
          interactive
          onClick={() => handleCardClick('users')}
        />
        
        {/* Revenue Metric */}
        <MetricCard
          value={loading ? '...' : metrics.revenue.value}
          label="Monthly Revenue"
          icon="analytics"
          iconColor="success"
          trend={!loading ? metrics.revenue.trend : undefined}
          variant="success"
          interactive
          onClick={() => handleCardClick('revenue')}
        />
        
        {/* Conversion Rate Metric */}
        <MetricCard
          value={loading ? '...' : metrics.conversion.value}
          label="Conversion Rate"
          icon="analytics"
          iconColor="warning"
          trend={!loading ? metrics.conversion.trend : undefined}
          variant="warning"
          interactive
          onClick={() => handleCardClick('conversion')}
        />
        
        {/* Uptime Metric */}
        <MetricCard
          value={loading ? '...' : metrics.uptime.value}
          label="System Uptime"
          detail={!loading ? metrics.uptime.detail : undefined}
          icon="check"
          iconColor="success"
          variant="success"
        />
        
        {/* Pending Tasks Metric */}
        <MetricCard
          value={loading ? '...' : metrics.tasks.value}
          label="Pending Tasks"
          detail={!loading ? metrics.tasks.detail : undefined}
          icon="warning"
          iconColor="error"
          variant="error"
          interactive
          onClick={() => handleCardClick('tasks')}
        />
        
        {/* Customer Satisfaction Metric */}
        <MetricCard
          value={loading ? '...' : metrics.satisfaction.value}
          label="Customer Satisfaction"
          icon="star"
          iconColor="warning"
          trend={!loading ? metrics.satisfaction.trend : undefined}
          variant="default"
        />
      </Grid>
      
      <Box marginTop="xl">
        <Text variant="body2" color="text-secondary">
          This example demonstrates the MetricCard component in a dashboard layout.
          The cards show various metrics with different configurations, including icons, trends, and interactive cards.
          Click on some of the cards to see the interactive behavior.
        </Text>
      </Box>
    </Box>
  );
};

export default MetricCardExample;
