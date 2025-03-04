import React from 'react';
import './SharedComponents.css';

/**
 * CommunityCard Component
 * 
 * A reusable card component for displaying community information
 * 
 * @param {Object} props
 * @param {Object} props.community - Community data object
 * @param {string} props.community.id - Community ID
 * @param {string} props.community.name - Community name
 * @param {string} props.community.description - Community description
 * @param {string} props.community.category - Community category
 * @param {number} props.community.memberCount - Number of members
 * @param {number} props.community.activityCount - Number of activities
 * @param {string} props.community.lastActive - Last activity time
 * @param {string} props.community.type - Community type (open/private)
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS class names
 * @param {Object} props.style - Additional inline styles
 */
const CommunityCard = ({ 
  community, 
  onClick, 
  className = '', 
  style = {} 
}) => {
  if (!community) return null;

  const {
    id,
    name,
    description,
    category,
    memberCount,
    activityCount,
    lastActive,
    type
  } = community;

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick(id);
    }
  };

  return (
    <div 
      className={`community-card ${type} ${className}`}
      onClick={handleClick}
      style={style}
      data-testid={`community-card-${id}`}
    >
      <div className="community-card-header">
        <h3 className="community-card-title">{name}</h3>
        <div className={`community-card-type ${type}`}>
          {type === 'private' ? 'Private Circle' : 'Open Community'}
        </div>
      </div>
      
      <p className="community-card-description">{description}</p>
      
      <div className="community-card-category">
        <span className="category-tag">{category}</span>
      </div>
      
      <div className="community-card-stats">
        <div className="stat">
          <strong>{memberCount}</strong>
          <span>Members</span>
        </div>
        <div className="stat">
          <strong>{activityCount}</strong>
          <span>Activities</span>
        </div>
        <div className="community-card-last-active">
          Active {lastActive}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
