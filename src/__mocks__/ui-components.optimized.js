/**
 * Memory-optimized mock implementation for UI components
 * 
 * This file provides lightweight mock implementations for atom and molecule components
 * with reduced complexity while maintaining necessary functionality for testing.
 */

import React from 'react';

// Simplified helper to process props and classes
const generateBaseClasses = (baseClass, props = {}) => {
  const classes = [baseClass];
  
  // Handle variant with less overhead
  if (props.variant && typeof props.variant === 'string') {
    classes.push(`${baseClass}--${props.variant}`);
  } else if (props.variant && typeof props.variant === 'object') {
    // For responsive variants, use a simpler approach
    props['data-responsive-variant'] = true;
    if (props.variant.base) {
      classes.push(`${baseClass}--${props.variant.base}`);
    }
  }
  
  // Handle size with less overhead
  if (props.size && typeof props.size === 'string') {
    classes.push(`${baseClass}--${props.size}`);
  } else if (props.size && typeof props.size === 'object') {
    props['data-responsive-size'] = true;
    if (props.size.base) {
      classes.push(`${baseClass}--${props.size.base}`);
    }
  }
  
  // Add user className if any
  if (props.className) {
    classes.push(props.className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Check if prop is a responsive object (simplified)
const isResponsiveObject = (value) => (
  value && 
  typeof value === 'object' && 
  !Array.isArray(value) && 
  (value.base !== undefined || 
   value.xs !== undefined || 
   value.sm !== undefined || 
   value.md !== undefined || 
   value.lg !== undefined || 
   value.xl !== undefined)
);

// Simplified props processor
const processProps = (props) => {
  const processedProps = { ...props };
  let hasResponsiveProps = false;
  
  // Only check a few key props for responsive styling
  ['variant', 'size', 'align', 'justify'].forEach(key => {
    if (isResponsiveObject(props[key])) {
      hasResponsiveProps = true;
    }
  });
  
  // Add responsive marker if needed with less overhead
  if (hasResponsiveProps) {
    processedProps['data-responsive'] = true;
    if (!processedProps.style) processedProps.style = {};
    processedProps.style['--responsive-styles'] = 'true';
  }
  
  return processedProps;
};

// ----- Optimized Mock Components -----

// Reusable factory to generate basic mock components
const createBasicMockComponent = (componentName, defaultProps = {}) => {
  return ({ children, ...props }) => {
    const baseClass = `ui-${componentName.toLowerCase()}`;
    const mergedProps = { ...defaultProps, ...props };
    const processedProps = processProps(mergedProps);
    const className = generateBaseClasses(baseClass, processedProps);
    
    return React.createElement(
      'div',
      {
        'data-testid': `mock-${componentName.toLowerCase()}`,
        className,
        ...processedProps
      },
      children
    );
  };
};

// Common atom components with minimal implementation
export const Box = createBasicMockComponent('box');
export const Text = createBasicMockComponent('text');
export const Avatar = createBasicMockComponent('avatar', { size: 'medium' });
export const Icon = createBasicMockComponent('icon', { size: 'medium' });

// Button has slightly more complex rendering needs
export const Button = ({ children, variant = 'primary', size = 'medium', disabled, loading, leftIcon, rightIcon, ...props }) => {
  const processedProps = processProps({ variant, size, ...props });
  const className = generateBaseClasses('ui-button', { variant, size, ...processedProps });
  
  return (
    <button 
      data-testid="mock-button" 
      className={className} 
      disabled={disabled || loading}
      {...processedProps}
    >
      {leftIcon && <span className="ui-button__icon ui-button__icon--left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ui-button__icon ui-button__icon--right">{rightIcon}</span>}
    </button>
  );
};

// Layout components
export const Flex = ({ children, direction, align, justify, ...props }) => {
  const processedProps = processProps({ direction, align, justify, ...props });
  const className = generateBaseClasses('ui-flex', processedProps);
  
  return (
    <div 
      data-testid="mock-flex" 
      className={className} 
      style={{
        display: 'flex',
        flexDirection: direction || 'row',
        alignItems: align,
        justifyContent: justify,
        ...processedProps.style
      }} 
      {...processedProps}
    >
      {children}
    </div>
  );
};

export const Stack = ({ children, direction = 'vertical', spacing, ...props }) => {
  const processedProps = processProps({ direction, ...props });
  const className = generateBaseClasses('ui-stack', { direction, ...processedProps });
  
  return (
    <div 
      data-testid="mock-stack" 
      className={className} 
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap: spacing,
        ...processedProps.style
      }} 
      {...processedProps}
    >
      {children}
    </div>
  );
};

// ----- Simplified Mock Molecule Components -----

// Dropdown component with minimal subcomponents
export const Dropdown = ({ children, isOpen, ...props }) => {
  const processedProps = processProps(props);
  const className = generateBaseClasses('ui-dropdown', processedProps);
  
  return (
    <div 
      data-testid="mock-dropdown" 
      className={className} 
      data-state={isOpen ? 'open' : 'closed'}
      {...processedProps}
    >
      {children}
    </div>
  );
};

Dropdown.Trigger = ({ children, ...props }) => (
  <div data-testid="mock-dropdown-trigger" className="ui-dropdown__trigger" {...props}>
    {children}
  </div>
);

Dropdown.Menu = ({ children, ...props }) => (
  <div data-testid="mock-dropdown-menu" className="ui-dropdown__menu" {...props}>
    {children}
  </div>
);

Dropdown.Item = ({ children, ...props }) => (
  <div data-testid="mock-dropdown-item" className="ui-dropdown__item" role="menuitem" {...props}>
    {children}
  </div>
);

// Menu component
export const Menu = createBasicMockComponent('menu');
Menu.Item = ({ children, selected, disabled, ...props }) => (
  <div 
    data-testid="mock-menu-item" 
    className={`ui-menu__item ${selected ? 'ui-menu__item--selected' : ''} ${disabled ? 'ui-menu__item--disabled' : ''}`}
    aria-selected={selected}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    role="menuitem"
    {...props}
  >
    {children}
  </div>
);

// Form components
export const Textarea = ({ value, onChange, rows = 3, placeholder, isDisabled, ...props }) => (
  <textarea 
    data-testid="mock-textarea" 
    className="ui-textarea"
    value={value}
    onChange={onChange}
    rows={rows}
    placeholder={placeholder}
    disabled={isDisabled}
    {...props} 
  />
);

// Other components with simpler implementations
export const Card = createBasicMockComponent('card');
export const Tooltip = ({ children, content, placement = 'top', ...props }) => (
  <div data-testid="mock-tooltip-wrapper" style={{ position: 'relative' }}>
    {children}
    <div 
      data-testid="mock-tooltip" 
      className="ui-tooltip"
      data-placement={placement}
      {...props}
    >
      {content}
    </div>
  </div>
);

export const Modal = ({ isOpen, onClose, children, ...props }) => {
  if (!isOpen) return null;
  
  return (
    <div data-testid="mock-modal-overlay" className="ui-modal-overlay" onClick={onClose}>
      <div 
        data-testid="mock-modal" 
        className="ui-modal"
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children, ...props }) => (
  <div data-testid="mock-modal-header" className="ui-modal__header" {...props}>{children}</div>
);

Modal.Body = ({ children, ...props }) => (
  <div data-testid="mock-modal-body" className="ui-modal__body" {...props}>{children}</div>
);

Modal.Footer = ({ children, ...props }) => (
  <div data-testid="mock-modal-footer" className="ui-modal__footer" {...props}>{children}</div>
);

// Export all components as a single object for default export
const components = {
  Box,
  Text,
  Button,
  Avatar,
  Icon,
  Flex,
  Stack,
  Dropdown,
  Menu,
  Textarea,
  Card,
  Tooltip,
  Modal
};

export default components;
