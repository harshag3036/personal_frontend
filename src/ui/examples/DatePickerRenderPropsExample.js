import React, { useState } from 'react';
import { Box, Text, Flex, Button, Icon } from '../atoms';
import Card from '../molecules/Card';
import DatePicker from '../molecules/DatePicker';

/**
 * DatePickerRenderPropsExample
 * 
 * This example demonstrates how to use the DatePicker component with render props
 * to create highly customized date selection interfaces.
 */
const DatePickerRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom DatePickers with Render Props</Text>
      
      {/* Basic Custom DatePicker */}
      <Text as="h3" marginBottom="md">Custom Styled DatePicker</Text>
      <Box marginBottom="xl">
        <CustomStyledDatePicker />
      </Box>
      
      {/* Date Range Picker */}
      <Text as="h3" marginY="md">Date Range Picker</Text>
      <Box marginBottom="xl">
        <DateRangePicker />
      </Box>
      
      {/* Calendar with Events */}
      <Text as="h3" marginY="md">Calendar with Events</Text>
      <Box marginBottom="xl">
        <CalendarWithEvents />
      </Box>
    </Box>
  );
};

/**
 * CustomStyledDatePicker
 * 
 * Demonstrates a date picker with custom styling using render props.
 */
const CustomStyledDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  return (
    <Box maxWidth="350px">
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        variant="minimal"
      >
        {(datePickerState) => (
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb="xs">Select a Date</Text>
            
            {/* Custom Input Field */}
            <Flex 
              onClick={datePickerState.toggleCalendar}
              border="1px solid"
              borderColor={datePickerState.isCalendarOpen ? "primary.500" : "border"}
              borderRadius="md"
              p="sm"
              backgroundColor="white"
              cursor="pointer"
              _hover={{ borderColor: "primary.400" }}
              alignItems="center"
              justifyContent="space-between"
              boxShadow={datePickerState.isCalendarOpen ? "0 0 0 2px rgba(66, 153, 225, 0.3)" : "none"}
              mb="sm"
            >
              <Flex alignItems="center">
                <Icon name="calendar" color="primary.500" size="md" mr="sm" />
                <Text fontWeight="medium">
                  {datePickerState.formattedDate || 'Select a date'}
                </Text>
              </Flex>
              
              {datePickerState.selectedDate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    datePickerState.clearDate(e);
                  }}
                  p="0"
                  width="24px"
                  height="24px"
                  borderRadius="full"
                >
                  <Icon name="x" size="sm" />
                </Button>
              )}
            </Flex>
            
            {/* Custom Calendar */}
            {datePickerState.isCalendarOpen && (
              <Card 
                boxShadow="lg"
                borderRadius="md" 
                overflow="hidden"
                p="0"
              >
                {/* Calendar Header */}
                <Flex 
                  justifyContent="space-between" 
                  alignItems="center" 
                  backgroundColor="primary.500" 
                  color="white" 
                  p="md"
                >
                  <Button
                    variant="ghost"
                    color="white"
                    size="sm"
                    onClick={datePickerState.goToPreviousMonth}
                    _hover={{ backgroundColor: "primary.600" }}
                  >
                    <Icon name="chevron-left" />
                  </Button>
                  
                  <Text fontWeight="bold">
                    {datePickerState.monthYearString}
                  </Text>
                  
                  <Button
                    variant="ghost"
                    color="white"
                    size="sm"
                    onClick={datePickerState.goToNextMonth}
                    _hover={{ backgroundColor: "primary.600" }}
                  >
                    <Icon name="chevron-right" />
                  </Button>
                </Flex>
                
                {/* Calendar Days */}
                <Box p="sm">
                  {/* Day Names */}
                  <Flex justifyContent="space-between" mb="sm">
                    {datePickerState.dayNames.map((day, index) => (
                      <Text 
                        key={index} 
                        width="36px" 
                        textAlign="center" 
                        fontSize="xs" 
                        fontWeight="bold" 
                        color="text.muted"
                      >
                        {day}
                      </Text>
                    ))}
                  </Flex>
                  
                  {/* Calendar Grid */}
                  <Box>
                    {datePickerState.days.reduce((rows, day, index) => {
                      if (index % 7 === 0) rows.push([]);
                      rows[rows.length - 1].push(day);
                      return rows;
                    }, []).map((week, weekIndex) => (
                      <Flex justifyContent="space-between" key={weekIndex} mb="xs">
                        {week.map((day, dayIndex) => (
                          <Flex
                            key={dayIndex}
                            width="36px"
                            height="36px"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="full"
                            cursor={day.isSelectable ? "pointer" : "not-allowed"}
                            backgroundColor={
                              datePickerState.isSelected(day.date) 
                                ? "primary.500" 
                                : datePickerState.isToday(day.date)
                                ? "primary.50"
                                : "transparent"
                            }
                            color={
                              datePickerState.isSelected(day.date)
                                ? "white"
                                : !day.isCurrentMonth
                                ? "text.disabled"
                                : !day.isSelectable
                                ? "text.disabled"
                                : "text.primary"
                            }
                            fontWeight={datePickerState.isSelected(day.date) || datePickerState.isToday(day.date) ? "bold" : "normal"}
                            onClick={() => day.isSelectable && datePickerState.selectDate(day.date)}
                            _hover={
                              day.isSelectable && !datePickerState.isSelected(day.date)
                                ? { backgroundColor: "gray.100" }
                                : {}
                            }
                          >
                            {day.date.getDate()}
                          </Flex>
                        ))}
                      </Flex>
                    ))}
                  </Box>
                  
                  {/* Footer */}
                  <Flex justifyContent="space-between" mt="sm" pt="sm" borderTop="1px solid" borderColor="border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={datePickerState.goToToday}
                    >
                      Today
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={datePickerState.toggleCalendar}
                    >
                      Close
                    </Button>
                  </Flex>
                </Box>
              </Card>
            )}
          </Box>
        )}
      </DatePicker>
    </Box>
  );
};

/**
 * DateRangePicker
 * 
 * Demonstrates a date range picker using two DatePickers with render props.
 */
const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeCalendar, setActiveCalendar] = useState(null); // 'start' or 'end'
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If selecting a start date after the end date, clear the end date
    if (endDate && date > endDate) {
      setEndDate(null);
    }
    // Switch focus to end date picker after selecting start date
    if (date) {
      setActiveCalendar('end');
    }
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
    // Close the calendar after selecting end date
    if (date) {
      setActiveCalendar(null);
    }
  };
  
  // Format the date range as text
  const formatDateRange = () => {
    if (!startDate && !endDate) return 'Select a date range';
    if (startDate && !endDate) return `From ${formatDate(startDate)}`;
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };
  
  // Helper function to format a date
  const formatDate = (date) => {
    if (!date) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <Box maxWidth="600px">
      <Card p="md" boxShadow="md">
        <Text fontSize="lg" fontWeight="bold" mb="md">Date Range Selection</Text>
        
        {/* Date Range Display */}
        <Box 
          p="md" 
          backgroundColor="background.alt" 
          borderRadius="md" 
          mb="md"
          border="1px solid"
          borderColor="border"
        >
          <Flex alignItems="center">
            <Icon name="calendar" color="primary.500" mr="sm" />
            <Text fontWeight="medium">{formatDateRange()}</Text>
          </Flex>
        </Box>
        
        <Flex gap="md">
          {/* Start Date Picker */}
          <Box flex="1">
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              maxDate={endDate}
            >
              {(startDateState) => (
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb="xs">Start Date</Text>
                  
                  {/* Start Date Input */}
                  <Box
                    onClick={() => setActiveCalendar(activeCalendar === 'start' ? null : 'start')}
                    border="1px solid"
                    borderColor={activeCalendar === 'start' ? "primary.500" : "border"}
                    borderRadius="md"
                    p="sm"
                    backgroundColor="white"
                    cursor="pointer"
                    _hover={{ borderColor: "primary.400" }}
                  >
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text color={startDate ? "text.primary" : "text.muted"}>
                        {startDate ? formatDate(startDate) : 'Select start date'}
                      </Text>
                      <Icon name="calendar" size="sm" color="text.muted" />
                    </Flex>
                  </Box>
                  
                  {/* Start Date Calendar */}
                  {activeCalendar === 'start' && (
                    <Box
                      position="relative"
                      zIndex="10"
                      mt="xs"
                    >
                      <Card boxShadow="lg" p="0">
                        {/* Calendar Header */}
                        <Flex 
                          justifyContent="space-between" 
                          alignItems="center" 
                          p="sm"
                          borderBottom="1px solid"
                          borderColor="border"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={startDateState.goToPreviousMonth}
                          >
                            <Icon name="chevron-left" />
                          </Button>
                          
                          <Text fontWeight="medium">
                            {startDateState.monthYearString}
                          </Text>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={startDateState.goToNextMonth}
                          >
                            <Icon name="chevron-right" />
                          </Button>
                        </Flex>
                        
                        {/* Calendar Days */}
                        <Box p="sm">
                          {/* Day Names */}
                          <Flex justifyContent="space-between" mb="sm">
                            {startDateState.dayNames.map((day, index) => (
                              <Text 
                                key={index} 
                                width="36px" 
                                textAlign="center" 
                                fontSize="xs" 
                                fontWeight="bold" 
                                color="text.muted"
                              >
                                {day}
                              </Text>
                            ))}
                          </Flex>
                          
                          {/* Calendar Grid */}
                          <Box>
                            {startDateState.days.reduce((rows, day, index) => {
                              if (index % 7 === 0) rows.push([]);
                              rows[rows.length - 1].push(day);
                              return rows;
                            }, []).map((week, weekIndex) => (
                              <Flex justifyContent="space-between" key={weekIndex} mb="xs">
                                {week.map((day, dayIndex) => {
                                  const isInRange = endDate && day.date > startDate && day.date < endDate;
                                  return (
                                    <Flex
                                      key={dayIndex}
                                      width="36px"
                                      height="36px"
                                      alignItems="center"
                                      justifyContent="center"
                                      backgroundColor={
                                        startDateState.isSelected(day.date) 
                                          ? "primary.500" 
                                          : isInRange
                                          ? "primary.100"
                                          : startDateState.isToday(day.date)
                                          ? "primary.50"
                                          : "transparent"
                                      }
                                      color={
                                        startDateState.isSelected(day.date)
                                          ? "white"
                                          : !day.isCurrentMonth
                                          ? "text.disabled"
                                          : !day.isSelectable
                                          ? "text.disabled"
                                          : "text.primary"
                                      }
                                      fontWeight={startDateState.isSelected(day.date) || startDateState.isToday(day.date) ? "bold" : "normal"}
                                      borderRadius="full"
                                      cursor={day.isSelectable ? "pointer" : "not-allowed"}
                                      onClick={() => day.isSelectable && startDateState.selectDate(day.date)}
                                      _hover={
                                        day.isSelectable && !startDateState.isSelected(day.date)
                                          ? { backgroundColor: "gray.100" }
                                          : {}
                                      }
                                    >
                                      {day.date.getDate()}
                                    </Flex>
                                  );
                                })}
                              </Flex>
                            ))}
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  )}
                </Box>
              )}
            </DatePicker>
          </Box>
          
          {/* End Date Picker */}
          <Box flex="1">
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              minDate={startDate}
            >
              {(endDateState) => (
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb="xs">End Date</Text>
                  
                  {/* End Date Input */}
                  <Box
                    onClick={() => setActiveCalendar(activeCalendar === 'end' ? null : 'end')}
                    border="1px solid"
                    borderColor={activeCalendar === 'end' ? "primary.500" : "border"}
                    borderRadius="md"
                    p="sm"
                    backgroundColor="white"
                    cursor="pointer"
                    _hover={{ borderColor: "primary.400" }}
                  >
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text color={endDate ? "text.primary" : "text.muted"}>
                        {endDate ? formatDate(endDate) : 'Select end date'}
                      </Text>
                      <Icon name="calendar" size="sm" color="text.muted" />
                    </Flex>
                  </Box>
                  
                  {/* End Date Calendar */}
                  {activeCalendar === 'end' && (
                    <Box
                      position="relative"
                      zIndex="10"
                      mt="xs"
                    >
                      <Card boxShadow="lg" p="0">
                        {/* Calendar Header */}
                        <Flex 
                          justifyContent="space-between" 
                          alignItems="center" 
                          p="sm"
                          borderBottom="1px solid"
                          borderColor="border"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={endDateState.goToPreviousMonth}
                          >
                            <Icon name="chevron-left" />
                          </Button>
                          
                          <Text fontWeight="medium">
                            {endDateState.monthYearString}
                          </Text>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={endDateState.goToNextMonth}
                          >
                            <Icon name="chevron-right" />
                          </Button>
                        </Flex>
                        
                        {/* Calendar Days */}
                        <Box p="sm">
                          {/* Day Names */}
                          <Flex justifyContent="space-between" mb="sm">
                            {endDateState.dayNames.map((day, index) => (
                              <Text 
                                key={index} 
                                width="36px" 
                                textAlign="center" 
                                fontSize="xs" 
                                fontWeight="bold" 
                                color="text.muted"
                              >
                                {day}
                              </Text>
                            ))}
                          </Flex>
                          
                          {/* Calendar Grid */}
                          <Box>
                            {endDateState.days.reduce((rows, day, index) => {
                              if (index % 7 === 0) rows.push([]);
                              rows[rows.length - 1].push(day);
                              return rows;
                            }, []).map((week, weekIndex) => (
                              <Flex justifyContent="space-between" key={weekIndex} mb="xs">
                                {week.map((day, dayIndex) => {
                                  const isInRange = startDate && day.date > startDate && day.date < endDate;
                                  return (
                                    <Flex
                                      key={dayIndex}
                                      width="36px"
                                      height="36px"
                                      alignItems="center"
                                      justifyContent="center"
                                      backgroundColor={
                                        endDateState.isSelected(day.date) 
                                          ? "primary.500" 
                                          : isInRange
                                          ? "primary.100"
                                          : endDateState.isToday(day.date)
                                          ? "primary.50"
                                          : "transparent"
                                      }
                                      color={
                                        endDateState.isSelected(day.date)
                                          ? "white"
                                          : !day.isCurrentMonth
                                          ? "text.disabled"
                                          : !day.isSelectable
                                          ? "text.disabled"
                                          : "text.primary"
                                      }
                                      fontWeight={endDateState.isSelected(day.date) || endDateState.isToday(day.date) ? "bold" : "normal"}
                                      borderRadius="full"
                                      cursor={day.isSelectable ? "pointer" : "not-allowed"}
                                      onClick={() => day.isSelectable && endDateState.selectDate(day.date)}
                                      _hover={
                                        day.isSelectable && !endDateState.isSelected(day.date)
                                          ? { backgroundColor: "gray.100" }
                                          : {}
                                      }
                                    >
                                      {day.date.getDate()}
                                    </Flex>
                                  );
                                })}
                              </Flex>
                            ))}
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  )}
                </Box>
              )}
            </DatePicker>
          </Box>
        </Flex>
        
        {/* Actions */}
        <Flex justifyContent="flex-end" mt="md" pt="md" borderTop="1px solid" borderColor="border">
          <Button
            variant="outline"
            mr="sm"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              setActiveCalendar(null);
            }}
          >
            Clear
          </Button>
          
          <Button
            variant="solid"
            colorScheme="primary"
            disabled={!startDate || !endDate}
            onClick={() => {
              setActiveCalendar(null);
              // Here you would typically handle the selected date range
              console.log('Date range selected:', { startDate, endDate });
            }}
          >
            Apply
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

/**
 * CalendarWithEvents
 * 
 * Demonstrates a calendar with event indicators using DatePicker render props.
 */
const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample events data
  const events = [
    { date: new Date(2025, 3, 5), title: 'Team Meeting', type: 'work' },
    { date: new Date(2025, 3, 8), title: 'Doctor Appointment', type: 'personal' },
    { date: new Date(2025, 3, 12), title: 'Project Deadline', type: 'work' },
    { date: new Date(2025, 3, 15), title: 'Birthday Party', type: 'personal' },
    { date: new Date(2025, 3, 18), title: 'Conference Call', type: 'work' },
    { date: new Date(2025, 3, 22), title: 'Vacation Start', type: 'personal' },
    { date: new Date(2025, 3, 25), title: 'Quarterly Review', type: 'work' },
    { date: new Date(2025, 3, 28), title: 'Dinner Reservation', type: 'personal' },
  ];
  
  // Check if a date has events
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get event details for the selected date
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  // Format the date
  const formatFullDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <Box maxWidth="800px">
      <Card p="md" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" mb="md">Event Calendar</Text>
        
        <Flex gap="md">
          {/* Calendar */}
          <Box width="60%">
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              showTodayButton={false}
            >
              {(datePickerState) => (
                <Box>
                  {/* Custom Calendar */}
                  <Card boxShadow="sm" p="0">
                    {/* Calendar Header */}
                    <Flex 
                      justifyContent="space-between" 
                      alignItems="center" 
                      p="md"
                      backgroundColor="background.alt"
                      borderBottom="1px solid"
                      borderColor="border"
                    >
                      <Button
                        variant="ghost"
                        onClick={datePickerState.goToPreviousMonth}
                      >
                        <Icon name="chevron-left" />
                      </Button>
                      
                      <Text fontSize="lg" fontWeight="bold">
                        {datePickerState.monthYearString}
                      </Text>
                      
                      <Button
                        variant="ghost"
                        onClick={datePickerState.goToNextMonth}
                      >
                        <Icon name="chevron-right" />
                      </Button>
                    </Flex>
                    
                    {/* Calendar Days */}
                    <Box p="md">
                      {/* Day Names */}
                      <Flex justifyContent="space-between" mb="md">
                        {datePickerState.dayNames.map((day, index) => (
                          <Box 
                            key={index} 
                            width="40px" 
                            textAlign="center"
                          >
                            <Text fontWeight="bold" color="text.muted">
                              {day}
                            </Text>
                          </Box>
                        ))}
                      </Flex>
                      
                      {/* Calendar Grid */}
                      <Box>
                        {datePickerState.days.reduce((rows, day, index) => {
                          if (index % 7 === 0) rows.push([]);
                          rows[rows.length - 1].push(day);
                          return rows;
                        }, []).map((week, weekIndex) => (
                          <Flex key={weekIndex} mb="md">
                            {week.map((day, dayIndex) => {
                              const dateEvents = getEventsForDate(day.date);
                              const hasEvents = dateEvents.length > 0;
                              
                              return (
                                <Box key={dayIndex} width="40px" height="50px" position="relative">
                                  <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    width="36px"
                                    height="36px"
                                    borderRadius="full"
                                    cursor={day.isSelectable ? "pointer" : "not-allowed"}
                                    backgroundColor={
                                      datePickerState.isSelected(day.date) 
                                        ? "primary.500" 
                                        : datePickerState.isToday(day.date)
                                        ? "primary.50"
                                        : "transparent"
                                    }
                                    color={
                                      datePickerState.isSelected(day.date)
                                        ? "white"
                                        : !day.isCurrentMonth
                                        ? "text.disabled"
                                        : !day.isSelectable
                                        ? "text.disabled"
                                        : "text.primary"
                                    }
                                    fontWeight={
                                      datePickerState.isSelected(day.date) || datePickerState.isToday(day.date)
                                        ? "bold"
                                        : "normal"
                                    }
                                    onClick={() => day.isSelectable && datePickerState.selectDate(day.date)}
                                    _hover={
                                      day.isSelectable && !datePickerState.isSelected(day.date)
                                        ? { backgroundColor: "gray.100" }
                                        : {}
                                    }
                                  >
                                    {day.date.getDate()}
                                  </Flex>
                                  
                                  {/* Event indicators */}
                                  {hasEvents && day.isCurrentMonth && (
                                    <Flex justifyContent="center" mt="2px">
                                      {dateEvents.slice(0, 3).map((event, i) => (
                                        <Box 
                                          key={i}
                                          width="6px"
                                          height="6px"
                                          borderRadius="full"
                                          backgroundColor={event.type === 'work' ? "blue.500" : "green.500"}
                                          mx="1px"
                                        />
                                      ))}
                                      {dateEvents.length > 3 && (
                                        <Text fontSize="xs" ml="1px">+{dateEvents.length - 3}</Text>
                                      )}
                                    </Flex>
                                  )}
                                </Box>
                              );
                            })}
                          </Flex>
                        ))}
                      </Box>
                    </Box>
                    
                    {/* Calendar Footer */}
                    <Flex justifyContent="space-between" p="sm" borderTop="1px solid" borderColor="border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={datePickerState.goToToday}
                      >
                        Today
                      </Button>
                      
                      <Flex alignItems="center">
                        <Box width="10px" height="10px" borderRadius="full" backgroundColor="blue.500" mr="xs" />
                        <Text fontSize="xs" color="text.muted" mr="md">Work</Text>
                        <Box width="10px" height="10px" borderRadius="full" backgroundColor="green.500" mr="xs" />
                        <Text fontSize="xs" color="text.muted">Personal</Text>
                      </Flex>
                    </Flex>
                  </Card>
                </Box>
              )}
            </DatePicker>
          </Box>
          
          {/* Event details for selected date */}
          <Box width="40%">
            <Card boxShadow="sm" height="100%">
              <Box p="md" borderBottom="1px solid" borderColor="border" backgroundColor="background.alt">
                <Text fontSize="md" fontWeight="bold">
                  {formatFullDate(selectedDate)}
                </Text>
              </Box>
              
              <Box p="md">
                {selectedDateEvents.length > 0 ? (
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" mb="sm">
                      {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'Event' : 'Events'} Today
                    </Text>
                    
                    {selectedDateEvents.map((event, index) => (
                      <Flex 
                        key={index}
                        mb="sm" 
                        p="sm" 
                        borderLeft="3px solid" 
                        borderColor={event.type === 'work' ? "blue.500" : "green.500"}
                        backgroundColor={event.type === 'work' ? "blue.50" : "green.50"}
                        borderRadius="sm"
                      >
                        <Text fontWeight="medium">{event.title}</Text>
                      </Flex>
                    ))}
                  </Box>
                ) : (
                  <Flex 
                    height="100%" 
                    alignItems="center" 
                    justifyContent="center"
                    flexDirection="column"
                    color="text.muted"
                    p="md"
                  >
                    <Icon name="calendar" size="lg" mb="sm" />
                    <Text>No events scheduled for this day</Text>
                  </Flex>
                )}
              </Box>
            </Card>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default DatePickerRenderPropsExample;
