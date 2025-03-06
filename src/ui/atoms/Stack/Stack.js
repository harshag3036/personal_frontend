import React from 'react';
import PropTypes from 'prop-types';
import Flex from '../Flex';
import './Stack.css';

/**
 * Stack Component
 * 
 * A component for stacking elements vertically or horizontally with consistent spacing.
 * This component is a specialized version of Flex with a simpler API.
 * 
 * @example
 * ```jsx
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 * 
 * @example
 * ```jsx
 * <Stack direction="horizontal" spacing="lg" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
const Stack = ({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'flex-start',
  className = '',
  dividers = false,
  ...restProps
}) => {
  // Map direction to flex direction
  const flexDirection = direction === 'vertical' ? 'column' : 'row';
  
  // Map align to flex align
  const flexAlign = align === 'start' ? 'flex-start' 
    : align === 'end' ? 'flex-end' 
    : align;
  
  // Map justify to flex justify
  const flexJustify = justify === 'start' ? 'flex-start'
    : justify === 'end' ? 'flex-end'
    : justify;
  
  // Combine class names
  const stackClasses = [
    'ui-stack',
    `ui-stack-${direction}`,
    dividers ? 'ui-stack-dividers' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Flex
      direction={flexDirection}
      align={flexAlign}
      justify={flexJustify}
      gap={spacing}
      className={stackClasses}
      {...restProps}
    >
      {children}
    </Flex>
  );
};

Stack.propTypes = {
  /** Stack content */
  children: PropTypes.node,
  /** Stack direction */
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  /** Spacing between items (xs, sm, md, lg, xl) */
  spacing: PropTypes.string,
  /** Alignment of items */
  align: PropTypes.oneOf(['stretch', 'start', 'center', 'end', 'baseline']),
  /** Justification of items */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']),
  /** Show dividers between items */
  dividers: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Stack;
