/**
 * Calendar Component Stories
 * 
 * This file contains Storybook stories for the Calendar component.
 */

import React from 'react';
import Calendar from './Calendar';
import { 
  CALENDAR_VIEW_TYPES, 
  CALENDAR_SELECTION_MODES,
  CALENDAR_EVENT_DISPLAY,
  CALENDAR_VARIANTS,
  CALENDAR_SIZES
} from './constants';

export default {
  title: 'Organisms/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: 'A flexible calendar component that supports multiple views, event display, and date selection.'
      }
    }
  },
  argTypes: {
    date: { control: 'date' },
    events: { control: 'object' },
    view: { 
      control: { type: 'select', options: Object.values(CALENDAR_VIEW_TYPES) },
      defaultValue: CALENDAR_VIEW_TYPES.MONTH
    },
    size: { 
      control: { type: 'select', options: Object.values(CALENDAR_SIZES) },
      defaultValue: CALENDAR_SIZES.MEDIUM
    },
    variant: { 
      control: { type: 'select', options: Object.values(CALENDAR_VARIANTS) },
      defaultValue: CALENDAR_VARIANTS.DEFAULT
    },
    eventDisplay: { 
      control: { type: 'select', options: Object.values(CALENDAR_EVENT_DISPLAY) },
      defaultValue: CALENDAR_EVENT_DISPLAY.BLOCK
    },
    selectionMode: { 
      control: { type: 'select', options: Object.values(CALENDAR_SELECTION_MODES) },
      defaultValue: CALENDAR_SELECTION_MODES.NONE
    },
    headerToolbar: { control: 'boolean', defaultValue: true },
    viewToolbar: { control: 'boolean', defaultValue: true },
    showWeekends: { control: 'boolean', defaultValue: true },
    showAdjacentMonths: { control: 'boolean', defaultValue: true },
    maxEventsPerDay: { control: 'number', defaultValue: 3 },
    firstDayOfWeek: { 
      control: { type: 'radio', options: [0, 1] },
      defaultValue: 0,
      description: '0 = Sunday, 1 = Monday'
    }
  }
};

// Sample events for the calendar
const sampleEvents = [
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
];

// Default Template
const Template = (args) => <Calendar {...args} />;

// Basic Calendar
export const Basic = Template.bind({});
Basic.args = {
  events: []
};

// Calendar with Events
export const WithEvents = Template.bind({});
WithEvents.args = {
  events: sampleEvents
};

// Month View
export const MonthView = Template.bind({});
MonthView.args = {
  events: sampleEvents,
  view: CALENDAR_VIEW_TYPES.MONTH
};

// Week View
export const WeekView = Template.bind({});
WeekView.args = {
  events: sampleEvents,
  view: CALENDAR_VIEW_TYPES.WEEK
};

// Day View
export const DayView = Template.bind({});
DayView.args = {
  events: sampleEvents,
  view: CALENDAR_VIEW_TYPES.DAY
};

// Agenda View
export const AgendaView = Template.bind({});
AgendaView.args = {
  events: sampleEvents,
  view: CALENDAR_VIEW_TYPES.AGENDA
};

// Small Calendar
export const SmallCalendar = Template.bind({});
SmallCalendar.args = {
  events: sampleEvents.slice(0, 2),
  size: CALENDAR_SIZES.SMALL,
  viewToolbar: false
};

// Large Calendar
export const LargeCalendar = Template.bind({});
LargeCalendar.args = {
  events: sampleEvents,
  size: CALENDAR_SIZES.LARGE
};

// Calendar Variants
export const DefaultVariant = Template.bind({});
DefaultVariant.args = {
  events: sampleEvents,
  variant: CALENDAR_VARIANTS.DEFAULT
};

export const BorderedVariant = Template.bind({});
BorderedVariant.args = {
  events: sampleEvents,
  variant: CALENDAR_VARIANTS.BORDERED
};

export const CardVariant = Template.bind({});
CardVariant.args = {
  events: sampleEvents,
  variant: CALENDAR_VARIANTS.CARD
};

export const MinimalVariant = Template.bind({});
MinimalVariant.args = {
  events: sampleEvents,
  variant: CALENDAR_VARIANTS.MINIMAL
};

// Event Display Modes
export const BlockEventDisplay = Template.bind({});
BlockEventDisplay.args = {
  events: sampleEvents,
  eventDisplay: CALENDAR_EVENT_DISPLAY.BLOCK
};

export const DotEventDisplay = Template.bind({});
DotEventDisplay.args = {
  events: sampleEvents,
  eventDisplay: CALENDAR_EVENT_DISPLAY.DOT
};

export const TextEventDisplay = Template.bind({});
TextEventDisplay.args = {
  events: sampleEvents,
  eventDisplay: CALENDAR_EVENT_DISPLAY.TEXT
};

// Selection Modes
export const SingleSelection = Template.bind({});
SingleSelection.args = {
  events: sampleEvents,
  selectionMode: CALENDAR_SELECTION_MODES.SINGLE
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  events: sampleEvents,
  selectionMode: CALENDAR_SELECTION_MODES.MULTIPLE
};

export const RangeSelection = Template.bind({});
RangeSelection.args = {
  events: sampleEvents,
  selectionMode: CALENDAR_SELECTION_MODES.RANGE
};

// First Day of Week
export const MondayFirstDay = Template.bind({});
MondayFirstDay.args = {
  events: sampleEvents,
  firstDayOfWeek: CALENDAR_FIRST_DAY.MONDAY
};

// Without Weekends
export const HideWeekends = Template.bind({});
HideWeekends.args = {
  events: sampleEvents,
  showWeekends: false
};

// Without Adjacent Months
export const HideAdjacentMonths = Template.bind({});
HideAdjacentMonths.args = {
  events: sampleEvents,
  showAdjacentMonths: false
};

// Limited Events Per Day
export const LimitedEventsPerDay = Template.bind({});
LimitedEventsPerDay.args = {
  events: [
    ...sampleEvents,
    {
      id: 6,
      title: 'Code Review',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 14, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 15, 0),
      color: 'var(--color-primary-dark)'
    },
    {
      id: 7,
      title: 'Design Review',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 16, 0),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 17, 0),
      color: 'var(--color-success-dark)'
    }
  ],
  maxEventsPerDay: 2
};

// Without Toolbars
export const WithoutToolbars = Template.bind({});
WithoutToolbars.args = {
  events: sampleEvents,
  headerToolbar: false,
  viewToolbar: false
};

// Interactive Calendar
export const Interactive = (args) => {
  const [selectedDates, setSelectedDates] = React.useState([]);
  const [view, setView] = React.useState(CALENDAR_VIEW_TYPES.MONTH);
  
  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log('Selected dates:', dates);
  };
  
  const handleViewChange = (newView) => {
    setView(newView);
    console.log('View changed to:', newView);
  };
  
  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    alert(`Event clicked: ${event.title}`);
  };
  
  return (
    <Calendar
      {...args}
      view={view}
      selectedDates={selectedDates}
      onDateSelect={handleDateSelect}
      onViewChange={handleViewChange}
      onEventClick={handleEventClick}
    />
  );
};

Interactive.args = {
  events: sampleEvents,
  selectionMode: CALENDAR_SELECTION_MODES.MULTIPLE
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'An interactive calendar that logs actions to the console and shows alerts for event clicks.'
    }
  }
};
