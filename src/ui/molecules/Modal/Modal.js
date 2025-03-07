import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

/**
 * Modal Component
 * 
 * A versatile modal dialog component that can be used to display content in a layer above the page.
 * This component follows the WAI-ARIA Dialog Pattern for accessibility.
 * 
 * @example
 * ```jsx
 * <Modal isOpen={isOpen} onClose={handleClose}>
 *   <ModalHeader>Modal Title</ModalHeader>
 *   <ModalBody>Modal content goes here...</ModalBody>
 *   <ModalFooter>
 *     <Button onClick={handleClose}>Close</Button>
 *     <Button variant="primary">Save</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
const Modal = ({
  children,
  isOpen = false,
  onClose,
  size = 'md',
  variant = 'default',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  initialFocusRef,
  finalFocusRef,
  returnFocusOnClose = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  ...restProps
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Handle mounting/unmounting
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Save the currently focused element to restore it later
      previousActiveElement.current = document.activeElement;

      // Set focus to the initial focus element or the modal itself
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }

      // Add body class to prevent scrolling
      document.body.classList.add('ui-modal-open');
    } else if (returnFocusOnClose && previousActiveElement.current) {
      // Restore focus when modal closes
      if (finalFocusRef && finalFocusRef.current) {
        finalFocusRef.current.focus();
      } else {
        previousActiveElement.current.focus();
      }
      previousActiveElement.current = null;

      // Remove body class to allow scrolling
      document.body.classList.remove('ui-modal-open');
    }
  }, [isOpen, initialFocusRef, finalFocusRef, returnFocusOnClose]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      // Close on Escape key press
      if (closeOnEsc && event.key === 'Escape') {
        onClose && onClose();
      }

      // Trap focus inside modal
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } 
        // Tab
        else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose && onClose();
    }
  };

  // Combine class names
  const modalClasses = [
    'ui-modal',
    `ui-modal--${size}`,
    `ui-modal--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    'ui-modal-overlay',
    overlayClassName
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'ui-modal-content',
    contentClassName
  ].filter(Boolean).join(' ');

  // Don't render anything if not mounted or not open
  if (!isMounted || !isOpen) return null;

  // Create portal to render modal outside of the current component hierarchy
  return createPortal(
    <div 
      className={overlayClasses}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...restProps}
      >
        <div className={contentClasses}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  /** Modal content */
  children: PropTypes.node.isRequired,
  /** Whether the modal is open */
  isOpen: PropTypes.bool,
  /** Callback when the modal should close */
  onClose: PropTypes.func,
  /** Size of the modal */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'full']),
  /** Visual variant of the modal */
  variant: PropTypes.oneOf(['default', 'alert', 'info', 'success', 'warning', 'error']),
  /** Whether to close the modal when the Escape key is pressed */
  closeOnEsc: PropTypes.bool,
  /** Whether to close the modal when the overlay is clicked */
  closeOnOverlayClick: PropTypes.bool,
  /** Ref to the element that should receive focus when the modal opens */
  initialFocusRef: PropTypes.shape({ current: PropTypes.any }),
  /** Ref to the element that should receive focus when the modal closes */
  finalFocusRef: PropTypes.shape({ current: PropTypes.any }),
  /** Whether to return focus to the element that had focus before the modal opened */
  returnFocusOnClose: PropTypes.bool,
  /** Additional CSS class for the modal */
  className: PropTypes.string,
  /** Additional CSS class for the overlay */
  overlayClassName: PropTypes.string,
  /** Additional CSS class for the content */
  contentClassName: PropTypes.string,
};

export default Modal;
