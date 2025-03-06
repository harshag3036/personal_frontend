# Extending the Design System

This guide explains how to extend the design system with new components, variants, and themes.

## Table of Contents

- [Adding New Design Tokens](#adding-new-design-tokens)
- [Adding Component Variants](#adding-component-variants)
- [Creating Custom Themes](#creating-custom-themes)
- [Creating New Components](#creating-new-components)
- [Best Practices](#best-practices)

## Adding New Design Tokens

When adding new design elements to the application, follow these steps to maintain compatibility:

1. **Identify the token type**: Determine if your new design element is a color, typography, spacing, shadow, or other token type.

2. **Add to the appropriate token file**: 
   - For colors: Add to `src/design-system/tokens/colors.js`
   - For typography: Add to `src/design-system/tokens/typography.js`
   - For spacing: Add to `src/design-system/tokens/spacing.js`
   - For shadows: Add to `src/design-system/tokens/shadows.js`

3. **Follow the naming convention**:
   - Use semantic names that describe the purpose, not the appearance
   - Use kebab-case for CSS variables
   - Use camelCase for JavaScript objects

4. **Update documentation**: Add the new token to the appropriate documentation file.

### Example: Adding a New Color

```javascript
// In src/design-system/tokens/colors.js

// Add to the color palette
export const colorPalette = {
  // Existing colors...
  
  // Add new color
  tertiary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    // ... other shades
    500: '#10B981', // Main tertiary color
    // ... other shades
  },
};

// Add semantic usage
export const colors = {
  // Existing semantic colors...
  
  // Add new semantic usage
  background: {
    // Existing background colors...
    tertiary: colorPalette.tertiary[500],
  },
  
  text: {
    // Existing text colors...
    onTertiary: '#FFFFFF',
  },
};
```

## Adding Component Variants

To add a new variant to an existing component:

1. **Register the variant**:

```javascript
import { registerComponentVariant } from 'src/design-system/utilities/component-extension';

// Register a new "success" button variant
registerComponentVariant('Button', 'SUCCESS', {
  backgroundColor: 'var(--color-success-500)',
  color: 'white',
  hoverBackgroundColor: 'var(--color-success-600)',
});

// Now you can use it
import { Button, BUTTON_VARIANTS } from 'src/design-system/components/Button';

function MyComponent() {
  return (
    <Button variant={BUTTON_VARIANTS.SUCCESS}>
      Success Button
    </Button>
  );
}
```

2. **Add the CSS for the variant**:

```css
/* In your component's CSS or a new CSS file */
.ds-button-success {
  background-color: var(--color-success-500);
  color: white;
}

.ds-button-success:hover {
  background-color: var(--color-success-600);
}
```

## Creating Custom Themes

To create a custom theme:

1. **Create a theme file**:

```javascript
// src/themes/custom-theme.js
import { registerTheme } from 'src/design-system/themes';

const customTheme = {
  colors: {
    background: {
      primary: '#F0F7FF',
      // Override other colors as needed
    },
    text: {
      primary: '#1A365D',
      // Override other colors as needed
    },
    // Other token overrides
  },
};

// Register the theme
registerTheme('custom', customTheme);

export default customTheme;
```

2. **Use the custom theme**:

```javascript
import { useTheme } from 'src/design-system/themes';
import './themes/custom-theme'; // Import to register

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme('custom')}>
      Switch to Custom Theme
    </button>
  );
}
```

## Creating New Components

To create a new component:

1. **Create the component directory**:

```
src/design-system/components/NewComponent/
├── NewComponent.js
├── NewComponent.css
└── index.js
```

2. **Implement the component**:

```javascript
// src/design-system/components/NewComponent/NewComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import './NewComponent.css';

// Component variants
export const NEW_COMPONENT_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  // Add more variants as needed
};

// Component sizes
export const NEW_COMPONENT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * NewComponent - Description of the component
 */
const NewComponent = ({
  children,
  variant = NEW_COMPONENT_VARIANTS.PRIMARY,
  size = NEW_COMPONENT_SIZES.MEDIUM,
  className = '',
  ...props
}) => {
  const componentClasses = [
    'ds-new-component',
    `ds-new-component-${variant}`,
    `ds-new-component-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={componentClasses} {...props}>
      {children}
    </div>
  );
};

NewComponent.propTypes = {
  /** Content of the component */
  children: PropTypes.node,
  /** Component variant */
  variant: PropTypes.oneOf(Object.values(NEW_COMPONENT_VARIANTS)),
  /** Component size */
  size: PropTypes.oneOf(Object.values(NEW_COMPONENT_SIZES)),
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default NewComponent;
```

3. **Create the CSS**:

```css
/* src/design-system/components/NewComponent/NewComponent.css */
.ds-new-component {
  /* Base styles */
  display: block;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}

/* Variants */
.ds-new-component-primary {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
}

.ds-new-component-secondary {
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
}

/* Sizes */
.ds-new-component-small {
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.ds-new-component-medium {
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
}

.ds-new-component-large {
  padding: var(--spacing-lg);
  font-size: var(--font-size-lg);
}
```

4. **Create the index file**:

```javascript
// src/design-system/components/NewComponent/index.js
export { default } from './NewComponent';
export * from './NewComponent';
```

5. **Export from the main components index**:

```javascript
// src/design-system/components/index.js
// ... existing exports
export { default as NewComponent } from './NewComponent';
```

## Best Practices

1. **Maintain compatibility**: Ensure new elements work with existing components
2. **Follow naming conventions**: Use consistent naming patterns
3. **Document extensions**: Update documentation with new additions
4. **Test across themes**: Verify extensions work in all theme modes
5. **Consider accessibility**: Ensure color contrasts and other accessibility requirements
6. **Use design tokens**: Always reference design tokens instead of hardcoded values
7. **Component composition**: Build complex components from simpler ones
8. **Responsive design**: Ensure components work across different screen sizes
9. **Performance**: Consider the performance impact of new components
10. **Versioning**: Document breaking changes when updating existing components
