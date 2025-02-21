import React, { useState } from 'react';
import './SkillShare.css';

/**
 * SkillShare Component
 * Manages skill-sharing activities within communities
 * Supports teaching, learning, and session tracking
 */
const SkillShare = ({ activity, onUpdateActivity }) => {
  const [showAddSession, setShowAddSession] = useState(false);
  const [newSession, setNewSession] = useState({
    topic: '',
    date: '',
    duration: '',
    description: '',
    materials: []
  });
  const [error, setError] = useState(null);

  const handleAddSession = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedActivity = {
        ...activity,
        sessions: [
          ...(activity.sessions || []),
          { ...newSession, id: Date.now(), completed: false }
        ]
      };
      await onUpdateActivity(updatedActivity);
      setShowAddSession(false);
      setNewSession({
        topic: '',
        date: '',
        duration: '',
        description: '',
        materials: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteSession = async (sessionId) => {
    try {
      const updatedActivity = {
        ...activity,
        sessions: activity.sessions.map(session =>
          session.id === sessionId
            ? { ...session, completed: true }
            : session
        )
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const addMaterial = (material) => {
    setNewSession(prev => ({
      ...prev,
      materials: [...prev.materials, material]
    }));
  };

  const removeMaterial = (index) => {
    setNewSession(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="skill-share">
      <div className="skill-header">
        <div className="skill-info">
          <h2>{activity.title}</h2>
          <span className={`skill-level level-${activity.metadata.level}`}>
            {activity.metadata.level}
          </span>
        </div>
        <button
          className="add-session-button"
          onClick={() => setShowAddSession(true)}
        >
          Add Session
        </button>
      </div>

      <div className="skill-details">
        <p>{activity.description}</p>
        <div className="skill-meta">
          <div className="meta-item">
            <span className="meta-label">Teacher</span>
            <span>{activity.metadata.teacher}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Learners</span>
            <span>{activity.participants.length}</span>
          </div>
        </div>
      </div>

      {showAddSession && (
        <form onSubmit={handleAddSession} className="session-form">
          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              value={newSession.topic}
              onChange={e => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="What will be covered in this session?"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="datetime-local"
                value={newSession.date}
                onChange={e => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={newSession.duration}
                onChange={e => setNewSession(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 1 hour"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newSession.description}
              onChange={e => setNewSession(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what participants will learn"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label>Materials</label>
            <div className="materials-input">
              <input
                type="text"
                placeholder="Add required materials"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      addMaterial(e.target.value.trim());
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>
            {newSession.materials.length > 0 && (
              <div className="materials-list">
                {newSession.materials.map((material, index) => (
                  <span key={index} className="material-item">
                    {material}
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowAddSession(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Session
            </button>
          </div>
        </form>
      )}

      <div className="sessions-list">
        <h3>Sessions</h3>
        {activity.sessions?.length > 0 ? (
          activity.sessions.map(session => (
            <div
              key={session.id}
              className={`session-card ${session.completed ? 'completed' : ''}`}
            >
              <div className="session-header">
                <h4>{session.topic}</h4>
                {!session.completed && (
                  <button
                    className="complete-button"
                    onClick={() => handleCompleteSession(session.id)}
                  >
                    Mark Complete
                  </button>
                )}
              </div>

              <div className="session-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  {session.duration}
                </div>
              </div>

              <p className="session-description">{session.description}</p>

              {session.materials?.length > 0 && (
                <div className="session-materials">
                  <strong>Materials needed:</strong>
                  <ul>
                    {session.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              )}

              {session.completed && (
                <div className="completion-badge">
                  <span className="badge-icon">✓</span>
                  Completed
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No sessions scheduled yet</p>
            <button
              className="add-session-button"
              onClick={() => setShowAddSession(true)}
            >
              Schedule First Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillShare;
