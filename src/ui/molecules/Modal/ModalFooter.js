import React from 'react';
import PropTypes from 'prop-types';

/**
 * ModalFooter Component
 * 
 * A footer component for the Modal that typically contains action buttons.
 * 
 * @example
 * ```jsx
 * <ModalFooter>
 *   <Button onClick={handleClose}>Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </ModalFooter>
 * ```
 */
const ModalFooter = ({
  children,
  className = '',
  ...restProps
}) => {
  // Combine class names
  const footerClasses = [
    'ui-modal-footer',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={footerClasses} {...restProps}>
      {children}
    </footer>
  );
};

ModalFooter.propTypes = {
  /** Footer content, typically action buttons */
  children: PropTypes.node,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default ModalFooter;
