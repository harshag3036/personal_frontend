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

Render props are a pattern where a component accepts a function as a prop that returns a React element. This is useful for components that need to share state with their children:

```jsx
// Using render props
<Form
  onSubmit={handleSubmit}
  initialValues={{ name: '', email: '' }}
>
  {({ values, handleChange, handleSubmit, errors }) => (
    <>
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors?.name}
      />
      
      <Input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors?.email}
      />
      
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  )}
</Form>
```

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

## Component Extension System

The UI library includes a component extension system that allows you to customize components without modifying their source code. This is useful for creating variants of components that are specific to your application.

### Creating Component Extensions

```jsx
// Creating a component extension
import { componentExtension } from '../ui';

// Create a custom button extension
componentExtension.register('Button', 'danger-button', {
  baseProps: {
    variant: 'danger',
    size: 'large',
  },
  styleOverrides: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
  },
});

// Using the extension
<Button extensions={['danger-button']}>
  Delete
</Button>
```

### Extension Composition

Extensions can be composed together:

```jsx
// Composing extensions
<Button extensions={['danger-button', 'rounded-button', 'shadow-button']}>
  Delete
</Button>
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
