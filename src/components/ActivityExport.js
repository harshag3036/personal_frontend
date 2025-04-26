/**
 * ActivityExport Component
 * 
 * Provides functionality for exporting activities in various formats,
 * sharing activities between communities, and creating templates
 * for common activity types.
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  Grid,
  Card,
  Button,
  Badge,
  Divider,
  Input
} from '../ui';
import { useActivity } from '../contexts/ActivityContext';
import { useUser } from '../contexts/UserContext';
import useCommunity from '../hooks/useCommunity';

const ActivityExport = ({ onCreateActivity }) => {
  const {
    getAllActivities,
    getUserActivities,
    getGlobalActivities,
    createActivityTemplate,
    shareActivity,
    getActivityTemplates
  } = useActivity();
  const { user } = useUser();
  const { communities } = useCommunity();

  // State
  const [activities, setActivities] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [exportFormat, setExportFormat] = useState('json');
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [shareFormVisible, setShareFormVisible] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [exportStatus, setExportStatus] = useState('');
  const [shareStatus, setShareStatus] = useState('');

  // Load activities and templates
  useEffect(() => {
    const fetchData = () => {
      const userActivities = getUserActivities();
      setActivities(userActivities);

      // If the getActivityTemplates method exists, load templates
      if (getActivityTemplates) {
        try {
          const templates = getActivityTemplates();
          setTemplates(templates);
        } catch (error) {
          console.error('Error fetching templates:', error);
          setTemplates([]);
        }
      }
    };

    fetchData();
  }, [getUserActivities, getActivityTemplates]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle activity selection
  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setShareFormVisible(false);
    setShowTemplateForm(false);
    setExportStatus('');
    setShareStatus('');
  };

  // Handle export format change
  const handleFormatChange = (format) => {
    setExportFormat(format);
    setExportStatus('');
  };

  // Handle export action
  const handleExport = () => {
    if (!selectedActivity) {
      setExportStatus('Please select an activity to export');
      return;
    }

    try {
      const exportedData = prepareActivityForExport(selectedActivity, exportFormat);
      
      // In a real implementation, this might trigger a file download
      // or save to the user's cloud storage
      
      // For now, we'll just show a success message and log to console
      console.log('Exported data:', exportedData);
      setExportStatus(`Export successful in ${exportFormat.toUpperCase()} format`);
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus(`Export failed: ${error.message}`);
    }
  };

  // Prepare activity data for export in various formats
  const prepareActivityForExport = (activity, format) => {
    // Clone the activity to avoid modifying the original
    const exportData = { ...activity };
    
    // Add export metadata
    exportData.exportedAt = new Date().toISOString();
    exportData.exportedBy = user?.id;
    exportData.exportFormat = format;
    
    // Format based on the selected export type
    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2);
        
      case 'csv':
        // Simple CSV conversion for demonstration
        const csvHeader = Object.keys(exportData).join(',');
        const csvValues = Object.values(exportData).map(value => {
          if (typeof value === 'object') {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${value}"`;
        }).join(',');
        return `${csvHeader}\n${csvValues}`;
        
      case 'ical':
        // Basic iCalendar format for demonstration
        const startDate = exportData.startDate ? new Date(exportData.startDate) : new Date();
        const endDate = exportData.endDate ? new Date(exportData.endDate) : new Date(startDate.getTime() + 3600000); // Default to 1 hour
        
        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ActivityExport//EN
BEGIN:VEVENT
UID:${exportData.id}
SUMMARY:${exportData.title}
DESCRIPTION:${exportData.description || ''}
LOCATION:${exportData.location || ''}
STATUS:${exportData.status.toUpperCase()}
DTSTART:${formatDateForIcal(startDate)}
DTEND:${formatDateForIcal(endDate)}
END:VEVENT
END:VCALENDAR`;
        
      default:
        return JSON.stringify(exportData);
    }
  };
  
  // Format date for iCalendar
  const formatDateForIcal = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Handle creating a template from the selected activity
  const handleCreateTemplate = () => {
    if (!selectedActivity) {
      return;
    }
    
    setShowTemplateForm(true);
    setShareFormVisible(false);
    
    // Pre-populate the form with activity details
    setTemplateName(selectedActivity.title);
    setTemplateDescription(selectedActivity.description || '');
  };

  // Handle saving the template
  const handleSaveTemplate = () => {
    if (!selectedActivity || !templateName) {
      return;
    }
    
    try {
      // In a real implementation, this would call an API
      const templateData = {
        name: templateName,
        description: templateDescription,
        basedOn: selectedActivity.id,
        type: selectedActivity.type || selectedActivity.category,
        structure: {
          // Include relevant fields from the activity
          title: selectedActivity.title,
          description: selectedActivity.description,
          type: selectedActivity.type,
          category: selectedActivity.category,
          tags: selectedActivity.tags,
          // Don't include dates, location, or participants
        },
        createdBy: user?.id,
        createdAt: new Date().toISOString()
      };
      
      // If createActivityTemplate method exists, call it
      if (createActivityTemplate) {
        createActivityTemplate(templateData);
        
        // Refresh templates
        if (getActivityTemplates) {
          const updatedTemplates = getActivityTemplates();
          setTemplates(updatedTemplates);
        } else {
          // If no API, just add to local state for demo
          setTemplates([...templates, templateData]);
        }
      } else {
        // If no API, just add to local state for demo
        setTemplates([...templates, templateData]);
      }
      
      // Reset form
      setShowTemplateForm(false);
      setTemplateName('');
      setTemplateDescription('');
      
      setExportStatus('Template created successfully');
    } catch (error) {
      console.error('Template creation error:', error);
      setExportStatus(`Template creation failed: ${error.message}`);
    }
  };

  // Handle sharing activity with other communities
  const handleShareActivity = () => {
    if (!selectedActivity) {
      return;
    }
    
    setShareFormVisible(true);
    setShowTemplateForm(false);
    setSelectedCommunities([]);
  };

  // Handle toggling a community in the share selection
  const toggleCommunity = (communityId) => {
    if (selectedCommunities.includes(communityId)) {
      setSelectedCommunities(selectedCommunities.filter(id => id !== communityId));
    } else {
      setSelectedCommunities([...selectedCommunities, communityId]);
    }
  };

  // Handle confirming the share action
  const handleConfirmShare = () => {
    if (!selectedActivity || selectedCommunities.length === 0) {
      setShareStatus('Please select at least one community to share with');
      return;
    }
    
    try {
      // In a real implementation, this would call an API
      selectedCommunities.forEach(communityId => {
        if (shareActivity) {
          shareActivity(selectedActivity.id, communityId);
        }
      });
      
      setShareStatus(`Activity shared with ${selectedCommunities.length} communities`);
      setSelectedCommunities([]);
      setShareFormVisible(false);
    } catch (error) {
      console.error('Share error:', error);
      setShareStatus(`Sharing failed: ${error.message}`);
    }
  };

  // Create new activity from template
  const handleUseTemplate = (template) => {
    // In a real implementation, this would prepare the activity creation form
    // with the template data
    
    // For now, we'll just call the onCreateActivity callback
    if (onCreateActivity) {
      onCreateActivity(template);
    }
  };

  // Render activity list
  const renderActivityList = () => {
    return (
      <Box marginBottom="xl">
        <Text variant="h3" marginBottom="md">My Activities</Text>
        
        {activities.length > 0 ? (
          <Stack spacing="sm">
            {activities.map(activity => (
              <Card 
                key={activity.id}
                padding="md"
                backgroundColor={selectedActivity?.id === activity.id ? 'background-hover' : 'background-paper'}
                cursor="pointer"
                onClick={() => handleSelectActivity(activity)}
                borderLeft="4px solid"
                borderLeftColor={selectedActivity?.id === activity.id ? 'primary' : 'transparent'}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontWeight="bold">{activity.title}</Text>
                    <Text fontSize="sm" color="text-secondary">
                      {formatDate(activity.createdAt)}
                    </Text>
                  </Box>
                  
                  <Badge variant={
                    activity.status === 'active' ? 'success' :
                    activity.status === 'upcoming' ? 'info' :
                    activity.status === 'completed' ? 'secondary' :
                    'outline'
                  }>
                    {activity.status}
                  </Badge>
                </Flex>
              </Card>
            ))}
          </Stack>
        ) : (
          <Box padding="lg" backgroundColor="background-alt" borderRadius="md" textAlign="center">
            <Text marginBottom="md">No activities available for export</Text>
            <Button variant="primary" onClick={onCreateActivity}>
              Create New Activity
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  // Render export options
  const renderExportOptions = () => {
    if (!selectedActivity) {
      return (
        <Box padding="lg" backgroundColor="background-alt" borderRadius="md" textAlign="center">
          <Text>Select an activity to view export options</Text>
        </Box>
      );
    }
    
    return (
      <Box>
        <Text variant="h3" marginBottom="md">Export Options</Text>
        
        <Card padding="lg" backgroundColor="background-paper" marginBottom="lg">
          <Text variant="h4" marginBottom="md">
            Exporting: {selectedActivity.title}
          </Text>
          
          <Text marginBottom="md">Choose export format:</Text>
          
          <Flex gap="sm" marginBottom="lg">
            <Button 
              variant={exportFormat === 'json' ? 'primary' : 'outline'}
              onClick={() => handleFormatChange('json')}
            >
              JSON
            </Button>
            <Button 
              variant={exportFormat === 'csv' ? 'primary' : 'outline'}
              onClick={() => handleFormatChange('csv')}
            >
              CSV
            </Button>
            <Button 
              variant={exportFormat === 'ical' ? 'primary' : 'outline'}
              onClick={() => handleFormatChange('ical')}
            >
              iCalendar
            </Button>
          </Flex>
          
          <Button 
            variant="primary" 
            onClick={handleExport}
            width="100%"
          >
            Export Activity
          </Button>
          
          {exportStatus && (
            <Text 
              marginTop="md" 
              color={exportStatus.includes('failed') ? 'error' : 'success'}
            >
              {exportStatus}
            </Text>
          )}
        </Card>
        
        <Flex gap="md" marginBottom="lg">
          <Button 
            variant="outline" 
            flex="1" 
            onClick={handleCreateTemplate}
          >
            Create Template
          </Button>
          <Button 
            variant="outline" 
            flex="1" 
            onClick={handleShareActivity}
          >
            Share with Communities
          </Button>
        </Flex>
        
        {/* Template Form */}
        {showTemplateForm && (
          <Card padding="lg" backgroundColor="background-paper" marginBottom="lg">
            <Text variant="h4" marginBottom="md">Create Activity Template</Text>
            
            <Stack spacing="md">
              <Box>
                <Text marginBottom="xs">Template Name:</Text>
                <Input 
                  value={templateName}
                  onChange={e => setTemplateName(e.target.value)}
                  placeholder="Enter a name for this template"
                  width="100%"
                />
              </Box>
              
              <Box>
                <Text marginBottom="xs">Description:</Text>
                <Input 
                  value={templateDescription}
                  onChange={e => setTemplateDescription(e.target.value)}
                  placeholder="Describe what this template is for"
                  width="100%"
                />
              </Box>
              
              <Flex gap="sm">
                <Button 
                  variant="primary" 
                  onClick={handleSaveTemplate}
                >
                  Save Template
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateForm(false)}
                >
                  Cancel
                </Button>
              </Flex>
            </Stack>
          </Card>
        )}
        
        {/* Share Form */}
        {shareFormVisible && (
          <Card padding="lg" backgroundColor="background-paper" marginBottom="lg">
            <Text variant="h4" marginBottom="md">Share with Communities</Text>
            
            <Text marginBottom="md">Select communities to share this activity with:</Text>
            
            <Stack spacing="xs" marginBottom="lg">
              {communities.map(community => (
                <Flex 
                  key={community.id}
                  padding="sm"
                  backgroundColor="background-alt"
                  borderRadius="md"
                  alignItems="center"
                  cursor="pointer"
                  _hover={{ backgroundColor: 'background-hover' }}
                  onClick={() => toggleCommunity(community.id)}
                >
                  <Box 
                    width="16px" 
                    height="16px"
                    borderRadius="sm"
                    backgroundColor={selectedCommunities.includes(community.id) ? 'primary' : 'transparent'}
                    borderWidth="1px"
                    borderColor={selectedCommunities.includes(community.id) ? 'primary' : 'border'}
                    marginRight="sm"
                  />
                  <Text>{community.name}</Text>
                </Flex>
              ))}
            </Stack>
            
            <Flex gap="sm">
              <Button 
                variant="primary" 
                onClick={handleConfirmShare}
                isDisabled={selectedCommunities.length === 0}
              >
                Share Activity
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShareFormVisible(false)}
              >
                Cancel
              </Button>
            </Flex>
            
            {shareStatus && (
              <Text 
                marginTop="md" 
                color={shareStatus.includes('failed') ? 'error' : 'success'}
              >
                {shareStatus}
              </Text>
            )}
          </Card>
        )}
      </Box>
    );
  };

  // Render templates section
  const renderTemplates = () => {
    return (
      <Box>
        <Text variant="h3" marginBottom="md">Activity Templates</Text>
        
        {templates.length > 0 ? (
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap="md"
            marginBottom="lg"
          >
            {templates.map((template, index) => (
              <Card 
                key={index}
                padding="md"
                backgroundColor="background-paper"
                borderLeft="4px solid"
                borderLeftColor="success"
              >
                <Text variant="h4" marginBottom="xs">{template.name}</Text>
                
                {template.description && (
                  <Text fontSize="sm" marginBottom="sm">
                    {template.description}
                  </Text>
                )}
                
                <Text fontSize="xs" color="text-secondary" marginBottom="md">
                  Type: {template.type || 'General'}
                </Text>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </Card>
            ))}
          </Grid>
        ) : (
          <Box padding="lg" backgroundColor="background-alt" borderRadius="md" marginBottom="lg" textAlign="center">
            <Text>No templates available</Text>
            <Text fontSize="sm" marginTop="xs">
              Select an activity and click "Create Template" to create your first template
            </Text>
          </Box>
        )}
        
        <Box padding="lg" backgroundColor="background-paper" borderRadius="md">
          <Text variant="h4" marginBottom="md">About Templates</Text>
          <Text fontSize="sm">
            Templates allow you to create reusable patterns for activities. Create a template once and use it to quickly set up similar activities in the future. Templates can be shared across communities to encourage consistent activity formats.
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="activity-export" maxWidth="1200px" margin="0 auto">
      <Box marginBottom="xl">
        <Text variant="h1" marginBottom="md">Activity Export & Sharing</Text>
        <Text variant="body1">
          Export activities to various formats, create templates, and share across communities.
        </Text>
      </Box>
      
      <Grid 
        templateColumns={{ base: "1fr", lg: "350px 1fr" }}
        gap="xl"
      >
        {/* Left Column - Activity List */}
        <Box>
          {renderActivityList()}
        </Box>
        
        {/* Right Column - Export Options and Templates */}
        <Box>
          {renderExportOptions()}
          
          <Divider marginY="xl" />
          
          {renderTemplates()}
        </Box>
      </Grid>
    </Box>
  );
};

export default ActivityExport;
