/**
 * Polymorphic Component Utilities
 * 
 * This utility provides functions and types for creating polymorphic components.
 * Polymorphic components can be rendered as different HTML elements using the `as` prop.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Valid HTML elements that can be used with the `as` prop
 */
export const VALID_ELEMENTS = [
  'div', 'span', 'section', 'article', 'main', 'header', 'footer', 'nav',
  'aside', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
  'a', 'button', 'input', 'textarea', 'select', 'option', 'label', 'form',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'video', 'audio',
  'canvas', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
  'fieldset', 'legend', 'hr', 'br', 'pre', 'code', 'blockquote', 'cite',
  'dl', 'dt', 'dd', 'figure', 'figcaption', 'time', 'mark', 'small',
  'strong', 'em', 'i', 'b', 'u', 's', 'sub', 'sup', 'address', 'abbr',
  'details', 'summary', 'dialog', 'menu', 'menuitem', 'progress', 'meter',
  'iframe', 'object', 'param', 'embed', 'source', 'track', 'map', 'area',
  'caption', 'colgroup', 'col', 'template', 'slot', 'output', 'datalist',
  'optgroup', 'keygen', 'command', 'bdi', 'bdo', 'ruby', 'rt', 'rp', 'wbr',
  'noscript', 'ins', 'del', 'data', 'dfn', 'kbd', 'q', 'samp', 'var',
];

/**
 * PropTypes for polymorphic components
 */
export const polymorphicPropTypes = {
  /** The element to render the component as */
  as: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_ELEMENTS),
    PropTypes.elementType,
  ]),
};

/**
 * Create a polymorphic component
 * 
 * @param {React.ComponentType} Component - The component to make polymorphic
 * @param {Object} defaultProps - Default props for the component
 * @returns {React.ComponentType} Polymorphic component
 */
export const createPolymorphicComponent = (Component, defaultProps = {}) => {
  const PolymorphicComponent = React.forwardRef(({ as, ...props }, ref) => {
    const Element = as || defaultProps.as || 'div';
    return <Element ref={ref} {...props} />;
  });

  PolymorphicComponent.displayName = `Polymorphic(${Component.displayName || Component.name || 'Component'})`;
  PolymorphicComponent.propTypes = {
    ...Component.propTypes,
    ...polymorphicPropTypes,
  };
  PolymorphicComponent.defaultProps = {
    ...Component.defaultProps,
    ...defaultProps,
  };

  return PolymorphicComponent;
};

/**
 * Higher-order component to make a component polymorphic
 * 
 * @param {Object} options - Options for the polymorphic component
 * @param {string|React.ComponentType} [options.defaultAs='div'] - Default element to render as
 * @returns {Function} Higher-order component
 */
export const withPolymorphic = (options = {}) => {
  const { defaultAs = 'div' } = options;
  
  return (Component) => {
    const PolymorphicComponent = React.forwardRef(({ as, ...props }, ref) => {
      const Element = as || defaultAs;
      return <Component as={Element} ref={ref} {...props} />;
    });

    PolymorphicComponent.displayName = `withPolymorphic(${Component.displayName || Component.name || 'Component'})`;
    PolymorphicComponent.propTypes = {
      ...Component.propTypes,
      ...polymorphicPropTypes,
    };
    PolymorphicComponent.defaultProps = {
      ...Component.defaultProps,
      as: defaultAs,
    };

    return PolymorphicComponent;
  };
};

/**
 * Example of a simple polymorphic component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Component children
 * @param {string|React.ComponentType} [props.as='div'] - Element to render as
 * @param {string} [props.className=''] - Additional CSS class names
 * @returns {JSX.Element} Polymorphic component
 */
export const Polymorphic = ({
  as: Element = 'div',
  children,
  className = '',
  ...props
}) => {
  return (
    <Element className={className} {...props}>
      {children}
    </Element>
  );
};

Polymorphic.propTypes = {
  /** Component children */
  children: PropTypes.node,
  /** Element to render as */
  as: PropTypes.oneOfType([
    PropTypes.oneOf(VALID_ELEMENTS),
    PropTypes.elementType,
  ]),
  /** Additional CSS class names */
  className: PropTypes.string,
};

Polymorphic.defaultProps = {
  as: 'div',
  className: '',
};

export default {
  VALID_ELEMENTS,
  polymorphicPropTypes,
  createPolymorphicComponent,
  withPolymorphic,
  Polymorphic,
};
