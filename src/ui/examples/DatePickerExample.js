import React, { useState } from 'react';
import Box from '../atoms/Box';
import Stack from '../atoms/Stack';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Button from '../atoms/Button';
import DatePicker from '../molecules/DatePicker';
import { DATEPICKER_VARIANTS, DATEPICKER_SIZES, DATEPICKER_FORMATS } from '../molecules/DatePicker/constants';

/**
 * Example component demonstrating the DatePicker usage
 */
const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [variant, setVariant] = useState(DATEPICKER_VARIANTS.PRIMARY);
  const [size, setSize] = useState(DATEPICKER_SIZES.MEDIUM);
  const [format, setFormat] = useState(DATEPICKER_FORMATS.MEDIUM);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0); // 0 = Sunday

  // Set min date to 7 days ago
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);

  // Set max date to 30 days from now
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <Box padding="lg">
      <Stack spacing="lg">
        <Text variant="h2">DatePicker Component</Text>
        
        <Text variant="body">
          The DatePicker component provides a user-friendly way to select dates. 
          It supports various customization options including different variants, 
          sizes, and date formats.
        </Text>

        <Box padding="md" backgroundColor="background-secondary" borderRadius="md">
          <Stack spacing="md">
            <Text variant="h3">Interactive Example</Text>
            
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              variant={variant}
              size={size}
              format={format}
              showWeekNumbers={showWeekNumbers}
              firstDayOfWeek={firstDayOfWeek}
              minDate={minDate}
              maxDate={maxDate}
            />
            
            <Box padding="sm" backgroundColor="background" borderRadius="sm">
              <Text>
                Selected date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
              </Text>
            </Box>
          </Stack>
        </Box>

        <Box padding="md" backgroundColor="background-secondary" borderRadius="md">
          <Stack spacing="md">
            <Text variant="h3">Customization Options</Text>
            
            <Stack spacing="sm">
              <Text variant="subtitle">Variant</Text>
              <Flex gap="sm">
                {Object.values(DATEPICKER_VARIANTS).map((v) => (
                  <Button 
                    key={v} 
                    variant={variant === v ? 'primary' : 'secondary'}
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </Button>
                ))}
              </Flex>
            </Stack>
            
            <Stack spacing="sm">
              <Text variant="subtitle">Size</Text>
              <Flex gap="sm">
                {Object.values(DATEPICKER_SIZES).map((s) => (
                  <Button 
                    key={s} 
                    variant={size === s ? 'primary' : 'secondary'}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </Flex>
            </Stack>
            
            <Stack spacing="sm">
              <Text variant="subtitle">Format</Text>
              <Flex gap="sm">
                {Object.values(DATEPICKER_FORMATS).map((f) => (
                  <Button 
                    key={f} 
                    variant={format === f ? 'primary' : 'secondary'}
                    onClick={() => setFormat(f)}
                  >
                    {f}
                  </Button>
                ))}
              </Flex>
            </Stack>
            
            <Stack spacing="sm">
              <Text variant="subtitle">Options</Text>
              <Flex gap="sm">
                <Button 
                  variant={showWeekNumbers ? 'primary' : 'secondary'}
                  onClick={() => setShowWeekNumbers(!showWeekNumbers)}
                >
                  {showWeekNumbers ? 'Hide Week Numbers' : 'Show Week Numbers'}
                </Button>
                
                <Button 
                  variant={firstDayOfWeek === 1 ? 'primary' : 'secondary'}
                  onClick={() => setFirstDayOfWeek(firstDayOfWeek === 0 ? 1 : 0)}
                >
                  {firstDayOfWeek === 0 ? 'Start with Monday' : 'Start with Sunday'}
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Box>

        <Box padding="md" backgroundColor="background-secondary" borderRadius="md">
          <Stack spacing="md">
            <Text variant="h3">Different Variants</Text>
            
            <Flex gap="md">
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Primary</Text>
                <DatePicker variant={DATEPICKER_VARIANTS.PRIMARY} />
              </Box>
              
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Secondary</Text>
                <DatePicker variant={DATEPICKER_VARIANTS.SECONDARY} />
              </Box>
              
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Minimal</Text>
                <DatePicker variant={DATEPICKER_VARIANTS.MINIMAL} />
              </Box>
            </Flex>
          </Stack>
        </Box>

        <Box padding="md" backgroundColor="background-secondary" borderRadius="md">
          <Stack spacing="md">
            <Text variant="h3">Different Sizes</Text>
            
            <Flex gap="md">
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Small</Text>
                <DatePicker size={DATEPICKER_SIZES.SMALL} />
              </Box>
              
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Medium</Text>
                <DatePicker size={DATEPICKER_SIZES.MEDIUM} />
              </Box>
              
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Large</Text>
                <DatePicker size={DATEPICKER_SIZES.LARGE} />
              </Box>
            </Flex>
          </Stack>
        </Box>

        <Box padding="md" backgroundColor="background-secondary" borderRadius="md">
          <Stack spacing="md">
            <Text variant="h3">States</Text>
            
            <Flex gap="md">
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Disabled</Text>
                <DatePicker disabled value={new Date()} />
              </Box>
              
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Read-only</Text>
                <DatePicker readOnly value={new Date()} />
              </Box>
              
              <Box width="200px">
                <Text variant="subtitle" marginBottom="xs">Required</Text>
                <DatePicker required />
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default DatePickerExample;
