import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Avatar from '../../atoms/Avatar';
import Icon from '../../atoms/Icon';
import Flex from '../../atoms/Flex';
import Textarea from '../Textarea';
import Tooltip from '../Tooltip';
import useResponsiveProps from '../../utilities/responsive-props';
import { 
  COMMENT_THREAD_VARIANTS, 
  COMMENT_THREAD_SIZES, 
  COMMENT_THREAD_CONNECTOR_TYPES,
  COMMENT_THREAD_CONNECTOR_COLORS,
  COMMENT_THREAD_ACTIONS,
  COMMENT_THREAD_REACTION_TYPES,
  MAX_NESTING_DEPTH,
  DEFAULT_PROPS
} from './constants';
import './CommentThread.css';

/**
 * CommentItem Component
 * 
 * Displays a single comment with options to reply, edit, delete, and react
 */
const CommentItem = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onReport,
  onReaction,
  depth = 0,
  isLastInThread = true,
  variant,
  size,
  showReactions,
  showTimestamp,
  showAuthor,
  allowReply,
  allowEdit,
  allowDelete,
  allowReport,
  allowReactions,
  className,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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

  const handleEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleReply = (replyContent) => {
    onReply(comment.id, replyContent);
    setShowReplyForm(false);
  };

  const handleReaction = (reactionType) => {
    onReaction(comment.id, reactionType);
  };

  // Determine if the user is the author of the comment
  const isAuthor = comment.userId === (comment.currentUserId || '');
  
  // Determine if the user has already reacted with a specific reaction
  const hasReacted = (reactionType) => {
    return comment.reactions && 
           comment.reactions[reactionType] && 
           comment.reactions[reactionType].users && 
           comment.reactions[reactionType].users.includes(comment.currentUserId || '');
  };

  return (
    <Box 
      className={`ui-comment-thread__content ui-comment-thread--${variant} ui-comment-thread--${size} ${className || ''}`}
      {...restProps}
    >
      <Flex className="ui-comment-thread__header" justifyContent="space-between" alignItems="center">
        {showAuthor && (
          <Flex className="ui-comment-thread__author-info" alignItems="center" gap="xs">
            {comment.userAvatar && (
              <Avatar 
                src={comment.userAvatar} 
                alt={comment.userName || 'User'} 
                size={size === COMMENT_THREAD_SIZES.SMALL ? 'xs' : size === COMMENT_THREAD_SIZES.LARGE ? 'md' : 'sm'} 
              />
            )}
            <Text className="ui-comment-thread__author" fontWeight="semibold">
              {comment.userName || 'Anonymous'}
            </Text>
            {comment.userRole && (
              <Text className={`ui-comment-thread__user-role ${comment.userRole}`} fontSize="xs">
                {comment.userRole}
              </Text>
            )}
          </Flex>
        )}
        
        <Flex className="ui-comment-thread__meta" alignItems="center" gap="xs">
          {showTimestamp && (
            <Text className="ui-comment-thread__date" fontSize="xs" color="subtle">
              {formatDate(comment.createdAt)}
            </Text>
          )}
          {comment.updatedAt && (
            <Text className="ui-comment-thread__edited" fontSize="xs" color="subtle">
              (edited)
            </Text>
          )}
          
          <Flex gap="xs">
            {allowEdit && isAuthor && (
              <Tooltip content="Edit">
                <Button 
                  className="ui-comment-thread__action-button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit comment"
                >
                  <Icon name="edit" size="sm" />
                </Button>
              </Tooltip>
            )}
            
            {allowDelete && isAuthor && (
              <Tooltip content="Delete">
                <Button 
                  className="ui-comment-thread__action-button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(comment.id)}
                  aria-label="Delete comment"
                >
                  <Icon name="trash" size="sm" />
                </Button>
              </Tooltip>
            )}
            
            {allowReport && !isAuthor && (
              <Tooltip content="Report">
                <Button 
                  className="ui-comment-thread__action-button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onReport(comment.id)}
                  aria-label="Report comment"
                >
                  <Icon name="flag" size="sm" />
                </Button>
              </Tooltip>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Box className="ui-comment-thread__body">
        {isEditing ? (
          <Box>
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              placeholder="Edit your comment..."
              autoFocus
            />
            <Flex gap="sm" mt="sm">
              <Button size="sm" onClick={handleEdit}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Flex>
          </Box>
        ) : (
          <Text>{comment.content}</Text>
        )}
      </Box>

      <Flex className="ui-comment-thread__footer" justifyContent="space-between" alignItems="center">
        {showReactions && allowReactions && (
          <Flex className="ui-comment-thread__reactions" gap="xs">
            {Object.entries(comment.reactions || {}).map(([reaction, data]) => (
              <Button
                key={reaction}
                className={`ui-comment-thread__reaction-button ${hasReacted(reaction) ? 'ui-comment-thread__reaction-button--active' : ''}`}
                variant="ghost"
                size="xs"
                onClick={() => handleReaction(reaction)}
                aria-label={`React with ${reaction}`}
              >
                {reaction} {data.count > 0 && <span>{data.count}</span>}
              </Button>
            ))}
            <Tooltip content="Add reaction">
              <Button
                className="ui-comment-thread__reaction-button"
                variant="ghost"
                size="xs"
                onClick={() => {/* Show reaction picker */}}
                aria-label="Add reaction"
              >
                <Icon name="plus" size="xs" />
              </Button>
            </Tooltip>
          </Flex>
        )}

        {allowReply && (
          <Flex className="ui-comment-thread__actions" gap="xs">
            <Button
              className="ui-comment-thread__action-button"
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              aria-label="Reply to comment"
            >
              Reply
            </Button>
          </Flex>
        )}
      </Flex>

      {showReplyForm && (
        <Box className="ui-comment-thread__reply-form">
          <Textarea
            placeholder="Write a reply..."
            rows={3}
            autoFocus
            onChange={(e) => {/* Handle reply content change */}}
          />
          <Flex gap="sm" mt="sm">
            <Button size="sm" onClick={() => handleReply("Reply content")}>Reply</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowReplyForm(false)}>Cancel</Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

/**
 * CommentThread Component
 * 
 * Displays a comment and its nested replies
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const CommentThread = ({
  comment,
  replies = [],
  onReply,
  onEdit,
  onDelete,
  onReport,
  onReaction,
  depth = 0,
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  connectorType = DEFAULT_PROPS.connectorType,
  connectorColor = DEFAULT_PROPS.connectorColor,
  maxNestingDepth = DEFAULT_PROPS.maxNestingDepth,
  showReplyForm = DEFAULT_PROPS.showReplyForm,
  showReactions = DEFAULT_PROPS.showReactions,
  showTimestamp = DEFAULT_PROPS.showTimestamp,
  showAuthor = DEFAULT_PROPS.showAuthor,
  allowReply = DEFAULT_PROPS.allowReply,
  allowEdit = DEFAULT_PROPS.allowEdit,
  allowDelete = DEFAULT_PROPS.allowDelete,
  allowReport = DEFAULT_PROPS.allowReport,
  allowReactions = DEFAULT_PROPS.allowReactions,
  className,
  ...restProps
}) => {
  // Apply responsive props
  const responsiveProps = useResponsiveProps({
    variant,
    size,
    connectorType,
    connectorColor,
    maxNestingDepth,
    showReplyForm,
    showReactions,
    showTimestamp,
    showAuthor,
    allowReply,
    allowEdit,
    allowDelete,
    allowReport,
    allowReactions,
  });

  // Limit nesting depth
  const effectiveDepth = Math.min(depth, responsiveProps.maxNestingDepth);
  const canNestFurther = effectiveDepth < responsiveProps.maxNestingDepth;

  return (
    <Box className={`ui-comment-thread ${className || ''}`} {...restProps}>
      <CommentItem
        comment={comment}
        onReply={onReply}
        onEdit={onEdit}
        onDelete={onDelete}
        onReport={onReport}
        onReaction={onReaction}
        depth={effectiveDepth}
        isLastInThread={replies.length === 0}
        variant={responsiveProps.variant}
        size={responsiveProps.size}
        showReactions={responsiveProps.showReactions}
        showTimestamp={responsiveProps.showTimestamp}
        showAuthor={responsiveProps.showAuthor}
        allowReply={responsiveProps.allowReply && canNestFurther}
        allowEdit={responsiveProps.allowEdit}
        allowDelete={responsiveProps.allowDelete}
        allowReport={responsiveProps.allowReport}
        allowReactions={responsiveProps.allowReactions}
      />
      
      {replies.length > 0 && (
        <Box 
          className={`ui-comment-thread__replies ui-comment-thread__replies--${responsiveProps.connectorType} ui-comment-thread__replies--${responsiveProps.connectorColor} ui-comment-thread__replies--depth-${effectiveDepth}`}
        >
          {replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              replies={reply.replies || []}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onReport={onReport}
              onReaction={onReaction}
              depth={effectiveDepth + 1}
              variant={responsiveProps.variant}
              size={responsiveProps.size}
              connectorType={responsiveProps.connectorType}
              connectorColor={responsiveProps.connectorColor}
              maxNestingDepth={responsiveProps.maxNestingDepth}
              showReplyForm={responsiveProps.showReplyForm}
              showReactions={responsiveProps.showReactions}
              showTimestamp={responsiveProps.showTimestamp}
              showAuthor={responsiveProps.showAuthor}
              allowReply={responsiveProps.allowReply}
              allowEdit={responsiveProps.allowEdit}
              allowDelete={responsiveProps.allowDelete}
              allowReport={responsiveProps.allowReport}
              allowReactions={responsiveProps.allowReactions}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

CommentThread.propTypes = {
  /** The main comment data */
  comment: PropTypes.shape({
    /** Unique identifier for the comment */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** User ID of the comment author */
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Current user ID for permission checks */
    currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Display name of the comment author */
    userName: PropTypes.string,
    /** Role of the comment author (e.g., 'admin', 'moderator', 'user') */
    userRole: PropTypes.string,
    /** Avatar URL of the comment author */
    userAvatar: PropTypes.string,
    /** Content of the comment */
    content: PropTypes.string.isRequired,
    /** Creation timestamp */
    createdAt: PropTypes.string.isRequired,
    /** Last update timestamp */
    updatedAt: PropTypes.string,
    /** Reactions to the comment */
    reactions: PropTypes.objectOf(
      PropTypes.shape({
        /** Number of users who reacted */
        count: PropTypes.number,
        /** Array of user IDs who reacted */
        users: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      })
    ),
  }).isRequired,
  /** Array of direct replies to this comment */
  replies: PropTypes.array,
  /** Function to call when replying to a comment */
  onReply: PropTypes.func,
  /** Function to call when editing a comment */
  onEdit: PropTypes.func,
  /** Function to call when deleting a comment */
  onDelete: PropTypes.func,
  /** Function to call when reporting a comment */
  onReport: PropTypes.func,
  /** Function to call when reacting to a comment */
  onReaction: PropTypes.func,
  /** Depth of this thread in the overall discussion */
  depth: PropTypes.number,
  /** Visual variant of the comment thread */
  variant: PropTypes.oneOf(Object.values(COMMENT_THREAD_VARIANTS)),
  /** Size variant of the comment thread */
  size: PropTypes.oneOf(Object.values(COMMENT_THREAD_SIZES)),
  /** Type of connector line between parent and child comments */
  connectorType: PropTypes.oneOf(Object.values(COMMENT_THREAD_CONNECTOR_TYPES)),
  /** Color of connector line between parent and child comments */
  connectorColor: PropTypes.oneOf(Object.values(COMMENT_THREAD_CONNECTOR_COLORS)),
  /** Maximum nesting depth for replies */
  maxNestingDepth: PropTypes.number,
  /** Whether to show the reply form by default */
  showReplyForm: PropTypes.bool,
  /** Whether to show reactions */
  showReactions: PropTypes.bool,
  /** Whether to show timestamps */
  showTimestamp: PropTypes.bool,
  /** Whether to show author information */
  showAuthor: PropTypes.bool,
  /** Whether to allow replying to comments */
  allowReply: PropTypes.bool,
  /** Whether to allow editing comments */
  allowEdit: PropTypes.bool,
  /** Whether to allow deleting comments */
  allowDelete: PropTypes.bool,
  /** Whether to allow reporting comments */
  allowReport: PropTypes.bool,
  /** Whether to allow reacting to comments */
  allowReactions: PropTypes.bool,
  /** Additional class name */
  className: PropTypes.string,
};

CommentThread.defaultProps = DEFAULT_PROPS;

export default CommentThread;
