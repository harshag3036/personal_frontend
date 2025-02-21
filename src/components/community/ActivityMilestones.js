import React, { useState } from 'react';
import './ActivityMilestones.css';

/**
 * ActivityMilestones Component
 * Manages activity milestones and progress tracking
 * Supports milestone creation, progress tracking, and completion management
 */
const ActivityMilestones = ({ activity, onUpdateActivity }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestoneName, setMilestoneName] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [milestoneDeadline, setMilestoneDeadline] = useState('');
  const [milestoneStatus, setMilestoneStatus] = useState('pending');
  const [milestoneProgress, setMilestoneProgress] = useState(0);
  const [milestoneRequirements, setMilestoneRequirements] = useState([
    { id: Date.now(), text: '', completed: false }
  ]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [error, setError] = useState(null);

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    setError(null);

    if (!milestoneName.trim()) {
      setError('Please provide milestone name');
      return;
    }

    try {
      const newMilestone = {
        id: Date.now().toString(),
        name: milestoneName.trim(),
        description: milestoneDescription.trim(),
        deadline: milestoneDeadline,
        status: milestoneStatus,
        progress: milestoneProgress,
        requirements: milestoneRequirements.filter(req => req.text.trim()),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        milestones: [...(activity.milestones || []), newMilestone]
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateMilestone = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedMilestone) return;

    try {
      const updatedMilestone = {
        ...selectedMilestone,
        name: milestoneName.trim(),
        description: milestoneDescription.trim(),
        deadline: milestoneDeadline,
        status: milestoneStatus,
        progress: milestoneProgress,
        requirements: milestoneRequirements.filter(req => req.text.trim()),
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        milestones: activity.milestones.map(milestone =>
          milestone.id === selectedMilestone.id ? updatedMilestone : milestone
        )
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMilestone = async (milestoneId) => {
    try {
      const updatedActivity = {
        ...activity,
        milestones: activity.milestones.filter(milestone => milestone.id !== milestoneId)
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const selectMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setMilestoneName(milestone.name);
    setMilestoneDescription(milestone.description);
    setMilestoneDeadline(milestone.deadline);
    setMilestoneStatus(milestone.status);
    setMilestoneProgress(milestone.progress);
    setMilestoneRequirements(milestone.requirements);
  };

  const resetForm = () => {
    setSelectedMilestone(null);
    setMilestoneName('');
    setMilestoneDescription('');
    setMilestoneDeadline('');
    setMilestoneStatus('pending');
    setMilestoneProgress(0);
    setMilestoneRequirements([{ id: Date.now(), text: '', completed: false }]);
  };

  const addRequirement = () => {
    setMilestoneRequirements([
      ...milestoneRequirements,
      { id: Date.now(), text: '', completed: false }
    ]);
  };

  const updateRequirement = (id, updates) => {
    setMilestoneRequirements(
      milestoneRequirements.map(req =>
        req.id === id ? { ...req, ...updates } : req
      )
    );
  };

  const removeRequirement = (id) => {
    setMilestoneRequirements(
      milestoneRequirements.filter(req => req.id !== id)
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'blocked': return '⛔';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#2196F3';
      case 'blocked': return '#F44336';
      case 'pending': return '#FFC107';
      default: return '#9E9E9E';
    }
  };

  const formatDeadline = (date) => {
    if (!date) return 'No deadline';
    const deadline = new Date(date);
    const now = new Date();
    const diff = deadline - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    if (days <= 7) return `Due in ${days} days`;
    return new Date(date).toLocaleDateString();
  };

  const getFilteredMilestones = () => {
    let filtered = [...(activity.milestones || [])];

    switch (filter) {
      case 'completed':
      case 'in_progress':
      case 'blocked':
      case 'pending':
        filtered = filtered.filter(m => m.status === filter);
        break;
      case 'overdue':
        filtered = filtered.filter(m => {
          if (!m.deadline) return false;
          return new Date(m.deadline) < new Date() && m.status !== 'completed';
        });
        break;
      case 'upcoming':
        filtered = filtered.filter(m => {
          if (!m.deadline) return false;
          const deadline = new Date(m.deadline);
          const now = new Date();
          const diff = deadline - now;
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return days >= 0 && days <= 7 && m.status !== 'completed';
        });
        break;
      default:
        break;
    }

    switch (sortBy) {
      case 'deadline':
        filtered.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredMilestones = getFilteredMilestones();

  return (
    <div className="activity-milestones">
      <div className="milestones-header">
        <h2>Milestones & Progress</h2>
      </div>

      <div className="milestones-controls">
        <div className="milestones-filters">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Milestones</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="upcoming">Upcoming (7 days)</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="deadline">Deadline</option>
            <option value="progress">Progress</option>
            <option value="recent">Recently Updated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      <div className="milestones-grid">
        <div className="milestones-list">
          {filteredMilestones.length > 0 ? (
            filteredMilestones.map(milestone => (
              <div
                key={milestone.id}
                className={`milestone-card ${selectedMilestone?.id === milestone.id ? 'selected' : ''}`}
                onClick={() => selectMilestone(milestone)}
              >
                <div className="milestone-header">
                  <div className="milestone-info">
                    <span className="milestone-status" style={{ color: getStatusColor(milestone.status) }}>
                      {getStatusIcon(milestone.status)}
                    </span>
                    <div className="milestone-meta">
                      <h3>{milestone.name}</h3>
                      <span className="milestone-deadline">
                        {formatDeadline(milestone.deadline)}
                      </span>
                    </div>
                  </div>
                  <div className="milestone-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${milestone.progress}%`,
                          backgroundColor: getStatusColor(milestone.status)
                        }}
                      />
                    </div>
                    <span className="progress-text">{milestone.progress}%</span>
                  </div>
                </div>
                {milestone.description && (
                  <p className="milestone-description">{milestone.description}</p>
                )}
                {milestone.requirements.length > 0 && (
                  <div className="milestone-requirements">
                    <h4>Requirements</h4>
                    <div className="requirements-list">
                      {milestone.requirements.map((req, index) => (
                        <div key={req.id} className="requirement-item">
                          <span className="requirement-status">
                            {req.completed ? '✓' : '○'}
                          </span>
                          <span className="requirement-text">{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No milestones found</p>
              <p>Add milestones to track progress</p>
            </div>
          )}
        </div>

        <form onSubmit={selectedMilestone ? handleUpdateMilestone : handleAddMilestone} className="milestone-form">
          <div className="form-section">
            <h3>{selectedMilestone ? 'Edit Milestone' : 'Add Milestone'}</h3>
            
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={milestoneName}
                onChange={e => setMilestoneName(e.target.value)}
                placeholder="Enter milestone name..."
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={milestoneDescription}
                onChange={e => setMilestoneDescription(e.target.value)}
                placeholder="Describe this milestone..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                value={milestoneDeadline}
                onChange={e => setMilestoneDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={milestoneStatus}
                onChange={e => setMilestoneStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="form-group">
              <label>Progress</label>
              <div className="progress-input">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={milestoneProgress}
                  onChange={e => setMilestoneProgress(parseInt(e.target.value))}
                />
                <span className="progress-value">{milestoneProgress}%</span>
              </div>
            </div>

            <div className="form-group">
              <label>Requirements</label>
              <div className="requirements-form">
                {milestoneRequirements.map((req, index) => (
                  <div key={req.id} className="requirement-input">
                    <input
                      type="checkbox"
                      checked={req.completed}
                      onChange={e => updateRequirement(req.id, { completed: e.target.checked })}
                    />
                    <input
                      type="text"
                      value={req.text}
                      onChange={e => updateRequirement(req.id, { text: e.target.value })}
                      placeholder="Enter requirement..."
                    />
                    <button
                      type="button"
                      className="remove-requirement"
                      onClick={() => removeRequirement(req.id)}
                      disabled={milestoneRequirements.length === 1}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-requirement"
                  onClick={addRequirement}
                >
                  + Add Requirement
                </button>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            {selectedMilestone && (
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteMilestone(selectedMilestone.id)}
              >
                Delete Milestone
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
                {selectedMilestone ? 'Update Milestone' : 'Add Milestone'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityMilestones;
