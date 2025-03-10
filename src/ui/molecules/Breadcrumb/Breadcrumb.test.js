import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb', () => {
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops', href: '/products/laptops' }
  ];

  it('renders correctly with default props', () => {
    render(<Breadcrumb items={defaultItems} />);
    
    // Check if all items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Laptops')).toBeInTheDocument();
    
    // Check if separators are rendered
    const separators = document.querySelectorAll('.ui-breadcrumb__separator');
    expect(separators.length).toBe(2); // Two separators for three items
    
    // Check if the last item is not a link
    const laptopsLink = screen.queryByRole('link', { name: 'Laptops' });
    expect(laptopsLink).not.toBeInTheDocument();
  });

  it('renders with custom separator type', () => {
    render(<Breadcrumb items={defaultItems} separatorType="chevron" />);
    
    const separator = document.querySelector('.ui-breadcrumb__separator--chevron');
    expect(separator).toBeInTheDocument();
  });

  it('renders with custom separator element', () => {
    const customSeparator = <span data-testid="custom-separator">|</span>;
    render(<Breadcrumb items={defaultItems} customSeparator={customSeparator} />);
    
    expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
  });

  it('renders with home icon', () => {
    render(<Breadcrumb items={defaultItems} showHomeIcon={true} homeIconName="home" />);
    
    const homeIcon = document.querySelector('.ui-breadcrumb__home-icon');
    expect(homeIcon).toBeInTheDocument();
  });

  it('collapses items when maxItems is set', () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/subcategory' },
      { label: 'Product', href: '/product' },
      { label: 'Details', href: '/details' }
    ];
    
    render(<Breadcrumb items={manyItems} maxItems={3} collapsedLabel="..." />);
    
    // Check if first and last items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    
    // Check if collapsed indicator is rendered
    expect(screen.getByText('...')).toBeInTheDocument();
    
    // Check if middle items are not rendered
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
    expect(screen.queryByText('Subcategory')).not.toBeInTheDocument();
  });

  it('makes last item clickable when lastItemClickable is true', () => {
    render(<Breadcrumb items={defaultItems} lastItemClickable={true} />);
    
    const laptopsLink = screen.getByRole('link', { name: 'Laptops' });
    expect(laptopsLink).toBeInTheDocument();
    expect(laptopsLink.getAttribute('href')).toBe('/products/laptops');
  });

  it('calls onClick handler when item is clicked', () => {
    const handleClick = jest.fn();
    const itemsWithHandler = [
      ...defaultItems.slice(0, -1),
      { ...defaultItems[defaultItems.length - 1], onClick: handleClick }
    ];
    
    render(<Breadcrumb items={itemsWithHandler} lastItemClickable={true} />);
    
    const laptopsLink = screen.getByRole('link', { name: 'Laptops' });
    fireEvent.click(laptopsLink);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different size', () => {
    render(<Breadcrumb items={defaultItems} size="large" />);
    
    const breadcrumb = document.querySelector('.ui-breadcrumb--large');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('renders with different variant', () => {
    render(<Breadcrumb items={defaultItems} variant="compact" />);
    
    const breadcrumb = document.querySelector('.ui-breadcrumb--compact');
    expect(breadcrumb).toBeInTheDocument();
  });

  it('renders with responsive variant', () => {
    const responsiveVariant = { base: 'default', md: 'compact', lg: 'expanded' };
    render(<Breadcrumb items={defaultItems} variant={responsiveVariant} />);
    
    const breadcrumb = document.querySelector('.ui-breadcrumb');
    expect(breadcrumb).toHaveClass('ui-breadcrumb-default');
    expect(breadcrumb).toHaveClass('ui-breadcrumb-md-compact');
    expect(breadcrumb).toHaveClass('ui-breadcrumb-lg-expanded');
  });

  it('renders with custom className and style', () => {
    render(
      <Breadcrumb 
        items={defaultItems} 
        className="custom-class" 
        style={{ marginBottom: '20px' }} 
      />
    );
    
    const breadcrumb = document.querySelector('.ui-breadcrumb');
    expect(breadcrumb).toHaveClass('custom-class');
    expect(breadcrumb.style.marginBottom).toBe('20px');
  });

  it('renders as a different element when as prop is provided', () => {
    render(<Breadcrumb as="div" items={defaultItems} />);
    
    const breadcrumb = document.querySelector('.ui-breadcrumb');
    expect(breadcrumb.tagName).toBe('DIV');
  });
});
