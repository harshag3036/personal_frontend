import React from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionHeader, 
  AccordionPanel,
  ACCORDION_VARIANTS,
  ACCORDION_SIZES
} from './index';
import { Text, Icon, Box } from '../../atoms';

export default {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    componentSubtitle: 'A versatile accordion component for displaying collapsible content',
  },
  argTypes: {
    defaultIndex: {
      control: 'array',
      description: 'Index or array of indices of the expanded items by default',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded at the same time',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(ACCORDION_VARIANTS),
      },
      description: 'Visual variant of the accordion',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(ACCORDION_SIZES),
      },
      description: 'Size of the accordion',
    },
  },
};

// Template for creating stories
const Template = (args) => (
  <Accordion {...args}>
    <AccordionItem>
      <AccordionHeader>Section 1</AccordionHeader>
      <AccordionPanel>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>Section 2</AccordionHeader>
      <AccordionPanel>
        <Text>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>Section 3</AccordionHeader>
      <AccordionPanel>
        <Text>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
          architecto beatae vitae dicta sunt explicabo.
        </Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

// Basic accordion
export const Basic = Template.bind({});
Basic.args = {
  defaultIndex: [0],
  allowMultiple: false,
  variant: ACCORDION_VARIANTS.DEFAULT,
  size: ACCORDION_SIZES.MEDIUM,
};

// Allow multiple
export const AllowMultiple = Template.bind({});
AllowMultiple.args = {
  defaultIndex: [0, 1],
  allowMultiple: true,
  variant: ACCORDION_VARIANTS.DEFAULT,
  size: ACCORDION_SIZES.MEDIUM,
};

// Different variants
export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.entries(ACCORDION_VARIANTS).map(([key, value]) => (
      <Box key={value}>
        <Text as="h3" mb="sm">{key.replace('_', ' ')} Variant</Text>
        <Accordion variant={value} defaultIndex={[0]}>
          <AccordionItem>
            <AccordionHeader>Section 1</AccordionHeader>
            <AccordionPanel>
              <Text>Content for section 1</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>Section 2</AccordionHeader>
            <AccordionPanel>
              <Text>Content for section 2</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    ))}
  </Box>
);

// Different sizes
export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap="lg">
    {Object.entries(ACCORDION_SIZES).map(([key, value]) => (
      <Box key={value}>
        <Text as="h3" mb="sm">{key.replace('_', ' ')} Size</Text>
        <Accordion size={value} defaultIndex={[0]}>
          <AccordionItem>
            <AccordionHeader>Section 1</AccordionHeader>
            <AccordionPanel>
              <Text>Content for section 1</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>Section 2</AccordionHeader>
            <AccordionPanel>
              <Text>Content for section 2</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    ))}
  </Box>
);

// With custom icons
export const WithCustomIcons = () => (
  <Accordion defaultIndex={[0]}>
    <AccordionItem>
      <AccordionHeader icon={<Icon name="plus" size="sm" />}>
        Section 1
      </AccordionHeader>
      <AccordionPanel>
        <Text>Content for section 1</Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader icon={<Icon name="plus" size="sm" />}>
        Section 2
      </AccordionHeader>
      <AccordionPanel>
        <Text>Content for section 2</Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

// FAQ example
export const FAQExample = () => (
  <Accordion variant="outline" defaultIndex={[0]}>
    <AccordionItem>
      <AccordionHeader>
        <Text fontWeight="bold">What is a design system?</Text>
      </AccordionHeader>
      <AccordionPanel>
        <Text>
          A design system is a collection of reusable components, guided by clear standards, 
          that can be assembled together to build any number of applications. It provides 
          consistency and cohesion across different pages and channels.
        </Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        <Text fontWeight="bold">How do I use this component library?</Text>
      </AccordionHeader>
      <AccordionPanel>
        <Text>
          You can import components from the UI library and use them in your React application. 
          Each component is designed to be flexible and customizable through props. Check the 
          documentation for specific usage examples.
        </Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        <Text fontWeight="bold">Can I customize the appearance of components?</Text>
      </AccordionHeader>
      <AccordionPanel>
        <Text>
          Yes, most components accept a className prop that allows you to add custom styles. 
          Additionally, many components have variant and size props that allow you to change 
          their appearance without writing custom CSS.
        </Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        <Text fontWeight="bold">Is this library accessible?</Text>
      </AccordionHeader>
      <AccordionPanel>
        <Text>
          Yes, accessibility is a core principle of this library. Components follow WAI-ARIA 
          patterns and are tested with screen readers. They support keyboard navigation and 
          have appropriate ARIA attributes.
        </Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

// Community-specific example
export const CommunityExample = () => (
  <Accordion className="ui-accordion--community" allowMultiple defaultIndex={[0]}>
    <AccordionItem>
      <AccordionHeader>
        <Box>
          <Text fontWeight="bold">Community Guidelines</Text>
          <Text size="sm" color="text-muted">Rules and expectations for community members</Text>
        </Box>
      </AccordionHeader>
      <AccordionPanel>
        <Box as="ul" pl="lg">
          <Box as="li" mb="sm">
            <Text>Be respectful and inclusive of all community members.</Text>
          </Box>
          <Box as="li" mb="sm">
            <Text>Contribute constructively to discussions and activities.</Text>
          </Box>
          <Box as="li" mb="sm">
            <Text>Respect privacy and confidentiality of shared information.</Text>
          </Box>
          <Box as="li">
            <Text>Follow the code of conduct in all community interactions.</Text>
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        <Box>
          <Text fontWeight="bold">Activity Participation</Text>
          <Text size="sm" color="text-muted">How to join and contribute to community activities</Text>
        </Box>
      </AccordionHeader>
      <AccordionPanel>
        <Text mb="md">
          Community activities are open to all members. You can join an activity by:
        </Text>
        <Box as="ol" pl="lg">
          <Box as="li" mb="sm">
            <Text>Browsing the activity calendar and selecting an activity.</Text>
          </Box>
          <Box as="li" mb="sm">
            <Text>Clicking the "Join" button on the activity details page.</Text>
          </Box>
          <Box as="li">
            <Text>Following the specific instructions for that activity.</Text>
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        <Box>
          <Text fontWeight="bold">Membership Benefits</Text>
          <Text size="sm" color="text-muted">Advantages of being an active community member</Text>
        </Box>
      </AccordionHeader>
      <AccordionPanel>
        <Box as="ul" pl="lg">
          <Box as="li" mb="sm">
            <Text>Access to exclusive community resources and content.</Text>
          </Box>
          <Box as="li" mb="sm">
            <Text>Opportunities to collaborate with other community members.</Text>
          </Box>
          <Box as="li" mb="sm">
            <Text>Recognition for contributions through badges and achievements.</Text>
          </Box>
          <Box as="li">
            <Text>Invitations to special events and activities.</Text>
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
