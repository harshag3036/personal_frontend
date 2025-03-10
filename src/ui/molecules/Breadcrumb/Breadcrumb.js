import React from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveClassNames } from '../../utilities/responsive-props';
import { BREADCRUMB_VARIANTS, BREADCRUMB_SIZES, BREADCRUMB_SEPARATOR_TYPES, DEFAULT_PROPS } from './constants';
import Icon from '../../atoms/Icon';
import Link from '../../atoms/Link';
import './Breadcrumb.css';

/**
 * Breadcrumb Component
 * 
 * A navigation component that helps users understand their current location within a website's hierarchy.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptops', href: '/products/laptops' },
 *     { label: 'MacBook Pro', href: '/products/laptops/macbook-pro' }
 *   ]}
 * />
 * 
 * // With custom separator and size
 * <Breadcrumb
 *   items={[
 *     { label: 'Dashboard', href: '/dashboard' },
 *     { label: 'Settings', href: '/dashboard/settings' },
 *     { label: 'Profile', href: '/dashboard/settings/profile' }
 *   ]}
 *   separatorType="chevron"
 *   size="large"
 * />
 * 
 * // With collapsed items
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Category', href: '/category' },
 *     { label: 'Subcategory', href: '/category/subcategory' },
 *     { label: 'Product', href: '/category/subcategory/product' },
 *     { label: 'Details', href: '/category/subcategory/product/details' }
 *   ]}
 *   maxItems={3}
 * />
 * ```
 */
const Breadcrumb = ({
  as: Element = 'nav',
  items = [],
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  separatorType = DEFAULT_PROPS.separatorType,
  customSeparator = null,
  maxItems = DEFAULT_PROPS.maxItems,
  collapsedLabel = DEFAULT_PROPS.collapsedLabel,
  showHomeIcon = DEFAULT_PROPS.showHomeIcon,
  homeIconName = DEFAULT_PROPS.homeIconName,
  homeLabel = DEFAULT_PROPS.homeLabel,
  lastItemClickable = DEFAULT_PROPS.lastItemClickable,
  className = '',
  style = {},
  ...restProps
}) => {
  // Handle responsive variants
  const variantClass = isResponsiveObject(variant)
    ? createResponsiveClassNames('ui-breadcrumb', variant)
    : `ui-breadcrumb--${variant}`;

  // Handle responsive sizes
  const sizeClass = isResponsiveObject(size)
    ? createResponsiveClassNames('ui-breadcrumb', size)
    : `ui-breadcrumb--${size}`;

  // Combine class names
  const breadcrumbClasses = [
    'ui-breadcrumb',
    variantClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  // Determine which items to display based on maxItems
  const displayItems = [...items];
  let collapsedItemsCount = 0;

  if (maxItems > 0 && items.length > maxItems) {
    // Calculate how many items to collapse
    collapsedItemsCount = items.length - maxItems;
    
    // Keep first and last items, remove items in the middle
    const firstItem = displayItems.shift();
    const lastItems = displayItems.splice(-maxItems + 1);
    
    // Reset displayItems with first item, collapsed indicator, and last items
    displayItems.length = 0;
    displayItems.push(firstItem);
    displayItems.push(...lastItems);
  }

  // Render separator based on type
  const renderSeparator = () => {
    if (customSeparator) {
      return (
        <span className="ui-breadcrumb__separator ui-breadcrumb__separator--custom">
          {customSeparator}
        </span>
      );
    }

    return (
      <span className={`ui-breadcrumb__separator ui-breadcrumb__separator--${separatorType}`} />
    );
  };

  return (
    <Element
      className={breadcrumbClasses}
      style={style}
      aria-label="Breadcrumb"
      {...restProps}
    >
      {displayItems.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === displayItems.length - 1;
        const isCollapsed = isFirst && collapsedItemsCount > 0 && index < displayItems.length - 1;
        
        // Determine if the item should be rendered as a link
        const isLink = !isLast || lastItemClickable;
        
        return (
          <React.Fragment key={`breadcrumb-item-${index}`}>
            <li className="ui-breadcrumb__item">
              {isFirst && showHomeIcon ? (
                <span className="ui-breadcrumb__home-icon">
                  <Icon name={homeIconName} size="sm" />
                </span>
              ) : null}
              
              {isLink ? (
                <Link 
                  href={item.href}
                  className="ui-breadcrumb__link"
                  variant="breadcrumb"
                  underline={false}
                  onClick={item.onClick}
                >
                  {isFirst && !item.label ? homeLabel : item.label}
                </Link>
              ) : (
                <span className="ui-breadcrumb__text">
                  {item.label}
                </span>
              )}
              
              {isCollapsed && (
                <span 
                  className="ui-breadcrumb__collapsed"
                  title={`${collapsedItemsCount} more items`}
                >
                  {collapsedLabel}
                </span>
              )}
            </li>
            
            {!isLast && renderSeparator()}
          </React.Fragment>
        );
      })}
    </Element>
  );
};

Breadcrumb.propTypes = {
  /** Element to render the Breadcrumb as */
  ...polymorphicPropTypes,
  /** Array of breadcrumb items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /** Item label */
      label: PropTypes.string.isRequired,
      /** Item URL */
      href: PropTypes.string,
      /** Click handler */
      onClick: PropTypes.func,
    })
  ).isRequired,
  /** Visual variant of the breadcrumb */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BREADCRUMB_VARIANTS)),
    PropTypes.object, // For responsive variants
  ]),
  /** Size of the breadcrumb */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BREADCRUMB_SIZES)),
    PropTypes.object, // For responsive sizes
  ]),
  /** Type of separator between items */
  separatorType: PropTypes.oneOf(Object.values(BREADCRUMB_SEPARATOR_TYPES)),
  /** Custom separator element */
  customSeparator: PropTypes.node,
  /** Maximum number of items to display (0 = show all) */
  maxItems: PropTypes.number,
  /** Label for collapsed items */
  collapsedLabel: PropTypes.string,
  /** Whether to show home icon for the first item */
  showHomeIcon: PropTypes.bool,
  /** Icon name for the home icon */
  homeIconName: PropTypes.string,
  /** Label for the home item when not provided */
  homeLabel: PropTypes.string,
  /** Whether the last item should be clickable */
  lastItemClickable: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

Breadcrumb.defaultProps = {
  as: 'nav',
  variant: DEFAULT_PROPS.variant,
  size: DEFAULT_PROPS.size,
  separatorType: DEFAULT_PROPS.separatorType,
  customSeparator: null,
  maxItems: DEFAULT_PROPS.maxItems,
  collapsedLabel: DEFAULT_PROPS.collapsedLabel,
  showHomeIcon: DEFAULT_PROPS.showHomeIcon,
  homeIconName: DEFAULT_PROPS.homeIconName,
  homeLabel: DEFAULT_PROPS.homeLabel,
  lastItemClickable: DEFAULT_PROPS.lastItemClickable,
  className: '',
  style: {},
};

export default Breadcrumb;
