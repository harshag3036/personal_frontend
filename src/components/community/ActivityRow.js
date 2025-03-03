import React from 'react';
import StatusBadge from './shared/StatusBadge';
import './ActivityDisplay.css';
import './ActivityRow.css';

/**
 * ActivityRow Component
 * 
 * A reusable row component for displaying activity information in list view.
 * This component extracts the activity row rendering logic from ActivityDisplay
 * for better modularity and reusability.
 */
const ActivityRow = ({ 
  activity, 
  typeConfig, 
  categories, 
  formatDate, 
  onClick,
  showParticipants = true,
  maxDescriptionLength = 150
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
  
  // Get category info
  const categoryInfo = activity.category ? 
    categories.find(c => c.value === activity.category) || 
    { icon: '📂', label: activity.category } : 
    null;
  
  return (
    <div 
      className="activity-row"
      onClick={() => onClick(activity.id)}
      data-status={activity.status}
    >
      <div className="activity-row-type" style={{ color: typeInfo.color }}>
        <span className="activity-type-icon-small">{typeInfo.icon}</span>
        <span className="activity-type-label">{typeInfo.label}</span>
      </div>
      
      <div className="activity-row-content">
        <div className="activity-row-header">
          <h3 className="activity-row-title">{activity.title}</h3>
          {categoryInfo && (
            <div className="activity-row-category">
              <span className="category-icon">{categoryInfo.icon}</span>
              <span className="category-label">{categoryInfo.label}</span>
            </div>
          )}
        </div>
        
        <p className="activity-row-description">{description}</p>
        
        {activity.tags && activity.tags.length > 0 && (
          <div className="activity-row-tags">
            {activity.tags.map(tag => (
              <span key={tag} className="activity-row-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div className="activity-row-meta">
        <StatusBadge status={activity.status} />
        
        <div className="activity-row-progress-container">
          <div 
            className="activity-row-progress-bar" 
            style={{ width: `${progress}%`, backgroundColor: typeInfo.color }}
          ></div>
          <span className="activity-row-progress-text">{progress}%</span>
        </div>
        
        <span className="activity-row-date">{formatDate(activity.createdAt)}</span>
        
        {showParticipants && (
          <div className="activity-row-participants">
            <span className="participant-count">
              <span className="participant-icon">👥</span>
              <span className="participant-number">{activity.participants?.length || 0}</span>
            </span>
            
            {activity.participants && activity.participants.length > 0 && (
              <div className="row-participant-avatars">
                {activity.participants.slice(0, 3).map((participant, index) => (
                  <div 
                    key={participant.id || index} 
                    className="row-participant-avatar"
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
                  <div className="row-participant-avatar-more" title={`${activity.participants.length - 3} more participants`}>
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

export default ActivityRow;
