import React, { useState } from 'react';
import './ActivityAnalytics.css';

/**
 * ActivityAnalytics Component
 * Displays analytics and insights for activities
 * Supports engagement metrics, trends, and participant analysis
 */
const ActivityAnalytics = ({ activity }) => {
  const [timeframe, setTimeframe] = useState('week');

  const calculateEngagementRate = () => {
    if (!activity.participants?.length) return 0;
    const activeParticipants = activity.participants.filter(p => 
      new Date(p.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    return Math.round((activeParticipants / activity.participants.length) * 100);
  };

  const getParticipationTrend = () => {
    const now = Date.now();
    const intervals = {
      week: 7,
      month: 30,
      year: 365
    };
    const days = intervals[timeframe];
    const msPerDay = 24 * 60 * 60 * 1000;
    
    const trend = new Array(days).fill(0);
    activity.participants?.forEach(participant => {
      const dayIndex = Math.floor((now - new Date(participant.joinedAt)) / msPerDay);
      if (dayIndex < days) {
        trend[dayIndex]++;
      }
    });
    return trend.reverse();
  };

  const getTopContributors = () => {
    if (!activity.participants) return [];
    return activity.participants
      .sort((a, b) => (b.contributions || 0) - (a.contributions || 0))
      .slice(0, 5);
  };

  const getActivityBreakdown = () => {
    const breakdown = {
      discussions: activity.discussions?.length || 0,
      resources: activity.resources?.length || 0,
      events: activity.events?.length || 0,
      challenges: activity.challenges?.length || 0
    };
    const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    return Object.entries(breakdown).map(([key, value]) => ({
      type: key,
      count: value,
      percentage: total ? Math.round((value / total) * 100) : 0
    }));
  };

  const trend = getParticipationTrend();
  const maxTrendValue = Math.max(...trend, 1);

  return (
    <div className="activity-analytics">
      <div className="analytics-header">
        <h2>Analytics & Insights</h2>
        <div className="timeframe-selector">
          <button
            className={timeframe === 'week' ? 'active' : ''}
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button
            className={timeframe === 'month' ? 'active' : ''}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button
            className={timeframe === 'year' ? 'active' : ''}
            onClick={() => setTimeframe('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Engagement Rate</h3>
          <div className="metric-large">
            <span className="metric-value">{calculateEngagementRate()}%</span>
            <span className="metric-label">Active Participants</span>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Total Participants</h3>
          <div className="metric-large">
            <span className="metric-value">{activity.participants?.length || 0}</span>
            <span className="metric-label">Members</span>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Activity Score</h3>
          <div className="metric-large">
            <span className="metric-value">
              {Math.round((calculateEngagementRate() + (activity.participants?.length || 0)) / 2)}
            </span>
            <span className="metric-label">Overall Health</span>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <h3>Participation Trend</h3>
        <div className="trend-chart">
          {trend.map((value, index) => (
            <div
              key={index}
              className="trend-bar"
              style={{
                height: `${(value / maxTrendValue) * 100}%`
              }}
            >
              <span className="trend-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="trend-labels">
          {trend.map((_, index) => (
            <span key={index} className="trend-label">
              {timeframe === 'week'
                ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]
                : `${trend.length - index}`}
            </span>
          ))}
        </div>
      </div>

      <div className="analytics-section">
        <h3>Top Contributors</h3>
        <div className="contributors-list">
          {getTopContributors().map((contributor, index) => (
            <div key={contributor.id} className="contributor-item">
              <span className="contributor-rank">#{index + 1}</span>
              <span className="contributor-name">
                {contributor.anonymous ? 'Anonymous' : contributor.name || 'User'}
              </span>
              <span className="contributor-score">
                {contributor.contributions || 0} contributions
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-section">
        <h3>Activity Breakdown</h3>
        <div className="breakdown-chart">
          {getActivityBreakdown().map(item => (
            <div key={item.type} className="breakdown-item">
              <div className="breakdown-bar">
                <div
                  className="breakdown-fill"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="breakdown-info">
                <span className="breakdown-label">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <span className="breakdown-value">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityAnalytics;
