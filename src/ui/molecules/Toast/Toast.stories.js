/**
 * Toast Component Stories
 */

import React, { useState } from 'react';
import Toast, { 
  TOAST_VARIANTS, 
  TOAST_POSITIONS, 
  TOAST_MODIFIERS, 
  TOAST_BREAKPOINTS 
} from './index';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';

export default {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: 'A notification component for displaying temporary messages with support for variants, positions, and responsive props.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Toast content',
      table: {
        type: { summary: 'node' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(TOAST_VARIANTS),
      description: 'Toast variant or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'default' },
      },
    },
    position: {
      control: 'select',
      options: Object.values(TOAST_POSITIONS),
      description: 'Toast position or responsive object',
      table: {
        type: { summary: 'string|object' },
        defaultValue: { summary: 'bottom-right' },
      },
    },
    visible: {
      control: 'boolean',
      description: 'Whether the toast is visible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-dismissing (0 for no auto-dismiss)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when toast is closed',
      table: {
        type: { summary: 'function' },
      },
    },
    icon: {
      control: 'text',
      description: 'Icon to display in the toast',
      table: {
        type: { summary: 'node' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
      description: 'Element to render the Toast as',
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
    extensions: {
      control: 'array',
      description: 'Extensions to apply to the toast',
      table: {
        type: { summary: 'Array<string>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// Basic Toast
export const Basic = {
  args: {
    children: 'This is a basic toast notification',
    visible: true,
  },
};

// Toast Variants
export const Variants = () => {
  const [visibleToasts, setVisibleToasts] = useState({
    default: true,
    success: true,
    error: true,
    warning: true,
    info: true,
  });

  const handleClose = (variant) => {
    setVisibleToasts((prev) => ({
      ...prev,
      [variant]: false,
    }));
  };

  const handleReset = () => {
    setVisibleToasts({
      default: true,
      success: true,
      error: true,
      warning: true,
      info: true,
    });
  };

  return (
    <Stack spacing="lg">
      <Box>
        <Button onClick={handleReset} variant="primary">Reset All Toasts</Button>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Default Variant</Text>
        <Toast 
          variant={TOAST_VARIANTS.DEFAULT} 
          visible={visibleToasts.default} 
          onClose={() => handleClose('default')}
          duration={0}
        >
          This is a default toast notification
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Success Variant</Text>
        <Toast 
          variant={TOAST_VARIANTS.SUCCESS} 
          visible={visibleToasts.success} 
          onClose={() => handleClose('success')}
          duration={0}
        >
          Operation completed successfully!
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Error Variant</Text>
        <Toast 
          variant={TOAST_VARIANTS.ERROR} 
          visible={visibleToasts.error} 
          onClose={() => handleClose('error')}
          duration={0}
        >
          An error occurred. Please try again.
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Warning Variant</Text>
        <Toast 
          variant={TOAST_VARIANTS.WARNING} 
          visible={visibleToasts.warning} 
          onClose={() => handleClose('warning')}
          duration={0}
        >
          Please review your input before continuing.
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Info Variant</Text>
        <Toast 
          variant={TOAST_VARIANTS.INFO} 
          visible={visibleToasts.info} 
          onClose={() => handleClose('info')}
          duration={0}
        >
          Your session will expire in 5 minutes.
        </Toast>
      </Box>
    </Stack>
  );
};

// Toast Positions
export const Positions = () => {
  const [visibleToasts, setVisibleToasts] = useState({
    topLeft: true,
    topCenter: true,
    topRight: true,
    bottomLeft: true,
    bottomCenter: true,
    bottomRight: true,
  });

  const handleClose = (position) => {
    setVisibleToasts((prev) => ({
      ...prev,
      [position]: false,
    }));
  };

  const handleReset = () => {
    setVisibleToasts({
      topLeft: true,
      topCenter: true,
      topRight: true,
      bottomLeft: true,
      bottomCenter: true,
      bottomRight: true,
    });
  };

  return (
    <Stack spacing="lg">
      <Box>
        <Button onClick={handleReset} variant="primary">Reset All Toasts</Button>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Top Left Position</Text>
        <Toast 
          position={TOAST_POSITIONS.TOP_LEFT} 
          visible={visibleToasts.topLeft} 
          onClose={() => handleClose('topLeft')}
          duration={0}
        >
          This toast appears at the top left
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Top Center Position</Text>
        <Toast 
          position={TOAST_POSITIONS.TOP_CENTER} 
          visible={visibleToasts.topCenter} 
          onClose={() => handleClose('topCenter')}
          duration={0}
        >
          This toast appears at the top center
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Top Right Position</Text>
        <Toast 
          position={TOAST_POSITIONS.TOP_RIGHT} 
          visible={visibleToasts.topRight} 
          onClose={() => handleClose('topRight')}
          duration={0}
        >
          This toast appears at the top right
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Bottom Left Position</Text>
        <Toast 
          position={TOAST_POSITIONS.BOTTOM_LEFT} 
          visible={visibleToasts.bottomLeft} 
          onClose={() => handleClose('bottomLeft')}
          duration={0}
        >
          This toast appears at the bottom left
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Bottom Center Position</Text>
        <Toast 
          position={TOAST_POSITIONS.BOTTOM_CENTER} 
          visible={visibleToasts.bottomCenter} 
          onClose={() => handleClose('bottomCenter')}
          duration={0}
        >
          This toast appears at the bottom center
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Bottom Right Position</Text>
        <Toast 
          position={TOAST_POSITIONS.BOTTOM_RIGHT} 
          visible={visibleToasts.bottomRight} 
          onClose={() => handleClose('bottomRight')}
          duration={0}
        >
          This toast appears at the bottom right
        </Toast>
      </Box>
    </Stack>
  );
};

// Toast with Icon
export const WithIcon = () => {
  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Success Toast with Icon</Text>
        <Toast 
          variant={TOAST_VARIANTS.SUCCESS} 
          icon={<SuccessIcon />}
          visible={true}
          duration={0}
        >
          Operation completed successfully!
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Error Toast with Icon</Text>
        <Toast 
          variant={TOAST_VARIANTS.ERROR} 
          icon={<ErrorIcon />}
          visible={true}
          duration={0}
        >
          An error occurred. Please try again.
        </Toast>
      </Box>
      
      <Box>
        <Text variant="h3" marginBottom="md">Info Toast with Icon</Text>
        <Toast 
          variant={TOAST_VARIANTS.INFO} 
          icon={<InfoIcon />}
          visible={true}
          duration={0}
        >
          Your session will expire in 5 minutes.
        </Toast>
      </Box>
    </Stack>
  );
};

// Toast with Auto-dismiss
export const WithAutoDismiss = () => {
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(3000);
  
  const handleClose = () => {
    setVisible(false);
  };
  
  const handleShow = () => {
    setVisible(true);
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Auto-dismiss Toast</Text>
        <Stack direction="row" spacing="md">
          <Button onClick={handleShow} variant="primary">Show Toast</Button>
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
        <Text>
          This toast will auto-dismiss after {duration / 1000} seconds.
        </Text>
        <Toast 
          variant={TOAST_VARIANTS.INFO} 
          visible={visible} 
          onClose={handleClose}
          duration={duration}
        >
          This toast will auto-dismiss after {duration / 1000} seconds
        </Toast>
      </Box>
    </Stack>
  );
};

// Toast without Close Button
export const WithoutCloseButton = {
  args: {
    children: 'This toast doesn\'t have a close button',
    visible: true,
    showCloseButton: false,
    duration: 0,
  },
};

// Responsive Toast
export const ResponsiveToast = {
  args: {
    children: 'This toast changes position at different breakpoints',
    visible: true,
    position: {
      base: TOAST_POSITIONS.BOTTOM_CENTER,
      md: TOAST_POSITIONS.BOTTOM_RIGHT,
      lg: TOAST_POSITIONS.TOP_RIGHT,
    },
    duration: 0,
    helperText: 'Resize the window to see the position change',
  },
};

// Polymorphic Toast
export const PolymorphicToast = {
  args: {
    children: 'This toast is rendered as a section element',
    visible: true,
    as: 'section',
    duration: 0,
  },
};

// Toast with Custom Styling
export const CustomStyling = {
  args: {
    children: 'This toast has custom styling',
    visible: true,
    style: {
      '--color-brand-500': 'purple',
      '--color-brand-600': 'darkpurple',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
    },
    duration: 0,
  },
};

// Toast Container Example
export const ToastContainerExample = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (variant) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      content: `This is a ${variant} toast notification`,
      variant,
      duration: 3000,
      onClose: () => removeToast(id),
    };
    
    setToasts((prev) => [newToast, ...prev]);
  };
  
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  const clearToasts = () => {
    setToasts([]);
  };
  
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Toast Container Example</Text>
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
          <div style={{ 
            position: 'absolute', 
            bottom: '16px', 
            right: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            maxWidth: '300px',
          }}>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                variant={toast.variant}
                visible={true}
                onClose={toast.onClose}
                duration={toast.duration}
              >
                {toast.content}
              </Toast>
            ))}
          </div>
        </div>
      </Box>
    </Stack>
  );
};

// Toast Service Example
export const ToastServiceExample = () => {
  return (
    <Stack spacing="lg">
      <Box>
        <Text variant="h3" marginBottom="md">Toast Service Example</Text>
        <Text marginBottom="md">
          In a real application, you would use the ToastService to show toasts.
          Here's an example of how you would use it:
        </Text>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '4px',
          overflow: 'auto',
        }}>
{`import { useToast } from '../ui';

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
    </Stack>
  );
};
