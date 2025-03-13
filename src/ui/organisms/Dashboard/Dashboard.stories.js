/**
 * Dashboard Component Stories
 * 
 * This file contains stories for the Dashboard component.
 */

import React, { useState } from 'react';
import Dashboard, { 
  DASHBOARD_VARIANTS, 
  DASHBOARD_SIZES, 
  DASHBOARD_LAYOUTS,
  WIDGET_TYPES 
} from './index';
import { Text, Button, Spinner } from '../../atoms';
import { Card } from '../../molecules';

export default {
  title: 'Organisms/Dashboard',
  component: Dashboard,
  parameters: {
    docs: {
      description: {
        component: 'A flexible dashboard component that can be used to create various dashboard layouts.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(DASHBOARD_VARIANTS),
      description: 'The visual variant of the dashboard'
    },
    size: {
      control: 'select',
      options: Object.values(DASHBOARD_SIZES),
      description: 'The size of the dashboard'
    },
    layout: {
      control: 'select',
      options: Object.values(DASHBOARD_LAYOUTS),
      description: 'The layout of the dashboard'
    },
    withHeader: {
      control: 'boolean',
      description: 'Whether to show the header section'
    },
    withSidebar: {
      control: 'boolean',
      description: 'Whether to show the sidebar section'
    },
    withFooter: {
      control: 'boolean',
      description: 'Whether to show the footer section'
    },
    withBorder: {
      control: 'boolean',
      description: 'Whether to show borders'
    },
    withShadow: {
      control: 'boolean',
      description: 'Whether to show shadows'
    },
    withPadding: {
      control: 'boolean',
      description: 'Whether to add padding'
    },
    withGap: {
      control: 'boolean',
      description: 'Whether to add gap between elements'
    },
    withBackground: {
      control: 'boolean',
      description: 'Whether to show background'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the dashboard is in a loading state'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    title: {
      control: 'text',
      description: 'The title of the dashboard'
    },
    description: {
      control: 'text',
      description: 'The description of the dashboard'
    }
  }
};

// Sample widgets for the dashboard
const sampleWidgets = [
  {
    id: 'widget-1',
    title: 'Users',
    type: WIDGET_TYPES.METRIC,
    content: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Text variant="h1">1,234</Text>
        <Text variant="body2">Total Users</Text>
      </div>
    )
  },
  {
    id: 'widget-2',
    title: 'Revenue',
    type: WIDGET_TYPES.METRIC,
    content: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Text variant="h1">$12,345</Text>
        <Text variant="body2">Total Revenue</Text>
      </div>
    )
  },
  {
    id: 'widget-3',
    title: 'Activity',
    type: WIDGET_TYPES.CHART,
    content: (
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chart Placeholder</Text>
      </div>
    )
  },
  {
    id: 'widget-4',
    title: 'Recent Users',
    type: WIDGET_TYPES.TABLE,
    content: (
      <div style={{ padding: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>John Doe</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>john@example.com</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Admin</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Jane Smith</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>jane@example.com</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>User</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Bob Johnson</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>bob@example.com</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>User</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
];

// Template for the stories
const Template = (args) => {
  const [loading, setLoading] = useState(args.loading);
  const [error, setError] = useState(args.error);
  
  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      setLoading(false);
      if (Math.random() > 0.8) {
        setError('Failed to load dashboard data. Please try again.');
      }
    }, 1500);
  };
  
  return (
    <div style={{ height: '600px', border: '1px solid #ddd' }}>
      <Dashboard
        {...args}
        loading={loading}
        error={error}
        widgets={sampleWidgets}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: DASHBOARD_VARIANTS.DEFAULT,
  size: DASHBOARD_SIZES.MD,
  layout: DASHBOARD_LAYOUTS.RESPONSIVE,
  withHeader: true,
  withSidebar: true,
  withFooter: true,
  withBorder: true,
  withShadow: true,
  withPadding: true,
  withGap: true,
  withBackground: true,
  loading: false,
  error: null,
  title: 'Dashboard',
  description: 'Overview of key metrics and activities'
};

// Compact variant
export const Compact = Template.bind({});
Compact.args = {
  ...Default.args,
  variant: DASHBOARD_VARIANTS.COMPACT,
  size: DASHBOARD_SIZES.SM,
  withSidebar: false
};

// Expanded variant
export const Expanded = Template.bind({});
Expanded.args = {
  ...Default.args,
  variant: DASHBOARD_VARIANTS.EXPANDED,
  size: DASHBOARD_SIZES.LG
};

// Grid variant
export const Grid = Template.bind({});
Grid.args = {
  ...Default.args,
  variant: DASHBOARD_VARIANTS.GRID,
  withSidebar: false
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true
};

// Error state
export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: 'Failed to load dashboard data. Please try again.'
};

// Empty state
export const Empty = Template.bind({});
Empty.args = {
  ...Default.args,
  widgets: []
};

// Compound component usage
export const CompoundComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      setLoading(false);
      if (Math.random() > 0.8) {
        setError('Failed to load dashboard data. Please try again.');
      }
    }, 1500);
  };
  
  return (
    <div style={{ height: '600px', border: '1px solid #ddd' }}>
      <Dashboard
        variant={DASHBOARD_VARIANTS.DEFAULT}
        size={DASHBOARD_SIZES.MD}
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
          
          <Dashboard.Main>
            <Dashboard.Widgets>
              <Dashboard.Widget
                title="Users"
                type={WIDGET_TYPES.METRIC}
                withBorder
                withShadow
              >
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <Text variant="h1">1,234</Text>
                  <Text variant="body2">Total Users</Text>
                </div>
              </Dashboard.Widget>
              
              <Dashboard.Widget
                title="Revenue"
                type={WIDGET_TYPES.METRIC}
                withBorder
                withShadow
              >
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <Text variant="h1">$12,345</Text>
                  <Text variant="body2">Total Revenue</Text>
                </div>
              </Dashboard.Widget>
              
              <Dashboard.Widget
                title="Activity"
                type={WIDGET_TYPES.CHART}
                withBorder
                withShadow
              >
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Chart Placeholder</Text>
                </div>
              </Dashboard.Widget>
              
              <Dashboard.Widget
                title="Recent Users"
                type={WIDGET_TYPES.TABLE}
                withBorder
                withShadow
              >
                <div style={{ padding: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Email</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>John Doe</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>john@example.com</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Admin</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Jane Smith</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>jane@example.com</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>User</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Bob Johnson</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>bob@example.com</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>User</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
