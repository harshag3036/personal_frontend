import React, { useState } from 'react';
import { useActivity } from '../../../contexts/ActivityContext';
import { useTemplate } from '../../../contexts/TemplateContext';
import { SectionHeader } from '../shared';
import StructuredCommentForm from '../StructuredCommentForm';
import { CommentForm, CommentThread } from './';
import '../CommentSection.css';
import '../CommentForm.css';
import '../CommentItem.css';

/**
 * CommentSection Component
 * 
 * Displays a list of comments with nested replies, rich text formatting,
 * enhanced reactions, and moderation tools.
 * 
 * @param {Object} props
 * @param {Object} props.activity - The activity or discussion the comments belong to
 * @param {String} props.contextType - The type of context ('activity', 'discussion', etc.)
 * @param {Function} props.onCommentAdded - Optional callback when a comment is added
 */
const CommentSection = ({ 
  activity, 
  contextType = 'activity', 
  onCommentAdded 
}) => {
  const { addComment, getComments, getReplies } = useActivity();
  const { getTemplate } = useTemplate();
  const [sortBy, setSortBy] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const comments = getComments(activity.id);
  
  // Get the template if this discussion uses one
  const discussionTemplate = activity.templateId ? 
    getTemplate(activity.templateId) : null;

  const handleAddComment = async (commentData) => {
    await addComment(activity.id, commentData);
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  // Get top-level comments
  const topLevelComments = comments.filter(c => !c.parentId);
  
  // Sort comments based on selected option
  const sortedComments = [...topLevelComments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular':
        const aReactions = Object.values(a.reactions || {}).reduce((sum, r) => sum + (r.count || 0), 0);
        const bReactions = Object.values(b.reactions || {}).reduce((sum, r) => sum + (r.count || 0), 0);
        return bReactions - aReactions;
      default:
        return 0;
    }
  });

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <SectionHeader 
          title={`Reflections (${comments.length})`}
          subtitle={comments.length > 0 ? 'Share your insights' : 'Begin a thoughtful exchange'}
          actions={
            <div className="comment-controls">
              <div className="sort-container">
                <label htmlFor="comment-sort">Sort by:</label>
                <select
                  id="comment-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              
              {!showForm && (
                <button 
                  className="add-comment-button"
                  onClick={() => setShowForm(true)}
                >
                  Share Your Perspective
                </button>
              )}
            </div>
          }
        />
        
        {/* Display template info if this discussion uses a template */}
        {discussionTemplate && (
          <div className="discussion-template-info">
            <h4>Discussion Format: {discussionTemplate.name}</h4>
            <p>{discussionTemplate.description}</p>
          </div>
        )}
      </div>
      
      {showForm && (
        <div className="main-comment-form">
          {discussionTemplate ? (
            <StructuredCommentForm
              activityId={activity.id}
              template={discussionTemplate}
              strictRigourEnforcement={activity.strictRigourEnforcement}
              onSubmit={(data) => {
                handleAddComment(data);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
              autoFocus={true}
            />
          ) : (
            <CommentForm
              activityId={activity.id}
              onSubmit={(data) => {
                handleAddComment(data);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
              autoFocus={true}
            />
          )}
        </div>
      )}

      <div className="comments-list">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => (
            <CommentThread
              key={comment.id}
              comment={comment}
              replies={getReplies(comment.id)}
              onReply={handleAddComment}
              allComments={comments}
              template={comment.templateId ? getTemplate(comment.templateId) : discussionTemplate}
            />
          ))
        ) : (
          <div className="empty-comments">
            <p>No reflections shared yet. Add your perspective to deepen the conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
