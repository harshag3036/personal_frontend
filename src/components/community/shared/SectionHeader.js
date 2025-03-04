import React from 'react';
import './SharedComponents.css';

/**
 * SectionHeader Component
 * 
 * A reusable header component for sections throughout the community features
 * 
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Optional subtitle or description
 * @param {React.ReactNode} props.actions - Optional actions (buttons, links, etc.)
 * @param {string} props.className - Additional CSS class names
 * @param {Object} props.style - Additional inline styles
 */
const SectionHeader = ({ 
  title, 
  subtitle, 
  actions, 
  className = '', 
  style = {} 
}) => {
  if (!title) return null;

  return (
    <div 
      className={`section-header ${className}`}
      style={style}
      data-testid={`section-header-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h3 className="section-header-title">{title}</h3>
      
      {subtitle && (
        <p className="section-header-subtitle">{subtitle}</p>
      )}
      
      {actions && (
        <div className="section-header-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
