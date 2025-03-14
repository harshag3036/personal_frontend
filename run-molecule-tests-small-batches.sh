#!/bin/bash

# run-molecule-tests-small-batches.sh
# A script to run tests for problematic molecule components in smaller batches
# This helps prevent memory overload when running tests

# Set colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}      Molecule Component Tests in Smaller Batches          ${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Define smaller batches for problematic components
# Original Batch 2: "CommentThread DatePicker Dropdown FileUploader Menu"
BATCH2_1="CommentThread"
BATCH2_2="DatePicker"
BATCH2_3="Dropdown"
BATCH2_4="FileUploader"
BATCH2_5="Menu"

# Original Batch 5: "Textarea Timeline TimePicker Toast Tooltip"
BATCH5_1="Textarea"
BATCH5_2="Timeline"
BATCH5_3="TimePicker"
BATCH5_4="Toast"
BATCH5_5="Tooltip"

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
  local batch_name=$1
  local batch_var="$batch_name"
  local components=${!batch_var}
  local failed_components=()
  
  echo -e "\n${BLUE}===========================================================${NC}"
  echo -e "${BLUE}                     $batch_name                        ${NC}"
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
  echo -e "\n${BLUE}$batch_name Results:${NC}"
  if [ ${#failed_components[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ All components in $batch_name passed!${NC}"
  else
    echo -e "${RED}✗ Failed components in $batch_name: ${failed_components[*]}${NC}"
    ALL_FAILED_COMPONENTS+=("${failed_components[@]}")
  fi
}

# Initialize array for tracking failed components
ALL_FAILED_COMPONENTS=()

# Check if a specific batch was requested
if [ $# -eq 1 ]; then
  BATCH_NAME=$1
  
  # Check if the requested batch exists
  if [ -n "${!BATCH_NAME}" ]; then
    run_batch $BATCH_NAME
  else
    echo -e "${RED}Invalid batch name. Available batches:${NC}"
    echo -e "${YELLOW}Batch 2 components: BATCH2_1, BATCH2_2, BATCH2_3, BATCH2_4, BATCH2_5${NC}"
    echo -e "${YELLOW}Batch 5 components: BATCH5_1, BATCH5_2, BATCH5_3, BATCH5_4, BATCH5_5${NC}"
    exit 1
  fi
else
  # Run all Batch 2 sub-batches
  echo -e "\n${BLUE}Running all Batch 2 sub-batches...${NC}"
  for i in {1..5}; do
    run_batch "BATCH2_$i"
    echo -e "\n${YELLOW}Waiting 2 seconds before starting next batch...${NC}"
    sleep 2
  done
  
  # Run all Batch 5 sub-batches
  echo -e "\n${BLUE}Running all Batch 5 sub-batches...${NC}"
  for i in {1..5}; do
    run_batch "BATCH5_$i"
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
