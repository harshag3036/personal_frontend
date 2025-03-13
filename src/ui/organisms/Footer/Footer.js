/**
 * Footer Component
 * 
 * A flexible footer component for application branding, navigation, and information.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { 
  FOOTER_VARIANTS,
  FOOTER_SIZES,
  FOOTER_POSITIONS,
  FOOTER_MODIFIERS,
  FOOTER_BREAKPOINTS,
  FOOTER_ARIA,
  FOOTER_DATA_ATTRIBUTES,
  FOOTER_CLASS_NAMES,
  FOOTER_DEFAULT_PROPS
} from './constants';
import './Footer.css';

/**
 * Footer Logo Component
 * 
 * Renders the logo section of the footer.
 */
const FooterLogo = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.LOGO} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

FooterLogo.displayName = 'Footer.Logo';

FooterLogo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Footer Navigation Component
 * 
 * Renders the navigation section of the footer.
 */
const FooterNavigation = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <nav 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.NAVIGATION} ${className || ''}`}
      {...props}
    >
      {children}
    </nav>
  );
});

FooterNavigation.displayName = 'Footer.Navigation';

FooterNavigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Footer Social Component
 * 
 * Renders the social media section of the footer.
 */
const FooterSocial = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.SOCIAL} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

FooterSocial.displayName = 'Footer.Social';

FooterSocial.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Footer Copyright Component
 * 
 * Renders the copyright section of the footer.
 */
const FooterCopyright = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.COPYRIGHT} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

FooterCopyright.displayName = 'Footer.Copyright';

FooterCopyright.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Footer Newsletter Component
 * 
 * Renders the newsletter section of the footer.
 */
const FooterNewsletter = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.NEWSLETTER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

FooterNewsletter.displayName = 'Footer.Newsletter';

FooterNewsletter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Footer Column Component
 * 
 * Renders a column in the footer.
 */
const FooterColumn = forwardRef(({ 
  children, 
  className,
  title,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.COLUMN} ${className || ''}`}
      {...props}
    >
      {title && (
        <div className={FOOTER_CLASS_NAMES.COLUMN_TITLE}>
          {title}
        </div>
      )}
      <div className={FOOTER_CLASS_NAMES.COLUMN_CONTENT}>
        {children}
      </div>
    </div>
  );
});

FooterColumn.displayName = 'Footer.Column';

FooterColumn.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node
};

/**
 * Footer Bottom Component
 * 
 * Renders the bottom section of the footer.
 */
const FooterBottom = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${FOOTER_CLASS_NAMES.BOTTOM} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

FooterBottom.displayName = 'Footer.Bottom';

FooterBottom.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Footer Component
 * 
 * Main footer component.
 */
const Footer = forwardRef(({ 
  children,
  variant = FOOTER_DEFAULT_PROPS.variant,
  size = FOOTER_DEFAULT_PROPS.size,
  position = FOOTER_DEFAULT_PROPS.position,
  withBorder = FOOTER_DEFAULT_PROPS.withBorder,
  withShadow = FOOTER_DEFAULT_PROPS.withShadow,
  withLogo = FOOTER_DEFAULT_PROPS.withLogo,
  withNavigation = FOOTER_DEFAULT_PROPS.withNavigation,
  withSocial = FOOTER_DEFAULT_PROPS.withSocial,
  withCopyright = FOOTER_DEFAULT_PROPS.withCopyright,
  withNewsletter = FOOTER_DEFAULT_PROPS.withNewsletter,
  withColumns = FOOTER_DEFAULT_PROPS.withColumns,
  breakpoint = FOOTER_DEFAULT_PROPS.breakpoint,
  className,
  style,
  ...props 
}, ref) => {
  // Build class names
  const footerClasses = [
    FOOTER_CLASS_NAMES.ROOT,
    `${FOOTER_CLASS_NAMES.ROOT}--${variant}`,
    `${FOOTER_CLASS_NAMES.ROOT}--${size}`,
    `${FOOTER_CLASS_NAMES.ROOT}--${position}`,
    withBorder ? `${FOOTER_CLASS_NAMES.ROOT}--${FOOTER_MODIFIERS.WITH_BORDER}` : '',
    withShadow ? `${FOOTER_CLASS_NAMES.ROOT}--${FOOTER_MODIFIERS.WITH_SHADOW}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Find and organize children by type
  const renderChildren = () => {
    let logo = null;
    let navigation = null;
    let social = null;
    let copyright = null;
    let newsletter = null;
    let columns = [];
    let bottom = null;
    
    React.Children.forEach(children, child => {
      if (!child) return;
      
      if (child.type?.displayName === 'Footer.Logo') {
        logo = child;
      } else if (child.type?.displayName === 'Footer.Navigation') {
        navigation = child;
      } else if (child.type?.displayName === 'Footer.Social') {
        social = child;
      } else if (child.type?.displayName === 'Footer.Copyright') {
        copyright = child;
      } else if (child.type?.displayName === 'Footer.Newsletter') {
        newsletter = child;
      } else if (child.type?.displayName === 'Footer.Column') {
        columns.push(child);
      } else if (child.type?.displayName === 'Footer.Bottom') {
        bottom = child;
      }
    });

    return (
      <div className={FOOTER_CLASS_NAMES.CONTAINER}>
        {logo && withLogo && logo}
        
        {withColumns && columns.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
            {columns}
          </div>
        )}
        
        {navigation && withNavigation && navigation}
        {social && withSocial && social}
        {newsletter && withNewsletter && newsletter}
        {bottom && bottom}
        {copyright && withCopyright && copyright}
      </div>
    );
  };

  return (
    <footer 
      ref={ref}
      className={footerClasses}
      style={style}
      role={FOOTER_ARIA.ROLE}
      aria-label={FOOTER_ARIA.LABEL}
      data-variant={variant}
      data-size={size}
      data-position={position}
      {...props}
    >
      {renderChildren()}
    </footer>
  );
});

Footer.displayName = 'Footer';

Footer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(FOOTER_VARIANTS)),
  size: PropTypes.oneOf(Object.values(FOOTER_SIZES)),
  position: PropTypes.oneOf(Object.values(FOOTER_POSITIONS)),
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  withLogo: PropTypes.bool,
  withNavigation: PropTypes.bool,
  withSocial: PropTypes.bool,
  withCopyright: PropTypes.bool,
  withNewsletter: PropTypes.bool,
  withColumns: PropTypes.bool,
  breakpoint: PropTypes.oneOf(Object.values(FOOTER_BREAKPOINTS)),
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
Footer.Logo = FooterLogo;
Footer.Navigation = FooterNavigation;
Footer.Social = FooterSocial;
Footer.Copyright = FooterCopyright;
Footer.Newsletter = FooterNewsletter;
Footer.Column = FooterColumn;
Footer.Bottom = FooterBottom;

export default Footer;
