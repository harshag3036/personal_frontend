import React, { useState } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import './ActivityParticipants.css';

const ActivityParticipants = ({ activity }) => {
  const { joinActivity, leaveActivity, updateParticipantRole } = useActivity();
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!user || !activity) return null;

  const isParticipant = activity.participants?.some(p => p.id === user.id);
  const currentUserRole = activity.participants?.find(p => p.id === user.id)?.role || 'member';
  const isCreator = activity.createdBy?.id === user.id;

  const handleJoinLeave = async () => {
    if (!user) {
      alert('Please sign in to join activities');
      return;
    }
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      if (isParticipant) {
        await leaveActivity(activity.id, user.id);
      } else {
        await joinActivity(activity.id, {
          id: user.id,
          name: user.name,
          role: 'member'
        });
      }
    } catch (error) {
      console.error('Error updating participation:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRoleUpdate = async (participantId, newRole) => {
    if (!user) {
      alert('Please sign in to manage roles');
      return;
    }
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await updateParticipantRole(activity.id, participantId, newRole);
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderParticipantList = () => {
    if (!activity.participants?.length) {
      return (
        <div className="no-participants">
          <p>No participants yet. Be the first to join!</p>
        </div>
      );
    }

    return (
      <div className="participants-list">
        {activity.participants.map(participant => (
          <div key={participant.id} className="participant-item">
            <div className="participant-info">
              <span className="participant-name">{participant.name}</span>
              <span className={`participant-role ${participant.role}`}>
                {participant.role}
              </span>
              <span className="join-date">
                Joined {new Date(participant.joinedAt).toLocaleDateString()}
              </span>
            </div>
            {isCreator && participant.id !== user.id && (
              <select
                value={participant.role}
                onChange={(e) => handleRoleUpdate(participant.id, e.target.value)}
                disabled={isUpdating}
                className="role-select"
              >
                <option value="member">Member</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="activity-participants">
      <div className="participants-header">
        <h3>Participants ({activity.participants?.length || 0})</h3>
        <button
          className={`join-button ${isParticipant ? 'leave' : ''}`}
          onClick={handleJoinLeave}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : isParticipant ? 'Leave Activity' : 'Join Activity'}
        </button>
      </div>
      {renderParticipantList()}
    </div>
  );
};

export default ActivityParticipants;
