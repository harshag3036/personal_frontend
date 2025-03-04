import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useActivity } from '../../contexts/ActivityContext';
import './MemberRecognition.css';

/**
 * MemberRecognition Component
 * 
 * This component implements a system to recognize and highlight member contributions
 * within activities and communities. It displays badges, achievements, and contribution
 * metrics to acknowledge active participants.
 */
const MemberRecognition = ({ communityId, activityId }) => {
  const { user } = useUser();
  const { activities } = useActivity();
  const [contributors, setContributors] = useState([]);
  const [recognitionPeriod, setRecognitionPeriod] = useState('month');
  const [showAll, setShowAll] = useState(false);

  // Calculate contribution metrics for members
  useEffect(() => {
    if (!communityId && !activityId) return;

    // In a real implementation, this would fetch data from an API
    // For now, we'll generate mock data based on the activities
    const mockContributors = generateMockContributors(activityId, activities);
    setContributors(mockContributors);
  }, [communityId, activityId, activities, recognitionPeriod]);

  // Generate mock contributors data for demonstration
  const generateMockContributors = (activityId, activities) => {
    if (!activities || !activityId) return [];

    const activity = activities.find(a => a.id === activityId);
    if (!activity || !activity.participants) return [];

    // Generate contribution metrics for each participant
    return activity.participants.map(participant => {
      // Random metrics for demonstration
      const commentsCount = Math.floor(Math.random() * 20);
      const filesUploaded = Math.floor(Math.random() * 5);
      const milestonesCompleted = Math.floor(Math.random() * 3);
      const lastActive = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      
      // Calculate total contribution score
      const contributionScore = commentsCount * 2 + filesUploaded * 5 + milestonesCompleted * 10;
      
      // Determine badges based on contribution
      const badges = [];
      if (commentsCount > 10) badges.push({ type: 'communicator', label: 'Active Communicator' });
      if (filesUploaded > 3) badges.push({ type: 'resource', label: 'Resource Provider' });
      if (milestonesCompleted > 1) badges.push({ type: 'achiever', label: 'Milestone Achiever' });
      if (contributionScore > 30) badges.push({ type: 'star', label: 'Rising Star' });
      if (participant.role === 'admin') badges.push({ type: 'leader', label: 'Team Leader' });
      
      return {
        ...participant,
        contributionScore,
        commentsCount,
        filesUploaded,
        milestonesCompleted,
        lastActive,
        badges
      };
    })
    .sort((a, b) => b.contributionScore - a.contributionScore);
  };

  // Render badges for a contributor
  const renderBadges = (badges) => {
    if (!badges || badges.length === 0) return null;
    
    const badgeIcons = {
      communicator: '💬',
      resource: '📁',
      achiever: '🏆',
      star: '⭐',
      leader: '👑'
    };
    
    return (
      <div className="recognition-badges">
        {badges.map((badge, index) => (
          <span 
            key={index} 
            className={`recognition-badge ${badge.type}`}
            title={badge.label}
          >
            {badgeIcons[badge.type]}
          </span>
        ))}
      </div>
    );
  };

  // Filter contributors to show based on showAll state
  const displayedContributors = showAll ? contributors : contributors.slice(0, 3);

  return (
    <div className="member-recognition">
      <div className="recognition-header">
        <h3>Member Recognition</h3>
        <div className="recognition-controls">
          <select 
            value={recognitionPeriod}
            onChange={(e) => setRecognitionPeriod(e.target.value)}
            className="period-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      
      {contributors.length === 0 ? (
        <div className="no-contributors">
          <p>No contributor data available for this period.</p>
        </div>
      ) : (
        <>
          <div className="contributors-list">
            {displayedContributors.map((contributor, index) => (
              <div key={contributor.id || index} className="contributor-card">
                <div className="contributor-header">
                  <div className="contributor-avatar" style={{ 
                    backgroundImage: contributor.avatar ? `url(${contributor.avatar})` : 'none',
                    backgroundColor: !contributor.avatar ? `hsl(${(index * 60) % 360}, 70%, 60%)` : 'transparent'
                  }}>
                    {!contributor.avatar && (contributor.name?.[0] || '?')}
                  </div>
                  <div className="contributor-info">
                    <div className="contributor-name">{contributor.name}</div>
                    <div className="contributor-role">{contributor.role}</div>
                  </div>
                  {renderBadges(contributor.badges)}
                </div>
                
                <div className="contribution-metrics">
                  <div className="metric">
                    <span className="metric-value">{contributor.commentsCount}</span>
                    <span className="metric-label">Comments</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{contributor.filesUploaded}</span>
                    <span className="metric-label">Files</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{contributor.milestonesCompleted}</span>
                    <span className="metric-label">Milestones</span>
                  </div>
                </div>
                
                <div className="contribution-score">
                  <div className="score-label">Contribution Score</div>
                  <div className="score-value">{contributor.contributionScore}</div>
                </div>
                
                <div className="last-active">
                  Last active: {contributor.lastActive.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          
          {contributors.length > 3 && (
            <button 
              className="show-more-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show All (${contributors.length})`}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MemberRecognition;
