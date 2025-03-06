# Design System Components Guide

This guide provides detailed documentation for the form-related components in the design system.

## Table of Contents

1. [Introduction](#introduction)
2. [Basic Components](#basic-components)
3. [Form Components](#form-components)
   - [Form](#form)
   - [Checkbox](#checkbox)
   - [Textarea](#textarea)
   - [Toast](#toast)
4. [Best Practices](#best-practices)

## Introduction

The design system provides a set of reusable components that help create consistent and maintainable user interfaces. Each component is designed to be:

- **Customizable**: Components support variants, sizes, and other customization options.
- **Accessible**: Components follow accessibility best practices.
- **Consistent**: Components follow a consistent API and design.
- **Extensible**: Components can be extended with new functionality.

## Basic Components

For documentation on basic components (Button, Card, Badge, Input, Select), please refer to the [Basic Components Guide](./basic-components-guide.md).

## Form Components

### Form

The Form component is a compound component for creating forms with consistent styling and behavior.

#### Import

```jsx
import { Form, useFormContext } from './design-system/components';
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `function` | - | Callback when the form is submitted |
| `initialValues` | `object` | `{}` | Initial form values |
| `disabled` | `boolean` | `false` | Whether the form is disabled |
| `className` | `string` | - | Additional CSS class names |
| `children` | `ReactNode` | - | Form content |

#### Sub-components

The Form component provides the following sub-components:

- `Form.Group`: Container for form controls
- `Form.Label`: Label for form controls
- `Form.Control`: Form control (input, select, etc.)
- `Form.Text`: Helper text for form controls
- `Form.Feedback`: Feedback text for form controls
- `Form.Submit`: Submit button for the form

#### Examples

```jsx
import { Form, useFormContext } from './design-system/components';

function MyComponent() {
  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // In a real application, you would typically make an API call here
  };
  
  return (
    <div>
      {/* Basic usage */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            name="name"
            id="name"
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Form.Text>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
      
      {/* Form with validation */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username" required>Username</Form.Label>
          <Form.Control
            name="username"
            id="username"
            placeholder="Choose a username"
            required
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="password" required>Password</Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Form.Feedback type="invalid">
            Password must be at least 8 characters long.
          </Form.Feedback>
        </Form.Group>
        
        <Form.Submit>Register</Form.Submit>
      </Form>
      
      {/* Form layouts */}
      <Form>
        <div className="ds-form-row">
          <div className="ds-form-col">
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </Form.Group>
          </div>
          <div className="ds-form-col">
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </Form.Group>
          </div>
        </div>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
      
      {/* Inline form */}
      <Form className="ds-form-inline">
        <Form.Group>
          <Form.Label htmlFor="inlineEmail">Email</Form.Label>
          <Form.Control
            name="inlineEmail"
            id="inlineEmail"
            placeholder="Email"
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="inlinePassword">Password</Form.Label>
          <Form.Control
            name="inlinePassword"
            id="inlinePassword"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        
        <Form.Submit>Sign In</Form.Submit>
      </Form>
      
      {/* Disabled form */}
      <Form disabled>
        <Form.Group>
          <Form.Label htmlFor="disabledName">Name</Form.Label>
          <Form.Control
            name="disabledName"
            id="disabledName"
            placeholder="Enter your name"
          />
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
      
      {/* Using form context for custom validation */}
      <Form onSubmit={handleSubmit}>
        {/* Custom validation component */}
        <FormValidation />
        
        <Form.Group>
          <Form.Label htmlFor="username" required>Username</Form.Label>
          <Form.Control
            name="username"
            id="username"
            placeholder="Choose a username"
            required
          />
        </Form.Group>
        
        <Form.Submit>Submit</Form.Submit>
      </Form>
    </div>
  );
}

// Custom validation component using form context
const FormValidation = () => {
  const { formState, setFieldError, clearFieldError } = useFormContext();
  const { values } = formState;
  
  // Validate username
  React.useEffect(() => {
    if (values.username) {
      if (values.username.length < 3) {
        setFieldError('username', 'Username must be at least 3 characters long');
      } else {
        clearFieldError('username');
      }
    }
  }, [values.username, setFieldError, clearFieldError]);
  
  return null;
};
```

### Checkbox

The Checkbox component is a customizable checkbox with support for variants, sizes, and states.

#### Import

```jsx
import { Checkbox, CHECKBOX_VARIANTS, CHECKBOX_SIZES, CHECKBOX_STATES } from './design-system/components';
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Checkbox ID |
| `name` | `string` | - | Checkbox name |
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `onChange` | `function` | - | Callback when checkbox state changes |
| `label` | `string` | - | Checkbox label |
| `variant` | `string` | `CHECKBOX_VARIANTS.DEFAULT` | Checkbox variant |
| `size` | `string` | `CHECKBOX_SIZES.MEDIUM` | Checkbox size |
| `state` | `string` | `CHECKBOX_STATES.DEFAULT` | Checkbox state |
| `helperText` | `string` | - | Helper text |
| `errorText` | `string` | - | Error text (shown when state is ERROR) |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `required` | `boolean` | `false` | Whether the checkbox is required |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in an indeterminate state |
| `value` | `string` | - | Checkbox value |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the checkbox |

#### Variants

The Checkbox component supports the following variants:

- `CHECKBOX_VARIANTS.DEFAULT`: Default checkbox style
- `CHECKBOX_VARIANTS.FILLED`: Filled checkbox style
- `CHECKBOX_VARIANTS.OUTLINED`: Outlined checkbox style

#### Sizes

The Checkbox component supports the following sizes:

- `CHECKBOX_SIZES.SMALL`: Small checkbox size
- `CHECKBOX_SIZES.MEDIUM`: Medium checkbox size
- `CHECKBOX_SIZES.LARGE`: Large checkbox size

#### States

The Checkbox component supports the following states:

- `CHECKBOX_STATES.DEFAULT`: Default checkbox state
- `CHECKBOX_STATES.SUCCESS`: Success checkbox state
- `CHECKBOX_STATES.ERROR`: Error checkbox state
- `CHECKBOX_STATES.WARNING`: Warning checkbox state

#### Examples

```jsx
import { Checkbox, CHECKBOX_VARIANTS, CHECKBOX_SIZES, CHECKBOX_STATES } from './design-system/components';

function MyComponent() {
  const [checked, setChecked] = useState(false);
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  return (
    <div>
      {/* Basic usage */}
      <Checkbox
        id="basic-checkbox"
        name="basic-checkbox"
        checked={checked}
        onChange={handleChange}
        label="Basic Checkbox"
      />
      
      {/* With variants */}
      <Checkbox
        id="default-checkbox"
        name="default-checkbox"
        variant={CHECKBOX_VARIANTS.DEFAULT}
        label="Default Checkbox"
      />
      <Checkbox
        id="filled-checkbox"
        name="filled-checkbox"
        variant={CHECKBOX_VARIANTS.FILLED}
        label="Filled Checkbox"
      />
      <Checkbox
        id="outlined-checkbox"
        name="outlined-checkbox"
        variant={CHECKBOX_VARIANTS.OUTLINED}
        label="Outlined Checkbox"
      />
      
      {/* With sizes */}
      <Checkbox
        id="small-checkbox"
        name="small-checkbox"
        size={CHECKBOX_SIZES.SMALL}
        label="Small Checkbox"
      />
      <Checkbox
        id="medium-checkbox"
        name="medium-checkbox"
        size={CHECKBOX_SIZES.MEDIUM}
        label="Medium Checkbox"
      />
      <Checkbox
        id="large-checkbox"
        name="large-checkbox"
        size={CHECKBOX_SIZES.LARGE}
        label="Large Checkbox"
      />
      
      {/* With states */}
      <Checkbox
        id="default-state-checkbox"
        name="default-state-checkbox"
        state={CHECKBOX_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
      />
      <Checkbox
        id="success-state-checkbox"
        name="success-state-checkbox"
        state={CHECKBOX_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
        checked
      />
      <Checkbox
        id="error-state-checkbox"
        name="error-state-checkbox"
        state={CHECKBOX_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
      />
      <Checkbox
        id="warning-state-checkbox"
        name="warning-state-checkbox"
        state={CHECKBOX_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
      />
      
      {/* Disabled */}
      <Checkbox
        id="disabled-checkbox"
        name="disabled-checkbox"
        disabled
        label="Disabled Checkbox"
      />
      
      {/* Indeterminate */}
      <Checkbox
        id="indeterminate-checkbox"
        name="indeterminate-checkbox"
        indeterminate
        label="Indeterminate Checkbox"
      />
      
      {/* Checkbox group */}
      <div className="ds-checkbox-group">
        <Checkbox
          id="option-1"
          name="options"
          value="option1"
          checked={selectedOptions.includes('option1')}
          onChange={handleGroupChange}
          label="Option 1"
        />
        <Checkbox
          id="option-2"
          name="options"
          value="option2"
          checked={selectedOptions.includes('option2')}
          onChange={handleGroupChange}
          label="Option 2"
        />
        <Checkbox
          id="option-3"
          name="options"
          value="option3"
          checked={selectedOptions.includes('option3')}
          onChange={handleGroupChange}
          label="Option 3"
        />
      </div>
      
      {/* Horizontal checkbox group */}
      <div className="ds-checkbox-group ds-checkbox-group-horizontal">
        <Checkbox
          id="horizontal-option-1"
          name="horizontal-options"
          value="horizontal-option1"
          label="Option 1"
        />
        <Checkbox
          id="horizontal-option-2"
          name="horizontal-options"
          value="horizontal-option2"
          label="Option 2"
        />
        <Checkbox
          id="horizontal-option-3"
          name="horizontal-options"
          value="horizontal-option3"
          label="Option 3"
        />
      </div>
    </div>
  );
}

// Handling checkbox group changes
function CheckboxGroupExample() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleGroupChange = (event) => {
    const { value, checked } = event.target;
    
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };
  
  return (
    <div className="ds-checkbox-group">
      <Checkbox
        id="option-1"
        name="options"
        value="option1"
        checked={selectedOptions.includes('option1')}
        onChange={handleGroupChange}
        label="Option 1"
      />
      <Checkbox
        id="option-2"
        name="options"
        value="option2"
        checked={selectedOptions.includes('option2')}
        onChange={handleGroupChange}
        label="Option 2"
      />
      <Checkbox
        id="option-3"
        name="options"
        value="option3"
        checked={selectedOptions.includes('option3')}
        onChange={handleGroupChange}
        label="Option 3"
      />
    </div>
  );
}
```

### Textarea

The Textarea component is a customizable multi-line text input with support for variants, sizes, and states.

#### Import

```jsx
import { Textarea, TEXTAREA_VARIANTS, TEXTAREA_SIZES, TEXTAREA_STATES } from './design-system/components';
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Textarea ID |
| `name` | `string` | - | Textarea name |
| `value` | `string` | `''` | Textarea value |
| `onChange` | `function` | - | Callback when textarea value changes |
| `label` | `string` | - | Textarea label |
| `placeholder` | `string` | `''` | Textarea placeholder |
| `variant` | `string` | `TEXTAREA_VARIANTS.DEFAULT` | Textarea variant |
| `size` | `string` | `TEXTAREA_SIZES.MEDIUM` | Textarea size |
| `state` | `string` | `TEXTAREA_STATES.DEFAULT` | Textarea state |
| `helperText` | `string` | - | Helper text |
| `errorText` | `string` | - | Error text (shown when state is ERROR) |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `required` | `boolean` | `false` | Whether the textarea is required |
| `readOnly` | `boolean` | `false` | Whether the textarea is read-only |
| `rows` | `number` | `3` | Number of rows to display |
| `maxLength` | `number` | - | Maximum number of characters allowed |
| `autoResize` | `boolean` | `false` | Whether the textarea should automatically resize based on content |
| `minRows` | `number` | `2` | Minimum number of rows when autoResize is true |
| `maxRows` | `number` | `10` | Maximum number of rows when autoResize is true |
| `fullWidth` | `boolean` | `false` | Whether the textarea should take up the full width |
| `className` | `string` | - | Additional CSS class names |
| `extensions` | `string[]` | `[]` | Extensions to apply to the textarea |

#### Variants

The Textarea component supports the following variants:

- `TEXTAREA_VARIANTS.DEFAULT`: Default textarea style
- `TEXTAREA_VARIANTS.FILLED`: Filled textarea style
- `TEXTAREA_VARIANTS.OUTLINED`: Outlined textarea style

#### Sizes

The Textarea component supports the following sizes:

- `TEXTAREA_SIZES.SMALL`: Small textarea size
- `TEXTAREA_SIZES.MEDIUM`: Medium textarea size
- `TEXTAREA_SIZES.LARGE`: Large textarea size

#### States

The Textarea component supports the following states:

- `TEXTAREA_STATES.DEFAULT`: Default textarea state
- `TEXTAREA_STATES.SUCCESS`: Success textarea state
- `TEXTAREA_STATES.ERROR`: Error textarea state
- `TEXTAREA_STATES.WARNING`: Warning textarea state

#### Examples

```jsx
import { Textarea, TEXTAREA_VARIANTS, TEXTAREA_SIZES, TEXTAREA_STATES } from './design-system/components';

function MyComponent() {
  const [value, setValue] = useState('');
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <div>
      {/* Basic usage */}
      <Textarea
        id="basic-textarea"
        name="basic-textarea"
        value={value}
        onChange={handleChange}
        label="Basic Textarea"
        placeholder="Enter your text here"
        rows={4}
      />
      
      {/* With variants */}
      <Textarea
        id="default-textarea"
        name="default-textarea"
        variant={TEXTAREA_VARIANTS.DEFAULT}
        label="Default Textarea"
        placeholder="Default variant"
      />
      <Textarea
        id="filled-textarea"
        name="filled-textarea"
        variant={TEXTAREA_VARIANTS.FILLED}
        label="Filled Textarea"
        placeholder="Filled variant"
      />
      <Textarea
        id="outlined-textarea"
        name="outlined-textarea"
        variant={TEXTAREA_VARIANTS.OUTLINED}
        label="Outlined Textarea"
        placeholder="Outlined variant"
      />
      
      {/* With sizes */}
      <Textarea
        id="small-textarea"
        name="small-textarea"
        size={TEXTAREA_SIZES.SMALL}
        label="Small Textarea"
        placeholder="Small size"
      />
      <Textarea
        id="medium-textarea"
        name="medium-textarea"
        size={TEXTAREA_SIZES.MEDIUM}
        label="Medium Textarea"
        placeholder="Medium size"
      />
      <Textarea
        id="large-textarea"
        name="large-textarea"
        size={TEXTAREA_SIZES.LARGE}
        label="Large Textarea"
        placeholder="Large size"
      />
      
      {/* With states */}
      <Textarea
        id="default-state-textarea"
        name="default-state-textarea"
        state={TEXTAREA_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
        placeholder="Default state"
      />
      <Textarea
        id="success-state-textarea"
        name="success-state-textarea"
        state={TEXTAREA_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
        placeholder="Success state"
      />
      <Textarea
        id="error-state-textarea"
        name="error-state-textarea"
        state={TEXTAREA_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
        placeholder="Error state"
      />
      <Textarea
        id="warning-state-textarea"
        name="warning-state-textarea"
        state={TEXTAREA_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
        placeholder="Warning state"
      />
      
      {/* Disabled */}
      <Textarea
        id="disabled-textarea"
        name="disabled-textarea"
        disabled
        label="Disabled Textarea"
        placeholder="Disabled state"
      />
      
      {/* Read-only */}
      <Textarea
        id="readonly-textarea"
        name="readonly-textarea"
        readOnly
        label="Read-only Textarea"
        value="This textarea is read-only"
      />
      
      {/* Auto-resize */}
      <Textarea
        id="auto-resize-textarea"
        name="auto-resize-textarea"
        label="Auto-resize Textarea"
        placeholder="Type here to see auto-resize in action..."
        autoResize
        minRows={2}
        maxRows={8}
        helperText="This textarea will automatically resize as you type"
      />
      
      {/* Character count */}
      <Textarea
        id="char-count-textarea"
        name="char-count-textarea"
        label="Character Count Textarea"
        placeholder="Type here to see character count..."
        maxLength={100}
        helperText="Maximum 100 characters"
      />
      
      {/* Full width */}
      <Textarea
        id="full-width-textarea"
        name="full-width-textarea"
        label="Full Width Textarea"
        placeholder="This textarea takes up the full width"
        fullWidth
      />
    </div>
  );
}
```

### Toast

The Toast component is used for displaying temporary notifications to users. It comes with a ToastProvider, ToastContainer, and a ToastService utility for managing toasts.

#### Import

```jsx
import { ToastProvider, TOAST_VARIANTS, TOAST_POSITIONS } from './design-system/components';
import { useToast, toastService } from './design-system/utilities';
```

#### Props

##### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `TOAST_POSITIONS.BOTTOM_RIGHT` | Position of the toast container |
| `maxToasts` | `number` | `3` | Maximum number of toasts to display at once |
| `children` | `ReactNode` | - | Children to render |

##### Toast Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `TOAST_VARIANTS.DEFAULT` | Toast variant |
| `position` | `string` | `TOAST_POSITIONS.BOTTOM_RIGHT` | Position of the toast |
| `duration` | `number` | `3000` | Duration in milliseconds before the toast is automatically closed |
| `showCloseButton` | `boolean` | `true` | Whether to show the close button |
| `icon` | `ReactNode` | - | Icon to display in the toast |
| `content` | `ReactNode` | - | Content of the toast |
| `onClose` | `function` | - | Callback when the toast is closed |

#### Variants

The Toast component supports the following variants:

- `TOAST_VARIANTS.DEFAULT`: Default toast style
- `TOAST_VARIANTS.SUCCESS`: Success toast style
- `TOAST_VARIANTS.ERROR`: Error toast style
- `TOAST_VARIANTS.WARNING`: Warning toast style
- `TOAST_VARIANTS.INFO`: Info toast style

#### Positions

The Toast component supports the following positions:

- `TOAST_POSITIONS.TOP_LEFT`: Top left position
- `TOAST_POSITIONS.TOP_CENTER`: Top center position
- `TOAST_POSITIONS.TOP_RIGHT`: Top right position
- `TOAST_POSITIONS.BOTTOM_LEFT`: Bottom left position
- `TOAST_POSITIONS.BOTTOM_CENTER`: Bottom center position
- `TOAST_POSITIONS.BOTTOM_RIGHT`: Bottom right position

#### Examples

##### Setting up Toast Provider

First, wrap your application with the ToastProvider:

```jsx
import { ToastProvider } from './design-system/components';

function App() {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      <YourApp />
    </ToastProvider>
  );
}
```

##### Using the useToast Hook

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

##### Using the Toast Service Directly

You can also use the toastService directly, which is useful for showing toasts from non-React code:

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

## Best Practices

Here are some best practices for using the design system components:

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
