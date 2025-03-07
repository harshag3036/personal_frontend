import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../atoms';

/**
 * ModalHeader Component
 * 
 * A header component for the Modal that typically contains a title and a close button.
 * 
 * @example
 * ```jsx
 * <ModalHeader onClose={handleClose}>Modal Title</ModalHeader>
 * ```
 */
const ModalHeader = ({
  children,
  onClose,
  showCloseButton = true,
  closeButtonLabel = 'Close',
  className = '',
  ...restProps
}) => {
  // Combine class names
  const headerClasses = [
    'ui-modal-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses} {...restProps}>
      <div className="ui-modal-header__title">
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          className="ui-modal-close-button"
          onClick={onClose}
          aria-label={closeButtonLabel}
          type="button"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </header>
  );
};

ModalHeader.propTypes = {
  /** Header content, typically the modal title */
  children: PropTypes.node,
  /** Callback when the close button is clicked */
  onClose: PropTypes.func,
  /** Whether to show the close button */
  showCloseButton: PropTypes.bool,
  /** Accessible label for the close button */
  closeButtonLabel: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default ModalHeader;
