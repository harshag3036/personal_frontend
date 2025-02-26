import React, { useState } from 'react';
import FileUploader from './FileUploader';
import FilePreview from './FilePreview';
import './MilestoneList.css';

const MilestoneList = ({ 
  activity, 
  progress, 
  handleToggleMilestone, 
  handleFileUpload, 
  fileState, 
  isUpdating, 
  showMilestoneReason,
  currentMilestone,
  milestoneReason,
  setMilestoneReason,
  confirmMilestoneCompletion,
  cancelMilestoneCompletion
}) => {
  const [expandedMilestones, setExpandedMilestones] = useState({});

  const toggleMilestoneExpansion = (milestoneId) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [milestoneId]: !prev[milestoneId]
    }));
  };

  return (
    <div className="milestones-list">
      {progress?.milestones && progress.milestones.map(milestone => (
        <div 
          key={milestone.id} 
          className={`milestone-item ${milestone.completed ? 'completed' : ''} ${expandedMilestones[milestone.id] ? 'expanded' : ''} ${showMilestoneReason && currentMilestone === milestone.id ? 'completing' : ''}`}
          onClick={() => toggleMilestoneExpansion(milestone.id)}
        >
          <div className="milestone-header">
            <div className="milestone-main">
              <label 
                className="milestone-checkbox"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={(e) => handleToggleMilestone(milestone.id, e.target.checked)}
                  disabled={isUpdating || showMilestoneReason || (!milestone.files || milestone.files.length === 0)}
                  title={(!milestone.files || milestone.files.length === 0) ? "Upload evidence before completing" : ""}
                />
                <span className="milestone-title">{milestone.title}</span>
              </label>
              {milestone.completed && (
                <div className="milestone-completion-info">
                  <div className="completion-header">
                    <span className="completion-date">
                      Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                    </span>
                    <button 
                      className="uncomplete-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleMilestone(milestone.id, false);
                      }}
                      title="Mark as incomplete"
                    >
                      Undo
                    </button>
                  </div>
                  {milestone.reason && (
                    <span className="completion-reason">
                      "{milestone.reason}"
                    </span>
                  )}
                </div>
              )}
            </div>
            <button 
              className="expand-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMilestoneExpansion(milestone.id);
              }}
              aria-label={expandedMilestones[milestone.id] ? "Collapse milestone" : "Expand milestone"}
            >
              {expandedMilestones[milestone.id] ? '−' : '+'}
            </button>
          </div>
          
          {expandedMilestones[milestone.id] && (
            <div className="milestone-files" onClick={(e) => e.stopPropagation()}>
              {/* Only show step 2 if not completed */}
              {!milestone.completed && (
                <div className="milestone-workflow-indicator">
                  <div className="workflow-step-indicator">
                    <div className="step-number">2</div>
                    <h5>Upload Completion Evidence</h5>
                  </div>
                </div>
              )}
              
              <div className="file-upload-section">
                <FileUploader
                  activityId={activity.id}
                  onUpload={(file) => handleFileUpload(file, milestone.id)}
                />
              </div>
              
              {milestone.files && milestone.files.length > 0 && (
                <div className="uploaded-files">
                  <h6>Attached Files <span className="file-count">({milestone.files.length})</span></h6>
                  <div className="files-grid">
                    {milestone.files.map(fileId => {
                      const file = fileState.byId[fileId];
                      return file ? (
                        <div key={fileId} className="file-item">
                          <FilePreview file={file} />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              {/* Completion dialog - now embedded within the milestone */}
              {showMilestoneReason && currentMilestone === milestone.id && (
                <div className="milestone-reason-dialog">
                  <div className="milestone-completion-header">
                    <div className="milestone-workflow-indicator">
                      <div className="workflow-step-indicator">
                        <div className="step-number">3</div>
                        <h5>Complete Milestone</h5>
                      </div>
                    </div>
                    <h5>
                      Completing: {milestone.title}
                    </h5>
                  </div>
                  <p>Add details about this milestone completion:</p>
                  <textarea
                    placeholder="What was accomplished? Any challenges or learnings?"
                    value={milestoneReason}
                    onChange={(e) => setMilestoneReason(e.target.value)}
                    rows={3}
                    autoFocus
                  />
                  <div className="reason-actions">
                    <button 
                      onClick={confirmMilestoneCompletion}
                      disabled={isUpdating}
                      className="confirm-button"
                    >
                      Complete Milestone
                    </button>
                    <button 
                      onClick={cancelMilestoneCompletion}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {/* Button to complete milestone after uploading files - only show if files are uploaded and not completed */}
              {milestone.files && milestone.files.length > 0 && !milestone.completed && !showMilestoneReason && (
                <div className="milestone-completion-actions">
                  <div className="milestone-workflow-indicator">
                    <div className="workflow-step-indicator">
                      <div className="step-number">3</div>
                      <h5>Mark as Complete</h5>
                    </div>
                  </div>
                  <button 
                    className="complete-milestone-button"
                    onClick={() => handleToggleMilestone(milestone.id, true)}
                  >
                    Mark Milestone as Complete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MilestoneList;
