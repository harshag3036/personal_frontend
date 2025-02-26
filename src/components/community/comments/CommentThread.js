import React from 'react';
import { CommentItem } from './';
import '../CommentSection.css';

/**
 * CommentThread Component
 * 
 * Displays a comment and its nested replies
 * 
 * @param {Object} props
 * @param {Object} props.comment - The main comment data
 * @param {Array} props.replies - Array of direct replies to this comment
 * @param {Function} props.onReply - Function to call when replying to a comment
 * @param {Array} props.allComments - Array of all comments in the discussion
 * @param {number} [props.depth] - Depth of this thread in the overall discussion
 * @param {Object} [props.template] - Template for structured comments
 */
const CommentThread = ({ 
  comment, 
  replies, 
  onReply, 
  allComments, 
  depth = 0, 
  template = null 
}) => {
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
          {replies.map((reply) => (
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

export default CommentThread;
