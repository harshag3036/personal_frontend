#!/bin/bash

# Run tests for organism components and generate coverage report
echo "Running tests for organism components..."
npm run test:ui:organisms:coverage

# Check if the tests passed
if [ $? -eq 0 ]; then
  echo "All tests passed!"
  echo "Coverage report generated in coverage/lcov-report/index.html"
  echo "You can open this file in a browser to view the detailed coverage report."
else
  echo "Some tests failed. Please check the output above for details."
fi
