# UI Component Migration Guide

This guide is designed to help developers migrate existing components to the enhanced UI component system. Follow these guidelines to ensure consistency and take advantage of the improved theming capabilities.

## Migration Steps Overview

1. Import components from the centralized UI package
2. Replace inline styles with theme-aware props
3. Use proper component variants
4. Apply layout components for consistent spacing
5. Ensure proper responsive props usage

## Component Migration Examples

### Before/After Examples

#### Example 1: Button Migration

**Before:**
```jsx
<button 
  className="custom-button primary" 
  style={{ 
    backgroundColor: '#4b74cb', 
    padding: '8px 16px', 
    borderRadius: '4px',
    color: 'white'
  }}
>
  Click Me
</button>
```

**After:**
```jsx
import { Button } from 'src/ui';

<Button 
  variant="primary"
  size="md"
>
  Click Me
</Button>
```

#### Example 2: Container with Custom Styling

**Before:**
```jsx
<div 
  className="card"
  style={{ 
    padding: '16px', 
    margin: '8px', 
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white'
  }}
>
  <h3 style={{ color: '#333', fontSize: '18px' }}>Card Title</h3>
  <p style={{ color: '#666', fontSize: '14px' }}>Card content goes here</p>
</div>
```

**After:**
```jsx
import { Card, Text, Box } from 'src/ui';

<Card 
  variant="elevated"
  padding="md"
  margin="sm"
>
  <Text variant="h3" color="text.primary">Card Title</Text>
  <Text variant="body" color="text.secondary">Card content goes here</Text>
</Card>
```

#### Example 3: Layout with Flexbox

**Before:**
```jsx
<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '16px',
  padding: '24px'
}}>
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</div>
```

**After:**
```jsx
import { Stack } from 'src/ui';

<Stack 
  direction="column" 
  spacing="md"
  padding="lg"
>
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</Stack>
```

## Common Migration Patterns

### 1. Replace div + style with Box

```jsx
// Before
<div style={{ padding: '16px', margin: '8px', backgroundColor: '#f0f0f0' }}>
  Content
</div>

// After
<Box padding="md" margin="sm" backgroundColor="background.secondary">
  Content
</Box>
```

### 2. Replace flex containers with Flex/Stack

```jsx
// Before
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <span>Label</span>
  <input type="text" />
</div>

// After
<Flex align="center" gap="sm">
  <span>Label</span>
  <Input />
</Flex>

// OR, for vertical stacking:
<Stack spacing="sm">
  <span>Label</span>
  <Input />
</Stack>
```

### 3. Replace text elements with Text component

```jsx
// Before
<h2 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Heading</h2>
<p style={{ color: '#666', fontSize: '16px' }}>Paragraph text</p>

// After
<Text variant="h2" color="text.primary">Heading</Text>
<Text variant="body" color="text.secondary">Paragraph text</Text>
```

### 4. Using responsive props

```jsx
// Before
<div style={{ 
  width: '100%', 
  '@media (min-width: 768px)': {
    width: '50%'
  }
}}>
  Content
</div>

// After
<Box 
  width={{ 
    base: "100%", 
    md: "50%" 
  }}
>
  Content
</Box>
```

## Theme Token Usage

Always use theme tokens instead of hard-coded values:

| Hard-coded Value | Theme Token |
|------------------|-------------|
| `#ffffff` | `background.primary` |
| `#f0f0f0` | `background.secondary` |
| `#4b74cb` | `primary.main` |
| `#333333` | `text.primary` |
| `#666666` | `text.secondary` |
| `8px` | `spacing.sm` |
| `16px` | `spacing.md` |
| `24px` | `spacing.lg` |

## Common Issues and Solutions

### Issue: Layout Tearing

**Problem:** Components shift unexpectedly when the screen resizes.

**Solution:** Use the Box, Flex, or Grid components with proper responsive props.

```jsx
<Box 
  width={{ base: "100%", md: "auto" }}
  padding={{ base: "sm", lg: "md" }}
>
  Content
</Box>
```

### Issue: Theme Inconsistency

**Problem:** Colors don't adapt to dark/light theme changes.

**Solution:** Use theme tokens instead of hard-coded colors.

```jsx
// Bad
<div style={{ color: "#333333" }}>Text</div>

// Good
<Text color="text.primary">Text</Text>
```

### Issue: Mixed Style Approaches

**Problem:** Mixing direct style props and className-based styling.

**Solution:** Use the UI component props consistently.

```jsx
// Bad
<div 
  className="custom-card"
  style={{ padding: '16px' }} 
>
  Content
</div>

// Good
<Card
  padding="md"
  className="custom-card" // Only for very specific extensions
>
  Content
</Card>
```

## Testing Your Migration

After migrating a component:

1. Test it with both light and dark themes
2. Verify it at different screen sizes
3. Check keyboard accessibility
4. Ensure all interactive elements have the correct focus states

## Need Help?

Refer to the UI component documentation or ask for assistance from the UI team if you encounter specific migration challenges.
