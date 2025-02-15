import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForumTopic.css';

const sampleThreads = [
  {
    id: 1,
    title: 'Getting Started with Watercolor Painting',
    author: 'ArtisticSoul',
    replies: 23,
    views: 156,
    lastActivity: '2 hours ago',
    isPinned: true
  },
  {
    id: 2,
    title: 'Best Brushes for Beginners',
    author: 'CreativeSpirit',
    replies: 15,
    views: 98,
    lastActivity: '5 hours ago',
    isPinned: false
  },
  {
    id: 3,
    title: 'Color Theory Basics',
    author: 'ColorMaster',
    replies: 45,
    views: 289,
    lastActivity: '1 day ago',
    isPinned: false
  }
];

const ForumTopic = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState('recent');
  const [threads, setThreads] = useState(sampleThreads);

  const sortThreads = (method) => {
    setSortBy(method);
    let sortedThreads = [...threads];
    
    switch(method) {
      case 'popular':
        sortedThreads.sort((a, b) => b.views - a.views);
        break;
      case 'mostReplies':
        sortedThreads.sort((a, b) => b.replies - a.replies);
        break;
      default: // recent
        sortedThreads.sort((a, b) => a.lastActivity.localeCompare(b.lastActivity));
    }
    
    // Always keep pinned threads at top
    sortedThreads.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    setThreads(sortedThreads);
  };

  const handleThreadClick = (threadId) => {
    navigate(`/forums/${categoryId}/thread/${threadId}`);
  };

  return (
    <div className="forum-topic-container">
      <div className="topic-header">
        <h1>{categoryId}</h1>
        <button 
          className="create-thread-btn"
          onClick={() => navigate(`/forums/${categoryId}/create`)}
        >
          Create New Thread
        </button>
      </div>

      <div className="thread-controls">
        <div className="sort-controls">
          <span>Sort by: </span>
          <select value={sortBy} onChange={(e) => sortThreads(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="mostReplies">Most Replies</option>
          </select>
        </div>
      </div>

      <div className="threads-list">
        {threads.map(thread => (
          <div 
            key={thread.id} 
            className={`thread-item ${thread.isPinned ? 'pinned' : ''}`}
            onClick={() => handleThreadClick(thread.id)}
          >
            {thread.isPinned && <span className="pin-indicator">📌</span>}
            <div className="thread-main">
              <h3 className="thread-title">{thread.title}</h3>
              <span className="thread-author">by {thread.author}</span>
            </div>
            <div className="thread-stats">
              <div className="stat">
                <span className="stat-number">{thread.replies}</span>
                <span className="stat-label">Replies</span>
              </div>
              <div className="stat">
                <span className="stat-number">{thread.views}</span>
                <span className="stat-label">Views</span>
              </div>
              <div className="last-activity">
                <span>Last activity: {thread.lastActivity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumTopic;
