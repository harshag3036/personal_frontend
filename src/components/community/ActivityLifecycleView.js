import React, { useState, useEffect } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import MilestoneDependencyView from './MilestoneDependencyView';
import './ActivityLifecycleView.css';

/**
 * ActivityLifecycleView Component
 * 
 * This component provides an enhanced visualization of activity lifecycle with:
 * - Timeline visualization of activity progress
 * - Status transition visualization
 * - Milestone dependencies visualization
 * - Enhanced progress metrics
 */
const ActivityLifecycleView = ({ activity }) => {
  const { updateStatus, updateActivity } = useActivity();
  const [showStatusTransitions, setShowStatusTransitions] = useState(false);
  const [showMilestoneDependencies, setShowMilestoneDependencies] = useState(false);
  const [predictedCompletionDate, setPredictedCompletionDate] = useState(null);
  const [criticalPath, setCriticalPath] = useState([]);
  const [timelineView, setTimelineView] = useState('actual'); // 'actual', 'expected', 'comparison'

  // Status definitions with allowed transitions
  const statusDefinitions = {
    'not-started': {
      label: 'Not Started',
      description: 'Activity has been created but work has not begun',
      color: '#6c757d',
      allowedTransitions: ['in-progress', 'cancelled']
    },
    'in-progress': {
      label: 'In Progress',
      description: 'Work on the activity is currently underway',
      color: '#007bff',
      allowedTransitions: ['completed', 'on-hold', 'cancelled']
    },
    'on-hold': {
      label: 'On Hold',
      description: 'Activity is temporarily paused',
      color: '#ffc107',
      allowedTransitions: ['in-progress', 'cancelled']
    },
    'completed': {
      label: 'Completed',
      description: 'All work on the activity has been finished',
      color: '#28a745',
      allowedTransitions: ['in-progress'] // Can reopen if needed
    },
    'cancelled': {
      label: 'Cancelled',
      description: 'Activity has been cancelled and will not be completed',
      color: '#dc3545',
      allowedTransitions: ['in-progress'] // Can reopen if needed
    }
  };

  useEffect(() => {
    if (activity?.progress?.milestones) {
      // Calculate predicted completion date based on current progress
      calculatePredictedCompletionDate();
      
      // Identify critical path through milestones
      identifyCriticalPath();
    }
  }, [activity]);

  const calculatePredictedCompletionDate = () => {
    if (!activity?.progress?.milestones || activity.progress.milestones.length === 0) {
      setPredictedCompletionDate(null);
      return;
    }

    const milestones = activity.progress.milestones;
    const completedMilestones = milestones.filter(m => m.completed);
    
    // If no milestones are completed, can't predict
    if (completedMilestones.length === 0) {
      setPredictedCompletionDate(null);
      return;
    }
    
    // If all milestones are completed, use the last completion date
    if (completedMilestones.length === milestones.length) {
      const lastCompletedDate = new Date(
        Math.max(...completedMilestones.map(m => new Date(m.completedAt).getTime()))
      );
      setPredictedCompletionDate(lastCompletedDate);
      return;
    }
    
    // Calculate average time between milestone completions
    const completionDates = completedMilestones
      .map(m => new Date(m.completedAt).getTime())
      .sort((a, b) => a - b);
    
    const firstCompletionDate = completionDates[0];
    const lastCompletionDate = completionDates[completionDates.length - 1];
    
    // Calculate average days per milestone
    const daysElapsed = (lastCompletionDate - firstCompletionDate) / (1000 * 60 * 60 * 24);
    const avgDaysPerMilestone = daysElapsed / (completedMilestones.length - 1) || 7; // Default to 7 days if can't calculate
    
    // Calculate remaining milestones
    const remainingMilestones = milestones.length - completedMilestones.length;
    
    // Predict completion date
    const predictedDate = new Date(lastCompletionDate);
    predictedDate.setDate(predictedDate.getDate() + (avgDaysPerMilestone * remainingMilestones));
    
    setPredictedCompletionDate(predictedDate);
  };

  // Calculate critical path based on milestone dependencies
  const identifyCriticalPath = () => {
    if (!activity?.progress?.milestones || activity.progress.milestones.length === 0) {
      setCriticalPath([]);
      return;
    }
    
    const milestones = activity.progress.milestones;
    
    // Create a dependency graph
    const graph = {};
    milestones.forEach(milestone => {
      // Initialize each milestone in the graph
      graph[milestone.id] = {
        id: milestone.id,
        title: milestone.title,
        completed: milestone.completed,
        dependencies: milestone.dependencies || [],
        dependents: [],
        earliestStart: 0,
        earliestFinish: 1, // Assume each milestone takes 1 time unit
        latestStart: 0,
        latestFinish: 0,
        slack: 0
      };
    });
    
    // Add dependents (reverse dependencies)
    milestones.forEach(milestone => {
      const dependencies = milestone.dependencies || [];
      dependencies.forEach(depId => {
        if (graph[depId]) {
          graph[depId].dependents.push(milestone.id);
        }
      });
    });
    
    // If no explicit dependencies exist, create implicit ones based on order
    let hasExplicitDependencies = false;
    milestones.forEach(milestone => {
      if (milestone.dependencies && milestone.dependencies.length > 0) {
        hasExplicitDependencies = true;
      }
    });
    
    if (!hasExplicitDependencies) {
      // Create implicit dependencies (each milestone depends on the previous one)
      for (let i = 1; i < milestones.length; i++) {
        const currentId = milestones[i].id;
        const previousId = milestones[i-1].id;
        
        graph[currentId].dependencies.push(previousId);
        graph[previousId].dependents.push(currentId);
      }
    }
    
    // Find start nodes (no dependencies) and end nodes (no dependents)
    const startNodes = Object.values(graph).filter(node => node.dependencies.length === 0);
    const endNodes = Object.values(graph).filter(node => node.dependents.length === 0);
    
    // Forward pass - calculate earliest start/finish times
    const calculateEarliestTimes = (nodeId, visited = new Set()) => {
      if (visited.has(nodeId)) return graph[nodeId].earliestFinish;
      visited.add(nodeId);
      
      const node = graph[nodeId];
      
      if (node.dependencies.length === 0) {
        node.earliestStart = 0;
        node.earliestFinish = 1;
      } else {
        // Node's earliest start is the maximum of all dependencies' earliest finish
        node.earliestStart = Math.max(
          ...node.dependencies.map(depId => calculateEarliestTimes(depId, visited))
        );
        node.earliestFinish = node.earliestStart + 1;
      }
      
      return node.earliestFinish;
    };
    
    // Calculate earliest times for all nodes
    startNodes.forEach(node => calculateEarliestTimes(node.id));
    
    // Find the project duration (maximum earliest finish of any end node)
    const projectDuration = Math.max(...endNodes.map(node => node.earliestFinish));
    
    // Backward pass - calculate latest start/finish times
    const calculateLatestTimes = (nodeId, visited = new Set()) => {
      if (visited.has(nodeId)) return graph[nodeId].latestStart;
      visited.add(nodeId);
      
      const node = graph[nodeId];
      
      if (node.dependents.length === 0) {
        node.latestFinish = projectDuration;
        node.latestStart = node.latestFinish - 1;
      } else {
        // Node's latest finish is the minimum of all dependents' latest start
        node.latestFinish = Math.min(
          ...node.dependents.map(depId => calculateLatestTimes(depId, visited))
        );
        node.latestStart = node.latestFinish - 1;
      }
      
      // Calculate slack
      node.slack = node.latestStart - node.earliestStart;
      
      return node.latestStart;
    };
    
    // Calculate latest times for all nodes
    endNodes.forEach(node => calculateLatestTimes(node.id));
    
    // Critical path consists of all nodes with zero slack
    const criticalPathNodes = Object.values(graph).filter(node => node.slack === 0);
    setCriticalPath(criticalPathNodes.map(node => node.id));
  };

  const renderStatusTransitions = () => {
    const currentStatus = activity?.progress?.status || 'not-started';
    
    return (
      <div className="status-transitions">
        <h4>Activity Status Flow</h4>
        <p className="section-explainer">
          This diagram shows how an activity can move between different statuses. Your current status is highlighted.
        </p>
        
        <div className="status-flow-diagram">
          {Object.keys(statusDefinitions).map(status => (
            <div 
              key={status} 
              className={`status-node ${status === currentStatus ? 'current' : ''}`}
              style={{ backgroundColor: statusDefinitions[status].color }}
            >
              <div className="status-label">{statusDefinitions[status].label}</div>
              
              {/* Render transition arrows */}
              {statusDefinitions[status].allowedTransitions.map(targetStatus => (
                <div 
                  key={`${status}-${targetStatus}`} 
                  className={`transition-arrow to-${targetStatus} ${
                    currentStatus === status ? 'from-current' : ''
                  }`}
                >
                  <div className="arrow-line" style={{ borderColor: statusDefinitions[targetStatus].color }}></div>
                  <div className="arrow-head" style={{ borderLeftColor: statusDefinitions[targetStatus].color }}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="status-description">
          <div className="current-status-box" style={{ borderLeftColor: statusDefinitions[currentStatus].color }}>
            <h5>Current Status: {statusDefinitions[currentStatus].label}</h5>
            <p>{statusDefinitions[currentStatus].description}</p>
          </div>
          
          <h5>Where to go next:</h5>
          <ul className="next-steps">
            {statusDefinitions[currentStatus].allowedTransitions.map(nextStatus => (
              <li key={nextStatus}>
                <span 
                  className="status-dot" 
                  style={{ backgroundColor: statusDefinitions[nextStatus].color }}
                ></span>
                <span className="next-status-label">{statusDefinitions[nextStatus].label}</span>
                <span className="next-status-description">: {statusDefinitions[nextStatus].description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    if (!activity?.progress?.statusHistory || activity.progress.statusHistory.length === 0) {
      return (
        <div className="no-history">
          <p>No status history available.</p>
        </div>
      );
    }
    
    // Create a combined timeline of status changes and milestone completions
    const statusEvents = activity.progress.statusHistory.map(status => ({
      type: 'status',
      status: status.status,
      date: new Date(status.timestamp),
      reason: status.reason
    }));
    
    const milestoneEvents = (activity.progress.milestones || [])
      .filter(m => m.completed && m.completedAt)
      .map(milestone => ({
        type: 'milestone',
        title: milestone.title,
        date: new Date(milestone.completedAt),
        reason: milestone.reason
      }));
    
    // Combine and sort all events by date
    const allEvents = [...statusEvents, ...milestoneEvents].sort((a, b) => a.date - b.date);
    
    // Add creation event at the beginning
    if (activity.createdAt) {
      allEvents.unshift({
        type: 'creation',
        date: new Date(activity.createdAt),
        reason: 'Activity created'
      });
    }
    
    // Add predicted completion if available
    if (predictedCompletionDate && activity.progress.status !== 'completed' && activity.progress.status !== 'cancelled') {
      allEvents.push({
        type: 'prediction',
        date: predictedCompletionDate,
        reason: 'Predicted completion date'
      });
    }
    
    return (
      <div className="activity-timeline">
        <h4>Activity Timeline</h4>
        <p className="section-explainer">
          This timeline shows the history of status changes and milestone completions for this activity.
        </p>
        
        <div className="timeline-view-controls">
          <div className="view-button-container">
            <button 
              className={`view-button ${timelineView === 'actual' ? 'active' : ''}`}
              onClick={() => setTimelineView('actual')}
              title="View actual timeline events"
            >
              Actual Timeline
            </button>
            <span className="view-button-description">Real events that have occurred</span>
          </div>
          
          <div className="view-button-container">
            <button 
              className={`view-button ${timelineView === 'expected' ? 'active' : ''}`}
              onClick={() => setTimelineView('expected')}
              title="View expected timeline events"
            >
              Expected Timeline
            </button>
            <span className="view-button-description">Planned future events</span>
          </div>
          
          <div className="view-button-container">
            <button 
              className={`view-button ${timelineView === 'comparison' ? 'active' : ''}`}
              onClick={() => setTimelineView('comparison')}
              title="Compare actual vs expected timelines"
            >
              Comparison View
            </button>
            <span className="view-button-description">Actual vs. expected</span>
          </div>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {allEvents.map((event, index) => (
            <div 
              key={index} 
              className={`timeline-event ${event.type} ${
                event.type === 'status' ? event.status : ''
              }`}
            >
              <div className="event-date">
                {event.date.toLocaleDateString()}
              </div>
              <div className="event-marker"></div>
              <div className="event-details">
                {event.type === 'status' && (
                  <div className="event-title">
                    Status changed to: <span className="status-name">{statusDefinitions[event.status]?.label || event.status}</span>
                  </div>
                )}
                {event.type === 'milestone' && (
                  <div className="event-title">
                    Milestone completed: <span className="milestone-name">{event.title}</span>
                  </div>
                )}
                {event.type === 'creation' && (
                  <div className="event-title">Activity Created</div>
                )}
                {event.type === 'prediction' && (
                  <div className="event-title">Predicted Completion</div>
                )}
                {event.reason && <div className="event-reason">{event.reason}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProgressMetrics = () => {
    if (!activity?.progress?.milestones || activity.progress.milestones.length === 0) {
      return (
        <div className="no-metrics">
          <p>No milestones available for metrics.</p>
        </div>
      );
    }
    
    const milestones = activity.progress.milestones;
    const completedCount = milestones.filter(m => m.completed).length;
    const totalCount = milestones.length;
    const completionPercentage = Math.round((completedCount / totalCount) * 100);
    
    // Calculate days active
    const creationDate = new Date(activity.createdAt);
    const today = new Date();
    const daysActive = Math.round((today - creationDate) / (1000 * 60 * 60 * 24));
    
    // Calculate average completion rate
    const completionRate = daysActive > 0 ? (completedCount / daysActive).toFixed(2) : 0;
    
    // Calculate remaining days (if not completed)
    const remainingMilestones = totalCount - completedCount;
    const estimatedRemainingDays = completionRate > 0 
      ? Math.round(remainingMilestones / completionRate)
      : '?';
    
    return (
      <div className="progress-metrics">
        <h4>Progress Metrics</h4>
        <p className="section-explainer">
          These metrics show the activity's progress and help predict when it will be completed.
        </p>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{completionPercentage}%</div>
            <div className="metric-label">Overall Completion</div>
            <div className="metric-detail">{completedCount} of {totalCount} milestones</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{daysActive}</div>
            <div className="metric-label">Days Running</div>
            <div className="metric-detail">Since {creationDate.toLocaleDateString()}</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{completionRate}</div>
            <div className="metric-label">Completion Speed</div>
            <div className="metric-detail">Milestones completed per day</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">
              {activity.progress.status === 'completed' ? 'Complete' : 
               activity.progress.status === 'cancelled' ? 'Cancelled' :
               estimatedRemainingDays}
            </div>
            <div className="metric-label">
              {activity.progress.status === 'completed' ? '' : 
               activity.progress.status === 'cancelled' ? '' :
               'Estimated Days Left'}
            </div>
            <div className="metric-detail">
              {activity.progress.status === 'completed' ? 'All milestones completed' : 
               activity.progress.status === 'cancelled' ? 'Activity was cancelled' :
               predictedCompletionDate ? `Target date: ${predictedCompletionDate.toLocaleDateString()}` : 'Based on current speed'}
            </div>
          </div>
        </div>
        
        {/* Enhanced Milestone Progress Chart */}
        <div className="burndown-chart">
          <h5>Activity Progress Visualization</h5>
          <p className="chart-explainer">
            This chart visualizes your progress toward activity completion. It shows how effectively you're completing milestones compared to the planned timeline.
          </p>
          <div className="chart-placeholder">
            <div className="chart-grid">
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
            </div>
            {/* Progress line showing remaining work */}
            <div className="progress-line">
              {/* Start point */}
              <div className="progress-point start" title="Start: 0% complete"></div>
              
              {/* Current progress point */}
              <div 
                className="progress-point current" 
                style={{ left: `${daysActive / (daysActive + estimatedRemainingDays) * 100}%`, top: `${100 - completionPercentage}%` }}
                title={`Current: ${completionPercentage}% complete`}
              ></div>
              
              {/* Projected completion point */}
              <div 
                className="progress-point projected" 
                style={{ left: '100%', top: '0%' }}
                title="Projected: 100% complete"
              ></div>
              
              {/* Line from start to current */}
              <div 
                className="progress-segment past" 
                style={{ 
                  width: `${daysActive / (daysActive + estimatedRemainingDays) * 100}%`,
                  transform: `rotate(${Math.atan2(completionPercentage, daysActive / (daysActive + estimatedRemainingDays) * 100) * (180 / Math.PI)}deg)`
                }}
              ></div>
              
              {/* Line from current to projected */}
              <div 
                className="progress-segment future" 
                style={{ 
                  left: `${daysActive / (daysActive + estimatedRemainingDays) * 100}%`,
                  width: `${100 - (daysActive / (daysActive + estimatedRemainingDays) * 100)}%`,
                  transform: `rotate(${Math.atan2(100 - completionPercentage, 100 - (daysActive / (daysActive + estimatedRemainingDays) * 100)) * (180 / Math.PI)}deg)`
                }}
              ></div>
            </div>
            
            <div className="ideal-line"></div>
            <div className="chart-axis-labels">
              <div className="chart-y-axis">
                <span className="y-label">All Tasks</span>
                <span className="y-label">75%</span>
                <span className="y-label">Half Done</span>
                <span className="y-label">25%</span>
                <span className="y-label">Completed</span>
              </div>
              <div className="chart-x-axis">
                <span className="x-label">{new Date(activity.createdAt).toLocaleDateString()}</span>
                <span className="x-label">Today</span>
                <span className="x-label">
                  {predictedCompletionDate ? predictedCompletionDate.toLocaleDateString() : 'Target'}
                </span>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color past"></span>
                <span className="legend-text">Completed Work</span>
              </div>
              <div className="legend-item">
                <span className="legend-color future"></span>
                <span className="legend-text">Projected Remaining Work</span>
              </div>
              <div className="legend-item">
                <span className="legend-color ideal"></span>
                <span className="legend-text">Optimal Progress Path</span>
              </div>
            </div>
            
            {/* Progress Indicators */}
            <div className="progress-indicators">
              {completionPercentage < 30 && (
                <div className="progress-indicator early">Just getting started</div>
              )}
              {completionPercentage >= 30 && completionPercentage < 70 && (
                <div className="progress-indicator mid">Making good progress</div>
              )}
              {completionPercentage >= 70 && completionPercentage < 100 && (
                <div className="progress-indicator late">Almost there!</div>
              )}
              {completionPercentage === 100 && (
                <div className="progress-indicator complete">All milestones completed!</div>
              )}
            </div>
          </div>
          
          {/* Progress Insights */}
          <div className="progress-insights">
            <h6>What This Means For You:</h6>
            <ul className="insights-list">
              <li>
                <strong>Completion Rate:</strong> You're completing {completionRate} milestones per day
              </li>
              <li>
                <strong>Remaining Work:</strong> {totalCount - completedCount} milestones left to complete
              </li>
              {estimatedRemainingDays !== '?' && (
                <li>
                  <strong>Estimated Completion:</strong> At your current pace, you'll finish in approximately {estimatedRemainingDays} days
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="activity-lifecycle-view">
      <div className="lifecycle-header">
        <h3>Activity Lifecycle</h3>
        <div className="header-subtitle">Visualize the progress and status of this activity</div>
      </div>
      
      <div className="view-sections">
        <div className="section-toggles">
          <div className="toggle-container">
            <button 
              className={`toggle-button ${showStatusTransitions ? 'active' : ''}`}
              onClick={() => setShowStatusTransitions(!showStatusTransitions)}
              title="View the possible status transitions for this activity"
            >
              {showStatusTransitions ? 'Hide Status Flow' : 'Show Status Flow'}
            </button>
            <span className="toggle-hint">See how statuses can change</span>
          </div>
          
          <div className="toggle-container">
            <button 
              className={`toggle-button ${showMilestoneDependencies ? 'active' : ''}`}
              onClick={() => setShowMilestoneDependencies(!showMilestoneDependencies)}
              title="View how milestones depend on each other"
            >
              {showMilestoneDependencies ? 'Hide Dependencies' : 'Show Dependencies'}
            </button>
            <span className="toggle-hint">See milestone relationships</span>
          </div>
        </div>
        
        {/* Timeline visualization */}
        {renderTimeline()}
        
        {/* Progress metrics */}
        {renderProgressMetrics()}
        
        {/* Status transitions visualization */}
        {showStatusTransitions && renderStatusTransitions()}
        
        {/* Milestone dependencies visualization */}
        {showMilestoneDependencies && <MilestoneDependencyView activity={activity} criticalPath={criticalPath} onUpdateActivity={updateActivity} />}
      </div>
    </div>
  );
};

export default ActivityLifecycleView;
