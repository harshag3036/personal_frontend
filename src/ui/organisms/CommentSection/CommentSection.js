/**
 * CommentSection Component
 * 
 * A comprehensive component for displaying and managing comments and discussions.
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { Box, Text, Button, Avatar, Icon, Flex, Stack } from '../../atoms';
import { Dropdown, Menu, Textarea } from '../../molecules';
import {
  COMMENT_SECTION_CLASS,
  COMMENT_SECTION_HEADER_CLASS,
  COMMENT_SECTION_BODY_CLASS,
  COMMENT_SECTION_FOOTER_CLASS,
  COMMENT_SECTION_TITLE_CLASS,
  COMMENT_SECTION_SUBTITLE_CLASS,
  COMMENT_SECTION_ACTIONS_CLASS,
  COMMENT_SECTION_COMMENT_CLASS,
  COMMENT_SECTION_COMMENT_HEADER_CLASS,
  COMMENT_SECTION_COMMENT_BODY_CLASS,
  COMMENT_SECTION_COMMENT_FOOTER_CLASS,
  COMMENT_SECTION_COMMENT_AVATAR_CLASS,
  COMMENT_SECTION_COMMENT_AUTHOR_CLASS,
  COMMENT_SECTION_COMMENT_TIMESTAMP_CLASS,
  COMMENT_SECTION_COMMENT_CONTENT_CLASS,
  COMMENT_SECTION_COMMENT_ACTIONS_CLASS,
  COMMENT_SECTION_FORM_CLASS,
  COMMENT_SECTION_FORM_TEXTAREA_CLASS,
  COMMENT_SECTION_FORM_ACTIONS_CLASS,
  COMMENT_SECTION_EMPTY_CLASS,
  COMMENT_SECTION_LOADING_CLASS,
  COMMENT_SECTION_ERROR_CLASS,
  COMMENT_SECTION_VARIANTS,
  COMMENT_SECTION_SIZES,
  COMMENT_SECTION_SORT_OPTIONS,
  COMMENT_SECTION_COMMENT_TYPES,
  COMMENT_SECTION_MODIFIERS
} from './constants';
import './CommentSection.css';

/**
 * Comment Component
 * 
 * Renders a single comment with author information, content, and actions.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} Comment component
 */
const Comment = ({
  id,
  author,
  authorAvatar,
  content,
  timestamp,
  replies = [],
  type = COMMENT_SECTION_COMMENT_TYPES.STANDARD,
  likes = 0,
  onReply,
  onEdit,
  onDelete,
  onLike,
  canEdit = false,
  canDelete = false,
  canReply = true,
  className = '',
  ...props
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  // Format timestamp
  const formattedTimestamp = typeof timestamp === 'string' 
    ? timestamp 
    : new Date(timestamp).toLocaleString();

  // Handle reply submission
  const handleReplySubmit = () => {
    if (replyText.trim() && onReply) {
      onReply(id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  // Handle edit submission
  const handleEditSubmit = () => {
    if (editText.trim() && onEdit) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  // Handle like action
  const handleLike = () => {
    if (onLike) {
      onLike(id, !liked);
    }
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  // Combine class names
  const commentClasses = [
    COMMENT_SECTION_COMMENT_CLASS,
    type !== COMMENT_SECTION_COMMENT_TYPES.STANDARD ? `${COMMENT_SECTION_COMMENT_CLASS}--${type}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={commentClasses} {...props}>
      <div className={COMMENT_SECTION_COMMENT_HEADER_CLASS}>
        <Avatar 
          src={authorAvatar} 
          name={author} 
          size="sm" 
          className={COMMENT_SECTION_COMMENT_AVATAR_CLASS} 
        />
        <span className={COMMENT_SECTION_COMMENT_AUTHOR_CLASS}>{author}</span>
        <span className={COMMENT_SECTION_COMMENT_TIMESTAMP_CLASS}>{formattedTimestamp}</span>
      </div>
      
      <div className={COMMENT_SECTION_COMMENT_BODY_CLASS}>
        {isEditing ? (
          <div>
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className={COMMENT_SECTION_FORM_TEXTAREA_CLASS}
            />
            <Flex gap="sm" justifyContent="flex-end" marginTop="sm">
              <Button 
                variant="secondary" 
                size="small" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="small" 
                onClick={handleEditSubmit}
              >
                Save
              </Button>
            </Flex>
          </div>
        ) : (
          <div className={COMMENT_SECTION_COMMENT_CONTENT_CLASS}>{content}</div>
        )}
      </div>
      
      <div className={COMMENT_SECTION_COMMENT_FOOTER_CLASS}>
        <div className={COMMENT_SECTION_COMMENT_ACTIONS_CLASS}>
          {canReply && (
            <Button 
              variant="text" 
              size="small" 
              onClick={() => setIsReplying(!isReplying)}
            >
              <Icon name="reply" size="sm" />
              Reply
            </Button>
          )}
          
          <Button 
            variant="text" 
            size="small" 
            onClick={handleLike}
          >
            <Icon name={liked ? "heart-fill" : "heart"} size="sm" />
            {likeCount > 0 && likeCount}
          </Button>
          
          {(canEdit || canDelete) && (
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="text" size="small">
                  <Icon name="more-horizontal" size="sm" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                {canEdit && (
                  <Dropdown.Item onClick={() => setIsEditing(true)}>
                    <Icon name="edit" size="sm" />
                    Edit
                  </Dropdown.Item>
                )}
                {canDelete && (
                  <Dropdown.Item onClick={() => onDelete && onDelete(id)}>
                    <Icon name="trash" size="sm" />
                    Delete
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      
      {isReplying && (
        <div className={COMMENT_SECTION_FORM_CLASS}>
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className={COMMENT_SECTION_FORM_TEXTAREA_CLASS}
          />
          <div className={COMMENT_SECTION_FORM_ACTIONS_CLASS}>
            <Button 
              variant="secondary" 
              size="small" 
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleReplySubmit}
              disabled={!replyText.trim()}
            >
              Reply
            </Button>
          </div>
        </div>
      )}
      
      {replies.length > 0 && (
        <Stack spacing="md" marginTop="md">
          {replies.map(reply => (
            <Comment
              key={reply.id}
              {...reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onLike={onLike}
              canEdit={canEdit}
              canDelete={canDelete}
              canReply={canReply}
            />
          ))}
        </Stack>
      )}
    </div>
  );
};

Comment.propTypes = {
  /** Unique identifier for the comment */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Author name */
  author: PropTypes.string.isRequired,
  /** Author avatar URL */
  authorAvatar: PropTypes.string,
  /** Comment content */
  content: PropTypes.string.isRequired,
  /** Timestamp (string or Date object) */
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  /** Array of reply comments */
  replies: PropTypes.array,
  /** Comment type */
  type: PropTypes.oneOf(Object.values(COMMENT_SECTION_COMMENT_TYPES)),
  /** Number of likes */
  likes: PropTypes.number,
  /** Function to handle reply action */
  onReply: PropTypes.func,
  /** Function to handle edit action */
  onEdit: PropTypes.func,
  /** Function to handle delete action */
  onDelete: PropTypes.func,
  /** Function to handle like action */
  onLike: PropTypes.func,
  /** Whether the current user can edit this comment */
  canEdit: PropTypes.bool,
  /** Whether the current user can delete this comment */
  canDelete: PropTypes.bool,
  /** Whether replies are allowed */
  canReply: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * CommentSection Component
 * 
 * A comprehensive component for displaying and managing comments and discussions.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} CommentSection component
 */
const CommentSection = ({
  title = 'Comments',
  subtitle,
  comments = [],
  loading = false,
  error = null,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onReplyToComment,
  onLikeComment,
  onSortChange,
  variant = COMMENT_SECTION_VARIANTS.DEFAULT,
  size = COMMENT_SECTION_SIZES.MEDIUM,
  sortOptions = Object.values(COMMENT_SECTION_SORT_OPTIONS),
  defaultSortOption = COMMENT_SECTION_SORT_OPTIONS.NEWEST,
  placeholder = 'Write a comment...',
  submitLabel = 'Post',
  cancelLabel = 'Cancel',
  emptyStateMessage = 'No comments yet. Be the first to comment!',
  loadingMessage = 'Loading comments...',
  errorMessage = 'Failed to load comments. Please try again later.',
  maxCommentLength = 1000,
  readOnly = false,
  disabled = false,
  className = '',
  extensions = [],
  ...props
}) => {
  // State
  const [commentText, setCommentText] = useState('');
  const [sortOption, setSortOption] = useState(defaultSortOption);
  const [sortedComments, setSortedComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sort comments based on the selected sort option
  const sortComments = useCallback((commentsToSort, option) => {
    if (!commentsToSort || !commentsToSort.length) return [];
    
    const sorted = [...commentsToSort];
    
    switch (option) {
      case COMMENT_SECTION_SORT_OPTIONS.NEWEST:
        return sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case COMMENT_SECTION_SORT_OPTIONS.OLDEST:
        return sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case COMMENT_SECTION_SORT_OPTIONS.MOST_LIKED:
        return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case COMMENT_SECTION_SORT_OPTIONS.MOST_REPLIED:
        return sorted.sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0));
      default:
        return sorted;
    }
  }, []);

  // Update sorted comments when comments or sort option changes
  useEffect(() => {
    setSortedComments(sortComments(comments, sortOption));
  }, [comments, sortOption, sortComments]);

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
    if (onSortChange) {
      onSortChange(option);
    }
  };

  // Handle comment submission
  const handleSubmitComment = () => {
    if (!commentText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (onAddComment) {
        onAddComment(commentText);
      }
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('CommentSection', {
      title,
      subtitle,
      variant,
      size,
      readOnly,
      disabled,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('CommentSection: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      title,
      subtitle,
      variant,
      size,
      readOnly,
      disabled,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    title: extendedTitle,
    subtitle: extendedSubtitle,
    variant: extendedVariant,
    size: extendedSize,
    readOnly: extendedReadOnly,
    disabled: extendedDisabled,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const sectionClasses = [
    COMMENT_SECTION_CLASS,
    `${COMMENT_SECTION_CLASS}--${extendedVariant}`,
    `${COMMENT_SECTION_CLASS}--${extendedSize}`,
    loading ? `${COMMENT_SECTION_CLASS}--loading` : '',
    extendedDisabled ? `${COMMENT_SECTION_CLASS}--disabled` : '',
    extendedReadOnly ? `${COMMENT_SECTION_CLASS}--read-only` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');

  // Render loading state
  if (loading) {
    return (
      <div className={sectionClasses} {...restProps}>
        <div className={COMMENT_SECTION_HEADER_CLASS}>
          <div>
            <h3 className={COMMENT_SECTION_TITLE_CLASS}>{extendedTitle}</h3>
            {extendedSubtitle && <p className={COMMENT_SECTION_SUBTITLE_CLASS}>{extendedSubtitle}</p>}
          </div>
        </div>
        <div className={COMMENT_SECTION_LOADING_CLASS}>
          <Icon name="loader" size="lg" />
          <Text>{loadingMessage}</Text>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={sectionClasses} {...restProps}>
        <div className={COMMENT_SECTION_HEADER_CLASS}>
          <div>
            <h3 className={COMMENT_SECTION_TITLE_CLASS}>{extendedTitle}</h3>
            {extendedSubtitle && <p className={COMMENT_SECTION_SUBTITLE_CLASS}>{extendedSubtitle}</p>}
          </div>
        </div>
        <div className={COMMENT_SECTION_ERROR_CLASS}>
          <Icon name="alert-circle" size="lg" />
          <Text>{errorMessage}</Text>
          <Text variant="caption">{error.message || error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={sectionClasses} {...restProps}>
      {/* Header */}
      <div className={COMMENT_SECTION_HEADER_CLASS}>
        <div>
          <h3 className={COMMENT_SECTION_TITLE_CLASS}>{extendedTitle}</h3>
          {extendedSubtitle && <p className={COMMENT_SECTION_SUBTITLE_CLASS}>{extendedSubtitle}</p>}
        </div>
        
        {sortOptions.length > 0 && (
          <div className={COMMENT_SECTION_ACTIONS_CLASS}>
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="text" size="small">
                  <Icon name="sort" size="sm" />
                  Sort by: {sortOption.replace('-', ' ')}
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                {sortOptions.map(option => (
                  <Dropdown.Item 
                    key={option} 
                    onClick={() => handleSortChange(option)}
                    selected={sortOption === option}
                  >
                    {option.replace('-', ' ')}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      
      {/* Body */}
      <div className={COMMENT_SECTION_BODY_CLASS}>
        {sortedComments.length > 0 ? (
          <Stack spacing="md">
            {sortedComments.map(comment => (
              <Comment
                key={comment.id}
                {...comment}
                onReply={onReplyToComment}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
                onLike={onLikeComment}
                canEdit={!extendedReadOnly && !extendedDisabled}
                canDelete={!extendedReadOnly && !extendedDisabled}
                canReply={!extendedReadOnly && !extendedDisabled}
              />
            ))}
          </Stack>
        ) : (
          <div className={COMMENT_SECTION_EMPTY_CLASS}>
            <Icon name="message-circle" size="lg" />
            <Text>{emptyStateMessage}</Text>
          </div>
        )}
      </div>
      
      {/* Comment form */}
      {!extendedReadOnly && !extendedDisabled && (
        <div className={COMMENT_SECTION_FORM_CLASS}>
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={placeholder}
            maxLength={maxCommentLength}
            className={COMMENT_SECTION_FORM_TEXTAREA_CLASS}
          />
          <div className={COMMENT_SECTION_FORM_ACTIONS_CLASS}>
            {commentText.trim() && (
              <Button 
                variant="secondary" 
                size="small" 
                onClick={() => setCommentText('')}
              >
                {cancelLabel}
              </Button>
            )}
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : submitLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  /** Section title */
  title: PropTypes.string,
  /** Section subtitle */
  subtitle: PropTypes.string,
  /** Array of comment objects */
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    replies: PropTypes.array,
    type: PropTypes.oneOf(Object.values(COMMENT_SECTION_COMMENT_TYPES)),
    likes: PropTypes.number
  })),
  /** Whether comments are loading */
  loading: PropTypes.bool,
  /** Error object or message */
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Function to handle adding a new comment */
  onAddComment: PropTypes.func,
  /** Function to handle editing a comment */
  onEditComment: PropTypes.func,
  /** Function to handle deleting a comment */
  onDeleteComment: PropTypes.func,
  /** Function to handle replying to a comment */
  onReplyToComment: PropTypes.func,
  /** Function to handle liking a comment */
  onLikeComment: PropTypes.func,
  /** Function to handle sort option change */
  onSortChange: PropTypes.func,
  /** Component variant */
  variant: PropTypes.oneOf(Object.values(COMMENT_SECTION_VARIANTS)),
  /** Component size */
  size: PropTypes.oneOf(Object.values(COMMENT_SECTION_SIZES)),
  /** Available sort options */
  sortOptions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(COMMENT_SECTION_SORT_OPTIONS))),
  /** Default sort option */
  defaultSortOption: PropTypes.oneOf(Object.values(COMMENT_SECTION_SORT_OPTIONS)),
  /** Placeholder text for the comment input */
  placeholder: PropTypes.string,
  /** Label for the submit button */
  submitLabel: PropTypes.string,
  /** Label for the cancel button */
  cancelLabel: PropTypes.string,
  /** Message to display when there are no comments */
  emptyStateMessage: PropTypes.string,
  /** Message to display when comments are loading */
  loadingMessage: PropTypes.string,
  /** Message to display when there is an error loading comments */
  errorMessage: PropTypes.string,
  /** Maximum length of a comment */
  maxCommentLength: PropTypes.number,
  /** Whether the comment section is read-only */
  readOnly: PropTypes.bool,
  /** Whether the comment section is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the component */
  extensions: PropTypes.arrayOf(PropTypes.string)
};

export default CommentSection;
