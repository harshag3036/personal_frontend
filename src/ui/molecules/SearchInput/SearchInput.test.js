import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  // Basic rendering
  it('renders correctly with default props', () => {
    render(<SearchInput />);
    
    // Check if the input element is rendered
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    
    // Check if the search icon is rendered
    const searchIcon = document.querySelector('.ui-search-input__icon');
    expect(searchIcon).toBeInTheDocument();
    
    // Check if the placeholder is set correctly
    expect(inputElement).toHaveAttribute('placeholder', 'Search...');
  });
  
  // Custom placeholder
  it('renders with custom placeholder', () => {
    render(<SearchInput placeholder="Find items..." />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('placeholder', 'Find items...');
  });
  
  // Variants
  it('applies the correct variant class', () => {
    const { container } = render(<SearchInput variant="filled" />);
    
    const searchInput = container.firstChild;
    expect(searchInput).toHaveClass('ui-search-input--filled');
  });
  
  // Sizes
  it('applies the correct size class', () => {
    const { container } = render(<SearchInput size="large" />);
    
    const searchInput = container.firstChild;
    expect(searchInput).toHaveClass('ui-search-input--large');
  });
  
  // Disabled state
  it('disables the input when disabled prop is true', () => {
    render(<SearchInput disabled />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
    
    const searchInput = inputElement.closest('.ui-search-input');
    expect(searchInput).toHaveClass('ui-search-input--disabled');
  });
  
  // Initial value
  it('renders with initial value', () => {
    render(<SearchInput value="initial search" />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('initial search');
  });
  
  // Clear button
  it('shows clear button when value is present and clearable is true', () => {
    render(<SearchInput value="test" clearable />);
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });
  
  it('does not show clear button when clearable is false', () => {
    render(<SearchInput value="test" clearable={false} />);
    
    const clearButton = screen.queryByRole('button', { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });
  
  // Loading state
  it('shows loading indicator when isLoading is true', () => {
    render(<SearchInput isLoading />);
    
    const loadingIndicator = document.querySelector('.ui-search-input__loading');
    expect(loadingIndicator).toBeInTheDocument();
  });
  
  // Input events
  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    
    jest.useFakeTimers();
    
    render(<SearchInput onChange={handleChange} debounceTime={300} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test search' } });
    
    // onChange should not be called immediately due to debounce
    expect(handleChange).not.toHaveBeenCalled();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Now onChange should be called
    expect(handleChange).toHaveBeenCalledWith('test search');
    
    jest.useRealTimers();
  });
  
  it('calls onFocus when input is focused', () => {
    const handleFocus = jest.fn();
    
    render(<SearchInput onFocus={handleFocus} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);
    
    expect(handleFocus).toHaveBeenCalled();
  });
  
  it('calls onBlur when input is blurred', () => {
    const handleBlur = jest.fn();
    
    render(<SearchInput onBlur={handleBlur} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.blur(inputElement);
    
    expect(handleBlur).toHaveBeenCalled();
  });
  
  // Clear button functionality
  it('clears input and calls onClear when clear button is clicked', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();
    
    render(
      <SearchInput 
        value="test search" 
        clearable 
        onChange={handleChange} 
        onClear={handleClear} 
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    
    // Input should be cleared
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('');
    
    // Callbacks should be called
    expect(handleChange).toHaveBeenCalledWith('');
    expect(handleClear).toHaveBeenCalled();
  });
  
  // Auto focus
  it('auto focuses the input when autoFocus is true', () => {
    render(<SearchInput autoFocus />);
    
    const inputElement = screen.getByRole('textbox');
    expect(document.activeElement).toBe(inputElement);
  });
  
  // Polymorphic as prop
  it('renders with custom element type', () => {
    const { container } = render(<SearchInput as="form" />);
    
    expect(container.firstChild.tagName).toBe('FORM');
  });
});
