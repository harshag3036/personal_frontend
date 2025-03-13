/**
 * UserProfile Example
 * 
 * This file demonstrates how to use the UserProfile component.
 */

import React, { useState } from 'react';
import { UserProfile } from '../organisms';
import { Button, Text, Icon } from '../atoms';
import { Card, Badge } from '../molecules';

const UserProfileExample = () => {
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [withCover, setWithCover] = useState(false);
  const [withBorder, setWithBorder] = useState(true);
  const [withShadow, setWithShadow] = useState(false);
  const [withBadges, setWithBadges] = useState(false);
  const [withTabs, setWithTabs] = useState(false);

  const toggleVariant = () => {
    const variants = ['default', 'compact', 'expanded', 'card', 'inline'];
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h2">UserProfile Component</Text>
        <Text>A component for displaying user profile information with various sections and layouts.</Text>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <Button onClick={toggleVariant}>
            Toggle Variant ({variant})
          </Button>
          <Button onClick={toggleSize}>
            Toggle Size ({size})
          </Button>
          <Button onClick={() => setWithCover(!withCover)}>
            Toggle Cover ({withCover ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setWithBorder(!withBorder)}>
            Toggle Border ({withBorder ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setWithShadow(!withShadow)}>
            Toggle Shadow ({withShadow ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setWithBadges(!withBadges)}>
            Toggle Badges ({withBadges ? 'On' : 'Off'})
          </Button>
          <Button onClick={() => setWithTabs(!withTabs)}>
            Toggle Tabs ({withTabs ? 'On' : 'Off'})
          </Button>
        </div>
      </div>

      <Card style={{ padding: 0 }}>
        <UserProfile
          variant={variant}
          size={size}
          withCover={withCover}
          withBorder={withBorder}
          withShadow={withShadow}
          withBadges={withBadges}
          withTabs={withTabs}
        >
          {withCover && (
            <UserProfile.Cover 
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Colorful abstract background" 
            />
          )}
          
          <UserProfile.Avatar 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            name="Jane Smith" 
            size={size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'xl'} 
          />
          
          <UserProfile.Info>
            <UserProfile.Name>Jane Smith</UserProfile.Name>
            <UserProfile.Username>@janesmith</UserProfile.Username>
            <UserProfile.Title>Senior Product Designer</UserProfile.Title>
          </UserProfile.Info>
          
          <UserProfile.Bio>
            Passionate product designer with over 8 years of experience creating user-centered digital experiences. 
            Specializing in UI/UX design, design systems, and accessibility.
          </UserProfile.Bio>
          
          <UserProfile.Stats>
            <UserProfile.Stat label="Projects" value="48" />
            <UserProfile.Stat label="Followers" value="1.2k" />
            <UserProfile.Stat label="Following" value="284" />
            <UserProfile.Stat label="Likes" value="15.7k" />
          </UserProfile.Stats>
          
          <UserProfile.Contact>
            <UserProfile.ContactItem icon="email">
              jane.smith@example.com
            </UserProfile.ContactItem>
            <UserProfile.ContactItem icon="location">
              San Francisco, CA
            </UserProfile.ContactItem>
            <UserProfile.ContactItem icon="link" href="https://example.com">
              example.com/janesmith
            </UserProfile.ContactItem>
          </UserProfile.Contact>
          
          <UserProfile.Social>
            <UserProfile.SocialItem icon="twitter" href="#" label="Twitter" />
            <UserProfile.SocialItem icon="linkedin" href="#" label="LinkedIn" />
            <UserProfile.SocialItem icon="github" href="#" label="GitHub" />
            <UserProfile.SocialItem icon="dribbble" href="#" label="Dribbble" />
            <UserProfile.SocialItem icon="behance" href="#" label="Behance" />
          </UserProfile.Social>
          
          {withBadges && (
            <UserProfile.Badges>
              <UserProfile.Badge variant="primary">UI/UX</UserProfile.Badge>
              <UserProfile.Badge variant="secondary">Design Systems</UserProfile.Badge>
              <UserProfile.Badge variant="success">Accessibility</UserProfile.Badge>
              <UserProfile.Badge variant="info">Figma</UserProfile.Badge>
              <UserProfile.Badge variant="warning">Sketch</UserProfile.Badge>
            </UserProfile.Badges>
          )}
          
          <UserProfile.Actions>
            <UserProfile.Action variant="primary">Follow</UserProfile.Action>
            <UserProfile.Action variant="secondary">Message</UserProfile.Action>
            <UserProfile.Action variant="tertiary">Share</UserProfile.Action>
          </UserProfile.Actions>
          
          {withTabs && (
            <UserProfile.Tabs defaultValue="portfolio">
              <UserProfile.Tabs.List>
                <UserProfile.Tabs.Tab value="portfolio">Portfolio</UserProfile.Tabs.Tab>
                <UserProfile.Tabs.Tab value="activity">Activity</UserProfile.Tabs.Tab>
                <UserProfile.Tabs.Tab value="about">About</UserProfile.Tabs.Tab>
              </UserProfile.Tabs.List>
              <UserProfile.Tabs.Panel value="portfolio">
                <UserProfile.Content>
                  <Text variant="h4" style={{ marginBottom: '16px' }}>Portfolio</Text>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <Card key={item} style={{ padding: '8px' }}>
                        <div style={{ 
                          height: '120px', 
                          backgroundColor: 'var(--color-primary-light)', 
                          borderRadius: '4px',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon name="image" size="lg" />
                        </div>
                        <Text variant="subtitle">Project {item}</Text>
                      </Card>
                    ))}
                  </div>
                </UserProfile.Content>
              </UserProfile.Tabs.Panel>
              <UserProfile.Tabs.Panel value="activity">
                <UserProfile.Content>
                  <Text variant="h4" style={{ marginBottom: '16px' }}>Activity</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2, 3, 4].map((item) => (
                      <Card key={item} style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Icon name="star" />
                          <Text>Completed Project {item}</Text>
                          <Text variant="caption" style={{ marginLeft: 'auto' }}>2 days ago</Text>
                        </div>
                      </Card>
                    ))}
                  </div>
                </UserProfile.Content>
              </UserProfile.Tabs.Panel>
              <UserProfile.Tabs.Panel value="about">
                <UserProfile.Content>
                  <Text variant="h4" style={{ marginBottom: '16px' }}>About</Text>
                  <Text>
                    Jane Smith is a Senior Product Designer with over 8 years of experience in creating user-centered digital experiences. 
                    She specializes in UI/UX design, design systems, and accessibility. Jane has worked with various clients across 
                    different industries, including technology, healthcare, finance, and e-commerce.
                  </Text>
                  <Text style={{ marginTop: '16px' }}>
                    She holds a Bachelor's degree in Graphic Design from the California Institute of the Arts and a Master's degree 
                    in Human-Computer Interaction from Stanford University. Jane is passionate about creating inclusive and accessible 
                    digital products that solve real user problems.
                  </Text>
                </UserProfile.Content>
              </UserProfile.Tabs.Panel>
            </UserProfile.Tabs>
          )}
          
          <UserProfile.Footer>
            <Text variant="caption" style={{ textAlign: 'center' }}>
              Member since January 2020
            </Text>
          </UserProfile.Footer>
        </UserProfile>
      </Card>

      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border)',
        borderRadius: '4px'
      }}>
        <Text variant="h3">UserProfile Features</Text>
        <ul>
          <li>Multiple variants (default, compact, expanded, card, inline)</li>
          <li>Different sizes (small, medium, large)</li>
          <li>Customizable sections (avatar, cover, info, bio, stats, contact, social, actions, badges, tabs)</li>
          <li>Compound component pattern for flexible composition</li>
          <li>Responsive design</li>
          <li>Accessible with proper ARIA attributes</li>
          <li>Themeable with CSS variables</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileExample;
