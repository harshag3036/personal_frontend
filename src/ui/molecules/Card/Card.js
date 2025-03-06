/**
 * Card Component
 * 
 * A customizable card component with support for variants, responsive props, and polymorphic rendering.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Card>Content</Card>
 * 
 * // With header and footer
 * <Card header="Header" footer="Footer">Content</Card>
 * 
 * // Different variants
 * <Card variant="elevated">Elevated Card</Card>
 * <Card variant="outlined">Outlined Card</Card>
 * <Card variant="interactive" onClick={handleClick}>Interactive Card</Card>
 * 
 * // Responsive props
 * <Card 
 *   variant={{ base: "default", md: "elevated" }}
 *   padding={{ base: "sm", md: "md", lg: "lg" }}
 * >
 *   Responsive Card
 * </Card>
 * 
 * // Polymorphic rendering
 * <Card as="section">Card as section</Card>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { componentExtension } from '../../utilities';
import Box from '../../atoms/Box';
import Stack from '../../atoms/Stack';
import { CARD_CLASS, CARD_VARIANTS } from './index';
import './Card.css';

/**
 * Card Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='div'] - Element to render the Card as
 * @param {React.ReactNode} props.children - Card content
 * @param {string|Object} [props.variant=CARD_VARIANTS.DEFAULT] - Card variant or responsive object
 * @param {React.ReactNode} [props.header] - Card header content
 * @param {React.ReactNode} [props.footer] - Card footer content
 * @param {boolean|Object} [props.fullWidth=false] - Whether the card should take full width or responsive object
 * @param {string|Object} [props.padding] - Padding for the card content or responsive object
 * @param {string|Object} [props.radius] - Border radius for the card or responsive object
 * @param {string|Object} [props.elevation] - Elevation (shadow) for the card or responsive object
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the card
 * @param {Function} [props.onClick] - Click handler (for interactive cards)
 * @returns {JSX.Element} Card component
 */
const Card = ({
  as = 'div',
  children,
  variant = CARD_VARIANTS.DEFAULT,
  header,
  footer,
  fullWidth = false,
  padding,
  radius,
  elevation,
  className = '',
  style = {},
  extensions = [],
  onClick,
  ...props
}) => {
  // Process responsive props
  const responsiveProps = {
    variant,
    header,
    footer,
    fullWidth,
    padding,
    radius,
    elevation,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(variant)) {
      responsiveClasses.variant = variant;
    }
    
    if (isResponsiveObject(fullWidth)) {
      responsiveClasses.fullWidth = fullWidth;
    }
    
    if (isResponsiveObject(padding)) {
      responsiveClasses.padding = padding;
    }
    
    if (isResponsiveObject(radius)) {
      responsiveClasses.radius = radius;
    }
    
    if (isResponsiveObject(elevation)) {
      responsiveClasses.elevation = elevation;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const baseVariant = !isResponsiveObject(variant) ? variant : CARD_VARIANTS.DEFAULT;
  const baseFullWidth = !isResponsiveObject(fullWidth) && fullWidth;
  const basePadding = !isResponsiveObject(padding) ? padding : undefined;
  const baseRadius = !isResponsiveObject(radius) ? radius : undefined;
  const baseElevation = !isResponsiveObject(elevation) ? elevation : undefined;
  
  // Error handling for invalid variants
  if (baseVariant && !Object.values(CARD_VARIANTS).includes(baseVariant)) {
    console.warn(`Card: Invalid variant "${baseVariant}". Falling back to DEFAULT.`);
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
      as,
      children,
      variant: baseVariant,
      header,
      footer,
      fullWidth: baseFullWidth,
      padding: basePadding,
      radius: baseRadius,
      elevation: baseElevation,
      className,
      style,
      onClick: handleClick,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Card: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      as,
      children,
      variant: baseVariant,
      header,
      footer,
      fullWidth: baseFullWidth,
      padding: basePadding,
      radius: baseRadius,
      elevation: baseElevation,
      className,
      style,
      onClick: handleClick,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    as: extendedAs,
    children: extendedChildren,
    variant: extendedVariant,
    header: extendedHeader,
    footer: extendedFooter,
    fullWidth: extendedFullWidth,
    padding: extendedPadding,
    radius: extendedRadius,
    elevation: extendedElevation,
    className: extendedClassName,
    style: extendedStyle,
    onClick: extendedOnClick,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const cardClasses = [
    CARD_CLASS,
    `${CARD_CLASS}--${extendedVariant}`,
    extendedFullWidth ? `${CARD_CLASS}--full-width` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const cardStyle = {
    ...extendedStyle,
  };
  
  // Add padding if specified
  if (extendedPadding) {
    cardStyle.padding = `var(--spacing-${extendedPadding})`;
  }
  
  // Add border radius if specified
  if (extendedRadius) {
    cardStyle.borderRadius = `var(--border-radius-${extendedRadius})`;
  }
  
  // Add elevation if specified
  if (extendedElevation) {
    cardStyle.boxShadow = `var(--shadow-${extendedElevation})`;
  }
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    cardStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Determine if card is interactive
  const isInteractive = extendedVariant === CARD_VARIANTS.INTERACTIVE || !!extendedOnClick;
  
  // Use Stack for consistent spacing and layout
  return (
    <Box
      as={extendedAs}
      className={cardClasses}
      style={cardStyle}
      onClick={isInteractive ? extendedOnClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...restProps}
    >
      {extendedHeader && <div className={`${CARD_CLASS}__header`}>{extendedHeader}</div>}
      <div className={`${CARD_CLASS}__content`}>
        {extendedChildren || <div className={`${CARD_CLASS}__empty`}>No content</div>}
      </div>
      {extendedFooter && <div className={`${CARD_CLASS}__footer`}>{extendedFooter}</div>}
    </Box>
  );
};

Card.propTypes = {
  /** Element to render the Card as */
  ...polymorphicPropTypes,
  /** Card content */
  children: PropTypes.node,
  /** Card variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(CARD_VARIANTS)),
    PropTypes.object,
  ]),
  /** Card header content */
  header: PropTypes.node,
  /** Card footer content */
  footer: PropTypes.node,
  /** Whether the card should take full width or responsive object */
  fullWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /** Padding for the card content or responsive object */
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Border radius for the card or responsive object */
  radius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Elevation (shadow) for the card or responsive object */
  elevation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Extensions to apply to the card */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Click handler (for interactive cards) */
  onClick: PropTypes.func,
};

Card.defaultProps = {
  as: 'div',
  variant: CARD_VARIANTS.DEFAULT,
  fullWidth: false,
  className: '',
  style: {},
  extensions: [],
};

export default Card;
