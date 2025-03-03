import React, { useState } from 'react';
import ActivitySchedule from './ActivitySchedule';
import ActivityParticipants from './ActivityParticipants';
import ActivityRoles from './ActivityRoles';
import ActivityBadges from './ActivityBadges';
import ActivityMilestones from './ActivityMilestones';
import './CommunityTest.css';

/**
 * CommunityTest Component
 * Test harness for community components with sample data and interactions
 */
const CommunityTest = () => {
  // Sample activity data
  const [activity, setActivity] = useState({
    id: '1',
    name: 'Mindfulness Practice Group',
    description: 'A group dedicated to daily mindfulness practice and discussion',
    // Schedule data
    schedule: [
      {
        id: '1',
        name: 'Morning Meditation',
        description: 'Daily morning meditation session',
        date: '2025-02-22',
        time: '07:00',
        duration: 60,
        type: 'session',
        recurrence: 'daily'
      }
    ],
    // Participants data
    participants: [
      {
        id: '1',
        email: 'test@example.com',
        role: 'admin',
        status: 'active',
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      }
    ],
    // Roles data
    roles: [
      {
        id: '1',
        name: 'Facilitator',
        description: 'Leads meditation sessions and guides discussions',
        permissions: {
          manageParticipants: true,
          manageContent: true,
          manageRoles: false,
          createPosts: true
        }
      }
    ],
    // Badges data
    badges: [
      {
        id: '1',
        name: 'Early Bird',
        description: 'Attended 5 morning meditation sessions',
        icon: '🌅',
        level: 'bronze',
        criteria: {
          attendance: 5
        },
        awardedCount: 3
      }
    ],
    // Milestones data
    milestones: [
      {
        id: '1',
        name: 'First Month Complete',
        description: 'Complete one month of regular practice',
        deadline: '2025-03-21',
        status: 'in_progress',
        progress: 60,
        requirements: [
          {
            id: '1',
            text: 'Attend at least 20 sessions',
            completed: false
          }
        ]
      }
    ]
  });

  // Handler for activity updates
  const handleUpdateActivity = async (updatedActivity) => {
    console.log('Updating activity:', updatedActivity);
    setActivity(updatedActivity);
  };

  // Test scenarios
  const [activeTest, setActiveTest] = useState('schedule');
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (component, action, success, message) => {
    setTestResults(prev => [{
      timestamp: new Date().toISOString(),
      component,
      action,
      success,
      message
    }, ...prev]);
  };

  const runScheduleTests = async () => {
    try {
      // Test adding an event
      const newActivity = {
        ...activity,
        schedule: [...activity.schedule, {
          id: Date.now().toString(),
          name: 'Evening Reflection',
          description: 'Group reflection session',
          date: '2025-02-22',
          time: '19:00',
          duration: 45,
          type: 'discussion',
          recurrence: 'none'
        }]
      };
      await handleUpdateActivity(newActivity);
      addTestResult('Schedule', 'Add Event', true, 'Successfully added evening session');
    } catch (error) {
      addTestResult('Schedule', 'Add Event', false, error.message);
    }
  };

  const runParticipantTests = async () => {
    try {
      // Test adding a participant
      const newActivity = {
        ...activity,
        participants: [...activity.participants, {
          id: Date.now().toString(),
          email: 'newuser@example.com',
          role: 'member',
          status: 'pending',
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        }]
      };
      await handleUpdateActivity(newActivity);
      addTestResult('Participants', 'Add Participant', true, 'Successfully added new participant');
    } catch (error) {
      addTestResult('Participants', 'Add Participant', false, error.message);
    }
  };

  const runRoleTests = async () => {
    try {
      // Test adding a role
      const newActivity = {
        ...activity,
        roles: [...activity.roles, {
          id: Date.now().toString(),
          name: 'Moderator',
          description: 'Helps maintain group guidelines',
          permissions: {
            manageParticipants: false,
            manageContent: true,
            manageRoles: false,
            createPosts: true
          }
        }]
      };
      await handleUpdateActivity(newActivity);
      addTestResult('Roles', 'Add Role', true, 'Successfully added moderator role');
    } catch (error) {
      addTestResult('Roles', 'Add Role', false, error.message);
    }
  };

  const runBadgeTests = async () => {
    try {
      // Test adding a badge
      const newActivity = {
        ...activity,
        badges: [...activity.badges, {
          id: Date.now().toString(),
          name: 'Night Owl',
          description: 'Attended 5 evening sessions',
          icon: '🌙',
          level: 'silver',
          criteria: {
            attendance: 5
          },
          awardedCount: 0
        }]
      };
      await handleUpdateActivity(newActivity);
      addTestResult('Badges', 'Add Badge', true, 'Successfully added night owl badge');
    } catch (error) {
      addTestResult('Badges', 'Add Badge', false, error.message);
    }
  };

  const runMilestoneTests = async () => {
    try {
      // Test adding a milestone
      const newActivity = {
        ...activity,
        milestones: [...activity.milestones, {
          id: Date.now().toString(),
          name: 'Community Engagement',
          description: 'Actively participate in the community',
          deadline: '2025-04-21',
          status: 'pending',
          progress: 0,
          requirements: [
            {
              id: Date.now().toString(),
              text: 'Create 3 discussion posts',
              completed: false
            }
          ]
        }]
      };
      await handleUpdateActivity(newActivity);
      addTestResult('Milestones', 'Add Milestone', true, 'Successfully added community milestone');
    } catch (error) {
      addTestResult('Milestones', 'Add Milestone', false, error.message);
    }
  };

  return (
    <div className="community-test">
      <div className="test-controls">
        <h2>Component Testing</h2>
        <div className="test-buttons">
          <button
            className={activeTest === 'schedule' ? 'active' : ''}
            onClick={() => {
              setActiveTest('schedule');
              runScheduleTests();
            }}
          >
            Test Schedule
          </button>
          <button
            className={activeTest === 'participants' ? 'active' : ''}
            onClick={() => {
              setActiveTest('participants');
              runParticipantTests();
            }}
          >
            Test Participants
          </button>
          <button
            className={activeTest === 'roles' ? 'active' : ''}
            onClick={() => {
              setActiveTest('roles');
              runRoleTests();
            }}
          >
            Test Roles
          </button>
          <button
            className={activeTest === 'badges' ? 'active' : ''}
            onClick={() => {
              setActiveTest('badges');
              runBadgeTests();
            }}
          >
            Test Badges
          </button>
          <button
            className={activeTest === 'milestones' ? 'active' : ''}
            onClick={() => {
              setActiveTest('milestones');
              runMilestoneTests();
            }}
          >
            Test Milestones
          </button>
        </div>
      </div>

      <div className="test-results">
        <h3>Test Results</h3>
        <div className="results-list">
          {testResults.map((result, index) => (
            <div key={index} className={`result-item ${result.success ? 'success' : 'failure'}`}>
              <div className="result-header">
                <span className="result-component">{result.component}</span>
                <span className="result-action">{result.action}</span>
                <span className="result-status">{result.success ? '✓' : '✗'}</span>
              </div>
              <div className="result-message">{result.message}</div>
              <div className="result-time">
                {new Date(result.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="component-preview">
        {activeTest === 'schedule' && (
          <ActivitySchedule
            activity={activity}
            onUpdateActivity={handleUpdateActivity}
          />
        )}
        {activeTest === 'participants' && (
          <ActivityParticipants
            activity={activity}
            onUpdateActivity={handleUpdateActivity}
          />
        )}
        {activeTest === 'roles' && (
          <ActivityRoles
            activity={activity}
            onUpdateActivity={handleUpdateActivity}
          />
        )}
        {activeTest === 'badges' && (
          <ActivityBadges
            activity={activity}
            onUpdateActivity={handleUpdateActivity}
          />
        )}
        {activeTest === 'milestones' && (
          <ActivityMilestones
            activity={activity}
            onUpdateActivity={handleUpdateActivity}
          />
        )}
      </div>
    </div>
  );
};

export default CommunityTest;
