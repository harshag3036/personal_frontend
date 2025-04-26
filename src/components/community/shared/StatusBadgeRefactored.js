/**
 * StatusBadge Component (Refactored with UI Library)
 * 
 * A reusable badge component for displaying status information
 * This version uses the UI component library for styling
 */

import React from 'react';
import { Badge } from '../../../ui';

/**
 * Get appropriate badge variant based on status
 * 
 * @param {string} status - Status string
 * @returns {string} Badge variant
 */
const getVariantForStatus = (status) => {
  if (!status) return 'secondary';
  
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'active':
    case 'approved':
    case 'completed':
    case 'success':
      return 'success';
      
    case 'pending':
    case 'in progress':
    case 'waiting':
    case 'reviewing':
      return 'info';
      
    case 'warning':
    case 'attention':
    case 'needs review':
      return 'warning';
      
    case 'error':
    case 'rejected':
    case 'failed':
    case 'blocked':
      return 'error';
      
    case 'draft':
    case 'inactive':
    case 'archived':
      return 'outline';
      
    default:
      return 'secondary';
  }
};

/**
 * StatusBadge Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.status - Status value (active, inactive, pending, blocked, etc.)
 * @param {string} props.label - Optional custom label (if not provided, status will be used)
 * @param {string} props.className - Additional CSS class names
 * @param {Object} props.style - Additional inline styles
 * @returns {JSX.Element|null} StatusBadge component or null if no status
 */
const StatusBadgeRefactored = ({ 
  status, 
  label, 
  className = '', 
  style = {},
  ...restProps
}) => {
  if (!status) return null;

  // Format status for display if no label is provided
  const displayText = label || status.replace(/-/g, ' ');
  
  // Get appropriate variant based on status
  const variant = getVariantForStatus(status);
  
  return (
    <Badge 
      variant={variant}
      className={className}
      style={style}
      data-testid={`status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
      {...restProps}
    >
      {displayText}
    </Badge>
  );
};

export default StatusBadgeRefactored;
