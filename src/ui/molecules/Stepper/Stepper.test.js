import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper, Step, StepLabel, StepContent } from './index';

describe('Stepper', () => {
  test('renders with default props', () => {
    render(
      <Stepper>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });
  
  test('renders with active step', () => {
    render(
      <Stepper activeStep={1}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
    );
    
    const stepperElement = screen.getByText('Step 2').closest('.ui-step');
    expect(stepperElement).toHaveClass('ui-step--active');
  });
  
  test('renders with vertical variant', () => {
    render(
      <Stepper variant="vertical">
        <Step>
          <StepLabel>Step 1</StepLabel>
          <StepContent>Content 1</StepContent>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
          <StepContent>Content 2</StepContent>
        </Step>
      </Stepper>
    );
    
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(document.querySelector('.ui-stepper--vertical')).toBeInTheDocument();
  });
  
  test('handles step click in non-linear mode', () => {
    const handleChange = jest.fn();
    
    render(
      <Stepper activeStep={0} nonLinear onChange={handleChange}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );
    
    const step2 = screen.getByText('Step 2').closest('.ui-step');
    fireEvent.click(step2);
    
    expect(handleChange).toHaveBeenCalledWith(1);
  });
  
  test('renders with optional text', () => {
    render(
      <Stepper>
        <Step>
          <StepLabel optional optionalText="Optional">Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });
  
  test('renders with error state', () => {
    render(
      <Stepper>
        <Step error>
          <StepLabel error optional errorText="Error">Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    
    expect(screen.getByText('Error')).toBeInTheDocument();
    const stepElement = screen.getByText('Step 1').closest('.ui-step');
    expect(stepElement).toHaveClass('ui-step--error');
  });
});
