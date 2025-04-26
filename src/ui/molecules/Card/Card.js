import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../atoms/Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { CARD_CLASS, CARD_VARIANTS, CARD_SIZES } from './constants';
import './Card.css';

/**
 * Enhanced Card Component
 * 
 * A container component with improved handling of variants, shadows, and theming.
 * This implementation resolves conflicts between styling approaches and provides
 * a consistent API for all card variations.
 */
const Card = ({
  as = 'div',
  children,
  variant = CARD_VARIANTS.DEFAULT,
  size = CARD_SIZES.MD,
  elevation,
  backgroundColor,
  borderColor,
  borderRadius,
  width,
  height,
  padding,
  margin,
  header,
  footer,
  isInteractive = false,
  isHoverable = false,
  onClick,
  className = '',
  style = {},
  ...restProps
}) => {
  // Process card variant and size
  const processedVariant = variant || CARD_VARIANTS.DEFAULT;
  const processedSize = size || CARD_SIZES.MD;
  
  // Determine if card is interactive
  const isCardInteractive = isInteractive || !!onClick;
  
  // Build class names
  const cardClasses = [
    CARD_CLASS,
    `${CARD_CLASS}--${processedVariant}`,
    `${CARD_CLASS}--${processedSize}`,
    isCardInteractive ? `${CARD_CLASS}--interactive` : '',
    isHoverable ? `${CARD_CLASS}--hoverable` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Handle card click
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };
  
  // Determine box shadow from elevation or variant
  let boxShadow;
  if (elevation) {
    boxShadow = elevation;
  } else if (processedVariant === CARD_VARIANTS.ELEVATED) {
    boxShadow = 'md';
  } else if (processedVariant === CARD_VARIANTS.OUTLINE) {
    boxShadow = 'none';
  }
  
  // Default padding based on size
  const defaultPadding = {
    [CARD_SIZES.XS]: 'xs',
    [CARD_SIZES.SM]: 'sm',
    [CARD_SIZES.MD]: 'md',
    [CARD_SIZES.LG]: 'lg',
    [CARD_SIZES.XL]: 'xl',
  }[processedSize];
  
  return (
    <Box
      as={as}
      className={cardClasses}
      backgroundColor={backgroundColor || 'background.secondary'}
      borderColor={borderColor || (processedVariant === CARD_VARIANTS.OUTLINE ? 'border.light' : 'transparent')}
      borderRadius={borderRadius || 'md'}
      boxShadow={boxShadow}
      width={width}
      height={height}
      padding={padding || defaultPadding}
      margin={margin}
      onClick={isCardInteractive ? handleClick : undefined}
      role={isCardInteractive ? 'button' : undefined}
      tabIndex={isCardInteractive ? 0 : undefined}
      aria-disabled={isCardInteractive && restProps.disabled}
      style={style}
      {...restProps}
    >
      {header && (
        <div className={`${CARD_CLASS}__header`}>
          {header}
        </div>
      )}
      
      <div className={`${CARD_CLASS}__body`}>
        {children}
      </div>
      
      {footer && (
        <div className={`${CARD_CLASS}__footer`}>
          {footer}
        </div>
      )}
    </Box>
  );
};

Card.propTypes = {
  /** Element to render the Card as */
  ...polymorphicPropTypes,
  /** Card content */
  children: PropTypes.node,
  /** Card variant (default, elevated, outline, filled) */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(CARD_VARIANTS)),
    PropTypes.object, // For responsive variants
  ]),
  /** Card size (xs, sm, md, lg, xl) */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(CARD_SIZES)),
    PropTypes.object, // For responsive sizes
  ]),
  /** Shadow elevation (none, xs, sm, md, lg, xl) */
  elevation: PropTypes.string,
  /** Background color token */
  backgroundColor: PropTypes.string,
  /** Border color token */
  borderColor: PropTypes.string,
  /** Border radius token */
  borderRadius: PropTypes.string,
  /** Card width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Card height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Card padding */
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Card margin */
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Card header content */
  header: PropTypes.node,
  /** Card footer content */
  footer: PropTypes.node,
  /** Whether the card is interactive */
  isInteractive: PropTypes.bool,
  /** Whether the card has hover effects */
  isHoverable: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Card.defaultProps = {
  as: 'div',
  variant: CARD_VARIANTS.DEFAULT,
  size: CARD_SIZES.MD,
  isInteractive: false,
  isHoverable: false,
  className: '',
  style: {},
};

export default Card;
