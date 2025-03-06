# Development Guide

This guide provides comprehensive guidelines for developing with the UI library, including component development, best practices, extension patterns, and utilities.

## Table of Contents

1. [Introduction](#introduction)
2. [Component Development](#component-development)
   - [Component Structure](#component-structure)
   - [Development Process](#development-process)
   - [Testing Strategy](#testing-strategy)
   - [Component Design Principles](#component-design-principles)
3. [Utilities](#utilities)
   - [Component Extension](#component-extension)
   - [Toast Service and Hook](#toast-service-and-hook)
   - [CSS Variables](#css-variables)
   - [Responsive Props](#responsive-props)
   - [Polymorphic Components](#polymorphic-components)
4. [Best Practices](#best-practices)
5. [Adding a New Component](#adding-a-new-component)
6. [Resources](#resources)

## Introduction

The UI library is designed to be flexible, extensible, and maintainable. This guide will help you understand how to develop with the library, including creating new components, using utilities, and following best practices.

## Component Development

### Component Structure

All components should follow this file structure:

```
ComponentName/
├── ComponentName.js     # Main component implementation
├── ComponentName.css    # Component styles
├── ComponentName.test.js # Component tests
├── ComponentName.stories.js # Storybook stories
└── index.js             # Export file
```

#### ComponentName.js

The main component file should include:

- JSDoc comments for the component and its props
- PropTypes validation
- Default props
- Error handling
- Accessibility attributes

Example:

```jsx
/**
 * Button Component
 * 
 * A customizable button component with support for variants and sizes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Button.css';

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  OUTLINE: 'outline',
  TEXT: 'text',
};

// Button sizes
export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Button Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant=BUTTON_VARIANTS.PRIMARY] - Button variant
 * @param {string} [props.size=BUTTON_SIZES.MEDIUM] - Button size
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {Function} [props.onClick] - Click handler
 * @returns {JSX.Element} Button component
 */
const Button = ({
  children,
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MEDIUM,
  disabled = false,
  onClick,
  ...props
}) => {
  // Implementation
};

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Button variant */
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  /** Button size */
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
};

export default Button;
```

#### ComponentName.css

CSS files should use CSS variables for theming and follow the BEM naming convention:

```css
/* Base Button Styles */
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  transition: all var(--transition-default);
}

/* Button Variants */
.ds-button-primary {
  background-color: var(--color-brand-500);
  color: white;
}

/* Button Sizes */
.ds-button-small {
  padding: 8px 16px;
  font-size: var(--font-size-sm);
}
```

#### index.js

The index file should export the component and any related constants:

```jsx
export { default } from './Button';
export * from './Button';
```

### Development Process

1. **Plan the component**: Define the component's API, behavior, and appearance
2. **Create the component files**: Follow the file structure above
3. **Implement the component**: Write the component code
4. **Write tests**: Add unit tests for the component
5. **Create stories**: Add Storybook stories for the component
6. **Document the component**: Add JSDoc comments and update documentation
7. **Review and refine**: Review the component for accessibility, performance, and usability

### Testing Strategy

#### Unit Testing

All components should have unit tests using Jest and React Testing Library. Tests should cover:

- Rendering with default props
- Rendering with different prop values
- User interactions (clicks, keyboard events, etc.)
- Error handling
- Accessibility

Example:

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button';

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies variant classes correctly', () => {
    const { container } = render(
      <Button variant={BUTTON_VARIANTS.SECONDARY}>Secondary</Button>
    );
    expect(container.firstChild).toHaveClass('ds-button-secondary');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

#### Accessibility Testing

All components should be tested for accessibility using jest-axe:

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Button aria-label="Close dialog">Close</Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Visual Testing

Components should have visual regression tests using Storybook and Chromatic:

```jsx
// Button.stories.js
import React from 'react';
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: Object.values(BUTTON_VARIANTS) },
      defaultValue: BUTTON_VARIANTS.PRIMARY,
    },
    size: {
      control: { type: 'select', options: Object.values(BUTTON_SIZES) },
      defaultValue: BUTTON_SIZES.MEDIUM,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

// Template
const Template = (args) => <Button {...args}>Button</Button>;

// Stories
export const Primary = Template.bind({});
Primary.args = {
  variant: BUTTON_VARIANTS.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: BUTTON_VARIANTS.SECONDARY,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
```

### Component Design Principles

#### 1. Composability

Components should be composable, meaning they can be combined with other components to create more complex UIs. This is achieved through:

- Accepting children as a prop
- Using the compound component pattern where appropriate
- Supporting composition through slots

#### 2. Flexibility

Components should be flexible, meaning they can be customized to meet different needs. This is achieved through:

- Supporting a wide range of props
- Using the polymorphic component pattern (`as` prop)
- Supporting the component extension system

#### 3. Consistency

Components should be consistent with the rest of the UI library. This is achieved through:

- Following the standardized prop patterns
- Using design tokens for styling
- Following the same naming conventions

#### 4. Accessibility

Components should be accessible to all users, including those with disabilities. This is achieved through:

- Using semantic HTML elements
- Adding appropriate ARIA attributes
- Supporting keyboard navigation
- Ensuring sufficient color contrast
- Providing text alternatives for non-text content

#### 5. Performance

Components should be optimized for performance. This is achieved through:

- Minimizing re-renders
- Using memoization where appropriate
- Optimizing CSS
- Lazy loading where appropriate

## Utilities

The UI library provides several utilities to help you build components and applications.

### Component Extension

The component extension utility allows you to extend components with variants and extensions.

#### Registering Component Variants

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

#### Registering Component Extensions

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

#### Applying Multiple Extensions

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

### Toast Service and Hook

The Toast service and hook provide utilities for showing toast notifications.

#### Using the Toast Service Directly

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

#### Using the useToast Hook

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

### CSS Variables

The CSS variables utility provides functions for working with CSS variables.

#### Flattening Objects into CSS Variables

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

#### Converting Strings to Kebab Case

You can convert a string to kebab case:

```jsx
import { cssVariables } from '../ui';

// Convert a string to kebab case
const kebabCase = cssVariables.toKebabCase('colorPrimary');
// Result: 'color-primary'
```

#### Generating CSS Variable Declarations

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

#### Applying CSS Variables to an Element

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

### Responsive Props

The responsive props utility allows you to create components that adapt to different screen sizes.

#### Creating Responsive Props

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

#### Using Responsive Props in Components

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

### Polymorphic Components

The polymorphic components utility allows you to create components that can be rendered as different HTML elements or other components.

#### Creating Polymorphic Components

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

#### Using Polymorphic Components with TypeScript

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

### Handle Errors Gracefully

Handle errors gracefully to prevent the component from crashing:

```jsx
// Good: Error handling
const handleClick = (event) => {
  if (disabled) return;
  
  if (onClick) {
    try {
      onClick(event);
    } catch (error) {
      console.error('Button: Error in onClick handler:', error);
    }
  }
};

// Avoid: No error handling
const handleClick = (event) => {
  if (disabled) return;
  onClick(event);
};
```

### Use Consistent Naming

Use consistent naming for props, CSS classes, and component names:

```jsx
// Good: Consistent naming
<Button
  variant="primary"
  size="medium"
  disabled={isDisabled}
>
  Click Me
</Button>

// Avoid: Inconsistent naming
<Button
  type="primary"
  buttonSize="medium"
  isDisabled={isDisabled}
>
  Click Me
</Button>
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

## Adding a New Component

### 1. Determine the Component Type

Determine whether the component is an atom, molecule, or organism:

- **Atoms**: Basic building blocks (Button, Input, Text, etc.)
- **Molecules**: Combinations of atoms (Card, Form.Group, etc.)
- **Organisms**: Complex components (Form, DataTable, etc.)

### 2. Create the Component Files

Create the component files following the file structure above:

```
src/ui/[type]/ComponentName/
├── ComponentName.js
├── ComponentName.css
├── ComponentName.test.js
├── ComponentName.stories.js
└── index.js
```

### 3. Implement the Component

Implement the component following the design principles above.

### 4. Add the Component to the Index

Add the component to the appropriate index file:

```jsx
// src/ui/atoms/index.js
export * from './Box';
export * from './Button';
export * from './ComponentName'; // Add the new component
```

### 5. Document the Component

Add JSDoc comments to the component and update the documentation.

### 6. Test the Component

Add unit tests, accessibility tests, and visual tests for the component.

### 7. Create Stories

Add Storybook stories for the component.

## Resources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Chromatic](https://www.chromatic.com/docs/)
- [Accessibility (A11y)](https://www.a11yproject.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
