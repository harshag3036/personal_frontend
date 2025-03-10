import React from 'react';
import PropTypes from 'prop-types';

/**
 * StepContent Component
 * 
 * Displays the content associated with a step.
 */
const StepContent = ({
  className,
  children,
  ...props
}) => {
  // Build class names
  const classNames = [
    'ui-step-content',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

StepContent.propTypes = {
  /** Additional CSS class */
  className: PropTypes.string,
  /** Step content */
  children: PropTypes.node
};

export default StepContent;
