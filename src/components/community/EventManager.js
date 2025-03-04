import React, { useState } from 'react';
import './EventManager.css';

/**
 * EventManager Component
 * Manages event-based activities within communities
 * Supports scheduling, attendance, and event details
 */
const EventManager = ({ activity, onUpdateActivity }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: activity.title,
    description: activity.description,
    date: activity.metadata.date,
    time: activity.metadata.time,
    location: activity.metadata.location,
    maxParticipants: activity.metadata.maxParticipants,
    requirements: activity.metadata.requirements || []
  });
  const [error, setError] = useState(null);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedActivity = {
        ...activity,
        title: eventDetails.title,
        description: eventDetails.description,
        metadata: {
          ...activity.metadata,
          date: eventDetails.date,
          time: eventDetails.time,
          location: eventDetails.location,
          maxParticipants: eventDetails.maxParticipants,
          requirements: eventDetails.requirements
        }
      };
      await onUpdateActivity(updatedActivity);
      setShowEditForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const addRequirement = (requirement) => {
    if (requirement.trim() && !eventDetails.requirements.includes(requirement.trim())) {
      setEventDetails(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirement.trim()]
      }));
    }
  };

  const removeRequirement = (index) => {
    setEventDetails(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const isEventFull = () => {
    return activity.metadata.maxParticipants &&
      activity.participants.length >= activity.metadata.maxParticipants;
  };

  const getTimeUntilEvent = () => {
    const eventDate = new Date(`${activity.metadata.date}T${activity.metadata.time}`);
    const now = new Date();
    const diff = eventDate - now;

    if (diff < 0) return 'Event has ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} days until event`;
    if (hours > 0) return `${hours} hours until event`;
    return `${minutes} minutes until event`;
  };

  return (
    <div className="event-manager">
      <div className="event-header">
        <div className="event-info">
          <h2>{activity.title}</h2>
          <span className="event-timing">{getTimeUntilEvent()}</span>
        </div>
        <button
          className="edit-button"
          onClick={() => setShowEditForm(true)}
        >
          Edit Event
        </button>
      </div>

      {showEditForm ? (
        <form onSubmit={handleUpdateEvent} className="event-form">
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              value={eventDetails.title}
              onChange={e => setEventDetails(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={eventDetails.description}
              onChange={e => setEventDetails(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your event"
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={eventDetails.date}
                onChange={e => setEventDetails(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={eventDetails.time}
                onChange={e => setEventDetails(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={eventDetails.location}
              onChange={e => setEventDetails(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="form-group">
            <label>Maximum Participants</label>
            <input
              type="number"
              value={eventDetails.maxParticipants}
              onChange={e => setEventDetails(prev => ({ ...prev, maxParticipants: e.target.value }))}
              placeholder="Leave blank for no limit"
            />
          </div>

          <div className="form-group">
            <label>Requirements</label>
            <div className="requirements-input">
              <input
                type="text"
                placeholder="Add requirement"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      addRequirement(e.target.value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>
            {eventDetails.requirements.length > 0 && (
              <div className="requirements-list">
                {eventDetails.requirements.map((requirement, index) => (
                  <span key={index} className="requirement-tag">
                    {requirement}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
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
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Update Event
            </button>
          </div>
        </form>
      ) : (
        <div className="event-details">
          <p className="event-description">{activity.description}</p>

          <div className="event-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <div className="meta-content">
                <span className="meta-label">Date</span>
                <span>{new Date(activity.metadata.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⏰</span>
              <div className="meta-content">
                <span className="meta-label">Time</span>
                <span>{activity.metadata.time}</span>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <div className="meta-content">
                <span className="meta-label">Location</span>
                <span>{activity.metadata.location}</span>
              </div>
            </div>
          </div>

          <div className="attendance-info">
            <div className="attendance-count">
              <strong>{activity.participants.length}</strong>
              {activity.metadata.maxParticipants ? (
                <span> / {activity.metadata.maxParticipants} participants</span>
              ) : (
                <span> participants</span>
              )}
            </div>
            {isEventFull() && (
              <div className="event-full-badge">Event Full</div>
            )}
          </div>

          {activity.metadata.requirements?.length > 0 && (
            <div className="requirements-section">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {activity.metadata.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventManager;
