import React, { useState } from 'react';
import { Calendar, Box, Text, Button, Flex, Stack, Icon } from '../index';
import { CALENDAR_VIEW_TYPES, CALENDAR_SELECTION_MODES } from '../organisms/Calendar/constants';

/**
 * Calendar Render Props Example
 * 
 * This example demonstrates using the Calendar component with the render props pattern
 * to create a custom calendar implementation with advanced event filtering and custom UI.
 */
const CalendarRenderPropsExample = () => {
  // Sample events data
  const initialEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2025, 2, 15, 10, 0),
      end: new Date(2025, 2, 15, 11, 30),
      color: '#4285f4',
      category: 'work'
    },
    {
      id: 2,
      title: 'Product Demo',
      start: new Date(2025, 2, 15, 14, 0),
      end: new Date(2025, 2, 15, 15, 0),
      color: '#4285f4',
      category: 'work'
    },
    {
      id: 3,
      title: 'Lunch with Alex',
      start: new Date(2025, 2, 16, 12, 30),
      end: new Date(2025, 2, 16, 13, 30),
      color: '#0f9d58',
      category: 'personal'
    },
    {
      id: 4,
      title: 'Dentist Appointment',
      start: new Date(2025, 2, 17, 9, 0),
      end: new Date(2025, 2, 17, 10, 0),
      color: '#db4437',
      category: 'health'
    },
    {
      id: 5,
      title: 'Gym',
      start: new Date(2025, 2, 18, 18, 0),
      end: new Date(2025, 2, 18, 19, 30),
      color: '#f4b400',
      category: 'health'
    },
    {
      id: 6,
      title: 'Client Call',
      start: new Date(2025, 2, 19, 11, 0),
      end: new Date(2025, 2, 19, 12, 0),
      color: '#4285f4',
      category: 'work'
    },
    {
      id: 7,
      title: 'Birthday Party',
      start: new Date(2025, 2, 20),
      end: new Date(2025, 2, 20),
      allDay: true,
      color: '#0f9d58',
      category: 'personal'
    },
    {
      id: 8,
      title: 'Conference',
      start: new Date(2025, 2, 22),
      end: new Date(2025, 2, 24),
      allDay: true,
      color: '#4285f4',
      category: 'work'
    }
  ];
  
  // State
  const [events, setEvents] = useState(initialEvents);
  const [categoryFilters, setCategoryFilters] = useState({
    work: true,
    personal: true,
    health: true
  });
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 15));
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  // Filter events based on category filters
  const filteredEvents = events.filter(event => categoryFilters[event.category]);
  
  // Handle category filter change
  const handleCategoryFilterChange = (category) => {
    setCategoryFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEventId(event.id === selectedEventId ? null : event.id);
  };
  
  return (
    <Box padding="lg">
      <Text as="h2" marginBottom="md">Custom Calendar with Render Props</Text>
      
      <Calendar
        date={currentDate}
        events={filteredEvents}
        selectionMode={CALENDAR_SELECTION_MODES.SINGLE}
        onEventClick={handleEventClick}
      >
        {(calendarContext) => {
          const { 
            currentDate,
            currentView,
            year,
            month,
            events,
            navigateToPrev,
            navigateToNext,
            navigateToToday,
            handleViewChange,
            getTitle,
            renderMonthView
          } = calendarContext;
          
          // Get the selected event
          const selectedEvent = events.find(e => e.id === selectedEventId);
          
          return (
            <Stack spacing="lg">
              {/* Custom category filters panel */}
              <Box 
                padding="md" 
                backgroundColor="#f5f5f5" 
                borderRadius="md"
              >
                <Text as="h3" marginBottom="sm">Event Categories</Text>
                <Flex gap="md">
                  <Box 
                    as="label"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <input 
                      type="checkbox" 
                      checked={categoryFilters.work}
                      onChange={() => handleCategoryFilterChange('work')}
                      style={{ marginRight: '8px' }}
                    />
                    <Box 
                      width="12px" 
                      height="12px" 
                      backgroundColor="#4285f4" 
                      borderRadius="50%" 
                      display="inline-block"
                      marginRight="8px"
                    />
                    Work
                  </Box>
                  
                  <Box 
                    as="label"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <input 
                      type="checkbox" 
                      checked={categoryFilters.personal}
                      onChange={() => handleCategoryFilterChange('personal')}
                      style={{ marginRight: '8px' }}
                    />
                    <Box 
                      width="12px" 
                      height="12px" 
                      backgroundColor="#0f9d58" 
                      borderRadius="50%" 
                      display="inline-block"
                      marginRight="8px"
                    />
                    Personal
                  </Box>
                  
                  <Box 
                    as="label"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <input 
                      type="checkbox" 
                      checked={categoryFilters.health}
                      onChange={() => handleCategoryFilterChange('health')}
                      style={{ marginRight: '8px' }}
                    />
                    <Box 
                      width="12px" 
                      height="12px" 
                      backgroundColor="#db4437" 
                      borderRadius="50%" 
                      display="inline-block" 
                      marginRight="8px"
                    />
                    Health
                  </Box>
                </Flex>
              </Box>
              
              {/* Custom header with custom styles */}
              <Box 
                padding="md" 
                backgroundColor="#fff" 
                borderRadius="md" 
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text as="h2" fontSize="xl" fontWeight="bold">
                    {getTitle()}
                  </Text>
                  
                  <Flex gap="sm">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={navigateToToday}
                    >
                      Today
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={navigateToPrev}
                    >
                      <Icon name="arrow-left" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={navigateToNext}
                    >
                      <Icon name="arrow-right" />
                    </Button>
                    
                    <Box
                      as="select"
                      value={currentView}
                      onChange={(e) => handleViewChange(e.target.value)}
                      marginLeft="md"
                      padding="sm"
                      borderRadius="md"
                    >
                      <option value={CALENDAR_VIEW_TYPES.MONTH}>Month</option>
                      <option value={CALENDAR_VIEW_TYPES.WEEK}>Week</option>
                      <option value={CALENDAR_VIEW_TYPES.DAY}>Day</option>
                      <option value={CALENDAR_VIEW_TYPES.AGENDA}>Agenda</option>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              
              {/* Custom rendering for the calendar */}
              <Box 
                border="1px solid #eee" 
                borderRadius="md" 
                overflow="hidden"
                boxShadow="0 1px 3px rgba(0,0,0,0.1)"
              >
                {renderMonthView()}
              </Box>
              
              {/* Event details section */}
              {selectedEvent && (
                <Box 
                  padding="lg" 
                  backgroundColor="#fff" 
                  borderRadius="md" 
                  boxShadow="0 2px 4px rgba(0,0,0,0.1)" 
                  marginTop="md"
                >
                  <Flex alignItems="flex-start" justifyContent="space-between">
                    <Box>
                      <Text as="h3" fontSize="lg" fontWeight="bold">
                        {selectedEvent.title}
                      </Text>
                      
                      <Text color="gray.600" marginTop="xs">
                        {selectedEvent.allDay ? 
                          new Date(selectedEvent.start).toLocaleDateString() : 
                          `${new Date(selectedEvent.start).toLocaleString()} - ${new Date(selectedEvent.end).toLocaleTimeString()}`
                        }
                      </Text>
                      
                      <Flex marginTop="sm" alignItems="center">
                        <Box 
                          width="10px" 
                          height="10px" 
                          backgroundColor={selectedEvent.color} 
                          borderRadius="50%" 
                          marginRight="8px"
                        />
                        <Text textTransform="capitalize">
                          {selectedEvent.category}
                        </Text>
                      </Flex>
                    </Box>
                    
                    <Button 
                      variant="text" 
                      size="sm" 
                      onClick={() => setSelectedEventId(null)}
                    >
                      <Icon name="x" />
                    </Button>
                  </Flex>
                  
                  <Box marginTop="md">
                    <Text as="h4" fontSize="md" fontWeight="bold" marginBottom="xs">
                      Actions
                    </Text>
                    <Flex gap="sm">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" color="danger">Delete</Button>
                      <Button size="sm" variant="outline">Share</Button>
                    </Flex>
                  </Box>
                </Box>
              )}
            </Stack>
          );
        }}
      </Calendar>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Benefits of Render Props with Calendar</Text>
      <ul>
        <li>Complete control over calendar UI while leveraging calendar logic</li>
        <li>Add custom filtering that doesn't exist in the standard component</li>
        <li>Create event detail views and inline editing capabilities</li>
        <li>Apply custom styling and layouts while maintaining functionality</li>
        <li>Build specialized calendar applications with domain-specific features</li>
      </ul>
      
      <Text as="h3" marginTop="xl" marginBottom="md">Code Example</Text>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto', 
        fontSize: '0.9em' 
      }}>
{`<Calendar
  date={currentDate}
  events={filteredEvents}
  onEventClick={handleEventClick}
>
  {(calendarContext) => {
    const { 
      currentDate,
      renderMonthView,
      navigateToPrev,
      navigateToNext
      // ...many other properties and methods
    } = calendarContext;
    
    return (
      <div>
        {/* Custom header */}
        <div className="custom-header">
          <button onClick={navigateToPrev}>Previous</button>
          <h2>{currentDate.toLocaleDateString()}</h2>
          <button onClick={navigateToNext}>Next</button>
        </div>
        
        {/* Render the calendar view */}
        {renderMonthView()}
        
        {/* Custom components like event details, etc. */}
      </div>
    );
  }}
</Calendar>`}
      </pre>
    </Box>
  );
};

export default CalendarRenderPropsExample;
