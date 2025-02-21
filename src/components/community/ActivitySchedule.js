import React, { useState } from 'react';
import './ActivitySchedule.css';

/**
 * ActivitySchedule Component
 * Manages activity scheduling and timeline
 * Supports event planning, reminders, and calendar management
 */
const ActivitySchedule = ({ activity, onUpdateActivity }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDuration, setEventDuration] = useState('60');
  const [eventType, setEventType] = useState('session');
  const [eventRecurrence, setEventRecurrence] = useState('none');
  const [filter, setFilter] = useState('upcoming');
  const [error, setError] = useState(null);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setError(null);

    if (!eventTitle.trim() || !eventDate || !eventTime) {
      setError('Please provide all event details');
      return;
    }

    try {
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle.trim(),
        description: eventDescription.trim(),
        date: eventDate,
        time: eventTime,
        duration: parseInt(eventDuration),
        type: eventType,
        recurrence: eventRecurrence,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        schedule: [...(activity.schedule || []), newEvent]
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedEvent) return;

    try {
      const updatedEvent = {
        ...selectedEvent,
        title: eventTitle.trim(),
        description: eventDescription.trim(),
        date: eventDate,
        time: eventTime,
        duration: parseInt(eventDuration),
        type: eventType,
        recurrence: eventRecurrence,
        updatedAt: new Date().toISOString()
      };

      const updatedActivity = {
        ...activity,
        schedule: activity.schedule.map(event =>
          event.id === selectedEvent.id ? updatedEvent : event
        )
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const updatedActivity = {
        ...activity,
        schedule: activity.schedule.filter(event => event.id !== eventId)
      };

      await onUpdateActivity(updatedActivity);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventDescription(event.description);
    setEventDate(event.date);
    setEventTime(event.time);
    setEventDuration(event.duration.toString());
    setEventType(event.type);
    setEventRecurrence(event.recurrence);
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setEventDuration('60');
    setEventType('session');
    setEventRecurrence('none');
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'session': return '👥';
      case 'workshop': return '🔧';
      case 'discussion': return '💭';
      case 'presentation': return '📊';
      case 'deadline': return '⏰';
      default: return '📅';
    }
  };

  const getRecurrenceLabel = (recurrence) => {
    switch (recurrence) {
      case 'daily': return 'Every day';
      case 'weekly': return 'Every week';
      case 'biweekly': return 'Every two weeks';
      case 'monthly': return 'Every month';
      default: return 'One-time';
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : ''}`;
  };

  const getFilteredEvents = () => {
    let filtered = [...(activity.schedule || [])];
    const now = new Date();

    switch (filter) {
      case 'upcoming':
        filtered = filtered.filter(event => new Date(`${event.date}T${event.time}`) > now);
        break;
      case 'past':
        filtered = filtered.filter(event => new Date(`${event.date}T${event.time}`) < now);
        break;
      case 'today':
        const today = now.toISOString().split('T')[0];
        filtered = filtered.filter(event => event.date === today);
        break;
      case 'recurring':
        filtered = filtered.filter(event => event.recurrence !== 'none');
        break;
      default:
        break;
    }

    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    return filtered;
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="activity-schedule">
      <div className="schedule-header">
        <h2>Schedule & Timeline</h2>
        <button
          className="new-event-button"
          onClick={resetForm}
        >
          Add Event
        </button>
      </div>

      <div className="schedule-controls">
        <div className="schedule-filters">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="today">Today</option>
            <option value="recurring">Recurring</option>
            <option value="all">All Events</option>
          </select>
        </div>
      </div>

      <div className="schedule-grid">
        <div className="events-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div
                key={event.id}
                className={`event-card ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                onClick={() => selectEvent(event)}
              >
                <div className="event-header">
                  <div className="event-info">
                    <span className="event-icon">{getEventIcon(event.type)}</span>
                    <div className="event-meta">
                      <h4>{event.title}</h4>
                      <span className="event-type">{event.type}</span>
                    </div>
                  </div>
                  <div className="event-timing">
                    <span className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="event-time">
                      {event.time}
                    </span>
                  </div>
                </div>
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
                <div className="event-footer">
                  <span className="event-duration">
                    Duration: {formatDuration(event.duration)}
                  </span>
                  {event.recurrence !== 'none' && (
                    <span className="event-recurrence">
                      {getRecurrenceLabel(event.recurrence)}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No events found</p>
              <p>Add events to create a schedule</p>
            </div>
          )}
        </div>

        <form onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent} className="event-form">
          <div className="form-section">
            <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
            
            <div className="form-group">
              <label>Event Type</label>
              <select
                value={eventType}
                onChange={e => setEventType(e.target.value)}
              >
                <option value="session">Session</option>
                <option value="workshop">Workshop</option>
                <option value="discussion">Discussion</option>
                <option value="presentation">Presentation</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                placeholder="Enter event title..."
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={eventDescription}
                onChange={e => setEventDescription(e.target.value)}
                placeholder="Describe this event..."
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={e => setEventTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={eventDuration}
                  onChange={e => setEventDuration(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Recurrence</label>
                <select
                  value={eventRecurrence}
                  onChange={e => setEventRecurrence(e.target.value)}
                >
                  <option value="none">One-time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            {selectedEvent && (
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
              >
                Delete Event
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
                {selectedEvent ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivitySchedule;
