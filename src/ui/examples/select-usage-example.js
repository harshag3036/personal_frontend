/**
 * Select Usage Example
 * 
 * This file demonstrates how to use the Select component.
 */

import React, { useState } from 'react';
import { Select, SELECT_VARIANTS, SELECT_SIZES, SELECT_STATES } from '../components';

/**
 * Basic Select Example
 */
const BasicSelectExample = () => {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log('Selected value:', newValue);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Select</h2>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        label="Basic Select"
        placeholder="Choose an option"
      />
      <p>Selected value: {value}</p>
    </div>
  );
};

/**
 * Select Variants Example
 */
const SelectVariantsExample = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Variants</h2>
      
      <h3>Default Variant</h3>
      <Select
        options={options}
        variant={SELECT_VARIANTS.DEFAULT}
        label="Default Select"
      />
      
      <h3>Filled Variant</h3>
      <Select
        options={options}
        variant={SELECT_VARIANTS.FILLED}
        label="Filled Select"
      />
      
      <h3>Outlined Variant</h3>
      <Select
        options={options}
        variant={SELECT_VARIANTS.OUTLINED}
        label="Outlined Select"
      />
    </div>
  );
};

/**
 * Select Sizes Example
 */
const SelectSizesExample = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Sizes</h2>
      
      <h3>Small Size</h3>
      <Select
        options={options}
        size={SELECT_SIZES.SMALL}
        label="Small Select"
      />
      
      <h3>Medium Size</h3>
      <Select
        options={options}
        size={SELECT_SIZES.MEDIUM}
        label="Medium Select"
      />
      
      <h3>Large Size</h3>
      <Select
        options={options}
        size={SELECT_SIZES.LARGE}
        label="Large Select"
      />
    </div>
  );
};

/**
 * Select States Example
 */
const SelectStatesExample = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Select States</h2>
      
      <h3>Default State</h3>
      <Select
        options={options}
        state={SELECT_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
      />
      
      <h3>Success State</h3>
      <Select
        options={options}
        state={SELECT_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
      />
      
      <h3>Error State</h3>
      <Select
        options={options}
        state={SELECT_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
      />
      
      <h3>Warning State</h3>
      <Select
        options={options}
        state={SELECT_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
      />
      
      <h3>Disabled State</h3>
      <Select
        options={options}
        disabled
        label="Disabled Select"
        helperText="This select is disabled"
      />
    </div>
  );
};

/**
 * Advanced Select Example
 */
const AdvancedSelectExample = () => {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
    { value: 'option7', label: 'Option 7' },
    { value: 'option8', label: 'Option 8' },
  ];
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  // Custom icon example
  const startIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L10.5 6.5L16 7.5L12 11.5L13 16L8 14L3 16L4 11.5L0 7.5L5.5 6.5L8 1Z" fill="currentColor"/>
    </svg>
  );
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Advanced Select</h2>
      
      <h3>With Start Icon</h3>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        label="Select with Icon"
        startIcon={startIcon}
      />
      
      <h3>Required Select</h3>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        label="Required Select"
        required
      />
      
      <h3>Full Width Select</h3>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        label="Full Width Select"
        fullWidth
      />
      
      <h3>With Many Options (Scrollable)</h3>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        label="Select with Many Options"
      />
    </div>
  );
};

/**
 * Complete Select Example
 */
const SelectExample = () => {
  return (
    <div>
      <h1>Select Component Examples</h1>
      <BasicSelectExample />
      <hr />
      <SelectVariantsExample />
      <hr />
      <SelectSizesExample />
      <hr />
      <SelectStatesExample />
      <hr />
      <AdvancedSelectExample />
    </div>
  );
};

export default SelectExample;
