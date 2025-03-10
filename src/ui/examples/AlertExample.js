/**
 * Alert Example Component
 * 
 * This example demonstrates various ways to use the Alert component
 * in real-world scenarios.
 */

import React, { useState } from 'react';
import Alert from '../molecules/Alert';
import Box from '../atoms/Box';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const AlertExample = () => {
  // State for controlling alert visibility
  const [showInfoAlert, setShowInfoAlert] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [showWarningAlert, setShowWarningAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [showFeedbackAlert, setShowFeedbackAlert] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('info');

  // Handle form submission for custom alert
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get('message');
    const type = formData.get('type');
    
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedbackAlert(true);
  };

  return (
    <Box padding="lg">
      <Text as="h1" size="xl" marginBottom="md">Alert Component Examples</Text>
      
      {/* Basic Alerts */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Basic Alerts</Text>
        
        {showInfoAlert && (
          <Alert 
            variant="info" 
            closable 
            onClose={() => setShowInfoAlert(false)}
            marginBottom="md"
          >
            This is an informational alert. It provides general information to the user.
          </Alert>
        )}
        
        {showSuccessAlert && (
          <Alert 
            variant="success" 
            closable 
            onClose={() => setShowSuccessAlert(false)}
            marginBottom="md"
          >
            This is a success alert. It indicates that an operation completed successfully.
          </Alert>
        )}
        
        {showWarningAlert && (
          <Alert 
            variant="warning" 
            closable 
            onClose={() => setShowWarningAlert(false)}
            marginBottom="md"
          >
            This is a warning alert. It warns the user about potential issues.
          </Alert>
        )}
        
        {showErrorAlert && (
          <Alert 
            variant="error" 
            closable 
            onClose={() => setShowErrorAlert(false)}
            marginBottom="md"
          >
            This is an error alert. It indicates that an operation failed or an error occurred.
          </Alert>
        )}
        
        <Button 
          onClick={() => {
            setShowInfoAlert(true);
            setShowSuccessAlert(true);
            setShowWarningAlert(true);
            setShowErrorAlert(true);
          }}
          marginTop="sm"
        >
          Reset Alerts
        </Button>
      </Box>
      
      {/* Alerts with Titles */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Alerts with Titles</Text>
        
        <Alert 
          variant="info" 
          title="Information"
          marginBottom="md"
        >
          This alert includes a title to provide additional context.
        </Alert>
        
        <Alert 
          variant="success" 
          title="Success"
          marginBottom="md"
        >
          Your profile has been updated successfully.
        </Alert>
        
        <Alert 
          variant="warning" 
          title="Warning"
          marginBottom="md"
        >
          Your subscription will expire in 3 days. Please renew to avoid service interruption.
        </Alert>
        
        <Alert 
          variant="error" 
          title="Error"
          marginBottom="md"
        >
          There was a problem processing your payment. Please check your payment details and try again.
        </Alert>
      </Box>
      
      {/* Alerts with Custom Icons */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Alerts with Custom Icons</Text>
        
        <Alert 
          variant="info" 
          hasIcon
          icon={<Icon name="bell" />}
          title="Notification"
          marginBottom="md"
        >
          You have 3 new messages in your inbox.
        </Alert>
        
        <Alert 
          variant="success" 
          hasIcon
          icon={<Icon name="thumbs-up" />}
          title="Feedback Received"
          marginBottom="md"
        >
          Thank you for your feedback! We appreciate your input.
        </Alert>
        
        <Alert 
          variant="warning" 
          hasIcon
          icon={<Icon name="clock" />}
          title="Session Expiring"
          marginBottom="md"
        >
          Your session will expire in 5 minutes. Please save your work.
        </Alert>
        
        <Alert 
          variant="error" 
          hasIcon
          icon={<Icon name="lock" />}
          title="Security Alert"
          marginBottom="md"
        >
          We detected a login attempt from an unrecognized device. Please verify your account.
        </Alert>
      </Box>
      
      {/* Different Sizes */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Different Sizes</Text>
        
        <Alert 
          variant="info" 
          size="small"
          marginBottom="md"
        >
          This is a small alert.
        </Alert>
        
        <Alert 
          variant="info" 
          size="medium"
          marginBottom="md"
        >
          This is a medium alert (default size).
        </Alert>
        
        <Alert 
          variant="info" 
          size="large"
          marginBottom="md"
        >
          This is a large alert.
        </Alert>
      </Box>
      
      {/* Icon Positions */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Icon Positions</Text>
        
        <Alert 
          variant="info" 
          hasIcon
          iconPosition="left"
          title="Icon on Left"
          marginBottom="md"
        >
          This alert has an icon positioned on the left (default position).
        </Alert>
        
        <Alert 
          variant="info" 
          hasIcon
          iconPosition="right"
          title="Icon on Right"
          marginBottom="md"
        >
          This alert has an icon positioned on the right.
        </Alert>
      </Box>
      
      {/* Interactive Example */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Interactive Example</Text>
        
        <Box border="neutral" padding="md" marginBottom="md">
          <Text as="h3" size="md" marginBottom="sm">Create Custom Alert</Text>
          
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="md">
              <Box>
                <Text as="label" htmlFor="message" marginBottom="xs" display="block">
                  Alert Message:
                </Text>
                <input 
                  type="text" 
                  id="message" 
                  name="message" 
                  placeholder="Enter alert message" 
                  style={{ width: '100%', padding: '8px' }}
                  required
                />
              </Box>
              
              <Box>
                <Text as="label" marginBottom="xs" display="block">
                  Alert Type:
                </Text>
                <Flex gap="md">
                  <label>
                    <input type="radio" name="type" value="info" defaultChecked /> Info
                  </label>
                  <label>
                    <input type="radio" name="type" value="success" /> Success
                  </label>
                  <label>
                    <input type="radio" name="type" value="warning" /> Warning
                  </label>
                  <label>
                    <input type="radio" name="type" value="error" /> Error
                  </label>
                </Flex>
              </Box>
              
              <Box>
                <Button type="submit">Show Alert</Button>
              </Box>
            </Flex>
          </form>
        </Box>
        
        {showFeedbackAlert && (
          <Alert 
            variant={feedbackType} 
            closable 
            onClose={() => setShowFeedbackAlert(false)}
            hasIcon
            title={`${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)} Alert`}
          >
            {feedbackMessage}
          </Alert>
        )}
      </Box>
      
      {/* Responsive Alert */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Responsive Alert</Text>
        
        <Alert 
          variant={{ base: 'info', md: 'success', lg: 'warning' }}
          size={{ base: 'small', md: 'medium', lg: 'large' }}
          hasIcon
          title="Responsive Alert"
        >
          This alert changes its variant and size based on the screen width. Resize your browser window to see the changes.
        </Alert>
      </Box>
      
      {/* Custom Styling */}
      <Box marginBottom="xl">
        <Text as="h2" size="lg" marginBottom="md">Custom Styling</Text>
        
        <Alert 
          style={{ 
            backgroundColor: '#f0f8ff', 
            borderColor: '#1e90ff',
            borderWidth: '2px',
            borderLeftWidth: '8px',
            color: '#0066cc'
          }}
          hasIcon
          icon={<Icon name="info-circle" style={{ color: '#1e90ff' }} />}
          title="Custom Styled Alert"
        >
          This alert uses custom styling through the style prop.
        </Alert>
      </Box>
    </Box>
  );
};

export default AlertExample;
