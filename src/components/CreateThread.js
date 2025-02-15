import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateThread.css';

const CreateThread = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [thread, setThread] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThread(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically make an API call to save the thread
    // For now, we'll just simulate success and navigate back
    
    const tags = thread.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newThread = {
      ...thread,
      tags,
      categoryId,
      createdAt: new Date().toISOString(),
      author: 'CurrentUser', // This would come from auth context
    };

    console.log('New thread:', newThread);
    
    // Navigate back to the forum topic page
    navigate(`/forums/${categoryId}`);
  };

  return (
    <div className="create-thread-container">
      <h1>Start a New Discussion</h1>
      
      <form onSubmit={handleSubmit} className="thread-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={thread.title}
            onChange={handleChange}
            placeholder="Give your discussion a clear, descriptive title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={thread.content}
            onChange={handleChange}
            placeholder="Share your thoughts, questions, or insights..."
            rows="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={thread.tags}
            onChange={handleChange}
            placeholder="Add tags separated by commas (e.g., beginner, technique, advice)"
          />
          <small className="form-help">
            Help others find your discussion by adding relevant tags
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate(`/forums/${categoryId}`)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Thread
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateThread;
