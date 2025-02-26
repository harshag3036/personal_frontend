import React, { useState, useEffect, useMemo } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import StatusOverview from './StatusOverview';
import MilestoneList from './MilestoneList';
import './ProgressTracker.css';

const ProgressTracker = ({ activity }) => {
  const { updateStatus, updateProgress, addMilestone, toggleMilestone, addFile, fileState } = useActivity();
  const [newMilestone, setNewMilestone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusReason, setShowStatusReason] = useState(false);
  const [statusReason, setStatusReason] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [expandedMilestones, setExpandedMilestones] = useState({});
  const [milestoneReason, setMilestoneReason] = useState('');
  const [showMilestoneReason, setShowMilestoneReason] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const [showStatusHistory, setShowStatusHistory] = useState(true);

  const progress = activity?.progress || {
    status: 'not-started',
    milestones: [],
    statusHistory: []
  };
  
  // Calculate suggested status based on milestone completion
  const suggestedStatus = useMemo(() => {
    if (!progress?.milestones || progress.milestones.length === 0) {
      return 'not-started';
    }
    
    const completedCount = progress.milestones.filter(m => m.completed).length;
    const totalCount = progress.milestones.length;
    
    if (completedCount === 0) {
      return 'not-started';
    } else if (completedCount === totalCount) {
      return 'completed';
    } else {
      return 'in-progress';
    }
  }, [progress?.milestones]);
  
  // Update status if it doesn't match suggested status
  useEffect(() => {
    if (progress.status !== suggestedStatus && !showStatusReason && !isUpdating && activity?.id) {
      // Only suggest status change, don't force it
      console.log(`Suggested status change: ${progress.status} → ${suggestedStatus}`);
    }
  }, [suggestedStatus, progress.status, showStatusReason, isUpdating, activity?.id]);

  // State to force re-render when files are uploaded
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Force refresh when activity changes
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [activity]);

  const handleFileUpload = async (file, milestoneId) => {
    try {
      const fileResource = await addFile(activity.id, file);
      
      // Update milestone with file reference
      await updateProgress(activity.id, {
        milestones: progress.milestones.map(m => 
          m.id === milestoneId ? {
            ...m,
            files: [...(m.files || []), fileResource.id]
          } : m
        )
      });
      
      // Force refresh to show the new file
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Store the status we're changing to
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleStatusChange = async (newStatus) => {
    if (isUpdating || newStatus === progress.status) return;
    
    // Store the new status to use when confirming
    setIsUpdating(true);
    try {
      // Store the status we're changing to
      setPendingStatus(newStatus);
      // Show the reason dialog
      setShowStatusReason(true);
      // Clear any previous reason
      setStatusReason(''); 
    } catch (error) {
      console.error('Error preparing status change:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmStatusChange = async () => {
    if (isUpdating || !pendingStatus) return;
    setIsUpdating(true);
    try {
      // Actually update the status with the provided reason
      await updateStatus(activity.id, pendingStatus, statusReason);
      setShowStatusReason(false);
      setStatusReason('');
      setPendingStatus(null);
      
      // Force refresh to show the updated status
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    if (!newMilestone.trim() || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await addMilestone(activity.id, {
        title: newMilestone.trim(),
        description: '',
        files: []
      });
      setNewMilestone('');
      
      // Force refresh to show the new milestone
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error adding milestone:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleMilestone = async (milestoneId, completed) => {
    if (isUpdating) return;
    
    if (completed) {
      // When completing a milestone, show reason input
      setCurrentMilestone(milestoneId);
      setShowMilestoneReason(true);
      setMilestoneReason('');
      
      // Ensure the milestone is expanded to show the completion dialog
      setExpandedMilestones(prev => ({
        ...prev,
        [milestoneId]: true
      }));
    } else {
      // When unchecking, just update without reason
      setIsUpdating(true);
      try {
        await toggleMilestone(activity.id, milestoneId, false, '');
        // Force refresh to show the updated milestone
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error('Error toggling milestone:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };
  
  const confirmMilestoneCompletion = async () => {
    if (isUpdating || !currentMilestone) return;
    setIsUpdating(true);
    
    try {
      await toggleMilestone(activity.id, currentMilestone, true, milestoneReason);
      setSelectedMilestone(currentMilestone);
      setExpandedMilestones(prev => ({
        ...prev,
        [currentMilestone]: true
      }));
      setShowMilestoneReason(false);
      setMilestoneReason('');
      setCurrentMilestone(null);
      
      // Force refresh to show the completed milestone
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error completing milestone:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const cancelMilestoneCompletion = () => {
    setShowMilestoneReason(false);
    setMilestoneReason('');
    setCurrentMilestone(null);
  };

  const toggleMilestoneExpansion = (milestoneId) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [milestoneId]: !prev[milestoneId]
    }));
  };

  const calculateProgress = () => {
    if (!progress?.milestones || !progress.milestones.length) return 0;
    const completed = progress.milestones.filter(m => m.completed).length;
    return Math.round((completed / progress.milestones.length) * 100);
  };

  const cancelStatusChange = () => {
    setShowStatusReason(false);
    setStatusReason('');
    setPendingStatus(null);
  };

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <div className="header-title">
          <h3>Activity Progress</h3>
          <div className="help-text">
            Track the overall status of this activity and its individual milestones
          </div>
        </div>
      </div>

      <StatusOverview 
        progress={progress}
        suggestedStatus={suggestedStatus}
        handleStatusChange={handleStatusChange}
        isUpdating={isUpdating}
        showStatusReason={showStatusReason}
        statusReason={statusReason}
        setStatusReason={setStatusReason}
        confirmStatusChange={confirmStatusChange}
        cancelStatusChange={cancelStatusChange}
        calculateProgress={calculateProgress}
      />

      <div className="milestones-section">
        <div className="section-title">
          <h4>Milestones</h4>
          <div className="help-text">
            Individual tasks that contribute to the overall activity progress
          </div>
        </div>
        
        <div className="milestones-workflow">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h5>Create Milestones</h5>
              <form onSubmit={handleAddMilestone} className="add-milestone">
                <input
                  type="text"
                  placeholder="Add new milestone..."
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  disabled={isUpdating}
                />
                <button type="submit" disabled={isUpdating || !newMilestone.trim()}>
                  Add
                </button>
              </form>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h5>Upload Evidence</h5>
              <p className="step-instruction">Click the + button next to a milestone to upload files</p>
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h5>Mark as Complete</h5>
              <p className="step-instruction">Check the box or click "Mark as Complete" after uploading</p>
            </div>
          </div>
        </div>
        
        {/* Milestone completion dialog moved to MilestoneList component */}

        <MilestoneList 
          activity={activity}
          progress={progress}
          handleToggleMilestone={handleToggleMilestone}
          handleFileUpload={handleFileUpload}
          fileState={fileState}
          isUpdating={isUpdating}
          showMilestoneReason={showMilestoneReason}
          currentMilestone={currentMilestone}
          milestoneReason={milestoneReason}
          setMilestoneReason={setMilestoneReason}
          confirmMilestoneCompletion={confirmMilestoneCompletion}
          cancelMilestoneCompletion={cancelMilestoneCompletion}
          expandedMilestones={expandedMilestones}
          setExpandedMilestones={setExpandedMilestones}
        />
      </div>

      {progress?.statusHistory && progress.statusHistory.length > 0 && (
        <div className="status-history">
          <div className="status-history-header" onClick={() => setShowStatusHistory(!showStatusHistory)}>
            <h4>Status History</h4>
            <button className="toggle-history-button">
              {showStatusHistory ? '−' : '+'}
            </button>
          </div>
          {showStatusHistory && (
            <div className="history-list">
              {progress.statusHistory.map((entry, index) => {
                const statusColors = {
                  'not-started': '#6c757d',
                  'in-progress': '#007bff',
                  'completed': '#28a745',
                  'on-hold': '#ffc107',
                  'cancelled': '#dc3545'
                };
                
                return (
                  <div key={index} className="history-item">
                    <div className="history-status" style={{ color: statusColors[entry.status] }}>
                      {entry.status}
                    </div>
                    {entry.reason && <div className="history-reason">{entry.reason}</div>}
                    <div className="history-date">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
