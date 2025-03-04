import React, { useState } from 'react';
import './ActivityRoles.css';

/**
 * ActivityRoles Component
 * Manages activity roles and permissions
 * Supports role creation, permission management, and access control
 */
const ActivityRoles = ({ activity, onUpdateActivity }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [rolePermissions, setRolePermissions] = useState({
    manageParticipants: false,
    manageContent: false,
    manageRoles: false,
    manageSettings: false,
    createPosts: true,
    editPosts: false,
    deletePosts: false,
    createComments: true,
    editComments: false,
    deleteComments: false,
    uploadFiles: false,
    downloadFiles: true,
    viewAnalytics: false,
    exportData: false
  });
  const [error, setError] = useState(null);

  const handleAddRole = async (e) => {
    e.preventDefault();
    setError(null);

    if (!roleName.trim()) {
      setError('Please provide role name');
      return;
    }

    try {
      const newRole = {
        id: Date.now().toString(),
        name: roleName.trim(),
        description: roleDescription.trim(),
        permissions: { ...rolePermissions },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        roles: [...(activity.roles || []), newRole]
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedRole) return;

    try {
      const updatedRole = {
        ...selectedRole,
        name: roleName.trim(),
        description: roleDescription.trim(),
        permissions: { ...rolePermissions },
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        roles: activity.roles.map(role =>
          role.id === selectedRole.id ? updatedRole : role
        )
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const updatedActivity = {
        ...activity,
        roles: activity.roles.filter(role => role.id !== roleId)
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setRolePermissions(role.permissions);
  };

  const resetForm = () => {
    setSelectedRole(null);
    setRoleName('');
    setRoleDescription('');
    setRolePermissions({
      manageParticipants: false,
      manageContent: false,
      manageRoles: false,
      manageSettings: false,
      createPosts: true,
      editPosts: false,
      deletePosts: false,
      createComments: true,
      editComments: false,
      deleteComments: false,
      uploadFiles: false,
      downloadFiles: true,
      viewAnalytics: false,
      exportData: false
    });
  };

  const getPermissionLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^./, str => str.toUpperCase());
  };

  const getPermissionDescription = (key) => {
    const descriptions = {
      manageParticipants: 'Add, remove, and manage participant roles',
      manageContent: 'Moderate and manage all content',
      manageRoles: 'Create and manage roles and permissions',
      manageSettings: 'Configure activity settings',
      createPosts: 'Create new posts and discussions',
      editPosts: 'Edit own posts and discussions',
      deletePosts: 'Delete own posts and discussions',
      createComments: 'Add comments to posts and discussions',
      editComments: 'Edit own comments',
      deleteComments: 'Delete own comments',
      uploadFiles: 'Upload files and resources',
      downloadFiles: 'Download shared files and resources',
      viewAnalytics: 'View activity analytics and insights',
      exportData: 'Export activity data and reports'
    };
    return descriptions[key] || '';
  };

  const getPermissionCategory = (key) => {
    if (key.startsWith('manage')) return 'Management';
    if (key.includes('Post')) return 'Posts';
    if (key.includes('Comment')) return 'Comments';
    if (key.includes('File')) return 'Files';
    return 'Other';
  };

  const groupPermissionsByCategory = () => {
    const categories = {};
    Object.keys(rolePermissions).forEach(key => {
      const category = getPermissionCategory(key);
      if (!categories[category]) categories[category] = [];
      categories[category].push(key);
    });
    return categories;
  };

  const permissionCategories = groupPermissionsByCategory();

  return (
    <div className="activity-roles">
      <div className="roles-header">
        <h2>Roles & Permissions</h2>
      </div>

      <div className="roles-grid">
        <div className="roles-list">
          {(activity.roles || []).length > 0 ? (
            activity.roles.map(role => (
              <div
                key={role.id}
                className={`role-card ${selectedRole?.id === role.id ? 'selected' : ''}`}
                onClick={() => selectRole(role)}
              >
                <div className="role-header">
                  <h3>{role.name}</h3>
                  <span className="role-date">
                    Updated {new Date(role.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                {role.description && (
                  <p className="role-description">{role.description}</p>
                )}
                <div className="role-permissions">
                  <h4>Key Permissions</h4>
                  <div className="permission-tags">
                    {Object.entries(role.permissions)
                      .filter(([, value]) => value)
                      .slice(0, 3)
                      .map(([key]) => (
                        <span key={key} className="permission-tag">
                          {getPermissionLabel(key)}
                        </span>
                      ))}
                    {Object.values(role.permissions).filter(v => v).length > 3 && (
                      <span className="permission-tag more">
                        +{Object.values(role.permissions).filter(v => v).length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No roles defined</p>
              <p>Add roles to manage permissions</p>
            </div>
          )}
        </div>

        <form onSubmit={selectedRole ? handleUpdateRole : handleAddRole} className="role-form">
          <div className="form-section">
            <h3>{selectedRole ? 'Edit Role' : 'Add Role'}</h3>
            
            <div className="form-group">
              <label>Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
                placeholder="Enter role name..."
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={roleDescription}
                onChange={e => setRoleDescription(e.target.value)}
                placeholder="Describe this role..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Permissions</label>
              {Object.entries(permissionCategories).map(([category, permissions]) => (
                <div key={category} className="permission-category">
                  <h4>{category}</h4>
                  {permissions.map(key => (
                    <div key={key} className="permission-item">
                      <label className="permission-label">
                        <input
                          type="checkbox"
                          checked={rolePermissions[key]}
                          onChange={e => setRolePermissions({
                            ...rolePermissions,
                            [key]: e.target.checked
                          })}
                        />
                        <span className="permission-name">
                          {getPermissionLabel(key)}
                        </span>
                      </label>
                      <span className="permission-description">
                        {getPermissionDescription(key)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            {selectedRole && (
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteRole(selectedRole.id)}
              >
                Delete Role
              </button>
            )}
            <div className="action-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                {selectedRole ? 'Update Role' : 'Add Role'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityRoles;
