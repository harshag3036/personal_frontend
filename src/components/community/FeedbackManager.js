import React, { useState } from 'react';
import './FeedbackManager.css';

/**
 * FeedbackManager Component
 * Manages feedback collection and display for activities
 * Supports ratings, reviews, and suggestions
 */
const FeedbackManager = ({ activity, onUpdateActivity }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    review: '',
    suggestions: '',
    anonymous: false
  });
  const [error, setError] = useState(null);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setError(null);

    if (feedback.rating === 0) {
      setError('Please provide a rating');
      return;
    }

    try {
      const newFeedback = {
        ...feedback,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        userId: feedback.anonymous ? null : 'current-user' // TODO: Replace with actual user ID
      };

      const updatedActivity = {
        ...activity,
        feedback: [...(activity.feedback || []), newFeedback]
      };

      await onUpdateActivity(updatedActivity);
      setShowFeedbackForm(false);
      setFeedback({
        rating: 0,
        review: '',
        suggestions: '',
        anonymous: false
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRatingChange = (newRating) => {
    setFeedback(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  const calculateAverageRating = () => {
    if (!activity.feedback?.length) return 0;
    const total = activity.feedback.reduce((sum, f) => sum + f.rating, 0);
    return (total / activity.feedback.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    activity.feedback?.forEach(f => {
      distribution[f.rating]++;
    });
    return distribution;
  };

  return (
    <div className="feedback-manager">
      <div className="feedback-header">
        <div className="feedback-info">
          <h2>Feedback & Reviews</h2>
          {activity.feedback?.length > 0 && (
            <div className="rating-summary">
              <div className="average-rating">
                <span className="rating-number">{calculateAverageRating()}</span>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={`star ${star <= calculateAverageRating() ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-count">
                  {activity.feedback.length} {activity.feedback.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
              <div className="rating-distribution">
                {Object.entries(getRatingDistribution()).reverse().map(([rating, count]) => (
                  <div key={rating} className="distribution-row">
                    <span className="rating-label">{rating}★</span>
                    <div className="distribution-bar">
                      <div
                        className="distribution-fill"
                        style={{
                          width: `${(count / activity.feedback.length) * 100}%`
                        }}
                      />
                    </div>
                    <span className="distribution-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          className="add-feedback-button"
          onClick={() => setShowFeedbackForm(true)}
        >
          Give Feedback
        </button>
      </div>

      {showFeedbackForm && (
        <form onSubmit={handleSubmitFeedback} className="feedback-form">
          <div className="form-group">
            <label>Rating</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${star <= feedback.rating ? 'filled' : ''}`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Review</label>
            <textarea
              value={feedback.review}
              onChange={e => setFeedback(prev => ({ ...prev, review: e.target.value }))}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Suggestions for Improvement</label>
            <textarea
              value={feedback.suggestions}
              onChange={e => setFeedback(prev => ({ ...prev, suggestions: e.target.value }))}
              placeholder="What could be better?"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={feedback.anonymous}
                onChange={e => setFeedback(prev => ({ ...prev, anonymous: e.target.checked }))}
              />
              Submit anonymously
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowFeedbackForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </div>
        </form>
      )}

      <div className="feedback-list">
        {activity.feedback?.length > 0 ? (
          activity.feedback.map(item => (
            <div key={item.id} className="feedback-card">
              <div className="feedback-header">
                <div className="feedback-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={`star ${star <= item.rating ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="feedback-meta">
                  <span>{item.anonymous ? 'Anonymous' : 'User'}</span>
                  <span>•</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {item.review && (
                <p className="feedback-review">{item.review}</p>
              )}

              {item.suggestions && (
                <div className="feedback-suggestions">
                  <h4>Suggestions</h4>
                  <p>{item.suggestions}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No feedback yet</p>
            <p>Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManager;
