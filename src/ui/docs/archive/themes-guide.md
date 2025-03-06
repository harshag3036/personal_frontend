# Design System Themes Guide

This guide provides instructions on how to use the design system themes in your application.

## Table of Contents

1. [Introduction](#introduction)
2. [Using the ThemeProvider](#using-the-themeprovider)
3. [Switching Themes](#switching-themes)
4. [Creating Custom Themes](#creating-custom-themes)
5. [Theme Structure](#theme-structure)
6. [Best Practices](#best-practices)

## Introduction

The design system supports multiple themes, with light and dark themes provided by default. Themes define the visual appearance of your application, including colors, typography, spacing, and other design tokens.

## Using the ThemeProvider

The `ThemeProvider` component provides theme context to your application. It allows you to switch between themes and register custom themes.

```jsx
import { ThemeProvider } from './design-system/themes';

function App() {
  return (
    <ThemeProvider initialTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

The `ThemeProvider` component accepts the following props:

- `initialTheme`: The initial theme to use. Defaults to `'light'`.
- `children`: The components to render within the theme context.

## Switching Themes

You can use the `useTheme` hook to access the current theme and switch between themes.

```jsx
import { useTheme } from './design-system/themes';
import { Button } from './design-system/components';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  );
}
```

The `useTheme` hook returns an object with the following properties:

- `theme`: The current theme name.
- `setTheme`: A function to set the current theme.
- `registerTheme`: A function to register a custom theme.
- `themes`: An object containing all registered themes.

## Creating Custom Themes

You can create custom themes by extending the default themes.

```jsx
import { useTheme } from './design-system/themes';
import { lightTheme } from './design-system/themes';

// Create a custom theme
const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: {
      ...lightTheme.colors.background,
      primary: '#f0f8ff', // Custom background color
    },
    brand: {
      ...lightTheme.colors.brand,
      primary: '#6a5acd', // Custom brand color
    },
  },
};

function App() {
  const { registerTheme } = useTheme();
  
  // Register the custom theme
  useEffect(() => {
    registerTheme('custom', customTheme);
  }, []);
  
  return (
    <YourApp />
  );
}
```

You can then switch to the custom theme using the `setTheme` function:

```jsx
import { useTheme } from './design-system/themes';
import { Button } from './design-system/components';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <Button onClick={() => setTheme('light')}>Light Theme</Button>
      <Button onClick={() => setTheme('dark')}>Dark Theme</Button>
      <Button onClick={() => setTheme('custom')}>Custom Theme</Button>
    </div>
  );
}
```

## Theme Structure

The theme structure defines the visual appearance of your application. The default themes include the following properties:

### Colors

The `colors` property defines the color palette for the theme:

```jsx
colors: {
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    tertiary: '#e0e0e0',
    disabled: '#f0f0f0',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    disabled: '#cccccc',
  },
  border: {
    light: '#e0e0e0',
    medium: '#cccccc',
    dark: '#999999',
  },
  brand: {
    primary: '#144272',
    secondary: '#2E8B57',
    tertiary: '#205295',
  },
  error: {
    100: '#ffebee',
    500: '#f44336',
    900: '#b71c1c',
  },
  success: {
    100: '#e8f5e9',
    500: '#4caf50',
    900: '#1b5e20',
  },
  warning: {
    100: '#fff8e1',
    500: '#ff9800',
    900: '#e65100',
  },
  info: {
    100: '#e3f2fd',
    500: '#2196f3',
    900: '#0d47a1',
  },
}
```

### Typography

The `typography` property defines the typography for the theme:

```jsx
typography: {
  fontFamily: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    secondary: 'Georgia, "Times New Roman", serif',
    monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}
```

### Spacing

The `spacing` property defines the spacing for the theme:

```jsx
spacing: {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
}
```

### Shadows

The `shadows` property defines the shadows for the theme:

```jsx
shadows: {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
}
```

### Borders

The `borders` property defines the borders for the theme:

```jsx
borders: {
  radius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  width: {
    none: '0',
    thin: '1px',
    thick: '2px',
    thicker: '4px',
  },
}
```

### Animations

The `animations` property defines the animations for the theme:

```jsx
animations: {
  transition: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideIn: {
      from: { transform: 'translateY(-10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideOut: {
      from: { transform: 'translateY(0)', opacity: 1 },
      to: { transform: 'translateY(-10px)', opacity: 0 },
    },
  },
}
```

## Best Practices

Here are some best practices for using the design system themes:

1. **Use the ThemeProvider**: Always wrap your application with the `ThemeProvider` component to provide theme context.

2. **Use the useTheme hook**: Use the `useTheme` hook to access the current theme and switch between themes.

3. **Extend, don't modify**: Extend existing themes instead of modifying them directly.

4. **Follow the theme structure**: Follow the theme structure when creating custom themes.

5. **Use design tokens**: Use design tokens from the theme instead of hardcoding values.

6. **Test themes**: Test your application with different themes to ensure it looks good in all themes.

7. **Consider accessibility**: Ensure your themes meet accessibility guidelines, such as sufficient color contrast.

8. **Document themes**: Document your custom themes with comments.

9. **Keep it simple**: Keep your themes simple and focused on the visual appearance of your application.

10. **Use CSS variables**: Use CSS variables to apply theme values to your components.
