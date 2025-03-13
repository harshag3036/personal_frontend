/**
 * Sidebar Example
 * 
 * This file demonstrates how to use the Sidebar component.
 */

import React, { useState } from 'react';
import { Sidebar } from '../organisms';
import { Button, Text } from '../atoms';
import { Card } from '../molecules';

const SidebarExample = () => {
  const [sidebarState, setSidebarState] = useState('expanded');
  const [position, setPosition] = useState('left');
  const [variant, setVariant] = useState('default');
  const [withShadow, setWithShadow] = useState(false);
  const [withBorder, setWithBorder] = useState(true);

  const handleStateChange = (newState) => {
    setSidebarState(newState);
  };

  const togglePosition = () => {
    setPosition(position === 'left' ? 'right' : 'left');
  };

  const toggleVariant = () => {
    const variants = ['default', 'primary', 'secondary', 'light', 'dark'];
    const currentIndex = variants.indexOf(variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setVariant(variants[nextIndex]);
  };

  const toggleShadow = () => {
    setWithShadow(!withShadow);
  };

  const toggleBorder = () => {
    setWithBorder(!withBorder);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card>
        <Text variant="h2">Sidebar Component</Text>
        <Text>A flexible sidebar component for application navigation, filters, and additional content.</Text>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button onClick={togglePosition}>
            Toggle Position ({position})
          </Button>
          <Button onClick={toggleVariant}>
            Toggle Variant ({variant})
          </Button>
          <Button onClick={toggleShadow}>
            Toggle Shadow ({withShadow ? 'On' : 'Off'})
          </Button>
          <Button onClick={toggleBorder}>
            Toggle Border ({withBorder ? 'On' : 'Off'})
          </Button>
        </div>
      </Card>

      <div style={{ 
        display: 'flex', 
        height: '500px', 
        border: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Sidebar
          variant={variant}
          position={position}
          state={sidebarState}
          onStateChange={handleStateChange}
          collapsible
          withShadow={withShadow}
          withBorder={withBorder}
        >
          <Sidebar.Header>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '4px', 
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                A
              </div>
              <Text variant="h4" style={{ margin: 0 }}>App Name</Text>
            </div>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Group title="Main">
              <Sidebar.Item icon="home" active href="#">
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item icon="user" href="#">
                Profile
              </Sidebar.Item>
              <Sidebar.Item icon="settings" href="#">
                Settings
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Divider />

            <Sidebar.Group title="Content">
              <Sidebar.Item icon="file" href="#">
                Documents
              </Sidebar.Item>
              <Sidebar.Item icon="image" href="#">
                Media
              </Sidebar.Item>
              <Sidebar.Item icon="folder" href="#" badge="3">
                Projects
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Divider />

            <Sidebar.Group title="Communication">
              <Sidebar.Item icon="message" href="#" badge="5">
                Messages
              </Sidebar.Item>
              <Sidebar.Item icon="bell" href="#" badge="2">
                Notifications
              </Sidebar.Item>
              <Sidebar.Item icon="users" href="#">
                Team
              </Sidebar.Item>
            </Sidebar.Group>
          </Sidebar.Content>

          <Sidebar.Footer>
            <Sidebar.Item icon="log-out" href="#">
              Logout
            </Sidebar.Item>
          </Sidebar.Footer>
        </Sidebar>

        <div style={{ 
          flex: 1, 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'auto'
        }}>
          <Card>
            <Text variant="h3">Main Content</Text>
            <Text>This is the main content area that appears next to the sidebar.</Text>
            <Text>The sidebar can be collapsed, expanded, or hidden.</Text>
            <Text>Current sidebar state: <strong>{sidebarState}</strong></Text>
          </Card>

          <Card>
            <Text variant="h4">Features</Text>
            <ul>
              <li>Responsive design with mobile support</li>
              <li>Collapsible sidebar with toggle button</li>
              <li>Multiple variants and positions</li>
              <li>Support for icons and badges</li>
              <li>Customizable with shadow and border options</li>
              <li>Accessible with proper ARIA attributes</li>
            </ul>
          </Card>

          <Card>
            <Text variant="h4">Usage</Text>
            <Text>The Sidebar component is composed of several sub-components:</Text>
            <ul>
              <li><code>Sidebar.Header</code> - For the top section, typically containing a logo or brand</li>
              <li><code>Sidebar.Content</code> - For the main navigation items</li>
              <li><code>Sidebar.Group</code> - For grouping related navigation items</li>
              <li><code>Sidebar.Item</code> - For individual navigation links</li>
              <li><code>Sidebar.Divider</code> - For visual separation between groups</li>
              <li><code>Sidebar.Footer</code> - For the bottom section, typically containing logout or user settings</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SidebarExample;
