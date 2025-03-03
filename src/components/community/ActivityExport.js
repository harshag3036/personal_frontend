import React, { useState } from 'react';
import './ActivityExport.css';

/**
 * ActivityExport Component
 * Manages data export and portability for activities
 * Supports various export formats and selective data export
 */
const ActivityExport = ({ activity }) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [selectedData, setSelectedData] = useState({
    discussions: true,
    resources: true,
    events: true,
    challenges: true,
    participants: true,
    feedback: true,
    analytics: true
  });
  const [error, setError] = useState(null);

  const handleExport = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const exportData = {};

      // Only include selected data
      if (selectedData.discussions) {
        exportData.discussions = activity.discussions || [];
      }
      if (selectedData.resources) {
        exportData.resources = activity.resources || [];
      }
      if (selectedData.events) {
        exportData.events = activity.events || [];
      }
      if (selectedData.challenges) {
        exportData.challenges = activity.challenges || [];
      }
      if (selectedData.participants) {
        exportData.participants = activity.participants?.map(p => ({
          ...p,
          // Exclude sensitive data
          email: undefined,
          personalInfo: undefined
        })) || [];
      }
      if (selectedData.feedback) {
        exportData.feedback = activity.feedback || [];
      }
      if (selectedData.analytics) {
        exportData.analytics = {
          engagementRate: calculateEngagementRate(),
          participationTrend: getParticipationTrend(),
          activityBreakdown: getActivityBreakdown()
        };
      }

      // Add metadata
      exportData.metadata = {
        exportedAt: new Date().toISOString(),
        activityId: activity.id,
        activityName: activity.name,
        exportFormat
      };

      // Generate export file
      const exportContent = formatExportData(exportData);
      downloadExport(exportContent);
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateEngagementRate = () => {
    if (!activity.participants?.length) return 0;
    const activeParticipants = activity.participants.filter(p => 
      new Date(p.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    return Math.round((activeParticipants / activity.participants.length) * 100);
  };

  const getParticipationTrend = () => {
    const now = Date.now();
    const days = 30; // Last 30 days
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

  const getActivityBreakdown = () => {
    return {
      discussions: activity.discussions?.length || 0,
      resources: activity.resources?.length || 0,
      events: activity.events?.length || 0,
      challenges: activity.challenges?.length || 0
    };
  };

  const formatExportData = (data) => {
    switch (exportFormat) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return convertToCSV(data);
      case 'markdown':
        return convertToMarkdown(data);
      default:
        return JSON.stringify(data);
    }
  };

  const convertToCSV = (data) => {
    // Implement CSV conversion logic
    // This is a simplified version
    const rows = [];
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          rows.push([key, ...Object.values(item)].join(','));
        });
      } else {
        rows.push([key, JSON.stringify(value)].join(','));
      }
    });
    return rows.join('\n');
  };

  const convertToMarkdown = (data) => {
    // Implement Markdown conversion logic
    // This is a simplified version
    const sections = [];
    Object.entries(data).forEach(([key, value]) => {
      sections.push(`## ${key}`);
      sections.push('');
      sections.push('```json');
      sections.push(JSON.stringify(value, null, 2));
      sections.push('```');
      sections.push('');
    });
    return sections.join('\n');
  };

  const downloadExport = (content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-export-${activity.id}-${new Date().toISOString()}.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="activity-export">
      <div className="export-header">
        <h2>Export Activity Data</h2>
      </div>

      <form onSubmit={handleExport} className="export-form">
        <div className="form-section">
          <h3>Export Format</h3>
          <div className="format-options">
            <label className="format-option">
              <input
                type="radio"
                value="json"
                checked={exportFormat === 'json'}
                onChange={e => setExportFormat(e.target.value)}
              />
              <div className="format-content">
                <span className="format-name">JSON</span>
                <span className="format-description">Structured data format, best for technical use</span>
              </div>
            </label>

            <label className="format-option">
              <input
                type="radio"
                value="csv"
                checked={exportFormat === 'csv'}
                onChange={e => setExportFormat(e.target.value)}
              />
              <div className="format-content">
                <span className="format-name">CSV</span>
                <span className="format-description">Spreadsheet format, best for data analysis</span>
              </div>
            </label>

            <label className="format-option">
              <input
                type="radio"
                value="markdown"
                checked={exportFormat === 'markdown'}
                onChange={e => setExportFormat(e.target.value)}
              />
              <div className="format-content">
                <span className="format-name">Markdown</span>
                <span className="format-description">Text format, best for documentation</span>
              </div>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Data Selection</h3>
          <div className="data-options">
            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.discussions}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  discussions: e.target.checked
                }))}
              />
              <span>Discussions</span>
            </label>

            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.resources}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  resources: e.target.checked
                }))}
              />
              <span>Resources</span>
            </label>

            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.events}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  events: e.target.checked
                }))}
              />
              <span>Events</span>
            </label>

            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.challenges}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  challenges: e.target.checked
                }))}
              />
              <span>Challenges</span>
            </label>

            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.participants}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  participants: e.target.checked
                }))}
              />
              <span>Participants</span>
            </label>

            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.feedback}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  feedback: e.target.checked
                }))}
              />
              <span>Feedback</span>
            </label>

            <label className="data-option">
              <input
                type="checkbox"
                checked={selectedData.analytics}
                onChange={e => setSelectedData(prev => ({
                  ...prev,
                  analytics: e.target.checked
                }))}
              />
              <span>Analytics</span>
            </label>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Export Data
          </button>
        </div>
      </form>

      <div className="export-info">
        <div className="info-section">
          <h3>Export Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Format</span>
              <span className="info-value">{exportFormat.toUpperCase()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Selected Data</span>
              <span className="info-value">
                {Object.entries(selectedData)
                  .filter(([_, selected]) => selected)
                  .map(([key]) => key)
                  .join(', ')}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Size</span>
              <span className="info-value">
                {Object.entries(selectedData)
                  .filter(([_, selected]) => selected)
                  .reduce((sum, [key]) => sum + (activity[key]?.length || 0), 0)} items
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityExport;
