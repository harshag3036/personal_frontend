import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import './Grid.css';

/**
 * Grid Component
 * 
 * A CSS Grid container with responsive props.
 * This component extends the Box component with grid-specific properties.
 * 
 * @example
 * ```jsx
 * <Grid columns="1fr 2fr" gap="md">
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 * </Grid>
 * ```
 * 
 * @example
 * ```jsx
 * // Responsive grid
 * <Grid 
 *   columns={{
 *     xs: "1fr",
 *     md: "1fr 1fr",
 *     lg: "1fr 2fr 1fr"
 *   }}
 *   gap="md"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 */
const Grid = ({
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
  ...restProps
}) => {
  // Handle responsive columns
  const getResponsiveValue = (value, property) => {
    if (typeof value === 'object' && value !== null) {
      // Create responsive styles using media queries
      const mediaStyles = {};
      
      if (value.xs) {
        mediaStyles[property] = value.xs;
      }
      
      return mediaStyles;
    }
    
    return { [property]: value };
  };
  
  // Combine styles
  const style = {
    display: 'grid',
    ...(columns && getResponsiveValue(columns, 'gridTemplateColumns')),
    ...(rows && { gridTemplateRows: rows }),
    ...(gap && { gap: `var(--spacing-${gap})` }),
    ...(columnGap && { columnGap: `var(--spacing-${columnGap})` }),
    ...(rowGap && { rowGap: `var(--spacing-${rowGap})` }),
    ...(areas && { gridTemplateAreas: areas }),
    ...(autoColumns && { gridAutoColumns: autoColumns }),
    ...(autoRows && { gridAutoRows: autoRows }),
    ...(autoFlow && { gridAutoFlow: autoFlow }),
  };
  
  // Combine class names
  const gridClasses = ['ui-grid', className].filter(Boolean).join(' ');
  
  return (
    <Box 
      className={gridClasses}
      style={style}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Grid.propTypes = {
  /** Grid content */
  children: PropTypes.node,
  /** Grid template columns (e.g., "1fr 2fr", "repeat(3, 1fr)") or responsive object */
  columns: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Grid template rows (e.g., "auto 1fr auto") */
  rows: PropTypes.string,
  /** Gap between grid items (xs, sm, md, lg, xl) */
  gap: PropTypes.string,
  /** Column gap between grid items (xs, sm, md, lg, xl) */
  columnGap: PropTypes.string,
  /** Row gap between grid items (xs, sm, md, lg, xl) */
  rowGap: PropTypes.string,
  /** Grid template areas */
  areas: PropTypes.string,
  /** Grid auto columns */
  autoColumns: PropTypes.string,
  /** Grid auto rows */
  autoRows: PropTypes.string,
  /** Grid auto flow (row, column, dense) */
  autoFlow: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default Grid;
