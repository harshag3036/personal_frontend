/**
 * Image Component
 * 
 * An enhanced image component with support for different fit options, loading strategies,
 * shapes, sizes, and fallback images.
 */

import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  IMAGE_FIT, 
  IMAGE_POSITION, 
  IMAGE_LOADING, 
  IMAGE_SHAPE, 
  IMAGE_SIZES, 
  IMAGE_DEFAULT_PROPS 
} from './constants';
import { createPolymorphicComponent } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import './Image.css';

// Helper function to process responsive props
const getResponsiveProps = (prop) => {
  if (!isResponsiveObject(prop)) {
    return { base: prop };
  }
  return prop;
};

/**
 * Enhanced Image component with additional features beyond the native img element
 */
const Image = forwardRef(({
  as: Element = 'img',
  src,
  alt = IMAGE_DEFAULT_PROPS.alt,
  fit = IMAGE_DEFAULT_PROPS.fit,
  position = IMAGE_DEFAULT_PROPS.position,
  loading = IMAGE_DEFAULT_PROPS.loading,
  shape = IMAGE_DEFAULT_PROPS.shape,
  size = IMAGE_DEFAULT_PROPS.size,
  fallbackSrc = IMAGE_DEFAULT_PROPS.fallbackSrc,
  width = IMAGE_DEFAULT_PROPS.width,
  height = IMAGE_DEFAULT_PROPS.height,
  className,
  onLoad,
  onError,
  ...props
}, ref) => {
  // State to track if the image has errored
  const [hasError, setHasError] = useState(false);
  
  // Process responsive props
  const responsiveFit = getResponsiveProps(fit);
  const responsivePosition = getResponsiveProps(position);
  const responsiveShape = getResponsiveProps(shape);
  const responsiveSize = getResponsiveProps(size);
  
  // Handle image load error
  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };
  
  // Handle image load success
  const handleLoad = (e) => {
    if (onLoad) onLoad(e);
  };
  
  // Determine the source to use (original or fallback)
  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;
  
  // Generate class names
  const baseClassName = 'ui-image';
  const classes = [
    baseClassName,
    ...Object.entries(responsiveFit).map(([breakpoint, value]) => 
      breakpoint === 'base' 
        ? `${baseClassName}--fit-${value.toLowerCase()}`
        : `${baseClassName}--fit-${value.toLowerCase()}-${breakpoint}`
    ),
    ...Object.entries(responsivePosition).map(([breakpoint, value]) => 
      breakpoint === 'base' 
        ? `${baseClassName}--position-${value.toLowerCase()}`
        : `${baseClassName}--position-${value.toLowerCase()}-${breakpoint}`
    ),
    ...Object.entries(responsiveShape).map(([breakpoint, value]) => 
      breakpoint === 'base' 
        ? `${baseClassName}--${value.toLowerCase()}`
        : `${baseClassName}--${value.toLowerCase()}-${breakpoint}`
    ),
    ...Object.entries(responsiveSize).map(([breakpoint, value]) => 
      breakpoint === 'base' 
        ? `${baseClassName}--${value.toLowerCase()}`
        : `${baseClassName}--${value.toLowerCase()}-${breakpoint}`
    ),
    className
  ].filter(Boolean).join(' ');
  
  // Custom styles for width and height if provided
  const customStyles = {};
  if (width !== null) customStyles.width = width;
  if (height !== null) customStyles.height = height;
  
  // Determine appropriate props based on element type
  const elementProps = {};
  if (Element === 'img') {
    elementProps.src = imageSrc;
    elementProps.alt = alt;
    elementProps.loading = loading;
    elementProps.onError = handleError;
    elementProps.onLoad = handleLoad;
  }
  
  return (
    <Element
      ref={ref}
      className={classes}
      style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
      {...elementProps}
      {...props}
    />
  );
});

Image.displayName = 'Image';

Image.propTypes = {
  /** The source URL of the image */
  src: PropTypes.string.isRequired,
  /** Alternative text for the image */
  alt: PropTypes.string,
  /** How the image should fit within its container */
  fit: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(IMAGE_FIT)),
    PropTypes.object
  ]),
  /** The position of the image within its container */
  position: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(IMAGE_POSITION)),
    PropTypes.object
  ]),
  /** The loading strategy for the image */
  loading: PropTypes.oneOf(Object.values(IMAGE_LOADING)),
  /** The shape of the image */
  shape: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(IMAGE_SHAPE)),
    PropTypes.object
  ]),
  /** The size of the image */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(IMAGE_SIZES)),
    PropTypes.object
  ]),
  /** Fallback image source to use if the primary source fails to load */
  fallbackSrc: PropTypes.string,
  /** Custom width for the image */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Custom height for the image */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Additional class names */
  className: PropTypes.string,
  /** Callback when the image loads successfully */
  onLoad: PropTypes.func,
  /** Callback when the image fails to load */
  onError: PropTypes.func,
};

// Export the component directly
export default Image;
