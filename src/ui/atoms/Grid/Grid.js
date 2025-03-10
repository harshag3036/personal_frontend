import React from 'react';
import PropTypes from 'prop-types';
import Box, { BOX_CLASS } from '../Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveStyles, gridPropConfig } from '../../utilities/responsive-props';
import { GRID_CLASS } from './constants';
import './Grid.css';

/**
 * Grid Component
 * 
 * A CSS Grid container with responsive props.
 * This component extends the Box component with grid-specific properties.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Grid columns="1fr 2fr" gap="md">
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 * </Grid>
 * 
 * // As another element
 * <Grid as="section" columns="1fr 2fr" gap="md">
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 * </Grid>
 * 
 * // Responsive grid
 * <Grid 
 *   columns={{
 *     base: "1fr",
 *     md: "1fr 1fr",
 *     lg: "1fr 2fr 1fr"
 *   }}
 *   gap="md"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * 
 * // With template areas
 * <Grid 
 *   columns="1fr 3fr"
 *   rows="auto 1fr auto"
 *   areas={`
 *     "header header"
 *     "sidebar content"
 *     "footer footer"
 *   `}
 *   gap="md"
 * >
 *   <div style={{ gridArea: 'header' }}>Header</div>
 *   <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
 *   <div style={{ gridArea: 'content' }}>Content</div>
 *   <div style={{ gridArea: 'footer' }}>Footer</div>
 * </Grid>
 * ```
 */
const Grid = ({
  as,
  children,
  columns = '1fr',
  rows,
  gap,
  columnGap,
  rowGap,
  areas,
  autoColumns,
  autoRows,
  autoFlow,
  className = '',
  style = {},
  ...restProps
}) => {
  // Process responsive props
  const responsiveProps = {
    columns,
    rows,
    gap,
    columnGap,
    rowGap,
    areas,
    autoColumns,
    autoRows,
    autoFlow,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    responsiveStyles = createResponsiveStyles(
      {
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap: gap && `var(--spacing-${gap})`,
        columnGap: columnGap && `var(--spacing-${columnGap})`,
        rowGap: rowGap && `var(--spacing-${rowGap})`,
        gridTemplateAreas: areas,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
        gridAutoFlow: autoFlow,
      },
      gridPropConfig
    );
  }
  
  // Combine styles
  const combinedStyle = {
    display: 'grid',
    ...(columns && !isResponsiveObject(columns) && { gridTemplateColumns: columns }),
    ...(rows && !isResponsiveObject(rows) && { gridTemplateRows: rows }),
    ...(gap && !isResponsiveObject(gap) && { gap: `var(--spacing-${gap})` }),
    ...(columnGap && !isResponsiveObject(columnGap) && { columnGap: `var(--spacing-${columnGap})` }),
    ...(rowGap && !isResponsiveObject(rowGap) && { rowGap: `var(--spacing-${rowGap})` }),
    ...(areas && !isResponsiveObject(areas) && { gridTemplateAreas: areas }),
    ...(autoColumns && !isResponsiveObject(autoColumns) && { gridAutoColumns: autoColumns }),
    ...(autoRows && !isResponsiveObject(autoRows) && { gridAutoRows: autoRows }),
    ...(autoFlow && !isResponsiveObject(autoFlow) && { gridAutoFlow: autoFlow }),
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    combinedStyle['--responsive-styles'] = responsiveStyles;
  }
  
  // Combine class names using BEM convention
  const gridClasses = [GRID_CLASS, className].filter(Boolean).join(' ');
  
  return (
    <Box 
      as={as}
      className={gridClasses}
      style={combinedStyle}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Grid.propTypes = {
  /** Element to render the Grid as */
  ...polymorphicPropTypes,
  /** Grid content */
  children: PropTypes.node,
  /** Grid template columns (e.g., "1fr 2fr", "repeat(3, 1fr)") or responsive object */
  columns: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Grid template rows (e.g., "auto 1fr auto") or responsive object */
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Gap between grid items (xs, sm, md, lg, xl) or responsive object */
  gap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Column gap between grid items (xs, sm, md, lg, xl) or responsive object */
  columnGap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Row gap between grid items (xs, sm, md, lg, xl) or responsive object */
  rowGap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Grid template areas or responsive object */
  areas: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Grid auto columns or responsive object */
  autoColumns: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Grid auto rows or responsive object */
  autoRows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Grid auto flow (row, column, dense) or responsive object */
  autoFlow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Grid.defaultProps = {
  columns: '1fr',
  className: '',
  style: {},
};

export default Grid;
