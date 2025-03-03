import React, { useState, useEffect } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import './EnhancedParticipantView.css';

/**
 * EnhancedParticipantView Component
 * 
 * This component provides an enhanced view of activity participants with:
 * - Participant avatars with online status
 * - Role-based visualization
 * - Contribution metrics
 * - Participant activity timeline
 * - Member recommendations
 */
const EnhancedParticipantView = ({ activity }) => {
  const { joinActivity, leaveActivity, updateParticipantRole, inviteParticipant } = useActivity();
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRoleInfo, setShowRoleInfo] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [expandedTimelines, setExpandedTimelines] = useState({});

  // Mock data for online status - in a real app, this would come from a real-time service
  const [onlineStatus, setOnlineStatus] = useState({});
  
  // Mock data for recommended members - in a real app, this would come from an API
  const [recommendedMembers, setRecommendedMembers] = useState([]);

  useEffect(() => {
    // Simulate fetching online status
    if (activity?.participants) {
      const mockStatus = {};
      activity.participants.forEach(p => {
        // Randomly set some participants as online
        mockStatus[p.id] = Math.random() > 0.7;
      });
      setOnlineStatus(mockStatus);
    }
    
    // Simulate fetching recommended members
    if (activity) {
      const mockRecommended = [
        {
          id: 'rec1',
          name: 'Alex Johnson',
          avatar: null,
          skills: ['JavaScript', 'React', 'UI Design'],
          mutualConnections: 3,
          activityLevel: 'high'
        },
        {
          id: 'rec2',
          name: 'Sam Rivera',
          avatar: null,
          skills: ['Content Writing', 'Research', 'Project Management'],
          mutualConnections: 1,
          activityLevel: 'medium'
        },
        {
          id: 'rec3',
          name: 'Taylor Kim',
          avatar: null,
          skills: ['Data Analysis', 'Python', 'Documentation'],
          mutualConnections: 2,
          activityLevel: 'high'
        }
      ];
      setRecommendedMembers(mockRecommended);
    }
  }, [activity]);

  if (!user || !activity) return null;

  const isParticipant = activity.participants?.some(p => p.id === user.id);
  const currentUserRole = activity.participants?.find(p => p.id === user.id)?.role || 'member';
  const isCreator = activity.createdBy?.id === user.id;
  const canManageRoles = isCreator || currentUserRole === 'admin';

  // Generate mock contribution data for participants
  const getParticipantContributions = (participant) => {
    // In a real app, this would come from actual data
    return {
      comments: Math.floor(2),
      files: Math.floor(4),
      milestones: Math.floor(6),
      lastActive: new Date(Date.now())
    };
  };

  // Generate mock timeline data for participants
  const getParticipantTimeline = (participant) => {
    // In a real app, this would come from actual activity data
    const now = new Date();
    const joinedDate = new Date(participant.joinedAt || now.setDate(now.getDate() - 30));
    
    return [
      {
        date: joinedDate,
        action: 'joined',
        description: `Joined the activity as ${participant.role}`
      },
      {
        date: new Date(joinedDate.getTime() + 2 * 24 * 60 * 60 * 1000),
        action: 'comment',
        description: 'Added a comment to the discussion'
      },
      {
        date: new Date(joinedDate.getTime() + 5 * 24 * 60 * 60 * 1000),
        action: 'file',
        description: 'Uploaded a document'
      },
      {
        date: new Date(joinedDate.getTime() + 10 * 24 * 60 * 60 * 1000),
        action: 'milestone',
        description: 'Completed a milestone'
      }
    ].sort((a, b) => b.date - a.date); // Sort by date descending
  };

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
          role: 'member',
          joinedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating participation:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRoleUpdate = async (participantId, newRole) => {
    if (!canManageRoles) {
      alert('You do not have permission to manage roles');
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

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    
    setIsUpdating(true);
    try {
      // In a real app, this would send an invitation email
      await inviteParticipant(activity.id, inviteEmail, inviteMessage);
      setInviteEmail('');
      setInviteMessage('');
      setShowInviteForm(false);
      alert(`Invitation sent to ${inviteEmail}`);
    } catch (error) {
      console.error('Error sending invitation:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleTimeline = (participantId) => {
    setExpandedTimelines(prev => ({
      ...prev,
      [participantId]: !prev[participantId]
    }));
  };

  // Role information for tooltip
  const roleInfo = {
    creator: {
      description: 'Created the activity and has full control over all aspects',
      permissions: ['Manage all settings', 'Delete activity', 'Manage all roles', 'Approve/reject milestones']
    },
    admin: {
      description: 'Helps manage the activity with elevated permissions',
      permissions: ['Edit activity details', 'Manage member roles', 'Approve/reject milestones', 'Manage discussions']
    },
    moderator: {
      description: 'Helps maintain quality and engagement',
      permissions: ['Moderate discussions', 'Review milestone submissions', 'Organize files', 'Welcome new members']
    },
    member: {
      description: 'Regular participant in the activity',
      permissions: ['Participate in discussions', 'Submit milestone work', 'Upload files', 'View all content']
    }
  };

  const getParticipationLevel = (participant) => {
    const contributions = getParticipantContributions(participant);
    const total = contributions.comments + contributions.files + contributions.milestones;
    
    if (total > 15) return { level: 'high', label: 'Very Active' };
    if (total > 5) return { level: 'medium', label: 'Active' };
    return { level: 'low', label: 'New' };
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
        {activity.participants.map(participant => {
          const contributions = getParticipantContributions(participant);
          const participationLevel = getParticipationLevel(participant);
          const isOnline = onlineStatus[participant.id];
          
          return (
            <div key={participant.id} className="participant-card">
              <div className="participant-header">
                <div className="participant-avatar-container">
                  <div 
                    className="participant-avatar" 
                    style={{ 
                      backgroundColor: `hsl(${participant.id.charCodeAt(0) % 360}, 70%, 60%)`
                    }}
                  >
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={`online-status ${isOnline ? 'online' : 'offline'}`} 
                    title={isOnline ? 'Online' : 'Offline'}
                  />
                </div>
                
                <div className="participant-info">
                  <div className="participant-name-role">
                    <span className="participant-name">{participant.name}</span>
                    <div 
                      className={`participant-role ${participant.role}`}
                      onClick={() => {
                        setShowRoleInfo(true);
                        setSelectedParticipant(participant);
                      }}
                    >
                      {participant.role}
                    </div>
                  </div>
                  
                  <div className="participation-level">
                    <span className={`level-indicator ${participationLevel.level}`} />
                    <span className="level-label">{participationLevel.label}</span>
                  </div>
                  
                  <div className="join-date">
                    Joined {new Date(participant.joinedAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="participant-actions">
                  {canManageRoles && participant.id !== user.id && (
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
                  
                  <button 
                    className="timeline-toggle"
                    onClick={() => toggleTimeline(participant.id)}
                  >
                    {expandedTimelines[participant.id] ? 'Hide Activity' : 'Show Activity'}
                  </button>
                </div>
              </div>
              
              <div className="participant-metrics">
                <div className="metric">
                  <span className="metric-value">{contributions.comments}</span>
                  <span className="metric-label">Comments</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{contributions.files}</span>
                  <span className="metric-label">Files</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{contributions.milestones}</span>
                  <span className="metric-label">Milestones</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{new Date(contributions.lastActive).toLocaleDateString()}</span>
                  <span className="metric-label">Last Active</span>
                </div>
              </div>
              
              {expandedTimelines[participant.id] && (
                <div className="participant-timeline">
                  <h4>Activity Timeline</h4>
                  <div className="timeline-events">
                    {getParticipantTimeline(participant).map((event, index) => (
                      <div key={index} className={`timeline-event ${event.action}`}>
                        <div className="event-date">{event.date.toLocaleDateString()}</div>
                        <div className="event-icon" />
                        <div className="event-description">{event.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderRecommendations = () => {
    if (!showRecommendations) return null;
    
    return (
      <div className="recommendations-section">
        <h4>Recommended Members</h4>
        <div className="recommendations-list">
          {recommendedMembers.map(member => (
            <div key={member.id} className="recommendation-card">
              <div className="recommendation-avatar-container">
                <div 
                  className="recommendation-avatar" 
                  style={{ 
                    backgroundColor: `hsl(${member.id.charCodeAt(0) % 360}, 70%, 60%)`
                  }}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="recommendation-info">
                <div className="recommendation-name">{member.name}</div>
                <div className="recommendation-skills">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="recommendation-connections">
                  {member.mutualConnections} mutual connection{member.mutualConnections !== 1 ? 's' : ''}
                </div>
              </div>
              
              <button 
                className="invite-button"
                onClick={() => {
                  setInviteEmail(`${member.name.toLowerCase().replace(' ', '.')}@example.com`);
                  setInviteMessage(`Hi ${member.name.split(' ')[0]}, I'd like to invite you to join our activity "${activity.title}". Your skills in ${member.skills.join(', ')} would be valuable to our team.`);
                  setShowInviteForm(true);
                  setShowRecommendations(false);
                }}
              >
                Invite
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="enhanced-participant-view">
      <div className="participants-header">
        <div className="header-title">
          <h3>Participants ({activity.participants?.length || 0})</h3>
          <div className="header-subtitle">Team members collaborating on this activity</div>
        </div>
        
        <div className="header-actions">
          {canManageRoles && (
            <button
              className="invite-action-button"
              onClick={() => setShowInviteForm(true)}
            >
              Invite Members
            </button>
          )}
          
          {canManageRoles && (
            <button
              className="recommend-button"
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
            </button>
          )}
          
          <button
            className={`join-button ${isParticipant ? 'leave' : ''}`}
            onClick={handleJoinLeave}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : isParticipant ? 'Leave Activity' : 'Join Activity'}
          </button>
        </div>
      </div>
      
      {renderRecommendations()}
      
      {showInviteForm && (
        <div className="invite-form">
          <h4>Invite New Member</h4>
          <form onSubmit={handleInvite}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="form-group">
              <label>Personal Message</label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                placeholder="Add a personal message to your invitation"
                rows={3}
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={isUpdating || !inviteEmail.trim()}>
                Send Invitation
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowInviteForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {renderParticipantList()}
      
      {showRoleInfo && selectedParticipant && (
        <div className="role-info-modal">
          <div className="role-info-content">
            <button 
              className="close-modal"
              onClick={() => {
                setShowRoleInfo(false);
                setSelectedParticipant(null);
              }}
            >
              ×
            </button>
            
            <h3>Role: {selectedParticipant.role.charAt(0).toUpperCase() + selectedParticipant.role.slice(1)}</h3>
            <p className="role-description">{roleInfo[selectedParticipant.role].description}</p>
            
            <h4>Permissions</h4>
            <ul className="permissions-list">
              {roleInfo[selectedParticipant.role].permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedParticipantView;
