/**
 * Badge Component
 * 
 * A customizable badge component with support for variants and extensions.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Badge.css';

// Badge variants
export const BADGE_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  OUTLINE: 'outline',
};

// Badge sizes
export const BADGE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Badge Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.variant=BADGE_VARIANTS.DEFAULT] - Badge variant
 * @param {string} [props.size=BADGE_SIZES.MEDIUM] - Badge size
 * @param {boolean} [props.pill=false] - Whether the badge should have pill shape
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the badge
 * @returns {JSX.Element} Badge component
 */
const Badge = ({
  children,
  variant = BADGE_VARIANTS.DEFAULT,
  size = BADGE_SIZES.MEDIUM,
  pill = false,
  className = '',
  extensions = [],
  ...props
}) => {
  // Error handling for invalid variants
  if (variant && !Object.values(BADGE_VARIANTS).includes(variant)) {
    console.warn(`Badge: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = BADGE_VARIANTS.DEFAULT;
  }

  // Error handling for invalid sizes
  if (size && !Object.values(BADGE_SIZES).includes(size)) {
    console.warn(`Badge: Invalid size "${size}". Falling back to MEDIUM.`);
    size = BADGE_SIZES.MEDIUM;
  }

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Badge', {
      children,
      variant,
      size,
      pill,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Badge: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      children,
      variant,
      size,
      pill,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    children: extendedChildren,
    variant: extendedVariant,
    size: extendedSize,
    pill: extendedPill,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const badgeClasses = [
    'ds-badge',
    `ds-badge-${extendedVariant}`,
    `ds-badge-${extendedSize}`,
    extendedPill ? 'ds-badge-pill' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  return (
    <span
      className={badgeClasses}
      {...restProps}
    >
      {extendedChildren || ''}
    </span>
  );
};

Badge.propTypes = {
  /** Badge content */
  children: PropTypes.node.isRequired,
  /** Badge variant */
  variant: PropTypes.oneOf(Object.values(BADGE_VARIANTS)),
  /** Badge size */
  size: PropTypes.oneOf(Object.values(BADGE_SIZES)),
  /** Whether the badge should have pill shape */
  pill: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the badge */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Badge;
