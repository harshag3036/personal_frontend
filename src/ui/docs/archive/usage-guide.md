# Design System Usage Guide

This guide provides instructions on how to use the design system components in your application.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Additional Documentation](#additional-documentation)
4. [Component Overview](#component-overview)
5. [Best Practices](#best-practices)

## Introduction

The design system provides a set of reusable components that help create consistent and maintainable user interfaces. It is built with React and follows modern best practices for component design.

Key features:
- Theme support with light and dark modes
- Customizable components with variants and extensions
- Design tokens for consistent styling
- Utilities for common tasks

## Getting Started

To use the design system in your application, you need to:

1. Import the design tokens CSS file
2. Wrap your application with the ThemeProvider
3. Import and use the components

```jsx
// In your index.js or App.js
import { ThemeProvider } from './design-system/themes';
import './styles/design-tokens.css';

function App() {
  return (
    <ThemeProvider initialTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Additional Documentation

For more detailed information on specific aspects of the design system, please refer to the following guides:

- [Basic Components Guide](./basic-components-guide.md) - Documentation for basic components (Button, Card, Badge, Input, Select)
- [Form Components Guide](./components-guide.md) - Documentation for form-related components (Form, Checkbox, Textarea, Toast)
- [Themes Guide](./themes-guide.md) - Detailed information on using and customizing themes
- [Utilities Guide](./utilities-guide.md) - Documentation for all utility functions and hooks

## Component Overview

The design system includes the following components:

### Basic Components
- **Button** - A customizable button with support for variants and extensions
- **Card** - A container for content with support for variants
- **Badge** - A component for displaying small pieces of information
- **Input** - A customizable text input with support for variants, sizes, and states
- **Select** - A customizable dropdown/select component

### Form Components
- **Form** - A compound component for creating forms with consistent styling and behavior
- **Checkbox** - A customizable checkbox with support for variants, sizes, and states
- **Textarea** - A customizable multi-line text input with support for variants, sizes, and states
- **Toast** - A component for displaying temporary notifications to users

For detailed documentation on basic components, please refer to the [Basic Components Guide](./basic-components-guide.md).

For detailed documentation on form-related components, please refer to the [Form Components Guide](./components-guide.md).

## Best Practices

Here are some best practices for using the design system:

1. **Use design tokens**: Always use design tokens for colors, spacing, typography, etc. instead of hardcoding values.

2. **Follow component patterns**: Use the provided components and follow their patterns when creating new components.

3. **Extend, don't modify**: Extend existing components and themes instead of modifying them directly.

4. **Keep it consistent**: Maintain consistency in your UI by using the same components and styles throughout your application.

5. **Document your components**: Document your components with JSDoc comments and PropTypes.

6. **Test your components**: Write tests for your components to ensure they work as expected.

7. **Use the theme context**: Use the theme context to access the current theme and switch between themes.

8. **Use the component extension utility**: Use the component extension utility to extend components with variants and extensions.

9. **Follow accessibility guidelines**: Ensure your components are accessible by following accessibility guidelines.

10. **Keep it simple**: Keep your components simple and focused on a single responsibility.
