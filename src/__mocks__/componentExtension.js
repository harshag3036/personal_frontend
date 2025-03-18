/**
 * Mock implementation of componentExtension utility
 * 
 * This improved mock better simulates the real behavior of component extensions
 * by maintaining internal state and properly handling extension application.
 */
import React from 'react';

// Internal stores for variants and extensions
const componentVariants = {};
const componentExtensions = {};

// Register a component variant
const registerComponentVariant = jest.fn((componentName, variantName, variantProps) => {
  if (!componentVariants[componentName]) {
    componentVariants[componentName] = {};
  }
  componentVariants[componentName][variantName] = variantProps;
  return variantProps;
});

// Get component variants
const getComponentVariants = jest.fn((componentName) => {
  return componentVariants[componentName] || {};
});

// Get a specific component variant
const getComponentVariant = jest.fn((componentName, variantName) => {
  return componentVariants[componentName]?.[variantName] || null;
});

// Register a component extension
const registerComponentExtension = jest.fn((componentName, extensionName, extensionFn) => {
  if (!componentExtensions[componentName]) {
    componentExtensions[componentName] = {};
  }
  componentExtensions[componentName][extensionName] = extensionFn;
  return extensionFn;
});

// Get component extensions
const getComponentExtensions = jest.fn((componentName) => {
  return componentExtensions[componentName] || {};
});

// Get a specific component extension
const getComponentExtension = jest.fn((componentName, extensionName) => {
  return componentExtensions[componentName]?.[extensionName] || null;
});

// Apply component extensions
const applyComponentExtensions = jest.fn((componentName, props, extensionNames) => {
  const extensions = componentExtensions[componentName] || {};
  
  // This mock now maintains a copy of the extensions for each component
  let extendedProps = { ...props };
  
  // Apply each requested extension if it exists
  (extensionNames || []).forEach((extensionName) => {
    const extension = extensions[extensionName];
    if (extension) {
      extendedProps = extension(extendedProps);
    }
  });
  
  // Add a special test attribute to indicate extensions were applied
  if ((extensionNames || []).length > 0) {
    extendedProps['data-has-extensions'] = true;
    extendedProps['data-applied-extensions'] = extensionNames.join(',');
  }
  
  return extendedProps;
});

// Create an extendable component
const createExtendableComponent = jest.fn((componentName, Component) => {
  return (props) => {
    // Extract extensions from props
    const { extensions = [], ...restProps } = props;
    
    // Apply extensions
    const extendedProps = applyComponentExtensions(componentName, restProps, extensions);
    
    // Return component with extended props
    return React.createElement(Component, extendedProps);
  };
});

// Clear all mock stores (useful for test cleanup)
const clearMocks = () => {
  Object.keys(componentVariants).forEach(key => delete componentVariants[key]);
  Object.keys(componentExtensions).forEach(key => delete componentExtensions[key]);
  
  // Reset all mock functions
  registerComponentVariant.mockClear();
  getComponentVariants.mockClear();
  getComponentVariant.mockClear();
  registerComponentExtension.mockClear();
  getComponentExtensions.mockClear();
  getComponentExtension.mockClear();
  applyComponentExtensions.mockClear();
  createExtendableComponent.mockClear();
};

export {
  applyComponentExtensions,
  createExtendableComponent,
  registerComponentVariant,
  getComponentVariants,
  getComponentVariant,
  registerComponentExtension,
  getComponentExtensions,
  getComponentExtension,
  clearMocks
};

export default {
  registerComponentVariant,
  getComponentVariants,
  getComponentVariant,
  registerComponentExtension,
  getComponentExtensions,
  getComponentExtension,
  applyComponentExtensions,
  createExtendableComponent,
  clearMocks
};
