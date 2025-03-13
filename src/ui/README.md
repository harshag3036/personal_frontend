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
│   ├── responsive-props.js # Responsive props utilities
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

## UI Structure Upgrade Plan

We are implementing a comprehensive upgrade plan to make the UI component library more manageable, modular, simple, and easy to change, add, upgrade, and debug.

### Phase 1: Foundation Strengthening (2-3 weeks)

#### 1. Complete Component Migration
- ✅ Finish migrating remaining components from design-system to ui
- ✅ Update all imports to use the new UI library
- ✅ Remove the design-system directory once migration is complete

#### 2. Standardize Component Structure
- ✅ Implement consistent file structure for all components:
  ```
  ComponentName/
  ├── ComponentName.js     # Main component implementation
  ├── ComponentName.css    # Component styles
  ├── ComponentName.test.js # Component tests
  ├── ComponentName.stories.js # Storybook stories
  ├── constants.js         # Component constants
  └── index.js             # Re-exports component and constants
  ```
- Add proper PropTypes and documentation to all components
- ✅ Create index files for better importing experience

#### 3. Standardize Prop Patterns
- Implement consistent prop patterns across all components
- Ensure similar props work the same way across components
- Add support for common props like margin, padding, etc.

#### 4. Add Testing Infrastructure
- Set up Jest and React Testing Library for component testing
- Add basic tests for all components
- Implement testing utilities for common testing patterns

### Phase 2: Developer Experience Improvements (2-3 weeks)

#### 1. Implement Responsive Props System
- Create a utility for handling responsive props
- Add support for breakpoint-based styling
- Implement responsive variants for all components

#### 2. Enhance Component Composition
- Improve component composition patterns
- Add support for compound components
- Implement render props pattern where appropriate

#### 3. Implement Polymorphic Components
- Add support for rendering components as different HTML elements
- Implement the `as` prop pattern
- Ensure proper type safety for polymorphic components

#### 4. Add Storybook
- Install and configure Storybook
- Create stories for all components
- Add documentation and examples to stories

### Phase 3: Advanced Features (2-3 weeks)

#### 1. Implement Visual Testing
- Set up visual regression testing
- Create baseline snapshots for all components
- Integrate with CI/CD pipeline

#### 2. Add Accessibility Testing
- Implement accessibility testing
- Add accessibility checks to CI/CD pipeline
- Ensure all components meet WCAG standards

#### 3. Add Performance Monitoring
- Implement performance metrics for components
- Add bundle size monitoring
- Create performance benchmarks

#### 4. Create Component Playground
- Develop an interactive component playground
- Add code examples and live editing
- Include documentation and usage guidelines

### Phase 4: Application Refactoring (Ongoing)

#### 1. Create Migration Strategy
- Identify high-impact components to migrate first
- Create a dependency graph to understand migration order
- Develop a phased approach to minimize disruption

#### 2. Refactor Application Components
- Start with shared components used across the application
- Move to feature-specific components
- Update imports and props as needed

#### 3. Validate and Test
- Ensure refactored components work as expected
- Add tests for refactored components
- Monitor performance and accessibility

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

## Documentation

For more detailed information, see the documentation files:

- [Current Status](./docs/current-status.md): Current status of the UI library and next steps
- [Implementation Progress](./docs/implementation-progress.md): Detailed progress tracking of the UI library implementation
- [UI Structure](./docs/UI-structure.md): Overview of the UI component library structure
- [Integration Guide](./docs/integration-guide.md): How to integrate the UI library into your application
- [Component API Guide](./docs/component-api-guide.md): Detailed documentation of component APIs
- [Component Structure Guide](./docs/component-structure-guide.md): Guidelines for component file structure and organization
- [Development Guide](./docs/development-guide.md): Guidelines for developing new components
- [Atoms Guide](./docs/atoms-guide.md): Documentation for atom components
- [Molecules & Organisms Guide](./docs/molecules-organisms-guide.md): Documentation for molecule and organism components
- [Theming Guide](./docs/theming-guide.md): Documentation for theming system
- [Utilities Guide](./docs/utilities-guide.md): Documentation for utility functions
