import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import { GRID_CLASS } from './constants';
import './Grid.css';

/**
 * Enhanced Grid Component
 * 
 * A CSS Grid container with improved handling of layout properties.
 * This component extends the enhanced Box component with grid-specific properties.
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
  placeItems,
  placeContent,
  alignItems,
  justifyItems,
  alignContent,
  justifyContent,
  className = '',
  ...restProps
}) => {  
  // Add appropriate classes for grid modifiers
  let gridClasses = [GRID_CLASS];
  
  // Add user-provided class
  if (className) {
    gridClasses.push(className);
  }
  
  // Convert classes array to string
  const combinedClassName = gridClasses.join(' ');
  
  return (
    <Box
      as={as}
      className={combinedClassName}
      display="grid"
      gridTemplateColumns={columns}
      gridTemplateRows={rows}
      gridTemplateAreas={areas}
      gridAutoColumns={autoColumns}
      gridAutoRows={autoRows}
      gridAutoFlow={autoFlow}
      gap={gap}
      columnGap={columnGap}
      rowGap={rowGap}
      placeItems={placeItems}
      placeContent={placeContent}
      alignItems={alignItems}
      justifyItems={justifyItems}
      alignContent={alignContent}
      justifyContent={justifyContent}
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
  /** Gap between grid items (xs, sm, md, lg, xl) or CSS value or responsive object */
  gap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Column gap between grid items (xs, sm, md, lg, xl) or CSS value or responsive object */
  columnGap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Row gap between grid items (xs, sm, md, lg, xl) or CSS value or responsive object */
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
  /** Place items (shorthand for align-items and justify-items) */
  placeItems: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Place content (shorthand for align-content and justify-content) */
  placeContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Align items */
  alignItems: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Justify items */
  justifyItems: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Align content */
  alignContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Justify content */
  justifyContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
};

Grid.defaultProps = {
  columns: '1fr',
  className: '',
};

export default Grid;
