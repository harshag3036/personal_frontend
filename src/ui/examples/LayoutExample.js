/**
 * Layout Example
 * 
 * This file demonstrates how to use the Layout component.
 */

import React, { useState } from 'react';
import { Layout, Navigation, Sidebar } from '../organisms';
import { Button, Text } from '../atoms';
import { Card } from '../molecules';

const LayoutExample = () => {
  const [variant, setVariant] = useState('default');
  const [withSidebar, setWithSidebar] = useState(false);
  const [withAside, setWithAside] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);

  const toggleVariant = () => {
    const variants = ['default', 'dashboard', 'admin', 'content', 'landing'];
    const currentIndex = variants.indexOf(variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setVariant(variants[nextIndex]);
  };

  const toggleSidebar = () => {
    setWithSidebar(!withSidebar);
  };

  const toggleAside = () => {
    setWithAside(!withAside);
  };

  const toggleFixedHeader = () => {
    setFixedHeader(!fixedHeader);
  };

  const toggleStickyHeader = () => {
    setStickyHeader(!stickyHeader);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card>
        <Text variant="h2">Layout Component</Text>
        <Text>A flexible layout component for structuring application pages with header, sidebar, main content, footer, and aside areas.</Text>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <Button onClick={toggleVariant}>
            Toggle Variant ({variant})
          </Button>
          <Button onClick={toggleSidebar}>
            Toggle Sidebar ({withSidebar ? 'On' : 'Off'})
          </Button>
          <Button onClick={toggleAside}>
            Toggle Aside ({withAside ? 'On' : 'Off'})
          </Button>
          <Button onClick={toggleFixedHeader}>
            Toggle Fixed Header ({fixedHeader ? 'On' : 'Off'})
          </Button>
          <Button onClick={toggleStickyHeader}>
            Toggle Sticky Header ({stickyHeader ? 'On' : 'Off'})
          </Button>
        </div>
      </Card>

      <div style={{ 
        border: '1px solid var(--color-border)',
        height: '600px',
        overflow: 'auto'
      }}>
        <Layout
          variant={variant}
          withSidebar={withSidebar}
          withAside={withAside}
          fixedHeader={fixedHeader}
          stickyHeader={stickyHeader}
        >
          <Layout.Header>
            <Navigation
              variant="primary"
              logo={<strong>App Logo</strong>}
              items={[
                { label: 'Home', href: '#' },
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'About', href: '#' }
              ]}
              actions={[
                <Button key="login" variant="secondary" size="sm">Login</Button>,
                <Button key="signup" variant="primary" size="sm">Sign Up</Button>
              ]}
            />
          </Layout.Header>

          {withSidebar && (
            <Layout.Sidebar>
              <Sidebar
                variant="default"
                position="left"
                state="expanded"
              >
                <Sidebar.Header>
                  <div style={{ padding: '0 16px' }}>
                    <Text variant="h4">Sidebar</Text>
                  </div>
                </Sidebar.Header>
                <Sidebar.Content>
                  <Sidebar.Group title="Navigation">
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
                  </Sidebar.Group>
                </Sidebar.Content>
              </Sidebar>
            </Layout.Sidebar>
          )}

          <Layout.Main>
            <Layout.Content>
              <Card>
                <Text variant="h3">Main Content</Text>
                <Text>This is the main content area of the layout.</Text>
                <Text>Current layout variant: <strong>{variant}</strong></Text>
                <Text>Sidebar: <strong>{withSidebar ? 'Enabled' : 'Disabled'}</strong></Text>
                <Text>Aside: <strong>{withAside ? 'Enabled' : 'Disabled'}</strong></Text>
                <Text>Fixed Header: <strong>{fixedHeader ? 'Enabled' : 'Disabled'}</strong></Text>
                <Text>Sticky Header: <strong>{stickyHeader ? 'Enabled' : 'Disabled'}</strong></Text>
              </Card>

              <Card style={{ marginTop: '20px' }}>
                <Text variant="h4">Features</Text>
                <ul>
                  <li>Multiple layout variants (default, dashboard, admin, content, landing)</li>
                  <li>Flexible structure with header, sidebar, main content, footer, and aside areas</li>
                  <li>Responsive design with mobile support</li>
                  <li>Fixed or sticky header, sidebar, and footer options</li>
                  <li>Customizable with various modifiers</li>
                  <li>Accessible with proper ARIA attributes</li>
                </ul>
              </Card>

              <Card style={{ marginTop: '20px' }}>
                <Text variant="h4">Usage</Text>
                <Text>The Layout component is composed of several sub-components:</Text>
                <ul>
                  <li><code>Layout.Header</code> - For the top section, typically containing navigation</li>
                  <li><code>Layout.Sidebar</code> - For the side navigation or filters</li>
                  <li><code>Layout.Main</code> - For the main content area</li>
                  <li><code>Layout.Footer</code> - For the bottom section, typically containing copyright and links</li>
                  <li><code>Layout.Aside</code> - For additional side content or contextual information</li>
                  <li><code>Layout.Content</code> - For adding padding to content sections</li>
                  <li><code>Layout.Container</code> - For centering and constraining content width</li>
                </ul>
              </Card>

              {/* Add some extra content to demonstrate scrolling */}
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} style={{ marginTop: '20px' }}>
                  <Text variant="h4">Additional Content {index + 1}</Text>
                  <Text>This is additional content to demonstrate scrolling behavior.</Text>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</Text>
                </Card>
              ))}
            </Layout.Content>
          </Layout.Main>

          {withAside && (
            <Layout.Aside>
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'var(--color-background-light)',
                height: '100%',
                width: '240px'
              }}>
                <Text variant="h4">Aside</Text>
                <Text>This is the aside area, typically used for additional context, filters, or related information.</Text>
                <div style={{ marginTop: '16px' }}>
                  <Card>
                    <Text variant="h5">Related</Text>
                    <ul style={{ paddingLeft: '16px' }}>
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </Layout.Aside>
          )}

          <Layout.Footer>
            <div style={{ 
              padding: '16px', 
              backgroundColor: 'var(--color-background-dark)',
              color: 'var(--color-text-light)',
              textAlign: 'center'
            }}>
              <Text>© 2025 Example Company. All rights reserved.</Text>
            </div>
          </Layout.Footer>
        </Layout>
      </div>
    </div>
  );
};

export default LayoutExample;
