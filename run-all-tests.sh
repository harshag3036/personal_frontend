#!/bin/bash

# run-all-tests.sh
# A comprehensive test runner for the UI component library
# This script runs tests for all components (atoms, molecules, organisms)
# and generates detailed coverage reports

# Set colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}           UI Component Library Test Suite                 ${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Function to run tests with coverage for a specific component type
run_component_tests() {
  local component_type=$1
  local component_path="src/ui/$component_type"
  
  echo -e "\n${YELLOW}Running tests for $component_type components...${NC}"
  
  # Create directory for coverage reports if it doesn't exist
  mkdir -p coverage/$component_type
  
  # Run tests with coverage
  npx jest --coverage --coverageDirectory=coverage/$component_type "$component_path"
  
  # Check if tests passed
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ All $component_type tests passed!${NC}"
  else
    echo -e "${RED}✗ Some $component_type tests failed. Please check the output above.${NC}"
    FAILED=1
  fi
}

# Function to display summary of test coverage
display_coverage_summary() {
  echo -e "\n${YELLOW}Generating coverage summary...${NC}"
  
  # Check if coverage reports exist
  if [ -d "coverage" ]; then
    echo -e "${GREEN}Coverage reports are available in the coverage directory.${NC}"
    echo -e "${BLUE}Summary:${NC}"
    
    # Display coverage summary for each component type
    for type in atoms molecules organisms; do
      if [ -f "coverage/$type/coverage-summary.json" ]; then
        echo -e "${YELLOW}$type:${NC}"
        npx coverage-summary coverage/$type/coverage-summary.json
      fi
    done
  else
    echo -e "${RED}No coverage reports found.${NC}"
  fi
}

# Initialize failure flag
FAILED=0

# Run tests for each component type
run_component_tests "atoms"
run_component_tests "molecules"
run_component_tests "organisms"

# Run tests for utilities
echo -e "\n${YELLOW}Running tests for utilities...${NC}"
mkdir -p coverage/utilities
npx jest --coverage --coverageDirectory=coverage/utilities "src/ui/utilities"
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ All utilities tests passed!${NC}"
else
  echo -e "${RED}✗ Some utilities tests failed. Please check the output above.${NC}"
  FAILED=1
fi

# Generate combined coverage report
echo -e "\n${YELLOW}Generating combined coverage report...${NC}"
npx jest --coverage --coverageDirectory=coverage/combined "src/ui"
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Combined coverage report generated successfully!${NC}"
else
  echo -e "${RED}✗ Failed to generate combined coverage report.${NC}"
  FAILED=1
fi

# Display coverage summary
display_coverage_summary

# Final status message
echo -e "\n${BLUE}===========================================================${NC}"
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed successfully!${NC}"
  echo -e "${BLUE}===========================================================${NC}"
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please check the output above.${NC}"
  echo -e "${BLUE}===========================================================${NC}"
  exit 1
fi
