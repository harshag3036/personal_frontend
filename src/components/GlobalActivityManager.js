/**
 * GlobalActivityManager Component
 * 
 * A form component for creating and editing global activities.
 * Supports creating activities that are global or linked to specific communities.
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text,
  Stack,
  Button,
  Input,
  Card,
  Badge,
  Divider,
  Switch
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const GlobalActivityManager = ({ onClose, onSuccess, activityToEdit }) => {
  const { addActivity, addGlobalActivity, updateActivity } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'discussion',
    status: 'active',
    category: '',
    isGlobal: true,
    communityId: '',
    tags: [],
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
    isPublic: true
  });
  
  // UI state
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Activity type configuration
  const typeConfig = {
    discussion: { icon: '🌱', color: '#4caf50', label: 'Discussion' },
    event: { icon: '📅', color: '#2196f3', label: 'Event' },
    project: { icon: '🎯', color: '#9c27b0', label: 'Project' },
    'skill-share': { icon: '🎓', color: '#ff9800', label: 'Skill Share' },
    resource: { icon: '📚', color: '#795548', label: 'Resource' },
    challenge: { icon: '🏆', color: '#f44336', label: 'Challenge' }
  };
  
  // Categories
  const categories = [
    { value: 'fitness', label: 'Fitness', icon: '🏃' },
    { value: 'learning', label: 'Learning', icon: '📚' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'wellness', label: 'Wellness', icon: '🧘' },
    { value: 'technology', label: 'Technology', icon: '💻' }
  ];
  
  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'draft', label: 'Draft' }
  ];
  
  // Load activity data if editing
  useEffect(() => {
    if (activityToEdit) {
      setFormData({
        title: activityToEdit.title || '',
        description: activityToEdit.description || '',
        type: activityToEdit.type || 'discussion',
        status: activityToEdit.status || 'active',
        category: activityToEdit.category || '',
        isGlobal: !activityToEdit.circleId && !activityToEdit.communityId,
        communityId: activityToEdit.circleId || activityToEdit.communityId || '',
        tags: activityToEdit.tags || [],
        startDate: activityToEdit.startDate ? new Date(activityToEdit.startDate).toISOString().split('T')[0] : '',
        endDate: activityToEdit.endDate ? new Date(activityToEdit.endDate).toISOString().split('T')[0] : '',
        location: activityToEdit.location || '',
        maxParticipants: activityToEdit.maxParticipants || '',
        isPublic: activityToEdit.isPublic !== false
      });
    }
  }, [activityToEdit]);
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle toggle switch for global/community-specific
  const handleGlobalToggle = (isGlobal) => {
    setFormData(prev => ({
      ...prev,
      isGlobal,
      communityId: isGlobal ? '' : prev.communityId
    }));
  };
  
  // Handle tag addition
  const handleAddTag = () => {
    if (!tagInput.trim() || formData.tags.includes(tagInput.trim())) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }));
    
    setTagInput('');
  };
  
  // Handle tag removal
  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  // Handle type selection
  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type
    }));
  };
  
  // Handle category selection
  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };
  
  // Handle status selection
  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };
  
  // Handle community selection
  const handleCommunityChange = (communityId) => {
    setFormData(prev => ({
      ...prev,
      communityId
    }));
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.isGlobal && !formData.communityId) {
      errors.communityId = 'Please select a community';
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (start > end) {
        errors.endDate = 'End date must be after start date';
      }
    }
    
    if (formData.maxParticipants && parseInt(formData.maxParticipants) <= 0) {
      errors.maxParticipants = 'Maximum participants must be a positive number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare activity data
      const activityData = {
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        createdBy: {
          id: user?.id || 'anonymous',
          name: user?.name || 'Anonymous User'
        }
      };
      
      // If editing existing activity
      if (activityToEdit) {
        await updateActivity(activityToEdit.id, activityData);
      } else {
        // Creating new activity
        if (formData.isGlobal) {
          await addGlobalActivity(activityData);
        } else {
          await addActivity(formData.communityId, activityData);
        }
      }
      
      setIsSuccess(true);
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
      // Close form after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error saving activity:', error);
      setFormErrors(prev => ({
        ...prev,
        submit: 'Failed to save activity. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card 
      padding="lg"
      marginY="lg"
      width="100%"
      maxWidth="800px"
      boxShadow="md"
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom="lg">
        <Text variant="h2">
          {activityToEdit ? 'Edit Activity' : 'Create New Activity'}
        </Text>
        <Button 
          variant="text"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </Button>
      </Flex>
      
      {isSuccess ? (
        <Box 
          padding="lg" 
          textAlign="center" 
          backgroundColor="success-50" 
          borderRadius="md"
        >
          <Text variant="h3" color="success-700" marginBottom="md">
            Activity {activityToEdit ? 'Updated' : 'Created'} Successfully!
          </Text>
          <Text>Redirecting you back...</Text>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing="lg">
            {/* Basic Information */}
            <Box>
              <Text variant="h3" marginBottom="md">Basic Information</Text>
              
              <Box marginBottom="md">
                <Text marginBottom="xs">Activity Title*</Text>
                <Input 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter activity title"
                  autoFocus
                />
                {formErrors.title && (
                  <Text color="error" fontSize="sm" marginTop="xs">{formErrors.title}</Text>
                )}
              </Box>
              
              <Box marginBottom="md">
                <Text marginBottom="xs">Description*</Text>
                <Input 
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the activity"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                />
                {formErrors.description && (
                  <Text color="error" fontSize="sm" marginTop="xs">{formErrors.description}</Text>
                )}
              </Box>
              
              <Flex gap="md" marginBottom="md" flexWrap="wrap">
                <Box flex="1" minWidth="150px">
                  <Text marginBottom="xs">Activity Type</Text>
                  <Flex gap="xs" flexWrap="wrap">
                    {Object.entries(typeConfig).map(([value, config]) => (
                      <Button
                        key={value}
                        variant={formData.type === value ? "primary" : "outline"}
                        onClick={() => handleTypeChange(value)}
                        size="sm"
                      >
                        {config.icon} {config.label}
                      </Button>
                    ))}
                  </Flex>
                </Box>
                
                <Box flex="1" minWidth="150px">
                  <Text marginBottom="xs">Category</Text>
                  <Flex gap="xs" flexWrap="wrap">
                    {categories.map(category => (
                      <Button
                        key={category.value}
                        variant={formData.category === category.value ? "primary" : "outline"}
                        onClick={() => handleCategoryChange(category.value)}
                        size="sm"
                      >
                        {category.icon} {category.label}
                      </Button>
                    ))}
                  </Flex>
                </Box>
                
                <Box flex="1" minWidth="150px">
                  <Text marginBottom="xs">Status</Text>
                  <Flex gap="xs" flexWrap="wrap">
                    {statusOptions.map(option => (
                      <Button
                        key={option.value}
                        variant={formData.status === option.value ? "primary" : "outline"}
                        onClick={() => handleStatusChange(option.value)}
                        size="sm"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Box>
            
            <Divider />
            
            {/* Community Settings */}
            <Box>
              <Text variant="h3" marginBottom="md">Community Settings</Text>
              
              <Flex alignItems="center" marginBottom="md">
                <Switch 
                  checked={formData.isGlobal}
                  onChange={() => handleGlobalToggle(!formData.isGlobal)}
                />
                <Text marginLeft="sm">
                  {formData.isGlobal ? 'Global Activity' : 'Community-specific Activity'}
                </Text>
              </Flex>
              
              <Text variant="body2" color="text-secondary" marginBottom="md">
                {formData.isGlobal 
                  ? 'This activity will be visible across all communities.'
                  : 'This activity will only be visible within the selected community.'}
              </Text>
              
              {!formData.isGlobal && (
                <Box marginBottom="md">
                  <Text marginBottom="xs">Select Community*</Text>
                  <Flex gap="xs" flexWrap="wrap">
                    {communities.map(community => (
                      <Button
                        key={community.id}
                        variant={formData.communityId === community.id ? "primary" : "outline"}
                        onClick={() => handleCommunityChange(community.id)}
                        size="sm"
                      >
                        {community.name}
                      </Button>
                    ))}
                  </Flex>
                  {formErrors.communityId && (
                    <Text color="error" fontSize="sm" marginTop="xs">{formErrors.communityId}</Text>
                  )}
                </Box>
              )}
            </Box>
            
            <Divider />
            
            {/* Additional Information */}
            <Box>
              <Text variant="h3" marginBottom="md">Additional Information</Text>
              
              <Flex gap="md" marginBottom="md" flexWrap="wrap">
                <Box flex="1" minWidth="200px">
                  <Text marginBottom="xs">Start Date</Text>
                  <Input 
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </Box>
                
                <Box flex="1" minWidth="200px">
                  <Text marginBottom="xs">End Date</Text>
                  <Input 
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                  {formErrors.endDate && (
                    <Text color="error" fontSize="sm" marginTop="xs">{formErrors.endDate}</Text>
                  )}
                </Box>
              </Flex>
              
              <Flex gap="md" marginBottom="md" flexWrap="wrap">
                <Box flex="1" minWidth="200px">
                  <Text marginBottom="xs">Location</Text>
                  <Input 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Physical or virtual location"
                  />
                </Box>
                
                <Box flex="1" minWidth="200px">
                  <Text marginBottom="xs">Max Participants</Text>
                  <Input 
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    placeholder="Leave empty for unlimited"
                    min="1"
                  />
                  {formErrors.maxParticipants && (
                    <Text color="error" fontSize="sm" marginTop="xs">{formErrors.maxParticipants}</Text>
                  )}
                </Box>
              </Flex>
              
              <Box marginBottom="md">
                <Text marginBottom="xs">Tags</Text>
                <Flex gap="md">
                  <Input 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button 
                    variant="secondary"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </Button>
                </Flex>
                
                <Flex gap="xs" flexWrap="wrap" marginTop="sm">
                  {formData.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      onClick={() => handleRemoveTag(tag)}
                      cursor="pointer"
                    >
                      {tag} ✕
                    </Badge>
                  ))}
                </Flex>
              </Box>
              
              <Flex alignItems="center" marginBottom="xs">
                <Switch 
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'isPublic',
                      type: 'checkbox',
                      checked: !formData.isPublic
                    }
                  })}
                />
                <Text marginLeft="sm">
                  Public Activity
                </Text>
              </Flex>
              <Text fontSize="sm" color="text-secondary">
                {formData.isPublic 
                  ? 'Anyone can view and join this activity'
                  : 'Only invited users can view and join this activity'}
              </Text>
            </Box>
            
            {/* Form error */}
            {formErrors.submit && (
              <Box padding="md" backgroundColor="error-50" borderRadius="md">
                <Text color="error">{formErrors.submit}</Text>
              </Box>
            )}
            
            {/* Form buttons */}
            <Flex justifyContent="space-between">
              <Button 
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              
              <Button 
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : (activityToEdit ? 'Update Activity' : 'Create Activity')}
              </Button>
            </Flex>
          </Stack>
        </form>
      )}
    </Card>
  );
};

export default GlobalActivityManager;
