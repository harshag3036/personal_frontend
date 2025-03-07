# UI Component Library Structure

This document provides a comprehensive overview of the UI component library structure, making it easier for developers to understand and navigate the codebase.

## Application-Specific Priorities

Based on analysis of the application codebase, particularly the community components, we've identified the following high-priority needs:

1. **Community Component Integration**: The community components (CircleView, ActivityDetailView, ActivityLifecycleView, etc.) are complex and would benefit significantly from using the UI library components.

2. **Specialized Components**: Several specialized components are needed for the community features:
   - Timeline Component for activity timelines
   - StatusBadge Component for activity statuses
   - CommentThread Component for nested comments
   - MetricCard Component for displaying metrics

3. **Complex Visualizations**: Components for visualizing dependencies, milestones, and activity lifecycles are needed.

4. **Tabbed Interfaces**: Many community components use tabbed interfaces that could be standardized.

5. **Modal Dialogs**: Several components use modal dialogs for detailed views and forms.

These priorities will guide the implementation plan, ensuring that the most impactful components are developed first.

## Directory Structure

```
src/ui/
├── atoms/           # Atomic components (smallest building blocks)
├── molecules/       # Molecular components (combinations of atoms)
├── organisms/       # Organism components (complex combinations of molecules)
├── tokens/          # Design tokens (colors, spacing, typography, etc.)
├── themes/          # Theme definitions and theme provider
├── utilities/       # Utility functions and helpers
├── examples/        # Usage examples for components
└── docs/            # Documentation
```

## Component Hierarchy

The UI library follows the Atomic Design methodology, organizing components into a hierarchical structure:

1. **Atoms**: Basic building blocks that can't be broken down further
   - Box, Text, Button, Input, Badge, etc.

2. **Molecules**: Combinations of atoms that form simple UI components
   - Card, Form Field, Search Bar, etc.

3. **Organisms**: Complex UI components composed of molecules and atoms
   - Form, Navigation, Header, Footer, etc.

## Key Components

### Atoms

| Component | Description | File Location |
|-----------|-------------|---------------|
| Box | Basic layout container | `src/ui/atoms/Box/Box.js` |
| Text | Typography component | `src/ui/atoms/Text/Text.js` |
| Button | Interactive button | `src/ui/atoms/Button/Button.js` |
| Input | Text input field | `src/ui/atoms/Input/Input.js` |
| Badge | Status indicator | `src/ui/atoms/Badge/Badge.js` |
| Stack | Vertical or horizontal stack layout | `src/ui/atoms/Stack/Stack.js` |
| Flex | Flexbox container | `src/ui/atoms/Flex/Flex.js` |
| Grid | CSS Grid container | `src/ui/atoms/Grid/Grid.js` |
| Divider | Horizontal or vertical divider | `src/ui/atoms/Divider/Divider.js` |

### Molecules

| Component | Description | File Location |
|-----------|-------------|---------------|
| Card | Content container with header, body, footer | `src/ui/molecules/Card/Card.js` |
| Checkbox | Checkbox input with label | `src/ui/molecules/Checkbox/Checkbox.js` |
| Select | Dropdown select component | `src/ui/molecules/Select/Select.js` |
| Textarea | Multiline text input | `src/ui/molecules/Textarea/Textarea.js` |
| Toast | Notification component | `src/ui/molecules/Toast/Toast.js` |

### Planned Molecules

| Component | Description | Priority |
|-----------|-------------|----------|
| Tabs | Tabbed interface component | High - Needed for ActivityDetailView |
| Modal | Dialog component | High - Needed for ActivityDetailView, CircleView |
| Tooltip | Contextual help component | High - Useful across all community components |
| Menu | Dropdown menu component | High - Needed for action menus |
| Timeline | Activity timeline component | High - Critical for ActivityLifecycleView |
| StatusBadge | Status indicator component | High - Used across all community components |
| CommentThread | Nested comments component | High - Needed for CommentSection |
| MetricCard | Metrics display component | High - Used in ActivityLifecycleView |

### Organisms

| Component | Description | File Location |
|-----------|-------------|---------------|
| Form | Complete form with validation | `src/ui/organisms/Form/Form.js` |

### Planned Organisms

| Component | Description | Priority |
|-----------|-------------|----------|
| ActivityCard | Activity display component | High - Core component for CircleView |
| MilestoneTracker | Milestone tracking component | High - Critical for ActivityLifecycleView |
| DependencyGraph | Dependency visualization component | High - Needed for MilestoneDependencyView |
| CommentSection | Comments and discussions component | High - Used across community components |
| DataTable | Structured data display component | Medium |
| Calendar | Calendar component | Medium |

## Utilities

The UI library includes several utilities to enhance component functionality:

| Utility | Description | File Location |
|---------|-------------|---------------|
| responsive-props | Enables responsive prop values based on breakpoints | `src/ui/utilities/responsive-props.js` |
| polymorphic | Enables components to be rendered as different HTML elements | `src/ui/utilities/polymorphic.js` |
| component-extension | Utility for extending component functionality | `src/ui/utilities/component-extension.js` |
| css-variables | Utility for managing CSS variables | `src/ui/utilities/css-variables.js` |
| ToastService | Service for displaying toast notifications | `src/ui/utilities/ToastService.js` |
| useToast | Hook for using toast notifications | `src/ui/utilities/useToast.js` |

## Design Tokens

Design tokens are the visual design atoms of the design system:

| Token Type | Description | File Location |
|------------|-------------|---------------|
| Colors | Color palette | `src/ui/tokens/colors.js` |
| Typography | Font families, sizes, weights | `src/ui/tokens/typography.js` |
| Spacing | Margin and padding values | `src/ui/tokens/spacing.js` |
| Shadows | Box shadow values | `src/ui/tokens/shadows.js` |
| Borders | Border radius, width, style | `src/ui/tokens/borders.js` |
| Animations | Animation durations, easing | `src/ui/tokens/animations.js` |
| Breakpoints | Responsive breakpoints | `src/ui/tokens/breakpoints.js` |

## Examples

The library includes examples to demonstrate component usage:

| Example | Description | File Location |
|---------|-------------|---------------|
| BasicLayout | Basic layout example | `src/ui/examples/BasicLayout.js` |
| ComponentUsage | General component usage | `src/ui/examples/ComponentUsage.js` |
| ResponsiveExample | Responsive props usage | `src/ui/examples/ResponsiveExample.js` |
| PolymorphicExample | Polymorphic components usage | `src/ui/examples/PolymorphicExample.js` |
| CheckboxExample | Checkbox component usage | `src/ui/examples/checkbox-usage-example.js` |
| FormExample | Form component usage | `src/ui/examples/form-usage-example.js` |
| SelectExample | Select component usage | `src/ui/examples/select-usage-example.js` |
| TextareaExample | Textarea component usage | `src/ui/examples/textarea-usage-example.js` |
| ToastExample | Toast notification usage | `src/ui/examples/toast-usage-example.js` |

## Documentation

The library includes comprehensive documentation:

| Document | Description | File Location |
|----------|-------------|---------------|
| README | Overview of the UI library | `src/ui/README.md` |
| Roadmap | Development roadmap and progress tracking | `src/ui/docs/roadmap.md` |
| Component API Guide | Detailed component API documentation | `src/ui/docs/component-api-guide.md` |
| Development Guide | Guidelines for developing new components | `src/ui/docs/development-guide.md` |
| Integration Guide | How to integrate the UI library | `src/ui/docs/integration-guide.md` |

## Implementation Plan

The UI library is being developed in phases:

1. **Phase 1: Foundation Strengthening & Critical Components** (March-April 2025)
   - Component migration ✅
   - Standardize component structure
   - Standardize prop patterns
   - Add testing infrastructure
   - Implement critical atomic components (Icon, Avatar, Link, Label)

2. **Phase 2: Developer Experience & Community-Specific Components** (April-May 2025)
   - Implement responsive props system
   - Enhance component composition
   - Implement polymorphic components
   - Add Storybook
   - Implement basic molecular components (Tabs, Modal, Tooltip, Menu)
   - Implement community-specific components (Timeline, StatusBadge, CommentThread, MetricCard)

3. **Phase 3: Advanced Features & Integration** (May-June 2025)
   - Implement visual testing
   - Add accessibility testing
   - Add performance monitoring
   - Create component playground
   - Implement community-specific organism components (ActivityCard, MilestoneTracker, DependencyGraph, CommentSection)
   - Create integration examples

4. **Phase 4: Application Refactoring & Optimization** (June-July 2025)
   - Create migration strategy
   - Refactor application components
   - Optimize performance
   - Enhance accessibility
   - Validate and test

For detailed progress tracking and task assignments, refer to the [Implementation Plan](./implementation-plan.md).

## Integration Strategy

To ensure smooth integration of the UI library into the application, we recommend the following approach:

1. **Start with Atomic Components**: Begin by replacing basic HTML elements with atomic components like Box, Text, and Button.

2. **Move to Molecular Components**: Replace simple component combinations with molecular components like Card, Tabs, and Modal.

3. **Implement Organism Components**: Replace complex component combinations with organism components like Form, ActivityCard, and CommentSection.

4. **Refactor Page by Page**: Start with simpler pages and move to more complex ones.

5. **Use Codemods for Bulk Changes**: Create codemods to automate repetitive changes.

### Example Integration

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

## Component Development Workflow

When developing new components:

1. Determine the appropriate level (atom, molecule, organism)
2. Create the component directory with the standard file structure:
   ```
   ComponentName/
   ├── ComponentName.js
   ├── ComponentName.css
   ├── ComponentName.test.js
   ├── index.js
   ```
3. Implement the component following the standardized prop patterns
4. Add documentation and examples
5. Add tests
6. Export the component in the appropriate index.js file

## Best Practices

- Use design tokens for all visual properties
- Follow the standardized prop patterns
- Make components responsive using the responsive props system
- Make components polymorphic where appropriate
- Write comprehensive tests
- Document all components and props
