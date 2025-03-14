import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination Component', () => {
  // Basic rendering test
  test('renders pagination with correct number of pages', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}}
        // Force showing all pages by setting large sibling count
        siblingCount={5}
      />
    );
    
    // Should render 5 page buttons (1-5)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Should render navigation buttons
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });
  
  // Test current page is active
  test('marks current page as active', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={() => {}}
      />
    );
    
    // Page 3 should be active
    const page3Button = screen.getByText('3');
    expect(page3Button).toHaveAttribute('aria-current', 'page');
    expect(page3Button).toHaveClass('ui-pagination__button--active');
    
    // Other pages should not be active
    const page1Button = screen.getByText('1');
    const page2Button = screen.getByText('2');
    const page4Button = screen.getByText('4');
    const page5Button = screen.getByText('5');
    
    expect(page1Button).not.toHaveAttribute('aria-current');
    expect(page2Button).not.toHaveAttribute('aria-current');
    expect(page4Button).not.toHaveAttribute('aria-current');
    expect(page5Button).not.toHaveAttribute('aria-current');
  });
  
  // Test page change callback
  test('calls onPageChange when a page is clicked', () => {
    const handlePageChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={handlePageChange}
        // Force showing all pages by setting large sibling count
        siblingCount={5}
      />
    );
    
    // Click on page 3
    fireEvent.click(screen.getByText('3'));
    
    // onPageChange should be called with page 3
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
  
  // Test first page button
  test('calls onPageChange with 1 when first page button is clicked', () => {
    const handlePageChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={handlePageChange}
      />
    );
    
    // Click on first page button
    fireEvent.click(screen.getByLabelText('Go to first page'));
    
    // onPageChange should be called with page 1
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
  
  // Test previous page button
  test('calls onPageChange with previous page when previous button is clicked', () => {
    const handlePageChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={handlePageChange}
      />
    );
    
    // Click on previous page button
    fireEvent.click(screen.getByLabelText('Go to previous page'));
    
    // onPageChange should be called with page 2
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
  
  // Test next page button
  test('calls onPageChange with next page when next button is clicked', () => {
    const handlePageChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={handlePageChange}
      />
    );
    
    // Click on next page button
    fireEvent.click(screen.getByLabelText('Go to next page'));
    
    // onPageChange should be called with page 4
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });
  
  // Test last page button
  test('calls onPageChange with last page when last page button is clicked', () => {
    const handlePageChange = jest.fn();
    
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={handlePageChange}
      />
    );
    
    // Click on last page button
    fireEvent.click(screen.getByLabelText('Go to last page'));
    
    // onPageChange should be called with page 5
    expect(handlePageChange).toHaveBeenCalledWith(5);
  });
  
  // Test disabled first and previous buttons on first page
  test('disables first and previous buttons on first page', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}}
      />
    );
    
    // First and previous buttons should be disabled
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    
    // Next and last buttons should not be disabled
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).not.toBeDisabled();
  });
  
  // Test disabled next and last buttons on last page
  test('disables next and last buttons on last page', () => {
    render(
      <Pagination 
        currentPage={5} 
        totalPages={5} 
        onPageChange={() => {}}
      />
    );
    
    // Next and last buttons should be disabled
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
    
    // First and previous buttons should not be disabled
    expect(screen.getByLabelText('Go to first page')).not.toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled();
  });
  
  // Test ellipsis rendering
  test('renders ellipsis for large page counts', () => {
    render(
      <Pagination 
        currentPage={50} 
        totalPages={100} 
        onPageChange={() => {}}
        siblingCount={1}
        boundaryCount={1}
      />
    );
    
    // Should render ellipsis
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBe(2);
    
    // Should render boundary pages
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    
    // Should render siblings of current page
    expect(screen.getByText('49')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('51')).toBeInTheDocument();
  });
  
  // Test hiding navigation buttons
  test('hides navigation buttons when specified', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={() => {}}
        showFirstButton={false}
        showLastButton={false}
        showPrevButton={false}
        showNextButton={false}
      />
    );
    
    // Navigation buttons should not be rendered
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
    
    // Page buttons should still be rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
  
  // Test different variants
  test('applies the correct variant class', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}}
        variant="outline"
        data-testid="pagination"
      />
    );
    
    expect(screen.getByTestId('pagination')).toHaveClass('ui-pagination--outline');
  });
  
  // Test different sizes
  test('applies the correct size class', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}}
        size="lg"
        data-testid="pagination"
      />
    );
    
    expect(screen.getByTestId('pagination')).toHaveClass('ui-pagination--lg');
  });
  
  // Test different shapes
  test('applies the correct shape class', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}}
        shape="pill"
        data-testid="pagination"
      />
    );
    
    expect(screen.getByTestId('pagination')).toHaveClass('ui-pagination--pill');
  });
  
  // Test with custom className
  test('applies custom className', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}}
        className="custom-class"
        data-testid="pagination"
      />
    );
    
    expect(screen.getByTestId('pagination')).toHaveClass('custom-class');
  });
  
  // Test with invalid current page
  test('handles invalid current page by clamping to valid range', () => {
    const { rerender } = render(
      <Pagination 
        currentPage={10} // Greater than totalPages
        totalPages={5} 
        onPageChange={() => {}}
      />
    );
    
    // Page 5 should be active (clamped to totalPages)
    const page5Button = screen.getByText('5');
    expect(page5Button).toHaveAttribute('aria-current', 'page');
    
    // Clear the previous render
    rerender(<div />);
    
    // Render with negative current page
    render(
      <Pagination 
        currentPage={-1} // Less than 1
        totalPages={5} 
        onPageChange={() => {}}
      />
    );
    
    // Page 1 should be active (clamped to 1)
    const page1Button = screen.getByText('1');
    expect(page1Button).toHaveAttribute('aria-current', 'page');
  });
});
