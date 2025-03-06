/**
 * Responsive Props Utility
 * 
 * This utility provides functions for handling responsive props in components.
 * It allows components to accept different values for different screen sizes.
 */

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  xs: '0px',     // Extra small devices (portrait phones)
  sm: '576px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '992px',   // Large devices (desktops)
  xl: '1200px',  // Extra large devices (large desktops)
  xxl: '1400px', // Extra extra large devices
};

/**
 * Breakpoint keys in order from smallest to largest
 */
export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/**
 * Check if a value is a responsive object
 * 
 * @param {any} value - The value to check
 * @returns {boolean} Whether the value is a responsive object
 */
export const isResponsiveObject = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  
  // Check if at least one key is a breakpoint key
  return Object.keys(value).some(key => 
    key === 'base' || breakpointKeys.includes(key)
  );
};

/**
 * Get the value for the current breakpoint
 * 
 * @param {Object|any} value - The responsive object or static value
 * @param {string} [currentBreakpoint='xs'] - The current breakpoint
 * @returns {any} The value for the current breakpoint
 */
export const getValueForBreakpoint = (value, currentBreakpoint = 'xs') => {
  // If the value is not a responsive object, return it as is
  if (!isResponsiveObject(value)) {
    return value;
  }
  
  // Get the index of the current breakpoint
  const currentIndex = breakpointKeys.indexOf(currentBreakpoint);
  
  // If 'base' is defined, use it as the default value
  let result = value.base !== undefined ? value.base : undefined;
  
  // Find the largest breakpoint that is smaller than or equal to the current breakpoint
  for (let i = 0; i <= currentIndex; i++) {
    const breakpoint = breakpointKeys[i];
    if (value[breakpoint] !== undefined) {
      result = value[breakpoint];
    }
  }
  
  return result;
};

/**
 * Create a CSS string for responsive props
 * 
 * @param {Object} props - The component props
 * @param {Object} propConfig - Configuration for each prop
 * @returns {string} CSS string for responsive props
 */
export const createResponsiveStyles = (props, propConfig) => {
  let styles = '';
  
  // Process each prop
  Object.keys(props).forEach(propName => {
    const value = props[propName];
    const config = propConfig[propName];
    
    // Skip if there's no configuration for this prop
    if (!config) return;
    
    // If the value is not a responsive object, add the style directly
    if (!isResponsiveObject(value)) {
      const cssValue = typeof config.transform === 'function' 
        ? config.transform(value) 
        : value;
      
      styles += `${config.cssProperty}: ${cssValue};`;
      return;
    }
    
    // Handle responsive object
    // Add base styles
    if (value.base !== undefined) {
      const cssValue = typeof config.transform === 'function' 
        ? config.transform(value.base) 
        : value.base;
      
      styles += `${config.cssProperty}: ${cssValue};`;
    }
    
    // Add media queries for each breakpoint
    breakpointKeys.forEach(breakpoint => {
      if (value[breakpoint] !== undefined) {
        const cssValue = typeof config.transform === 'function' 
          ? config.transform(value[breakpoint]) 
          : value[breakpoint];
        
        styles += `
          @media (min-width: ${breakpoints[breakpoint]}) {
            ${config.cssProperty}: ${cssValue};
          }
        `;
      }
    });
  });
  
  return styles;
};

/**
 * Create a className string for responsive variants
 * 
 * @param {string} baseClassName - The base class name
 * @param {Object|string} variant - The variant or responsive variant object
 * @returns {string} Class name string for responsive variants
 */
export const createResponsiveClassNames = (baseClassName, variant) => {
  // If the variant is not a responsive object, return the class name directly
  if (!isResponsiveObject(variant)) {
    return variant ? `${baseClassName}-${variant}` : baseClassName;
  }
  
  // Start with the base class name
  let classNames = [baseClassName];
  
  // Add base variant
  if (variant.base) {
    classNames.push(`${baseClassName}-${variant.base}`);
  }
  
  // Add breakpoint-specific variants
  breakpointKeys.forEach(breakpoint => {
    if (variant[breakpoint]) {
      classNames.push(`${baseClassName}-${breakpoint}-${variant[breakpoint]}`);
    }
  });
  
  return classNames.join(' ');
};

/**
 * Create CSS for responsive variants
 * 
 * @param {string} baseClassName - The base class name
 * @param {Object} variants - The variants configuration
 * @returns {string} CSS for responsive variants
 */
export const createResponsiveVariantStyles = (baseClassName, variants) => {
  let styles = '';
  
  // Add styles for each variant
  Object.keys(variants).forEach(variantName => {
    const variantStyles = variants[variantName];
    
    // Add the base variant styles
    styles += `
      .${baseClassName}-${variantName} {
        ${Object.entries(variantStyles).map(([prop, value]) => `${prop}: ${value};`).join('\n')}
      }
    `;
    
    // Add breakpoint-specific variant styles
    breakpointKeys.forEach(breakpoint => {
      styles += `
        .${baseClassName}-${breakpoint}-${variantName} {
          @media (min-width: ${breakpoints[breakpoint]}) {
            ${Object.entries(variantStyles).map(([prop, value]) => `${prop}: ${value};`).join('\n')}
          }
        }
      `;
    });
  });
  
  return styles;
};

/**
 * Example prop config for common layout props
 */
export const layoutPropConfig = {
  margin: {
    cssProperty: 'margin',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  marginTop: {
    cssProperty: 'margin-top',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  marginRight: {
    cssProperty: 'margin-right',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  marginBottom: {
    cssProperty: 'margin-bottom',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  marginLeft: {
    cssProperty: 'margin-left',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  padding: {
    cssProperty: 'padding',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  paddingTop: {
    cssProperty: 'padding-top',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  paddingRight: {
    cssProperty: 'padding-right',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  paddingBottom: {
    cssProperty: 'padding-bottom',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  paddingLeft: {
    cssProperty: 'padding-left',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  width: {
    cssProperty: 'width',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  height: {
    cssProperty: 'height',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  minWidth: {
    cssProperty: 'min-width',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  maxWidth: {
    cssProperty: 'max-width',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  minHeight: {
    cssProperty: 'min-height',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  maxHeight: {
    cssProperty: 'max-height',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  display: {
    cssProperty: 'display',
  },
  position: {
    cssProperty: 'position',
  },
  top: {
    cssProperty: 'top',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  right: {
    cssProperty: 'right',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  bottom: {
    cssProperty: 'bottom',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  left: {
    cssProperty: 'left',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  zIndex: {
    cssProperty: 'z-index',
  },
};

/**
 * Example prop config for flex layout props
 */
export const flexPropConfig = {
  ...layoutPropConfig,
  flexDirection: {
    cssProperty: 'flex-direction',
  },
  flexWrap: {
    cssProperty: 'flex-wrap',
  },
  justifyContent: {
    cssProperty: 'justify-content',
  },
  alignItems: {
    cssProperty: 'align-items',
  },
  alignContent: {
    cssProperty: 'align-content',
  },
  alignSelf: {
    cssProperty: 'align-self',
  },
  flex: {
    cssProperty: 'flex',
  },
  flexGrow: {
    cssProperty: 'flex-grow',
  },
  flexShrink: {
    cssProperty: 'flex-shrink',
  },
  flexBasis: {
    cssProperty: 'flex-basis',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  order: {
    cssProperty: 'order',
  },
};

/**
 * Example prop config for grid layout props
 */
export const gridPropConfig = {
  ...layoutPropConfig,
  gridTemplateColumns: {
    cssProperty: 'grid-template-columns',
  },
  gridTemplateRows: {
    cssProperty: 'grid-template-rows',
  },
  gridTemplateAreas: {
    cssProperty: 'grid-template-areas',
  },
  gridAutoColumns: {
    cssProperty: 'grid-auto-columns',
  },
  gridAutoRows: {
    cssProperty: 'grid-auto-rows',
  },
  gridAutoFlow: {
    cssProperty: 'grid-auto-flow',
  },
  gridColumn: {
    cssProperty: 'grid-column',
  },
  gridRow: {
    cssProperty: 'grid-row',
  },
  gridArea: {
    cssProperty: 'grid-area',
  },
  gap: {
    cssProperty: 'gap',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  rowGap: {
    cssProperty: 'row-gap',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
  columnGap: {
    cssProperty: 'column-gap',
    transform: value => typeof value === 'number' ? `${value}px` : value,
  },
};

export default {
  breakpoints,
  breakpointKeys,
  isResponsiveObject,
  getValueForBreakpoint,
  createResponsiveStyles,
  createResponsiveClassNames,
  createResponsiveVariantStyles,
  layoutPropConfig,
  flexPropConfig,
  gridPropConfig,
};
