import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionHeader, 
  AccordionPanel,
  ACCORDION_VARIANTS
} from '../molecules';
import { Text, Box, Flex, Icon, Button, Divider } from '../atoms';

/**
 * AccordionExample Component
 * 
 * This example demonstrates how to use the Accordion component in a real-world scenario.
 * It shows a community activity FAQ and settings interface.
 */
const AccordionExample = () => {
  // State for the active variant
  const [variant, setVariant] = useState('default');
  
  // State for allowing multiple sections to be open
  const [allowMultiple, setAllowMultiple] = useState(false);
  
  // Sample FAQ data
  const faqItems = [
    {
      question: 'How do I join a community activity?',
      answer: 'You can join a community activity by navigating to the Activities page, selecting an activity that interests you, and clicking the "Join" button. You will then be added to the participant list and receive notifications about the activity.'
    },
    {
      question: 'Can I create my own community activity?',
      answer: 'Yes, any community member can create an activity. To create an activity, go to the Activities page and click the "Create Activity" button. You will need to provide details such as the title, description, date, time, and location of the activity.'
    },
    {
      question: 'How do I earn badges for participating in activities?',
      answer: 'Badges are awarded automatically based on your participation in community activities. Different activities award different badges. You can view your earned badges on your profile page. Some badges are awarded for one-time achievements, while others require consistent participation over time.'
    },
    {
      question: 'What happens if I need to cancel my participation in an activity?',
      answer: 'If you need to cancel your participation, please do so at least 24 hours before the activity starts. You can cancel by going to the activity page and clicking the "Cancel Participation" button. This allows organizers to adjust their plans accordingly.'
    },
    {
      question: 'How can I provide feedback on an activity?',
      answer: 'After participating in an activity, you will receive a notification asking for your feedback. You can also provide feedback directly on the activity page by clicking the "Provide Feedback" button. Your feedback helps improve future activities.'
    }
  ];
  
  // Sample settings data
  const settingsItems = [
    {
      title: 'Notification Preferences',
      content: (
        <Box>
          <Flex alignItems="center" mb="md">
            <input type="checkbox" id="new-activity" defaultChecked />
            <Text as="label" htmlFor="new-activity" ml="sm">Notify me about new activities</Text>
          </Flex>
          <Flex alignItems="center" mb="md">
            <input type="checkbox" id="activity-updates" defaultChecked />
            <Text as="label" htmlFor="activity-updates" ml="sm">Notify me about updates to activities I've joined</Text>
          </Flex>
          <Flex alignItems="center">
            <input type="checkbox" id="activity-reminders" defaultChecked />
            <Text as="label" htmlFor="activity-reminders" ml="sm">Send me reminders before activities</Text>
          </Flex>
        </Box>
      )
    },
    {
      title: 'Privacy Settings',
      content: (
        <Box>
          <Flex alignItems="center" mb="md">
            <input type="checkbox" id="show-participation" defaultChecked />
            <Text as="label" htmlFor="show-participation" ml="sm">Show my participation in activities to other members</Text>
          </Flex>
          <Flex alignItems="center" mb="md">
            <input type="checkbox" id="show-badges" defaultChecked />
            <Text as="label" htmlFor="show-badges" ml="sm">Display my earned badges on my profile</Text>
          </Flex>
          <Flex alignItems="center">
            <input type="checkbox" id="allow-mentions" defaultChecked />
            <Text as="label" htmlFor="allow-mentions" ml="sm">Allow other members to mention me in activity discussions</Text>
          </Flex>
        </Box>
      )
    },
    {
      title: 'Activity Preferences',
      content: (
        <Box>
          <Text mb="md">Preferred activity types:</Text>
          <Flex flexDirection="column" gap="sm" mb="md">
            <Flex alignItems="center">
              <input type="checkbox" id="discussions" defaultChecked />
              <Text as="label" htmlFor="discussions" ml="sm">Discussions</Text>
            </Flex>
            <Flex alignItems="center">
              <input type="checkbox" id="workshops" defaultChecked />
              <Text as="label" htmlFor="workshops" ml="sm">Workshops</Text>
            </Flex>
            <Flex alignItems="center">
              <input type="checkbox" id="projects" defaultChecked />
              <Text as="label" htmlFor="projects" ml="sm">Projects</Text>
            </Flex>
            <Flex alignItems="center">
              <input type="checkbox" id="social" defaultChecked />
              <Text as="label" htmlFor="social" ml="sm">Social Events</Text>
            </Flex>
          </Flex>
        </Box>
      )
    }
  ];
  
  return (
    <Box maxWidth="800px" mx="auto" p="lg">
      <Text as="h2" mb="lg">Community Activity Center</Text>
      
      {/* Controls for the example */}
      <Box mb="xl" p="md" borderRadius="md" bg="background-muted">
        <Text as="h3" mb="md">Accordion Controls</Text>
        <Flex gap="md" mb="md">
          <Text fontWeight="medium">Variant:</Text>
          {Object.values(ACCORDION_VARIANTS).map((v) => (
            <Button 
              key={v} 
              size="sm" 
              variant={variant === v ? 'primary' : 'outline'}
              onClick={() => setVariant(v)}
            >
              {v}
            </Button>
          ))}
        </Flex>
        <Flex alignItems="center">
          <input 
            type="checkbox" 
            id="allow-multiple" 
            checked={allowMultiple} 
            onChange={() => setAllowMultiple(!allowMultiple)}
          />
          <Text as="label" htmlFor="allow-multiple" ml="sm">
            Allow multiple sections to be open
          </Text>
        </Flex>
      </Box>
      
      {/* FAQ Section */}
      <Box mb="xl">
        <Flex justifyContent="space-between" alignItems="center" mb="md">
          <Text as="h3">Frequently Asked Questions</Text>
          <Button 
            size="sm" 
            variant="ghost" 
            leftIcon={<Icon name="help-circle" size="sm" />}
          >
            Ask a Question
          </Button>
        </Flex>
        
        <Accordion 
          variant={variant} 
          allowMultiple={allowMultiple}
          defaultIndex={[0]}
        >
          {faqItems.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader>
                <Text fontWeight="medium">{item.question}</Text>
              </AccordionHeader>
              <AccordionPanel>
                <Text>{item.answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      
      <Divider my="xl" />
      
      {/* Settings Section */}
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb="md">
          <Text as="h3">Account Settings</Text>
          <Button 
            size="sm" 
            variant="primary" 
            leftIcon={<Icon name="save" size="sm" />}
          >
            Save Changes
          </Button>
        </Flex>
        
        <Accordion 
          variant={variant === 'default' ? 'filled' : variant} 
          allowMultiple={allowMultiple}
          className="ui-accordion--community"
        >
          {settingsItems.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader>
                <Flex alignItems="center">
                  <Icon 
                    name={
                      index === 0 ? 'bell' : 
                      index === 1 ? 'lock' : 'sliders'
                    } 
                    size="sm" 
                    style={{ marginRight: '0.75rem' }}
                  />
                  <Text fontWeight="medium">{item.title}</Text>
                </Flex>
              </AccordionHeader>
              <AccordionPanel>
                {item.content}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default AccordionExample;
