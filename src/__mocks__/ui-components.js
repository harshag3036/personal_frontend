/**
 * Enhanced mock implementation for UI components
 * 
 * This file provides improved mock implementations for atom and molecule components
 * used in organism components, with better handling of variants, responsive props,
 * and component extensions.
 */

import React from 'react';
import { isResponsiveObject } from './useResponsiveProps';

// Generate base classes for each component
const generateBaseClasses = (baseClass, props) => {
  const classes = [baseClass];
  
  // Process variant if present
  if (props.variant) {
    if (isResponsiveObject(props.variant)) {
      // Add base variant class + data attribute for responsive
      if (props.variant.base) {
        classes.push(`${baseClass}--${props.variant.base}`);
      }
      // Add a special attribute to detect responsive variants
      props['data-responsive-variant'] = true;
    } else {
      classes.push(`${baseClass}--${props.variant}`);
    }
  }
  
  // Process size if present
  if (props.size) {
    if (isResponsiveObject(props.size)) {
      // Add base size class + data attribute for responsive
      if (props.size.base) {
        classes.push(`${baseClass}--${props.size.base}`);
      }
      // Add a special attribute to detect responsive sizes
      props['data-responsive-size'] = true;
    } else {
      classes.push(`${baseClass}--${props.size}`);
    }
  }
  
  // Add user-provided className if present
  if (props.className) {
    classes.push(props.className);
  }
  
  return classes.filter(Boolean).join(' ');
};

// Helper to process responsive styling for testing
const processResponsiveProps = (props) => {
  const processedProps = { ...props };
  let hasResponsiveProps = false;
  
  // Check for common responsive props
  ['variant', 'size', 'fullWidth', 'align', 'justify', 'direction', 'wrap'].forEach(propName => {
    if (isResponsiveObject(props[propName])) {
      hasResponsiveProps = true;
    }
  });
  
  // Add a responsive style indicator for testing
  if (hasResponsiveProps && processedProps.style) {
    processedProps.style = {
      ...processedProps.style,
      '--responsive-styles': 'true'
    };
  } else if (hasResponsiveProps) {
    processedProps.style = { '--responsive-styles': 'true' };
  }
  
  return processedProps;
};

// Enhanced mock atom components
export const Box = ({ children, ...props }) => {
  const processedProps = processResponsiveProps(props);
  const className = generateBaseClasses('ui-box', processedProps);
  return <div data-testid="mock-box" className={className} {...processedProps}>{children}</div>;
};

export const Text = ({ children, ...props }) => {
  const processedProps = processResponsiveProps(props);
  const className = generateBaseClasses('ui-text', processedProps);
  return <span data-testid="mock-text" className={className} {...processedProps}>{children}</span>;
};

export const Button = ({ children, variant = 'primary', size = 'medium', disabled, loading, leftIcon, rightIcon, ...props }) => {
  const processedProps = processResponsiveProps({ variant, size, ...props });
  const baseClass = 'ui-button';
  
  // Generate classes
  let className = generateBaseClasses(baseClass, { variant, size, ...processedProps });
  
  // Add icon classes if needed
  if (leftIcon) className += ` ${baseClass}--with-left-icon`;
  if (rightIcon) className += ` ${baseClass}--with-right-icon`;
  if (loading) className += ` ${baseClass}--loading`;
  
  return (
    <button 
      data-testid="mock-button" 
      className={className} 
      disabled={disabled || loading}
      {...processedProps}
    >
      {leftIcon && <span className={`${baseClass}__icon ${baseClass}__icon--left`}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={`${baseClass}__icon ${baseClass}__icon--right`}>{rightIcon}</span>}
    </button>
  );
};

export const Avatar = ({ children, size = 'medium', src, alt, ...props }) => {
  const processedProps = processResponsiveProps({ size, ...props });
  const className = generateBaseClasses('ui-avatar', { size, ...processedProps });
  return (
    <div data-testid="mock-avatar" className={className} {...processedProps}>
      {src ? <img src={src} alt={alt} /> : children}
    </div>
  );
};

export const Icon = ({ name, size = 'medium', color, ...props }) => {
  const processedProps = processResponsiveProps({ size, ...props });
  const className = generateBaseClasses('ui-icon', { size, ...processedProps });
  return (
    <span 
      data-testid={`mock-icon-${name}`} 
      className={className}
      style={{ color, ...processedProps.style }}
      {...processedProps}
    >
      {name}
    </span>
  );
};

export const Flex = ({ children, direction, align, justify, wrap, gap, ...props }) => {
  const processedProps = processResponsiveProps({ direction, align, justify, wrap, ...props });
  const className = generateBaseClasses('ui-flex', processedProps);
  
  // Apply flex styling directly for testing
  const style = {
    display: 'flex',
    flexDirection: direction || 'row',
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    gap,
    ...processedProps.style
  };
  
  return (
    <div data-testid="mock-flex" className={className} style={style} {...processedProps}>
      {children}
    </div>
  );
};

export const Stack = ({ children, direction = 'vertical', spacing, ...props }) => {
  const processedProps = processResponsiveProps({ direction, ...props });
  const className = generateBaseClasses('ui-stack', { direction, ...processedProps });
  
  // Apply stack styling directly for testing
  const style = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    gap: spacing,
    ...processedProps.style
  };
  
  return (
    <div data-testid="mock-stack" className={className} style={style} {...processedProps}>
      {children}
    </div>
  );
};

// Enhanced mock molecule components
export const Dropdown = ({ children, isOpen, onToggle, placement, ...props }) => {
  const processedProps = processResponsiveProps(props);
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

Dropdown.Trigger = ({ children, ...props }) => {
  const className = generateBaseClasses('ui-dropdown__trigger', props);
  return (
    <div 
      data-testid="mock-dropdown-trigger" 
      className={className} 
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
      }}
    >
      {children}
    </div>
  );
};

Dropdown.Menu = ({ children, ...props }) => {
  const className = generateBaseClasses('ui-dropdown__menu', props);
  return <div data-testid="mock-dropdown-menu" className={className} {...props}>{children}</div>;
};

Dropdown.Item = ({ children, ...props }) => {
  const className = generateBaseClasses('ui-dropdown__item', props);
  return (
    <div 
      data-testid="mock-dropdown-item" 
      className={className} 
      role="menuitem"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

export const Menu = ({ children, ...props }) => {
  const processedProps = processResponsiveProps(props);
  const className = generateBaseClasses('ui-menu', processedProps);
  return <div data-testid="mock-menu" className={className} role="menu" {...processedProps}>{children}</div>;
};

Menu.Item = ({ children, selected, disabled, ...props }) => {
  const className = generateBaseClasses('ui-menu__item', props) + 
    (selected ? ' ui-menu__item--selected' : '') +
    (disabled ? ' ui-menu__item--disabled' : '');
  
  return (
    <div 
      data-testid="mock-menu-item" 
      className={className} 
      role="menuitem"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </div>
  );
};

export const Textarea = ({ value, onChange, rows = 3, placeholder, isDisabled, ...props }) => {
  const processedProps = processResponsiveProps(props);
  const className = generateBaseClasses('ui-textarea', processedProps);
  
  return (
    <textarea 
      data-testid="mock-textarea" 
      className={className}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      disabled={isDisabled}
      {...processedProps} 
    />
  );
};

// Add more mock components as needed
export const Card = ({ children, variant, padding, ...props }) => {
  const processedProps = processResponsiveProps({ variant, ...props });
  const className = generateBaseClasses('ui-card', { variant, ...processedProps });
  
  const style = {
    padding: padding,
    ...processedProps.style
  };
  
  return (
    <div data-testid="mock-card" className={className} style={style} {...processedProps}>
      {children}
    </div>
  );
};

export const Tooltip = ({ children, content, placement = 'top', ...props }) => {
  const className = generateBaseClasses('ui-tooltip', props);
  
  return (
    <div data-testid="mock-tooltip-wrapper" style={{ position: 'relative' }}>
      {children}
      <div 
        data-testid="mock-tooltip" 
        className={className}
        data-placement={placement}
        {...props}
      >
        {content}
      </div>
    </div>
  );
};

export const Modal = ({ isOpen, onClose, children, ...props }) => {
  const className = generateBaseClasses('ui-modal', props);
  
  if (!isOpen) return null;
  
  return (
    <div data-testid="mock-modal-overlay" className="ui-modal-overlay" onClick={onClose}>
      <div 
        data-testid="mock-modal" 
        className={className}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children, ...props }) => (
  <div data-testid="mock-modal-header" className="ui-modal__header" {...props}>
    {children}
  </div>
);

Modal.Body = ({ children, ...props }) => (
  <div data-testid="mock-modal-body" className="ui-modal__body" {...props}>
    {children}
  </div>
);

Modal.Footer = ({ children, ...props }) => (
  <div data-testid="mock-modal-footer" className="ui-modal__footer" {...props}>
    {children}
  </div>
);

// Export all components as default
export default {
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
