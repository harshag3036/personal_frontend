/**
 * NotificationCenter Component Stories
 * 
 * This file contains stories for the NotificationCenter component.
 */

import React, { useState } from 'react';
import NotificationCenter, { 
  NOTIFICATION_TYPES, 
  NOTIFICATION_STATES 
} from './index';

export default {
  title: 'Organisms/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    docs: {
      description: {
        component: 'A notification center component for displaying and managing notifications with various layouts and features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'expanded', 'inline', 'dropdown'],
      description: 'The visual variant of the notification center'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the notification center'
    },
    withBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the notification center'
    },
    withShadow: {
      control: 'boolean',
      description: 'Whether to show a shadow around the notification center'
    },
    withHeader: {
      control: 'boolean',
      description: 'Whether to show the header section'
    },
    withFooter: {
      control: 'boolean',
      description: 'Whether to show the footer section'
    },
    withFilters: {
      control: 'boolean',
      description: 'Whether to show the filters section'
    },
    withSearch: {
      control: 'boolean',
      description: 'Whether to show the search section'
    },
    withActions: {
      control: 'boolean',
      description: 'Whether to show action buttons in the footer'
    },
    withCounter: {
      control: 'boolean',
      description: 'Whether to show the unread counter in the header'
    },
    withGroups: {
      control: 'boolean',
      description: 'Whether to group notifications'
    },
    withTabs: {
      control: 'boolean',
      description: 'Whether to show tabs for different notification categories'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the notification center is in a loading state'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    title: {
      control: 'text',
      description: 'The title of the notification center'
    },
    markAllAsReadText: {
      control: 'text',
      description: 'Text for the "Mark all as read" button'
    },
    clearAllText: {
      control: 'text',
      description: 'Text for the "Clear all" button'
    },
    viewAllText: {
      control: 'text',
      description: 'Text for the "View all" button'
    },
    emptyText: {
      control: 'text',
      description: 'Text to display when there are no notifications'
    },
    loadingText: {
      control: 'text',
      description: 'Text to display when loading notifications'
    },
    errorText: {
      control: 'text',
      description: 'Text to display when there is an error'
    }
  }
};

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    title: 'System Update',
    message: 'A new system update is available. Please restart your device to install it.',
    time: '2 minutes ago',
    date: new Date(Date.now() - 2 * 60 * 1000),
    type: NOTIFICATION_TYPES.SYSTEM,
    state: NOTIFICATION_STATES.UNREAD,
    actions: ['markAsRead', 'dismiss', 'pin']
  },
  {
    id: 2,
    title: 'Welcome to the platform',
    message: 'Thank you for joining our platform. We hope you enjoy your experience!',
    time: '1 hour ago',
    date: new Date(Date.now() - 60 * 60 * 1000),
    type: NOTIFICATION_TYPES.INFO,
    state: NOTIFICATION_STATES.READ,
    actions: ['dismiss', 'pin']
  },
  {
    id: 3,
    title: 'Payment Successful',
    message: 'Your payment of $49.99 has been processed successfully.',
    time: 'Yesterday',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: NOTIFICATION_TYPES.SUCCESS,
    state: NOTIFICATION_STATES.UNREAD,
    actions: ['markAsRead', 'dismiss']
  },
  {
    id: 4,
    title: 'Security Alert',
    message: 'We detected a login attempt from a new device. Please verify if it was you.',
    time: '2 days ago',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: NOTIFICATION_TYPES.WARNING,
    state: NOTIFICATION_STATES.PINNED,
    actions: ['dismiss', 'pin']
  },
  {
    id: 5,
    title: 'Payment Failed',
    message: 'Your recent payment attempt failed. Please update your payment method.',
    time: '3 days ago',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    type: NOTIFICATION_TYPES.ERROR,
    state: NOTIFICATION_STATES.UNREAD,
    actions: ['markAsRead', 'dismiss']
  }
];

// Template for the stories
const Template = (args) => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  
  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, state: NOTIFICATION_STATES.READ }
          : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        state: NOTIFICATION_STATES.READ
      }))
    );
  };
  
  const handleDismiss = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handlePin = (id, shouldPin) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? {
              ...notification,
              state: shouldPin
                ? NOTIFICATION_STATES.PINNED
                : NOTIFICATION_STATES.READ
            }
          : notification
      )
    );
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <NotificationCenter
        {...args}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDismiss={handleDismiss}
        onClearAll={handleClearAll}
        onPin={handlePin}
        onViewAll={() => console.log('View all clicked')}
      />
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  size: 'md',
  withBorder: true,
  withShadow: true,
  withHeader: true,
  withFooter: true,
  withFilters: true,
  withSearch: false,
  withActions: true,
  withCounter: true,
  withGroups: false,
  withTabs: false,
  loading: false,
  error: null,
  title: 'Notifications',
  markAllAsReadText: 'Mark all as read',
  clearAllText: 'Clear all',
  viewAllText: 'View all',
  emptyText: 'No notifications',
  loadingText: 'Loading notifications...',
  errorText: 'Failed to load notifications'
};

// Compact variant
export const Compact = Template.bind({});
Compact.args = {
  ...Default.args,
  variant: 'compact',
  size: 'sm',
  withFilters: false
};

// Expanded variant
export const Expanded = Template.bind({});
Expanded.args = {
  ...Default.args,
  variant: 'expanded',
  size: 'lg',
  withSearch: true,
  withGroups: true
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true
};

// Error state
export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: 'Failed to load notifications. Please try again later.'
};

// Empty state
export const Empty = Template.bind({});
Empty.args = {
  ...Default.args,
  notifications: []
};

// With custom components
export const CustomComponents = (args) => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  
  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, state: NOTIFICATION_STATES.READ }
          : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        state: NOTIFICATION_STATES.READ
      }))
    );
  };
  
  const handleDismiss = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handlePin = (id, shouldPin) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? {
              ...notification,
              state: shouldPin
                ? NOTIFICATION_STATES.PINNED
                : NOTIFICATION_STATES.READ
            }
          : notification
      )
    );
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <NotificationCenter
        variant="default"
        size="md"
        withBorder
        withShadow
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDismiss={handleDismiss}
        onClearAll={handleClearAll}
        onPin={handlePin}
      >
        <NotificationCenter.Header title="Custom Notifications" unreadCount={notifications.filter(n => n.state === NOTIFICATION_STATES.UNREAD).length} />
        
        {notifications.length > 0 ? (
          <NotificationCenter.List>
            {notifications.map(notification => (
              <NotificationCenter.Item
                key={notification.id}
                id={notification.id}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                type={notification.type}
                state={notification.state}
                actions={notification.actions}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
                onPin={handlePin}
              />
            ))}
          </NotificationCenter.List>
        ) : (
          <NotificationCenter.Empty 
            title="No notifications" 
            message="You don't have any notifications at the moment."
          />
        )}
        
        <NotificationCenter.Footer>
          <NotificationCenter.Actions>
            {notifications.filter(n => n.state === NOTIFICATION_STATES.UNREAD).length > 0 && (
              <NotificationCenter.Action onClick={handleMarkAllAsRead}>
                Mark all as read
              </NotificationCenter.Action>
            )}
            {notifications.length > 0 && (
              <NotificationCenter.Action onClick={handleClearAll}>
                Clear all
              </NotificationCenter.Action>
            )}
          </NotificationCenter.Actions>
        </NotificationCenter.Footer>
      </NotificationCenter>
    </div>
  );
};
