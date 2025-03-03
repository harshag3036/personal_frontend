import React, { useState } from 'react';
import './ActivityFeedback.css';

/**
 * ActivityFeedback Component
 * Manages activity feedback and ratings
 * Supports feedback collection, rating analytics, and response management
 */
const ActivityFeedback = ({ activity, onUpdateActivity }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackResponse, setFeedbackResponse] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [error, setError] = useState(null);

  const handleAddResponse = async (e, feedbackId) => {
    e.preventDefault();
    setError(null);

    if (!feedbackResponse.trim()) {
      setError('Please provide a response');
      return;
    }

    try {
      const updatedActivity = {
        ...activity,
        feedback: activity.feedback.map(feedback =>
          feedback.id === feedbackId
            ? {
                ...feedback,
                responses: [
                  ...(feedback.responses || []),
                  {
                    id: Date.now().toString(),
                    content: feedbackResponse.trim(),
                    createdAt: new Date().toISOString()
                  }
                ]
              }
            : feedback
        )
      };

      await onUpdateActivity(updatedActivity);
      setFeedbackResponse('');
      setSelectedFeedback(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResolveFeedback = async (feedbackId) => {
    try {
      const updatedActivity = {
        ...activity,
        feedback: activity.feedback.map(feedback =>
          feedback.id === feedbackId
            ? {
                ...feedback,
                resolved: !feedback.resolved,
                resolvedAt: !feedback.resolved ? new Date().toISOString() : null
              }
            : feedback
        )
      };

      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'suggestion': return '💡';
      case 'issue': return '⚠️';
      case 'praise': return '⭐';
      case 'question': return '❓';
      default: return '📝';
    }
  };

  const getFilteredFeedback = () => {
    let filtered = [...(activity.feedback || [])];

    switch (filter) {
      case 'resolved':
        filtered = filtered.filter(f => f.resolved);
        break;
      case 'unresolved':
        filtered = filtered.filter(f => !f.resolved);
        break;
      case 'suggestions':
        filtered = filtered.filter(f => f.type === 'suggestion');
        break;
      case 'issues':
        filtered = filtered.filter(f => f.type === 'issue');
        break;
      case 'praise':
        filtered = filtered.filter(f => f.type === 'praise');
        break;
      case 'questions':
        filtered = filtered.filter(f => f.type === 'question');
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
      case 'responses':
        filtered.sort((a, b) => (b.responses?.length || 0) - (a.responses?.length || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredFeedback = getFilteredFeedback();

  const getFeedbackStats = () => {
    const total = activity.feedback?.length || 0;
    const resolved = activity.feedback?.filter(f => f.resolved).length || 0;
    const avgRating = activity.feedback?.reduce((acc, f) => acc + (f.rating || 0), 0) / total || 0;

    return {
      total,
      resolved,
      avgRating: avgRating.toFixed(1),
      suggestions: activity.feedback?.filter(f => f.type === 'suggestion').length || 0,
      issues: activity.feedback?.filter(f => f.type === 'issue').length || 0,
      praise: activity.feedback?.filter(f => f.type === 'praise').length || 0,
      questions: activity.feedback?.filter(f => f.type === 'question').length || 0
    };
  };

  const stats = getFeedbackStats();

  return (
    <div className="activity-feedback">
      <div className="feedback-header">
        <h2>Feedback & Ratings</h2>
        <div className="feedback-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.resolved}</span>
            <span className="stat-label">Resolved</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">★ {stats.avgRating}</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>

      <div className="feedback-controls">
        <div className="feedback-filters">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Feedback</option>
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
            <option value="suggestions">Suggestions</option>
            <option value="issues">Issues</option>
            <option value="praise">Praise</option>
            <option value="questions">Questions</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="responses">Most Responses</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        <div className="feedback-metrics">
          <div className="metric-item">
            <span className="metric-icon">💡</span>
            <span className="metric-value">{stats.suggestions}</span>
          </div>
          <div className="metric-item">
            <span className="metric-icon">⚠️</span>
            <span className="metric-value">{stats.issues}</span>
          </div>
          <div className="metric-item">
            <span className="metric-icon">⭐</span>
            <span className="metric-value">{stats.praise}</span>
          </div>
          <div className="metric-item">
            <span className="metric-icon">❓</span>
            <span className="metric-value">{stats.questions}</span>
          </div>
        </div>
      </div>

      <div className="feedback-grid">
        <div className="feedback-list">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map(feedback => (
              <div
                key={feedback.id}
                className={`feedback-card ${selectedFeedback?.id === feedback.id ? 'selected' : ''} ${feedback.resolved ? 'resolved' : ''}`}
                onClick={() => setSelectedFeedback(feedback)}
              >
                <div className="feedback-header">
                  <div className="feedback-info">
                    <span className="feedback-icon">{getFeedbackIcon(feedback.type)}</span>
                    <div className="feedback-meta">
                      <span className="feedback-author">{feedback.author}</span>
                      <span className="feedback-date">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="feedback-actions">
                    {feedback.rating && (
                      <span className="feedback-rating">★ {feedback.rating}</span>
                    )}
                    <button
                      className={`resolve-button ${feedback.resolved ? 'resolved' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResolveFeedback(feedback.id);
                      }}
                    >
                      {feedback.resolved ? 'Resolved' : 'Resolve'}
                    </button>
                  </div>
                </div>
                <p className="feedback-content">{feedback.content}</p>
                {feedback.responses?.length > 0 && (
                  <div className="feedback-responses">
                    <span className="responses-count">
                      {feedback.responses.length} Response{feedback.responses.length !== 1 ? 's' : ''}
                    </span>
                    {selectedFeedback?.id === feedback.id && (
                      <div className="responses-list">
                        {feedback.responses.map(response => (
                          <div key={response.id} className="response-item">
                            <p className="response-content">{response.content}</p>
                            <span className="response-date">
                              {new Date(response.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {selectedFeedback?.id === feedback.id && (
                  <form onSubmit={e => handleAddResponse(e, feedback.id)} className="response-form">
                    <textarea
                      value={feedbackResponse}
                      onChange={e => setFeedbackResponse(e.target.value)}
                      placeholder="Add a response..."
                      rows={3}
                    />
                    <div className="form-actions">
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => {
                          setSelectedFeedback(null);
                          setFeedbackResponse('');
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="submit-button">
                        Add Response
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No feedback found</p>
              <p>Feedback will appear here when users provide it</p>
            </div>
          )}
        </div>

        {selectedFeedback && (
          <div className="feedback-details">
            <div className="details-section">
              <h3>Feedback Details</h3>
              <div className="detail-group">
                <span className="detail-label">Type</span>
                <span className="detail-value">
                  {getFeedbackIcon(selectedFeedback.type)}{' '}
                  {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                </span>
              </div>
              <div className="detail-group">
                <span className="detail-label">Status</span>
                <span className="detail-value">
                  {selectedFeedback.resolved ? 'Resolved' : 'Open'}
                </span>
              </div>
              {selectedFeedback.resolved && (
                <div className="detail-group">
                  <span className="detail-label">Resolved On</span>
                  <span className="detail-value">
                    {new Date(selectedFeedback.resolvedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="detail-group">
                <span className="detail-label">Responses</span>
                <span className="detail-value">
                  {selectedFeedback.responses?.length || 0}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ActivityFeedback;
