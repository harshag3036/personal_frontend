# UI Component Library Integration Guide

This guide provides instructions for integrating the UI component library into your application.

## Getting Started

The UI component library is designed to be easy to integrate into your application. It provides a set of reusable, composable components that can be used to build consistent user interfaces.

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

1. Implementing more molecules (FormField, DataDisplay, etc.)
2. Implementing more organisms (DataTable, Modal, etc.)
3. Implementing templates (Dashboard, Settings, etc.)
4. Adding a component playground for testing and documentation
5. Implementing visual regression testing
6. Adding more documentation and examples
