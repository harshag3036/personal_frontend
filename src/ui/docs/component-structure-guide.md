# Component Structure Guide

This guide explains the structure of UI components in the design system.

## Component Structure

Each component follows a consistent structure:

```
src/ui/[type]/[ComponentName]/
  ├── [ComponentName].js      # Main component implementation
  ├── [ComponentName].css     # Component styles
  ├── [ComponentName].test.js # Component tests
  ├── [ComponentName].stories.js # Storybook stories
  ├── constants.js            # Component constants
  ├── index.js                # Re-exports
  └── [Other component files] # Additional component files
```

Where:
- `[type]` is one of `atoms`, `molecules`, or `organisms`
- `[ComponentName]` is the name of the component (e.g., `Button`, `Select`, `Form`)

## Component Files

### Main Component File (`[ComponentName].js`)

The main component file contains the implementation of the component. It imports constants from `constants.js` and exports the component as the default export.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { 
  COMPONENT_VARIANTS, 
  COMPONENT_SIZES 
} from './constants';
import './[ComponentName].css';

const ComponentName = ({ variant, size, ...props }) => {
  // Component implementation
};

ComponentName.propTypes = {
  // PropTypes
};

export default ComponentName;
```

### Constants File (`constants.js`)

The constants file contains all constants used by the component. This includes CSS class names, variants, sizes, states, modifiers, etc.

```js
/**
 * ComponentName Component Constants
 * 
 * This file contains constants used by the ComponentName component.
 */

// Export component variants
export const COMPONENT_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

// Export component sizes
export const COMPONENT_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};
```

### Index File (`index.js`)

The index file re-exports the component as the default export and re-exports constants from `constants.js`.

```js
/**
 * ComponentName Component
 * 
 * A customizable component with support for variants, responsive props, and polymorphic rendering.
 */

export { default } from './[ComponentName]';

// Re-export constants from constants.js
export {
  COMPONENT_VARIANTS,
  COMPONENT_SIZES
} from './constants';
```

## Component Types

The design system is organized into three types of components:

### Atoms

Atoms are the basic building blocks of the UI. They are the smallest components that can't be broken down further. Examples include `Button`, `Input`, `Text`, etc.

### Molecules

Molecules are combinations of atoms that work together as a unit. Examples include `Select`, `Textarea`, `Card`, etc.

### Organisms

Organisms are complex UI components composed of groups of molecules and/or atoms. Examples include `Form`, `Table`, `Modal`, etc.

## Best Practices

1. **Keep constants in a separate file**: All constants should be defined in `constants.js` and imported where needed.
2. **Use re-exports in index.js**: The index.js file should re-export the component and its constants.
3. **Follow naming conventions**: Use consistent naming for component files, constants, and CSS classes.
4. **Document components**: Add JSDoc comments to components and their props.
5. **Write tests**: Each component should have tests to ensure it works as expected.
6. **Create stories**: Each component should have Storybook stories to showcase its usage.

## Benefits of This Structure

1. **Consistency**: All components follow the same structure, making it easier to understand and maintain.
2. **Modularity**: Each component is self-contained, with its own files and dependencies.
3. **Reusability**: Constants are defined once and reused across the component and its tests/stories.
4. **Maintainability**: Changes to constants only need to be made in one place.
5. **Discoverability**: The structure makes it easy to find and understand components.
