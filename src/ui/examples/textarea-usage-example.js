/**
 * Textarea Usage Example
 * 
 * This file demonstrates how to use the Textarea component.
 */

import React, { useState } from 'react';
import { Textarea, TEXTAREA_VARIANTS, TEXTAREA_SIZES, TEXTAREA_STATES } from '../components';

/**
 * Basic Textarea Example
 */
const BasicTextareaExample = () => {
  const [value, setValue] = useState('');
  
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log('Textarea value:', event.target.value);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Textarea</h2>
      <Textarea
        id="basic-textarea"
        name="basic-textarea"
        value={value}
        onChange={handleChange}
        label="Basic Textarea"
        placeholder="Enter your text here"
        rows={4}
      />
      <p>Current value: {value || 'Empty'}</p>
    </div>
  );
};

/**
 * Textarea Variants Example
 */
const TextareaVariantsExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Textarea Variants</h2>
      
      <h3>Default Variant</h3>
      <Textarea
        id="default-textarea"
        name="default-textarea"
        variant={TEXTAREA_VARIANTS.DEFAULT}
        label="Default Textarea"
        placeholder="Default variant"
      />
      
      <h3>Filled Variant</h3>
      <Textarea
        id="filled-textarea"
        name="filled-textarea"
        variant={TEXTAREA_VARIANTS.FILLED}
        label="Filled Textarea"
        placeholder="Filled variant"
      />
      
      <h3>Outlined Variant</h3>
      <Textarea
        id="outlined-textarea"
        name="outlined-textarea"
        variant={TEXTAREA_VARIANTS.OUTLINED}
        label="Outlined Textarea"
        placeholder="Outlined variant"
      />
    </div>
  );
};

/**
 * Textarea Sizes Example
 */
const TextareaSizesExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Textarea Sizes</h2>
      
      <h3>Small Size</h3>
      <Textarea
        id="small-textarea"
        name="small-textarea"
        size={TEXTAREA_SIZES.SMALL}
        label="Small Textarea"
        placeholder="Small size"
      />
      
      <h3>Medium Size</h3>
      <Textarea
        id="medium-textarea"
        name="medium-textarea"
        size={TEXTAREA_SIZES.MEDIUM}
        label="Medium Textarea"
        placeholder="Medium size"
      />
      
      <h3>Large Size</h3>
      <Textarea
        id="large-textarea"
        name="large-textarea"
        size={TEXTAREA_SIZES.LARGE}
        label="Large Textarea"
        placeholder="Large size"
      />
    </div>
  );
};

/**
 * Textarea States Example
 */
const TextareaStatesExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Textarea States</h2>
      
      <h3>Default State</h3>
      <Textarea
        id="default-state-textarea"
        name="default-state-textarea"
        state={TEXTAREA_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
        placeholder="Default state"
      />
      
      <h3>Success State</h3>
      <Textarea
        id="success-state-textarea"
        name="success-state-textarea"
        state={TEXTAREA_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
        placeholder="Success state"
        value="This input has been validated successfully!"
      />
      
      <h3>Error State</h3>
      <Textarea
        id="error-state-textarea"
        name="error-state-textarea"
        state={TEXTAREA_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
        placeholder="Error state"
        value="This input has an error!"
      />
      
      <h3>Warning State</h3>
      <Textarea
        id="warning-state-textarea"
        name="warning-state-textarea"
        state={TEXTAREA_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
        placeholder="Warning state"
      />
      
      <h3>Disabled State</h3>
      <Textarea
        id="disabled-textarea"
        name="disabled-textarea"
        disabled
        label="Disabled Textarea"
        placeholder="Disabled state"
        value="This textarea is disabled"
      />
      
      <h3>Read-only State</h3>
      <Textarea
        id="readonly-textarea"
        name="readonly-textarea"
        readOnly
        label="Read-only Textarea"
        value="This textarea is read-only"
      />
    </div>
  );
};

/**
 * Textarea Features Example
 */
const TextareaFeaturesExample = () => {
  const [autoResizeValue, setAutoResizeValue] = useState('');
  
  const handleAutoResizeChange = (event) => {
    setAutoResizeValue(event.target.value);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Textarea Features</h2>
      
      <h3>Auto-resize</h3>
      <Textarea
        id="auto-resize-textarea"
        name="auto-resize-textarea"
        label="Auto-resize Textarea"
        placeholder="Type here to see auto-resize in action..."
        autoResize
        minRows={2}
        maxRows={8}
        value={autoResizeValue}
        onChange={handleAutoResizeChange}
        helperText="This textarea will automatically resize as you type"
      />
      
      <h3>Character Count</h3>
      <Textarea
        id="char-count-textarea"
        name="char-count-textarea"
        label="Character Count Textarea"
        placeholder="Type here to see character count..."
        maxLength={100}
        helperText="Maximum 100 characters"
      />
      
      <h3>Full Width</h3>
      <Textarea
        id="full-width-textarea"
        name="full-width-textarea"
        label="Full Width Textarea"
        placeholder="This textarea takes up the full width"
        fullWidth
      />
      
      <h3>Required</h3>
      <Textarea
        id="required-textarea"
        name="required-textarea"
        label="Required Textarea"
        placeholder="This textarea is required"
        required
      />
    </div>
  );
};

/**
 * Complete Textarea Example
 */
const TextareaExample = () => {
  return (
    <div>
      <h1>Textarea Component Examples</h1>
      <BasicTextareaExample />
      <hr />
      <TextareaVariantsExample />
      <hr />
      <TextareaSizesExample />
      <hr />
      <TextareaStatesExample />
      <hr />
      <TextareaFeaturesExample />
    </div>
  );
};

export default TextareaExample;
