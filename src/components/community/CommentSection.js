import React, { useState } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import './CommentSection.css';

const CommentForm = ({ activityId, parentId = null, onSubmit, autoFocus = false }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        content: content.trim(),
        userId: user.id,
        userName: user.name,
        parentId
      });
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        autoFocus={autoFocus}
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        disabled={!content.trim() || isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

const CommentItem = ({ comment, onReply }) => {
  const { user } = useUser();
  const { updateComment, deleteComment, addReaction, removeReaction } = useActivity();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = async () => {
    if (!editContent.trim() || isUpdating) return;
    setIsUpdating(true);
    try {
      await updateComment(comment.id, { content: editContent.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    setIsUpdating(true);
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReaction = async (reaction) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const currentReactions = comment.reactions[reaction] || { count: 0, users: [] };
      if (currentReactions.users.includes(user.id)) {
        await removeReaction(comment.id, reaction, user.id);
      } else {
        await addReaction(comment.id, reaction, user.id);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.userName}</span>
        <span className="comment-date">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
        {comment.updatedAt && (
          <span className="comment-edited">(edited)</span>
        )}
      </div>

      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={isUpdating}
          />
          <div className="edit-actions">
            <button 
              onClick={handleEdit}
              disabled={!editContent.trim() || isUpdating}
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}

      <div className="comment-footer">
        <div className="comment-reactions">
          {Object.entries(comment.reactions).map(([reaction, data]) => (
            <button
              key={reaction}
              className={`reaction-button ${data.users.includes(user.id) ? 'active' : ''}`}
              onClick={() => handleReaction(reaction)}
              disabled={isUpdating}
            >
              {reaction} ({data.count})
            </button>
          ))}
          <button
            className="reaction-button"
            onClick={() => handleReaction('👍')}
            disabled={isUpdating}
          >
            👍
          </button>
        </div>

        <div className="comment-actions">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            disabled={isUpdating}
          >
            Reply
          </button>
          {comment.userId === user.id && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isUpdating}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isUpdating}
                className="delete-button"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="reply-form">
          <CommentForm
            activityId={comment.activityId}
            parentId={comment.id}
            onSubmit={(replyData) => {
              onReply(replyData);
              setShowReplyForm(false);
            }}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

const CommentThread = ({ comment, replies, onReply }) => {
  return (
    <div className="comment-thread">
      <CommentItem comment={comment} onReply={onReply} />
      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map(reply => (
            <CommentThread
              key={reply.id}
              comment={reply}
              replies={[]} // Nested replies not supported yet
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ activity }) => {
  const { addComment, getComments, getReplies } = useActivity();
  const comments = getComments(activity.id);

  const handleAddComment = async (commentData) => {
    await addComment(activity.id, commentData);
  };

  const topLevelComments = comments.filter(c => !c.parentId);

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      
      <CommentForm
        activityId={activity.id}
        onSubmit={handleAddComment}
      />

      <div className="comments-list">
        {topLevelComments.map(comment => (
          <CommentThread
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
            onReply={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
