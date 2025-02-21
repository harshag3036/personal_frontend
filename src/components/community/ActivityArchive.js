import React, { useState } from 'react';
import './ActivityArchive.css';

/**
 * ActivityArchive Component
 * Manages activity archiving and deletion
 * Supports data retention and cleanup
 */
const ActivityArchive = ({ activity, onUpdateActivity, onDeleteActivity }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [archiveReason, setArchiveReason] = useState('');
  const [retentionPeriod, setRetentionPeriod] = useState('30');
  const [notifyParticipants, setNotifyParticipants] = useState(true);
  const [error, setError] = useState(null);

  const handleArchive = async (e) => {
    e.preventDefault();
    setError(null);

    if (!archiveReason.trim()) {
      setError('Please provide an archive reason');
      return;
    }

    try {
      const updatedActivity = {
        ...activity,
        status: 'archived',
        archiveInfo: {
          archivedAt: new Date().toISOString(),
          reason: archiveReason.trim(),
          retentionPeriod: parseInt(retentionPeriod),
          notifyParticipants,
          archivedBy: 'current-user' // TODO: Replace with actual user ID
        }
      };

      await onUpdateActivity(updatedActivity);
      setShowConfirmation(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteActivity(activity.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const getRetentionDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(retentionPeriod));
    return date.toLocaleDateString();
  };

  return (
    <div className="activity-archive">
      <div className="archive-header">
        <h2>Archive Activity</h2>
        <div className="activity-status">
          <span className={`status-badge ${activity.status}`}>
            {activity.status || 'active'}
          </span>
        </div>
      </div>

      {activity.status === 'archived' ? (
        <div className="archive-info">
          <div className="info-section">
            <h3>Archive Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Archived Date</span>
                <span className="info-value">
                  {new Date(activity.archiveInfo.archivedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Retention Period</span>
                <span className="info-value">
                  {activity.archiveInfo.retentionPeriod} days
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Deletion Date</span>
                <span className="info-value deletion-date">
                  {new Date(new Date(activity.archiveInfo.archivedAt).getTime() + 
                    activity.archiveInfo.retentionPeriod * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="archive-reason">
              <h4>Archive Reason</h4>
              <p>{activity.archiveInfo.reason}</p>
            </div>

            <div className="archive-actions">
              <button
                className="restore-button"
                onClick={async () => {
                  try {
                    const updatedActivity = {
                      ...activity,
                      status: 'active',
                      archiveInfo: undefined
                    };
                    await onUpdateActivity(updatedActivity);
                  } catch (err) {
                    setError(err.message);
                  }
                }}
              >
                Restore Activity
              </button>
              <button
                className="delete-button"
                onClick={() => setShowConfirmation(true)}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleArchive} className="archive-form">
          <div className="form-section">
            <h3>Archive Settings</h3>
            
            <div className="form-group">
              <label>Archive Reason</label>
              <textarea
                value={archiveReason}
                onChange={e => setArchiveReason(e.target.value)}
                placeholder="Explain why this activity is being archived..."
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>Data Retention Period (days)</label>
              <select
                value={retentionPeriod}
                onChange={e => setRetentionPeriod(e.target.value)}
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">365 days</option>
              </select>
              <span className="help-text">
                Data will be permanently deleted on {getRetentionDate()}
              </span>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notifyParticipants}
                  onChange={e => setNotifyParticipants(e.target.checked)}
                />
                Notify participants about archival
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Archive Activity
            </button>
          </div>
        </form>
      )}

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to permanently delete this activity? This action cannot be undone.
            </p>
            <div className="dialog-actions">
              <button
                className="cancel-button"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="delete-button"
                onClick={handleDelete}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityArchive;
