/**
 * Footer Example
 * 
 * This file demonstrates how to use the Footer component.
 */

import React, { useState } from 'react';
import { Footer } from '../organisms';
import { Button, Text, Icon, Link } from '../atoms';
import { Input } from '../atoms';

const FooterExample = () => {
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [position, setPosition] = useState('static');
  const [withBorder, setWithBorder] = useState(true);
  const [withShadow, setWithShadow] = useState(false);

  const toggleVariant = () => {
    const variants = ['default', 'primary', 'secondary', 'light', 'dark'];
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
    const positions = ['static', 'fixed', 'sticky', 'relative'];
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
        <Text variant="h2">Footer Component</Text>
        <Text>A flexible footer component for application branding, navigation, and information.</Text>
        
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
        height: '500px',
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '16px', flex: '1' }}>
          <Text variant="h3">Main Content</Text>
          <Text>This is the main content area above the footer.</Text>
          <Text>Scroll down to see the footer.</Text>

          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <Text variant="h4">Section {index + 1}</Text>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</Text>
            </div>
          ))}
        </div>

        <Footer
          variant={variant}
          size={size}
          position={position}
          withBorder={withBorder}
          withShadow={withShadow}
          withLogo={true}
          withNavigation={true}
          withSocial={true}
          withCopyright={true}
          withNewsletter={true}
          withColumns={true}
        >
          <Footer.Logo>
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
          </Footer.Logo>

          <Footer.Column title="Products">
            <Link href="#">Product 1</Link>
            <Link href="#">Product 2</Link>
            <Link href="#">Product 3</Link>
            <Link href="#">Product 4</Link>
          </Footer.Column>

          <Footer.Column title="Resources">
            <Link href="#">Documentation</Link>
            <Link href="#">Tutorials</Link>
            <Link href="#">Guides</Link>
            <Link href="#">API Reference</Link>
          </Footer.Column>

          <Footer.Column title="Company">
            <Link href="#">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Press</Link>
          </Footer.Column>

          <Footer.Column title="Legal">
            <Link href="#">Terms of Service</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">GDPR</Link>
          </Footer.Column>

          <Footer.Newsletter>
            <Text variant="h4" style={{ marginBottom: '8px' }}>Subscribe to our newsletter</Text>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input placeholder="Enter your email" style={{ flex: 1 }} />
              <Button variant="primary">Subscribe</Button>
            </div>
          </Footer.Newsletter>

          <Footer.Social>
            <a href="#" style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}>
              <span style={{ fontSize: '20px' }}>𝕏</span>
            </a>
            <a href="#" style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}>
              <span style={{ fontSize: '20px' }}>f</span>
            </a>
            <a href="#" style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}>
              <span style={{ fontSize: '20px' }}>in</span>
            </a>
            <a href="#" style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}>
              <span style={{ fontSize: '20px' }}>ig</span>
            </a>
          </Footer.Social>

          <Footer.Bottom>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="#">Contact Us</Link>
              <Link href="#">Support</Link>
              <Link href="#">Sitemap</Link>
            </div>
            <div>
              <select style={{ 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid var(--color-border)'
              }}>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </Footer.Bottom>

          <Footer.Copyright>
            © {new Date().getFullYear()} AppName. All rights reserved.
          </Footer.Copyright>
        </Footer>
      </div>

      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h3">Footer Features</Text>
        <ul>
          <li>Multiple variants (default, primary, secondary, light, dark)</li>
          <li>Different sizes (small, medium, large)</li>
          <li>Flexible positioning (static, fixed, sticky, relative)</li>
          <li>Optional border and shadow</li>
          <li>Compound components for logo, navigation, social media, copyright, newsletter, and columns</li>
          <li>Responsive design</li>
          <li>Accessible with proper ARIA attributes</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterExample;
