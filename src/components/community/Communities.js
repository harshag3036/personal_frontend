import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Communities.css';

/**
 * Communities Component
 * Displays a list of communities and handles navigation
 */
const Communities = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('open');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with actual data fetching
  const allCommunities = {
    open: [
      {
        id: 'badminton',
        name: 'Badminton Enthusiasts',
        description: 'Connect with fellow badminton players, organize matches, and improve together',
        category: 'Sports',
        memberCount: 1200,
        activityCount: 156,
        lastActive: '2 hours ago',
        type: 'open'
      },
      {
        id: 'film',
        name: 'Film Analysis',
        description: 'Deep dive into cinema, analyze techniques, and explore storytelling',
        category: 'Arts',
        memberCount: 850,
        activityCount: 243,
        lastActive: '5 minutes ago',
        type: 'open'
      }
    ],
    private: [
      {
        id: 'meditation',
        name: 'Mindful Meditation Circle',
        description: 'A private group for deep meditation practice and sharing experiences',
        category: 'Wellness',
        memberCount: 15,
        activityCount: 45,
        lastActive: '1 hour ago',
        type: 'private'
      },
      {
        id: 'philosophy',
        name: 'Philosophy Study Group',
        description: 'Exploring philosophical texts and discussing their practical applications',
        category: 'Philosophy',
        memberCount: 12,
        activityCount: 78,
        lastActive: '30 minutes ago',
        type: 'private'
      }
    ]
  };

  const categories = [
    'All',
    'Arts',
    'Sports',
    'Technology',
    'Wellness',
    'Philosophy',
    'Science',
    'Literature',
    'Music',
    'Personal Growth'
  ];

  const filterCommunities = () => {
    const communities = allCommunities[activeTab];
    return communities.filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                            community.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  };

  const communities = filterCommunities();

  const handleCommunityClick = (id) => {
    navigate(`/community/${id}`);
  };

  const handleCreateCommunity = () => {
    navigate('/community/new');
  };

  return (
    <div className="communities-container">
      <div className="communities-header">
        <h1>Communities</h1>
        <div className="header-actions">
          <button 
            className="view-refactored-button"
            onClick={() => navigate('/community-refactored')}
          >
            Try New UI
          </button>
          <div className="user-avatar">
            {/* Avatar will be added here */}
          </div>
        </div>
      </div>

      <div className="create-community">
        <button 
          className="create-community-button"
          onClick={handleCreateCommunity}
        >
          Create New Community
        </button>
      </div>

      <div className="community-search">
        <input
          type="text"
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value.toLowerCase())}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="community-filters">
        <button 
          className={`filter-button ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open Communities
        </button>
        <button 
          className={`filter-button ${activeTab === 'private' ? 'active' : ''}`}
          onClick={() => setActiveTab('private')}
        >
          Private Circles
        </button>
      </div>

      <div className={`communities-grid ${communities.length === 0 ? 'empty' : ''}`}>
        {communities.length > 0 ? communities.map(community => (
          <div 
            key={community.id}
            className="community-card"
            onClick={() => handleCommunityClick(community.id)}
          >
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <div className="category-tag">{community.category}</div>
            <div className="community-stats">
              <div className="stat">
                <strong>{community.memberCount}</strong>
                <span>Members</span>
              </div>
              <div className="stat">
                <strong>{community.activityCount}</strong>
                <span>Activities</span>
              </div>
              <div className="last-active">
                Active {community.lastActive}
              </div>
            </div>
          </div>
        )) : (
          <div className="no-results">
            <p>No communities found matching your criteria</p>
            <button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communities;
