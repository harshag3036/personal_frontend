import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { DIVIDER_CLASS, DIVIDER_ORIENTATIONS, DIVIDER_VARIANTS, DIVIDER_SIZES } from './constants';
import './Divider.css';

/**
 * Divider Component
 * 
 * A horizontal or vertical divider to separate content areas.
 * This implementation provides consistent styling and theming.
 * 
 * @example
 * ```jsx
 * // Basic horizontal divider
 * <Divider />
 * 
 * // Vertical divider
 * <Divider orientation="vertical" height="24px" />
 * 
 * // Styled divider
 * <Divider variant="dashed" color="primary" size="md" margin="lg" />
 * 
 * // With label
 * <Divider>
 *   <Text>OR</Text>
 * </Divider>
 * ```
 */
const Divider = ({
  orientation = DIVIDER_ORIENTATIONS.HORIZONTAL,
  variant = DIVIDER_VARIANTS.SOLID,
  size = DIVIDER_SIZES.XS,
  color,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginX,
  marginY,
  width,
  height,
  children,
  className = '',
  ...restProps
}) => {
  // Process divider props
  const isVertical = orientation === DIVIDER_ORIENTATIONS.VERTICAL;
  const processedVariant = variant || DIVIDER_VARIANTS.SOLID;
  const processedSize = size || DIVIDER_SIZES.XS;
  
  // Has label/children
  const hasLabel = !!children;
  
  // Build class names
  const dividerClasses = [
    DIVIDER_CLASS,
    `${DIVIDER_CLASS}--${orientation}`,
    `${DIVIDER_CLASS}--${processedVariant}`,
    `${DIVIDER_CLASS}--${processedSize}`,
    hasLabel ? `${DIVIDER_CLASS}--with-label` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Default styles based on orientation
  const defaultStyles = isVertical
    ? {
        height: height || '100%',
        width: 'auto',
        margin: margin,
        marginLeft: marginLeft || marginX,
        marginRight: marginRight || marginX,
        marginTop: marginTop || marginY,
        marginBottom: marginBottom || marginY,
      }
    : {
        width: width || '100%',
        height: 'auto',
        margin: margin,
        marginTop: marginTop || marginY,
        marginBottom: marginBottom || marginY,
        marginLeft: marginLeft || marginX,
        marginRight: marginRight || marginX,
      };
  
  // Render divider with label if children provided
  if (hasLabel) {
    return (
      <Box
        className={dividerClasses}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={color}
        {...defaultStyles}
        {...restProps}
      >
        <Box className={`${DIVIDER_CLASS}__line ${DIVIDER_CLASS}__line-left`} />
        <Box className={`${DIVIDER_CLASS}__label`}>
          {children}
        </Box>
        <Box className={`${DIVIDER_CLASS}__line ${DIVIDER_CLASS}__line-right`} />
      </Box>
    );
  }
  
  // Render basic divider
  return (
    <Box
      className={dividerClasses}
      backgroundColor={color}
      {...defaultStyles}
      {...restProps}
    />
  );
};

Divider.propTypes = {
  /** Orientation of the divider */
  orientation: PropTypes.oneOf(Object.values(DIVIDER_ORIENTATIONS)),
  /** Variant of the divider */
  variant: PropTypes.oneOf(Object.values(DIVIDER_VARIANTS)),
  /** Size of the divider */
  size: PropTypes.oneOf(Object.values(DIVIDER_SIZES)),
  /** Color of the divider */
  color: PropTypes.string,
  /** Margin all around the divider */
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Margin at the top of the divider */
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Margin at the bottom of the divider */
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Margin at the left of the divider */
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Margin at the right of the divider */
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Horizontal margin (left and right) */
  marginX: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Vertical margin (top and bottom) */
  marginY: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Width of the divider */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Height of the divider */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /** Children or label for the divider */
  children: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string,
};

Divider.defaultProps = {
  orientation: DIVIDER_ORIENTATIONS.HORIZONTAL,
  variant: DIVIDER_VARIANTS.SOLID,
  size: DIVIDER_SIZES.XS,
  className: '',
};

export default Divider;
