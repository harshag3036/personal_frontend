import React, { useState, useMemo } from 'react';
import { useUser } from '../../contexts/UserContext';
import { SectionHeader, RolePermissionVisualization } from './shared';
import './MemberDirectory.css';

/**
 * MemberDirectory Component
 * 
 * Enhanced directory for community members with advanced filtering,
 * sorting, and detailed member information display.
 * 
 * @param {Object} props
 * @param {Array} props.members - List of community members
 * @param {String} props.communityId - ID of the community
 * @param {Function} props.onUpdateMember - Function to call when updating a member
 */
const MemberDirectory = ({ 
  members = [], 
  communityId,
  onUpdateMember 
}) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    joinDateFrom: '',
    joinDateTo: '',
    activityLevel: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Define roles with their properties
  const roles = {
    organizer: {
      label: 'Organizer',
      color: '#c62828',
      permissions: ['manage', 'edit', 'invite', 'moderate', 'assign_roles'],
      description: 'Full control over the community and its activities'
    },
    admin: {
      label: 'Admin',
      color: '#c62828',
      permissions: ['manage', 'edit', 'invite', 'moderate', 'assign_roles'],
      description: 'Full control over the community and its activities'
    },
    moderator: {
      label: 'Moderator',
      color: '#2e7d32',
      permissions: ['moderate', 'invite', 'manage_content'],
      description: 'Help maintain community standards and manage content'
    },
    mentor: {
      label: 'Mentor',
      color: '#6a1b9a',
      permissions: ['guide', 'invite', 'create_activities'],
      description: 'Guide and support other members in their journey'
    },
    contributor: {
      label: 'Contributor',
      color: '#0277bd',
      permissions: ['create_content', 'participate', 'invite'],
      description: 'Regular contributors who can create content and activities'
    },
    participant: {
      label: 'Participant',
      color: '#1976d2',
      permissions: ['participate'],
      description: 'Regular community members who can participate in activities'
    },
    member: {
      label: 'Member',
      color: '#1976d2',
      permissions: ['participate'],
      description: 'Regular community members who can participate in activities'
    }
  };

  // Define member statuses
  const memberStatuses = {
    active: { label: 'Active', color: '#43a047' },
    inactive: { label: 'Inactive', color: '#757575' },
    pending: { label: 'Pending', color: '#fb8c00' },
    blocked: { label: 'Blocked', color: '#d32f2f' }
  };

  // Define activity levels
  const activityLevels = {
    high: { label: 'High', description: 'Very active in the last 30 days' },
    medium: { label: 'Medium', description: 'Moderately active in the last 30 days' },
    low: { label: 'Low', description: 'Minimal activity in the last 30 days' },
    none: { label: 'None', description: 'No activity in the last 30 days' }
  };

  // Filter members based on search term and filters
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      // Search term filter
      const matchesSearch = 
        (member.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.email?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (!matchesSearch) return false;
      
      // Role filter
      if (filters.role !== 'all' && member.role !== filters.role) {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all' && member.status !== filters.status) {
        return false;
      }
      
      // Join date range filter
      if (filters.joinDateFrom) {
        const joinDate = new Date(member.joinedAt);
        const fromDate = new Date(filters.joinDateFrom);
        if (joinDate < fromDate) return false;
      }
      
      if (filters.joinDateTo) {
        const joinDate = new Date(member.joinedAt);
        const toDate = new Date(filters.joinDateTo);
        // Set time to end of day
        toDate.setHours(23, 59, 59, 999);
        if (joinDate > toDate) return false;
      }
      
      // Activity level filter
      if (filters.activityLevel !== 'all' && member.activityLevel !== filters.activityLevel) {
        return false;
      }
      
      return true;
    });
  }, [members, searchTerm, filters]);

  // Sort filtered members
  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'joinDate':
          comparison = new Date(a.joinedAt) - new Date(b.joinedAt);
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'activityLevel':
          const activityOrder = { high: 3, medium: 2, low: 1, none: 0 };
          comparison = activityOrder[a.activityLevel] - activityOrder[b.activityLevel];
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredMembers, sortBy, sortDirection]);

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle sort changes
  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle direction if clicking the same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      role: 'all',
      status: 'all',
      joinDateFrom: '',
      joinDateTo: '',
      activityLevel: 'all'
    });
    setSearchTerm('');
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.role !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.joinDateFrom) count++;
    if (filters.joinDateTo) count++;
    if (filters.activityLevel !== 'all') count++;
    if (searchTerm) count++;
    return count;
  }, [filters, searchTerm]);

  // Check if current user has permission
  const hasPermission = (permission) => {
    const currentMember = members.find(m => m.id === user?.id);
    if (!currentMember) return false;
    
    return roles[currentMember.role]?.permissions.includes(permission);
  };

  // Render member filters
  const renderFilters = () => {
    if (!showFilters) return null;
    
    return (
      <div className="member-filters">
        <div className="filter-group">
          <h4>Role</h4>
          <select 
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            {Object.entries(roles).map(([key, role]) => (
              <option key={key} value={key}>{role.label}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <h4>Status</h4>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            {Object.entries(memberStatuses).map(([key, status]) => (
              <option key={key} value={key}>{status.label}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <h4>Join Date</h4>
          <div className="date-range">
            <div className="date-input">
              <label>From</label>
              <input 
                type="date" 
                value={filters.joinDateFrom}
                onChange={(e) => handleFilterChange('joinDateFrom', e.target.value)}
              />
            </div>
            <div className="date-input">
              <label>To</label>
              <input 
                type="date" 
                value={filters.joinDateTo}
                onChange={(e) => handleFilterChange('joinDateTo', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="filter-group">
          <h4>Activity Level</h4>
          <select 
            value={filters.activityLevel}
            onChange={(e) => handleFilterChange('activityLevel', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Activity Levels</option>
            {Object.entries(activityLevels).map(([key, level]) => (
              <option key={key} value={key}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate time since join
  const getTimeSinceJoin = (dateString) => {
    const joinDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
  };

  return (
    <div className="member-directory">
      <SectionHeader 
        title="Member Directory" 
        subtitle={`${members.length} members in this community`}
        actions={
          <button 
            className="invite-button"
            onClick={() => window.dispatchEvent(new CustomEvent('show-invite-modal'))}
          >
            Invite Member
          </button>
        }
      />
      
      <div className="directory-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <button 
            className="toggle-filters-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="filter-count">{activeFilterCount}</span>
            )}
          </button>
          
          {activeFilterCount > 0 && (
            <button 
              className="reset-filters-button"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
      
      {renderFilters()}
      
      <div className="sort-controls">
        <span>Sort by:</span>
        <div className="sort-buttons">
          <button 
            className={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
            onClick={() => handleSortChange('name')}
          >
            Name
            {sortBy === 'name' && (
              <span className="sort-direction">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          
          <button 
            className={`sort-button ${sortBy === 'joinDate' ? 'active' : ''}`}
            onClick={() => handleSortChange('joinDate')}
          >
            Join Date
            {sortBy === 'joinDate' && (
              <span className="sort-direction">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          
          <button 
            className={`sort-button ${sortBy === 'role' ? 'active' : ''}`}
            onClick={() => handleSortChange('role')}
          >
            Role
            {sortBy === 'role' && (
              <span className="sort-direction">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          
          <button 
            className={`sort-button ${sortBy === 'activityLevel' ? 'active' : ''}`}
            onClick={() => handleSortChange('activityLevel')}
          >
            Activity
            {sortBy === 'activityLevel' && (
              <span className="sort-direction">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Role & Permission Visualization */}
      <div className="role-permission-section">
        <h3>Community Roles & Permissions</h3>
        <p>Understand what each role can do in this community</p>
        <RolePermissionVisualization 
          roles={roles}
          selectedRole={filters.role !== 'all' ? filters.role : null}
          onRoleSelect={(role) => handleFilterChange('role', role)}
        />
      </div>
      
      <div className="members-grid">
        {sortedMembers.length > 0 ? (
          sortedMembers.map(member => (
            <div key={member.id} className="member-card">
              <div className="member-header">
                <div className="member-avatar">
                  {member.avatar ? (
                    <img src={member.avatar} alt={`${member.name}'s avatar`} />
                  ) : (
                    <div className="avatar-placeholder">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <div className="member-badges">
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: roles[member.role]?.color }}
                      title={roles[member.role]?.description}
                    >
                      {roles[member.role]?.label}
                    </span>
                    
                    <span 
                      className={`status-badge ${member.status}`}
                      style={{ backgroundColor: memberStatuses[member.status]?.color }}
                    >
                      {memberStatuses[member.status]?.label}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="member-details">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{member.email}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Joined:</span>
                  <span className="detail-value" title={formatDate(member.joinedAt)}>
                    {getTimeSinceJoin(member.joinedAt)} ago
                  </span>
                </div>
                
                {member.lastActive && (
                  <div className="detail-item">
                    <span className="detail-label">Last Active:</span>
                    <span className="detail-value" title={formatDate(member.lastActive)}>
                      {formatDate(member.lastActive)}
                    </span>
                  </div>
                )}
                
                {member.activityLevel && (
                  <div className="detail-item">
                    <span className="detail-label">Activity:</span>
                    <span className={`activity-level ${member.activityLevel}`}>
                      {activityLevels[member.activityLevel]?.label}
                    </span>
                  </div>
                )}
                
                {member.skills && member.skills.length > 0 && (
                  <div className="detail-item skills">
                    <span className="detail-label">Skills:</span>
                    <div className="skills-list">
                      {member.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {hasPermission('manage') && (
                <div className="member-actions">
                  <button className="action-button view-profile">
                    View Profile
                  </button>
                  
                  {hasPermission('assign_roles') && member.id !== user?.id && (
                    <select
                      value={member.role}
                      onChange={(e) => onUpdateMember(member.id, { role: e.target.value })}
                      className="role-select"
                    >
                      {Object.entries(roles)
                        .filter(([key]) => {
                          // Only show roles the current user can assign
                          const currentMember = members.find(m => m.id === user?.id);
                          return currentMember && canAssignRole(currentMember.role, key);
                        })
                        .map(([key, role]) => (
                          <option key={key} value={key}>{role.label}</option>
                        ))
                      }
                    </select>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No members found matching your filters.</p>
            {activeFilterCount > 0 && (
              <button 
                className="reset-filters-button"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to check if a user can assign a role
const canAssignRole = (currentRole, roleToAssign) => {
  const roleHierarchy = ['participant', 'contributor', 'mentor', 'moderator', 'organizer'];
  const currentRoleIndex = roleHierarchy.indexOf(currentRole);
  const assignRoleIndex = roleHierarchy.indexOf(roleToAssign);
  return currentRoleIndex > assignRoleIndex;
};

export default MemberDirectory;
