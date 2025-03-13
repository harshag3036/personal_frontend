/**
 * NotificationCenter Component Tests
 * 
 * This file contains tests for the NotificationCenter component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationCenter, { NOTIFICATION_TYPES, NOTIFICATION_STATES } from './index';

// Sample notifications for testing
const mockNotifications = [
  {
    id: 1,
    title: 'Test Notification 1',
    message: 'This is a test notification message',
    time: '5 minutes ago',
    type: NOTIFICATION_TYPES.INFO,
    state: NOTIFICATION_STATES.UNREAD
  },
  {
    id: 2,
    title: 'Test Notification 2',
    message: 'This is another test notification message',
    time: '1 hour ago',
    type: NOTIFICATION_TYPES.SUCCESS,
    state: NOTIFICATION_STATES.READ
  }
];

describe('NotificationCenter', () => {
  test('renders without crashing', () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders notifications correctly', () => {
    render(<NotificationCenter notifications={mockNotifications} />);
    
    expect(screen.getByText('Test Notification 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification message')).toBeInTheDocument();
    expect(screen.getByText('Test Notification 2')).toBeInTheDocument();
    expect(screen.getByText('This is another test notification message')).toBeInTheDocument();
  });

  test('renders empty state when no notifications', () => {
    render(<NotificationCenter notifications={[]} />);
    
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(<NotificationCenter notifications={[]} loading={true} />);
    
    expect(screen.getByText('Loading notifications...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(<NotificationCenter notifications={[]} error="Test error message" />);
    
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  test('calls onMarkAsRead when mark as read button is clicked', () => {
    const handleMarkAsRead = jest.fn();
    
    render(
      <NotificationCenter 
        notifications={[{
          id: 1,
          title: 'Unread Notification',
          message: 'This is an unread notification',
          time: 'Just now',
          type: NOTIFICATION_TYPES.INFO,
          state: NOTIFICATION_STATES.UNREAD,
          actions: ['markAsRead']
        }]} 
        onMarkAsRead={handleMarkAsRead}
      />
    );
    
    const markAsReadButton = screen.getByLabelText('Mark as read');
    fireEvent.click(markAsReadButton);
    
    expect(handleMarkAsRead).toHaveBeenCalledWith(1);
  });

  test('calls onDismiss when dismiss button is clicked', () => {
    const handleDismiss = jest.fn();
    
    render(
      <NotificationCenter 
        notifications={[{
          id: 1,
          title: 'Dismissible Notification',
          message: 'This is a dismissible notification',
          time: 'Just now',
          type: NOTIFICATION_TYPES.INFO,
          state: NOTIFICATION_STATES.UNREAD,
          actions: ['dismiss']
        }]} 
        onDismiss={handleDismiss}
      />
    );
    
    const dismissButton = screen.getByLabelText('Dismiss');
    fireEvent.click(dismissButton);
    
    expect(handleDismiss).toHaveBeenCalledWith(1);
  });

  test('calls onMarkAllAsRead when mark all as read button is clicked', () => {
    const handleMarkAllAsRead = jest.fn();
    
    render(
      <NotificationCenter 
        notifications={[{
          id: 1,
          title: 'Unread Notification',
          message: 'This is an unread notification',
          time: 'Just now',
          type: NOTIFICATION_TYPES.INFO,
          state: NOTIFICATION_STATES.UNREAD
        }]} 
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    );
    
    const markAllAsReadButton = screen.getByText('Mark all as read');
    fireEvent.click(markAllAsReadButton);
    
    expect(handleMarkAllAsRead).toHaveBeenCalled();
  });

  test('calls onClearAll when clear all button is clicked', () => {
    const handleClearAll = jest.fn();
    
    render(
      <NotificationCenter 
        notifications={mockNotifications} 
        onClearAll={handleClearAll}
      />
    );
    
    const clearAllButton = screen.getByText('Clear all');
    fireEvent.click(clearAllButton);
    
    expect(handleClearAll).toHaveBeenCalled();
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <NotificationCenter 
        notifications={[]} 
        variant="default"
      />
    );
    
    expect(screen.getByRole('region')).toHaveClass('ui-notification-center--default');
    
    rerender(
      <NotificationCenter 
        notifications={[]} 
        variant="compact"
      />
    );
    
    expect(screen.getByRole('region')).toHaveClass('ui-notification-center--compact');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <NotificationCenter 
        notifications={[]} 
        size="sm"
      />
    );
    
    expect(screen.getByRole('region')).toHaveClass('ui-notification-center--sm');
    
    rerender(
      <NotificationCenter 
        notifications={[]} 
        size="lg"
      />
    );
    
    expect(screen.getByRole('region')).toHaveClass('ui-notification-center--lg');
  });

  test('renders with custom components', () => {
    render(
      <NotificationCenter>
        <NotificationCenter.Header title="Custom Header" />
        <NotificationCenter.Empty title="Custom Empty State" message="No notifications to display" />
        <NotificationCenter.Footer>
          <NotificationCenter.Action>Custom Action</NotificationCenter.Action>
        </NotificationCenter.Footer>
      </NotificationCenter>
    );
    
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
    expect(screen.getByText('Custom Empty State')).toBeInTheDocument();
    expect(screen.getByText('No notifications to display')).toBeInTheDocument();
    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });
});
