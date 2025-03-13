# UI Component Library Integration Guide

This guide provides instructions for integrating the UI component library into your application, with a special focus on community components.

## Getting Started

The UI component library is designed to be easy to integrate into your application. It provides a set of reusable, composable components that can be used to build consistent user interfaces.

## Application-Specific Priorities

Based on analysis of the application codebase, particularly the community components, we've identified the following high-priority integration needs:

1. **Community Component Integration**: The community components (CircleView, ActivityDetailView, ActivityLifecycleView, etc.) are complex and would benefit significantly from using the UI library components.

2. **Specialized Components**: Several specialized components are needed for the community features:
   - Timeline Component for activity timelines
   - StatusBadge Component for activity statuses
   - CommentThread Component for nested comments
   - MetricCard Component for displaying metrics

3. **Complex Visualizations**: Components for visualizing dependencies, milestones, and activity lifecycles are needed.

4. **Tabbed Interfaces**: Many community components use tabbed interfaces that could be standardized.

5. **Modal Dialogs**: Several components use modal dialogs for detailed views and forms.

These priorities guide the integration strategy outlined in this document.

## Installation

The UI component library is already included in the project, so no additional installation is required.

## Usage

### Basic Usage

Import components from the UI library:

```jsx
import { Box, Flex, Grid, Text, Stack, Divider } from '../ui';

const MyComponent = () => (
  <Box padding="md" background="background-surface">
    <Text variant="h1">My Component</Text>
    
    <Stack spacing="md">
      <Text variant="body1">This is a stack of items with consistent spacing.</Text>
      
      <Flex direction="row" align="center" justify="space-between">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
      
      <Divider />
      
      <Grid columns="1fr 2fr" gap="md">
        <div>Column 1</div>
        <div>Column 2</div>
      </Grid>
    </Stack>
  </Box>
);
```

### Using Atoms

Atoms are the basic building blocks of the UI:

```jsx
import { Box, Text, Button, Badge, Input } from '../ui';

const MyComponent = () => (
  <Box padding="md">
    <Text variant="h1">My Component</Text>
    <Button variant="primary" onClick={handleClick}>Click Me</Button>
    <Badge variant="primary">New</Badge>
    <Input
      name="name"
      value={name}
      onChange={handleChange}
      placeholder="Enter your name"
    />
  </Box>
);
```

### Using Molecules

Molecules are combinations of atoms:

```jsx
import { Card, Text, Checkbox, Select, Textarea, Toast } from '../ui';

const MyComponent = () => (
  <Card>
    <Card.Header>
      <Text variant="h2">Card Title</Text>
    </Card.Header>
    
    <Card.Body>
      <Text variant="body1">Card content goes here</Text>
      
      <Checkbox
        name="agree"
        checked={isChecked}
        onChange={handleChange}
        label="I agree to the terms and conditions"
      />
      
      <Select
        name="country"
        value={country}
        onChange={handleChange}
        placeholder="Select your country"
      >
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </Select>
      
      <Textarea
        name="message"
        value={message}
        onChange={handleChange}
        placeholder="Enter your message"
      />
    </Card.Body>
    
    <Card.Footer>
      <Text variant="body2">Card footer</Text>
    </Card.Footer>
  </Card>
);

// Using Toast
const ToastExample = () => {
  const { showToast } = useToast();
  
  const handleClick = () => {
    showToast({
      type: 'success',
      message: 'Operation completed successfully!',
      duration: 3000
    });
  };
  
  return (
    <Button onClick={handleClick}>Show Toast</Button>
  );
};
```

### Using Community-Specific Components

The following components are available specifically for community features:

```jsx
// Using Tabs for ActivityDetailView
import { Tabs, Box, Text } from '../ui';

const ActivityTabs = ({ activity }) => (
  <Tabs defaultTab="details">
    <Tabs.List>
      <Tabs.Tab id="details">Details</Tabs.Tab>
      <Tabs.Tab id="participants">Participants</Tabs.Tab>
      <Tabs.Tab id="milestones">Milestones</Tabs.Tab>
      <Tabs.Tab id="comments">Comments</Tabs.Tab>
    </Tabs.List>
    
    <Tabs.Panel id="details">
      <Box padding="md">
        <Text variant="body1">{activity.description}</Text>
      </Box>
    </Tabs.Panel>
    
    <Tabs.Panel id="participants">
      {/* Participants content */}
    </Tabs.Panel>
    
    <Tabs.Panel id="milestones">
      {/* Milestones content */}
    </Tabs.Panel>
    
    <Tabs.Panel id="comments">
      {/* Comments content */}
    </Tabs.Panel>
  </Tabs>
);

// Using Timeline for ActivityLifecycleView
import { Timeline, Badge, Text } from '../ui';

const ActivityTimeline = ({ events }) => (
  <Timeline>
    {events.map(event => (
      <Timeline.Item 
        key={event.id}
        date={event.date} 
        title={event.title}
        type={event.type}
      >
        <Box padding="sm">
          <Badge variant={event.status}>{event.status}</Badge>
          <Text variant="body2">{event.description}</Text>
        </Box>
      </Timeline.Item>
    ))}
  </Timeline>
);

// Using StatusBadge for activity statuses
import { StatusBadge } from '../ui';

const ActivityStatus = ({ status }) => (
  <StatusBadge 
    status={status} 
    showIcon={true}
    size="md"
  />
);

// Using MetricCard for ActivityInsights
import { MetricCard, Grid } from '../ui';

const ActivityMetrics = ({ metrics }) => (
  <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="md">
    <MetricCard
      title="Participants"
      value={metrics.participantCount}
      trend={metrics.participantTrend}
      icon="users"
    />
    <MetricCard
      title="Comments"
      value={metrics.commentCount}
      trend={metrics.commentTrend}
      icon="comments"
    />
    <MetricCard
      title="Milestones"
      value={`${metrics.completedMilestones}/${metrics.totalMilestones}`}
      progress={metrics.completedMilestones / metrics.totalMilestones}
      icon="milestone"
    />
    <MetricCard
      title="Days Active"
      value={metrics.daysActive}
      icon="calendar"
    />
  </Grid>
);
```

### Using Organisms

Organisms are complex components:

```jsx
import { Form, Input, Button } from '../ui';

const MyComponent = () => (
  <Form
    onSubmit={handleSubmit}
    initialValues={{
      name: '',
      email: ''
    }}
  >
    {({ values, handleChange, handleSubmit, errors }) => (
      <>
        <Input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors?.name}
        />
        
        <Input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors?.email}
        />
        
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </>
    )}
  </Form>
);
```

### Using Community-Specific Organisms

The following organism components are available specifically for community features:

```jsx
// Using ActivityCard organism
import { ActivityCard } from '../ui';

const ActivityList = ({ activities }) => (
  <Stack spacing="md">
    {activities.map(activity => (
      <ActivityCard
        key={activity.id}
        activity={activity}
        variant="default"
        size="medium"
        interactive={true}
        onClick={() => handleActivityClick(activity.id)}
        media={<img src={activity.image} alt={activity.title} />}
        actions={
          <>
            <Button variant="secondary" size="small">Share</Button>
            <Button variant="primary" size="small">View</Button>
          </>
        }
      />
    ))}
  </Stack>
);

// Using MilestoneTracker organism
import { MilestoneTracker } from '../ui';

const ActivityMilestones = ({ milestones, progress }) => (
  <MilestoneTracker
    title="Project Milestones"
    subtitle="Track progress through key milestones"
    milestones={milestones}
    progress={progress}
    variant="default"
    size="medium"
    interactive={true}
    onMilestoneClick={handleMilestoneClick}
    actions={
      <>
        <Button variant="secondary" size="small">Reset</Button>
        <Button variant="primary" size="small">Save Progress</Button>
      </>
    }
  />
);

// Using DependencyGraph organism
import { DependencyGraph } from '../ui';

const MilestoneDependencies = ({ nodes, edges }) => (
  <DependencyGraph
    nodes={nodes}
    edges={edges}
    layout="horizontal"
    interactive={true}
    onNodeClick={handleNodeClick}
    onEdgeClick={handleEdgeClick}
    zoomable={true}
    pannable={true}
    fitView={true}
    nodeTypes={{
      milestone: MilestoneNode,
      activity: ActivityNode
    }}
    edgeTypes={{
      dependency: DependencyEdge,
      relation: RelationEdge
    }}
  />
);

// Using CommentThread component
import { CommentThread } from '../ui';

const ActivityComments = ({ activityId, comments }) => (
  <CommentThread
    comments={comments}
    onCommentAdd={handleCommentAdd}
    onCommentEdit={handleCommentEdit}
    onCommentDelete={handleCommentDelete}
    onCommentReply={handleCommentReply}
    onCommentReaction={handleCommentReaction}
    allowReplies={true}
    allowReactions={true}
    maxDepth={3}
  />
);
```

### Using Design Tokens

Design tokens are the visual design atoms of the design system:

```jsx
import { colors, typography, spacing, shadows, borders, animations, breakpoints } from '../ui';

// Using color tokens
const MyComponent = () => (
  <div style={{ 
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    boxShadow: shadows.md,
    border: `${borders.width.thin} solid ${colors.border.light}`,
    borderRadius: borders.radius.md,
    transition: animations.default
  }}>
    Content
  </div>
);

// Using typography tokens
const TextComponent = () => (
  <div style={{ 
    fontFamily: typography.fontFamilies.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.lineHeights.normal,
    letterSpacing: typography.letterSpacing.normal
  }}>
    Text content
  </div>
);

// Using responsive design with breakpoints
const ResponsiveComponent = () => (
  <div style={{ 
    width: '100%',
    [`@media (min-width: ${breakpoints.sm})`]: {
      width: '50%'
    },
    [`@media (min-width: ${breakpoints.lg})`]: {
      width: '33.33%'
    }
  }}>
    Responsive content
  </div>
);
```

### Using Themes

The UI library includes a theme system:

```jsx
import { ThemeProvider, useTheme, lightTheme, darkTheme } from '../ui';

// Wrap your application with ThemeProvider
const App = () => (
  <ThemeProvider theme={lightTheme}>
    <MyComponent />
  </ThemeProvider>
);

// Access the current theme in a component
const ThemedComponent = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme.name === 'light' ? darkTheme : lightTheme);
  };
  
  return (
    <div style={{ 
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background.primary
    }}>
      <button onClick={toggleTheme}>
        Switch to {theme.name === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      Themed content
    </div>
  );
};
```

### Using Utilities

The UI library includes utility functions:

```jsx
import { cssVariables, componentExtension, toastService, useToast } from '../ui';

// Using CSS variables utility
const cssVars = cssVariables.createVariables({
  colors: {
    primary: '#144272',
    secondary: '#2E8B57'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
});

document.documentElement.style.cssText = cssVars;

// Using component extension utility
const ExtendedButton = componentExtension.extend('button', {
  baseStyles: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  },
  variants: {
    primary: {
      backgroundColor: '#144272',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#2E8B57',
      color: 'white'
    }
  }
});

// Using toast service
const showSuccessToast = () => {
  toastService.show({
    type: 'success',
    message: 'Operation completed successfully!',
    duration: 3000
  });
};

// Using toast hook
const ToastComponent = () => {
  const { showToast } = useToast();
  
  const handleClick = () => {
    showToast({
      type: 'success',
      message: 'Operation completed successfully!',
      duration: 3000
    });
  };
  
  return (
    <button onClick={handleClick}>Show Toast</button>
  );
};
```

### Complex Example

For a more complex example, see the [ComponentUsage](../examples/ComponentUsage.js) example.

## Integration Strategy

To ensure smooth integration of the UI library into the application, we recommend the following approach:

1. **Start with Atomic Components**: Begin by replacing basic HTML elements with atomic components like Box, Text, and Button.

2. **Move to Molecular Components**: Replace simple component combinations with molecular components like Card, Tabs, and Modal.

3. **Implement Organism Components**: Replace complex component combinations with organism components like Form, ActivityCard, and CommentSection.

4. **Refactor Page by Page**: Start with simpler pages and move to more complex ones.

5. **Use Codemods for Bulk Changes**: Create codemods to automate repetitive changes.

### Example Integration: ActivityDetailView

Here's an example of how the ActivityDetailView component could be refactored to use the UI library:

```jsx
// Before
<div className="activity-detail-view">
  <div className="detail-header">
    <div className="header-content">
      <div className="type-status">
        <span className={`activity-type ${activity.type}`}>
          {activity.type}
        </span>
        <span className={`activity-status ${activity.status}`}>
          {activity.status}
        </span>
      </div>
      <h2>{activity.title}</h2>
      <p className="creation-date">
        Created {new Date(activity.createdAt).toLocaleDateString()}
      </p>
    </div>
    <button 
      className="close-button"
      onClick={onClose}
    >
      ×
    </button>
  </div>

  <div className="tab-navigation">
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>

  <div className="detail-content">
    {/* Tab content */}
  </div>
</div>

// After
<Box className="activity-detail-view">
  <Flex justifyContent="space-between" alignItems="center" className="detail-header">
    <Box className="header-content">
      <Flex gap="sm" className="type-status">
        <Badge variant={activity.type}>{activity.type}</Badge>
        <Badge variant={activity.status}>{activity.status}</Badge>
      </Flex>
      <Text variant="h2">{activity.title}</Text>
      <Text variant="caption" className="creation-date">
        Created {new Date(activity.createdAt).toLocaleDateString()}
      </Text>
    </Box>
    <Button 
      variant="icon"
      onClick={onClose}
      aria-label="Close"
    >
      <Icon name="close" />
    </Button>
  </Flex>

  <Tabs activeTab={activeTab} onChange={setActiveTab}>
    <Tabs.List>
      {tabs.map(tab => (
        <Tabs.Tab key={tab.id} id={tab.id}>
          {tab.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
    
    <Tabs.Panel id="description">
      {/* Description content */}
    </Tabs.Panel>
    
    <Tabs.Panel id="details">
      {/* Details content */}
    </Tabs.Panel>
    
    {/* Other tab panels */}
  </Tabs>
</Box>
```

## Component Organization

The UI component library follows atomic design principles, organizing components into these categories:

- **Atoms**: Basic building blocks (Box, Flex, Grid, Text, Stack, Divider, Button, Badge, Input)
- **Molecules**: Combinations of atoms (Card, Checkbox, Select, Textarea, Toast)
- **Organisms**: Complex components (Form)
- **Templates**: Page layouts (future)

This organization helps create a consistent and maintainable component library that can be used to build complex user interfaces.

### Import Examples

```jsx
// Import all components from the UI library
import { 
  // Atoms
  Box, Flex, Grid, Text, Stack, Divider, Button, Badge, Input,
  
  // Molecules
  Card, Checkbox, Select, Textarea, Toast,
  
  // Organisms
  Form,
  
  // Design Tokens
  colors, typography, spacing, shadows, borders, animations, breakpoints,
  
  // Theme System
  ThemeProvider, useTheme, lightTheme, darkTheme,
  
  // Utilities
  cssVariables, componentExtension, toastService, useToast
} from '../ui';
```

## Best Practices

1. **Use Atomic Design Principles**: Start with atoms, then compose them into molecules and organisms.
2. **Use Design Tokens**: Use design tokens for consistent styling.
3. **Use Composition**: Compose components together to create complex UIs.
4. **Use Semantic Components**: Use semantic components like `Text` instead of raw HTML elements.
5. **Use Responsive Design**: Use responsive props like `columns` in `Grid` to create responsive layouts.
6. **Use Accessibility**: Ensure your components are accessible by using semantic HTML and ARIA attributes.
7. **Prioritize Community Components**: Focus on integrating the UI library with community components first.
8. **Maintain Consistency**: Use the same patterns and components across the application.
9. **Document Integration**: Document how components are integrated for future reference.
10. **Test Thoroughly**: Test integrated components thoroughly to ensure they work as expected.

## Examples

See the examples directory for examples of how to use the UI components:

```jsx
import { Examples } from '../ui';

const App = () => (
  <div>
    <h1>Examples</h1>
    <Examples.BasicLayout />
    <Examples.ComponentUsage />
  </div>
);
```

## Troubleshooting

### Component Not Found

If you get an error like `Cannot find module '../ui/components/Button'`, make sure you're importing from the correct path:

```jsx
// Incorrect
import { Button } from '../ui/components/Button';

// Correct
import { Button } from '../ui';
```

### Styling Issues

If your components don't look right, make sure you're using the correct props:

```jsx
// Incorrect
<Box padding={10}>...</Box>

// Correct
<Box padding="md">...</Box>
```

### Integration Issues

If you're having trouble integrating a component, try breaking it down into smaller parts:

```jsx
// Instead of this
<ComplexComponent {...props} />

// Try this
<Box>
  <Header>...</Header>
  <Content>...</Content>
  <Footer>...</Footer>
</Box>
```

## Contributing

When adding new components to the library:

1. Follow the existing component structure
2. Use design tokens for styling
3. Write comprehensive documentation
4. Add appropriate PropTypes
5. Ensure the component is accessible
6. Test the component thoroughly

## Future Improvements

Future improvements to the UI component library include:

1. **Additional Community-Specific Components**:
   - MilestoneTracker Component for tracking milestones
   - DependencyGraph Component for visualizing dependencies

2. **Advanced Features**:
   - Storybook integration for all components
   - Comprehensive test coverage for all components
   - Visual regression testing
   - Accessibility testing
   - Performance monitoring
   - Component playground

3. **Application Refactoring**:
   - Migration strategy
   - Component refactoring
   - Performance optimization
   - Accessibility enhancements

4. **Documentation Enhancements**:
   - Comprehensive API documentation
   - Interactive examples
   - Integration guides for specific use cases
   - Performance best practices
