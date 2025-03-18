/**
 * UI Component Test Utilities
 * 
 * This file provides utilities, helpers, and troubleshooting guidance for
 * writing and fixing component tests while maintaining good testing practices.
 */

import React from 'react';
import { render } from '@testing-library/react';

/**
 * Common Test Issues and Solutions
 * 
 * IMPORTANT: When fixing failing tests, prefer addressing the root cause rather than
 * modifying components to artificially pass tests. Tests should validate real behavior,
 * not enforce arbitrary implementation details.
 */

/**
 * Creates a wrapper component for testing components that require context providers
 * 
 * @param {React.ReactNode} ui - The component to render
 * @param {Object} options - Additional options for rendering
 * @returns {Object} Rendered component with test utilities
 * 
 * @example
 * // Testing a component that needs theme context
 * const { getByText } = renderWithProviders(<MyComponent />);
 */
export function renderWithProviders(ui, options = {}) {
  // This is just a basic example - expand with actual providers as needed
  const Wrapper = ({ children }) => (
    <div data-testid="test-provider-wrapper">
      {children}
    </div>
  );
  
  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Helper to check if an element has responsive styling applied
 * 
 * @param {HTMLElement} element - The DOM element to check
 * @returns {boolean} Whether the element has responsive styling
 */
export function hasResponsiveStyling(element) {
  return element && 
    (element.style.getPropertyValue('--responsive-styles') === 'true' ||
     element.hasAttribute('data-responsive-variant') ||
     element.hasAttribute('data-responsive-size'));
}

/**
 * Helper to test components with responsive props
 * 
 * @param {Object} props - The original props
 * @returns {Object} Props with added marker for testing
 */
export function withResponsiveProps(props) {
  return {
    ...props,
    'data-test-responsive': true,
  };
}

/**
 * =====================================================================
 * TEST TROUBLESHOOTING GUIDE
 * =====================================================================
 * 
 * When encountering failing tests, consider the following issues and solutions:
 * 
 * 1. RESPONSIVE PROPS ISSUES:
 * ----------------------------
 * Problem: Tests fail when components use responsive props (props that change based on screen size)
 * 
 * Diagnosis:
 * - Check if the component accepts props like: variant={{ base: 'primary', md: 'secondary' }}
 * - Check if tests are expecting specific CSS classes that don't match the responsive implementation
 * 
 * Solutions:
 * - Use the custom matcher: expect(element).toHaveResponsiveStyling()
 * - Ensure tests check for the presence of CSS custom properties or data attributes
 * - Add a comment to the test indicating that responsive props require special handling
 * 
 * Example fix:
 * ```
 * // BEFORE (problematic)
 * expect(button).toHaveClass('ui-button--primary ui-button--medium');
 * 
 * // AFTER (resilient)
 * expect(button).toHaveClass('ui-button');
 * if (hasResponsiveStyling(button)) {
 *   // Component is using responsive styling - verify base classes only
 *   expect(button.style.getPropertyValue('--responsive-styles')).toBeTruthy();
 * } else {
 *   // Standard styling - check specific classes
 *   expect(button).toHaveClass('ui-button--primary ui-button--medium');
 * }
 * ```
 * 
 * 2. COMPONENT EXTENSION ISSUES:
 * ------------------------------
 * Problem: Tests fail when components use the component extension system
 * 
 * Diagnosis:
 * - Check if the component uses extensions like tooltips, ripple effects, etc.
 * - Check if tests expect specific extension-related behavior
 * 
 * Solutions:
 * - Register required extensions before testing the component
 * - Check for extension attributes in tests: data-has-extensions, data-applied-extensions
 * - Add clear comments about extension dependencies
 * 
 * Example fix:
 * ```
 * // BEFORE (missing extension setup)
 * test('button with tooltip extension works', () => {
 *   render(<Button extensions={['tooltip']} />);
 *   // Test fails because tooltip extension not registered
 * });
 * 
 * // AFTER (proper setup)
 * import { registerComponentExtension } from '../../ui/utilities/component-extension';
 * 
 * test('button with tooltip extension works', () => {
 *   // Register the extension for testing
 *   registerComponentExtension('Button', 'tooltip', (props) => ({
 *     ...props,
 *     'aria-label': 'Tooltip content',
 *   }));
 *   
 *   const { getByTestId } = render(<Button extensions={['tooltip']} />);
 *   const button = getByTestId('mock-button');
 *   
 *   // Check if extension was applied
 *   expect(button).toHaveAttribute('data-has-extensions', 'true');
 *   expect(button).toHaveAttribute('aria-label', 'Tooltip content');
 * });
 * ```
 * 
 * 3. ASYNC COMPONENT ISSUES:
 * --------------------------
 * Problem: Tests fail for components with async behavior, animations, or timers
 * 
 * Diagnosis:
 * - Check if component uses useEffect with timers, animations, or state updates
 * - Check if tests expect immediate state changes
 * 
 * Solutions:
 * - Use jest.useFakeTimers() and jest.advanceTimersByTime() to control timing
 * - Use act() to wrap async updates
 * - Add clear comments about timing expectations
 * 
 * Example fix:
 * ```
 * // BEFORE (timing issues)
 * test('dropdown opens when clicked', () => {
 *   const { getByTestId } = render(<Dropdown />);
 *   fireEvent.click(getByTestId('dropdown-trigger'));
 *   expect(getByTestId('dropdown-menu')).toBeVisible();
 * });
 * 
 * // AFTER (controlled timing)
 * test('dropdown opens when clicked', () => {
 *   // Setup fake timers
 *   jest.useFakeTimers();
 *   
 *   const { getByTestId } = render(<Dropdown />);
 *   fireEvent.click(getByTestId('mock-dropdown-trigger'));
 *   
 *   // Advance timers to allow animation to complete
 *   act(() => {
 *     jest.advanceTimersByTime(300); // Animation duration
 *   });
 *   
 *   expect(getByTestId('mock-dropdown')).toHaveAttribute('data-state', 'open');
 * });
 * ```
 * 
 * 4. EVENT HANDLING ISSUES:
 * ------------------------
 * Problem: Tests fail due to event propagation or handling
 * 
 * Diagnosis:
 * - Check if component has nested event handlers
 * - Check if test expects events to be stopped or propagated
 * 
 * Solutions:
 * - Ensure event mocks include stopPropagation and preventDefault methods
 * - Add clear documentation about event flow
 * 
 * Example fix:
 * ```
 * // BEFORE (missing event methods)
 * test('menu item prevents default on click', () => {
 *   const handleClick = jest.fn();
 *   const { getByText } = render(<MenuItem onClick={handleClick} />);
 *   fireEvent.click(getByText('Item'));
 *   expect(handleClick).toHaveBeenCalled();
 * });
 * 
 * // AFTER (proper event setup)
 * test('menu item prevents default on click', () => {
 *   const handleClick = jest.fn();
 *   const preventDefault = jest.fn();
 *   
 *   const { getByTestId } = render(<MenuItem onClick={handleClick} />);
 *   fireEvent.click(getByTestId('mock-menu-item'), { preventDefault });
 *   
 *   expect(handleClick).toHaveBeenCalled();
 *   expect(preventDefault).toHaveBeenCalled();
 * });
 * ```
 * 
 * Remember: The goal of tests is to validate behavior, not implementation details.
 * Focus on what the component does, not how it does it.
 */

export default {
  renderWithProviders,
  hasResponsiveStyling,
  withResponsiveProps,
};
