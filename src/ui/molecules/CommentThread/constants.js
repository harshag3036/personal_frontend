/**
 * CommentThread Component Constants
 * 
 * This file contains constants used by the CommentThread component.
 */

// Comment thread variants
export const COMMENT_THREAD_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  EXPANDED: 'expanded',
};

// Comment thread sizes
export const COMMENT_THREAD_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Comment thread depths
export const MAX_NESTING_DEPTH = 5;

// Comment thread connector types
export const COMMENT_THREAD_CONNECTOR_TYPES = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
};

// Comment thread connector colors
export const COMMENT_THREAD_CONNECTOR_COLORS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  NEUTRAL: 'neutral',
};

// Comment thread actions
export const COMMENT_THREAD_ACTIONS = {
  REPLY: 'reply',
  EDIT: 'edit',
  DELETE: 'delete',
  REPORT: 'report',
  REACT: 'react',
};

// Comment thread reaction types
export const COMMENT_THREAD_REACTION_TYPES = {
  LIKE: 'like',
  LOVE: 'love',
  HAHA: 'haha',
  WOW: 'wow',
  SAD: 'sad',
  ANGRY: 'angry',
  THUMBS_UP: 'thumbs_up',
  THUMBS_DOWN: 'thumbs_down',
};

// Default props
export const DEFAULT_PROPS = {
  variant: COMMENT_THREAD_VARIANTS.DEFAULT,
  size: COMMENT_THREAD_SIZES.MEDIUM,
  connectorType: COMMENT_THREAD_CONNECTOR_TYPES.SOLID,
  connectorColor: COMMENT_THREAD_CONNECTOR_COLORS.DEFAULT,
  maxNestingDepth: MAX_NESTING_DEPTH,
  showReplyForm: false,
  showReactions: true,
  showTimestamp: true,
  showAuthor: true,
  allowReply: true,
  allowEdit: true,
  allowDelete: true,
  allowReport: true,
  allowReactions: true,
};
