import React, { useState, useEffect } from 'react';
import { UserProfile, Box, Text, Flex, Button, Card, Avatar, Icon, Stack, Tabs } from '../index';

/**
 * UserProfile Render Props Example
 * 
 * This example demonstrates how to use the UserProfile component with render props pattern
 * to create a highly customized user profile interface with complete control over rendering.
 */
const UserProfileRenderPropsExample = () => {
  // Sample user data
  const [user, setUser] = useState({
    id: 'user123',
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex.johnson@example.com',
    avatar: 'https://ui.shadcn/avatars/01.png',
    bio: 'Product designer and developer passionate about creating intuitive user experiences. Working at the intersection of design and technology.',
    joined: '2022-03-15',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.design',
    social: {
      twitter: '@alexj_design',
      github: 'alexjohnson',
      linkedin: 'alex-johnson-design'
    },
    stats: {
      posts: 47,
      followers: 1283,
      following: 421,
      contributions: 89
    },
    interests: ['UX Design', 'React', 'Typography', 'Design Systems'],
    achievements: [
      { id: 1, title: 'Top Contributor', icon: 'trophy', date: '2024-02-20' },
      { id: 2, title: 'Design Excellence', icon: 'award', date: '2023-11-05' },
      { id: 3, title: 'Community Builder', icon: 'users', date: '2023-09-15' }
    ]
  });

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});
  const [activeTab, setActiveTab] = useState('posts');

  // Toggle edit mode
  const handleToggleEdit = () => {
    if (isEditing) {
      // Apply changes
      setUser(editedUser);
      setIsEditing(false);
    } else {
      setEditedUser({...user});
      setIsEditing(true);
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle social link changes
  const handleSocialChange = (platform, value) => {
    setEditedUser(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };

  // Handle interests changes
  const handleInterestAdd = (interest) => {
    if (interest && !editedUser.interests.includes(interest)) {
      setEditedUser(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const handleInterestRemove = (interest) => {
    setEditedUser(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  // Sample posts data
  const [posts, setPosts] = useState([
    { id: 1, title: 'The Future of Design Systems', date: '2025-03-12', likes: 42, comments: 9 },
    { id: 2, title: 'Accessibility in Modern UI', date: '2025-02-28', likes: 38, comments: 15 },
    { id: 3, title: 'React 20 New Features Overview', date: '2025-02-15', likes: 56, comments: 23 }
  ]);

  // Render a custom tab panel based on active tab
  const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case 'posts':
        return (
          <Stack spacing="md">
            {posts.map(post => (
              <Card key={post.id} padding="md">
                <Text as="h3" marginBottom="xs">{post.title}</Text>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text color="textColorSecondary" fontSize="sm">{post.date}</Text>
                  <Flex gap="md">
                    <Flex alignItems="center" gap="xs">
                      <Icon name="heart" size="sm" color="error" />
                      <Text fontSize="sm">{post.likes}</Text>
                    </Flex>
                    <Flex alignItems="center" gap="xs">
                      <Icon name="message-circle" size="sm" color="primary" />
                      <Text fontSize="sm">{post.comments}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Stack>
        );
      case 'contributions':
        return (
          <Box textAlign="center" padding="xl">
            <Icon name="github" size="lg" />
            <Text marginTop="md">89 contributions in the last year</Text>
            <Box 
              marginTop="lg" 
              height="120px" 
              backgroundColor="background"
              borderRadius="md"
              padding="md"
            >
              {/* Contribution graph would go here */}
              <Text>Contribution history visualization</Text>
            </Box>
          </Box>
        );
      case 'achievements':
        return (
          <Stack spacing="md">
            {user.achievements.map(achievement => (
              <Card key={achievement.id} padding="md">
                <Flex alignItems="center" gap="md">
                  <Box 
                    backgroundColor="primary" 
                    color="white" 
                    borderRadius="full"
                    width="48px"
                    height="48px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon name={achievement.icon} size="md" />
                  </Box>
                  <Box>
                    <Text as="h3">{achievement.title}</Text>
                    <Text color="textColorSecondary" fontSize="sm">Achieved on {achievement.date}</Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Stack>
        );
      default:
        return <Text>No content available</Text>;
    }
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom User Profile with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the UserProfile component with render props pattern
        to create a highly customized profile interface with complete control over rendering.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Custom User Profile Implementation - to demonstrate how render props would work */}
        <Box 
          width="100%" 
          maxWidth="800px" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          padding="md"
        >
          {/* Profile Header */}
          <Flex 
            padding="lg" 
            backgroundColor="background" 
            borderRadius="md" 
            alignItems="center"
            marginBottom="md"
          >
            <Avatar 
              src={user.avatar} 
              name={user.name} 
              size="xl" 
              marginRight="lg"
            />
            
            <Box flex="1">
              {isEditing ? (
                <Flex flexDirection="column" gap="sm">
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <Flex gap="md">
                    <input
                      type="text"
                      value={editedUser.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="Username"
                      style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                    />
                    <input
                      type="text"
                      value={editedUser.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Location"
                      style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                    />
                  </Flex>
                  <textarea
                    value={editedUser.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      minHeight: '80px'
                    }}
                  />
                </Flex>
              ) : (
                <>
                  <Text as="h1" marginBottom="xs">{user.name}</Text>
                  <Flex gap="md" marginBottom="sm">
                    <Text color="textColorSecondary">@{user.username}</Text>
                    {user.location && (
                      <Flex alignItems="center" gap="xs">
                        <Icon name="map-pin" size="sm" />
                        <Text color="textColorSecondary">{user.location}</Text>
                      </Flex>
                    )}
                  </Flex>
                  <Text>{user.bio}</Text>
                </>
              )}
            </Box>
            
            <Button 
              variant={isEditing ? "primary" : "outline"}
              onClick={handleToggleEdit}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Button>
          </Flex>
          
          {/* Profile Stats */}
          <Box marginBottom="md">
            <Flex 
              justifyContent="space-around" 
              padding="md" 
              backgroundColor="background" 
              borderRadius="md"
            >
              <Box textAlign="center">
                <Text as="h3">{user.stats.posts}</Text>
                <Text color="textColorSecondary">Posts</Text>
              </Box>
              <Box textAlign="center">
                <Text as="h3">{user.stats.followers}</Text>
                <Text color="textColorSecondary">Followers</Text>
              </Box>
              <Box textAlign="center">
                <Text as="h3">{user.stats.following}</Text>
                <Text color="textColorSecondary">Following</Text>
              </Box>
              <Box textAlign="center">
                <Text as="h3">{user.stats.contributions}</Text>
                <Text color="textColorSecondary">Contributions</Text>
              </Box>
            </Flex>
          </Box>
          
          {/* Social Links */}
          <Box marginBottom="md">
            <Text fontWeight="bold" marginBottom="sm">Social Links</Text>
            <Flex gap="md" flexWrap="wrap">
              {isEditing ? (
                <>
                  <Flex alignItems="center" gap="xs">
                    <Icon name="twitter" size="sm" />
                    <input
                      type="text"
                      value={editedUser.social.twitter}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      placeholder="Twitter"
                      style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                    />
                  </Flex>
                  <Flex alignItems="center" gap="xs">
                    <Icon name="github" size="sm" />
                    <input
                      type="text"
                      value={editedUser.social.github}
                      onChange={(e) => handleSocialChange('github', e.target.value)}
                      placeholder="GitHub"
                      style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                    />
                  </Flex>
                  <Flex alignItems="center" gap="xs">
                    <Icon name="linkedin" size="sm" />
                    <input
                      type="text"
                      value={editedUser.social.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      placeholder="LinkedIn"
                      style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                    />
                  </Flex>
                </>
              ) : (
                <>
                  {user.social.twitter && (
                    <Button variant="ghost" leftIcon="twitter">
                      {user.social.twitter}
                    </Button>
                  )}
                  {user.social.github && (
                    <Button variant="ghost" leftIcon="github">
                      {user.social.github}
                    </Button>
                  )}
                  {user.social.linkedin && (
                    <Button variant="ghost" leftIcon="linkedin">
                      {user.social.linkedin}
                    </Button>
                  )}
                </>
              )}
            </Flex>
          </Box>
          
          {/* Interests */}
          <Box marginBottom="md">
            <Text fontWeight="bold" marginBottom="sm">Interests</Text>
            <Flex gap="sm" flexWrap="wrap">
              {isEditing ? (
                <>
                  {editedUser.interests.map(interest => (
                    <Flex 
                      key={interest}
                      alignItems="center" 
                      backgroundColor="background" 
                      borderRadius="full"
                      padding="xs"
                    >
                      <Text marginX="sm">{interest}</Text>
                      <Button 
                        size="xs" 
                        variant="ghost" 
                        onClick={() => handleInterestRemove(interest)}
                      >
                        <Icon name="x" size="sm" />
                      </Button>
                    </Flex>
                  ))}
                  <Box>
                    <input
                      type="text"
                      placeholder="Add interest"
                      id="new-interest"
                      style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleInterestAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </Box>
                </>
              ) : (
                user.interests.map(interest => (
                  <Box 
                    key={interest}
                    backgroundColor="background" 
                    borderRadius="full"
                    padding="xs"
                    paddingX="md"
                  >
                    {interest}
                  </Box>
                ))
              )}
            </Flex>
          </Box>
          
          {/* Profile Tabs */}
          <Box marginY="lg">
            <Tabs>
              <Tabs.List>
                <Tabs.Tab 
                  active={activeTab === 'posts'} 
                  onClick={() => setActiveTab('posts')}
                >
                  Posts
                </Tabs.Tab>
                <Tabs.Tab 
                  active={activeTab === 'contributions'} 
                  onClick={() => setActiveTab('contributions')}
                >
                  Contributions
                </Tabs.Tab>
                <Tabs.Tab 
                  active={activeTab === 'achievements'} 
                  onClick={() => setActiveTab('achievements')}
                >
                  Achievements
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
            
            <Box padding="md">
              {renderTabContent(activeTab)}
            </Box>
          </Box>
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">UserProfile with Render Props</Text>
            <Text marginBottom="md">
              The UserProfile component would benefit greatly from the render props pattern, 
              allowing for completely customized profile layouts and editing interfaces while 
              leveraging the component's state management logic.
            </Text>
            
            <Text as="h4" marginBottom="sm">Benefits of Render Props for UserProfile:</Text>
            <ul>
              <li>Custom profile layouts based on user roles or permissions</li>
              <li>Different editing experiences for different user types</li>
              <li>Specialized data visualization for user metrics</li>
              <li>Team or organization-specific profile elements</li>
              <li>Integration with third-party services like social media platforms</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<UserProfile
  userId={userId}
  editable={true}
  onSave={handleProfileSave}
>
  {({
    user,
    isLoading,
    isEditing,
    editedUser,
    handleEdit,
    handleSave,
    handleCancel,
    updateField,
    stats,
    activeTab,
    setActiveTab,
    // Additional context
  }) => (
    <Box>
      {isLoading ? (
        <YourCustomLoader />
      ) : (
        <>
          {/* Custom header with user information */}
          <YourCustomHeader
            user={isEditing ? editedUser : user}
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            updateField={updateField}
          />
          
          {/* Custom stats display */}
          <YourCustomStatsDisplay stats={stats} />
          
          {/* Custom tabs and content */}
          <YourCustomTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              {
                id: 'posts',
                label: 'Posts',
                content: <YourCustomPostsList userId={user.id} />
              },
              {
                id: 'activity',
                label: 'Activity',
                content: <YourCustomActivity userId={user.id} />
              }
            ]}
          />
        </>
      )}
    </Box>
  )}
</UserProfile>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example demonstrates how the UserProfile component would work with render props,
              though the component doesn't currently implement this pattern in our UI library. The custom 
              implementation shown here illustrates what would be possible with a render props-enabled version.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserProfileRenderPropsExample;
