/**
 * Notifications Component
 * 
 * This component displays a dropdown of notifications when the notification
 * bell icon is clicked in the app bar.
 */

import React from 'react';
import { Menu, MenuItem, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

// Mock notification data (this would come from your backend/state management in a real app)
const mockNotifications = [
  {
    id: 1,
    type: 'comment',
    message: 'Alex Chen commented on your post',
    time: '10 minutes ago',
    read: false,
    link: '#'
  },
  {
    id: 2,
    type: 'like',
    message: 'Maya Patel liked your article on mindfulness',
    time: '2 hours ago',
    read: false,
    link: '#'
  },
  {
    id: 3,
    type: 'mention',
    message: 'Jordan Kim mentioned you in a discussion',
    time: 'Yesterday',
    read: true,
    link: '#'
  }
];

const Notifications = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState(mockNotifications);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationSettings = () => {
    handleClose();
    navigate('/settings');
  };
  
  const handleNotificationItemClick = (id) => {
    // Mark notification as read
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    // In a real app, you would navigate to the appropriate page
    // based on the notification type and link
    handleClose();
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="notifications"
        onClick={handleNotificationClick}
        className="notification-button"
      >
        <NotificationsIcon />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </IconButton>
      
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="notification-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="notification-header">
          <h3>Notifications</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {unreadCount > 0 && (
              <IconButton size="small" onClick={markAllAsRead}>
                <NotificationsNoneIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" onClick={handleNotificationSettings}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        
        <div className="notification-list">
          {notifications.length === 0 ? (
            <MenuItem disabled>
              <div style={{ textAlign: 'center', width: '100%', padding: '20px 0' }}>
                No notifications
              </div>
            </MenuItem>
          ) : (
            notifications.map(notification => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationItemClick(notification.id)}
                className={`notification-item ${!notification.read ? 'notification-item-unread' : ''}`}
                style={{ paddingLeft: !notification.read ? '24px' : '20px' }}
              >
                <div style={{ width: '100%' }}>
                  <div style={{ fontWeight: !notification.read ? 500 : 400 }}>
                    {notification.message}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'rgb(100, 116, 139)', 
                    marginTop: '4px' 
                  }}>
                    {notification.time}
                  </div>
                </div>
              </MenuItem>
            ))
          )}
        </div>
        
        <div className="notification-footer">
          <a href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
            View all notifications
          </a>
        </div>
      </Menu>
    </>
  );
};

export default Notifications;
