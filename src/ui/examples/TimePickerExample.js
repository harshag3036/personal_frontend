import React, { useState } from 'react';
import Box from '../atoms/Box';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Stack from '../atoms/Stack';
import TimePicker from '../molecules/TimePicker';
import { TIMEPICKER_FORMATS, TIMEPICKER_VARIANTS, TIMEPICKER_SIZES, TIMEPICKER_STEP } from '../molecules/TimePicker/constants';

/**
 * Example demonstrating the TimePicker component in various configurations
 */
const TimePickerExample = () => {
  const [basicTime, setBasicTime] = useState(null);
  const [twentyFourHourTime, setTwentyFourHourTime] = useState(null);
  const [timeWithSeconds, setTimeWithSeconds] = useState(null);
  const [workHoursTime, setWorkHoursTime] = useState(null);
  const [customStepTime, setCustomStepTime] = useState(null);
  const [errorTime, setErrorTime] = useState(null);

  // Create min and max times for work hours (9 AM to 5 PM)
  const minWorkTime = new Date();
  minWorkTime.setHours(9, 0, 0);
  
  const maxWorkTime = new Date();
  maxWorkTime.setHours(17, 0, 0);

  // Reset all time values
  const handleResetAll = () => {
    setBasicTime(null);
    setTwentyFourHourTime(null);
    setTimeWithSeconds(null);
    setWorkHoursTime(null);
    setCustomStepTime(null);
    setErrorTime(null);
  };

  // Set all time values to current time
  const handleSetNow = () => {
    const now = new Date();
    setBasicTime(now);
    setTwentyFourHourTime(now);
    setTimeWithSeconds(now);
    
    // Only set work hours time if current time is within work hours
    if (now >= minWorkTime && now <= maxWorkTime) {
      setWorkHoursTime(now);
    }
    
    setCustomStepTime(now);
    setErrorTime(now);
  };

  return (
    <Box padding="lg">
      <Stack spacing="xl">
        <Text variant="h2">TimePicker Examples</Text>
        
        <Text variant="h3">Basic TimePicker</Text>
        <Box maxWidth="300px">
          <TimePicker
            value={basicTime}
            onChange={setBasicTime}
            placeholder="Select time"
          />
          <Text variant="body2" marginTop="sm">
            Selected time: {basicTime ? basicTime.toLocaleTimeString() : 'None'}
          </Text>
        </Box>
        
        <Text variant="h3">24-Hour Format</Text>
        <Box maxWidth="300px">
          <TimePicker
            value={twentyFourHourTime}
            onChange={setTwentyFourHourTime}
            format={TIMEPICKER_FORMATS.TWENTY_FOUR_HOUR}
            placeholder="Select time (24h)"
          />
          <Text variant="body2" marginTop="sm">
            Selected time: {twentyFourHourTime ? twentyFourHourTime.toLocaleTimeString() : 'None'}
          </Text>
        </Box>
        
        <Text variant="h3">With Seconds</Text>
        <Box maxWidth="300px">
          <TimePicker
            value={timeWithSeconds}
            onChange={setTimeWithSeconds}
            showSeconds
            placeholder="Select time with seconds"
          />
          <Text variant="body2" marginTop="sm">
            Selected time: {timeWithSeconds ? timeWithSeconds.toLocaleTimeString() : 'None'}
          </Text>
        </Box>
        
        <Text variant="h3">Work Hours (9 AM - 5 PM)</Text>
        <Box maxWidth="300px">
          <TimePicker
            value={workHoursTime}
            onChange={setWorkHoursTime}
            minTime={minWorkTime}
            maxTime={maxWorkTime}
            variant={TIMEPICKER_VARIANTS.SECONDARY}
            placeholder="Select work hours"
          />
          <Text variant="body2" marginTop="sm">
            Selected time: {workHoursTime ? workHoursTime.toLocaleTimeString() : 'None'}
          </Text>
          <Text variant="caption" color="text-secondary">
            Only times between 9:00 AM and 5:00 PM are allowed
          </Text>
        </Box>
        
        <Text variant="h3">Custom Step (15 Minutes)</Text>
        <Box maxWidth="300px">
          <TimePicker
            value={customStepTime}
            onChange={setCustomStepTime}
            step={TIMEPICKER_STEP.FIFTEEN_MINUTES}
            size={TIMEPICKER_SIZES.LARGE}
            placeholder="Select time (15 min steps)"
          />
          <Text variant="body2" marginTop="sm">
            Selected time: {customStepTime ? customStepTime.toLocaleTimeString() : 'None'}
          </Text>
        </Box>
        
        <Text variant="h3">With Error State</Text>
        <Box maxWidth="300px">
          <TimePicker
            value={errorTime}
            onChange={setErrorTime}
            error={true}
            errorMessage="Please select a valid time"
            variant={TIMEPICKER_VARIANTS.PRIMARY}
            placeholder="Select time"
          />
          <Text variant="body2" marginTop="sm">
            Selected time: {errorTime ? errorTime.toLocaleTimeString() : 'None'}
          </Text>
        </Box>
        
        <Flex gap="md">
          <Button onClick={handleSetNow}>Set All to Now</Button>
          <Button variant="secondary" onClick={handleResetAll}>Reset All</Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default TimePickerExample;
