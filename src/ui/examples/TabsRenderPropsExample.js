import React, { useState } from 'react';
import { Box, Text, Flex, Button, Icon, Input, Badge } from '../atoms';
import { Tabs } from '../molecules/Tabs';

/**
 * TabsRenderPropsExample
 * 
 * This example demonstrates how to use the Tabs component with render props
 * to create highly customized tab interfaces.
 */
const TabsRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom Tabs with Render Props</Text>
      
      {/* Basic Custom Tabs */}
      <Text as="h3" marginBottom="md">Basic Custom Tabs</Text>
      <BasicCustomTabs />
      
      {/* Advanced Custom Tabs */}
      <Text as="h3" marginY="lg">Advanced Custom Tabs</Text>
      <AdvancedCustomTabs />
      
      {/* Interactive Content Tabs */}
      <Text as="h3" marginY="lg">Interactive Content Tabs</Text>
      <InteractiveContentTabs />
    </Box>
  );
};

/**
 * BasicCustomTabs Component
 * 
 * Demonstrates a simple tabs implementation using render props.
 */
const BasicCustomTabs = () => {
  const tabs = [
    { id: 'overview', label: 'Overview', content: 'This is the overview tab content.' },
    { id: 'features', label: 'Features', content: 'This is the features tab content.' },
    { id: 'specs', label: 'Specifications', content: 'This is the specifications tab content.' },
    { id: 'reviews', label: 'Reviews', content: 'This is the reviews tab content.' },
  ];

  return (
    <Tabs defaultTab={0} variant="underline">
      {(tabsState) => (
        <>
          {/* Custom Tab List */}
          <Flex borderBottom="1px solid" borderColor="border">
            {tabs.map((tab, index) => (
              <Box
                key={tab.id}
                px="md"
                py="sm"
                cursor="pointer"
                fontWeight={tabsState.activeTab === index ? "bold" : "normal"}
                color={tabsState.activeTab === index ? "primary.500" : "text"}
                borderBottom={tabsState.activeTab === index ? "2px solid" : "none"}
                borderColor="primary.500"
                onClick={() => tabsState.setActiveTab(index)}
              >
                {tab.label}
              </Box>
            ))}
          </Flex>
          
          {/* Custom Tab Panels */}
          <Box p="md">
            {tabs.map((tab, index) => (
              tabsState.activeTab === index && (
                <Text key={tab.id}>{tab.content}</Text>
              )
            ))}
          </Box>
        </>
      )}
    </Tabs>
  );
};

/**
 * AdvancedCustomTabs Component
 * 
 * Demonstrates a more advanced tabs implementation with custom styling and icons.
 */
const AdvancedCustomTabs = () => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart-2', content: 'View your analytics dashboard.' },
    { id: 'settings', label: 'Settings', icon: 'settings', content: 'Configure your application settings.' },
    { id: 'users', label: 'Users', icon: 'users', content: 'Manage user accounts and permissions.' },
    { id: 'reports', label: 'Reports', icon: 'file-text', content: 'Generate and view reports.' },
  ];

  return (
    <Tabs defaultTab={0} variant="pills">
      {(tabsState) => (
        <Box border="1px solid" borderColor="border" borderRadius="md">
          {/* Custom Tab List */}
          <Flex 
            backgroundColor="background.alt" 
            p="sm" 
            borderTopLeftRadius="md" 
            borderTopRightRadius="md"
          >
            {tabs.map((tab, index) => (
              <Box
                key={tab.id}
                px="md"
                py="sm"
                mx="xs"
                cursor="pointer"
                borderRadius="md"
                backgroundColor={tabsState.activeTab === index ? "primary.500" : "transparent"}
                color={tabsState.activeTab === index ? "white" : "text"}
                onClick={() => tabsState.setActiveTab(index)}
                display="flex"
                alignItems="center"
              >
                <Icon name={tab.icon} size="sm" marginRight="xs" />
                {tab.label}
              </Box>
            ))}
            
            <Box flex="1" />
            
            <Button size="sm" variant="ghost">
              <Icon name="plus" size="sm" marginRight="xs" />
              Add Tab
            </Button>
          </Flex>
          
          {/* Custom Tab Panels */}
          <Box p="lg" borderTop="1px solid" borderColor="border">
            {tabs.map((tab, index) => (
              tabsState.activeTab === index && (
                <Flex key={tab.id} alignItems="center">
                  <Icon 
                    name={tab.icon} 
                    size="lg" 
                    marginRight="md" 
                    color="primary.500" 
                  />
                  <Text>{tab.content}</Text>
                </Flex>
              )
            ))}
          </Box>
        </Box>
      )}
    </Tabs>
  );
};

/**
 * InteractiveContentTabs Component
 * 
 * Demonstrates tabs with interactive content and state within each panel.
 */
const InteractiveContentTabs = () => {
  // Sample data for todo list
  const [todos, setTodos] = useState([
    { id: 1, text: 'Implement render props', completed: true },
    { id: 2, text: 'Write documentation', completed: false },
    { id: 3, text: 'Create examples', completed: false },
  ]);
  
  // State for new todo input
  const [newTodo, setNewTodo] = useState('');
  
  // State for notes
  const [note, setNote] = useState('Add notes about the project here...');
  
  // Counter for metrics tab
  const [counter, setCounter] = useState(0);
  
  // Handler to toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // Handler to add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prevTodos => [
        ...prevTodos, 
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };
  
  return (
    <Tabs defaultTab={0} variant="contained">
      {(tabsState) => (
        <Box border="1px solid" borderColor="border" borderRadius="md">
          {/* Custom Tab List */}
          <Flex borderBottom="1px solid" borderColor="border">
            <Box 
              px="lg" 
              py="md" 
              borderRight="1px solid" 
              borderColor="border"
              backgroundColor={tabsState.activeTab === 0 ? "primary.50" : "background"}
              fontWeight={tabsState.activeTab === 0 ? "bold" : "normal"}
              cursor="pointer"
              onClick={() => tabsState.setActiveTab(0)}
            >
              Tasks
              <Badge 
                ml="xs" 
                variant="solid" 
                colorScheme={todos.filter(t => t.completed).length === todos.length ? "success" : "warning"}
              >
                {todos.filter(t => t.completed).length}/{todos.length}
              </Badge>
            </Box>
            <Box 
              px="lg" 
              py="md" 
              borderRight="1px solid" 
              borderColor="border"
              backgroundColor={tabsState.activeTab === 1 ? "primary.50" : "background"}
              fontWeight={tabsState.activeTab === 1 ? "bold" : "normal"}
              cursor="pointer"
              onClick={() => tabsState.setActiveTab(1)}
            >
              Notes
            </Box>
            <Box 
              px="lg" 
              py="md"
              backgroundColor={tabsState.activeTab === 2 ? "primary.50" : "background"}
              fontWeight={tabsState.activeTab === 2 ? "bold" : "normal"}
              cursor="pointer"
              onClick={() => tabsState.setActiveTab(2)}
            >
              Metrics
              <Badge ml="xs" variant="outline">{counter}</Badge>
            </Box>
          </Flex>
          
          {/* Custom Tab Panels */}
          <Box p="md">
            {/* Tasks Panel */}
            {tabsState.activeTab === 0 && (
              <Box>
                <Flex marginBottom="md">
                  <Input 
                    placeholder="Add new task..." 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    flex="1"
                    marginRight="sm"
                  />
                  <Button onClick={addTodo}>Add</Button>
                </Flex>
                
                {todos.map(todo => (
                  <Flex 
                    key={todo.id} 
                    py="sm" 
                    borderBottom="1px solid" 
                    borderColor="border"
                    alignItems="center"
                  >
                    <Box 
                      width="20px" 
                      height="20px" 
                      borderRadius="sm" 
                      border="1px solid" 
                      borderColor="border"
                      backgroundColor={todo.completed ? "success.500" : "transparent"}
                      marginRight="md"
                      cursor="pointer"
                      onClick={() => toggleTodo(todo.id)}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {todo.completed && <Icon name="check" size="xs" color="white" />}
                    </Box>
                    <Text 
                      textDecoration={todo.completed ? "line-through" : "none"}
                      color={todo.completed ? "text.muted" : "text"}
                    >
                      {todo.text}
                    </Text>
                  </Flex>
                ))}
                
                {todos.length === 0 && (
                  <Text color="text.muted" textAlign="center" py="lg">
                    No tasks yet. Add some!
                  </Text>
                )}
              </Box>
            )}
            
            {/* Notes Panel */}
            {tabsState.activeTab === 1 && (
              <Box>
                <Input 
                  as="textarea" 
                  rows={5} 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  width="100%"
                />
                
                <Flex justifyContent="flex-end" marginTop="sm">
                  <Text fontSize="sm" color="text.muted">
                    {note.length} characters
                  </Text>
                </Flex>
              </Box>
            )}
            
            {/* Metrics Panel */}
            {tabsState.activeTab === 2 && (
              <Box>
                <Flex alignItems="center" justifyContent="center" py="lg" flexDirection="column">
                  <Text fontSize="xl" fontWeight="bold" marginBottom="md">
                    Counter: {counter}
                  </Text>
                  
                  <Flex gap="sm">
                    <Button onClick={() => setCounter(prev => prev - 1)}>
                      <Icon name="minus" marginRight="xs" />
                      Decrease
                    </Button>
                    <Button onClick={() => setCounter(prev => prev + 1)}>
                      <Icon name="plus" marginRight="xs" />
                      Increase
                    </Button>
                    <Button variant="outline" onClick={() => setCounter(0)}>Reset</Button>
                  </Flex>
                </Flex>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Tabs>
  );
};

export default TabsRenderPropsExample;
