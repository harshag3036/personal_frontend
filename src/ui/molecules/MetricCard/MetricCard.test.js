import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MetricCard from './MetricCard';
import { METRIC_CARD_CLASS } from './constants';

describe('MetricCard', () => {
  // Basic rendering tests
  test('renders with required props', () => {
    render(<MetricCard value="42" label="Answer" />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Answer')).toBeInTheDocument();
  });
  
  test('renders with all props', () => {
    const handleClick = jest.fn();
    
    render(
      <MetricCard
        value="85%"
        label="Completion"
        detail="Last updated: Today"
        icon="analytics"
        iconColor="primary"
        trend={{
          value: "+5%",
          direction: "up",
          label: "vs last week"
        }}
        variant="success"
        size="large"
        interactive={true}
        fullWidth={true}
        onClick={handleClick}
        data-testid="metric-card"
      />
    );
    
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('Completion')).toBeInTheDocument();
    expect(screen.getByText('Last updated: Today')).toBeInTheDocument();
    expect(screen.getByText('+5%')).toBeInTheDocument();
    expect(screen.getByText('vs last week')).toBeInTheDocument();
    
    // Check for icon (this is a simplified check since we can't easily check the actual icon)
    const iconElement = document.querySelector(`.${METRIC_CARD_CLASS}__icon`);
    expect(iconElement).toBeInTheDocument();
    
    // Check for classes
    const cardElement = screen.getByTestId('metric-card');
    expect(cardElement).toHaveClass(`${METRIC_CARD_CLASS}--success`);
    expect(cardElement).toHaveClass(`${METRIC_CARD_CLASS}--large`);
    expect(cardElement).toHaveClass(`${METRIC_CARD_CLASS}--interactive`);
    expect(cardElement).toHaveClass(`${METRIC_CARD_CLASS}--full-width`);
    
    // Test click handler
    fireEvent.click(cardElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // Variant tests
  test('renders with different variants', () => {
    const { rerender } = render(
      <MetricCard 
        value="42" 
        label="Default" 
        variant="default" 
        data-testid="metric-card" 
      />
    );
    
    expect(screen.getByTestId('metric-card')).toHaveClass(`${METRIC_CARD_CLASS}--default`);
    
    rerender(
      <MetricCard 
        value="42" 
        label="Elevated" 
        variant="elevated" 
        data-testid="metric-card" 
      />
    );
    
    expect(screen.getByTestId('metric-card')).toHaveClass(`${METRIC_CARD_CLASS}--elevated`);
    
    rerender(
      <MetricCard 
        value="42" 
        label="Outlined" 
        variant="outlined" 
        data-testid="metric-card" 
      />
    );
    
    expect(screen.getByTestId('metric-card')).toHaveClass(`${METRIC_CARD_CLASS}--outlined`);
  });
  
  // Size tests
  test('renders with different sizes', () => {
    const { rerender } = render(
      <MetricCard 
        value="42" 
        label="Small" 
        size="small" 
        data-testid="metric-card" 
      />
    );
    
    expect(screen.getByTestId('metric-card')).toHaveClass(`${METRIC_CARD_CLASS}--small`);
    
    rerender(
      <MetricCard 
        value="42" 
        label="Medium" 
        size="medium" 
        data-testid="metric-card" 
      />
    );
    
    expect(screen.getByTestId('metric-card')).toHaveClass(`${METRIC_CARD_CLASS}--medium`);
    
    rerender(
      <MetricCard 
        value="42" 
        label="Large" 
        size="large" 
        data-testid="metric-card" 
      />
    );
    
    expect(screen.getByTestId('metric-card')).toHaveClass(`${METRIC_CARD_CLASS}--large`);
  });
  
  // Trend tests
  test('renders with different trend directions', () => {
    const { rerender } = render(
      <MetricCard 
        value="42" 
        label="Up Trend" 
        trend={{ value: "+10%", direction: "up" }}
        data-testid="metric-card" 
      />
    );
    
    const trendElement = document.querySelector(`.${METRIC_CARD_CLASS}__trend`);
    expect(trendElement).toHaveClass(`${METRIC_CARD_CLASS}__trend--positive`);
    
    rerender(
      <MetricCard 
        value="42" 
        label="Down Trend" 
        trend={{ value: "-10%", direction: "down" }}
        data-testid="metric-card" 
      />
    );
    
    expect(document.querySelector(`.${METRIC_CARD_CLASS}__trend`)).toHaveClass(`${METRIC_CARD_CLASS}__trend--negative`);
    
    rerender(
      <MetricCard 
        value="42" 
        label="Neutral Trend" 
        trend={{ value: "0%", direction: "neutral" }}
        data-testid="metric-card" 
      />
    );
    
    expect(document.querySelector(`.${METRIC_CARD_CLASS}__trend`)).toHaveClass(`${METRIC_CARD_CLASS}__trend--neutral`);
  });
  
  // Interactive tests
  test('handles click events when interactive', () => {
    const handleClick = jest.fn();
    
    render(
      <MetricCard
        value="42"
        label="Interactive"
        interactive={true}
        onClick={handleClick}
        data-testid="metric-card"
      />
    );
    
    fireEvent.click(screen.getByTestId('metric-card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('does not handle click events when not interactive', () => {
    const handleClick = jest.fn();
    
    render(
      <MetricCard
        value="42"
        label="Non-Interactive"
        interactive={false}
        onClick={handleClick}
        data-testid="metric-card"
      />
    );
    
    fireEvent.click(screen.getByTestId('metric-card'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  // Polymorphic as prop test
  test('renders with custom element type', () => {
    render(
      <MetricCard
        as="article"
        value="42"
        label="Article"
        data-testid="metric-card"
      />
    );
    
    const cardElement = screen.getByTestId('metric-card');
    expect(cardElement.tagName.toLowerCase()).toBe('article');
  });
});
