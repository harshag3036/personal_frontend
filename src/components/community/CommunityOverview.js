import React from 'react';
import { SectionHeader } from './shared';
import './CommunityOverview.css';

/**
 * CommunityOverview Component
 * 
 * Displays an overview of a community, including stats, recent activity, and featured members
 * 
 * @param {Object} props
 * @param {Object} props.community - Community data object
 */
const CommunityOverview = ({ community }) => {
  if (!community) return null;

  // Extract community data
  const {
    name,
    description,
    type,
    createdAt,
    members = [],
    activities = [],
    discussions = []
  } = community;

  // Calculate stats
  const stats = {
    memberCount: members.length,
    activityCount: activities.length,
    discussionCount: discussions.length,
    completedActivities: activities.filter(a => a.status === 'completed').length
  };

  // Get recent activities (last 5)
  const recentActivities = activities
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  // Get recent discussions (last 5)
  const recentDiscussions = discussions
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  // Get active members (top 5 by activity)
  const activeMembers = [...members]
    .sort((a, b) => (b.activityCount || 0) - (a.activityCount || 0))
    .slice(0, 5);

  return (
    <div className="community-overview">
      <div className="overview-header">
        <div className="overview-header-content">
          <h2>{name}</h2>
          <div className={`community-type ${type}`}>
            {type === 'private' ? 'Private Circle' : 'Open Community'}
          </div>
          <p className="overview-description">{description}</p>
          <div className="overview-meta">
            <span>Created {new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.memberCount}</div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.activityCount}</div>
          <div className="stat-label">Activities</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.discussionCount}</div>
          <div className="stat-label">Discussions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completedActivities}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-section recent-activity">
          <SectionHeader 
            title="Recent Activity" 
            subtitle="Latest updates from this community"
          />
          
          {recentActivities.length > 0 ? (
            <ul className="activity-list">
              {recentActivities.map(activity => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {getActivityTypeIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-meta">
                      <span className={`activity-status ${activity.status}`}>
                        {activity.status}
                      </span>
                      <span className="activity-date">
                        {formatDate(activity.updatedAt || activity.createdAt)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">No activities yet</div>
          )}
        </div>

        <div className="overview-section recent-discussions">
          <SectionHeader 
            title="Recent Discussions" 
            subtitle="Join the conversation"
          />
          
          {recentDiscussions.length > 0 ? (
            <ul className="discussion-list">
              {recentDiscussions.map(discussion => (
                <li key={discussion.id} className="discussion-item">
                  <div className="discussion-content">
                    <div className="discussion-title">{discussion.title}</div>
                    <div className="discussion-meta">
                      <span className="discussion-author">
                        {discussion.author.name}
                      </span>
                      <span className="discussion-date">
                        {formatDate(discussion.updatedAt || discussion.createdAt)}
                      </span>
                      <span className="discussion-comments">
                        {discussion.commentCount || 0} comments
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">No discussions yet</div>
          )}
        </div>

        <div className="overview-section active-members">
          <SectionHeader 
            title="Active Members" 
            subtitle="Top contributors in this community"
          />
          
          {activeMembers.length > 0 ? (
            <ul className="member-list">
              {activeMembers.map(member => (
                <li key={member.id} className="member-item">
                  <div className="member-avatar">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="member-content">
                    <div className="member-name">{member.name}</div>
                    <div className="member-meta">
                      <span className={`member-role ${member.role}`}>
                        {member.role}
                      </span>
                      <span className="member-activity">
                        {member.activityCount || 0} contributions
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">No active members yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get icon for activity type
const getActivityTypeIcon = (type) => {
  const icons = {
    discussion: '🌱',
    event: '📅',
    project: '🎯',
    'skill-share': '🎓',
    resource: '📚',
    challenge: '🏆'
  };
  
  return icons[type] || '📝';
};

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export default CommunityOverview;
