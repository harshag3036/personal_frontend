import React, { useState } from 'react';
import './InviteManager.css';

/**
 * InviteManager Component
 * Handles invitations for private circles
 * Includes role selection and personalized messages
 */
const InviteManager = ({ onInvite, onClose }) => {
  const [invites, setInvites] = useState([
    { email: '', role: 'participant', message: '', expiresIn: '7' }
  ]);
  const [error, setError] = useState(null);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [showPendingInvites, setShowPendingInvites] = useState(false);

  const roles = {
    participant: {
      label: 'Participant',
      description: 'Can participate in activities and discussions'
    },
    contributor: {
      label: 'Contributor',
      description: 'Can create content and initiate activities'
    },
    mentor: {
      label: 'Mentor',
      description: 'Can guide others and manage activities'
    },
    moderator: {
      label: 'Moderator',
      description: 'Can moderate content and manage members'
    }
  };

  const expiryOptions = [
    { value: '1', label: '24 hours' },
    { value: '3', label: '3 days' },
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' }
  ];

  const addInvite = () => {
    setInvites(prev => [...prev, { email: '', role: 'participant', message: '', expiresIn: '7' }]);
  };

  const removeInvite = (index) => {
    setInvites(prev => prev.filter((_, i) => i !== index));
  };

  const updateInvite = (index, field, value) => {
    setInvites(prev => prev.map((invite, i) => 
      i === index ? { ...invite, [field]: value } : invite
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate emails
    const invalidEmails = invites.filter(invite => !isValidEmail(invite.email));
    if (invalidEmails.length > 0) {
      setError('Please enter valid email addresses');
      return;
    }

    // Check for duplicate emails
    const uniqueEmails = new Set(invites.map(invite => invite.email));
    if (uniqueEmails.size !== invites.length) {
      setError('Duplicate email addresses found');
      return;
    }

    try {
      // Add expiry date and invitation ID to each invite
      const processedInvites = invites.map(invite => ({
        ...invite,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + parseInt(invite.expiresIn) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      }));

      await onInvite(processedInvites);
      setPendingInvites(prev => [...prev, ...processedInvites]);
      setInvites([{ email: '', role: 'participant', message: '', expiresIn: '7' }]);
      setShowPendingInvites(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendInvite = async (inviteId) => {
    try {
      const invite = pendingInvites.find(inv => inv.id === inviteId);
      if (!invite) return;

      // Update expiry and resend
      const updatedInvite = {
        ...invite,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        resendCount: (invite.resendCount || 0) + 1,
        lastResent: new Date().toISOString()
      };

      await onInvite([updatedInvite]);
      setPendingInvites(prev => 
        prev.map(inv => inv.id === inviteId ? updatedInvite : inv)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelInvite = async (inviteId) => {
    try {
      setPendingInvites(prev => 
        prev.map(inv => 
          inv.id === inviteId ? { ...inv, status: 'cancelled' } : inv
        )
      );
      // TODO: Implement backend cancellation
    } catch (err) {
      setError(err.message);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="invite-manager">
      <div className="invite-header">
        <h2>Invite Members</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="invite-tabs">
        <button
          className={`tab-button ${!showPendingInvites ? 'active' : ''}`}
          onClick={() => setShowPendingInvites(false)}
        >
          New Invites
        </button>
        <button
          className={`tab-button ${showPendingInvites ? 'active' : ''}`}
          onClick={() => setShowPendingInvites(true)}
        >
          Pending Invites ({pendingInvites.filter(inv => inv.status === 'pending').length})
        </button>
      </div>

      {showPendingInvites ? (
        <div className="pending-invites">
          {pendingInvites.map(invite => (
            <div key={invite.id} className="pending-invite-card">
              <div className="invite-info">
                <div className="invite-primary">
                  <span className="invite-email">{invite.email}</span>
                  <span className={`invite-status ${invite.status}`}>
                    {invite.status}
                  </span>
                </div>
                <div className="invite-details">
                  <span>Role: {roles[invite.role].label}</span>
                  <span>Expires: {new Date(invite.expiresAt).toLocaleDateString()}</span>
                  {invite.resendCount && (
                    <span>Resent: {invite.resendCount} times</span>
                  )}
                </div>
              </div>
              <div className="invite-actions">
                {invite.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleResendInvite(invite.id)}
                      className="resend-button"
                    >
                      Resend
                    </button>
                    <button
                      onClick={() => handleCancelInvite(invite.id)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {pendingInvites.length === 0 && (
            <div className="empty-state">
              <p>No pending invites</p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {invites.map((invite, index) => (
            <div key={index} className="invite-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={invite.email}
                    onChange={(e) => updateInvite(index, 'email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={invite.role}
                    onChange={(e) => updateInvite(index, 'role', e.target.value)}
                    className="role-select"
                  >
                    {Object.entries(roles).map(([value, { label, description }]) => (
                      <option key={value} value={value} title={description}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                {invites.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeInvite(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group message-group">
                  <label>Personal Message (optional)</label>
                  <textarea
                    value={invite.message}
                    onChange={(e) => updateInvite(index, 'message', e.target.value)}
                    placeholder="Add a personal message to your invitation"
                    rows={3}
                  />
                </div>
                <div className="form-group expiry-group">
                  <label>Invitation Expires In</label>
                  <select
                    value={invite.expiresIn}
                    onChange={(e) => updateInvite(index, 'expiresIn', e.target.value)}
                    className="expiry-select"
                  >
                    {expiryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          {error && <div className="error-message">{error}</div>}

          <div className="invite-actions">
            <button
              type="button"
              className="add-button"
              onClick={addInvite}
            >
              Add Another Invite
            </button>
            <button type="submit" className="send-button">
              Send Invitations
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InviteManager;
