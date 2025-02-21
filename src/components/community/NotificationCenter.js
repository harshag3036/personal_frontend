import React, { useState } from 'react';
import './NotificationCenter.css';

/**
 * NotificationCenter Component
 * Manages activity-related notifications and updates
 * Supports different notification types and user preferences
 */
const NotificationCenter = ({ activity, onUpdateActivity }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    discussions: true,
    milestones: true,
    participants: true,
    reminders: true,
    email: true,
    push: false
  });
  const [error, setError] = useState(null);

  const notificationTypes = {
    discussion: {
      icon: '💬',
      color: '#2196f3'
    },
    milestone: {
      icon: '🎯',
      color: '#4caf50'
    },
    participant: {
      icon: '👥',
      color: '#ff9800'
    },
    reminder: {
      icon: '⏰',
      color: '#9c27b0'
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedActivity = {
        ...activity,
        metadata: {
          ...activity.metadata,
          notificationSettings: settings
        }
      };
      await onUpdateActivity(updatedActivity);
      setShowSettings(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleClearNotification = async (notificationId) => {
    try {
      const updatedActivity = {
        ...activity,
        notifications: activity.notifications.filter(n => n.id !== notificationId)
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      const updatedActivity = {
        ...activity,
        notifications: []
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <div className="header-content">
          <h2>Notifications</h2>
          {activity.notifications?.length > 0 && (
            <span className="notification-count">
              {activity.notifications.length}
            </span>
          )}
        </div>
        <div className="header-actions">
          {activity.notifications?.length > 0 && (
            <button
              className="clear-all-button"
              onClick={handleClearAllNotifications}
            >
              Clear All
            </button>
          )}
          <button
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
          >
            Settings
          </button>
        </div>
      </div>

      {showSettings ? (
        <form onSubmit={handleUpdateSettings} className="settings-form">
          <div className="settings-section">
            <h3>Notification Types</h3>
            <div className="settings-grid">
              <label className="setting-item">
                <input
                  type="checkbox"
                  checked={settings.discussions}
                  onChange={() => handleToggleSetting('discussions')}
                />
                <span>Discussions</span>
              </label>
              <label className="setting-item">
                <input
                  type="checkbox"
                  checked={settings.milestones}
                  onChange={() => handleToggleSetting('milestones')}
                />
                <span>Milestones</span>
              </label>
              <label className="setting-item">
                <input
                  type="checkbox"
                  checked={settings.participants}
                  onChange={() => handleToggleSetting('participants')}
                />
                <span>Participants</span>
              </label>
              <label className="setting-item">
                <input
                  type="checkbox"
                  checked={settings.reminders}
                  onChange={() => handleToggleSetting('reminders')}
                />
                <span>Reminders</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Delivery Methods</h3>
            <div className="settings-grid">
              <label className="setting-item">
                <input
                  type="checkbox"
                  checked={settings.email}
                  onChange={() => handleToggleSetting('email')}
                />
                <span>Email</span>
              </label>
              <label className="setting-item">
                <input
                  type="checkbox"
                  checked={settings.push}
                  onChange={() => handleToggleSetting('push')}
                />
                <span>Push Notifications</span>
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Settings
            </button>
          </div>
        </form>
      ) : (
        <div className="notifications-list">
          {activity.notifications?.length > 0 ? (
            activity.notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.type}`}
              >
                <div className="notification-icon" style={{ backgroundColor: notificationTypes[notification.type]?.color }}>
                  {notificationTypes[notification.type]?.icon}
                </div>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                </div>
                <button
                  className="clear-button"
                  onClick={() => handleClearNotification(notification.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No notifications</p>
              <p>You're all caught up!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
