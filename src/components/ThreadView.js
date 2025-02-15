import React, { useState } from 'react';
import { Paper, Typography, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArticleReference from './ArticleReference';
import './ThreadView.css';

// Sample related articles
const relatedArticles = [
  {
    id: 'emotional-readiness',
    title: 'Understanding Emotional Readiness',
    description: 'Learn about the role of emotions in self-discovery'
  },
  {
    id: 'unlearning-intro',
    title: 'Introduction to Unlearning',
    description: 'Understand the process of letting go of limiting beliefs'
  }
];

// Updated sample thread with article references
const sampleThread = {
  id: 1,
  title: 'Getting Started with Watercolor Painting',
  author: 'ArtisticSoul',
  content: `I've been working on understanding my emotional state better, and I found the article on emotional readiness particularly helpful. Here are some key points that resonated with me:

1. Understanding our current emotional state is crucial
2. Creating space for new insights
3. Building self-awareness
4. Recognizing patterns

What are your experiences with emotional awareness? Any additional insights to share?`,
  articleReferences: ['emotional-readiness'],
  createdAt: '2024-01-30T10:00:00',
  likes: 45,
  comments: [
    {
      id: 1,
      author: 'WatercolorPro',
      content: 'Great insights! The unlearning process has been crucial for my emotional growth. I recommend checking out the introduction to unlearning article as well.',
      articleReferences: ['unlearning-intro'],
      createdAt: '2024-01-30T11:30:00',
      likes: 12
    },
    {
      id: 2,
      author: 'BeginnerArtist',
      content: 'Thanks for sharing! The emotional readiness article really helped me too. Could you share more about how you apply these concepts in daily life?',
      articleReferences: ['emotional-readiness'],
      createdAt: '2024-01-30T12:15:00',
      likes: 8
    }
  ]
};

const ThreadView = () => {
  const [thread, setThread] = useState(sampleThread);
  const [newComment, setNewComment] = useState('');
  const [showArticleSelector, setShowArticleSelector] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: thread.comments.length + 1,
      author: 'CurrentUser', // This would come from auth context in a real app
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      articleReferences: selectedArticles
    };

    setThread(prev => ({
      ...prev,
      comments: [...prev.comments, newCommentObj]
    }));
    setNewComment('');
    setSelectedArticles([]);
    setShowArticleSelector(false);
  };

  const handleArticleSelect = (articleId) => {
    if (!selectedArticles.includes(articleId)) {
      setSelectedArticles(prev => [...prev, articleId]);
    }
  };

  return (
    <div className="thread-view-container">
      <div className="thread-layout">
        <div className="thread-main">
          <Paper elevation={3} className="thread-paper">
            <div className="thread-main-content">
              <h1 className="thread-title">{thread.title}</h1>
              <div className="thread-metadata">
                <span className="author">Posted by {thread.author}</span>
                <span className="date">{formatDate(thread.createdAt)}</span>
              </div>
              <div className="thread-content">
                {thread.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {thread.articleReferences?.map(articleId => (
                  <ArticleReference
                    key={articleId}
                    articleId={articleId}
                    title={relatedArticles.find(a => a.id === articleId)?.title || ''}
                    description={relatedArticles.find(a => a.id === articleId)?.description || ''}
                  />
                ))}
              </div>
              <div className="thread-actions">
                <button className="action-btn">
                  <span className="icon">👍</span> {thread.likes}
                </button>
                <button className="action-btn">
                  <span className="icon">💬</span> {thread.comments.length}
                </button>
                <button className="action-btn">
                  <span className="icon">🔖</span> Save
                </button>
                <button className="action-btn">
                  <span className="icon">📤</span> Share
                </button>
              </div>
            </div>
          </Paper>

          <div className="comments-section">
            <h2>Comments ({thread.comments.length})</h2>
            
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <div className="comment-input-container">
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="4"
                />
                <div className="comment-actions-row">
                  <Tooltip title="Reference an article">
                    <IconButton 
                      onClick={() => setShowArticleSelector(!showArticleSelector)} 
                      className="add-reference-btn"
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <button type="submit" className="submit-btn">Post Comment</button>
                </div>
                {showArticleSelector && (
                  <Paper className="article-selector">
                    <Typography variant="subtitle2" gutterBottom>
                      Reference an article:
                    </Typography>
                    {relatedArticles.map(article => (
                      <div 
                        key={article.id} 
                        className={`article-option ${selectedArticles.includes(article.id) ? 'selected' : ''}`}
                        onClick={() => handleArticleSelect(article.id)}
                      >
                        {article.title}
                      </div>
                    ))}
                  </Paper>
                )}
              </div>
            </form>

            <div className="comments-list">
              {thread.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                  <div className="comment-content">
                    <div>{comment.content}</div>
                    {comment.articleReferences?.map(articleId => (
                      <ArticleReference
                        key={articleId}
                        articleId={articleId}
                        title={relatedArticles.find(a => a.id === articleId)?.title || ''}
                        description={relatedArticles.find(a => a.id === articleId)?.description || ''}
                        inline={true}
                      />
                    ))}
                  </div>
                  <div className="comment-actions">
                    <button className="action-btn">
                      <span className="icon">👍</span> {comment.likes}
                    </button>
                    <button className="action-btn">Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="thread-sidebar">
          <Paper elevation={2} className="related-articles">
            <Typography variant="h6" gutterBottom>
              Related Articles
            </Typography>
            {relatedArticles.map(article => (
              <ArticleReference
                key={article.id}
                articleId={article.id}
                title={article.title}
                description={article.description}
              />
            ))}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ThreadView;
