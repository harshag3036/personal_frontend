import React, { useState } from 'react';
import './SharedComponents.css';

/**
 * RolePermissionVisualization Component
 * 
 * Displays a visual representation of roles and their associated permissions
 * in a community. Helps users understand the different roles and what they can do.
 * 
 * @param {Object} props
 * @param {Object} props.roles - Object containing role definitions
 * @param {String} props.selectedRole - Currently selected role (optional)
 * @param {Function} props.onRoleSelect - Function to call when a role is selected (optional)
 */
const RolePermissionVisualization = ({ 
  roles = {},
  selectedRole = null,
  onRoleSelect = null
}) => {
  const [hoveredRole, setHoveredRole] = useState(null);
  
  // All possible permissions across all roles
  const allPermissions = [
    { id: 'manage', label: 'Manage Community', icon: '⚙️', description: 'Full management of the community settings and structure' },
    { id: 'edit', label: 'Edit Content', icon: '✏️', description: 'Edit any content within the community' },
    { id: 'invite', label: 'Invite Members', icon: '👥', description: 'Invite new members to join the community' },
    { id: 'moderate', label: 'Moderate Content', icon: '🛡️', description: 'Review and moderate community content' },
    { id: 'assign_roles', label: 'Assign Roles', icon: '👑', description: 'Change roles of other community members' },
    { id: 'manage_content', label: 'Manage Content', icon: '📝', description: 'Organize and manage community content' },
    { id: 'guide', label: 'Guide Members', icon: '🧭', description: 'Provide guidance to community members' },
    { id: 'create_activities', label: 'Create Activities', icon: '🎯', description: 'Create new activities for the community' },
    { id: 'create_content', label: 'Create Content', icon: '📄', description: 'Create new content in the community' },
    { id: 'participate', label: 'Participate', icon: '🤝', description: 'Participate in community activities and discussions' }
  ];
  
  // Get the active role (either hovered or selected)
  const activeRole = hoveredRole || selectedRole;
  
  // Role colors with better contrast and softer tones
  const roleColors = {
    organizer: { bg: 'rgba(10, 38, 71, 0.08)', text: 'var(--primary-dark)' },
    admin: { bg: 'rgba(10, 38, 71, 0.08)', text: 'var(--primary-dark)' },
    moderator: { bg: 'rgba(46, 139, 87, 0.08)', text: 'var(--accent)' },
    mentor: { bg: 'rgba(106, 27, 154, 0.08)', text: '#6a1b9a' },
    contributor: { bg: 'rgba(25, 118, 210, 0.08)', text: 'var(--primary-light)' },
    participant: { bg: 'rgba(32, 82, 149, 0.08)', text: 'var(--primary)' },
    member: { bg: 'rgba(32, 82, 149, 0.08)', text: 'var(--primary)' }
  };
  
  return (
    <div className="role-permission-visualization">
      <div className="role-list">
        {Object.entries(roles).map(([roleId, role]) => {
          const roleColor = roleColors[roleId] || { bg: 'rgba(32, 82, 149, 0.08)', text: 'var(--primary)' };
          
          return (
            <div 
              key={roleId}
              className={`role-item ${activeRole === roleId ? 'active' : ''} ${selectedRole === roleId ? 'selected' : ''}`}
              onMouseEnter={() => setHoveredRole(roleId)}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => onRoleSelect && onRoleSelect(roleId)}
            >
              <div 
                className="role-badge"
                style={{ 
                  backgroundColor: roleColor.bg,
                  color: roleColor.text
                }}
              >
                {role.label}
              </div>
              {activeRole === roleId && (
                <div className="role-description">
                  {role.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="permission-grid">
        {allPermissions.map(permission => {
          const hasPermission = activeRole && 
            roles[activeRole]?.permissions.includes(permission.id);
          
          return (
            <div 
              key={permission.id}
              className={`permission-item ${hasPermission ? 'has-permission' : 'no-permission'}`}
              title={permission.description}
            >
              <div className="permission-icon">{permission.icon}</div>
              <div className="permission-label">{permission.label}</div>
              <div className="permission-status">
                {hasPermission ? '✓' : '✗'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RolePermissionVisualization;
