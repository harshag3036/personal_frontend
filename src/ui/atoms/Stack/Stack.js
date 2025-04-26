import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { STACK_CLASS, STACK_DIRECTIONS, STACK_SPACING } from './constants';
import './Stack.css';

/**
 * Enhanced Stack Component
 * 
 * A layout component for creating stacked elements with consistent spacing.
 * This component extends Box and provides a simpler API for common stacking patterns.
 * 
 * @example
 * ```jsx
 * // Basic vertical stack (default)
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // Horizontal stack
 * <Stack direction="row" spacing="md" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // Responsive direction
 * <Stack 
 *   direction={{ base: 'column', md: 'row' }} 
 *   spacing="md"
 *   align="center"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
const Stack = ({
  as,
  children,
  direction = 'column',
  spacing = 'md',
  align,
  justify,
  wrap,
  dividers,
  dividerColor = 'border.light',
  className = '',
  ...restProps
}) => {
  // Process stack props
  const processedDirection = direction || 'column';
  const processedSpacing = spacing || 'md';
  
  // Determine if this is a horizontal stack
  const isRowDirection = 
    (typeof processedDirection === 'string' && processedDirection === 'row') || 
    (isResponsiveObject(processedDirection) && processedDirection.base === 'row');
  
  // Build class names
  const stackClasses = [
    STACK_CLASS,
    typeof processedDirection === 'string' ? `${STACK_CLASS}--${processedDirection}` : '',
    typeof processedSpacing === 'string' ? `${STACK_CLASS}--spacing-${processedSpacing}` : '',
    dividers ? `${STACK_CLASS}--dividers` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Clone children to add spacing
  const stackItems = React.Children.toArray(children).filter(Boolean);
  
  const clonedChildren = stackItems.map((child, index) => {
    const isLastChild = index === stackItems.length - 1;
    
    // Add margin to all but the last child
    const marginProp = isRowDirection ? 'marginRight' : 'marginBottom';
    const spacingValue = !isLastChild ? processedSpacing : undefined;
    
    // For dividers
    const showDivider = dividers && !isLastChild;
    
    // Wrap children in containers for styling
    return (
      <div 
        key={`stack-item-${index}`} 
        className={`${STACK_CLASS}__item`}
        data-last={isLastChild}
      >
        {child}
        {showDivider && (
          <div 
            className={`${STACK_CLASS}__divider`}
            style={{ backgroundColor: `var(--color-${dividerColor.replace('.', '-')})` }}
          />
        )}
      </div>
    );
  });
  
  // Map direction to flexDirection
  const flexDirection = processedDirection;
  
  // Map align based on direction
  let alignItems;
  if (align) {
    alignItems = align;
  } else if (isRowDirection) {
    alignItems = 'center';
  }
  
  return (
    <Box
      as={as}
      className={stackClasses}
      display="flex"
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justify}
      flexWrap={wrap}
      data-stack-direction={typeof processedDirection === 'string' ? processedDirection : undefined}
      data-stack-spacing={typeof processedSpacing === 'string' ? processedSpacing : undefined}
      {...restProps}
    >
      {clonedChildren}
    </Box>
  );
};

Stack.propTypes = {
  /** Element to render the Stack as */
  ...polymorphicPropTypes,
  /** Stack content */
  children: PropTypes.node,
  /** Stack direction (row, column) or responsive object */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(STACK_DIRECTIONS),
    PropTypes.object,
  ]),
  /** Space between stack items (xs, sm, md, lg, xl) or responsive object */
  spacing: PropTypes.oneOfType([
    PropTypes.oneOf(STACK_SPACING),
    PropTypes.object,
  ]),
  /** Alignment of stack items (stretch, center, flex-start, flex-end, baseline) */
  align: PropTypes.string,
  /** Justification of stack items (flex-start, flex-end, center, space-between, space-around, space-evenly) */
  justify: PropTypes.string,
  /** Whether the stack should wrap items */
  wrap: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Whether to show dividers between items */
  dividers: PropTypes.bool,
  /** Color of dividers (uses color token system) */
  dividerColor: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

Stack.defaultProps = {
  direction: 'column',
  spacing: 'md',
  dividers: false,
  dividerColor: 'border.light',
  className: '',
};

export default Stack;
