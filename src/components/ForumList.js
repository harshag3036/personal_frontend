import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumList.css';

const ForumList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('open');

  const openCommunities = [
    {
      id: 1,
      name: 'Badminton Enthusiasts',
      description: 'Connect with fellow badminton players, organize matches, and improve together',
      category: 'Sports',
      members: 1200,
      activities: 156,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Film Analysis',
      description: 'Deep dive into cinema, analyze techniques, and explore storytelling',
      category: 'Arts',
      members: 850,
      activities: 243,
      lastActive: '5 minutes ago'
    }
  ];

  const privateCircles = [
    {
      id: 101,
      name: 'Weekend Warriors',
      description: 'Our local sports and adventure group',
      members: 8,
      activities: 12,
      lastActive: '1 day ago',
      relationship: 'Friends'
    },
    {
      id: 102,
      name: 'Book Club',
      description: 'Monthly book discussions and literary exploration',
      members: 5,
      activities: 24,
      lastActive: '3 hours ago',
      relationship: 'Family'
    }
  ];

  const filteredCommunities = (activeTab === 'open' ? openCommunities : privateCircles)
    .filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCreateNew = () => {
    if (activeTab === 'open') {
      navigate('/community/create');
    } else {
      navigate('/circle/create');
    }
  };

  const handleCommunityClick = (community) => {
    if (activeTab === 'open') {
      navigate(`/community/${community.id}`);
    } else {
      navigate(`/circle/${community.id}`);
    }
  };

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Communities</h1>
        <div className="forum-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="create-button" onClick={handleCreateNew}>
            Create New {activeTab === 'open' ? 'Community' : 'Circle'}
          </button>
        </div>
      </div>

      <div className="community-tabs">
        <button
          className={`tab-button ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open Communities
        </button>
        <button
          className={`tab-button ${activeTab === 'private' ? 'active' : ''}`}
          onClick={() => setActiveTab('private')}
        >
          Private Circles
        </button>
      </div>

      <div className="communities-grid">
        {filteredCommunities.map(community => (
          <div
            key={community.id}
            className="community-card"
            onClick={() => handleCommunityClick(community)}
          >
            <div className="community-info">
              <h2>{community.name}</h2>
              <p>{community.description}</p>
              {activeTab === 'open' && (
                <span className="category-tag">{community.category}</span>
              )}
              {activeTab === 'private' && (
                <span className="relationship-tag">{community.relationship}</span>
              )}
            </div>
            <div className="community-stats">
              <div className="stat">
                <span className="stat-number">{community.members}</span>
                <span className="stat-label">Members</span>
              </div>
              <div className="stat">
                <span className="stat-number">{community.activities}</span>
                <span className="stat-label">Activities</span>
              </div>
              <div className="last-active">
                Active {community.lastActive}
              </div>
            </div>
          </div>
        ))}

        {filteredCommunities.length === 0 && (
          <div className="empty-state">
            <p>No {activeTab === 'open' ? 'communities' : 'circles'} found</p>
            <button onClick={handleCreateNew}>
              Create New {activeTab === 'open' ? 'Community' : 'Circle'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumList;
