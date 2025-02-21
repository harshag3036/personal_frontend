import React, { useState } from 'react';
import './ActivityBadges.css';

/**
 * ActivityBadges Component
 * Manages activity badges and achievements
 * Supports badge creation, criteria management, and award tracking
 */
const ActivityBadges = ({ activity, onUpdateActivity }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [badgeName, setBadgeName] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [badgeIcon, setBadgeIcon] = useState('🏆');
  const [badgeLevel, setBadgeLevel] = useState('bronze');
  const [badgeCriteria, setBadgeCriteria] = useState({
    posts: 0,
    comments: 0,
    reactions: 0,
    attendance: 0,
    contributions: 0,
    achievements: 0
  });
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [error, setError] = useState(null);

  const handleAddBadge = async (e) => {
    e.preventDefault();
    setError(null);

    if (!badgeName.trim()) {
      setError('Please provide badge name');
      return;
    }

    try {
      const newBadge = {
        id: Date.now().toString(),
        name: badgeName.trim(),
        description: badgeDescription.trim(),
        icon: badgeIcon,
        level: badgeLevel,
        criteria: { ...badgeCriteria },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        awardedCount: 0
      };

      const updatedActivity = {
        ...activity,
        badges: [...(activity.badges || []), newBadge]
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateBadge = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedBadge) return;

    try {
      const updatedBadge = {
        ...selectedBadge,
        name: badgeName.trim(),
        description: badgeDescription.trim(),
        icon: badgeIcon,
        level: badgeLevel,
        criteria: { ...badgeCriteria },
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        badges: activity.badges.map(badge =>
          badge.id === selectedBadge.id ? updatedBadge : badge
        )
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBadge = async (badgeId) => {
    try {
      const updatedActivity = {
        ...activity,
        badges: activity.badges.filter(badge => badge.id !== badgeId)
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const selectBadge = (badge) => {
    setSelectedBadge(badge);
    setBadgeName(badge.name);
    setBadgeDescription(badge.description);
    setBadgeIcon(badge.icon);
    setBadgeLevel(badge.level);
    setBadgeCriteria(badge.criteria);
  };

  const resetForm = () => {
    setSelectedBadge(null);
    setBadgeName('');
    setBadgeDescription('');
    setBadgeIcon('🏆');
    setBadgeLevel('bronze');
    setBadgeCriteria({
      posts: 0,
      comments: 0,
      reactions: 0,
      attendance: 0,
      contributions: 0,
      achievements: 0
    });
  };

  const getBadgeIcons = () => [
    '🏆', '🎖️', '🏅', '⭐', '💫', '🌟', '✨', '💎', '🔮', '🎯',
    '🎨', '🎭', '🎪', '🎡', '🎢', '🎠', '🎮', '🕹️', '🎲', '🎱',
    '🎳', '🎰', '🌈', '🎵', '🎹', '🎸', '🎺', '🎻', '🥁', '🎼'
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'platinum': return '#E5E4E2';
      case 'diamond': return '#B9F2FF';
      default: return '#666666';
    }
  };

  const getCriteriaLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^./, str => str.toUpperCase());
  };

  const getFilteredBadges = () => {
    let filtered = [...(activity.badges || [])];

    switch (filter) {
      case 'bronze':
      case 'silver':
      case 'gold':
      case 'platinum':
      case 'diamond':
        filtered = filtered.filter(b => b.level === filter);
        break;
      case 'awarded':
        filtered = filtered.filter(b => b.awardedCount > 0);
        break;
      case 'unawarded':
        filtered = filtered.filter(b => b.awardedCount === 0);
        break;
      default:
        break;
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'awarded':
        filtered.sort((a, b) => b.awardedCount - a.awardedCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredBadges = getFilteredBadges();

  return (
    <div className="activity-badges">
      <div className="badges-header">
        <h2>Badges & Achievements</h2>
      </div>

      <div className="badges-controls">
        <div className="badges-filters">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Badges</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="diamond">Diamond</option>
            <option value="awarded">Awarded</option>
            <option value="unawarded">Unawarded</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="awarded">Most Awarded</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      <div className="badges-grid">
        <div className="badges-list">
          {filteredBadges.length > 0 ? (
            filteredBadges.map(badge => (
              <div
                key={badge.id}
                className={`badge-card ${selectedBadge?.id === badge.id ? 'selected' : ''}`}
                onClick={() => selectBadge(badge)}
                style={{ borderColor: getLevelColor(badge.level) }}
              >
                <div className="badge-header">
                  <div className="badge-info">
                    <span className="badge-icon">{badge.icon}</span>
                    <div className="badge-meta">
                      <h3>{badge.name}</h3>
                      <span className="badge-level" style={{ color: getLevelColor(badge.level) }}>
                        {badge.level}
                      </span>
                    </div>
                  </div>
                  <span className="badge-awarded">
                    Awarded {badge.awardedCount} times
                  </span>
                </div>
                {badge.description && (
                  <p className="badge-description">{badge.description}</p>
                )}
                <div className="badge-criteria">
                  <h4>Requirements</h4>
                  <div className="criteria-list">
                    {Object.entries(badge.criteria)
                      .filter(([, value]) => value > 0)
                      .map(([key, value]) => (
                        <div key={key} className="criteria-item">
                          <span className="criteria-label">{getCriteriaLabel(key)}</span>
                          <span className="criteria-value">{value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No badges found</p>
              <p>Add badges to reward achievements</p>
            </div>
          )}
        </div>

        <form onSubmit={selectedBadge ? handleUpdateBadge : handleAddBadge} className="badge-form">
          <div className="form-section">
            <h3>{selectedBadge ? 'Edit Badge' : 'Add Badge'}</h3>
            
            <div className="form-group">
              <label>Badge Icon</label>
              <div className="icon-selector">
                <div className="selected-icon">
                  <span className="icon-preview">{badgeIcon}</span>
                  <span className="icon-label">Selected Icon</span>
                </div>
                <div className="icon-grid">
                  {getBadgeIcons().map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-button ${badgeIcon === icon ? 'selected' : ''}`}
                      onClick={() => setBadgeIcon(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Badge Name</label>
              <input
                type="text"
                value={badgeName}
                onChange={e => setBadgeName(e.target.value)}
                placeholder="Enter badge name..."
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={badgeDescription}
                onChange={e => setBadgeDescription(e.target.value)}
                placeholder="Describe this badge..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Level</label>
              <select
                value={badgeLevel}
                onChange={e => setBadgeLevel(e.target.value)}
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>

            <div className="form-group">
              <label>Criteria</label>
              {Object.entries(badgeCriteria).map(([key, value]) => (
                <div key={key} className="criteria-input">
                  <label className="criteria-label">
                    {getCriteriaLabel(key)}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={e => setBadgeCriteria({
                      ...badgeCriteria,
                      [key]: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            {selectedBadge && (
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteBadge(selectedBadge.id)}
              >
                Delete Badge
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
                {selectedBadge ? 'Update Badge' : 'Add Badge'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityBadges;
