/**
 * Mock implementation of useResponsiveProps hook
 * 
 * This improved mock better simulates the real behavior of the hook by
 * handling responsive objects and applying a simulated responsive style
 * property when needed.
 * 
 * @param {Object} props - The responsive props
 * @returns {Object} The transformed props with responsive handling
 */

// Importing constants needed for responsive handling
export const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

// Helper to identify responsive objects
export const isResponsiveObject = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  
  // Check if at least one key is a breakpoint key
  return Object.keys(value).some(key => 
    key === 'base' || breakpointKeys.includes(key)
  );
};

// Mock implementation with better responsive prop handling
const useResponsiveProps = (props) => {
  // Process props for responsive handling
  const processedProps = {...props};
  let hasResponsiveProps = false;
  
  // Check for responsive objects in props
  Object.entries(props).forEach(([key, value]) => {
    if (isResponsiveObject(value)) {
      hasResponsiveProps = true;
      // For testing, we'll use the base or first defined value
      if (value.base !== undefined) {
        processedProps[key] = value.base;
      } else {
        // Find first defined breakpoint value
        for (const bp of breakpointKeys) {
          if (value[bp] !== undefined) {
            processedProps[key] = value[bp];
            break;
          }
        }
      }
    }
  });
  
  // Add a special property for testing if responsive props were detected
  if (hasResponsiveProps) {
    processedProps.style = {
      ...processedProps.style,
      '--responsive-styles': 'true'
    };
  }
  
  return processedProps;
};

export default useResponsiveProps;
