import React, { useState } from 'react';
import TimePicker from './TimePicker';
import { 
  TIMEPICKER_VARIANTS, 
  TIMEPICKER_SIZES, 
  TIMEPICKER_FORMATS,
  TIMEPICKER_STEP
} from './constants';

export default {
  title: 'Molecules/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: 'TimePicker component for selecting time values',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(TIMEPICKER_VARIANTS),
      description: 'The visual style variant of the TimePicker',
    },
    size: {
      control: { type: 'select' },
      options: Object.values(TIMEPICKER_SIZES),
      description: 'The size of the TimePicker',
    },
    format: {
      control: { type: 'select' },
      options: Object.values(TIMEPICKER_FORMATS),
      description: 'The time format (12-hour or 24-hour)',
    },
    step: {
      control: { type: 'select' },
      options: Object.values(TIMEPICKER_STEP),
      description: 'The step interval for minutes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the TimePicker is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the TimePicker is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the TimePicker is required',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the TimePicker can be cleared',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Whether to show seconds',
    },
    showMeridiem: {
      control: 'boolean',
      description: 'Whether to show AM/PM selector (for 12-hour format)',
    },
    error: {
      control: 'boolean',
      description: 'Whether the TimePicker has an error',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(null);
  return (
    <div style={{ width: '300px' }}>
      <TimePicker {...args} value={value} onChange={setValue} />
      <div style={{ marginTop: '20px' }}>
        Selected time: {value ? value.toLocaleTimeString() : 'None'}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const With12HourFormat = Template.bind({});
With12HourFormat.args = {
  format: TIMEPICKER_FORMATS.TWELVE_HOUR,
};

export const With24HourFormat = Template.bind({});
With24HourFormat.args = {
  format: TIMEPICKER_FORMATS.TWENTY_FOUR_HOUR,
};

export const WithSeconds = Template.bind({});
WithSeconds.args = {
  showSeconds: true,
};

export const WithCustomStep = Template.bind({});
WithCustomStep.args = {
  step: TIMEPICKER_STEP.FIVE_MINUTES,
};

export const Small = Template.bind({});
Small.args = {
  size: TIMEPICKER_SIZES.SMALL,
};

export const Large = Template.bind({});
Large.args = {
  size: TIMEPICKER_SIZES.LARGE,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: TIMEPICKER_VARIANTS.SECONDARY,
};

export const Minimal = Template.bind({});
Minimal.args = {
  variant: TIMEPICKER_VARIANTS.MINIMAL,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
  value: new Date(),
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  error: true,
  errorMessage: 'Please select a valid time',
};

export const WithMinMaxTime = Template.bind({});
WithMinMaxTime.args = {
  minTime: (() => {
    const date = new Date();
    date.setHours(9);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  })(),
  maxTime: (() => {
    const date = new Date();
    date.setHours(17);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  })(),
};
WithMinMaxTime.parameters = {
  docs: {
    description: {
      story: 'TimePicker with time range limited between 9:00 AM and 5:00 PM',
    },
  },
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  value: (() => {
    const date = new Date();
    date.setHours(10);
    date.setMinutes(30);
    date.setSeconds(0);
    return date;
  })(),
};

export const NonClearable = Template.bind({});
NonClearable.args = {
  clearable: false,
};
