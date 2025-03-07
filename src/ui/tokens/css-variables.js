/**
 * CSS Variables Generator
 * 
 * This file generates CSS variables from the design tokens to make them
 * available for use in CSS files. This ensures consistency between JavaScript
 * and CSS usage of design tokens.
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import shadows from './shadows';
import borders from './borders';
import breakpoints from './breakpoints';
import zIndex from './z-index';

/**
 * Converts a JavaScript object of design tokens into CSS variables
 * @param {Object} tokens - The design tokens object
 * @param {string} prefix - The prefix for the CSS variable names
 * @returns {string} - The CSS variables as a string
 */
const convertToCssVariables = (tokens, prefix = '') => {
  let cssVars = '';
  
  Object.entries(tokens).forEach(([key, value]) => {
    // Skip functions and complex objects
    if (typeof value === 'function' || (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof String))) {
      return;
    }
    
    const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
    
    if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      if (Array.isArray(value)) {
        // Handle arrays
        cssVars += `  ${varName}: ${value.join(', ')};\n`;
      } else {
        // Recursively process nested objects
        cssVars += convertToCssVariables(value, prefix ? `${prefix}-${key}` : key);
      }
    } else {
      // Handle primitive values
      cssVars += `  ${varName}: ${value};\n`;
    }
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for colors
 */
const generateColorVariables = () => {
  let cssVars = '';
  
  // Process color palette
  Object.entries(colors.palette).forEach(([colorName, colorShades]) => {
    Object.entries(colorShades).forEach(([shade, value]) => {
      cssVars += `  --color-${colorName}-${shade}: ${value};\n`;
    });
  });
  
  // Process semantic colors
  Object.entries(colors.semantic).forEach(([category, colorValues]) => {
    Object.entries(colorValues).forEach(([name, value]) => {
      cssVars += `  --color-${category}-${name}: ${value};\n`;
    });
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for typography
 */
const generateTypographyVariables = () => {
  let cssVars = '';
  
  // Font families
  Object.entries(typography.fontFamilies).forEach(([name, value]) => {
    cssVars += `  --font-family-${name}: ${value};\n`;
  });
  
  // Font weights
  Object.entries(typography.fontWeights).forEach(([name, value]) => {
    cssVars += `  --font-weight-${name}: ${value};\n`;
  });
  
  // Font sizes
  Object.entries(typography.fontSizes).forEach(([name, value]) => {
    cssVars += `  --font-size-${name}: ${value};\n`;
  });
  
  // Line heights
  Object.entries(typography.lineHeights).forEach(([name, value]) => {
    cssVars += `  --line-height-${name}: ${value};\n`;
  });
  
  // Letter spacings
  Object.entries(typography.letterSpacings).forEach(([name, value]) => {
    cssVars += `  --letter-spacing-${name}: ${value};\n`;
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for spacing
 */
const generateSpacingVariables = () => {
  let cssVars = '';
  
  // Base spacing unit
  cssVars += `  --spacing-base: ${spacing.baseSpacingUnit}px;\n`;
  
  // Spacing scale
  Object.entries(spacing.spacing).forEach(([name, value]) => {
    cssVars += `  --spacing-${name}: ${value};\n`;
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for shadows
 */
const generateShadowVariables = () => {
  let cssVars = '';
  
  // Box shadows
  Object.entries(shadows.boxShadows).forEach(([name, value]) => {
    cssVars += `  --shadow-${name}: ${value};\n`;
  });
  
  // Elevations
  Object.entries(shadows.elevations).forEach(([level, value]) => {
    cssVars += `  --elevation-${level}: ${value};\n`;
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for borders
 */
const generateBorderVariables = () => {
  let cssVars = '';
  
  // Border widths
  Object.entries(borders.borderWidths).forEach(([name, value]) => {
    cssVars += `  --border-width-${name}: ${value};\n`;
  });
  
  // Border radii
  Object.entries(borders.borderRadii).forEach(([name, value]) => {
    cssVars += `  --border-radius-${name}: ${value};\n`;
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for z-indices
 */
const generateZIndexVariables = () => {
  let cssVars = '';
  
  // Z-indices
  Object.entries(zIndex.zIndices).forEach(([name, value]) => {
    cssVars += `  --z-index-${name}: ${value};\n`;
  });
  
  return cssVars;
};

/**
 * Generates CSS variables for breakpoints
 */
const generateBreakpointVariables = () => {
  let cssVars = '';
  
  // Breakpoints
  Object.entries(breakpoints.values).forEach(([name, value]) => {
    cssVars += `  --breakpoint-${name}: ${value};\n`;
  });
  
  return cssVars;
};

/**
 * Generates all CSS variables
 */
export const generateCssVariables = () => {
  let cssVars = ':root {\n';
  
  // Add all variables
  cssVars += generateColorVariables();
  cssVars += generateTypographyVariables();
  cssVars += generateSpacingVariables();
  cssVars += generateShadowVariables();
  cssVars += generateBorderVariables();
  cssVars += generateZIndexVariables();
  cssVars += generateBreakpointVariables();
  
  cssVars += '}\n';
  
  return cssVars;
};

/**
 * Generates dark theme CSS variables
 */
export const generateDarkThemeVariables = () => {
  let cssVars = '.theme-dark {\n';
  
  // Add dark theme color variables
  Object.entries(colors.darkTheme).forEach(([category, colorValues]) => {
    Object.entries(colorValues).forEach(([name, value]) => {
      cssVars += `  --color-${category}-${name}: ${value};\n`;
    });
  });
  
  cssVars += '}\n';
  
  return cssVars;
};

/**
 * Generates high contrast theme CSS variables
 */
export const generateHighContrastThemeVariables = () => {
  let cssVars = '.theme-high-contrast {\n';
  
  // Add high contrast theme color variables
  Object.entries(colors.highContrastTheme).forEach(([category, colorValues]) => {
    Object.entries(colorValues).forEach(([name, value]) => {
      cssVars += `  --color-${category}-${name}: ${value};\n`;
    });
  });
  
  cssVars += '}\n';
  
  return cssVars;
};

/**
 * Generates all CSS variables including themes
 */
export const generateAllCssVariables = () => {
  return `${generateCssVariables()}
${generateDarkThemeVariables()}
${generateHighContrastThemeVariables()}`;
};

export default generateAllCssVariables;
