import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { FLEX_CLASS, FLEX_DIRECTIONS, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS, FLEX_WRAPS, FLEX_GAP_SIZES } from './constants';
import './Flex.css';

/**
 * Enhanced Flex Component
 * 
 * A flexbox container with improved handling of layout properties.
 * This component extends the enhanced Box component with flexbox-specific properties.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Flex direction="row" align="center" justify="space-between">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * 
 * // As another element
 * <Flex as="nav" direction="row" align="center" justify="space-between">
 *   <a href="/">Home</a>
 *   <a href="/about">About</a>
 * </Flex>
 * 
 * // With responsive props
 * <Flex 
 *   direction={{ base: 'column', md: 'row' }}
 *   align="center"
 *   justify="space-between"
 *   gap="md"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
const Flex = ({
  as,
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  columnGap,
  rowGap,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  order,
  alignSelf,
  className = '',
  ...restProps
}) => {
  // Process flexbox-specific styles
  const flexStyles = {
    display: 'flex',
  };
  
  // Add appropriate classes for flex modifiers
  let flexClasses = [FLEX_CLASS];
  
  // Add user-provided class
  if (className) {
    flexClasses.push(className);
  }
  
  // Convert classes array to string
  const combinedClassName = flexClasses.join(' ');
  
  return (
    <Box
      as={as}
      className={combinedClassName}
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      gap={gap}
      columnGap={columnGap}
      rowGap={rowGap}
      flex={flex}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      flexBasis={flexBasis}
      order={order}
      alignSelf={alignSelf}
      {...flexStyles}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Flex.propTypes = {
  /** Element to render the Flex as */
  ...polymorphicPropTypes,
  /** Flex content */
  children: PropTypes.node,
  /** Flex direction (row, column, row-reverse, column-reverse) or responsive object */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_DIRECTIONS),
    PropTypes.object,
  ]),
  /** Align items (stretch, flex-start, flex-end, center, baseline) or responsive object */
  align: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_ALIGNMENTS),
    PropTypes.object,
  ]),
  /** Justify content (flex-start, flex-end, center, space-between, space-around, space-evenly) or responsive object */
  justify: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_JUSTIFICATIONS),
    PropTypes.object,
  ]),
  /** Flex wrap (nowrap, wrap, wrap-reverse) or responsive object */
  wrap: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_WRAPS),
    PropTypes.object,
  ]),
  /** Gap between items (xs, sm, md, lg, xl) or responsive object */
  gap: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_GAP_SIZES),
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Column gap between items (xs, sm, md, lg, xl) or responsive object */
  columnGap: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_GAP_SIZES),
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Row gap between items (xs, sm, md, lg, xl) or responsive object */
  rowGap: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_GAP_SIZES),
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Flex shorthand property or responsive object */
  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  /** Flex grow property or responsive object */
  flexGrow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  /** Flex shrink property or responsive object */
  flexShrink: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  /** Flex basis property or responsive object */
  flexBasis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  /** Order property or responsive object */
  order: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  /** Align self property or responsive object */
  alignSelf: PropTypes.oneOfType([
    PropTypes.oneOf(FLEX_ALIGNMENTS),
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
};

Flex.defaultProps = {
  direction: 'row',
  align: 'stretch',
  justify: 'flex-start',
  wrap: 'nowrap',
  className: '',
};

export default Flex;
