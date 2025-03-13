/**
 * MilestoneTracker Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MilestoneTracker from './index';
import { 
  MILESTONE_TRACKER_CLASS, 
  MILESTONE_TRACKER_HEADER_CLASS,
  MILESTONE_TRACKER_TITLE_CLASS,
  MILESTONE_TRACKER_SUBTITLE_CLASS,
  MILESTONE_TRACKER_BODY_CLASS,
  MILESTONE_TRACKER_FOOTER_CLASS,
  MILESTONE_TRACKER_TIMELINE_CLASS,
  MILESTONE_TRACKER_MILESTONE_CLASS,
  MILESTONE_TRACKER_PROGRESS_CLASS,
  MILESTONE_TRACKER_ACTIONS_CLASS,
  MILESTONE_TRACKER_VARIANTS,
  MILESTONE_TRACKER_SIZES,
  MILESTONE_STATUS,
  MILESTONE_TRACKER_MODIFIERS
} from './constants';

// Mock data for testing
const mockMilestones = [
  {
    id: 'milestone1',
    title: 'Milestone 1',
    date: '2025-01-01',
    description: 'Description 1',
    status: MILESTONE_STATUS.NOT_STARTED
  },
  {
    id: 'milestone2',
    title: 'Milestone 2',
    date: '2025-02-01',
    description: 'Description 2',
    status: MILESTONE_STATUS.IN_PROGRESS
  },
  {
    id: 'milestone3',
    title: 'Milestone 3',
    date: '2025-03-01',
    description: 'Description 3',
    status: MILESTONE_STATUS.COMPLETED
  }
];

describe('MilestoneTracker Component', () => {
  // Basic rendering tests
  test('renders correctly', () => {
    render(<MilestoneTracker milestones={mockMilestones} />);
    expect(screen.getByText('Milestone 1')).toBeInTheDocument();
    expect(screen.getByText('Milestone 2')).toBeInTheDocument();
    expect(screen.getByText('Milestone 3')).toBeInTheDocument();
  });

  test('renders with the correct base class', () => {
    const { container } = render(<MilestoneTracker milestones={mockMilestones} />);
    expect(container.firstChild).toHaveClass(MILESTONE_TRACKER_CLASS);
  });

  // Title and subtitle tests
  test('renders title and subtitle when provided', () => {
    render(
      <MilestoneTracker
        title="Tracker Title"
        subtitle="Tracker Subtitle"
        milestones={mockMilestones}
      />
    );
    
    expect(screen.getByText('Tracker Title')).toBeInTheDocument();
    expect(screen.getByText('Tracker Subtitle')).toBeInTheDocument();
  });

  test('does not render header when title and subtitle are not provided', () => {
    const { container } = render(<MilestoneTracker milestones={mockMilestones} />);
    expect(container.querySelector(`.${MILESTONE_TRACKER_HEADER_CLASS}`)).not.toBeInTheDocument();
  });

  // Variant tests
  test('applies the correct variant class', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        variant={MILESTONE_TRACKER_VARIANTS.COMPACT}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_VARIANTS.COMPACT}`);
  });

  // Size tests
  test('applies the correct size class', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        size={MILESTONE_TRACKER_SIZES.LARGE}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_SIZES.LARGE}`);
  });

  // Progress tests
  test('renders progress bar with correct percentage', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        progress={50}
      />
    );
    
    const progressBar = container.querySelector(`.${MILESTONE_TRACKER_PROGRESS_CLASS}`);
    expect(progressBar).toBeInTheDocument();
    
    // For vertical layout (default), height should be set
    expect(progressBar.style.height).toBe('50%');
  });

  test('renders horizontal progress bar for horizontal variant', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        progress={50}
        variant={MILESTONE_TRACKER_VARIANTS.HORIZONTAL}
      />
    );
    
    const progressBar = container.querySelector(`.${MILESTONE_TRACKER_PROGRESS_CLASS}`);
    expect(progressBar).toBeInTheDocument();
    
    // For horizontal layout, width should be set
    expect(progressBar.style.width).toBe('50%');
  });

  // Interactive mode tests
  test('applies the interactive class when interactive is true', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        interactive={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.INTERACTIVE}`);
  });

  // Disabled state tests
  test('applies the disabled class when disabled is true', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        disabled={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.DISABLED}`);
  });

  // Loading state tests
  test('applies the loading class when loading is true', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        loading={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.LOADING}`);
  });

  // Readonly state tests
  test('applies the readonly class when readonly is true', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        readonly={true}
      />
    );
    
    expect(container.firstChild).toHaveClass(`${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.READONLY}`);
  });

  // Actions tests
  test('renders actions when provided', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        actions={<div data-testid="tracker-actions">Actions</div>}
      />
    );
    
    expect(screen.getByTestId('tracker-actions')).toBeInTheDocument();
    expect(container.querySelector(`.${MILESTONE_TRACKER_FOOTER_CLASS}`)).toBeInTheDocument();
    expect(container.querySelector(`.${MILESTONE_TRACKER_ACTIONS_CLASS}`)).toBeInTheDocument();
  });

  // Event handler tests
  test('calls onMilestoneClick when a milestone is clicked in interactive mode', () => {
    const handleMilestoneClick = jest.fn();
    
    render(
      <MilestoneTracker
        milestones={mockMilestones}
        interactive={true}
        onMilestoneClick={handleMilestoneClick}
      />
    );
    
    // Find and click the first milestone
    const milestone = screen.getByText('Milestone 1').closest(`.${MILESTONE_TRACKER_MILESTONE_CLASS}`);
    fireEvent.click(milestone);
    
    expect(handleMilestoneClick).toHaveBeenCalledTimes(1);
    expect(handleMilestoneClick).toHaveBeenCalledWith('milestone1', expect.anything());
  });

  test('does not call onMilestoneClick when disabled', () => {
    const handleMilestoneClick = jest.fn();
    
    render(
      <MilestoneTracker
        milestones={mockMilestones}
        interactive={true}
        disabled={true}
        onMilestoneClick={handleMilestoneClick}
      />
    );
    
    // Find and click the first milestone
    const milestone = screen.getByText('Milestone 1').closest(`.${MILESTONE_TRACKER_MILESTONE_CLASS}`);
    fireEvent.click(milestone);
    
    expect(handleMilestoneClick).not.toHaveBeenCalled();
  });

  test('does not call onMilestoneClick when loading', () => {
    const handleMilestoneClick = jest.fn();
    
    render(
      <MilestoneTracker
        milestones={mockMilestones}
        interactive={true}
        loading={true}
        onMilestoneClick={handleMilestoneClick}
      />
    );
    
    // Find and click the first milestone
    const milestone = screen.getByText('Milestone 1').closest(`.${MILESTONE_TRACKER_MILESTONE_CLASS}`);
    fireEvent.click(milestone);
    
    expect(handleMilestoneClick).not.toHaveBeenCalled();
  });

  test('does not call onMilestoneClick when readonly', () => {
    const handleMilestoneClick = jest.fn();
    
    render(
      <MilestoneTracker
        milestones={mockMilestones}
        interactive={true}
        readonly={true}
        onMilestoneClick={handleMilestoneClick}
      />
    );
    
    // Find and click the first milestone
    const milestone = screen.getByText('Milestone 1').closest(`.${MILESTONE_TRACKER_MILESTONE_CLASS}`);
    fireEvent.click(milestone);
    
    expect(handleMilestoneClick).not.toHaveBeenCalled();
  });

  // Milestone status tests
  test('renders milestones with the correct status', () => {
    const { container } = render(<MilestoneTracker milestones={mockMilestones} />);
    
    const milestones = container.querySelectorAll(`.${MILESTONE_TRACKER_MILESTONE_CLASS}`);
    
    expect(milestones[0]).toHaveAttribute('data-status', MILESTONE_STATUS.NOT_STARTED);
    expect(milestones[1]).toHaveAttribute('data-status', MILESTONE_STATUS.IN_PROGRESS);
    expect(milestones[2]).toHaveAttribute('data-status', MILESTONE_STATUS.COMPLETED);
  });

  // Additional class names test
  test('applies additional class names when className prop is provided', () => {
    const { container } = render(
      <MilestoneTracker
        milestones={mockMilestones}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass(MILESTONE_TRACKER_CLASS);
  });

  // Children rendering test
  test('renders children when provided', () => {
    render(
      <MilestoneTracker milestones={mockMilestones}>
        <div data-testid="tracker-children">Children Content</div>
      </MilestoneTracker>
    );
    
    expect(screen.getByTestId('tracker-children')).toBeInTheDocument();
  });
});
