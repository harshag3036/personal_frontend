import React, { useState } from 'react';
import './ParticipantManager.css';

/**
 * ParticipantManager Component
 * Manages participants across different activity types
 * Supports roles, permissions, and participation tracking
 */
const ParticipantManager = ({ activity, onUpdateActivity }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('participant');
  const [error, setError] = useState(null);

  const roles = {
    organizer: {
      label: 'Organizer',
      color: '#c62828',
      permissions: ['manage', 'edit', 'invite', 'moderate', 'assign_roles'],
      description: 'Full control over the community and its activities'
    },
    moderator: {
      label: 'Moderator',
      color: '#2e7d32',
      permissions: ['moderate', 'invite', 'manage_content'],
      description: 'Help maintain community standards and manage content'
    },
    mentor: {
      label: 'Mentor',
      color: '#6a1b9a',
      permissions: ['guide', 'invite', 'create_activities'],
      description: 'Guide and support other members in their journey'
    },
    contributor: {
      label: 'Contributor',
      color: '#0277bd',
      permissions: ['create_content', 'participate', 'invite'],
      description: 'Regular contributors who can create content and activities'
    },
    participant: {
      label: 'Participant',
      color: '#1976d2',
      permissions: ['participate'],
      description: 'Regular community members who can participate in activities'
    }
  };

  const memberStatuses = {
    active: { label: 'Active', color: '#43a047' },
    inactive: { label: 'Inactive', color: '#757575' },
    pending: { label: 'Pending', color: '#fb8c00' },
    blocked: { label: 'Blocked', color: '#d32f2f' }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(inviteEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // TODO: Replace with actual invite API call
      const newParticipant = {
        id: Date.now(),
        email: inviteEmail,
        role: selectedRole,
        joinedAt: new Date().toISOString(),
        status: 'pending'
      };

      const updatedActivity = {
        ...activity,
        participants: [...activity.participants, newParticipant]
      };

      await onUpdateActivity(updatedActivity);
      setShowInviteForm(false);
      setInviteEmail('');
      setSelectedRole('participant');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      const updatedActivity = {
        ...activity,
        participants: activity.participants.filter(p => p.id !== participantId)
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateRole = async (participantId, newRole) => {
    try {
      // Check if current user has permission to assign this role
      if (!hasPermission(activity.currentUserRole, 'assign_roles')) {
        throw new Error('You do not have permission to assign roles');
      }

      // Check role hierarchy
      if (!canAssignRole(activity.currentUserRole, newRole)) {
        throw new Error('You cannot assign a role equal to or higher than your own');
      }

      const updatedActivity = {
        ...activity,
        participants: activity.participants.map(p =>
          p.id === participantId ? { 
            ...p, 
            role: newRole,
            roleUpdatedAt: new Date().toISOString(),
            roleUpdatedBy: activity.currentUserId
          } : p
        )
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStatus = async (participantId, newStatus) => {
    try {
      if (!hasPermission(activity.currentUserRole, 'manage')) {
        throw new Error('You do not have permission to update member status');
      }

      const updatedActivity = {
        ...activity,
        participants: activity.participants.map(p =>
          p.id === participantId ? {
            ...p,
            status: newStatus,
            statusUpdatedAt: new Date().toISOString(),
            statusUpdatedBy: activity.currentUserId
          } : p
        )
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const hasPermission = (role, permission) => {
    return roles[role]?.permissions.includes(permission);
  };

  const canAssignRole = (currentRole, roleToAssign) => {
    const roleHierarchy = ['participant', 'contributor', 'mentor', 'moderator', 'organizer'];
    const currentRoleIndex = roleHierarchy.indexOf(currentRole);
    const assignRoleIndex = roleHierarchy.indexOf(roleToAssign);
    return currentRoleIndex > assignRoleIndex;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getParticipantsByRole = () => {
    const grouped = {};
    Object.keys(roles).forEach(role => {
      grouped[role] = activity.participants.filter(p => p.role === role);
    });
    return grouped;
  };

  return (
    <div className="participant-manager">
      <div className="participant-header">
        <h2>Participants</h2>
        <button
          className="invite-button"
          onClick={() => setShowInviteForm(true)}
        >
          Invite Participant
        </button>
      </div>

      {showInviteForm && (
        <form onSubmit={handleInvite} className="invite-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
            >
              {Object.entries(roles).map(([key, role]) => (
                <option key={key} value={key}>{role.label}</option>
              ))}
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowInviteForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Send Invite
            </button>
          </div>
        </form>
      )}

      <div className="participants-list">
        {Object.entries(getParticipantsByRole()).map(([role, participants]) => (
          participants.length > 0 && (
            <div key={role} className="role-section">
              <h3 style={{ color: roles[role].color }}>
                {roles[role].label}s ({participants.length})
              </h3>
              <div className="participants-grid">
                {participants.map(participant => (
                  <div key={participant.id} className="participant-card">
                    <div className="participant-info">
                      <span className="participant-email">{participant.email}</span>
                      <span className={`status-badge ${participant.status}`}>
                        {participant.status}
                      </span>
                    </div>
                    <div className="participant-meta">
                      <span>Joined {new Date(participant.joinedAt).toLocaleDateString()}</span>
                      {participant.role !== 'organizer' && hasPermission(activity.currentUserRole, 'assign_roles') && (
                        <div className="participant-actions">
                          <div className="role-management">
                            <select
                              value={participant.role}
                              onChange={e => handleUpdateRole(participant.id, e.target.value)}
                              className="role-select"
                              title={roles[participant.role].description}
                            >
                              {Object.entries(roles)
                                .filter(([key]) => canAssignRole(activity.currentUserRole, key))
                                .map(([key, role]) => (
                                  <option key={key} value={key}>{role.label}</option>
                                ))
                              }
                            </select>
                            {participant.roleUpdatedAt && (
                              <span className="update-info">
                                Updated {new Date(participant.roleUpdatedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="status-management">
                            <select
                              value={participant.status}
                              onChange={e => handleUpdateStatus(participant.id, e.target.value)}
                              className="status-select"
                              style={{ color: memberStatuses[participant.status]?.color }}
                            >
                              {Object.entries(memberStatuses).map(([key, status]) => (
                                <option key={key} value={key}>{status.label}</option>
                              ))}
                            </select>
                          </div>
                          {hasPermission(activity.currentUserRole, 'manage') && (
                            <button
                              className="remove-button"
                              onClick={() => handleRemoveParticipant(participant.id)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {activity.participants.length === 0 && (
          <div className="empty-state">
            <p>No participants yet</p>
            <button
              className="invite-button"
              onClick={() => setShowInviteForm(true)}
            >
              Invite First Participant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantManager;
