import React, { useState } from 'react';
import './ActivityModeration.css';

/**
 * ActivityModeration Component
 * Manages activity reports and moderation
 * Supports content review, user reports, and moderation actions
 */
const ActivityModeration = ({ activity, onUpdateActivity }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [moderationAction, setModerationAction] = useState('');
  const [moderationNote, setModerationNote] = useState('');
  const [error, setError] = useState(null);

  const handleModerateReport = async (e) => {
    e.preventDefault();
    setError(null);

    if (!moderationAction) {
      setError('Please select a moderation action');
      return;
    }

    try {
      const updatedReport = {
        ...selectedReport,
        status: 'resolved',
        resolution: {
          action: moderationAction,
          note: moderationNote.trim(),
          moderatedAt: new Date().toISOString(),
          moderatedBy: 'current-user' // TODO: Replace with actual user ID
        }
      };

      const updatedActivity = {
        ...activity,
        reports: activity.reports.map(report =>
          report.id === selectedReport.id ? updatedReport : report
        )
      };

      await onUpdateActivity(updatedActivity);
      setSelectedReport(null);
      setModerationAction('');
      setModerationNote('');
    } catch (err) {
      setError(err.message);
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'inappropriate': return '⚠️';
      case 'spam': return '🚫';
      case 'harassment': return '😠';
      case 'misinformation': return '❌';
      case 'other': return '❓';
      default: return '⚠️';
    }
  };

  const getReportTypeName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getReportStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'reviewing': return '#2196f3';
      case 'resolved': return '#4caf50';
      default: return '#666';
    }
  };

  return (
    <div className="activity-moderation">
      <div className="moderation-header">
        <h2>Reports & Moderation</h2>
        <div className="report-stats">
          <div className="stat-item">
            <span className="stat-value">
              {activity.reports?.filter(r => r.status === 'pending').length || 0}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {activity.reports?.filter(r => r.status === 'resolved').length || 0}
            </span>
            <span className="stat-label">Resolved</span>
          </div>
        </div>
      </div>

      <div className="reports-list">
        {activity.reports?.length > 0 ? (
          activity.reports.map(report => (
            <div
              key={report.id}
              className={`report-card ${report.status} ${selectedReport?.id === report.id ? 'selected' : ''}`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="report-header">
                <div className="report-type">
                  <span className="type-icon">{getReportTypeIcon(report.type)}</span>
                  <span className="type-name">{getReportTypeName(report.type)}</span>
                </div>
                <span
                  className="report-status"
                  style={{ color: getReportStatusColor(report.status) }}
                >
                  {report.status}
                </span>
              </div>

              <div className="report-content">
                <p>{report.description}</p>
                {report.evidence && (
                  <div className="report-evidence">
                    <strong>Evidence:</strong>
                    <p>{report.evidence}</p>
                  </div>
                )}
              </div>

              <div className="report-meta">
                <span>Reported by: {report.reportedBy || 'Anonymous'}</span>
                <span>•</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>

              {report.resolution && (
                <div className="resolution-info">
                  <h4>Resolution</h4>
                  <div className="resolution-content">
                    <p><strong>Action:</strong> {report.resolution.action}</p>
                    {report.resolution.note && (
                      <p><strong>Note:</strong> {report.resolution.note}</p>
                    )}
                    <div className="resolution-meta">
                      <span>Moderated by: {report.resolution.moderatedBy}</span>
                      <span>•</span>
                      <span>{new Date(report.resolution.moderatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No reports to review</p>
            <p>All clear! No moderation needed at this time.</p>
          </div>
        )}
      </div>

      {selectedReport && selectedReport.status !== 'resolved' && (
        <form onSubmit={handleModerateReport} className="moderation-form">
          <div className="form-section">
            <h3>Take Action</h3>
            
            <div className="form-group">
              <label>Moderation Action</label>
              <select
                value={moderationAction}
                onChange={e => setModerationAction(e.target.value)}
                required
              >
                <option value="">Select action...</option>
                <option value="no_action">No Action Required</option>
                <option value="warning">Issue Warning</option>
                <option value="content_removed">Remove Content</option>
                <option value="user_suspended">Suspend User</option>
                <option value="user_banned">Ban User</option>
              </select>
            </div>

            <div className="form-group">
              <label>Moderation Note</label>
              <textarea
                value={moderationNote}
                onChange={e => setModerationNote(e.target.value)}
                placeholder="Add notes about this moderation action..."
                rows={4}
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setSelectedReport(null)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Action
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ActivityModeration;
