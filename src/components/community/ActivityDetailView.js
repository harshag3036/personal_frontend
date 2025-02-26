import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import ActivityParticipants from './ActivityParticipants';
import ProgressTracker from './ProgressTracker';
import { CommentSection } from './comments';
import FileManager from './FileManager';
import DiscussionContent from './DiscussionContent';
import './ActivityDetailView.css';

const ActivityDetailView = ({ activity: initialActivity, onClose }) => {
  const [activity, setActivity] = useState(initialActivity);
  const [refreshKey, setRefreshKey] = useState(0);
  const { activities } = useActivity();
  
  // Update the activity when it changes in the context
  useEffect(() => {
    if (initialActivity && initialActivity.id) {
      const updatedActivity = activities.find(a => a.id === initialActivity.id);
      if (updatedActivity) {
        setActivity(updatedActivity);
      }
    }
  }, [initialActivity, activities, refreshKey]);
  
  // Force refresh every 2 seconds to ensure we have the latest data
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!activity) return null;

  const renderMetadata = () => {
    switch (activity.type) {
      case 'event':
        return (
          <>
            <div className="metadata-row">
              <span className="metadata-label">Date & Time</span>
              <span className="metadata-value">
                {new Date(activity.metadata.startDate).toLocaleString()}
              </span>
            </div>
            <div className="metadata-row">
              <span className="metadata-label">Location</span>
              <span className="metadata-value">{activity.metadata.location}</span>
            </div>
            {activity.metadata.maxParticipants && (
              <div className="metadata-row">
                <span className="metadata-label">Maximum Participants</span>
                <span className="metadata-value">{activity.metadata.maxParticipants}</span>
              </div>
            )}
          </>
        );

      case 'project':
        return (
          <>
            <div className="metadata-row">
              <span className="metadata-label">Start Date</span>
              <span className="metadata-value">
                {new Date(activity.metadata.startDate).toLocaleDateString()}
              </span>
            </div>
            {activity.metadata.endDate && (
              <div className="metadata-row">
                <span className="metadata-label">Target End Date</span>
                <span className="metadata-value">
                  {new Date(activity.metadata.endDate).toLocaleDateString()}
                </span>
              </div>
            )}
            {activity.metadata.skills && activity.metadata.skills.length > 0 && (
              <div className="metadata-row">
                <span className="metadata-label">Required Skills</span>
                <div className="skills-list">
                  {activity.metadata.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case 'skill-share':
        return (
          <>
            <div className="metadata-row">
              <span className="metadata-label">Level</span>
              <span className="metadata-value">{activity.metadata.level}</span>
            </div>
            {activity.metadata.duration && (
              <div className="metadata-row">
                <span className="metadata-label">Duration</span>
                <span className="metadata-value">{activity.metadata.duration}</span>
              </div>
            )}
          </>
        );

      case 'discussion':
        return (
          <>
            {activity.metadata.guidelines && (
              <div className="metadata-row">
                <span className="metadata-label">Guidelines</span>
                <span className="metadata-value">{activity.metadata.guidelines}</span>
              </div>
            )}
            {activity.metadata.focusAreas && activity.metadata.focusAreas.length > 0 && (
              <div className="metadata-row">
                <span className="metadata-label">Focus Areas</span>
                <div className="focus-areas-list">
                  {activity.metadata.focusAreas.map((area, index) => (
                    <span key={index} className="focus-tag">{area}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case 'resource':
        return (
          <>
            <div className="metadata-row">
              <span className="metadata-label">Resource Type</span>
              <span className="metadata-value">{activity.metadata.resourceType}</span>
            </div>
            {activity.metadata.url && (
              <div className="metadata-row">
                <span className="metadata-label">URL</span>
                <a 
                  href={activity.metadata.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  {activity.metadata.url}
                </a>
              </div>
            )}
            {activity.metadata.tags && activity.metadata.tags.length > 0 && (
              <div className="metadata-row">
                <span className="metadata-label">Tags</span>
                <div className="tags-list">
                  {activity.metadata.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case 'challenge':
        return (
          <>
            <div className="metadata-row">
              <span className="metadata-label">Duration</span>
              <span className="metadata-value">{activity.metadata.duration}</span>
            </div>
            {activity.metadata.goals && (
              <div className="metadata-row">
                <span className="metadata-label">Goals</span>
                <ul className="goals-list">
                  {activity.metadata.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.metadata.criteria && (
              <div className="metadata-row">
                <span className="metadata-label">Success Criteria</span>
                <ul className="criteria-list">
                  {activity.metadata.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="activity-detail-view">
      <div className="detail-header">
        <div className="header-content">
          <div className="type-status">
            <span className={`activity-type ${activity.type}`}>
              {activity.type}
            </span>
            <span className={`activity-status ${activity.status}`}>
              {activity.status}
            </span>
          </div>
          <h2>{activity.title}</h2>
          <p className="creation-date">
            Created {new Date(activity.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button 
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="detail-content">
        <div className="description-section">
          <h3>Description</h3>
          {activity.type === 'discussion' && activity.templateId ? (
            activity.content ? (
              <DiscussionContent discussion={activity} />
            ) : (
              <p>{activity.description || 'No content available'}</p>
            )
          ) : (
            <p>{activity.description || 'No content available'}</p>
          )}
        </div>

        <div className="metadata-section">
          <h3>Details</h3>
          {renderMetadata()}
        </div>

        <ActivityParticipants activity={activity} />
        <ProgressTracker activity={activity} />
        <FileManager activityId={activity.id} />
        <CommentSection activity={activity} />
      </div>
    </div>
  );
};

export default ActivityDetailView;
