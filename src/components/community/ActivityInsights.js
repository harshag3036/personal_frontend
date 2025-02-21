import React, { useState } from 'react';
import './ActivityInsights.css';

/**
 * ActivityInsights Component
 * Manages activity insights and analytics
 * Supports trend analysis, engagement metrics, and pattern recognition
 */
const ActivityInsights = ({ activity }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [category, setCategory] = useState('engagement');

  const getEngagementStats = () => {
    // In a real app, these would be calculated from actual data
    return {
      totalParticipants: 150,
      activeParticipants: 85,
      averageEngagement: 73,
      topContributors: 12,
      totalPosts: 234,
      totalComments: 567,
      totalReactions: 890,
      averageResponseTime: '2.5 hours'
    };
  };

  const getContentStats = () => {
    return {
      totalContent: 345,
      popularTopics: ['Mindfulness', 'Meditation', 'Self-Discovery', 'Growth'],
      contentTypes: {
        discussions: 45,
        resources: 67,
        challenges: 23,
        events: 12
      },
      engagement: {
        high: 34,
        medium: 56,
        low: 23
      }
    };
  };

  const getProgressStats = () => {
    return {
      completedMilestones: 8,
      ongoingMilestones: 5,
      averageCompletion: 78,
      participantProgress: {
        advanced: 23,
        intermediate: 45,
        beginner: 67
      }
    };
  };

  const getFeedbackStats = () => {
    return {
      overallRating: 4.5,
      totalFeedback: 123,
      sentimentBreakdown: {
        positive: 67,
        neutral: 45,
        negative: 11
      },
      topSuggestions: 15
    };
  };

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'week': return 'Past Week';
      case 'month': return 'Past Month';
      case 'quarter': return 'Past Quarter';
      case 'year': return 'Past Year';
      default: return 'All Time';
    }
  };

  const getCategoryData = () => {
    switch (category) {
      case 'engagement': return getEngagementStats();
      case 'content': return getContentStats();
      case 'progress': return getProgressStats();
      case 'feedback': return getFeedbackStats();
      default: return {};
    }
  };

  const renderEngagementInsights = (stats) => (
    <div className="insights-section">
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Participation</h4>
          <div className="insight-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.totalParticipants}</span>
              <span className="stat-label">Total Participants</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.activeParticipants}</span>
              <span className="stat-label">Active Participants</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.averageEngagement}%</span>
              <span className="stat-label">Average Engagement</span>
            </div>
          </div>
        </div>
        <div className="insight-card">
          <h4>Activity</h4>
          <div className="insight-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.totalPosts}</span>
              <span className="stat-label">Total Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.totalComments}</span>
              <span className="stat-label">Total Comments</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.totalReactions}</span>
              <span className="stat-label">Total Reactions</span>
            </div>
          </div>
        </div>
        <div className="insight-card">
          <h4>Response Time</h4>
          <div className="insight-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.averageResponseTime}</span>
              <span className="stat-label">Average Response Time</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.topContributors}</span>
              <span className="stat-label">Top Contributors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentInsights = (stats) => (
    <div className="insights-section">
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Content Overview</h4>
          <div className="insight-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.totalContent}</span>
              <span className="stat-label">Total Content</span>
            </div>
          </div>
          <div className="content-types">
            <h5>Content Types</h5>
            <div className="type-bars">
              {Object.entries(stats.contentTypes).map(([type, count]) => (
                <div key={type} className="type-bar">
                  <span className="type-label">{type}</span>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(count / stats.totalContent) * 100}%`
                      }}
                    />
                  </div>
                  <span className="type-value">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="insight-card">
          <h4>Popular Topics</h4>
          <div className="topics-cloud">
            {stats.popularTopics.map(topic => (
              <span key={topic} className="topic-tag">{topic}</span>
            ))}
          </div>
        </div>
        <div className="insight-card">
          <h4>Engagement Levels</h4>
          <div className="engagement-chart">
            {Object.entries(stats.engagement).map(([level, count]) => (
              <div key={level} className="engagement-bar">
                <span className="level-label">{level}</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / Object.values(stats.engagement).reduce((a, b) => a + b)) * 100}%`
                    }}
                  />
                </div>
                <span className="level-value">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressInsights = (stats) => (
    <div className="insights-section">
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Milestones</h4>
          <div className="insight-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.completedMilestones}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.ongoingMilestones}</span>
              <span className="stat-label">Ongoing</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.averageCompletion}%</span>
              <span className="stat-label">Average Completion</span>
            </div>
          </div>
        </div>
        <div className="insight-card">
          <h4>Participant Progress</h4>
          <div className="progress-chart">
            {Object.entries(stats.participantProgress).map(([level, count]) => (
              <div key={level} className="progress-bar">
                <span className="level-label">{level}</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / Object.values(stats.participantProgress).reduce((a, b) => a + b)) * 100}%`
                    }}
                  />
                </div>
                <span className="level-value">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedbackInsights = (stats) => (
    <div className="insights-section">
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Overall Rating</h4>
          <div className="rating-display">
            <span className="rating-value">★ {stats.overallRating}</span>
            <span className="rating-count">from {stats.totalFeedback} ratings</span>
          </div>
        </div>
        <div className="insight-card">
          <h4>Sentiment Breakdown</h4>
          <div className="sentiment-chart">
            {Object.entries(stats.sentimentBreakdown).map(([sentiment, count]) => (
              <div key={sentiment} className="sentiment-bar">
                <span className="sentiment-label">{sentiment}</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / Object.values(stats.sentimentBreakdown).reduce((a, b) => a + b)) * 100}%`
                    }}
                  />
                </div>
                <span className="sentiment-value">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="insight-card">
          <h4>Suggestions</h4>
          <div className="insight-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.topSuggestions}</span>
              <span className="stat-label">Top Suggestions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => {
    const data = getCategoryData();
    switch (category) {
      case 'engagement':
        return renderEngagementInsights(data);
      case 'content':
        return renderContentInsights(data);
      case 'progress':
        return renderProgressInsights(data);
      case 'feedback':
        return renderFeedbackInsights(data);
      default:
        return null;
    }
  };

  return (
    <div className="activity-insights">
      <div className="insights-header">
        <h2>Activity Insights</h2>
        <div className="insights-controls">
          <select
            value={timeframe}
            onChange={e => setTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="quarter">Past Quarter</option>
            <option value="year">Past Year</option>
            <option value="all">All Time</option>
          </select>
          <div className="category-tabs">
            <button
              className={`category-tab ${category === 'engagement' ? 'active' : ''}`}
              onClick={() => setCategory('engagement')}
            >
              Engagement
            </button>
            <button
              className={`category-tab ${category === 'content' ? 'active' : ''}`}
              onClick={() => setCategory('content')}
            >
              Content
            </button>
            <button
              className={`category-tab ${category === 'progress' ? 'active' : ''}`}
              onClick={() => setCategory('progress')}
            >
              Progress
            </button>
            <button
              className={`category-tab ${category === 'feedback' ? 'active' : ''}`}
              onClick={() => setCategory('feedback')}
            >
              Feedback
            </button>
          </div>
        </div>
      </div>

      <div className="insights-content">
        <div className="timeframe-label">
          <span>Showing data for: {getTimeframeLabel()}</span>
        </div>
        {renderInsights()}
      </div>
    </div>
  );
};

export default ActivityInsights;
