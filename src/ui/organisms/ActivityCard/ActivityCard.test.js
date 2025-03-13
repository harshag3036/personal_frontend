/**
 * ActivityCard Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActivityCard from './index';
import { 
  ACTIVITY_CARD_CLASS, 
  ACTIVITY_CARD_HEADER_CLASS,
  ACTIVITY_CARD_TITLE_CLASS,
  ACTIVITY_CARD_SUBTITLE_CLASS,
  ACTIVITY_CARD_BODY_CLASS,
  ACTIVITY_CARD_FOOTER_CLASS,
  ACTIVITY_CARD_MEDIA_CLASS,
  ACTIVITY_CARD_CONTENT_CLASS,
  ACTIVITY_CARD_ACTIONS_CLASS,
  ACTIVITY_CARD_VARIANTS,
  ACTIVITY_CARD_SIZES,
  ACTIVITY_STATUS,
  ACTIVITY_CARD_MODIFIERS
} from './constants';

// Mock data for testing
const mockActivity = {
  id: 'activity1',
  title: 'Test Activity',
  description: 'This is a test activity description',
  status: ACTIVITY_STATUS.ACTIVE,
  date: '2025-01-01',
  author: 'Test User',
  tags: ['test', 'activity'],
  image: 'test-image.jpg'
};

describe('ActivityCard Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('This is a test activity description')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<ActivityCard activity={mockActivity} />);
    expect(container.firstChild).toHaveClass(ACTIVITY_CARD_CLASS);
  });

  // Title and subtitle tests
  test('renders title and subtitle when provided', () => {
    render(
      <ActivityCard
        activity={mockActivity}
        title="Card Title"
        subtitle="Card Subtitle"
      />
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        variant={ACTIVITY_CARD_VARIANTS.COMPACT}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_VARIANTS.COMPACT}`);
  });

  // Size tests
  test('applies the correct size class', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        size={ACTIVITY_CARD_SIZES.LARGE}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_SIZES.LARGE}`);
  });

  // Interactive mode tests
  test('applies the interactive class when interactive is true', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        interactive={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.INTERACTIVE}`);
  });

  // Disabled state tests
  test('applies the disabled class when disabled is true', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        disabled={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.DISABLED}`);
  });

  // Loading state tests
  test('applies the loading class when loading is true', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        loading={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.LOADING}`);
  });

  // Actions tests
  test('renders actions when provided', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        actions={<div data-testid="card-actions">Actions</div>}
      />
    );
    
    expect(screen.getByTestId('card-actions')).toBeInTheDocument();
    expect(container.querySelector(`.${ACTIVITY_CARD_FOOTER_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector(`.${ACTIVITY_CARD_ACTIONS_CLASS}`)).toBeInTheDocument();
  });

  // Media tests
  test('renders media when provided', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        media={<div data-testid="card-media">Media</div>}
      />
    );
    
    expect(screen.getByTestId('card-media')).toBeInTheDocument();
    expect(container.querySelector(`.${ACTIVITY_CARD_MEDIA_CLASS}`)).toBeInTheDocument();
  });

  // Event handler tests
  test('calls onClick when card is clicked in interactive mode', () => {
    const handleClick = jest.fn();
    
    render(
      <ActivityCard
        activity={mockActivity}
        interactive={true}
        onClick={handleClick}
      />
    );
    
    // Find and click the card
    const card = screen.getByText('Test Activity').closest(`.${ACTIVITY_CARD_CLASS}`);
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockActivity, expect.anything());
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    
    render(
      <ActivityCard
        activity={mockActivity}
        interactive={true}
        disabled={true}
        onClick={handleClick}
      />
    );
    
    // Find and click the card
    const card = screen.getByText('Test Activity').closest(`.${ACTIVITY_CARD_CLASS}`);
    fireEvent.click(card);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    
    render(
      <ActivityCard
        activity={mockActivity}
        interactive={true}
        loading={true}
        onClick={handleClick}
      />
    );
    
    // Find and click the card
    const card = screen.getByText('Test Activity').closest(`.${ACTIVITY_CARD_CLASS}`);
    fireEvent.click(card);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Status tests
  test('renders activity with the correct status', () => {
    const { container } = render(<ActivityCard activity={mockActivity} />);
    
    expect(container.firstChild).toHaveAttribute('data-status', ACTIVITY_STATUS.ACTIVE);
  });

  // Additional class names test
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(
      <ActivityCard
        activity={mockActivity}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(ACTIVITY_CARD_CLASS);
  });

  // Children rendering test
  test('renders children when provided', () => {
    render(
      <ActivityCard activity={mockActivity}>
        <div data-testid="card-children">Children Content</div>
      </ActivityCard>
    );
    
    expect(screen.getByTestId('card-children')).toBeInTheDocument();
  });
});
