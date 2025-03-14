#!/bin/bash

# run-molecule-tests-in-batches.sh
# A script to run tests for molecule components in batches
# This helps prevent memory overload when running many tests

# Set colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}           Molecule Component Tests in Batches             ${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Define batches of molecule components
# These are grouped to balance the test load
BATCH1="Accordion Alert Breadcrumb Card Checkbox"
BATCH2="CommentThread DatePicker Dropdown FileUploader Menu"
BATCH3="MetricCard Modal Pagination Popover Rating"
BATCH4="SearchInput Select StatusBadge Stepper Tabs"
BATCH5="Textarea Timeline TimePicker Toast Tooltip"

# Function to run tests for a specific component
run_component_test() {
  local component=$1
  local component_path="src/ui/molecules/$component"
  
  echo -e "\n${YELLOW}Testing $component component...${NC}"
  
  # Run test for the component
  npx jest "$component_path" --verbose
  
  # Check if test passed
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $component tests passed!${NC}"
    return 0
  else
    echo -e "${RED}✗ $component tests failed. See output above for details.${NC}"
    return 1
  fi
}

# Function to run tests for a batch of components
run_batch() {
  local batch_num=$1
  local batch_var="BATCH$batch_num"
  local components=${!batch_var}
  local failed_components=()
  
  echo -e "\n${BLUE}===========================================================${NC}"
  echo -e "${BLUE}                     BATCH $batch_num                        ${NC}"
  echo -e "${BLUE}===========================================================${NC}"
  echo -e "${YELLOW}Components in this batch: $components${NC}\n"
  
  # Run tests for each component in the batch
  for component in $components; do
    run_component_test "$component"
    if [ $? -ne 0 ]; then
      failed_components+=("$component")
    fi
  done
  
  # Report batch results
  echo -e "\n${BLUE}Batch $batch_num Results:${NC}"
  if [ ${#failed_components[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ All components in Batch $batch_num passed!${NC}"
  else
    echo -e "${RED}✗ Failed components in Batch $batch_num: ${failed_components[*]}${NC}"
    ALL_FAILED_COMPONENTS+=("${failed_components[@]}")
  fi
}

# Initialize array for tracking failed components
ALL_FAILED_COMPONENTS=()

# Check if a specific batch was requested
if [ $# -eq 1 ]; then
  BATCH_NUM=$1
  if [[ $BATCH_NUM =~ ^[1-5]$ ]]; then
    run_batch $BATCH_NUM
  else
    echo -e "${RED}Invalid batch number. Please specify a number between 1 and 5.${NC}"
    exit 1
  fi
else
  # Run all batches
  for i in {1..5}; do
    run_batch $i
    echo -e "\n${YELLOW}Waiting 2 seconds before starting next batch...${NC}"
    sleep 2
  done
fi

# Final summary
echo -e "\n${BLUE}===========================================================${NC}"
echo -e "${BLUE}                     FINAL SUMMARY                        ${NC}"
echo -e "${BLUE}===========================================================${NC}"

if [ ${#ALL_FAILED_COMPONENTS[@]} -eq 0 ]; then
  echo -e "${GREEN}✓ All molecule component tests passed successfully!${NC}"
else
  echo -e "${RED}✗ The following components had failing tests:${NC}"
  for component in "${ALL_FAILED_COMPONENTS[@]}"; do
    echo -e "${RED}  - $component${NC}"
  done
  echo -e "\n${YELLOW}Suggestion: Fix these components one by one and re-run their tests.${NC}"
fi

echo -e "\n${BLUE}===========================================================${NC}"

# Exit with appropriate status code
if [ ${#ALL_FAILED_COMPONENTS[@]} -eq 0 ]; then
  exit 0
else
  exit 1
fi
