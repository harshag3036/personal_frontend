import React, { useState } from 'react';
import './CircleView.css';

/**
 * CircleView Component
 * Displays a private circle's activities and members
 * Focuses on close relationships and shared growth
 */
const CircleView = ({ circle, onActivityCreate, onMemberInvite }) => {
  const [activeTab, setActiveTab] = useState('activities');
  const [showActivityForm, setShowActivityForm] = useState(false);

  const renderActivities = () => {
    if (!circle.activities?.length) {
      return (
        <div className="empty-state">
          <p>No activities yet. Start something together!</p>
          <button onClick={() => setShowActivityForm(true)}>
            Create Activity
          </button>
        </div>
      );
    }

    return (
      <div className="activities-list">
        {circle.activities.map(activity => (
          <div key={activity.id} className="activity-card">
            <div className="activity-header">
              <h3>{activity.title}</h3>
              <span className={`activity-type ${activity.type}`}>
                {activity.type}
              </span>
            </div>
            <p>{activity.description}</p>
            <div className="activity-meta">
              <span>{activity.participants.length} participants</span>
              <span>{activity.status}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMembers = () => {
    return (
      <div className="members-list">
        {circle.members.map(member => (
          <div key={member.id} className="member-card">
            <div className="member-info">
              <h4>{member.name}</h4>
              <span className={`role ${member.role}`}>{member.role}</span>
            </div>
            {member.skills && (
              <div className="member-skills">
                {member.skills.map(skill => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <button 
          className="invite-button"
          onClick={onMemberInvite}
        >
          Invite Member
        </button>
      </div>
    );
  };

  return (
    <div className="circle-view">
      <header className="circle-header">
        <h2>{circle.name}</h2>
        <p>{circle.description}</p>
      </header>

      <nav className="circle-nav">
        <button 
          className={activeTab === 'activities' ? 'active' : ''}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </button>
        <button 
          className={activeTab === 'members' ? 'active' : ''}
          onClick={() => setActiveTab('members')}
        >
          Members ({circle.members.length})
        </button>
      </nav>

      <div className="circle-content">
        {activeTab === 'activities' ? renderActivities() : renderMembers()}
      </div>

      {showActivityForm && (
        <div className="activity-form-overlay">
          <div className="activity-form">
            <h3>Create New Activity</h3>
            {/* Activity form will be implemented later */}
            <button onClick={() => setShowActivityForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircleView;
