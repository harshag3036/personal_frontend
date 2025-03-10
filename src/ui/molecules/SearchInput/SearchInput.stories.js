import React from 'react';
import SearchInput from './SearchInput';
import { SEARCH_INPUT_VARIANTS, SEARCH_INPUT_SIZES } from './constants';

export default {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component: 'A search input component with debounce functionality, clear button, and loading state.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(SEARCH_INPUT_VARIANTS),
      description: 'Visual variant of the search input'
    },
    size: {
      control: { type: 'select' },
      options: Object.values(SEARCH_INPUT_SIZES),
      description: 'Size of the search input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    value: {
      control: 'text',
      description: 'Initial value'
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show clear button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search input is disabled'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto focus the input'
    },
    debounceTime: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Debounce time in milliseconds'
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the search is loading'
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onClear: { action: 'cleared' }
  }
};

// Default template
const Template = (args) => <SearchInput {...args} />;

// Basic example
export const Default = Template.bind({});
Default.args = {};

// Variants
export const Filled = Template.bind({});
Filled.args = {
  variant: SEARCH_INPUT_VARIANTS.FILLED,
  placeholder: 'Search in filled variant...'
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: SEARCH_INPUT_VARIANTS.OUTLINED,
  placeholder: 'Search in outlined variant...'
};

export const Minimal = Template.bind({});
Minimal.args = {
  variant: SEARCH_INPUT_VARIANTS.MINIMAL,
  placeholder: 'Search in minimal variant...'
};

// Sizes
export const Small = Template.bind({});
Small.args = {
  size: SEARCH_INPUT_SIZES.SMALL,
  placeholder: 'Small search input'
};

export const Medium = Template.bind({});
Medium.args = {
  size: SEARCH_INPUT_SIZES.MEDIUM,
  placeholder: 'Medium search input'
};

export const Large = Template.bind({});
Large.args = {
  size: SEARCH_INPUT_SIZES.LARGE,
  placeholder: 'Large search input'
};

// States
export const WithValue = Template.bind({});
WithValue.args = {
  value: 'Initial search value',
  clearable: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Disabled search input'
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  placeholder: 'Loading search results...'
};

export const WithAutoFocus = Template.bind({});
WithAutoFocus.args = {
  autoFocus: true,
  placeholder: 'This input is auto-focused'
};

// Custom debounce time
export const CustomDebounce = Template.bind({});
CustomDebounce.args = {
  debounceTime: 1000,
  placeholder: 'Type to search (1 second debounce)'
};

// Playground
export const Playground = Template.bind({});
Playground.args = {
  variant: SEARCH_INPUT_VARIANTS.DEFAULT,
  size: SEARCH_INPUT_SIZES.MEDIUM,
  placeholder: 'Search...',
  clearable: true,
  disabled: false,
  autoFocus: false,
  debounceTime: 300,
  isLoading: false
};
