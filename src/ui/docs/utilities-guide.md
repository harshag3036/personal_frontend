# Design System Utilities Guide

This guide provides instructions on how to use the design system utilities in your application.

## Table of Contents

1. [Introduction](#introduction)
2. [Component Extension](#component-extension)
3. [Toast Service and Hook](#toast-service-and-hook)
4. [CSS Variables](#css-variables)
5. [Best Practices](#best-practices)

## Introduction

The design system provides utilities for common tasks such as extending components, displaying toast notifications, and working with CSS variables. These utilities help you build consistent and maintainable user interfaces.

## Component Extension

The component extension utility allows you to extend components with variants and extensions.

### Registering Component Variants

You can register custom variants for components:

```jsx
import { componentExtension } from './design-system/utilities';

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
import { componentExtension } from './design-system/utilities';

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

## Toast Service and Hook

The Toast service and hook provide utilities for showing toast notifications.

### Using the Toast Service Directly

You can use the toastService directly, which is useful for showing toasts from non-React code:

```jsx
import { toastService } from './design-system/utilities';

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
import { useToast } from './design-system/utilities';
import { Button } from './design-system/components';

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

### Toast Variants and Positions

The Toast component supports different variants and positions:

```jsx
import { TOAST_VARIANTS, TOAST_POSITIONS } from './design-system/components';

// Toast variants
TOAST_VARIANTS.DEFAULT
TOAST_VARIANTS.SUCCESS
TOAST_VARIANTS.ERROR
TOAST_VARIANTS.WARNING
TOAST_VARIANTS.INFO

// Toast positions
TOAST_POSITIONS.TOP_LEFT
TOAST_POSITIONS.TOP_CENTER
TOAST_POSITIONS.TOP_RIGHT
TOAST_POSITIONS.BOTTOM_LEFT
TOAST_POSITIONS.BOTTOM_CENTER
TOAST_POSITIONS.BOTTOM_RIGHT
```

## CSS Variables

The CSS variables utility provides functions for working with CSS variables.

### Flattening Objects into CSS Variables

You can flatten an object into CSS variables:

```jsx
import { cssVariables } from './design-system/utilities';

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
import { cssVariables } from './design-system/utilities';

// Convert a string to kebab case
const kebabCase = cssVariables.toKebabCase('colorPrimary');
// Result: 'color-primary'
```

### Generating CSS Variable Declarations

You can generate CSS variable declarations:

```jsx
import { cssVariables } from './design-system/utilities';

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
import { cssVariables } from './design-system/utilities';

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

## Best Practices

Here are some best practices for using the design system utilities:

1. **Use the component extension system**: Use the component extension system to extend components with variants and extensions instead of creating new components.

2. **Use the toast service and hook**: Use the toast service and hook to show toast notifications instead of creating custom notification components.

3. **Use CSS variables**: Use CSS variables for styling instead of hardcoding values.

4. **Follow naming conventions**: Follow naming conventions for CSS variables, component variants, and extensions.

5. **Document your extensions**: Document your extensions with JSDoc comments.

6. **Test your extensions**: Write tests for your extensions to ensure they work as expected.

7. **Keep it simple**: Keep your extensions simple and focused on a single responsibility.

8. **Use the right tool for the job**: Use the right utility for the job. For example, use the component extension system for extending components, the toast service for showing toast notifications, and CSS variables for styling.

9. **Follow accessibility guidelines**: Ensure your extensions follow accessibility guidelines.

10. **Keep it consistent**: Maintain consistency in your UI by using the same utilities throughout your application.
