import React, { useState } from 'react';
import './ProgressTracker.css';

/**
 * ProgressTracker Component
 * Manages progress tracking across different activity types
 * Supports milestones, goals, and achievement tracking
 */
const ProgressTracker = ({ activity, onUpdateActivity }) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    criteria: []
  });
  const [error, setError] = useState(null);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newGoal.title.trim()) {
      setError('Please enter a goal title');
      return;
    }

    try {
      const goal = {
        ...newGoal,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        progress: 0,
        status: 'in_progress'
      };

      const updatedActivity = {
        ...activity,
        goals: [...(activity.goals || []), goal]
      };

      await onUpdateActivity(updatedActivity);
      setShowAddGoal(false);
      setNewGoal({
        title: '',
        description: '',
        targetDate: '',
        criteria: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateProgress = async (goalId, progress) => {
    try {
      const updatedActivity = {
        ...activity,
        goals: activity.goals.map(goal =>
          goal.id === goalId
            ? {
                ...goal,
                progress: Math.min(100, Math.max(0, progress)),
                status: progress >= 100 ? 'completed' : 'in_progress'
              }
            : goal
        )
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const addCriterion = (criterion) => {
    if (criterion.trim()) {
      setNewGoal(prev => ({
        ...prev,
        criteria: [...prev.criteria, criterion.trim()]
      }));
    }
  };

  const removeCriterion = (index) => {
    setNewGoal(prev => ({
      ...prev,
      criteria: prev.criteria.filter((_, i) => i !== index)
    }));
  };

  const calculateOverallProgress = () => {
    if (!activity.goals?.length) return 0;
    const totalProgress = activity.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / activity.goals.length);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in_progress': return '#2196f3';
      case 'overdue': return '#f44336';
      default: return '#666';
    }
  };

  const isOverdue = (targetDate) => {
    return new Date(targetDate) < new Date() && targetDate;
  };

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <div className="progress-info">
          <h2>Progress Tracking</h2>
          <div className="overall-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateOverallProgress()}%` }}
              />
            </div>
            <span className="progress-text">{calculateOverallProgress()}% Complete</span>
          </div>
        </div>
        <button
          className="add-goal-button"
          onClick={() => setShowAddGoal(true)}
        >
          Add Goal
        </button>
      </div>

      {showAddGoal && (
        <form onSubmit={handleAddGoal} className="goal-form">
          <div className="form-group">
            <label>Goal Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={e => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter goal title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newGoal.description}
              onChange={e => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your goal"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Target Date</label>
            <input
              type="date"
              value={newGoal.targetDate}
              onChange={e => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Success Criteria</label>
            <div className="criteria-input">
              <input
                type="text"
                placeholder="Add criterion"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      addCriterion(e.target.value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>
            {newGoal.criteria.length > 0 && (
              <div className="criteria-list">
                {newGoal.criteria.map((criterion, index) => (
                  <div key={index} className="criterion-item">
                    <span>{criterion}</span>
                    <button
                      type="button"
                      onClick={() => removeCriterion(index)}
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
              onClick={() => setShowAddGoal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Goal
            </button>
          </div>
        </form>
      )}

      <div className="goals-list">
        {activity.goals?.length > 0 ? (
          activity.goals.map(goal => (
            <div
              key={goal.id}
              className={`goal-card ${goal.status}`}
            >
              <div className="goal-header">
                <h3>{goal.title}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(goal.status) }}
                >
                  {goal.status.replace('_', ' ')}
                </span>
              </div>

              <p className="goal-description">{goal.description}</p>

              {goal.criteria?.length > 0 && (
                <div className="goal-criteria">
                  <h4>Success Criteria</h4>
                  <ul>
                    {goal.criteria.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="goal-meta">
                <div className="meta-item">
                  <span className="meta-label">Target Date</span>
                  <span className={isOverdue(goal.targetDate) ? 'overdue' : ''}>
                    {new Date(goal.targetDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created</span>
                  <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="goal-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={e => handleUpdateProgress(goal.id, parseInt(e.target.value))}
                  className="progress-slider"
                />
                <span className="progress-text">{goal.progress}%</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No goals set yet</p>
            <button
              className="add-goal-button"
              onClick={() => setShowAddGoal(true)}
            >
              Set Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
