/**
 * Toast Component
 * 
 * A notification component for displaying temporary messages.
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import './Toast.css';

// Toast variants
export const TOAST_VARIANTS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Toast positions
export const TOAST_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

/**
 * Toast Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Toast content
 * @param {string} [props.variant=TOAST_VARIANTS.DEFAULT] - Toast variant
 * @param {string} [props.position=TOAST_POSITIONS.BOTTOM_RIGHT] - Toast position
 * @param {boolean} [props.visible=true] - Whether the toast is visible
 * @param {number} [props.duration=3000] - Duration in milliseconds before auto-dismissing (0 for no auto-dismiss)
 * @param {Function} [props.onClose] - Callback when toast is closed
 * @param {React.ReactNode} [props.icon] - Icon to display in the toast
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the toast
 * @returns {JSX.Element|null} Toast component or null if not visible
 */
const Toast = ({
  children,
  variant = TOAST_VARIANTS.DEFAULT,
  position = TOAST_POSITIONS.BOTTOM_RIGHT,
  visible = true,
  duration = 3000,
  onClose,
  icon,
  showCloseButton = true,
  className = '',
  extensions = [],
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  // Error handling for invalid variants
  if (variant && !Object.values(TOAST_VARIANTS).includes(variant)) {
    console.warn(`Toast: Invalid variant "${variant}". Falling back to DEFAULT.`);
    variant = TOAST_VARIANTS.DEFAULT;
  }

  // Error handling for invalid positions
  if (position && !Object.values(TOAST_POSITIONS).includes(position)) {
    console.warn(`Toast: Invalid position "${position}". Falling back to BOTTOM_RIGHT.`);
    position = TOAST_POSITIONS.BOTTOM_RIGHT;
  }

  // Safe close handler with error boundary
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      try {
        onClose();
      } catch (error) {
        console.error('Toast: Error in onClose handler:', error);
      }
    }
  }, [onClose]);

  // Auto-dismiss effect
  useEffect(() => {
    let timer;
    if (isVisible && duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, duration, handleClose]);

  // Update visibility when prop changes
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Toast', {
      children,
      variant,
      position,
      visible: isVisible,
      duration,
      onClose: handleClose,
      icon,
      showCloseButton,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Toast: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      children,
      variant,
      position,
      visible: isVisible,
      duration,
      onClose: handleClose,
      icon,
      showCloseButton,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    children: extendedChildren,
    variant: extendedVariant,
    position: extendedPosition,
    visible: extendedVisible,
    duration: extendedDuration,
    onClose: extendedOnClose,
    icon: extendedIcon,
    showCloseButton: extendedShowCloseButton,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Don't render if not visible
  if (!extendedVisible) {
    return null;
  }
  
  // Combine class names
  const toastClasses = [
    'ds-toast',
    `ds-toast-${extendedVariant}`,
    `ds-toast-${extendedPosition}`,
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={toastClasses}
      role="alert"
      aria-live="polite"
      {...restProps}
    >
      {extendedIcon && (
        <div className="ds-toast-icon">
          {extendedIcon}
        </div>
      )}
      
      <div className="ds-toast-content">
        {extendedChildren || 'Notification'}
      </div>
      
      {extendedShowCloseButton && (
        <button
          className="ds-toast-close"
          onClick={extendedOnClose}
          aria-label="Close notification"
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  /** Toast content */
  children: PropTypes.node.isRequired,
  /** Toast variant */
  variant: PropTypes.oneOf(Object.values(TOAST_VARIANTS)),
  /** Toast position */
  position: PropTypes.oneOf(Object.values(TOAST_POSITIONS)),
  /** Whether the toast is visible */
  visible: PropTypes.bool,
  /** Duration in milliseconds before auto-dismissing (0 for no auto-dismiss) */
  duration: PropTypes.number,
  /** Callback when toast is closed */
  onClose: PropTypes.func,
  /** Icon to display in the toast */
  icon: PropTypes.node,
  /** Whether to show the close button */
  showCloseButton: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the toast */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

export default Toast;
