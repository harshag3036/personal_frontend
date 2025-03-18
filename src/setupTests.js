// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * Enhanced test setup
 * 
 * This file provides improved test configurations that better reflect
 * the real behavior of components, while maintaining proper testing practices.
 * 
 * IMPORTANT: The goal is to maintain proper testing standards rather than
 * modifying components to artificially pass tests. Any test failures should
 * be analyzed to determine if the issue is in the test or the component.
 */

// Mock the componentExtension utility
jest.mock('./ui/utilities/component-extension');

// Mock the atoms and molecules components
jest.mock('./ui/atoms', () => require('./__mocks__/ui-components'));
jest.mock('./ui/molecules', () => require('./__mocks__/ui-components'));

// Import the clearMocks function from componentExtension to reset variant and extension registrations
import { clearMocks as clearComponentExtensionMocks } from './__mocks__/componentExtension';

// Custom matcher for checking if an element has responsive styling
expect.extend({
  toHaveResponsiveStyling(received) {
    const hasResponsiveStyle = received && 
      (received.style?.getPropertyValue('--responsive-styles') === 'true' ||
       received.hasAttribute?.('data-responsive-variant') ||
       received.hasAttribute?.('data-responsive-size'));
    
    return {
      pass: hasResponsiveStyle,
      message: () => hasResponsiveStyle 
        ? `Expected element not to have responsive styling`
        : `Expected element to have responsive styling`,
    };
  },
});

// Set up mock timer for asynchronous component tests
jest.useFakeTimers();

// Suppress console errors during tests while maintaining useful information
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  // Filter known React warnings that might occur during testing
  if (
    args[0]?.includes?.('Warning:') ||
    args[0]?.includes?.('React does not recognize') ||
    args[0]?.includes?.('Invalid DOM property') ||
    args[0]?.includes?.('is unrecognized in this browser')
  ) {
    // Add a comment about suppressed warnings for maintainability
    // console.log('[Test Warning Suppressed]:', args[0]);
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  // Filter known warnings but log them as comments
  if (args[0]?.includes?.('componentWill') || args[0]?.includes?.('deprecated')) {
    // console.log('[Test Deprecation Warning Suppressed]:', args[0]);
    return;
  }
  originalConsoleWarn(...args);
};

// Global test setup
beforeAll(() => {
  // Setup global test environment
  // This could include registering common component extensions or variants
  // that are used across multiple tests
});

// Reset mocks and cleanup after each test
afterEach(() => {
  // Clear all Jest mocks
  jest.clearAllMocks();
  
  // Clear component extension mocks to prevent test pollution
  clearComponentExtensionMocks();
  
  // Reset timers
  jest.clearAllTimers();
  
  // Test cleanup - to avoid memory leaks and test pollution
  // NOTE: Tests expecting side effects should clean up their own state
});

// Restore original console behavior
afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

/* 
 * Common test failures and troubleshooting notes:
 * 
 * 1. Responsive Props: 
 *    If tests fail due to responsive props, check if the test is correctly accounting for
 *    the CSS custom property '--responsive-styles' or using the toHaveResponsiveStyling matcher.
 * 
 * 2. Component Extensions:
 *    Component extension tests may fail if extensions are not properly registered before testing.
 *    Make sure to register any needed extensions in the test or beforeEach hook.
 * 
 * 3. Timing Issues:
 *    For components with animations or timers, use jest.useFakeTimers() and jest.advanceTimersByTime()
 *    to control timing in tests instead of modifying component behavior.
 * 
 * 4. Event Bubbling:
 *    Some tests may fail due to event bubbling. Use event.stopPropagation() in your test handlers if needed.
 */
