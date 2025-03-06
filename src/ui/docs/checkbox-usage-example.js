/**
 * Checkbox Usage Example
 * 
 * This file demonstrates how to use the Checkbox component.
 */

import React, { useState } from 'react';
import { Checkbox, CHECKBOX_VARIANTS, CHECKBOX_SIZES, CHECKBOX_STATES } from '../components';

/**
 * Basic Checkbox Example
 */
const BasicCheckboxExample = () => {
  const [checked, setChecked] = useState(false);
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log('Checkbox checked:', event.target.checked);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Checkbox</h2>
      <Checkbox
        id="basic-checkbox"
        name="basic-checkbox"
        checked={checked}
        onChange={handleChange}
        label="Basic Checkbox"
      />
      <p>Checked: {checked ? 'Yes' : 'No'}</p>
    </div>
  );
};

/**
 * Checkbox Variants Example
 */
const CheckboxVariantsExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkbox Variants</h2>
      
      <h3>Default Variant</h3>
      <Checkbox
        id="default-checkbox"
        name="default-checkbox"
        variant={CHECKBOX_VARIANTS.DEFAULT}
        label="Default Checkbox"
      />
      
      <h3>Filled Variant</h3>
      <Checkbox
        id="filled-checkbox"
        name="filled-checkbox"
        variant={CHECKBOX_VARIANTS.FILLED}
        label="Filled Checkbox"
      />
      
      <h3>Outlined Variant</h3>
      <Checkbox
        id="outlined-checkbox"
        name="outlined-checkbox"
        variant={CHECKBOX_VARIANTS.OUTLINED}
        label="Outlined Checkbox"
      />
    </div>
  );
};

/**
 * Checkbox Sizes Example
 */
const CheckboxSizesExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkbox Sizes</h2>
      
      <h3>Small Size</h3>
      <Checkbox
        id="small-checkbox"
        name="small-checkbox"
        size={CHECKBOX_SIZES.SMALL}
        label="Small Checkbox"
      />
      
      <h3>Medium Size</h3>
      <Checkbox
        id="medium-checkbox"
        name="medium-checkbox"
        size={CHECKBOX_SIZES.MEDIUM}
        label="Medium Checkbox"
      />
      
      <h3>Large Size</h3>
      <Checkbox
        id="large-checkbox"
        name="large-checkbox"
        size={CHECKBOX_SIZES.LARGE}
        label="Large Checkbox"
      />
    </div>
  );
};

/**
 * Checkbox States Example
 */
const CheckboxStatesExample = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkbox States</h2>
      
      <h3>Default State</h3>
      <Checkbox
        id="default-state-checkbox"
        name="default-state-checkbox"
        state={CHECKBOX_STATES.DEFAULT}
        label="Default State"
        helperText="This is a helper text"
      />
      
      <h3>Success State</h3>
      <Checkbox
        id="success-state-checkbox"
        name="success-state-checkbox"
        state={CHECKBOX_STATES.SUCCESS}
        label="Success State"
        helperText="This is a success message"
        checked
      />
      
      <h3>Error State</h3>
      <Checkbox
        id="error-state-checkbox"
        name="error-state-checkbox"
        state={CHECKBOX_STATES.ERROR}
        label="Error State"
        errorText="This is an error message"
      />
      
      <h3>Warning State</h3>
      <Checkbox
        id="warning-state-checkbox"
        name="warning-state-checkbox"
        state={CHECKBOX_STATES.WARNING}
        label="Warning State"
        helperText="This is a warning message"
      />
      
      <h3>Disabled State</h3>
      <Checkbox
        id="disabled-checkbox"
        name="disabled-checkbox"
        disabled
        label="Disabled Checkbox"
      />
      
      <h3>Disabled Checked State</h3>
      <Checkbox
        id="disabled-checked-checkbox"
        name="disabled-checked-checkbox"
        disabled
        checked
        label="Disabled Checked Checkbox"
      />
    </div>
  );
};

/**
 * Indeterminate Checkbox Example
 */
const IndeterminateCheckboxExample = () => {
  const [parentChecked, setParentChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [child1Checked, setChild1Checked] = useState(false);
  const [child2Checked, setChild2Checked] = useState(false);
  const [child3Checked, setChild3Checked] = useState(false);
  
  // Update parent checkbox based on children
  React.useEffect(() => {
    const checkedCount = [child1Checked, child2Checked, child3Checked].filter(Boolean).length;
    
    if (checkedCount === 0) {
      setParentChecked(false);
      setIndeterminate(false);
    } else if (checkedCount === 3) {
      setParentChecked(true);
      setIndeterminate(false);
    } else {
      setParentChecked(false);
      setIndeterminate(true);
    }
  }, [child1Checked, child2Checked, child3Checked]);
  
  // Handle parent checkbox change
  const handleParentChange = (event) => {
    const newChecked = event.target.checked;
    setParentChecked(newChecked);
    setIndeterminate(false);
    setChild1Checked(newChecked);
    setChild2Checked(newChecked);
    setChild3Checked(newChecked);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Indeterminate Checkbox</h2>
      
      <Checkbox
        id="parent-checkbox"
        name="parent-checkbox"
        checked={parentChecked}
        indeterminate={indeterminate}
        onChange={handleParentChange}
        label="Parent Checkbox"
      />
      
      <div style={{ marginLeft: '24px', marginTop: '8px' }}>
        <Checkbox
          id="child-checkbox-1"
          name="child-checkbox-1"
          checked={child1Checked}
          onChange={(e) => setChild1Checked(e.target.checked)}
          label="Child Checkbox 1"
        />
        <Checkbox
          id="child-checkbox-2"
          name="child-checkbox-2"
          checked={child2Checked}
          onChange={(e) => setChild2Checked(e.target.checked)}
          label="Child Checkbox 2"
        />
        <Checkbox
          id="child-checkbox-3"
          name="child-checkbox-3"
          checked={child3Checked}
          onChange={(e) => setChild3Checked(e.target.checked)}
          label="Child Checkbox 3"
        />
      </div>
    </div>
  );
};

/**
 * Checkbox Group Example
 */
const CheckboxGroupExample = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleChange = (event) => {
    const { value, checked } = event.target;
    
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkbox Group</h2>
      
      <h3>Vertical Group</h3>
      <div className="ds-checkbox-group">
        <Checkbox
          id="option-1"
          name="options"
          value="option1"
          checked={selectedOptions.includes('option1')}
          onChange={handleChange}
          label="Option 1"
        />
        <Checkbox
          id="option-2"
          name="options"
          value="option2"
          checked={selectedOptions.includes('option2')}
          onChange={handleChange}
          label="Option 2"
        />
        <Checkbox
          id="option-3"
          name="options"
          value="option3"
          checked={selectedOptions.includes('option3')}
          onChange={handleChange}
          label="Option 3"
        />
      </div>
      
      <h3>Horizontal Group</h3>
      <div className="ds-checkbox-group ds-checkbox-group-horizontal">
        <Checkbox
          id="horizontal-option-1"
          name="horizontal-options"
          value="horizontal-option1"
          checked={selectedOptions.includes('horizontal-option1')}
          onChange={handleChange}
          label="Option 1"
        />
        <Checkbox
          id="horizontal-option-2"
          name="horizontal-options"
          value="horizontal-option2"
          checked={selectedOptions.includes('horizontal-option2')}
          onChange={handleChange}
          label="Option 2"
        />
        <Checkbox
          id="horizontal-option-3"
          name="horizontal-options"
          value="horizontal-option3"
          checked={selectedOptions.includes('horizontal-option3')}
          onChange={handleChange}
          label="Option 3"
        />
      </div>
      
      <p>Selected options: {selectedOptions.join(', ') || 'None'}</p>
    </div>
  );
};

/**
 * Complete Checkbox Example
 */
const CheckboxExample = () => {
  return (
    <div>
      <h1>Checkbox Component Examples</h1>
      <BasicCheckboxExample />
      <hr />
      <CheckboxVariantsExample />
      <hr />
      <CheckboxSizesExample />
      <hr />
      <CheckboxStatesExample />
      <hr />
      <IndeterminateCheckboxExample />
      <hr />
      <CheckboxGroupExample />
    </div>
  );
};

export default CheckboxExample;
