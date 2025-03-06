/**
 * Card Component
 * 
 * A customizable card component with support for variants and extensions.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Card.css';

// Card variants
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  ELEVATED: 'elevated',
  OUTLINED: 'outlined',
  INTERACTIVE: 'interactive',
};

/**
 * Card Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.variant=CARD_VARIANTS.DEFAULT] - Card variant
 * @param {React.ReactNode} [props.header] - Card header content
 * @param {React.ReactNode} [props.footer] - Card footer content
 * @param {boolean} [props.fullWidth=false] - Whether the card should take full width
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the card
 * @param {Function} [props.onClick] - Click handler (for interactive cards)
 * @returns {JSX.Element} Card component
 */
const Card = ({
  children,
  variant = CARD_VARIANTS.DEFAULT,
  header,
  footer,
  fullWidth = false,
  className = '',
  extensions = [],
  onClick,
  ...props
}) => {
  // Error handling for invalid variants
  if (variant && !Object.values(CARD_VARIANTS).includes(variant)) {
    console.warn(`Card: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = CARD_VARIANTS.DEFAULT;
  }

  // Safe click handler with error boundary
  const handleClick = (event) => {
    if (onClick) {
      try {
        onClick(event);
      } catch (error) {
        console.error('Card: Error in onClick handler:', error);
      }
    }
  };

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Card', {
      children,
      variant,
      header,
      footer,
      fullWidth,
      className,
      onClick: handleClick,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Card: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      children,
      variant,
      header,
      footer,
      fullWidth,
      className,
      onClick: handleClick,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    children: extendedChildren,
    variant: extendedVariant,
    header: extendedHeader,
    footer: extendedFooter,
    fullWidth: extendedFullWidth,
    className: extendedClassName,
    onClick: extendedOnClick,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const cardClasses = [
    'ds-card',
    `ds-card-${extendedVariant}`,
    extendedFullWidth ? 'ds-card-full-width' : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Determine if card is interactive
  const isInteractive = extendedVariant === CARD_VARIANTS.INTERACTIVE || !!extendedOnClick;
  
  return (
    <div
      className={cardClasses}
      onClick={isInteractive ? extendedOnClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...restProps}
    >
      {extendedHeader && <div className="ds-card-header">{extendedHeader}</div>}
      <div className="ds-card-content">{extendedChildren || <div className="ds-card-empty">No content</div>}</div>
      {extendedFooter && <div className="ds-card-footer">{extendedFooter}</div>}
    </div>
  );
};

Card.propTypes = {
  /** Card content */
  children: PropTypes.node.isRequired,
  /** Card variant */
  variant: PropTypes.oneOf(Object.values(CARD_VARIANTS)),
  /** Card header content */
  header: PropTypes.node,
  /** Card footer content */
  footer: PropTypes.node,
  /** Whether the card should take full width */
  fullWidth: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the card */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Click handler (for interactive cards) */
  onClick: PropTypes.func,
};

export default Card;
