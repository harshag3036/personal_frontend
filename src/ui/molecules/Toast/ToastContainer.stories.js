/**
 * ToastContainer Component Stories
 */

import React, { useState } from 'react';
import { ToastContainer } from './index';
import { 
  TOAST_POSITIONS, 
  TOAST_VARIANTS, 
  TOAST_CONTAINER_CLASS, 
  TOAST_GROUP_CLASS 
} from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';

export default {
  title: 'Molecules/ToastContainer',
  component: ToastContainer,
  parameters: {
    docs: {
      description: {
        component: 'A container for managing multiple Toast components with support for responsive props.',
      },
    },
  },
  argTypes: {
    toasts: {
      control: 'object',
      description: 'Array of toast objects to display',
      table: {
        type: { summary: 'Array<Object>' },
        defaultValue: { summary: '[]' },
      },
    },
    position: {
      control: 'select',
      options: Object.values(TOAST_POSITIONS),
      description: 'Default position for toasts or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'bottom-right' },
      },
    },
    onRemove: {
      action: 'removed',
      description: 'Callback when a toast is removed',
      table: {
        type: { summary: 'function' },
      },
    },
    maxToasts: {
      control: 'number',
      description: 'Maximum number of toasts to display at once',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the ToastContainer as',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

// Basic ToastContainer
export const Basic = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'This is a basic toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
    ],
  },
};

// ToastContainer with Multiple Toasts
export const MultipleToasts = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'Success toast notification',
        variant: TOAST_VARIANTS.SUCCESS,
        duration: 0,
      },
      {
        id: 'toast-2',
        content: 'Error toast notification',
        variant: TOAST_VARIANTS.ERROR,
        duration: 0,
      },
      {
        id: 'toast-3',
        content: 'Warning toast notification',
        variant: TOAST_VARIANTS.WARNING,
        duration: 0,
      },
      {
        id: 'toast-4',
        content: 'Info toast notification',
        variant: TOAST_VARIANTS.INFO,
        duration: 0,
      },
    ],
  },
};

// ToastContainer with Different Positions
export const DifferentPositions = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'Top left toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        position: TOAST_POSITIONS.TOP_LEFT,
        duration: 0,
      },
      {
        id: 'toast-2',
        content: 'Top center toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        position: TOAST_POSITIONS.TOP_CENTER,
        duration: 0,
      },
      {
        id: 'toast-3',
        content: 'Top right toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        position: TOAST_POSITIONS.TOP_RIGHT,
        duration: 0,
      },
      {
        id: 'toast-4',
        content: 'Bottom left toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        position: TOAST_POSITIONS.BOTTOM_LEFT,
        duration: 0,
      },
      {
        id: 'toast-5',
        content: 'Bottom center toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        position: TOAST_POSITIONS.BOTTOM_CENTER,
        duration: 0,
      },
      {
        id: 'toast-6',
        content: 'Bottom right toast notification',
        variant: TOAST_VARIANTS.DEFAULT,
        position: TOAST_POSITIONS.BOTTOM_RIGHT,
        duration: 0,
      },
    ],
  },
};

// ToastContainer with Default Position
export const DefaultPosition = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'This toast uses the container\'s default position',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
    ],
    position: TOAST_POSITIONS.TOP_CENTER,
  },
};

// ToastContainer with Max Toasts
export const MaxToasts = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'Toast 1',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
      {
        id: 'toast-2',
        content: 'Toast 2',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
      {
        id: 'toast-3',
        content: 'Toast 3',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
      {
        id: 'toast-4',
        content: 'Toast 4 (not shown due to maxToasts)',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
      {
        id: 'toast-5',
        content: 'Toast 5 (not shown due to maxToasts)',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
    ],
    maxToasts: 3,
  },
};

// ToastContainer with Icons
export const WithIcons = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'Success toast with icon',
        variant: TOAST_VARIANTS.SUCCESS,
        duration: 0,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'toast-2',
        content: 'Error toast with icon',
        variant: TOAST_VARIANTS.ERROR,
        duration: 0,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'toast-3',
        content: 'Info toast with icon',
        variant: TOAST_VARIANTS.INFO,
        duration: 0,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
    ],
  },
};

// ToastContainer with Auto-dismiss
export const WithAutoDismiss = () => {
  const [toasts, setToasts] = useState([]);
  const [duration, setDuration] = useState(3000);
  
  const addToast = () => {
    const id = Date.now().toString();
    const newToast = {
      id,
      content: `This toast will auto-dismiss after ${duration / 1000} seconds`,
      variant: TOAST_VARIANTS.INFO,
      duration,
    };
    
    setToasts((prev) => [newToast, ...prev]);
  };
  
  const handleRemove = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Auto-dismiss Toasts</Text>
        <Stack direction="row" spacing="md">
          <Button onClick={addToast} variant="primary">Add Toast</Button>
          <select 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value={1000}>1 second</option>
            <option value={3000}>3 seconds</option>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
          </select>
        </Stack>
      </Box>
      
      <Box>
        <Text variant="h4" marginBottom="md">Toast Container</Text>
        <div style={{ 
          position: 'relative', 
          border: '1px dashed #ccc', 
          padding: '16px', 
          minHeight: '200px',
          borderRadius: '4px',
        }}>
          <ToastContainer toasts={toasts} onRemove={handleRemove} />
        </div>
      </Box>
    </Stack>
  );
};

// ToastContainer with Responsive Position
export const ResponsivePosition = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'This toast container changes position at different breakpoints',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
    ],
    position: {
      base: TOAST_POSITIONS.BOTTOM_CENTER,
      md: TOAST_POSITIONS.BOTTOM_RIGHT,
      lg: TOAST_POSITIONS.TOP_RIGHT,
    },
    helperText: 'Resize the window to see the position change',
  },
};

// Polymorphic ToastContainer
export const PolymorphicToastContainer = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'This toast container is rendered as a section element',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
    ],
    as: 'section',
  },
};

// ToastContainer with Custom Styling
export const CustomStyling = {
  args: {
    toasts: [
      {
        id: 'toast-1',
        content: 'This toast container has custom styling',
        variant: TOAST_VARIANTS.DEFAULT,
        duration: 0,
      },
    ],
    style: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
};

// Interactive ToastContainer Example
export const InteractiveExample = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (variant) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      content: `This is a ${variant} toast notification`,
      variant,
      duration: 3000,
    };
    
    setToasts((prev) => [newToast, ...prev]);
  };
  
  const handleRemove = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  const clearToasts = () => {
    setToasts([]);
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Interactive Toast Container Example</Text>
        <Text marginBottom="md">
          Click the buttons below to add toasts to the container.
        </Text>
        <Stack direction="row" spacing="md" marginBottom="md">
          <Button onClick={() => addToast(TOAST_VARIANTS.DEFAULT)} variant="default">Add Default</Button>
          <Button onClick={() => addToast(TOAST_VARIANTS.SUCCESS)} variant="success">Add Success</Button>
          <Button onClick={() => addToast(TOAST_VARIANTS.ERROR)} variant="error">Add Error</Button>
          <Button onClick={() => addToast(TOAST_VARIANTS.WARNING)} variant="warning">Add Warning</Button>
          <Button onClick={() => addToast(TOAST_VARIANTS.INFO)} variant="info">Add Info</Button>
        </Stack>
        <Button onClick={clearToasts} variant="secondary">Clear All</Button>
      </Box>
      
      <Box>
        <Text variant="h4" marginBottom="md">Toast Container</Text>
        <div style={{ 
          position: 'relative', 
          border: '1px dashed #ccc', 
          padding: '16px', 
          minHeight: '200px',
          borderRadius: '4px',
        }}>
          <ToastContainer toasts={toasts} onRemove={handleRemove} />
        </div>
      </Box>
    </Stack>
  );
};

// ToastContainer Usage Example
export const UsageExample = () => {
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">ToastContainer Usage Example</Text>
        <Text marginBottom="md">
          In a real application, you would typically use the ToastContainer with the ToastProvider and ToastService.
          Here's an example of how you would set it up:
        </Text>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '4px',
          overflow: 'auto',
        }}>
{`// In your App.js or layout component
import { ToastProvider } from '../ui';

const App = () => {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      {/* Your app content */}
    </ToastProvider>
  );
};

// In any component where you want to show toasts
import { useToast } from '../ui';

const MyComponent = () => {
  const { show, success, error, warning, info } = useToast();
  
  const handleShowToast = () => {
    show({
      content: 'This is a toast notification',
      variant: 'default',
      duration: 3000,
    });
  };
  
  return (
    <button onClick={handleShowToast}>Show Toast</button>
  );
};`}
        </pre>
      </Box>
    </Stack>
  );
};
