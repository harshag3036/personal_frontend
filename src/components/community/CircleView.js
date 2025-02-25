import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import ActivityDetailView from './ActivityDetailView';
import ActivityManager from './ActivityManager';
import InviteManager from './InviteManager';
import ParticipantManager from './ParticipantManager';
import './CircleView.css';

const activityTypes = [
  {
    id: 'discussion',
    label: 'Mindful Discussion',
    icon: '🌱'
  },
  {
    id: 'event',
    label: 'Event',
    icon: '📅'
  },
  {
    id: 'project',
    label: 'Project',
    icon: '🎯'
  },
  {
    id: 'skill-share',
    label: 'Skill Share',
    icon: '🎓'
  },
  {
    id: 'resource',
    label: 'Resource',
    icon: '📚'
  },
  {
    id: 'challenge',
    label: 'Challenge',
    icon: '🏆'
  }
];

/**
 * CircleView Component
 * Displays a private circle's activities and members
 * Focuses on close relationships and shared growth
 */
const CircleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, addActivity, getActivities, getParticipants, getComments, getFiles } = useActivity();
  const { user } = useUser();
  const [circle, setCircle] = useState(null);
  const [activeTab, setActiveTab] = useState('activities');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [localActivities, setLocalActivities] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh activities when activities state changes or on refresh trigger
  useEffect(() => {
    const filteredActivities = getActivities(id);
    setLocalActivities(filteredActivities);
  }, [activities, id, getActivities, refreshKey]);
  
  // Force refresh every second to ensure we have the latest data
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    // Simulating API call
    const mockCircles = {
      'badminton': {
        name: 'Badminton Enthusiasts',
        description: 'Connect with fellow badminton players, organize matches, and improve together',
        type: 'open',
        activities: [],
        members: [
          {
            id: 1,
            name: 'John Doe',
            role: 'admin',
            skills: ['Strategy', 'Doubles Play'],
            status: 'active',
            joinedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: 2,
            name: 'Jane Smith',
            role: 'member',
            skills: ['Singles', 'Coaching'],
            status: 'active',
            joinedAt: '2024-01-20T14:30:00Z'
          }
        ]
      },
      'film': {
        name: 'Film Analysis',
        description: 'Deep dive into cinema, analyze techniques, and explore storytelling',
        type: 'open',
        activities: [],
        members: [
          {
            id: 3,
            name: 'Alice Johnson',
            role: 'admin',
            skills: ['Cinematography', 'Screenplay'],
            status: 'active',
            joinedAt: '2024-01-10T09:15:00Z'
          },
          {
            id: 4,
            name: 'Bob Wilson',
            role: 'member',
            skills: ['Film History', 'Direction'],
            status: 'active',
            joinedAt: '2024-01-25T16:45:00Z'
          }
        ]
      },
      'meditation': {
        name: 'Mindful Meditation Circle',
        description: 'A private group for deep meditation practice and sharing experiences',
        type: 'private',
        activities: [],
        members: [
          {
            id: 5,
            name: 'Sarah Chen',
            role: 'admin',
            skills: ['Guided Meditation', 'Mindfulness'],
            status: 'active',
            joinedAt: '2024-02-01T11:20:00Z'
          },
          {
            id: 6,
            name: 'Mike Brown',
            role: 'member',
            skills: ['Breathing Techniques', 'Yoga'],
            status: 'active',
            joinedAt: '2024-02-05T13:10:00Z'
          }
        ]
      },
      'philosophy': {
        name: 'Philosophy Study Group',
        description: 'Exploring philosophical texts and discussing their practical applications',
        type: 'private',
        activities: [],
        members: [
          {
            id: 7,
            name: 'Emma Davis',
            role: 'admin',
            skills: ['Ancient Philosophy', 'Ethics'],
            status: 'active',
            joinedAt: '2024-01-05T08:30:00Z'
          },
          {
            id: 8,
            name: 'Tom Wilson',
            role: 'member',
            skills: ['Modern Philosophy', 'Critical Thinking'],
            status: 'active',
            joinedAt: '2024-01-08T15:20:00Z'
          }
        ]
      }
    };

    const circleData = mockCircles[id];
    if (circleData) {
      setCircle(circleData);
    } else {
      navigate('/community');
    }
  }, [id, navigate]);

  if (!circle) {
    return (
      <div className="circle-view loading">
        <p>Loading community...</p>
      </div>
    );
  }

  const handleActivityCreate = async (activityData) => {
    try {
      const newActivity = {
        ...activityData,
        circleId: id,
        createdBy: {
          id: user?.id || 'temp-id',
          name: user?.name || 'Anonymous'
        },
        participants: [],
        status: 'active',
        createdAt: new Date().toISOString()
      };

      await addActivity(id, newActivity);
      setShowActivityModal(false);
    } catch (error) {
      console.error('Error creating activity:', error);
      // Show error feedback to user
      alert(error.message || 'Failed to create activity');
    }
  };

  const renderActivities = () => {
    return (
      <div className="activities-section">
        <div className="section-header">
          <h3>Activities</h3>
          <button 
            className="create-activity-button"
            onClick={() => setShowActivityModal(true)}
          >
            Create Activity
          </button>
        </div>

        {localActivities.length === 0 ? (
          <div className="empty-state">
            <p>No activities yet. Start something together!</p>
            <button onClick={() => setShowActivityModal(true)}>
              Create Activity
            </button>
          </div>
        ) : (
          <div className="activities-grid">
            {localActivities.map(activity => (
              <div key={activity.id} className="activity-card">
                <div className="activity-header">
                  <div className="header-main">
                    <span className={`activity-type ${activity.type}`}>
                      {activityTypes.find(t => t.id === activity.type)?.icon} {activityTypes.find(t => t.id === activity.type)?.label || activity.type}
                    </span>
                    <span className={`activity-status ${activity.status}`}>
                      {activity.status}
                    </span>
                  </div>
                  <h3>{activity.title}</h3>
                </div>
                <div className="activity-content">
                  <p>{activity.description}</p>
                  {activity.metadata && (
                    <div className="activity-metadata">
                      {activity.type === 'event' && (
                        <>
                          <div className="metadata-item">
                            <span>📅 {new Date(activity.metadata.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="metadata-item">
                            <span>📍 {activity.metadata.location}</span>
                          </div>
                        </>
                      )}
                      {activity.type === 'skill-share' && (
                        <>
                          <div className="metadata-item">
                            <span>🎓 Level: {activity.metadata.level}</span>
                          </div>
                          <div className="metadata-item">
                            <span>⏱️ Duration: {activity.metadata.duration}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="activity-footer">
                  <div className="activity-stats">
                    <div className="activity-stats">
                    <span>{getParticipants(activity.id).length} participants</span>
                    <span>•</span>
                    <span>{getComments(activity.id).length} comments</span>
                    <span>•</span>
                    <span>{getFiles(activity.id).length} files</span>
                  </div>
                    {activity.progress?.milestones?.length > 0 && (
                      <span className="progress-indicator">
                        {activity.progress.milestones.filter(m => m.completed).length} / {activity.progress.milestones.length} milestones
                      </span>
                    )}
                    {activity.progress?.status && (
                      <span className={`activity-progress-status ${activity.progress.status}`}>
                        {activity.progress.status.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <button 
                    className="view-button"
                    onClick={() => {
                      setSelectedActivity(activity);
                      setShowActivityDetail(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleParticipantUpdate = (updatedActivity) => {
    setCircle(prev => ({
      ...prev,
      members: updatedActivity.participants || updatedActivity.members
    }));
  };

  const handleInviteSend = async (invites) => {
    try {
      // TODO: Implement actual invite sending
      setShowInviteModal(false);
    } catch (error) {
      console.error('Error sending invites:', error);
    }
  };

  const renderMembers = () => {
    return (
      <>
        <ParticipantManager
          activity={{
            ...circle,
            participants: circle.members,
            currentUserRole: 'admin', // TODO: Get from auth context
            currentUserId: '1' // TODO: Get from auth context
          }}
          onUpdateActivity={handleParticipantUpdate}
        />
        <button 
          className="invite-button"
          onClick={() => setShowInviteModal(true)}
        >
          Invite Member
        </button>
      </>
    );
  };

  return (
    <div className="circle-view">
      <header className="circle-header">
        <div className="header-top">
          <button 
            className="back-button"
            onClick={() => navigate('/community')}
          >
            ← Back to Communities
          </button>
          <span className={`community-type ${circle.type}`}>
            {circle.type === 'private' ? 'Private Circle' : 'Open Community'}
          </span>
        </div>
        <h2>{circle.name}</h2>
        <p>{circle.description}</p>
      </header>

      <nav className="circle-nav">
        <button 
          className={activeTab === 'activities' ? 'active' : ''}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </button>
        <button 
          className={activeTab === 'members' ? 'active' : ''}
          onClick={() => setActiveTab('members')}
        >
          Members ({circle.members.length})
        </button>
      </nav>

      <div className="circle-content">
        {activeTab === 'activities' ? renderActivities() : renderMembers()}
      </div>

      {showActivityModal && (
        <div className="modal-overlay">
          <ActivityManager
            onActivityCreate={handleActivityCreate}
            onClose={() => setShowActivityModal(false)}
          />
        </div>
      )}

      {showInviteModal && (
        <div className="modal-overlay">
          <InviteManager
            onInvite={handleInviteSend}
            onClose={() => setShowInviteModal(false)}
          />
        </div>
      )}

      {showActivityDetail && (
        <div className="modal-overlay">
          <ActivityDetailView
            activity={selectedActivity}
            onClose={() => {
              setShowActivityDetail(false);
              setSelectedActivity(null);
              // Force refresh when closing activity detail
              setRefreshKey(prev => prev + 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CircleView;
