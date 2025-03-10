/**
 * ToastItem Component
 * 
 * An individual toast notification with auto-dismiss functionality.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TOAST_CLASS } from './constants';

/**
 * ToastItem Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the toast
 * @param {React.ReactNode} props.content - Toast content
 * @param {string} props.variant - Toast variant
 * @param {string} props.position - Toast position
 * @param {number} props.duration - Duration in milliseconds before auto-dismissing
 * @param {React.ReactNode} props.icon - Icon to display in the toast
 * @param {boolean} props.showCloseButton - Whether to show the close button
 * @param {Function} props.onClose - Callback when toast is closed
 * @param {Function} props.handleRemove - Internal handler for removing the toast
 * @returns {JSX.Element} ToastItem component
 */
const ToastItem = ({
  id,
  content,
  variant = 'default',
  position,
  duration,
  icon,
  showCloseButton = true,
  onClose,
  handleRemove,
  ...toastProps
}) => {
  // Safe close handler with error boundary
  const handleClose = () => {
    handleRemove(id);
    
    if (onClose) {
      try {
        onClose(id);
      } catch (error) {
        console.error('ToastItem: Error in toast onClose handler:', error);
      }
    }
  };

  // Auto-dismiss effect
  useEffect(() => {
    let timer;
    if (duration && duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [id, duration]);

  return (
    <div
      className={`${TOAST_CLASS} ${TOAST_CLASS}-${variant} ${TOAST_CLASS}-${position}`}
      role="alert"
      aria-live="polite"
      {...toastProps}
    >
      {icon && (
        <div className={`${TOAST_CLASS}-icon`}>
          {icon}
        </div>
      )}
      
      <div className={`${TOAST_CLASS}-content`}>
        {content || 'Notification'}
      </div>
      
      {showCloseButton && (
        <button
          className={`${TOAST_CLASS}-close`}
          onClick={handleClose}
          aria-label="Close notification"
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
};

ToastItem.propTypes = {
  /** Unique identifier for the toast */
  id: PropTypes.string.isRequired,
  /** Toast content */
  content: PropTypes.node.isRequired,
  /** Toast variant */
  variant: PropTypes.string,
  /** Toast position */
  position: PropTypes.string.isRequired,
  /** Duration in milliseconds before auto-dismissing (0 for no auto-dismiss) */
  duration: PropTypes.number,
  /** Icon to display in the toast */
  icon: PropTypes.node,
  /** Whether to show the close button */
  showCloseButton: PropTypes.bool,
  /** Callback when toast is closed */
  onClose: PropTypes.func,
  /** Internal handler for removing the toast */
  handleRemove: PropTypes.func.isRequired,
};

export default ToastItem;
