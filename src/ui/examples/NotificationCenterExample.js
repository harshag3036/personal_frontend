/**
 * NotificationCenter Example
 * 
 * This example demonstrates how to use the NotificationCenter component
 * with various configurations and features.
 */

import React, { useState, useCallback, useEffect } from 'react';
import NotificationCenter, { 
  NOTIFICATION_TYPES, 
  NOTIFICATION_STATES 
} from '../organisms/NotificationCenter';
import { Button, Text } from '../atoms';
import { Flex, Stack } from '../atoms';

// Sample notifications data
const initialNotifications = [
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

const NotificationCenterExample = () => {
  // State for notifications
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('md');
  const [withGroups, setWithGroups] = useState(false);
  const [withFilters, setWithFilters] = useState(true);
  const [withSearch, setWithSearch] = useState(false);
  
  // Handler for marking a notification as read
  const handleMarkAsRead = useCallback((id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, state: NOTIFICATION_STATES.READ }
          : notification
      )
    );
  }, []);
  
  // Handler for marking all notifications as read
  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        state: NOTIFICATION_STATES.READ
      }))
    );
  }, []);
  
  // Handler for dismissing a notification
  const handleDismiss = useCallback((id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }, []);
  
  // Handler for clearing all notifications
  const handleClearAll = useCallback(() => {
    setNotifications([]);
  }, []);
  
  // Handler for pinning/unpinning a notification
  const handlePin = useCallback((id, shouldPin) => {
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
  }, []);
  
  // Handler for notification click
  const handleNotificationClick = useCallback((e, notification) => {
    console.log('Notification clicked:', notification);
  }, []);
  
  // Handler for adding a new notification
  const handleAddNotification = useCallback(() => {
    const types = Object.values(NOTIFICATION_TYPES);
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const newNotification = {
      id: Date.now(),
      title: `New ${randomType} notification`,
      message: `This is a new ${randomType} notification added at ${new Date().toLocaleTimeString()}.`,
      time: 'Just now',
      date: new Date(),
      type: randomType,
      state: NOTIFICATION_STATES.UNREAD,
      actions: ['markAsRead', 'dismiss', 'pin']
    };
    
    setNotifications(prevNotifications => [
      newNotification,
      ...prevNotifications
    ]);
  }, []);
  
  // Simulate loading
  const handleSimulateLoading = useCallback(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  // Simulate error
  const handleSimulateError = useCallback(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      setLoading(false);
      setError('Failed to load notifications. Please try again later.');
    }, 2000);
  }, []);
  
  // Reset notifications
  const handleResetNotifications = useCallback(() => {
    setNotifications(initialNotifications);
    setLoading(false);
    setError(null);
  }, []);
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Stack spacing="lg">
        <Text variant="h1">NotificationCenter Example</Text>
        
        <Text variant="h2">Controls</Text>
        
        <Flex gap="md" wrap="wrap">
          <Button onClick={handleAddNotification}>Add Notification</Button>
          <Button onClick={handleSimulateLoading}>Simulate Loading</Button>
          <Button onClick={handleSimulateError}>Simulate Error</Button>
          <Button onClick={handleResetNotifications}>Reset</Button>
        </Flex>
        
        <Flex gap="md" wrap="wrap">
          <div>
            <Text variant="h6">Variant</Text>
            <Flex gap="sm">
              {['default', 'compact', 'expanded', 'inline', 'dropdown'].map(v => (
                <Button 
                  key={v} 
                  variant={variant === v ? 'primary' : 'secondary'}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </Button>
              ))}
            </Flex>
          </div>
          
          <div>
            <Text variant="h6">Size</Text>
            <Flex gap="sm">
              {['sm', 'md', 'lg'].map(s => (
                <Button 
                  key={s} 
                  variant={size === s ? 'primary' : 'secondary'}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </Flex>
          </div>
          
          <div>
            <Text variant="h6">Features</Text>
            <Flex gap="sm">
              <Button 
                variant={withGroups ? 'primary' : 'secondary'}
                onClick={() => setWithGroups(!withGroups)}
              >
                {withGroups ? 'With Groups' : 'Without Groups'}
              </Button>
              
              <Button 
                variant={withFilters ? 'primary' : 'secondary'}
                onClick={() => setWithFilters(!withFilters)}
              >
                {withFilters ? 'With Filters' : 'Without Filters'}
              </Button>
              
              <Button 
                variant={withSearch ? 'primary' : 'secondary'}
                onClick={() => setWithSearch(!withSearch)}
              >
                {withSearch ? 'With Search' : 'Without Search'}
              </Button>
            </Flex>
          </div>
        </Flex>
        
        <Text variant="h2">NotificationCenter</Text>
        
        <div style={{ 
          border: '1px solid var(--color-border)', 
          borderRadius: 'var(--border-radius-md)',
          padding: '20px',
          backgroundColor: 'var(--color-background-light)'
        }}>
          <NotificationCenter
            notifications={notifications}
            loading={loading}
            error={error}
            variant={variant}
            size={size}
            withBorder
            withShadow
            withHeader
            withFooter
            withFilters={withFilters}
            withSearch={withSearch}
            withActions
            withCounter
            withGroups={withGroups}
            onNotificationClick={handleNotificationClick}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDismiss={handleDismiss}
            onClearAll={handleClearAll}
            onPin={handlePin}
            onViewAll={() => console.log('View all clicked')}
          />
        </div>
        
        <Text variant="h2">Customized NotificationCenter</Text>
        
        <div style={{ 
          border: '1px solid var(--color-border)', 
          borderRadius: 'var(--border-radius-md)',
          padding: '20px',
          backgroundColor: 'var(--color-background-light)'
        }}>
          <NotificationCenter
            notifications={notifications}
            variant="default"
            size="md"
            withBorder
            withShadow
            withHeader
            withFooter
            withActions
            withCounter
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
      </Stack>
    </div>
  );
};

export default NotificationCenterExample;
