import React, { useState } from 'react';
import './ProjectManager.css';

/**
 * ProjectManager Component
 * Manages project-based activities within communities
 * Supports milestones, team management, and progress tracking
 */
const ProjectManager = ({ activity, onUpdateActivity }) => {
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignees: []
  });
  const [error, setError] = useState(null);

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedActivity = {
        ...activity,
        milestones: [
          ...(activity.milestones || []),
          { ...newMilestone, id: Date.now(), completed: false }
        ]
      };
      await onUpdateActivity(updatedActivity);
      setShowAddMilestone(false);
      setNewMilestone({
        title: '',
        description: '',
        dueDate: '',
        assignees: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteMilestone = async (milestoneId) => {
    try {
      const updatedActivity = {
        ...activity,
        milestones: activity.milestones.map(milestone =>
          milestone.id === milestoneId
            ? { ...milestone, completed: true, completedAt: new Date().toISOString() }
            : milestone
        )
      };
      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateProgress = () => {
    if (!activity.milestones?.length) return 0;
    const completed = activity.milestones.filter(m => m.completed).length;
    return Math.round((completed / activity.milestones.length) * 100);
  };

  const addAssignee = (assignee) => {
    if (!newMilestone.assignees.includes(assignee)) {
      setNewMilestone(prev => ({
        ...prev,
        assignees: [...prev.assignees, assignee]
      }));
    }
  };

  const removeAssignee = (assignee) => {
    setNewMilestone(prev => ({
      ...prev,
      assignees: prev.assignees.filter(a => a !== assignee)
    }));
  };

  return (
    <div className="project-manager">
      <div className="project-header">
        <div className="project-info">
          <h2>{activity.title}</h2>
          <div className="project-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <span className="progress-text">{calculateProgress()}% Complete</span>
          </div>
        </div>
        <button
          className="add-milestone-button"
          onClick={() => setShowAddMilestone(true)}
        >
          Add Milestone
        </button>
      </div>

      <div className="project-details">
        <p>{activity.description}</p>
        <div className="project-meta">
          <div className="meta-item">
            <span className="meta-label">Start Date</span>
            <span>{new Date(activity.metadata.startDate).toLocaleDateString()}</span>
          </div>
          {activity.metadata.endDate && (
            <div className="meta-item">
              <span className="meta-label">Target End Date</span>
              <span>{new Date(activity.metadata.endDate).toLocaleDateString()}</span>
            </div>
          )}
          <div className="meta-item">
            <span className="meta-label">Team Size</span>
            <span>{activity.participants.length} members</span>
          </div>
        </div>
      </div>

      {showAddMilestone && (
        <form onSubmit={handleAddMilestone} className="milestone-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newMilestone.title}
              onChange={e => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Milestone title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newMilestone.description}
              onChange={e => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe this milestone"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={newMilestone.dueDate}
              onChange={e => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Assignees</label>
            <div className="assignee-input">
              <select
                onChange={e => {
                  if (e.target.value) {
                    addAssignee(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Select team member</option>
                {activity.participants.map(participant => (
                  <option
                    key={participant.id}
                    value={participant.id}
                    disabled={newMilestone.assignees.includes(participant.id)}
                  >
                    {participant.name}
                  </option>
                ))}
              </select>
            </div>
            {newMilestone.assignees.length > 0 && (
              <div className="assignee-list">
                {newMilestone.assignees.map(assigneeId => {
                  const assignee = activity.participants.find(p => p.id === assigneeId);
                  return (
                    <span key={assigneeId} className="assignee-tag">
                      {assignee?.name}
                      <button
                        type="button"
                        onClick={() => removeAssignee(assigneeId)}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowAddMilestone(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Milestone
            </button>
          </div>
        </form>
      )}

      <div className="milestones-list">
        <h3>Milestones</h3>
        {activity.milestones?.length > 0 ? (
          activity.milestones.map(milestone => (
            <div
              key={milestone.id}
              className={`milestone-card ${milestone.completed ? 'completed' : ''}`}
            >
              <div className="milestone-header">
                <h4>{milestone.title}</h4>
                {!milestone.completed && (
                  <button
                    className="complete-button"
                    onClick={() => handleCompleteMilestone(milestone.id)}
                  >
                    Mark Complete
                  </button>
                )}
              </div>

              <p className="milestone-description">{milestone.description}</p>

              <div className="milestone-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </div>
                {milestone.completed && (
                  <div className="meta-item">
                    <span className="meta-icon">✓</span>
                    Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              {milestone.assignees?.length > 0 && (
                <div className="milestone-assignees">
                  <strong>Assigned to:</strong>
                  <div className="assignee-tags">
                    {milestone.assignees.map(assigneeId => {
                      const assignee = activity.participants.find(p => p.id === assigneeId);
                      return (
                        <span key={assigneeId} className="assignee-tag">
                          {assignee?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No milestones created yet</p>
            <button
              className="add-milestone-button"
              onClick={() => setShowAddMilestone(true)}
            >
              Create First Milestone
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
