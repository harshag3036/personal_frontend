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
 * @param {Boolean} props.compareMode - Whether to enable comparison of multiple roles (optional)
 */
const RolePermissionVisualization = ({ 
  roles = {},
  selectedRole = null,
  onRoleSelect = null,
  compareMode = false,
  compact = false
}) => {
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState(selectedRole ? [selectedRole] : []);
  const [expandedCategories, setExpandedCategories] = useState(['community', 'content', 'members', 'participation']);
  
  // Permission categories
  const permissionCategories = [
    { id: 'community', label: 'Community Management', icon: '🏠' },
    { id: 'content', label: 'Content & Activities', icon: '📝' },
    { id: 'members', label: 'Member Management', icon: '👥' },
    { id: 'participation', label: 'Participation', icon: '🤝' }
  ];
  
  // All possible permissions across all roles, organized by category
  const allPermissions = {
    community: [
      { id: 'manage', label: 'Manage Community', icon: '⚙️', description: 'Full management of the community settings and structure', level: 'full' },
      { id: 'edit_settings', label: 'Edit Settings', icon: '🔧', description: 'Edit community settings and configuration', level: 'full' },
      { id: 'view_analytics', label: 'View Analytics', icon: '📊', description: 'Access community analytics and insights', level: 'partial' }
    ],
    content: [
      { id: 'edit', label: 'Edit Content', icon: '✏️', description: 'Edit any content within the community', level: 'full' },
      { id: 'moderate', label: 'Moderate Content', icon: '🛡️', description: 'Review and moderate community content', level: 'full' },
      { id: 'manage_content', label: 'Manage Content', icon: '📝', description: 'Organize and manage community content', level: 'partial' },
      { id: 'create_activities', label: 'Create Activities', icon: '🎯', description: 'Create new activities for the community', level: 'partial' },
      { id: 'create_content', label: 'Create Content', icon: '📄', description: 'Create new content in the community', level: 'basic' }
    ],
    members: [
      { id: 'invite', label: 'Invite Members', icon: '👥', description: 'Invite new members to join the community', level: 'basic' },
      { id: 'assign_roles', label: 'Assign Roles', icon: '👑', description: 'Change roles of other community members', level: 'full' },
      { id: 'remove_members', label: 'Remove Members', icon: '🚫', description: 'Remove members from the community', level: 'full' },
      { id: 'guide', label: 'Guide Members', icon: '🧭', description: 'Provide guidance to community members', level: 'partial' }
    ],
    participation: [
      { id: 'participate', label: 'Participate', icon: '🤝', description: 'Participate in community activities and discussions', level: 'basic' },
      { id: 'comment', label: 'Comment', icon: '💬', description: 'Comment on content and discussions', level: 'basic' },
      { id: 'react', label: 'React', icon: '👍', description: 'React to content and comments', level: 'basic' }
    ]
  };
  
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
  
  // Handle role selection in compare mode
  const handleRoleSelect = (roleId) => {
    if (compareMode) {
      setSelectedRoles(prev => {
        if (prev.includes(roleId)) {
          return prev.filter(id => id !== roleId);
        } else {
          return [...prev, roleId];
        }
      });
    } else if (onRoleSelect) {
      onRoleSelect(roleId);
    }
  };
  
  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  // Get permission level indicator
  const getPermissionLevelIndicator = (level) => {
    switch (level) {
      case 'full':
        return { icon: '●', color: 'var(--primary)', label: 'Full Access' };
      case 'partial':
        return { icon: '◐', color: 'var(--accent)', label: 'Partial Access' };
      case 'basic':
        return { icon: '○', color: 'var(--text-secondary)', label: 'Basic Access' };
      default:
        return { icon: '×', color: 'var(--text-tertiary)', label: 'No Access' };
    }
  };
  
  // Render permission grid for a single role
  const renderSingleRolePermissions = () => {
    return (
      <div className={`permission-categories ${compact ? 'compact' : ''}`}>
        {permissionCategories.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          
          return (
            <div key={category.id} className="permission-category">
              <div 
                className="category-header"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <h4 className="category-label">{category.label}</h4>
                <div className="category-toggle">
                  {isExpanded ? '▼' : '►'}
                </div>
              </div>
              
              {isExpanded && (
                <div className="permission-grid">
                  {allPermissions[category.id].map(permission => {
                    const hasPermission = activeRole && 
                      roles[activeRole]?.permissions.includes(permission.id);
                    
                    return (
                      <div 
                        key={permission.id}
                        className={`permission-item ${hasPermission ? 'has-permission' : 'no-permission'}`}
                      >
                        <div className="permission-icon">{permission.icon}</div>
                        <div className="permission-info">
                          <div className="permission-label">{permission.label}</div>
                          <div className="permission-description">{permission.description}</div>
                        </div>
                        <div 
                          className="permission-status"
                          title={hasPermission ? 'Has Permission' : 'No Permission'}
                        >
                          {hasPermission ? '✓' : '✗'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render permission comparison for multiple roles
  const renderCompareRolePermissions = () => {
    return (
      <div className="permission-comparison">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="permission-column">Permission</th>
              {selectedRoles.map(roleId => (
                <th key={roleId} className="role-column">
                  <div 
                    className="role-header"
                    style={{ 
                      backgroundColor: roleColors[roleId]?.bg,
                      color: roleColors[roleId]?.text
                    }}
                  >
                    {roles[roleId]?.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionCategories.map(category => (
              <React.Fragment key={category.id}>
                <tr className="category-row">
                  <td colSpan={selectedRoles.length + 1} className="category-cell">
                    <div className="category-header-cell">
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-label">{category.label}</span>
                    </div>
                  </td>
                </tr>
                {allPermissions[category.id].map(permission => (
                  <tr key={permission.id} className="permission-row">
                    <td className="permission-cell">
                      <div className="permission-cell-content">
                        <span className="permission-icon">{permission.icon}</span>
                        <span className="permission-label">{permission.label}</span>
                      </div>
                    </td>
                    {selectedRoles.map(roleId => {
                      const hasPermission = roles[roleId]?.permissions.includes(permission.id);
                      return (
                        <td 
                          key={roleId} 
                          className={`role-permission-cell ${hasPermission ? 'has-permission' : 'no-permission'}`}
                          title={`${roles[roleId]?.label} ${hasPermission ? 'has' : 'does not have'} permission to ${permission.label}`}
                        >
                          {hasPermission ? '✓' : '✗'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="role-permission-visualization">
      <div className="visualization-controls">
        <div className="view-toggle">
          <label className="compare-toggle">
            <input 
              type="checkbox" 
              checked={compareMode}
              onChange={() => onRoleSelect && onRoleSelect(compareMode ? selectedRole : null, !compareMode)}
            />
            <span>Compare Roles</span>
          </label>
        </div>
        
        <div className="legend">
          <div className="legend-item">
            <span className="legend-icon" style={{ color: 'var(--primary)' }}>✓</span>
            <span className="legend-label">Has Permission</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon" style={{ color: 'var(--text-tertiary)' }}>✗</span>
            <span className="legend-label">No Permission</span>
          </div>
        </div>
      </div>
      
      <div className="role-list">
        {Object.entries(roles).map(([roleId, role]) => {
          const roleColor = roleColors[roleId] || { bg: 'rgba(32, 82, 149, 0.08)', text: 'var(--primary)' };
          const isSelected = compareMode 
            ? selectedRoles.includes(roleId)
            : selectedRole === roleId;
          
          return (
            <div 
              key={roleId}
              className={`role-item ${activeRole === roleId ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
              onMouseEnter={() => setHoveredRole(roleId)}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => handleRoleSelect(roleId)}
            >
              <div 
                className="role-badge"
                style={{ 
                  backgroundColor: roleColor.bg,
                  color: roleColor.text
                }}
              >
                {role.label}
                {compareMode && isSelected && (
                  <span className="selected-indicator">✓</span>
                )}
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
      
      {compareMode && selectedRoles.length > 0 
        ? renderCompareRolePermissions() 
        : renderSingleRolePermissions()
      }
      
      {compareMode && selectedRoles.length === 0 && (
        <div className="empty-selection">
          <p>Select at least one role to view permissions</p>
        </div>
      )}
    </div>
  );
};

export default RolePermissionVisualization;
