import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import ActivityDetailView from './ActivityDetailView';
import ActivityManager from './ActivityManager';
import ActivityBrowser from './ActivityBrowser';
import InviteManager from './InviteManager';
import ParticipantManager from './ParticipantManager';
import MemberDirectory from './MemberDirectory';
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

  // No test activities - removed as requested

  // Refresh activities when activities state changes or on refresh trigger
  useEffect(() => {
    const filteredActivities = getActivities(id);
    console.log('Filtered activities for community:', id, filteredActivities);
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
  
  // Listen for the custom event to show the invite modal
  useEffect(() => {
    const handleShowInviteModal = () => {
      setShowInviteModal(true);
    };
    
    window.addEventListener('show-invite-modal', handleShowInviteModal);
    
    return () => {
      window.removeEventListener('show-invite-modal', handleShowInviteModal);
    };
  }, []);

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
        communityId: id, // Add communityId for compatibility
        createdBy: {
          id: user?.id || 'temp-id',
          name: user?.name || 'Anonymous'
        },
        participants: [],
        status: 'active',
        createdAt: new Date().toISOString()
      };

      console.log('Creating new activity:', newActivity);
      await addActivity(id, newActivity);
      setShowActivityModal(false);
      
      // Force refresh to show the new activity
      setRefreshKey(prev => prev + 1);
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
      // Scroll to top when showing discussion detail
      window.scrollTo(0, 0);
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
        <ActivityBrowser 
          communityId={id} 
          onActivityClick={(activityId) => {
            const activity = localActivities.find(a => a.id === activityId);
            if (activity) {
              setSelectedActivity(activity);
              setShowActivityDetail(true);
              // Scroll to top when showing activity detail
              window.scrollTo(0, 0);
            }
          }}
          onCreateActivity={() => setShowActivityModal(true)}
        />
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
    // Prepare member data with additional information
    const enhancedMembers = circle.members.map(member => {
      // Add activity level based on activity count
      let activityLevel = 'none';
      if (member.activityCount > 15) {
        activityLevel = 'high';
      } else if (member.activityCount > 8) {
        activityLevel = 'medium';
      } else if (member.activityCount > 0) {
        activityLevel = 'low';
      }
      
      // Add email if not present
      const email = member.email || `${member.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      
      // Add last active date if not present (using a fixed offset instead of random)
      const lastActive = member.lastActive || 
        new Date(Date.now() - (member.id * 24 * 60 * 60 * 1000)).toISOString(); // Use member.id to create a stable offset
      
      return {
        ...member,
        activityLevel,
        email,
        lastActive
      };
    });
    
    return (
      <div className="members-section">
        <MemberDirectory
          members={enhancedMembers}
          communityId={id}
          onUpdateMember={(memberId, updates) => {
            // Update the member in the circle
            const updatedMembers = circle.members.map(member => 
              member.id === memberId ? { ...member, ...updates } : member
            );
            
            // Update the circle state
            setCircle(prev => ({
              ...prev,
              members: updatedMembers
            }));
          }}
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
