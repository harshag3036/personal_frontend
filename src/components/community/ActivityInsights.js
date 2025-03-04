import React, { useState } from 'react';
import './ActivityBrowser.css';
import './ActivityInsights.css';

// Activity Insights component
const ActivityInsights = ({ activities }) => {
  // Calculate insights
  const totalActivities = activities.length;
  const activeActivities = activities.filter(a => a.status === 'active').length;
  const upcomingActivities = activities.filter(a => a.status === 'upcoming').length;
  
  // Get most popular type
  const getMostPopularType = () => {
    const typeCounts = activities.reduce((counts, activity) => {
      const type = activity.type;
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});
    
    if (Object.keys(typeCounts).length === 0) return { label: 'None', icon: '📋' };
    
    const mostPopularType = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      
    const typeConfig = {
      discussion: { icon: '🌱', label: 'Discussion' },
      event: { icon: '📅', label: 'Event' },
      project: { icon: '🎯', label: 'Project' },
      'skill-share': { icon: '🎓', label: 'Skill Share' },
      resource: { icon: '📚', label: 'Resource' },
      challenge: { icon: '🏆', label: 'Challenge' }
    };
      
    return typeConfig[mostPopularType] || { label: 'None', icon: '📋' };
  };
  
  // Get most active category
  const getMostActiveCategory = () => {
    const categoryCounts = activities.reduce((counts, activity) => {
      const category = activity.category;
      if (category) {
        counts[category] = (counts[category] || 0) + 1;
      }
      return counts;
    }, {});
    
    if (Object.keys(categoryCounts).length === 0) return { label: 'None', icon: '📂' };
    
    const mostActiveCategory = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    
    const categories = [
      { value: 'fitness', label: 'Fitness', icon: '🏃' },
      { value: 'learning', label: 'Learning', icon: '📚' },
      { value: 'social', label: 'Social', icon: '👥' },
      { value: 'creative', label: 'Creative', icon: '🎨' },
      { value: 'wellness', label: 'Wellness', icon: '🧘' },
      { value: 'technology', label: 'Technology', icon: '💻' }
    ];
      
    return categories.find(c => c.value === mostActiveCategory) || { label: 'None', icon: '📂' };
  };
  
  const mostPopularType = getMostPopularType();
  const mostActiveCategory = getMostActiveCategory();
  
  const [insightsExpanded, setInsightsExpanded] = useState(true);
  
  return (
    <div className="activity-insights">
      <div className="insights-header">
        <h3 className="insights-title">Activity Insights</h3>
        <button 
          className="insights-toggle" 
          onClick={() => setInsightsExpanded(!insightsExpanded)}
        >
          {insightsExpanded ? 'Hide Details' : 'Show Details'} 
          <span className={`insights-toggle-icon ${insightsExpanded ? 'up' : ''}`}>▼</span>
        </button>
      </div>
      
      <div 
        className={`insights-content ${insightsExpanded ? '' : 'hidden'}`} 
        style={{
          display: insightsExpanded ? 'block' : 'none', 
          pointerEvents: insightsExpanded ? 'auto' : 'none'
        }}
      >
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-title">Total Activities</div>
            <div className="insight-value">{totalActivities}</div>
            <div className="insight-trend trend-neutral">
              <span className="trend-icon">•</span> Current
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-title">Active Now</div>
            <div className="insight-value">{activeActivities}</div>
            <div className="insight-trend trend-up">
              <span className="trend-icon">↑</span> {Math.round((activeActivities / totalActivities) * 100) || 0}%
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-title">Upcoming</div>
            <div className="insight-value">{upcomingActivities}</div>
            <div className="insight-trend trend-neutral">
              <span className="trend-icon">→</span> Planned
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-title">Popular Type</div>
            <div className="insight-value">
              {mostPopularType.icon} {mostPopularType.label}
            </div>
            <div className="insight-trend trend-neutral">
              <span className="trend-icon">•</span> Most Common
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-title">Active Category</div>
            <div className="insight-value">
              {mostActiveCategory.icon} {mostActiveCategory.label}
            </div>
            <div className="insight-trend trend-neutral">
              <span className="trend-icon">•</span> Most Engaged
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityInsights;
