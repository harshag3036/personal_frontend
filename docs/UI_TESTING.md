# UI Component Testing Guide

This consolidated guide covers UI component testing for this project, including running tests, fixing common issues, and best practices.

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

### Alternative Method (with more options)
```bash
# Run by category with command flags
./run-tests.sh --category=atoms

# Run with optimized mocks
./run-tests.sh --optimized

# See all options
./run-tests.sh --help
```

Note: The `run-tests-safely.sh` script is generally more reliable for running complete test suites.

## How Tests Work

The `run-tests-safely.sh` script uses a multi-phase approach:

1. Runs tests with memory leak detection and error logging
2. Analyzes results to identify memory issues and timeouts
3. Creates an improved test setup with better memory handling
4. Re-runs problematic tests with optimized settings

## Common Test Issues & Solutions

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
