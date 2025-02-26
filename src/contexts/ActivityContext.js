import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const ActivityContext = createContext(null);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const { user } = useUser();

  // Load activities from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('activities');
      console.log('Initial activities from localStorage:', saved);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          console.log('Parsed activities:', parsed);
          setActivities(parsed);
        } else {
          console.error('Invalid activities data in localStorage');
          localStorage.removeItem('activities');
        }
      }
    } catch (error) {
      console.error('Error loading activities from localStorage:', error);
      localStorage.removeItem('activities');
    }
  }, []);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    try {
      if (activities.length > 0) {
        localStorage.setItem('activities', JSON.stringify(activities));
        console.log('Saved activities to localStorage:', activities);
      } else {
        localStorage.removeItem('activities');
      }
    } catch (error) {
      console.error('Error saving activities to localStorage:', error);
    }
  }, [activities]);

  const addActivity = (circleId, activity) => {
    return new Promise((resolve) => {
      const newActivity = {
        ...activity,
        circleId: activity.circleId || circleId,
        id: activity.id || Date.now().toString(),
        createdAt: activity.createdAt || new Date().toISOString(),
        status: activity.status || 'active',
        participants: activity.participants || []
      };

      console.log('Adding new activity:', newActivity);
      console.log('Current activities:', activities);

      setActivities(prev => {
        const newState = [...prev, newActivity];
        console.log('New activities state:', newState);
        localStorage.setItem('activities', JSON.stringify(newState));
        resolve(newActivity);
        return newState;
      });
    });
  };

  useEffect(() => {
    console.log('Activities updated:', activities);
  }, [activities]);

  const updateActivity = (activityId, updates) => {
    setActivities(prev => {
      const newState = prev.map(activity => 
        activity.id === activityId ? { ...activity, ...updates } : activity
      );
      localStorage.setItem('activities', JSON.stringify(newState));
      return newState;
    });
  };

  const updateProgress = (activityId, progress) => {
    return new Promise((resolve) => {
      setActivities(prev => {
        const newState = prev.map(activity => {
          if (activity.id === activityId) {
            return {
              ...activity,
              progress: {
                ...activity.progress,
                ...progress,
                lastUpdated: new Date().toISOString()
              }
            };
          }
          return activity;
        });
        localStorage.setItem('activities', JSON.stringify(newState));
        resolve(newState.find(a => a.id === activityId));
        return newState;
      });
    });
  };

  const updateStatus = (activityId, status, reason = '') => {
    return updateProgress(activityId, {
      status,
      statusReason: reason,
      statusHistory: [
        ...(activities.find(a => a.id === activityId)?.progress?.statusHistory || []),
        {
          status,
          reason,
          timestamp: new Date().toISOString()
        }
      ]
    });
  };

  const addMilestone = (activityId, milestone) => {
    const activity = activities.find(a => a.id === activityId);
    const milestones = activity?.progress?.milestones || [];
    
    return updateProgress(activityId, {
      milestones: [
        ...milestones,
        {
          ...milestone,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          completed: false
        }
      ]
    });
  };

  const toggleMilestone = (activityId, milestoneId, completed, reason = '') => {
    const activity = activities.find(a => a.id === activityId);
    const milestones = activity?.progress?.milestones || [];

    return updateProgress(activityId, {
      milestones: milestones.map(m => 
        m.id === milestoneId ? 
        { 
          ...m, 
          completed, 
          completedAt: completed ? new Date().toISOString() : null,
          reason: completed ? reason : '',
        } : 
        m
      )
    });
  };

  const deleteActivity = (activityId) => {
    setActivities(prev => {
      const newState = prev.filter(activity => activity.id !== activityId);
      localStorage.setItem('activities', JSON.stringify(newState));
      return newState;
    });
  };

  const getActivities = (circleId) => {
    return activities.filter(activity => activity.circleId === circleId);
  };

  const joinActivity = (activityId, participant) => {
    setActivities(prev => {
      const newState = prev.map(activity => {
        if (activity.id === activityId) {
          return {
            ...activity,
            participants: [...(activity.participants || []), {
              ...participant,
              joinedAt: new Date().toISOString()
            }]
          };
        }
        return activity;
      });
      localStorage.setItem('activities', JSON.stringify(newState));
      return newState;
    });
  };

  const leaveActivity = (activityId, participantId) => {
    setActivities(prev => {
      const newState = prev.map(activity => {
        if (activity.id === activityId) {
          return {
            ...activity,
            participants: (activity.participants || []).filter(p => p.id !== participantId)
          };
        }
        return activity;
      });
      localStorage.setItem('activities', JSON.stringify(newState));
      return newState;
    });
  };

  const updateParticipantRole = (activityId, participantId, role) => {
    setActivities(prev => {
      const newState = prev.map(activity => {
        if (activity.id === activityId) {
          return {
            ...activity,
            participants: (activity.participants || []).map(p => 
              p.id === participantId ? { ...p, role } : p
            )
          };
        }
        return activity;
      });
      localStorage.setItem('activities', JSON.stringify(newState));
      return newState;
    });
  };

  const getParticipants = (activityId) => {
    const activity = activities.find(a => a.id === activityId);
    return activity?.participants || [];
  };

  // Comment state
  const [commentState, setCommentState] = useState({
    byId: {},
    byActivity: {},
    replies: {},
    loading: false,
    error: null
  });

  // File state
  const [fileState, setFileState] = useState({
    byId: {},
    byActivity: {},
    loading: false,
    error: null
  });

  // Load files from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('files');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFileState(prev => ({
          ...prev,
          ...parsed,
          loading: false
        }));
      }
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }, []);

  // Save files to storage
  useEffect(() => {
    if (!fileState.loading) {
      localStorage.setItem('files', JSON.stringify({
        byId: fileState.byId,
        byActivity: fileState.byActivity
      }));
    }
  }, [fileState]);

  const addFile = async (activityId, file) => {
    setFileState(prev => ({ ...prev, loading: true }));
    try {
      const fileResource = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedBy: user?.id,
        uploadedAt: new Date().toISOString(),
        activityId,
        metadata: {
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          version: 1
        }
      };

      setFileState(prev => ({
        ...prev,
        byId: { ...prev.byId, [fileResource.id]: fileResource },
        byActivity: {
          ...prev.byActivity,
          [activityId]: [...(prev.byActivity[activityId] || []), fileResource.id]
        },
        loading: false
      }));

      return fileResource;
    } catch (error) {
      setFileState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const removeFile = async (fileId) => {
    setFileState(prev => ({ ...prev, loading: true }));
    try {
      setFileState(prevState => {
        const file = prevState.byId[fileId];
        const newState = {
          byId: { ...prevState.byId },
          byActivity: { ...prevState.byActivity },
          loading: false,
          error: null
        };

        // Remove from byId
        delete newState.byId[fileId];

        // Remove from byActivity
        if (file.activityId) {
          newState.byActivity[file.activityId] = 
            newState.byActivity[file.activityId].filter(id => id !== fileId);
        }

        // Revoke object URL
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
        if (file.metadata?.preview) {
          URL.revokeObjectURL(file.metadata.preview);
        }

        return newState;
      });
    } catch (error) {
      setFileState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const downloadFile = async (file) => {
    try {
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw new Error('Failed to download file');
    }
  };

  const getFiles = (activityId) => {
    const fileIds = fileState.byActivity[activityId] || [];
    return fileIds.map(id => fileState.byId[id]);
  };

  // Load comments from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('comments');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCommentState(prev => ({
          ...prev,
          ...parsed,
          loading: false
        }));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }, []);

  // Save comments to storage
  useEffect(() => {
    if (!commentState.loading) {
      localStorage.setItem('comments', JSON.stringify({
        byId: commentState.byId,
        byActivity: commentState.byActivity,
        replies: commentState.replies
      }));
    }
  }, [commentState]);

  const addComment = async (activityId, commentData) => {
    setCommentState(prev => ({ ...prev, loading: true }));
    try {
      const comment = {
        ...commentData,
        id: Date.now().toString(),
        activityId,
        createdAt: new Date().toISOString(),
        mentions: [],
        reactions: {}
      };

      setCommentState(prev => ({
        ...prev,
        byId: { ...prev.byId, [comment.id]: comment },
        byActivity: {
          ...prev.byActivity,
          [activityId]: [...(prev.byActivity[activityId] || []), comment.id]
        },
        replies: comment.parentId ? {
          ...prev.replies,
          [comment.parentId]: [...(prev.replies[comment.parentId] || []), comment.id]
        } : prev.replies,
        loading: false
      }));

      return comment;
    } catch (error) {
      setCommentState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const updateComment = async (commentId, updates) => {
    setCommentState(prev => ({ ...prev, loading: true }));
    try {
      let updatedComment;
      setCommentState(prevState => {
        const comment = prevState.byId[commentId];
        updatedComment = {
          ...comment,
          ...updates,
          updatedAt: new Date().toISOString()
        };

        return {
          ...prevState,
          byId: { ...prevState.byId, [commentId]: updatedComment },
          loading: false
        };
      });

      return updatedComment;
    } catch (error) {
      setCommentState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    setCommentState(prev => ({ ...prev, loading: true }));
    try {
      setCommentState(prevState => {
        const comment = prevState.byId[commentId];
        const newState = {
          byId: { ...prevState.byId },
          byActivity: { ...prevState.byActivity },
          replies: { ...prevState.replies },
          loading: false,
          error: null
        };

        // Remove from byId
        delete newState.byId[commentId];

        // Remove from byActivity
        newState.byActivity[comment.activityId] = 
          newState.byActivity[comment.activityId].filter(id => id !== commentId);

        // Remove from replies if it's a reply
        if (comment.parentId) {
          newState.replies[comment.parentId] = 
            newState.replies[comment.parentId].filter(id => id !== commentId);
        }

        // Remove all replies to this comment
        if (prevState.replies[commentId]) {
          prevState.replies[commentId].forEach(replyId => {
            delete newState.byId[replyId];
            newState.byActivity[comment.activityId] = 
              newState.byActivity[comment.activityId].filter(id => id !== replyId);
          });
          delete newState.replies[commentId];
        }

        return newState;
      });
    } catch (error) {
      setCommentState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const getComments = (activityId) => {
    const commentIds = commentState.byActivity[activityId] || [];
    return commentIds.map(id => commentState.byId[id]);
  };

  const getReplies = (commentId) => {
    const replyIds = commentState.replies[commentId] || [];
    return replyIds.map(id => commentState.byId[id]);
  };

  const addReaction = async (commentId, reaction, userId) => {
    setCommentState(prev => {
      const comment = prev.byId[commentId];
      const reactions = comment.reactions[reaction] || { count: 0, users: [] };
      
      return {
        ...prev,
        byId: {
          ...prev.byId,
          [commentId]: {
            ...comment,
            reactions: {
              ...comment.reactions,
              [reaction]: {
                count: reactions.count + 1,
                users: [...reactions.users, userId]
              }
            }
          }
        }
      };
    });
  };

  const removeReaction = async (commentId, reaction, userId) => {
    setCommentState(prev => {
      const comment = prev.byId[commentId];
      const reactions = comment.reactions[reaction];
      
      if (!reactions || !reactions.users.includes(userId)) {
        return prev;
      }

      const newReactions = {
        count: reactions.count - 1,
        users: reactions.users.filter(id => id !== userId)
      };

      return {
        ...prev,
        byId: {
          ...prev.byId,
          [commentId]: {
            ...comment,
            reactions: {
              ...comment.reactions,
              [reaction]: newReactions
            }
          }
        }
      };
    });
  };

  const reportComment = async (commentId, reportData) => {
    setCommentState(prev => ({ ...prev, loading: true }));
    try {
      let updatedComment;
      setCommentState(prevState => {
        const comment = prevState.byId[commentId];
        const reports = comment.reports || [];
        
        updatedComment = {
          ...comment,
          reports: [...reports, reportData],
          isReported: true,
          reportCount: (comment.reportCount || 0) + 1
        };

        return {
          ...prevState,
          byId: { ...prevState.byId, [commentId]: updatedComment },
          loading: false
        };
      });

      return updatedComment;
    } catch (error) {
      setCommentState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const pinComment = async (commentId, isPinned = true) => {
    return updateComment(commentId, { isPinned });
  };

  const hideComment = async (commentId, isHidden = true) => {
    return updateComment(commentId, { isHidden });
  };

  const value = {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivities,
    joinActivity,
    leaveActivity,
    updateParticipantRole,
    getParticipants,
    updateProgress,
    updateStatus,
    addMilestone,
    toggleMilestone,
    // Comment functions
    addComment,
    updateComment,
    deleteComment,
    getComments,
    getReplies,
    addReaction,
    removeReaction,
    reportComment,
    pinComment,
    hideComment,
    commentState,
    // File functions
    addFile,
    deleteFile: removeFile,
    downloadFile,
    getFiles,
    fileState
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
