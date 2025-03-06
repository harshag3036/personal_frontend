import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import './Flex.css';

/**
 * Flex Component
 * 
 * A flexbox container with alignment props.
 * This component extends the Box component with flexbox-specific properties.
 * 
 * @example
 * ```jsx
 * <Flex direction="row" align="center" justify="space-between">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
const Flex = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  className = '',
  ...restProps
}) => {
  // Combine styles
  const style = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    ...(gap && { gap: `var(--spacing-${gap})` }),
  };
  
  // Combine class names
  const flexClasses = ['ui-flex', className].filter(Boolean).join(' ');
  
  return (
    <Box 
      className={flexClasses}
      style={style}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Flex.propTypes = {
  /** Flex content */
  children: PropTypes.node,
  /** Flex direction (row, column, row-reverse, column-reverse) */
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  /** Align items (stretch, flex-start, flex-end, center, baseline) */
  align: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
  /** Justify content (flex-start, flex-end, center, space-between, space-around, space-evenly) */
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
  /** Flex wrap (nowrap, wrap, wrap-reverse) */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /** Gap between items (xs, sm, md, lg, xl) */
  gap: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Flex;
