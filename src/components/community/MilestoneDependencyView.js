import React, { useState, useEffect, useRef } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import './MilestoneDependencyView.css';

/**
 * MilestoneDependencyView Component
 * 
 * This component provides an interactive visualization of milestone dependencies and critical path.
 */
const MilestoneDependencyView = ({ activity, criticalPath, onUpdateActivity }) => {
  const { updateActivity } = useActivity();
  const [viewType, setViewType] = useState('network'); // 'network' or 'timeline'
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [dependencyMode, setDependencyMode] = useState(false);
  const [sourceMilestone, setSourceMilestone] = useState(null);
  const [showMilestoneDetails, setShowMilestoneDetails] = useState(false);
  const networkRef = useRef(null);
  
  // Calculate dependency arrow positions
  useEffect(() => {
    if (!activity?.progress?.milestones || activity.progress.milestones.length === 0) {
      return;
    }
    
    if (networkRef.current && viewType === 'network') {
      const container = networkRef.current;
      const arrows = container.querySelectorAll('.dependency-arrow');
      const nodes = container.querySelectorAll('.milestone-node');
      
      // Create a map of node positions
      const nodePositions = {};
      nodes.forEach(node => {
        const id = node.getAttribute('data-id');
        const rect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        nodePositions[id] = {
          left: rect.left - containerRect.left + rect.width / 2,
          top: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        };
      });
      
      // Position each arrow
      arrows.forEach(arrow => {
        const fromId = arrow.getAttribute('data-from');
        const toId = arrow.getAttribute('data-to');
        
        if (nodePositions[fromId] && nodePositions[toId]) {
          const from = nodePositions[fromId];
          const to = nodePositions[toId];
          
          // Calculate the angle between the nodes
          const dx = to.left - from.left;
          const dy = to.top - from.top;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          // Calculate the distance between the nodes
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Position and rotate the arrow
          arrow.style.width = `${distance}px`;
          arrow.style.transform = `rotate(${angle}deg)`;
          arrow.style.left = `${from.left}px`;
          arrow.style.top = `${from.top}px`;
        }
      });
    }
  }, [viewType, activity]);
  
  if (!activity?.progress?.milestones || activity.progress.milestones.length === 0) {
    return (
      <div className="no-milestones">
        <p>No milestones have been created yet.</p>
        <button 
          className="create-milestone-button"
          onClick={() => window.location.href = `#milestones-section`}
        >
          Create Milestones
        </button>
      </div>
    );
  }
  
  const milestones = activity.progress.milestones;
  
  // Create a map of dependencies for easier lookup
  const dependencyMap = {};
  milestones.forEach(milestone => {
    const dependencies = milestone.dependencies || [];
    dependencyMap[milestone.id] = dependencies;
  });
  
  // Check if we have explicit dependencies
  const hasExplicitDependencies = milestones.some(
    milestone => milestone.dependencies && milestone.dependencies.length > 0
  );

  // Handle milestone click
  const handleMilestoneClick = (milestone) => {
    if (dependencyMode) {
      if (sourceMilestone) {
        // Creating a dependency
        if (sourceMilestone.id !== milestone.id) {
          handleAddDependency(sourceMilestone.id, milestone.id);
        }
        setSourceMilestone(null);
        setDependencyMode(false);
      } else {
        // Starting a dependency creation
        setSourceMilestone(milestone);
      }
    } else {
      // Regular click - show details
      setSelectedMilestone(milestone);
      setShowMilestoneDetails(true);
    }
  };

  // Handle adding a dependency between milestones
  const handleAddDependency = (sourceId, targetId) => {
    // Check if this would create a circular dependency
    if (wouldCreateCircularDependency(sourceId, targetId)) {
      alert("Cannot create circular dependencies");
      return;
    }

    const updatedMilestones = milestones.map(milestone => {
      if (milestone.id === targetId) {
        const dependencies = [...(milestone.dependencies || [])];
        if (!dependencies.includes(sourceId)) {
          dependencies.push(sourceId);
        }
        return { ...milestone, dependencies };
      }
      return milestone;
    });

    const updatedActivity = {
      ...activity,
      progress: {
        ...activity.progress,
        milestones: updatedMilestones
      }
    };

    if (onUpdateActivity) {
      onUpdateActivity(updatedActivity);
    } else if (updateActivity) {
      updateActivity(updatedActivity);
    }
  };

  // Handle removing a dependency
  const handleRemoveDependency = (sourceId, targetId) => {
    const updatedMilestones = milestones.map(milestone => {
      if (milestone.id === targetId) {
        const dependencies = (milestone.dependencies || []).filter(id => id !== sourceId);
        return { ...milestone, dependencies };
      }
      return milestone;
    });

    const updatedActivity = {
      ...activity,
      progress: {
        ...activity.progress,
        milestones: updatedMilestones
      }
    };

    if (onUpdateActivity) {
      onUpdateActivity(updatedActivity);
    } else if (updateActivity) {
      updateActivity(updatedActivity);
    }
  };

  // Check if adding a dependency would create a circular reference
  const wouldCreateCircularDependency = (sourceId, targetId) => {
    // If target already depends on source (directly or indirectly), it would create a cycle
    const visited = new Set();
    
    const checkDependencies = (currentId) => {
      if (currentId === sourceId) return true; // Found a cycle
      if (visited.has(currentId)) return false; // Already checked
      
      visited.add(currentId);
      
      const dependencies = dependencyMap[currentId] || [];
      return dependencies.some(depId => checkDependencies(depId));
    };
    
    return checkDependencies(targetId);
  };

  return (
    <div className="milestone-dependencies">
      <div className="dependency-header">
        <h4>Milestone Dependencies</h4>
        <div className="dependency-actions">
          <button 
            className={`edit-mode-button ${editMode ? 'active' : ''}`}
            onClick={() => {
              setEditMode(!editMode);
              setDependencyMode(false);
              setSourceMilestone(null);
            }}
            title="Toggle edit mode"
          >
            {editMode ? 'Exit Edit Mode' : 'Edit Dependencies'}
          </button>
          {editMode && (
            <button 
              className={`dependency-mode-button ${dependencyMode ? 'active' : ''}`}
              onClick={() => {
                setDependencyMode(!dependencyMode);
                setSourceMilestone(null);
              }}
              title="Create new dependencies"
            >
              {dependencyMode ? 'Cancel' : 'Add Dependency'}
            </button>
          )}
        </div>
      </div>
      
      <p className="section-explainer">
        This diagram shows how milestones depend on each other. Critical path items (highlighted in red) are essential for completion.
        {editMode && ' Click on milestones to edit dependencies.'}
        {dependencyMode && ' Click on a source milestone, then a target milestone to create a dependency.'}
      </p>
      
      <div className="dependency-view-controls">
        <div className="view-type-toggle">
          <button 
            className={`view-type-button ${viewType === 'network' ? 'active' : ''}`}
            onClick={() => setViewType('network')}
            title="View as network diagram"
          >
            Network View
          </button>
          <button 
            className={`view-type-button ${viewType === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewType('timeline')}
            title="View as Gantt chart"
          >
            Timeline View
          </button>
        </div>
      </div>
      
      {viewType === 'network' && (
        <div className="network-diagram" ref={networkRef}>
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.id} 
              className={`milestone-node ${milestone.completed ? 'completed' : ''} ${
                criticalPath.includes(milestone.id) ? 'critical' : ''
              } ${sourceMilestone?.id === milestone.id ? 'source' : ''} ${
                selectedMilestone?.id === milestone.id ? 'selected' : ''
              }`}
              style={{
                // Position nodes in a more network-like layout
                left: `${(index % 3) * 33}%`,
                top: `${Math.floor(index / 3) * 120}px`
              }}
              data-id={milestone.id}
              onClick={() => handleMilestoneClick(milestone)}
            >
              <div className="milestone-number">{index + 1}</div>
              <div className="milestone-title">{milestone.title}</div>
              <div className="milestone-status">
                {milestone.completed ? 'Completed' : 'In Progress'}
              </div>
              
              {/* Draw dependency arrows */}
              {hasExplicitDependencies ? (
                // Draw explicit dependencies
                (milestone.dependencies || []).map(depId => {
                  const depIndex = milestones.findIndex(m => m.id === depId);
                  if (depIndex === -1) return null;
                  
                  return (
                    <div 
                      key={`${milestone.id}-${depId}`}
                      className={`dependency-arrow ${
                        criticalPath.includes(milestone.id) && 
                        criticalPath.includes(depId) 
                          ? 'critical' 
                          : ''
                      }`}
                      data-from={depId}
                      data-to={milestone.id}
                    >
                      {editMode && (
                        <button 
                          className="remove-dependency-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveDependency(depId, milestone.id);
                          }}
                          title="Remove dependency"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                // Draw implicit dependencies (to previous milestone)
                index > 0 && (
                  <div 
                    className={`dependency-arrow ${
                      criticalPath.includes(milestone.id) && 
                      criticalPath.includes(milestones[index - 1].id) 
                        ? 'critical' 
                        : ''
                    }`}
                    data-from={milestones[index - 1].id}
                    data-to={milestone.id}
                  ></div>
                )
              )}
            </div>
          ))}
        </div>
      )}
      
      {viewType === 'timeline' && (
        <div className="timeline-diagram">
          <p className="coming-soon">Timeline view is coming soon!</p>
        </div>
      )}
      
      {/* Milestone details modal */}
      {showMilestoneDetails && selectedMilestone && (
        <div className="milestone-details-modal">
          <div className="milestone-details-content">
            <button 
              className="close-details-button"
              onClick={() => {
                setShowMilestoneDetails(false);
                setSelectedMilestone(null);
              }}
            >
              ×
            </button>
            <h3>{selectedMilestone.title}</h3>
            
            <div className="milestone-detail-section">
              <h4>Status</h4>
              <p>{selectedMilestone.completed ? 'Completed' : 'In Progress'}</p>
              {selectedMilestone.completed && selectedMilestone.completedAt && (
                <p>Completed on: {new Date(selectedMilestone.completedAt).toLocaleDateString()}</p>
              )}
            </div>
            
            <div className="milestone-detail-section">
              <h4>Dependencies</h4>
              {(selectedMilestone.dependencies || []).length > 0 ? (
                <ul className="dependency-list">
                  {selectedMilestone.dependencies.map(depId => {
                    const dep = milestones.find(m => m.id === depId);
                    return dep ? (
                      <li key={depId} className={dep.completed ? 'completed' : ''}>
                        {dep.title} {dep.completed ? '(Completed)' : '(In Progress)'}
                        {editMode && (
                          <button 
                            className="remove-dependency-button"
                            onClick={() => handleRemoveDependency(depId, selectedMilestone.id)}
                            title="Remove dependency"
                          >
                            Remove
                          </button>
                        )}
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p>No dependencies</p>
              )}
              
              {editMode && (
                <div className="add-dependency-section">
                  <h5>Add Dependency</h5>
                  <div className="dependency-options">
                    {milestones
                      .filter(m => m.id !== selectedMilestone.id && 
                                  !(selectedMilestone.dependencies || []).includes(m.id) &&
                                  !wouldCreateCircularDependency(m.id, selectedMilestone.id))
                      .map(m => (
                        <button 
                          key={m.id}
                          className="add-dependency-option"
                          onClick={() => handleAddDependency(m.id, selectedMilestone.id)}
                        >
                          {m.title}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="milestone-detail-section">
              <h4>Dependents</h4>
              {milestones.some(m => (m.dependencies || []).includes(selectedMilestone.id)) ? (
                <ul className="dependents-list">
                  {milestones
                    .filter(m => (m.dependencies || []).includes(selectedMilestone.id))
                    .map(m => (
                      <li key={m.id} className={m.completed ? 'completed' : ''}>
                        {m.title} {m.completed ? '(Completed)' : '(In Progress)'}
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No dependents</p>
              )}
            </div>
            
            {criticalPath.includes(selectedMilestone.id) && (
              <div className="milestone-detail-section critical-path-info">
                <h4>Critical Path</h4>
                <p>This milestone is on the critical path. Any delay will impact the overall activity completion.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="dependency-metrics">
        <div className="metric-card">
          <div className="metric-value">{milestones.length}</div>
          <div className="metric-label">Total Milestones</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{criticalPath.length}</div>
          <div className="metric-label">Critical Path Length</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">
            {milestones.filter(m => m.completed).length}
          </div>
          <div className="metric-label">Completed</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">
            {criticalPath.filter(id => 
              milestones.find(m => m.id === id)?.completed
            ).length}
          </div>
          <div className="metric-label">Critical Path Progress</div>
        </div>
      </div>
      
      <div className="critical-path-legend">
        <div className="legend-item">
          <div className="legend-marker critical"></div>
          <div className="legend-label">Critical Path</div>
        </div>
        <div className="legend-item">
          <div className="legend-marker completed"></div>
          <div className="legend-label">Completed</div>
        </div>
        <div className="legend-item">
          <div className="legend-marker"></div>
          <div className="legend-label">In Progress</div>
        </div>
        {editMode && dependencyMode && (
          <div className="legend-item">
            <div className="legend-marker source"></div>
            <div className="legend-label">Source Milestone</div>
          </div>
        )}
      </div>
      
      <div className="dependency-explanation">
        <h5>Understanding the Critical Path</h5>
        <p>
          The critical path is the sequence of milestones that determines the minimum time needed to complete the activity. 
          Any delay in critical path milestones will delay the entire activity.
        </p>
        <h5>Milestone Dependencies</h5>
        <p>
          Each milestone may depend on the completion of other milestones before it can begin. 
          These dependencies are shown as arrows connecting the milestones.
        </p>
        {editMode && (
          <>
            <h5>Editing Dependencies</h5>
            <p>
              In edit mode, you can add or remove dependencies between milestones. 
              Click on a milestone to see its details and manage dependencies, or use the "Add Dependency" button to create new connections.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MilestoneDependencyView;
