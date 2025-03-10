import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Rating from './Rating';
import { RATING_SIZES, RATING_VARIANTS, RATING_PRECISION } from './constants';

describe('Rating Component', () => {
  test('renders correctly with default props', () => {
    render(<Rating />);
    
    // Should have 5 rating items by default
    const ratingItems = screen.getAllByRole('radio');
    expect(ratingItems).toHaveLength(5);
    
    // Should have aria-label "Rating"
    const ratingGroup = screen.getByRole('radiogroup');
    expect(ratingGroup).toHaveAttribute('aria-label', 'Rating');
  });
  
  test('applies the correct size class', () => {
    const { rerender } = render(<Rating size={RATING_SIZES.SMALL} />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ui-rating--small');
    
    rerender(<Rating size={RATING_SIZES.MEDIUM} />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ui-rating--medium');
    
    rerender(<Rating size={RATING_SIZES.LARGE} />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ui-rating--large');
  });
  
  test('applies the correct variant class', () => {
    const { rerender } = render(<Rating variant={RATING_VARIANTS.STAR} />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ui-rating--star');
    
    rerender(<Rating variant={RATING_VARIANTS.HEART} />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ui-rating--heart');
    
    rerender(<Rating variant={RATING_VARIANTS.CIRCLE} />);
    expect(screen.getByRole('radiogroup')).toHaveClass('ui-rating--circle');
  });
  
  test('renders the correct number of items based on max prop', () => {
    const { rerender } = render(<Rating max={3} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    
    rerender(<Rating max={10} />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });
  
  test('handles click events correctly', () => {
    const handleChange = jest.fn();
    render(<Rating onChange={handleChange} />);
    
    const ratingItems = screen.getAllByRole('radio');
    
    // Click on the third item
    fireEvent.click(ratingItems[2]);
    expect(handleChange).toHaveBeenCalledWith(3);
    
    // Click on the same item again should clear the rating
    fireEvent.click(ratingItems[2]);
    expect(handleChange).toHaveBeenCalledWith(0);
  });
  
  test('disables interaction when disabled prop is true', () => {
    const handleChange = jest.fn();
    render(<Rating disabled onChange={handleChange} />);
    
    const ratingGroup = screen.getByRole('radiogroup');
    expect(ratingGroup).toHaveClass('ui-rating--disabled');
    
    const ratingItems = screen.getAllByRole('radio');
    fireEvent.click(ratingItems[2]);
    
    // onChange should not be called
    expect(handleChange).not.toHaveBeenCalled();
  });
  
  test('disables interaction when readOnly prop is true', () => {
    const handleChange = jest.fn();
    render(<Rating readOnly onChange={handleChange} />);
    
    const ratingGroup = screen.getByRole('radiogroup');
    expect(ratingGroup).toHaveClass('ui-rating--readonly');
    
    const ratingItems = screen.getAllByRole('radio');
    fireEvent.click(ratingItems[2]);
    
    // onChange should not be called
    expect(handleChange).not.toHaveBeenCalled();
  });
  
  test('displays the value when showValue prop is true', () => {
    render(<Rating value={3} showValue />);
    
    const valueElement = screen.getByText('3');
    expect(valueElement).toHaveClass('ui-rating__value');
  });
  
  test('includes a hidden input with the name and value when name prop is provided', () => {
    render(<Rating name="rating-field" value={4} />);
    
    const hiddenInput = document.querySelector('input[name="rating-field"]');
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput).toHaveAttribute('value', '4');
  });
  
  test('applies custom className', () => {
    render(<Rating className="custom-class" />);
    
    const ratingGroup = screen.getByRole('radiogroup');
    expect(ratingGroup).toHaveClass('custom-class');
  });
});
