import React from 'react';
import StatusBadge from './shared/StatusBadge';
import './ActivityDisplay.css';
import './ActivityCard.css';

/**
 * ActivityCard Component
 * 
 * A reusable card component for displaying activity information in grid view.
 * This component extracts the activity card rendering logic from ActivityDisplay
 * for better modularity and reusability.
 */
const ActivityCard = ({ 
  activity, 
  typeConfig, 
  categories, 
  formatDate, 
  onClick,
  showParticipants = true,
  showCategory = true,
  showTags = true,
  maxDescriptionLength = 120
}) => {
  const typeInfo = typeConfig[activity.type] || { icon: '📋', color: '#607d8b', label: 'Activity' };
  
  // Truncate description if it's too long
  const truncateDescription = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Format description
  const description = truncateDescription(activity.description, maxDescriptionLength);
  
  // Get category info
  const categoryInfo = activity.category ? 
    categories.find(c => c.value === activity.category) || 
    { icon: '📂', label: activity.category } : 
    null;
  
  // Calculate activity progress
  const getActivityProgress = () => {
    if (activity.status === 'completed') return 100;
    if (activity.status === 'draft') return 0;
    
    // If there's explicit progress data, use it
    if (activity.progress !== undefined) return activity.progress;
    
    // Otherwise estimate based on dates if available
    if (activity.startDate && activity.endDate) {
      const start = new Date(activity.startDate).getTime();
      const end = new Date(activity.endDate).getTime();
      const now = new Date().getTime();
      
      if (now < start) return 0;
      if (now > end) return 100;
      
      return Math.round(((now - start) / (end - start)) * 100);
    }
    
    // Default progress for active activities without dates
    return activity.status === 'active' ? 50 : 0;
  };
  
  const progress = getActivityProgress();
  
  return (
    <div 
      className="activity-card"
      onClick={() => onClick(activity.id)}
      style={{ borderTopColor: typeInfo.color }}
      data-status={activity.status}
    >
      <div className="activity-card-header">
        <span className="activity-type-icon" style={{ backgroundColor: typeInfo.color }}>
          {typeInfo.icon}
        </span>
        <StatusBadge status={activity.status} />
      </div>
      
      <h3 className="activity-card-title">{activity.title}</h3>
      
      {showCategory && categoryInfo && (
        <div className="activity-category">
          {categoryInfo.icon} {categoryInfo.label}
        </div>
      )}
      
      <p className="activity-card-description">{description}</p>
      
      {showTags && activity.tags && activity.tags.length > 0 && (
        <div className="activity-tags">
          {activity.tags.slice(0, 3).map(tag => (
            <span key={tag} className="activity-tag">{tag}</span>
          ))}
          {activity.tags.length > 3 && (
            <span className="activity-tag-more">+{activity.tags.length - 3}</span>
          )}
        </div>
      )}
      
      {/* Activity progress bar */}
      <div className="activity-progress-container">
        <div 
          className="activity-progress-bar" 
          style={{ width: `${progress}%`, backgroundColor: typeInfo.color }}
        ></div>
      </div>
      
      <div className="activity-card-footer">
        <span className="activity-date">{formatDate(activity.createdAt)}</span>
        {showParticipants && (
          <div className="activity-participants-container">
            <span className="participant-count">
              <span className="participant-icon">👥</span>
              {activity.participants?.length || 0}
            </span>
            {activity.participants && activity.participants.length > 0 && (
              <div className="participant-avatars">
                {activity.participants.slice(0, 3).map((participant, index) => (
                  <div 
                    key={participant.id || index} 
                    className="participant-avatar"
                    title={participant.name || `Participant ${index + 1}`}
                    style={{ 
                      backgroundImage: participant.avatar ? `url(${participant.avatar})` : 'none',
                      backgroundColor: !participant.avatar ? `hsl(${(index * 60) % 360}, 70%, 60%)` : 'transparent',
                      zIndex: 3 - index
                    }}
                  >
                    {!participant.avatar && (participant.name?.[0] || '?')}
                  </div>
                ))}
                {activity.participants.length > 3 && (
                  <div className="participant-avatar-more" title={`${activity.participants.length - 3} more participants`}>
                    +{activity.participants.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
