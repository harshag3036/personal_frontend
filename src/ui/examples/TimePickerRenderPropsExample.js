import React, { useState } from 'react';
import TimePicker from '../molecules/TimePicker/TimePicker';
import { 
  TIMEPICKER_FORMATS, 
  TIMEPICKER_STEP 
} from '../molecules/TimePicker/constants';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Stack from '../atoms/Stack';
import Divider from '../atoms/Divider';
import Badge from '../atoms/Badge';

/**
 * TimePicker Render Props Example
 * 
 * This example demonstrates how to use the render props pattern with the TimePicker component
 * to create custom time picker interfaces.
 */
const TimePickerRenderPropsExample = () => {
  const [time, setTime] = useState(new Date());
  const [time24Hour, setTime24Hour] = useState(new Date());
  const [customTime, setCustomTime] = useState(new Date());

  return (
    <Stack direction="column" spacing="lg">
      <Box mb={4}>
        <Text variant="h2">TimePicker with Render Props</Text>
        <Text>The TimePicker component supports render props for custom time selection interfaces</Text>
      </Box>

      <Box mb={4}>
        <Text variant="h3">Standard TimePicker (12-hour format)</Text>
        <Text mb={2}>This is the default TimePicker without render props:</Text>
        <TimePicker 
          value={time} 
          onChange={setTime} 
          format={TIMEPICKER_FORMATS.TWELVE_HOUR}
          showSeconds
          clearable
        />
      </Box>

      <Divider my={4} />

      <Box mb={4}>
        <Text variant="h3">Standard TimePicker (24-hour format)</Text>
        <Text mb={2}>Default TimePicker with 24-hour format:</Text>
        <TimePicker 
          value={time24Hour} 
          onChange={setTime24Hour} 
          format={TIMEPICKER_FORMATS.TWENTY_FOUR_HOUR}
          step={TIMEPICKER_STEP.FIVE_MINUTES}
        />
      </Box>

      <Divider my={4} />

      <Box mb={4}>
        <Text variant="h3">Custom TimePicker with Render Props</Text>
        <Text mb={2}>Using render props to create a completely custom time selector interface:</Text>
        
        <TimePicker
          value={customTime}
          onChange={setCustomTime}
          format={TIMEPICKER_FORMATS.TWENTY_FOUR_HOUR}
          showSeconds
        >
          {(timeState) => (
            <Box 
              p={3} 
              border="1px solid" 
              borderColor="gray.200" 
              borderRadius="md" 
              width="100%"
              bg="white"
            >
              <Stack direction="column" spacing="md">
                {/* Custom header */}
                <Box 
                  p={2} 
                  bg="blue.50" 
                  borderRadius="md" 
                  display="flex" 
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="bold">Custom Time Selector</Text>
                  <Badge variant="subtle" colorScheme="blue">
                    {timeState.inputValue || 'No time selected'}
                  </Badge>
                </Box>
                
                {/* Custom time selector interface */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  {/* Hours */}
                  <Box>
                    <Text textAlign="center" mb={2} fontWeight="semibold">Hours</Text>
                    <Box 
                      display="grid" 
                      gridTemplateColumns="repeat(6, 1fr)" 
                      gap={1}
                      maxHeight="150px"
                      overflowY="auto"
                      p={2}
                      border="1px solid"
                      borderColor="gray.100"
                      borderRadius="md"
                    >
                      {timeState.hours.map((hour) => (
                        <Box 
                          key={`hour-${hour}`}
                          py={1}
                          px={2}
                          textAlign="center"
                          bg={timeState.selectedHour === hour ? "blue.500" : "gray.50"}
                          color={timeState.selectedHour === hour ? "white" : "inherit"}
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ bg: timeState.selectedHour === hour ? "blue.600" : "gray.100" }}
                          onClick={() => timeState.handleHourSelect(hour)}
                        >
                          {hour.toString().padStart(2, '0')}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  
                  {/* Minutes */}
                  <Box>
                    <Text textAlign="center" mb={2} fontWeight="semibold">Minutes</Text>
                    <Box 
                      display="grid" 
                      gridTemplateColumns="repeat(6, 1fr)" 
                      gap={1}
                      maxHeight="150px"
                      overflowY="auto"
                      p={2}
                      border="1px solid"
                      borderColor="gray.100"
                      borderRadius="md"
                    >
                      {timeState.minutes.map((minute) => (
                        <Box 
                          key={`minute-${minute}`}
                          py={1}
                          px={2}
                          textAlign="center"
                          bg={timeState.selectedMinute === minute ? "blue.500" : "gray.50"}
                          color={timeState.selectedMinute === minute ? "white" : "inherit"}
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ bg: timeState.selectedMinute === minute ? "blue.600" : "gray.100" }}
                          onClick={() => timeState.handleMinuteSelect(minute)}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  
                  {/* Seconds */}
                  {timeState.showSeconds && (
                    <Box>
                      <Text textAlign="center" mb={2} fontWeight="semibold">Seconds</Text>
                      <Box 
                        display="grid" 
                        gridTemplateColumns="repeat(6, 1fr)" 
                        gap={1}
                        maxHeight="150px"
                        overflowY="auto"
                        p={2}
                        border="1px solid"
                        borderColor="gray.100"
                        borderRadius="md"
                      >
                        {timeState.seconds.map((second) => (
                          <Box 
                            key={`second-${second}`}
                            py={1}
                            px={2}
                            textAlign="center"
                            bg={timeState.selectedSecond === second ? "blue.500" : "gray.50"}
                            color={timeState.selectedSecond === second ? "white" : "inherit"}
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ bg: timeState.selectedSecond === second ? "blue.600" : "gray.100" }}
                            onClick={() => timeState.handleSecondSelect(second)}
                          >
                            {second.toString().padStart(2, '0')}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
                
                {/* Custom actions */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Box>
                    <Box 
                      as="button"
                      px={3}
                      py={2}
                      bg="blue.500"
                      color="white"
                      borderRadius="md"
                      _hover={{ bg: "blue.600" }}
                      onClick={timeState.handleNowClick}
                    >
                      Current Time
                    </Box>
                  </Box>
                  
                  <Box>
                    <Box 
                      as="button"
                      px={3}
                      py={2}
                      bg="red.500"
                      color="white"
                      borderRadius="md"
                      _hover={{ bg: "red.600" }}
                      onClick={timeState.handleClearClick}
                    >
                      Clear
                    </Box>
                  </Box>
                </Box>
                
                {/* Time preview */}
                <Box 
                  p={2} 
                  bg="gray.50" 
                  borderRadius="md" 
                  textAlign="center"
                >
                  <Text>
                    Selected time: <strong>{timeState.inputValue || 'None'}</strong>
                  </Text>
                </Box>
              </Stack>
            </Box>
          )}
        </TimePicker>
      </Box>

      <Divider my={4} />

      <Box mb={4}>
        <Text variant="h3">Compact Mobile Time Selection</Text>
        <Text mb={2}>A mobile-friendly compact time selector:</Text>
        
        <TimePicker
          value={customTime}
          onChange={setCustomTime}
          format={TIMEPICKER_FORMATS.TWELVE_HOUR}
          showMeridiem
        >
          {(timeState) => (
            <Box 
              p={2} 
              border="1px solid" 
              borderColor="gray.200" 
              borderRadius="md" 
              width="100%"
              maxWidth="300px"
              bg="white"
            >
              <Stack direction="column" spacing="sm">
                {/* Time display */}
                <Box 
                  p={3} 
                  bg="gray.900" 
                  borderRadius="md" 
                  textAlign="center"
                  color="white"
                  fontSize="24px"
                  fontWeight="bold"
                  letterSpacing="2px"
                >
                  {timeState.inputValue || '--:--'}
                </Box>
                
                {/* Hour/Minute selectors in a row */}
                <Box display="flex" alignItems="center" justifyContent="space-around">
                  {/* Hour selector */}
                  <Box textAlign="center">
                    <Text fontSize="xs" color="gray.500" mb={1}>HR</Text>
                    <Box 
                      display="flex" 
                      flexDirection="column" 
                      alignItems="center"
                    >
                      <Box 
                        as="button"
                        onClick={() => {
                          const currentIdx = timeState.hours.indexOf(timeState.selectedHour);
                          const newIdx = (currentIdx + 1) % timeState.hours.length;
                          timeState.handleHourSelect(timeState.hours[newIdx]);
                        }}
                        p={1}
                        borderRadius="md"
                        bg="gray.100"
                        width="40px"
                        _hover={{ bg: "gray.200" }}
                      >
                        ▲
                      </Box>
                      <Box 
                        py={2}
                        fontSize="20px"
                        fontWeight="bold"
                        width="40px"
                      >
                        {timeState.selectedHour !== null 
                          ? timeState.selectedHour.toString().padStart(2, '0') 
                          : '--'}
                      </Box>
                      <Box 
                        as="button"
                        onClick={() => {
                          const currentIdx = timeState.hours.indexOf(timeState.selectedHour);
                          const newIdx = (currentIdx - 1 + timeState.hours.length) % timeState.hours.length;
                          timeState.handleHourSelect(timeState.hours[newIdx]);
                        }}
                        p={1}
                        borderRadius="md"
                        bg="gray.100"
                        width="40px"
                        _hover={{ bg: "gray.200" }}
                      >
                        ▼
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box fontSize="24px" fontWeight="bold">:</Box>
                  
                  {/* Minute selector */}
                  <Box textAlign="center">
                    <Text fontSize="xs" color="gray.500" mb={1}>MIN</Text>
                    <Box 
                      display="flex" 
                      flexDirection="column" 
                      alignItems="center"
                    >
                      <Box 
                        as="button"
                        onClick={() => {
                          const currentIdx = timeState.minutes.indexOf(timeState.selectedMinute);
                          const newIdx = (currentIdx + 1) % timeState.minutes.length;
                          timeState.handleMinuteSelect(timeState.minutes[newIdx]);
                        }}
                        p={1}
                        borderRadius="md"
                        bg="gray.100"
                        width="40px"
                        _hover={{ bg: "gray.200" }}
                      >
                        ▲
                      </Box>
                      <Box 
                        py={2}
                        fontSize="20px"
                        fontWeight="bold"
                        width="40px"
                      >
                        {timeState.selectedMinute !== null 
                          ? timeState.selectedMinute.toString().padStart(2, '0') 
                          : '--'}
                      </Box>
                      <Box 
                        as="button"
                        onClick={() => {
                          const currentIdx = timeState.minutes.indexOf(timeState.selectedMinute);
                          const newIdx = (currentIdx - 1 + timeState.minutes.length) % timeState.minutes.length;
                          timeState.handleMinuteSelect(timeState.minutes[newIdx]);
                        }}
                        p={1}
                        borderRadius="md"
                        bg="gray.100"
                        width="40px"
                        _hover={{ bg: "gray.200" }}
                      >
                        ▼
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* AM/PM selector if 12-hour format */}
                  {timeState.format === TIMEPICKER_FORMATS.TWELVE_HOUR && timeState.showMeridiem && (
                    <Box textAlign="center">
                      <Text fontSize="xs" color="gray.500" mb={1}>AM/PM</Text>
                      <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center"
                      >
                        <Box 
                          as="button"
                          onClick={() => timeState.handleMeridiemSelect(timeState.selectedMeridiem === 'AM' ? 'PM' : 'AM')}
                          p={1}
                          width="45px"
                          borderRadius="md"
                          bg={timeState.selectedMeridiem === 'AM' ? "blue.500" : "gray.100"}
                          color={timeState.selectedMeridiem === 'AM' ? "white" : "black"}
                          _hover={{ bg: timeState.selectedMeridiem === 'AM' ? "blue.600" : "gray.200" }}
                        >
                          AM
                        </Box>
                        <Box py={1} />
                        <Box 
                          as="button"
                          onClick={() => timeState.handleMeridiemSelect(timeState.selectedMeridiem === 'PM' ? 'AM' : 'PM')}
                          p={1}
                          width="45px"
                          borderRadius="md"
                          bg={timeState.selectedMeridiem === 'PM' ? "blue.500" : "gray.100"}
                          color={timeState.selectedMeridiem === 'PM' ? "white" : "black"}
                          _hover={{ bg: timeState.selectedMeridiem === 'PM' ? "blue.600" : "gray.200" }}
                        >
                          PM
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                
                {/* Action buttons */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Box 
                    as="button"
                    px={3}
                    py={1}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    _hover={{ bg: "gray.50" }}
                    onClick={timeState.handleClearClick}
                  >
                    Reset
                  </Box>
                  <Box 
                    as="button"
                    px={3}
                    py={1}
                    bg="blue.500"
                    color="white"
                    borderRadius="md"
                    _hover={{ bg: "blue.600" }}
                    onClick={timeState.handleNowClick}
                  >
                    Now
                  </Box>
                </Box>
              </Stack>
            </Box>
          )}
        </TimePicker>
      </Box>
    </Stack>
  );
};

export default TimePickerRenderPropsExample;
