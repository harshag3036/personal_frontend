/**
 * Dashboard Example
 * 
 * This example demonstrates how to use the Dashboard component
 * with various configurations and features.
 */

import React, { useState, useCallback } from 'react';
import Dashboard, { WIDGET_TYPES } from '../organisms/Dashboard';
import { Text, Button, Icon, Spinner } from '../atoms';
import { Card, MetricCard } from '../molecules';
import { DataTable, NotificationCenter } from '../organisms';
import { NOTIFICATION_TYPES, NOTIFICATION_STATES } from '../organisms/NotificationCenter';

// Sample data for widgets
const sampleMetrics = [
  { id: 1, title: 'Total Users', value: '1,234', change: '+12%', icon: 'users' },
  { id: 2, title: 'Active Sessions', value: '567', change: '+5%', icon: 'activity' },
  { id: 3, title: 'Conversion Rate', value: '3.2%', change: '-0.5%', icon: 'percent', negative: true },
  { id: 4, title: 'Revenue', value: '$12,345', change: '+8%', icon: 'dollar-sign' }
];

// Sample data for table
const sampleTableData = {
  columns: [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' },
    { id: 'status', header: 'Status', accessor: 'status' }
  ],
  data: [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' }
  ]
};

// Sample notifications
const sampleNotifications = [
  {
    id: 1,
    title: 'System Update',
    message: 'A new system update is available. Please restart your device to install it.',
    time: '2 minutes ago',
    type: NOTIFICATION_TYPES.SYSTEM,
    state: NOTIFICATION_STATES.UNREAD
  },
  {
    id: 2,
    title: 'New User Registered',
    message: 'A new user has registered on the platform.',
    time: '1 hour ago',
    type: NOTIFICATION_TYPES.INFO,
    state: NOTIFICATION_STATES.READ
  },
  {
    id: 3,
    title: 'Payment Successful',
    message: 'Your payment of $49.99 has been processed successfully.',
    time: 'Yesterday',
    type: NOTIFICATION_TYPES.SUCCESS,
    state: NOTIFICATION_STATES.UNREAD
  }
];

// Sample chart data (placeholder)
const sampleChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Users',
      data: [65, 59, 80, 81, 56, 55]
    },
    {
      label: 'Revenue',
      data: [28, 48, 40, 19, 86, 27]
    }
  ]
};

/**
 * Dashboard Example Component
 */
const DashboardExample = () => {
  // State for dashboard
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [layout, setLayout] = useState('responsive');
  const [withSidebar, setWithSidebar] = useState(true);
  
  // Handler for refreshing dashboard
  const handleRefresh = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Randomly show error sometimes
      if (Math.random() > 0.8) {
        setError('Failed to load dashboard data. Please try again.');
      }
    }, 1500);
  }, []);
  
  // Create widgets array
  const widgets = [
    // Metrics widgets
    ...sampleMetrics.map((metric) => ({
      id: `metric-${metric.id}`,
      title: metric.title,
      type: WIDGET_TYPES.METRIC,
      content: (
        <MetricCard
          title={metric.title}
          value={metric.value}
          change={metric.change}
          negative={metric.negative}
          icon={metric.icon}
        />
      )
    })),
    
    // Table widget
    {
      id: 'users-table',
      title: 'Recent Users',
      type: WIDGET_TYPES.TABLE,
      content: (
        <DataTable
          columns={sampleTableData.columns}
          data={sampleTableData.data}
          pagination
          pageSize={5}
        />
      )
    },
    
    // Chart widget (placeholder)
    {
      id: 'activity-chart',
      title: 'User Activity',
      type: WIDGET_TYPES.CHART,
      content: (
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Chart Placeholder</Text>
        </div>
      )
    },
    
    // Notifications widget
    {
      id: 'notifications',
      title: 'Recent Notifications',
      type: WIDGET_TYPES.NOTIFICATION,
      content: (
        <NotificationCenter
          notifications={sampleNotifications}
          variant="compact"
          size="sm"
          withHeader
          withFooter
        />
      )
    }
  ];
  
  // Example of using Dashboard with props
  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Text variant="h2">Dashboard Example</Text>
        <Text variant="body">This example demonstrates how to use the Dashboard component.</Text>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Text variant="h6">Controls</Text>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Button onClick={handleRefresh}>Refresh Data</Button>
          <Button onClick={() => setWithSidebar(!withSidebar)}>
            {withSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <div>
            <Text variant="caption">Variant:</Text>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['default', 'compact', 'expanded', 'grid', 'list'].map((v) => (
                <Button
                  key={v}
                  size="sm"
                  variant={variant === v ? 'primary' : 'secondary'}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Text variant="caption">Size:</Text>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['sm', 'md', 'lg', 'xl', 'full'].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={size === s ? 'primary' : 'secondary'}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Text variant="caption">Layout:</Text>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['fixed', 'fluid', 'responsive'].map((l) => (
                <Button
                  key={l}
                  size="sm"
                  variant={layout === l ? 'primary' : 'secondary'}
                  onClick={() => setLayout(l)}
                >
                  {l}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard with props */}
      <Dashboard
        variant={variant}
        size={size}
        layout={layout}
        withHeader
        withSidebar={withSidebar}
        withFooter
        withBorder
        withShadow
        withPadding
        withGap
        withBackground
        loading={loading}
        error={error}
        title="Analytics Dashboard"
        description="Overview of key metrics and activities"
        widgets={widgets}
        onRefresh={handleRefresh}
      />
      
      <div style={{ marginTop: '40px', marginBottom: '20px' }}>
        <Text variant="h4">Custom Dashboard (Compound Component)</Text>
      </div>
      
      {/* Dashboard with compound components */}
      <Dashboard
        variant="default"
        size="md"
        withBorder
        withShadow
        withPadding
        withGap
        withBackground
        loading={loading}
        error={error}
      >
        <Dashboard.Header>
          <div>
            <Text variant="h4">Custom Dashboard</Text>
            <Text variant="body2" color="secondary">Using compound components</Text>
          </div>
          <Button variant="secondary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Dashboard.Header>
        
        <div className="ui-dashboard--with-sidebar">
          {withSidebar && (
            <Dashboard.Sidebar>
              <Card withBorder withShadow>
                <Text variant="h6">Navigation</Text>
                <div style={{ marginTop: '10px' }}>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ padding: '8px 0' }}>Dashboard</li>
                    <li style={{ padding: '8px 0' }}>Analytics</li>
                    <li style={{ padding: '8px 0' }}>Users</li>
                    <li style={{ padding: '8px 0' }}>Settings</li>
                  </ul>
                </div>
              </Card>
            </Dashboard.Sidebar>
          )}
          
          <Dashboard.Main>
            <Dashboard.Widgets>
              {/* Metric widgets */}
              {sampleMetrics.map((metric) => (
                <Dashboard.Widget
                  key={metric.id}
                  title={metric.title}
                  type={WIDGET_TYPES.METRIC}
                  withBorder
                  withShadow
                >
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    negative={metric.negative}
                    icon={metric.icon}
                  />
                </Dashboard.Widget>
              ))}
              
              {/* Table widget */}
              <Dashboard.Widget
                title="Recent Users"
                type={WIDGET_TYPES.TABLE}
                withBorder
                withShadow
              >
                <DataTable
                  columns={sampleTableData.columns}
                  data={sampleTableData.data}
                  pagination
                  pageSize={5}
                />
              </Dashboard.Widget>
              
              {/* Chart widget (placeholder) */}
              <Dashboard.Widget
                title="User Activity"
                type={WIDGET_TYPES.CHART}
                withBorder
                withShadow
              >
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Chart Placeholder</Text>
                </div>
              </Dashboard.Widget>
              
              {/* Notifications widget */}
              <Dashboard.Widget
                title="Recent Notifications"
                type={WIDGET_TYPES.NOTIFICATION}
                withBorder
                withShadow
              >
                <NotificationCenter
                  notifications={sampleNotifications}
                  variant="compact"
                  size="sm"
                  withHeader
                  withFooter
                />
              </Dashboard.Widget>
            </Dashboard.Widgets>
          </Dashboard.Main>
        </div>
        
        <Dashboard.Footer>
          <Text variant="caption">© 2025 Example Company</Text>
          <Text variant="caption">Last updated: {new Date().toLocaleString()}</Text>
        </Dashboard.Footer>
      </Dashboard>
    </div>
  );
};

export default DashboardExample;
