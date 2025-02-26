import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useActivity } from '../../../contexts/ActivityContext';
import { EmojiPicker, CommentForm } from './';
import StructuredCommentForm from '../StructuredCommentForm';
import '../CommentItem.css';

/**
 * CommentItem Component
 * 
 * Displays a single comment with options to reply, edit, delete, and react
 * 
 * @param {Object} props
 * @param {Object} props.comment - The comment data
 * @param {Function} props.onReply - Function to call when replying to this comment
 * @param {number} [props.depth] - Depth of this comment in the thread
 * @param {boolean} [props.isLastInThread] - Whether this is the last comment in the thread
 * @param {Object} [props.template] - Template for structured comments
 */
const CommentItem = ({ 
  comment, 
  onReply, 
  depth = 0, 
  isLastInThread = true, 
  template = null 
}) => {
  const { user } = useUser();
  const { updateComment, deleteComment, addReaction, removeReaction, reportComment } = useActivity();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const moreOptionsRef = useRef(null);

  // Format the comment content with markdown
  const formatContent = (content) => {
    // This is a simple implementation - in a real app, you'd use a markdown library
    let formatted = content;
    
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Underline
    formatted = formatted.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Strikethrough
    formatted = formatted.replace(/~~(.*?)~~/g, '<s>$1</s>');
    
    // Quote
    formatted = formatted.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');
    
    // Lists
    formatted = formatted.replace(/^- (.*?)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    
    // Numbered lists
    formatted = formatted.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*?<\/li>)/gs, '<ol>$1</ol>');
    
    // Links
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Mentions
    formatted = formatted.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    
    return formatted;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = async (updatedData) => {
    if (!isEditing || isUpdating) return;
    setIsUpdating(true);
    try {
      await updateComment(comment.id, { 
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
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
      const currentReactions = comment.reactions || {};
      const reactionData = currentReactions[reaction] || { count: 0, users: [] };
      
      if (reactionData.users.includes(user.id)) {
        await removeReaction(comment.id, reaction, user.id);
      } else {
        await addReaction(comment.id, reaction, user.id);
      }
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error updating reaction:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReport = async () => {
    if (isReported || isUpdating) return;
    setIsUpdating(true);
    try {
      await reportComment(comment.id, {
        userId: user.id,
        reason: 'inappropriate content',
        timestamp: new Date().toISOString()
      });
      setIsReported(true);
      setShowMoreOptions(false);
    } catch (error) {
      console.error('Error reporting comment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Determine if the user is a moderator
  const isModerator = user.role === 'moderator' || user.role === 'admin';
  const isAuthor = comment.userId === user.id;

  // Display the "At what cost" section if it exists
  const hasAtWhatCost = comment.atWhatCost && comment.atWhatCost.trim().length > 0;

  return (
    <div className={`comment-item depth-${depth} ${isLastInThread ? 'last-in-thread' : ''}`}>
      <div className="comment-header">
        <div className="comment-author-info">
          <span className="comment-author">{comment.userName}</span>
          {comment.userRole && (
            <span className={`user-role ${comment.userRole}`}>{comment.userRole}</span>
          )}
          {comment.templateId && comment.meetsRigourRequirements && (
            <span className="rigour-badge">
              Meets Rigour Requirements
            </span>
          )}
        </div>
        <div className="comment-meta">
          <span className="comment-date" title={new Date(comment.createdAt).toLocaleString()}>
            {formatDate(comment.createdAt)}
          </span>
          {comment.updatedAt && (
            <span className="comment-edited" title={new Date(comment.updatedAt).toLocaleString()}>
              (edited)
            </span>
          )}
          <div className="more-options-container" ref={moreOptionsRef}>
            <button 
              className="more-options-button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              aria-label="More options"
            >
              •••
            </button>
            {showMoreOptions && (
              <div className="more-options-menu">
                {(isAuthor || isModerator) && (
                  <>
                    <button onClick={() => { setIsEditing(true); setShowMoreOptions(false); }}>
                      Edit
                    </button>
                    <button onClick={() => { handleDelete(); setShowMoreOptions(false); }}>
                      Delete
                    </button>
                  </>
                )}
                {!isAuthor && (
                  <button 
                    onClick={handleReport}
                    disabled={isReported}
                    className={isReported ? 'reported' : ''}
                  >
                    {isReported ? 'Reported' : 'Report'}
                  </button>
                )}
                {isModerator && (
                  <>
                    <button onClick={() => { /* Handle pin */ setShowMoreOptions(false); }}>
                      {comment.isPinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button onClick={() => { /* Handle hide */ setShowMoreOptions(false); }}>
                      {comment.isHidden ? 'Unhide' : 'Hide'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing ? (
        template ? (
          <StructuredCommentForm
            activityId={comment.activityId}
            parentId={comment.parentId}
            template={template}
            initialSections={comment.sections}
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <CommentForm
            activityId={comment.activityId}
            parentId={comment.parentId}
            initialContent={comment.content}
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
          />
        )
      ) : (
        comment.sections ? (
          <div className="structured-comment-content">
            {template && template.sections
              .sort((a, b) => a.order - b.order)
              .map(section => {
                const hasContent = comment.sections[section.id] && comment.sections[section.id].trim().length > 0;
                const isRequired = template.defaultRequiredSections.includes(section.id);
                
                return (
                  <div key={section.id} className={`comment-section ${!hasContent ? 'empty-section' : ''} ${!hasContent && isRequired ? 'empty-required-section' : ''}`}>
                    <div className="section-title">
                      {section.label}
                      {isRequired && <span className="required-marker">*</span>}
                    </div>
                    {hasContent ? (
                      <div 
                        className="section-content"
                        dangerouslySetInnerHTML={{ 
                          __html: formatContent(comment.sections[section.id]) 
                        }}
                      />
                    ) : (
                      <div className="empty-section-message">
                        <em>Not provided</em>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div>
            <div 
              className="comment-content"
              dangerouslySetInnerHTML={{ __html: formatContent(comment.content) }}
            />
            
            {hasAtWhatCost && (
              <div className="comment-at-what-cost">
                <div className="at-what-cost-label">At what cost?</div>
                <div 
                  className="at-what-cost-content"
                  dangerouslySetInnerHTML={{ __html: formatContent(comment.atWhatCost) }}
                />
              </div>
            )}
          </div>
        )
      )}

      <div className="comment-footer">
        <div className="comment-reactions">
          {comment.reactions && Object.entries(comment.reactions).map(([reaction, data]) => (
            <button
              key={reaction}
              className={`reaction-button ${data.users.includes(user.id) ? 'active' : ''}`}
              onClick={() => handleReaction(reaction)}
              disabled={isUpdating}
            >
              {reaction} {data.count > 0 && <span className="reaction-count">{data.count}</span>}
            </button>
          ))}
          <div className="emoji-picker-container">
            <button
              className="add-reaction-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={isUpdating}
            >
              +
            </button>
            {showEmojiPicker && (
              <EmojiPicker 
                onSelect={handleReaction} 
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>
        </div>

        <div className="comment-actions">
          <button
            className="reply-button"
            onClick={() => setShowReplyForm(!showReplyForm)}
            disabled={isUpdating}
          >
            Share Insight
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="reply-form">
          {template ? (
            <StructuredCommentForm
              activityId={comment.activityId}
              parentId={comment.id}
              template={template}
              strictRigourEnforcement={comment.strictRigourEnforcement || false}
              onSubmit={(replyData) => {
                onReply(replyData);
                setShowReplyForm(false);
              }}
              onCancel={() => setShowReplyForm(false)}
              autoFocus
            />
          ) : (
            <CommentForm
              activityId={comment.activityId}
              parentId={comment.id}
              onSubmit={(replyData) => {
                onReply(replyData);
                setShowReplyForm(false);
              }}
              onCancel={() => setShowReplyForm(false)}
              autoFocus
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
