/**
 * Image Component Tests
 * 
 * This file contains tests for the Image component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Image from './Image';
import { IMAGE_FIT, IMAGE_POSITION, IMAGE_LOADING, IMAGE_SHAPE, IMAGE_SIZES } from './constants';

describe('Image Component', () => {
  // Basic rendering tests
  test('renders without crashing', () => {
    render(<Image src="test.jpg" alt="Test" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders with correct src and alt attributes', () => {
    const src = 'test.jpg';
    const alt = 'Test image';
    render(<Image src={src} alt={alt} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', src);
    expect(image).toHaveAttribute('alt', alt);
  });

  // Fit options tests
  test.each(Object.values(IMAGE_FIT))('renders with %s fit option', (fit) => {
    render(<Image src="test.jpg" alt="Test" fit={fit} />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass(`ui-image--fit-${fit.toLowerCase()}`);
  });

  // Position options tests
  test.each(Object.values(IMAGE_POSITION))('renders with %s position option', (position) => {
    render(<Image src="test.jpg" alt="Test" position={position} />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass(`ui-image--position-${position.toLowerCase()}`);
  });

  // Loading strategy tests
  test.each(Object.values(IMAGE_LOADING))('renders with %s loading strategy', (loading) => {
    render(<Image src="test.jpg" alt="Test" loading={loading} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', loading);
  });

  // Shape tests
  test.each(Object.values(IMAGE_SHAPE))('renders with %s shape', (shape) => {
    render(<Image src="test.jpg" alt="Test" shape={shape} />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass(`ui-image--${shape.toLowerCase()}`);
  });

  // Size tests
  test.each(Object.values(IMAGE_SIZES))('renders with %s size', (size) => {
    render(<Image src="test.jpg" alt="Test" size={size} />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass(`ui-image--${size.toLowerCase()}`);
  });

  // Custom width and height tests
  test('renders with custom width and height', () => {
    const width = '200px';
    const height = '150px';
    render(<Image src="test.jpg" alt="Test" width={width} height={height} />);
    const image = screen.getByRole('img');
    expect(image).toHaveStyle(`width: ${width}`);
    expect(image).toHaveStyle(`height: ${height}`);
  });

  // Event handler tests
  test('calls onLoad handler when image loads', () => {
    const handleLoad = jest.fn();
    render(<Image src="test.jpg" alt="Test" onLoad={handleLoad} />);
    const image = screen.getByRole('img');
    fireEvent.load(image);
    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  test('calls onError handler when image fails to load', () => {
    const handleError = jest.fn();
    render(<Image src="test.jpg" alt="Test" onError={handleError} />);
    const image = screen.getByRole('img');
    fireEvent.error(image);
    expect(handleError).toHaveBeenCalledTimes(1);
  });

  // Fallback image tests
  test('uses fallback image when primary image fails to load', () => {
    const primarySrc = 'test.jpg';
    const fallbackSrc = 'fallback.jpg';
    render(<Image src={primarySrc} fallbackSrc={fallbackSrc} alt="Test" />);
    const image = screen.getByRole('img');
    
    // Initially, the primary source should be used
    expect(image).toHaveAttribute('src', primarySrc);
    
    // Simulate an error loading the primary image
    fireEvent.error(image);
    
    // After the error, the fallback source should be used
    expect(image).toHaveAttribute('src', fallbackSrc);
  });

  // Responsive props tests
  test('renders with responsive props', () => {
    render(
      <Image 
        src="test.jpg" 
        alt="Test" 
        fit={{ base: 'cover', md: 'contain' }}
        shape={{ base: 'rounded', lg: 'circle' }}
        size={{ base: 'small', md: 'medium', lg: 'large' }}
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass('ui-image--fit-cover');
    expect(image).toHaveClass('ui-image--fit-contain-md');
    expect(image).toHaveClass('ui-image--rounded');
    expect(image).toHaveClass('ui-image--circle-lg');
    expect(image).toHaveClass('ui-image--small');
    expect(image).toHaveClass('ui-image--medium-md');
    expect(image).toHaveClass('ui-image--large-lg');
  });

  // Polymorphic tests
  test('renders as a different element when "as" prop is provided', () => {
    const { container } = render(<Image as="div" src="test.jpg" alt="Test" />);
    expect(container.querySelector('div.ui-image')).toBeInTheDocument();
  });
});
