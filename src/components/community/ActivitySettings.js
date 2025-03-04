import React, { useState } from 'react';
import './ActivitySettings.css';

/**
 * ActivitySettings Component
 * Manages activity configuration and settings
 * Supports privacy, visibility, and access controls
 */
const ActivitySettings = ({ activity, onUpdateActivity }) => {
  const [settings, setSettings] = useState({
    privacy: activity.settings?.privacy || 'public',
    visibility: activity.settings?.visibility || 'visible',
    joinType: activity.settings?.joinType || 'open',
    contentAccess: activity.settings?.contentAccess || 'members',
    notifications: activity.settings?.notifications || 'all',
    moderation: activity.settings?.moderation || 'standard'
  });
  const [error, setError] = useState(null);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedActivity = {
        ...activity,
        settings: {
          ...activity.settings,
          ...settings
        }
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="activity-settings">
      <div className="settings-header">
        <h2>Activity Settings</h2>
      </div>

      <form onSubmit={handleUpdateSettings} className="settings-form">
        <div className="settings-section">
          <h3>Privacy & Visibility</h3>
          
          <div className="form-group">
            <label>Privacy</label>
            <select
              value={settings.privacy}
              onChange={e => setSettings(prev => ({ ...prev, privacy: e.target.value }))}
            >
              <option value="public">Public - Anyone can find this activity</option>
              <option value="unlisted">Unlisted - Only accessible via link</option>
              <option value="private">Private - Only visible to members</option>
            </select>
          </div>

          <div className="form-group">
            <label>Visibility</label>
            <select
              value={settings.visibility}
              onChange={e => setSettings(prev => ({ ...prev, visibility: e.target.value }))}
            >
              <option value="visible">Visible - Show in activity lists</option>
              <option value="hidden">Hidden - Don't show in activity lists</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Access Control</h3>
          
          <div className="form-group">
            <label>Join Type</label>
            <select
              value={settings.joinType}
              onChange={e => setSettings(prev => ({ ...prev, joinType: e.target.value }))}
            >
              <option value="open">Open - Anyone can join</option>
              <option value="request">Request - Must be approved to join</option>
              <option value="invite">Invite Only - Must be invited to join</option>
            </select>
          </div>

          <div className="form-group">
            <label>Content Access</label>
            <select
              value={settings.contentAccess}
              onChange={e => setSettings(prev => ({ ...prev, contentAccess: e.target.value }))}
            >
              <option value="public">Public - Anyone can view content</option>
              <option value="members">Members Only - Only members can view content</option>
              <option value="participants">Participants Only - Only active participants can view content</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          
          <div className="form-group">
            <label>Notification Level</label>
            <select
              value={settings.notifications}
              onChange={e => setSettings(prev => ({ ...prev, notifications: e.target.value }))}
            >
              <option value="all">All - Receive all notifications</option>
              <option value="important">Important - Only important notifications</option>
              <option value="minimal">Minimal - Only critical notifications</option>
              <option value="none">None - No notifications</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Moderation</h3>
          
          <div className="form-group">
            <label>Moderation Level</label>
            <select
              value={settings.moderation}
              onChange={e => setSettings(prev => ({ ...prev, moderation: e.target.value }))}
            >
              <option value="standard">Standard - Basic moderation rules</option>
              <option value="strict">Strict - Enhanced content filtering</option>
              <option value="minimal">Minimal - Basic safety rules only</option>
              <option value="custom">Custom - Custom moderation rules</option>
            </select>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save Settings
          </button>
        </div>
      </form>

      <div className="settings-info">
        <div className="info-section">
          <h3>Current Configuration</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Privacy</span>
              <span className="info-value">{settings.privacy}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Visibility</span>
              <span className="info-value">{settings.visibility}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Join Type</span>
              <span className="info-value">{settings.joinType}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Content Access</span>
              <span className="info-value">{settings.contentAccess}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Notifications</span>
              <span className="info-value">{settings.notifications}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Moderation</span>
              <span className="info-value">{settings.moderation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySettings;
