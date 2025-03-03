import React, { useState, useRef, useEffect } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import { useUser } from '../../contexts/UserContext';
import { useTemplate } from '../../contexts/TemplateContext';
import { SectionHeader } from './shared';
import StructuredCommentForm from './StructuredCommentForm';
import './CommentSection.css';

// Emoji picker component
const EmojiPicker = ({ onSelect, onClose }) => {
  const emojis = ['👍', '👎', '❤️', '😄', '😢', '😮', '🎉', '🤔', '👏', '🙏'];
  const pickerRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="emoji-picker" ref={pickerRef}>
      {emojis.map(emoji => (
        <button 
          key={emoji} 
          className="emoji-button" 
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

// Rich text toolbar component
const TextFormatToolbar = ({ onFormat }) => {
  const formats = [
    { label: 'B', format: 'bold', title: 'Bold' },
    { label: 'I', format: 'italic', title: 'Italic' },
    { label: 'U', format: 'underline', title: 'Underline' },
    { label: 'S', format: 'strikethrough', title: 'Strikethrough' },
    { label: '❝', format: 'quote', title: 'Quote' },
    { label: '•', format: 'list', title: 'Bullet List' },
    { label: '1.', format: 'numbered-list', title: 'Numbered List' },
    { label: '🔗', format: 'link', title: 'Insert Link' },
    { label: '@', format: 'mention', title: 'Mention User' }
  ];

  return (
    <div className="format-toolbar">
      {formats.map(format => (
        <button
          key={format.format}
          className="format-button"
          title={format.title}
          onClick={() => onFormat(format.format)}
          type="button"
        >
          {format.label}
        </button>
      ))}
    </div>
  );
};

// Enhanced comment form component
const CommentForm = ({ activityId, parentId = null, onSubmit, autoFocus = false, onCancel = null, initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFormatting, setShowFormatting] = useState(false);
  const { user } = useUser();
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        content: content.trim(),
        userId: user.id,
        userName: user.name,
        parentId,
        format: 'markdown', // Support for markdown formatting
        createdAt: new Date().toISOString()
      });
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormat = (formatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = '';
    let cursorPosition = 0;

    switch (formatType) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = 1;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        cursorPosition = 2;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        cursorPosition = 2;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        cursorPosition = 2;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        cursorPosition = 3;
        break;
      case 'numbered-list':
        formattedText = `\n1. ${selectedText}`;
        cursorPosition = 4;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        cursorPosition = selectedText.length + 3;
        break;
      case 'mention':
        formattedText = `@${selectedText}`;
        cursorPosition = 1;
        break;
      default:
        return;
    }

    const newContent = 
      content.substring(0, start) + 
      formattedText + 
      content.substring(end);
    
    setContent(newContent);
    
    // Set focus back to textarea and position cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText ? start + formattedText.length : start + cursorPosition;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-form-header">
        <button 
          type="button"
          className="format-toggle"
          onClick={() => setShowFormatting(!showFormatting)}
        >
          {showFormatting ? 'Hide formatting' : 'Show formatting'}
        </button>
      </div>
      
      {showFormatting && (
        <TextFormatToolbar onFormat={handleFormat} />
      )}
      
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your reflection or insight..."
        autoFocus={autoFocus}
        disabled={isSubmitting}
      />
      
      <div className="comment-form-footer">
        <div className="comment-form-info">
          <small>Supports markdown formatting</small>
        </div>
        <div className="comment-form-actions">
          {onCancel && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="submit-button"
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? 'Sharing...' : parentId ? 'Share Reply' : 'Share Reflection'}
          </button>
        </div>
      </div>
    </form>
  );
};

// Enhanced comment item component
const CommentItem = ({ comment, onReply, depth = 0, isLastInThread = true, template = null }) => {
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

  const handleEdit = async () => {
    if (!isEditing || isUpdating) return;
    setIsUpdating(true);
    try {
      await updateComment(comment.id, { 
        content: comment.content,
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
                // Only render sections that have content
                if (!comment.sections[section.id]) return null;
                
                return (
                  <div key={section.id} className="comment-section">
                    <div className="section-title">{section.label}</div>
                    <div 
                      className="section-content"
                      dangerouslySetInnerHTML={{ 
                        __html: formatContent(comment.sections[section.id]) 
                      }}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <div 
            className="comment-content"
            dangerouslySetInnerHTML={{ __html: formatContent(comment.content) }}
          />
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
              strictRigourEnforcement={comment.activityId && window.activities ? 
                window.activities.find(a => a.id === comment.activityId)?.strictRigourEnforcement : false}
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

// Enhanced comment thread component with nested replies
const CommentThread = ({ comment, replies, onReply, allComments, depth = 0, template = null }) => {
  // Get nested replies for each reply
  const getNestedReplies = (parentId) => {
    return allComments.filter(c => c.parentId === parentId);
  };

  return (
    <div className="comment-thread">
      <CommentItem 
        comment={comment} 
        onReply={onReply} 
        depth={depth}
        isLastInThread={replies.length === 0}
        template={template}
      />
      
      {replies.length > 0 && (
        <div className={`comment-replies depth-${depth}`}>
          {replies.map((reply, index) => (
              <CommentThread
                key={reply.id}
                comment={reply}
                replies={getNestedReplies(reply.id)}
                onReply={onReply}
                allComments={allComments}
                depth={depth + 1}
                template={template}
              />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Enhanced CommentSection Component
 * 
 * Displays a list of comments with nested replies, rich text formatting,
 * enhanced reactions, and moderation tools.
 * 
 * @param {Object} props
 * @param {Object} props.activity - The activity or discussion the comments belong to
 * @param {String} props.contextType - The type of context ('activity', 'discussion', etc.)
 * @param {Function} props.onCommentAdded - Optional callback when a comment is added
 */
const CommentSection = ({ activity, contextType = 'activity', onCommentAdded }) => {
  const { addComment, getComments, getReplies } = useActivity();
  const { getTemplate } = useTemplate();
  const [sortBy, setSortBy] = useState('newest');
  const [showForm, setShowForm] = useState(true);
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
            />
          ) : (
            <CommentForm
              activityId={activity.id}
              onSubmit={(data) => {
                handleAddComment(data);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
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
