import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes, VALID_ELEMENTS } from '../../utilities/polymorphic';
import './Avatar.css';

/**
 * Avatar Component
 * 
 * A versatile avatar component that displays user profile images or initials.
 * This component is used to represent users throughout the application.
 * 
 * @example
 * ```jsx
 * // With image
 * <Avatar src="/path/to/image.jpg" alt="User Name" />
 * 
 * // With initials fallback
 * <Avatar initials="JD" />
 * 
 * // With custom size and shape
 * <Avatar 
 *   src="/path/to/image.jpg" 
 *   alt="User Name" 
 *   size="lg" 
 *   shape="square" 
 * />
 * 
 * // With status indicator
 * <Avatar 
 *   src="/path/to/image.jpg" 
 *   alt="User Name" 
 *   status="online" 
 * />
 * ```
 */
const Avatar = ({
  as: Element = 'div',
  src,
  alt,
  initials,
  size = 'md',
  shape = 'circle',
  status,
  backgroundColor,
  className = '',
  style = {},
  ...restProps
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Handle image load error
  const handleError = () => {
    setImageError(true);
  };
  
  // Determine if we should show initials (no image or image error)
  const showInitials = !src || imageError;
  
  // Combine all styles
  const combinedStyle = {
    ...(backgroundColor && { backgroundColor: `var(--color-${backgroundColor})` }),
    ...style,
  };
  
  // Combine class names using BEM convention
  const avatarClasses = [
    'ui-avatar',
    `ui-avatar--size-${size}`,
    `ui-avatar--shape-${shape}`,
    status && `ui-avatar--status-${status}`,
    showInitials && 'ui-avatar--initials',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Element 
      className={avatarClasses}
      style={combinedStyle}
      {...restProps}
    >
      {!showInitials && (
        <img 
          src={src} 
          alt={alt || 'Avatar'} 
          className="ui-avatar__image"
          onError={handleError}
        />
      )}
      
      {showInitials && (
        <span className="ui-avatar__initials" aria-hidden="true">
          {initials || (alt ? alt.charAt(0) : '?')}
        </span>
      )}
      
      {status && (
        <span 
          className={`ui-avatar__status ui-avatar__status--${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </Element>
  );
};

Avatar.propTypes = {
  /** Element to render the Avatar as */
  ...polymorphicPropTypes,
  /** Image source URL */
  src: PropTypes.string,
  /** Alternative text for the image */
  alt: PropTypes.string,
  /** Initials to display when no image is available */
  initials: PropTypes.string,
  /** Size of the avatar (xs, sm, md, lg, xl) */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Shape of the avatar (circle, square, rounded) */
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  /** Status indicator (online, offline, away, busy) */
  status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
  /** Background color from design tokens (for initials display) */
  backgroundColor: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Avatar.defaultProps = {
  as: 'div',
  size: 'md',
  shape: 'circle',
  className: '',
  style: {},
};

export default Avatar;
