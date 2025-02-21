import React, { useState } from 'react';
import './DiscussionBoard.css';

/**
 * DiscussionBoard Component
 * Creates a space for meaningful discussions and self-discovery
 * Uses pattern recognition to help users see their own patterns
 */
const DiscussionBoard = ({ activity, onUpdateActivity }) => {
  const [newPost, setNewPost] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showPatternNotice, setShowPatternNotice] = useState(false);
  const [patternFeedback, setPatternFeedback] = useState(null);

  const guidelines = [
    'Share from personal experience rather than theory',
    'Notice patterns in your thoughts and reactions',
    'Ask questions that lead to deeper understanding',
    'Listen to understand, not to respond',
    'Take time to reflect before posting',
    'Be aware of seeking validation or approval',
    'Notice when you are avoiding something uncomfortable'
  ];

  const patternNotice = {
    title: "A Note About Patterns",
    content: `This discussion space uses pattern recognition to offer reflections and prompts. 
    Like an AI, we humans often operate on patterns - seeking approval, avoiding discomfort, 
    looking for the "right" answer. The difference is that we can become aware of our patterns. 
    As you engage here, notice your patterns: Are you trying to sound wise? Seeking validation? 
    Avoiding something? This awareness itself is the beginning of understanding.`
  };

  const patterns = {
    seekingValidation: {
      indicators: ['am i right', 'is this correct', 'what do you think', 'please help'],
      reflection: "Notice the desire for external validation. What would it mean to trust your own understanding?"
    },
    intellectualizing: {
      indicators: ['i think', 'in theory', 'according to', 'studies show'],
      reflection: "You're sharing from the intellect. What's your direct experience of this?"
    },
    avoidance: {
      indicators: ['but', 'however', 'instead', 'rather than'],
      reflection: "Notice the movement away. What might you be avoiding looking at?"
    },
    judgment: {
      indicators: ['should', 'must', 'always', 'never'],
      reflection: "There's a judgment here. Can you look at this situation without judgment?"
    }
  };

  const detectPatterns = (text) => {
    const lowerText = text.toLowerCase();
    let detectedPatterns = [];

    Object.entries(patterns).forEach(([key, pattern]) => {
      if (pattern.indicators.some(indicator => lowerText.includes(indicator.toLowerCase()))) {
        detectedPatterns.push({
          type: key,
          reflection: pattern.reflection
        });
      }
    });

    return detectedPatterns;
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setNewPost(text);

    // Only show pattern feedback after a meaningful amount of text
    if (text.length > 30) {
      const detected = detectPatterns(text);
      if (detected.length > 0) {
        setPatternFeedback(detected[0]); // Show one pattern at a time
      } else {
        setPatternFeedback(null);
      }
    } else {
      setPatternFeedback(null);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newPost.trim()) {
      setError('Please enter a message');
      return;
    }

    if (newPost.length < 20 && !replyTo) {
      setError('Consider sharing more context or detail in your post');
      return;
    }

    try {
      const detectedPatterns = detectPatterns(newPost);
      const post = {
        id: Date.now(),
        content: newPost.trim(),
        authorId: 'current-user',
        createdAt: new Date().toISOString(),
        replyTo: replyTo,
        reactions: [],
        isEdited: false,
        patterns: detectedPatterns,
        reflectionPrompt: detectedPatterns.length > 0 ? detectedPatterns[0].reflection : null
      };

      const updatedActivity = {
        ...activity,
        discussions: [...(activity.discussions || []), post]
      };

      await onUpdateActivity(updatedActivity);
      setNewPost('');
      setReplyTo(null);
      setPatternFeedback(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReact = async (postId, reaction) => {
    try {
      const updatedActivity = {
        ...activity,
        discussions: activity.discussions.map(post => {
          if (post.id === postId) {
            const hasReaction = post.reactions.some(r => 
              r.userId === 'current-user' && r.type === reaction
            );

            const reactions = hasReaction
              ? post.reactions.filter(r => 
                  !(r.userId === 'current-user' && r.type === reaction)
                )
              : [...post.reactions, {
                  userId: 'current-user',
                  type: reaction,
                  createdAt: new Date().toISOString()
                }];

            return { ...post, reactions };
          }
          return post;
        })
      };

      await onUpdateActivity(updatedActivity);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderPost = (post, depth = 0) => {
    const replies = activity.discussions.filter(p => p.replyTo === post.id);
    const maxDepth = 5; // Allow deeper conversations

    return (
      <div
        key={post.id}
        className={`post-container depth-${depth}`}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div className="post-card">
          <div className="post-content">
            <p>{post.content}</p>
            {post.reflectionPrompt && (
              <div className="reflection-prompt">
                <p>{post.reflectionPrompt}</p>
              </div>
            )}
          </div>

          <div className="post-meta">
            <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="post-actions">
            <div className="reactions">
              <button
                className={`reaction-button insight ${post.reactions.some(r => r.type === 'insight')}`}
                onClick={() => handleReact(post.id, 'insight')}
                title="This gave me an insight"
              >
                💡
              </button>
              <button
                className={`reaction-button resonates ${post.reactions.some(r => r.type === 'resonates')}`}
                onClick={() => handleReact(post.id, 'resonates')}
                title="This resonates with me"
              >
                🌊
              </button>
              <button
                className={`reaction-button gratitude ${post.reactions.some(r => r.type === 'gratitude')}`}
                onClick={() => handleReact(post.id, 'gratitude')}
                title="Grateful for this sharing"
              >
                🙏
              </button>
            </div>

            {depth < maxDepth && (
              <button
                className="reply-button"
                onClick={() => setReplyTo(post.id)}
              >
                Share Your Perspective
              </button>
            )}
          </div>
        </div>

        {replies.length > 0 && (
          <div className="replies">
            {replies.map(reply => renderPost(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const topLevelPosts = activity.discussions?.filter(post => !post.replyTo) || [];

  return (
    <div className="discussion-board">
      <div className="discussion-header">
        <h2>Shared Exploration</h2>
        <div className="header-controls">
          <button 
            className="pattern-notice-toggle"
            onClick={() => setShowPatternNotice(!showPatternNotice)}
          >
            {showPatternNotice ? 'Hide Pattern Notice' : 'About Patterns'}
          </button>
          <button 
            className="guidelines-toggle"
            onClick={() => setShowGuidelines(!showGuidelines)}
          >
            {showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}
          </button>
        </div>
      </div>

      {showPatternNotice && (
        <div className="pattern-notice">
          <h3>{patternNotice.title}</h3>
          <p>{patternNotice.content}</p>
        </div>
      )}

      {showGuidelines && (
        <div className="guidelines">
          <h3>Guidelines for Meaningful Discussion</h3>
          <ul>
            {guidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleAddPost} className="post-form">
        <div className="form-group">
          {replyTo && (
            <div className="reply-header">
              <span>Sharing your perspective</span>
              <button
                type="button"
                className="cancel-reply"
                onClick={() => setReplyTo(null)}
              >
                Cancel
              </button>
            </div>
          )}
          <textarea
            value={newPost}
            onChange={handleTextChange}
            placeholder={replyTo 
              ? "Share your perspective or experience..."
              : "What's on your mind? Share your experience or ask a question..."
            }
            rows={4}
            required
          />
          <div className="character-count">
            {newPost.length} characters
            {!replyTo && newPost.length < 20 && newPost.length > 0 && (
              <span className="suggestion"> - Consider adding more context</span>
            )}
          </div>
          {patternFeedback && (
            <div className="pattern-feedback">
              <p>{patternFeedback.reflection}</p>
              <small>This is a pattern observation, not a judgment. You can choose to post as is or reflect further.</small>
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {replyTo ? 'Share Perspective' : 'Start Discussion'}
          </button>
        </div>
      </form>

      <div className="posts-list">
        {topLevelPosts.length > 0 ? (
          topLevelPosts.map(post => renderPost(post))
        ) : (
          <div className="empty-state">
            <p>No discussions yet</p>
            <p>Share your experience or ask a question to start the exploration</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionBoard;
