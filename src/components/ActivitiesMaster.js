/**
 * ActivitiesMaster Component
 * 
 * Central hub for all activities across the application.
 * Provides tabs for different activity views:
 * - My Activities: Activities where the user is participating
 * - All Activities: Activities across all communities
 * - Discover: Find new activities to join
 * - Insights: Analytics and statistics about activity engagement
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Tabs, 
  Tab, 
  Stack,
  Button
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import './ActivitiesMaster.css'; // Use the new dedicated styles

// Import components
import GlobalActivityBrowser from './GlobalActivityBrowser';
import GlobalActivityManager from './GlobalActivityManager';
import ActivityDetailView from './ActivityDetailView';
import ActivityDashboard from './ActivityDashboard';
import ActivityInsights from './ActivityInsights';
import ActivityRecommendations from './ActivityRecommendations';
import ActivityCalendar from './ActivityCalendar';
import ActivityExport from './ActivityExport';
import ActivityMobileOptimizer from './ActivityMobileOptimizer';

const ActivitiesMaster = () => {
  const [activeTab, setActiveTab] = useState('my-activities');
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const { getAllActivities, getUserActivities, getGlobalActivities } = useActivity();
  const { user } = useUser();
  
  const [myActivities, setMyActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [globalActivities, setGlobalActivities] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Load activities when the component mounts
  useEffect(() => {
    const fetchActivities = () => {
      const all = getAllActivities();
      const user = getUserActivities();
      const global = getGlobalActivities();
      
      setAllActivities(all);
      setMyActivities(user);
      setGlobalActivities(global);
    };
    
    fetchActivities();
    
    // Set up an interval to refresh activities data
    const intervalId = setInterval(fetchActivities, 30000); // 30 seconds
    
    return () => clearInterval(intervalId);
  }, [getAllActivities, getUserActivities, getGlobalActivities]);
  
  // Track window size changes for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Initialize
    handleResize();
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  // Open activity creation modal/form
  const handleCreateActivity = () => {
    setIsCreatingActivity(true);
  };
  
  // Activity creation using GlobalActivityManager
  const renderActivityCreation = () => {
    return (
      <GlobalActivityManager 
        onClose={() => setIsCreatingActivity(false)}
        onSuccess={() => {
          // Refresh activities data
          const all = getAllActivities();
          const user = getUserActivities();
          const global = getGlobalActivities();
          
          setAllActivities(all);
          setMyActivities(user);
          setGlobalActivities(global);
        }}
      />
    );
  };
  
  // Render the dashboard tab content
  const renderDashboard = () => {
    return (
      <ActivityDashboard 
        onViewActivity={setSelectedActivityId}
        onCreateActivity={handleCreateActivity}
      />
    );
  };
  
  // All activities tab content using GlobalActivityBrowser
  const renderAllActivities = () => {
    return (
      <GlobalActivityBrowser 
        onCreateActivity={handleCreateActivity}
        onActivityClick={(activityId) => {
          // Open detailed view
          setSelectedActivityId(activityId);
        }}
      />
    );
  };
  
  // Handle activity detail view
  const handleParticipationChange = (action, activityId) => {
    // Refresh activity data after participation change
    const all = getAllActivities();
    const user = getUserActivities();
    const global = getGlobalActivities();
    
    setAllActivities(all);
    setMyActivities(user);
    setGlobalActivities(global);
  };
  
  // Render the activity detail view
  const renderActivityDetail = () => {
    return (
      <ActivityDetailView 
        activityId={selectedActivityId}
        onClose={() => setSelectedActivityId(null)}
        onParticipationChange={handleParticipationChange}
      />
    );
  };
  
  // Discover tab content using ActivityRecommendations
  const renderDiscover = () => {
    return (
      <ActivityRecommendations 
        onViewActivity={setSelectedActivityId}
        onCreateActivity={handleCreateActivity}
      />
    );
  };
  
  // Insights tab content using ActivityInsights
  const renderInsights = () => {
    return <ActivityInsights />;
  };
  
  // Calendar tab content using ActivityCalendar
  const renderCalendar = () => {
    return (
      <ActivityCalendar
        onViewActivity={setSelectedActivityId}
        onCreateActivity={handleCreateActivity}
      />
    );
  };
  
  // Export tab content using ActivityExport
  const renderExport = () => {
    return (
      <ActivityExport
        onCreateActivity={handleCreateActivity}
      />
    );
  };
  
  // Render the content for the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'my-activities':
        return renderDashboard();
      case 'all-activities':
        return renderAllActivities();
      case 'discover':
        return renderDiscover();
      case 'insights':
        return renderInsights();
      case 'calendar':
        return renderCalendar();
      case 'export':
        return renderExport();
      default:
        return renderDashboard();
    }
  };

  // Render mobile-optimized view when on small screens
  if (isMobile) {
    return (
      <Box className="activities-master-container-mobile">
        <div className="activities-header">
          <Flex 
            justifyContent="space-between" 
            alignItems="center"
            width="100%"
          >
            <Text variant="h2">Activities</Text>
          </Flex>
        </div>
        
        {isCreatingActivity ? (
          <div className="activities-content">
            {renderActivityCreation()}
          </div>
        ) : selectedActivityId ? (
          <div className="activity-detail">
            {renderActivityDetail()}
          </div>
        ) : (
          <ActivityMobileOptimizer
            onViewActivity={setSelectedActivityId}
            onCreateActivity={handleCreateActivity}
            activeTab={activeTab}
            onChangeTab={handleTabChange}
          />
        )}
      </Box>
    );
  }

  // Render desktop view for larger screens
  return (
    <Box className="activities-master-container">
      <div className="activities-header">
        <Flex 
          justifyContent="space-between" 
          alignItems="center"
          width="100%"
        >
          <Text variant="h1">Activities</Text>
          
          {!isCreatingActivity && (
            <Button 
              className="create-activity-btn"
              variant="primary"
              onClick={handleCreateActivity}
            >
              Create Activity
            </Button>
          )}
        </Flex>
      </div>
      
      {isCreatingActivity ? (
        renderActivityCreation()
      ) : selectedActivityId ? (
        renderActivityDetail()
      ) : (
        <>
          <div className="activities-tabs">
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              width="100%"
            >
              <Tab 
                id="my-activities" 
                label="My Activities" 
                count={myActivities.length}
                className={`activities-tab ${activeTab === 'my-activities' ? 'active' : ''}`}
              />
              <Tab 
                id="all-activities" 
                label="All Activities" 
                count={allActivities.length}
                className={`activities-tab ${activeTab === 'all-activities' ? 'active' : ''}`}
              />
              <Tab 
                id="discover" 
                label="Discover"
                className={`activities-tab ${activeTab === 'discover' ? 'active' : ''}`}
              />
              <Tab 
                id="insights" 
                label="Insights"
                className={`activities-tab ${activeTab === 'insights' ? 'active' : ''}`}
              />
              <Tab 
                id="calendar" 
                label="Calendar"
                className={`activities-tab ${activeTab === 'calendar' ? 'active' : ''}`}
              />
              <Tab 
                id="export" 
                label="Export & Share"
                className={`activities-tab ${activeTab === 'export' ? 'active' : ''}`}
              />
            </Tabs>
          </div>
          
          <div className="activities-content">
            {renderTabContent()}
          </div>
        </>
      )}
    </Box>
  );
};

export default ActivitiesMaster;
