import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import './Link.css';

/**
 * Link Component
 * 
 * A versatile link component that can be used for navigation or as an action trigger.
 * This component supports various visual styles and behaviors.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Link href="/home">Home</Link>
 * 
 * // With custom variant and size
 * <Link 
 *   href="/profile" 
 *   variant="button" 
 *   size="lg"
 * >
 *   View Profile
 * </Link>
 * 
 * // As a button with onClick
 * <Link 
 *   as="button"
 *   onClick={handleClick} 
 *   variant="text"
 * >
 *   Click Me
 * </Link>
 * 
 * // With icon
 * <Link href="/settings">
 *   <Icon name="settings" />
 *   Settings
 * </Link>
 * ```
 */
const Link = ({
  as: Element = 'a',
  children,
  href,
  variant = 'default',
  size = 'md',
  color,
  underline = true,
  disabled = false,
  external = false,
  className = '',
  style = {},
  onClick,
  ...restProps
}) => {
  // Handle external links
  const externalProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer',
  } : {};
  
  // Handle disabled state
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
  };
  
  // Combine all styles
  const combinedStyle = {
    ...(color && { color: `var(--color-${color})` }),
    ...style,
  };
  
  // Combine class names using BEM convention
  const linkClasses = [
    'ui-link',
    `ui-link--${variant}`,
    `ui-link--size-${size}`,
    underline && 'ui-link--underline',
    disabled && 'ui-link--disabled',
    external && 'ui-link--external',
    className
  ].filter(Boolean).join(' ');
  
  // Determine appropriate props based on element type
  const elementProps = Element === 'a' ? { href, ...externalProps } : {};
  
  return (
    <Element 
      className={linkClasses}
      style={combinedStyle}
      onClick={handleClick}
      aria-disabled={disabled}
      {...elementProps}
      {...restProps}
    >
      {children}
    </Element>
  );
};

Link.propTypes = {
  /** Element to render the Link as */
  ...polymorphicPropTypes,
  /** Link content */
  children: PropTypes.node.isRequired,
  /** URL for the link (when rendered as an anchor) */
  href: PropTypes.string,
  /** Visual variant of the link */
  variant: PropTypes.oneOf(['default', 'button', 'text', 'nav', 'breadcrumb']),
  /** Size of the link */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Color from design tokens */
  color: PropTypes.string,
  /** Whether to show underline */
  underline: PropTypes.bool,
  /** Whether the link is disabled */
  disabled: PropTypes.bool,
  /** Whether the link opens in a new tab */
  external: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Click handler */
  onClick: PropTypes.func,
};

Link.defaultProps = {
  as: 'a',
  variant: 'default',
  size: 'md',
  underline: true,
  disabled: false,
  external: false,
  className: '',
  style: {},
};

export default Link;
