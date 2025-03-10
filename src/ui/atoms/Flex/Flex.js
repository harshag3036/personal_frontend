import React from 'react';
import PropTypes from 'prop-types';
import Box, { BOX_CLASS } from '../Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles, flexPropConfig } from '../../utilities/responsive-props';
import { FLEX_CLASS, FLEX_DIRECTIONS, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS, FLEX_WRAPS, FLEX_GAP_SIZES } from './constants';
import './Flex.css';

/**
 * Flex Component
 * 
 * A flexbox container with alignment props.
 * This component extends the Box component with flexbox-specific properties.
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
 * 
 * // With BEM modifiers
 * <Flex className="ui-flex--center-all ui-flex--gap-md">
 *   <div>Centered Content</div>
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
  className = '',
  style = {},
  flexGrow,
  flexShrink,
  flexBasis,
  flex,
  order,
  alignSelf,
  ...restProps
}) => {
  // Process responsive props
  const responsiveProps = {
    direction,
    align,
    justify,
    wrap,
    gap,
    flexGrow,
    flexShrink,
    flexBasis,
    flex,
    order,
    alignSelf,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    responsiveStyles = createResponsiveStyles(
      {
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: gap && `var(--spacing-${gap})`,
        flexGrow,
        flexShrink,
        flexBasis,
        flex,
        order,
        alignSelf,
      },
      flexPropConfig
    );
  }
  
  // Combine styles
  const combinedStyle = {
    display: 'flex',
    ...(direction && !isResponsiveObject(direction) && { flexDirection: direction }),
    ...(align && !isResponsiveObject(align) && { alignItems: align }),
    ...(justify && !isResponsiveObject(justify) && { justifyContent: justify }),
    ...(wrap && !isResponsiveObject(wrap) && { flexWrap: wrap }),
    ...(gap && !isResponsiveObject(gap) && { gap: `var(--spacing-${gap})` }),
    ...(flexGrow !== undefined && !isResponsiveObject(flexGrow) && { flexGrow }),
    ...(flexShrink !== undefined && !isResponsiveObject(flexShrink) && { flexShrink }),
    ...(flexBasis !== undefined && !isResponsiveObject(flexBasis) && { flexBasis }),
    ...(flex !== undefined && !isResponsiveObject(flex) && { flex }),
    ...(order !== undefined && !isResponsiveObject(order) && { order }),
    ...(alignSelf !== undefined && !isResponsiveObject(alignSelf) && { alignSelf }),
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    combinedStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Combine class names using BEM convention
  const flexClasses = [FLEX_CLASS, className].filter(Boolean).join(' ');
  
  return (
    <Box 
      as={as}
      className={flexClasses}
      style={combinedStyle}
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
  /** Flex shorthand property or responsive object */
  flex: PropTypes.oneOfType([
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
  /** Additional inline styles */
  style: PropTypes.object,
};

Flex.defaultProps = {
  direction: 'row',
  align: 'stretch',
  justify: 'flex-start',
  wrap: 'nowrap',
  className: '',
  style: {},
};

export default Flex;
