import React, { useRef } from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  POPOVER_VARIANTS, 
  POPOVER_SIZES, 
  POPOVER_PLACEMENTS 
} from './index';
import { Button, Text, Box, Flex, Icon, Input } from '../../atoms';

export default {
  title: 'Molecules/Popover',
  component: Popover,
  parameters: {
    componentSubtitle: 'A component that displays content when a trigger element is clicked',
  },
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: Object.values(POPOVER_PLACEMENTS),
      },
      description: 'The placement of the popover relative to the trigger',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(POPOVER_VARIANTS),
      },
      description: 'The visual variant of the popover',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(POPOVER_SIZES),
      },
      description: 'The size of the popover',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the trigger',
    },
    offset: {
      control: 'number',
      description: 'The distance between the popover and the trigger (in pixels)',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the popover is open (controlled)',
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Whether to close the popover when clicking outside',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the popover when pressing escape',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to automatically focus the popover content when it opens',
    },
    trapFocus: {
      control: 'boolean',
      description: 'Whether to trap focus within the popover',
    },
  },
};

// Template for creating stories
const Template = (args) => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text>This is a popover</Text>
      </PopoverContent>
    </Popover>
  </Box>
);

// Basic popover
export const Basic = Template.bind({});
Basic.args = {
  placement: POPOVER_PLACEMENTS.BOTTOM,
  variant: POPOVER_VARIANTS.DEFAULT,
  size: POPOVER_SIZES.MEDIUM,
  arrow: true,
  offset: 8,
  closeOnBlur: true,
  closeOnEsc: true,
  autoFocus: true,
  trapFocus: true,
};

// Different placements
export const Placements = () => (
  <Box 
    display="grid" 
    gridTemplateColumns="repeat(3, 1fr)" 
    gridTemplateRows="repeat(3, 100px)" 
    gap="lg"
    justifyItems="center"
    alignItems="center"
    p="xl"
  >
    <Box gridColumn="1" gridRow="1">
      <Popover placement={POPOVER_PLACEMENTS.TOP_START}>
        <PopoverTrigger>
          <Button size="sm">Top Start</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Top Start Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="2" gridRow="1">
      <Popover placement={POPOVER_PLACEMENTS.TOP}>
        <PopoverTrigger>
          <Button size="sm">Top</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Top Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="3" gridRow="1">
      <Popover placement={POPOVER_PLACEMENTS.TOP_END}>
        <PopoverTrigger>
          <Button size="sm">Top End</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Top End Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="1" gridRow="2">
      <Popover placement={POPOVER_PLACEMENTS.LEFT}>
        <PopoverTrigger>
          <Button size="sm">Left</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Left Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="3" gridRow="2">
      <Popover placement={POPOVER_PLACEMENTS.RIGHT}>
        <PopoverTrigger>
          <Button size="sm">Right</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Right Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="1" gridRow="3">
      <Popover placement={POPOVER_PLACEMENTS.BOTTOM_START}>
        <PopoverTrigger>
          <Button size="sm">Bottom Start</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Bottom Start Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="2" gridRow="3">
      <Popover placement={POPOVER_PLACEMENTS.BOTTOM}>
        <PopoverTrigger>
          <Button size="sm">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Bottom Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
    
    <Box gridColumn="3" gridRow="3">
      <Popover placement={POPOVER_PLACEMENTS.BOTTOM_END}>
        <PopoverTrigger>
          <Button size="sm">Bottom End</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>Bottom End Popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
  </Box>
);

// Different variants
export const Variants = () => (
  <Flex flexDirection="column" gap="lg" alignItems="flex-start" p="lg">
    {Object.entries(POPOVER_VARIANTS).map(([key, value]) => (
      <Popover key={value} variant={value}>
        <PopoverTrigger>
          <Button variant={value === 'default' ? 'primary' : value}>
            {key.replace('_', ' ')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>{key.replace('_', ' ')} Variant</Text>
        </PopoverContent>
      </Popover>
    ))}
  </Flex>
);

// Different sizes
export const Sizes = () => (
  <Flex gap="lg" alignItems="center" p="lg">
    {Object.entries(POPOVER_SIZES).map(([key, value]) => (
      <Popover key={value} size={value}>
        <PopoverTrigger>
          <Button size={value}>
            {key.replace('_', ' ')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>{key.replace('_', ' ')} Size</Text>
        </PopoverContent>
      </Popover>
    ))}
  </Flex>
);

// With rich content
export const RichContent = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Popover>
      <PopoverTrigger>
        <Button>Open Rich Content</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Box className="ui-popover-header">
          <Text fontWeight="bold">Rich Content Popover</Text>
        </Box>
        <Box className="ui-popover-body">
          <Text mb="md">This popover contains rich content with multiple elements.</Text>
          <Flex flexDirection="column" gap="sm">
            <Input placeholder="Enter your name" />
            <Input placeholder="Enter your email" />
          </Flex>
        </Box>
        <Box className="ui-popover-footer">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Submit</Button>
        </Box>
      </PopoverContent>
    </Popover>
  </Box>
);

// With different triggers
export const DifferentTriggers = () => (
  <Flex gap="lg" p="lg">
    <Popover>
      <PopoverTrigger>
        <Button>Button</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text>Button trigger</Text>
      </PopoverContent>
    </Popover>
    
    <Popover>
      <PopoverTrigger>
        <Icon name="settings" size="md" style={{ cursor: 'pointer' }} />
      </PopoverTrigger>
      <PopoverContent>
        <Text>Icon trigger</Text>
      </PopoverContent>
    </Popover>
    
    <Popover>
      <PopoverTrigger>
        <Text as="span" color="primary" style={{ cursor: 'pointer' }}>
          Click this text
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <Text>Text trigger</Text>
      </PopoverContent>
    </Popover>
  </Flex>
);

// Without arrow
export const WithoutArrow = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Popover arrow={false}>
      <PopoverTrigger>
        <Button>No Arrow</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text>This popover has no arrow</Text>
      </PopoverContent>
    </Popover>
  </Box>
);

// With initial focus
export const WithInitialFocus = () => {
  const initialFocusRef = useRef(null);
  
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
      <Popover initialFocusRef={initialFocusRef}>
        <PopoverTrigger>
          <Button>Focus Input</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Box className="ui-popover-header">
            <Text fontWeight="bold">Focus Management</Text>
          </Box>
          <Box className="ui-popover-body">
            <Text mb="md">This input will be focused when the popover opens.</Text>
            <Input ref={initialFocusRef} placeholder="I will be focused" />
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

// Controlled popover
export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="md" height="200px">
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Popover' : 'Open Popover'}
      </Button>
      
      <Popover 
        isOpen={isOpen} 
        onOpen={() => console.log('Popover opened')} 
        onClose={() => {
          console.log('Popover closed');
          setIsOpen(false);
        }}
      >
        <PopoverTrigger>
          <Button>Controlled Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text>This is a controlled popover</Text>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

// Community-specific example
export const CommunityExample = () => (
  <Box p="lg">
    <Text as="h3" mb="md">Community Activity Profile</Text>
    
    <Box 
      p="lg" 
      borderRadius="md" 
      boxShadow="md" 
      bg="background"
      maxWidth="600px"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="lg">
        <Text as="h4">Weekly Mindfulness Session</Text>
        
        <Flex gap="sm">
          <Popover placement={POPOVER_PLACEMENTS.BOTTOM_END}>
            <PopoverTrigger>
              <Button 
                variant="ghost" 
                size="sm"
                leftIcon={<Icon name="share-2" size="sm" />}
              >
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Box className="ui-popover-header">
                <Text fontWeight="bold">Share Activity</Text>
              </Box>
              <Box className="ui-popover-body">
                <Flex flexDirection="column" gap="md">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<Icon name="mail" size="sm" />}
                    justifyContent="flex-start"
                  >
                    Email
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<Icon name="message-circle" size="sm" />}
                    justifyContent="flex-start"
                  >
                    Message
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<Icon name="link" size="sm" />}
                    justifyContent="flex-start"
                  >
                    Copy Link
                  </Button>
                </Flex>
              </Box>
            </PopoverContent>
          </Popover>
          
          <Popover placement={POPOVER_PLACEMENTS.BOTTOM_END}>
            <PopoverTrigger>
              <Button 
                variant="ghost" 
                size="sm"
                leftIcon={<Icon name="more-vertical" size="sm" />}
              >
                More
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Flex flexDirection="column" gap="md">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Icon name="edit" size="sm" />}
                  justifyContent="flex-start"
                >
                  Edit Activity
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Icon name="calendar" size="sm" />}
                  justifyContent="flex-start"
                >
                  Schedule
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Icon name="users" size="sm" />}
                  justifyContent="flex-start"
                >
                  Manage Participants
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Icon name="archive" size="sm" />}
                  justifyContent="flex-start"
                >
                  Archive
                </Button>
                <Divider my="xs" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Icon name="trash-2" size="sm" color="error" />}
                  justifyContent="flex-start"
                  color="error"
                >
                  Delete
                </Button>
              </Flex>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      
      <Text mb="md">A guided meditation and mindfulness practice session for all community members.</Text>
      
      <Flex gap="md" mb="lg">
        <Flex alignItems="center">
          <Icon name="calendar" size="sm" style={{ marginRight: '4px' }} />
          <Text size="sm" color="text-muted">Every Tuesday</Text>
        </Flex>
        <Flex alignItems="center">
          <Icon name="clock" size="sm" style={{ marginRight: '4px' }} />
          <Text size="sm" color="text-muted">7:00 PM - 8:00 PM</Text>
        </Flex>
        <Flex alignItems="center">
          <Icon name="map-pin" size="sm" style={{ marginRight: '4px' }} />
          <Text size="sm" color="text-muted">Community Center</Text>
        </Flex>
      </Flex>
      
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Text size="sm" mr="sm">18 participants</Text>
          <Popover placement={POPOVER_PLACEMENTS.BOTTOM}>
            <PopoverTrigger>
              <Button 
                variant="ghost" 
                size="sm"
                p="0"
              >
                <Flex>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="primary-500" 
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    mr="-8px"
                    border="2px solid white"
                  >
                    JD
                  </Box>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="success-500" 
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    mr="-8px"
                    border="2px solid white"
                  >
                    AS
                  </Box>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="warning-500" 
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    mr="-8px"
                    border="2px solid white"
                  >
                    RK
                  </Box>
                  <Box 
                    width="24px" 
                    height="24px" 
                    borderRadius="full" 
                    bg="gray-500" 
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    border="2px solid white"
                  >
                    +15
                  </Box>
                </Flex>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Box className="ui-popover-header">
                <Text fontWeight="bold">Participants</Text>
              </Box>
              <Box className="ui-popover-body">
                <Flex flexDirection="column" gap="sm" maxHeight="200px" overflowY="auto">
                  <Flex alignItems="center">
                    <Box 
                      width="32px" 
                      height="32px" 
                      borderRadius="full" 
                      bg="primary-500" 
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xs"
                      mr="sm"
                    >
                      JD
                    </Box>
                    <Text>John Doe (Organizer)</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Box 
                      width="32px" 
                      height="32px" 
                      borderRadius="full" 
                      bg="success-500" 
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xs"
                      mr="sm"
                    >
                      AS
                    </Box>
                    <Text>Alice Smith</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Box 
                      width="32px" 
                      height="32px" 
                      borderRadius="full" 
                      bg="warning-500" 
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xs"
                      mr="sm"
                    >
                      RK
                    </Box>
                    <Text>Robert Kim</Text>
                  </Flex>
                  {/* More participants would be listed here */}
                </Flex>
              </Box>
              <Box className="ui-popover-footer">
                <Button variant="outline" size="sm">View All</Button>
              </Box>
            </PopoverContent>
          </Popover>
        </Flex>
        
        <Button variant="primary">Join Activity</Button>
      </Flex>
    </Box>
  </Box>
);
