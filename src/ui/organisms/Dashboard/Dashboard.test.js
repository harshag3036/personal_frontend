/**
 * Dashboard Component Tests
 * 
 * This file contains tests for the Dashboard component.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard, { DASHBOARD_VARIANTS, DASHBOARD_SIZES, DASHBOARD_LAYOUTS } from './index';
import { Text, Button } from '../../atoms';

describe('Dashboard Component', () => {
  // Basic rendering tests
  test('renders without crashing', () => {
    render(<Dashboard />);
  });

  test('renders with title and description', () => {
    render(
      <Dashboard 
        title="Test Dashboard" 
        description="This is a test dashboard"
      />
    );
    
    expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
    expect(screen.getByText('This is a test dashboard')).toBeInTheDocument();
  });

  // Variant tests
  test.each(Object.values(DASHBOARD_VARIANTS))('renders with %s variant', (variant) => {
    render(<Dashboard variant={variant} data-testid="dashboard" />);
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass(`ui-dashboard--${variant}`);
  });

  // Size tests
  test.each(Object.values(DASHBOARD_SIZES))('renders with %s size', (size) => {
    render(<Dashboard size={size} data-testid="dashboard" />);
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass(`ui-dashboard--${size}`);
  });

  // Layout tests
  test.each(Object.values(DASHBOARD_LAYOUTS))('renders with %s layout', (layout) => {
    render(<Dashboard layout={layout} data-testid="dashboard" />);
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass(`ui-dashboard--${layout}`);
  });

  // Modifier tests
  test('renders with border when withBorder is true', () => {
    render(<Dashboard withBorder data-testid="dashboard" />);
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass('ui-dashboard--with-border');
  });

  test('renders with shadow when withShadow is true', () => {
    render(<Dashboard withShadow data-testid="dashboard" />);
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toHaveClass('ui-dashboard--with-shadow');
  });

  // Section tests
  test('renders header when withHeader is true', () => {
    render(
      <Dashboard 
        withHeader 
        title="Test Dashboard"
      />
    );
    
    const header = screen.getByText('Test Dashboard');
    expect(header).toBeInTheDocument();
  });

  test('renders footer when withFooter is true', () => {
    render(
      <Dashboard withFooter>
        <Dashboard.Footer data-testid="footer">
          Footer content
        </Dashboard.Footer>
      </Dashboard>
    );
    
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Footer content');
  });

  test('renders sidebar when withSidebar is true', () => {
    render(
      <Dashboard withSidebar>
        <Dashboard.Sidebar data-testid="sidebar">
          Sidebar content
        </Dashboard.Sidebar>
      </Dashboard>
    );
    
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveTextContent('Sidebar content');
  });

  // Widget tests
  test('renders widgets from props', () => {
    const widgets = [
      {
        id: 'widget-1',
        title: 'Widget 1',
        content: <div>Widget 1 content</div>
      },
      {
        id: 'widget-2',
        title: 'Widget 2',
        content: <div>Widget 2 content</div>
      }
    ];
    
    render(<Dashboard widgets={widgets} />);
    
    expect(screen.getByText('Widget 1')).toBeInTheDocument();
    expect(screen.getByText('Widget 1 content')).toBeInTheDocument();
    expect(screen.getByText('Widget 2')).toBeInTheDocument();
    expect(screen.getByText('Widget 2 content')).toBeInTheDocument();
  });

  // Compound component tests
  test('renders with compound components', () => {
    render(
      <Dashboard>
        <Dashboard.Header data-testid="header">
          <Text>Header content</Text>
        </Dashboard.Header>
        <Dashboard.Main data-testid="main">
          <Dashboard.Widgets>
            <Dashboard.Widget title="Widget 1">
              Widget 1 content
            </Dashboard.Widget>
          </Dashboard.Widgets>
        </Dashboard.Main>
        <Dashboard.Footer data-testid="footer">
          Footer content
        </Dashboard.Footer>
      </Dashboard>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header content')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByText('Widget 1')).toBeInTheDocument();
    expect(screen.getByText('Widget 1 content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  // State tests
  test('renders loading state', () => {
    render(<Dashboard loading data-testid="dashboard" />);
    
    const loadingOverlay = screen.getByRole('status');
    expect(loadingOverlay).toBeInTheDocument();
  });

  test('renders error state', () => {
    const errorMessage = 'An error occurred';
    render(<Dashboard error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // Event handler tests
  test('calls onRefresh when refresh button is clicked', async () => {
    const handleRefresh = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Dashboard 
        withHeader
        title="Test Dashboard"
        onRefresh={handleRefresh}
      />
    );
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    await user.click(refreshButton);
    
    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });

  // Empty state test
  test('renders empty state when no widgets are provided', () => {
    render(
      <Dashboard>
        <Dashboard.Main>
          <Dashboard.Widgets>
            <Dashboard.Empty 
              title="No widgets" 
              message="There are no widgets to display"
            />
          </Dashboard.Widgets>
        </Dashboard.Main>
      </Dashboard>
    );
    
    expect(screen.getByText('No widgets')).toBeInTheDocument();
    expect(screen.getByText('There are no widgets to display')).toBeInTheDocument();
  });
});
