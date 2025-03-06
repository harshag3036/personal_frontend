# Utilities Guide

This guide provides detailed documentation for the utilities in the UI library. Utilities are helper functions and tools that make it easier to work with the UI library.

## Table of Contents

1. [Introduction](#introduction)
2. [Component Extension](#component-extension)
3. [CSS Variables](#css-variables)
4. [Responsive Props](#responsive-props)
5. [Polymorphic Components](#polymorphic-components)
6. [Toast Service](#toast-service)
7. [Best Practices](#best-practices)

## Introduction

The UI library provides several utilities to help you build components and applications. These utilities are designed to be:

- **Reusable**: They can be used across multiple components
- **Composable**: They can be combined with other utilities
- **Flexible**: They can be customized to meet different needs
- **Consistent**: They follow a consistent API and design
- **Extensible**: They can be extended with new functionality

## Component Extension

The component extension utility allows you to extend components with variants and extensions.

### Registering Component Variants

You can register custom variants for components:

```jsx
import { componentExtension } from '../ui';

// Register a component variant
componentExtension.registerComponentVariant('Button', 'CUSTOM', {
  backgroundColor: 'purple',
  color: 'white',
});

// Use the variant
function MyComponent() {
  return (
    <Button variant="CUSTOM">
      Custom Button
    </Button>
  );
}
```

### Registering Component Extensions

You can register extensions that add functionality to components:

```jsx
import { componentExtension } from '../ui';

// Register a component extension
componentExtension.registerComponentExtension('Button', 'tooltip', (props) => ({
  ...props,
  onMouseEnter: (e) => {
    // Show tooltip
    props.onMouseEnter?.(e);
  },
  onMouseLeave: (e) => {
    // Hide tooltip
    props.onMouseLeave?.(e);
  },
}));

// Use the extension
function MyComponent() {
  return (
    <Button 
      extensions={['tooltip']}
      data-tooltip="This is a tooltip"
    >
      Button with Tooltip
    </Button>
  );
}
```

### Applying Multiple Extensions

You can apply multiple extensions to a component:

```jsx
function MyComponent() {
  return (
    <Button 
      extensions={['tooltip', 'analytics']}
      data-tooltip="This is a tooltip"
      data-analytics-event="button-click"
    >
      Button with Multiple Extensions
    </Button>
  );
}
```

### Creating Extensible Components

You can create components that support extensions:

```jsx
import { componentExtension } from '../ui';

function Button({ extensions = [], ...props }) {
  // Apply extensions
  const extendedProps = componentExtension.applyExtensions('Button', extensions, props);
  
  return (
    <button {...extendedProps} />
  );
}
```

## CSS Variables

The CSS variables utility provides functions for working with CSS variables.

### Flattening Objects into CSS Variables

You can flatten an object into CSS variables:

```jsx
import { cssVariables } from '../ui';

// Flatten an object into CSS variables
const tokens = {
  colors: {
    primary: '#144272',
    secondary: '#2E8B57',
  },
};

const flatTokens = cssVariables.flattenObject(tokens, 'colors');
// Result: { 'colors-primary': '#144272', 'colors-secondary': '#2E8B57' }
```

### Converting Strings to Kebab Case

You can convert a string to kebab case:

```jsx
import { cssVariables } from '../ui';

// Convert a string to kebab case
const kebabCase = cssVariables.toKebabCase('colorPrimary');
// Result: 'color-primary'
```

### Generating CSS Variable Declarations

You can generate CSS variable declarations:

```jsx
import { cssVariables } from '../ui';

// Generate CSS variable declarations
const tokens = {
  colors: {
    primary: '#144272',
    secondary: '#2E8B57',
  },
};

const cssVariableDeclarations = cssVariables.generateCssVariables(tokens);
// Result: '--colors-primary: #144272; --colors-secondary: #2E8B57;'
```

### Applying CSS Variables to an Element

You can apply CSS variables to an element:

```jsx
import { cssVariables } from '../ui';

// Apply CSS variables to an element
const tokens = {
  colors: {
    primary: '#144272',
    secondary: '#2E8B57',
  },
};

const element = document.querySelector('.my-element');
cssVariables.applyCssVariables(element, tokens);
// Result: element.style.setProperty('--colors-primary', '#144272'); element.style.setProperty('--colors-secondary', '#2E8B57');
```

### Creating CSS Variables from Theme

You can create CSS variables from a theme:

```jsx
import { cssVariables, lightTheme } from '../ui';

// Create CSS variables from a theme
const cssVars = cssVariables.createVariablesFromTheme(lightTheme);
// Result: '--colors-primary: #144272; --colors-secondary: #2E8B57; ...'

// Apply CSS variables to the document
document.documentElement.style.cssText = cssVars;
```

## Responsive Props

The responsive props utility allows you to create components that adapt to different screen sizes.

### Breakpoints

The UI library defines the following breakpoints:

```jsx
const breakpoints = {
  base: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
};
```

### Creating Responsive Props

You can create responsive props by using the `responsive` utility:

```jsx
import { responsive } from '../ui';

// Create a responsive prop
const responsiveProp = responsive({
  base: 'column',
  md: 'row',
  lg: 'row',
});

// Use the responsive prop
function MyComponent() {
  return (
    <Flex direction={responsiveProp}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Flex>
  );
}
```

### Using Responsive Props in Components

You can use responsive props in your components:

```jsx
import { responsive } from '../ui';

// Create a component that supports responsive props
function Flex({ direction, ...props }) {
  const dir = responsive(direction);
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: dir,
      }}
      {...props}
    />
  );
}

// Use the component with responsive props
function MyComponent() {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Flex>
  );
}
```

### Creating Responsive Styles

You can create responsive styles by using the `createResponsiveStyles` utility:

```jsx
import { createResponsiveStyles } from '../ui';

// Create responsive styles
const styles = createResponsiveStyles({
  display: 'flex',
  flexDirection: {
    base: 'column',
    md: 'row',
  },
  gap: {
    base: '8px',
    md: '16px',
  },
});

// Use the styles
function MyComponent() {
  return (
    <div style={styles}>
      <div>Item 1</div>
      <div>Item 2</div>
    </div>
  );
}
```

### Creating Responsive CSS Classes

You can create responsive CSS classes by using the `createResponsiveClasses` utility:

```jsx
import { createResponsiveClasses } from '../ui';

// Create responsive CSS classes
const classes = createResponsiveClasses({
  base: 'flex-col',
  md: 'flex-row',
});

// Use the classes
function MyComponent() {
  return (
    <div className={classes}>
      <div>Item 1</div>
      <div>Item 2</div>
    </div>
  );
}
```

## Polymorphic Components

The polymorphic components utility allows you to create components that can be rendered as different HTML elements or other components.

### Creating Polymorphic Components

You can create polymorphic components by using the `polymorphic` utility:

```jsx
import { polymorphic } from '../ui';

// Create a polymorphic component
const Box = polymorphic(({ as: Component = 'div', ...props }) => {
  return <Component {...props} />;
});

// Use the polymorphic component
function MyComponent() {
  return (
    <div>
      <Box>I'm a div</Box>
      <Box as="span">I'm a span</Box>
      <Box as="button" onClick={() => console.log('Clicked')}>
        I'm a button
      </Box>
      <Box as={Link} to="/about">
        I'm a Link component
      </Box>
    </div>
  );
}
```

### Using Polymorphic Components with TypeScript

If you're using TypeScript, you can use the `polymorphic` utility with type safety:

```tsx
import { polymorphic } from '../ui';

// Create a polymorphic component with TypeScript
const Box = polymorphic<'div', { color?: string }>(
  ({ as: Component = 'div', color, ...props }) => {
    return <Component style={{ color }} {...props} />;
  }
);

// Use the polymorphic component
function MyComponent() {
  return (
    <div>
      <Box color="red">I'm a red div</Box>
      <Box as="span" color="blue">I'm a blue span</Box>
      <Box as="button" color="green" onClick={() => console.log('Clicked')}>
        I'm a green button
      </Box>
    </div>
  );
}
```

### Creating Polymorphic Components with Styles

You can create polymorphic components with styles:

```jsx
import { polymorphic } from '../ui';

// Create a polymorphic component with styles
const Box = polymorphic(({ as: Component = 'div', className, style, ...props }) => {
  return (
    <Component
      className={`box ${className || ''}`}
      style={{
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        ...style,
      }}
      {...props}
    />
  );
});

// Use the polymorphic component
function MyComponent() {
  return (
    <div>
      <Box>I'm a div with styles</Box>
      <Box as="article" style={{ backgroundColor: '#f5f5f5' }}>
        I'm an article with custom styles
      </Box>
    </div>
  );
}
```

### Creating Polymorphic Components with Variants

You can create polymorphic components with variants:

```jsx
import { polymorphic } from '../ui';

// Create a polymorphic component with variants
const Box = polymorphic(({ as: Component = 'div', variant = 'default', ...props }) => {
  const variantStyles = {
    default: {
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    outlined: {
      padding: '16px',
      border: '2px solid #333',
      borderRadius: '4px',
    },
    filled: {
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
    },
  };
  
  return (
    <Component
      style={variantStyles[variant]}
      {...props}
    />
  );
});

// Use the polymorphic component
function MyComponent() {
  return (
    <div>
      <Box>Default Box</Box>
      <Box variant="outlined">Outlined Box</Box>
      <Box variant="filled">Filled Box</Box>
    </div>
  );
}
```

## Toast Service

The Toast service and hook provide utilities for showing toast notifications.

### Using the Toast Service Directly

You can use the toastService directly, which is useful for showing toasts from non-React code:

```jsx
import { toastService } from '../ui';

// Show a success toast
toastService.success('Operation completed successfully!');

// Show an error toast
toastService.error('An error occurred. Please try again.');

// Show a warning toast
toastService.warning('This action cannot be undone.');

// Show an info toast
toastService.info('New updates are available.');

// Show a toast with custom options
toastService.show({
  content: 'Custom toast with options',
  variant: 'success',
  position: 'top-center',
  duration: 5000, // 5 seconds
  icon: '✅',
  showCloseButton: true,
  onClose: () => console.log('Toast closed'),
});

// Clear all toasts
toastService.clear();
```

### Using the useToast Hook

You can use the `useToast` hook to show toasts in your components:

```jsx
import { useToast } from '../ui';
import { Button } from '../ui';

function MyComponent() {
  const { success, error, warning, info, clear } = useToast();
  
  const handleSuccess = () => {
    success('Operation completed successfully!');
  };
  
  const handleError = () => {
    error('An error occurred. Please try again.');
  };
  
  const handleWarning = () => {
    warning('This action cannot be undone.');
  };
  
  const handleInfo = () => {
    info('New updates are available.');
  };
  
  return (
    <div>
      <Button onClick={handleSuccess}>Show Success Toast</Button>
      <Button onClick={handleError}>Show Error Toast</Button>
      <Button onClick={handleWarning}>Show Warning Toast</Button>
      <Button onClick={handleInfo}>Show Info Toast</Button>
      <Button onClick={clear}>Clear All Toasts</Button>
    </div>
  );
}
```

### Setting Up the Toast Provider

To use the toast service and hook, you need to wrap your application with the `ToastProvider` component:

```jsx
import { ToastProvider } from '../ui';

function App() {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      <YourApp />
    </ToastProvider>
  );
}
```

### Toast Options

The toast service and hook support the following options:

- `content`: The content of the toast
- `variant`: The variant of the toast (`success`, `error`, `warning`, `info`, `default`)
- `position`: The position of the toast (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`)
- `duration`: The duration of the toast in milliseconds
- `icon`: The icon to display in the toast
- `showCloseButton`: Whether to show the close button
- `onClose`: Callback when the toast is closed

## Best Practices

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

### Use Polymorphic Components

Use polymorphic components to create flexible components:

```jsx
// Good: Polymorphic component
<Box as="section">
  <Box as="h2">Heading</Box>
  <Box as="p">Paragraph</Box>
</Box>

// Avoid: Fixed component
<div>
  <h2>Heading</h2>
  <p>Paragraph</p>
</div>
```

### Use the Component Extension System

Use the component extension system to extend components with new functionality:

```jsx
// Good: Using the component extension system
componentExtension.registerComponentExtension('Button', 'tooltip', (props) => ({
  ...props,
  onMouseEnter: (e) => {
    // Show tooltip
    props.onMouseEnter?.(e);
  },
  onMouseLeave: (e) => {
    // Hide tooltip
    props.onMouseLeave?.(e);
  },
}));

// Avoid: Creating a new component
function ButtonWithTooltip({ tooltip, ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div>
      <Button
        {...props}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && <Tooltip>{tooltip}</Tooltip>}
    </div>
  );
}
```

### Use CSS Variables

Use CSS variables for theming:

```jsx
// Good: Using CSS variables
.button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
}

// Avoid: Hard-coded values
.button {
  background-color: #144272;
  color: white;
}
```

### Use the Toast Service

Use the toast service for notifications:

```jsx
// Good: Using the toast service
import { toastService } from '../ui';

function handleSave() {
  try {
    // Save data
    toastService.success('Data saved successfully!');
  } catch (error) {
    toastService.error('Failed to save data. Please try again.');
  }
}

// Avoid: Creating a custom notification
function handleSave() {
  try {
    // Save data
    setNotification({ type: 'success', message: 'Data saved successfully!' });
  } catch (error) {
    setNotification({ type: 'error', message: 'Failed to save data. Please try again.' });
  }
}
