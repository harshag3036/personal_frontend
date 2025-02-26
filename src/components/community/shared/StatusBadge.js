import React from 'react';
import './SharedComponents.css';

/**
 * StatusBadge Component
 * 
 * A reusable badge component for displaying status information
 * 
 * @param {Object} props
 * @param {string} props.status - Status value (active, inactive, pending, blocked, etc.)
 * @param {string} props.label - Optional custom label (if not provided, status will be used)
 * @param {string} props.className - Additional CSS class names
 * @param {Object} props.style - Additional inline styles
 */
const StatusBadge = ({ 
  status, 
  label, 
  className = '', 
  style = {} 
}) => {
  if (!status) return null;

  // Format status for display if no label is provided
  const displayText = label || status.replace(/-/g, ' ');
  
  // Convert to lowercase and remove spaces for CSS class
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <span 
      className={`status-badge ${statusClass} ${className}`}
      style={style}
      data-testid={`status-badge-${statusClass}`}
    >
      {displayText}
    </span>
  );
};

export default StatusBadge;
