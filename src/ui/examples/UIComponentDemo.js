import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Stack,
  Text,
  Button,
  Input,
  Card,
  Badge,
  Divider,
  Avatar,
  Switch,
  Tabs,
  Tab,
  TabList,
  TabPanel
} from '../index';

/**
 * UI Component Demo
 * 
 * This component demonstrates the enhanced UI components working together
 * in various compositions to showcase their capabilities, proper theme integration,
 * and responsive layouts.
 */
const UIComponentDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('layout');
  const [switchState, setSwitchState] = useState(false);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <Box padding="lg" backgroundColor="background.primary" width="100%">
      <Stack spacing="xl">
        <Box>
          <Text variant="h1">UI Component System Demo</Text>
          <Text variant="subtitle">
            Demonstrating the enhanced UI components with proper theme integration and responsive layouts
          </Text>
        </Box>
        
        {/* Tabs Navigation */}
        <Flex wrap="wrap">
          {['layout', 'form', 'display', 'container'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'primary' : 'ghost'}
              onClick={() => handleTabClick(tab)}
              marginRight="sm"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Components
            </Button>
          ))}
        </Flex>
        
        {/* Layout Components Section */}
        {activeTab === 'layout' && (
          <Stack spacing="lg">
            <Text variant="h2">Layout Components</Text>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Box</Text>
              <Text>The fundamental building block for layouts.</Text>
              <Box
                marginTop="md"
                padding="md"
                backgroundColor="primary.light"
                borderRadius="md"
                boxShadow="sm"
                height="100px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="text.inverse">A simple Box with theme-aware styling</Text>
              </Box>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Flex</Text>
              <Text>A flexible layout container using flexbox.</Text>
              <Flex
                marginTop="md"
                padding="md"
                backgroundColor="secondary.light"
                borderRadius="md"
                justify="space-between"
                align="center"
                height="100px"
              >
                <Box backgroundColor="primary.main" padding="sm" borderRadius="sm">
                  <Text color="text.inverse">Item 1</Text>
                </Box>
                <Box backgroundColor="primary.main" padding="sm" borderRadius="sm">
                  <Text color="text.inverse">Item 2</Text>
                </Box>
                <Box backgroundColor="primary.main" padding="sm" borderRadius="sm">
                  <Text color="text.inverse">Item 3</Text>
                </Box>
              </Flex>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Grid</Text>
              <Text>A powerful grid layout system.</Text>
              <Grid
                marginTop="md"
                padding="md"
                backgroundColor="tertiary.light"
                borderRadius="md"
                columns="repeat(3, 1fr)"
                gap="md"
                height="200px"
              >
                <Box backgroundColor="primary.main" padding="sm" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text color="text.inverse">Grid Item 1</Text>
                </Box>
                <Box backgroundColor="secondary.main" padding="sm" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text color="text.inverse">Grid Item 2</Text>
                </Box>
                <Box backgroundColor="tertiary.main" padding="sm" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text color="text.inverse">Grid Item 3</Text>
                </Box>
                <Box backgroundColor="secondary.main" padding="sm" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text color="text.inverse">Grid Item 4</Text>
                </Box>
                <Box backgroundColor="tertiary.main" padding="sm" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text color="text.inverse">Grid Item 5</Text>
                </Box>
                <Box backgroundColor="primary.main" padding="sm" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text color="text.inverse">Grid Item 6</Text>
                </Box>
              </Grid>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Stack</Text>
              <Text>Vertical or horizontal stacks with consistent spacing.</Text>
              <Box marginTop="md" display="flex" gap="md">
                <Stack spacing="sm" padding="md" backgroundColor="info.light" borderRadius="md" flex="1">
                  <Text variant="overline">Vertical Stack</Text>
                  {[1, 2, 3].map((i) => (
                    <Box key={i} backgroundColor="info.main" padding="sm" borderRadius="sm">
                      <Text color="text.inverse">Item {i}</Text>
                    </Box>
                  ))}
                </Stack>
                
                <Stack direction="row" spacing="sm" padding="md" backgroundColor="warning.light" borderRadius="md" flex="1">
                  <Text variant="overline">Horizontal Stack</Text>
                  {[1, 2, 3].map((i) => (
                    <Box key={i} backgroundColor="warning.main" padding="sm" borderRadius="sm">
                      <Text color="text.inverse">Item {i}</Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Text</Text>
              <Text>Typography system with consistent theme-aware styles.</Text>
              <Stack spacing="sm" marginTop="md">
                <Text variant="h1">Heading 1</Text>
                <Text variant="h2">Heading 2</Text>
                <Text variant="h3">Heading 3</Text>
                <Text variant="body">Body text with <Text as="span" fontWeight="bold">inline</Text> styling.</Text>
                <Text variant="caption" color="text.secondary">Caption text in secondary color</Text>
                <Text variant="overline">OVERLINE TEXT</Text>
                <Text variant="quote">This is a quote or blockquote that spans multiple lines to demonstrate how the quote variant works.</Text>
                <Text variant="code">const example = "This is code formatting";</Text>
              </Stack>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Tabs</Text>
              <Text>Tab navigation components.</Text>
              
              <Box marginTop="md">
                <Tabs>
                  <TabList>
                    <Tab>First Tab</Tab>
                    <Tab>Second Tab</Tab>
                    <Tab>Third Tab</Tab>
                  </TabList>
                  <Box padding="md">
                    <TabPanel>
                      <Text>Content for the first tab</Text>
                      <Text>Additional information can go here.</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text>Content for the second tab</Text>
                      <Flex gap="md" marginTop="sm">
                        <Button size="sm">Action 1</Button>
                        <Button size="sm" variant="outline">Action 2</Button>
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Text>Content for the third tab</Text>
                      <Box 
                        marginTop="sm" 
                        padding="sm" 
                        backgroundColor="background.secondary"
                        borderRadius="md"
                      >
                        <Text>This is a nested content box within the tab panel.</Text>
                      </Box>
                    </TabPanel>
                  </Box>
                </Tabs>
              </Box>
              
              <Box marginTop="lg">
                <Text variant="h4" marginBottom="sm">Tab Variants</Text>
                <Flex direction="column" gap="lg">
                  <Tabs variant="pills">
                    <TabList>
                      <Tab>Pills Variant</Tab>
                      <Tab>Second Tab</Tab>
                    </TabList>
                  </Tabs>
                  
                  <Tabs variant="underline">
                    <TabList>
                      <Tab>Underline Variant</Tab>
                      <Tab>Second Tab</Tab>
                    </TabList>
                  </Tabs>
                  
                  <Tabs variant="contained">
                    <TabList>
                      <Tab>Contained Variant</Tab>
                      <Tab>Second Tab</Tab>
                    </TabList>
                  </Tabs>
                </Flex>
              </Box>
            </Card>
          </Stack>
        )}
        
        {/* Form Components Section */}
        {activeTab === 'form' && (
          <Stack spacing="lg">
            <Text variant="h2">Form Components</Text>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Button</Text>
              <Text>Buttons with consistent styling and variants.</Text>
              <Flex marginTop="md" gap="md" flexWrap="wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="primary" isDisabled>Disabled</Button>
                <Button variant="primary" size="xs">XS</Button>
                <Button variant="primary" size="sm">SM</Button>
                <Button variant="primary" size="md">MD</Button>
                <Button variant="primary" size="lg">LG</Button>
                <Button variant="primary" size="xl">XL</Button>
              </Flex>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Input</Text>
              <Text>Text inputs with consistent styling and states.</Text>
              <Stack spacing="md" marginTop="md">
                <Input 
                  placeholder="Default input" 
                  value={inputValue} 
                  onChange={handleInputChange} 
                />
                
                <Flex gap="md">
                  <Input placeholder="Outline variant" variant="outline" />
                  <Input placeholder="Filled variant" variant="filled" />
                  <Input placeholder="Flushed variant" variant="flushed" />
                </Flex>
                
                <Flex gap="md">
                  <Input placeholder="XS size" size="xs" />
                  <Input placeholder="SM size" size="sm" />
                  <Input placeholder="MD size" size="md" />
                  <Input placeholder="LG size" size="lg" />
                  <Input placeholder="XL size" size="xl" />
                </Flex>
                
                <Flex gap="md">
                  <Input placeholder="Disabled" isDisabled />
                  <Input placeholder="Invalid" isInvalid />
                  <Input placeholder="Read only" value="Read only value" isReadOnly />
                </Flex>
                
                <Input 
                  placeholder="With left and right addons"
                  leftAddon={<Box padding="xs">$</Box>}
                  rightAddon={<Box padding="xs">.00</Box>} 
                />
              </Stack>
            </Card>
          </Stack>
        )}
        
        {/* Display Components Section */}
        {activeTab === 'display' && (
          <Stack spacing="lg">
            <Text variant="h2">Display Components</Text>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Badge</Text>
              <Text>Badges for status indicators and counters.</Text>
              <Stack spacing="md" marginTop="md">
                <Flex gap="md" align="center">
                  <Text fontWeight="bold">Variants:</Text>
                  <Badge variant="solid">Solid</Badge>
                  <Badge variant="subtle">Subtle</Badge>
                  <Badge variant="outline">Outline</Badge>
                </Flex>
                
                <Flex gap="md" align="center">
                  <Text fontWeight="bold">Colors:</Text>
                  <Badge colorScheme="primary">Primary</Badge>
                  <Badge colorScheme="secondary">Secondary</Badge>
                  <Badge colorScheme="success">Success</Badge>
                  <Badge colorScheme="error">Error</Badge>
                  <Badge colorScheme="warning">Warning</Badge>
                  <Badge colorScheme="info">Info</Badge>
                </Flex>
                
                <Box position="relative" width="fit-content">
                  <Button>Notifications</Button>
                  <Badge 
                    position="absolute" 
                    top="-5px" 
                    right="-5px" 
                    borderRadius="full" 
                    colorScheme="error"
                  >
                    3
                  </Badge>
                </Box>
              </Stack>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Avatar</Text>
              <Text>Avatars for user profiles.</Text>
              <Flex gap="md" marginTop="md" align="center">
                <Avatar size="xs" name="John Doe" src="https://i.pravatar.cc/150?u=john" />
                <Avatar size="sm" name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" />
                <Avatar size="md" name="Bob Johnson" src="https://i.pravatar.cc/150?u=bob" />
                <Avatar size="lg" name="Alice Brown" src="https://i.pravatar.cc/150?u=alice" />
                <Avatar size="xl" name="Sam Wilson" src="https://i.pravatar.cc/150?u=sam" />
              </Flex>
              
              <Flex gap="md" marginTop="md" align="center">
                <Avatar name="John Doe" />
                <Avatar name="Jane Smith" />
                <Avatar name="Bob Johnson" />
                <Avatar name="Alice Brown" />
              </Flex>
              
              <Flex gap="md" marginTop="md" align="center">
                <Avatar variant="circle" name="John Doe" />
                <Avatar variant="square" name="Jane Smith" />
                <Avatar variant="rounded" name="Bob Johnson" />
              </Flex>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Divider</Text>
              <Text>Visual separators for content.</Text>
              
              <Stack spacing="md" marginTop="md">
                <Text>Content above horizontal divider</Text>
                <Divider />
                <Text>Content below horizontal divider</Text>
              </Stack>
              
              <Flex height="100px" marginTop="md">
                <Box flex="1">Left content</Box>
                <Divider orientation="vertical" />
                <Box flex="1">Right content</Box>
              </Flex>
              
              <Stack spacing="md" marginTop="md">
                <Divider>
                  <Text>With Label</Text>
                </Divider>
              </Stack>
              
              <Stack spacing="md" marginTop="md">
                <Divider variant="dashed" />
                <Divider variant="solid" />
                <Divider variant="dotted" />
              </Stack>
            </Card>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Switch</Text>
              <Text>Toggle switches for binary choices.</Text>
              
              <Flex direction="column" gap="md" marginTop="md">
                <Flex align="center" gap="md">
                  <Switch 
                    isChecked={switchState} 
                    onChange={() => setSwitchState(!switchState)} 
                  />
                  <Text>Toggle switch: {switchState ? 'ON' : 'OFF'}</Text>
                </Flex>
                
                <Flex align="center" gap="md">
                  <Text fontWeight="bold">Sizes:</Text>
                  <Switch size="sm" />
                  <Switch size="md" />
                  <Switch size="lg" />
                </Flex>
                
                <Flex align="center" gap="md">
                  <Text fontWeight="bold">States:</Text>
                  <Switch isChecked />
                  <Switch isDisabled />
                  <Switch isChecked isDisabled />
                </Flex>
                
                <Flex align="center" gap="md">
                  <Text fontWeight="bold">Colors:</Text>
                  <Switch colorScheme="primary" isChecked />
                  <Switch colorScheme="secondary" isChecked />
                  <Switch colorScheme="success" isChecked />
                  <Switch colorScheme="error" isChecked />
                </Flex>
              </Flex>
            </Card>
          </Stack>
        )}
        
        {/* Container Components Section */}
        {activeTab === 'container' && (
          <Stack spacing="lg">
            <Text variant="h2">Container Components</Text>
            
            <Card variant="outline" padding="md">
              <Text variant="h3">Card</Text>
              <Text>Container components with various styles and compositions.</Text>
              <Grid marginTop="md" columns={{base: "1fr", md: "1fr 1fr"}} gap="md">
                <Card variant="default" padding="md">
                  <Text variant="h4">Default Card</Text>
                  <Text>A simple card with default styling.</Text>
                </Card>
                
                <Card variant="elevated" padding="md">
                  <Text variant="h4">Elevated Card</Text>
                  <Text>A card with elevation shadow.</Text>
                </Card>
                
                <Card variant="outline" padding="md">
                  <Text variant="h4">Outline Card</Text>
                  <Text>A card with outline border.</Text>
                </Card>
                
                <Card 
                  variant="filled" 
                  padding="md" 
                  backgroundColor="primary.light"
                >
                  <Text variant="h4">Filled Card</Text>
                  <Text>A card with background fill.</Text>
                </Card>
                
                <Card
                  variant="elevated"
                  padding="0"
                  overflow="hidden"
                >
                  <Box 
                    backgroundColor="info.main" 
                    padding="md" 
                    color="text.inverse"
                  >
                    <Text variant="h4">Card with Header</Text>
                  </Box>
                  <Box padding="md">
                    <Text>Card content area</Text>
                    <Text>Additional content can go here.</Text>
                  </Box>
                  <Box 
                    backgroundColor="background.tertiary" 
                    padding="md" 
                    borderTop="1px solid"
                    borderColor="border.light"
                  >
                    <Flex justify="flex-end">
                      <Button variant="outline" size="sm" marginRight="sm">Cancel</Button>
                      <Button variant="primary" size="sm">Submit</Button>
                    </Flex>
                  </Box>
                </Card>
                
                <Card
                  variant="outline"
                  isInteractive
                  isHoverable
                  padding="md"
                  onClick={() => alert('Interactive card clicked!')}
                >
                  <Text variant="h4">Interactive Card</Text>
                  <Text>This card is clickable and has hover effects.</Text>
                </Card>
              </Grid>
            </Card>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default UIComponentDemo;
