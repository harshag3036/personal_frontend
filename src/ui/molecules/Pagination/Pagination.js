import { PAGINATION_VARIANTS, PAGINATION_SIZES, PAGINATION_SHAPES } from './constants';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Flex, Button, Text, Icon } from '../../atoms';
import { isFunction } from '../../utilities/typeChecks';
import './Pagination.css';

/**
 * Pagination Component
 * 
 * A component for navigating through pages of content.
 * 
 * @example
 * ```jsx
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   onPageChange={(page) => console.log(`Page changed to ${page}`)} 
 * />
 * ```
 */
const Pagination = ({
  children,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = true,
  showLastButton = true,
  showPrevButton = true,
  showNextButton = true,
  size = 'md',
  variant = 'default',
  shape = 'rounded',
  className = '',
  ...restProps
}) => {
  // Validate props
  const validatedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const validatedSiblingCount = Math.max(1, siblingCount);
  const validatedBoundaryCount = Math.max(0, boundaryCount);
  
  // Generate page range
  const range = useMemo(() => {
    const startPages = Array.from({ length: validatedBoundaryCount }, (_, i) => i + 1);
    const endPages = Array.from(
      { length: validatedBoundaryCount },
      (_, i) => totalPages - validatedBoundaryCount + i + 1
    ).filter(page => page > 0);
    
    const siblingStart = Math.max(
      validatedCurrentPage - validatedSiblingCount,
      validatedBoundaryCount + 1
    );
    const siblingEnd = Math.min(
      validatedCurrentPage + validatedSiblingCount,
      totalPages - validatedBoundaryCount
    );
    
    const rangeWithSiblings = Array.from(
      { length: siblingEnd - siblingStart + 1 },
      (_, i) => siblingStart + i
    );
    
    // Add ellipses
    const items = [];
    
    // Add start pages
    items.push(...startPages);
    
    // Add ellipsis if needed
    if (siblingStart > validatedBoundaryCount + 1) {
      items.push('ellipsis-start');
    }
    
    // Add sibling pages
    items.push(...rangeWithSiblings);
    
    // Add ellipsis if needed
    if (siblingEnd < totalPages - validatedBoundaryCount) {
      items.push('ellipsis-end');
    }
    
    // Add end pages
    items.push(...endPages);
    
    // Remove duplicates and sort
    return [...new Set(items)].sort((a, b) => {
      if (a === 'ellipsis-start') return -1;
      if (b === 'ellipsis-start') return 1;
      if (a === 'ellipsis-end') return 1;
      if (b === 'ellipsis-end') return -1;
      return a - b;
    });
  }, [validatedCurrentPage, totalPages, validatedSiblingCount, validatedBoundaryCount]);
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page !== validatedCurrentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  // Handle first page
  const handleFirstPage = () => {
    handlePageChange(1);
  };
  
  // Handle last page
  const handleLastPage = () => {
    handlePageChange(totalPages);
  };
  
  // Handle previous page
  const handlePrevPage = () => {
    handlePageChange(validatedCurrentPage - 1);
  };
  
  // Handle next page
  const handleNextPage = () => {
    handlePageChange(validatedCurrentPage + 1);
  };
  
  // Combine class names
  const paginationClasses = [
    'ui-pagination',
    `ui-pagination--${variant}`,
    `ui-pagination--${size}`,
    `ui-pagination--${shape}`,
    className,
  ].filter(Boolean).join(' ');
  
  // Create pagination state object for render props
  const paginationState = useMemo(() => ({
    // Current state
    currentPage: validatedCurrentPage,
    totalPages,
    range,
    
    // Configuration
    siblingCount: validatedSiblingCount,
    boundaryCount: validatedBoundaryCount,
    showFirstButton,
    showLastButton,
    showPrevButton,
    showNextButton,
    size,
    variant,
    shape,
    
    // Actions
    goToPage: handlePageChange,
    goToFirstPage: handleFirstPage,
    goToLastPage: handleLastPage,
    goToPrevPage: handlePrevPage,
    goToNextPage: handleNextPage,
    
    // Helper state
    isFirstPage: validatedCurrentPage === 1,
    isLastPage: validatedCurrentPage === totalPages,
    
    // CSS Classes
    paginationClasses,
    
    // Constants
    variants: PAGINATION_VARIANTS,
    sizes: PAGINATION_SIZES,
    shapes: PAGINATION_SHAPES
  }), [
    validatedCurrentPage,
    totalPages,
    range,
    validatedSiblingCount,
    validatedBoundaryCount,
    showFirstButton,
    showLastButton,
    showPrevButton,
    showNextButton,
    size,
    variant,
    shape,
    handlePageChange,
    handleFirstPage,
    handleLastPage,
    handlePrevPage,
    handleNextPage,
    paginationClasses
  ]);
  
  // Check if using render props
  const isRenderProps = isFunction(children);
  
  // If using render props, return children as a function with pagination state
  if (isRenderProps) {
    return (
      <Flex 
        as="nav" 
        className={paginationClasses} 
        aria-label="Pagination" 
        {...restProps}
      >
        {children(paginationState)}
      </Flex>
    );
  }
  
  // Default rendering
  return (
    <Flex 
      as="nav" 
      className={paginationClasses} 
      aria-label="Pagination" 
      {...restProps}
    >
      {/* First page button */}
      {showFirstButton && (
        <Button
          variant="ghost"
          size={size}
          aria-label="Go to first page"
          onClick={handleFirstPage}
          disabled={validatedCurrentPage === 1}
          className="ui-pagination__button ui-pagination__button--first"
        >
          <Icon name="chevrons-left" size={size} />
        </Button>
      )}
      
      {/* Previous page button */}
      {showPrevButton && (
        <Button
          variant="ghost"
          size={size}
          aria-label="Go to previous page"
          onClick={handlePrevPage}
          disabled={validatedCurrentPage === 1}
          className="ui-pagination__button ui-pagination__button--prev"
        >
          <Icon name="chevron-left" size={size} />
        </Button>
      )}
      
      {/* Page buttons */}
      {range.map((page, index) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <Button
              key={page}
              variant="ghost"
              size={size}
              disabled
              className="ui-pagination__button ui-pagination__button--ellipsis"
            >
              <Text>...</Text>
            </Button>
          );
        }
        
        return (
          <Button
            key={page}
            variant={page === validatedCurrentPage ? 'primary' : 'ghost'}
            size={size}
            aria-label={`Page ${page}`}
            aria-current={page === validatedCurrentPage ? 'page' : undefined}
            onClick={() => handlePageChange(page)}
            className={`ui-pagination__button ui-pagination__button--page ${
              page === validatedCurrentPage ? 'ui-pagination__button--active' : ''
            }`}
          >
            {page}
          </Button>
        );
      })}
      
      {/* Next page button */}
      {showNextButton && (
        <Button
          variant="ghost"
          size={size}
          aria-label="Go to next page"
          onClick={handleNextPage}
          disabled={validatedCurrentPage === totalPages}
          className="ui-pagination__button ui-pagination__button--next"
        >
          <Icon name="chevron-right" size={size} />
        </Button>
      )}
      
      {/* Last page button */}
      {showLastButton && (
        <Button
          variant="ghost"
          size={size}
          aria-label="Go to last page"
          onClick={handleLastPage}
          disabled={validatedCurrentPage === totalPages}
          className="ui-pagination__button ui-pagination__button--last"
        >
          <Icon name="chevrons-right" size={size} />
        </Button>
      )}
    </Flex>
  );
};

Pagination.propTypes = {
  /** 
   * Pagination content or render props function
   * If a function is provided, it will be called with the pagination state 
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  /** Current page number (1-based) */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Callback when page changes */
  onPageChange: PropTypes.func.isRequired,
  /** Number of siblings on each side of current page */
  siblingCount: PropTypes.number,
  /** Number of pages to show at the beginning and end */
  boundaryCount: PropTypes.number,
  /** Whether to show the first page button */
  showFirstButton: PropTypes.bool,
  /** Whether to show the last page button */
  showLastButton: PropTypes.bool,
  /** Whether to show the previous page button */
  showPrevButton: PropTypes.bool,
  /** Whether to show the next page button */
  showNextButton: PropTypes.bool,
  /** Size of the pagination buttons */
  size: PropTypes.oneOf(Object.values(PAGINATION_SIZES)),
  /** Visual variant of the pagination */
  variant: PropTypes.oneOf(Object.values(PAGINATION_VARIANTS)),
  /** Shape of the pagination buttons */
  shape: PropTypes.oneOf(Object.values(PAGINATION_SHAPES)),
  /** Additional CSS class */
  className: PropTypes.string,
};

export default Pagination;
