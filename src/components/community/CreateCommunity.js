import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCommunity.css';

/**
 * CreateCommunity Component
 * Form for creating a new community with mindful guidelines
 */
const CreateCommunity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: 'open',
    guidelines: ''
  });

  const categories = [
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement community creation logic
    // For now, just navigate back
    navigate('/community');
  };

  const handleCancel = () => {
    navigate('/community');
  };

  return (
    <div className="create-community-container">
      <div className="create-community-header">
        <h1>Create a New Community</h1>
        <p>Create a space for meaningful connection and growth</p>
      </div>

      <form onSubmit={handleSubmit} className="create-community-form">
        <div className="form-group">
          <label htmlFor="name">Community Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Give your community a clear, meaningful name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What is the purpose of this community? What kind of interactions do you hope to foster?"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Community Type</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value="open"
                checked={formData.type === 'open'}
                onChange={handleChange}
              />
              Open Community
              <span className="help-text">Anyone can join and participate</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value="private"
                checked={formData.type === 'private'}
                onChange={handleChange}
              />
              Private Circle
              <span className="help-text">Members need to be invited</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="guidelines">Community Guidelines</label>
          <textarea
            id="guidelines"
            name="guidelines"
            value={formData.guidelines}
            onChange={handleChange}
            placeholder="What guidelines will help foster meaningful interaction? How will members support each other's growth?"
            rows={4}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Community
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommunity;
