import React, { useState } from 'react';
import DatePicker from './DatePicker';
import { 
  DATEPICKER_VARIANTS, 
  DATEPICKER_SIZES, 
  DATEPICKER_FORMATS 
} from './constants';

export default {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'A customizable date picker component that allows users to select a date.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(DATEPICKER_VARIANTS),
      description: 'Visual variant of the date picker'
    },
    size: {
      control: { type: 'select' },
      options: Object.values(DATEPICKER_SIZES),
      description: 'Size variant of the date picker'
    },
    format: {
      control: { type: 'select' },
      options: Object.values(DATEPICKER_FORMATS),
      description: 'Date format to display'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled'
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the date picker is read-only'
    },
    required: {
      control: 'boolean',
      description: 'Whether the date picker is required'
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button'
    },
    showTodayButton: {
      control: 'boolean',
      description: 'Whether to show a "Today" button'
    },
    showWeekNumbers: {
      control: 'boolean',
      description: 'Whether to show week numbers'
    },
    firstDayOfWeek: {
      control: { type: 'range', min: 0, max: 6, step: 1 },
      description: 'First day of the week (0 = Sunday, 1 = Monday, etc.)'
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date'
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date'
    }
  }
};

// Basic usage
export const Basic = (args) => {
  const [date, setDate] = useState(null);
  
  return (
    <div style={{ width: '300px' }}>
      <DatePicker
        {...args}
        value={date}
        onChange={setDate}
      />
      <div style={{ marginTop: '1rem' }}>
        Selected date: {date ? date.toLocaleDateString() : 'None'}
      </div>
    </div>
  );
};

Basic.args = {
  placeholder: 'Select a date',
  variant: DATEPICKER_VARIANTS.PRIMARY,
  size: DATEPICKER_SIZES.MEDIUM,
  format: DATEPICKER_FORMATS.MEDIUM,
  disabled: false,
  readOnly: false,
  required: false,
  clearable: true,
  showTodayButton: true,
  showWeekNumbers: false,
  firstDayOfWeek: 0
};

// Different variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h3>Primary</h3>
      <DatePicker variant={DATEPICKER_VARIANTS.PRIMARY} />
    </div>
    <div>
      <h3>Secondary</h3>
      <DatePicker variant={DATEPICKER_VARIANTS.SECONDARY} />
    </div>
    <div>
      <h3>Minimal</h3>
      <DatePicker variant={DATEPICKER_VARIANTS.MINIMAL} />
    </div>
  </div>
);

// Different sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h3>Small</h3>
      <DatePicker size={DATEPICKER_SIZES.SMALL} />
    </div>
    <div>
      <h3>Medium</h3>
      <DatePicker size={DATEPICKER_SIZES.MEDIUM} />
    </div>
    <div>
      <h3>Large</h3>
      <DatePicker size={DATEPICKER_SIZES.LARGE} />
    </div>
  </div>
);

// Different formats
export const Formats = () => {
  const today = new Date();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h3>Short</h3>
        <DatePicker format={DATEPICKER_FORMATS.SHORT} value={today} />
      </div>
      <div>
        <h3>Medium</h3>
        <DatePicker format={DATEPICKER_FORMATS.MEDIUM} value={today} />
      </div>
      <div>
        <h3>Long</h3>
        <DatePicker format={DATEPICKER_FORMATS.LONG} value={today} />
      </div>
      <div>
        <h3>ISO</h3>
        <DatePicker format={DATEPICKER_FORMATS.ISO} value={today} />
      </div>
    </div>
  );
};

// With min and max dates
export const WithMinMaxDates = () => {
  const [date, setDate] = useState(null);
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 7); // 7 days ago
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7); // 7 days from now
  
  return (
    <div style={{ width: '300px' }}>
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div style={{ marginTop: '1rem' }}>
        <p>Min date: {minDate.toLocaleDateString()}</p>
        <p>Max date: {maxDate.toLocaleDateString()}</p>
        <p>Selected date: {date ? date.toLocaleDateString() : 'None'}</p>
      </div>
    </div>
  );
};

// Disabled state
export const Disabled = () => (
  <DatePicker disabled value={new Date()} />
);

// Read-only state
export const ReadOnly = () => (
  <DatePicker readOnly value={new Date()} />
);

// With week numbers
export const WithWeekNumbers = () => (
  <DatePicker showWeekNumbers value={new Date()} />
);

// With Monday as first day of the week
export const MondayFirst = () => (
  <DatePicker firstDayOfWeek={1} value={new Date()} />
);
