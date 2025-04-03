import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Card, Icon, Grid, Stack, Tabs } from '../index';

/**
 * Dashboard Render Props Example
 * 
 * This example demonstrates how to use the Dashboard component with render props pattern
 * to create a highly customized dashboard with complete control over widget rendering.
 */
const DashboardRenderPropsExample = () => {
  // Dashboard state
  const [layout, setLayout] = useState('grid'); // grid, list
  const [editMode, setEditMode] = useState(false);
  const [widgets, setWidgets] = useState([
    { id: 'stats', type: 'metrics', title: 'Key Metrics', size: 'large', position: 1, visible: true },
    { id: 'tasks', type: 'list', title: 'Pending Tasks', size: 'medium', position: 2, visible: true },
    { id: 'activity', type: 'timeline', title: 'Recent Activity', size: 'medium', position: 3, visible: true },
    { id: 'chart', type: 'chart', title: 'Performance', size: 'large', position: 4, visible: true },
    { id: 'calendar', type: 'calendar', title: 'Upcoming Events', size: 'medium', position: 5, visible: true },
    { id: 'notifications', type: 'notifications', title: 'Notifications', size: 'small', position: 6, visible: true }
  ]);

  // Sample data for widgets
  const metrics = [
    { id: 1, label: 'Active Users', value: '2,845', change: '+12%', trend: 'up' },
    { id: 2, label: 'New Signups', value: '145', change: '+5%', trend: 'up' },
    { id: 3, label: 'Revenue', value: '$8,423', change: '-2%', trend: 'down' },
    { id: 4, label: 'Conversion Rate', value: '3.2%', change: '+0.5%', trend: 'up' }
  ];

  const tasks = [
    { id: 1, title: 'Review new design system', priority: 'high', dueDate: '2025-03-20', completed: false },
    { id: 2, title: 'Deploy application updates', priority: 'medium', dueDate: '2025-03-22', completed: false },
    { id: 3, title: 'Write documentation', priority: 'low', dueDate: '2025-03-25', completed: false },
    { id: 4, title: 'Prepare quarterly report', priority: 'high', dueDate: '2025-03-28', completed: false }
  ];

  const activities = [
    { id: 1, user: 'Alex Johnson', action: 'created a new post', time: '10 minutes ago' },
    { id: 2, user: 'Sarah Smith', action: 'commented on your design', time: '1 hour ago' },
    { id: 3, user: 'Mark Davis', action: 'completed task "Update API"', time: '3 hours ago' },
    { id: 4, user: 'Lisa Wong', action: 'shared your document', time: '5 hours ago' }
  ];

  const events = [
    { id: 1, title: 'Team Meeting', start: '2025-03-19 10:00', end: '2025-03-19 11:00', location: 'Conference Room B' },
    { id: 2, title: 'Product Review', start: '2025-03-20 14:00', end: '2025-03-20 15:30', location: 'Video Call' },
    { id: 3, title: 'Quarterly Planning', start: '2025-03-22 09:00', end: '2025-03-22 16:00', location: 'Main Office' }
  ];

  const notifications = [
    { id: 1, type: 'alert', message: 'System maintenance scheduled for tomorrow', time: '15 minutes ago' },
    { id: 2, type: 'message', message: 'New message from Sarah Smith', time: '1 hour ago' },
    { id: 3, type: 'update', message: 'Application updated to version 2.5.0', time: '3 hours ago' }
  ];

  // Toggle widget visibility
  const toggleWidget = (id) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === id ? { ...widget, visible: !widget.visible } : widget
      )
    );
  };

  // Move widget up in order
  const moveWidgetUp = (id) => {
    setWidgets(prevWidgets => {
      const index = prevWidgets.findIndex(w => w.id === id);
      if (index <= 0) return prevWidgets;
      
      const newWidgets = [...prevWidgets];
      const widget = newWidgets[index];
      const prevWidget = newWidgets[index - 1];
      
      // Swap positions
      newWidgets[index] = { ...widget, position: prevWidget.position };
      newWidgets[index - 1] = { ...prevWidget, position: widget.position };
      
      return newWidgets.sort((a, b) => a.position - b.position);
    });
  };

  // Move widget down in order
  const moveWidgetDown = (id) => {
    setWidgets(prevWidgets => {
      const index = prevWidgets.findIndex(w => w.id === id);
      if (index >= prevWidgets.length - 1) return prevWidgets;
      
      const newWidgets = [...prevWidgets];
      const widget = newWidgets[index];
      const nextWidget = newWidgets[index + 1];
      
      // Swap positions
      newWidgets[index] = { ...widget, position: nextWidget.position };
      newWidgets[index + 1] = { ...nextWidget, position: widget.position };
      
      return newWidgets.sort((a, b) => a.position - b.position);
    });
  };

  // Change widget size
  const changeWidgetSize = (id, size) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === id ? { ...widget, size } : widget
      )
    );
  };

  // Render widget based on type
  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'metrics':
        return (
          <Box>
            <Grid 
              templateColumns="repeat(2, 1fr)" 
              gap="md"
            >
              {metrics.map(metric => (
                <Card key={metric.id} padding="md">
                  <Text color="textColorSecondary" marginBottom="xs">{metric.label}</Text>
                  <Flex justifyContent="space-between" alignItems="baseline">
                    <Text as="h3" fontSize="xl">{metric.value}</Text>
                    <Flex 
                      alignItems="center" 
                      color={metric.trend === 'up' ? 'success' : 'error'}
                    >
                      <Icon 
                        name={metric.trend === 'up' ? 'arrow-up' : 'arrow-down'} 
                        size="sm" 
                        marginRight="xs"
                      />
                      <Text>{metric.change}</Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Box>
        );
      
      case 'list':
        return (
          <Stack spacing="sm">
            {tasks.map(task => (
              <Flex 
                key={task.id} 
                padding="sm"
                backgroundColor="background"
                borderRadius="md"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Flex alignItems="center" gap="sm">
                    <Box 
                      width="10px" 
                      height="10px" 
                      borderRadius="full"
                      backgroundColor={
                        task.priority === 'high' ? 'error' : 
                        task.priority === 'medium' ? 'warning' : 'success'
                      }
                    />
                    <Text>{task.title}</Text>
                  </Flex>
                  <Text fontSize="sm" color="textColorSecondary">Due: {task.dueDate}</Text>
                </Box>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  leftIcon="check-circle"
                >
                  Complete
                </Button>
              </Flex>
            ))}
          </Stack>
        );
      
      case 'timeline':
        return (
          <Stack spacing="sm">
            {activities.map(activity => (
              <Flex 
                key={activity.id} 
                padding="sm"
                borderLeft="2px solid"
                borderColor="primary"
                marginLeft="xs"
                marginBottom="sm"
              >
                <Box marginLeft="sm">
                  <Text fontWeight="bold">{activity.user}</Text>
                  <Text>{activity.action}</Text>
                  <Text fontSize="sm" color="textColorSecondary">{activity.time}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        );
      
      case 'chart':
        return (
          <Box>
            <Flex gap="md" marginBottom="md">
              <Button size="sm" variant="ghost">Daily</Button>
              <Button size="sm" variant="ghost">Weekly</Button>
              <Button size="sm" variant="primary">Monthly</Button>
              <Button size="sm" variant="ghost">Yearly</Button>
            </Flex>
            
            <Box 
              height="200px" 
              backgroundColor="background"
              borderRadius="md"
              padding="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom="sm"
            >
              <Text>Performance Chart Visualization</Text>
            </Box>
            
            <Flex justifyContent="space-between">
              <Text>Total Revenue: $42,582</Text>
              <Text color="success">+8.5% from last month</Text>
            </Flex>
          </Box>
        );
      
      case 'calendar':
        return (
          <Stack spacing="md">
            <Box 
              backgroundColor="background"
              borderRadius="md"
              padding="md"
              textAlign="center"
            >
              <Text as="h3" marginBottom="sm">March 2025</Text>
              <Text>Calendar View (Simplified)</Text>
            </Box>
            
            <Text fontWeight="bold">Upcoming Events:</Text>
            {events.map(event => (
              <Box 
                key={event.id}
                padding="sm"
                backgroundColor="background"
                borderRadius="md"
              >
                <Text fontWeight="bold">{event.title}</Text>
                <Flex gap="md" fontSize="sm" color="textColorSecondary">
                  <Flex alignItems="center" gap="xs">
                    <Icon name="calendar" size="sm" />
                    <Text>{event.start.split(' ')[0]}</Text>
                  </Flex>
                  <Flex alignItems="center" gap="xs">
                    <Icon name="clock" size="sm" />
                    <Text>{event.start.split(' ')[1]}</Text>
                  </Flex>
                  <Flex alignItems="center" gap="xs">
                    <Icon name="map-pin" size="sm" />
                    <Text>{event.location}</Text>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
        );
      
      case 'notifications':
        return (
          <Stack spacing="sm">
            {notifications.map(notification => (
              <Flex 
                key={notification.id}
                padding="sm"
                backgroundColor="background"
                borderRadius="md"
                alignItems="flex-start"
                gap="sm"
              >
                <Icon 
                  name={
                    notification.type === 'alert' ? 'alert-circle' : 
                    notification.type === 'message' ? 'message-circle' : 'refresh-cw'
                  } 
                  size="sm"
                  color={
                    notification.type === 'alert' ? 'warning' : 
                    notification.type === 'message' ? 'primary' : 'success'
                  }
                />
                <Box flex="1">
                  <Text>{notification.message}</Text>
                  <Text fontSize="xs" color="textColorSecondary">{notification.time}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        );
      
      default:
        return <Text>Unknown widget type</Text>;
    }
  };

  // Get column span based on widget size
  const getColumnSpan = (size) => {
    switch (size) {
      case 'small': return { base: 12, md: 4 };
      case 'medium': return { base: 12, md: 6 };
      case 'large': return { base: 12, md: 12 };
      default: return { base: 12, md: 6 };
    }
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Dashboard with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the Dashboard component with render props pattern
        to create a highly customized dashboard interface with complete control over rendering.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Custom Dashboard Implementation - to demonstrate how render props would work */}
        <Box 
          width="100%" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          overflow="hidden"
        >
          {/* Dashboard Header */}
          <Flex 
            padding="md" 
            backgroundColor="background" 
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="borderColor"
          >
            <Flex alignItems="center" gap="md">
              <Text as="h3">My Dashboard</Text>
              
              <Flex gap="xs">
                <Button 
                  size="sm"
                  variant={layout === 'grid' ? 'primary' : 'outline'}
                  onClick={() => setLayout('grid')}
                >
                  <Icon name="grid" size="sm" />
                </Button>
                <Button 
                  size="sm"
                  variant={layout === 'list' ? 'primary' : 'outline'}
                  onClick={() => setLayout('list')}
                >
                  <Icon name="list" size="sm" />
                </Button>
              </Flex>
            </Flex>
            
            <Button 
              size="sm"
              variant={editMode ? 'primary' : 'outline'}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Save Layout' : 'Edit Layout'}
            </Button>
          </Flex>
          
          {/* Dashboard Content */}
          <Box padding="md">
            {layout === 'grid' ? (
              <Grid 
                templateColumns="repeat(12, 1fr)" 
                gap="md"
              >
                {widgets
                  .filter(widget => widget.visible)
                  .sort((a, b) => a.position - b.position)
                  .map(widget => (
                    <Box
                      key={widget.id}
                      gridColumn={`span ${getColumnSpan(widget.size).md}`}
                    >
                      <Card>
                        <Box
                          padding="sm"
                          borderBottom="1px solid"
                          borderColor="borderColor"
                          marginBottom="md"
                        >
                          <Flex justifyContent="space-between" alignItems="center">
                            <Text as="h4">{widget.title}</Text>
                            
                            {editMode && (
                              <Flex gap="xs">
                                <Button 
                                  size="xs" 
                                  variant="ghost"
                                  title="Move Up"
                                  onClick={() => moveWidgetUp(widget.id)}
                                >
                                  <Icon name="arrow-up" size="sm" />
                                </Button>
                                <Button 
                                  size="xs" 
                                  variant="ghost"
                                  title="Move Down"
                                  onClick={() => moveWidgetDown(widget.id)}
                                >
                                  <Icon name="arrow-down" size="sm" />
                                </Button>
                                <Button 
                                  size="xs" 
                                  variant="ghost"
                                  title="Hide Widget"
                                  onClick={() => toggleWidget(widget.id)}
                                >
                                  <Icon name="eye-off" size="sm" />
                                </Button>
                                <Flex position="relative">
                                  <Button 
                                    size="xs" 
                                    variant="ghost"
                                    title="Resize Widget"
                                  >
                                    <Icon name="maximize-2" size="sm" />
                                  </Button>
                                  {editMode && (
                                    <Box 
                                      position="absolute" 
                                      top="100%" 
                                      right="0" 
                                      zIndex="dropdown"
                                      backgroundColor="white"
                                      border="1px solid"
                                      borderColor="borderColor"
                                      borderRadius="md"
                                      padding="xs"
                                      width="120px"
                                    >
                                      <Stack spacing="xs">
                                        <Button 
                                          size="xs" 
                                          variant="ghost"
                                          justifyContent="flex-start"
                                          onClick={() => changeWidgetSize(widget.id, 'small')}
                                        >
                                          Small
                                        </Button>
                                        <Button 
                                          size="xs" 
                                          variant="ghost"
                                          justifyContent="flex-start"
                                          onClick={() => changeWidgetSize(widget.id, 'medium')}
                                        >
                                          Medium
                                        </Button>
                                        <Button 
                                          size="xs" 
                                          variant="ghost"
                                          justifyContent="flex-start"
                                          onClick={() => changeWidgetSize(widget.id, 'large')}
                                        >
                                          Large
                                        </Button>
                                      </Stack>
                                    </Box>
                                  )}
                                </Flex>
                              </Flex>
                            )}
                          </Flex>
                        </Box>
                        
                        <Box padding="sm">
                          {renderWidget(widget)}
                        </Box>
                      </Card>
                    </Box>
                  ))}
              </Grid>
            ) : (
              <Stack spacing="md">
                {widgets
                  .filter(widget => widget.visible)
                  .sort((a, b) => a.position - b.position)
                  .map(widget => (
                    <Card key={widget.id}>
                      <Box
                        padding="sm"
                        borderBottom="1px solid"
                        borderColor="borderColor"
                        marginBottom="md"
                      >
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text as="h4">{widget.title}</Text>
                          
                          {editMode && (
                            <Flex gap="xs">
                              <Button 
                                size="xs" 
                                variant="ghost"
                                title="Move Up"
                                onClick={() => moveWidgetUp(widget.id)}
                              >
                                <Icon name="arrow-up" size="sm" />
                              </Button>
                              <Button 
                                size="xs" 
                                variant="ghost"
                                title="Move Down"
                                onClick={() => moveWidgetDown(widget.id)}
                              >
                                <Icon name="arrow-down" size="sm" />
                              </Button>
                              <Button 
                                size="xs" 
                                variant="ghost"
                                title="Hide Widget"
                                onClick={() => toggleWidget(widget.id)}
                              >
                                <Icon name="eye-off" size="sm" />
                              </Button>
                            </Flex>
                          )}
                        </Flex>
                      </Box>
                      
                      <Box padding="sm">
                        {renderWidget(widget)}
                      </Box>
                    </Card>
                  ))}
              </Stack>
            )}
          </Box>
          
          {/* Dashboard Footer */}
          {editMode && (
            <Box 
              padding="md" 
              backgroundColor="background"
              borderTop="1px solid"
              borderColor="borderColor"
            >
              <Text fontWeight="bold" marginBottom="sm">Hidden Widgets</Text>
              <Flex gap="md" flexWrap="wrap">
                {widgets
                  .filter(widget => !widget.visible)
                  .map(widget => (
                    <Button 
                      key={widget.id}
                      size="sm"
                      variant="outline"
                      onClick={() => toggleWidget(widget.id)}
                    >
                      <Icon name="eye" size="sm" marginRight="xs" />
                      {widget.title}
                    </Button>
                  ))}
                {widgets.filter(widget => !widget.visible).length === 0 && (
                  <Text color="textColorSecondary">No hidden widgets</Text>
                )}
              </Flex>
            </Box>
          )}
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">Dashboard with Render Props</Text>
            <Text marginBottom="md">
              The Dashboard component would benefit greatly from the render props pattern, 
              allowing for completely customized dashboard layouts and widgets while 
              leveraging the component's state management and layout capabilities.
            </Text>
            
            <Text as="h4" marginBottom="sm">Benefits of Render Props for Dashboard:</Text>
            <ul>
              <li>Custom widget rendering based on content type</li>
              <li>Role-based dashboard customization</li>
              <li>Specialized layout algorithms for different screen sizes</li>
              <li>Custom widget editing and configuration experiences</li>
              <li>Integration with drag-and-drop libraries for enhanced interactions</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<Dashboard
  widgets={widgets}
  defaultLayout="grid"
  allowEditing={true}
  onLayoutChange={handleLayoutChange}
  onWidgetUpdate={handleWidgetUpdate}
>
  {({
    widgets,
    visibleWidgets,
    hiddenWidgets,
    layout,
    isEditing,
    toggleLayout,
    toggleEditMode,
    moveWidget,
    resizeWidget,
    hideWidget,
    showWidget,
    // Additional context
  }) => (
    <Box>
      {/* Custom header */}
      <YourCustomHeader
        layout={layout}
        isEditing={isEditing}
        onLayoutChange={toggleLayout}
        onEditModeChange={toggleEditMode}
      />
      
      {/* Custom layout container */}
      <YourCustomLayout layout={layout}>
        {visibleWidgets.map(widget => (
          <YourCustomWidgetContainer
            key={widget.id}
            widget={widget}
            isEditing={isEditing}
            onMove={moveWidget}
            onResize={resizeWidget}
            onHide={hideWidget}
          >
            {/* Custom widget renderer based on type */}
            {widget.type === 'metrics' && (
              <YourMetricsWidget data={widget.data} />
            )}
            {widget.type === 'chart' && (
              <YourChartWidget data={widget.data} />
            )}
            {/* Add more widget type renderers */}
          </YourCustomWidgetContainer>
        ))}
      </YourCustomLayout>
      
      {/* Custom edit panel */}
      {isEditing && (
        <YourCustomEditPanel
          hiddenWidgets={hiddenWidgets}
          onShowWidget={showWidget}
        />
      )}
    </Box>
  )}
</Dashboard>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example demonstrates how the Dashboard component would work with render props,
              though the component doesn't currently implement this pattern in our UI library. The custom 
              implementation shown here illustrates what would be possible with a render props-enabled version.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardRenderPropsExample;
