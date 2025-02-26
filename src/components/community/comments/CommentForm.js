import React, { useState, useRef } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { TextFormatToolbar } from './';
import '../CommentSection.css';

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

export default CommentForm;
