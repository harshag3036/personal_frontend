import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabList, Tab, TabPanel } from './index';

describe('Tabs Component', () => {
  test('renders tabs with correct default active tab', () => {
    render(
      <Tabs defaultTab={0}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    );

    // Check that the first tab is active
    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    expect(tab1).toHaveAttribute('aria-selected', 'true');

    // Check that the first panel is visible
    const panel1 = screen.getByText('Content 1');
    expect(panel1).toBeVisible();

    // Check that other panels are not visible
    const panel2 = screen.getByText('Content 2');
    expect(panel2).not.toBeVisible();
    const panel3 = screen.getByText('Content 3');
    expect(panel3).not.toBeVisible();
  });

  test('changes active tab when clicked', () => {
    render(
      <Tabs defaultTab={0}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    );

    // Click on the second tab
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    fireEvent.click(tab2);

    // Check that the second tab is now active
    expect(tab2).toHaveAttribute('aria-selected', 'true');

    // Check that the second panel is now visible
    const panel2 = screen.getByText('Content 2');
    expect(panel2).toBeVisible();

    // Check that other panels are not visible
    const panel1 = screen.getByText('Content 1');
    expect(panel1).not.toBeVisible();
    const panel3 = screen.getByText('Content 3');
    expect(panel3).not.toBeVisible();
  });

  test('disabled tab cannot be selected', () => {
    render(
      <Tabs defaultTab={0}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab disabled>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    );

    // Try to click on the disabled tab
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    expect(tab2).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(tab2);

    // Check that the first tab is still active
    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    expect(tab1).toHaveAttribute('aria-selected', 'true');

    // Check that the first panel is still visible
    const panel1 = screen.getByText('Content 1');
    expect(panel1).toBeVisible();

    // Check that the second panel is not visible
    const panel2 = screen.getByText('Content 2');
    expect(panel2).not.toBeVisible();
  });

  test('calls onChange callback when tab changes', () => {
    const handleChange = jest.fn();
    render(
      <Tabs defaultTab={0} onChange={handleChange}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    );

    // Click on the third tab
    const tab3 = screen.getByRole('tab', { name: /tab 3/i });
    fireEvent.click(tab3);

    // Check that onChange was called with the correct index
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  test('supports keyboard navigation', () => {
    render(
      <Tabs defaultTab={0}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    );

    // Press Enter on the second tab
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    fireEvent.keyDown(tab2, { key: 'Enter' });

    // Check that the second tab is now active
    expect(tab2).toHaveAttribute('aria-selected', 'true');

    // Check that the second panel is now visible
    const panel2 = screen.getByText('Content 2');
    expect(panel2).toBeVisible();
  });

  test('applies variant and size classes correctly', () => {
    render(
      <Tabs variant="pills" size="lg">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
      </Tabs>
    );

    const tabsContainer = screen.getByRole('tablist').parentElement;
    expect(tabsContainer).toHaveClass('ui-tabs--pills');
    expect(tabsContainer).toHaveClass('ui-tabs--size-lg');
  });

  test('renders tab with icon correctly', () => {
    render(
      <Tabs>
        <TabList>
          <Tab icon={<span data-testid="icon">🏠</span>}>Home</Tab>
        </TabList>
        <TabPanel>Home content</TabPanel>
      </Tabs>
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveClass('ui-tab__icon');
  });
});
