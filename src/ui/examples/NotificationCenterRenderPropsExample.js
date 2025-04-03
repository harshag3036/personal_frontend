import React, { useState, useEffect } from 'react';
import { NotificationCenter, Box, Text, Flex, Button, Card, Badge } from '../index';
import { 
  NOTIFICATION_TYPES, 
  NOTIFICATION_STATES, 
  NOTIFICATION_FILTER_TYPES 
} from '../organisms/NotificationCenter/constants';

/**
 * NotificationCenter Render Props Example
 * 
 * This example demonstrates how to use the NotificationCenter component with render props pattern
 * to create a highly customized notification interface with complete control over rendering.
 */
const NotificationCenterRenderPropsExample = () => {
  // Sample notifications data
  const initialNotifications = [
    {
      id: 1,
      title: 'System Update',
      message: 'A new system update is available. Please restart your device.',
      time: '5 minutes ago',
      date: new Date(Date.now() - 5 * 60 * 1000),
      type: NOTIFICATION_TYPES.SYSTEM,
      state: NOTIFICATION_STATES.UNREAD,
      priority: 2
    },
    {
      id: 2,
      title: 'New Message',
      message: 'You received a new message from Jane Smith.',
      time: '30 minutes ago',
      date: new Date(Date.now() - 30 * 60 * 1000),
      type: NOTIFICATION_TYPES.MESSAGE,
      state: NOTIFICATION_STATES.UNREAD,
      priority: 1
    },
    {
      id: 3,
      title: 'Task Completed',
      message: 'Your file upload has been completed successfully.',
      time: '2 hours ago',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: NOTIFICATION_TYPES.SUCCESS,
      state: NOTIFICATION_STATES.READ,
      priority: 0
    },
    {
      id: 4,
      title: 'Calendar Reminder',
      message: 'Meeting with the design team in 15 minutes.',
      time: 'Yesterday',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: NOTIFICATION_TYPES.REMINDER,
      state: NOTIFICATION_STATES.PINNED,
      priority: 3
    },
    {
      id: 5,
      title: 'Security Alert',
      message: 'Unusual login attempt detected from a new device.',
      time: 'Yesterday',
      date: new Date(Date.now() - 25 * 60 * 60 * 1000),
      type: NOTIFICATION_TYPES.ALERT,
      state: NOTIFICATION_STATES.UNREAD,
      priority: 3
    },
    {
      id: 6,
      title: 'Storage Warning',
      message: 'Your storage is almost full. Consider upgrading your plan.',
      time: '3 days ago',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      type: NOTIFICATION_TYPES.WARNING,
      state: NOTIFICATION_STATES.READ,
      priority: 2
    },
    {
      id: 7,
      title: 'Database Error',
      message: 'Connection to the database failed. Please contact support.',
      time: 'Last week',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      type: NOTIFICATION_TYPES.ERROR,
      state: NOTIFICATION_STATES.ARCHIVED,
      priority: 3
    }
  ];

  // State
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState(NOTIFICATION_FILTER_TYPES.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Handle mark as read
  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, state: NOTIFICATION_STATES.READ }
          : notification
      )
    );
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.state === NOTIFICATION_STATES.UNREAD
          ? { ...notification, state: NOTIFICATION_STATES.READ }
          : notification
      )
    );
  };

  // Handle dismiss
  const handleDismiss = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  // Handle pin
  const handlePin = (id, isPinned) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, state: isPinned ? NOTIFICATION_STATES.PINNED : NOTIFICATION_STATES.UNREAD }
          : notification
      )
    );
  };

  // Handle archive
  const handleArchive = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, state: NOTIFICATION_STATES.ARCHIVED }
          : notification
      )
    );
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.INFO:
        return '#2196F3';
      case NOTIFICATION_TYPES.SUCCESS:
        return '#4CAF50';
      case NOTIFICATION_TYPES.WARNING:
        return '#FF9800';
      case NOTIFICATION_TYPES.ERROR:
        return '#F44336';
      case NOTIFICATION_TYPES.SYSTEM:
        return '#9C27B0';
      case NOTIFICATION_TYPES.MESSAGE:
        return '#00BCD4';
      case NOTIFICATION_TYPES.ACTIVITY:
        return '#8BC34A';
      case NOTIFICATION_TYPES.ALERT:
        return '#E91E63';
      case NOTIFICATION_TYPES.REMINDER:
        return '#FF5722';
      case NOTIFICATION_TYPES.UPDATE:
        return '#3F51B5';
      default:
        return '#757575';
    }
  };

  // Get notification state icons
  const getStateIcon = (state) => {
    switch (state) {
      case NOTIFICATION_STATES.UNREAD:
        return '🔵';
      case NOTIFICATION_STATES.READ:
        return '✓';
      case NOTIFICATION_STATES.PINNED:
        return '📌';
      case NOTIFICATION_STATES.ARCHIVED:
        return '🗄️';
      default:
        return '';
    }
  };

  // Get display name for type
  const getTypeName = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.INFO:
        return 'Information';
      case NOTIFICATION_TYPES.SUCCESS:
        return 'Success';
      case NOTIFICATION_TYPES.WARNING:
        return 'Warning';
      case NOTIFICATION_TYPES.ERROR:
        return 'Error';
      case NOTIFICATION_TYPES.SYSTEM:
        return 'System';
      case NOTIFICATION_TYPES.MESSAGE:
        return 'Message';
      case NOTIFICATION_TYPES.ACTIVITY:
        return 'Activity';
      case NOTIFICATION_TYPES.ALERT:
        return 'Alert';
      case NOTIFICATION_TYPES.REMINDER:
        return 'Reminder';
      case NOTIFICATION_TYPES.UPDATE:
        return 'Update';
      default:
        return 'Unknown';
    }
  };

  // Unique categories from notifications
  const categories = Array.from(new Set(notifications.map(notification => notification.type)));

  // Filter notifications based on active filter, search query, and category
  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(notification => notification.type === selectedCategory);
    }
    
    // Apply state filter
    if (activeFilter === NOTIFICATION_FILTER_TYPES.UNREAD) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.UNREAD);
    } else if (activeFilter === NOTIFICATION_FILTER_TYPES.READ) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.READ);
    } else if (activeFilter === NOTIFICATION_FILTER_TYPES.PINNED) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.PINNED);
    } else if (activeFilter === NOTIFICATION_FILTER_TYPES.ARCHIVED) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.ARCHIVED);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notification => {
        const title = notification.title ? notification.title.toString().toLowerCase() : '';
        const message = notification.message ? notification.message.toString().toLowerCase() : '';
        return title.includes(query) || message.includes(query);
      });
    }
    
    return filtered;
  };

  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Notification Center with Render Props</Text>
      <Text marginBottom="lg">
        This example demonstrates how to use the NotificationCenter component with the render props pattern
        to create a highly customized notification interface with complete control over presentation and behavior.
      </Text>
      
      <Flex gap="lg" flexWrap="wrap">
        {/* Custom Notification Center - currently commented out as NotificationCenter doesn't yet support render props */}
        <Box 
          width="100%" 
          maxWidth="500px" 
          border="1px solid" 
          borderColor="borderColor" 
          borderRadius="lg"
          padding="md"
        >
          <Flex justifyContent="space-between" marginBottom="md">
            <Text as="h3">Notifications</Text>
            <Badge>{notifications.filter(n => n.state === NOTIFICATION_STATES.UNREAD).length}</Badge>
          </Flex>
          
          {/* Category Filters */}
          <Box marginBottom="md" overflowX="auto">
            <Flex gap="xs">
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  style={{ 
                    borderColor: getTypeColor(category),
                    color: selectedCategory === category ? 'white' : getTypeColor(category),
                    backgroundColor: selectedCategory === category ? getTypeColor(category) : 'transparent'
                  }}
                >
                  {getTypeName(category)}
                </Button>
              ))}
            </Flex>
          </Box>
          
          {/* State Filters */}
          <Flex marginBottom="md" gap="xs">
            <Button
              size="xs"
              variant={activeFilter === NOTIFICATION_FILTER_TYPES.ALL ? 'primary' : 'outline'}
              onClick={() => setActiveFilter(NOTIFICATION_FILTER_TYPES.ALL)}
            >
              All
            </Button>
            <Button
              size="xs"
              variant={activeFilter === NOTIFICATION_FILTER_TYPES.UNREAD ? 'primary' : 'outline'}
              onClick={() => setActiveFilter(NOTIFICATION_FILTER_TYPES.UNREAD)}
            >
              Unread
            </Button>
            <Button
              size="xs"
              variant={activeFilter === NOTIFICATION_FILTER_TYPES.PINNED ? 'primary' : 'outline'}
              onClick={() => setActiveFilter(NOTIFICATION_FILTER_TYPES.PINNED)}
            >
              Pinned
            </Button>
            <Button
              size="xs"
              variant={activeFilter === NOTIFICATION_FILTER_TYPES.ARCHIVED ? 'primary' : 'outline'}
              onClick={() => setActiveFilter(NOTIFICATION_FILTER_TYPES.ARCHIVED)}
            >
              Archived
            </Button>
          </Flex>
          
          {/* Search */}
          <Box marginBottom="md">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </Box>
          
          {/* Notification List */}
          <Box 
            maxHeight="400px" 
            overflowY="auto"
            marginBottom="md"
            style={{
              border: '1px solid #eee',
              borderRadius: '4px'
            }}
          >
            {getFilteredNotifications().length === 0 ? (
              <Box padding="lg" textAlign="center">
                <Text color="textColorSecondary">No notifications found</Text>
              </Box>
            ) : (
              <ul style={{ 
                listStyle: 'none', 
                margin: 0, 
                padding: 0 
              }}>
                {getFilteredNotifications().map(notification => (
                  <li 
                    key={notification.id}
                    style={{
                      borderBottom: '1px solid #eee',
                      padding: '12px',
                      backgroundColor: notification.state === NOTIFICATION_STATES.UNREAD ? '#f8f9fa' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <Flex alignItems="flex-start" justifyContent="space-between">
                      <Box flexGrow={1}>
                        <Flex alignItems="center" marginBottom="xs">
                          <Box 
                            width="10px" 
                            height="10px" 
                            backgroundColor={getTypeColor(notification.type)}
                            borderRadius="50%"
                            marginRight="xs"
                          />
                          <Text fontWeight="bold">{notification.title}</Text>
                          <Text fontSize="sm" color="textColorSecondary" marginLeft="xs">
                            {notification.time}
                          </Text>
                          {notification.state === NOTIFICATION_STATES.PINNED && (
                            <Text marginLeft="xs">📌</Text>
                          )}
                        </Flex>
                        <Text>{notification.message}</Text>
                      </Box>
                      
                      <Flex 
                        gap="xs" 
                        onClick={(e) => e.stopPropagation()} 
                        marginLeft="sm"
                      >
                        {notification.state === NOTIFICATION_STATES.UNREAD && (
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                            title="Mark as read"
                          >
                            ✓
                          </Button>
                        )}
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => handlePin(notification.id, notification.state !== NOTIFICATION_STATES.PINNED)}
                          title={notification.state === NOTIFICATION_STATES.PINNED ? "Unpin" : "Pin"}
                        >
                          {notification.state === NOTIFICATION_STATES.PINNED ? "📌" : "📍"}
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => handleArchive(notification.id)}
                          title="Archive"
                        >
                          🗄️
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => handleDismiss(notification.id)}
                          title="Dismiss"
                        >
                          ✕
                        </Button>
                      </Flex>
                    </Flex>
                  </li>
                ))}
              </ul>
            )}
          </Box>
          
          {/* Actions */}
          <Flex justifyContent="space-between">
            <Flex gap="xs">
              {notifications.filter(n => n.state === NOTIFICATION_STATES.UNREAD).length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </Flex>
            <Button size="sm" variant="text">View all</Button>
          </Flex>
        </Box>
        
        {/* Documentation and Code Example */}
        <Box flex="1" minWidth="300px">
          <Card padding="md">
            <Text as="h3" marginBottom="md">Benefits of Render Props</Text>
            <ul>
              <li>Complete control over the rendering of each notification</li>
              <li>Custom filtering and categorization beyond the built-in filters</li>
              <li>Ability to create your own visual design while using the component's state management</li>
              <li>Integration with other components in your application</li>
              <li>Adding custom interactions that aren't supported by the default component</li>
            </ul>
            
            <Text as="h3" marginTop="lg" marginBottom="md">How it Would Work</Text>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '5px', 
              overflowX: 'auto', 
              fontSize: '0.9em' 
            }}>
{`<NotificationCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onDismiss={handleDismiss}
>
  {({
    notifications,
    filteredNotifications,
    unreadCount,
    activeFilter,
    searchQuery,
    handleFilterChange,
    handleSearchChange,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDismiss,
    // ... other props and handlers
  }) => (
    <div className="custom-notification-center">
      {/* Custom header */}
      <div className="custom-header">
        <h3>Notifications ({unreadCount})</h3>
        
        {/* Custom filters */}
        <div className="custom-filters">
          {/* Your custom filter UI */}
        </div>
        
        {/* Custom search */}
        <div className="custom-search">
          <input 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div>
      </div>
      
      {/* Custom notification list */}
      <ul className="custom-list">
        {filteredNotifications.map(notification => (
          <li 
            key={notification.id}
            className={\`notification \${notification.state}\`}
          >
            {/* Custom notification layout */}
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span>{notification.time}</span>
            </div>
            
            {/* Custom actions */}
            <div className="notification-actions">
              <button onClick={() => handleMarkAsRead(notification.id)}>
                Mark as Read
              </button>
              <button onClick={() => handleDismiss(notification.id)}>
                Dismiss
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Custom footer */}
      <div className="custom-footer">
        <button onClick={handleMarkAllAsRead}>
          Mark All as Read
        </button>
      </div>
    </div>
  )}
</NotificationCenter>`}
            </pre>
            
            <Text as="h3" marginTop="lg" marginBottom="md">Implementation Note</Text>
            <Text>
              This example currently shows what a custom notification center would look like using render props, 
              but the NotificationCenter component doesn't yet support the render props pattern in our UI library. 
              This is a demonstration of how it could work once implemented.
            </Text>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default NotificationCenterRenderPropsExample;
