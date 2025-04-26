import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { AVATAR_CLASS, AVATAR_SIZES, AVATAR_VARIANTS } from './constants';
import './Avatar.css';

/**
 * Avatar Component
 * 
 * A component to display user avatars with images or fallback initials.
 * 
 * @example
 * ```jsx
 * // With image
 * <Avatar src="https://example.com/avatar.jpg" name="John Doe" size="md" />
 * 
 * // Without image (shows initials)
 * <Avatar name="John Doe" size="lg" />
 * 
 * // Custom styling
 * <Avatar 
 *   name="John Doe" 
 *   backgroundColor="primary.500" 
 *   color="white" 
 *   size="lg" 
 *   border="2px solid"
 *   borderColor="primary.300"
 * />
 * ```
 */
const Avatar = ({
  name,
  src,
  srcSet,
  size = AVATAR_SIZES.MD,
  variant = AVATAR_VARIANTS.CIRCLE,
  backgroundColor,
  color,
  className = '',
  ...restProps
}) => {
  // Process avatar props
  const processedSize = size || AVATAR_SIZES.MD;
  const processedVariant = variant || AVATAR_VARIANTS.CIRCLE;
  
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    
    const nameParts = name.split(' ').filter(Boolean);
    
    if (nameParts.length === 0) return '?';
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };
  
  // Handle image error (show initials fallback)
  const handleError = (e) => {
    e.target.style.display = 'none';
  };
  
  // Build class names
  const avatarClasses = [
    AVATAR_CLASS,
    `${AVATAR_CLASS}--${processedSize}`,
    `${AVATAR_CLASS}--${processedVariant}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Box
      className={avatarClasses}
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      backgroundColor={backgroundColor || 'neutral.300'}
      color={color || 'text.primary'}
      {...restProps}
    >
      {/* Fallback with initials */}
      <Box
        className={`${AVATAR_CLASS}__initials`}
        as="span"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        {getInitials(name)}
      </Box>
      
      {/* Image if provided */}
      {src && (
        <Box
          as="img"
          className={`${AVATAR_CLASS}__image`}
          src={src}
          srcSet={srcSet}
          alt={name || 'Avatar'}
          onError={handleError}
          width="100%"
          height="100%"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
        />
      )}
    </Box>
  );
};

Avatar.propTypes = {
  /** User name (used for initials fallback and alt text) */
  name: PropTypes.string,
  /** Image source URL */
  src: PropTypes.string,
  /** Image source set for responsive images */
  srcSet: PropTypes.string,
  /** Avatar size */
  size: PropTypes.oneOf(Object.values(AVATAR_SIZES)),
  /** Avatar shape variant */
  variant: PropTypes.oneOf(Object.values(AVATAR_VARIANTS)),
  /** Background color (for initials fallback) */
  backgroundColor: PropTypes.string,
  /** Text color (for initials) */
  color: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

Avatar.defaultProps = {
  size: AVATAR_SIZES.MD,
  variant: AVATAR_VARIANTS.CIRCLE,
  className: '',
};

export default Avatar;
