# Atomic Components Guide

This guide provides detailed documentation for the atomic components in the UI library. Atomic components are the basic building blocks that can't be broken down further.

## Table of Contents

1. [Introduction](#introduction)
2. [Box](#box)
3. [Flex](#flex)
4. [Grid](#grid)
5. [Text](#text)
6. [Button](#button)
7. [Badge](#badge)
8. [Input](#input)
9. [Stack](#stack)
10. [Divider](#divider)

## Introduction

Atomic components are the fundamental building blocks of the UI library. They are designed to be:

- **Composable**: They can be combined to create more complex components
- **Customizable**: They support variants, sizes, and other customization options
- **Accessible**: They follow accessibility best practices
- **Consistent**: They follow a consistent API and design
- **Extensible**: They can be extended with new functionality

## Box

The Box component is a basic layout container with support for styling props.

### Import

```jsx
import { Box } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `string` or `object` | - | Padding (supports responsive values) |
| `margin` | `string` or `object` | - | Margin (supports responsive values) |
| `width` | `string` or `number` or `object` | - | Width (supports responsive values) |
| `height` | `string` or `number` or `object` | - | Height (supports responsive values) |
| `background` | `string` | - | Background color |
| `color` | `string` | - | Text color |
| `border` | `string` | - | Border |
| `borderRadius` | `string` | - | Border radius |
| `boxShadow` | `string` | - | Box shadow |
| `as` | `string` or `component` | `'div'` | HTML element or component to render as |
| `children` | `ReactNode` | - | Box content |

### Examples

```jsx
import { Box } from '../ui';

function MyComponent() {
  return (
    <Box 
      padding="md" 
      margin="sm" 
      background="background-surface" 
      borderRadius="md"
      boxShadow="md"
    >
      Content goes here
    </Box>
  );
}
```

## Flex

The Flex component is a layout container that uses flexbox.

### Import

```jsx
import { Flex } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `string` or `object` | `'row'` | Flex direction (supports responsive values) |
| `wrap` | `string` or `object` | `'nowrap'` | Flex wrap (supports responsive values) |
| `justify` | `string` or `object` | `'flex-start'` | Justify content (supports responsive values) |
| `align` | `string` or `object` | `'stretch'` | Align items (supports responsive values) |
| `gap` | `string` or `object` | - | Gap between items (supports responsive values) |
| `flex` | `string` or `number` or `object` | - | Flex value (supports responsive values) |
| `as` | `string` or `component` | `'div'` | HTML element or component to render as |
| `children` | `ReactNode` | - | Flex content |

### Examples

```jsx
import { Flex } from '../ui';

function MyComponent() {
  return (
    <Flex 
      direction="row" 
      justify="space-between" 
      align="center" 
      gap="md"
    >
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
}
```

## Grid

The Grid component is a layout container that uses CSS Grid.

### Import

```jsx
import { Grid } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `string` or `number` or `object` | - | Grid template columns (supports responsive values) |
| `rows` | `string` or `number` or `object` | - | Grid template rows (supports responsive values) |
| `gap` | `string` or `object` | - | Gap between items (supports responsive values) |
| `columnGap` | `string` or `object` | - | Column gap (supports responsive values) |
| `rowGap` | `string` or `object` | - | Row gap (supports responsive values) |
| `as` | `string` or `component` | `'div'` | HTML element or component to render as |
| `children` | `ReactNode` | - | Grid content |

### Examples

```jsx
import { Grid } from '../ui';

function MyComponent() {
  return (
    <Grid 
      columns={{ base: 1, md: 2, lg: 3 }} 
      gap="md"
    >
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
    </Grid>
  );
}
```

## Text

The Text component is used for displaying text with different styles.

### Import

```jsx
import { Text } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'body1'` | Text variant |
| `color` | `string` | - | Text color |
| `align` | `string` or `object` | - | Text alignment (supports responsive values) |
| `weight` | `string` or `number` | - | Font weight |
| `size` | `string` or `number` | - | Font size |
| `lineHeight` | `string` or `number` | - | Line height |
| `as` | `string` or `component` | `'span'` | HTML element or component to render as |
| `children` | `ReactNode` | - | Text content |

### Variants

The Text component supports the following variants:

- `h1`: Heading 1
- `h2`: Heading 2
- `h3`: Heading 3
- `h4`: Heading 4
- `h5`: Heading 5
- `h6`: Heading 6
- `body1`: Body text (default)
- `body2`: Smaller body text
- `caption`: Caption text
- `overline`: Overline text

### Examples

```jsx
import { Text } from '../ui';

function MyComponent() {
  return (
    <div>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="body1">Body text</Text>
      <Text variant="caption" color="text-secondary">Caption text</Text>
      <Text weight="bold" size="lg">Custom text</Text>
    </div>
  );
}
```

## Button

The Button component is a customizable button with support for variants, sizes, and extensions.

### Import

```jsx
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `BUTTON_VARIANTS.DEFAULT` | Button variant |
| `size` | `string` | `BUTTON_SIZES.MEDIUM` | Button size |
| `fullWidth` | `boolean` | `false` | Whether the button should take up the full width |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `startIcon` | `ReactNode` | - | Icon to display at the start of the button |
| `endIcon` | `ReactNode` | - | Icon to display at the end of the button |
| `onClick` | `function` | - | Callback when the button is clicked |
| `type` | `string` | `'button'` | Button type attribute |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the button |
| `children` | `ReactNode` | - | Button content |

### Variants

The Button component supports the following variants:

- `BUTTON_VARIANTS.DEFAULT`: Default button style
- `BUTTON_VARIANTS.PRIMARY`: Primary button style
- `BUTTON_VARIANTS.SECONDARY`: Secondary button style
- `BUTTON_VARIANTS.OUTLINE`: Outlined button style
- `BUTTON_VARIANTS.TEXT`: Text button style
- `BUTTON_VARIANTS.DANGER`: Danger button style
- `BUTTON_VARIANTS.SUCCESS`: Success button style

### Sizes

The Button component supports the following sizes:

- `BUTTON_SIZES.SMALL`: Small button size
- `BUTTON_SIZES.MEDIUM`: Medium button size
- `BUTTON_SIZES.LARGE`: Large button size

### Examples

```jsx
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from '../ui';

function MyComponent() {
  return (
    <div>
      {/* Basic usage */}
      <Button>Default Button</Button>
      
      {/* With variants */}
      <Button variant={BUTTON_VARIANTS.PRIMARY}>Primary Button</Button>
      <Button variant={BUTTON_VARIANTS.SECONDARY}>Secondary Button</Button>
      <Button variant={BUTTON_VARIANTS.OUTLINE}>Outline Button</Button>
      <Button variant={BUTTON_VARIANTS.TEXT}>Text Button</Button>
      <Button variant={BUTTON_VARIANTS.DANGER}>Danger Button</Button>
      <Button variant={BUTTON_VARIANTS.SUCCESS}>Success Button</Button>
      
      {/* With sizes */}
      <Button size={BUTTON_SIZES.SMALL}>Small Button</Button>
      <Button size={BUTTON_SIZES.MEDIUM}>Medium Button</Button>
      <Button size={BUTTON_SIZES.LARGE}>Large Button</Button>
      
      {/* Full width */}
      <Button fullWidth>Full Width Button</Button>
      
      {/* Disabled */}
      <Button disabled>Disabled Button</Button>
      
      {/* With icons */}
      <Button startIcon={<Icon />}>Button with Start Icon</Button>
      <Button endIcon={<Icon />}>Button with End Icon</Button>
      
      {/* With onClick handler */}
      <Button onClick={() => console.log('Button clicked')}>
        Click Me
      </Button>
      
      {/* With extensions */}
      <Button extensions={['tooltip']} data-tooltip="This is a tooltip">
        Button with Tooltip
      </Button>
    </div>
  );
}
```

## Badge

The Badge component is used to display small pieces of information, such as status indicators or counts.

### Import

```jsx
import { Badge, BADGE_VARIANTS, BADGE_SIZES } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `BADGE_VARIANTS.DEFAULT` | Badge variant |
| `size` | `string` | `BADGE_SIZES.MEDIUM` | Badge size |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the badge |
| `children` | `ReactNode` | - | Badge content |

### Variants

The Badge component supports the following variants:

- `BADGE_VARIANTS.DEFAULT`: Default badge style
- `BADGE_VARIANTS.PRIMARY`: Primary badge style
- `BADGE_VARIANTS.SECONDARY`: Secondary badge style
- `BADGE_VARIANTS.SUCCESS`: Success badge style
- `BADGE_VARIANTS.WARNING`: Warning badge style
- `BADGE_VARIANTS.ERROR`: Error badge style
- `BADGE_VARIANTS.INFO`: Info badge style

### Sizes

The Badge component supports the following sizes:

- `BADGE_SIZES.SMALL`: Small badge size
- `BADGE_SIZES.MEDIUM`: Medium badge size
- `BADGE_SIZES.LARGE`: Large badge size

### Examples

```jsx
import { Badge, BADGE_VARIANTS, BADGE_SIZES } from '../ui';

function MyComponent() {
  return (
    <div>
      {/* Basic usage */}
      <Badge>Default Badge</Badge>
      
      {/* With variants */}
      <Badge variant={BADGE_VARIANTS.DEFAULT}>Default Badge</Badge>
      <Badge variant={BADGE_VARIANTS.PRIMARY}>Primary Badge</Badge>
      <Badge variant={BADGE_VARIANTS.SECONDARY}>Secondary Badge</Badge>
      <Badge variant={BADGE_VARIANTS.SUCCESS}>Success Badge</Badge>
      <Badge variant={BADGE_VARIANTS.WARNING}>Warning Badge</Badge>
      <Badge variant={BADGE_VARIANTS.ERROR}>Error Badge</Badge>
      <Badge variant={BADGE_VARIANTS.INFO}>Info Badge</Badge>
      
      {/* With sizes */}
      <Badge size={BADGE_SIZES.SMALL}>Small Badge</Badge>
      <Badge size={BADGE_SIZES.MEDIUM}>Medium Badge</Badge>
      <Badge size={BADGE_SIZES.LARGE}>Large Badge</Badge>
      
      {/* With extensions */}
      <Badge extensions={['pill']}>Pill Badge</Badge>
    </div>
  );
}
```

## Input

The Input component is a customizable text input with support for variants, sizes, and states.

### Import

```jsx
import { Input, INPUT_VARIANTS, INPUT_SIZES, INPUT_STATES } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Input ID |
| `name` | `string` | - | Input name |
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | - | Callback when input value changes |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | `''` | Input placeholder |
| `variant` | `string` | `INPUT_VARIANTS.DEFAULT` | Input variant |
| `size` | `string` | `INPUT_SIZES.MEDIUM` | Input size |
| `state` | `string` | `INPUT_STATES.DEFAULT` | Input state |
| `helperText` | `string` | - | Helper text |
| `errorText` | `string` | - | Error text (shown when state is ERROR) |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `type` | `string` | `'text'` | Input type |
| `startIcon` | `ReactNode` | - | Icon to display at the start of the input |
| `endIcon` | `ReactNode` | - | Icon to display at the end of the input |
| `fullWidth` | `boolean` | `false` | Whether the input should take up the full width |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the input |

### Variants

The Input component supports the following variants:

- `INPUT_VARIANTS.DEFAULT`: Default input style
- `INPUT_VARIANTS.FILLED`: Filled input style
- `INPUT_VARIANTS.OUTLINED`: Outlined input style

### Sizes

The Input component supports the following sizes:

- `INPUT_SIZES.SMALL`: Small input size
- `INPUT_SIZES.MEDIUM`: Medium input size
- `INPUT_SIZES.LARGE`: Large input size

### States

The Input component supports the following states:

- `INPUT_STATES.DEFAULT`: Default input state
- `INPUT_STATES.SUCCESS`: Success input state
- `INPUT_STATES.ERROR`: Error input state
- `INPUT_STATES.WARNING`: Warning input state

### Examples

```jsx
import { Input, INPUT_VARIANTS, INPUT_SIZES, INPUT_STATES } from '../ui';

function MyComponent() {
  const [value, setValue] = useState('');
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <div>
      {/* Basic usage */}
      <Input
        id="basic-input"
        name="basic-input"
        value={value}
        onChange={handleChange}
        label="Basic Input"
        placeholder="Enter text"
      />
      
      {/* With variants */}
      <Input
        id="default-input"
        name="default-input"
        variant={INPUT_VARIANTS.DEFAULT}
        label="Default Input"
        placeholder="Default variant"
      />
      <Input
        id="filled-input"
        name="filled-input"
        variant={INPUT_VARIANTS.FILLED}
        label="Filled Input"
        placeholder="Filled variant"
      />
      <Input
        id="outlined-input"
        name="outlined-input"
        variant={INPUT_VARIANTS.OUTLINED}
        label="Outlined Input"
        placeholder="Outlined variant"
      />
      
      {/* With sizes */}
      <Input
        id="small-input"
        name="small-input"
        size={INPUT_SIZES.SMALL}
        label="Small Input"
        placeholder="Small size"
      />
      <Input
        id="medium-input"
        name="medium-input"
        size={INPUT_SIZES.MEDIUM}
        label="Medium Input"
        placeholder="Medium size"
      />
      <Input
        id="large-input"
        name="large-input"
        size={INPUT_SIZES.LARGE}
        label="Large Input"
        placeholder="Large size"
      />
      
      {/* With states */}
      <Input
        id="default-state-input"
        name="default-state-input"
        state={INPUT_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
        placeholder="Default state"
      />
      <Input
        id="success-state-input"
        name="success-state-input"
        state={INPUT_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
        placeholder="Success state"
      />
      <Input
        id="error-state-input"
        name="error-state-input"
        state={INPUT_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
        placeholder="Error state"
      />
      <Input
        id="warning-state-input"
        name="warning-state-input"
        state={INPUT_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
        placeholder="Warning state"
      />
      
      {/* Disabled */}
      <Input
        id="disabled-input"
        name="disabled-input"
        disabled
        label="Disabled Input"
        placeholder="Disabled state"
      />
      
      {/* Read-only */}
      <Input
        id="readonly-input"
        name="readonly-input"
        readOnly
        label="Read-only Input"
        value="This input is read-only"
      />
      
      {/* With icons */}
      <Input
        id="start-icon-input"
        name="start-icon-input"
        startIcon={<Icon />}
        label="Input with Start Icon"
        placeholder="Start icon"
      />
      <Input
        id="end-icon-input"
        name="end-icon-input"
        endIcon={<Icon />}
        label="Input with End Icon"
        placeholder="End icon"
      />
      
      {/* Full width */}
      <Input
        id="full-width-input"
        name="full-width-input"
        fullWidth
        label="Full Width Input"
        placeholder="This input takes up the full width"
      />
      
      {/* With extensions */}
      <Input
        id="extension-input"
        name="extension-input"
        extensions={['mask']}
        data-mask="(999) 999-9999"
        label="Phone Number"
        placeholder="Enter phone number"
      />
    </div>
  );
}
```

## Stack

The Stack component is used to create a stack of elements with consistent spacing.

### Import

```jsx
import { Stack } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `string` or `object` | `'column'` | Stack direction (supports responsive values) |
| `spacing` | `string` or `object` | `'md'` | Spacing between items (supports responsive values) |
| `align` | `string` or `object` | `'stretch'` | Align items (supports responsive values) |
| `justify` | `string` or `object` | `'flex-start'` | Justify content (supports responsive values) |
| `as` | `string` or `component` | `'div'` | HTML element or component to render as |
| `children` | `ReactNode` | - | Stack content |

### Examples

```jsx
import { Stack } from '../ui';

function MyComponent() {
  return (
    <Stack spacing="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

## Divider

The Divider component is used to create a horizontal or vertical divider.

### Import

```jsx
import { Divider } from '../ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `string` | `'horizontal'` | Divider orientation |
| `color` | `string` | - | Divider color |
| `thickness` | `string` or `number` | `'1px'` | Divider thickness |
| `margin` | `string` or `object` | - | Margin (supports responsive values) |
| `as` | `string` or `component` | `'hr'` | HTML element or component to render as |

### Examples

```jsx
import { Divider } from '../ui';

function MyComponent() {
  return (
    <div>
      <div>Content above divider</div>
      <Divider margin="md" />
      <div>Content below divider</div>
      
      <div style={{ display: 'flex', height: '100px' }}>
        <div>Left content</div>
        <Divider orientation="vertical" margin="0 md" />
        <div>Right content</div>
      </div>
    </div>
  );
}
```

## Best Practices

Here are some best practices for using atomic components:

1. **Use design tokens**: Always use design tokens for styling rather than hard-coded values.

2. **Use composition**: Compose atomic components together to create more complex UIs.

3. **Use responsive props**: Use responsive props to create responsive UIs.

4. **Follow accessibility guidelines**: Ensure your components are accessible to all users.

5. **Keep it simple**: Keep your components simple and focused on a single responsibility.

6. **Use semantic HTML**: Use the `as` prop to render components as the appropriate semantic HTML element.

7. **Use consistent patterns**: Follow the same patterns across all components for consistency.

8. **Document your components**: Document your components with JSDoc comments and PropTypes.
