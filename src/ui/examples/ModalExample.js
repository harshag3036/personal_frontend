import React, { useState, useRef } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  MODAL_VARIANTS, 
  MODAL_SIZES 
} from '../molecules';
import { Button, Text, Box, Flex, Icon, Divider } from '../atoms';

/**
 * ModalExample Component
 * 
 * This example demonstrates how to use the Modal component in a real-world scenario.
 * It shows a community activity management interface with different modal types.
 */
const ModalExample = () => {
  // State for different modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  // Refs for focus management
  const saveButtonRef = useRef(null);
  const nameInputRef = useRef(null);
  
  // Sample activity data
  const activity = {
    id: 1,
    title: 'Weekly Community Discussion',
    description: 'A weekly discussion on various topics related to our community. Everyone is welcome to join and share their thoughts.',
    date: 'Every Friday',
    time: '3:00 PM - 4:00 PM',
    location: 'Community Center',
    participants: 12,
    status: 'active',
    tags: ['discussion', 'weekly', 'community'],
  };
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    tags: '',
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsCreateModalOpen(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      tags: '',
    });
  };
  
  return (
    <Box p="lg" maxWidth="800px" mx="auto">
      <Text as="h2" mb="md">Community Activity Management</Text>
      
      <Flex gap="md" mb="lg">
        <Button 
          variant="primary" 
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Icon name="plus" size="sm" />}
        >
          Create Activity
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setIsSettingsModalOpen(true)}
          leftIcon={<Icon name="settings" size="sm" />}
        >
          Settings
        </Button>
      </Flex>
      
      {/* Activity Card */}
      <Box 
        p="md" 
        mb="lg" 
        borderRadius="md" 
        boxShadow="sm" 
        bg="background"
        border="1px solid var(--color-border, #e2e8f0)"
      >
        <Flex justifyContent="space-between" alignItems="flex-start" mb="md">
          <Box>
            <Text as="h3" mb="xs">{activity.title}</Text>
            <Flex gap="sm" mb="sm">
              <Text size="sm" color="text-muted">
                <Icon name="calendar" size="sm" style={{ marginRight: '4px' }} />
                {activity.date}
              </Text>
              <Text size="sm" color="text-muted">
                <Icon name="clock" size="sm" style={{ marginRight: '4px' }} />
                {activity.time}
              </Text>
              <Text size="sm" color="text-muted">
                <Icon name="map-pin" size="sm" style={{ marginRight: '4px' }} />
                {activity.location}
              </Text>
            </Flex>
            <Text size="sm" mb="md">{activity.description}</Text>
            <Flex gap="xs" flexWrap="wrap">
              {activity.tags.map((tag) => (
                <Box 
                  key={tag}
                  px="sm" 
                  py="xs" 
                  bg="background-muted" 
                  borderRadius="pill"
                  fontSize="sm"
                >
                  #{tag}
                </Box>
              ))}
            </Flex>
          </Box>
          <Flex gap="sm">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsViewModalOpen(true)}
              leftIcon={<Icon name="eye" size="sm" />}
            >
              View
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => setIsDeleteModalOpen(true)}
              leftIcon={<Icon name="trash" size="sm" />}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
        <Divider my="md" />
        <Flex justifyContent="space-between" alignItems="center">
          <Text size="sm" color="text-muted">
            <Icon name="users" size="sm" style={{ marginRight: '4px' }} />
            {activity.participants} participants
          </Text>
          <Text 
            size="sm" 
            color={activity.status === 'active' ? 'success' : 'text-muted'}
            fontWeight="bold"
          >
            {activity.status.toUpperCase()}
          </Text>
        </Flex>
      </Box>
      
      {/* Create Activity Modal */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        size={MODAL_SIZES.LARGE}
        initialFocusRef={nameInputRef}
        finalFocusRef={saveButtonRef}
      >
        <ModalHeader onClose={() => setIsCreateModalOpen(false)}>
          Create New Activity
        </ModalHeader>
        <ModalBody>
          <Box as="form" id="create-activity-form">
            <Flex direction="column" gap="md">
              <Box>
                <Text as="label" htmlFor="title" display="block" mb="xs" fontWeight="bold">
                  Title
                </Text>
                <input
                  ref={nameInputRef}
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter activity title"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--color-border, #e2e8f0)',
                    borderRadius: 'var(--border-radius-md, 4px)',
                  }}
                />
              </Box>
              
              <Box>
                <Text as="label" htmlFor="description" display="block" mb="xs" fontWeight="bold">
                  Description
                </Text>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter activity description"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--color-border, #e2e8f0)',
                    borderRadius: 'var(--border-radius-md, 4px)',
                  }}
                />
              </Box>
              
              <Flex gap="md">
                <Box flex="1">
                  <Text as="label" htmlFor="date" display="block" mb="xs" fontWeight="bold">
                    Date
                  </Text>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g., Every Friday, Jul 15, 2025"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--color-border, #e2e8f0)',
                      borderRadius: 'var(--border-radius-md, 4px)',
                    }}
                  />
                </Box>
                
                <Box flex="1">
                  <Text as="label" htmlFor="time" display="block" mb="xs" fontWeight="bold">
                    Time
                  </Text>
                  <input
                    id="time"
                    name="time"
                    type="text"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 3:00 PM - 4:00 PM"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--color-border, #e2e8f0)',
                      borderRadius: 'var(--border-radius-md, 4px)',
                    }}
                  />
                </Box>
              </Flex>
              
              <Box>
                <Text as="label" htmlFor="location" display="block" mb="xs" fontWeight="bold">
                  Location
                </Text>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter activity location"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--color-border, #e2e8f0)',
                    borderRadius: 'var(--border-radius-md, 4px)',
                  }}
                />
              </Box>
              
              <Box>
                <Text as="label" htmlFor="tags" display="block" mb="xs" fontWeight="bold">
                  Tags
                </Text>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter comma-separated tags"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--color-border, #e2e8f0)',
                    borderRadius: 'var(--border-radius-md, 4px)',
                  }}
                />
                <Text size="sm" color="text-muted" mt="xs">
                  Separate tags with commas (e.g., discussion, weekly, community)
                </Text>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsCreateModalOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            ref={saveButtonRef}
            variant="primary" 
            onClick={handleSubmit}
          >
            Create Activity
          </Button>
        </ModalFooter>
      </Modal>
      
      {/* View Activity Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)}
        className="ui-modal--community"
      >
        <ModalHeader onClose={() => setIsViewModalOpen(false)}>
          <Flex alignItems="center" gap="sm">
            <Icon name="activity" size="md" />
            <span>{activity.title}</span>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Box mb="lg">
            <Text as="h3" mb="sm">Description</Text>
            <Text mb="md">{activity.description}</Text>
            
            <Flex gap="md" mb="md" flexWrap="wrap">
              <Box>
                <Text fontWeight="bold" size="sm">Date</Text>
                <Text>{activity.date}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" size="sm">Time</Text>
                <Text>{activity.time}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" size="sm">Location</Text>
                <Text>{activity.location}</Text>
              </Box>
            </Flex>
            
            <Text as="h3" mb="sm">Participants</Text>
            <Flex gap="sm" mb="md" alignItems="center">
              <Box 
                width="32px" 
                height="32px" 
                borderRadius="circle" 
                bg="background-muted" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text fontWeight="bold">JD</Text>
              </Box>
              <Box 
                width="32px" 
                height="32px" 
                borderRadius="circle" 
                bg="background-muted" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text fontWeight="bold">AS</Text>
              </Box>
              <Box 
                width="32px" 
                height="32px" 
                borderRadius="circle" 
                bg="background-muted" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text fontWeight="bold">MK</Text>
              </Box>
              <Box 
                width="32px" 
                height="32px" 
                borderRadius="circle" 
                bg="accent-primary" 
                color="text-on-color"
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text fontWeight="bold">+{activity.participants - 3}</Text>
              </Box>
            </Flex>
            
            <Text as="h3" mb="sm">Tags</Text>
            <Flex gap="xs" flexWrap="wrap">
              {activity.tags.map((tag) => (
                <Box 
                  key={tag}
                  px="sm" 
                  py="xs" 
                  bg="background-muted" 
                  borderRadius="pill"
                  fontSize="sm"
                >
                  #{tag}
                </Box>
              ))}
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsViewModalOpen(false)}
          >
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              setIsViewModalOpen(false);
              // In a real app, this would register the user for the activity
              alert('You have joined the activity!');
            }}
          >
            Join Activity
          </Button>
        </ModalFooter>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        size={MODAL_SIZES.SMALL}
        variant={MODAL_VARIANTS.ERROR}
      >
        <ModalHeader onClose={() => setIsDeleteModalOpen(false)}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>
          <Flex alignItems="center" gap="md">
            <Box 
              color="error" 
              fontSize="2rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="alert-triangle" size="lg" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb="xs">
                Are you sure you want to delete this activity?
              </Text>
              <Text size="sm" color="text-muted">
                This action cannot be undone. All data associated with this activity will be permanently removed.
              </Text>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={() => {
              setIsDeleteModalOpen(false);
              // In a real app, this would delete the activity
              alert('Activity deleted!');
            }}
          >
            Delete Activity
          </Button>
        </ModalFooter>
      </Modal>
      
      {/* Settings Modal */}
      <Modal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)}
        size={MODAL_SIZES.MEDIUM}
      >
        <ModalHeader onClose={() => setIsSettingsModalOpen(false)}>
          Activity Settings
        </ModalHeader>
        <ModalBody>
          <Box mb="md">
            <Text as="h3" mb="sm">Notification Settings</Text>
            <Flex direction="column" gap="sm">
              <Flex alignItems="center" justifyContent="space-between">
                <Text>Email notifications</Text>
                <input type="checkbox" defaultChecked />
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text>Push notifications</Text>
                <input type="checkbox" defaultChecked />
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text>Activity reminders</Text>
                <input type="checkbox" defaultChecked />
              </Flex>
            </Flex>
          </Box>
          
          <Divider my="md" />
          
          <Box mb="md">
            <Text as="h3" mb="sm">Privacy Settings</Text>
            <Flex direction="column" gap="sm">
              <Flex alignItems="center" justifyContent="space-between">
                <Text>Show my participation</Text>
                <input type="checkbox" defaultChecked />
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text>Allow others to invite me</Text>
                <input type="checkbox" defaultChecked />
              </Flex>
            </Flex>
          </Box>
          
          <Divider my="md" />
          
          <Box>
            <Text as="h3" mb="sm">Display Settings</Text>
            <Box mb="sm">
              <Text as="label" htmlFor="theme" display="block" mb="xs">
                Theme
              </Text>
              <select
                id="theme"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid var(--color-border, #e2e8f0)',
                  borderRadius: 'var(--border-radius-md, 4px)',
                }}
                defaultValue="system"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </Box>
            
            <Box>
              <Text as="label" htmlFor="timezone" display="block" mb="xs">
                Timezone
              </Text>
              <select
                id="timezone"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid var(--color-border, #e2e8f0)',
                  borderRadius: 'var(--border-radius-md, 4px)',
                }}
                defaultValue="local"
              >
                <option value="local">Use Device Timezone</option>
                <option value="utc">UTC</option>
                <option value="est">Eastern Time (ET)</option>
                <option value="pst">Pacific Time (PT)</option>
                <option value="ist">India Standard Time (IST)</option>
              </select>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsSettingsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              setIsSettingsModalOpen(false);
              // In a real app, this would save the settings
              alert('Settings saved!');
            }}
          >
            Save Settings
          </Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
};

export default ModalExample;
