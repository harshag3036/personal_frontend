/**
 * ToastContainer Component
 * 
 * A container for managing multiple Toast components.
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TOAST_POSITIONS } from './Toast';
import './ToastContainer.css';

/**
 * ToastContainer Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.toasts - Array of toast objects to display
 * @param {string} [props.position=TOAST_POSITIONS.BOTTOM_RIGHT] - Default position for toasts
 * @param {Function} [props.onRemove] - Callback when a toast is removed
 * @param {number} [props.maxToasts=5] - Maximum number of toasts to display at once
 * @param {string} [props.className=''] - Additional CSS class names
 * @returns {JSX.Element} ToastContainer component
 */
const ToastContainer = ({
  toasts = [],
  position = TOAST_POSITIONS.BOTTOM_RIGHT,
  onRemove,
  maxToasts = 5,
  className = '',
  ...props
}) => {
  const [visibleToasts, setVisibleToasts] = useState([]);

  // Error handling for invalid positions
  if (position && !Object.values(TOAST_POSITIONS).includes(position)) {
    console.warn(`ToastContainer: Invalid position "${position}". Falling back to BOTTOM_RIGHT.`);
    position = TOAST_POSITIONS.BOTTOM_RIGHT;
  }

  // Safe remove handler with error boundary
  const handleRemove = useCallback((id) => {
    setVisibleToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    
    if (onRemove) {
      try {
        onRemove(id);
      } catch (error) {
        console.error('ToastContainer: Error in onRemove handler:', error);
      }
    }
  }, [onRemove]);

  // Update visible toasts when toasts prop changes
  useEffect(() => {
    // Validate toasts array
    if (!Array.isArray(toasts)) {
      console.warn('ToastContainer: toasts prop is not an array. Using empty array instead.');
      setVisibleToasts([]);
      return;
    }

    // Ensure each toast has an id
    const validToasts = toasts
      .filter((toast) => toast && typeof toast === 'object')
      .map((toast) => ({
        ...toast,
        id: toast.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: toast.position || position,
      }));

    // Limit to maxToasts
    const limitedToasts = validToasts.slice(0, maxToasts);
    
    setVisibleToasts(limitedToasts);
  }, [toasts, position, maxToasts]);

  // Group toasts by position
  const toastsByPosition = visibleToasts.reduce((acc, toast) => {
    const pos = toast.position || position;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    acc[pos].push(toast);
    return acc;
  }, {});

  // Combine class names
  const containerClasses = [
    'ds-toast-container',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {Object.entries(toastsByPosition).map(([pos, positionToasts]) => (
        <div key={pos} className={`ds-toast-group ds-toast-group-${pos}`}>
          {positionToasts.map((toast) => {
            // Extract toast-specific props
            const {
              id,
              content,
              variant,
              duration,
              icon,
              showCloseButton = true,
              onClose,
              ...toastProps
            } = toast;

            // Safe close handler with error boundary
            const handleClose = () => {
              handleRemove(id);
              
              if (onClose) {
                try {
                  onClose(id);
                } catch (error) {
                  console.error('ToastContainer: Error in toast onClose handler:', error);
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
                key={id}
                className={`ds-toast ds-toast-${variant || 'default'} ds-toast-${pos}`}
                role="alert"
                aria-live="polite"
                {...toastProps}
              >
                {icon && (
                  <div className="ds-toast-icon">
                    {icon}
                  </div>
                )}
                
                <div className="ds-toast-content">
                  {content || 'Notification'}
                </div>
                
                {showCloseButton && (
                  <button
                    className="ds-toast-close"
                    onClick={handleClose}
                    aria-label="Close notification"
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

ToastContainer.propTypes = {
  /** Array of toast objects to display */
  toasts: PropTypes.arrayOf(PropTypes.shape({
    /** Unique identifier for the toast */
    id: PropTypes.string,
    /** Toast content */
    content: PropTypes.node.isRequired,
    /** Toast variant */
    variant: PropTypes.string,
    /** Toast position */
    position: PropTypes.string,
    /** Duration in milliseconds before auto-dismissing (0 for no auto-dismiss) */
    duration: PropTypes.number,
    /** Icon to display in the toast */
    icon: PropTypes.node,
    /** Whether to show the close button */
    showCloseButton: PropTypes.bool,
    /** Callback when toast is closed */
    onClose: PropTypes.func,
  })),
  /** Default position for toasts */
  position: PropTypes.oneOf(Object.values(TOAST_POSITIONS)),
  /** Callback when a toast is removed */
  onRemove: PropTypes.func,
  /** Maximum number of toasts to display at once */
  maxToasts: PropTypes.number,
  /** Additional CSS class names */
  className: PropTypes.string,
};

export default ToastContainer;
