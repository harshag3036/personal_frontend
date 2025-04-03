# Component API Guide

This guide provides detailed documentation on the component APIs in the UI library. It covers standardized prop patterns, responsive props, component composition, and more.

## Standardized Prop Patterns

All components in the UI library follow a consistent prop pattern to ensure a predictable and intuitive API. Here are the common props that are supported across components:

### Appearance Props

```jsx
// Appearance props
variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'text']),
size: PropTypes.oneOf(['small', 'medium', 'large']),
color: PropTypes.string,
backgroundColor: PropTypes.string,
```

### Layout Props

```jsx
// Layout props
margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
padding: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
```

### Behavior Props

```jsx
// Behavior props
disabled: PropTypes.bool,
loading: PropTypes.bool,
required: PropTypes.bool,
readOnly: PropTypes.bool,
```

### Styling Props

```jsx
// Styling props
className: PropTypes.string,
style: PropTypes.object,
```

### Extension Props

```jsx
// Extension props
extensions: PropTypes.arrayOf(PropTypes.string),
```

### Accessibility Props

```jsx
// Accessibility props
ariaLabel: PropTypes.string,
ariaDescribedBy: PropTypes.string,
ariaLabelledBy: PropTypes.string,
ariaHidden: PropTypes.bool,
role: PropTypes.string,
tabIndex: PropTypes.number,
```

## Responsive Props System

The UI library supports responsive props that allow you to specify different values for different screen sizes. This is implemented using a responsive props utility that maps breakpoint keys to CSS media queries.

### Breakpoints

The UI library defines the following breakpoints:

```jsx
// Breakpoints
const breakpoints = {
  xs: '0px',     // Extra small devices (portrait phones)
  sm: '576px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '992px',   // Large devices (desktops)
  xl: '1200px',  // Extra large devices (large desktops)
  xxl: '1400px', // Extra extra large devices
};
```

### Using Responsive Props

You can use responsive props by passing an object with breakpoint keys:

```jsx
// Using responsive props
<Box
  width={{ base: '100%', md: '50%', lg: '33.33%' }}
  padding={{ base: 'sm', md: 'md', lg: 'lg' }}
  display={{ base: 'block', md: 'flex' }}
>
  Content
</Box>
```

This will generate CSS that applies different values at different screen sizes:

```css
/* Generated CSS */
.box {
  width: 100%;
  padding: var(--spacing-sm);
  display: block;
}

@media (min-width: 768px) {
  .box {
    width: 50%;
    padding: var(--spacing-md);
    display: flex;
  }
}

@media (min-width: 992px) {
  .box {
    width: 33.33%;
    padding: var(--spacing-lg);
  }
}
```

### Responsive Variants

Components that support variants (like Button, Badge, etc.) also support responsive variants:

```jsx
// Using responsive variants
<Button
  variant={{ base: 'primary', md: 'outline' }}
  size={{ base: 'small', md: 'medium', lg: 'large' }}
>
  Click Me
</Button>
```

## Polymorphic Components

Polymorphic components can be rendered as different HTML elements using the `as` prop. This is useful for maintaining semantic HTML while reusing component styles and behavior.

### Using the `as` Prop

```jsx
// Using the as prop
<Box as="section" className="custom-section">
  Section content
</Box>

<Text as="h1" variant="h1">Heading 1</Text>
<Text as="h2" variant="h2">Heading 2</Text>
<Text as="p" variant="body1">Paragraph</Text>

<Button as="a" href="https://example.com" target="_blank">
  Link Button
</Button>
```

### Type Safety for Polymorphic Components

The `as` prop is typed to ensure that only valid HTML elements can be used:

```jsx
// Type definition for the as prop
as: PropTypes.elementType, // Can be 'div', 'span', 'section', 'a', etc.
```

## Component Composition Patterns

The UI library supports several component composition patterns to make it easy to build complex UIs.

### Compound Components

Compound components are components that work together to provide a cohesive API. For example, the `Form` component has several sub-components:

```jsx
// Using compound components
<Form onSubmit={handleSubmit}>
  <Form.Group>
    <Form.Label htmlFor="name">Name</Form.Label>
    <Form.Control
      id="name"
      name="name"
      value={values.name}
      onChange={handleChange}
    />
    <Form.Feedback type="invalid">
      Please enter your name
    </Form.Feedback>
  </Form.Group>
  
  <Form.Group>
    <Form.Label htmlFor="email">Email</Form.Label>
    <Form.Control
      id="email"
      name="email"
      type="email"
      value={values.email}
      onChange={handleChange}
    />
  </Form.Group>
  
  <Form.Submit>Submit</Form.Submit>
</Form>
```

### Render Props

Render props is a powerful pattern where a component accepts a function as its `children` prop. This function receives state and handlers from the parent component and returns React elements. This enables flexible and customized rendering while maintaining centralized state management.

#### Render Props Implementation Status

**Last Updated: April 3, 2025**

All UI library components have been successfully implemented with the render props pattern. This implementation allows for powerful customization while maintaining consistent state management.

##### Implemented Components

**Organisms (15/15 Complete)**
- Form - Exposes form state and validation
- DataTable - Provides sorting, filtering, and selection state
- Calendar - Exposes date navigation and event handling
- Wizard - Provides step navigation and state management
- DependencyGraph - Exposes node interaction and visualization customization
- Sidebar - Provides collapsing/expanding state
- UserProfile - Exposes edit mode state and user data
- Dashboard - Provides layout editing and widget management
- Navigation - Exposes route management and responsive behaviors
- MilestoneTracker - Exposes progress tracking and milestone selection
- Layout - Exposes responsive behavior and theme support
- ActivityCard - Provides expandable card functionality
- NotificationCenter - Provides notification filtering and grouping
- ActivityFilter - Exposes filtering state and options
- CommentSection - Provides comment state, sorting, and interaction

**Molecules (24/24 Complete)**
- Accordion - Exposes expanded/collapsed state and toggleItem functionality
- Tabs - Exposes active tab state and tab switching functionality
- Dropdown - Exposes open/closed state, custom trigger and menu rendering
- Menu - Exposes nested menu structure and active item state
- Modal - Exposes open/closed state and multi-step flows
- Pagination - Exposes page state and navigation logic
- Select - Exposes selection state and option management
- DatePicker - Exposes date selection state and calendar navigation
- FileUploader - Exposes upload state, progress, and file management
- CommentThread - Exposes thread state and reply structure
- TimePicker - Exposes time selection state and time selector navigation
- Toast - Exposes visibility state and auto-dismiss timers
- Tooltip/Popover - Exposes tooltip visibility and position data
- Stepper - Exposes step data and active step tracking
- Rating - Exposes rating value and hover state
- SearchInput - Exposes input value and focus state
- MetricCard - Exposes metric data and trend information
- StatusBadge - Exposes status data and configuration properties

For each component, comprehensive example implementations are available in the `examples` directory, demonstrating various customization options and use cases.

#### Implementation in Form Component

The Form component uses render props to expose its internal state and handlers:

```jsx
// Using render props with Form
<Form onSubmit={handleSubmit}>
  {({ formState, setFieldValue, setFieldError, resetForm }) => {
    const { values, errors, isSubmitting, touched } = formState;
    
    return (
      <>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={values.email || ''}
            onChange={(e) => setFieldValue('email', e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type="button" onClick={resetForm}>Reset</button>
      </>
    );
  }}
</Form>
```

#### Implementation in DataTable Component

The DataTable component exposes its rich state and handlers through render props:

```jsx
// Using render props with DataTable
<DataTable
  columns={columns}
  data={data}
  selectionType="multiple"
  searchable={true}
>
  {({
    displayedData,
    selectedRows,
    searchTerm,
    handleSort,
    handleSelectRow,
    handleSearch,
    renderCellContent
  }) => (
    <div>
      {/* Custom search implementation */}
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      
      {/* Custom table with all data and controls accessible */}
      <table className="custom-table">
        {/* ... table implementation using context values ... */}
      </table>
      
      {/* Custom statistics or visualization based on the data */}
      <div className="data-stats">
        Selected: {selectedRows.length} of {displayedData.length} items
      </div>
    </div>
  )}
</DataTable>
```

#### Implementation in MetricCard Component

The MetricCard component provides a flexible way to display metrics with trend information:

```jsx
<MetricCard
  value="85.2%"
  label="Conversion Rate"
  trend={{
    value: "+2.4%",
    direction: "up",
    label: "vs last month"
  }}
>
  {(metricState) => {
    const { value, label, trend, variant, interactive, handleClick } = metricState;
    
    return (
      <Box 
        p={4} 
        borderRadius="lg" 
        boxShadow="md" 
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        onClick={interactive ? handleClick : undefined}
        cursor={interactive ? "pointer" : "default"}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">{value}</Text>
          <Icon name="chart-line" color="green.500" />
        </Flex>
        <Text color="gray.600">{label}</Text>
        {trend && (
          <Flex alignItems="center" mt={2}>
            <Icon 
              name={trend.direction === 'up' ? 'trending-up' : 'trending-down'} 
              color={trend.direction === 'up' ? 'green.500' : 'red.500'} 
            />
            <Text 
              ml={1} 
              color={trend.direction === 'up' ? 'green.500' : 'red.500'}
              fontWeight="medium"
            >
              {trend.value}
            </Text>
            <Text ml={1} fontSize="sm" color="gray.500">
              {trend.label}
            </Text>
          </Flex>
        )}
      </Box>
    );
  }}
</MetricCard>
```

#### When to Use Render Props

Render props pattern is particularly valuable when:

1. The component has complex internal state that should be exposed to customization
2. You need complete control over rendering while leveraging a component's logic
3. Creating specialized layouts that aren't possible with the standard component API
4. Building data visualizations that need access to the component's processed data
5. Implementing cross-component communication where one component needs to affect another

### Component Slots

Component slots allow you to pass content to specific areas of a component:

```jsx
// Using component slots
<Card
  header={<Text variant="h2">Card Title</Text>}
  footer={<Text variant="body2">Card Footer</Text>}
  media={<img src="image.jpg" alt="Card media" />}
  actions={
    <>
      <Button variant="primary">Save</Button>
      <Button variant="outline">Cancel</Button>
    </>
  }
>
  Card content goes here
</Card>
```

## Using Design Tokens

The UI library includes a comprehensive set of design tokens that should be used for styling components. This ensures consistency across the application.

### Color Tokens

```jsx
// Using color tokens
import { colors } from '../ui';

<div style={{ color: colors.text.primary }}>
  Primary text
</div>

<div style={{ backgroundColor: colors.background.secondary }}>
  Secondary background
</div>
```

### Typography Tokens

```jsx
// Using typography tokens
import { typography } from '../ui';

<div style={{ 
  fontFamily: typography.fontFamilies.primary,
  fontSize: typography.fontSizes.md,
  fontWeight: typography.fontWeights.bold,
  lineHeight: typography.lineHeights.normal,
}}>
  Text content
</div>
```

### Spacing Tokens

```jsx
// Using spacing tokens
import { spacing } from '../ui';

<div style={{ 
  padding: spacing.md,
  margin: spacing.lg,
}}>
  Content with spacing
</div>
```

## Best Practices

### Use Composition Over Configuration

Prefer composing components together rather than creating complex configuration options:

```jsx
// Good: Using composition
<Card>
  <Card.Header>
    <Text variant="h2">Card Title</Text>
  </Card.Header>
  <Card.Body>
    <Text variant="body1">Card content</Text>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Save</Button>
  </Card.Footer>
</Card>

// Avoid: Complex configuration
<Card
  title="Card Title"
  content="Card content"
  buttons={[
    { text: 'Save', variant: 'primary', onClick: handleSave },
  ]}
/>
```

### Use Design Tokens

Always use design tokens for styling rather than hard-coded values:

```jsx
// Good: Using design tokens
<Box padding={spacing.md} backgroundColor={colors.background.primary}>
  Content
</Box>

// Avoid: Hard-coded values
<Box padding="16px" backgroundColor="#f5f5f5">
  Content
</Box>
```

### Follow Accessibility Guidelines

Ensure that all components are accessible:

```jsx
// Good: Accessible button
<Button
  onClick={handleClick}
  ariaLabel="Close dialog"
  disabled={isDisabled}
>
  Close
</Button>

// Avoid: Inaccessible button
<div onClick={handleClick} className="button">
  Close
</div>
```

### Use Responsive Props

Use responsive props to create responsive UIs:

```jsx
// Good: Responsive layout
<Grid
  columns={{ base: 1, md: 2, lg: 3 }}
  gap={{ base: 'sm', md: 'md' }}
>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// Avoid: Non-responsive layout
<Grid columns={3} gap="md">
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>
```

## Component Reference

For detailed documentation on specific components, see the following guides:

- [Atoms](./atoms.md): Documentation for atomic components
- [Molecules](./molecules.md): Documentation for molecular components
- [Organisms](./organisms.md): Documentation for organism components
