import React from 'react';
import PropTypes from 'prop-types';

/**
 * ModalBody Component
 * 
 * A container for the main content of a modal.
 * 
 * @example
 * ```jsx
 * <ModalBody>
 *   <p>This is the main content of the modal.</p>
 * </ModalBody>
 * ```
 */
const ModalBody = ({
  children,
  className = '',
  ...restProps
}) => {
  // Combine class names
  const bodyClasses = [
    'ui-modal-body',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses} {...restProps}>
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  /** Modal body content */
  children: PropTypes.node,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default ModalBody;
