import React from 'react';
import { 
  Tooltip, 
  TOOLTIP_VARIANTS, 
  TOOLTIP_SIZES, 
  TOOLTIP_PLACEMENTS 
} from './index';
import { Button, Text, Box, Flex, Icon } from '../../atoms';

export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    componentSubtitle: 'A component that displays informative text when users hover over, focus on, or tap an element',
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content of the tooltip',
    },
    placement: {
      control: {
        type: 'select',
        options: Object.values(TOOLTIP_PLACEMENTS),
      },
      description: 'The placement of the tooltip relative to the trigger',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(TOOLTIP_VARIANTS),
      },
      description: 'The visual variant of the tooltip',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(TOOLTIP_SIZES),
      },
      description: 'The size of the tooltip',
    },
    delay: {
      control: 'number',
      description: 'The delay before showing the tooltip (in milliseconds)',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the trigger',
    },
    maxWidth: {
      control: 'number',
      description: 'The maximum width of the tooltip (in pixels)',
    },
  },
};

// Template for creating stories
const Template = (args) => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  </Box>
);

// Basic tooltip
export const Basic = Template.bind({});
Basic.args = {
  content: 'This is a tooltip',
  placement: TOOLTIP_PLACEMENTS.TOP,
  variant: TOOLTIP_VARIANTS.DEFAULT,
  size: TOOLTIP_SIZES.MEDIUM,
  delay: 300,
  arrow: true,
  maxWidth: 300,
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
      <Tooltip content="Top Left" placement={TOOLTIP_PLACEMENTS.TOP}>
        <Button size="sm">Top</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="2" gridRow="1">
      <Tooltip content="Top" placement={TOOLTIP_PLACEMENTS.TOP}>
        <Button size="sm">Top</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="3" gridRow="1">
      <Tooltip content="Top Right" placement={TOOLTIP_PLACEMENTS.TOP}>
        <Button size="sm">Top</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="1" gridRow="2">
      <Tooltip content="Left" placement={TOOLTIP_PLACEMENTS.LEFT}>
        <Button size="sm">Left</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="3" gridRow="2">
      <Tooltip content="Right" placement={TOOLTIP_PLACEMENTS.RIGHT}>
        <Button size="sm">Right</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="1" gridRow="3">
      <Tooltip content="Bottom Left" placement={TOOLTIP_PLACEMENTS.BOTTOM}>
        <Button size="sm">Bottom</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="2" gridRow="3">
      <Tooltip content="Bottom" placement={TOOLTIP_PLACEMENTS.BOTTOM}>
        <Button size="sm">Bottom</Button>
      </Tooltip>
    </Box>
    
    <Box gridColumn="3" gridRow="3">
      <Tooltip content="Bottom Right" placement={TOOLTIP_PLACEMENTS.BOTTOM}>
        <Button size="sm">Bottom</Button>
      </Tooltip>
    </Box>
  </Box>
);

// Different variants
export const Variants = () => (
  <Flex flexDirection="column" gap="lg" alignItems="flex-start" p="lg">
    {Object.entries(TOOLTIP_VARIANTS).map(([key, value]) => (
      <Tooltip 
        key={value} 
        content={`${key.replace('_', ' ')} Variant`} 
        variant={value}
      >
        <Button variant={value === 'default' ? 'primary' : value}>
          {key.replace('_', ' ')}
        </Button>
      </Tooltip>
    ))}
  </Flex>
);

// Different sizes
export const Sizes = () => (
  <Flex gap="lg" alignItems="center" p="lg">
    {Object.entries(TOOLTIP_SIZES).map(([key, value]) => (
      <Tooltip 
        key={value} 
        content={`${key.replace('_', ' ')} Size`} 
        size={value}
      >
        <Button size={value}>
          {key.replace('_', ' ')}
        </Button>
      </Tooltip>
    ))}
  </Flex>
);

// With rich content
export const RichContent = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Tooltip
      content={
        <Box p="xs">
          <Text fontWeight="bold" mb="xs">Rich Content Tooltip</Text>
          <Text size="sm">This tooltip contains rich content with multiple elements.</Text>
          <Flex mt="sm" gap="sm">
            <Icon name="info" size="sm" />
            <Text size="sm">Additional information</Text>
          </Flex>
        </Box>
      }
      maxWidth={250}
    >
      <Button>Hover for rich content</Button>
    </Tooltip>
  </Box>
);

// With different triggers
export const DifferentTriggers = () => (
  <Flex gap="lg" p="lg">
    <Tooltip content="Button with tooltip">
      <Button>Button</Button>
    </Tooltip>
    
    <Tooltip content="Icon with tooltip">
      <Icon name="help-circle" size="md" style={{ cursor: 'pointer' }} />
    </Tooltip>
    
    <Tooltip content="Text with tooltip">
      <Text as="span" color="primary" style={{ cursor: 'pointer' }}>
        Hover this text
      </Text>
    </Tooltip>
  </Flex>
);

// Without arrow
export const WithoutArrow = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Tooltip
      content="This tooltip has no arrow"
      arrow={false}
    >
      <Button>No Arrow</Button>
    </Tooltip>
  </Box>
);

// Community-specific example
export const CommunityExample = () => (
  <Box p="lg">
    <Text as="h3" mb="md">Community Activity Form</Text>
    
    <Flex flexDirection="column" gap="md" maxWidth="500px">
      <Flex alignItems="center" gap="sm">
        <Text as="label" htmlFor="activity-title">Activity Title</Text>
        <Tooltip 
          content="The title should be clear and descriptive" 
          variant="info"
          placement="right"
        >
          <Icon name="help-circle" size="sm" style={{ cursor: 'pointer' }} />
        </Tooltip>
      </Flex>
      <Box mb="md">
        <input 
          id="activity-title" 
          type="text" 
          placeholder="Enter activity title" 
          style={{ width: '100%', padding: '8px' }} 
        />
      </Box>
      
      <Flex alignItems="center" gap="sm">
        <Text as="label" htmlFor="activity-type">Activity Type</Text>
        <Tooltip 
          content="Select the type that best describes your activity" 
          variant="info"
          placement="right"
        >
          <Icon name="help-circle" size="sm" style={{ cursor: 'pointer' }} />
        </Tooltip>
      </Flex>
      <Box mb="md">
        <select 
          id="activity-type" 
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="">Select type</option>
          <option value="discussion">Discussion</option>
          <option value="workshop">Workshop</option>
          <option value="project">Project</option>
          <option value="social">Social Event</option>
        </select>
      </Box>
      
      <Flex alignItems="center" gap="sm">
        <Text as="label" htmlFor="activity-visibility">Visibility</Text>
        <Tooltip 
          content={
            <Box p="xs">
              <Text fontWeight="bold" mb="xs">Activity Visibility</Text>
              <Text size="sm">Public: Visible to all community members</Text>
              <Text size="sm">Private: Visible only to invited members</Text>
              <Text size="sm">Restricted: Visible to specific groups</Text>
            </Box>
          } 
          variant="info"
          placement="right"
          maxWidth={250}
        >
          <Icon name="help-circle" size="sm" style={{ cursor: 'pointer' }} />
        </Tooltip>
      </Flex>
      <Box mb="md">
        <select 
          id="activity-visibility" 
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="restricted">Restricted</option>
        </select>
      </Box>
      
      <Flex justifyContent="flex-end" gap="md" mt="md">
        <Tooltip content="Clear all form fields">
          <Button variant="outline">Reset</Button>
        </Tooltip>
        <Tooltip content="Save and create the activity">
          <Button variant="primary">Create Activity</Button>
        </Tooltip>
      </Flex>
    </Flex>
  </Box>
);
