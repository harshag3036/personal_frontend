# UI Component Testing Guide

This comprehensive guide covers UI component testing for this project, including running tests, fixing common issues, and best practices.

## Table of Contents

1. [Running Tests](#running-tests)
2. [How Tests Work](#how-tests-work)
3. [Common Testing Issues](#common-testing-issues)
4. [Memory Optimization](#memory-optimization)
5. [Test Examples](#test-examples)
6. [Best Practices](#best-practices)
7. [Resources](#resources)

## Running Tests

### Recommended Method
```bash
# Run all tests (most reliable)
./run-tests-safely.sh

# Test specific component
./run-tests-safely.sh "Button"

# Test specific category
./run-tests-safely.sh "src/ui/atoms"
./run-tests-safely.sh "src/ui/molecules"
./run-tests-safely.sh "src/ui/organisms"
```

### Alternative Methods
```bash
# Run by category with command flags
./run-tests.sh --category=atoms

# Run with optimized mocks
./run-tests.sh --optimized

# See all options
./run-tests.sh --help
```

**NPM Scripts:**
```bash
# Run all tests in watch mode (interactive)
npm test

# Run all tests and generate coverage report
npm run test:coverage

# Run only UI component tests
npm run test:ui

# Run UI tests with coverage report
npm run test:ui:coverage

# Run tests for organism components only
npm run test:ui:organisms

# Run tests for organism components with coverage
npm run test:ui:organisms:coverage
```

Note: The `run-tests-safely.sh` script is generally more reliable for running complete test suites.

## How Tests Work

The `run-tests-safely.sh` script uses a multi-phase approach:

1. Runs tests with memory leak detection and error logging
2. Analyzes results to identify memory issues and timeouts
3. Creates an improved test setup with better memory handling
4. Re-runs problematic tests with optimized settings

The `run-all-tests.sh` script provides a comprehensive test suite that:
- Runs tests for all component types (atoms, molecules, organisms) separately
- Runs tests for utilities
- Generates detailed coverage reports for each component type
- Creates a combined coverage report
- Provides a summary of test results with color-coded output

### Coverage Requirements

- **Statement coverage:** 80% minimum
- **Branch coverage:** 80% minimum 
- **Function coverage:** 80% minimum
- **Line coverage:** 80% minimum

### Viewing Coverage Reports

- **Terminal output:** Summary of the coverage report is displayed in the terminal
- **HTML report:** Detailed HTML report at `coverage/lcov-report/index.html`

## Common Testing Issues

### 1. Responsive Props Handling

**Problem**: Tests fail when components use responsive props.

**Solution**:
```jsx
// In your test file:
import { hasResponsiveStyling } from '../../utils/testUtils';

test('component renders with responsive props', () => {
  const { container } = render(<Component variant={{ base: 'primary', md: 'secondary' }} />);
  
  // Check base class is always present
  expect(container.firstChild).toHaveClass('ui-component');
  
  // Handle both responsive and non-responsive cases
  if (hasResponsiveStyling(container.firstChild)) {
    expect(container.firstChild).toHaveAttribute('data-responsive', 'true');
  } else {
    expect(container.firstChild).toHaveClass('ui-component--primary');
  }
});
```

### 2. Component Extension Issues

**Problem**: Tests fail when using the component extension system.

**Solution**:
```jsx
// In your test file:
import { registerComponentExtension } from '../../ui/utilities/component-extension';

beforeEach(() => {
  // Register extensions needed for testing
  registerComponentExtension('Component', 'tooltip', (props) => ({
    ...props,
    'aria-label': props.tooltipContent || 'Tooltip',
  }));
});

test('component with extension works', () => {
  const { getByTestId } = render(
    <Component extensions={['tooltip']} tooltipContent="Help text" />
  );
  
  expect(getByTestId('mock-component')).toHaveAttribute('aria-label', 'Help text');
});
```

### 3. Timing Issues

**Problem**: Tests fail for components with animations or async behavior.

**Solution**:
```jsx
// In your test file:
import { act } from '@testing-library/react';

test('modal shows content after animation', () => {
  jest.useFakeTimers();
  
  const { getByTestId } = render(<Modal isOpen={true} />);
  
  // Fast-forward through animation
  act(() => {
    jest.advanceTimersByTime(300);
  });
  
  expect(getByTestId('mock-modal')).toBeVisible();
});
```

## Memory Optimization

If tests still crash or run out of memory:

1. **Use Optimized Mocks**:
   ```bash
   ./run-tests-safely.sh
   # Or for specific components
   ./run-tests.sh --component=Button --optimized
   ```

2. **Make Optimized Mocks Permanent**:
   ```bash
   cp src/__mocks__/ui-components.optimized.js src/__mocks__/ui-components.js
   ```

3. **Increase Memory Limit**:
   ```bash
   NODE_OPTIONS="--max-old-space-size=8192" ./run-tests-safely.sh
   ```

## Test Examples

### Basic Component Test

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('ui-button--primary');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('ui-button--secondary');
  });
});
```

### Complex Organism Testing

```jsx
// For testing complex organism components
import NotificationCenter, { NOTIFICATION_TYPES, NOTIFICATION_STATES } from './index';

const mockNotifications = [
  {
    id: 1,
    title: 'Test Notification 1',
    message: 'This is a test notification message',
    time: '5 minutes ago',
    type: NOTIFICATION_TYPES.INFO,
    state: NOTIFICATION_STATES.UNREAD
  }
];

describe('NotificationCenter', () => {
  test('renders without crashing', () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders notifications correctly', () => {
    render(<NotificationCenter notifications={mockNotifications} />);
    expect(screen.getByText('Test Notification 1')).toBeInTheDocument();
  });
  
  test('renders empty state when no notifications', () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });
  
  test('calls onMarkAsRead when mark as read button is clicked', () => {
    const handleMarkAsRead = jest.fn();
    render(
      <NotificationCenter 
        notifications={[{...mockNotifications[0], actions: ['markAsRead']}]} 
        onMarkAsRead={handleMarkAsRead}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Mark as read'));
    expect(handleMarkAsRead).toHaveBeenCalledWith(1);
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**:
   - Focus on what the component does, not how it's built
   - Test user interactions and visible outputs

2. **Don't Hard-code for Test Success**:
   - Never modify components just to make tests pass
   - Fix the test approach when components use advanced patterns

3. **Handle Responsive Props Correctly**:
   - Use the `hasResponsiveStyling` utility
   - Check for data attributes instead of exact classes

4. **Clean Up Between Tests**:
   - Clear mocks with `jest.clearAllMocks()`
   - Run garbage collection with the `--expose-gc` flag
   - Reset timers with `jest.clearAllTimers()`

5. **Run Tests in Smaller Batches**:
   - Test by category when working on specific component types
   - Use specific component patterns when fixing individual components

6. **Test Component Composition (for Organisms)**:
   - Test how child components are composed
   - Test data flow between components
   - Test state management
   - Test interactions between parts

7. **Test Edge Cases**:
   - Test empty data
   - Test large data sets
   - Test error states
   - Test loading states

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Jest DOM](https://github.com/testing-library/jest-dom)
