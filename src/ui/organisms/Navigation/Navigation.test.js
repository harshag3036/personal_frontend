/**
 * Navigation Component Tests
 * 
 * This file contains tests for the Navigation component.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navigation from './Navigation';
import { 
  NAVIGATION_VARIANTS,
  NAVIGATION_SIZES,
  NAVIGATION_POSITIONS,
  NAVIGATION_ALIGNMENTS,
  NAVIGATION_MODIFIERS,
  NAVIGATION_BREAKPOINTS
} from './constants';

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<Navigation>
      <Navigation.Brand>Brand</Navigation.Brand>
      <Navigation.Items>
        <Navigation.Item href="/">Home</Navigation.Item>
      </Navigation.Items>
    </Navigation>);
    
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders with custom variant', () => {
    const { container } = render(
      <Navigation variant={NAVIGATION_VARIANTS.PRIMARY}>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--${NAVIGATION_VARIANTS.PRIMARY}`)).toBeInTheDocument();
  });

  test('renders with custom size', () => {
    const { container } = render(
      <Navigation size={NAVIGATION_SIZES.LARGE}>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--${NAVIGATION_SIZES.LARGE}`)).toBeInTheDocument();
  });

  test('renders with custom position', () => {
    const { container } = render(
      <Navigation position={NAVIGATION_POSITIONS.FIXED_TOP}>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--fixed-top`)).toBeInTheDocument();
  });

  test('renders with custom alignment', () => {
    const { container } = render(
      <Navigation alignment={NAVIGATION_ALIGNMENTS.CENTER}>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--center`)).toBeInTheDocument();
  });

  test('renders with shadow', () => {
    const { container } = render(
      <Navigation withShadow>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--with-shadow`)).toBeInTheDocument();
  });

  test('renders with border', () => {
    const { container } = render(
      <Navigation withBorder>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--with-border`)).toBeInTheDocument();
  });

  test('renders with transparent background', () => {
    const { container } = render(
      <Navigation transparent>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--transparent`)).toBeInTheDocument();
  });

  test('renders with fixed position', () => {
    const { container } = render(
      <Navigation fixed>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--fixed-top`)).toBeInTheDocument();
  });

  test('renders with sticky position', () => {
    const { container } = render(
      <Navigation sticky>
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--sticky-top`)).toBeInTheDocument();
  });

  test('renders with collapsible menu', () => {
    const { container } = render(
      <Navigation collapsible>
        <Navigation.Brand>Brand</Navigation.Brand>
        <Navigation.Items>
          <Navigation.Item href="/">Home</Navigation.Item>
        </Navigation.Items>
      </Navigation>
    );
    
    expect(container.querySelector(`.ui-navigation--collapsible`)).toBeInTheDocument();
    expect(container.querySelector(`.ui-navigation-toggle`)).toBeInTheDocument();
  });

  test('toggles menu when toggle button is clicked', async () => {
    const { container } = render(
      <Navigation collapsible>
        <Navigation.Brand>Brand</Navigation.Brand>
        <Navigation.Items>
          <Navigation.Item href="/">Home</Navigation.Item>
        </Navigation.Items>
      </Navigation>
    );
    
    const toggleButton = container.querySelector('.ui-navigation-toggle');
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(container.querySelector('.ui-navigation-collapse--expanded')).toBeInTheDocument();
    });
    
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(container.querySelector('.ui-navigation-collapse--expanded')).not.toBeInTheDocument();
    });
  });

  test('renders active navigation item', () => {
    const { container } = render(
      <Navigation>
        <Navigation.Items>
          <Navigation.Item href="/" active>Home</Navigation.Item>
          <Navigation.Item href="/about">About</Navigation.Item>
        </Navigation.Items>
      </Navigation>
    );
    
    expect(container.querySelector('.ui-navigation-item--active')).toBeInTheDocument();
    expect(container.querySelector('.ui-navigation-item--active')).toHaveTextContent('Home');
  });

  test('renders disabled navigation item', () => {
    const { container } = render(
      <Navigation>
        <Navigation.Items>
          <Navigation.Item href="/">Home</Navigation.Item>
          <Navigation.Item href="/about" disabled>About</Navigation.Item>
        </Navigation.Items>
      </Navigation>
    );
    
    expect(container.querySelector('.ui-navigation-item--disabled')).toBeInTheDocument();
    expect(container.querySelector('.ui-navigation-item--disabled')).toHaveTextContent('About');
  });

  test('renders dropdown navigation item', () => {
    const { container } = render(
      <Navigation>
        <Navigation.Items>
          <Navigation.Item dropdown dropdownContent={
            <div>Dropdown Content</div>
          }>
            Dropdown
          </Navigation.Item>
        </Navigation.Items>
      </Navigation>
    );
    
    expect(container.querySelector('.ui-navigation-item--dropdown')).toBeInTheDocument();
    expect(container.querySelector('.ui-navigation-dropdown')).toBeInTheDocument();
  });

  test('renders navigation with brand logo', () => {
    render(
      <Navigation>
        <Navigation.Brand logo="logo.png" alt="Logo">Brand</Navigation.Brand>
      </Navigation>
    );
    
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'logo.png');
  });

  test('renders navigation with actions', () => {
    render(
      <Navigation>
        <Navigation.Brand>Brand</Navigation.Brand>
        <Navigation.Items>
          <Navigation.Item href="/">Home</Navigation.Item>
        </Navigation.Items>
        <Navigation.Actions>
          <button>Action</button>
        </Navigation.Actions>
      </Navigation>
    );
    
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Action').closest('.ui-navigation-actions')).toBeInTheDocument();
  });

  test('handles click on navigation item', () => {
    const handleClick = jest.fn();
    
    render(
      <Navigation>
        <Navigation.Items>
          <Navigation.Item href="/" onClick={handleClick}>Home</Navigation.Item>
        </Navigation.Items>
      </Navigation>
    );
    
    fireEvent.click(screen.getByText('Home'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    const { container } = render(
      <Navigation className="custom-class">
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector('.ui-navigation')).toHaveClass('custom-class');
  });

  test('forwards additional props to the root element', () => {
    const { container } = render(
      <Navigation data-testid="navigation" aria-label="Main Navigation">
        <Navigation.Brand>Brand</Navigation.Brand>
      </Navigation>
    );
    
    expect(container.querySelector('.ui-navigation')).toHaveAttribute('data-testid', 'navigation');
    expect(container.querySelector('.ui-navigation')).toHaveAttribute('aria-label', 'Main Navigation');
  });
});
