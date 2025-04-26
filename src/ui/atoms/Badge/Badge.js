import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { BADGE_CLASS, BADGE_VARIANTS, BADGE_SIZES } from './constants';
import './Badge.css';

/**
 * Badge Component
 * 
 * A simple badge component for displaying status, counts, or labels.
 * This is a minimal implementation to fix compilation errors.
 */
const Badge = ({
  children,
  variant = BADGE_VARIANTS.PRIMARY,
  size = BADGE_SIZES.MD,
  color,
  backgroundColor,
  borderRadius,
  className = '',
  ...restProps
}) => {
  // Process badge props
  const processedVariant = variant || BADGE_VARIANTS.PRIMARY;
  const processedSize = size || BADGE_SIZES.MD;
  
  // Build class names
  const badgeClasses = [
    BADGE_CLASS,
    `${BADGE_CLASS}--${processedVariant}`,
    `${BADGE_CLASS}--${processedSize}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Box
      as="span"
      className={badgeClasses}
      color={color}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius || 'full'}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      {...restProps}
    >
      {children}
    </Box>
  );
};

Badge.propTypes = {
  /** Badge content */
  children: PropTypes.node,
  /** Badge variant */
  variant: PropTypes.oneOf(Object.values(BADGE_VARIANTS)),
  /** Badge size */
  size: PropTypes.oneOf(Object.values(BADGE_SIZES)),
  /** Override text color */
  color: PropTypes.string,
  /** Override background color */
  backgroundColor: PropTypes.string,
  /** Border radius */
  borderRadius: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

Badge.defaultProps = {
  variant: BADGE_VARIANTS.PRIMARY,
  size: BADGE_SIZES.MD,
  className: '',
};

export default Badge;
