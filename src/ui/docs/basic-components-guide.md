# Basic Components Guide

This guide provides detailed documentation for the basic components in the design system.

## Table of Contents

1. [Introduction](#introduction)
2. [Button](#button)
3. [Card](#card)
4. [Badge](#badge)
5. [Input](#input)
6. [Select](#select)

## Introduction

The design system provides a set of reusable basic components that help create consistent and maintainable user interfaces. Each component is designed to be:

- **Customizable**: Components support variants, sizes, and other customization options.
- **Accessible**: Components follow accessibility best practices.
- **Consistent**: Components follow a consistent API and design.
- **Extensible**: Components can be extended with new functionality.

## Button

The Button component is a customizable button with support for variants, sizes, and extensions.

### Import

```jsx
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './design-system/components';
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
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './design-system/components';

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

## Card

The Card component is a container for content with support for variants.

### Import

```jsx
import { Card, CARD_VARIANTS } from './design-system/components';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `CARD_VARIANTS.DEFAULT` | Card variant |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the card |
| `children` | `ReactNode` | - | Card content |

### Variants

The Card component supports the following variants:

- `CARD_VARIANTS.DEFAULT`: Default card style
- `CARD_VARIANTS.OUTLINED`: Outlined card style
- `CARD_VARIANTS.ELEVATED`: Elevated card style

### Examples

```jsx
import { Card, CARD_VARIANTS } from './design-system/components';

function MyComponent() {
  return (
    <div>
      {/* Basic usage */}
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
      
      {/* With variants */}
      <Card variant={CARD_VARIANTS.DEFAULT}>
        <h2>Default Card</h2>
        <p>Card content</p>
      </Card>
      <Card variant={CARD_VARIANTS.OUTLINED}>
        <h2>Outlined Card</h2>
        <p>Card content</p>
      </Card>
      <Card variant={CARD_VARIANTS.ELEVATED}>
        <h2>Elevated Card</h2>
        <p>Card content</p>
      </Card>
      
      {/* With extensions */}
      <Card extensions={['hover-effect']}>
        <h2>Card with Hover Effect</h2>
        <p>Hover over me</p>
      </Card>
    </div>
  );
}
```

## Badge

The Badge component is used to display small pieces of information, such as status indicators or counts.

### Import

```jsx
import { Badge, BADGE_VARIANTS, BADGE_SIZES } from './design-system/components';
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
import { Badge, BADGE_VARIANTS, BADGE_SIZES } from './design-system/components';

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
import { Input, INPUT_VARIANTS, INPUT_SIZES, INPUT_STATES } from './design-system/components';
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
import { Input, INPUT_VARIANTS, INPUT_SIZES, INPUT_STATES } from './design-system/components';

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

## Select

The Select component is a customizable dropdown/select component with support for variants, sizes, and states.

### Import

```jsx
import { Select, SELECT_VARIANTS, SELECT_SIZES, SELECT_STATES } from './design-system/components';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Select ID |
| `name` | `string` | - | Select name |
| `value` | `string` | `''` | Select value |
| `onChange` | `function` | - | Callback when select value changes |
| `options` | `array` | `[]` | Select options |
| `label` | `string` | - | Select label |
| `placeholder` | `string` | `''` | Select placeholder |
| `variant` | `string` | `SELECT_VARIANTS.DEFAULT` | Select variant |
| `size` | `string` | `SELECT_SIZES.MEDIUM` | Select size |
| `state` | `string` | `SELECT_STATES.DEFAULT` | Select state |
| `helperText` | `string` | - | Helper text |
| `errorText` | `string` | - | Error text (shown when state is ERROR) |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `required` | `boolean` | `false` | Whether the select is required |
| `startIcon` | `ReactNode` | - | Icon to display at the start of the select |
| `fullWidth` | `boolean` | `false` | Whether the select should take up the full width |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the select |

### Variants

The Select component supports the following variants:

- `SELECT_VARIANTS.DEFAULT`: Default select style
- `SELECT_VARIANTS.FILLED`: Filled select style
- `SELECT_VARIANTS.OUTLINED`: Outlined select style

### Sizes

The Select component supports the following sizes:

- `SELECT_SIZES.SMALL`: Small select size
- `SELECT_SIZES.MEDIUM`: Medium select size
- `SELECT_SIZES.LARGE`: Large select size

### States

The Select component supports the following states:

- `SELECT_STATES.DEFAULT`: Default select state
- `SELECT_STATES.SUCCESS`: Success select state
- `SELECT_STATES.ERROR`: Error select state
- `SELECT_STATES.WARNING`: Warning select state

### Examples

```jsx
import { Select, SELECT_VARIANTS, SELECT_SIZES, SELECT_STATES } from './design-system/components';

function MyComponent() {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  return (
    <div>
      {/* Basic usage */}
      <Select
        id="basic-select"
        name="basic-select"
        options={options}
        value={value}
        onChange={handleChange}
        label="Basic Select"
        placeholder="Choose an option"
      />
      
      {/* With variants */}
      <Select
        id="default-select"
        name="default-select"
        options={options}
        variant={SELECT_VARIANTS.DEFAULT}
        label="Default Select"
        placeholder="Default variant"
      />
      <Select
        id="filled-select"
        name="filled-select"
        options={options}
        variant={SELECT_VARIANTS.FILLED}
        label="Filled Select"
        placeholder="Filled variant"
      />
      <Select
        id="outlined-select"
        name="outlined-select"
        options={options}
        variant={SELECT_VARIANTS.OUTLINED}
        label="Outlined Select"
        placeholder="Outlined variant"
      />
      
      {/* With sizes */}
      <Select
        id="small-select"
        name="small-select"
        options={options}
        size={SELECT_SIZES.SMALL}
        label="Small Select"
        placeholder="Small size"
      />
      <Select
        id="medium-select"
        name="medium-select"
        options={options}
        size={SELECT_SIZES.MEDIUM}
        label="Medium Select"
        placeholder="Medium size"
      />
      <Select
        id="large-select"
        name="large-select"
        options={options}
        size={SELECT_SIZES.LARGE}
        label="Large Select"
        placeholder="Large size"
      />
      
      {/* With states */}
      <Select
        id="default-state-select"
        name="default-state-select"
        options={options}
        state={SELECT_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
        placeholder="Default state"
      />
      <Select
        id="success-state-select"
        name="success-state-select"
        options={options}
        state={SELECT_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
        placeholder="Success state"
      />
      <Select
        id="error-state-select"
        name="error-state-select"
        options={options}
        state={SELECT_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
        placeholder="Error state"
      />
      <Select
        id="warning-state-select"
        name="warning-state-select"
        options={options}
        state={SELECT_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
        placeholder="Warning state"
      />
      
      {/* Disabled */}
      <Select
        id="disabled-select"
        name="disabled-select"
        options={options}
        disabled
        label="Disabled Select"
        placeholder="Disabled state"
      />
      
      {/* Required */}
      <Select
        id="required-select"
        name="required-select"
        options={options}
        required
        label="Required Select"
        placeholder="Required field"
      />
      
      {/* With start icon */}
      <Select
        id="start-icon-select"
        name="start-icon-select"
        options={options}
        startIcon={<Icon />}
        label="Select with Icon"
        placeholder="Start icon"
      />
      
      {/* Full width */}
      <Select
        id="full-width-select"
        name="full-width-select"
        options={options}
        fullWidth
        label="Full Width Select"
        placeholder="This select takes up the full width"
      />
    </div>
  );
}
