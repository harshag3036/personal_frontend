/**
 * ToastProvider Component Stories
 */

import React from 'react';
import { ToastProvider } from './index';
import { TOAST_POSITIONS, TOAST_VARIANTS } from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';

// Note: In a real Storybook environment, we would need to set up a proper
// context provider for the useToast hook. For simplicity in this example,
// we're just showing the component structure.

export default {
  title: 'Molecules/ToastProvider',
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component: 'A provider component that renders the ToastContainer and provides toast functionality.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Child components',
      table: {
        type: { summary: 'node' },
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
    position: {
      control: 'select',
      options: Object.values(TOAST_POSITIONS),
      description: 'Default position for toasts',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom-right' },
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
  },
};

// Basic ToastProvider
export const Basic = {
  args: {
    children: <div>Your application content goes here</div>,
  },
};

// ToastProvider with Position
export const WithPosition = {
  args: {
    children: <div>Your application content goes here</div>,
    position: TOAST_POSITIONS.TOP_RIGHT,
  },
};

// ToastProvider with Max Toasts
export const WithMaxToasts = {
  args: {
    children: <div>Your application content goes here</div>,
    maxToasts: 3,
  },
};

// Polymorphic ToastProvider
export const PolymorphicToastProvider = {
  args: {
    children: <div>Your application content goes here</div>,
    as: 'section',
  },
};

// ToastProvider Usage Example
export const UsageExample = () => {
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">ToastProvider Usage Example</Text>
        <Text marginBottom="md">
          In a real application, you would wrap your app with the ToastProvider and use the useToast hook to show toasts.
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
  
  const handleShowSuccessToast = () => {
    success('Operation completed successfully!');
  };
  
  const handleShowErrorToast = () => {
    error('An error occurred. Please try again.');
  };
  
  const handleShowWarningToast = () => {
    warning('Please review your input before continuing.');
  };
  
  const handleShowInfoToast = () => {
    info('Your session will expire in 5 minutes.');
  };
  
  return (
    <div>
      <button onClick={handleShowToast}>Show Toast</button>
      <button onClick={handleShowSuccessToast}>Show Success Toast</button>
      <button onClick={handleShowErrorToast}>Show Error Toast</button>
      <button onClick={handleShowWarningToast}>Show Warning Toast</button>
      <button onClick={handleShowInfoToast}>Show Info Toast</button>
    </div>
  );
};`}
        </pre>
      </Box>
      
      <Box>
        <Text variant="h4" marginBottom="md">Polymorphic Rendering</Text>
        <Text marginBottom="md">
          The ToastProvider component supports polymorphic rendering, which means you can render it as any HTML element:
        </Text>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '4px',
          overflow: 'auto',
        }}>
{`// Render as a section element
<ToastProvider as="section">
  {/* Your app content */}
</ToastProvider>

// Render as an article element
<ToastProvider as="article">
  {/* Your app content */}
</ToastProvider>

// The "as" prop is passed to the ToastContainer
// This allows you to control the HTML element used for the toast container`}
        </pre>
      </Box>
    </Stack>
  );
};
