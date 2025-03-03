import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import EnhancedParticipantView from './EnhancedParticipantView';
import ActivityLifecycleView from './ActivityLifecycleView';
import ProgressTracker from './ProgressTracker';
import { CommentSection } from './comments';
import FileManager from './FileManager';
import DiscussionContent from './DiscussionContent';
import MemberRecognition from './MemberRecognition';
import './ActivityDetailView.css';

const ActivityDetailView = ({ activity: initialActivity, onClose }) => {
  const [activity, setActivity] = useState(initialActivity);
  const [refreshKey, setRefreshKey] = useState(0);
  const { activities } = useActivity();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('description');
  
  // Tab definitions
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'participants', label: 'Participants' },
    { id: 'recognition', label: 'Recognition' },
    { id: 'lifecycle', label: 'Activity Lifecycle' },
    { id: 'progress', label: 'Progress Tracking' },
    { id: 'files', label: 'Files' },
    { id: 'comments', label: 'Reflections' }
  ];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
    // Check if activity has metadata
    if (!activity.metadata) {
      return (
        <div className="metadata-row">
          <span className="metadata-label">Status</span>
          <span className="metadata-value">{activity.status}</span>
        </div>
      );
    }
    
    switch (activity.type) {
      case 'event':
        return (
          <>
            <div className="metadata-row">
              <span className="metadata-label">Date & Time</span>
              <span className="metadata-value">
                {activity.metadata.startDate ? new Date(activity.metadata.startDate).toLocaleString() : 'Not specified'}
              </span>
            </div>
            <div className="metadata-row">
              <span className="metadata-label">Location</span>
              <span className="metadata-value">{activity.metadata.location || 'Not specified'}</span>
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
                {activity.metadata.startDate ? new Date(activity.metadata.startDate).toLocaleDateString() : 'Not specified'}
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
              <span className="metadata-value">{activity.metadata.level || 'Not specified'}</span>
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
              <span className="metadata-value">{activity.metadata.resourceType || 'Not specified'}</span>
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
              <span className="metadata-value">{activity.metadata.duration || 'Not specified'}</span>
            </div>
            {activity.metadata.goals && activity.metadata.goals.length > 0 && (
              <div className="metadata-row">
                <span className="metadata-label">Goals</span>
                <ul className="goals-list">
                  {activity.metadata.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.metadata.criteria && activity.metadata.criteria.length > 0 && (
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
        return (
          <div className="metadata-row">
            <span className="metadata-label">Status</span>
            <span className="metadata-value">{activity.status}</span>
          </div>
        );
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

      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="detail-content">
        {activeTab === 'description' && (
          <div className="tab-content">
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
        )}

        {activeTab === 'details' && (
          <div className="tab-content">
            {renderMetadata()}
          </div>
        )}

        {activeTab === 'participants' && (
          <div className="tab-content">
            <EnhancedParticipantView activity={activity} />
          </div>
        )}

        {activeTab === 'recognition' && (
          <div className="tab-content">
            <MemberRecognition activityId={activity.id} />
          </div>
        )}

        {activeTab === 'lifecycle' && (
          <div className="tab-content">
            <ActivityLifecycleView activity={activity} />
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="tab-content">
            <ProgressTracker activity={activity} />
          </div>
        )}

        {activeTab === 'files' && (
          <div className="tab-content">
            <FileManager activityId={activity.id} />
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="tab-content">
            <CommentSection activity={activity} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetailView;
