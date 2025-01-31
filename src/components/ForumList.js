import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumList.css';

const forumCategories = [
  {
    id: 1,
    name: 'Arts & Crafts',
    description: 'Explore various forms of artistic expression and crafting',
    threads: 156,
    members: 1200
  },
  {
    id: 2,
    name: 'Technology',
    description: 'Discuss programming, gadgets, and tech innovations',
    threads: 243,
    members: 1800
  },
  {
    id: 3,
    name: 'Fitness & Wellness',
    description: 'Share fitness tips, workout routines, and wellness practices',
    threads: 189,
    members: 1500
  },
  {
    id: 4,
    name: 'Photography',
    description: 'Learn about photography techniques and share your work',
    threads: 134,
    members: 900
  },
  {
    id: 5,
    name: 'Music',
    description: 'Discuss instruments, music theory, and share your journey',
    threads: 167,
    members: 1100
  }
];

const ForumList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = forumCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Community Forums</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search forums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="forum-categories">
        {filteredCategories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => navigate(`/forums/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="category-info">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <div className="category-stats">
              <div className="stat">
                <span className="stat-number">{category.threads}</span>
                <span className="stat-label">Threads</span>
              </div>
              <div className="stat">
                <span className="stat-number">{category.members}</span>
                <span className="stat-label">Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumList;
