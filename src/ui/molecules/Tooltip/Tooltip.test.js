import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './index';

// Mock createPortal to test portals
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node) => node,
  };
});

describe('Tooltip Component', () => {
  // Mock requestAnimationFrame
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb();
      return 0;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    window.requestAnimationFrame.mockRestore();
  });

  test('renders children correctly', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('shows tooltip on mouse enter and hides on mouse leave', () => {
    render(
      <Tooltip content="Tooltip content" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Initially, tooltip is not visible
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    
    // Mouse enter
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Tooltip should be visible
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    
    // Mouse leave
    fireEvent.mouseLeave(screen.getByText('Hover me'));
    
    // Tooltip should be hidden
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('shows tooltip on focus and hides on blur', () => {
    render(
      <Tooltip content="Tooltip content" delay={0}>
        <button>Focus me</button>
      </Tooltip>
    );
    
    // Initially, tooltip is not visible
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    
    // Focus
    fireEvent.focus(screen.getByText('Focus me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Tooltip should be visible
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    
    // Blur
    fireEvent.blur(screen.getByText('Focus me'));
    
    // Tooltip should be hidden
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('hides tooltip when escape key is pressed', () => {
    render(
      <Tooltip content="Tooltip content" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Tooltip should be visible
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    
    // Press escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Tooltip should be hidden
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  test('applies variant and size classes correctly', () => {
    render(
      <Tooltip 
        content="Tooltip content" 
        variant="info" 
        size="lg" 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Get tooltip element
    const tooltip = screen.getByText('Tooltip content').closest('.ui-tooltip');
    
    // Check classes
    expect(tooltip).toHaveClass('ui-tooltip--info');
    expect(tooltip).toHaveClass('ui-tooltip--lg');
  });

  test('applies placement class correctly', () => {
    render(
      <Tooltip 
        content="Tooltip content" 
        placement="bottom" 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Get tooltip element
    const tooltip = screen.getByText('Tooltip content').closest('.ui-tooltip');
    
    // Check class
    expect(tooltip).toHaveClass('ui-tooltip--bottom');
  });

  test('applies arrow class when arrow is true', () => {
    render(
      <Tooltip 
        content="Tooltip content" 
        arrow={true} 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Get tooltip element
    const tooltip = screen.getByText('Tooltip content').closest('.ui-tooltip');
    
    // Check class
    expect(tooltip).toHaveClass('ui-tooltip--arrow');
  });

  test('does not apply arrow class when arrow is false', () => {
    render(
      <Tooltip 
        content="Tooltip content" 
        arrow={false} 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Get tooltip element
    const tooltip = screen.getByText('Tooltip content').closest('.ui-tooltip');
    
    // Check class
    expect(tooltip).not.toHaveClass('ui-tooltip--arrow');
  });

  test('applies custom className correctly', () => {
    render(
      <Tooltip 
        content="Tooltip content" 
        className="custom-tooltip" 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Get tooltip element
    const tooltip = screen.getByText('Tooltip content').closest('.ui-tooltip');
    
    // Check class
    expect(tooltip).toHaveClass('custom-tooltip');
  });

  test('applies maxWidth style correctly', () => {
    const maxWidth = 200;
    render(
      <Tooltip 
        content="Tooltip content" 
        maxWidth={maxWidth} 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Get tooltip element
    const tooltip = screen.getByText('Tooltip content').closest('.ui-tooltip');
    
    // Check style
    expect(tooltip).toHaveStyle(`max-width: ${maxWidth}px`);
  });

  test('respects delay prop', () => {
    render(
      <Tooltip 
        content="Tooltip content" 
        delay={500}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Mouse enter
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    
    // Tooltip should not be visible yet
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    
    // Advance timers by 300ms (less than delay)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Tooltip should still not be visible
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    
    // Advance timers to complete delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Tooltip should now be visible
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  test('renders rich content correctly', () => {
    const richContent = (
      <div>
        <h3>Rich Content</h3>
        <p>This is rich content</p>
      </div>
    );
    
    render(
      <Tooltip 
        content={richContent} 
        delay={0}
      >
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Show tooltip
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.runAllTimers();
    });
    
    // Check rich content
    expect(screen.getByText('Rich Content')).toBeInTheDocument();
    expect(screen.getByText('This is rich content')).toBeInTheDocument();
  });
});
