# UI Component Testing Guide

This guide provides information on how to test UI components and generate test coverage reports.

## Running Tests

The project includes several npm scripts for running tests:

- `npm test`: Run all tests in watch mode (interactive)
- `npm run test:coverage`: Run all tests and generate a coverage report
- `npm run test:ui`: Run tests for UI components only
- `npm run test:ui:coverage`: Run tests for UI components and generate a coverage report
- `npm run test:ui:organisms`: Run tests for organism components only
- `npm run test:ui:organisms:coverage`: Run tests for organism components and generate a coverage report

You can also use the provided shell scripts to run tests:

```bash
# Run tests for organism components only
./run-organism-tests.sh

# Run a comprehensive test suite for all components
./run-all-tests.sh
```

The `run-all-tests.sh` script provides a comprehensive test suite that:
- Runs tests for all component types (atoms, molecules, organisms) separately
- Runs tests for utilities
- Generates detailed coverage reports for each component type
- Creates a combined coverage report
- Provides a summary of test results with color-coded output

## Test Coverage

The project is configured to generate test coverage reports using Jest's built-in coverage reporter. The coverage report includes information on:

- Statement coverage: The percentage of statements that have been executed
- Branch coverage: The percentage of branches (if/else, switch cases) that have been executed
- Function coverage: The percentage of functions that have been called
- Line coverage: The percentage of lines that have been executed

The coverage threshold is set to 80% for all metrics. This means that at least 80% of the code should be covered by tests.

## Viewing Coverage Reports

After running a test command with the `:coverage` suffix, you can view the coverage report in the following ways:

1. **Terminal output**: A summary of the coverage report is displayed in the terminal
2. **HTML report**: A detailed HTML report is generated in the `coverage/lcov-report` directory. Open `coverage/lcov-report/index.html` in a browser to view it.

## Writing Tests

Tests for UI components are written using Jest and React Testing Library. Here's a basic example of a test for a UI component:

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

## Best Practices for Testing UI Components

1. **Test behavior, not implementation**: Focus on testing what the component does, not how it does it.
2. **Test from the user's perspective**: Use queries that users would use to find elements (e.g., `getByText`, `getByRole`).
3. **Test accessibility**: Ensure that components are accessible by using role-based queries.
4. **Test different states**: Test components in different states (e.g., loading, error, success).
5. **Test edge cases**: Test components with edge cases (e.g., empty data, large data).
6. **Test interactions**: Test user interactions (e.g., clicking, typing, hovering).
7. **Test responsiveness**: Test components at different screen sizes.
8. **Test with realistic data**: Use realistic data in tests to ensure components work as expected in real-world scenarios.

## Testing Organisms

Organism components are more complex than atoms and molecules, and often require more comprehensive testing. When testing organisms, consider the following:

1. **Test component composition**: Ensure that the organism correctly composes its child components.
2. **Test data flow**: Test how data flows through the organism and its child components.
3. **Test state management**: Test how the organism manages its internal state.
4. **Test interactions between components**: Test how different parts of the organism interact with each other.
5. **Test integration with external systems**: Test how the organism integrates with external systems (e.g., APIs, stores).

## Example: Testing a NotificationCenter Organism

Here's an example of testing a NotificationCenter organism:

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationCenter, { NOTIFICATION_TYPES, NOTIFICATION_STATES } from './index';

// Sample notifications for testing
const mockNotifications = [
  {
    id: 1,
    title: 'Test Notification 1',
    message: 'This is a test notification message',
    time: '5 minutes ago',
    type: NOTIFICATION_TYPES.INFO,
    state: NOTIFICATION_STATES.UNREAD
  },
  {
    id: 2,
    title: 'Test Notification 2',
    message: 'This is another test notification message',
    time: '1 hour ago',
    type: NOTIFICATION_TYPES.SUCCESS,
    state: NOTIFICATION_STATES.READ
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
    expect(screen.getByText('This is a test notification message')).toBeInTheDocument();
    expect(screen.getByText('Test Notification 2')).toBeInTheDocument();
    expect(screen.getByText('This is another test notification message')).toBeInTheDocument();
  });

  test('renders empty state when no notifications', () => {
    render(<NotificationCenter notifications={[]} />);
    
    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  test('calls onMarkAsRead when mark as read button is clicked', () => {
    const handleMarkAsRead = jest.fn();
    
    render(
      <NotificationCenter 
        notifications={[{
          id: 1,
          title: 'Unread Notification',
          message: 'This is an unread notification',
          time: 'Just now',
          type: NOTIFICATION_TYPES.INFO,
          state: NOTIFICATION_STATES.UNREAD,
          actions: ['markAsRead']
        }]} 
        onMarkAsRead={handleMarkAsRead}
      />
    );
    
    const markAsReadButton = screen.getByLabelText('Mark as read');
    fireEvent.click(markAsReadButton);
    
    expect(handleMarkAsRead).toHaveBeenCalledWith(1);
  });
});
```

## Troubleshooting

If you encounter issues with tests, try the following:

1. **Check the console for errors**: Look for error messages in the console.
2. **Check the test output**: Look for error messages in the test output.
3. **Debug tests**: Use `console.log` or the `debug` function from React Testing Library to debug tests.
4. **Check the component**: Make sure the component is working as expected.
5. **Check the test**: Make sure the test is written correctly.
6. **Check the test environment**: Make sure the test environment is set up correctly.
7. **Check the test dependencies**: Make sure all dependencies are installed and up to date.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Jest DOM](https://github.com/testing-library/jest-dom)
