import React from 'react';
import { Tabs, TabList, Tab, TabPanel, TAB_VARIANTS, TAB_SIZES } from './index';
import { Icon } from '../../atoms';

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    componentSubtitle: 'A versatile tabs component for organizing content into separate views',
  },
  argTypes: {
    defaultTab: {
      control: 'number',
      description: 'Index of the default active tab',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(TAB_VARIANTS),
      },
      description: 'Visual variant of the tabs',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(TAB_SIZES),
      },
      description: 'Size of the tabs',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function when tab changes',
    },
  },
};

// Basic tabs
export const Basic = () => (
  <Tabs defaultTab={0}>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </TabList>
    <TabPanel>
      <h3>Content for Tab 1</h3>
      <p>This is the content for the first tab.</p>
    </TabPanel>
    <TabPanel>
      <h3>Content for Tab 2</h3>
      <p>This is the content for the second tab.</p>
    </TabPanel>
    <TabPanel>
      <h3>Content for Tab 3</h3>
      <p>This is the content for the third tab.</p>
    </TabPanel>
  </Tabs>
);

// Different variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3>Default Variant</h3>
      <Tabs variant={TAB_VARIANTS.DEFAULT}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
    
    <div>
      <h3>Pills Variant</h3>
      <Tabs variant={TAB_VARIANTS.PILLS}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
    
    <div>
      <h3>Underline Variant</h3>
      <Tabs variant={TAB_VARIANTS.UNDERLINE}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
    
    <div>
      <h3>Contained Variant</h3>
      <Tabs variant={TAB_VARIANTS.CONTAINED}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
  </div>
);

// Different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3>Small Size</h3>
      <Tabs size={TAB_SIZES.SMALL}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
    
    <div>
      <h3>Medium Size (Default)</h3>
      <Tabs size={TAB_SIZES.MEDIUM}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
    
    <div>
      <h3>Large Size</h3>
      <Tabs size={TAB_SIZES.LARGE}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs>
    </div>
  </div>
);

// With icons
export const WithIcons = () => (
  <Tabs>
    <TabList>
      <Tab icon={<Icon name="home" size="sm" />}>Home</Tab>
      <Tab icon={<Icon name="user" size="sm" />}>Profile</Tab>
      <Tab icon={<Icon name="settings" size="sm" />}>Settings</Tab>
    </TabList>
    <TabPanel>Home content</TabPanel>
    <TabPanel>Profile content</TabPanel>
    <TabPanel>Settings content</TabPanel>
  </Tabs>
);

// Disabled tab
export const DisabledTab = () => (
  <Tabs>
    <TabList>
      <Tab>Enabled</Tab>
      <Tab disabled>Disabled</Tab>
      <Tab>Enabled</Tab>
    </TabList>
    <TabPanel>Content for first tab</TabPanel>
    <TabPanel>Content for disabled tab (not accessible)</TabPanel>
    <TabPanel>Content for third tab</TabPanel>
  </Tabs>
);

// Community-specific styling
export const CommunityTabs = () => (
  <Tabs className="ui-tabs--community">
    <TabList>
      <Tab>Activities</Tab>
      <Tab>Milestones</Tab>
      <Tab>Participants</Tab>
    </TabList>
    <TabPanel>
      <h3>Community Activities</h3>
      <p>List of activities in the community.</p>
    </TabPanel>
    <TabPanel>
      <h3>Community Milestones</h3>
      <p>Progress tracking for community milestones.</p>
    </TabPanel>
    <TabPanel>
      <h3>Community Participants</h3>
      <p>List of participants in the community.</p>
    </TabPanel>
  </Tabs>
);

// Complex example with rich content
export const ComplexExample = () => (
  <Tabs variant={TAB_VARIANTS.PILLS}>
    <TabList>
      <Tab icon={<Icon name="info" size="sm" />}>Overview</Tab>
      <Tab icon={<Icon name="list" size="sm" />}>Details</Tab>
      <Tab icon={<Icon name="chart" size="sm" />}>Analytics</Tab>
    </TabList>
    <TabPanel>
      <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Project Overview</h3>
        <p>This is a comprehensive overview of the project, including its goals, scope, and timeline.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <h4>Goals</h4>
            <ul>
              <li>Improve user experience</li>
              <li>Increase engagement</li>
              <li>Enhance performance</li>
            </ul>
          </div>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <h4>Timeline</h4>
            <ul>
              <li>Phase 1: Planning (2 weeks)</li>
              <li>Phase 2: Development (8 weeks)</li>
              <li>Phase 3: Testing (4 weeks)</li>
              <li>Phase 4: Deployment (2 weeks)</li>
            </ul>
          </div>
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Project Details</h3>
        <p>Detailed information about the project, including technical specifications and requirements.</p>
        <div style={{ marginTop: '1rem' }}>
          <h4>Technical Stack</h4>
          <ul>
            <li>Frontend: React, CSS-in-JS</li>
            <li>Backend: Node.js, Express</li>
            <li>Database: MongoDB</li>
            <li>Deployment: Docker, Kubernetes</li>
          </ul>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <h4>Requirements</h4>
          <ul>
            <li>Responsive design for all screen sizes</li>
            <li>Accessibility compliance (WCAG 2.1 AA)</li>
            <li>Performance optimization (Core Web Vitals)</li>
            <li>Cross-browser compatibility</li>
          </ul>
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Project Analytics</h3>
        <p>Analytics and metrics for the project, including performance indicators and user engagement.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <h4>Performance Metrics</h4>
            <ul>
              <li>Page Load Time: 1.2s</li>
              <li>First Contentful Paint: 0.8s</li>
              <li>Time to Interactive: 2.1s</li>
              <li>Cumulative Layout Shift: 0.05</li>
            </ul>
          </div>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <h4>User Engagement</h4>
            <ul>
              <li>Daily Active Users: 12,500</li>
              <li>Average Session Duration: 4m 32s</li>
              <li>Bounce Rate: 28%</li>
              <li>Conversion Rate: 3.2%</li>
            </ul>
          </div>
        </div>
      </div>
    </TabPanel>
  </Tabs>
);
