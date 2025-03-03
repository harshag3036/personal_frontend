import React from 'react';
import './StatusOverview.css';

const statusColors = {
  'not-started': '#6c757d',
  'in-progress': '#007bff',
  'completed': '#28a745',
  'on-hold': '#ffc107',
  'cancelled': '#dc3545'
};

const StatusOverview = ({ 
  progress, 
  suggestedStatus, 
  handleStatusChange, 
  isUpdating, 
  showStatusReason,
  statusReason,
  setStatusReason,
  confirmStatusChange,
  cancelStatusChange,
  calculateProgress
}) => {
  return (
    <div className="progress-overview">
      <div className="section-title">
        <h4>Overall Progress</h4>
        <div className="help-text">
          Current status and milestone completion
        </div>
      </div>
      
      <div className="progress-summary">
        <div className="summary-details">
          <div className="summary-stat">
            <span className="stat-label">Status:</span>
            <span className="stat-value" style={{ color: statusColors[progress.status] }}>
              {progress.status ? progress.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not Started'}
            </span>
            {progress.status !== suggestedStatus && (
              <span className="suggested-status">
                Suggested: {suggestedStatus ? suggestedStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not Started'}
                <span className="tooltip">
                  Based on milestone completion
                </span>
              </span>
            )}
          </div>
          <div className="summary-stat">
            <span className="stat-label">Milestones:</span>
            <span className="stat-value">
              {progress?.milestones ? progress.milestones.filter(m => m.completed).length : 0} of {progress?.milestones?.length || 0} completed
            </span>
          </div>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${calculateProgress()}%` }}
          >
            {calculateProgress()}%
          </div>
        </div>
      </div>
      
      {/* Status badges with clear instructions */}
      <div className="status-badges">
        <div className="status-badges-header">Click to update status:</div>
        <button 
          className={`status-badge not-started ${progress.status === 'not-started' ? 'active' : ''}`}
          onClick={() => handleStatusChange('not-started')}
          disabled={isUpdating || progress.status === 'not-started'}
          title="Activity has not been started yet"
        >
          Not Started
        </button>
        <button 
          className={`status-badge in-progress ${progress.status === 'in-progress' ? 'active' : ''}`}
          onClick={() => handleStatusChange('in-progress')}
          disabled={isUpdating || progress.status === 'in-progress'}
          title="Activity is currently being worked on"
        >
          In Progress
        </button>
        <button 
          className={`status-badge completed ${progress.status === 'completed' ? 'active' : ''}`}
          onClick={() => handleStatusChange('completed')}
          disabled={isUpdating || progress.status === 'completed'}
          title="Activity has been successfully completed"
        >
          Completed
        </button>
        <button 
          className={`status-badge on-hold ${progress.status === 'on-hold' ? 'active' : ''}`}
          onClick={() => handleStatusChange('on-hold')}
          disabled={isUpdating || progress.status === 'on-hold'}
          title="Activity is temporarily paused"
        >
          On Hold
        </button>
        <button 
          className={`status-badge cancelled ${progress.status === 'cancelled' ? 'active' : ''}`}
          onClick={() => handleStatusChange('cancelled')}
          disabled={isUpdating || progress.status === 'cancelled'}
          title="Activity has been cancelled"
        >
          Cancelled
        </button>
      </div>
      
      {/* Status reason dialog with clearer connection to status change */}
      {showStatusReason && (
        <div className="status-reason">
          <div className="reason-prompt">Please provide a reason for this status change:</div>
          <input
            type="text"
            placeholder="e.g., 'All milestones completed' or 'Waiting for resources'"
            value={statusReason}
            onChange={(e) => setStatusReason(e.target.value)}
            autoFocus
          />
          <div className="reason-actions">
            <button 
              onClick={confirmStatusChange}
              disabled={isUpdating}
              className="confirm-button"
            >
              Update Status
            </button>
            <button 
              onClick={cancelStatusChange}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusOverview;
