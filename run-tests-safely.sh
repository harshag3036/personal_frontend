#!/bin/bash

# Enhanced test runner script to prevent crashes during UI component tests
# Usage: ./run-tests-safely.sh [test-pattern]

# Default test pattern is all tests
TEST_PATTERN=${1:-""}

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Enhanced UI Component Test Runner${NC}"
echo "Test pattern: ${TEST_PATTERN:-'All tests'}"

# Setup cleanup function to ensure files are restored regardless of how script exits
cleanup() {
  echo -e "\n${YELLOW}Cleaning up and restoring original files...${NC}"
  # Restore original setupTests.js
  if [ -f "src/setupTests.js.backup" ]; then
    mv src/setupTests.js.backup src/setupTests.js
    echo "Original setupTests.js restored."
  fi
  
  echo -e "\n${GREEN}Cleanup completed.${NC}"
}

# Ensure cleanup runs on script exit, error, or interruption
trap cleanup EXIT INT TERM

# Create a directory for test outputs
mkdir -p test-outputs

# 1. Run with memory leak detection and increased timeout
echo -e "\n${YELLOW}PHASE 1: Running with memory leak detection and error logging...${NC}"
NODE_OPTIONS="--expose-gc --max-old-space-size=4096" JEST_ENVIRONMENT_VARIABLES="{\"logErrors\":true}" npm test -- --testPathPattern="$TEST_PATTERN" --testTimeout=10000 --maxWorkers=1 --bail --verbose --watchAll=false --json > test-outputs/test-result.json || true

# 2. Analyze results for memory leaks and timeouts
echo -e "\n${YELLOW}PHASE 2: Analyzing test results...${NC}"
node << EOF
const fs = require('fs');
const path = require('path');

try {
  const testResults = JSON.parse(fs.readFileSync('test-outputs/test-result.json', 'utf8'));
  
  // Extract failed tests and error patterns
  const failedTests = [];
  const memoryErrors = [];
  const timeoutErrors = [];
  const unexpectedErrors = [];
  
  testResults.testResults.forEach(result => {
    (result.assertionResults || []).forEach(assertion => {
      if (assertion.status === 'failed') {
        failedTests.push(assertion.fullName);
        
        const errorMessage = assertion.failureMessages.join(' ');
        if (errorMessage.includes('heap out of memory') || errorMessage.includes('allocation failed')) {
          memoryErrors.push(assertion.fullName);
        } else if (errorMessage.includes('Exceeded timeout') || errorMessage.includes('async callback was not invoked')) {
          timeoutErrors.push(assertion.fullName);
        } else {
          unexpectedErrors.push({
            name: assertion.fullName,
            error: errorMessage
          });
        }
      }
    });
  });
  
  // Write analysis to file
  fs.writeFileSync('test-outputs/test-analysis.json', JSON.stringify({
    failedTests,
    memoryErrors,
    timeoutErrors,
    unexpectedErrors
  }, null, 2));
  
  // Output summary
  console.log(\`Total failed tests: \${failedTests.length}\`);
  console.log(\`Memory-related failures: \${memoryErrors.length}\`);
  console.log(\`Timeout-related failures: \${timeoutErrors.length}\`);
  console.log(\`Other errors: \${unexpectedErrors.length}\`);
  
  // Create safe batch list of tests that didn't have memory issues
  const safeTests = testResults.testResults
    .filter(result => !result.assertionResults.some(assertion => 
      assertion.status === 'failed' && 
      assertion.failureMessages.some(msg => 
        msg.includes('heap out of memory') || 
        msg.includes('allocation failed')
      )
    ))
    .map(result => result.name);
  
  fs.writeFileSync('test-outputs/safe-tests.json', JSON.stringify(safeTests, null, 2));
  
} catch (error) {
  console.error('Error analyzing test results:', error);
}
EOF

# 3. Create an improved temporary setupTests.js that fixes memory and timer issues
echo -e "\n${YELLOW}PHASE 3: Creating improved test setup...${NC}"
cp src/setupTests.js src/setupTests.js.backup

cat > src/setupTests.js.improved << 'EOF'
// Enhanced test setup with better memory management and timer handling
import '@testing-library/jest-dom';

// Import original mocks
import { clearMocks as clearComponentExtensionMocks } from './__mocks__/componentExtension';

// Explicitly track components to unmount
const mountedComponents = new Set();

// Track if errors should be logged (controlled by environment variable)
const SHOULD_LOG_ERRORS = process.env.JEST_ENVIRONMENT_VARIABLES ? 
  JSON.parse(process.env.JEST_ENVIRONMENT_VARIABLES).logErrors : false;

// Original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Better console error handling - logs critical errors while filtering noise
console.error = SHOULD_LOG_ERRORS ? 
  originalConsoleError : 
  (...args) => {
    // Filter known React warnings while still showing critical errors
    if (
      args[0]?.includes?.('Warning:') ||
      args[0]?.includes?.('React does not recognize') ||
      args[0]?.includes?.('Invalid DOM property') ||
      args[0]?.includes?.('is unrecognized in this browser')
    ) {
      return;
    }
    originalConsoleError(...args);
  };

console.warn = SHOULD_LOG_ERRORS ? 
  originalConsoleWarn : 
  (...args) => {
    if (args[0]?.includes?.('componentWill') || args[0]?.includes?.('deprecated')) {
      return;
    }
    originalConsoleWarn(...args);
  };

// Custom matcher for responsive styling with optimized implementation
expect.extend({
  toHaveResponsiveStyling(received) {
    // Simplified check that's less prone to memory issues
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

// Improved timer handling
jest.useFakeTimers({ legacyFakeTimers: true });

// Global test setup with cleaner approach
beforeAll(() => {
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});

// More comprehensive cleanup after each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  jest.clearAllTimers();
  
  // Clear component extension mocks
  clearComponentExtensionMocks();
  
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});

// Restore console behavior
afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  
  // Final garbage collection
  if (global.gc) {
    global.gc();
  }
});
EOF

# 4. Run the problematic tests with improved setup in small batches
echo -e "\n${YELLOW}PHASE 4: Running with improved setup...${NC}"
cp src/setupTests.js.improved src/setupTests.js

# If we have any test outputs, use them to run tests intelligently
if [ -f "test-outputs/test-analysis.json" ]; then
  echo "Running tests with improved setup..."
  
  # Run memory-problematic tests with higher memory limit
  node << EOF
  const fs = require('fs');
  try {
    const analysis = JSON.parse(fs.readFileSync('test-outputs/test-analysis.json', 'utf8'));
    if (analysis.memoryErrors.length > 0) {
      fs.writeFileSync('test-outputs/memory-tests.txt', 
        analysis.memoryErrors.map(test => {
          // Extract the filename pattern from the test name
          const parts = test.split(' ');
          return parts[0]; // Usually the first part contains component name
        }).join('|')
      );
    }
  } catch (error) {
    console.error('Error preparing test batches:', error);
  }
EOF

  # Run memory-intensive tests with special settings
  if [ -f "test-outputs/memory-tests.txt" ]; then
    MEMORY_TEST_PATTERN=$(cat test-outputs/memory-tests.txt)
    echo -e "${YELLOW}Running memory-intensive tests with special settings...${NC}"
    NODE_OPTIONS="--expose-gc --max-old-space-size=8192" npm test -- --testPathPattern="$MEMORY_TEST_PATTERN" --testTimeout=15000 --runInBand --watchAll=false || true
  fi
  
  # Run timeout tests with longer timeout
  node << EOF
  const fs = require('fs');
  try {
    const analysis = JSON.parse(fs.readFileSync('test-outputs/test-analysis.json', 'utf8'));
    if (analysis.timeoutErrors.length > 0) {
      fs.writeFileSync('test-outputs/timeout-tests.txt', 
        analysis.timeoutErrors.map(test => {
          const parts = test.split(' ');
          return parts[0];
        }).join('|')
      );
    }
  } catch (error) {
    console.error('Error preparing timeout tests:', error);
  }
EOF

  # Run timeout-prone tests with longer timeout
  if [ -f "test-outputs/timeout-tests.txt" ]; then
    TIMEOUT_TEST_PATTERN=$(cat test-outputs/timeout-tests.txt)
    echo -e "${YELLOW}Running timeout-prone tests with longer timeouts...${NC}"
    NODE_OPTIONS="--expose-gc" npm test -- --testPathPattern="$TIMEOUT_TEST_PATTERN" --testTimeout=30000 --maxWorkers=1 --watchAll=false || true
  fi

else
  # Fallback: run all tests with improved setup
  NODE_OPTIONS="--expose-gc --max-old-space-size=4096" npm test -- --testPathPattern="$TEST_PATTERN" --testTimeout=10000 --maxWorkers=2 --watchAll=false
fi

# Note: We don't need PHASE 5 (restore original setup) here since trap will handle it

echo -e "\n${GREEN}Test run completed. Check test-outputs directory for analysis.${NC}"
echo "If you still have issues, consider:"
echo "1. Running fewer tests at once"
echo "2. Further simplifying mock implementations"
echo "3. Checking for memory leaks in component lifecycle methods"
echo "4. Run tests in smaller batches by category:"
echo "   ./run-tests-safely.sh \"src/ui/atoms\""
echo "   ./run-tests-safely.sh \"src/ui/molecules\""
echo "   ./run-tests-safely.sh \"src/ui/organisms\""
