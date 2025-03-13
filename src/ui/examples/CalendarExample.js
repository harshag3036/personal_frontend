/**
 * Calendar Example
 * 
 * This example demonstrates how to use the Calendar component
 * with various features and configurations.
 */

import React, { useState } from 'react';
import { Box, Text, Button, Icon } from '../atoms';
import Calendar, { 
  CALENDAR_VIEW_TYPES, 
  CALENDAR_SELECTION_MODES,
  CALENDAR_EVENT_DISPLAY,
  CALENDAR_VARIANTS,
  CALENDAR_SIZES
} from '../organisms/Calendar';

/**
 * CalendarExample Component
 * 
 * Demonstrates the usage of the Calendar component with
 * interactive features like event display, date selection, and different views.
 */
const CalendarExample = () => {
  // State
  const [view, setView] = useState(CALENDAR_VIEW_TYPES.MONTH);
  const [selectedDates, setSelectedDates] = useState([]);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 11, 30),
      color: 'var(--color-primary)'
    },
    {
      id: 2,
      title: 'Product Demo',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 14, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 18, 15, 0),
      color: 'var(--color-success)'
    },
    {
      id: 3,
      title: 'Client Call',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 9, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 10, 0),
      color: 'var(--color-warning)'
    },
    {
      id: 4,
      title: 'Project Deadline',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
      allDay: true,
      color: 'var(--color-danger)'
    },
    {
      id: 5,
      title: 'Team Lunch',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 12, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 13, 30),
      color: 'var(--color-info)'
    }
  ]);
  
  // Event handlers
  const handleViewChange = (newView) => {
    setView(newView);
  };
  
  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };
  
  const handleEventClick = (event) => {
    alert(`Event clicked: ${event.title}`);
  };
  
  const addRandomEvent = () => {
    // Generate a random date within the current month
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 12) + 8; // Between 8 AM and 8 PM
    
    const eventTitles = [
      'Team Sync', 
      'Client Meeting', 
      'Project Review', 
      'Training Session', 
      'Brainstorming',
      'Code Review',
      'Design Review',
      'Planning Session',
      'Retrospective',
      'One-on-One'
    ];
    
    const colors = [
      'var(--color-primary)',
      'var(--color-success)',
      'var(--color-warning)',
      'var(--color-danger)',
      'var(--color-info)'
    ];
    
    const newEvent = {
      id: events.length + 1,
      title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
      start: new Date(year, month, day, hour, 0),
      end: new Date(year, month, day, hour + Math.floor(Math.random() * 3) + 1, 0),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    setEvents([...events, newEvent]);
  };
  
  return (
    <Box padding="lg">
      <Text variant="h1" marginBottom="md">Calendar Component</Text>
      <Text variant="body1" marginBottom="lg">
        This example demonstrates a Calendar component with various features like event display, date selection, and different views.
      </Text>
      
      <Box marginBottom="lg">
        <Text variant="h2" marginBottom="sm">Features</Text>
        <Box display="flex" gap="md" flexWrap="wrap">
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Multiple Views</Text>
            <Text variant="body2">Month, week, day, and agenda views available.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Event Display</Text>
            <Text variant="body2">Display events with customizable colors and styles.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Date Selection</Text>
            <Text variant="body2">Single, multiple, or range date selection modes.</Text>
          </Box>
          
          <Box padding="md" background="background-subtle" borderRadius="md" flex="1" minWidth="200px">
            <Text variant="h3" marginBottom="xs">Customization</Text>
            <Text variant="body2">Various sizes, variants, and theming options.</Text>
          </Box>
        </Box>
      </Box>
      
      <Box marginBottom="md" display="flex" justifyContent="flex-end">
        <Button 
          variant="primary" 
          onClick={addRandomEvent}
          marginRight="sm"
        >
          <Icon name="plus" size="sm" marginRight="2xs" />
          Add Random Event
        </Button>
      </Box>
      
      <Box marginBottom="xl">
        <Calendar
          events={events}
          view={view}
          onViewChange={handleViewChange}
          selectionMode={CALENDAR_SELECTION_MODES.MULTIPLE}
          selectedDates={selectedDates}
          onDateSelect={handleDateSelect}
          onEventClick={handleEventClick}
          eventDisplay={CALENDAR_EVENT_DISPLAY.BLOCK}
          variant={CALENDAR_VARIANTS.CARD}
          size={CALENDAR_SIZES.MEDIUM}
          maxEventsPerDay={3}
          headerToolbar={true}
          viewToolbar={true}
          views={Object.values(CALENDAR_VIEW_TYPES)}
          firstDayOfWeek={0} // Sunday
          showWeekends={true}
          showAdjacentMonths={true}
        />
      </Box>
      
      <Box marginTop="lg">
        <Text variant="h2" marginBottom="sm">Selected Dates</Text>
        {selectedDates.length > 0 ? (
          <Box padding="md" background="background-subtle" borderRadius="md">
            <Text variant="body1">
              You have selected {selectedDates.length} date(s):
            </Text>
            <Box as="ul" marginTop="sm">
              {selectedDates.map((date, index) => (
                <Box as="li" key={index}>
                  {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Text color="text-muted">No dates selected. Click on dates in the calendar to select them.</Text>
        )}
      </Box>
      
      <Box marginTop="xl">
        <Text variant="h2" marginBottom="sm">Calendar Variants</Text>
        <Box display="flex" gap="md" flexWrap="wrap">
          <Box width="48%" marginBottom="lg">
            <Text variant="h3" marginBottom="xs">Default Variant</Text>
            <Calendar
              events={events.slice(0, 2)}
              view={CALENDAR_VIEW_TYPES.MONTH}
              variant={CALENDAR_VARIANTS.DEFAULT}
              size={CALENDAR_SIZES.SMALL}
              headerToolbar={true}
              viewToolbar={false}
            />
          </Box>
          
          <Box width="48%" marginBottom="lg">
            <Text variant="h3" marginBottom="xs">Bordered Variant</Text>
            <Calendar
              events={events.slice(0, 2)}
              view={CALENDAR_VIEW_TYPES.MONTH}
              variant={CALENDAR_VARIANTS.BORDERED}
              size={CALENDAR_SIZES.SMALL}
              headerToolbar={true}
              viewToolbar={false}
            />
          </Box>
          
          <Box width="48%" marginBottom="lg">
            <Text variant="h3" marginBottom="xs">Card Variant</Text>
            <Calendar
              events={events.slice(0, 2)}
              view={CALENDAR_VIEW_TYPES.MONTH}
              variant={CALENDAR_VARIANTS.CARD}
              size={CALENDAR_SIZES.SMALL}
              headerToolbar={true}
              viewToolbar={false}
            />
          </Box>
          
          <Box width="48%" marginBottom="lg">
            <Text variant="h3" marginBottom="xs">Minimal Variant</Text>
            <Calendar
              events={events.slice(0, 2)}
              view={CALENDAR_VIEW_TYPES.MONTH}
              variant={CALENDAR_VARIANTS.MINIMAL}
              size={CALENDAR_SIZES.SMALL}
              headerToolbar={true}
              viewToolbar={false}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarExample;
