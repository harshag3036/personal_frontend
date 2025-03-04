import React, { useState } from 'react';
import './ChallengeManager.css';

/**
 * ChallengeManager Component
 * Manages challenge-based activities within communities
 * Supports goals, progress tracking, and participant achievements
 */
const ChallengeManager = ({ activity, onUpdateActivity }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [challengeDetails, setChallengeDetails] = useState({
    title: activity.title,
    description: activity.description,
    startDate: activity.metadata.startDate,
    endDate: activity.metadata.endDate,
    goals: activity.metadata.goals || [],
    rules: activity.metadata.rules || [],
    rewards: activity.metadata.rewards || []
  });
  const [error, setError] = useState(null);

  const handleUpdateChallenge = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedActivity = {
        ...activity,
        title: challengeDetails.title,
        description: challengeDetails.description,
        metadata: {
          ...activity.metadata,
          startDate: challengeDetails.startDate,
          endDate: challengeDetails.endDate,
          goals: challengeDetails.goals,
          rules: challengeDetails.rules,
          rewards: challengeDetails.rewards
        }
      };
      await onUpdateActivity(updatedActivity);
      setShowEditForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const addListItem = (list, item) => {
    if (item.trim()) {
      setChallengeDetails(prev => ({
        ...prev,
        [list]: [...prev[list], item.trim()]
      }));
    }
  };

  const removeListItem = (list, index) => {
    setChallengeDetails(prev => ({
      ...prev,
      [list]: prev[list].filter((_, i) => i !== index)
    }));
  };

  const calculateProgress = () => {
    const now = new Date();
    const start = new Date(activity.metadata.startDate);
    const end = new Date(activity.metadata.endDate);
    const total = end - start;
    const current = now - start;
    return Math.min(100, Math.max(0, Math.round((current / total) * 100)));
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(activity.metadata.endDate);
    const diff = end - now;

    if (diff < 0) return 'Challenge ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  return (
    <div className="challenge-manager">
      <div className="challenge-header">
        <div className="challenge-info">
          <h2>{activity.title}</h2>
          <div className="challenge-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <span className="progress-text">{getTimeRemaining()}</span>
          </div>
        </div>
        <button
          className="edit-button"
          onClick={() => setShowEditForm(true)}
        >
          Edit Challenge
        </button>
      </div>

      {showEditForm ? (
        <form onSubmit={handleUpdateChallenge} className="challenge-form">
          <div className="form-group">
            <label>Challenge Title</label>
            <input
              type="text"
              value={challengeDetails.title}
              onChange={e => setChallengeDetails(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter challenge title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={challengeDetails.description}
              onChange={e => setChallengeDetails(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your challenge"
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={challengeDetails.startDate}
                onChange={e => setChallengeDetails(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={challengeDetails.endDate}
                onChange={e => setChallengeDetails(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Goals</label>
            <div className="list-input">
              <input
                type="text"
                placeholder="Add goal"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      addListItem('goals', e.target.value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>
            {challengeDetails.goals.length > 0 && (
              <div className="list-items">
                {challengeDetails.goals.map((goal, index) => (
                  <div key={index} className="list-item">
                    <span>{goal}</span>
                    <button
                      type="button"
                      onClick={() => removeListItem('goals', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Rules</label>
            <div className="list-input">
              <input
                type="text"
                placeholder="Add rule"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      addListItem('rules', e.target.value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>
            {challengeDetails.rules.length > 0 && (
              <div className="list-items">
                {challengeDetails.rules.map((rule, index) => (
                  <div key={index} className="list-item">
                    <span>{rule}</span>
                    <button
                      type="button"
                      onClick={() => removeListItem('rules', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Rewards</label>
            <div className="list-input">
              <input
                type="text"
                placeholder="Add reward"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      addListItem('rewards', e.target.value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>
            {challengeDetails.rewards.length > 0 && (
              <div className="list-items">
                {challengeDetails.rewards.map((reward, index) => (
                  <div key={index} className="list-item">
                    <span>{reward}</span>
                    <button
                      type="button"
                      onClick={() => removeListItem('rewards', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Update Challenge
            </button>
          </div>
        </form>
      ) : (
        <div className="challenge-details">
          <p className="challenge-description">{activity.description}</p>

          <div className="challenge-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <div className="meta-content">
                <span className="meta-label">Duration</span>
                <span>
                  {new Date(activity.metadata.startDate).toLocaleDateString()} - {new Date(activity.metadata.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">👥</span>
              <div className="meta-content">
                <span className="meta-label">Participants</span>
                <span>{activity.participants.length}</span>
              </div>
            </div>
          </div>

          {activity.metadata.goals?.length > 0 && (
            <div className="section-box goals-section">
              <h3>Goals</h3>
              <ul className="goals-list">
                {activity.metadata.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          )}

          {activity.metadata.rules?.length > 0 && (
            <div className="section-box rules-section">
              <h3>Rules</h3>
              <ul className="rules-list">
                {activity.metadata.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {activity.metadata.rewards?.length > 0 && (
            <div className="section-box rewards-section">
              <h3>Rewards</h3>
              <ul className="rewards-list">
                {activity.metadata.rewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengeManager;
