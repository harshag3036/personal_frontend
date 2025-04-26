import { BOX_MODIFIERS, BOX_CLASS, BOX_BREAKPOINTS } from './constants';
import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes, VALID_ELEMENTS } from '../../utilities/polymorphic';
import { isResponsiveObject, breakpointKeys } from '../../utilities/responsive-props';
import './Box.css';

/**
 * Enhanced Box Component
 * 
 * A foundational layout component with improved handling of theme and layout props.
 * This implementation resolves conflicts between styling approaches and provides
 * a consistent API for all components built on top of Box.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Box padding="md" backgroundColor="background.primary">
 *   Content goes here
 * </Box>
 * 
 * // Using layout props
 * <Box 
 *   width="100%" 
 *   maxWidth="1200px" 
 *   margin="0 auto"
 * >
 *   Centered container
 * </Box>
 * 
 * // With responsive props
 * <Box 
 *   padding={{ base: 'sm', md: 'md', lg: 'lg' }}
 *   width={{ base: '100%', md: '50%' }}
 * >
 *   Responsive content
 * </Box>
 * ```
 */
const Box = ({
  as: Element = 'div',
  children,
  // Theme props
  backgroundColor,
  color,
  borderColor,
  borderWidth,
  borderStyle,
  borderRadius,
  boxShadow,
  // Spacing props
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  // Layout props
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  display,
  // Position props
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  // Overflow props
  overflow,
  overflowX,
  overflowY,
  // Flex props
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  // Common props
  className = '',
  style = {},
  ...restProps
}) => {
  // Process theme properties
  const processThemeToken = (value, prefix) => {
    if (!value) return undefined;
    
    // If it's a responsive object, process each breakpoint value
    if (isResponsiveObject(value)) {
      const result = {};
      
      // Handle 'base' value
      if (value.base) {
        result.base = value.base.includes('.') 
          ? `var(--color-${value.base.replace('.', '-')})` 
          : `var(--${prefix}-${value.base})`;
      }
      
      // Handle breakpoint values
      breakpointKeys.forEach(breakpoint => {
        if (value[breakpoint]) {
          result[breakpoint] = value[breakpoint].includes('.')
            ? `var(--color-${value[breakpoint].replace('.', '-')})`
            : `var(--${prefix}-${value[breakpoint]})`;
        }
      });
      
      return result;
    }
    
    // Direct CSS variable reference (var(--token))
    if (value.startsWith && value.startsWith('var(--')) {
      return value;
    }
    
    // Handle dot notation for nested tokens (e.g., background.primary)
    if (value.includes && value.includes('.')) {
      return `var(--color-${value.replace('.', '-')})`;
    }
    
    // Standard token reference (e.g., "md" for spacing)
    return `var(--${prefix}-${value})`;
  };
  
  // Create CSS custom properties
  const themeStyles = {
    // Theme properties
    ...(backgroundColor && { backgroundColor: processThemeToken(backgroundColor, 'color') }),
    ...(color && { color: processThemeToken(color, 'color') }),
    ...(borderColor && { borderColor: processThemeToken(borderColor, 'color') }),
    ...(borderWidth && { borderWidth: processThemeToken(borderWidth, 'border-width') }),
    ...(borderStyle && { borderStyle }),
    ...(borderRadius && { borderRadius: processThemeToken(borderRadius, 'border-radius') }),
    ...(boxShadow && { boxShadow: processThemeToken(boxShadow, 'shadow') }),
    
    // Spacing properties
    ...(margin && { margin: processThemeToken(margin, 'spacing') }),
    ...(marginTop && { marginTop: processThemeToken(marginTop, 'spacing') }),
    ...(marginRight && { marginRight: processThemeToken(marginRight, 'spacing') }),
    ...(marginBottom && { marginBottom: processThemeToken(marginBottom, 'spacing') }),
    ...(marginLeft && { marginLeft: processThemeToken(marginLeft, 'spacing') }),
    ...(padding && { padding: processThemeToken(padding, 'spacing') }),
    ...(paddingTop && { paddingTop: processThemeToken(paddingTop, 'spacing') }),
    ...(paddingRight && { paddingRight: processThemeToken(paddingRight, 'spacing') }),
    ...(paddingBottom && { paddingBottom: processThemeToken(paddingBottom, 'spacing') }),
    ...(paddingLeft && { paddingLeft: processThemeToken(paddingLeft, 'spacing') }),
  };
  
  // Handle layout properties directly (not as theme tokens)
  const layoutStyles = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(minWidth !== undefined && { minWidth }),
    ...(minHeight !== undefined && { minHeight }),
    ...(maxWidth !== undefined && { maxWidth }),
    ...(maxHeight !== undefined && { maxHeight }),
    ...(display !== undefined && { display }),
    ...(position !== undefined && { position }),
    ...(top !== undefined && { top }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(zIndex !== undefined && { zIndex }),
    ...(overflow !== undefined && { overflow }),
    ...(overflowX !== undefined && { overflowX }),
    ...(overflowY !== undefined && { overflowY }),
    ...(flex !== undefined && { flex }),
    ...(flexGrow !== undefined && { flexGrow }),
    ...(flexShrink !== undefined && { flexShrink }),
    ...(flexBasis !== undefined && { flexBasis }),
  };
  
  // Create a data attribute for responsive styles
  const responsiveProps = { 
    backgroundColor, color, borderColor, borderRadius, boxShadow,
    margin, marginTop, marginRight, marginBottom, marginLeft, 
    padding, paddingTop, paddingRight, paddingBottom, paddingLeft,
    width, height, minWidth, minHeight, maxWidth, maxHeight, display,
    position, top, right, bottom, left, zIndex,
    overflow, overflowX, overflowY,
    flex, flexGrow, flexShrink, flexBasis
  };
  
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  // Combine all styles
  const combinedStyle = {
    ...themeStyles,
    ...layoutStyles,
    ...style
  };
  
  // Add data attribute for responsive props if needed
  if (hasResponsiveProps) {
    combinedStyle['data-responsive'] = true;
  }
  
  // Combine class names
  const boxClasses = [BOX_CLASS, className].filter(Boolean).join(' ');
  
  return (
    <Element 
      className={boxClasses}
      style={combinedStyle}
      {...restProps}
    >
      {children}
    </Element>
  );
};

Box.propTypes = {
  /** Element to render the Box as */
  ...polymorphicPropTypes,
  /** Box content */
  children: PropTypes.node,
  
  /** Theme props */
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  borderStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  boxShadow: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  
  /** Spacing props */
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  
  /** Layout props */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  display: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  
  /** Position props */
  position: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  
  /** Overflow props */
  overflow: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  overflowX: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  overflowY: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  
  /** Flex props */
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  flexGrow: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  flexShrink: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  flexBasis: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  
  /** Common props */
  className: PropTypes.string,
  style: PropTypes.object,
};

Box.defaultProps = {
  as: 'div',
  className: '',
  style: {},
};

export default Box;
