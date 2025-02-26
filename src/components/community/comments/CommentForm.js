import React, { useState, useRef } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { TextFormatToolbar } from './';
import { applyFormatting } from './CommentFormUtils';
import '../CommentForm.css';

/**
 * CommentForm Component
 * 
 * A form for creating and editing comments
 * 
 * @param {Object} props
 * @param {string} props.activityId - ID of the activity this comment belongs to
 * @param {string} [props.parentId] - ID of the parent comment (if this is a reply)
 * @param {Function} props.onSubmit - Function to call when the form is submitted
 * @param {boolean} [props.autoFocus] - Whether to autofocus the textarea
 * @param {Function} [props.onCancel] - Function to call when the form is cancelled
 * @param {string} [props.initialContent] - Initial content for the textarea
 */
const CommentForm = ({ 
  activityId, 
  parentId = null, 
  onSubmit, 
  autoFocus = false, 
  onCancel = null, 
  initialContent = '' 
}) => {
  const [content, setContent] = useState(initialContent);
  const [atWhatCost, setAtWhatCost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFormatting, setShowFormatting] = useState(false);
  const { user } = useUser();
  const textareaRef = useRef(null);
  const costTextareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        content: content.trim(),
        atWhatCost: atWhatCost.trim(),
        userId: user.id,
        userName: user.name,
        parentId,
        format: 'markdown', // Support for markdown formatting
        createdAt: new Date().toISOString()
      });
      setContent('');
      setAtWhatCost('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormat = (formatType) => {
    const newContent = applyFormatting({
      textarea: textareaRef.current,
      content,
      formatType
    });
    
    setContent(newContent);
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
      
      <div className="form-section">
        <label htmlFor="at-what-cost" className="cost-label">At what cost?</label>
        <textarea
          id="at-what-cost"
          ref={costTextareaRef}
          value={atWhatCost}
          onChange={(e) => setAtWhatCost(e.target.value)}
          placeholder="What might be the costs, trade-offs, or consequences to consider?"
          disabled={isSubmitting}
          className="cost-textarea"
          rows={3}
        />
        <small className="cost-description">Reflect on potential downsides or considerations others should be aware of</small>
      </div>
      
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

export default CommentForm;
