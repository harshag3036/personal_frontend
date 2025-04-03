import React, { useState } from 'react';
import { Box, Button, Icon, Text, Flex } from '../atoms';
import { Accordion } from '../molecules/Accordion';

/**
 * AccordionRenderPropsExample
 * 
 * This example demonstrates how to use the Accordion component with render props
 * to create a highly customized accordion interface.
 */
const AccordionRenderPropsExample = () => {
  // Sample data for accordion items
  const accordionItems = [
    {
      id: 1,
      title: 'Getting Started',
      content: 'Learn how to install and set up the UI component library in your project.'
    },
    {
      id: 2,
      title: 'Components',
      content: 'Explore the available components and their usage in your application.'
    },
    {
      id: 3,
      title: 'Customization',
      content: 'Learn how to customize components using themes, variants, and custom styles.'
    },
    {
      id: 4,
      title: 'Best Practices',
      content: 'Discover best practices for using the UI component library effectively.'
    }
  ];

  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Accordion with Render Props</Text>
      
      {/* Basic render props usage */}
      <Text as="h3" marginBottom="md">Basic Custom Accordion</Text>
      <Accordion 
        allowMultiple 
        defaultIndex={[0]} 
        variant="outline"
      >
        {(accordionState) => (
          <>
            {accordionItems.map((item, index) => {
              const isExpanded = accordionState.expandedItems.includes(index);
              
              return (
                <Box 
                  key={item.id} 
                  border="1px solid" 
                  borderColor={isExpanded ? "primary" : "border"} 
                  borderRadius="md" 
                  marginBottom="sm"
                >
                  <Flex 
                    padding="md" 
                    justifyContent="space-between" 
                    alignItems="center"
                    backgroundColor={isExpanded ? "primary.50" : "transparent"}
                    onClick={() => accordionState.toggleItem(index)}
                    cursor="pointer"
                    borderTopLeftRadius="md"
                    borderTopRightRadius="md"
                  >
                    <Text fontWeight="bold">{item.title}</Text>
                    <Icon 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      color={isExpanded ? "primary" : "text"}
                    />
                  </Flex>
                  
                  {isExpanded && (
                    <Box padding="md" borderTop="1px solid" borderColor="border">
                      <Text>{item.content}</Text>
                    </Box>
                  )}
                </Box>
              );
            })}
          </>
        )}
      </Accordion>
      
      {/* Advanced render props example with custom controls */}
      <Text as="h3" marginY="lg">Advanced Custom Accordion with Controls</Text>
      <Accordion
        allowMultiple
        variant="subtle"
      >
        {(accordionState) => {
          // Custom controls for the accordion
          const expandAll = () => {
            accordionItems.forEach((_, index) => {
              if (!accordionState.expandedItems.includes(index)) {
                accordionState.toggleItem(index);
              }
            });
          };
          
          const collapseAll = () => {
            // Create a copy of the expanded items to avoid issues with modifying while iterating
            [...accordionState.expandedItems].forEach(index => {
              accordionState.toggleItem(index);
            });
          };
          
          return (
            <>
              <Flex marginBottom="md" gap="sm">
                <Button variant="outline" size="sm" onClick={expandAll}>
                  <Icon name="maximize-2" size="sm" marginRight="xs" />
                  Expand All
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll}>
                  <Icon name="minimize-2" size="sm" marginRight="xs" />
                  Collapse All
                </Button>
              </Flex>
              
              <Box 
                border="1px solid" 
                borderColor="border" 
                borderRadius="md" 
                overflow="hidden"
              >
                {accordionItems.map((item, index) => {
                  const isExpanded = accordionState.expandedItems.includes(index);
                  
                  return (
                    <Box key={item.id}>
                      <Flex 
                        padding="md" 
                        justifyContent="space-between" 
                        alignItems="center"
                        backgroundColor={isExpanded ? "primary.50" : "background"}
                        borderBottom="1px solid"
                        borderColor="border"
                        onClick={() => accordionState.toggleItem(index)}
                        cursor="pointer"
                      >
                        <Flex alignItems="center">
                          <Icon 
                            name={isExpanded ? "folder-open" : "folder"} 
                            color={isExpanded ? "primary" : "text"}
                            marginRight="sm"
                          />
                          <Text fontWeight={isExpanded ? "bold" : "normal"}>
                            {item.title}
                          </Text>
                        </Flex>
                        <Icon 
                          name={isExpanded ? "chevron-up" : "chevron-down"} 
                          size="sm"
                        />
                      </Flex>
                      
                      {isExpanded && (
                        <Box padding="lg" backgroundColor="background.light">
                          <Text>{item.content}</Text>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </>
          );
        }}
      </Accordion>
      
      {/* Interactive example with dynamic content */}
      <Text as="h3" marginY="lg">Interactive FAQ Accordion</Text>
      <FAQAccordion />
    </Box>
  );
};

/**
 * FAQAccordion Component
 * 
 * A more complex accordion example with interactive FAQ functionality
 */
const FAQAccordion = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How do I install the library?',
      answer: 'You can install the library using npm or yarn with the command: npm install ui-library',
      helpful: 0,
      notHelpful: 0
    },
    {
      id: 2,
      question: 'Is this library compatible with React 18?',
      answer: 'Yes, this library is fully compatible with React 18 and utilizes its latest features.',
      helpful: 0,
      notHelpful: 0
    },
    {
      id: 3,
      question: 'How do I contribute to the library?',
      answer: 'You can contribute by forking the repository, making your changes, and submitting a pull request.',
      helpful: 0,
      notHelpful: 0
    }
  ]);
  
  const updateFeedback = (faqId, type) => {
    setFaqs(prevFaqs => 
      prevFaqs.map(faq => 
        faq.id === faqId 
          ? { ...faq, [type]: faq[type] + 1 } 
          : faq
      )
    );
  };
  
  return (
    <Accordion allowMultiple variant="filled">
      {(accordionState) => (
        <Box border="1px solid" borderColor="border" borderRadius="md">
          <Flex 
            padding="md" 
            backgroundColor="primary.500" 
            color="white"
            justifyContent="space-between"
            alignItems="center"
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
          >
            <Text fontWeight="bold">Frequently Asked Questions</Text>
            <Text fontSize="sm">
              {accordionState.expandedItems.length} of {faqs.length} expanded
            </Text>
          </Flex>
          
          {faqs.map((faq, index) => {
            const isExpanded = accordionState.expandedItems.includes(index);
            
            return (
              <Box key={faq.id} borderBottom="1px solid" borderColor="border">
                <Flex 
                  padding="md" 
                  justifyContent="space-between" 
                  alignItems="center"
                  onClick={() => accordionState.toggleItem(index)}
                  cursor="pointer"
                  backgroundColor={isExpanded ? "primary.50" : "transparent"}
                >
                  <Flex alignItems="center">
                    <Icon 
                      name={isExpanded ? "minus-circle" : "plus-circle"} 
                      color={isExpanded ? "primary" : "text"}
                      marginRight="sm"
                    />
                    <Text fontWeight="bold">{faq.question}</Text>
                  </Flex>
                </Flex>
                
                {isExpanded && (
                  <Box padding="md" paddingLeft="xl" backgroundColor="background.light">
                    <Text marginBottom="md">{faq.answer}</Text>
                    
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontSize="sm" color="text.muted">
                        Was this answer helpful?
                      </Text>
                      <Flex gap="sm">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateFeedback(faq.id, 'helpful')}
                        >
                          <Icon name="thumbs-up" size="sm" marginRight="xs" />
                          Yes ({faq.helpful})
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateFeedback(faq.id, 'notHelpful')}
                        >
                          <Icon name="thumbs-down" size="sm" marginRight="xs" />
                          No ({faq.notHelpful})
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Accordion>
  );
};

export default AccordionRenderPropsExample;
