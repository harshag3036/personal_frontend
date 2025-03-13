/**
 * Header Example
 * 
 * This file demonstrates how to use the Header component.
 */

import React, { useState } from 'react';
import { Header } from '../organisms';
import { Button, Text, Icon } from '../atoms';
import { SearchInput } from '../molecules';

const HeaderExample = () => {
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [position, setPosition] = useState('static');
  const [withBorder, setWithBorder] = useState(true);
  const [withShadow, setWithShadow] = useState(false);

  const toggleVariant = () => {
    const variants = ['default', 'primary', 'secondary', 'transparent', 'compact'];
    const currentIndex = variants.indexOf(variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setVariant(variants[nextIndex]);
  };

  const toggleSize = () => {
    const sizes = ['sm', 'md', 'lg'];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  const togglePosition = () => {
    const positions = ['static', 'fixed', 'sticky', 'absolute', 'relative'];
    const currentIndex = positions.indexOf(position);
    const nextIndex = (currentIndex + 1) % positions.length;
    setPosition(positions[nextIndex]);
  };

  const toggleBorder = () => {
    setWithBorder(!withBorder);
  };

  const toggleShadow = () => {
    setWithShadow(!withShadow);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h2">Header Component</Text>
        <Text>A flexible header component for application navigation, branding, and actions.</Text>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <Button onClick={toggleVariant}>
            Toggle Variant ({variant})
          </Button>
          <Button onClick={toggleSize}>
            Toggle Size ({size})
          </Button>
          <Button onClick={togglePosition}>
            Toggle Position ({position})
          </Button>
          <Button onClick={toggleBorder}>
            Toggle Border ({withBorder ? 'On' : 'Off'})
          </Button>
          <Button onClick={toggleShadow}>
            Toggle Shadow ({withShadow ? 'On' : 'Off'})
          </Button>
        </div>
      </div>

      <div style={{ 
        border: '1px solid var(--color-border)',
        height: '300px',
        overflow: 'auto',
        position: 'relative'
      }}>
        <Header
          variant={variant}
          size={size}
          position={position}
          withBorder={withBorder}
          withShadow={withShadow}
          withSearch={true}
          withNotifications={true}
          withUserMenu={true}
        >
          <Header.Logo>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              <span style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: 'var(--color-primary)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                A
              </span>
              AppName
            </div>
          </Header.Logo>

          <Header.Navigation>
            <div style={{ 
              display: 'flex', 
              gap: '16px',
              height: '100%',
              alignItems: 'center'
            }}>
              <a href="#" style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: 'bold',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '2px solid var(--color-primary)'
              }}>
                Dashboard
              </a>
              <a href="#" style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
                Projects
              </a>
              <a href="#" style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
                Team
              </a>
              <a href="#" style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
                Reports
              </a>
            </div>
          </Header.Navigation>

          <Header.Search>
            <SearchInput 
              placeholder="Search..." 
              style={{ width: '240px' }}
            />
          </Header.Search>

          <Header.Actions>
            <Button variant="secondary" size="sm">Create</Button>
            <Button variant="primary" size="sm">Upgrade</Button>
          </Header.Actions>

          <Header.Notifications>
            <button style={{ 
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '20px' }}>🔔</span>
              <span style={{ 
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'var(--color-error)',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                3
              </span>
            </button>
          </Header.Notifications>

          <Header.UserMenu>
            <div style={{ 
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              JD
            </div>
          </Header.UserMenu>

          <Header.MobileToggle>
            <span style={{ fontSize: '24px' }}>☰</span>
          </Header.MobileToggle>

          <Header.MobileMenu>
            <div style={{ marginTop: '48px' }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '16px',
                padding: '16px'
              }}>
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  fontWeight: 'bold'
                }}>
                  Dashboard
                </a>
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit'
                }}>
                  Projects
                </a>
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit'
                }}>
                  Team
                </a>
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit'
                }}>
                  Reports
                </a>
              </div>

              <div style={{ padding: '16px' }}>
                <SearchInput 
                  placeholder="Search..." 
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '8px',
                padding: '16px'
              }}>
                <Button variant="secondary" size="sm" style={{ flex: 1 }}>Create</Button>
                <Button variant="primary" size="sm" style={{ flex: 1 }}>Upgrade</Button>
              </div>
            </div>
          </Header.MobileMenu>
        </Header>

        <div style={{ padding: '16px', marginTop: '64px' }}>
          <Text variant="h3">Main Content</Text>
          <Text>This is the main content area below the header.</Text>
          <Text>Scroll down to see more content and observe the header behavior.</Text>

          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <Text variant="h4">Section {index + 1}</Text>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</Text>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h3">Header Features</Text>
        <ul>
          <li>Multiple variants (default, primary, secondary, transparent, compact)</li>
          <li>Different sizes (small, medium, large)</li>
          <li>Flexible positioning (static, fixed, sticky, absolute, relative)</li>
          <li>Optional border and shadow</li>
          <li>Responsive design with mobile support</li>
          <li>Compound components for logo, navigation, actions, search, user menu, and notifications</li>
          <li>Mobile menu with toggle button</li>
          <li>Accessible with proper ARIA attributes</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderExample;
