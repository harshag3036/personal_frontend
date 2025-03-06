/**
 * Breakpoint Tokens
 * 
 * This file defines the breakpoint tokens for the design system.
 * Breakpoints are used for responsive design and media queries.
 */

/**
 * Breakpoint Values
 * 
 * Breakpoint values define the screen widths at which the layout changes.
 * These values are based on common device sizes and follow a mobile-first approach.
 */
export const breakpointValues = {
  xs: '0px',      // Extra small devices (portrait phones)
  sm: '600px',    // Small devices (landscape phones)
  md: '960px',    // Medium devices (tablets)
  lg: '1280px',   // Large devices (desktops)
  xl: '1536px',   // Extra large devices (large desktops)
};

/**
 * Media Queries
 * 
 * Media queries are used to apply styles conditionally based on the screen size.
 * These are defined as template strings that can be used in CSS-in-JS solutions.
 */
export const mediaQueries = {
  up: {
    xs: `@media (min-width: ${breakpointValues.xs})`,
    sm: `@media (min-width: ${breakpointValues.sm})`,
    md: `@media (min-width: ${breakpointValues.md})`,
    lg: `@media (min-width: ${breakpointValues.lg})`,
    xl: `@media (min-width: ${breakpointValues.xl})`,
  },
  
  down: {
    xs: `@media (max-width: ${breakpointValues.sm})`,
    sm: `@media (max-width: ${breakpointValues.md})`,
    md: `@media (max-width: ${breakpointValues.lg})`,
    lg: `@media (max-width: ${breakpointValues.xl})`,
    xl: `@media (max-width: 9999px)`,
  },
  
  between: {
    xs_sm: `@media (min-width: ${breakpointValues.xs}) and (max-width: ${breakpointValues.sm})`,
    sm_md: `@media (min-width: ${breakpointValues.sm}) and (max-width: ${breakpointValues.md})`,
    md_lg: `@media (min-width: ${breakpointValues.md}) and (max-width: ${breakpointValues.lg})`,
    lg_xl: `@media (min-width: ${breakpointValues.lg}) and (max-width: ${breakpointValues.xl})`,
  },
  
  only: {
    xs: `@media (max-width: ${breakpointValues.sm})`,
    sm: `@media (min-width: ${breakpointValues.sm}) and (max-width: ${breakpointValues.md})`,
    md: `@media (min-width: ${breakpointValues.md}) and (max-width: ${breakpointValues.lg})`,
    lg: `@media (min-width: ${breakpointValues.lg}) and (max-width: ${breakpointValues.xl})`,
    xl: `@media (min-width: ${breakpointValues.xl})`,
  },
};

/**
 * Breakpoint Helpers
 * 
 * Helper functions for working with breakpoints in JavaScript.
 */
export const breakpointHelpers = {
  /**
   * Check if the current screen width is at least the specified breakpoint.
   * @param {string} breakpoint - The breakpoint to check (xs, sm, md, lg, xl).
   * @returns {boolean} - Whether the screen width is at least the specified breakpoint.
   */
  isUp: (breakpoint) => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    const breakpointValue = parseInt(breakpointValues[breakpoint], 10);
    return width >= breakpointValue;
  },
  
  /**
   * Check if the current screen width is at most the specified breakpoint.
   * @param {string} breakpoint - The breakpoint to check (xs, sm, md, lg, xl).
   * @returns {boolean} - Whether the screen width is at most the specified breakpoint.
   */
  isDown: (breakpoint) => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    const nextBreakpoint = {
      xs: 'sm',
      sm: 'md',
      md: 'lg',
      lg: 'xl',
      xl: 'xxl',
    }[breakpoint];
    const breakpointValue = parseInt(breakpointValues[nextBreakpoint] || '9999px', 10);
    return width < breakpointValue;
  },
  
  /**
   * Check if the current screen width is between the specified breakpoints.
   * @param {string} start - The starting breakpoint (xs, sm, md, lg, xl).
   * @param {string} end - The ending breakpoint (xs, sm, md, lg, xl).
   * @returns {boolean} - Whether the screen width is between the specified breakpoints.
   */
  isBetween: (start, end) => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    const startValue = parseInt(breakpointValues[start], 10);
    const nextEnd = {
      xs: 'sm',
      sm: 'md',
      md: 'lg',
      lg: 'xl',
      xl: 'xxl',
    }[end];
    const endValue = parseInt(breakpointValues[nextEnd] || '9999px', 10);
    return width >= startValue && width < endValue;
  },
  
  /**
   * Check if the current screen width is exactly the specified breakpoint.
   * @param {string} breakpoint - The breakpoint to check (xs, sm, md, lg, xl).
   * @returns {boolean} - Whether the screen width is exactly the specified breakpoint.
   */
  isOnly: (breakpoint) => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    const breakpointValue = parseInt(breakpointValues[breakpoint], 10);
    const nextBreakpoint = {
      xs: 'sm',
      sm: 'md',
      md: 'lg',
      lg: 'xl',
      xl: 'xxl',
    }[breakpoint];
    const nextBreakpointValue = parseInt(breakpointValues[nextBreakpoint] || '9999px', 10);
    return width >= breakpointValue && width < nextBreakpointValue;
  },
};

/**
 * Breakpoint Tokens
 */
const breakpoints = {
  values: breakpointValues,
  mediaQueries,
  helpers: breakpointHelpers,
};

export default breakpoints;
