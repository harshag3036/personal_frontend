/**
 * Image Component Stories
 * 
 * This file contains stories for the Image component.
 */

import React from 'react';
import Image from './Image';
import { IMAGE_FIT, IMAGE_POSITION, IMAGE_LOADING, IMAGE_SHAPE, IMAGE_SIZES } from './constants';

export default {
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    fit: {
      control: { type: 'select', options: Object.values(IMAGE_FIT) },
    },
    position: {
      control: { type: 'select', options: Object.values(IMAGE_POSITION) },
    },
    loading: {
      control: { type: 'select', options: Object.values(IMAGE_LOADING) },
    },
    shape: {
      control: { type: 'select', options: Object.values(IMAGE_SHAPE) },
    },
    size: {
      control: { type: 'select', options: Object.values(IMAGE_SIZES) },
    },
    fallbackSrc: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

// Sample image URLs for stories
const sampleImageUrl = 'https://source.unsplash.com/random/800x600';
const fallbackImageUrl = 'https://via.placeholder.com/800x600?text=Fallback+Image';

// Basic Image
export const Basic = {
  args: {
    src: sampleImageUrl,
    alt: 'A random image from Unsplash',
  },
};

// Image with different fit options
export const FitOptions = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {Object.values(IMAGE_FIT).map((fit) => (
      <div key={fit} style={{ width: '200px' }}>
        <h3>{fit}</h3>
        <Image
          src={sampleImageUrl}
          alt={`Image with ${fit} fit`}
          fit={fit}
          width="200px"
          height="150px"
        />
      </div>
    ))}
  </div>
);

// Image with different position options
export const PositionOptions = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {Object.values(IMAGE_POSITION).map((position) => (
      <div key={position} style={{ width: '200px' }}>
        <h3>{position}</h3>
        <Image
          src={sampleImageUrl}
          alt={`Image with ${position} position`}
          position={position}
          fit={IMAGE_FIT.NONE}
          width="200px"
          height="150px"
        />
      </div>
    ))}
  </div>
);

// Image with different shapes
export const ShapeOptions = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {Object.values(IMAGE_SHAPE).map((shape) => (
      <div key={shape} style={{ width: '200px' }}>
        <h3>{shape}</h3>
        <Image
          src={sampleImageUrl}
          alt={`Image with ${shape} shape`}
          shape={shape}
          width="200px"
          height="200px"
        />
      </div>
    ))}
  </div>
);

// Image with different sizes
export const SizeOptions = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {Object.values(IMAGE_SIZES).map((size) => (
      <div key={size} style={{ width: '300px' }}>
        <h3>{size}</h3>
        <Image
          src={sampleImageUrl}
          alt={`Image with ${size} size`}
          size={size}
        />
      </div>
    ))}
  </div>
);

// Image with fallback
export const WithFallback = {
  args: {
    src: 'https://this-image-does-not-exist.jpg',
    fallbackSrc: fallbackImageUrl,
    alt: 'Image with fallback',
    width: '300px',
    height: '200px',
  },
};

// Responsive Image
export const ResponsiveImage = {
  args: {
    src: sampleImageUrl,
    alt: 'Responsive image',
    fit: { base: 'cover', md: 'contain', lg: 'fill' },
    shape: { base: 'square', md: 'rounded', lg: 'circle' },
    size: { base: 'small', md: 'medium', lg: 'large' },
  },
};

// Polymorphic Image
export const PolymorphicImage = {
  args: {
    as: 'div',
    src: sampleImageUrl,
    alt: 'Polymorphic image',
    width: '300px',
    height: '200px',
    style: { 
      backgroundImage: `url(${sampleImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },
};

// Image with custom styles
export const CustomStyledImage = {
  args: {
    src: sampleImageUrl,
    alt: 'Custom styled image',
    style: {
      border: '5px solid #3498db',
      borderRadius: '15px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    width: '300px',
    height: '200px',
    onClick: () => alert('Image clicked!'),
  },
};
