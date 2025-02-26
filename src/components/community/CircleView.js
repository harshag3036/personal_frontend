import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import ActivityDetailView from './ActivityDetailView';
import ActivityManager from './ActivityManager';
import InviteManager from './InviteManager';
import ParticipantManager from './ParticipantManager';
import CommunityOverview from './CommunityOverview';
import DiscussionBoard from './DiscussionBoard';
import { CommentSection } from './comments';
import { SectionHeader } from './shared';
import DiscussionContent from './DiscussionContent';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDiscussionDetail, setShowDiscussionDetail] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const [localActivities, setLocalActivities] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [discussions, setDiscussions] = useState([]);
  const [discussionRefreshKey, setDiscussionRefreshKey] = useState(0);

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
  
  // Load discussions
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the mock data from the circle
    if (circle && circle.discussions) {
      setDiscussions(circle.discussions);
    }
  }, [circle, discussionRefreshKey]);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    // Simulating API call
    const mockCircles = {
      'badminton': {
        name: 'Badminton Enthusiasts',
        description: 'Connect with fellow badminton players, organize matches, and improve together',
        type: 'open',
        createdAt: '2024-01-01T10:00:00Z',
        activities: [],
        members: [
          {
            id: 1,
            name: 'John Doe',
            role: 'admin',
            skills: ['Strategy', 'Doubles Play'],
            status: 'active',
            joinedAt: '2024-01-15T10:00:00Z',
            activityCount: 12
          },
          {
            id: 2,
            name: 'Jane Smith',
            role: 'member',
            skills: ['Singles', 'Coaching'],
            status: 'active',
            joinedAt: '2024-01-20T14:30:00Z',
            activityCount: 8
          }
        ],
        discussions: [
          {
            id: 'd1',
            title: 'Tournament Planning',
            content: 'We should plan a tournament for the summer. What do you think about organizing a doubles tournament in July?',
            author: { id: 1, name: 'John Doe' },
            createdAt: '2024-02-10T09:00:00Z',
            commentCount: 5
          },
          {
            id: 'd2',
            title: 'Training Schedule',
            content: 'I think we should have regular training sessions on Tuesdays and Thursdays. We could focus on different skills each week.',
            author: { id: 2, name: 'Jane Smith' },
            createdAt: '2024-02-15T14:00:00Z',
            commentCount: 3
          }
        ]
      },
      'film': {
        name: 'Film Analysis',
        description: 'Deep dive into cinema, analyze techniques, and explore storytelling',
        type: 'open',
        createdAt: '2024-01-05T15:30:00Z',
        activities: [],
        members: [
          {
            id: 3,
            name: 'Alice Johnson',
            role: 'admin',
            skills: ['Cinematography', 'Screenplay'],
            status: 'active',
            joinedAt: '2024-01-10T09:15:00Z',
            activityCount: 15
          },
          {
            id: 4,
            name: 'Bob Wilson',
            role: 'member',
            skills: ['Film History', 'Direction'],
            status: 'active',
            joinedAt: '2024-01-25T16:45:00Z',
            activityCount: 7
          }
        ],
        discussions: [
          {
            id: 'd3',
            title: 'Kubrick Techniques',
            content: 'I\'ve been studying Kubrick\'s use of symmetry and one-point perspective. Would love to discuss how we can apply these techniques in our own projects.',
            author: { id: 3, name: 'Alice Johnson' },
            createdAt: '2024-02-05T11:00:00Z',
            commentCount: 8
          },
          {
            id: 'd4',
            title: 'Modern Storytelling',
            content: 'How do you think storytelling has evolved in the last decade? I feel like non-linear narratives are becoming more mainstream.',
            author: { id: 4, name: 'Bob Wilson' },
            createdAt: '2024-02-12T13:30:00Z',
            commentCount: 4
          }
        ]
      },
      'meditation': {
        name: 'Mindful Meditation Circle',
        description: 'A private group for deep meditation practice and sharing experiences',
        type: 'private',
        createdAt: '2024-01-15T08:00:00Z',
        activities: [],
        members: [
          {
            id: 5,
            name: 'Sarah Chen',
            role: 'admin',
            skills: ['Guided Meditation', 'Mindfulness'],
            status: 'active',
            joinedAt: '2024-02-01T11:20:00Z',
            activityCount: 10
          },
          {
            id: 6,
            name: 'Mike Brown',
            role: 'member',
            skills: ['Breathing Techniques', 'Yoga'],
            status: 'active',
            joinedAt: '2024-02-05T13:10:00Z',
            activityCount: 5
          }
        ],
        discussions: [
          {
            id: 'd5',
            title: 'Mindfulness Techniques',
            content: 'I\'ve been practicing body scan meditation and finding it very effective. Has anyone else tried this technique?',
            author: { id: 5, name: 'Sarah Chen' },
            createdAt: '2024-02-08T10:30:00Z',
            commentCount: 6
          },
          {
            id: 'd6',
            title: 'Meditation Experiences',
            content: 'Yesterday I had a profound experience during meditation where I felt completely present. I\'d love to hear about others\' experiences.',
            author: { id: 6, name: 'Mike Brown' },
            createdAt: '2024-02-14T15:45:00Z',
            commentCount: 3
          }
        ]
      },
      'philosophy': {
        name: 'Philosophy Study Group',
        description: 'Exploring philosophical texts and discussing their practical applications',
        type: 'private',
        createdAt: '2024-01-02T14:00:00Z',
        activities: [],
        members: [
          {
            id: 7,
            name: 'Emma Davis',
            role: 'admin',
            skills: ['Ancient Philosophy', 'Ethics'],
            status: 'active',
            joinedAt: '2024-01-05T08:30:00Z',
            activityCount: 18
          },
          {
            id: 8,
            name: 'Tom Wilson',
            role: 'member',
            skills: ['Modern Philosophy', 'Critical Thinking'],
            status: 'active',
            joinedAt: '2024-01-08T15:20:00Z',
            activityCount: 9
          }
        ],
        discussions: [
          {
            id: 'd7',
            title: 'Stoicism in Modern Life',
            content: 'I\'ve been reading Marcus Aurelius and trying to apply Stoic principles to modern challenges. Anyone else exploring this philosophy?',
            author: { id: 7, name: 'Emma Davis' },
            createdAt: '2024-02-03T09:45:00Z',
            commentCount: 10
          },
          {
            id: 'd8',
            title: 'Existentialism Discussion',
            content: 'I\'m interested in discussing how existentialist ideas from Sartre and Camus can help us navigate the challenges of modern life and technology.',
            author: { id: 8, name: 'Tom Wilson' },
            createdAt: '2024-02-10T16:15:00Z',
            commentCount: 7
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

  const renderOverview = () => {
    // Prepare data for the overview component
    const communityData = {
      ...circle,
      id: id,
      activities: localActivities,
      discussions: circle.discussions || []
    };
    
    return <CommunityOverview community={communityData} />;
  };

  const handleCreateDiscussion = async (discussionData) => {
    try {
      // In a real app, this would be an API call
      const newDiscussion = {
        ...discussionData,
        id: `d${Date.now()}`,
        author: {
          id: user?.id || 'temp-id',
          name: user?.name || 'Anonymous'
        },
        createdAt: new Date().toISOString(),
        commentCount: 0
      };

      // Update local state
      setDiscussions(prev => [...prev, newDiscussion]);
      
      // Update circle state
      setCircle(prev => ({
        ...prev,
        discussions: [...(prev.discussions || []), newDiscussion]
      }));

      return newDiscussion;
    } catch (error) {
      console.error('Error creating discussion:', error);
      throw error;
    }
  };

  const handleViewDiscussion = (discussionId) => {
    console.log('Viewing discussion:', discussionId);
    
    // Find the discussion
    const discussion = discussions.find(d => d.id === discussionId);
    console.log('Found discussion:', discussion);
    
    if (discussion) {
      setSelectedDiscussion(discussion);
      setShowDiscussionDetail(true);
      console.log('Set showDiscussionDetail to true');
    }
  };

  const renderDiscussions = () => {
    return (
      <div className="discussions-section">
        <DiscussionBoard
          discussions={discussions}
          onCreateDiscussion={handleCreateDiscussion}
          onViewDiscussion={handleViewDiscussion}
          communityId={id}
        />
      </div>
    );
  };

  const renderActivities = () => {
    return (
      <div className="activities-section">
        <SectionHeader 
          title="Activities" 
          subtitle="Engage with your community"
          actions={
            <button 
              className="create-activity-button"
              onClick={() => setShowActivityModal(true)}
            >
              Create Activity
            </button>
          }
        />

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
      <div className="members-section">
        <SectionHeader 
          title="Members" 
          subtitle={`${circle.members.length} people in this community`}
          actions={
            <button 
              className="invite-button"
              onClick={() => setShowInviteModal(true)}
            >
              Invite Member
            </button>
          }
        />
        
        <ParticipantManager
          activity={{
            ...circle,
            participants: circle.members,
            currentUserRole: 'admin', // TODO: Get from auth context
            currentUserId: '1' // TODO: Get from auth context
          }}
          onUpdateActivity={handleParticipantUpdate}
        />
      </div>
    );
  };

  const renderResources = () => {
    return (
      <div className="resources-section">
        <SectionHeader 
          title="Resources" 
          subtitle="Shared knowledge and materials"
          actions={
            <button className="add-resource-button">
              Add Resource
            </button>
          }
        />
        
        <div className="empty-state">
          <p>No resources have been shared yet.</p>
          <button>Add Resource</button>
        </div>
      </div>
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
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'discussions' ? 'active' : ''}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </button>
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
        <button 
          className={activeTab === 'resources' ? 'active' : ''}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </nav>

      <div className="circle-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'discussions' && renderDiscussions()}
        {activeTab === 'activities' && renderActivities()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'resources' && renderResources()}
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

      {showDiscussionDetail && (
        <div className="modal-overlay">
          <div className="discussion-detail-view">
            <div className="detail-header">
              <div className="header-content">
                <h2>{selectedDiscussion.title}</h2>
                <p className="creation-date">
                  Created {new Date(selectedDiscussion.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button 
                className="close-button"
                onClick={() => {
                  setShowDiscussionDetail(false);
                  setSelectedDiscussion(null);
                  // Force refresh when closing discussion detail
                  setDiscussionRefreshKey(prev => prev + 1);
                }}
              >
                ×
              </button>
            </div>

            <div className="detail-content">
              <div className="author-info">
                <span className="author-name">Posted by: {selectedDiscussion.author.name}</span>
              </div>
              
              {selectedDiscussion.tags && selectedDiscussion.tags.length > 0 && (
                <div className="discussion-tags">
                  {selectedDiscussion.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              
              {selectedDiscussion.templateId ? (
                <DiscussionContent discussion={selectedDiscussion} />
              ) : (
                <div className="discussion-content">
                  <p>{selectedDiscussion.content || 'No content available'}</p>
                </div>
              )}
              
              <CommentSection 
                activity={{
                  id: selectedDiscussion.id,
                  type: 'discussion',
                  title: selectedDiscussion.title,
                  templateId: selectedDiscussion.templateId,
                  strictRigourEnforcement: selectedDiscussion.strictRigourEnforcement
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircleView;
