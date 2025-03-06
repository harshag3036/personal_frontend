# UI Component Library

This directory contains a comprehensive UI component library built on atomic design principles. The library provides a set of reusable, composable components that can be used to build consistent user interfaces across the application.

## Structure

The library is organized according to atomic design principles:

```
src/ui/
├── atoms/         # Basic building blocks
│   ├── Box/       # Basic container component
│   ├── Flex/      # Flexbox layout component
│   ├── Grid/      # CSS Grid layout component
│   ├── Text/      # Typography component
│   ├── Stack/     # Vertical/horizontal stack component
│   ├── Divider/   # Visual separator component
│   ├── Button/    # Button component
│   ├── Badge/     # Badge component
│   ├── Input/     # Input component
│   └── ...
├── molecules/     # Combinations of atoms
│   ├── Card/      # Card component
│   ├── Checkbox/  # Checkbox component
│   ├── Select/    # Select component
│   ├── Textarea/  # Textarea component
│   ├── Toast/     # Toast component
│   └── ...
├── organisms/     # Complex components
│   ├── Form/      # Form component
│   └── ...
├── tokens/        # Design tokens
│   ├── colors.js  # Color tokens
│   ├── typography.js # Typography tokens
│   ├── spacing.js # Spacing tokens
│   ├── shadows.js # Shadow tokens
│   ├── borders.js # Border tokens
│   ├── animations.js # Animation tokens
│   ├── breakpoints.js # Breakpoint tokens
│   └── index.js   # Token exports
├── themes/        # Theme definitions
│   ├── light.js   # Light theme
│   ├── dark.js    # Dark theme
│   ├── ThemeProvider.js # Theme provider component
│   └── index.js   # Theme exports
├── utilities/     # Utility functions
│   ├── css-variables.js # CSS variable utilities
│   ├── component-extension.js # Component extension utilities
│   ├── ToastService.js # Toast service
│   ├── useToast.js # Toast hook
│   └── index.js   # Utility exports
├── templates/     # Page layouts (future)
├── examples/      # Example usage of components
├── docs/          # Documentation
└── index.js       # Main export file
```

## Available Components

### Atoms

Atoms are the basic building blocks of the UI:

- **Box**: A basic layout container with spacing and styling props
- **Flex**: A flexbox container with alignment props
- **Grid**: A CSS Grid container with responsive props
- **Text**: A typography component with variants for different text styles
- **Stack**: A component for stacking elements with consistent spacing
- **Divider**: A component for visually separating content
- **Button**: A button component with variants and sizes
- **Badge**: A badge component for displaying status, counts, or labels
- **Input**: An input component for forms

### Molecules

Molecules are combinations of atoms:

- **Card**: A container component with optional header, body, and footer sections
- **Checkbox**: A checkbox input component with label and customizable styling
- **Select**: A dropdown select component with options and customizable styling
- **Textarea**: A multiline text input component with customizable styling
- **Toast**: A notification component for displaying temporary messages

### Organisms

Organisms are complex components:

- **Form**: A form component that handles form state, validation, and submission

## Usage

Import components from the UI library:

```jsx
import { 
  // Components
  Box, Flex, Grid, Text, Stack, Divider, Button, Badge, Input, Card, Form,
  Checkbox, Select, Textarea, Toast,
  
  // Tokens
  colors, typography, spacing, shadows, borders, animations, breakpoints,
  
  // Themes
  ThemeProvider, useTheme, lightTheme, darkTheme,
  
  // Utilities
  cssVariables, componentExtension, toastService, useToast
} from '../ui';

// Use the components
const MyComponent = () => (
  <Box padding="md" background="background-surface">
    <Text variant="h1">My Component</Text>
    
    <Card>
      <Card.Header>
        <Text variant="h2">Card Title</Text>
        <Badge variant="primary">New</Badge>
      </Card.Header>
      
      <Card.Body>
        <Form onSubmit={handleSubmit} initialValues={{ name: '', agree: false }}>
          {({ values, handleChange, handleSubmit }) => (
            <>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              
              <Select
                name="country"
                value={values.country}
                onChange={handleChange}
                placeholder="Select your country"
              >
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </Select>
              
              <Textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Enter your message"
              />
              
              <Checkbox
                name="agree"
                checked={values.agree}
                onChange={handleChange}
                label="I agree to the terms and conditions"
              />
              
              <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  </Box>
);

// Use the theme system
const ThemedApp = () => (
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>
);

// Use the toast system
const ComponentWithToast = () => {
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

## Migration Strategy

The UI component library is being developed as a replacement for the existing design-system components. The migration strategy involves:

1. Moving design tokens, themes, and utilities from design-system to ui
2. Creating adapter components that use the design-system components internally
3. Gradually replacing design-system component usage with UI component usage
4. Eventually deprecating the design-system components

Current migration status:
- ✅ Design tokens moved from design-system/tokens to ui/tokens
- ✅ Theme system moved from design-system/themes to ui/themes
- ✅ Utilities moved from design-system/utilities to ui/utilities
- ✅ Checkbox component moved from design-system/components to ui/molecules
- ✅ Select component moved from design-system/components to ui/molecules
- ✅ Textarea component moved from design-system/components to ui/molecules
- ✅ Toast component moved from design-system/components to ui/molecules
- ⏳ Other components still in progress

See the [Migration Guide](./docs/migration-guide.md) for more details.

## Examples

See the examples directory for examples of how to use the UI components:

```jsx
import { Examples } from '../ui';

const App = () => (
  <div>
    <h1>Examples</h1>
    <Examples.BasicLayout />
  </div>
);
```

## Design Principles

The UI component library follows these design principles:

1. **Composability**: Components can be easily composed together to create complex UIs
2. **Consistency**: Components use design tokens for consistent styling
3. **Flexibility**: Components accept props for customization
4. **Accessibility**: Components are designed with accessibility in mind
5. **Performance**: Components are optimized for performance

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

1. Completing the migration of all design-system components
2. Implementing more molecules (FormField, DataDisplay, etc.)
3. Implementing more organisms (DataTable, Modal, etc.)
4. Implementing templates (Dashboard, Settings, etc.)
5. Adding a component playground for testing and documentation
6. Implementing visual regression testing
7. Adding more documentation and examples
