# Design System Best Practices

This document outlines best practices for using the design system effectively and avoiding common pitfalls. Following these guidelines will help ensure your components are robust, maintainable, and consistent with the design language.

## Table of Contents

1. [Component Usage](#component-usage)
2. [Responsive Design](#responsive-design)
3. [Accessibility](#accessibility)
4. [Performance](#performance)
5. [Theme Compatibility](#theme-compatibility)
6. [Edge Cases](#edge-cases)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Component Usage

### Do's

- ✅ Use the appropriate component for the intended purpose
- ✅ Leverage component variants rather than creating custom styles
- ✅ Use the component extension system for adding functionality
- ✅ Compose complex UIs from multiple simple components
- ✅ Pass all required props to components

### Don'ts

- ❌ Override component styles directly with inline styles
- ❌ Create duplicate components with similar functionality
- ❌ Deeply nest components of the same type (e.g., Card inside Card inside Card)
- ❌ Use components in ways they weren't designed for

### Example: Button Usage

```jsx
// Good
<Button 
  variant={BUTTON_VARIANTS.PRIMARY} 
  size={BUTTON_SIZES.MEDIUM}
  onClick={handleClick}
>
  Submit
</Button>

// Bad - Don't use inline styles to override component styles
<Button 
  style={{ backgroundColor: 'purple', borderRadius: '10px' }}
  onClick={handleClick}
>
  Submit
</Button>

// Better - Use the component extension system
componentExtension.registerComponentVariant('Button', 'CUSTOM_PURPLE', {
  backgroundColor: 'purple',
  borderRadius: '10px',
});

<Button 
  variant="CUSTOM_PURPLE"
  onClick={handleClick}
>
  Submit
</Button>
```

## Responsive Design

### Do's

- ✅ Test components at all breakpoints
- ✅ Use relative units (rem, em) instead of fixed pixels
- ✅ Use the `fullWidth` prop for components that should expand
- ✅ Consider touch targets on mobile (minimum 44x44px)
- ✅ Use media queries for significant layout changes

### Don'ts

- ❌ Hardcode dimensions that prevent components from being responsive
- ❌ Assume a component that works on desktop will work on mobile
- ❌ Neglect to test on small screens and in different orientations

### Example: Responsive Card

```jsx
// Good - Uses fullWidth prop for responsive behavior
<Card fullWidth>
  <h2>Card Title</h2>
  <p>Card content that will adapt to the available space</p>
</Card>

// Bad - Hardcoded width prevents responsiveness
<div style={{ width: '500px' }}>
  <Card>
    <h2>Card Title</h2>
    <p>Card content that will overflow on small screens</p>
  </Card>
</div>
```

## Accessibility

### Do's

- ✅ Ensure sufficient color contrast (WCAG AA minimum)
- ✅ Provide text alternatives for non-text content
- ✅ Ensure keyboard navigability for all interactive elements
- ✅ Use semantic HTML elements
- ✅ Include proper ARIA attributes when needed

### Don'ts

- ❌ Rely solely on color to convey information
- ❌ Create custom keyboard navigation that conflicts with browser defaults
- ❌ Use non-standard interaction patterns without clear instructions
- ❌ Remove focus indicators without providing alternatives

### Example: Accessible Button

```jsx
// Good - Uses appropriate ARIA attributes
<Button 
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClose}
>
  <Icon name="close" />
</Button>

// Bad - Missing accessible name for screen readers
<Button onClick={handleClose}>
  <Icon name="close" />
</Button>
```

## Performance

### Do's

- ✅ Memoize components that render frequently
- ✅ Use appropriate React hooks (useCallback, useMemo) for optimizations
- ✅ Lazy load components that aren't immediately visible
- ✅ Consider bundle size when adding new features
- ✅ Use efficient CSS selectors

### Don'ts

- ❌ Re-render components unnecessarily
- ❌ Create complex state management within simple components
- ❌ Add heavy dependencies for minor features
- ❌ Use deeply nested selectors that are expensive to compute

### Example: Optimized Component

```jsx
// Good - Memoized component that only re-renders when props change
const MemoizedCard = React.memo(function Card({ title, content }) {
  return (
    <div className="ds-card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
});

// Good - Callback is memoized to prevent unnecessary re-renders
const handleClick = useCallback(() => {
  // Handle click logic
}, [/* dependencies */]);
```

## Theme Compatibility

### Do's

- ✅ Use design tokens for all styles
- ✅ Test components in both light and dark themes
- ✅ Consider high contrast mode users
- ✅ Use semantic color tokens (e.g., `--color-text-primary`) instead of literal colors
- ✅ Test custom themes if you support them

### Don'ts

- ❌ Hardcode colors, spacing, or other values that should come from the theme
- ❌ Assume a component that looks good in one theme will look good in all themes
- ❌ Override theme variables globally

### Example: Theme-Compatible Styles

```css
/* Good - Uses theme tokens */
.my-component {
  color: var(--color-text-primary);
  background-color: var(--color-background-secondary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}

/* Bad - Hardcoded values */
.my-component {
  color: #333333;
  background-color: white;
  padding: 16px;
  border-radius: 4px;
}
```

## Edge Cases

### Content Overflow

- ✅ Set appropriate overflow behaviors
- ✅ Test with long text strings
- ✅ Consider text truncation with ellipsis
- ✅ Test with different languages (some may be longer than English)

### Example: Handling Text Overflow

```css
/* Good - Handles text overflow */
.ds-card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
```

### Empty States

- ✅ Define how components should appear when empty
- ✅ Provide fallback content or messaging
- ✅ Consider skeleton loaders for loading states

### Example: Empty State Handling

```jsx
// Good - Handles empty state
function CardList({ items = [] }) {
  if (items.length === 0) {
    return <EmptyState message="No items found" />;
  }
  
  return items.map(item => <Card key={item.id} {...item} />);
}
```

### Error States

- ✅ Define how components should handle errors
- ✅ Provide clear error messages
- ✅ Include recovery options when possible

### Example: Error Handling

```jsx
// Good - Handles error state
function DataDisplay({ data, error, isLoading }) {
  if (isLoading) {
    return <Skeleton />;
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message={error.message} 
        onRetry={handleRetry} 
      />
    );
  }
  
  return <DataTable data={data} />;
}
```

### Right-to-Left (RTL) Support

- ✅ Use CSS logical properties when possible
- ✅ Test with RTL languages
- ✅ Consider bidirectional text rendering

### Example: RTL-Compatible CSS

```css
/* Good - Uses logical properties */
.ds-card {
  padding-inline-start: var(--spacing-md);
  padding-inline-end: var(--spacing-md);
  margin-inline-start: var(--spacing-sm);
}

/* Bad - Directional properties */
.ds-card {
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  margin-left: var(--spacing-sm);
}
```

## Testing

### Do's

- ✅ Test components in isolation
- ✅ Test all component variants and states
- ✅ Test across different browsers and devices
- ✅ Include accessibility testing
- ✅ Test keyboard navigation

### Don'ts

- ❌ Test only the happy path
- ❌ Ignore edge cases
- ❌ Test only in one browser or screen size

### Example: Component Testing

```jsx
// Good - Tests multiple states and variants
describe('Button', () => {
  it('renders correctly with default props', () => {
    // Test default rendering
  });
  
  it('applies the correct styles for primary variant', () => {
    // Test primary variant
  });
  
  it('handles disabled state correctly', () => {
    // Test disabled state
  });
  
  it('is accessible with keyboard navigation', () => {
    // Test keyboard accessibility
  });
});
```

## Documentation

### Do's

- ✅ Document all props, including types and default values
- ✅ Provide usage examples for different scenarios
- ✅ Include accessibility information
- ✅ Document known limitations or edge cases
- ✅ Keep documentation up-to-date with code changes

### Don'ts

- ❌ Leave props undocumented
- ❌ Assume usage is self-explanatory
- ❌ Neglect to update documentation when components change

### Example: Good Documentation

```jsx
/**
 * Button Component
 * 
 * A customizable button with support for different variants and sizes.
 * 
 * @accessibility
 * - Includes appropriate ARIA attributes
 * - Supports keyboard navigation
 * - Maintains 3:1 minimum contrast ratio
 * 
 * @example
 * ```jsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
function Button({
  /** Button content */
  children,
  /** Button variant */
  variant = BUTTON_VARIANTS.DEFAULT,
  /** Button size */
  size = BUTTON_SIZES.MEDIUM,
  /** Whether the button is disabled */
  disabled = false,
  /** Click handler */
  onClick,
  /** Additional class names */
  className,
}) {
  // Implementation
}
```

## Continuous Improvement

The design system is a living entity that should evolve over time. Regularly:

1. Gather feedback from developers using the system
2. Identify pain points or limitations
3. Prioritize improvements based on impact
4. Document changes and communicate them to users
5. Test thoroughly before releasing updates

By following these best practices, you'll create a more robust, maintainable, and user-friendly design system that can scale with your application's needs.
