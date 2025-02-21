import React, { useState } from 'react';
import './ActivityParticipants.css';

/**
 * ActivityParticipants Component
 * Manages activity participants and roles
 * Supports participant management, role assignment, and access control
 */
const ActivityParticipants = ({ activity, onUpdateActivity }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participantEmail, setParticipantEmail] = useState('');
  const [participantRole, setParticipantRole] = useState('member');
  const [participantStatus, setParticipantStatus] = useState('active');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [error, setError] = useState(null);

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    setError(null);

    if (!participantEmail.trim()) {
      setError('Please provide participant email');
      return;
    }

    try {
      const newParticipant = {
        id: Date.now().toString(),
        email: participantEmail.trim(),
        role: participantRole,
        status: participantStatus,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        participants: [...(activity.participants || []), newParticipant]
      };

      await onUpdateActivity(updatedActivity);
      setParticipantEmail('');
      setParticipantRole('member');
      setParticipantStatus('active');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateParticipant = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedParticipant) return;

    try {
      const updatedParticipant = {
        ...selectedParticipant,
        role: participantRole,
        status: participantStatus,
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        participants: activity.participants.map(participant =>
          participant.id === selectedParticipant.id ? updatedParticipant : participant
        )
      };

      await onUpdateActivity(updatedActivity);
      setSelectedParticipant(null);
      setParticipantEmail('');
      setParticipantRole('member');
      setParticipantStatus('active');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      const updatedActivity = {
        ...activity,
        participants: activity.participants.filter(participant => participant.id !== participantId)
      };

      await onUpdateActivity(updatedActivity);
      setSelectedParticipant(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const selectParticipant = (participant) => {
    setSelectedParticipant(participant);
    setParticipantEmail(participant.email);
    setParticipantRole(participant.role);
    setParticipantStatus(participant.status);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'moderator': return '🛡️';
      case 'contributor': return '✍️';
      case 'member': return '👤';
      default: return '👥';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'inactive': return '⚪';
      case 'blocked': return '🔴';
      case 'pending': return '🟡';
      default: return '⚪';
    }
  };

  const getFilteredParticipants = () => {
    let filtered = [...(activity.participants || [])];

    switch (filter) {
      case 'active':
        filtered = filtered.filter(p => p.status === 'active');
        break;
      case 'inactive':
        filtered = filtered.filter(p => p.status === 'inactive');
        break;
      case 'blocked':
        filtered = filtered.filter(p => p.status === 'blocked');
        break;
      case 'pending':
        filtered = filtered.filter(p => p.status === 'pending');
        break;
      case 'admin':
        filtered = filtered.filter(p => p.role === 'admin');
        break;
      case 'moderator':
        filtered = filtered.filter(p => p.role === 'moderator');
        break;
      case 'contributor':
        filtered = filtered.filter(p => p.role === 'contributor');
        break;
      default:
        break;
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt));
        break;
      case 'lastActive':
        filtered.sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
        break;
      case 'email':
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredParticipants = getFilteredParticipants();

  const getParticipantStats = () => {
    const total = activity.participants?.length || 0;
    const active = activity.participants?.filter(p => p.status === 'active').length || 0;
    const admins = activity.participants?.filter(p => p.role === 'admin').length || 0;
    const moderators = activity.participants?.filter(p => p.role === 'moderator').length || 0;

    return {
      total,
      active,
      admins,
      moderators
    };
  };

  const stats = getParticipantStats();

  return (
    <div className="activity-participants">
      <div className="participants-header">
        <h2>Participants & Roles</h2>
        <div className="participant-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.admins}</span>
            <span className="stat-label">Admins</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.moderators}</span>
            <span className="stat-label">Moderators</span>
          </div>
        </div>
      </div>

      <div className="participants-controls">
        <div className="participants-filters">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Participants</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
            <option value="admin">Admins</option>
            <option value="moderator">Moderators</option>
            <option value="contributor">Contributors</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="lastActive">Last Active</option>
            <option value="email">Email A-Z</option>
          </select>
        </div>
      </div>

      <div className="participants-grid">
        <div className="participants-list">
          {filteredParticipants.length > 0 ? (
            filteredParticipants.map(participant => (
              <div
                key={participant.id}
                className={`participant-card ${selectedParticipant?.id === participant.id ? 'selected' : ''}`}
                onClick={() => selectParticipant(participant)}
              >
                <div className="participant-header">
                  <div className="participant-info">
                    <span className="participant-icon">{getRoleIcon(participant.role)}</span>
                    <div className="participant-meta">
                      <span className="participant-email">{participant.email}</span>
                      <span className="participant-role">{participant.role}</span>
                    </div>
                  </div>
                  <div className="participant-status">
                    <span className="status-icon">{getStatusIcon(participant.status)}</span>
                    <span className="status-label">{participant.status}</span>
                  </div>
                </div>
                <div className="participant-footer">
                  <span className="participant-joined">
                    Joined {new Date(participant.joinedAt).toLocaleDateString()}
                  </span>
                  <span className="participant-active">
                    Last active {new Date(participant.lastActive).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No participants found</p>
              <p>Add participants to manage roles and access</p>
            </div>
          )}
        </div>

        <form onSubmit={selectedParticipant ? handleUpdateParticipant : handleAddParticipant} className="participant-form">
          <div className="form-section">
            <h3>{selectedParticipant ? 'Edit Participant' : 'Add Participant'}</h3>
            
            {!selectedParticipant && (
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={participantEmail}
                  onChange={e => setParticipantEmail(e.target.value)}
                  placeholder="Enter participant email..."
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Role</label>
              <select
                value={participantRole}
                onChange={e => setParticipantRole(e.target.value)}
              >
                <option value="member">Member</option>
                <option value="contributor">Contributor</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={participantStatus}
                onChange={e => setParticipantStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            {selectedParticipant && (
              <button
                type="button"
                className="delete-button"
                onClick={() => handleRemoveParticipant(selectedParticipant.id)}
              >
                Remove Participant
              </button>
            )}
            <div className="action-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setSelectedParticipant(null);
                  setParticipantEmail('');
                  setParticipantRole('member');
                  setParticipantStatus('active');
                }}
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                {selectedParticipant ? 'Update Participant' : 'Add Participant'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityParticipants;
