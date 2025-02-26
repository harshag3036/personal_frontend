import React from 'react';
import './SharedComponents.css';

/**
 * RoleBadge Component
 * 
 * A reusable badge component for displaying user roles
 * 
 * @param {Object} props
 * @param {string} props.role - Role value (organizer, moderator, mentor, contributor, participant, etc.)
 * @param {string} props.label - Optional custom label (if not provided, role will be used)
 * @param {string} props.className - Additional CSS class names
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.showTooltip - Whether to show a tooltip with role description
 */
const RoleBadge = ({ 
  role, 
  label, 
  className = '', 
  style = {},
  showTooltip = false
}) => {
  if (!role) return null;

  // Format role for display if no label is provided
  const displayText = label || role.charAt(0).toUpperCase() + role.slice(1);
  
  // Convert to lowercase and remove spaces for CSS class
  const roleClass = role.toLowerCase().replace(/\s+/g, '-');

  // Role descriptions for tooltips
  const roleDescriptions = {
    organizer: 'Full control over the community and its activities',
    moderator: 'Help maintain community standards and manage content',
    mentor: 'Guide and support other members in their journey',
    contributor: 'Regular contributors who can create content and activities',
    participant: 'Regular community members who can participate in activities',
    member: 'Regular community members',
    admin: 'Administrator with full control'
  };

  const tooltipText = roleDescriptions[role] || '';

  return (
    <span 
      className={`role-badge ${roleClass} ${className}`}
      style={style}
      data-testid={`role-badge-${roleClass}`}
      title={showTooltip ? tooltipText : ''}
    >
      {displayText}
    </span>
  );
};

export default RoleBadge;
